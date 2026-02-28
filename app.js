const RAW_QUESTIONS = window.CBT_QUESTIONS || [];
const VIDEO_FEATURE_READY = false;

const EXAM_LANGS = [
  { code: "en", label: "English" },
  { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" },
  { code: "vi", label: "Vietnamese" }
];
const MENU_LANGS = [
  { code: "en", label: "English" },
  { code: "pt", label: "Portuguese" },
  { code: "th", label: "Thai" },
  { code: "ru", label: "Russian" }
];

const UI_COPY = {
  en: {
    subtitle: "For foreigners in Korea preparing for the driver license CBT",
    timerInactive: "No Active Test",
    homeMenuTitle: "Main Menu",
    homeMenuNote: "Multilingual study site for foreigners living in Korea. Start with mock test or focused practice.",
    mock: "1. Mock Test",
    wrong: "2. Wrong Note",
    type: "3. Type Practice",
    stats: "4. Progress/Stats",
    settings: "5. Settings",
    back: "Back to Menu",
    pageMock: "Mock Test",
    pageWrong: "Wrong Note",
    pageType: "Type Practice",
    pageStats: "Progress/Stats",
    pageSettings: "Settings",
    settingsTitle: "Settings",
    menuLangLabel: "Menu Language",
    questionLangLabel: "Question Language",
    explainLangLabel: "Explanation Language",
    instantCheckLabel: "Instant Check",
    mockTimerLabel: "Default Mock Timer (minutes)",
    wrongTimerLabel: "Default Wrong Note Timer (minutes)",
    typeTimerLabel: "Default Type Practice Timer (minutes)",
    applySettings: "Apply Settings",
    settingsNote: "Language-pack architecture is extensible. Add explanation languages later with the same schema.",
    videoPendingNote: "Video questions: coming soon update.",
    typeVideoPendingNote: "Video type is marked as coming soon and cannot be started yet.",
    videoTypeLabel: "Video (Coming Soon)"
  },
  pt: {
    subtitle: "Para estrangeiros na Coreia que se preparam para o teste CBT de habilitacao",
    timerInactive: "Sem teste ativo",
    homeMenuTitle: "Menu Principal",
    homeMenuNote: "Site multilingue para estrangeiros na Coreia. Comece com simulado ou pratica focada.",
    mock: "1. Simulado",
    wrong: "2. Caderno de Erros",
    type: "3. Pratica por Tipo",
    stats: "4. Progresso/Estatisticas",
    settings: "5. Configuracoes",
    back: "Voltar ao Menu",
    pageMock: "Simulado",
    pageWrong: "Caderno de Erros",
    pageType: "Pratica por Tipo",
    pageStats: "Progresso/Estatisticas",
    pageSettings: "Configuracoes",
    settingsTitle: "Configuracoes",
    menuLangLabel: "Idioma do Menu",
    questionLangLabel: "Idioma da Questao",
    explainLangLabel: "Idioma da Explicacao",
    instantCheckLabel: "Correcao Imediata",
    mockTimerLabel: "Tempo padrao do Simulado (minutos)",
    wrongTimerLabel: "Tempo padrao do Caderno de Erros (minutos)",
    typeTimerLabel: "Tempo padrao da Pratica por Tipo (minutos)",
    applySettings: "Aplicar Configuracoes",
    settingsNote: "A arquitetura de pacote de idiomas e expansivel. Voce pode adicionar novos idiomas de explicacao depois com o mesmo esquema.",
    videoPendingNote: "Questoes em video: atualizacao em breve.",
    typeVideoPendingNote: "O tipo video esta marcado como atualizacao futura e ainda nao pode ser iniciado.",
    videoTypeLabel: "Video (Em Breve)"
  },
  th: {
    subtitle: "สําหรับชาวต่างชาติในเกาหลีที่เตรียมสอบใบขับขี่ CBT",
    timerInactive: "ไม่มีการทดสอบที่กำลังทำอยู่",
    homeMenuTitle: "เมนูหลัก",
    homeMenuNote: "เว็บไซต์เรียนหลายภาษา สำหรับชาวต่างชาติที่อยู่ในเกาหลี เริ่มจากข้อสอบจำลองหรือฝึกเฉพาะจุดได้",
    mock: "1. ข้อสอบจำลอง",
    wrong: "2. สมุดข้อผิดพลาด",
    type: "3. ฝึกตามประเภท",
    stats: "4. ความคืบหน้า/สถิติ",
    settings: "5. ตั้งค่า",
    back: "กลับไปเมนูหลัก",
    pageMock: "ข้อสอบจำลอง",
    pageWrong: "สมุดข้อผิดพลาด",
    pageType: "ฝึกตามประเภท",
    pageStats: "ความคืบหน้า/สถิติ",
    pageSettings: "ตั้งค่า",
    settingsTitle: "ตั้งค่า",
    menuLangLabel: "ภาษาเมนู",
    questionLangLabel: "ภาษาของคำถาม",
    explainLangLabel: "ภาษาคำอธิบาย",
    instantCheckLabel: "ตรวจคำตอบทันที",
    mockTimerLabel: "เวลาข้อสอบจำลองเริ่มต้น (นาที)",
    wrongTimerLabel: "เวลาสมุดข้อผิดพลาดเริ่มต้น (นาที)",
    typeTimerLabel: "เวลาฝึกตามประเภทเริ่มต้น (นาที)",
    applySettings: "บันทึกการตั้งค่า",
    settingsNote: "โครงสร้าง language pack สามารถขยายได้ และเพิ่มภาษาคำอธิบายใหม่ได้ในรูปแบบเดียวกัน",
    videoPendingNote: "คำถามวิดีโอ: จะอัปเดตเร็วๆ นี้",
    typeVideoPendingNote: "หมวดวิดีโอเป็นฟีเจอร์ที่กำลังจะมา และยังไม่สามารถเริ่มได้",
    videoTypeLabel: "วิดีโอ (เร็วๆ นี้)"
  },
  ru: {
    subtitle: "Для иностранцев в Корее, готовящихся к CBT по водительским правам",
    timerInactive: "Нет активного теста",
    homeMenuTitle: "Главное меню",
    homeMenuNote: "Многоязычный учебный сайт для иностранцев в Корее. Начните с пробного теста или целевой практики.",
    mock: "1. Пробный тест",
    wrong: "2. Тетрадь ошибок",
    type: "3. Практика по типам",
    stats: "4. Прогресс/Статистика",
    settings: "5. Настройки",
    back: "Назад в меню",
    pageMock: "Пробный тест",
    pageWrong: "Тетрадь ошибок",
    pageType: "Практика по типам",
    pageStats: "Прогресс/Статистика",
    pageSettings: "Настройки",
    settingsTitle: "Настройки",
    menuLangLabel: "Язык меню",
    questionLangLabel: "Язык вопросов",
    explainLangLabel: "Язык объяснений",
    instantCheckLabel: "Мгновенная проверка",
    mockTimerLabel: "Таймер пробного теста по умолчанию (мин.)",
    wrongTimerLabel: "Таймер тетради ошибок по умолчанию (мин.)",
    typeTimerLabel: "Таймер практики по типам по умолчанию (мин.)",
    applySettings: "Применить настройки",
    settingsNote: "Архитектура language-pack расширяема. Позже можно добавить новые языки объяснений по той же схеме.",
    videoPendingNote: "Видеовопросы: обновление скоро.",
    typeVideoPendingNote: "Тип 'видео' отмечен как скоро и пока недоступен.",
    videoTypeLabel: "Видео (Скоро)"
  }
};

const EXPLAIN_LANG_FALLBACK = ["pt", "en", "ko", "zh", "vi"];

const STORAGE = {
  WRONG: "v8_wrong_notebook",
  HISTORY: "v8_session_history",
  SETTINGS: "v8_user_settings"
};

const EXAM_CONFIG = {
  mockSeconds: 40 * 60,
  wrongSeconds: 20 * 60,
  typeSeconds: 20 * 60,
  totalScore: 100,
  passScore: 70
};

const MOCK_BLUEPRINT = {
  textSingle: 17,
  textMulti: 4,
  illustration: 6,
  photo: 7,
  sign: 5,
  video: VIDEO_FEATURE_READY ? 1 : 0
};

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function loadSettings() {
  return safeParse(localStorage.getItem(STORAGE.SETTINGS), {
    menuLang: "en",
    questionLang: "en",
    explainLang: "pt",
    instantCheck: "on",
    timerMinutes: 40,
    wrongTimerMinutes: 20,
    typeTimerMinutes: 20
  });
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE.SETTINGS, JSON.stringify(settings));
}

