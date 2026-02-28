import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = "/Users/hytae/Downloads/verse8-driving-cbt";
const outDir = path.join(root, "site");

execFileSync("node", [path.join(root, "scripts", "build-questions-js.mjs")], { stdio: "inherit" });
execFileSync("node", [path.join(root, "scripts", "build-explanations-bundles.mjs")], { stdio: "inherit" });

const filesToCopy = [
  "index.html",
  "styles.css",
  "app.js",
  "questions.js",
  "analytics.js",
  "robots.txt",
  "sitemap.xml"
];

const dirsToCopy = [
  "assets",
  "data/question_media",
  "data/explanations"
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const rel of filesToCopy) {
  const src = path.join(root, rel);
  const dst = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

for (const rel of dirsToCopy) {
  const src = path.join(root, rel);
  const dst = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.cpSync(src, dst, { recursive: true });
}

console.log(`Built deploy folder: ${outDir}`);
