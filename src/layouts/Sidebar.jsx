import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoAirplane, IoRocket } from "react-icons/io5";
import {
  FiPhone, FiMessageSquare, FiMail, FiChevronDown,
  FiLogOut, FiSearch, FiGlobe, FiHome
} from "react-icons/fi";
import { BsStarFill, BsTrophyFill, BsTicketFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import Wordmark from "../components/brand/Wordmark";
import BaseClass from "../services/BaseClass";
import { useLogOut } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { gameSlug } from "../features/games/virtualGameCatalog";

/* ─── Promotion action button ────────────────────────────── */
function PromoAction({ label, icon, to, badge, requiresAuth = false }) {
  const base = new BaseClass();
  const navigate = useNavigate();
  const dest = requiresAuth && !base.isAuthenticated() ? "/login" : to;

  return (
    <button
      onClick={() => navigate(dest)}
      className="mb-1.5 flex w-full cursor-pointer items-center justify-between rounded-md border border-bw-line bg-white px-3 py-2.5 transition-colors hover:bg-bw-page"
    >
      <span className="text-sm font-bold text-bw-ink">{label}</span>
      {badge === "star" ? (
        <div className="relative">
          <BsStarFill className="text-yellow-400 text-2xl" />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-black">New</span>
        </div>
      ) : icon ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-bw-yellow/60 bg-bw-yellow text-base text-bw-ink">
          {icon}
        </div>
      ) : null}
    </button>
  );
}

/* ─── Help item ──────────────────────────────────────────── */
function HelpItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-1 flex w-full cursor-pointer items-center gap-3 rounded-md border border-bw-line bg-white px-3 py-2.5 text-sm font-semibold text-bw-ink transition-colors hover:border-bw-green/30 hover:bg-bw-page"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-bw-line bg-bw-green-soft text-lg text-bw-green">
        {icon}
      </span>
      {label}
    </button>
  );
}

