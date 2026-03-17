export interface Collection {
  name: string;
  schema: string;
  mongoose_model?: string;
}

export interface Explanation {
  title: string;
  decision: string;
  reasoning: string;
  alternatives?: string;
}

export interface IndexRecommendation {
  collection: string;
  fields: string;
  type: string;
  reasoning: string;
}

export interface SchemaResult {
  collections: Collection[];
  explanations: Explanation[];
  indexes: IndexRecommendation[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
