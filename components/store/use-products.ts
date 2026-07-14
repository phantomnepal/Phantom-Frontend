'use client';

import { useEffect, useState } from 'react';

export interface PublicProduct {
  id: number;
  slug: string;
  title: string;
  priceNpr: number;
  stock: string;
  image: string | null;
}

export function useProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (active) setProducts(d.products ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const byId = new Map(products.map((p) => [p.id, p]));
  return { products, byId, loading };
}
