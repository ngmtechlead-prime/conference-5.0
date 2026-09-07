"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type Speaker = {
  name: string;
  title: string;
  org: string;
  bio: string;
  image?: string;
};

const speakers: Speaker[] = [
  {
    name: "Russel Rogers (Keynote Speaker)",
    title: "Founder and CEO",
    image: "/speakers/russel-rogers.webp",
    org: "Adaptive Intelligence and the Adaptive Foundation",
    bio: `Russell Rogers is an entrepreneur, educator, veteran, and global community builder committed to developing leaders who can navigate complexity, drive innovation, and help build a more sustainable world. He is the Founder and CEO of Adaptive Intelligence and the Adaptive Foundation, which together are building a global ecosystem connecting executives, entrepreneurs, academics, investors, and emerging leaders through trusted relationships, learning, collaboration, and service.

    Russell’s perspective has been shaped by an unusually diverse career. He served for more than two decades in the U.S. military, including as an Army combat medic and an Air Force CBRNE instructor and Air Advisor, and helped lead a U.S. Department of Defense digital innovation initiative during the COVID-19 pandemic. His career has also spanned corporate innovation, entrepreneurship, technology, education, and organizational transformation.

    A passionate advocate for lifelong learning, Russell has earned multiple undergraduate and graduate degrees and pursued advanced, executive, and professional education at many of the world’s leading institutions, including Harvard, MIT, Stanford, Oxford, Cambridge, Wharton, Carnegie Mellon, Cornell, Berkeley, Yale, IMD, Baylor and USF. His multidisciplinary education has shaped his thinking across leadership, business, innovation, technology, artificial intelligence, organizational systems, and public health.

    Russell is the creator of the Adaptive Global Fellowship, which brings together high-potential emerging leaders with experienced executives, academics, entrepreneurs, and mentors from around the world. His broader work through Adaptive focuses on responsible leadership, innovation, sustainability, and education, with these disciplines increasingly brought together in service of a central challenge: how to build a more sustainable future. He is particularly interested in the importance of trust, adaptability, collaboration, and human relationships at a time when artificial intelligence is rapidly transforming how people work, learn, and lead.

    Russell often describes himself not simply as a CEO, but as a “Chief Helper.” It reflects his belief that leadership begins with service and that meaningful change often starts by bringing the right people together and asking a simple question: “How can I help?”
`,
  },
  {
    name: "Iyin Aboyeji",
    title: "General Partner & Co-Founder",
    org: "Future Africa",
    bio: `
      Iyinoluwa “E” Aboyeji, OON is currently the Founding Partner of Future Africa, Africa’s largest seed stage investor which has invested millions of dollars into over hundred startups across Africa.

      Prior to that he co-founded two of Africa’s seven unicorns; Andela and Flutterwave. Iyinoluwa has served his country as the youngest member of Nigeria’s Presidential Council on Industrial Policy and Competitiveness and has been recognized as one of the youngest recipients of a national award as the Officer of the Order of the Niger (OON).

      He has been recognized as a World Economic Forum Young Global Leader and a Forbes 30 under 30 honoree amongst other awards and fellowships.
    `,
    image: "/speakers/iyin-aboyeji.webp",
  },
  {
    name: "Kola Adesina",
    title: "Group Managing Director",
    org: "Sahara Power Group",
    bio: "Kola Adesina is the Group Managing Director of Sahara Power Group, a leading energy company operating across Africa and beyond. He has played a pivotal role in transforming Nigeria's power sector and advancing energy access across the continent. Under his leadership, Sahara Group has become a multi-billion dollar conglomerate with operations spanning energy, infrastructure, and technology.",
    image: "/speakers/kola-adesina.webp",
  },
  {
    name: "Dr. Adebola Akindele",
    title: "Founder & Chairman/Group CEO",
    org: "Courteville Business Solutions",
    bio: `
      Dr. Adebola Ismail Akindele is a distinguished business strategist, technology innovator, and transformational leader whose career spans more than four decades across banking, finance, digital transformation, and corporate governance.

      He is the Founder and Chairman/Group CEO of Courteville Business Solutions Limited (CBS), which he has built over the past two decades into one of Africa's foremost digital innovation companies. Under his leadership, CBS became a publicly quoted company on the Nigerian Stock Exchange, renowned for pioneering technology-driven solutions that have transformed operations across both the public and private sectors.

      Dr. Akindele is best known as the visionary behind AutoRegTM, Africa's flagship motor vehicle administration and automation platform, now deployed across all 36 Nigerian states and in several African and Caribbean countries. The platform has strengthened government revenue administration, advanced financial inclusion, and improved regulatory compliance — while empowering over 1,000 franchise operators, partnering with 23 financial institutions, and creating more than 10,000 jobs. Beyond AutoRegTM, he has led the delivery of award-winning digital platforms for institutions including the Federal Inland Revenue Service (FIRS), NAFDAC, and the Nigerian Insurers Association.

      Before founding Courteville, Dr. Akindele held senior leadership positions at the Central Bank of Nigeria, Oceanic Bank International, and Fountain Trust Bank, where he earned an outstanding reputation in treasury management, commercial banking, credit and risk management, and corporate strategy. His professional foundation was laid at KPMG Peat Marwick Ani Ogunde & Co., grounding him in audit, taxation, and financial control.

      He holds a Doctorate in Business Administration from the International School of Management, Paris; a Master of Science in Banking & Finance from the University of Lagos; and a Bachelor's degree from Obafemi Awolowo University. He is a Fellow of the Institute of Chartered Accountants of Nigeria, the Chartered Institute of Taxation, and the Institute of Directors.

      An accomplished author, mentor, and philanthropist, Dr. Akindele has mentored over 500 young entrepreneurs across Africa and sits on numerous corporate and advisory boards, including as the first non-East African member of the Board of Advisors of the East Africa Business Network. His contributions to business and technology have earned him prestigious honours, including the Nigeria Technology Lifetime Achievement Award (2017), the Commonwealth ICT Application Award (2016), the BusinessDay Top CEOs & Next Bulls Award (2020), and Pan African Personality of the Year (2019).

      At NGM Conference 5.0, Dr. Akindele joins an esteemed panel of industry leaders to share practical insights on leadership, innovation, entrepreneurship, digital transformation, and building sustainable enterprises for the future.
    `,
    image: "/speakers/adebola-akindele.webp",
  },
  {
    name: "Modele Idiahi",
    title: "Managing Director",
    org: "Eleva Group",
    bio: `
      Modele Fadayomi-Idiahi is the Managing Director of Eleva Group and a business leader working
      at the intersection of energy and finance; two sectors whose convergence will shape Africa's
      next decade of growth.

      Her career began in investment banking at Chapel Hill Denham, where she spent four years on
      capital raising and advisory work, before moving into energy with Siemens, where she led
      business development for power generation. That combination of capital markets discipline
      paired with deep operating knowledge of the power sector informs how she approaches
      strategy, project development and business planning today.

      Beyond her executive work, Modele is an active voice for gender diversity in African energy,
      advocating on platforms including CNBC Africa for the equal participation of women in the
      sector. She is a regular speaker and resource person at industry forums, including the Energy
      Institute Nigeria and the Energy Sustainability Conference.

      At NGM Conference 5.0, Modele Fadayomi-Idiahi, Managing Director of Eleva Group, joins an
      esteemed panel of industry leaders to share practical insights on leadership, innovation,
      entrepreneurship, digital transformation, and building sustainable enterprises for the future.
    `,
    image: "/speakers/modele-idiahi.webp",
  },
  {
    name: "Salamat Rahaman",
    title: "Engineer | Entrepreneur | Wellness & Leadership Strategist",
    org: "Nigeria LNG Ltd.",
    bio: `
      Salamat 'Rahaman is a chartered civil engineer, Project Management Professional (PMP), and business leader with nearly two decades of experience spanning Nigeria LNG Ltd., where she built her career in project engineering and business development, to founding and leading Easygas Energy Solutions Ltd., a pioneering LPG retail company in Lagos. Her entrepreneurial impact earned her the 2020 Standard Chartered Women in Tech Award and a spot on Tropics Business Summit's "Top 500 Most Influential Africans in the World."

      Beyond the boardroom, Salamat is the creator of Signature Salamat, a framework helping high-achieving women navigate midlife with confidence and vitality. A member of the Nigerian Society of Engineers, COREN, NLPGA, WIMBIZ and the Women in LPG Council, she is a sought-after mentor and speaker on leadership, entrepreneurship, and women's empowerment.
    `,
    image: "/speakers/salamat-rahaman.webp",
  },
  {
    name: "Idris Ayodeji Bello",
    title: "Founding Partner",
    org: "LoftyInc Capital",
    bio: `
      Idris Ayodeji Bello is the Founding Partner at LoftyInc Capital, a Pan-African venture capital firm that has played a pioneering role in Africa’s tech startup ecosystem. He helped establish key innovation infrastructure such as the Wennovation Hub and angel networks like the Afropreneur Angel Group (AAG) and the Lagos Angel Network.

      He is credited with originating the term 'Afropreneur', referring to African-descended entrepreneurs who apply technology and innovation to tackle challenges and create opportunities within African communities and the diaspora.

      Recognized by CNN as one of the Top Ten African Technology Voices, Idris is a Kauffman Fellow and a Singularity University Impact Fellow. He holds a BSc (First Class Hons.) in Computer Engineering from Obafemi Awolowo University, an MSc in Computer Science & Data Mining from the University of Houston, an MSc in Global Health Science from the University of Oxford, and an MBA from Rice University. He also earned a Certificate in Exponential Technologies from Singularity University in Silicon Valley.

      His diverse experience spans energy, technology, and healthcare, having held senior roles at Procter & Gamble, Chevron, ExxonMobil, and the Clinton Health Access Initiative. Idris is a Fellow of the Society for Corporate Governance in Nigeria and currently serves as an Independent Non-Executive Director at Stanbic Financial Services Limited and Sudo Africa, among others.

      A 2011 Fellow of the Harambe Entrepreneur Alliance, Idris has, through LoftyInc, led investments into hundreds of Africa’s fastest-growing startups, including four unicorns, and is widely regarded as one of the continent’s leading technology investors, with a footprint in over 20 African countries.
    `,
    image: "/speakers/idris-ayodeji.webp",
  },
  {
    name: "Temitope Yusuff",
    title: "VP, Group Audit & Risk",
    org: "IHS Towers",
    bio: `
      Mrs Temitope Yusuff is a seasoned business leader and finance professional with over nineteen years of experience across local and international organizations. Her work spans business transformation, strategy, audit, risk management and corporate governance, a breadth that has given her a well-rounded perspective on the commercial and financial realities organizations face.

      She currently serves as Director of Internal Audit and Risk Management at IHS Towers, one of the largest telecommunications infrastructure providers in the world. In this role, she provides strategic leadership and direction for the planning, execution and management of internal audit and risk activities across the IHS Group's operations in Nigeria, Cameroon, Côte d'Ivoire, Zambia, Rwanda, South Africa, Brazil, the UAE and the United Kingdom. Working across these markets, she helps the business apply consistent global operating standards and make sound, well-governed financial decisions.

      She is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and a Fellow of the Chartered Institute of Taxation of Nigeria (CITN). She holds an MBA from Lagos Business School and is an alumna of IESE Business School, Spain. Her driving interest is in building and implementing robust solutions that create sustainable impact transforming how professionals and business owners run and grow their organizations. She welcomes engagement with organizations worldwide on business and technical advisory work.

      At NGM Conference 5.0, Mrs Temitope Yusuff joins an esteemed panel of industry leaders to share practical insights on leadership, innovation, entrepreneurship, digital transformation, and building sustainable enterprises for the future.`,
    image: "/speakers/temitope-yusuff.webp",
  },
];

