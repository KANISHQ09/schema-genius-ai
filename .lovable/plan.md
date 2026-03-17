
# NextCraft — AI-Powered MongoDB Schema Designer

## Overview
A dark-themed developer tool where users describe their application in natural language and receive optimized MongoDB schema designs with copyable code and detailed explanations.

## Pages & Layout

### 1. Landing Page
- Dark hero section with tagline: "Design MongoDB Schemas with AI"
- Feature highlights (NLP input, schema generation, index recommendations, explainable decisions)
- CTA → "Start Designing" (goes to workspace)
- Optional sign-in link in navbar

### 2. Schema Workspace (Main App)
- **Left Panel**: Chat-style input where users describe their app (entities, relationships, queries, access patterns)
- **Right Panel**: Generated output with tabs:
  - **Schema Tab**: Copyable JSON/Mongoose schema code blocks with syntax highlighting
  - **Explanation Tab**: Cards explaining each design decision (embed vs reference rationale, cardinality analysis, update frequency considerations)
  - **Indexes Tab**: Recommended indexes with reasoning
- Users can iterate — refine requirements in chat, AI updates schemas

### 3. Saved Schemas (requires auth)
- List of previously generated schemas
- Click to reload into workspace

## AI Integration
- Lovable Cloud edge function calling Lovable AI (Gemini) to:
  - Parse natural language into entities/relationships
  - Generate MongoDB collection schemas
  - Decide embedding vs referencing with reasoning
  - Suggest indexes based on described query patterns
  - Return structured output via tool calling

## Key Features
- **Conversational Input**: Multi-turn chat to refine requirements
- **Copyable Code Output**: One-click copy for JSON schemas and Mongoose models
- **Decision Explanation Cards**: Each card shows the decision, reasoning, and alternatives considered
- **Index Recommendations**: Visual display of suggested indexes with compound index notation
- **Schema History**: Save and revisit designs (with optional auth via Supabase)

## Design
- Dark developer theme (dark grays/blacks, code-editor aesthetic)
- Monospace fonts for code, clean sans-serif for UI
- Green/teal accent colors for interactive elements
- Syntax-highlighted code blocks

## Auth
- App works without login
- Optional Supabase auth (email/password) to save schemas

## Tech
- React + Tailwind + shadcn/ui (frontend)
- Lovable Cloud with edge functions (backend)
- Lovable AI / Gemini for schema generation
- Supabase for auth + saved schemas storage
