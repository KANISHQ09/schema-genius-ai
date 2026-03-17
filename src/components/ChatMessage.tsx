import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "" : ""}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
          isUser ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {isUser ? "You" : "NextCraft AI"}
        </p>
        <div className="prose prose-sm prose-invert max-w-none text-sm text-foreground [&_p]:leading-relaxed [&_p]:mb-2">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
