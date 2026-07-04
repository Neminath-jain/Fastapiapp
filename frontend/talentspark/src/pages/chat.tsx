import { useState, type FormEvent } from "react";
import { sendChatMessage } from "../Services/chatservices";
import type { ChatResponse } from "../types/chat";

type Props = { token: string };

function Chat({ token }: Props) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const result = await sendChatMessage(message, token);
      setReply(result.reply);
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Chat error");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      {reply && <p>Reply: {reply}</p>}
    </div>
  );
}

export default Chat;