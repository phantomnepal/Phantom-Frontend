"use client";

import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

interface Logo {
  src: string;
  alt: string;
}

const logos: Logo[] = [
  { src: "/logos/matlab.svg", alt: "MATLAB" },
  { src: "/logos/LT.svg", alt: "LTspice" },
  { src: "/logos/aws-freertos.svg", alt: "FreeRTOS" },
  { src: "/logos/blender.svg", alt: "Blender" },
  { src: "/logos/Altium.png", alt: "Altium Designer" },
  { src: "/logos/platformio.svg", alt: "PlatformIO" },
  { src: "/logos/visual-studio-code.svg", alt: "VS Code" },
  { src: "/logos/arduino.svg", alt: "Arduino" },
  { src: "/logos/OpenVSP.png", alt: "OpenVSP" },
  { src: "/logos/kicad.svg", alt: "KiCad" },
  { src: "/logos/fusion.svg", alt: "Fusion" },
  { src: "/logos/stmicroelectronics.svg", alt: "STM32CubeIDE" },
];

export default function LogoMarquee() {
  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      {/* 
        pauseOnHover: stops animation on mouse hover
        [--duration:15s]: makes it fast (lower = faster, higher = slower)
      */}
      <Marquee className="[--duration:15s]">
        <MarqueeContent>
          {logos.map((logo, idx) => (
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