/* ─── Main Sidebar ───────────────────────────────────────── */
export default function Sidebar({ isMobile, showSidebar, setShowSidebar, collapsed }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileDrawerTop, setMobileDrawerTop] = useState(0);
  const sidebarScrollRef = useRef(null);
  const navigate = useNavigate();
  const base = new BaseClass();
  const isAuth = base.isAuthenticated();
  const { logOutFn } = useLogOut();

  const effectiveCollapsed = isMobile ? false : collapsed;

  useEffect(() => {
    if (!isMobile || !showSidebar) return;

    const positionBelowHeader = () => {
      const navbar = document.getElementById("main-navbar");
      setMobileDrawerTop(Math.max(0, navbar?.getBoundingClientRect().bottom ?? 0));
    };

    positionBelowHeader();
    // The drawer remains mounted between openings, so browsers retain its
    // previous scroll offset. Always reveal Home when the menu opens.
    sidebarScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("resize", positionBelowHeader);
    return () => window.removeEventListener("resize", positionBelowHeader);
  }, [isMobile, showSidebar]);

  /* Auth-aware route */
  const p = (path) => (isAuth ? path : "/login");

  const closeMobile = () => {
    if (isMobile) setShowSidebar(false);
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
    closeMobile();
  };

  /* ── Play navigation items ── */
  const playItems = [
    { label: "Home", icon: "/icons/house.png", to: "/", requiresAuth: false },
    { label: "Aviator", icon: "/aviator.svg", to: p("/aviator"), requiresAuth: true },
    {
      label: "Euro League",
      icon: "https://storage.googleapis.com/eurovirtuals/assets/ev_thumbnail_vl_legacy_ui.png",
      to: p("/virtual/gfhjdghvfdvsaddd"),
      requiresAuth: true,
    },
    {
      label: "Virtual Jackpot",
      icon: "https://storage.googleapis.com/eurovirtuals/assets/ev_thumbnail_virtual_jackpot.png",
      to: p("/virtual/ea8dfcc7-2f3d-4a0c-929c-37f90cb75d41"),
      requiresAuth: true,
    },
    {
      label: "Betting League",
      icon: "https://storage.googleapis.com/eurovirtuals/assets/ev_thumbnail_vl_next_gen_ui.png",
      to: p("/virtual/6a1f06c2-91a2-41cb-bb39-0c9673c1e7e2"),
      requiresAuth: true,
    },
    {
      label: "World Cup",
      icon: "/virtuals.png",
      to: p(`/virtual/name/${gameSlug("Euro World Cup")}`),
      requiresAuth: true,
    },
  ];

  /* Filter by search */
  const filtered = searchQuery.trim()
    ? playItems.filter((i) =>
      i.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : playItems;

  const sidebarInner = (
    <div
      ref={sidebarScrollRef}
      className="flex h-full flex-col overflow-y-auto bg-white pb-[calc(70px+env(safe-area-inset-bottom))] no-scrollbar md:pb-0"
    >
      {/* Mobile menu identity */}
      {isMobile && (
        <div className="flex items-center gap-2 border-b border-bw-line px-4 pb-3 pt-4">
          <img src="/bingwake-mark.svg" alt="" className="h-9 w-11 object-contain" />
          <Wordmark tone="dark" size="md" tagline />
        </div>
      )}

      {/* Search bar */}
      {!effectiveCollapsed && (
        <div className="px-2 pt-3 pb-2">
          <div className="flex items-center gap-2 rounded-md border border-bw-line bg-bw-page px-3 py-2 focus-within:border-bw-green/40">
            <FiSearch className="flex-shrink-0 text-bw-muted" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent text-sm text-bw-ink outline-none placeholder:text-bw-muted"
            />
          </div>
        </div>
      )}

      {/* ── Play ── */}
      <nav className="flex-shrink-0 px-3 pt-3">
        {!effectiveCollapsed && (
          <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-bw-muted">Play</p>
        )}
        {filtered.map((item) => (
          <SidebarItem
            key={item.label}
            to={item.to}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            animate={item.animate}
            collapsed={effectiveCollapsed}
            onClick={closeMobile}
          />
        ))}
      </nav>

      {/* ── Wallet Section ── */}
      {isAuth && !effectiveCollapsed && (
        <div className="flex flex-col border-t border-bw-line px-3 pb-2 pt-3">
          <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-bw-muted">
            Wallet
          </p>
          <SidebarItem
            label="Deposit"
            icon="/icons/add-payment.png"
            to="/deposit"
            onClick={closeMobile}
          />
          <SidebarItem
            label="Withdraw"
            icon="/icons/money-withdrawal.png"
            to="/withdraw"
            onClick={closeMobile}
          />
          <SidebarItem
            label="Redeem Bonus"
            icon="/icons/cashback.png"
            to="/redeem"
            onClick={closeMobile}
          />
        </div>
      )}

      {/* ── Promotions Section ── */}
      {!effectiveCollapsed && (
        <div className="border-t border-bw-line px-3 pb-2 pt-3">
          <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-bw-muted">
            Offers
          </p>
          <PromoAction
            label="Promotions"
            badge="star"
            to="/promotions"
            requiresAuth={false}
          />
          <PromoAction
            label="Refer a friend"
            icon={<HiUserGroup />}
            to="/refer"
            requiresAuth={true}
          />
          {/* <PromoAction
            label="Promotion Rank"
            icon={<BsTrophyFill />}
            to="/refer"
            requiresAuth={true}
          />
          <PromoAction
            label="Redemption Code"
            icon={<BsTicketFill />}
            to="/redeem"
            requiresAuth={true}
          /> */}
        </div>
      )}

      {/* ── Get Help Section ── */}
      {!effectiveCollapsed && (
        <div className="border-t border-bw-line px-3 pb-3 pt-3">
          <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-bw-muted">Help</p>
          <HelpItem
            icon={<FiMail />}
            label="Contact Support"
            onClick={() => { navigate("/support"); closeMobile(); }}
          />
        </div>
      )}


      {/* ── License ── */}
      {/*
      {!effectiveCollapsed && (
        <div className="px-3 pb-3">
          <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-[0.16em] text-bw-muted">
            License
          </p>
          <div className="rounded-md border border-bw-line bg-bw-page p-3 text-[11px] leading-relaxed text-bw-muted">
            Glostar Trading Co Limited, Crescent Business Center, 8th floor,
            Parklands, Nairobi operates the Bingwake brand and is authorized
            and regulated by the BCLB (Betting Control and Licensing Board)
            under the Betting, Lotteries and Gaming Act, 1966. License Numbers:{" "}
            <span className="text-yellow-400 font-bold">BK-0001295</span>{" "}
            (Bookmaker) and{" "}
            <span className="text-yellow-400 font-bold">PG-0001060</span>{" "}
            (Public Gaming).
          </div>
        </div>
      )}
      */}

      {/* ── 18+ Only ── */}
      {!effectiveCollapsed && (
        <div className="mt-auto border-t border-bw-line px-3 pb-3 pt-3">
          <p className="mb-2 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-bw-muted">
            Responsible Play · 18+
          </p>
          <div className="rounded-md border border-bw-line bg-bw-page p-3 text-[11px] leading-relaxed text-bw-muted">
            Must be 18 years of age or older to register or play at Bingwake. Gamble responsibly and only bet what you can afford. For support, see the platform's responsible gaming resources. Read our{" "}
            <a href="#" className="font-bold text-bw-green hover:underline">Responsible Gaming policy</a>.
          </div>
        </div>
      )}

      {isAuth && !effectiveCollapsed && (
        <div className="px-3 pb-6">
          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
          >
            <FiLogOut size={16} />
            logout
          </button>
        </div>
      )}
    </div>
  );

  /* ── Width ── */
  const desktopWidth = collapsed ? "w-18" : "w-[250px]";

  return (
    <>
      {isMobile ? (
        <div
          className={`fixed inset-0 z-50 transition ${
            showSidebar ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!showSidebar}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-black/70 transition-opacity ${
              showSidebar ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowSidebar(false)}
            aria-label="Close menu"
          />

          <aside
            className={`absolute left-0 w-[278px] overflow-hidden bg-white shadow-2xl transition-transform duration-300 ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              top: `${mobileDrawerTop}px`,
              height: `calc(100dvh - ${mobileDrawerTop}px)`,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              type="button"
              className="absolute top-3 right-3 z-50 cursor-pointer rounded-full border border-bw-line bg-white p-2 shadow-sm"
              onClick={() => setShowSidebar(false)}
              aria-label="Close menu"
            >
              <IoClose size={18} className="text-bw-ink" />
            </button>
            {sidebarInner}
          </aside>
        </div>
      ) : (
        <aside
          className={`${desktopWidth} h-full flex-shrink-0 overflow-hidden border-r border-bw-line bg-white transition-all duration-300`}
        >
          {sidebarInner}
        </aside>
      )}
    </>
  );
}
