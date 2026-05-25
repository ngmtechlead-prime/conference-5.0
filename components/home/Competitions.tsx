"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const competitions = [
  {
    name: "DARE Nigeria Challenge",
    partner: "NGM × Dr. Kola Adesina",
    description:
      "A flagship innovation competition to surface and scale ideas with national impact.",
    href: "/competitions/dare-nigeria",
    image: "/gallery/DrKolaAdesina.png",
    cta: "Learn more",
  },
  {
    name: "Afropreneur SME Pitch 5.0",
    partner: "NGM × Afropreneur × Verraki",
    description:
      "An entrepreneurship grant programme for early-stage founders building in Nigeria.",
    href: "/competitions/sme-pitch",
    image: "/gallery/MuslimahPitcher.png",
    cta: "Learn more",
  },
  {
    name: "Case Study Competition",
    partner: "NGM Case Study & Research",
    description:
      "From insight to action — analysing today's evidence to solve challenges and shape tomorrow.",
    href: "/competitions/case-study",
    image: "/gallery/more-than-a-pitch-competition.png",
    cta: "Learn more",
  },
];

export default function Competitions() {
  return (
    <section className="w-full bg-white font-epilogue">
      <div className="px-4 sm:px-6 lg:px-[150px] py-16 lg:py-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-normal leading-none tracking-[-0.04em] text-[#0F1990]">
            Three stages. One{" "}
            <span className="font-bold text-[#0DA04C]">opportunity.</span>
          </h2>
          <p className="text-[#4a5565] text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Conference 5.0 hosts three flagship competitions — each with
            national reach and a runway that extends well beyond the stage.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              {/* Image frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Text content */}
              <div>
                <p className="text-xs text-[#4a5565] mb-1.5 tracking-wide uppercase">
                  {c.partner}
                </p>
                <h3 className="text-xl font-bold text-[#0F1990] tracking-[-0.02em] leading-tight">
                  {c.name}
                </h3>
                <p className="text-[#4a5565] text-sm leading-relaxed mt-2 line-clamp-2">
                  {c.description}
                </p>
              </div>

              {/* CTA — plain text link, no arrow */}
              <Link
                href={c.href}
                className="inline-block mt-4 text-sm font-semibold text-[#0F1990] hover:text-[#0DA04C] border-b border-[#0F1990]/30 hover:border-[#0DA04C] pb-0.5 transition-colors duration-200"
              >
                {c.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
