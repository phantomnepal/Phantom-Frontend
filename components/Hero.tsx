import Image from "next/image";
import { getSiteContent } from "@/data/content";

/**
 * Landing hero.
 *
 * Deliberately static. This was a Framer Motion carousel: two backgrounds
 * cross-fading on a 6s interval with an 8s scale drift, staggered entrance
 * animations on every text block, and a row of indicator pills whose active
 * state was the brand red. All of it was removed at the user's request, which
 * also lets the component drop "use client" and render on the server.
 *
 * The background is next/image with `priority` rather than a raw <img>: it is
 * the LCP element, so it needs to be preloaded and served in a modern format.
 */
export default function Hero() {
  const content = getSiteContent();
  const background = content.heroImages[0]?.src;

  return (
    <section className="relative w-full min-h-[65vh] flex items-start overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        {background && (
          <Image
            src={background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Fades early so the hardware still shows on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

      <div className="flex items-start max-w-7xl mx-auto w-full px-6 relative z-20 pt-8 sm:pt-12 pb-16">
        <div className="max-w-[650px]">
          <p className="text-lg text-[#58595A] mb-4 font-medium tracking-wide">
            Trusted by Aerospace, Robotics &amp; Embedded systems
          </p>

          <h1 className="text-[40px] sm:text-[52px] lg:text-[60px] font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-5">
            Creating Systems <br />
            with <span className="text-[#A10F1A]">Purpose.</span>
          </h1>

          <p className="text-gray-600 text-base leading-relaxed max-w-md mb-8">
            Designing reliable Embedded Systems, IoT &amp; Robotics &amp;
            Avionics Platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#0f172a] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1e293b] transition-colors">
              Explore Products
            </button>

            <button className="border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
              Engineering Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
