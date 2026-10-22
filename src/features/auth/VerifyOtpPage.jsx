import AuthBrandPanel from "./AuthBrandPanel";
import Wordmark from "../../components/brand/Wordmark";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BounceLoading } from "respinner";
import { useActivateAccount, useResendOTP } from "../../hooks/useAuth";
import { useBanner } from "../../context/BannerContext";
import { normalizeKenyanPhone } from "../../utils/phone";
import {
  clearPendingVerificationPhone,
  getPendingVerificationPhone,
  getStoredUser,
  setPendingVerificationPhone,
  setStoredUser,
} from "../../utils/authStorage";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneFromQuery = new URLSearchParams(location.search).get("phone") || "";
  const storedUser = getStoredUser();
  const phone = normalizeKenyanPhone(
    location.state?.phone ||
      phoneFromQuery ||
      getPendingVerificationPhone() ||
      storedUser?.phone ||
      ""
  );
  const redirectTo = location.state?.from?.pathname || "/";
  const { showBanner } = useBanner();
  const { handleSubmit, register } = useForm();
  const [resendTimer, setResendTimer] = useState(30);

  const { activateAccountFn, isLoading: isVerifying } = useActivateAccount();
  const { resendOTPFn, isLoading: isResending } = useResendOTP();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (phone) {
      setPendingVerificationPhone(phone);
    }
  }, [phone]);

  function submitOtp(data) {
    if (!phone) {
      toast.error("Phone number missing. Please register again.");
      navigate("/register");
      return;
    }

    activateAccountFn(
      { code: data.otp, phone },
      {
        onSuccess: (res) => {
          if (res?.status) {
            toast.success("OTP Verified Successfully");
            const userData = { token: res?.token, ...res.user };
            setStoredUser(userData);
            clearPendingVerificationPhone();
            navigate(redirectTo, { replace: true });
            if (res?.banner?.showBanner) {
              showBanner(res?.banner?.currentBanner || "registration");
            }
          } else {
            toast.error(res?.message || "Invalid OTP");
          }
        },
        onError: (err) => {
          toast.error(err?.message || "Verification failed");
        },
      }
    );
  }

  function resendOtp() {
    if (!phone) {
      toast.error("Phone number missing. Please register again.");
      navigate("/register");
      return;
    }

    resendOTPFn(
      { phone },
      {
        onSuccess: (res) => {
          if (res?.status) {
            toast.success("OTP resent successfully");
            setPendingVerificationPhone(phone);
            setResendTimer(90);
          } else {
            toast.error(res?.message || "Could not resend OTP");
          }
        },
        onError: (err) => {
          toast.error(err?.message || "Resend failed");
        },
      }
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 ">
      <div className="relative w-full max-w-4xl bg-white rounded-lg border border-bw-line overflow-hidden flex flex-col md:flex-row shadow-2xl">

        {/* TOP BAR */}
        <div className="absolute top-0 right-0 left-0 p-4 flex justify-between items-center z-10">
          <p className="hidden text-bw-muted text-xs ml-auto mr-4 sm:block">
            Wrong number?{" "}
            <Link to="/register" className="text-primary hover:underline font-bold cursor-pointer">
              Go back
            </Link>
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-bw-page p-1.5 rounded-md text-bw-muted hover:text-bw-ink transition-colors"
          >
            <IoMdClose size={16} />
          </button>
        </div>

        <AuthBrandPanel />

        {/* RIGHT: Form */}
        <div className="flex-1 p-8 pb-24 md:p-16 flex flex-col justify-start bg-white md:justify-center">
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-2 md:hidden">
              <img src="/bingwake-mark.svg" alt="" className="h-10 w-11 object-contain" />
              <Wordmark tone="dark" size="lg" tagline />
            </div>
            <h1 className="text-bw-ink text-3xl font-extrabold mb-2">Verify OTP</h1>
            <p className="text-bw-muted text-sm">
              Enter the 6-digit code sent to{" "}
              <span className="text-primary font-semibold">{phone}</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(submitOtp)}>

            {/* OTP Input */}
            <div className="space-y-2">
              <label className="text-bw-ink text-sm">Enter OTP</label>
              <input
                type="text"
                maxLength="6"
                placeholder="000000"
                {...register("otp", { required: true })}
                className="w-full bg-surface border border-bw-line rounded-md px-4 py-4 text-bw-ink text-2xl tracking-[0.5em] text-center placeholder:text-bw-muted placeholder:tracking-normal outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-bw-yellow hover:bg-[#e8ae00] text-bw-ink font-extrabold py-4 rounded-md text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isVerifying
                ? <BounceLoading fill="#0A0A0A" barHeight={12} />
                : <><span>Verify Code</span><span>→</span></>
              }
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 flex justify-center items-center text-sm text-bw-muted">
            <span>
              Didn't get the code?{" "}
              {resendTimer > 0 ? (
                <span className="text-primary font-medium">Resend in {resendTimer}s</span>
              ) : (
                <button
                  onClick={resendOtp}
                  disabled={isResending}
                  className="text-primary font-medium hover:underline transition-all disabled:opacity-60"
                >
                  {isResending ? "Resending..." : "Resend Code"}
                </button>
              )}
            </span>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-bw-page" />
            <span className="text-bw-muted text-sm">Almost there!</span>
            <div className="flex-1 h-px bg-bw-page" />
          </div>

          <p className="text-center text-[12px] text-bw-muted mt-4">
            Check your SMS inbox for the verification code. It may take a moment to arrive.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
