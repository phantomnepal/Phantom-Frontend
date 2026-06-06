'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { SearchableItem } from '@/data/types';

export type SearchModalProps = {
  open: boolean;
  searchQuery: string;
  selectedIndex: number;
  filteredResults: SearchableItem[];
  groupedResults: Record<string, SearchableItem[]>;
  onQueryChange: (query: string) => void;
  onSelectIndex: (index: number) => void;
  onClose: () => void;
};

export function SearchModal({
  open,
  searchQuery,
  selectedIndex,
  filteredResults,
  groupedResults,
  onQueryChange,
  onSelectIndex,
  onClose,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, docs, features..."
            value={searchQuery}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
          />
          <kbd
            onClick={onClose}
            className="px-2 py-0.5 text-[11px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200 cursor-pointer hover:bg-gray-200 transition"
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[320px] overflow-y-auto">
          {searchQuery === '' ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              Start typing to search...
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-400">
                No results for &quot;{searchQuery}&quot;
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => {
                    const globalIndex = filteredResults.indexOf(item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                          selectedIndex === globalIndex
                            ? 'bg-[#0f1e2e] text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => onSelectIndex(globalIndex)}
                      >
                        <Search
                          className={`w-4 h-4 shrink-0 ${
                            selectedIndex === globalIndex
                              ? 'text-gray-300'
                              : 'text-gray-400'
                          }`}
                        />
                        <span>{item.title}</span>
                        {selectedIndex === globalIndex && (
                          <span className="ml-auto text-[11px] text-gray-300">
                            ↵ Enter
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↑</kbd>
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">↵</kbd>
              Open
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px]">esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
