# Decision 03 — Look and flow: "the thread" (Home pilot)
Date 2026-10-25 · GPT: approve (round 2) · Owner: PENDING — do not build until the owner says "approved"

Amends Decision 02: the site is no longer dark-only (cream ground allowed) and Decision 02's layout patterns are replaced by this one. Structure (Decision 01), facts, copy meaning, CTA wording, SEO and the round-1 fixes are unchanged.

## Why
Owner: the PR #1 build feels rigid, old and not beautiful; wants young-gen, fluid, beautiful, matching the cursive "Younes" logo; preferred the old light-cream flow.
Diagnosis: bordered boxes on a strict grid, four identical cards, 2×2 numbered tiles, Playfair Italic + tracked uppercase labels, dark slabs everywhere, nothing echoing the handwritten logo.

## The direction
1. **The drawn thread (signature).** One hand-drawn SVG line, same stroke character as the logo underline, runs down Home, loops around headings and connects hero → services → process → visit, drawing itself on scroll. Process steps are stops on the thread. Dividers are a loose stitched wave. Separate paths for mobile and RTL. `aria-hidden`, `pointer-events: none`, never crosses text or controls after wrapping/font load. Reduced motion: shown fully drawn.
2. **Colour by ground** (brand tokens unchanged):
   - Cream `#EEE8DA` is the main ground. Text: ink `#0B1120` (15.4:1), secondary `#4A5266` (6.4:1), rare accent text dark gold `#7A5E2E` (4.96:1). Gold `#CDB88A` = decoration only on cream.
   - Navy bands (`#0B1120` / `#1F305D`) for the hero and one or two moments (embroidery, visit). Text: cream `#EEE8DA`, secondary `#A9B0BD`, gold `#CDB88A`.
   - Never `#A9B0BD` on cream. Changes of ground follow content, not a mechanical light/dark alternation.
   - Tiny real-thread-colour dots on the "what we stitch on" strip.
3. **Type** (all OFL, self-hosted, per-language subsets): headlines **Instrument Serif** regular + italic (italic words as handwritten-feel emphasis); body/UI **Manrope** 400/600; sentence-case labels, no tracked uppercase. Handwritten accents = logo SVG + max 2–3 hand-drawn SVG words/arrows per page, always repeating HTML text, never replacing it. Arabic: **IBM Plex Sans Arabic** body; **Aref Ruqaa** for short headings only (fallback IBM Plex Sans Arabic 600 if it reads poorly on a phone). Amiri dropped. Playfair and Montserrat dropped.
4. **Layout:** no bordered cards; asymmetric, overlapping image/text; rounded "swatch" image crops. Home services = two big split panels (Tailoring / Embroidery: one image, one line, one button) with sub-services as labelled pill links (≥44px targets). "What we stitch on" strip (tees, hoodies, caps, towels, uniforms, bags): wraps as a list on small screens or has visible prev/next controls; keyboard-scrollable. Big confident type, generous spacing, ~7 sections on Home (editing target).
5. **Motion:** thread draw + restrained reveals (fade + 16px rise) only. ONE slow marquee line ("hems · zips · linings · names · logos · caps · towels") with a visible keyboard-reachable pause/play button, stopped under reduced motion, words also present as static text. No magnetic buttons, no parallax, no smooth scroll under reduced motion, hit areas never move. Native CSS scroll-driven animations + IntersectionObserver fallback; no animation library; CSP unchanged. Page complete without JS: nothing hidden until an observer fires.
6. **Mobile first:** phone hero = logo, the service/location headline (wraps naturally), two big branch buttons, ideally above the fold at normal phone sizes; portrait machine video below. Sticky WhatsApp · Call · Directions kept. Reflow checked at 320px and 200% text.

## Pilot Slice
Home only, in EN/AR/FR, on the PR branch. Pilot styles and fonts scoped to Home so the other 7 page types stay as they are until rollout. The owner judges the pilot on his phone and desktop, normally and with reduced motion. Rollout to the other pages is a separate step after his OK.

## Fixed vs free
- FIXED: pages/URLs, redirects, facts, approved copy meaning, CTA wording, SEO/structured data, contrast ≥ 4.5:1, body ≥ 16px, mobile Performance ≥ 90, CLS < 0.1, LCP ≤ 2.5 s (EN/AR/FR Home), CSP, no client work, round-1 fixes.
- FREE: composition, spacing, image crops and placement, in-page section order (except first screen), motion details within the limits above, thread path.

## GPT points and handling
1. Record the Decision 02 amendment; colours per ground; no mechanical alternation — ACCEPTED.
2. Start with less motion — ADAPTED: thread + reveals; magnetic and parallax dropped; one marquee kept with a pause control (owner's "young" ask). GPT accepted.
3. Content complete without animation; ordered HTML steps; decorative SVG; per-layout thread paths — ACCEPTED.
4. Headline wraps naturally; reflow 320px/200% — ACCEPTED.
5. Explicit service links, accessible strip, HTML text for key messages — ACCEPTED.
6. Fonts provisional; Ruqaa checked on phone; LCP ≤ 2.5 s; pilot scoped to Home — ACCEPTED.
