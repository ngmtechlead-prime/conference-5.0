"use client";

import Image from "next/image";

export default function ApplyNow() {
  return (
    <section
      id="apply"
      className="w-full py-8 px-4 sm:px-6 lg:px-12 font-epilogue"
    >
      <div
        className="relative overflow-hidden rounded-2xl py-16 px-4 sm:px-6"
        style={{ backgroundColor: "#0F1990" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url("/gallery/CTA.png")` }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Your Business Has Come This Far.{" "}
            <span className="relative inline-block">
              to Stop Here.
              <span className="absolute left-0 -bottom-2 w-full flex justify-center">
                <Image
                  src="/icons/dareZap.svg"
                  alt="Squiggle"
                  width={120}
                  height={16}
                  className="brightness-0 invert"
                />
              </span>
            </span>
          </h2>

          <p className="text-green-100 text-base sm:text-md mb-8 mt-6">
            Applications close May 31, 2026. Free to enter. Built to transform
            your business trajectory.
          </p>

          <a
            href="#apply-form"
            className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#1d4ed8] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
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