function loadWrongNotebook() {
  return safeParse(localStorage.getItem(STORAGE.WRONG), {});
}

function saveWrongNotebook(data) {
  localStorage.setItem(STORAGE.WRONG, JSON.stringify(data));
}

function loadHistory() {
  return safeParse(localStorage.getItem(STORAGE.HISTORY), []);
}

function saveHistory(list) {
  localStorage.setItem(STORAGE.HISTORY, JSON.stringify(list));
}

function normalizeQuestion(q) {
  const answerIndexes = Array.isArray(q.answerIndexes)
    ? q.answerIndexes.slice().sort((a, b) => a - b)
    : [q.answerIndex];
  const answerMode = q.answerMode || (answerIndexes.length > 1 ? "multi" : "single");

  let points = q.points;
  if (!points) {
    if (q.type === "video") points = 5;
    else if (answerMode === "multi") points = 3;
    else points = 2;
  }

  const type = q.type || "text";
  const prompt = q.prompt || { en: q.questionEn || "" };
  const choices = Array.isArray(q.choices)
    ? q.choices
    : (q.optionsEn || []).map((text) => ({ en: text }));
  const explanations = q.explanations || { pt: q.explanationPt || "" };

  const normalized = {
    ...q,
    type,
    prompt,
    choices,
    explanations,
    answerIndexes,
    answerMode,
    points
  };

  return normalized;
}

const BANK = RAW_QUESTIONS.map(normalizeQuestion);

const TYPE_LABEL = {
  text: "Text",
  illustration: "Illustration",
  photo: "Photo",
  sign: "Sign",
  video: "Video"
};

