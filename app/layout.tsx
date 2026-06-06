import type { Metadata } from "next";
import { Inter, Sora, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
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
  title: "Phantom – Creating Systems with Purpose",
  description:
    "Designing reliable Embedded Systems, IoT & Robotics & Avionics Platforms.",
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
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
