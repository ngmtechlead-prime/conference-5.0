import type { Metadata } from "next";
import About from "@/components/DrKolaAdesina/About";
import ApplyNow from "@/components/DrKolaAdesina/ApplyNow";
import FAQ from "@/components/DrKolaAdesina/FAQ";
import Hero from "@/components/DrKolaAdesina/Hero";
import Prizes from "@/components/DrKolaAdesina/Prizes";
import WhoCanApply from "@/components/DrKolaAdesina/WhoCanApply";

export const metadata: Metadata = {
  title: "DARE Nigeria Challenge | NGM 5.0 Conference",
  description:
    "Apply for the NGM Dr. Kola Adesina DARE Nigeria Challenge 2026. Win up to ₦10,000,000 for your bold idea that can change Nigeria.",
};

export default function DareNigeriaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Prizes />
      <WhoCanApply />
      <FAQ />
      <ApplyNow />
    </div>
  );
}
