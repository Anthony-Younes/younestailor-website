# Launch 1 — build brief (from Decision 01 + Decision 02)

Branch: `launch-1-two-branches`. Open one PR. Do not merge.

## Pages to ship (8 pages × 3 languages = 24 URLs)
| Page | EN | AR | FR |
|---|---|---|---|
| Home | `/` | `/ar/` | `/fr/` |
| Services overview | `/services/` | `/ar/services/` | `/fr/services/` |
| Alterations & fitting | `/services/alterations/` | `/ar/services/alterations/` | `/fr/services/retouches/` |
| Repairs & mending | `/services/repairs/` | `/ar/services/repairs/` | `/fr/services/reparations/` |
| Embroidery | `/services/embroidery/` | `/ar/services/embroidery/` | `/fr/services/broderie/` |
| Uniforms, teams & business | `/services/embroidery/uniforms/` | `/ar/services/embroidery/uniforms/` | `/fr/services/broderie/uniformes/` |
| About | `/about/` | `/ar/about/` | `/fr/a-propos/` |
| Visit | `/visit/` | `/ar/visit/` | `/fr/nous-trouver/` |

**Not in this launch:** Personalised gifts (`/services/embroidery/gifts/`, FR `/fr/services/broderie/cadeaux/`) — no samples yet. No "coming soon" card, no links to it.

## Content moves BEFORE deleting
- Wedding & formalwear → a real section on Alterations & fitting (fitting timeline, what to bring, when to come in). Use the existing page's facts; rewrite in the new voice.
- Restoration → a section on Repairs & mending (heirloom/vintage assessment, linings, moth holes, colour matching). Restoration + heirloom-care journal facts go here.
- Journal "clothes need alterations" + "wedding alterations timeline" → useful points into Alterations. "Heirloom garment care" → Repairs.
- Then delete: `services/wedding-and-formalwear/`, `services/restoration/`, `journal/` (index + 3 posts) in all three languages.

## Redirects to ADD to `_redirects` (keep all existing ones; each old URL = one 301 hop)
```
# Launch 1 (2026-10): wedding + restoration merged, journal removed
/services/wedding-and-formalwear        /services/alterations/        301!
/services/wedding-and-formalwear/*      /services/alterations/        301!
/ar/services/wedding-and-formalwear     /ar/services/alterations/     301!
/ar/services/wedding-and-formalwear/*   /ar/services/alterations/     301!
/fr/services/mariage-ceremonie          /fr/services/retouches/       301!
/fr/services/mariage-ceremonie/*        /fr/services/retouches/       301!
/services/restoration                   /services/repairs/            301!
/services/restoration/*                 /services/repairs/            301!
/ar/services/restoration                /ar/services/repairs/         301!
/ar/services/restoration/*              /ar/services/repairs/         301!
/fr/services/restauration               /fr/services/reparations/     301!
/fr/services/restauration/*             /fr/services/reparations/     301!
/journal/clothes-need-alterations*      /services/alterations/        301!
/journal/wedding-alterations-timeline*  /services/alterations/        301!
/journal/heirloom-garment-care*         /services/repairs/            301!
/journal                                /services/                    301!
/journal/*                              /services/                    301!
/ar/journal/clothes-need-alterations*      /ar/services/alterations/  301!
/ar/journal/wedding-alterations-timeline*  /ar/services/alterations/  301!
/ar/journal/heirloom-garment-care*         /ar/services/repairs/      301!
/ar/journal                                /ar/services/              301!
/ar/journal/*                              /ar/services/              301!
/fr/journal/vetement-besoin-retouche*      /fr/services/retouches/    301!
/fr/journal/delai-retouches-mariage*       /fr/services/retouches/    301!
/fr/journal/entretien-vetement-heritage*   /fr/services/reparations/  301!
/fr/journal                                /fr/services/              301!
/fr/journal/*                              /fr/services/              301!
```
Specific rules must sit above the `/journal/*` catch-alls (Netlify uses the first match). Test every line after deploy.

## Page jobs
- **Home**: first screen has a plain HTML line "Tailoring and embroidery in Blat, Byblos" + two buttons (Tailoring, Embroidery). Then services (two groups), two process strips, Visit block. Button: "Tell us what you need".
- **Services overview**: two groups. Tailoring: Alterations & fitting, Repairs & mending. Embroidery: Embroidery, Uniforms & teams. Button: "Tell us what you need".
- **Alterations & fitting / Repairs & mending**: what we do (lists), how it works (Drop off → Fit → Bench → Collect; Repairs must not imply every job needs a fitting), FAQ. Button: "Request a fitting" (Alterations), "Request a repair" or "Tell us what you need" (Repairs).
- **Embroidery**: what we stitch on (tees, polos, hoodies, sweaters, caps, towels, uniforms, bags) · blanks supplied or bring your own · names, initials, text, logos, own artwork · single pieces welcome · in-house digitising. Near the button: "No minimum order · One price — no separate design or digitising charge · Preview before stitching on request". Process: Send item details and artwork (or ask for help with artwork) → Agree the quote, preview on request → Stitch → Collect. Button: "Request a quote".
- **Uniforms, teams & business**: schools, clubs, restaurants, companies; quantities, sizes, logo placement (chest, sleeve, back, cap front), repeat orders from the saved design, artwork approval. Button: "Request a quote".
- **About**: keep current content; re-voice; Byblos.
- **Visit**: real NAP, hours, phone, WhatsApp, directions link; map click-to-load or link.

## Enquiry flow
Service preselected per page; only relevant fields. Embroidery fields: item, quantity (with "Not sure"), blank supplied or bringing own, "Need help with artwork", deadline. Opens WhatsApp with a pre-filled message; copy says "Send your artwork or handwriting photo in the chat after it opens." Call and direct WhatsApp always available without the form.

## Media
- Machine-at-work only. Files in `assets/media/`: `machine-01..04.mp4` (720×1280, 6 s, muted) + `-poster.webp`. They show no client logo — keep it that way. **No finished-product or client-work images in this launch.**
- Hero: one still (poster or existing workshop photo), eager. Videos lazy, muted, playsinline, pause button, static poster under `prefers-reduced-motion`.
- Existing B&W workshop photos in `assets/work/` can be reused (check they show no client work).

## Also update
Nav (Services · About · Visit) and footer, sitemap.xml (24 URLs, no removed ones), llms.txt, robots.txt reference, structured data Service entries (Alterations & fitting, Repairs & mending, Embroidery, Uniform & team embroidery), `manifest.webmanifest` colours, 404 page in new look. Home FAQ: drop "we don't cut new garments" or limit it to tailoring; add that blanks are supplied for embroidery.

## Before opening the PR, check and list results in the PR
- All 24 URLs return 200 on the Deploy Preview; every removed URL returns one 301 to the right same-language page.
- Canonical + reciprocal hreflang on every page; language switcher keeps the page.
- Structured data passes Schema.org validator; facts match CLAUDE.md exactly.
- Contrast ≥ 4.5:1 for all text pairs; body ≥ 16px.
- Mobile 375px: menu, sticky bar, forms, Arabic RTL, phone numbers display LTR.
- PageSpeed (mobile) for Home, Embroidery, Visit on the preview.
- No "Jbeil" in running copy; no banned words.
