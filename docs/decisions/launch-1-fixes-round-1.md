# Launch 1 — fixes from final review, round 1 (2026-10-25)

Source: lead review + GPT final review of PR #1 (verdict: approve with changes, pending verification). Work on the same branch `launch-1-two-branches`, push, let Netlify rebuild the same Deploy Preview. Do not merge.

## 1. WhatsApp form opens twice (blocker)
`js/main.js` ~L106–107: `window.open(link, '_blank', 'noopener')` returns null with `noopener`, so the `location.href` fallback also fires.
Fix: one navigation only — open the wa.me link once (new tab, `rel="noopener"`), no automatic fallback. After submit, show a visible line under the button: "WhatsApp didn't open? Open the chat" (linked to the same wa.me URL). Same in AR/FR.
Verify: one submit = one WhatsApp destination, message intact, the site tab stays on the page.

## 2. Remove unconfirmed claims everywhere (EN/AR/FR copy, meta descriptions, structured data)
Remove or rewrite:
- "Repeat orders from the saved design" (Home, Services, Uniforms)
- "Artwork approved before the run" (Services)
- "you approve the artwork before we stitch the order" / "You approve it first" (Uniforms)
- "Ask for a preview on a piece if you want to see it stitched"
- "We keep your digitised design … matches the last batch"
Only confirmed line: "Preview before stitching on request." (Pending owner: if he confirms the shop keeps customers' design files, a later line may say "We keep your design on file for repeat orders" — do not add it now.)
Edit `src/content-*.mjs`, regenerate with `node src/build.mjs`, and grep all output HTML for "saved design", "approve", "on a piece", "last batch" and their AR/FR equivalents.

## 3. Block internal files (blocker)
Add at the TOP of `_redirects`:
```
/CLAUDE.md   /404.html   404!
/docs/*      /404.html   404!
/src/*       /404.html   404!
```
Verify on the preview with curl: each returns HTTP 404 (not 200, not 301). Update the PR description (no longer an open question).

## 4. French wording
Replace sitewide: "on fournit le vierge" / "Fournissez l’article vierge" → "Apportez votre article ou choisissez un article fourni par l’atelier" (form label: "Article fourni par l’atelier"). "Pièce unique bienvenue" → "À partir d’une pièce". Re-read all FR pages for other literal translations.

## 5. Measurement — deferred
No analytics in Launch 1 (separate owner decision). Do not add tracking scripts or CSP changes. Note in the PR: baseline = counting form-generated WhatsApp enquiries (identifiable by the pre-filled message prefix in EN/AR/FR).

## 6. After the fixes, post in the PR
- curl results for the three blocked paths
- confirmation of one WhatsApp destination (desktop + 375px)
- grep results showing the removed claims are gone in all languages
- `node src/check.mjs` output
