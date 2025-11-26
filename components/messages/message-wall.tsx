import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";
import { CollegeCompare } from "@/components/CollegeCompare";

export function MessageWall({
  messages,
  status,
  durations,
  onDurationChange,
  onSend, // <-- NEW
}: {
  messages: UIMessage[];
  status?: string;
  durations?: Record<string, number>;
  onDurationChange?: (key: string, duration: number) => void;
  onSend?: (content: string) => void; // <-- NEW
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative max-w-3xl w-full">
      <div className="relative flex flex-col gap-4">
        {messages.map((message, messageIndex) => {
          const firstPart = message.parts?.[0];
          const isLastMessage = messageIndex === messages.length - 1;

          // 🔥 SPECIAL INLINE DROPDOWN MESSAGE
          if (
            message.role === "assistant" &&
            firstPart?.type === "data" &&
            (firstPart as any).data?.kind === "compare-ui"
          ) {
            const defaults = (firstPart as any).data?.defaults || {};

            return (
              <div key={message.id} className="w-full">
                <CollegeCompare
                  defaults={defaults}
                  onSend={(content) => onSend?.(content)}
                />
              </div>
            );
          }

          // 📍 NORMAL USER / ASSISTANT MESSAGES
          return (
            <div key={message.id} className="w-full">
              {message.role === "user" ? (
                <UserMessage message={message} />
              ) : (
                <AssistantMessage
                  message={message}
                  status={status}
                  isLastMessage={isLastMessage}
                  durations={durations}
                  onDurationChange={onDurationChange}
                />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
