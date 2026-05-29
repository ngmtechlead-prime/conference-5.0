"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who can participate in the competition?",
    answer:
      "Open to Nigerian youths (SS3 students, graduates, professionals, and business owners) who have a valid ticket for the NGM Conference 2026.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, participation is free but you must have registered for the conference before applying.",
  },
  {
    question: "Do I need prior case study experience?",
    answer:
      "Prior experience or background in business, research, strategy, and case study analysis is helpful, but the competition is open to all who are willing to learn and put in the work.",
  },
  {
    question: "How are teams formed?",
    answer:
      "You must register individually and be willing to work with a team member. The top 20 individuals from the first stage will be grouped into 10 groups of 2 members each.",
  },
  {
    question: "What is the competition timeline?",
    answer:
      "Application opens May 1 and closes May 21. First stage submissions are due May 31. Quarter finals run in June, semi-finals in July, and the final presentation takes place on September 20.",
  },
  {
    question: "What format should submissions follow?",
    answer:
      "Submissions should be well-structured analyses with high visual standards, professional formatting, and impactful charts or graphs. All claims must be backed by rigorous, accurate, and comprehensive evidence.",
  },
  {
    question: "Can I participate in both the SME Pitch and Case Study competitions?",
    answer:
      "No, participants are generally advised to focus their efforts on one competition to ensure high-quality submissions and manage time effectively.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px]">
      <div className="max-w-4xl mx-auto font-epilogue">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] mb-3">
            Frequently Asked{" "}
            <span className="font-black text-[#0DA04C]">Questions</span>
          </h2>
          <p className="text-[#4a5565] text-base mt-3">
            Everything you need to know about the Case Study Competition.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-[#E5E5E5]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-8">
                {/* Question row */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between gap-8 text-left focus:outline-none group"
                >
                  <div className="flex items-start">
                    {/* Question text */}
                    <span
                      className={`text-[20px] font-bold leading-snug transition-colors duration-200 ${
                        isOpen ? "text-[#0F1990]" : "text-gray-800"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle icon */}
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

                {/* Answer panel */}
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
