import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const jsonPath = path.join(root, 'data', 'questions.v1.json');
const outPath = path.join(root, 'questions.js');

const db = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
if (!Array.isArray(db.questions)) {
  throw new Error('Invalid schema: questions array missing');
}

const slimQuestions = db.questions.map((q) => {
  const { explanations, ...rest } = q;
  return rest;
});

const out = `window.CBT_QUESTIONS = ${JSON.stringify(slimQuestions, null, 2)};\n`;
fs.writeFileSync(outPath, out);

console.log(`Generated questions.js from ${jsonPath}`);
console.log(`Question count: ${slimQuestions.length}`);
