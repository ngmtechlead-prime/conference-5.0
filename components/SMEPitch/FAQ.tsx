"use client";

import Image from "next/image";
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
    question: "What is the applicant’s prerequisite?",
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
