"use client";

import Image from "next/image";

export default function ApplyNow() {
  return (
    <section
      id="apply"
      className="w-full py-8 lg:py-24 px-4 sm:px-6 lg:px-[150px] font-epilogue"
    >
      <div
        className="relative overflow-hidden rounded-2xl py-16 px-4 sm:px-6"
        style={{ backgroundColor: "#0F1990" }}
      >
        <div
          className="absolute inset-0 opacity-40 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url("/gallery/Pattern.png")` }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-none tracking-[-0.04em] mb-4">
            Your Business Has Come Too Far{" "}
            <span className="text-[#0DA04C]">to Stop Here.</span>
          </h2>

          <p className="text-green-100 text-base sm:text-md mb-8 mt-6">
            Applications close June 7, 2026. Free to enter. Built to transform
            your business trajectory.
          </p>

          <a
            href="/competitions/sme-pitch/apply"
            className="inline-flex items-center font-epilogue gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
          >
            Apply now
            <Image
              src="/icons/rightArrow.svg"
              alt="Right Arrow"
              width={16}
              height={16}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
