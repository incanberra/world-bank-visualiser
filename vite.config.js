import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];

  if (!repository) {
    return "/";
  }

  // User and organization pages are served from the domain root.
  if (repository.endsWith(".github.io")) {
    return "/";
  }

  return `/${repository}/`;
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? getBasePath() : "/",
  plugins: [react()],
});
