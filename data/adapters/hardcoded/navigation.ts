/** Navbar structure and the site search index. */

import type { MegaMenuColumn, NavItem, SearchableItem } from "../../types";
import { productCategories } from "./categories";
import { catalog } from "./products";

/** Mega-menu columns, one per category, derived from the catalog. */
const productMegaMenuColumns: MegaMenuColumn[] = productCategories.map(
  (category) => ({
    title: category.title,
    items: catalog
      .filter((product) => product.category === category.slug)
      .map((product) => ({
        label: product.title,
        href: `/product/${product.slug}`,
        description: product.description,
      })),
  }),
);

/** Search entries for every product and category, derived from the catalog. */
const catalogSearchItems: SearchableItem[] = [
  ...productCategories.map((category) => ({
    title: category.title,
    href: `/product/${category.slug}`,
    category: "Product Line",
  })),
  ...catalog.map((product) => ({
    title: product.title,
    href: `/product/${product.slug}`,
    category:
      productCategories.find((c) => c.slug === product.category)?.title ??
      "Products",
  })),
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  // Mega-menu items carry an href as well: hovering opens the panel, and
  // clicking the label goes to the section landing page. Without this the
  // nav had no route to /product at all.
  {
    label: "Product",
    href: "/product",
    megaMenu: { columns: productMegaMenuColumns },
  },
  {
    label: "Engineering",
    href: "/engineering",
    megaMenu: {
      columns: [
        {
          title: "Embedded Hardware Development",
          items: [
            {
              label: "Schematic & PCB Design",
              href: "/engineering/hardware/schematic-pcb-design",
              description:
                "Multi-layer PCB layout with signal integrity analysis",
            },
            {
              label: "Component Selection & BOM",
              href: "/engineering/hardware/component-selection",
              description: "Optimized BOM with obsolescence-aware sourcing",
            },
            {
              label: "Prototyping & Hardware Bring-up",
              href: "/engineering/hardware/prototyping",
              description:
                "Rapid prototyping with systematic bring-up procedures",
            },
            {
              label: "Testing & Validation",
              href: "/engineering/hardware/testing",
              description:
                "Compliance testing, thermal and environmental validation",
            },
          ],
        },
        {
          title: "Embedded Software Development",
          items: [
            {
              label: "Bare-metal & RTOS Firmware",
              href: "/engineering/software/bare-metal-rtos",
              description:
                "Deterministic firmware on FreeRTOS and bare-metal targets",
            },
            {
              label: "Peripheral & Driver Development",
              href: "/engineering/software/peripheral-drivers",
              description:
                "Custom drivers for sensors, actuators and communication ICs",
            },
            {
              label: "Communication Protocols",
              href: "/engineering/software/communication-protocols",
              description:
                "I2C, SPI, UART, CAN, Ethernet and wireless stack integration",
            },
            {
              label: "Real-Time Control Systems",
              href: "/engineering/software/real-time-control",
              description:
                "PID, state-space and model-predictive control implementation",
            },
          ],
        },
        {
          title: "3D & Mechanical Development",
          items: [
            {
              label: "CAD Modelling & Design",
              href: "/engineering/mechanical/cad-modelling",
              description:
                "Parametric 3D modelling with DFM/DFA optimisation",
            },
            {
              label: "Structural & Thermal Analysis",
              href: "/engineering/mechanical/structural-thermal",
              description: "FEA-driven structural and thermal simulation",
            },
            {
              label: "Enclosure & Mounting Design",
              href: "/engineering/mechanical/enclosure-design",
              description:
                "Custom enclosures with IP rating and fitment validation",
            },
            {
              label: "Production-Ready Design",
              href: "/engineering/mechanical/production-ready",
              description:
                "Design for injection moulding, CNC and additive manufacturing",
            },
          ],
        },
      ],
    },
  },
  { label: "Projects", href: "/projects" },
];

export const searchableItems: SearchableItem[] = [
  { title: "Home", href: "/", category: "Page" },
  { title: "About Us", href: "/about", category: "Page" },
  ...catalogSearchItems,
  {
    title: "Schematic & PCB Design",
    href: "/engineering/hardware/schematic-pcb-design",
    category: "Embedded Hardware",
  },
  {
    title: "Component Selection & BOM",
    href: "/engineering/hardware/component-selection",
    category: "Embedded Hardware",
  },
  {
    title: "Prototyping & Hardware Bring-up",
    href: "/engineering/hardware/prototyping",
    category: "Embedded Hardware",
  },
  {
    title: "Testing & Validation",
    href: "/engineering/hardware/testing",
    category: "Embedded Hardware",
  },
  {
    title: "Bare-metal & RTOS Firmware",
    href: "/engineering/software/bare-metal-rtos",
    category: "Embedded Software",
  },
  {
    title: "Peripheral & Driver Development",
    href: "/engineering/software/peripheral-drivers",
    category: "Embedded Software",
  },
  {
    title: "Communication Protocols",
    href: "/engineering/software/communication-protocols",
    category: "Embedded Software",
  },
  {
    title: "Real-Time Control Systems",
    href: "/engineering/software/real-time-control",
    category: "Embedded Software",
  },
  {
    title: "CAD Modelling & Design",
    href: "/engineering/mechanical/cad-modelling",
    category: "3D & Mechanical",
  },
  {
    title: "Structural & Thermal Analysis",
    href: "/engineering/mechanical/structural-thermal",
    category: "3D & Mechanical",
  },
  {
    title: "Enclosure & Mounting Design",
    href: "/engineering/mechanical/enclosure-design",
    category: "3D & Mechanical",
  },
  {
    title: "Production-Ready Design",
    href: "/engineering/mechanical/production-ready",
    category: "3D & Mechanical",
  },
  { title: "Projects", href: "/projects", category: "Page" },
  { title: "Contact Us", href: "/contact", category: "Page" },
];
