import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Phantom – Contact Us",
  description:
    "Phantom is a Nepal-based embedded systems engineering company specializing in PCB design, firmware development, UAV avionics, IoT platforms, and educational electronics kits.",
  metadataBase: new URL("https://phantom.com.np/contact"),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Phantom – Contact Us",
    description:
      "Designing reliable embedded systems, UAV platforms, and IoT solutions from Kathmandu, Nepal.",
    url: "https://phantom.com.np/contact",
    siteName: "Phantom",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom – Contact Us",
    description:
      "Designing reliable embedded systems, UAV platforms, and IoT solutions from Kathmandu, Nepal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}