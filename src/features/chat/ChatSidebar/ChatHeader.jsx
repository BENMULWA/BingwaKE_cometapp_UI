import { FiX } from "react-icons/fi";
import { MdKeyboardTab } from "react-icons/md";
import { useChatContext } from "../../../context/ChatProvider";

export default function ChatHeader({ onClose, collapsed, onToggleCollapse }) {
  const { activeUsers } = useChatContext();
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-bw-green h-16 border-l border-white/10">
      {/* Language Selector */}
      <h1 className="font-bold text-white">
        {" "}
        Let's Chat • {activeUsers} Online
      </h1>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-2 rounded-md border border-white/20 cursor-pointer hover:bg-white/10"
        >
          {collapsed ? (
            <MdKeyboardTab className="text-xl text-white rotate-180" />
          ) : (
            <MdKeyboardTab className="text-xl text-white" />
          )}
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="p-2 rounded-md border border-white/20 hover:bg-white/10"
        >
          <FiX className="text-xl text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
