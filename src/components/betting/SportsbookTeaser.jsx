import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function SportsbookTeaser() {
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-md bg-bw-green px-4 py-4 text-white sm:flex-row sm:items-center">
      <div className="min-w-0">
        <span className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-bw-yellow">
          Coming soon
        </span>
        <h3 className="mt-1.5 text-[17px] font-extrabold tracking-[-0.01em]">
          Sports betting is coming to Bingwake
        </h3>
        <p className="mt-0.5 max-w-lg text-[11px] leading-relaxed text-white/70">
          Pre-match and live markets across the top leagues. Until then, virtual
          football runs every three minutes.
        </p>
      </div>
      <Link
        to="/sports"
        className="flex flex-shrink-0 items-center gap-1.5 rounded bg-white px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-bw-green transition-colors hover:bg-bw-green-soft"
      >
        Learn more <FiArrowRight size={13} />
      </Link>
    </div>
  );
}
