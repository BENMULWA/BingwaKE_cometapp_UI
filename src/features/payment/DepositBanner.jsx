import { useState } from "react";
import DepositModal from "./DepositModal";
import BaseClass from "../../services/BaseClass";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

export default function DepositBanner() {
  const [open, setOpen] = useState(false);
  const Base = new BaseClass();

  const navigate = useNavigate();

  const handleDepositClick = () => {
    if (!Base.isAuthenticated()) {
      navigate("/login");
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="bg-secondary rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full mx-2">
      {/* Left Text */}
      <div className="text-bw-muted text-base sm:text-base font-semibold">
        Want to play?{" "}
        <span className="text-bw-muted">Deposit now</span>
      </div>
      {/* Center Logo */}
      <div className="flex justify-center">
        <img src="/mpesa.png" alt="M-PESA" className="h-10" />
      </div>
      {/* Right Button */}
      <button
        onClick={handleDepositClick}
        className="bg-bw-yellow cursor-pointer hover:bg-[#e8ae00] text-bw-ink font-semibold px-5 py-2 rounded-lg text-sm sm:text-base flex items-center gap-2"
      >
        <FiPlusCircle /> Deposit Now
      </button>{" "}
      {open && <DepositModal onClose={() => setOpen(false)} />}
    </div>
  );
}
