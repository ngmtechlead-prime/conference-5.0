import Image from "next/image";
import React from "react";

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
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

export default function MoreThanPitch() {
  const features = [
    {
      title: "Capital",
      description: "Seed funding in milestone-based tranches",
    },
    {
      title: "Coaching",
      description:
        "Structured mentorship from NGM's network of ambassadors and mentors",
    },
    {
      title: "Community",
      description: "Peer networks, webinars, and an annual alumni summit",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* Left – Content */}
        <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
          {/* Heading */}
          <div className="font-epilogue">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight">
              More Than a{" "}
              <span className="relative inline-block font-black text-[#0DA04C]">
                Pitch Competition
                <Image
                  src="/icons/zapAbout.svg"
                  alt="Green squiggle"
                  width={280}
                  height={12}
                  className="absolute left-0 bottom-[-8px]"
                />
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-[#4a5565] text-sm sm:text-base leading-relaxed font-epilogue max-w-lg">
            The NGM SME Pitch Challenge 2026 is Nigeria&apos;s most ambitious
            entrepreneurship programme – backed by a ₦100M commitment from
            Afropreneur, in partnership with Verraki Partners.
          </p>

          {/* Feature List */}
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircleIcon />
                <div className="font-epilogue">
                  <span className="font-bold text-[#0F1990]">
                    {feature.title}
                  </span>
                  <span className="text-[#4a5565]">
                    {" "}
                    – {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-2 font-epilogue">
            <a
              href="/competitions/sme-pitch/apply"
              className="inline-flex items-center gap-2 bg-[#0F1990] hover:bg-blue-950 text-white font-bold text-sm px-6 py-3 rounded-md transition-colors duration-200 tracking-wide"
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

        {/* Right – Image */}
        <div className="w-full lg:w-1/2 shrink-0 order-1 lg:order-2">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src="/gallery/more-than-a-pitch-competition.png"
              alt="SME Pitch participant presenting"
              className="w-full h-auto object-cover"
              width={560}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
