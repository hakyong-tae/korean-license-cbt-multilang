import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/hytae/Downloads/verse8-driving-cbt';
const PDF = path.join(ROOT, 'data', 'question-bank-en.pdf');
const OUT = path.join(ROOT, 'data', 'questions.v1.json');
const MEDIA_DIR = path.join(ROOT, 'data', 'page_media');

function normalizeText(s) {
  return s
    .replace(/\r/g, '\n')
    .replace(/\u000c/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function collapseSpaces(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function detectType(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('in the video')) return 'video';
  if (
    p.includes('road sign') ||
    p.includes('road safety sign') ||
    p.includes('road surface marking') ||
    p.includes('building number plate') ||
    p.includes('road name sign')
  ) return 'sign';
  if (p.includes('in the photo') || p.includes('in this photo')) return 'photo';
  if (p.includes('given situation') || p.includes('in the given situation')) return 'illustration';
  return 'text';
}

function parseBlock(block, qNo, pageNo) {
  const answerMatch = block.match(/■\s*Answer\s*[:：]\s*([0-9,\s]+)/i);
  if (!answerMatch) {
    return { ok: false, reason: 'missing answer' };
  }

  let answerNums = Array.from(answerMatch[1].matchAll(/\d+/g)).map((m) => Number(m[0]));
  if (!answerNums.length) {
    return { ok: false, reason: 'empty answer' };
  }

  const body = block
    .replace(/■\s*Answer\s*[:：].*$/is, '')
    .trim();

  const rawLines = body.split('\n').map((l) => l.trim()).filter(Boolean);
  if (!rawLines.length) {
    return { ok: false, reason: 'empty body' };
  }

  // Remove leading "N. " from first line if still present.
  rawLines[0] = rawLines[0].replace(/^\d{1,4}\.\s*/, '');

  const optionRegex = /^[①②③④⑤]\s*/;
  const promptParts = [];
  const choices = [];
  let currentChoice = null;

  for (const line of rawLines) {
    if (optionRegex.test(line)) {
      if (currentChoice) choices.push(currentChoice);
      currentChoice = line.replace(optionRegex, '').trim();
      continue;
    }

    if (currentChoice) {
      currentChoice += ` ${line}`;
    } else {
      promptParts.push(line);
    }
  }
  if (currentChoice) choices.push(currentChoice);

  // Fallback for image-only option items where option text is not extracted.
  if (choices.length === 0) {
    choices.push('Image option A', 'Image option B', 'Image option C', 'Image option D');
  }

  if (choices.length < 4 || choices.length > 5) {
    return { ok: false, reason: `choice count=${choices.length}` };
  }

  // OCR glitch handling:
  // - values like 44 should map to 4 in 4/5-choice questions
  // - values accidentally concatenated with next question number are discarded
  answerNums = answerNums
    .map((n) => {
      if (n > choices.length && n >= 10) {
        const lastDigit = n % 10;
        if (lastDigit >= 1 && lastDigit <= choices.length) return lastDigit;
      }
      return n;
    })
    .filter((n) => n >= 1 && n <= choices.length);

  if (!answerNums.length) {
    return { ok: false, reason: 'answer unresolved' };
  }

  const answerIndexes = answerNums.map((n) => n - 1);
  if (answerIndexes.some((idx) => idx < 0 || idx >= choices.length)) {
    return { ok: false, reason: `answer out of range ${answerNums.join(',')}` };
  }

  const uniqueAns = Array.from(new Set(answerIndexes)).sort((a, b) => a - b);
  const answerMode = uniqueAns.length > 1 ? 'multi' : 'single';
  const promptText = collapseSpaces(promptParts.join(' '));
  let qType = detectType(promptText);
  // In this bank, image-based items around pages 176-205 are photo-type items.
  if (qType === 'illustration' && pageNo && pageNo >= 176 && pageNo <= 205) {
    qType = 'photo';
  }
  let points = answerMode === 'multi' ? 3 : 2;
  if (qType === 'video') points = 5;
  else if (qType === 'illustration' || qType === 'photo') points = 3;
  else if (qType === 'sign') points = 2;
  const answerLabel = uniqueAns.map((i) => String.fromCharCode(65 + i)).join(', ');

  const question = {
    id: `KR-EN-${String(qNo).padStart(4, '0')}`,
    ordinal: qNo,
    license: 'type1_type2_common',
    type: qType,
    category: 'Official KoROAD (EN 2025.2.24)',
    prompt: {
      en: promptText
    },
    choices: choices.map((c) => ({ en: collapseSpaces(c) })),
    answerIndexes: uniqueAns,
    answerMode,
    points,
    explanations: {
      en: `Correct answer: ${answerLabel}.`,
      pt: ''
    },
      source: {
        provider: 'KoROAD / g-car.kr',
        editionDate: '2025-02-24',
        page: pageNo || null,
        note: 'Extracted from 1,2 ordinary written test question bank English PDF'
      }
    };

  if ((qType === 'illustration' || qType === 'photo' || qType === 'sign') && pageNo) {
    question.media = {
      type: 'image',
      src: `./data/page_media/p${String(pageNo).padStart(3, '0')}.jpg`,
      alt: `Question source page ${pageNo}`
    };
  }

  return {
    ok: true,
    question
  };
}

const txt = execFileSync('pdftotext', [PDF, '-'], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 512 });
const pages = txt.split('\f');
const pageByQuestion = {};
for (let i = 0; i < pages.length; i++) {
  const pageNo = i + 1;
  const pg = pages[i];
  const reQ = /(?:^|\n)\s*(\d{1,4})\.\s*/g;
  let mq;
  while ((mq = reQ.exec(pg)) !== null) {
    const n = Number(mq[1]);
    if (n >= 1 && n <= 1000 && !pageByQuestion[n]) {
      pageByQuestion[n] = pageNo;
    }
  }
}
const input = normalizeText(txt);

const starts = [];
let cursor = 0;
for (let no = 1; no <= 1000; no++) {
  const re = new RegExp(`(?:^|\\n)\\s*${no}\\.\\s*`, 'g');
  re.lastIndex = cursor;
  const m = re.exec(input);
  if (!m) continue;
  const idx = m.index + (m[0].startsWith('\n') ? 1 : 0);
  starts.push({ no, idx });
  cursor = idx + 1;
}

const questions = [];
const errors = [];
for (let i = 0; i < starts.length; i++) {
  const cur = starts[i];
  const next = starts[i + 1];
  const block = input.slice(cur.idx, next ? next.idx : input.length).trim();
  const parsed = parseBlock(block, cur.no, pageByQuestion[cur.no]);
  if (!parsed.ok) {
    errors.push({ no: cur.no, reason: parsed.reason });
    continue;
  }
  questions.push(parsed.question);
}

questions.sort((a, b) => a.ordinal - b.ordinal);

const db = {
  schemaVersion: '1.0.0',
  generatedAt: new Date().toISOString(),
  defaultQuestionLang: 'en',
  defaultExplainLang: 'pt',
  questions
};

fs.writeFileSync(OUT, JSON.stringify(db, null, 2));

const mediaPages = Array.from(new Set(
  questions
    .map((q) => q.media?.src)
    .filter(Boolean)
    .map((src) => Number(src.match(/p(\d+)\.jpg$/)?.[1]))
    .filter((n) => Number.isFinite(n))
)).sort((a, b) => a - b);

if (mediaPages.length) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
  for (const p of mediaPages) {
    const outPrefix = path.join(MEDIA_DIR, `p${String(p).padStart(3, '0')}`);
    execFileSync('pdftoppm', ['-f', String(p), '-l', String(p), '-singlefile', '-jpeg', '-jpegopt', 'quality=70', PDF, outPrefix], {
      stdio: 'ignore'
    });
  }
}

console.log(`Extracted questions: ${questions.length}`);
console.log(`Parse errors: ${errors.length}`);
console.log(`Media pages exported: ${mediaPages.length}`);
if (errors.length) {
  console.log('Sample errors:');
  errors.slice(0, 20).forEach((e) => console.log(`  Q${e.no}: ${e.reason}`));
}
