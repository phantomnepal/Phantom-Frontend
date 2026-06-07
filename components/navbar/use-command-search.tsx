'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import type { SearchableItem } from '@/data/types';

export function useCommandSearch(items: SearchableItem[]) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQueryState] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    setSelectedIndex(0);
  }, []);

  const filteredResults = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedResults = filteredResults.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, SearchableItem[]>,
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;

    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0,
        );
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1,
        );
      }
      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        router.push(filteredResults[selectedIndex].href);
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [searchOpen, selectedIndex, filteredResults, setSearchQuery, router]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
  }, [setSearchQuery]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  return {
    searchOpen,
    searchQuery,
    selectedIndex,
    filteredResults,
    groupedResults,
    setSearchQuery,
    setSelectedIndex,
    openSearch,
    closeSearch,
  };
}
