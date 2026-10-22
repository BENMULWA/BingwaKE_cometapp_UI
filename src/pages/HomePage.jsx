import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiChevronRight } from "react-icons/fi";

import GameTile from "../components/betting/GameTile";
import HomeFooter from "../components/betting/HomeFooter";
import JackpotCard from "../components/betting/JackpotCard";
import PromoCarousel from "../components/betting/PromoCarousel";
import QuickActions from "../components/betting/QuickActions";
import SectionHeader from "../components/betting/SectionHeader";
import SportsbookTeaser from "../components/betting/SportsbookTeaser";
import { buildEuroVirtualGames } from "../features/games/virtualGameCatalog";
import { useGames } from "../hooks/useGames";
import BaseClass from "../services/BaseClass";

const FILTERS = [
  { id: "all", label: "All games" },
  { id: "football", label: "Virtual football" },
  { id: "crash", label: "Crash" },
  { id: "jackpot", label: "Jackpot" },
];

const matchesFilter = (game, filter) => {
  if (filter === "all") return true;
  const name = String(game.game_name || game.title || "").toLowerCase();
  if (filter === "crash") return name.includes("aviator") || name.includes("crash");
  if (filter === "jackpot") return name.includes("jackpot");
  return (
    name.includes("league") ||
    name.includes("football") ||
    name.includes("world cup")
  );
};

function GamesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[16/10] rounded border border-bw-line bg-bw-green-soft" />
          <div className="mt-1.5 h-2.5 w-3/4 rounded bg-bw-line" />
          <div className="mt-1 h-2 w-1/3 rounded bg-bw-line/70" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const base = new BaseClass();
  const { games = [], isLoading } = useGames();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const id = window.location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, []);

  const euroVirtualGames = useMemo(() => buildEuroVirtualGames(games), [games]);

  const orderedGames = useMemo(() => {
    const preferred = [
      "aviator",
      "euro league",
      "instant football epl",
      "virtual jackpot",
      "swift league",
      "betin league",
      "euro world cup",
      "euro crash",
    ];
    const rank = (game) => {
      const name = String(game.game_name || game.title || "").toLowerCase();
      const index = preferred.findIndex((item) => name.includes(item));
      return index === -1 ? preferred.length : index;
    };
    return [...euroVirtualGames].sort((a, b) => rank(a) - rank(b));
  }, [euroVirtualGames]);

  const visibleGames = useMemo(
    () => orderedGames.filter((game) => matchesFilter(game, filter)),
    [orderedGames, filter],
  );

  const popularGames = new Set(["Aviator", "Euro League", "Virtual Jackpot"]);

  const destinationFor = (game) =>
    base.isAuthenticated()
      ? game.linkPath || `/virtual/${game.game_uuid}`
      : "/login";

  return (
    <div className="bw-page min-h-full pb-14 md:pb-0">
      <div className="mx-auto w-full max-w-[1400px] px-3 pt-3 sm:px-4">
        {/* Promo + jackpot */}
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
          <PromoCarousel />
          <div className="hidden xl:block">
            <JackpotCard />
          </div>
        </div>

        <div className="mt-3 xl:hidden">
          <JackpotCard />
        </div>

        {/* Wallet shortcuts */}
        <div className="mt-3">
          <QuickActions />
        </div>

        {/* Game catalog */}
        <section id="virtuals" className="mt-5 scroll-mt-[120px]">
          <SectionHeader
            title="Virtual games"
            subtitle={`${euroVirtualGames.length} games · a new round every few minutes`}
          />

          <div className="bw-scroll -mx-3 mb-3 flex gap-1.5 overflow-x-auto px-3 sm:mx-0 sm:px-0">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`flex-shrink-0 rounded border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  filter === item.id
                    ? "border-bw-green bg-bw-green text-white"
                    : "border-bw-line bg-white text-bw-muted hover:border-bw-green/40 hover:text-bw-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <GamesSkeleton />
          ) : visibleGames.length === 0 ? (
            <div className="rounded border border-dashed border-bw-line bg-white px-4 py-8 text-center">
              <p className="text-[13px] font-semibold text-bw-ink">No games in this category</p>
              <p className="mt-1 text-[11px] text-bw-muted">Try another filter or check back shortly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {visibleGames.map((game) => {
                const name = game.game_name || game.title || "";
                return (
                  <GameTile
                    key={game.game_uuid || game._id || game.game_name}
                    game={game}
                    to={destinationFor(game)}
                    badge={
                      filter === "all" && popularGames.has(name)
                        ? "Popular"
                        : undefined
                    }
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Sportsbook placeholder */}
        <div className="mt-5">
          <SportsbookTeaser />
        </div>

        {/* Trust strip */}
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            "Deposit and withdraw with M-Pesa",
            "Wallet protected with phone verification",
            "Support available every day",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded border border-bw-line bg-white px-3 py-2"
            >
              <FiCheckCircle size={14} className="flex-shrink-0 text-bw-green" />
              <span className="text-[11px] font-medium text-bw-ink">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded border border-bw-line bg-white px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-bw-ink">Need help getting started?</p>
            <p className="text-[10px] text-bw-muted">Read the game rules or talk to support.</p>
          </div>
          <Link
            to="/support"
            className="flex flex-shrink-0 items-center gap-1 text-[11px] font-bold text-bw-green hover:underline"
          >
            Support <FiChevronRight size={13} />
          </Link>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}
