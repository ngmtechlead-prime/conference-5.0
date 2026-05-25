"use client";

import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Edition = {
  label: string;
  value: number;
  suffix: string;
  note: string;
};

const editions: Edition[] = [
  { label: "Conf 1.0", value: 700, suffix: "+", note: "Where it began" },
  { label: "Conf 2.0", value: 1000, suffix: "+", note: "Doubled the room" },
  { label: "Conf 3.0", value: 1500, suffix: "+", note: "Outgrew the venue" },
  { label: "Conf 4.0", value: 1500, suffix: "+", note: "Held the line" },
  { label: "Conf 5.0", value: 2000, suffix: "", note: "The target — 2026" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Momentum() {
  return (
    <section className="relative w-full bg-[#0F1990] text-white py-16 lg:py-24 overflow-hidden font-epilogue">
      <div
        className="absolute inset-0 opacity-[0.08] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url("/gallery/Pattern.png")` }}
        aria-hidden
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-[150px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-normal leading-none tracking-[-0.04em] text-white">
            Every year, the room gets{" "}
            <span className="font-bold text-[#0DA04C]">bigger.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg mt-4 max-w-lg leading-relaxed">
            This isn&apos;t a retrospective. It&apos;s a runway — look at where
            this is going.
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-10">
          {editions.map((e, i) => {
            const isFinal = i === editions.length - 1;
            const sizes = [
              "text-[clamp(2.75rem,7vw,5rem)]",
              "text-[clamp(3rem,8vw,6rem)]",
              "text-[clamp(3.5rem,9vw,7rem)]",
              "text-[clamp(4rem,10vw,8rem)]",
              "text-[clamp(4.5rem,13vw,10rem)]",
            ];
            return (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-12 gap-4 items-end border-b border-white/10 pb-6 lg:pb-10"
              >
                <div className="col-span-12 sm:col-span-3 lg:col-span-2 flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
                  <p
                    className={`text-sm font-semibold ${
                      isFinal ? "text-[#0DA04C]" : "text-white/40"
                    }`}
                  >
                    {e.label}
                  </p>
                  <p className="text-sm text-white/50 sm:mt-2">{e.note}</p>
                </div>
                <div className="col-span-12 sm:col-span-9 lg:col-span-10">
                  <p
                    className={`font-bold leading-[0.85] tracking-[-0.06em] ${
                      sizes[i]
                    } ${isFinal ? "text-[#0DA04C]" : "text-white"}`}
                  >
                    <Counter to={e.value} suffix={e.suffix} />
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-white/60 text-sm sm:text-base max-w-lg"
        >
          Tickets close once we hit 2,000.
        </motion.p>
      </div>
    </section>
  );
}
