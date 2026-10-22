import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AppDownloadPopup({ isOpen, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Only show on mobile
  if (!isOpen || !isMobile) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white z-40 transition-opacity duration-500 opacity-100"
        onClick={onClose}
      />
      {/* Bottom Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-0 opacity-100">
        <div className="relative bg-white text-bw-ink rounded-t-xl border-t border-bw-line p-6 shadow-[0_-8px_24px_rgba(10,10,10,0.12)] w-full max-w-md mx-auto transform transition-all duration-700 scale-100">
          {/* Subtle glowing top border */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-bw-yellow" />

          {/* Handle bar */}
          <div className="w-14 h-1.5 bg-bw-line rounded-full mx-auto mb-5" />

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-center text-bw-ink">
            Get Our Android App
          </h2>
          <p className="text-sm text-bw-muted text-center mb-6">
            Never Miss Anything, Download Now.
          </p>

          {/* Android Icon */}
          <img
            src="/app-1.png"
            alt="Android"
            className="w-16 h-16 mx-auto mb-6"
          />

          {/* Install button */}
          <a
            href="/ndege.apk"
            onClick={(e) => {
              e.preventDefault();
              toast.success("Coming Soon!");
            }}
            className="block w-full bg-bw-yellow text-bw-ink font-bold py-3 rounded-md mb-5 transition-colors text-center cursor-pointer hover:bg-[#e8ae00]"
          >
            Install Now
          </a>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center mx-auto rounded-full bg-bw-page hover:bg-bw-line text-bw-ink transition-all"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
