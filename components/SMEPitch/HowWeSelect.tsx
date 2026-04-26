import Image from "next/image";
import React from "react";

const steps = [
  {
    number: "1",
    title: "Application & Document Submission",
    description:
      "Submit your business details, documents, and pitch concept online. Eligibility and documentation review by the NGM team.",
    side: "right",
    filled: true,
  },
  {
    number: "2",
    title: "Quarterfinals & Bootcamp",
    description:
      "Shortlisted applicants enter a quarterfinal screening. Selected SMEs attend the NGM SME Bootcamp – pitch training, mentorship, and workshops.",
    side: "left",
    filled: false,
  },
  {
    number: "3",
    title: "Virtual Pitch – Semifinals",
    description:
      "Semifinalists present virtually before an External Judging Panel. Top 3 finalists are selected.",
    side: "right",
    filled: false,
  },
  {
    number: "4",
    title: "Grand Finale Pitch",
    description:
      "The Top 3 pitch live at NGM Conference 5.0 on October 3, 2026. Winners announced. Grants disbursed. 12-month performance tracking begins.",
    side: "left",
    filled: false,
  },
];

export default function HowWeSelect() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            How We Select Our{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Winners
              <Image
                src="/icons/zapWin.svg"
                alt="Winners"
                width={120}
                height={100}
                className="absolute left-0 bottom-[-8px]"
              />
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6">
            A Four-Stage Process designed to find and refine the best
            businesses.
          </p>
        </div>

        {/* Zigzag Timeline */}
        <div className="relative w-full flex flex-col items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative w-full flex items-start justify-start md:justify-center py-6 md:py-8"
            >
              {/* Vertical line segment */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-[52px] bottom-0 w-0.5 bg-gray-200 z-0" />
              )}
              {index > 0 && (
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-0 h-[52px] w-0.5 bg-gray-200 z-0" />
              )}

              {/* Step Number Circle */}
              <div
                className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-6 md:top-8 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border-2 shrink-0 ${
                  step.filled
                    ? "bg-[#0F1990] border-[#0F1990] text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {step.number}
              </div>

              {/* Card */}
              <div
                className={`ml-14 mr-0 md:ml-0 md:mr-0 w-auto md:w-5/12 mt-0 md:mt-2 ${
                  step.side === "right"
                    ? "md:ml-auto md:pl-10"
                    : "md:mr-auto md:pr-10"
                }`}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-[#0F1990] text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
