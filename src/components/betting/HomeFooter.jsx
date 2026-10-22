import { Link } from "react-router-dom";
import Wordmark from "../brand/Wordmark";

const COLUMNS = [
  {
    title: "Play",
    links: [
      { label: "Virtual football", to: "/virtual/name/euro-league" },
      { label: "Aviator", to: "/aviator" },
      { label: "Jackpot", to: "/jackpot" },
      { label: "Promotions", to: "/promotions" },
    ],
  },
  {
    title: "Wallet",
    links: [
      { label: "Deposit", to: "/deposit" },
      { label: "Withdraw", to: "/withdraw" },
      { label: "Transaction history", to: "/history" },
      { label: "Refer & earn", to: "/refer" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Support", to: "/support" },
      { label: "Responsible gaming", to: "/support" },
      { label: "How to play", to: "/support" },
      { label: "Contact us", to: "/support" },
    ],
  },
];

export default function HomeFooter() {
  return (
    <footer className="mt-4 border-t border-bw-line bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <img src="/bingwake-mark.svg" alt="" className="h-8 w-9 object-contain" />
              <Wordmark tone="dark" size="md" tagline />
            </div>
            <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-bw-muted">
              Virtual football, Aviator and instant games for Kenyan players.
              Deposit with M-Pesa and play in seconds.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <img src="/mpesa.png" alt="M-Pesa" className="h-6 w-auto" />
              <span className="text-[10px] font-semibold text-bw-muted">
                Payments by M-Pesa
              </span>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-bw-ink">
                {column.title}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[11px] text-bw-muted transition-colors hover:text-bw-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-bw-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-relaxed text-bw-muted">
            © {new Date().getFullYear()} Bingwake. All rights reserved. 18+ only.
            Gamble responsibly and only stake what you can afford.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-bw-line px-1.5 text-[9px] font-extrabold text-bw-ink">
              18+
            </span>
            <span className="text-[10px] text-bw-muted">Play responsibly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
