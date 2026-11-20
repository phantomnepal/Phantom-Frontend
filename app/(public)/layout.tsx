import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/components/currency/currency-provider";
import { Analytics } from "@vercel/analytics/next";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CurrencyProvider>
      <Navbar />
      <div id="main-content">{children}</div>
      <Footer />
      <Analytics />
    </CurrencyProvider>
  );
}