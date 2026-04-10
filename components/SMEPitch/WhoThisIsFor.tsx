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

export default function WhoThisIsFor() {
  const criteria = [
    "You are running a Nigeria-based business aged 18-35.",
    "Your business is at idea, early revenue or growth stage.",
    "You operate outside all excluded sectors.",
    "You have not previously won an NGM SME grant.",
    "You hold a valid NGM Conference 5.0 ticket.",
  ];

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left – Image */}
        <div className="w-full lg:w-5/12 shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/gallery/who-is-this-for.png"
              alt="SME Pitch target audience"
              className="w-full h-auto object-cover"
              width={480}
              height={400}
            />
          </div>
        </div>

        {/* Right – Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Heading */}
          <div className="font-epilogue">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight">
              <span className="font-black text-[#0DA04C]">Who</span> This Is
              For?
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
