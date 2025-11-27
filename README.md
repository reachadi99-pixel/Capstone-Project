# MB-AI

A customizable AI chatbot assistant built with Next.js, featuring web search capabilities, vector database integration, and content moderation. This repository provides a complete foundation for deploying your own AI assistant with minimal technical knowledge required.

## Overview

MB-AI is an AI-powered chatbot that can:

- Answer questions using advanced language models
- Search the web for up-to-date information
- Search a vector database (Pinecone) for stored knowledge
- Moderate content to ensure safe interactions
- Provide citations and sources for its responses

The application is designed to be easily customizable without deep technical expertise. Most changes you'll want to make can be done in just two files: `config.ts` and `prompts.ts`.

This application is deployed on Vercel. After making changes to `config.ts` or `prompts.ts`, commit and push your changes to trigger a new deployment.

## Key Files to Customize

### `config.ts` - Application Configuration

This is the **primary file** you'll edit to customize your AI assistant. Located in the root directory, it contains:

- **AI Identity**: `AI_NAME` and `OWNER_NAME` - Change these to personalize your assistant
- **Welcome Message**: `WELCOME_MESSAGE` - The greeting users see when they first open the chat
- **UI Text**: `CLEAR_CHAT_TEXT` - The label for the "New Chat" button
- **Moderation Messages**: Custom messages shown when content is flagged (sexual content, harassment, hate speech, violence, self-harm, illegal activities)
- **Model Configuration**: `MODEL` - The AI model being used (currently set to OpenAI's GPT-4o-mini)
- **Vector Database Settings**: `PINECONE_TOP_K` and `PINECONE_INDEX_NAME` - Settings for your knowledge base search

**Example customization:**
```typescript
export const AI_NAME = "Your Assistant Name";
export const OWNER_NAME = "Your Name";
export const WELCOME_MESSAGE = `Hello! I'm ${AI_NAME}, ready to help you.`;
```

### `prompts.ts` - AI Behavior and Instructions

This file controls **how your AI assistant behaves and responds**. Located in the root directory, it contains:

- **Identity Prompt**: Who the AI is and who created it
- **Tool Calling Prompt**: Instructions for when to search the web or database
- **Tone & Style**: How the AI should communicate (friendly, helpful, educational)
- **Guardrails**: What the AI should refuse to discuss
- **Citation Rules**: How to cite sources in responses
- **Domain Context**: Domain-specific instructions (customizable for your use case)

The prompts are modular, so you can edit individual sections without affecting others. The `SYSTEM_PROMPT` combines all these sections.

**Example customization:**
```typescript
export const TONE_STYLE_PROMPT = `
- Maintain a professional, business-focused tone.
- Use clear, concise language suitable for executives.
- Provide actionable insights and recommendations.
`;
```

## Project Structure
```text
MB-AI/
├── app/                          # Next.js application files
│   ├── api/chat/                 # Chat API endpoint
│   │   ├── route.ts              # Main chat handler
│   │   └── tools/                # AI tools (web search, vector search)
│   ├── page.tsx                  # Main chat interface (UI)
│   ├── parts/                    # UI components
│   └── terms/                    # Terms of Use page
├── components/                   # React components
│   ├── ai-elements/              # AI-specific UI components
│   ├── messages/                 # Message display components
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility libraries
│   ├── moderation.ts             # Content moderation logic
│   ├── pinecone.ts               # Vector database integration
│   ├── sources.ts                # Source/citation handling
│   └── utils.ts                  # General utilities
├── types/                        # TypeScript type definitions
├── config.ts                     # ⭐ MAIN CONFIGURATION FILE
├── prompts.ts                    # ⭐ AI BEHAVIOR CONFIGURATION
└── package.json                  # Dependencies and scripts
```

## Important Files Explained

### Core Application Files

- **`app/api/chat/route.ts`**: The main API endpoint that handles chat requests. It processes messages, checks moderation, and calls the AI model with tools.

- **`app/page.tsx`**: The main user interface. This is what users see and interact with. It handles the chat interface, message display, and user input.

- **`app/api/chat/tools/web-search.ts`**: Enables the AI to search the web using Exa API. You can modify search parameters here (currently returns 3 results).

- **`app/api/chat/tools/search-vector-database.ts`**: Enables the AI to search your Pinecone vector database for stored knowledge.

### UI Components

- **`components/messages/message-wall.tsx`**: Displays the conversation history
- **`components/messages/assistant-message.tsx`**: Renders AI responses, including tool calls and reasoning
- **`components/messages/tool-call.tsx`**: Shows when the AI is using tools (searching web, etc.)
- **`components/ai-elements/response.tsx`**: Formats and displays AI text responses with markdown support

### Library Files

- **`lib/moderation.ts`**: Handles content moderation using OpenAI's moderation API. Checks user messages for inappropriate content before processing.

- **`lib/pinecone.ts`**: Manages connections to Pinecone vector database. Handles searching your knowledge base.

- **`lib/sources.ts`**: Processes search results and formats them for the AI, including citation handling.

### Configuration Files

- **`env.template`**: Template for environment variables. These need to be configured in your Vercel project settings.

- **`app/terms/page.tsx`**: Terms of Use page. Uses `OWNER_NAME` from `config.ts`. Update this file if you need to modify legal terms.

## Environment Setup (Vercel)

Configure environment variables in your Vercel project settings (Settings → Environment Variables). Add the following:

- `OPENAI_API_KEY` - Required for AI model and moderation
- `EXA_API_KEY` - Optional, for web search functionality
- `PINECONE_API_KEY` - Optional, for vector database search

**Where to get API keys:**

- **OpenAI**: https://platform.openai.com/api-keys (required)
- **Exa**: https://dashboard.exa.ai/ (optional)
- **Pinecone**: https://app.pinecone.io/ (optional)

**Note**: Only `OPENAI_API_KEY` is strictly required. The others enable additional features.

## Customization Guide

### Changing the AI's Name and Identity

1. Open `config.ts`
2. Modify `AI_NAME` and `OWNER_NAME`
3. Update `WELCOME_MESSAGE` if desired
4. Commit and push changes to trigger a new Vercel deployment

### Adjusting AI Behavior

1. Open `prompts.ts`
2. Edit the relevant prompt section:
   - `TONE_STYLE_PROMPT` - Change communication style
   - `GUARDRAILS_PROMPT` - Modify safety rules
   - `TOOL_CALLING_PROMPT` - Adjust when tools are used
   - `CITATIONS_PROMPT` - Change citation format
3. Commit and push changes to trigger a new Vercel deployment

### Customizing Moderation Messages

1. Open `config.ts`
2. Find the `MODERATION_DENIAL_MESSAGE_*` constants
3. Update the messages to match your brand voice
4. These messages appear when content is flagged

### Changing the AI Model

1. Open `config.ts`
2. Modify the `MODEL` export
3. Available models depend on your AI SDK provider (OpenAI)
4. Update API keys in Vercel environment variables if switching providers

### Adding or Removing Tools

Tools are located in `app/api/chat/tools/`. To add a new tool:

1. Create a new file in `app/api/chat/tools/`
2. Import and add it to `app/api/chat/route.ts` in the `tools` object
3. Add UI display logic in `components/messages/tool-call.tsx`
4. Update the tool calling prompt in `prompts.ts` to include instructions for the new tool

## Architecture Overview

The application follows a simple request-response flow:

1. **User sends message** → `app/page.tsx` (UI)
2. **Message sent to API** → `app/api/chat/route.ts`
3. **Content moderation check** → `lib/moderation.ts`
4. **AI processes with tools** → Model uses web search and/or vector search as needed
5. **Response streamed back** → UI displays response in real-time

The AI can autonomously decide to:

- Answer directly
- Search the web for current information
- Search your vector database for stored knowledge
- Combine multiple sources

All responses include citations when sources are used.

## Troubleshooting

### AI not responding

- Verify `OPENAI_API_KEY` is set correctly in Vercel environment variables
- Check browser console for error messages
- Ensure the API key has sufficient credits/quota
- Check Vercel deployment logs for errors

### Web search not working

- Verify `EXA_API_KEY` is set in Vercel environment variables
- Check Exa API dashboard for usage limits
- Tool will gracefully fail if API key is missing

### Vector search not working

- Verify `PINECONE_API_KEY` is set in Vercel environment variables
- Check that `PINECONE_INDEX_NAME` in `config.ts` matches your Pinecone index
- Ensure your Pinecone index exists and has data

### Deployment issues

- Check Vercel deployment logs for build errors
- Verify all environment variables are set in Vercel project settings
- Ensure your Vercel project is connected to the correct Git repository

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (free tier works)
- An OpenAI API key

### Local Development

1. Clone the repository:
```bash
   git clone <your-repo-url>
   cd MB-AI
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env.local` file based on `env.template`:
```bash
   cp env.template .env.local
```

4. Add your API keys to `.env.local`

5. Run the development server:
```bash
   npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## Next Steps

1. **Customize branding**: Update `config.ts` with your name and AI assistant name

2. **Adjust prompts**: Modify `prompts.ts` to match your use case and tone

3. **Set up knowledge base**: Configure Pinecone and upload your documents (optional)

4. **Test moderation**: Verify moderation messages match your needs

5. **Deploy**: Push to GitHub and deploy via Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI SDK**: Vercel AI SDK
- **AI Model**: OpenAI GPT-4o-mini
- **Web Search**: Exa API
- **Vector Database**: Pinecone
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## License

[Add your license here]

## Support

For technical questions or issues, please open an issue on GitHub.

---

**Remember**: Most customization happens in `config.ts` and `prompts.ts`. Start there!
