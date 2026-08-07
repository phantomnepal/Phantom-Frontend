import type { Metadata } from "next";
import { Inter, Sora, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/components/currency/currency-provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Phantom – Embedded Systems, UAV & IoT Engineering in Nepal",
  description:
    "Phantom is a Nepal-based embedded systems engineering company specializing in PCB design, firmware development, UAV avionics, IoT platforms, and educational electronics kits.",
  metadataBase: new URL("https://phantom.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phantom – Embedded Systems, UAV & IoT Engineering in Nepal",
    description:
      "Designing reliable embedded systems, UAV platforms, and IoT solutions from Kathmandu, Nepal.",
    url: "https://phantom.com.np",
    siteName: "Phantom",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom – Embedded Systems, UAV & IoT Engineering in Nepal",
    description:
      "Designing reliable embedded systems, UAV platforms, and IoT solutions from Kathmandu, Nepal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Phantom",
              url: "https://phantom.com.np",
              logo: "https://phantom.com.np/logo.svg",
              description:
                "Nepal-based embedded systems engineering company specializing in PCB design, firmware, UAV avionics, IoT, and educational electronics kits.",
              email: "info@phantom.com.np",
              telephone: "+9779863942274",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kathmandu",
                addressCountry: "NP",
              },
              sameAs: [
                "https://www.linkedin.com/company/phantom_technologies/",
                "https://www.instagram.com/phantom.nepal",
                "https://www.tiktok.com/@phantom_technology02",
                "https://www.facebook.com/profile.php?id=61573350158559",
              ],
            }),
          }}
        />
        {/* First focusable element on every page: the header carries a logo,
            five nav items, search and two icon buttons ahead of the content,
            and the mega menu adds thirteen more once focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0f1e2e] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {/* Wraps the navbar as well as the page: the currency switch lives in
            the header, and every price it controls is below it. */}
        <CurrencyProvider>
          <Navbar />
          <div id="main-content">{children}</div>
          <Footer />
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
