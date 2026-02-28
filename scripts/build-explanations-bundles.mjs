import fs from "node:fs";
import path from "node:path";

const root = "/Users/hytae/Downloads/verse8-driving-cbt";
const srcPath = path.join(root, "data", "questions.v1.json");
const outDir = path.join(root, "data", "explanations");

const db = JSON.parse(fs.readFileSync(srcPath, "utf8"));
if (!Array.isArray(db.questions)) {
  throw new Error("Invalid schema: questions array missing");
}

const langs = new Set();
for (const q of db.questions) {
  Object.keys(q.explanations || {}).forEach((code) => langs.add(code));
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const lang of Array.from(langs).sort()) {
  const items = {};
  let explainedCount = 0;
  for (const q of db.questions) {
    const text = (q.explanations?.[lang] || "").trim();
    if (text) explainedCount += 1;
    items[q.id] = text;
  }
  const payload = {
    schemaVersion: "1.0.0",
    language: lang,
    totalQuestions: db.questions.length,
    explainedQuestions: explainedCount,
    items
  };
  const outPath = path.join(outDir, `${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");
  console.log(`Wrote ${outPath} (${explainedCount}/${db.questions.length})`);
}
