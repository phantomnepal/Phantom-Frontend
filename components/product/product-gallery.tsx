"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/types";

/**
 * Hero image with a thumbnail strip.
 *
 * The strip only appears when a product actually has more than one real
 * photograph — see Product['gallery']. Products with a single shot (or a
 * category placeholder) render the image alone rather than padding the strip
 * with duplicates.
 *
 * Sizing is the Figma's: a 467px column at 467x354. On desktop the hero
 * stretches to fill the grid row so it lines up with the buy box column
 * beside it (see ProductDetail). On mobile the column is single-stacked and
 * keeps the 467x354 aspect ratio.
 */
export function ProductGallery({ product }: { product: Product }) {
  const images = [product.image, ...(product.gallery ?? [])];
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full max-w-[452px] flex-col lg:h-full">
      <div className="relative aspect-[467/354] overflow-hidden rounded-[2px] bg-[#F5F6F8] lg:aspect-auto lg:flex-1 lg:min-h-[280px]">
        <Image
          src={images[active]}
          alt={product.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, 467px"
          priority
        />
        {/* The Figma's green "IN STOCK" pill was removed at the user's request:
            main has no inventory system, so it asserted stock on every product
            including the ones still in development. Availability is carried by
            StatusBadge and Product['statusNote'] instead. */}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              // The selected thumbnail is marked by a coloured ring, which is
              // colour alone; aria-pressed carries the same state to assistive
              // technology.
              aria-pressed={i === active}
              className={`relative aspect-square overflow-hidden rounded-md bg-[#F5F6F8] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A10F1A] ${
                i === active
                  ? "ring-2 ring-[#A10F1A]"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain p-2"
                sizes="(max-width: 400px) 22vw, 110px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