function getPlaceholderColors(name: string) {
  const palettes = [
    { bg: "#0B0E4A", text: "rgba(255,255,255,0.12)" },
    { bg: "#0F1990", text: "rgba(255,255,255,0.10)" },
    { bg: "#162058", text: "rgba(255,255,255,0.10)" },
    { bg: "#1A237E", text: "rgba(255,255,255,0.09)" },
    { bg: "#0D1B6F", text: "rgba(255,255,255,0.11)" },
    { bg: "#0A1250", text: "rgba(255,255,255,0.10)" },
    { bg: "#131B6E", text: "rgba(255,255,255,0.12)" },
    { bg: "#0E1580", text: "rgba(255,255,255,0.10)" },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palettes[Math.abs(hash) % palettes.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker;
  onClick: () => void;
}) {
  const colors = getPlaceholderColors(speaker.name);
  const initials = getInitials(speaker.name);

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-[#0F1990] rounded-xl overflow-hidden flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0DA04C] focus-visible:ring-offset-2 transition-transform duration-200 hover:-translate-y-1"
      aria-label={`View bio for ${speaker.name}`}
    >
      {/* Image / initials placeholder */}
      <div
        className="relative w-full aspect-4/5 flex items-center justify-center overflow-hidden"
        style={!speaker.image ? { backgroundColor: colors.bg } : undefined}
      >
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span
            className="text-[clamp(3.5rem,8vw,5.5rem)] font-bold tracking-[-0.06em] select-none leading-none transition-transform duration-300 group-hover:scale-110"
            style={{ color: colors.text }}
            aria-hidden
          >
            {initials}
          </span>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#0DA04C]/0 group-hover:bg-[#0DA04C]/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <span className="text-xs font-semibold text-white bg-[#0DA04C] px-3 py-1 rounded-full tracking-wide">
            View Bio
          </span>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-[#E6F7EC] p-4 mt-auto">
        <p className="text-[#0F1990] font-semibold text-base sm:text-lg tracking-tighter font-epilogue leading-tight">
          {speaker.name}
        </p>
        <p className="text-[#0F1990]/70 text-xs sm:text-sm tracking-tight mt-0.5 leading-snug">
          {speaker.title}, <span className="font-semibold">{speaker.org}</span>
        </p>
      </div>
    </button>
  );
}

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const colors = getPlaceholderColors(speaker.name);
  const initials = getInitials(speaker.name);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${speaker.name} bio`}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden font-epilogue"
        >
          {/* Header with avatar */}
          <div
            className="relative flex items-end gap-5 px-6 pt-6 pb-5"
            style={{ backgroundColor: colors.bg }}
          >
            <div
              className="relative w-20 h-20 rounded-xl shrink-0 border-2 border-white/20 overflow-hidden flex items-center justify-center"
              style={
                !speaker.image ? { backgroundColor: colors.bg } : undefined
              }
            >
              {speaker.image ? (
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              ) : (
                <span
                  className="text-4xl font-bold tracking-[-0.06em] leading-none select-none"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  aria-hidden
                >
                  {initials}
                </span>
              )}
            </div>
            <div className="pb-1 flex-1 min-w-0">
              <p className="text-white font-bold text-xl leading-tight tracking-tight">
                {speaker.name}
              </p>
              <p className="text-white/70 text-sm mt-0.5 leading-snug">
                {speaker.title},{" "}
                <span className="font-semibold">{speaker.org}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bio */}
          <div className="px-6 py-6">
            <h3 className="text-xs font-bold text-[#0DA04C] uppercase tracking-widest mb-3">
              About
            </h3>
            <p className="text-[#374151] text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {speaker.bio || "Bio coming soon."}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SpeakersGrid() {
  const [selected, setSelected] = useState<Speaker | null>(null);

  return (
    <section className="w-full bg-white py-16 lg:py-24 font-epilogue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F1990] tracking-[-0.04em] leading-none">
            Meet the <span className="font-bold text-[#0DA04C]">speakers.</span>
          </h1>
          <p className="text-[#4a5565] text-base sm:text-lg max-w-2xl leading-relaxed mt-4">
            Industry leaders, innovators, and changemakers sharing their
            insights at NGM Conference 5.0. Click any card to read their full
            bio.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpeakerCard
                speaker={speaker}
                onClick={() => setSelected(speaker)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bio modal */}
      <AnimatePresence>
        {selected && (
          <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
