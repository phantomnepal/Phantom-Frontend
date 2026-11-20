import type { Metadata } from "next";
import { Inter, Sora, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./provider";
import { Toaster } from "sonner";

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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${sora.variable} antialiased`} style={{ marginTop: "72px" }}>
        <Providers>
          {children}
        </Providers>
        <Toaster/>
      </body>
    </html>
  );
}