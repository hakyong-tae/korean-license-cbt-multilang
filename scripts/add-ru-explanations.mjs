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

function buildRussianExplanation(q) {
  const answerIndexes = q.answerIndexes || [];
  const answers = answerIndexes.map((i) => letter(i));
  const answerSet = new Set(answerIndexes);
  const choices = q.choices || [];

  const lines = [];
  lines.push(`Правильный ответ${answers.length > 1 ? 'ы' : ''}: ${answers.join(', ')}.`);
  lines.push('');
  lines.push('Почему это правильно:');
  for (const idx of answerIndexes) {
    const text = choices[idx]?.en || '';
    lines.push(`- Вариант ${letter(idx)} является правильным по официальному банку вопросов KoROAD.${text ? ` Он соответствует условию вопроса: "${text}"` : ''}`);
  }
  lines.push('');
  lines.push('Почему остальные варианты неверны:');
  choices.forEach((c, i) => {
    if (answerSet.has(i)) return;
    const text = c?.en || '';
    lines.push(`- Вариант ${letter(i)} не является официально правильным для этого вопроса.${text ? ` Текст варианта: "${text}"` : ''}`);
  });
  lines.push('');
  lines.push('Подсказка:');
  lines.push('- Сравнивайте каждый вариант с ключевыми условиями вопроса (класс прав, лимит массы, срок, штраф) и исключайте несоответствия.');
  return lines.join('\n');
}

for (const q of db.questions) {
  q.explanations = q.explanations || {};
  q.explanations.ru = buildRussianExplanation(q);
}

fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
console.log(`Updated RU explanations for ${db.questions.length} questions`);
