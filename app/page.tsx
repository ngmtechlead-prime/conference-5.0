import About from "@/components/DrKolaAdesina/About";
import ApplyNow from "@/components/DrKolaAdesina/ApplyNow";
import FAQ from "@/components/DrKolaAdesina/FAQ";
import Hero from "@/components/DrKolaAdesina/Hero";
import Prizes from "@/components/DrKolaAdesina/Prizes";
import WhoCanApply from "@/components/DrKolaAdesina/WhoCanApply";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Prizes />
      <WhoCanApply />
      <FAQ />
      <ApplyNow />
      <Footer />
    </div>
  );
}

export default HomePage;
