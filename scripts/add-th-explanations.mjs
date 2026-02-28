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

function buildThaiExplanation(q) {
  const answerIndexes = q.answerIndexes || [];
  const answers = answerIndexes.map((i) => letter(i));
  const answerSet = new Set(answerIndexes);
  const choices = q.choices || [];

  const lines = [];
  lines.push(`คำตอบที่ถูกต้อง${answers.length > 1 ? 'คือ' : 'คือ'}: ${answers.join(', ')}`);
  lines.push('');
  lines.push('เหตุผลที่คำตอบนี้ถูกต้อง:');
  for (const idx of answerIndexes) {
    const text = choices[idx]?.en || '';
    lines.push(`- ตัวเลือก ${letter(idx)} เป็นคำตอบที่ถูกต้องตามคลังข้อสอบ KoROAD${text ? ` โดยตรงกับข้อความ: "${text}"` : ''}`);
  }
  lines.push('');
  lines.push('เหตุผลที่ตัวเลือกอื่นไม่ถูกต้อง:');
  choices.forEach((c, i) => {
    if (answerSet.has(i)) return;
    const text = c?.en || '';
    lines.push(`- ตัวเลือก ${letter(i)} ไม่ใช่คำตอบที่ถูกต้องของข้อนี้${text ? ` (ตัวเลือก: "${text}")` : ''}`);
  });
  lines.push('');
  lines.push('คำแนะนำ:');
  lines.push('- ให้เทียบทุกตัวเลือกกับคำสำคัญในคำถาม (ประเภทใบขับขี่, น้ำหนัก, ระยะเวลา, โทษ) แล้วตัดตัวเลือกที่ไม่ตรงเงื่อนไข');
  return lines.join('\n');
}

for (const q of db.questions) {
  q.explanations = q.explanations || {};
  q.explanations.th = buildThaiExplanation(q);
}

fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
console.log(`Updated TH explanations for ${db.questions.length} questions`);
