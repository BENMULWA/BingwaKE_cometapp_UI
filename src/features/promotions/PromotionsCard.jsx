import { useNavigate } from "react-router-dom";
import { FaGift, FaUsers, FaCoins, FaPlane, FaTrophy } from "react-icons/fa";

const THEMES = {
  registration: { bg: "bg-bw-green", icon: FaGift, label: "Welcome offer" },
  refer: { bg: "bg-bw-green-dark", icon: FaUsers, label: "Refer a friend" },
  "daily-cashback": { bg: "bg-bw-green", icon: FaCoins, label: "Daily reward" },
  "aviator-daily": { bg: "bg-bw-green-dark", icon: FaPlane, label: "Aviator" },
  "aviator-challenges": { bg: "bg-bw-green", icon: FaTrophy, label: "Challenges" },
};

function PromotionsCard({ id, title, description }) {
  const theme = THEMES[id] || THEMES.registration;
  const Icon = theme.icon;
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-bw-line rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col">
      {/* Branded banner */}
      <div className={`relative flex h-44 flex-col justify-between overflow-hidden p-5 ${theme.bg}`}>
        <div className="flex items-center justify-between">
          <img src="/bingwake-mark.svg" alt="" className="h-8 w-9 object-contain" />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
            Bingwake promo
          </span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-bw-yellow">
              {theme.label}
            </p>
            <h2 className="mt-1 text-xl font-bold leading-tight text-white">{title}</h2>
          </div>
          <Icon className="mb-1 text-3xl text-white/25" />
        </div>
      </div>

      {/* Text Content */}
      <div className="p-5 flex flex-col flex-1">
        {description && (
          <p className="text-bw-muted text-sm mt-2 leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <div className="p-5 pt-0">
        <button
          onClick={() => navigate(`/promotions/${id}`)}
          className="w-full bg-bw-yellow text-bw-ink font-bold py-2.5 rounded-md hover:bg-[#e8ae00] transition-colors"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default PromotionsCard;
