// src/hooks/useSchemaChat.ts
import { useState, useCallback } from "react";
import type { ChatMessage, SchemaResult } from "@/types/schema";

export function useSchemaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemaResult, setSchemaResult] = useState<SchemaResult | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { role: "user", content };
    // Keep track of the updated messages array to send context if needed
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call your AI Edge Function
      const response = await fetch('/api/generate-schema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate schema');
      }

      // The AI should return a JSON object that matches the SchemaResult type
      const result: SchemaResult = await response.json();
      setSchemaResult(result);

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: `I've analyzed your requirements and generated an optimized MongoDB schema with **${result.collections.length} collections**, **${result.explanations.length} design decisions**, and **${result.indexes.length} index recommendations**.\n\nCheck the tabs on the right to explore:\n- **Schema** — Copyable collection structures and Mongoose models\n- **Explanation** — Reasoning behind each design decision\n- **Indexes** — Recommended indexes for your query patterns\n\nFeel free to refine your requirements or ask follow-up questions!`,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Generation Error:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while generating your schema. Please try again or refine your prompt.",
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, schemaResult, sendMessage };
}
