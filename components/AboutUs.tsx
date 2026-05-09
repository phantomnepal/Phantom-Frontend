import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/lab-background.png"
        alt="Embedded Engineering Lab"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/75" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 text-center text-white">
        <p className="text-sm tracking-[0.2em] mb-5 text-gray-200">ABOUT US</p>

        <h2 className="text-xl md:text-4xl font-bold mb-8">
          Advancing Embedded Innovation
        </h2>

        <p className="text-gray-200 leading-relaxed max-w-5xl mx-auto mb-3 text-base md:text-[15px]">
          Phantom is an embedded systems engineering company focused on building
          structured, reliable hardware platforms. From custom PCB architecture
          to bare-metal firmware development, every system is designed with
          long-term scalability, power integrity, and architectural discipline
          in mind. Our engineering approach prioritizes precision, efficiency,
          and system reliability. By combining hardware design with low-level
          software development, Phantom creates embedded solutions that are
          stable, maintainable, and ready for real-world deployment.
        </p>

        <p className="text-gray-200 leading-relaxed max-w-4xl mx-auto mb-10 text-base md:text-[15px]">
          We focus on building technology that forms the foundation of modern
          electronic products and intelligent systems.
        </p>

        <Link
          href="/about"
          className="inline-block px-10 py-3 border border-white/80 text-white font-medium rounded-md hover:bg-white hover:text-slate-900 transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
