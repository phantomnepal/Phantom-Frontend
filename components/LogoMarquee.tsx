"use client";

import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { getSiteContent } from "@/data/content";

export default function LogoMarquee() {
  const content = getSiteContent();
  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      {/* 
        pauseOnHover: stops animation on mouse hover
        [--duration:15s]: makes it fast (lower = faster, higher = slower)
      */}
      <Marquee className="[--duration:15s]">
        <MarqueeContent>
          {content.logos.map((logo, idx) => (
            <MarqueeItem
              key={idx}
              // Moved your original spacing/flexbox classes here
              className="mx-8 md:mx-12 flex items-center justify-center shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  );
}
