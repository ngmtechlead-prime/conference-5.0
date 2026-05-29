"use client";

import { motion } from "motion/react";

const sessions = [
  {
    n: "01",
    title: "Medical Session",
    blurb:
      "On-site wellness checks and consultations from partner practitioners.",
  },
  {
    n: "02",
    title: "Pre-event Session",
    blurb:
      "Welcome orientation and small-group introductions before the main programme.",
  },
  {
    n: "03",
    title: "Breakfast Session",
    blurb:
      "Curated tables — pairing attendees with operators in their domain.",
  },
  {
    n: "04",
    title: "Keynote Speech & Panel Session",
    blurb:
      "Headline addresses and themed panels from the day's senior speakers.",
  },
  {
    n: "05",
    title: "Competitions & Awards",
    blurb:
      "Live pitches for the DARE Nigeria Challenge and Afropreneur SME Pitch 5.0.",
  },
  {
    n: "06",
    title: "Post-event Networking & Mocktail",
    blurb: "Open floor — attendees, sponsors, and speakers in the same room.",
  },
];

export default function Programme() {
  return (
    <section
      id="programme"
      className="w-full bg-[#fafaf8] py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em]">
          What your day{" "}
          <span className="font-bold text-[#0DA04C]">looks like.</span>
        </h2>
        <p className="text-[#4a5565] text-base sm:text-lg mt-4 leading-relaxed">
          A high-level walkthrough of Conference 5.0. Detailed timings and
          session leads will land closer to October.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div
          className="absolute left-6 sm:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#0F1990]/20 to-transparent"
          aria-hidden
        />

        <div className="space-y-10 sm:space-y-14">
          {sessions.map((s, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex sm:grid sm:grid-cols-2 sm:gap-12 items-start"
              >
                <div
                  className="absolute left-6 sm:left-1/2 -translate-x-1/2 mt-2 z-10"
                  aria-hidden
                >
                  <div className="h-3 w-3 rounded-full bg-[#0DA04C] ring-4 ring-[#fafaf8]" />
                </div>

                <div
                  className={`pl-16 sm:pl-0 ${
                    isRight ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"
                  }`}
                >
                  <p className="text-sm font-bold text-[#0DA04C] mb-2">
                    Session {s.n}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#0F1990] tracking-[-0.04em] leading-none">
                    {s.title}
                  </h3>
                  <p className="text-[#4a5565] text-base mt-3 leading-relaxed max-w-md">
                    {s.blurb}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
