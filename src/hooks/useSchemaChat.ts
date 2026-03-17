// src/hooks/useSchemaChat.ts
import { useState, useCallback } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { ChatMessage, SchemaResult } from "@/types/schema";

// Initialize the Gemini AI client using Vite's import.meta.env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Define the exact JSON schema we want the AI to return
const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    collections: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          schema: { type: SchemaType.STRING },
          mongoose_model: { type: SchemaType.STRING },
        },
        required: ["name", "schema", "mongoose_model"],
      },
    },
    explanations: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          decision: { type: SchemaType.STRING },
          reasoning: { type: SchemaType.STRING },
          alternatives: { type: SchemaType.STRING },
        },
        required: ["title", "decision", "reasoning"],
      },
    },
    indexes: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          collection: { type: SchemaType.STRING },
          fields: { type: SchemaType.STRING },
          type: { type: SchemaType.STRING },
          reasoning: { type: SchemaType.STRING },
        },
        required: ["collection", "fields", "type", "reasoning"],
      },
    },
  },
  required: ["collections", "explanations", "indexes"],
};

export function useSchemaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemaResult, setSchemaResult] = useState<SchemaResult | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Initialize model with JSON response type enforced
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        }
      });

      const systemInstruction = `
        You are an expert MongoDB architect. 
        Analyze the user's application requirements and generate a highly optimized database schema. 
        Ensure Mongoose models use modern syntax and reference relationships properly.
      `;

      // Call the AI
      const result = await model.generateContent(`${systemInstruction}\n\nUser Requirements: ${content}`);
      const responseText = result.response.text();
      
      // Parse the JSON response
      const parsedData: SchemaResult = JSON.parse(responseText);
      setSchemaResult(parsedData);

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: `I've analyzed your requirements and generated an optimized MongoDB schema with **${parsedData.collections.length} collections**, **${parsedData.explanations.length} design decisions**, and **${parsedData.indexes.length} index recommendations**.\n\nCheck the tabs on the right to explore:\n- **Schema** — Copyable collection structures and Mongoose models\n- **Explanation** — Reasoning behind each design decision\n- **Indexes** — Recommended indexes for your query patterns\n\nFeel free to refine your requirements or ask follow-up questions!`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      
    } catch (error) {
      console.error("AI Generation Error:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while generating your schema. Please ensure your API key is correct and try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, schemaResult, sendMessage };
}