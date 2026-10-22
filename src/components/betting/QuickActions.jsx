import { Link } from "react-router-dom";
import { FiAward, FiArrowUpRight, FiPlus, FiUsers } from "react-icons/fi";

import BaseClass from "../../services/BaseClass";

const actions = [
  { label: "Deposit", hint: "Instant", icon: FiPlus, to: "/deposit", requiresAuth: true, tone: "green" },
  { label: "Withdraw", hint: "To M-Pesa", icon: FiArrowUpRight, to: "/withdraw", requiresAuth: true, tone: "yellow" },
  { label: "Jackpot", hint: "7 matches", icon: FiAward, to: "/jackpot", tone: "green" },
  { label: "Refer", hint: "Earn bonus", icon: FiUsers, to: "/refer", requiresAuth: true, tone: "yellow" },
];

export default function QuickActions() {
  const base = new BaseClass();

  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const destination = action.requiresAuth && !base.isAuthenticated() ? "/login" : action.to;

        return (
          <Link
            key={action.label}
            to={destination}
            className="bw-card flex flex-col items-center gap-1.5 px-1 py-2.5 transition-colors hover:border-bw-green/40 sm:flex-row sm:justify-start sm:gap-2.5 sm:px-3 sm:py-2.5"
          >
            <span
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded ${
                action.tone === "green"
                  ? "bg-bw-green-soft text-bw-green"
                  : "bg-bw-yellow/25 text-[#8a6d00]"
              }`}
            >
              <Icon size={15} />
            </span>
            <span className="min-w-0 text-center sm:text-left">
              <span className="block truncate text-[11px] font-bold text-bw-ink">
                {action.label}
              </span>
              <span className="hidden text-[9px] text-bw-muted sm:block">{action.hint}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
