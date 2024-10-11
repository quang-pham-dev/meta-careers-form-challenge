import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    include: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    coverage: {
      reportsDirectory: "vitest-report",
      include: ["app/**/*", "components/**/*", "lib/**/*"],
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        "**/index.ts",
        "app/layout.tsx",
        "app/page.tsx",
        "constants/*",
        "lib/providers/*",
        "**/*.stories.tsx"
      ]
    },
    css: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    globals: true,
    reporters: ["default", "html"],
    setupFiles: "./setupTests.ts"
  }
});
