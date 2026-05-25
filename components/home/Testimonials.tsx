"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "I walked into NGM as a student. I left with a mentor, a referral, and a clearer picture of the next five years.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    name: "Adaeze Okonkwo",
    role: "Conference 4.0 Attendee",
  },
  {
    text: "Compressed years of access into a single day. The keynote alone was worth the trip.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    name: "Tunde Afolabi",
    role: "Conference 3.0 Attendee",
  },
  {
    text: "The energy of the room is unlike anything else in the calendar. You don't leave the same way you arrived.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
    name: "Chisom Eze",
    role: "Conference 4.0 Attendee",
  },
  {
    text: "I came expecting motivational talks. I left with three concrete intros that turned into a job offer.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Emeka Nwosu",
    role: "Conference 2.0 Attendee",
  },
  {
    text: "Every panel was a masterclass. The level of speakers NGM convenes is genuinely hard to find elsewhere in Nigeria.",
    image:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=80&h=80&fit=crop&crop=face",
    name: "Fatima Bello",
    role: "Conference 4.0 Attendee",
  },
  {
    text: "Best ROI on a single day I've spent all year. Period.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face",
    name: "David Osei",
    role: "Conference 3.0 Attendee",
  },
  {
    text: "I almost skipped it for a client meeting. Glad I didn't — the connections compounded for the rest of the year.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
    name: "Blessing Okafor",
    role: "Conference 4.0 Attendee",
  },
  {
    text: "Walked away with a notebook full of plays I'd never have figured out on my own.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
    name: "Seun Adeyemi",
    role: "Conference 4.0 Attendee",
  },
  {
    text: "NGM is one of the few rooms where the speakers actually stick around afterwards. That changes everything.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
    name: "Ngozi Ibe",
    role: "Conference 3.0 Attendee",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] overflow-hidden font-epilogue">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] max-w-2xl">
          The people who&apos;ve{" "}
          <span className="font-bold text-[#0DA04C]">already been here.</span>
        </h2>
      </motion.div>

      <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={20} />
        <TestimonialsColumn
          testimonials={secondColumn}
          className="hidden md:block"
          duration={24}
        />
        <TestimonialsColumn
          testimonials={thirdColumn}
          className="hidden lg:block"
          duration={18}
        />
      </div>
    </section>
  );
}
