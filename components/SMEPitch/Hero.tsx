import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <div className="max-w-4xl w-full text-center mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-epilogue font-normal text-[#0F1990] leading-tight tracking-tight">
            Your Business Has{" "}
            <span className="relative inline-block font-bold font-epilogue text-[#0DA04C]">
              Potential.
              <Image
                src="/icons/zap.svg"
                alt="Green squiggle"
                width={200}
                height={12}
                className="block -mt-1"
              />
            </span>
            <br />
            Now Give It the{" "}
            <span className="relative inline-block font-bold font-epilogue text-[#0DA04C]">
              Capital
              <Image
                src="/icons/zap.svg"
                alt="Green squiggle"
                width={150}
                height={10}
                className="block -mt-1"
              />
            </span>{" "}
            to Prove It.
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-[#4a5565] font-epilogue text-sm sm:text-lg text-center mb-8">
          Apply for the NGM SME Pitch Challenge 2026
        </p>

        {/* CTA Button */}
        <a
          href="/competitions/sme-pitch/apply"
          className="inline-flex items-center font-archivo gap-2 border-2 border-[#0F1990] text-white font-bold text-sm px-7 py-3 rounded-md bg-[#0F1990] hover:bg-blue-950 transition-all duration-200 tracking-wide mb-12"
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
        <div className="w-full max-w-5xl">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/gallery/PitchYourselfWinners.png"
              alt="SME Pitch Competition participants"
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
