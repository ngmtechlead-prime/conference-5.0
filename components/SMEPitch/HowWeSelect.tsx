import Image from "next/image";
import React from "react";

interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const Step = ({ number, title, description, isLast = false }: StepProps) => (
  <div className="flex flex-col items-center text-center relative">
    {/* Step Number */}
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F1990] text-white font-bold text-lg mb-4 z-10">
      {number}
    </div>

    {/* Connector Line */}
    {!isLast && (
      <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-[#0F1990]/20" />
    )}

    {/* Content */}
    <h3 className="font-bold text-[#0F1990] text-base mb-2 font-epilogue">
      {title}
    </h3>
    <p className="text-[#4a5565] text-sm leading-relaxed font-epilogue max-w-[200px]">
      {description}
    </p>
  </div>
);

export default function HowWeSelect() {
  const steps = [
    {
      number: "1",
      title: "Application Review",
      description:
        "Submit your application and our team reviews for eligibility",
    },
    {
      number: "2",
      title: "Screening",
      description:
        "Shortlisted applicants undergo a detailed business assessment",
    },
    {
      number: "3",
      title: "Pitch Day",
      description: "Present your business to our panel of judges and investors",
    },
    {
      number: "4",
      title: "Winner Selection",
      description: "Top performers are selected based on innovation and impact",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            How We Select Our{" "}
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
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4">
            Our rigorous but fair selection process ensures we find the best
            businesses with the highest potential for growth and impact.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <Step key={index} {...step} isLast={index === steps.length - 1} />
          ))}
        </div>

        {/* CTA */}
        <a
          href="#apply"
          className="inline-flex items-center gap-2 bg-[#0F1990] hover:bg-[#1d4ed8] text-white font-bold text-sm px-7 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
        >
          Start Your Application
          <Image
            src="/icons/rightArrow.svg"
            alt="right"
            width={16}
            height={16}
          />
        </a>
      </div>
    </section>
  );
}
