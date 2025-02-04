import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-option";

require("dotenv").config();

export default defineConfig<TestOptions>({
  retries: 1,
  timeout: 40000,
  //globalTimeout: 60000,
  testDir: "./tests",
  fullyParallel: false,
  reporter: [["allure-playwright"], ["html"]],
  use: {
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4201/"
        : process.env.STAGING == "1"
        ? "http://localhost:4202/"
        : "http://localhost:4200/",
    globalsQaUrl: "https://www.globalsqa.com/demo-site/draganddrop/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    //actionTimeout: 20000,
    //navigationTimeout: 25000,
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
      name: "staging",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4202/" },
    },
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["iPhone 13 Pro"],
      },
    },
    
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});
