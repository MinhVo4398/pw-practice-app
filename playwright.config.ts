import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  retries: 1,
  timeout: 40000,
  globalTimeout: 60000,
  testDir: "./tests",
  fullyParallel: false,
  reporter: "html",

  use: {
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4201/"
        : process.env.STAGING == "1"
        ? "http://localhost:4202/"
        : "http://localhost:4200/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
  },

  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4201/" },
    },
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: {browserName: 'firefox' },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch:'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    }
  ],
});
