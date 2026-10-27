# Launch 1 — fixes round 2 (from GPT's test of the Home pilot preview, 27 Oct 2026)

Same branch `launch-1-two-branches`. Push, let the Deploy Preview rebuild, post results in PR #1. Do not merge.
All wording below is approved; use it verbatim. Facts only from CLAUDE.md.

## 1. Same practical information everywhere (EN/AR/FR)
Visit pages (and their FAQ + structured data) must carry the same confirmed facts as Home:
- Landmark: "near Best Buy Market" / "قرب Best Buy Market" / "près de Best Buy Market"
- "Parking available." / "يتوفّر موقف للسيارات." / "Parking disponible." — replace the old parking FAQ answer ("Call or message us before you drive over…") with this.
- "Cash only." / "الدفع نقداً فقط." / "Paiement en espèces uniquement." — add as a line in the visit details and as the FAQ "How do I pay?" (same wording as Home).
Grep all 24 pages afterwards: every page that states location, parking or payment states them identically.

## 2. About: remove the story copy
Delete "Why we opened", "The idea was simple…", "A neighbourhood tailor, done properly" and any similar origin/values copy in EN/AR/FR. Replace with practical content only:
- One line (once per language): "Younes Tailor is run by the Younes family in Blat, Byblos." / "تديرُ عائلة يونس خياطة يونس في بلاط، جبيل." / "Younes Tailor est tenu par la famille Younes, à Blat, Byblos."
- Then: what we do (link to Tailoring and Embroidery), languages we serve in (Arabic, French, English), hours, address, parking, cash only, contact buttons.
- Keep "opened in 2025" only as a plain fact line if it fits; no "idea", "trust", "properly", "story" sentences.

## 3. French embroidery instruction
On Embroidery and Uniforms (and anywhere else it appears): replace "Envoyez l’article et le visuel" with **"Envoyez les détails de l’article et votre visuel."**

## 4. Home enquiry form default
Home's general form must not preselect Alterations. First option: "Choose a service" / "اختاروا الخدمة" / "Choisissez un service" (no value; required). Branch pages keep their service-specific defaults.

## 5. Marquee accessibility
The duplicated marquee copy must be `aria-hidden="true"`. Simplest: mark the whole marquee decorative (`aria-hidden="true"`) — the same services appear as normal text elsewhere. Keep the visible pause control working.

## 6. Trim repetition on inner pages
- No breadcrumb + small label + H1 all saying the same word: keep the breadcrumb and the H1; drop the small label when it repeats the H1.
- "What we stitch on": one heading only, not a label plus a heading.
- The three embroidery benefits ("No minimum order · One price, design and setup included · See the design before we stitch, on request") appear **once per page**, near the main button. Remove repeats.

## 7. One price wording
Everywhere (all pages, all languages, FAQ, meta, structured data): "One price, design and setup included" / "سعر واحد يشمل التصميم والتجهيز" / "Un seul prix, création et préparation comprises". Remove "No setup charge for your logo" and any variant.

## 8. Social links (owner confirmed 27 Oct 2026)
Use exactly these three, everywhere social links appear (footer, About, Visit, contact blocks) in EN/AR/FR:
- Instagram: https://www.instagram.com/younestailor/ (handle @younestailor)
- Facebook: https://www.facebook.com/profile.php?id=61571488297091
- TikTok: https://www.tiktok.com/@younes.tailor (handle @younes.tailor; no tracking parameters)
Remove every link to and mention of the old Instagram handle @younestailormestita (links, visible text, llms.txt, structured data).
Structured data: `sameAs` = these three URLs, on the one business identity.
Links open in a new tab with `rel="noopener"`, labelled with the network name for screen readers ("Instagram", "Facebook", "TikTok"); icons from the existing Phosphor set. WhatsApp stays as it is (+961 3 128 413).
Check: grep for "younestailormestita" → zero hits.

## 9. Checks to post in the PR
- Grep results for: "Why we opened", "idea was simple", "done properly", "Envoyez l’article et le visuel", "No setup charge" → zero hits.
- Location/parking/payment identical across Home and Visit in EN/AR/FR.
- Home form opens on "Choose a service".
- Accessibility tree: marquee words not read twice.
- Remaining checks GPT could not finish: 320px width (EN + AR), prefers-reduced-motion (thread static, marquee stopped), map click-to-load, PageSpeed mobile for Home EN/AR/FR (Performance ≥ 90, CLS < 0.1, LCP ≤ 2.5 s).
