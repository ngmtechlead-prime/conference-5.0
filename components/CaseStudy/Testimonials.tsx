"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "The NGM Case Study Competition completely changed how I approach business problems. Presenting to industry experts was an experience I'll never forget.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    name: "Adaeze Okonkwo",
    role: "2024 Grand Finalist",
  },
  {
    text: "I came in knowing very little about research methodology. I left with a structured framework for analysis and a network of brilliant minds.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Tunde Afolabi",
    role: "Quarter-Finalist, 2024",
  },
  {
    text: "The mentorship I received during the competition was exceptional. My mentor pushed me to think beyond the obvious and consider systemic factors.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
    name: "Chisom Eze",
    role: "2nd Place Winner, 2024",
  },
  {
    text: "NGM gave me the platform to showcase my analytical skills to professionals who actually matter in the Nigerian business ecosystem.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Emeka Nwosu",
    role: "Semi-Finalist, 2024",
  },
  {
    text: "The bootcamp sessions were intense but invaluable. We covered case structuring, data interpretation, and storytelling—skills I use in my job every day.",
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=80&h=80&fit=crop&crop=face",
    name: "Fatima Bello",
    role: "1st Place Winner, 2024",
  },
  {
    text: "Competing at NGM opened doors I didn't even know existed. I connected with three mentors who have since offered career guidance.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face",
    name: "David Osei",
    role: "Quarter-Finalist, 2024",
  },
  {
    text: "What surprised me most was how collaborative the environment was. Even competing against each other, we all wanted everyone to grow.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
    name: "Blessing Okafor",
    role: "Semi-Finalist, 2024",
  },
  {
    text: "The feedback from the judges after each round was incredibly constructive. It helped me see gaps in my analysis I hadn't noticed before.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    name: "Seun Adeyemi",
    role: "3rd Place Winner, 2024",
  },
  {
    text: "I'm a professional with 5 years of experience and I still walked away learning so much. The calibre of participants and judges is truly world-class.",
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
            <span className="font-black text-[#0DA04C]">Alumni</span> Say
          </h2>
          <p className="text-[#4a5565] text-sm sm:text-base mt-4 font-epilogue max-w-lg">
            Hear from past participants who competed, grew, and launched their
            careers from the NGM Case Study Competition.
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
