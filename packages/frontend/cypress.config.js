import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents() {
      // receives "on" and "config" parameters if needed
      // implement node event listeners here
    },
  },
});
