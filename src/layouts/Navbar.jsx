import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BaseClass from "../services/BaseClass";
import { useSwitchActiveWallet, useUpdateBalance } from "../hooks/usePayment";
import { useLogOut } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Wordmark from "../components/brand/Wordmark";
import {
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSmartphone,
  FiUser,
} from "react-icons/fi";

const PRIMARY_LINKS = [
  { label: "Sports", to: "/sports" },
  { label: "Virtuals", to: "/#virtuals" },
  { label: "Jackpot", to: "/jackpot" },
  { label: "Aviator", to: "/aviator", requiresAuth: true },
  { label: "Promotions", to: "/promotions" },
];

const CATEGORY_LINKS = [
  { label: "Home", to: "/" },
  { label: "Virtuals", to: "/#virtuals" },
  { label: "Aviator", to: "/aviator", requiresAuth: true },
  { label: "Euro League", to: "/virtual/name/euro-league", requiresAuth: true },
  { label: "Instant Football", to: "/virtual/name/instant-football-epl", requiresAuth: true },
  { label: "Betin League", to: "/virtual/name/betin-league", requiresAuth: true },
  { label: "World Cup", to: "/virtual/name/euro-world-cup", requiresAuth: true },
  { label: "Virtual Jackpot", to: "/virtual/name/virtual-jackpot", requiresAuth: true },
  { label: "Jackpot", to: "/jackpot" },
  { label: "Promotions", to: "/promotions" },
];

function BrandMark({ compact = false }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5 sm:gap-2">
      <img
        src="/bingwake-mark.svg"
        alt=""
        className={`flex-shrink-0 object-contain ${compact ? "h-6 w-7 sm:h-7 sm:w-8" : "h-8 w-9"}`}
      />
      <Wordmark
        tone="light"
        size={compact ? "sm" : "md"}
        tagline={!compact}
        className={compact ? "min-w-0" : ""}
      />
    </span>
  );
}

