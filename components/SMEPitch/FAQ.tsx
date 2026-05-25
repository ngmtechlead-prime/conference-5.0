"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the NGM SME Competition about?",
    answer:
      "The NGM SME Competition is designed to identify, support, and showcase high-potential small and medium-sized enterprises (SMEs). It provides entrepreneurs with an opportunity to pitch their businesses to a panel of judges, gain visibility, and access funding, mentorship, and strategic partnerships.",
  },
  {
    question: "Is it open to only NGM members?",
    answer:
      "No. Non-NGM members can apply as well, provided they are willing to join the platform or the entrepreneurship club.",
  },
  {
    question: "What is the applicant's prerequisite?",
    answer:
      "Applicants must be founders or representatives of a registered SME and available to participate in all stages of the competition.",
  },
  {
    question: "What sectors are eligible for the competition?",
    answer:
      "SMEs across all sectors, including technology, agriculture, healthcare, manufacturing, and services, excluding unethical sectors.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, participation is free but you must have registered for the conference before applying.",
  },
  {
    question: "How do I apply?",
    answer:
      "Interested participants must complete the application form via this website and submit all required documents before the deadline.",
  },
  {
    question: "When is the application deadline?",
    answer:
      "All applications must be submitted on or before the 7th of June, 2026.",
  },
  {
    question: "Can I apply with more than one business?",
    answer: "No, each applicant will submit only one business entry.",
  },
  {
    question: "Can business partners apply, or only individuals?",
    answer:
      "Both individuals and business partners can apply. However, a lead representative must be designated for communication purposes.",
  },
  {
    question: "What are the stages of the competition?",
    answer:
      "The application stages are: Application & Screening Shortlisting, Quarterfinal/Pitch Desk, Semi-Final/Bootcamp, Final Pitch Event, Selection of Winners.",
  },
  {
    question: "Can past beneficiaries apply?",
    answer: "No, they cannot.",
  },
  {
    question: "What do selected participants receive?",
    answer:
      "Benefits include: Seed capital funding, Access to investors and funding opportunities, Exclusive Bootcamp training, Mentorship and advisory support, Networking opportunities and Media exposure.",
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
            Everything you need to know about the SME Pitch Competition.
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
