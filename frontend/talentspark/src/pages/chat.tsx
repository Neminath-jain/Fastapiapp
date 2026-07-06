import { useState, type FormEvent } from "react";
import { sendChatMessage } from "../Services/chatservices";
import type { ChatRequest } from "../types/chat";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const body: ChatRequest = { message, session_id: sessionId ?? undefined };
      const res = await sendChatMessage(body);
      setReply(res.reply);
      setSessionId(res.session_id);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Chat request failed");
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask something..." />
        <button type="submit">Send</button>
      </form>
      {reply && <div><strong>Reply:</strong> <p>{reply}</p></div>}
    </div>
  );
}

export default ChatPage;