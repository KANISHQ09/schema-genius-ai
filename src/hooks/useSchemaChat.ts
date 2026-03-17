import { useState, useCallback } from "react";
import type { ChatMessage, SchemaResult } from "@/types/schema";

// Mock schema generation for now — will be replaced by AI edge function
function generateMockSchema(input: string): SchemaResult {
  return {
    collections: [
      {
        name: "users",
        schema: JSON.stringify({
          _id: "ObjectId",
          email: "String (unique)",
          name: "String",
          passwordHash: "String",
          createdAt: "Date",
          updatedAt: "Date",
        }, null, 2),
        mongoose_model: `const userSchema = new Schema({\n  email: { type: String, required: true, unique: true },\n  name: { type: String, required: true },\n  passwordHash: { type: String, required: true },\n}, { timestamps: true });\n\nmodule.exports = mongoose.model('User', userSchema);`,
      },
      {
        name: "posts",
        schema: JSON.stringify({
          _id: "ObjectId",
          title: "String",
          content: "String",
          authorId: "ObjectId (ref: users)",
          tags: "String[]",
          comments: "[{ userId: ObjectId, text: String, createdAt: Date }]",
          createdAt: "Date",
        }, null, 2),
        mongoose_model: `const postSchema = new Schema({\n  title: { type: String, required: true },\n  content: { type: String, required: true },\n  authorId: { type: Schema.Types.ObjectId, ref: 'User' },\n  tags: [String],\n  comments: [{\n    userId: { type: Schema.Types.ObjectId, ref: 'User' },\n    text: String,\n    createdAt: { type: Date, default: Date.now }\n  }]\n}, { timestamps: true });\n\nmodule.exports = mongoose.model('Post', postSchema);`,
      },
    ],
    explanations: [
      {
        title: "Comments Embedded in Posts",
        decision: "Embed comments as a subdocument array within posts.",
        reasoning: "Comments are always read alongside posts. The typical cardinality is low-to-medium (< 100 comments per post). Embedding avoids an extra query and keeps the read path fast.",
        alternatives: "A separate comments collection with postId reference. Better if comments exceed thousands per post or need independent querying.",
      },
      {
        title: "Author Referenced, Not Embedded",
        decision: "Store authorId as a reference to the users collection.",
        reasoning: "User data (name, email) changes independently and is shared across many posts. Embedding would cause data duplication and update anomalies.",
        alternatives: "Embed a denormalized { authorName, authorId } snapshot for read optimization, with a background sync process.",
      },
    ],
    indexes: [
      {
        collection: "users",
        fields: '{ email: 1 }',
        type: "unique",
        reasoning: "Email lookups are the primary authentication query. A unique index enforces data integrity and speeds up login.",
      },
      {
        collection: "posts",
        fields: '{ authorId: 1, createdAt: -1 }',
        type: "compound",
        reasoning: "Supports the common query pattern: 'get all posts by a user, most recent first.'",
      },
      {
        collection: "posts",
        fields: '{ tags: 1 }',
        type: "multikey",
        reasoning: "Enables efficient filtering of posts by tag for browse/discovery features.",
      },
    ],
  };
}

export function useSchemaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schemaResult, setSchemaResult] = useState<SchemaResult | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = generateMockSchema(content);
    setSchemaResult(result);

    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: `I've analyzed your requirements and generated an optimized MongoDB schema with **${result.collections.length} collections**, **${result.explanations.length} design decisions**, and **${result.indexes.length} index recommendations**.\n\nCheck the tabs on the right to explore:\n- **Schema** — Copyable collection structures and Mongoose models\n- **Explanation** — Reasoning behind each design decision\n- **Indexes** — Recommended indexes for your query patterns\n\nFeel free to refine your requirements or ask follow-up questions!`,
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, schemaResult, sendMessage };
}
