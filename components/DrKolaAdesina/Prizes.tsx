import Image from "next/image";
import Wrapper from "../shared/Wrapper";
import { cn } from "@/lib/utils";


const CheckIcon = ({ color = "#16a34a" }: { color?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 mt-0.5"
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
  index: number;
}

const PrizeCard = ({
  place,
  amount,
  perks,
  featured = false,
  placeColor,
  image,
  index,
}: PrizeCardProps) => (
  <div
    className={cn(
      "relative flex flex-col rounded-2xl px-8 transition-transform duration-200",
      {
        "bg-[#0F1990] text-white shadow-2xl scale-105 z-10": featured,
        "bg-white text-gray-800 border border-gray-200 shadow-sm": !featured,
        "pt-8 pb-16": index === 0 || index === 2,
        "pt-10 pb-8": index === 1,
      },
    )}
  >
    {/* Badge */}
    <div>
      <Image
        className={cn("h-16 w-16", {
          "grayscale-100": place === "2nd Place",
        })}
        src={image}
        alt={`${place} badge`}
        width={64}
        height={64}
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
          <CheckIcon color={featured ? "#D4AF37" : "#16a34a"} />
          <span
            className={`text-sm ${
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

  return (
    <section className="w-full bg-white py-24 border-t border-gray-200">
      <Wrapper className="flex flex-col items-center gap-12 font-epilogue max-w-6xl">
        {/* Heading */}
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] mb-4">
            What You Could{" "}
            <span className="font-bold text-[#16a34a]">Win</span>
          </h2>
          <p className="text-gray-500 text-lg">
            ₦30 Million in total seed funding across 5 winners, plus invaluable
            ecosystem support to scale your innovation.
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 items-end">
          {topThree.map((prize, idx) => (
            <PrizeCard key={prize.place} index={idx} {...prize} />
          ))}
        </div>

        {/* CTA */}
        <a
          href="/competitions/dare-nigeria/apply"
          className="inline-flex items-center font-epilogue gap-2 bg-[#0F1990] hover:bg-[#1d4ed8] text-white font-bold text-sm px-7 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
        >
          Apply Now
          <Image
            src="/icons/rightArrow.svg"
            alt="right"
            width={16}
            height={16}
          />
        </a>
      </Wrapper>
    </section>
  );
}
