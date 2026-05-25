import React from "react";

const criteria = [
  {
    title: "Analytical Thinking",
    weight: "25%",
    description:
      "Logical breakdown of the problem; identify root causes and connect disparate data points into a cohesive argument.",
  },
  {
    title: "Research Quality",
    weight: "20%",
    description:
      "Use of credible, high-quality sources (primary and secondary); all claims backed by rigorous, accurate, and comprehensive evidence.",
  },
  {
    title: "Originality & Innovation",
    weight: "15%",
    description:
      "Ability to move beyond standard solutions; introduce a unique perspective, new framework, or creative approach.",
  },
  {
    title: "Clarity & Communication",
    weight: "15%",
    description:
      "Ideas presented in a structured, easy-to-follow manner so the judging panel and attendees can quickly grasp key insights.",
  },
  {
    title: "Practical Application",
    weight: "15%",
    description:
      "Recommendations must be \"real-world ready\" — feasible, cost-effective, with a clear implementation roadmap and measurable outcomes.",
  },
  {
    title: "Presentation & Delivery",
    weight: "10%",
    description:
      "High visual standards with professional formatting; impactful charts or graphs; findings delivered with confidence and professionalism.",
  },
];

interface CardProps {
  title: string;
  weight: string;
  description: string;
}

const JudgingCard = ({ title, weight, description }: CardProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between gap-4 break-inside-avoid mb-4">
    <p className="text-gray-800 text-sm leading-relaxed font-epilogue">
      {description}
    </p>
    <div className="flex items-center gap-3 mt-2">
      <div className="w-12 h-12 rounded-full bg-[#0F1990] shrink-0 flex items-center justify-center">
        <span className="text-white text-sm font-bold font-epilogue">
          {weight}
        </span>
      </div>
      <div>
        <p className="font-bold text-sm text-gray-900 font-epilogue">{title}</p>
        <p className="text-gray-500 text-xs font-epilogue">Weight</p>
      </div>
    </div>
  </div>
);

export default function JudgingCriteria() {
  return (
    <section className="w-full bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            How You&apos;ll Be{" "}
            <span className="font-black italic text-[#16a34a]">
              Judged
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-6">
            Your work will be evaluated across six key dimensions.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-4">
          {criteria.map((item, index) => (
            <JudgingCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
