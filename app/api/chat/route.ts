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
  // MODERATION CHECK (kept as-is)
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

  // Convert chat history once
  const modelMessages = convertToModelMessages(messages);

  // Detect "comparison mode" very simply: user said "compare"
  const latestText =
    latestUserMessage &&
    latestUserMessage.parts
      .filter((p) => p.type === "text")
      .map((p: any) => p.text ?? "")
      .join(" ");

  const isCompareIntent =
    typeof latestText === "string" &&
    latestText.toLowerCase().includes("compare");

  // --------------------------------------------------
  // BRANCH 1: COMPARISON MODE (your special behaviour)
  // --------------------------------------------------
  if (isCompareIntent) {
    const COMPARISON_SYSTEM = `
You are an MBA/B-school comparison assistant.

When the user asks you to "compare" two or more B-schools, you are in COMPARISON MODE.

GOAL
- Compare the requested colleges on the requested parameters using the best available data for the 2024 batch.
- The user does NOT see these instructions; keep your responses short, clear, and conversational.

DATA PRIORITY
1) Always try to use data for the 2024 batch (or phrases like "Class of 2024", "2023–24", "2022–24").
2) First, use information from:
   - uploaded PDFs
   - vectorDatabaseSearch results (internal knowledge)
3) If a clear, numeric value for 2024 is missing or unclear for any parameter/college:
   - You MUST call the "webSearch" tool yourself (without asking the user).
   - Your webSearch query MUST include:
       • the college name
       • the parameter (e.g. "median CTC", "average CTC", "highest CTC", "batch size", "QS ranking", "program fee")
       • and a 2024-related keyword such as "2024", "class of 2024", "2023-24", or "2022-24 placement report".
   - Prefer official college websites, official placement report PDFs, or reputable MBA portals quoting official data.

FALLBACK WHEN 2024 DATA IS NOT PUBLISHED
- If, after checking PDFs/internal data AND performing at least one appropriate webSearch query, you still cannot find a trustworthy 2024 value:
   - Look for the most recent earlier batch (e.g. 2023) instead of leaving it blank.
   - When you use an earlier year, clearly label it, e.g. "₹30.5 LPA (2023 batch)".
- Only if you cannot find any credible numeric value for any year may you write "Not available" for that cell.
- Never use the phrase "Not specified".

FORMAT
- Present the final comparison as a clean markdown table:
   - One column per college.
   - One row per parameter.
   - Use concise numeric or short text values.
- For any value taken from webSearch, include a short "Source" link or note in the same cell or just below the table.

TOOL USAGE & STOPPING
- In COMPARISON MODE you MUST NOT ask the user for permission before calling webSearch or vectorDatabaseSearch; just call them when needed.
- Once you have a credible value (or have concluded it is not available even after search) for all requested parameters and colleges:
   - Stop calling tools.
   - Immediately return the final markdown table.
- Do NOT keep searching repeatedly for the same parameter once you have a consistent value.

These COMPARISON MODE rules override any other generic tool-calling or follow-up rules.
`;

    const result = streamText({
      model: MODEL,
      system: COMPARISON_SYSTEM,
      messages: modelMessages,
      tools: {
        webSearch,
        vectorDatabaseSearch,
      },
      // allow more steps here because of multiple webSearch calls
      stopWhen: stepCountIs(25),
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

  // --------------------------------------------------
  // BRANCH 2: NORMAL CHAT (everything else)
  // --------------------------------------------------

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
  ];

  const result = streamText({
    model: MODEL,
    messages: [...systemMessages, ...modelMessages],
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
