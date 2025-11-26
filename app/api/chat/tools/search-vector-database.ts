import { tool } from "ai";
import { z } from "zod";
import { searchPinecone } from "@/lib/pinecone";

export const vectorDatabaseSearch = tool({
  description: "Search the vector database for information",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The query to search the vector database for. Optimally is a hypothetical answer for similarity search."
      ),
  }),
  execute: async ({ query }) => {
    try {
      console.log("[vectorDatabaseSearch] query:", query);

      const results = await searchPinecone(query);

      // No results or empty response
      if (
        !results ||
        (Array.isArray(results) && results.length === 0) ||
        (typeof results === "string" && results.trim().length === 0)
      ) {
        return "NO_RESULTS";
      }

      // If searchPinecone already returns a string, just trim and cap length
      if (typeof results === "string") {
        return results.slice(0, 4000);
      }

      // If it returns an array of objects, try to pull out text/content fields
      if (Array.isArray(results)) {
        const combined = results
          .map((r: any) => r.text || r.content || r.pageContent || "")
          .filter((t: string) => t && t.trim().length > 0)
          .join("\n\n");

        if (!combined || combined.trim().length === 0) {
          return "NO_RESULTS";
        }

        return combined.slice(0, 4000); // protect against huge outputs
      }

      // Fallback: stringify anything else
      const asString = JSON.stringify(results);
      if (!asString || asString.trim().length === 0) {
        return "NO_RESULTS";
      }
      return asString.slice(0, 4000);
    } catch (error) {
      console.error("[vectorDatabaseSearch] error:", error);
      // Signal to the model that KB search failed; your prompt already
      // tells it to apologize and consider web search in this case.
      return "ERROR_IN_KB_SEARCH";
    }
  },
});
