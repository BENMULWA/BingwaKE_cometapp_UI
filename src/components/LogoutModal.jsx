import React from "react";
import { FiLogOut } from "react-icons/fi";

function LogoutModal({ open, onConfirm, onCancel }) {
  if (!open) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bw-page ">
      {/* Modal Box */}
      <div
        className="w-[90%] max-w-md rounded-lg shadow-xl border border-bw-line 
                      bg-white p-8 text-center"
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30">
            <FiLogOut className="text-primary/80 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-bw-ink mb-3">
          Confirm Logout
        </h2>

        {/* Message */}
        <p className="text-sm text-bw-ink/90 mb-8">
          Are you sure you want to log out of your account?
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-bw-line text-bw-ink/90 
                       bg-background  transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-lg bg-primary 
                       text-black font-semibold shadow-md hover:opacity-90 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
