import { tool } from 'ai';
import { z } from 'zod';
import Exa from 'exa-js';

// Make sure EXA_API_KEY is set in your environment
const exa = new Exa(process.env.EXA_API_KEY);

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  inputSchema: z.object({
    query: z.string().min(1).describe('The search query'),
  }),
  execute: async ({ query }) => {
    try {
      console.log('[webSearch] query:', query);

      const { results } = await exa.search(query, {
        contents: {
          text: true,
        },
        numResults: 3,
        includeDomains: [
  "https://cracku.in",
  "https://www.imsindia.com/",
  "https://shiksha.com",
]
      });

      if (!results || results.length === 0) {
        return `I searched the web for "${query}" but couldn't find any relevant results.`;
      }

      // Build a readable summary string for the model to work with
      const summary = results
        .map((result, index) => {
          const snippet =
            result.text?.slice(0, 300)?.replace(/\s+/g, ' ') || '';
          const date = result.publishedDate
            ? ` (published: ${result.publishedDate})`
            : '';
          return `${index + 1}. ${result.title}${date}\n${result.url}\n${snippet}`;
        })
        .join('\n\n');

      // Always return a plain string – easiest for the model to consume
      return `Here are some web search results for "${query}":\n\n${summary}`;
    } catch (error) {
      console.error('Error searching the web:', error);
      return `I tried to search the web for "${query}", but there was an internal error while fetching results.`;
    }
  },
});
