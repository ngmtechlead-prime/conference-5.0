import Image from "next/image";

const CheckIcon = ({ inverted = false }: { inverted?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0 mt-0.5"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={inverted ? "#facc15" : "#0DA04C"}
      strokeWidth="2"
    />
    <path
      d="M8 12l3 3 5-6"
      stroke={inverted ? "#facc15" : "#0DA04C"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PrizeCardProps {
  medal: string;
  place: string;
  placeColor: string;
  amount: string;
  amountColor: string;
  perks: string[];
  featured?: boolean;
}

const PrizeCard = ({
  medal,
  place,
  placeColor,
  amount,
  amountColor,
  perks,
  featured = false,
}: PrizeCardProps) => (
  <div
    className={`
      relative rounded-2xl p-8 flex flex-col gap-5 font-epilogue
      ${
        featured
          ? "bg-[#0F1990] shadow-2xl scale-105 z-10"
          : "bg-white border border-[#E5E5E5] shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
      }
    `}
  >
    {/* Medal */}
    <div className="w-14 h-14 relative">
      <Image
        src={medal}
        alt={`${place} medal`}
        width={56}
        height={56}
        className="object-contain"
      />
    </div>

    {/* Place & Amount */}
    <div>
      <p
        className="text-[30px] font-bold leading-tight tracking-[-0.04em]"
        style={{ color: placeColor }}
      >
        {place}
      </p>
      <p
        className="text-[30px] font-black leading-tight mt-1 tracking-[-0.04em]"
        style={{ color: amountColor }}
      >
        {amount}
      </p>
    </div>

    {/* Perks */}
    <ul className="flex flex-col gap-4">
      {perks.map((perk, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckIcon inverted={featured} />
          <span
            className={`text-sm leading-snug ${
              featured ? "text-white" : "text-[#333333]"
            }`}
          >
            {perk}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const prizes: PrizeCardProps[] = [
  {
    medal: "/Second Place.png",
    place: "2nd Place",
    placeColor: "#6B7280",
    amount: "₦75,000",
    amountColor: "#111827",
    perks: [
      "Cash Prize of ₦75,000",
      "6-Month Dedicated Mentorship Programme",
      "Access to NGM Investor Network",
      "Regional Media Feature",
      "Ecosystem Support & Alumni Status",
    ],
    featured: false,
  },
  {
    medal: "/First Place.png",
    place: "1st Place",
    placeColor: "#facc15",
    amount: "₦100,000",
    amountColor: "#facc15",
    perks: [
      "Cash Prize of ₦100,000",
      "12-Month Executive Mentorship Programme",
      "National Media & Press Spotlight",
      "Direct Access to NGM Investor Network",
      "Priority Partnership Opportunities",
      "Full Ecosystem Support & Alumni Status",
    ],
    featured: true,
  },
  {
    medal: "/Third Place.png",
    place: "3rd Place",
    placeColor: "#F97316",
    amount: "₦50,000",
    amountColor: "#111827",
    perks: [
      "Cash Prize of ₦50,000",
      "3-Month Dedicated Mentorship Programme",
      "Access to NGM Investor Network",
      "Ecosystem Support & Alumni Status",
    ],
    featured: false,
  },
];

export default function WhatYouWin() {
  return (
    <section className="w-full bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-[150px]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-none tracking-[-0.04em] mb-4">
            What You Stand to{" "}
            <span className="font-black text-[#0DA04C]">Win</span>
          </h2>
          <p className="text-[#4a5565] text-sm sm:text-base leading-relaxed">
            Beyond the prizes, you&apos;re gaining skills and connections that
            last a lifetime
          </p>
        </div>

        {/* Prize Cards — 2nd | 1st | 3rd */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {prizes.map((prize, i) => (
            <PrizeCard key={i} {...prize} />
          ))}
        </div>
      </div>
    </section>
  );
}
