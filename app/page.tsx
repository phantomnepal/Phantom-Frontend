import AboutUs from "@/components/AboutUs";
import Faq from "@/components/Faq";
import EngineeringCapabilities from "@/components/EngineeringCapabilities";
import EngineeringSolutions from "@/components/EngineeringSolutions";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ProductHighlight from "@/components/ProductHighlight";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/components/currency/currency-provider";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <CurrencyProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Hero />
        <EngineeringSolutions />
        <AboutUs />
        <ProductHighlight />
        <EngineeringCapabilities />
        <Faq />
        <LogoMarquee />
      </main>
      <Footer />
      <Analytics />
    </CurrencyProvider>
  );
}
