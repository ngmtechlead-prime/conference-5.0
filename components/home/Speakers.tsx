"use client";

import { motion } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";

type Speaker = {
  name: string;
  title: string;
  org: string;
  // image: string;
};

const speakers: Speaker[] = [
  {
    name: "Dr. Akintoye Akindele",
    title: "Chairman",
    org: "Platform Capital Investment Partners",
  },
  {
    name: "Kola Adesina",
    title: "Group Managing Director",
    org: "Sahara Power Group",
    // image: "/gallery/DrKolaAdesina.png"
  },
  {
    name: "Dr. Omobola Johnson",
    title: "Senior Partner",
    org: "TLcom Capital",
  },
  {
    name: "Mrs. Amal Hassan",
    title: "Founder",
    org: "Outsource Global",
  },
  {
    name: "Modupe Kadiri",
    title: "Chief Financial Officer",
    org: "MTN Nigeria",
  },
  {
    name: "Chikezie Nwosu",
    title: "Chief Executive Officer",
    org: "Waltersmith Petroman Oil Limited",
  },
  {
    name: "Mrs. Kafilat Araoye",
    title: "Managing Director & CEO",
    org: "Lotus Bank",
  },
  {
    name: "Mohammed Abdul-Razaq",
    title: "Senior Vice President",
    org: "Africa Finance Corporation",
  },
];

/** Generates a two-tone colour pair from the speaker name for the placeholder */
function getPlaceholderColors(name: string) {
  const palettes = [
    { bg: "#0B0E4A", text: "rgba(255,255,255,0.12)" },
    { bg: "#0F1990", text: "rgba(255,255,255,0.10)" },
    { bg: "#162058", text: "rgba(255,255,255,0.10)" },
    { bg: "#1A237E", text: "rgba(255,255,255,0.09)" },
    { bg: "#0D1B6F", text: "rgba(255,255,255,0.11)" },
    { bg: "#0A1250", text: "rgba(255,255,255,0.10)" },
    { bg: "#131B6E", text: "rgba(255,255,255,0.12)" },
    { bg: "#0E1580", text: "rgba(255,255,255,0.10)" },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palettes[Math.abs(hash) % palettes.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const colors = getPlaceholderColors(speaker.name);
  const initials = getInitials(speaker.name);

  return (
    <div className="bg-[#0F1990] rounded-lg p-3 sm:p-4 h-full flex flex-col">
      {/* Image placeholder with initials */}
      <div
        className="relative w-full aspect-[4/5] rounded-sm overflow-hidden flex items-center justify-center mb-3 sm:mb-4"
        style={{ backgroundColor: colors.bg }}
      >
        <span
          className="text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-[-0.06em] select-none leading-none"
          style={{ color: colors.text }}
          aria-hidden
        >
          {initials}
        </span>
      </div>

      {/* Info strip */}
      <div className="bg-[#E6F7EC] rounded-sm p-3 sm:p-4 mt-auto">
        <p className="text-[#0F1990] font-semibold text-base sm:text-lg lg:text-xl tracking-tighter font-epilogue leading-tight">
          {speaker.name}
        </p>
        <p className="text-[#0F1990]/70 text-xs sm:text-sm tracking-tight mt-0.5 leading-snug">
          {speaker.title}, <span className="font-semibold">{speaker.org}</span>
        </p>
      </div>
    </div>
  );
}

export default function Speakers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by one card width + gap
    const cardWidth =
      el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 340;
    const amount = direction === "left" ? -(cardWidth + 24) : cardWidth + 24;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] max-w-xl">
            The calibre of{" "}
            <span className="font-bold text-[#0DA04C]">the room.</span>
          </h2>
          <p className="text-[#4a5565] text-base sm:text-lg max-w-md leading-relaxed mt-4">
            A few of the senior operators who have spoken at past NGM editions.
            Conference 5.0 lineup is finalising — announcements drop in waves.
          </p>
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll speakers left"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              canScrollLeft
                ? "border-[#0F1990] text-[#0F1990] hover:bg-[#0F1990] hover:text-white cursor-pointer"
                : "border-[#0F1990]/20 text-[#0F1990]/20 cursor-not-allowed"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11.25 13.5L6.75 9L11.25 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll speakers right"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              canScrollRight
                ? "border-[#0F1990] text-[#0F1990] hover:bg-[#0F1990] hover:text-white cursor-pointer"
                : "border-[#0F1990]/20 text-[#0F1990]/20 cursor-not-allowed"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.75 4.5L11.25 9L6.75 13.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {speakers.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-[280px] sm:w-[calc((100%-48px)/3)] shrink-0"
          >
            <SpeakerCard speaker={s} />
          </motion.div>
        ))}

        {/* Coming soon card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-[280px] sm:w-[calc((100%-48px)/3)] shrink-0"
        >
          <div className="h-full rounded-lg border-2 border-dashed border-[#0DA04C]/40 bg-[#0DA04C]/[0.04] flex flex-col justify-center items-start p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0DA04C] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0DA04C] animate-pulse" />
              Coming soon
            </span>
            <h3 className="text-xl sm:text-2xl font-normal text-[#0F1990] tracking-[-0.03em] leading-tight">
              2026 lineup — announcements in waves.
            </h3>
            <p className="text-sm text-[#4a5565] mt-2">
              Follow @NGM_Platform for first looks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
