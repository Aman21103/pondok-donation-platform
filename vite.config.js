import { existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isRootPagesSite = repositoryName?.endsWith(".github.io") ||
  existsSync(new URL("./public/CNAME", import.meta.url));
const base = process.env.GITHUB_ACTIONS === "true" && repositoryName && !isRootPagesSite
  ? `/${repositoryName}/`
  : "/";

export default defineConfig({
  plugins: [react()],
  base
});