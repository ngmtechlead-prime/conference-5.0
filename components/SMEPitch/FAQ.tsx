"use client";

import Image from "next/image";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the SME Pitch Competition about?",
    answer:
      "The SME Pitch Competition is a platform designed to discover, celebrate, and empower small and medium enterprises with high growth potential. Winners receive seed funding, mentorship, and access to our investor network.",
  },
  {
    question: "Who is eligible to apply?",
    answer:
      "The competition is open to registered SMEs in Nigeria with at least 1 year of operation, a clear revenue model, and demonstrated growth potential. Your business must have a unique value proposition and you must be ready to scale.",
  },
  {
    question: "What is the current application deadline?",
    answer:
      "Applications for the 2026 SME Pitch Competition close on May 31, 2026. We encourage early applications as spots are limited and competitive.",
  },
  {
    question: "What does the registration fee cover?",
    answer:
      "Registration is free. However, winners are required to attend the NGM 5.0 Conference where the final pitch takes place. Conference tickets are purchased separately.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, the SME Pitch Competition is completely free to enter. We believe in removing barriers to opportunity for Nigerian entrepreneurs.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      className={`shrink-0 transition-transform duration-300 text-[#0F1990] ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 font-epilogue">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            Frequently Asked{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Questions
              <Image
                src="/icons/zap.svg"
                alt="FAQ"
                width={150}
                height={150}
                className="absolute left-0 bottom-[-8px]"
              />
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Everything you need to know about the SME Pitch Competition.
          </p>
        </div>

        {/* Accordion list */}
        <div className="w-full flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150 focus:outline-none"
                >
                  <span className="text-black font-bold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
