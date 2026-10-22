import { useState } from "react";
import BaseClass from "../../services/BaseClass";
import {
  useUpdateBalance,
  useCometWithdraw,
  useWithdraw,
} from "../../hooks/usePayment";
import { BsInfoCircle, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { debouncedWithdraw } from "../../utils/debounce";
import { normalizeKenyanPhone } from "../../utils/phone";
import WalletSelector from "./WalletSelector";

const SHOW_CRYPTO_UI = false;
const MIN_COMET_WITHDRAWAL = 100;
const TABS = [
  "M-Pesa",
  ...(SHOW_CRYPTO_UI ? ["Crypto (USDT)"] : []),
  "Comet App",
];

export default function Withdraw() {
  const [activeTab, setActiveTab] = useState("M-Pesa");
  const [selectedWallet, setSelectedWallet] = useState("balance");
  const [airtimePhone, setAirtimePhone] = useState("");

  // M-Pesa state
  const [amount, setAmount] = useState(100);
  const tax = amount * 0.05;
  const fee = 0;
  const disbursed = amount - tax - fee;

  // Comet App state
  const [cometEmail, setCometEmail] = useState("");
  const [cometWithdrawAmount, setCometWithdrawAmount] = useState("");

  const baseClass = new BaseClass();
  const phone = baseClass?.phone;

  const { balance } = useUpdateBalance();
  const { withdrawingCash, isLoading: isWithdrawing } = useWithdraw();
  const cryptoResult = null;
  const { withdrawViaComet, isLoading: isCometWithdrawing } = useCometWithdraw();
  const activeWithdrawWallet =
    selectedWallet || balance?.activeWallet || baseClass.activeWallet || "balance";
  const withdrawableBalance =
    activeWithdrawWallet === "airtime"
      ? Number(balance?.airtimeBalance ?? baseClass.airtimeBalance ?? 0)
      : Number(balance?.balance ?? baseClass.user?.balance ?? 0);


  const walletLabel =
    activeWithdrawWallet === "airtime" ? "Airtime Wallet" : "Main Wallet";
  const cometCurrency = activeWithdrawWallet === "airtime" ? "ARTM" : "KES";
  const normalizedAirtimePhone = normalizeKenyanPhone(airtimePhone);
  const submitPhone =
    activeWithdrawWallet === "airtime" ? normalizedAirtimePhone : phone;

  const handleWalletChange = (wallet) => {
    if (!wallet) return;
    setSelectedWallet(wallet);
  };

  const withdrawalActionLabel =
    activeWithdrawWallet === "airtime" ? "Withdraw Airtime" : "Withdraw";

  // ── M-Pesa handler ──────────────────────────────────────────────────────────
  function handleWithdraw() {
    debouncedWithdraw(amount, () => {
      if (isWithdrawing) return;

      if (!withdrawableBalance || withdrawableBalance === 0) {
        return toast.error("You don't have enough amount to make this transaction");
      }

      if (+amount > withdrawableBalance) {
        return toast.error("You don't have enough amount to make this transaction");
      }

      if (+amount < 100) {
        return toast.error("Withdrawals start at Ksh 100 and above.");
      }

      if (activeWithdrawWallet === "airtime" && !airtimePhone.trim()) {
        return toast.error("Please enter the telecom number for airtime withdrawal.");
      }

      withdrawingCash(
        {
          withdrawAmount: amount,
          walletType: activeWithdrawWallet,
          phone: submitPhone,
        },
        {
          onSuccess: () => {
            setAmount(100);
            if (activeWithdrawWallet === "airtime") {
              setAirtimePhone("");
            }
          },
          onError: (err) => {
            toast.error(err?.message || `Withdrawal of Ksh ${amount} failed`);
          },
        }
      );
    });
  }

  // ── Crypto handler ───────────────────────────────────────────────────────────


  function handleCometWithdraw() {
    const normalizedEmail = cometEmail.trim();
    const cometAmount = Number(cometWithdrawAmount);
    const availableBalance = withdrawableBalance;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return toast.error("Enter the email registered to your Comet App account.");
    }
    if (availableBalance < MIN_COMET_WITHDRAWAL) {
      return toast.error(
        `Comet withdrawals start at ${cometCurrency} ${MIN_COMET_WITHDRAWAL}. Your ${walletLabel.toLowerCase()} has ${cometCurrency} ${availableBalance.toFixed(2)}.`
      );
    }
    if (!Number.isFinite(cometAmount) || cometAmount < MIN_COMET_WITHDRAWAL) {
      return toast.error(`The minimum Comet withdrawal is ${cometCurrency} ${MIN_COMET_WITHDRAWAL}.`);
    }
    if (cometAmount > availableBalance) {
      return toast.error(`Your ${walletLabel.toLowerCase()} balance is insufficient.`);
    }

    withdrawViaComet({
      amount: cometAmount,
      email: normalizedEmail,
      walletType: activeWithdrawWallet,
    }, {
      onSuccess: (res) => {
        if (res?.data?.status === "completed" || res?.data?.status === "failed") {
          setCometWithdrawAmount("");
        }
      },
    });
  }

  // ── Crypto result screen ─────────────────────────────────────────────────────
  if (SHOW_CRYPTO_UI && activeTab === "Crypto (USDT)" && cryptoResult) {
    const isComplete = cryptoResult?.status === "complete";
    return (
      <div className="text-bw-muted flex justify-center p-4">
        <div className="w-full max-w-md md:max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden border border-bw-line">
          <div className="p-8 flex flex-col items-center gap-5 text-center">
            {isComplete ? (
              <BsCheckCircleFill className="text-6xl text-green-700" />
            ) : (
              <BsXCircleFill className="text-6xl text-red-600" />
            )}

            <h2 className={`text-2xl font-bold ${isComplete ? "text-green-700" : "text-red-600"}`}>
              {isComplete ? "Withdrawal Initiated" : "Withdrawal Failed"}
            </h2>

            <p className="text-textColor/70 text-sm">
              {cryptoResult?.message}
            </p>

            {isComplete && (
              <div className="w-full rounded-lg bg-white border border-primary/20 p-4 text-sm space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-textColor/70">Amount</span>
                  <span className="font-semibold text-primary">
                    {cryptoResult?.amount} {cryptoResult?.amountUnit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textColor/70">Rate</span>
                  <span>1 USDT = KES {cryptoResult?.rate?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textColor/70">KES Equivalent</span>
                  <span className="font-semibold text-primary">
                    KES {cryptoResult?.amountKes?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textColor/70">Network</span>
                  <span>{cryptoResult?.network}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-textColor/70 shrink-0">Address</span>
                  <span className="break-all text-right text-xs">{cryptoResult?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textColor/70">Withdrawal ID</span>
                  <span className="text-xs">{cryptoResult?.withdrawalId}</span>
                </div>
              </div>
            )}

            {!isComplete && cryptoResult?.reason === "insufficient_funds" && (
              <div className="w-full rounded-lg bg-white border border-primary/20 p-4 text-sm text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-textColor/70">Available Balance</span>
                  <span className="text-red-600 font-semibold">
                    {cryptoResult?.availableAmount} {cryptoResult?.availableAmountUnit}
                  </span>
                </div>
              </div>
            )}

            {!isComplete && cryptoResult?.reason === "amount_below_minimum" && (
              <div className="w-full rounded-lg bg-white border border-primary/20 p-4 text-sm text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-textColor/70">Requested</span>
                  <span>{cryptoResult?.requestedAmount} {cryptoResult?.amountUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textColor/70">Minimum</span>
                  <span className="text-primary font-semibold">
                    {cryptoResult?.minWithdrawalAmount} {cryptoResult?.amountUnit}
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center px-3 py-4 md:px-6 md:py-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-lg border border-bw-line bg-white shadow-sm">
        <main className="space-y-5 bg-bw-page p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-2 border-b border-bw-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-bw-ink md:text-3xl">Withdraw</h1>
              <p className="mt-1 text-sm text-bw-muted">Choose a wallet and withdrawal method.</p>
            </div>
          </div>

          <WalletSelector
            label="Withdraw from"
            selectedWallet={activeWithdrawWallet}
            onSelect={handleWalletChange}
            mainBalance={balance?.balance ?? baseClass.user?.balance ?? 0}
            airtimeBalance={balance?.airtimeBalance ?? baseClass.airtimeBalance ?? 0}
            airtimeUnit="ARTM"
          />

          <div className="space-y-5 rounded-md border border-primary/20 bg-white p-4  md:p-6">

            <div className="flex gap-2 rounded-md bg-bw-page p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition-colors ${
                    activeTab === tab ? "bg-bw-yellow text-bw-ink" : "text-bw-muted"
                  }`}
                >
                  {tab === "M-Pesa" && activeWithdrawWallet === "airtime"
                    ? "Airtime"
                    : tab}
                </button>
              ))}
            </div>

            <p className="text-xs leading-relaxed text-bw-muted">
              {activeTab === "M-Pesa"
                ? activeWithdrawWallet === "airtime"
                  ? "Real airtime is sent to the telecom number you enter."
                  : "Cash is sent to the M-Pesa number registered on your account."
                : activeWithdrawWallet === "airtime"
                  ? "ARTM is returned to the Comet App account tied to the email you enter."
                  : "KES is sent to the Comet App account tied to the email you enter."}
            </p>

            {activeTab === "M-Pesa" && (
              <>
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-start">
                  <div className="space-y-4">
                {activeWithdrawWallet === "airtime" ? (
                  <input
                    type="tel"
                    value={airtimePhone}
                    onChange={(e) => setAirtimePhone(e.target.value)}
                    className="w-full rounded-md border border-primary/40 bg-bw-page px-4 py-3 text-bw-ink placeholder:text-bw-muted focus:outline-none"
                    placeholder="Enter telecom number for airtime"
                  />
                ) : (
                  <input
                    type="text"
                    value={`MPESA Number: ${phone}`}
                    readOnly
                    disabled
                    className="w-full rounded-md border border-bw-line bg-bw-page px-4 py-3 text-bw-ink opacity-80"
                  />
                )}

                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-md border border-primary/40 bg-bw-page px-4 py-3 text-bw-ink placeholder:text-bw-muted focus:outline-none"
                  placeholder="100"
                />
                  </div>

                  <div className="space-y-4">
                <div className="rounded-md border border-bw-line bg-bw-page p-3 text-sm text-bw-ink">
                  <div className="flex justify-between py-1.5">
                    <span>Withholding Tax 5%</span>
                    <span className="font-semibold text-primary">- KES {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Withdraw Amount</span>
                    <span>KES {amount}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Tax Amount</span>
                    <span className="text-red-600">- KES {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Withdraw Fee</span>
                    <span className="text-red-600">- KES {fee}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-bw-line pt-2 font-extrabold text-primary">
                    <span>Disbursed Amount</span>
                    <span>KES {disbursed.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="w-full rounded-md bg-bw-yellow py-3.5 text-base font-extrabold text-bw-ink hover:bg-[#e8ae00] disabled:opacity-60"
                >
                  {isWithdrawing ? "Processing..." : withdrawalActionLabel}
                </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "Comet App" && (
              <>
                <div className="flex flex-col items-center gap-2 rounded-md border border-bw-line bg-white p-4">
                  <img src="/Comet Logo.png" alt="Comet App" className="h-14 w-14 object-contain" />
                  <div className="text-center">
                    <h3 className="text-lg font-extrabold text-bw-ink">Comet App</h3>
                    <p className="text-[11px] text-bw-muted">Withdraw {cometCurrency} directly to your Comet account</p>
                  </div>
                </div>

                <input
                  type="email"
                  value={cometEmail}
                  onChange={(e) => setCometEmail(e.target.value)}
                  className="w-full rounded-md border border-primary/40 bg-bw-page px-4 py-3 text-bw-ink placeholder:text-bw-muted focus:outline-none"
                  placeholder="Enter your Comet App email"
                />

                <input
                  type="number"
                  value={cometWithdrawAmount}
                  onChange={(e) => setCometWithdrawAmount(e.target.value)}
                  min={MIN_COMET_WITHDRAWAL}
                  step="0.01"
                  className="w-full rounded-md border border-primary/40 bg-bw-page px-4 py-3 text-bw-ink placeholder:text-bw-muted focus:outline-none"
                  placeholder={`Enter amount (minimum ${cometCurrency} ${MIN_COMET_WITHDRAWAL})`}
                />

                <button
                  type="button"
                  onClick={handleCometWithdraw}
                  disabled={isCometWithdrawing}
                  className="w-full rounded-md bg-bw-yellow py-3.5 text-base font-extrabold text-bw-ink hover:bg-[#e8ae00] disabled:opacity-60"
                >
                  {isCometWithdrawing ? "Processing..." : "Withdraw via Comet App"}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
