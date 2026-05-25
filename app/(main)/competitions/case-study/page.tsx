import type { Metadata } from "next";
import {
  Hero,
  MoreThanCompetition,
  WhatYouWin,
  EligibilityCriteria,
  HowWeSelect,
  Testimonials,
  FAQ,
  ApplyNow,
} from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Case Study Competition | NGM 5.0 Conference",
  description:
    "Apply for the NGM Case Study & Research Analysis Competition 2026. From Insight to Action: Analysing Today's Evidence to Solve Challenges and Shape Tomorrow.",
};

export default function CaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Hero />
        <MoreThanCompetition />
        <WhatYouWin />
        <EligibilityCriteria />
        <HowWeSelect />
        <Testimonials />
        <FAQ />
        <ApplyNow />
      </div>
    </div>
  );
}
