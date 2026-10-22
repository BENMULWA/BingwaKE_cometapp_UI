import { FiShield, FiSmartphone, FiZap } from "react-icons/fi";
import Wordmark from "../../components/brand/Wordmark";

const POINTS = [
  { icon: <FiSmartphone size={13} />, label: "Deposit and withdraw with M-Pesa" },
  { icon: <FiZap size={13} />, label: "Instant virtuals, Aviator and jackpot" },
  { icon: <FiShield size={13} />, label: "Safe, licensed and responsible play" },
];

export default function AuthBrandPanel({
  title = "More than a bet. It’s a win.",
  subtitle = "Kenyan players trust Bingwake for fast games, real payouts and simple M-Pesa banking.",
}) {
  return (
    <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-bw-green p-8 md:flex lg:p-10">
      <div className="flex items-center gap-2">
        <img
          src="/bingwake-mark.svg"
          alt=""
          className="h-11 w-12 flex-shrink-0 object-contain"
        />
        <Wordmark tone="light" size="lg" tagline />
      </div>

      <div className="max-w-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-bw-teal">
          Kenya’s home of instant wins
        </p>
        <h2 className="mt-3 max-w-xs font-display text-3xl font-bold leading-tight text-white">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{subtitle}</p>

        <ul className="mt-7 space-y-3">
          {POINTS.map(({ icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-white/85">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-bw-teal">
                {icon}
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-medium text-white/50">
        <span className="h-1.5 w-1.5 rounded-full bg-bw-yellow" />
        Licensed by BCLB · 18+ only · Play responsibly
      </div>
    </div>
  );
}
