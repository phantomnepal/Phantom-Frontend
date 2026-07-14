'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Wraps the app so every framer-motion component automatically respects the
 * user's "prefers-reduced-motion" setting: transform/layout animations are
 * disabled for those users while opacity transitions are preserved.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
