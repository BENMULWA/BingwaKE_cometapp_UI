import { useState } from "react";
import { Link } from "react-router-dom";

export default function GameTile({ game, to, badge }) {
  const [imageState, setImageState] = useState("loading");
  const title = game?.game_name || game?.title || "Game";
  const image = game?.thumbnail || game?.image || "/virtuals.webp";

  return (
    <Link to={to} className="group block min-w-0">
      <div className="relative overflow-hidden rounded border border-bw-line bg-white">
        <div className="bw-tile-image relative aspect-[16/10] w-full overflow-hidden">
          {imageState !== "loaded" && (
            <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-bold uppercase tracking-wide text-bw-green/70">
              {title}
            </span>
          )}

          {imageState !== "error" && (
            <img
              src={image}
              alt={title}
              onLoad={() => setImageState("loaded")}
              onError={() => setImageState("error")}
              className={`relative h-full w-full object-cover transition-all duration-200 group-hover:scale-[1.03] ${
                imageState === "loaded" ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        {badge && (
          <span className="absolute left-1.5 top-1.5 rounded-sm bg-bw-yellow px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-bw-ink">
            {badge}
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-bw-green/95 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition-transform duration-200 group-hover:translate-y-0">
          Play now
        </span>
      </div>

      <div className="mt-1.5 min-w-0">
        <p className="truncate text-[12px] font-semibold leading-tight text-bw-ink">
          {title}
        </p>
        <p className="mt-0.5 truncate text-[10px] text-bw-muted">EuroVirtuals</p>
      </div>
    </Link>
  );
}
