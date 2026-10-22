import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiGift } from "react-icons/fi";
import { FaPlane } from "react-icons/fa6";

import BaseClass from "../../services/BaseClass";

const slides = [
  {
    id: "aviator",
    eyebrow: "Crash game",
    title: "Aviator",
    text: "Cash out before the plane flies away. Rounds start every few seconds.",
    cta: "Play Aviator",
    to: "/aviator",
    requiresAuth: true,
    theme: "green",
  },
  {
    id: "refer",
    eyebrow: "Refer & earn",
    title: "Bring a friend. Get paid.",
    text: "Earn a bonus for every friend who joins Bingwake and places their first bet.",
    cta: "Invite friends",
    to: "/refer",
    requiresAuth: true,
    theme: "dark",
  },
  {
    id: "deposit",
    eyebrow: "Instant deposits",
    title: "Fund with M-Pesa",
    text: "Top up your wallet in under a minute and get straight into the action.",
    cta: "Deposit now",
    to: "/deposit",
    requiresAuth: true,
    theme: "light",
  },
];

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const base = new BaseClass();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (step) =>
    setIndex((current) => (current + step + slides.length) % slides.length);

  return (
    <div className="group relative h-[190px] overflow-hidden rounded-md border border-bw-line bg-white sm:h-[204px] xl:h-[220px]">
      {slides.map((slide, slideIndex) => {
        const destination = slide.requiresAuth && !base.isAuthenticated() ? "/login" : slide.to;
        const active = slideIndex === index;

        const theme =
          slide.theme === "green"
            ? "bg-bw-green text-white"
            : slide.theme === "dark"
              ? "bg-bw-green-dark text-white"
              : "bg-white text-bw-ink";

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${theme} ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!active}
          >
            {slide.theme === "green" && (
              <>
                <FaPlane
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 top-1/2 h-36 w-36 -translate-y-1/2 rotate-[-12deg] text-white/20 sm:right-10 sm:h-52 sm:w-52"
                />
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[20px] border-bw-yellow/15" />
              </>
            )}

            {slide.theme === "dark" && (
              <>
                <FiGift
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 h-32 w-32 -translate-y-1/2 text-white/10 sm:right-8"
                />
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[20px] border-bw-yellow/10" />
              </>
            )}

            {slide.theme === "light" && (
              <img
                src="/mpesa.png"
                alt="M-Pesa"
                className="pointer-events-none absolute right-4 top-1/2 h-12 w-auto -translate-y-1/2 opacity-90 sm:right-8 sm:h-14"
              />
            )}

            <div className="relative flex h-full max-w-[78%] flex-col justify-center gap-2 px-4 sm:max-w-[62%] sm:px-6">
              <span
                className={`text-[9px] font-extrabold uppercase tracking-[0.18em] ${
                  slide.theme === "green" || slide.theme === "dark" ? "text-bw-yellow" : "text-bw-green"
                }`}
              >
                {slide.eyebrow}
              </span>
              <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[30px]">
                {slide.title}
              </h3>
              <p
                className={`hidden max-w-[300px] text-[12px] leading-snug sm:block ${
                  slide.theme === "green" || slide.theme === "dark" ? "text-white/75" : "text-bw-ink/70"
                }`}
              >
                {slide.text}
              </p>
              <Link
                to={destination}
                className={`mt-1 inline-flex w-fit items-center rounded px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide transition-colors ${
                  slide.theme === "green" || slide.theme === "dark"
                    ? "bg-bw-yellow text-bw-ink hover:brightness-95"
                    : "bg-bw-green text-white hover:bg-bw-green-dark"
                }`}
              >
                {slide.cta}
              </Link>
              {slide.id === "aviator" && (
                <p className="hidden text-[10px] font-medium text-white/55 sm:block">
                  Min. stake KES 10 · Instant cashout
                </p>
              )}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous promotion"
        className="absolute left-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white opacity-0 transition-opacity hover:bg-black/35 group-hover:opacity-100 sm:flex"
      >
        <FiChevronLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next promotion"
        className="absolute right-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white opacity-0 transition-opacity hover:bg-black/35 group-hover:opacity-100 sm:flex"
      >
        <FiChevronRight size={16} />
      </button>

      <div className="absolute bottom-2.5 left-4 z-10 flex gap-1.5 sm:left-6">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(slideIndex)}
            aria-label={`Go to ${slide.title}`}
            className={`h-1.5 rounded-full transition-all ${
              slideIndex === index
                ? `w-5 ${slides[index].theme === "light" ? "bg-bw-ink" : "bg-bw-yellow"}`
                : `w-1.5 ${slides[index].theme === "light" ? "bg-black/20 hover:bg-black/35" : "bg-white/45 hover:bg-white/70"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
