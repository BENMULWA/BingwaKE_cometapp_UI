export default function ChatFooterLinks({ onOpenRules }) {
  return (
    <div className="flex justify-between text-xs px-5 py-2 text-bw-muted  bg-white border-t border-bw-line">
      <h3
        onClick={onOpenRules}
        className="text-xs font-semibold text-bw-green cursor-pointer hover:underline"
      >
        Chat Rules
      </h3>
    </div>
  );
}
