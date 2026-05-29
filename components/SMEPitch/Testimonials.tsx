"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Pitching at the NGM SME Competition gave my business a credibility boost I couldn't have bought. Investors take us seriously now.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    name: "Adaeze Okonkwo",
    role: "2024 SME Finalist",
  },
  {
    text: "The judges didn't just score us — they gave feedback that changed how I think about scaling my business.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Tunde Afolabi",
    role: "Quarter-Finalist, 2024",
  },
  {
    text: "Three months after the competition, I closed a funding round. The connections I made at NGM made the introduction.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
    name: "Chisom Eze",
    role: "2nd Place Winner, 2024",
  },
  {
    text: "As a solo founder, I found the mentorship component invaluable. Having experienced entrepreneurs in my corner changed everything.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Emeka Nwosu",
    role: "Semi-Finalist, 2024",
  },
  {
    text: "Winning the SME Pitch was a milestone, but what came after — the press coverage and ecosystem support — was the real prize.",
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=80&h=80&fit=crop&crop=face",
    name: "Fatima Bello",
    role: "1st Place Winner, 2024",
  },
  {
    text: "The bootcamp they ran before the semi-finals taught me things my MBA didn't. Hyper-practical and brutally honest in the best way.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face",
    name: "David Osei",
    role: "Quarter-Finalist, 2024",
  },
  {
    text: "I almost didn't apply because I thought my business wasn't big enough. I'm so glad I did — it was the push we needed.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
    name: "Blessing Okafor",
    role: "Semi-Finalist, 2024",
  },
  {
    text: "The regional media feature alone brought in more customer enquiries than any campaign we'd run before.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    name: "Seun Adeyemi",
    role: "3rd Place Winner, 2024",
  },
  {
    text: "NGM doesn't just run a competition — they build an ecosystem. I still collaborate with people I met there a year later.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
    name: "Ngozi Ibe",
    role: "Grand Finalist, 2024",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-[150px] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] font-epilogue max-w-xl">
            What Our{" "}
            <span className="font-black text-[#0DA04C]">Past Winners</span> Say
          </h2>
          <p className="text-[#4a5565] text-sm sm:text-base mt-4 font-epilogue max-w-lg">
            Hear from past participants who pitched, competed, and grew their
            businesses through the NGM SME Pitch Competition.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={16}
          />
        </div>
      </div>
    </section>
  );
}
