import AuthBrandPanel from "./AuthBrandPanel";
import Wordmark from "../../components/brand/Wordmark";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../hooks/useAuth";
import { BounceLoading } from "respinner";
import { normalizeKenyanPhone } from "../../utils/phone";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  }
  const { forgotPasswordAPI, isPending: isLoading } = useForgotPassword();
  const { handleSubmit, register } = useForm();

  function submitData(data) {
    const phone = normalizeKenyanPhone(data.phone);

    forgotPasswordAPI({ ...data, phone }, {
      onSuccess: (dt) => {
        navigate(`/reset?phone=${encodeURIComponent(phone)}`);
        toast.success(dt?.message);
      },
      onError: (dt) => {
        toast.error(dt?.message || "Something went wrong, kindly try again");
      },
    });
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? "bg-black/0 backdrop-blur-0" : "bg-black/75 "
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-4xl bg-white rounded-lg border border-bw-line overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh] ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
      >

        {/* TOP BAR */}
        <div className="absolute top-0 right-0 left-0 p-4 flex justify-between items-center z-10">
          <p className="hidden text-bw-muted text-xs ml-auto mr-4 sm:block">
            Remember your password?{" "}
            <Link to="/login" className="text-primary font-bold cursor-pointer hover:underline">
              Sign in
            </Link>
          </p>
          <button
            onClick={handleClose}
            className="bg-bw-page p-1.5 rounded-md text-bw-muted hover:text-bw-ink transition-colors"
          >
            <IoMdClose size={16} />
          </button>
        </div>

        <AuthBrandPanel />

        {/* RIGHT: Form */}
        <div className="flex-1 p-8 pb-24 md:p-16 flex flex-col justify-start bg-white md:justify-center overflow-y-auto">
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-2 md:hidden">
              <img src="/bingwake-mark.svg" alt="" className="h-10 w-11 object-contain" />
              <Wordmark tone="dark" size="lg" tagline />
            </div>
            <h1 className="text-bw-ink text-3xl font-extrabold mb-2">Recover Account</h1>
            <p className="text-bw-muted text-sm">
              Enter your phone number and we'll send you a recovery code
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(submitData)}>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-bw-ink text-sm">Phone Number</label>
              <input
                type="tel"
                placeholder="0700 000 000"
                {...register("phone", { required: true })}
                className="w-full bg-surface border border-bw-line rounded-md px-4 py-4 text-bw-ink text-base placeholder:text-bw-muted outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bw-yellow hover:bg-[#e8ae00] text-bw-ink font-extrabold py-4 rounded-md text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? <BounceLoading fill="#0A0A0A" barHeight={12} />
                : <><span>Send Recovery Code</span><span>→</span></>
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
            <span className="text-bw-muted text-sm">Need help?</span>
            <div className="flex-1 h-px bg-bw-page" />
          </div>

          <p className="text-center text-[12px] text-bw-muted mt-4">
            If you're having trouble recovering your account, please contact our support team.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
