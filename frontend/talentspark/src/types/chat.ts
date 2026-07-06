export interface ChatResponse {
  session_id: string;
  reply: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
}