import AuthBrandPanel from "./AuthBrandPanel";
import Wordmark from "../../components/brand/Wordmark";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useResetPassword } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BounceLoading } from "respinner";
import { normalizeKenyanPhone } from "../../utils/phone";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPasswordAPI, isPending } = useResetPassword();
  const [searchParams] = useSearchParams();
  const phone = normalizeKenyanPhone(searchParams.get("phone") || "");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleSubmit, register } = useForm();

  function submitData(formData) {
    const otp = formData.code;
    const newPassword = formData.password;

    if (!otp || !newPassword || !phone) {
      toast.error("All fields are required");
      return;
    }

    resetPasswordAPI(
      { otp, newPassword, phone },
      {
        onSuccess: (dt) => {
          if (dt?.success === true || dt?.status === true) {
            toast.success(dt?.message || "Password reset successfully");
            navigate("/login");
          } else {
            toast.error(dt?.message || "Failed to reset password");
          }
        },
        onError: (err) => {
          toast.error(err?.message || "Something went wrong");
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
            Remember your password?{" "}
            <Link to="/login" className="text-primary hover:underline font-bold cursor-pointer">
              Sign in
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
            <h1 className="text-bw-ink text-3xl font-extrabold mb-2">Reset Password</h1>
            <p className="text-bw-muted text-sm">
              Enter the recovery code we sent to your phone
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(submitData)}>

            {/* Recovery Code */}
            <div className="space-y-2">
              <label className="text-bw-ink text-sm">Recovery Code</label>
              <input
                type="tel"
                placeholder="Enter 6-digit code"
                {...register("code", { required: true })}
                  className="w-full bg-surface border border-bw-line rounded-md px-4 py-4 text-bw-ink text-base placeholder:text-bw-muted outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-bw-ink text-sm">New Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password", { required: true })}
                    className="w-full bg-surface border border-bw-line rounded-md px-4 py-4 text-bw-ink text-base placeholder:text-bw-muted outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bw-muted hover:text-bw-ink transition-colors"
                >
                  {passwordVisible
                    ? <AiOutlineEyeInvisible size={20} />
                    : <AiOutlineEye size={20} />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-bw-yellow hover:bg-[#e8ae00] text-bw-ink font-extrabold py-4 rounded-md text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending
                ? <BounceLoading fill="#0A0A0A" barHeight={12} />
                : <><span>Set New Password</span><span>→</span></>
              }
            </button>
          </form>

          {/* Back to Login */}
          <button
            onClick={() => navigate("/login")}
            className="mt-6 flex items-center gap-2 text-sm text-primary hover:underline font-medium transition-colors"
          >
            <IoArrowBack size={16} />
            <span>Back to Login</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-bw-page" />
            <span className="text-bw-muted text-sm">Almost done!</span>
            <div className="flex-1 h-px bg-bw-page" />
          </div>

          <p className="text-center text-[12px] text-bw-muted mt-4">
            Didn't receive the code? Check your SMS or try requesting a new one.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
