# Question DB Schema v1.0.0

## Root object
- `schemaVersion` (string): schema version. Example: `1.0.0`
- `generatedAt` (string, ISO datetime)
- `defaultQuestionLang` (string): default language key for prompt/choices
- `defaultExplainLang` (string): default language key for explanations
- `questions` (array<Question>)

## Question object
- `id` (string): stable unique id (recommended: `KR-EN-0001`)
- `ordinal` (number): display order
- `license` (string): exam bucket (example: `type1_type2_common`)
- `type` (enum): `text | illustration | photo | sign | video`
- `category` (string): display category label
- `prompt` (object): language map, e.g. `{ "en": "...", "ko": "..." }`
- `choices` (array<object>): each choice is a language map, e.g. `{ "en": "...", "pt": "..." }`
- `answerIndexes` (array<number>): zero-based correct index(es)
- `answerMode` (enum): `single | multi`
- `points` (number): per-question score
- `media` (optional object)
  - `type` (enum): `image | video`
  - `src` (string): relative path or URL
  - `alt` (optional string)
- `explanations` (object): language map for explanation text
- `source` (object)
  - `provider` (string)
  - `editionDate` (string, YYYY-MM-DD)
  - `note` (string)

## Language strategy
- Keep exam question language and explanation language separate.
- Current production target:
  - question language selectable: `ko/en/zh/vi`
  - explanation language active: `pt`
- To add a new language, only add that language key under:
  - `prompt`
  - each item in `choices`
  - `explanations`

## Scoring convention (current)
- single-answer: `2`
- multi-answer: `3`
- video item: `5`

## Migration guideline for 1000 questions
1. Assign stable IDs first.
2. Fill `prompt.en`, `choices[].en`, `answerIndexes`, `points`.
3. Add `explanations.pt`.
4. Add other language keys later without changing code.
