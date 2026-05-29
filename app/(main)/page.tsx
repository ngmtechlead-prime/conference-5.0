import Hero from "@/components/home/Hero";
import WhatIsNGM from "@/components/home/WhatIsNGM";
import Momentum from "@/components/home/Momentum";
import Competitions from "@/components/home/Competitions";
import Programme from "@/components/home/Programme";
import Speakers from "@/components/home/Speakers";
import Testimonials from "@/components/home/Testimonials";
import PartnerWithUs from "@/components/home/PartnerWithUs";
import TicketsCTA from "@/components/home/TicketsCTA";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsNGM />
      <Momentum />
      <Competitions />
      <Programme />
      <Speakers />
      <Testimonials />
      <PartnerWithUs />
      <FAQ />
      <TicketsCTA />
    </>
  );
}
