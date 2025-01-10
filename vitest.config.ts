import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    coverage: {
      all: true,
      include: ["src/**/*.{ts,tsx}"],
    },
    setupFiles: "./src/setupTests.ts",
  },
});
