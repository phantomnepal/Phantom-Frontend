import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['**/*.test.{ts,tsx}'],
    // Git worktrees live under .claude/worktrees and carry their own copies of
    // these tests; collecting them runs another branch's suite against this one.
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/.claude/**'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
});
