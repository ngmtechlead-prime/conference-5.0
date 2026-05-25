"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-10-03T09:00:00+01:00").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return { days: 0, hours: 0, minutes: 0, ready: false };
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, ready: true };
}

type Tier = {
  name: string;
  blurb: string;
  original: string;
  price: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Student",
    blurb: "For currently enrolled undergraduates and postgraduates.",
    original: "₦10,000",
    price: "₦7,500",
  },
  {
    name: "Graduate",
    blurb: "For early-career professionals and recent graduates.",
    original: "₦15,000",
    price: "₦11,250",
    featured: true,
  },
];

export default function TicketsCTA() {
  const { days, hours, minutes, ready } = useCountdown();

  return (
    <section
      id="tickets"
      className="relative w-full bg-[#0F1990] text-white py-16 lg:py-24 overflow-hidden font-epilogue"
    >
      <div
        className="absolute inset-0 opacity-[0.18] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/gallery/Pattern.png")` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,160,76,0.25),transparent_55%)]" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-[150px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-normal leading-none tracking-[-0.04em]">
            Lock in the early bird price{" "}
            <span className="font-bold text-[#0DA04C]">while it lasts.</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Early bird tickets are 25% off the standard rate. Prices return to
            full once the window closes — and the room caps at 2,000.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 border-y border-white/10 py-6"
        >
          <p className="text-sm text-white/60">Conference opens in</p>
          <div className="flex items-end gap-3 sm:gap-5">
            {[
              { label: "Days", value: days },
              { label: "Hrs", value: hours },
              { label: "Min", value: minutes },
            ].map((u, idx) => (
              <div key={u.label} className="flex items-end gap-3 sm:gap-5">
                <div className="flex flex-col items-start">
                  <span className="text-3xl sm:text-5xl font-bold tabular-nums tracking-tight">
                    {ready ? String(u.value).padStart(2, "0") : "--"}
                  </span>
                  <span className="text-xs text-white/50 mt-1">
                    {u.label}
                  </span>
                </div>
                {idx < 2 && (
                  <span className="text-3xl sm:text-5xl text-white/20 pb-5">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col ${
                t.featured
                  ? "bg-[#0DA04C] text-white"
                  : "bg-white text-[#0F1990]"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-2 bg-[#06093d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Most popular
                </span>
              )}

              <div className="flex items-center justify-between mb-5">
                <h3
                  className={`text-2xl font-bold tracking-[-0.02em] ${
                    t.featured ? "text-white" : "text-[#0F1990]"
                  }`}
                >
                  {t.name}
                </h3>
                <span
                  className={`text-sm font-semibold ${
                    t.featured ? "text-white/80" : "text-[#0DA04C]"
                  }`}
                >
                  Early bird
                </span>
              </div>

              <p
                className={`text-base leading-relaxed mb-8 max-w-xs ${
                  t.featured ? "text-white/80" : "text-[#4a5565]"
                }`}
              >
                {t.blurb}
              </p>

              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] leading-none">
                  {t.price}
                </span>
                <span
                  className={`text-lg sm:text-xl line-through pb-1 ${
                    t.featured ? "text-white/50" : "text-[#4a5565]/60"
                  }`}
                >
                  {t.original}
                </span>
              </div>
              <p
                className={`text-sm mb-8 ${
                  t.featured ? "text-white/70" : "text-[#4a5565]"
                }`}
              >
                Save 25% — limited
              </p>

              <a
                href="https://bitooqoh.com/explore/ngm-conference-5.0"
                target="_blank"
                rel="noreferrer noopener"
                className={`mt-auto inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-md transition-colors duration-200 tracking-wide ${
                  t.featured
                    ? "bg-white text-[#0DA04C] hover:bg-[#06093d] hover:text-white"
                    : "bg-[#0F1990] text-white hover:bg-[#06093d]"
                }`}
              >
                Get {t.name.toLowerCase()} ticket
                <Image
                  src="/icons/rightArrow.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-white/60 text-sm max-w-lg">
          Prices return to standard rates after the early bird window closes.
          Tickets cap at 2,000.
        </p>
      </div>
    </section>
  );
}
