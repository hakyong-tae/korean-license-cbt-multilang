import fs from 'node:fs';
import path from 'node:path';

const root = '/Users/hytae/Downloads/verse8-driving-cbt';
const jsonPath = path.join(root, 'data', 'questions.v1.json');

const db = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
if (!Array.isArray(db.questions)) throw new Error('Invalid questions schema');

const start = Number(process.argv[2] || 1);
const end = Number(process.argv[3] || 100);
if (!Number.isFinite(start) || !Number.isFinite(end) || start < 1 || end < start) {
  throw new Error('Usage: node enrich-explanations-first100.mjs <startOrdinal> <endOrdinal>');
}

function letter(i) {
  return String.fromCharCode(65 + i);
}

function detectNegativePrompt(prompt) {
  const p = (prompt || '').toLowerCase();
  return p.includes(' not ') || p.includes('except') || p.includes('incorrect') || p.includes('least');
}

function buildExplanationEn(q) {
  const prompt = q.prompt?.en || '';
  const answers = (q.answerIndexes || []).map((i) => letter(i));
  const answerSet = new Set(q.answerIndexes || []);
  const options = q.choices || [];
  const isNegative = detectNegativePrompt(prompt);

  const lines = [];
  lines.push(`Correct answer${answers.length > 1 ? 's' : ''}: ${answers.join(', ')}.`);
  lines.push('');
  lines.push('Why this is correct:');
  for (const idx of q.answerIndexes || []) {
    const text = options[idx]?.en || '';
    lines.push(`- ${letter(idx)} is the official correct choice in the KoROAD question bank. ${text ? `It matches the required condition in this question: "${text}"` : ''}`.trim());
  }
  lines.push('');
  lines.push('Why the other options are incorrect:');
  options.forEach((c, i) => {
    if (answerSet.has(i)) return;
    const text = c?.en || '';
    lines.push(`- ${letter(i)} is not accepted as an official answer for this item. ${text ? `Option text: "${text}"` : ''}`.trim());
  });
  lines.push('');
  lines.push('Tip:');
  if (isNegative) {
    lines.push('- This question asks for an exception (NOT/EXCEPT). First identify statements that are generally true, then pick the one that does not fit.');
  } else {
    lines.push('- Compare each option against key legal terms (license class, weight limit, time period, penalty) and eliminate choices with any mismatch.');
  }
  return lines.join('\n');
}

function buildExplanationPt(q) {
  const prompt = q.prompt?.en || '';
  const answers = (q.answerIndexes || []).map((i) => letter(i));
  const answerSet = new Set(q.answerIndexes || []);
  const options = q.choices || [];
  const isNegative = detectNegativePrompt(prompt);

  const lines = [];
  lines.push(`Resposta correta${answers.length > 1 ? 's' : ''}: ${answers.join(', ')}.`);
  lines.push('');
  lines.push('Por que esta resposta esta correta:');
  for (const idx of q.answerIndexes || []) {
    const text = options[idx]?.en || '';
    lines.push(`- ${letter(idx)} e a alternativa oficial correta no banco de questoes da KoROAD. ${text ? `Ela corresponde a condicao exigida na pergunta: "${text}"` : ''}`.trim());
  }
  lines.push('');
  lines.push('Por que as outras alternativas estao erradas:');
  options.forEach((c, i) => {
    if (answerSet.has(i)) return;
    const text = c?.en || '';
    lines.push(`- ${letter(i)} nao e aceita como resposta oficial desta questao. ${text ? `Texto da opcao: "${text}"` : ''}`.trim());
  });
  lines.push('');
  lines.push('Dica:');
  if (isNegative) {
    lines.push('- Esta questao pede uma excecao (NOT/EXCEPT). Primeiro identifique o que normalmente e verdadeiro e depois marque o item que nao se encaixa.');
  } else {
    lines.push('- Compare cada alternativa com os termos legais principais (classe da habilitacao, limite de peso, prazo, penalidade) e elimine qualquer opcao com divergencia.');
  }
  return lines.join('\n');
}

for (const q of db.questions) {
  if ((q.ordinal || 0) < start || (q.ordinal || 0) > end) continue;
  q.explanations = q.explanations || {};
  q.explanations.en = buildExplanationEn(q);
  q.explanations.pt = buildExplanationPt(q);
}

fs.writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
console.log(`Updated explanations for ordinals ${start}-${end} in ${jsonPath}`);
