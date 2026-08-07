
import type { ProductPageContent } from "../../types";

export const productPageContent: ProductPageContent = {
  /**
   * The Figma's closing strip pitches "custom power management for industrial
   * fleets" — true of the power supply, false of the other twelve products.
   * This line is deliberately generic instead, because the strip renders on
   * every product page.
   */
  enquire: {
    title: "Talk to us about your needs",
    subtitle:
      "Our engineers can adapt this hardware to your requirements, or design something new around them.",
    cta: "Enquire now",
  },
  /** UNRENDERED — the product page has no "Why Choose Phantom" section. */
  whyChoose: [
    {
      title: "Designed and assembled in Nepal",
      description:
        "Our hardware is engineered here, not rebadged. That means the people who designed the board are the people who answer when you ask about it.",
    },
    {
      title: "Disciplined design",
      description:
        "We follow rigorous engineering standards so every PCB and firmware module is deterministic and reliable.",
    },
    {
      title: "Mission focused",
      description:
        "Whether it is a sensor node or a CubeSat, we design with end-mission success as the primary metric.",
    },
    {
      title: "Built to be understood",
      description:
        "Our kits and platforms are made to be taken apart, programmed, and debugged — not treated as a black box.",
    },
  ],
  /**
   * UNRENDERED — the product page has no "How to Order" section. These steps
   * describe a store (quantity, cart, checkout) that does not exist on `main`;
   * the page now shows the cart controls from the Figma instead, and they are
   * inert for the same reason. Kept for when the store ships.
   */
  orderSteps: [
    {
      title: "Choose your quantity",
      description:
        "Select unit quantity on the product page — single units for individual use, or bulk tiers for labs, classrooms, and production runs.",
    },
    {
      title: "Add to cart and check out",
      description:
        "Confirm your shipping details and complete payment securely online. Bulk orders get tiered pricing automatically.",
    },
    {
      title: "We build and ship",
      description:
        "Orders are fulfilled from stock or current production batch, tested, and shipped to your address with tracking.",
    },
  ],
};
