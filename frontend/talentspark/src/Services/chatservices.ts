import axios from "axios";
import type { ChatResponse } from "../types/chat";

export const sendChatMessage = async (
  message: string,
  token: string
): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>(
    "http://localhost:8000/chat",
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};