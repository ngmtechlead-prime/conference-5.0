import Image from "next/image";
import React from "react";

const testimonials = [
  {
    quote:
      "Winning the SME Pitch Competition was a turning point for my business. The funding helped us expand to three new states, and the mentorship was invaluable.",
    name: "Adebayo Ogunleye",
    role: "AgriTech Solutions",
    initials: "AO",
  },
  {
    quote:
      "The connections I made through this program opened doors I never thought possible. We've since secured additional funding from investors we met at the competition.",
    name: "Sam Pizzo",
    role: "CEO, CMS Max",
    initials: "SP",
  },
  {
    quote:
      "In an era of constant threats, this program offers more than just funding; they offer peace of mind. Their proactive approach to business discovery is world-class.",
    name: "Rafael Lunardelli",
    role: "CTO, Devsquad",
    initials: "RL",
  },
  {
    quote:
      "In an era of constant threats, this program offers more than just funding; they offer peace of mind. Their proactive approach to business discovery is world-class.",
    name: "Bradley Bernard",
    role: "Software Engineer, Snap",
    initials: "BB",
  },
  {
    quote:
      "Working with this program was a turning point for our compliance journey. They didn't just find issues; they helped us build a more resilient infrastructure from the ground up.",
    name: "Duncan McClean",
    role: "Software Developer, Statamic",
    initials: "DM",
  },
  {
    quote:
      "The level of detail in the post-assessment reports provided actionable insights that immediately strengthened our security posture. A truly professional partner.",
    name: "Silvan Hagen",
    role: "Developer & Consultant",
    initials: "SH",
  },
  {
    quote:
      "The level of detail in the post-assessment reports provided actionable insights that immediately strengthened our security posture. A truly professional partner.",
    name: "Tim Geisendoerfer",
    role: "CEO & Founder, Innoge",
    initials: "TG",
  },
  {
    quote:
      "Beyond the prize money, the business training and exposure transformed how we approach growth. Our revenue has tripled since winning.",
    name: "Chukwuemeka Nwosu",
    role: "CleanEnergy Co",
    initials: "CN",
  },
];

interface CardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const TestimonialCard = ({ quote, name, role, initials }: CardProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between gap-4 break-inside-avoid mb-4">
    <p className="text-gray-800 text-sm leading-relaxed font-epilogue">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="flex items-center gap-3 mt-2">
      <div className="w-10 h-10 rounded-full bg-[#0F1990] shrink-0 flex items-center justify-center">
        <span className="text-white text-xs font-bold font-epilogue">
          {initials}
        </span>
      </div>
      <div>
        <p className="font-bold text-sm text-gray-900 font-epilogue">{name}</p>
        <p className="text-gray-500 text-xs font-epilogue">{role}</p>
      </div>
    </div>
  </div>
);

export default function PastWinners() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            Hear from our past{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Winners
              <Image
                src="/icons/zapWin.svg"
                alt="Winners"
                width={120}
                height={100}
                className="absolute left-0 bottom-[-8px]"
              />
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-6">
            Honest reviews from past SME Pitch Competition winners.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}