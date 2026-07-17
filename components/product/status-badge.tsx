import type { ProductStatus } from "@/data/types";

const styles: Record<ProductStatus, string> = {
  prototype: "border-amber-500 text-amber-700",
  "in-development": "border-[#0096c7] text-gray-600",
  available: "border-green-600 text-green-700",
};

const labels: Record<ProductStatus, string> = {
  prototype: "PROTOTYPE",
  "in-development": "IN DEVELOPMENT",
  available: "AVAILABLE",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`shrink-0 text-[10px] font-semibold tracking-wider border px-2 py-0.5 ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
