"use client";

import { motion } from "motion/react";

const lines = [
  "One day. One room.",
  "Students, founders, and operators — side by side.",
  "Keynotes, panels, competitions, and curated networking.",
  "Years of access, compressed into a single day.",
];

export default function WhatIsNGM() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-[#0F1990] leading-[1.3] tracking-[-0.03em]"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
