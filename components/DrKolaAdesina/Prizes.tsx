import Image from "next/image";
import React from "react";

const CheckIcon = ({ color = "#16a34a" }: { color?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="flex-shrink-0 mt-0.5"
  >
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
    <path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PrizeCardProps {
  place: string;
  amount: string;
  perks: string[];
  featured?: boolean;
  placeColor: string;
  image: string;
}

const PrizeCard = ({
  place,
  amount,
  perks,
  featured = false,
  placeColor,
  image,
}: PrizeCardProps) => (
  <div
    className={`relative flex flex-col rounded-2xl p-6 transition-transform duration-200
      ${
        featured
          ? "bg-[#1e3a8a] text-white shadow-2xl scale-105 z-10"
          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
      }`}
  >
    {/* Badge */}
    <div>
      <Image
        className={place === "2nd Place" ? "grayscale-100" : ""}
        src={image}
        alt={`${place} badge`}
        width={50}
        height={50}
      />
    </div>

    {/* Place & Amount */}
    <p className="text-xl font-black mb-1" style={{ color: placeColor }}>
      {place}
    </p>
    <p
      className={`text-2xl font-bold mb-5 ${
        featured ? "text-[#f8d34f]" : "text-gray-900"
      }`}
    >
      {amount}
    </p>

    {/* Perks */}
    <ul className="flex flex-col gap-2.5">
      {perks.map((perk, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckIcon color={featured ? "#86efac" : "#16a34a"} />
          <span
            className={`text-sm leading-snug ${
              featured ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {perk}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default function Prizes() {
  const topThree = [
    {
      place: "2nd Place",
      amount: "₦3,000,000",
      placeColor: "#374151",
      perks: [
        "Milestone-based funding disbursement",
        "6-Month Dedicated Mentorship Programme",
        "Access to NGM Investor Network",
        "Regional Media Feature",
        "Ecosystem Support & Alumni Status",
      ],
      image: "/icons/thirdPlace.svg",
    },
    {
      place: "1st Place",
      amount: "₦5,000,000",
      placeColor: "#f8d34f",
      featured: true,
      perks: [
        "Milestone-based funding disbursement",
        "12-Month Executive Mentorship Programme",
        "National Media & Press Spotlight",
        "Direct Access to NGM Investor Network",
        "Priority Partnership Opportunities",
        "Full Ecosystem Support & Alumni Status",
      ],
      image: "/icons/firstPlace.svg",
    },
    {
      place: "3rd Place",
      amount: "₦1,000,000",
      placeColor: "#f97316",
      perks: [
        "Milestone-based funding disbursement",
        "3-Month Dedicated Mentorship Programme",
        "Access to NGM Investor Network",
        "Ecosystem Support & Alumni Status",
      ],
      image: "/icons/thirdPlace.svg",
    },
  ];

  const bottomTwo = [
    { place: "4th Place", amount: "₦1.5M" },
    { place: "5th Place", amount: "₦1.0M" },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1e3a8a] leading-tight mb-3">
            What You Could{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Win
              <Image
                src="/icons/zapWin.svg"
                alt="Winning"
                width={80}
                height={100}
              />
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            ₦30 Million in total seed funding across 5 winners, plus invaluable
            ecosystem support to scale your innovation.
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {topThree.map((prize) => (
            <PrizeCard key={prize.place} {...prize} />
          ))}
        </div>

        {/* 4th & 5th Place Banner */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {bottomTwo.map(({ place, amount }) => (
            <div
              key={place}
              className="flex items-center gap-3 w-full sm:w-auto justify-center py-2 sm:py-0 sm:px-10"
            >
              <span className="bg-[#f3f4f6] rounded-lg p-2.5 text-[#4a5565] font-bold text-sm">
                {place}
              </span>
              <span className="text-gray-900 font-bold text-lg">{amount}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center py-2 sm:py-0 sm:px-10">
            <CheckIcon color="#16a34a" />
            <span className="text-gray-500 text-sm font-medium">
              Plus Mentorship &amp; Network Access
            </span>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#apply"
          className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold text-sm px-7 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
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
    </section>
  );
}
