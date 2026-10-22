import { createElement } from "react";
import { BounceLoading } from "respinner";
import { useNavigate } from "react-router-dom";

export default function WalletCard({
  icon: Icon,
  label,
  type,
  value,
  amount,
  loading,
  iconColor = "text-yellow-400",
}) {
  const navigate = useNavigate();
  const isDisabled = type && (amount ?? 0) < 10;

  const handleRedeem = () => {
    if (isDisabled) return;
    if (type) {
      navigate(`/redeem?type=${type}`);
    } else {
      navigate("/redeem");
    }
  };

  return (
    <div
      className="
        relative rounded-lg border border-bw-line bg-white p-5
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        {createElement(Icon, { className: `text-xl ${iconColor}` })}
        <span className="text-sm font-semibold tracking-wide text-bw-muted">
          {label}
        </span>
      </div>

      {/* Value + Redeem Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="font-extrabold text-lg tracking-wide text-bw-ink">
          {loading ? <BounceLoading fill="#f9ce36" barHeight={12} /> : value}
        </div>

        {type && (
          <button
            onClick={handleRedeem}
            disabled={isDisabled}
            className={`
              ml-3 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide
              transition-colors
              ${
                isDisabled
                  ? "bg-bw-page text-bw-muted cursor-not-allowed"
                  : "bg-bw-green text-white cursor-pointer hover:bg-bw-green-dark"
              }
            `}
          >
            Redeem
          </button>
        )}
      </div>
    </div>
  );
}
