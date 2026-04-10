import React from "react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <div className="bg-[#1a2a9c]/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-start border border-[#2a3aac]/30">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-white text-lg mb-2 font-epilogue">{title}</h3>
    <p className="text-blue-200 text-sm leading-relaxed font-epilogue">
      {description}
    </p>
  </div>
);

const TrendingUpIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const HandshakeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
  </svg>
);

const TargetIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#16a34a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 11l18-5v12L3 13v-2z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

export default function WhatYouWin() {
  const benefits = [
    {
      icon: <TrendingUpIcon />,
      title: "Seed & Growth Funding",
      description: "Real capital to fuel your next stage of growth.",
    },
    {
      icon: <HandshakeIcon />,
      title: "Investor Introductions",
      description:
        "Direct access to investors actively looking to back Nigerian businesses.",
    },
    {
      icon: <TargetIcon />,
      title: "Exclusive Bootcamp",
      description: "Hands-on training built for entrepreneurs ready to scale.",
    },
    {
      icon: <LightbulbIcon />,
      title: "Mentorship & Advisory",
      description: "Strategic guidance from Nigeria's top business minds.",
    },
    {
      icon: <MegaphoneIcon />,
      title: "Media Exposure",
      description: "Put your business in front of the right audience.",
    },
  ];

  return (
    <section className="w-full bg-[#0F1990] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("/gallery/Pattern.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-12 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            What You Stand to Win
          </h2>
          <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
            Beyond the funding, you&apos;re gaining the network and support to
            scale faster
          </p>
        </div>

        {/* Benefits Grid - 3 on top, 2 centered on bottom */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {benefits.slice(0, 3).map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {benefits.slice(3).map((benefit, index) => (
              <BenefitCard key={index + 3} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
