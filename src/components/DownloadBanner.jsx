import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiDownload, FiX } from "react-icons/fi";

export const BANNER_DISMISSED_KEY = "downloadBannerDismissed";

export default function DownloadBanner({
  title = "Get the Bingwake app",
  href = "",
  sticky = true,
}) {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem(BANNER_DISMISSED_KEY) !== "true";
  });

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  if (!visible) return null;

  return (
    <div className={`${sticky ? "sticky top-0 z-40" : ""} w-full md:hidden`}>
      <div className="flex items-center gap-2 border-b border-bw-line bg-bw-green-soft px-3 py-1.5 text-bw-ink">
        <FiDownload size={14} className="flex-shrink-0 text-bw-green" />
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">
          {title}
        </span>
        <a
          href={href}
          download
          onClick={(event) => {
            event.preventDefault();
            toast.success("App download is coming soon");
          }}
          className="flex-shrink-0 rounded bg-bw-yellow px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-bw-ink"
        >
          Install
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss app banner"
          className="flex-shrink-0 p-1 text-bw-muted hover:text-bw-ink"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
}
