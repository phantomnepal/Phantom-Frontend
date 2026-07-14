'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
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
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus the input on open, lock body scroll, and restore focus to the
  // previously focused element (the trigger) when the dialog closes.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  // Keep Tab focus inside the dialog.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            aria-label="Search pages, docs, features"
            placeholder="Search pages, docs, features..."
            value={searchQuery}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 text-[15px] text-gray-800 placeholder:text-gray-500 outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-gray-600 bg-gray-100 rounded border border-gray-200 cursor-pointer hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition"
          >
            <X className="w-3 h-3" aria-hidden="true" />
            ESC
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto">
          {searchQuery === '' ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              Start typing to search...
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-600">
                No results for &quot;{searchQuery}&quot;
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => {
                    const globalIndex = filteredResults.indexOf(item);
                    return (
                      <Link
                        key={globalIndex}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand ${
                          selectedIndex === globalIndex
                            ? 'bg-[#0f1e2e] text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => onSelectIndex(globalIndex)}
                      >
                        <Search
                          className={`w-4 h-4 shrink-0 ${
                            selectedIndex === globalIndex
                              ? 'text-gray-200'
                              : 'text-gray-500'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{item.title}</span>
                        {selectedIndex === globalIndex && (
                          <span className="ml-auto text-[11px] text-gray-200">
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

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500">
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
