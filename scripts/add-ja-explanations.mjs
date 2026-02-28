import fs from 'node:fs';
import path from 'node:path';

const root = '/Users/hytae/Downloads/verse8-driving-cbt';
const jsonPath = path.join(root, 'data', 'questions.v1.json');

const db = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
if (!Array.isArray(db.questions)) {
  throw new Error('Invalid schema: questions array missing');
}

function letter(i) {
  return String.fromCharCode(65 + i);
}

function buildJapaneseExplanation(q) {
  const answerIndexes = q.answerIndexes || [];
  const answers = answerIndexes.map((i) => letter(i));
  const answerSet = new Set(answerIndexes);
  const choices = q.choices || [];

  const lines = [];
  lines.push(`正解${answers.length > 1 ? 'は' : 'は'}: ${answers.join(', ')}`);
  lines.push('');
  lines.push('正解の理由:');
  for (const idx of answerIndexes) {
    const text = choices[idx]?.en || '';
    lines.push(`- ${letter(idx)} は KoROAD 公式問題集で正解とされる選択肢です。${text ? ` 問題条件に一致する内容: "${text}"` : ''}`);
  }
  lines.push('');
  lines.push('他の選択肢が不正解の理由:');
  choices.forEach((c, i) => {
    if (answerSet.has(i)) return;
    const text = c?.en || '';
    lines.push(`- ${letter(i)} はこの問題の公式正解ではありません。${text ? ` 選択肢の内容: "${text}"` : ''}`);
  });
  lines.push('');
  lines.push('ポイント:');
  lines.push('- 問題文の重要条件（免許区分、重量制限、期間、違反内容）と各選択肢を照合し、不一致の選択肢を除外してください。');
  return lines.join('\n');
}

for (const q of db.questions) {
  q.explanations = q.explanations || {};
  q.explanations.ja = buildJapaneseExplanation(q);
}

fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
console.log(`Updated JA explanations for ${db.questions.length} questions`);
