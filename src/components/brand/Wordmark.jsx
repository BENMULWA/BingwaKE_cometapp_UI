const SIZES = {
  xs: "text-[11px]",
  sm: "text-[13px] sm:text-[14px]",
  md: "text-[18px]",
  lg: "text-[24px] sm:text-[28px]",
};

const TAGLINE_SIZES = {
  xs: "text-[6px] tracking-[0.18em]",
  sm: "text-[7px] tracking-[0.2em]",
  md: "text-[8px] tracking-[0.22em]",
  lg: "text-[9px] tracking-[0.24em]",
};

export default function Wordmark({
  tone = "light",
  size = "md",
  tagline = false,
  className = "",
}) {
  const onDark = tone === "light";

  return (
    <span
      className={`bw-wordmark inline-flex min-w-0 flex-col leading-none ${
        onDark ? "" : "bw-wordmark--dark"
      } ${className}`}
      aria-label="Bingwake"
    >
      <span
        aria-hidden="true"
        className={`whitespace-nowrap font-display font-bold ${SIZES[size] || SIZES.md} ${
          onDark ? "text-white" : "text-bw-green"
        }`}
      >
        BINGWA<span className="bw-wordmark-ke">KE</span>
      </span>
      {tagline && (
        <span
          aria-hidden="true"
          className={`mt-1 whitespace-nowrap font-semibold uppercase ${
            TAGLINE_SIZES[size] || TAGLINE_SIZES.md
          } ${onDark ? "text-white/55" : "text-bw-muted"}`}
        >
          Bet <span className="text-bw-yellow">·</span> Play{" "}
          <span className="text-bw-yellow">·</span> Win
        </span>
      )}
    </span>
  );
}
