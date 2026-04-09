import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left – Portrait Card */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="border-2 space-y-4 bg-[#1e3a8a] border-[#1e3a8a] p-4 rounded-2xl overflow-hidden">
            {/* Photo area */}
            <div className="w-full aspect-[3/3.5] rounded-md overflow-hidden">
              <Image
                src="/gallery/DrKolaAdesina.png"
                alt="Dr Kola Adesina"
                className="w-full h-full object-cover object-top"
                width={429}
                height={450}
              />
            </div>
            {/* Name badge */}
            <div className="bg-[#e6f7ec] font-epilogue font-semibold rounded-md px-5 py-4">
              <p className="text-[#0f1990] font-bold text-base leading-snug">
                Dr Kola Adesina
              </p>
              <p className="text-[#0f1990] text-xs mt-0.5">
                MD/CEO, Sahara Group
              </p>
            </div>
          </div>
        </div>

        {/* Right – Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Heading */}
          <div className="font-epilogue">
            <h2 className="text-3xl sm:text-3xl font-normal text-[#1e3a8a] leading-tight">
              What Is the{" "}
              <span className="relative inline-block font-black text-[#0DA04C]">
                DARE Nigeria Challenge?
                <Image
                  src="/icons/zapAbout.svg"
                  alt="Green squiggle"
                  width={170}
                  height={12}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-8px]"
                />
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-[#4a5565] text-sm sm:text-base mt-4">
              Your bold idea, backed by{" "}
              <span className="font-bold text-[#333333]">₦30 Million</span> in
              seed funding.
            </p>
          </div>

          {/* Feature blocks */}
          <div className="flex flex-col gap-6">
            {/* The Opportunity */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-[#E6F7EC]">
                <Image
                  src="/icons/opportunity.svg"
                  alt="opportunity"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
              <div className="font-epilogue">
                <h3 className="font-bold text-[#333333] text-base mb-1">
                  The Opportunity
                </h3>
                <p className="text-[#4a5565] text-sm leading-relaxed">
                  Celebrating the NGM Platform&apos;s 10th Anniversary, the DARE
                  Nigeria Challenge is a structured, multi-phase competition
                  designed to find and scale Nigeria&apos;s most innovative
                  youth-led enterprises. This is more than a pitch event —
                  it&apos;s a launchpad providing seed capital, elite
                  mentorship, and national visibility to 5 exceptional winners.
                </p>
              </div>
            </div>

            {/* The Visionary Backing */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-[#E7E8F4]">
                <Image
                  src="/icons/visionary.svg"
                  alt="visionary"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
              <div className="font-epilogue">
                <h3 className="font-bold text-[#333333] text-base mb-1">
                  The Visionary Backing
                </h3>
                <p className="text-[#4a5565] text-sm leading-relaxed">
                  This initiative was born from a spontaneous ₦30,000,000 pledge
                  made live at NGM Conference 4.0 by Dr. Kola Adesina. His
                  vision is clear: to put real resources behind young Nigerians
                  who have the courage to build sustainable businesses. Winning
                  means gaining not just capital, but the endorsement of one of
                  Nigeria&apos;s most respected business minds.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2 font-epilogue">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
            >
              Apply Now
              <Image
                src="/icons/rightArrow.svg"
                alt="right"
                width={16}
                height={16}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
