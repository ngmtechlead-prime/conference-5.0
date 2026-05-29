import Image from "next/image";
import Wrapper from "../shared/Wrapper";

const DrKolaFrame = () => {
  return (
    <div className="bg-[#0F1990] rounded-lg p-4">
      <div className="mb-4">
        <Image
          src="/gallery/DrKolaAdesina.png"
          alt="Kola Adesina"
          className="w-full h-full object-cover object-top"
          width={429}
          height={450}
        />
      </div>
      <div className="bg-[#E6F7EC] rounded-sm p-4">
        <p className="text-[#0F1990] font-semibold text-3xl tracking-tighter font-epilogue">
          Kola Adesina
        </p>
        <p className="text-[#0F1990] text-base tracking-tighter">
          MD/CEO, Sahara Group
        </p>
      </div>
    </div>
  );
};


export default function About() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <Wrapper className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left – Portrait Card */}
        <div className="w-full sm:w-[40%] shrink-0 mx-auto lg:mx-0">
          <DrKolaFrame />
        </div>

        {/* Right – Content */}
        <div className="w-full sm:w-[60%] flex-1 flex flex-col gap-5">
          {/* Heading */}
          <div className="font-epilogue">
            <h2 className="text-3xl sm:text-4xl text-[#0F1990] leading-none tracking-[-0.04em]">
              What Is the{" "}
              <span className="font-bold text-[#0DA04C]">
                DARE Nigeria Challenge?
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-gray-600 text-xl font-light mt-4">
              Your bold idea, backed by{" "}
              <span className="font-bold text-[#101828]">₦30 Million</span> in
              seed funding.
            </p>
          </div>

          {/* Feature blocks */}
          <div className="flex flex-col gap-5 mt-2">
            {/* The Opportunity */}
            <div className="flex gap-4 items-start mb-5">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#E6F7EC]">
                <Image
                  src="/icons/opportunity.svg"
                  alt="opportunity"
                  width={20}
                  height={20}
                />
              </div>
              <div className="font-epilogue">
                <h3 className="font-bold text-[#333333] text-xl mb-2">
                  The Opportunity
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Celebrating the NGM Platform&apos;s 10th Anniversary, the DARE
                  Nigeria Challenge is a structured, multi-phase competition
                  designed to find and scale Nigeria&apos;s most innovative
                  youth-led enterprises. This is more than a pitch
                  event—it&apos;s a launchpad providing seed capital, elite
                  mentorship, and national visibility to 5 exceptional winners.
                </p>
              </div>
            </div>

            {/* The Visionary Backing */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#E7E8F4]">
                <Image
                  src="/icons/visionary.svg"
                  alt="visionary"
                  width={20}
                  height={20}
                />
              </div>
              <div className="font-epilogue">
                <h3 className="font-bold text-[#333333] text-xl mb-2">
                  The Visionary Backing
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  This initiative was born from a spontaneous ₦30,000,000 pledge
                  made live at NGM Conference 4.0 by Kola Adesina. His
                  vision is clear: to put real resources behind young Nigerians
                  who have the courage to build sustainable businesses. Winning
                  means gaining not just capital, but the endorsement of one of
                  Nigeria&apos;s most respected business minds.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 font-epilogue">
            <a
              href="/competitions/dare-nigeria/apply"
              className="inline-flex items-center font-epilogue gap-2 bg-[#0F1990] hover:bg-[#1d4ed8] text-white font-semibold text-sm px-7 py-3.5 rounded-md transition-colors duration-200"
            >
              Apply Now
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33333M12.6667 8L8.00001 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
