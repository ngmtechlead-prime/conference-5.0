"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is there a virtual attendance option?",
    answer:
      "Yes. Alongside our 2,000 in-person attendees in Lagos, we expect 500+ virtual attendees via livestream. Virtual ticket details will be released closer to the event.",
  },
  {
    question: "What is the early bird deadline?",
    answer:
      "Early bird pricing (25% off) runs until the cap is reached or until a final cutoff announced via our channels. Once the window closes, tickets return to standard pricing — and seats are capped at 2,000 overall.",
  },
  {
    question: "Where is the conference being held?",
    answer:
      "Conference 5.0 takes place in Lagos, Nigeria on October 3, 2026. The exact venue will be announced to ticket holders closer to the event.",
  },
  {
    question: "What is the NGM × Afropreneur SME Pitch — and can I apply?",
    answer:
      "It's an entrepreneurship grant programme backed by a ₦100,000,000 multi-year pledge from Afropreneur in partnership with Verraki Partners. Applications are open to early-stage Nigerian founders. Visit the SME Pitch page to apply.",
  },
  {
    question: "What is the DARE Nigeria Challenge — and can I participate?",
    answer:
      "The NGM × Kola Adesina DARE Nigeria Challenge is a flagship innovation competition tied to a ₦30,000,000 pledge made at Conference 4.0, structured across three years. Visit the DARE Nigeria page for eligibility and application details.",
  },
  {
    question: "How do I become a sponsor or partner?",
    answer:
      "Email conference@ngmplatform.com with a short note on your organisation and what kind of presence you're considering. Sponsorship tiers are limited and assigned on a first-confirmed basis.",
  },
];

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M5 12h14" />
  </svg>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em]">
            Frequently Asked{" "}
            <span className="font-bold text-[#0DA04C]">Questions</span>
          </h2>
          <p className="text-[#4a5565] text-base mt-3">
            Everything you need to know before securing your ticket.
          </p>
        </div>

        <div className="divide-y divide-[#E5E5E5]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-8">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between gap-8 text-left focus:outline-none group"
                >
                  <span
                    className={`text-[20px] font-bold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-[#0F1990]" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                      isOpen
                        ? "bg-[#0F1990] border-[#0F1990] text-white"
                        : "border-[#E5E5E5] text-gray-400 group-hover:border-[#0F1990] group-hover:text-[#0F1990]"
                    }`}
                  >
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#4a5565] text-base leading-relaxed pt-4 pr-16">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
