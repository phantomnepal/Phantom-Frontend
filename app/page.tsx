import AboutUs from "@/components/AboutUs";
import EmailSubscribe from "@/components/EmailSubscribe";
import Faq from "@/components/Faq";
import EngineeringCapabilities from "@/components/EngineeringCapabilities";
import EngineeringSolutions from "@/components/EngineeringSolutions";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ProductHighlight from "@/components/ProductHighlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <EngineeringSolutions />
      <AboutUs />
      <ProductHighlight />
      <EngineeringCapabilities />

      <Faq />
      <LogoMarquee />
    </main>
  );
}
