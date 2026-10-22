import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiAward, FiClock } from "react-icons/fi";

import { useActiveJackpotDraw } from "../../hooks/useJackpot";
import { formatKES } from "../../features/jackpot/jackpotUtils";

function useCountdown(target) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!target) return undefined;

    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      if (diff === 0) {
        setLabel("Closed");
        return;
      }
      const minutes = Math.floor(diff / 60000);
      const days = Math.floor(minutes / (60 * 24));
      const hours = Math.floor((minutes % (60 * 24)) / 60);
      const mins = minutes % 60;
      setLabel(days > 0 ? `${days}d ${hours}h left` : `${hours}h ${mins}m left`);
    };

    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, [target]);

  return label;
}

export default function JackpotCard() {
  const { activeDraw } = useActiveJackpotDraw();
  const prize = activeDraw?.prizes?.seven;
  const countdown = useCountdown(activeDraw?.closesAt);
  const hasDraw = Boolean(activeDraw);

  return (
    <div className="flex h-full flex-col justify-between rounded-md bg-bw-green-dark p-3.5 text-white sm:p-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-bw-yellow text-bw-ink">
              <FiAward size={12} />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-bw-yellow">
              Bingwake Jackpot
            </span>
          </div>
          <span className="rounded-sm border border-white/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/65">
            7 matches
          </span>
        </div>

        <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
          {hasDraw ? "This week's top prize" : "Next draw"}
        </p>
        <p className="num mt-1 text-[24px] font-extrabold leading-none tracking-[-0.02em] sm:text-[30px]">
          {hasDraw ? formatKES(prize) : "Coming soon"}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/65">
          {hasDraw ? (
            <>
              <span className="flex items-center gap-1">
                <FiClock size={11} />
                {countdown || "Open"}
              </span>
              <span className="text-white/25">|</span>
              <span>Ticket {formatKES(activeDraw?.betAmount)}</span>
            </>
          ) : (
            <span>Pick all 7 results. One ticket, one big payout.</span>
          )}
        </div>
      </div>

      <div className="mt-2.5">
        <Link
          to="/jackpot"
          className="flex w-full items-center justify-center rounded bg-bw-yellow py-2 text-[11px] font-extrabold uppercase tracking-wide text-bw-ink transition-colors hover:brightness-95"
        >
          {hasDraw ? "Play jackpot" : "View jackpot"}
        </Link>
        <p className="mt-1.5 hidden text-center text-[9px] text-white/40 sm:block">
          18+ · Predict 7 football results
        </p>
      </div>
    </div>
  );
}
