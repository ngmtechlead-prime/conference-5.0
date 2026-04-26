import About from "@/components/DrKolaAdesina/About";
import ApplyNow from "@/components/DrKolaAdesina/ApplyNow";
import FAQ from "@/components/DrKolaAdesina/FAQ";
import Hero from "@/components/DrKolaAdesina/Hero";
import Prizes from "@/components/DrKolaAdesina/Prizes";
import WhoCanApply from "@/components/DrKolaAdesina/WhoCanApply";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      {/* <Prizes /> */}
      <WhoCanApply />
      <FAQ />
      <ApplyNow />
    </div>
  );
}

export default HomePage;
