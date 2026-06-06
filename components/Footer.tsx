import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { getSiteContent } from "@/data/content";

export default function Footer() {
  const content = getSiteContent();
  return (
    <footer className="relative bg-[#0B1727] text-gray-300 overflow-hidden">
      {/* Decorative diagonal stripes */}
      <div
        className="absolute bottom-0 right-0 w-2/5 h-full opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 80px, rgba(255,255,255,0.4) 80px, rgba(255,255,255,0.4) 82px)",
        }}
      />

      {/* Inner container — Figma: 1532 x 351 */}
      <div className="relative w-full max-w-[1532px] mx-auto px-12 py-10 min-h-[351px] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Phantom Logo"
                width={50}
                height={50}
                className="w-11 h-11"
              />
              <span className="text-xl font-semibold text-white tracking-wide">
                PHANTOM
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Designing reliable embedded systems and avionics platforms with
              precision engineering and robust firmware.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61573350158559"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.instagram.com/phantom.nepal?igsh=MTN5aGg2YmpwNDJhZg=="
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/phantom_technologies/"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5">
              {content.footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-4">
              ENGINEERING
            </h3>
            <ul className="space-y-2.5">
              {content.footerEngineeringLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-4">
              PRODUCT
            </h3>
            <ul className="space-y-2.5">
              {content.footerProductLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location / Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider mb-4">
              LOCATION
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#A10F1A] flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#A10F1A] flex-shrink-0" />
                <a
                  href="tel:9863942274"
                  className="hover:text-white transition-colors"
                >
                  9863942274
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#A10F1A] flex-shrink-0" />
                <a
                  href="mailto:info@phantom.com.np"
                  className="hover:text-white transition-colors"
                >
                  info@phantom.com.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Phantom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
