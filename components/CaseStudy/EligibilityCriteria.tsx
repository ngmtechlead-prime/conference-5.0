import Image from "next/image";
import React from "react";

const CheckCircleIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 mt-0.5"
  >
    <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" />
    <path
      d="M8 12l3 3 5-6"
      stroke="#16a34a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EligibilityCriteria() {
  const criteria = [
    "Must have a valid ticket for the NGM Conference 2026.",
    "Open to Nigerian youths (SS3 students, graduates, professionals, and business owners).",
    "Must register individually and be willing to work with a team member.",
    "Interest or background in business, research, strategy, and case study analysis.",
    "Submission of original work only.",
    "Ability to meet submission deadlines and presentation requirements.",
  ];

  return (
    <section className="w-full bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-[150px]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left – Image */}
        <div className="w-full lg:w-5/12 shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[500px]">
            <Image
              src="/gallery/who-is-this-for.png"
              alt="Eligibility target audience"
              className="w-full h-full object-cover"
              width={480}
              height={500}
            />
          </div>
        </div>

        {/* Right – Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Heading */}
          <div className="font-epilogue">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em]">
              <span className="font-black text-[#0DA04C]">Eligibility</span> Criteria
            </h2>
          </div>

          {/* Description */}
          <p className="text-[#4a5565] text-sm sm:text-base leading-relaxed font-epilogue">
            If you check these boxes, your application is waiting for you.
          </p>

          {/* Criteria List */}
          <div className="flex flex-col gap-4">
            {criteria.map((criterion, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircleIcon />
                <p className="text-[#333333] text-sm sm:text-base leading-relaxed font-epilogue">
                  {criterion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
