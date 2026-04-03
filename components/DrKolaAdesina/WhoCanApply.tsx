import Image from "next/image";
import React from "react";

interface CriteriaCardProps {
  icon: string;
  title: string;
  description: React.ReactNode;
}

const CriteriaCard = ({ icon, title, description }: CriteriaCardProps) => (
  <div className="bg-[#2a3fa0] rounded-2xl p-6 flex flex-col gap-4 hover:bg-[#3347b0] transition-colors duration-200">
    <div className="w-10 h-10 flex items-center justify-center">
      <Image src={icon} alt={title} width={32} height={32} />
    </div>
    <div>
      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
      <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function WhoCanApply() {
  const criteria = [
    {
      icon: "/icons/world.svg",
      title: "Nationality",
      description: (
        <>
          Must be a Nigerian citizen. We welcome applications from both
          residents in Nigeria and the diaspora.
        </>
      ),
    },
    {
      icon: "/icons/person.svg",
      title: "Age Range",
      description: (
        <>
          Applicants must be between{" "}
          <span className="font-bold text-white">18 and 40 years old</span> at
          the time of application.
        </>
      ),
    },
    {
      icon: "/icons/idea.svg",
      title: "Business Stage",
      description: (
        <>
          Your enterprise must be at{" "}
          <span className="font-bold text-white italic">Idea stage</span> OR{" "}
          <span className="font-bold text-white">
            Prototype/Early-traction stage
          </span>
          .
        </>
      ),
    },
    {
      icon: "/icons/stop.svg",
      title: "Funding Status",
      description: (
        <>
          Must <span className="font-bold text-white">NOT</span> have raised
          institutional funding (e.g., VC, Private Equity, or formal grants).
        </>
      ),
    },
    {
      icon: "/icons/team.svg",
      title: "Team Size",
      description: (
        <>
          You can apply as an individual founder or as a team of up to{" "}
          <span className="font-bold text-white">3 members</span>.
        </>
      ),
    },
    {
      icon: "/icons/sectors.svg",
      title: "Sectors",
      description: (
        <>
          Agriculture, Health, Education, Fintech, Energy, Climate/Environment,
          or Social Enterprise.
        </>
      ),
    },
  ];

  return (
    <section
      className="w-full py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("/gallery/WhoCanApplyBg.png")`,
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Who Can Apply?
          </h2>
          <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
            We are looking for Nigeria&apos;s brightest young minds. Review the
            criteria below to ensure your idea qualifies for the ₦30M DARE
            Nigeria Challenge.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {criteria.map((item) => (
            <CriteriaCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
