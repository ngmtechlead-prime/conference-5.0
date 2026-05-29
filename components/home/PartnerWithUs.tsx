"use client";

import { motion } from "motion/react";

export default function PartnerWithUs() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <h2 className="text-3xl sm:text-4xl font-normal leading-none tracking-[-0.04em] text-white">
            Put your brand in front of the{" "}
            <span className="font-bold text-[#0DA04C]">next decade of leaders.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-6 justify-between"
        >
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Conference 5.0 puts your brand in front of 2,000 attendees —
            university students, early-career professionals, founders, and
            senior operators across Nigeria. Sponsorship slots are limited and
            tiered to fit the kind of presence you want.
          </p>

          <div className="border-t border-white/10 pt-6 space-y-5">
            <a
              href="mailto:conference@ngmplatform.com"
              className="block text-xl sm:text-2xl font-bold tracking-[-0.02em] hover:text-[#0DA04C] transition-colors break-all"
            >
              conference@ngmplatform.com
            </a>
            <a
              href="mailto:conference@ngmplatform.com?subject=Partnership%20enquiry%20—%20NGM%20Conference%205.0"
              className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] hover:bg-[#0DA04C] hover:text-white font-bold text-sm px-7 py-3.5 rounded-md transition-colors duration-200 tracking-wide w-fit"
            >
              Become a partner
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
