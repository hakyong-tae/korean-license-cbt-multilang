# PROJECT_BASELINE

This file is the default checklist/template to reuse when starting a new web project.

## 1) Project Basics
- Project name
- Production URL
- GitHub repository URL
- Target users (who/where/language)

## 2) Deploy & Ops
- Add `netlify.toml`
- Confirm production URL is reachable
- Confirm deploy trigger from `main`
- Optional custom domain connection

## 3) SEO (Default)
- Add `canonical` link
- Add `meta name="robots"` (`index,follow,max-image-preview:large`)
- Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Add Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Add structured data (`application/ld+json`, `WebSite`)
- Add `robots.txt`
- Add `sitemap.xml`
- Add Google Search Console verification tag
- Submit sitemap in Search Console

## 4) Analytics (Default)
- Install GA4 script with config object in `index.html`
- Keep Measurement ID configurable (not hardwired in code logic)
- Track key events:
  - `open_page`
  - `start_session`
  - `finish_session`
  - `apply_settings`
  - `cta_click` (if applicable)
- Add analytics setup steps to README

## 5) Common UI Block
- Footer block on all pages:
  - Maker credit
  - Contact email
  - Social links (X / Instagram / GitHub)
- Responsive behavior check (desktop + mobile)

## 6) Language-Pack Strategy
- Keep menu language and explanation language separated
- Keep fallback language order explicit
- Add new language packs with same schema keys

## 7) Quality & Safety
- Check broken links
- Check metadata preview image rendering
- Check core flows before deploy (start -> use -> finish)
- Confirm no accidental sensitive data exposure

## 8) Delivery Standard
- Summarize changed files
- Share commit hash
- Confirm deployment status
- Provide next-action checklist for owner

## Reuse Prompt (Copy/Paste)
When starting a new project, read `PROJECT_BASELINE.md` first and apply all default sections (Deploy, SEO, Analytics, Footer, QA). Then implement project-specific features.
