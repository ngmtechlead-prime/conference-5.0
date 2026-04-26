"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "../shared/Wrapper";

export default function ApplyNow() {
  return (
    <section
      id="apply"
      className="w-full py-16 px-4 sm:px-6 lg:px-12 font-epilogue"
    >
      <Wrapper className="relative bg-[#0F1990] overflow-hidden rounded-2xl py-16 px-4 sm:px-8">
        <div
          className="absolute inset-0 opacity-40 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url("/gallery/Pattern.png")` }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl tracking-tight font-bold text-white mb-10">
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

          <p className="text-white text-lg sm:text-xl mb-5">
            Applications close May 31, 2026. Free to enter. Built to change your
            business trajectory.
          </p>

          <Link
            href="/competitions/dare-nigeria/apply"
            className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200"
          >
            Apply now
            <Image
              src="/icons/rightArrow.svg"
              alt="Right Arrow"
              width={16}
              height={16}
            />
          </Link>
        </div>
      </Wrapper>
    </section>
  );
}
