"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { MegaMenu, MegaMenuItem } from "@/data/types";
import { columnIcons } from "@/data/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};

export function MegaMenuContent({ menu }: { menu: MegaMenu }) {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className={`grid gap-6 ${
            menu.columns.length === 4 ? "grid-cols-4" : "grid-cols-3"
          }`}
          variants={containerVariants}
        >
          {menu.columns.map((column) => {
            const Icon = columnIcons[column.title];
            return (
              <motion.div key={column.title} variants={columnVariants}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                  {Icon && <Icon className="w-3.5 h-3.5 text-[#A10F1A]" />}
                  <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
                    {column.title}
                  </h3>
                </div>
                <ul className="space-y-0.5">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <MegaMenuLink
                        item={item}
                        isActive={pathname === item.href}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="border-t border-gray-100">
        <Link
          href={menu.columns.length === 4 ? "/product" : "/engineering"}
          className="group flex items-center justify-between px-6 py-3 text-[13px] text-gray-400 hover:text-gray-700 transition-colors"
        >
          <span>
            Browse all{" "}
            {menu.columns.length === 4 ? "products" : "engineering services"}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

function MegaMenuLink({
  item,
  isActive,
}: {
  item: MegaMenuItem;
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium flex items-center gap-1.5">
          {item.label}
          <ChevronRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-150" />
        </span>
        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 leading-snug group-hover:text-gray-500 transition-colors">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}