const state = {
  page: "home",
  sessionMode: "mock",
  questionSet: [],
  responses: {},
  graded: {},
  currentIndex: 0,
  isFinished: false,
  remainSeconds: EXAM_CONFIG.mockSeconds,
  timerId: null,
  selectedTypes: new Set(["text", "illustration", "photo", "sign"]),
  wrongNotebook: loadWrongNotebook(),
  history: loadHistory(),
  settings: loadSettings(),
  showExplanation: true
};

const el = {
  timer: document.getElementById("timer"),
  subtitleText: document.getElementById("subtitleText"),
  homeMenuTitle: document.getElementById("homeMenuTitle"),
  homeMenuNote: document.getElementById("homeMenuNote"),

  homeMenuPanel: document.getElementById("homeMenuPanel"),
  contentShell: document.getElementById("contentShell"),
  pageTitle: document.getElementById("pageTitle"),

  openMockBtn: document.getElementById("openMockBtn"),
  openWrongBtn: document.getElementById("openWrongBtn"),
  openTypeBtn: document.getElementById("openTypeBtn"),
  openStatsBtn: document.getElementById("openStatsBtn"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  backToMenuBtn: document.getElementById("backToMenuBtn"),
  settingsTitle: document.getElementById("settingsTitle"),
  menuLangLabel: document.getElementById("menuLangLabel"),
  questionLangLabel: document.getElementById("questionLangLabel"),
  explainLangLabel: document.getElementById("explainLangLabel"),
  instantCheckLabel: document.getElementById("instantCheckLabel"),
  mockTimerLabel: document.getElementById("mockTimerLabel"),
  wrongTimerLabel: document.getElementById("wrongTimerLabel"),
  typeTimerLabel: document.getElementById("typeTimerLabel"),
  settingsNote: document.getElementById("settingsNote"),
  videoPendingNote: document.getElementById("videoPendingNote"),
  typeVideoPendingNote: document.getElementById("typeVideoPendingNote"),

  sessionPanel: document.getElementById("sessionPanel"),
  typePanel: document.getElementById("typePanel"),
  statsPanel: document.getElementById("statsPanel"),
  settingsPanel: document.getElementById("settingsPanel"),

  utilityRow: document.getElementById("utilityRow"),
  recentScoreLabel: document.getElementById("recentScoreLabel"),
  notebookCountLabel: document.getElementById("notebookCountLabel"),
  weakTypeLabel: document.getElementById("weakTypeLabel"),
  startWrongBtn: document.getElementById("startWrongBtn"),
  clearWrongBtn: document.getElementById("clearWrongBtn"),

  currentQuestionLabel: document.getElementById("currentQuestionLabel"),
  answeredLabel: document.getElementById("answeredLabel"),
  correctLabel: document.getElementById("correctLabel"),
  scoreLabel: document.getElementById("scoreLabel"),
  examSpec: document.getElementById("examSpec"),
  paletteTitle: document.getElementById("paletteTitle"),
  palette: document.getElementById("palette"),
  finishBtn: document.getElementById("finishBtn"),

  categoryChip: document.getElementById("categoryChip"),
  ruleChip: document.getElementById("ruleChip"),
  explainToggle: document.getElementById("explainToggle"),
  questionText: document.getElementById("questionText"),
  mediaBox: document.getElementById("mediaBox"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  copyAiPromptBtn: document.getElementById("copyAiPromptBtn"),

  prevBtn: document.getElementById("prevBtn"),
  checkBtn: document.getElementById("checkBtn"),
  nextBtn: document.getElementById("nextBtn"),
  resultPanel: document.getElementById("resultPanel"),

  typeFilters: document.getElementById("typeFilters"),
  startTypeBtn: document.getElementById("startTypeBtn"),

  statSessionCount: document.getElementById("statSessionCount"),
  statAvgScore: document.getElementById("statAvgScore"),
  statBestScore: document.getElementById("statBestScore"),
  statLastMock: document.getElementById("statLastMock"),
  historyList: document.getElementById("historyList"),

  menuLangSelect: document.getElementById("menuLangSelect"),
  questionLangSelect: document.getElementById("questionLangSelect"),
  explainLangSelect: document.getElementById("explainLangSelect"),
  instantCheckSelect: document.getElementById("instantCheckSelect"),
  timerMinutesInput: document.getElementById("timerMinutesInput"),
  wrongTimerMinutesInput: document.getElementById("wrongTimerMinutesInput"),
  typeTimerMinutesInput: document.getElementById("typeTimerMinutesInput"),
  applySettingsBtn: document.getElementById("applySettingsBtn")
};

function ui(key) {
  const lang = state.settings.menuLang || "en";
  return (UI_COPY[lang] && UI_COPY[lang][key]) || UI_COPY.en[key] || "";
}

function applyMenuLanguage() {
  el.subtitleText.textContent = ui("subtitle");
  el.homeMenuTitle.textContent = ui("homeMenuTitle");
  el.homeMenuNote.textContent = ui("homeMenuNote");
  el.openMockBtn.textContent = ui("mock");
  el.openWrongBtn.textContent = ui("wrong");
  el.openTypeBtn.textContent = ui("type");
  el.openStatsBtn.textContent = ui("stats");
  el.openSettingsBtn.textContent = ui("settings");
  el.backToMenuBtn.textContent = ui("back");
  el.settingsTitle.textContent = ui("settingsTitle");
  el.menuLangLabel.textContent = ui("menuLangLabel");
  el.questionLangLabel.textContent = ui("questionLangLabel");
  el.explainLangLabel.textContent = ui("explainLangLabel");
  el.instantCheckLabel.textContent = ui("instantCheckLabel");
  el.mockTimerLabel.textContent = ui("mockTimerLabel");
  el.wrongTimerLabel.textContent = ui("wrongTimerLabel");
  el.typeTimerLabel.textContent = ui("typeTimerLabel");
  el.applySettingsBtn.textContent = ui("applySettings");
  el.settingsNote.textContent = ui("settingsNote");
  if (el.videoPendingNote) el.videoPendingNote.textContent = ui("videoPendingNote");
  if (el.typeVideoPendingNote) el.typeVideoPendingNote.textContent = ui("typeVideoPendingNote");
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getLocalizedText(map, lang) {
  if (!map || typeof map !== "object") return "";
  if (map[lang]) return map[lang];
  if (map.en) return map.en;
  const firstKey = Object.keys(map)[0];
  return firstKey ? map[firstKey] : "";
}

function getExplainText(q) {
  const lang = state.settings.explainLang;
  const exp = q.explanations || {};
  if (exp[lang]) return exp[lang];
  for (const code of EXPLAIN_LANG_FALLBACK) {
    if (exp[code]) return exp[code];
  }
  const first = Object.keys(exp)[0];
  return first ? exp[first] : "";
}

function choicesForQuestion(q) {
  return q.choices.map((choice) => getLocalizedText(choice, state.settings.questionLang));
}

function promptForQuestion(q) {
  return getLocalizedText(q.prompt, state.settings.questionLang);
}

function pauseTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  el.timer.classList.add("paused");
}

function setNoActiveTestTimer() {
  pauseTimer();
  el.timer.textContent = ui("timerInactive");
}

function startTimer(seconds) {
  pauseTimer();
  state.remainSeconds = seconds;
  el.timer.classList.remove("paused");
  el.timer.textContent = formatTime(state.remainSeconds);
  state.timerId = setInterval(() => {
    state.remainSeconds -= 1;
    el.timer.textContent = formatTime(Math.max(0, state.remainSeconds));
    if (state.remainSeconds <= 0) finishSession();
  }, 1000);
}

function addWrong(question) {
  const id = String(question.id);
  const prev = state.wrongNotebook[id];
  state.wrongNotebook[id] = {
    question,
    wrongCount: prev ? prev.wrongCount + 1 : 1,
    lastWrongAt: Date.now()
  };
  saveWrongNotebook(state.wrongNotebook);
}

function removeWrong(questionId) {
  const id = String(questionId);
  if (!state.wrongNotebook[id]) return;
  delete state.wrongNotebook[id];
  saveWrongNotebook(state.wrongNotebook);
}

function clearWrong() {
  state.wrongNotebook = {};
  saveWrongNotebook(state.wrongNotebook);
}

function wrongQuestionsSorted() {
  return Object.values(state.wrongNotebook)
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .map((entry) => normalizeQuestion(entry.question));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMockSet() {
  const used = new Set();
  const out = [];

  function pick(filterFn, count, transform) {
    const pool = shuffle(BANK.filter((q) => !used.has(q.id) && filterFn(q)));
    for (const q of pool.slice(0, count)) {
      used.add(q.id);
      out.push(transform ? transform(q) : { ...q });
    }
    return count - Math.min(count, pool.length);
  }

  const asTypePoint = (type, points) => (q) => ({ ...q, type, points });

  let remTextSingle = pick((q) => q.type === 'text' && q.answerMode === 'single', MOCK_BLUEPRINT.textSingle, asTypePoint('text', 2));
  let remTextMulti = pick((q) => q.type === 'text' && q.answerMode === 'multi', MOCK_BLUEPRINT.textMulti, asTypePoint('text', 3));
  let remIll = pick((q) => q.type === 'illustration', MOCK_BLUEPRINT.illustration, asTypePoint('illustration', 3));
  let remPhoto = pick((q) => q.type === 'photo', MOCK_BLUEPRINT.photo, asTypePoint('photo', 3));
  let remSign = pick((q) => q.type === 'sign' && q.answerMode === 'single', MOCK_BLUEPRINT.sign, asTypePoint('sign', 2));
  let remVideo = 0;
  if (VIDEO_FEATURE_READY && MOCK_BLUEPRINT.video > 0) {
    remVideo = pick((q) => q.type === 'video', MOCK_BLUEPRINT.video, asTypePoint('video', 5));
  }

  // Fallbacks if pool is insufficient.
  if (remTextSingle > 0) remTextSingle = pick((q) => q.type === 'text', remTextSingle, asTypePoint('text', 2));
  if (remTextMulti > 0) remTextMulti = pick((q) => q.answerMode === 'multi', remTextMulti, asTypePoint('text', 3));
  if (remIll > 0) remIll = pick((q) => q.type === 'photo' || q.type === 'illustration', remIll, asTypePoint('illustration', 3));
  if (remPhoto > 0) remPhoto = pick((q) => q.type === 'illustration' || q.type === 'photo', remPhoto, asTypePoint('photo', 3));
  if (remSign > 0) remSign = pick((q) => q.type === 'sign', remSign, asTypePoint('sign', 2));
  if (remVideo > 0) remVideo = pick((q) => q.type === 'text', remVideo, asTypePoint('video', 5));

  // Final fill to ensure exactly 40.
  const remain = 40 - out.length;
  if (remain > 0) {
    pick((q) => VIDEO_FEATURE_READY || q.type !== "video", remain, (q) => ({ ...q }));
  }

  return shuffle(out).slice(0, 40);
}

function showHome() {
  state.page = "home";
  setNoActiveTestTimer();
  applyMenuLanguage();
  el.homeMenuPanel.classList.remove("hidden");
  el.contentShell.classList.add("hidden");
}

function showPage(page, title) {
  state.page = page;
  el.homeMenuPanel.classList.add("hidden");
  el.contentShell.classList.remove("hidden");
  el.pageTitle.textContent = title;

  el.sessionPanel.classList.add("hidden");
  el.typePanel.classList.add("hidden");
  el.statsPanel.classList.add("hidden");
  el.settingsPanel.classList.add("hidden");
  el.utilityRow.classList.add("hidden");
}

function resetSession(questionSet, mode, seconds) {
  state.sessionMode = mode;
  state.questionSet = questionSet;
  state.responses = {};
  state.graded = {};
  state.currentIndex = 0;
  state.isFinished = false;
  el.resultPanel.classList.add("hidden");
  el.resultPanel.innerHTML = "";
  startTimer(seconds);
}

function openMock() {
  showPage("mock", ui("pageMock"));
  el.subtitleText.textContent = "Mock test mode";
  el.sessionPanel.classList.remove("hidden");
  el.utilityRow.classList.remove("hidden");
  const mins = Number(state.settings.timerMinutes) || 40;
  resetSession(buildMockSet(), "mock", mins * 60);
  renderSession();
}

function openWrong() {
  showPage("wrong", ui("pageWrong"));
  el.subtitleText.textContent = "Wrong-note mode";
  el.sessionPanel.classList.remove("hidden");
  el.utilityRow.classList.remove("hidden");
  const mins = Number(state.settings.wrongTimerMinutes) || 20;
  resetSession(wrongQuestionsSorted(), "wrong", mins * 60);
  renderSession();
}

function openType() {
  showPage("type", ui("pageType"));
  el.subtitleText.textContent = "Type-focused study mode";
  setNoActiveTestTimer();
  el.typePanel.classList.remove("hidden");
  renderTypeFilters();
}

function openStats() {
  showPage("stats", ui("pageStats"));
  el.subtitleText.textContent = "Learning analytics";
  setNoActiveTestTimer();
  el.statsPanel.classList.remove("hidden");
  renderStats();
}

function openSettings() {
  showPage("settings", ui("pageSettings"));
  el.subtitleText.textContent = "App settings";
  setNoActiveTestTimer();
  el.settingsPanel.classList.remove("hidden");
  renderSettings();
}

function startTypeSession() {
  const selected = Array.from(state.selectedTypes);
  const set = BANK.filter((q) => selected.includes(q.type));
  showPage("type-session", `${ui("pageType")} Session`);
  el.subtitleText.textContent = "Type-focused session";
  el.sessionPanel.classList.remove("hidden");
  const mins = Number(state.settings.typeTimerMinutes) || 20;
  resetSession(set, "type", mins * 60);
  renderSession();
}

function isCorrectAt(idx) {
  if (!state.graded[idx]) return false;
  const q = state.questionSet[idx];
  const picked = (state.responses[idx] || []).slice().sort((a, b) => a - b);
  return JSON.stringify(picked) === JSON.stringify(q.answerIndexes);
}

function getAnsweredCount() {
  return Object.keys(state.graded).length;
}

function getCorrectCount() {
  return state.questionSet.reduce((acc, _, idx) => acc + (isCorrectAt(idx) ? 1 : 0), 0);
}

function getScore() {
  return state.questionSet.reduce((acc, q, idx) => acc + (isCorrectAt(idx) ? q.points : 0), 0);
}

function totalPoints() {
  if (state.sessionMode === "mock") return EXAM_CONFIG.totalScore;
  return state.questionSet.reduce((acc, q) => acc + q.points, 0);
}

function paletteClassFor(idx) {
  if (idx === state.currentIndex) return "current";
  if (!state.graded[idx]) return state.responses[idx]?.length ? "pending" : "unanswered";
  return isCorrectAt(idx) ? "correct" : "wrong";
}

function renderPalette() {
  el.palette.innerHTML = "";
  state.questionSet.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `palette-btn ${paletteClassFor(idx)}`;
    btn.textContent = String(idx + 1);
    btn.addEventListener("click", () => {
      state.currentIndex = idx;
      renderSession();
    });
    el.palette.appendChild(btn);
  });
}

function renderMedia(q) {
  if (q.type === "video" && !VIDEO_FEATURE_READY) {
    el.mediaBox.innerHTML = "";
    el.mediaBox.classList.remove("hidden");
    const note = document.createElement("div");
    note.className = "media-pending";
    note.textContent = ui("videoPendingNote");
    el.mediaBox.appendChild(note);
    return;
  }

  el.mediaBox.innerHTML = "";
  if (!q.media || !q.media.src) {
    el.mediaBox.classList.add("hidden");
    return;
  }
  el.mediaBox.classList.remove("hidden");
  if (q.media.type === "youtube") {
    const iframe = document.createElement("iframe");
    iframe.src = q.media.src;
    iframe.title = q.media.alt || "YouTube video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.aspectRatio = "16 / 9";
    iframe.style.border = "0";
    el.mediaBox.appendChild(iframe);
    return;
  }
  if (q.media.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.src = q.media.src;
    el.mediaBox.appendChild(video);
    return;
  }
  const img = document.createElement("img");
  img.src = q.media.src;
  img.alt = q.media.alt || "question media";
  el.mediaBox.appendChild(img);
}

function setResponse(idx, optionIndex, mode) {
  const prev = state.responses[idx] || [];
  if (mode === "single") {
    state.responses[idx] = [optionIndex];
    return;
  }
  const next = new Set(prev);
  if (next.has(optionIndex)) next.delete(optionIndex);
  else next.add(optionIndex);
  state.responses[idx] = Array.from(next).sort((a, b) => a - b);
}

function gradeCurrent() {
  const idx = state.currentIndex;
  const q = state.questionSet[idx];
  if (!q) return;

  const picked = state.responses[idx] || [];
  if (!picked.length) {
    el.feedback.className = "feedback pending";
    el.feedback.textContent = "Select an option first.";
    return;
  }

  state.graded[idx] = true;
  if (!isCorrectAt(idx)) addWrong(q);
  if (state.sessionMode === "wrong" && isCorrectAt(idx)) removeWrong(q.id);

  renderSession();
}

function renderFeedback(q, idx) {
  if (!state.graded[idx]) {
    if (q.answerMode === "multi") {
      el.feedback.className = "feedback pending";
      el.feedback.textContent = "This is a multi-answer item. Select answers, then click Check Answer.";
    } else {
      el.feedback.className = "feedback hidden";
      el.feedback.textContent = "";
    }
    return;
  }

  const answerLabels = q.answerIndexes.map((n) => String.fromCharCode(65 + n)).join(", ");
  const correct = isCorrectAt(idx);
  const base = correct
    ? `Correct. +${q.points} points.`
    : `Incorrect. Correct answer: ${answerLabels}. +0 points.`;
  const exp = state.showExplanation ? getExplainText(q) : "";

  el.feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  el.feedback.textContent = exp ? `${base}\n${exp}` : base;
}

function renderQuestion() {
  const q = state.questionSet[state.currentIndex];
  if (!q) {
    el.categoryChip.textContent = "No data";
    el.ruleChip.textContent = "-";
    el.questionText.textContent = state.sessionMode === "wrong"
      ? "Your wrong-note list is empty. Missed items in mock test will be saved automatically."
      : "No questions loaded.";
    el.mediaBox.classList.add("hidden");
    el.options.innerHTML = "";
    el.feedback.className = "feedback pending";
    el.feedback.textContent = "";
    el.checkBtn.classList.add("hidden");
    return;
  }

  const choices = choicesForQuestion(q);
  const prompt = promptForQuestion(q);

  el.categoryChip.textContent = q.category || TYPE_LABEL[q.type] || q.type;
  el.ruleChip.textContent = `${choices.length} choices / ${q.answerIndexes.length} answer${q.answerIndexes.length > 1 ? "s" : ""} / ${q.points} pts`;
  el.questionText.textContent = prompt;

  renderMedia(q);
  el.options.innerHTML = "";

  const picked = state.responses[state.currentIndex] || [];
  const graded = !!state.graded[state.currentIndex];

  choices.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = `${String.fromCharCode(65 + i)}. ${text}`;

    if (picked.includes(i)) btn.classList.add("selected");

    if (graded) {
      if (q.answerIndexes.includes(i)) btn.classList.add("correct");
      if (picked.includes(i) && !q.answerIndexes.includes(i)) btn.classList.add("wrong");
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      if (state.isFinished || graded) return;
      setResponse(state.currentIndex, i, q.answerMode);
      renderSession();
      if (q.answerMode === "single" && state.settings.instantCheck === "on") {
        gradeCurrent();
      }
    });

    el.options.appendChild(btn);
  });

  renderFeedback(q, state.currentIndex);

  const showCheck = q.answerMode === "multi" || state.settings.instantCheck === "off";
  el.checkBtn.classList.toggle("hidden", !showCheck || graded || state.isFinished);
}

