import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const popularGames = [
  { name: "Aviator", route: "/aviator" },
];

export default function DepositHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Check if a game is currently being played
  const isPlaying = (route) => location.pathname === route;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGameSelect = (route) => {
    setDropdownOpen(false);
    navigate(route);
  };

  return (
    <>
      <header className="relative z-10 h-10 bg-white border-b border-bw-line text-bw-ink flex items-center select-none">
        {/* Left - Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="h-10 w-12 cursor-pointer flex items-center justify-center bg-bw-page text-bw-ink border-r border-bw-line focus:outline-none"
          aria-label="Go back"
        >
          &larr;
        </button>

        {/* Center - Deposit */}
        <button
          type="button"
          onClick={() => navigate("/deposit")}
          className="flex-1 h-full cursor-pointer flex items-center justify-center font-medium text-sm text-bw-ink"
        >
          Deposit
        </button>

        {/* Right - Games Dropdown */}
        <div ref={dropdownRef} className="relative h-10 flex items-center px-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            className="h-7 px-3 cursor-pointer flex items-center gap-1.5 bg-bw-green text-white rounded-full focus:outline-none text-xs font-semibold shadow-sm hover:bg-bw-green-dark transition"
            aria-label="Select game"
          >
            Games
            <IoChevronDown
              size={12}
              className={`transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-bw-line rounded-md shadow-lg z-50 p-1.5 ">
              <div className="max-h-72 overflow-y-auto no-scrollbar">
                {popularGames.map((game) => {
                  const playing = isPlaying(game.route);
                  return (
                    <button
                      key={game.route}
                      type="button"
                      onClick={() => !playing && handleGameSelect(game.route)}
                      className={`w-full px-3 py-2.5 text-left text-[13px] rounded-md transition-all duration-150 flex items-center justify-between group ${
                        playing
                          ? "bg-primary/10 text-primary cursor-default"
                          : "text-bw-ink hover:bg-bw-yellow hover:text-bw-ink cursor-pointer"
                      }`}
                    >
                      <span className="font-semibold">{game.name}</span>
                      <span
                        className={`text-[10px] font-medium ${
                          playing
                            ? "text-green-700"
                            : "text-primary/60 group-hover:text-bw-ink/60"
                        }`}
                      >
                        {playing ? "PLAYING" : "PLAY"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