export default function Navbar({ onMenuClick }) {
  const base = new BaseClass();
  const isAuth = base.isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const walletDropdownRef = useRef(null);

  const { balance } = useUpdateBalance();
  const { switchActiveWallet, isLoading: isSwitchingWallet } = useSwitchActiveWallet();
  const { logOutFn } = useLogOut();

  const mainBalance = isAuth
    ? Number(balance?.balance ?? base.user?.balance ?? 0).toFixed(2)
    : null;
  const airtimeBalance = isAuth
    ? Number(balance?.airtimeBalance ?? base.user?.airtimeBalance ?? 0).toFixed(2)
    : null;
  const activeWallet = balance?.activeWallet ?? base.activeWallet ?? "balance";
  const activeBalance = activeWallet === "airtime" ? airtimeBalance : mainBalance;

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target)) {
        setWalletDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkFor = (item) =>
    item.requiresAuth && !isAuth ? "/login" : item.to;

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    if (to.startsWith("/#")) return false;
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const handleHashLink = (event, to) => {
    if (!to.startsWith("/#") || location.pathname !== "/") return;
    event.preventDefault();
    document
      .getElementById(to.slice(2))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWalletSwitch = (wallet) => {
    if (wallet === activeWallet || isSwitchingWallet) return;
    switchActiveWallet(wallet, {
      onSuccess: () => setWalletDropdownOpen(false),
    });
  };

  const handleLogout = () => {
    logOutFn(null, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        navigate("/");
      },
      onError: () => {
        base.clearUser();
        navigate("/");
      },
    });
    setDropdownOpen(false);
  };

  return (
    <header id="main-navbar" className="sticky top-0 z-50 w-full">
      {/* Main bar */}
      <div className="bg-bw-green text-white">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-1 px-2 sm:gap-2 sm:px-3 lg:px-4">
          <button
            type="button"
            onClick={() => onMenuClick?.()}
            aria-label="Open menu"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
          >
            <FiMenu size={20} />
          </button>

          <Link to="/" className="flex min-w-0 items-center" aria-label="Bingwake home">
            <span className="hidden sm:block">
              <BrandMark />
            </span>
            <span className="sm:hidden">
              <BrandMark compact />
            </span>
          </Link>

          <nav className="ml-5 hidden items-stretch self-stretch lg:flex" aria-label="Main">
            {PRIMARY_LINKS.map((item) => (
              <Link
                key={item.label}
                to={linkFor(item)}
                onClick={(event) => handleHashLink(event, item.to)}
                className={`flex items-center border-b-2 px-3 text-[13px] font-semibold transition-colors ${
                  isActive(item.to)
                    ? "border-bw-yellow text-white"
                    : "border-transparent text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => navigate("/search")}
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded text-white/75 transition-colors hover:bg-white/10 hover:text-white md:flex"
            >
              <FiSearch size={18} />
            </button>

            {isAuth ? (
              <>
                {/* Balance + wallet switcher */}
                <div className="relative" ref={walletDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setWalletDropdownOpen((open) => !open)}
                    aria-label={`Wallet balance KES ${activeBalance}`}
                    aria-expanded={walletDropdownOpen}
                    className="flex items-center gap-1 rounded border border-white/20 bg-black/15 px-1.5 py-1.5 transition-colors hover:bg-black/25 sm:gap-1.5 sm:px-2.5"
                  >
                    {activeWallet === "airtime" ? (
                      <FiSmartphone size={13} className="text-bw-yellow" />
                    ) : (
                      <FiCreditCard size={13} className="text-bw-yellow" />
                    )}
                    <span className="num whitespace-nowrap text-[10px] font-bold sm:text-xs">
                      KES {activeBalance}
                    </span>
                    <FiChevronDown
                      size={12}
                      className={`hidden text-white/60 transition-transform sm:block ${walletDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {walletDropdownOpen && (
                    <div className="absolute right-0 top-full z-[60] mt-2 w-60 overflow-hidden rounded-md border border-bw-line bg-white py-1 text-bw-ink shadow-xl">
                      <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-bw-muted">
                        Switch wallet
                      </p>
                      <button
                        type="button"
                        onClick={() => handleWalletSwitch("balance")}
                        disabled={isSwitchingWallet}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors disabled:opacity-60 ${
                          activeWallet === "balance" ? "bg-bw-green-soft" : "hover:bg-slate-50"
                        }`}
                      >
                        <FiCreditCard size={16} className="text-bw-green" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold">Main wallet</span>
                          <span className="num mt-0.5 block text-[11px] text-bw-muted">KES {mainBalance}</span>
                        </span>
                        {activeWallet === "balance" && <span className="h-2 w-2 rounded-full bg-bw-green" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWalletSwitch("airtime")}
                        disabled={isSwitchingWallet}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors disabled:opacity-60 ${
                          activeWallet === "airtime" ? "bg-bw-green-soft" : "hover:bg-slate-50"
                        }`}
                      >
                        <FiSmartphone size={16} className="text-bw-green" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold">Airtime wallet</span>
                          <span className="num mt-0.5 block text-[11px] text-bw-muted">KES {airtimeBalance}</span>
                        </span>
                        {activeWallet === "airtime" && <span className="h-2 w-2 rounded-full bg-bw-green" />}
                      </button>
                    </div>
                  )}
                </div>

                <Link
                  to="/deposit"
                  className="whitespace-nowrap rounded bg-bw-yellow px-2 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-bw-ink transition-colors hover:brightness-95 sm:px-3 sm:text-[11px]"
                >
                  Deposit
                </Link>

                <div className="relative hidden sm:block" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((open) => !open)}
                    aria-label="Account menu"
                    aria-expanded={dropdownOpen}
                    className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <FiUser size={15} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-md border border-bw-line bg-white py-1 text-bw-ink shadow-xl">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium hover:bg-slate-50"
                      >
                        <FiUser size={15} className="text-bw-muted" /> Profile
                      </Link>
                      <Link
                        to="/history"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium hover:bg-slate-50"
                      >
                        <FiClock size={15} className="text-bw-muted" /> History
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 border-t border-bw-line px-3 py-2.5 text-left text-[13px] font-medium text-bw-live hover:bg-red-50"
                      >
                        <FiLogOut size={15} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-1.5 py-1.5 text-[12px] font-semibold text-white/85 hover:text-white sm:px-2 sm:text-[13px]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded bg-bw-yellow px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-bw-ink transition-colors hover:brightness-95"
                >
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category rail */}
      <div className="border-b border-bw-line bg-white">
        <div className="bw-scroll mx-auto flex w-full max-w-[1400px] items-stretch gap-1 overflow-x-auto px-2 sm:px-3 lg:px-4">
          {CATEGORY_LINKS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.label}
                to={linkFor(item)}
                onClick={(event) => handleHashLink(event, item.to)}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-shrink-0 items-center whitespace-nowrap px-3 py-2.5 text-[12px] font-semibold transition-colors ${
                  active
                    ? "text-bw-green"
                    : "text-bw-muted hover:text-bw-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 bottom-0 h-[2px] bg-bw-green" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
