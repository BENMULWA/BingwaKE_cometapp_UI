import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCoins, FaShoppingBag, FaUsers } from "react-icons/fa";

function BannerPopup({ open, onClose, bannerType }) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startY = useRef(0);
  const modalRef = useRef(null);

  if (!open && !isClosing) return null;

  const banners = {
    referral: {
      title: "Referral Rewards!",
      subtitle: "Invite friends and earn amazing rewards!",
      buttonText: "Start Referring",
      route: "/refer",
      icon: FaUsers,
    },
    cashback: {
      title: "Cashback Bonus!",
      subtitle: "Get cashback on every bet you place!",
      buttonText: "Claim Cashback",
      route: "/profile",
      icon: FaCoins,
    },
    voucher: {
      title: "Shopping Vouchers!",
      subtitle: "Win exclusive shopping vouchers daily!",
      buttonText: "Get Vouchers",
      route: "/promotions",
      icon: FaShoppingBag,
    },
  };

  const bannerData = banners[bannerType] || banners.referral;
  const Icon = bannerData.icon;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    // Only allow dragging down
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // If dragged more than 100px, close the modal
    if (dragY > 100) {
      handleClose();
    }
    setDragY(0);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 transition-colors duration-300 ${isClosing ? "bg-black/0" : "bg-black/50"
        }`}
      onClick={handleClose}
    >
      {/* Modal Container - Bottom sheet on mobile, centered on desktop */}
      <div
        ref={modalRef}
        className={`relative w-full md:max-w-sm bg-white rounded-t-xl md:rounded-lg overflow-hidden shadow-xl flex flex-col max-h-[85vh] md:max-h-[90vh] ${isClosing
            ? "animate-slide-down"
            : isDragging
              ? ""
              : "animate-slide-up"
          }`}
        style={{
          transform: isDragging ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle - Mobile only */}
        <div
          className="flex justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-bw-line rounded-full"></div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="text-xl font-bold text-bw-ink tracking-tight">
            {bannerData.title}
          </h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full
            hover:bg-bw-page transition-colors duration-200"
          >
            <IoMdClose className="text-bw-muted text-2xl" />
          </button>
        </div>

        {/* Content - Centered on mobile, normal on desktop */}
        <div className="flex-1 flex flex-col justify-center px-5 pb-6 md:pb-6">
          {/* Illustration */}
          <div className="flex justify-center py-8 md:py-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-lg border border-bw-line bg-bw-green-soft">
              <Icon className="text-5xl text-bw-green" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-center text-bw-ink text-lg md:text-base mb-8 md:mb-6 px-4 md:px-2">
            {bannerData.subtitle}
          </p>

          {/* CTA Button */}
          <Link
            to={bannerData.route}
            onClick={handleClose}
            className="block w-full py-3.5 bg-bw-yellow hover:bg-[#e8ae00] text-bw-ink text-center font-bold text-base rounded-md transition-colors"
          >
            {bannerData.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BannerPopup;
