import { Link, useLocation } from "react-router-dom";

export default function SidebarItem({ icon, label, to, onClick, badge, download, animate, collapsed }) {
  const location = useLocation();

  const isActive = to
    ? to === "/"
      ? location.pathname === "/"
      : location.pathname === to || location.pathname.startsWith(to + "/")
    : false;

  const Badge = () => {
    if (!badge) return null;
    return (
      <span
        className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase leading-none tracking-wide whitespace-nowrap shadow-[0_0_12px_rgba(250,204,21,0.12)] ${
          badge === "New"
            ? "border-red-400/40 bg-red-500/90 text-white"
            : badge === "Hot"
            ? "border-bw-yellow/70 bg-bw-yellow text-bw-ink"
            : "border-bw-line bg-bw-page text-bw-ink"
        }`}
      >
        {badge}
      </span>
    );
  };

  const inner = (
    <div
      role="button"
      tabIndex={0}
      title={collapsed ? label : undefined}
      className={`group relative flex items-center overflow-hidden ${
        collapsed ? "justify-center px-1.5 py-2.5" : "justify-between px-2.5 py-2"
      } rounded-lg cursor-pointer transition-all duration-200 select-none ${
        isActive
          ? "bg-bw-green-soft shadow-[inset_3px_0_0_#0b3d2e]"
          : "hover:bg-bw-page"
      }`}
    >
      <div className={`flex min-w-0 items-center ${collapsed ? "" : "gap-3"}`}>
        {/* Icon */}
        {icon ? (
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${
              isActive
                ? "bg-white"
                : "bg-bw-page"
            } ${animate ? "animate-promo-dance" : ""}`}
          >
            {typeof icon === "string" ? (
              <img
                src={icon}
                alt={label}
                className="h-7 w-7 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <span className={`text-xl ${isActive ? "text-bw-green" : "text-bw-muted"}`}>
                {icon}
              </span>
            )}
          </span>
        ) : (
          <div className="h-9 w-9 flex-shrink-0 rounded-md border border-bw-line bg-bw-page" />
        )}

        {/* Label — hidden when collapsed */}
        {!collapsed && (
          <span className="truncate text-sm font-bold leading-tight text-bw-ink">
            {label}
          </span>
        )}
      </div>

      {/* Badge — hidden when collapsed */}
      {!collapsed && <Badge />}
    </div>
  );

  if (download && to) {
    return (
      <a href={to} download onClick={onClick} className="block mb-1">
        {inner}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block mb-1">
        {inner}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className="block mb-1">
      {inner}
    </div>
  );
}
