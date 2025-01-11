import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
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
    env: {
      ...config({ path: path.resolve(__dirname, '.env.test') }).parsed,
    },
    setupFiles: './src/setupTests.ts',
  },
});
