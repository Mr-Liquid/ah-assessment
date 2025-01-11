import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
    },
    setupFiles: './src/setupTests.ts',
  },
});