function finishSession() {
  if (state.isFinished) return;
  state.isFinished = true;
  pauseTimer();

  const answered = getAnsweredCount();
  const correct = getCorrectCount();
  const score = getScore();
  const total = totalPoints();
  const pass = state.sessionMode === "mock" ? score >= EXAM_CONFIG.passScore : null;

  const now = new Date().toISOString();
  state.history.unshift({
    ts: now,
    mode: state.sessionMode,
    score,
    total,
    answered,
    correct
  });
  state.history = state.history.slice(0, 50);
  saveHistory(state.history);

  el.resultPanel.classList.remove("hidden");
  el.resultPanel.innerHTML = `
    <h2>${state.sessionMode.toUpperCase()} Result</h2>
    <p>Score: <strong>${score}/${total}</strong> ${state.sessionMode === "mock" ? `| Status: <strong>${pass ? "PASS" : "FAIL"}</strong> (Pass: ${EXAM_CONFIG.passScore})` : ""}</p>
    <div class="result-grid">
      <div class="result-item"><span>Answered</span><strong>${answered}</strong></div>
      <div class="result-item"><span>Correct</span><strong>${correct}</strong></div>
      <div class="result-item"><span>Wrong</span><strong>${answered - correct}</strong></div>
    </div>
  `;

  renderUtility();
  renderStats();
  renderSession();
}

