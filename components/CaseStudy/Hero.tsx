import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-[150px]">
      <div className="flex flex-col items-center">
        {/* Heading */}
        <div className="w-full text-center mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-epilogue font-normal text-[#0F1990] leading-[1.1] tracking-[-0.06em]">
            From{" "}
            <span className="font-bold font-epilogue text-[#0DA04C]">Insight</span>{" "}
            to Action:{" "}
            <br className="hidden lg:block" />
            Analysing Today&apos;s Evidence to Solve{" "}
            <br className="hidden lg:block" />
            <span className="font-bold font-epilogue text-[#0DA04C]">Challenges</span>{" "}
            and Shape Tomorrow
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-[#4a5565] font-epilogue text-sm sm:text-lg text-center mb-8">
          Apply for the NGM Case Study & Research Analysis Competition 2026
        </p>

        {/* CTA Button */}
        <a
          href="/competitions/case-study/apply"
          className="inline-flex items-center font-epilogue gap-2 border-2 border-[#0F1990] text-white font-bold text-sm px-7 py-3 rounded-md bg-[#0F1990] hover:bg-blue-950 transition-all duration-200 tracking-wide mb-12"
        >
          Apply Now
          <Image
            src="/icons/rightArrow.svg"
            alt="right"
            width={16}
            height={16}
          />
        </a>

        {/* Hero Image */}
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/gallery/PitchYourselfWinners.png"
              alt="Case Study Competition participants"
              className="w-full h-auto object-cover"
              width={1140}
              height={642}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
