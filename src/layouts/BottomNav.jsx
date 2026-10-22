import { useLocation, useNavigate } from "react-router-dom";
import { FiAward, FiCreditCard, FiHome, FiPlayCircle, FiUser } from "react-icons/fi";

import BaseClass from "../services/BaseClass";

export default function BottomNav({ closeAll, isSomethingOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const base = new BaseClass();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path.startsWith("/virtual")) return location.pathname.startsWith("/virtual");
    return location.pathname.startsWith(path);
  };

  const items = [
    { icon: <FiHome size={19} />, label: "Home", path: "/" },
    {
      icon: <FiPlayCircle size={19} />,
      label: "Games",
      path: base.isAuthenticated() ? "/virtual/name/euro-league" : "/login",
    },
    { icon: <FiAward size={19} />, label: "Jackpot", path: "/jackpot" },
    {
      icon: <FiCreditCard size={19} />,
      label: "Deposit",
      path: base.isAuthenticated() ? "/deposit" : "/login",
    },
    {
      icon: <FiUser size={19} />,
      label: "Account",
      path: base.isAuthenticated() ? "/profile" : "/login",
    },
  ];

  const handleClick = (path) => {
    if (isSomethingOpen) {
      closeAll?.();
      return;
    }
    navigate(path);
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bw-green pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_18px_rgba(6,40,30,0.24)] md:hidden"
    >
      <div className="flex h-[58px] items-stretch">
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.path)}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-bw-yellow" : "text-white/65 hover:text-white"
              }`}
            >
              {active && <span className="absolute top-0 h-[2px] w-8 rounded-b bg-bw-yellow" />}
              {item.icon}
              <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
