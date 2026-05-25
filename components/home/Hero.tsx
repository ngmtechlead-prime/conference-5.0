"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-10-03T09:00:00+01:00").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ready: false };
  }
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, ready: true };
}

export default function Hero() {
  const { days, hours, minutes, seconds, ready } = useCountdown();

  const unit = (label: string, value: number) => (
    <div className="flex flex-col items-center min-w-[64px] sm:min-w-[84px]">
      <span className="font-epilogue text-3xl sm:text-5xl font-bold text-white tabular-nums tracking-tight">
        {ready ? String(value).padStart(2, "0") : "--"}
      </span>
      <span className="mt-1 text-[11px] sm:text-xs text-white/50 font-epilogue">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#05084a] text-white font-epilogue">
      <div
        className="absolute inset-0 opacity-[0.18] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/gallery/Pattern.png")` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,160,76,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(15,25,144,0.7),transparent_60%)]" />

      <div className="relative z-10 flex flex-col min-h-[calc(100vh-88px)] px-4 sm:px-6 lg:px-[150px] py-16 lg:py-24">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[56px] font-epilogue font-normal text-white leading-[1.1] tracking-[-0.06em] max-w-4xl"
          >
            Building the{" "}
            <span className="font-bold text-[#0DA04C]">Future:</span>
            <br />
            The Urgency of{" "}
            <span className="font-bold text-[#0DA04C]">Now.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-white/70 text-sm sm:text-lg leading-relaxed"
          >
            NGM Conference 5.0 — a single day in Lagos, October 3, 2026.
            Two thousand attendees. The thinkers, builders, and decision-makers
            shaping the next decade of African ambition, all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#tickets"
              className="inline-flex items-center gap-2 bg-[#0DA04C] hover:bg-[#0b8c41] text-white font-bold text-sm px-7 py-3.5 rounded-md transition-colors duration-200 tracking-wide"
            >
              Get Your Ticket
              <Image
                src="/icons/rightArrow.svg"
                alt=""
                width={16}
                height={16}
              />
            </a>
            <a
              href="#programme"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold tracking-wide transition-colors"
            >
              See the programme
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <p className="text-sm text-white/50 mb-4">
            Counting down to October 3, 2026
          </p>
          <div className="flex items-end gap-3 sm:gap-6">
            {unit("Days", days)}
            <span className="text-3xl sm:text-5xl text-white/30 pb-7">:</span>
            {unit("Hours", hours)}
            <span className="text-3xl sm:text-5xl text-white/30 pb-7">:</span>
            {unit("Minutes", minutes)}
            <span className="text-3xl sm:text-5xl text-white/30 pb-7">:</span>
            {unit("Seconds", seconds)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