function renderUtility() {
  const historyTop = state.history[0];
  el.recentScoreLabel.textContent = historyTop ? `${historyTop.score}/${historyTop.total}` : "-";

  const wrongEntries = Object.values(state.wrongNotebook);
  el.notebookCountLabel.textContent = String(wrongEntries.length);

  if (!wrongEntries.length) {
    el.weakTypeLabel.textContent = "-";
    el.startWrongBtn.disabled = true;
    return;
  }

  const typeCount = wrongEntries.reduce((acc, entry) => {
    const t = entry.question.type || "text";
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  const [weakType, count] = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
  el.weakTypeLabel.textContent = `${TYPE_LABEL[weakType] || weakType} (${count})`;
  el.startWrongBtn.disabled = false;
}

function renderStats() {
  const list = state.history;
  el.statSessionCount.textContent = String(list.length);

  if (!list.length) {
    el.statAvgScore.textContent = "0";
    el.statBestScore.textContent = "0";
    el.statLastMock.textContent = "-";
    el.historyList.innerHTML = '<div class="history-row"><span>No history yet.</span></div>';
    return;
  }

  const avg = Math.round(list.reduce((a, x) => a + (x.score / x.total) * 100, 0) / list.length);
  const best = Math.max(...list.map((x) => Math.round((x.score / x.total) * 100)));
  const lastMock = list.find((x) => x.mode === "mock");

  el.statAvgScore.textContent = `${avg}%`;
  el.statBestScore.textContent = `${best}%`;
  el.statLastMock.textContent = lastMock ? `${lastMock.score}/${lastMock.total}` : "-";

  el.historyList.innerHTML = "";
  list.slice(0, 10).forEach((row) => {
    const div = document.createElement("div");
    div.className = "history-row";
    const date = new Date(row.ts).toLocaleString();
    const pct = Math.round((row.score / row.total) * 100);
    div.innerHTML = `<span>${date} | ${row.mode}</span><span>${row.score}/${row.total} (${pct}%)</span>`;
    el.historyList.appendChild(div);
  });
}

function renderTypeFilters() {
  el.typeFilters.innerHTML = "";
  ["text", "illustration", "photo", "sign", "video"].forEach((type) => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isVideoDisabled = type === "video" && !VIDEO_FEATURE_READY;
    btn.className = `type-chip ${state.selectedTypes.has(type) ? "active" : ""} ${isVideoDisabled ? "disabled" : ""}`;
    btn.textContent = isVideoDisabled ? ui("videoTypeLabel") : TYPE_LABEL[type];
    btn.disabled = isVideoDisabled;
    btn.addEventListener("click", () => {
      if (isVideoDisabled) return;
      if (state.selectedTypes.has(type)) state.selectedTypes.delete(type);
      else state.selectedTypes.add(type);
      if (state.selectedTypes.size === 0) state.selectedTypes.add(type);
      renderTypeFilters();
    });
    el.typeFilters.appendChild(btn);
  });
}

function renderSettings() {
  el.menuLangSelect.innerHTML = MENU_LANGS.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");
  el.questionLangSelect.innerHTML = EXAM_LANGS.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");

  const explainCodes = new Set();
  BANK.forEach((q) => {
    Object.keys(q.explanations || {}).forEach((k) => explainCodes.add(k));
  });
  if (!explainCodes.size) explainCodes.add("pt");

  el.explainLangSelect.innerHTML = Array.from(explainCodes)
    .map((code) => `<option value="${code}">${code.toUpperCase()}</option>`)
    .join("");

  if (MENU_LANGS.some((l) => l.code === state.settings.menuLang)) {
    el.menuLangSelect.value = state.settings.menuLang;
  }
  el.questionLangSelect.value = state.settings.questionLang;
  if (explainCodes.has(state.settings.explainLang)) {
    el.explainLangSelect.value = state.settings.explainLang;
  }
  el.instantCheckSelect.value = state.settings.instantCheck;
  el.timerMinutesInput.value = String(state.settings.timerMinutes);
  el.wrongTimerMinutesInput.value = String(state.settings.wrongTimerMinutes || 20);
  el.typeTimerMinutesInput.value = String(state.settings.typeTimerMinutes || 20);
}

function renderSession() {
  const total = state.questionSet.length;
  const answered = getAnsweredCount();
  const correct = getCorrectCount();
  const score = getScore();

  el.currentQuestionLabel.textContent = `${Math.min(state.currentIndex + 1, Math.max(total, 1))} / ${total}`;
  el.answeredLabel.textContent = String(answered);
  el.correctLabel.textContent = String(correct);
  el.scoreLabel.textContent = `${score} / ${totalPoints()}`;

  el.paletteTitle.textContent = state.sessionMode === "wrong" ? "Wrong Note Palette" : "Question Palette";

  renderPalette();
  renderQuestion();

  const hasQuestions = total > 0;
  el.prevBtn.disabled = !hasQuestions || state.currentIndex === 0;
  el.nextBtn.disabled = !hasQuestions || state.currentIndex >= total - 1;
  el.finishBtn.disabled = !hasQuestions;
}

function makeAiPrompt() {
  const q = state.questionSet[state.currentIndex];
  if (!q) return "";

  const prompt = promptForQuestion(q);
  const choices = choicesForQuestion(q)
    .map((text, i) => `${String.fromCharCode(65 + i)}. ${text}`)
    .join("\n");
  const answer = q.answerIndexes.map((n) => String.fromCharCode(65 + n)).join(", ");
  const exp = getExplainText(q);

  return [
    "You are a driving test tutor.",
    "Context: This is for the Korean driver's license written test (Republic of Korea).",
    `Question language: ${state.settings.questionLang}`,
    `Explanation language requested: ${state.settings.explainLang}`,
    "",
    `Question: ${prompt}`,
    choices,
    "",
    `Correct answer: ${answer}`,
    `Existing explanation: ${exp}`,
    "",
    "Please explain why the correct answer is correct, why each wrong choice is wrong, and give a practical driving tip."
  ].join("\n");
}

async function copyAiPrompt() {
  const text = makeAiPrompt();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    el.copyAiPromptBtn.textContent = "Copied";
    setTimeout(() => { el.copyAiPromptBtn.textContent = "Copy AI Prompt"; }, 1200);
  } catch {
    el.copyAiPromptBtn.textContent = "Copy failed";
    setTimeout(() => { el.copyAiPromptBtn.textContent = "Copy AI Prompt"; }, 1200);
  }
}

