import Image from "next/image";
import React from "react";
import Wrapper from "../shared/Wrapper";

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-3xl w-full text-center mb-2">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-epilogue font-normal text-[#0F1990] leading-[1.1] tracking-[-0.06em]">
          Do You Have a{" "}
          <span className="font-bold font-epilogue text-[#0DA04C]">
            Bold Idea
          </span>
          <br />
          That Can Change{" "}
          <span className="font-bold font-epilogue text-[#0DA04C]">
            Nigeria?
          </span>
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-[#4a5565] font-epilogue text-sm sm:text-lg text-center mb-8">
        Apply for the NGM x Kola Adesina DARE Nigeria Challenge 2026
      </p>

      {/* CTA Button */}
      <a
        href="/competitions/dare-nigeria/apply"
        className="inline-flex items-center font-epilogue gap-2 border-2 border-[#0F1990] text-white font-bold text-sm px-7 py-3 rounded-md bg-[#0f1990] hover:bg-blue-950  transition-all duration-200 tracking-wide mb-10"
      >
        Apply Now
        <Image src="/icons/rightArrow.svg" alt="right" width={16} height={16} />
      </a>

      {/* Hero Image */}
      <Wrapper className="w-full max-w-7xl">
        <Image
          src="/gallery/MuslimahPitcher.png"
          alt="NGM Pitch participant on stage"
          className="w-full h-full object-cover rounded-xl"
          width={1140}
          height={642}
        />
      </Wrapper>
    </section>
  );
}
