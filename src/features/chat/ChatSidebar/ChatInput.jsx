import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useChatContext } from "../../../context/ChatProvider";

export default function ChatInput() {
  const { sendMessage, emitTyping, emitStopTyping } = useChatContext();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");
    emitStopTyping();
  };

  return (
    <div className="md:px-4 px-2 pt-3 pb-2 border-t border-bw-line bg-white md:pb-4">
      <div className="flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            emitTyping();
          }}
          onBlur={emitStopTyping}
          placeholder="Enter a message"
          className="
            flex-1 bg-bw-page text-bw-ink
            placeholder:text-bw-muted
            px-4 py-2 rounded-md border border-bw-line
            outline-none
          "
        />

        <button
          onClick={handleSend}
          className="
            w-10 h-10 rounded-md bg-bw-green
            flex items-center justify-center
            hover:bg-bw-green-dark transition-colors
          "
        >
          <RiSendPlane2Fill className="text-white text-xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
