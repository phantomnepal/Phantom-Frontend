/** Products in the `uav-systems` category (titled Flight Electronics).
 *
 * The slug stays `uav-systems`: renaming it would break every existing
 * /product/uav-systems link without a redirect.
 *
 * Only the F722 is live. `phantom-f405` and `esc-stack` were parked on
 * 2026-08-08 — see ./_parked.ts. */
import type { Product } from "../../../types";

export const flightElectronicsProducts: Product[] = [
  {
    slug: "phantom-f722",
    title: "Phantom F722 Analog",
    category: "uav-systems",
    image: "/products/phantom-f722/top.png",
    // Real shots of the F722-Analog, shared with its /projects entry.
    gallery: ["/products/phantom-f722/bottom.png", "/products/phantom-f722/angle.png"],
    priceUsd: 99,
    description: "High-performance F722 flight controller for industrial UAVs",
    status: "prototype",
    overview:
      "The F722-Analog was engineered around one goal: an ultra-precise IMU, fully isolated on its own power rail. It is built with premium components to minimise EMI and keep power delivery clean, with nothing else competing for board space or signal integrity.",
    applications: [
      {
        iconName: "Gamepad2",
        title: "Analog FPV",
        description: "High-performance analog FPV builds.",
      },
      {
        iconName: "Plane",
        title: "Inspection UAV",
        description: "Industrial and inspection UAVs.",
      },
      {
        iconName: "Timer",
        title: "Control precision",
        description: "Platforms where control-loop precision matters most.",
      },
    ],
    specs: [
      { label: "MCU", value: "STM32F722RETx" },
      { label: "IMU", value: "ICM42688-P, isolated on a dedicated LDO" },
      { label: "Barometer", value: "BMP280" },
      { label: "Battery input", value: "2S–6S" },
      { label: "PCB", value: "6-layer, for signal and power integrity" },
      { label: "Power", value: "Ultra-low-noise buck converter, for reduced EMI" },
      { label: "Motor outputs", value: "DShot600 on all four channels, via Timer8" },
      { label: "UARTs", value: "5" },
      { label: "Mounting", value: "Plug-and-play with soldering pads" },
    ],
    // Terse summary for the hero strip — the leading spec rows are part
    // numbers and a sentence, which wrap over several lines there.
    highlights: [
      { label: "MCU", value: "STM32F722RETx" },
      { label: "Battery input", value: "2S–6S" },
      { label: "PCB", value: "6-layer" },
    ],
    faqs: [
      {
        question: "Is the F722 available to buy?",
        answer:
          "It is a prototype. Talk to us about your build and we will tell you where it stands.",
      },
      {
        question: "Does it support digital VTX systems?",
        answer:
          "It is purpose-built for analog systems only. Get in touch if you need a digital-capable board.",
      },
      {
        question: "Where is it made?",
        answer:
          "Designed and assembled in Nepal.",
      },
    ],
  },
];
