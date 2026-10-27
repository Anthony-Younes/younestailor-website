# Launch 1 — fixes round 3: layout shift when fonts load (27 Oct 2026)

Same branch `launch-1-two-branches`. Push, let the Deploy Preview rebuild, post results in PR #1. Do not merge. No copy or design changes.

## Problem
GPT's PageSpeed (mobile, Google servers): /services/embroidery/ Performance 85–86, **CLS 0.263**, attributed to the machine-image frame. Agreed gates: Performance ≥ 90, CLS < 0.1.

## Diagnosis (lead, reproduced)
With font files delayed 2.5 s (412×823 viewport), the hero shifts when the web fonts swap in:
- /services/embroidery/uniforms/: CLS 0.031 — `.lede`, `.btn-row`, `ul.trio` move down 43 px and `div.frame` **shrinks** 236 → 193 px. The H1 wraps to an extra line once Instrument Serif replaces its fallback, and the frame's height depends on the text column.
- Home: 0.028 — a 67 px-high element moves down 50 px at the same moment.
- On PSI's slower font delivery the same mechanism produces 0.26 on Embroidery.
No shift when fonts are already cached → the fallback metrics, not the images, are the cause.

## Fix (all three)
1. **Decouple the hero frame from the text height.** The image frame gets its own fixed size: `aspect-ratio` on the frame itself (not only the image) and no `flex: 1`/stretch that ties its height to the text column. On phones it keeps its own height regardless of headline wrapping.
2. **Match the fallback metrics to the fonts actually used above the fold.** Re-tune `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` of `'Instrument Serif Fallback'` (regular AND italic — the H1's italic words) and `'Manrope Fallback'` so the H1 and lede wrap identically before and after the swap at 320, 375, 390 and 412 px. Measure, don't guess: compare H1 line count/height with fonts blocked vs loaded.
3. **Preload exactly the font files the first screen uses** (per language): Instrument Serif regular + italic, Manrope 400 (+600 if buttons use it) for EN/FR; IBM Plex Sans Arabic 400/600 and Aref Ruqaa (if in the H1) for AR. Don't preload anything below the fold.
Do not switch to `font-display: optional` and do not hide text while fonts load.

## Checks to post in PR #1
- Layout-shift test with font files delayed ~2.5 s at 412×823 for: /, /services/, /services/embroidery/, /services/embroidery/uniforms/, /services/alterations/, /visit/ and the AR + FR versions of Home and Embroidery → each CLS < 0.02.
- PageSpeed Insights (mobile) on the preview: Home EN/AR/FR and Embroidery EN/AR/FR → Performance ≥ 90, CLS < 0.1, LCP ≤ 2.5 s. Paste the six report links.

## Already verified by the lead (no action)
Reduced motion on Home EN/AR: marquee animation off, thread fully drawn and static, video paused, no hidden text, no smooth scroll. 320 px: no horizontal overflow on Home EN/AR.