function applySettings() {
  state.settings.menuLang = el.menuLangSelect.value;
  state.settings.questionLang = el.questionLangSelect.value;
  state.settings.explainLang = el.explainLangSelect.value;
  state.settings.instantCheck = el.instantCheckSelect.value;
  state.settings.timerMinutes = Math.max(5, Math.min(120, Number(el.timerMinutesInput.value) || 40));
  state.settings.wrongTimerMinutes = Math.max(5, Math.min(120, Number(el.wrongTimerMinutesInput.value) || 20));
  state.settings.typeTimerMinutes = Math.max(5, Math.min(120, Number(el.typeTimerMinutesInput.value) || 20));
  saveSettings(state.settings);
  applyMenuLanguage();
  if (state.page === "mock") el.pageTitle.textContent = ui("pageMock");
  if (state.page === "wrong") el.pageTitle.textContent = ui("pageWrong");
  if (state.page === "type") el.pageTitle.textContent = ui("pageType");
  if (state.page === "stats") el.pageTitle.textContent = ui("pageStats");
  if (state.page === "settings") el.pageTitle.textContent = ui("pageSettings");
  if (!state.timerId) {
    setNoActiveTestTimer();
  }
}

function bindEvents() {
  el.openMockBtn.addEventListener("click", openMock);
  el.openWrongBtn.addEventListener("click", openWrong);
  el.openTypeBtn.addEventListener("click", openType);
  el.openStatsBtn.addEventListener("click", openStats);
  el.openSettingsBtn.addEventListener("click", openSettings);
  el.backToMenuBtn.addEventListener("click", showHome);

  el.startWrongBtn.addEventListener("click", openWrong);
  el.clearWrongBtn.addEventListener("click", () => {
    clearWrong();
    renderUtility();
  });

  el.prevBtn.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderSession();
    }
  });

  el.nextBtn.addEventListener("click", () => {
    if (state.currentIndex < state.questionSet.length - 1) {
      state.currentIndex += 1;
      renderSession();
    }
  });

  el.checkBtn.addEventListener("click", gradeCurrent);
  el.finishBtn.addEventListener("click", finishSession);

  el.explainToggle.addEventListener("change", (e) => {
    state.showExplanation = e.target.checked;
    renderSession();
  });

  el.copyAiPromptBtn.addEventListener("click", copyAiPrompt);
  el.startTypeBtn.addEventListener("click", startTypeSession);
  el.applySettingsBtn.addEventListener("click", applySettings);
}

bindEvents();
renderUtility();
renderStats();
applyMenuLanguage();
setNoActiveTestTimer();
showHome();
