import { useEffect, useRef } from "react";
import { useChatContext } from "../../../context/ChatProvider";
import ChatMessage from "./ChatMessage";

export default function ChatMessageList() {
  const { messages } = useChatContext();
  const bottomRef = useRef(null);
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
      {messages.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <img src="/bingwake-mark.svg" alt="" className="h-12 w-14 object-contain" />
          <p className="mt-3 text-sm font-bold text-bw-ink">Bingwake Support</p>
          <p className="mt-1 text-xs leading-relaxed text-bw-muted">
            Send us a message and our team will get back to you.
          </p>
        </div>
      )}
      {messages.map((msg, i) => (
        <ChatMessage
          key={i}
          avatar={msg.avatar}
          user={msg.senderUsername}
          text={msg.content}
          time={formatTime(msg.createdAt)}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
