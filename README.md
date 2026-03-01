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
  - extraction source PDF: external source URL (not tracked in git)
- Runtime loader file:
  - `/questions.js` (generated from `questions.v1.json`)

## Source PDF (official link)
- `http://www.g-car.kr/wp-content/uploads/2025/04/12%EC%A2%85%EB%B3%B4%ED%86%B5-%ED%95%99%EA%B3%BC%EC%8B%9C%ED%97%98-%EB%AC%B8%EC%A0%9C%EC%9D%80%ED%96%89English_2025.2.24-%EC%8B%9C%ED%96%89.pdf`

## Refresh workflow (PDF -> JSON -> runtime JS)
1. Download latest source PDF locally:
   - `curl -L "http://www.g-car.kr/wp-content/uploads/2025/04/12%EC%A2%85%EB%B3%B4%ED%86%B5-%ED%95%99%EA%B3%BC%EC%8B%9C%ED%97%98-%EB%AC%B8%EC%A0%9C%EC%9D%80%ED%96%89English_2025.2.24-%EC%8B%9C%ED%96%89.pdf" -o /Users/hytae/Downloads/verse8-driving-cbt/data/question-bank-en.pdf`
2. Regenerate DB JSON:
   - `node /Users/hytae/Downloads/verse8-driving-cbt/scripts/extract-pdf-bank.mjs`
3. Regenerate runtime JS:
   - `node /Users/hytae/Downloads/verse8-driving-cbt/scripts/build-questions-js.mjs`
4. Commit updated `data/questions.v1.json` and `questions.js` only.

## Run
Open `index.html` in a browser.

## GitHub Pages Deploy
- Workflow file: `/.github/workflows/pages.yml`
- Deploy URL target: `https://hakyong-tae.github.io/korean-license-cbt-multilang/`
- In GitHub repo settings:
  - `Settings -> Pages -> Build and deployment -> Source = GitHub Actions`

## Analytics (GA4)
- File: `/index.html`
- Find `window.KD_ANALYTICS_CONFIG` and replace:
  - `ga4MeasurementId: "G-XXXXXXXXXX"`
  - with your real GA4 Measurement ID (example: `G-ABCD1234EF`)
- Tracked events:
  - `start_session`
  - `finish_session`
  - `apply_settings`
  - `copy_ai_prompt`
  - `clear_wrong_note`
  - `open_page` (type/stats/settings)

## Mobile support
- Vertical menu layout (portrait-first)
- Responsive design for mobile and desktop
- Timer pauses when user leaves active test screens (for example, Settings/Stats)
