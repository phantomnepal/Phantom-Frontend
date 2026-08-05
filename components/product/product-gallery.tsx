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
 */
export function ProductGallery({ product }: { product: Product }) {
  const images = [product.image, ...(product.gallery ?? [])];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#F5F6F8]">
        <Image
          src={images[active]}
          alt={product.title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Stock pill from the Figma. See Product docs: main has no inventory
            system behind this. */}
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gray-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          IN STOCK
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden rounded-md bg-[#F5F6F8] transition ${
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
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
