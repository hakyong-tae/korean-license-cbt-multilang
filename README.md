# Korea Driver License CBT (EN + PT)

## Implemented app structure
- Menu
  - 1. Mock Test
  - 2. Wrong Note
  - 3. Type Practice
  - 4. Progress/Stats
  - 5. Settings
- Core modes
  - mock session (full bank)
  - wrong-note session (only wrong questions)
  - type-focused session (selected types)

## Language-pack-ready architecture
- Question language and explanation language are separated.
- Supported exam language options in UI: `ko`, `en`, `zh`, `vi`
- Explanation language currently available: `pt` (and fallback to other existing fields)
- Data can be extended by adding language keys without changing app logic.

## AI assist
- Per-question AI helper:
  - copy structured prompt button
  - quick links to ChatGPT / Gemini
- Recommended use: keep official answer as source of truth, use AI as supplementary explanation.

## DB schema + migration status
- Schema docs:
  - `/db/schema.md`
  - `/db/schema.json`
- Migrated dataset:
  - `/data/questions.v1.json`
  - total: 1000 questions (English bank extraction)
  - extraction source PDF: `/data/question-bank-en.pdf`
- Runtime loader file:
  - `/questions.js` (generated from `questions.v1.json`)

## Next step (for 1000-question rollout)
1. If PDF is updated, regenerate DB:
   - `node /Users/hytae/Downloads/verse8-driving-cbt/scripts/extract-pdf-bank.mjs`
2. Regenerate runtime JS:
   - `node /Users/hytae/Downloads/verse8-driving-cbt/scripts/build-questions-js.mjs`
3. Deploy static build.

## Run
Open `index.html` in a browser.

## Mobile support
- Vertical menu layout (portrait-first)
- Responsive design for mobile and desktop
- Timer pauses when user leaves active test screens (for example, Settings/Stats)
