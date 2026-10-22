import { FiMessageCircle } from "react-icons/fi";

export default function FloatingActions({ onOpenChat }) {
  return (
    <div className="fixed bottom-20 right-3 z-40 md:bottom-6 md:right-5">
      <button
        type="button"
        onClick={onOpenChat}
        aria-label="Open support chat"
        className="relative flex h-12 items-center gap-2 rounded-full bg-bw-green px-3.5 text-white shadow-[0_6px_18px_rgba(10,93,52,0.25)] transition-colors hover:bg-bw-green-dark"
      >
        <FiMessageCircle size={19} />
        <span className="hidden text-[11px] font-bold sm:block">Support</span>
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-white bg-bw-yellow px-1 text-[8px] font-extrabold text-bw-ink">
          24/7
        </span>
      </button>
    </div>
  );
}
