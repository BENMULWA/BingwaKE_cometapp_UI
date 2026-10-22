import { useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCreditCard,
  FiInfo,
  FiSmartphone,
} from "react-icons/fi";

const WALLETS = [
  {
    key: "balance",
    label: "Main Wallet",
    icon: FiCreditCard,
    description: "Cash for M-Pesa and Comet. Used for betting and withdrawals.",
    helper:
      "Main Wallet accepts M-Pesa and Comet cash. Use it for bets and cash withdrawals.",
  },
  {
    key: "airtime",
    label: "Airtime Wallet",
    icon: FiSmartphone,
    description: "Tokenized airtime from Comet. Withdraw it as real airtime.",
    helper:
      "Airtime Wallet only accepts tokenized airtime from Comet. It pays out as real airtime, not cash.",
  },
];

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("en-KE", {
    maximumFractionDigits: 2,
  });

export default function WalletSelector({
  label = "Wallet",
  selectedWallet = "balance",
  onSelect,
  mainBalance = 0,
  airtimeBalance = 0,
  mainUnit = "KES",
  airtimeUnit = "KES",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const active = WALLETS.find((wallet) => wallet.key === selectedWallet) || WALLETS[0];
  const ActiveIcon = active.icon;
  const activeBalance = selectedWallet === "airtime" ? airtimeBalance : mainBalance;
  const activeUnit = selectedWallet === "airtime" ? airtimeUnit : mainUnit;

  const handleSelect = (wallet) => {
    setOpen(false);
    if (wallet !== selectedWallet) onSelect?.(wallet);
  };

  return (
    <section className="rounded-md border border-bw-line bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={disabled}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-4 text-left disabled:opacity-60"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-bw-green-soft text-bw-green">
            <ActiveIcon size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-bw-muted">
              {label}
            </span>
            <span className="block text-sm font-bold text-bw-ink">{active.label}</span>
            <span className="block text-xs text-bw-muted">
              {activeUnit} {formatMoney(activeBalance)}
            </span>
          </span>
        </span>
        <FiChevronDown
          size={18}
          className={`flex-shrink-0 text-bw-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-1 border-t border-bw-line p-2">
          {WALLETS.map((wallet) => {
            const Icon = wallet.icon;
            const isActive = wallet.key === selectedWallet;
            const balance = wallet.key === "airtime" ? airtimeBalance : mainBalance;
            const unit = wallet.key === "airtime" ? airtimeUnit : mainUnit;

            return (
              <button
                key={wallet.key}
                type="button"
                onClick={() => handleSelect(wallet.key)}
                className={`flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors ${
                  isActive ? "bg-bw-green-soft" : "hover:bg-bw-page"
                }`}
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white text-bw-green">
                  <Icon size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-bold text-bw-ink">
                    {wallet.label}
                    {isActive && <FiCheck size={14} className="text-bw-green" />}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-bw-muted">
                    {wallet.description}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold text-bw-ink">
                    {unit} {formatMoney(balance)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-start gap-2 border-t border-bw-line px-4 py-3 text-[11px] leading-relaxed text-bw-muted">
        <FiInfo className="mt-0.5 flex-shrink-0 text-bw-green" size={13} />
        <p>{active.helper}</p>
      </div>
    </section>
  );
}
