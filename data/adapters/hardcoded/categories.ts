/** The product category list. Order here is the order everywhere. */

import type { ProductCategory } from "../../types";

export const productCategories: ProductCategory[] = [
  {
    slug: "embedded-systems",
    title: "Embedded Systems",
    description:
      "Custom PCBs, dev boards and sensor hardware for rapid prototyping.",
    image: "/categories/embedded-systems.jpg",
  },
  /* Parked. Replaced by Flight Electronics below (formerly UAV Systems).
     Its three products are commented out with it further down — a product
     assigned to a category that does not exist fails the catalog test and
     would be unreachable in nav, search and its category page. */
  /*
  {
    slug: "iot-robotics",
    title: "IoT & Robotics",
    description:
      "Connected sensing, monitoring and programmable robotic platforms.",
    image: "/categories/iot-robotics.jpg",
  },
  */
  {
    slug: "uav-systems",
    title: "Flight Electronics",
    description:
      "Flight controllers and power electronics for FPV and light UAVs.",
    image: "/categories/flight-electronics.png",
  },
  {
    slug: "educational-kits",
    title: "Educational Kits",
    description:
      "Hands-on kits that take learners from first circuit to working system.",
    image: "/categories/educational-kits.png",
  },
];
