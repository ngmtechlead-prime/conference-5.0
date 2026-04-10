"use client";

import Image from "next/image";

export default function ApplyNow() {
  return (
    <section
      id="apply"
      className="w-full py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-epilogue"
      style={{ backgroundColor: "#1a237e" }}
    >
      <div
        className="absolute inset-0 opacity-20 bg-no-repeat bg-center bg-contain sm:bg-cover"
        style={{ backgroundImage: `url("/gallery/CTA.png")` }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Ready to{" "}
          <span className="relative inline-block">
            Dare?
            <span className="absolute left-0 -bottom-4 w-full flex justify-center">
              <Image
                src="/icons/dareZap.svg"
                alt="Squiggle"
                width={80}
                height={16}
              />
            </span>
          </span>
        </h2>

        <p className="text-blue-200 text-base sm:text-md mb-8">
          Applications close May 31, 2026. Free to enter. Built to change your
          business trajectory.
        </p>

        <a
          href="#apply-form"
          className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
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
    </section>
  );
}
