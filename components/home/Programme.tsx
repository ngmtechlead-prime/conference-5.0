"use client";

import { motion } from "motion/react";
import Wrapper from "@/components/shared/Wrapper";

type AgendaItem = {
  start: string;
  end: string;
  duration?: string;
  category: string;
  title: string;
  detail?: string;
};

const agenda: AgendaItem[] = [
  {
    start: "7:00 AM",
    end: "9:45 AM",
    duration: "2 hrs 45 mins",
    category: "Pre-event",
    title: "Pre-Event — Breakfast with NG",
    detail:
      "Breakfast: 7:30–8:30 AM · Pre-event sessions: 9:00–9:45 AM · Medical checkup: 7:00–9:45 AM",
  },
  {
    start: "9:45 AM",
    end: "9:50 AM",
    duration: "5 mins",
    category: "Pre-event",
    title: "Security Awareness Briefing",
  },
  {
    start: "9:55 AM",
    end: "10:05 AM",
    duration: "10 mins",
    category: "Opening activities",
    title: "Conference starts with NGM documentary",
  },
  {
    start: "10:05 AM",
    end: "10:10 AM",
    duration: "5 mins",
    category: "Opening activities",
    title: "Welcome Address by the Chairman, Conference Planning Committee",
  },
  {
    start: "10:10 AM",
    end: "10:20 AM",
    duration: "10 mins",
    category: "Opening activities",
    title: "MCs come on stage",
  },
  {
    start: "10:20 AM",
    end: "10:30 AM",
    duration: "10 mins",
    category: "Opening activities",
    title: "Grand Mentor’s Address",
  },
  {
    start: "10:35 AM",
    end: "11:05 AM",
    duration: "30 mins",
    category: "Keynote and panel",
    title: "Keynote Speaker Address",
  },
  {
    start: "11:05 AM",
    end: "11:10 AM",
    duration: "5 mins",
    category: "Keynote and panel",
    title: "Panelists brought on stage",
  },
  {
    start: "11:10 AM",
    end: "12:10 PM",
    duration: "60 mins",
    category: "Keynote and panel",
    title: "Panel Session",
    detail: "Includes a 15-minute Q&A.",
  },
  {
    start: "12:10 PM",
    end: "12:20 PM",
    duration: "10 mins",
    category: "Keynote and panel",
    title: "Presentation of awards to panelists",
    detail: "Followed by the NGM @ 10 Cake Cutting Ceremony.",
  },
  {
    start: "12:20 PM",
    end: "12:30 PM",
    duration: "10 mins",
    category: "Keynote and panel",
    title: "NGM Awards / Interlude",
  },
  {
    start: "12:30 PM",
    end: "12:40 PM",
    duration: "10 mins",
    category: "DARE Nigeria Challenge",
    title: "DARE Nigeria Charge by Mr Kola Adesina",
  },
  {
    start: "12:40 PM",
    end: "1:40 PM",
    duration: "60 mins",
    category: "DARE Nigeria Challenge",
    title: "NGM × Kola Adesina DARE Nigeria Challenge",
  },
  {
    start: "1:40 PM",
    end: "1:55 PM",
    duration: "15 mins",
    category: "DARE Nigeria Challenge",
    title: "Support NGM Platform for the Next Decade",
    detail: "Moderated by Engr Jamiu Badmus.",
  },
  {
    start: "1:55 PM",
    end: "2:00 PM",
    duration: "5 mins",
    category: "DARE Nigeria Challenge",
    title: "Spoken word performance by Hamzah Alagbe",
  },
  {
    start: "2:00 PM",
    end: "2:10 PM",
    duration: "10 mins",
    category: "DARE Nigeria Challenge",
    title: "DARE Nigeria Challenge winners announcement",
    detail: "Award presentation follows the announcement.",
  },
  {
    start: "2:10 PM",
    end: "2:30 PM",
    duration: "20 mins",
    category: "Break",
    title: "Solat break (Zuhr) + Lunch",
    detail: "Ads play during the lunch break.",
  },
  {
    start: "2:30 PM",
    end: "2:35 PM",
    duration: "5 mins",
    category: "Programme interlude",
    title: "MCs come on stage",
  },
  {
    start: "2:35 PM",
    end: "2:40 PM",
    duration: "5 mins",
    category: "Programme interlude",
    title: "Spoken word performance by Zaynab Adesina",
  },
  {
    start: "2:40 PM",
    end: "2:50 PM",
    duration: "10 mins",
    category: "Programme interlude",
    title: "Second documentary plays",
  },
  {
    start: "2:50 PM",
    end: "3:00 PM",
    duration: "10 mins",
    category: "Afropreneur SME Pitch",
    title: "SME Pitch Charge by Mr Idris Bello",
  },
  {
    start: "3:00 PM",
    end: "4:00 PM",
    duration: "60 mins",
    category: "Afropreneur SME Pitch",
    title: "NGM × Afropreneur SME Pitch Competition",
  },
  {
    start: "4:00 PM",
    end: "4:15 PM",
    duration: "15 mins",
    category: "Afropreneur SME Pitch",
    title: "Competitions winners announcement",
    detail: "Essay, Case Study and NGM Awards.",
  },
  {
    start: "4:15 PM",
    end: "4:35 PM",
    duration: "20 mins",
    category: "Award and closing",
    title: "SME Pitch winner announcement",
  },
  {
    start: "4:35 PM",
    end: "4:40 PM",
    duration: "5 mins",
    category: "Award and closing",
    title: "Vote of thanks",
    detail: "By the Secretary, Conference Planning Committee.",
  },
  {
    start: "4:40 PM",
    end: "5:00 PM",
    category: "Networking",
    title: "Asr / Networking",
  },
  {
    start: "5:00 PM",
    end: "6:00 PM",
    duration: "60 mins",
    category: "Celebration",
    title: "Post-event mocktail",
    detail: "NGM 10 Years anniversary celebration.",
  },
];

