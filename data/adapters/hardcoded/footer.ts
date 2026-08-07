/** Footer link columns and social links. */

import type {
  FooterLink,
  SocialLink,
} from "../../types";

export const footerQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Engineering", href: "/engineering" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const footerEngineeringLinks: FooterLink[] = [
  { label: "Embedded Hardware Development", href: "#" },
  { label: "Embedded Software Development", href: "#" },
  { label: "3D & Mechanical Development", href: "#" },
];

export const footerProductLinks: FooterLink[] = [
  { label: "Embedded Systems", href: "#" },
  { label: "IOT & Robotics", href: "#" },
  { label: "Flight Electronics", href: "#" },
  { label: "Educational Kits", href: "#" },
];

export const socialLinks: SocialLink[] = [
  {
    iconName: "FaTiktok",
    href: "https://www.tiktok.com/@phantom_technology02?is_from_webapp=1&sender_device=pc",
    label: "Tiktok",
  },
  {
    iconName: "FaLinkedinIn",
    href: "https://www.linkedin.com/company/phantom_technologies/",
    label: "LinkedIn",
  },
  {
    iconName: "FaInstagram",
    href: "https://www.instagram.com/phantom.nepal?igsh=MTN5aGg2YmpwNDJhZg==",
    label: "Instagram",
  },
];
