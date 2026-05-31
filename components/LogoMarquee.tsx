import Image from "next/image";

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
      <div className="relative">
        {/* Gradient Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {/* First copy */}
          {logos.map((logo, idx) => (
            <div
              key={`a-${idx}`}
              className="mx-8 md:mx-12 flex items-center justify-center flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}

          {/* Second copy (for seamless loop) */}
          {logos.map((logo, idx) => (
            <div
              key={`b-${idx}`}
              className="mx-8 md:mx-12 flex items-center justify-center flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