export default function EventAgenda() {
  return (
    <section
      id="programme"
      aria-labelledby="event-agenda-heading"
      className="w-full bg-[#F8F9F5] py-16 font-epilogue lg:py-24"
    >
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mb-10 max-w-7xl overflow-hidden rounded-3xl bg-[#0F1990] px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14"
        >
          <div
            className="absolute -right-20 -top-28 size-72 rounded-full border-52 border-white/5"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 right-1/4 size-64 rounded-full border-44 border-[#0DA04C]/20"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#7CE6A7]">
              Conference 5.0
            </p>
            <h2
              id="event-agenda-heading"
              className="text-4xl font-normal leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              Event <span className="font-bold text-[#7CE6A7]">agenda.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              From breakfast and bold conversations to pitches, awards and an
              anniversary celebration — here is the full Conference 5.0
              programme.
            </p>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                Theme
              </p>
              <p className="mt-2 text-xl font-semibold leading-snug tracking-[-0.025em] sm:text-2xl">
                Building the Future: The Urgency of Now
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#0F1990]/10 bg-white shadow-[0_18px_55px_rgba(15,25,144,0.07)]"
        >
          <div className="flex flex-col gap-2 border-b border-[#0F1990]/10 bg-[#F1F8F3] px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0DA04C]">
                Full programme
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-[#0F1990] sm:text-3xl">
                Everything happening at Conference 5.0.
              </h3>
            </div>
            <p className="text-sm font-bold text-[#0DA04C]">
              7:00 AM — 6:00 PM
            </p>
          </div>

          <ol>
            {agenda.map((item, index) => {
              const isLastItem = index === agenda.length - 1;

              return (
                <motion.li
                  key={`${item.start}-${item.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.015, 0.15),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex gap-4 px-5 py-6 sm:gap-6 sm:px-8 sm:py-7 lg:px-10"
                >
                  {!isLastItem && (
                    <span
                      className="absolute bottom-0 left-[2.45rem] top-14 w-px bg-[#0F1990]/10 sm:left-[3.45rem]"
                      aria-hidden="true"
                    />
                  )}

                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#0DA04C]/25 bg-[#EAF7EE] text-[0.65rem] font-bold text-[#0DA04C] transition-colors group-hover:bg-[#0DA04C] group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1 md:grid md:grid-cols-[10rem_1fr] md:gap-8">
                    <div>
                      <p className="text-sm font-bold leading-none text-[#0DA04C]">
                        <time>{item.start}</time>
                        <span
                          className="px-1 text-[#0DA04C]/50"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <time>{item.end}</time>
                      </p>
                      {item.duration && (
                        <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#4a5565]/60">
                          {item.duration}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 md:mt-0">
                      <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#0F1990]/50">
                        {item.category}
                      </p>
                      <h4 className="text-base font-semibold leading-snug tracking-[-0.015em] text-[#151938] sm:text-lg">
                        {item.title}
                      </h4>
                      {item.detail && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4a5565]">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </Wrapper>
    </section>
  );
}
