import axios from "axios";
import type { ChatRequest, ChatResponse } from "../types/chat";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/chatbot/chat`;

export const sendChatMessage = async (body: ChatRequest): Promise<ChatResponse> => {
  const resp = await axios.post<ChatResponse>(API_URL, body);
  return resp.data;
};