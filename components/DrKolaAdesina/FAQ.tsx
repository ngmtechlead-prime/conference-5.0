"use client";

import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the NGM x Dr Kola Adesina Dare Nigeria Challenge about?",
    answer:
      "The NGM x Dr Kola Adesina Dare Nigeria Challenge is a flagship innovative competition targeting young Nigerians with bold ideas and the drive to transform them into national impact. Anchored by the NGM platform and Dr Kola Adesina, the challenge converts Dr Adesina’s historic pledge made at the NGM conference 4.0 into a structured, transparent, and rigorous programme to identify and fund outstanding early-stage innovators.",
  },
  {
    question: "Is it open to only NGM members?",
    answer:
      "No. Non-NGM members can apply as well, provided they are willing to join the platform or the entrepreneurship club.",
  },
  {
    question: "Does the idea has to be SDG-aligned?",
    answer:
      "Applicant’s innovative ideas must be aligned with at least one sustainable development goals.",
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
      "All applications must be submitted on or before the 31th of May, 2026.",
  },
  {
    question: "Can I apply with more than one business idea?",
    answer:
      "No, each applicant may submit only one business idea entry unless otherwise stated.",
  },
  {
    question: "What are the stages of the competition?",
    answer:
      "The application stages are: Application & Screening Shortlisting, Quarterfinal/Pitch Desk, Semi-Final/Bootcamp, Final Pitch Event, Selection of Winners.",
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
      className={`flex-shrink-0 transition-transform duration-300 text-[#0F1990] ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const QuestionZap = ({ className }: { className?: string }) => (
  <svg
    width="215"
    height="15"
    viewBox="0 0 215 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.40479 5.32958C39.8668 4.867 78.0779 2.74079 116.457 1.71063C122.349 1.55245 127.624 1.43434 133.442 1.40169C134.897 1.39352 138.796 1.30362 137.74 1.72534C134.891 2.86341 130.79 3.27081 127.221 3.96144C115.366 6.25534 118.942 5.51208 106.811 7.87461C100.195 9.16286 92.5563 10.3869 86.5403 12.185C86.1752 12.2941 83.6304 13.0991 85.9811 13.303C88.8156 13.5489 98.1008 13.1906 99.5413 13.1265C137.78 11.4247 175.21 7.38078 213.405 5.59438"
      stroke="#0DA04C"
      strokeWidth="2.77644"
      strokeLinecap="square"
    />
  </svg>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Wrapper className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 font-epilogue">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-normal text-[#0F1990] tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="relative inline-block font-bold text-[#16a34a]">
              Questions
              <QuestionZap className="absolute -bottom-2 left-0 w-full h-auto" />
            </span>
          </h2>
          <p className="text-[#4A5565] text-lg mt-2">
            Everything you need to know about transforming your backyard.
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
                  <div className="bg-[#f3f4f6] border-t border-gray-200 px-6 py-4">
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
    </Wrapper>
  );
}
