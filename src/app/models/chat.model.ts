export interface ChatRequest {
  message: string;
  model: string;
  temperature: number;
}

export interface ChatResponse {
  response?: string;
  message?: string;
  error?: string;
}

