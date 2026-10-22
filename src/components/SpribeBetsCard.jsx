import { memo } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import BaseClass from "../services/BaseClass";

const SpribeBetsCard = memo(function SpribeBetsCard({ src, title, gameName, linkToPath }) {
  const baseClass = new BaseClass();
  const game = gameName || title?.toLowerCase();
  const linkTo = baseClass.userId ? (linkToPath || `/${game}`) : `/login`;

  return (
    <Link to={linkTo} className="block w-full">
      <div className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded border border-bw-line bg-white transition-shadow hover:shadow-md">
        {/* Image Section */}
        <div className="relative aspect-square w-full overflow-hidden bg-bw-page">
          <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] font-bold uppercase tracking-wide text-bw-green/70">{title || game}</span>
          <img
            src={src}
            alt={title || game}
            loading="lazy"
            className="relative block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {/* Default Dark Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/35"></div>
          
          {/* Play Icon Container (shows on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/85 flex items-center justify-center">
               <FaPlay className="text-bw-ink text-xl md:text-2xl ml-1 shadow-black/50" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default SpribeBetsCard;
