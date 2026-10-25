# Younes Tailor website — rules for Claude Code

Static hand-built site (HTML/CSS/JS, no build step), hosted on Netlify, deployed automatically from `main` of GitHub `Anthony-Younes/younestailor-website`. Three languages: EN (root), AR (`/ar/`, same slugs as EN, RTL), FR (`/fr/`, French slugs).

## Order of authority (highest first)
1. The owner's direct instructions in chat.
2. This CLAUDE.md.
3. The approved decision records in `docs/decisions/` (including the launch brief).
4. The Claude Design handoff, **only** as a source of visual assets: logo SVG files, exact colour and font values, component styling.

If the Claude Design handoff says anything that conflicts with 1–3 — facts, address, location, services, page list, wording, buttons, contrast, fonts loading, media — follow 1–3 and ignore the design text. Known outdated text in the design system: "Mastita" (correct: Blat), "repair shop … rather than producing new ones" (we now do embroidery), placeholder phone/hours in the mockup. Never copy those.

## How work happens here
- Lead agent (Claude, in the owner's "Younes Tailor - website" project) plans; GPT reviews in ChatGPT; the owner approves. You are the builder.
- **Never commit to `main`, never merge, never deploy.** Work on a branch, push it, open a pull request. Netlify builds a Deploy Preview for every PR; post the preview URL in the PR.
- Build only what an approved decision record says (`docs/decisions/`). If something isn't covered, stop and ask instead of inventing.
- Don't use Netlify Drop or Netlify's built-in agent.

## Facts — use exactly, never invent others
- Name: **Younes Tailor**
- Address line: **Blat, Jbeil (Byblos) District, Mount Lebanon, Lebanon**
- Phone: **+961 3 128 413** · Email: **info@younestailor.com** · Instagram: @younestailormestita
- Hours: **Mon–Sat 09:00–19:00, Sunday closed**
- Parking: **available**. Payment: **cash only**. Landmark: **near Best Buy Market**.
- Arabic register: simple formal Arabic (فصحى مبسّطة) with a warm tone — no Lebanese dialect in site copy.
- Location in running copy: say **Byblos** (not Jbeil). Arabic: جبيل. Keep Blat visible. Keep "Jbeil" only in the address line and structured data.
- Embroidery: blanks supplied (tees, hoodies, sweaters, caps, towels, uniforms) or customer brings their own; caps stitched in-house; designs digitised in-house; **no minimum order**; **one all-in price, no separate design or digitising charge**; **preview before stitching on request**.
- Never write prices, ratings, reviews, customer quotes or turnaround promises that aren't listed here. Speed lines ("most alterations in 2–3 days") at most once per page.

## Copy rules
- The shop is run by the Younes family. Say it once at most (About page, one line). No heritage, family history, "our story", "passion" or origin-story copy anywhere.
- Copy is practical: what we do, how to ask (send a photo on WhatsApp), how it works, how to reach us. No anecdotes, no "what customers love", no filler about values.
Short, specific, plain, dry. Sentence case. No AI filler: no "not just X, it's Y", "passion", "crafted", "elevate", "journey", "bespoke experience", "seamless", "we pride ourselves". No exclamation marks. Arabic and French must read as native, not translated word by word.

## Brand (approved values; the handoff may refine exact hex/font files, but never overrides the rules in this file)
- Dark only. ink `#0B1120`, panel `#121A2C`, navy `#1F305D` / `#1B2B55`, cream `#EEE8DA`, body text `#A9B0BD`, gold `#CDB88A` (hairlines, numerals, small labels).
- Every text colour pair ≥ 4.5:1 (large text ≥ 3:1). The mockup's dim grey labels fail on navy: lighten them.
- Fonts self-hosted WOFF2 in `/assets/fonts/` (CSP is `font-src 'self'`): Playfair Display Italic (real headlines only) + Medium (card titles); Montserrat 400/600 (body ≥16px, never thin cuts for text); Arabic: Amiri (headings) + IBM Plex Sans Arabic (body). No uppercase or letter-spacing on Arabic. Load only what each language needs.
- Icons: Phosphor, thin outline; controls always have text labels.
- Logo: script "Younes" + يونس SVG from the handoff. Never retype it in a font. Footer lockup "TAILOR · BYBLOS".

## Technical guardrails
- Keep `_headers` (CSP etc.) and every existing redirect in `_redirects`. Self-hosted media only (CSP has no external img/media sources; map iframe from google.com is allowed).
- Every page: unique title + meta description, one H1, canonical to itself, reciprocal hreflang (en, ar, fr, x-default=en), language switcher that keeps the current page.
- Structured data: keep `@type ["LocalBusiness","ProfessionalService"]`, one business identity on every page, exact facts above, `Service` entries for each live service. No ratings/reviews/prices.
- Images/video: reserved width/height, poster frames, `loading="lazy"` below the fold, hero image eager. Videos muted, `playsinline`, pause control, no autoplay when `prefers-reduced-motion`.
- Mobile first. Sticky bar on phones (WhatsApp · Call · Directions) must never cover focused fields or content.
