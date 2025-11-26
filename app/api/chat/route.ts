import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type CoreSystemMessage,
} from "ai";

import { MODEL } from "@/config";
import {
  IDENTITY_PROMPT,
  TOOL_CALLING_PROMPT,
  TOOL_CALLING_OPTIONS,
  TOOL_CALLING_BEHAVIOR_RULES,
  TOOL_CALLING_FOLLOWUP_RULES_YES,
  TOOL_CALLING_FOLLOWUP_RULES_NO,
  TOOL_CALLING_OTHER_RULES,
  TONE_STYLE_PROMPT,
  GUARDRAILS_PROMPT,
  CITATIONS_PROMPT,
} from "@/prompts";

import { isContentFlagged } from "@/lib/moderation";
import { webSearch } from "./tools/web-search";
import { vectorDatabaseSearch } from "./tools/search-vector-database";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // --------------------------------------------------
  // MODERATION CHECK
  // --------------------------------------------------
  const latestUserMessage = messages.filter((m) => m.role === "user").pop();

  if (latestUserMessage) {
    const textParts = latestUserMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => ("text" in part ? part.text : ""))
      .join("");

    if (textParts) {
      const moderationResult = await isContentFlagged(textParts);

      if (moderationResult.flagged) {
        const stream = createUIMessageStream({
          execute({ writer }) {
            const id = "moderation-denial-text";

            writer.write({ type: "start" });
            writer.write({ type: "text-start", id });

            writer.write({
              type: "text-delta",
              id,
              delta:
                moderationResult.denialMessage ||
                "Your message violates our guidelines. I can't answer that.",
            });

            writer.write({ type: "text-end", id });
            writer.write({ type: "finish" });
          },
        });

        return createUIMessageStreamResponse({ stream });
      }
    }
  }

  // --------------------------------------------------
  // SYSTEM PROMPTS (general + comparison-specific)
  // --------------------------------------------------

  const MBA_COMPARISON_PROMPT = `
You are an MBA college comparison assistant.

When a user message asks to compare B-schools (for example starts with or contains "compare"):
- Extract the college names and the requested parameters.
- Use placement and program data for the 2024 batch by default (or the latest available year if 2024 truly does not exist, clearly label the year in that case).
- First use information from the uploaded PDFs and internal knowledge.
- If any requested parameter (especially Median CTC, Average CTC, Highest CTC, Program Fee, Batch Size, QS Ranking, Average Work Experience, Gender Ratio, or Major Recruiters) is missing or unclear in the PDFs, call the webSearch tool to fetch the latest 2024 values from reliable, preferably official college sources.
- Never output "Not specified" if the value can be found in either the PDFs or via webSearch. Only write "Not available" when neither the PDFs nor webSearch contain that information.
- Present comparison results in a clean markdown table (one column per college, one row per parameter).
- For any values taken from the web, include a short "Source" link or note in the same cell.
`;

  const systemMessages: CoreSystemMessage[] = [
    { role: "system", content: IDENTITY_PROMPT },
    { role: "system", content: TOOL_CALLING_PROMPT },
    { role: "system", content: TOOL_CALLING_OPTIONS },
    { role: "system", content: TOOL_CALLING_BEHAVIOR_RULES },
    { role: "system", content: TOOL_CALLING_FOLLOWUP_RULES_YES },
    { role: "system", content: TOOL_CALLING_FOLLOWUP_RULES_NO },
    { role: "system", content: TOOL_CALLING_OTHER_RULES },
    { role: "system", content: TONE_STYLE_PROMPT },
    { role: "system", content: GUARDRAILS_PROMPT },
    { role: "system", content: CITATIONS_PROMPT },
    // 👇 our new hidden comparison logic
    { role: "system", content: MBA_COMPARISON_PROMPT },
  ];

  // --------------------------------------------------
  // MAIN EXECUTION
  // --------------------------------------------------

  const result = streamText({
    model: MODEL,
    messages: [
      ...systemMessages, // system instructions (including hidden compare rules)
      ...convertToModelMessages(messages), // chat history
    ],
    tools: {
      webSearch,
      vectorDatabaseSearch,
    },
    stopWhen: stepCountIs(10),
    providerOptions: {
      openai: {
        reasoningSummary: "auto",
        reasoningEffort: "low",
        parallelToolCalls: false,
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
