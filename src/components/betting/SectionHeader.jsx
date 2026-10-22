import { Link } from "react-router-dom";

export default function SectionHeader({
  title,
  subtitle,
  actionLabel = "View all",
  actionTo,
}) {
  return (
    <div className="mb-2.5 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[15px] font-extrabold tracking-[-0.01em] text-bw-ink sm:text-base">
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-[11px] text-bw-muted">{subtitle}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="flex-shrink-0 text-[11px] font-bold text-bw-green hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
