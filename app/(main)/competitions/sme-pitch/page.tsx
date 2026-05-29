import type { Metadata } from "next";
import Hero from "@/components/SMEPitch/Hero";
import InCollaborationWith from "@/components/CaseStudy/InCollaborationWith";
import MoreThanPitch from "@/components/SMEPitch/MoreThanPitch";
import WhatYouWin from "@/components/SMEPitch/WhatYouWin";
import WhoThisIsFor from "@/components/SMEPitch/WhoThisIsFor";
import HowWeSelect from "@/components/SMEPitch/HowWeSelect";
import FAQ from "@/components/SMEPitch/FAQ";
import ApplyNow from "@/components/SMEPitch/ApplyNow";
import Testimonials from "@/components/SMEPitch/Testimonials";

export const metadata: Metadata = {
  title: "SME Pitch Competition | NGM 5.0 Conference",
  description:
    "Apply for the NGM SME Pitch Competition 2026. Your business has potential — now give it the capital to prove it. Win seed funding, mentorship, and access to investors.",
};

export default function SMEPitchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Hero />
        <InCollaborationWith />
        <MoreThanPitch />
        <WhatYouWin />
        <WhoThisIsFor />
        <HowWeSelect />
        <Testimonials />
        <FAQ />
        <ApplyNow />
      </div>
    </div>
  );
}
