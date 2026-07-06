import axios from "axios";
import type { ChatRequest, ChatResponse } from "../types/chat";

const API_URL = "http://localhost:8000/chatbot/chat";

export const sendChatMessage = async (body: ChatRequest): Promise<ChatResponse> => {
  const resp = await axios.post<ChatResponse>(API_URL, body);
  return resp.data;
};