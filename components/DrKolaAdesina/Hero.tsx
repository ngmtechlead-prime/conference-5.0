import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-3xl w-full text-center mb-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0F1990] leading-tight">
          Do You Have a{" "}
          <span className="relative inline-block font-black text-[#0DA04C] italic">
            Bold Idea
            <Image
              src="/icons/zap.svg"
              alt="Green squiggle"
              width={218}
              height={12}
            />
          </span>
          <br />
          That Can Change{" "}
          <span className="relative inline-block font-black text-[#0DA04C] italic">
            Nigeria?
            <Image
              src="/icons/zap.svg"
              alt="Green squiggle"
              width={186}
              height={10}
            />
          </span>
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-gray-500 text-sm sm:text-base text-center mb-6 max-w-md">
        Apply for the NGM x Dr. Kola Adesina DARE Nigeria Challenge 2026
      </p>

      {/* CTA Button */}
      <a
        href="#apply"
        className="inline-flex items-center gap-2 border-2 border-[#1e3a8a] text-white font-bold text-sm px-7 py-3 rounded-md bg-[#0f1990] hover:bg-blue-950  transition-all duration-200 tracking-wide mb-10"
      >
        Apply Now
        <Image src="/icons/rightArrow.svg" alt="right" width={16} height={16} />
      </a>

      {/* Hero Image */}
      <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/gallery/PitchYourselfWinners.png"
          alt="NGM Pitch event with participants on stage"
          className="w-full h-auto object-cover"
          style={{ maxHeight: "520px" }}
          width={1140}
          height={642}
        />
      </div>
    </section>
  );
}
