// src/app/api/generate-schema/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configure the AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Define the exact JSON schema we want the AI to return
const responseSchema = {
  type: "object",
  properties: {
    collections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          schema: { type: "string" },
          mongoose_model: { type: "string" },
        },
        required: ["name", "schema", "mongoose_model"],
      },
    },
    explanations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          decision: { type: "string" },
          reasoning: { type: "string" },
          alternatives: { type: "string" },
        },
        required: ["title", "decision", "reasoning"],
      },
    },
    indexes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          collection: { type: "string" },
          fields: { type: "string" },
          type: { type: "string" },
          reasoning: { type: "string" },
        },
        required: ["collection", "fields", "type", "reasoning"],
      },
    },
  },
  required: ["collections", "explanations", "indexes"],
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

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

    const result = await model.generateContent(`${systemInstruction}\n\nUser Requirements: ${prompt}`);
    const schemaData = JSON.parse(result.response.text());

    return new Response(JSON.stringify(schemaData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error("Schema generation failed:", error);
    return new Response(JSON.stringify({ error: "Failed to generate schema" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}