// Launch 1 checks that can run locally. Run: node src/check.mjs
// Prints a report and exits 1 if anything fails.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PATHS } from './content-pages.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://younestailor.com';
const LANGS = ['en', 'ar', 'fr'];
const fails = [];
const ok = [];
const fail = (m) => fails.push(m);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const fileFor = (u) => path.join(u, 'index.html');
const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ');

// 1. pages exist, one H1, unique title/description, canonical, hreflang, switcher
const titles = new Map(); const descs = new Map();
let pageCount = 0;
for (const [key, byLang] of Object.entries(PATHS)) {
  for (const lang of LANGS) {
    const u = byLang[lang];
    const f = fileFor(u);
    if (!fs.existsSync(path.join(ROOT, f))) { fail(`missing ${u}`); continue; }
    pageCount++;
    const h = read(f);
    const h1 = (h.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) fail(`${u}: ${h1} h1 elements`);
    const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
    const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!title || !desc) fail(`${u}: missing title/description`);
    if (titles.has(title)) fail(`${u}: duplicate title with ${titles.get(title)}`); titles.set(title, u);
    if (descs.has(desc)) fail(`${u}: duplicate description with ${descs.get(desc)}`); descs.set(desc, u);
    if (desc && (desc.length < 70 || desc.length > 175)) fail(`${u}: description length ${desc.length}`);
    const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (canon !== SITE + u) fail(`${u}: canonical ${canon}`);
    if (!h.includes(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`)) fail(`${u}: html lang/dir`);
    for (const l of LANGS) {
      if (!h.includes(`<link rel="alternate" hreflang="${l}" href="${SITE + byLang[l]}">`)) fail(`${u}: hreflang ${l} missing`);
    }
    if (!h.includes(`<link rel="alternate" hreflang="x-default" href="${SITE + byLang.en}">`)) fail(`${u}: x-default missing`);
    // language switcher keeps the page
    for (const l of LANGS.filter((x) => x !== lang)) {
      if (!h.includes(`href="${byLang[l]}" hreflang="${l}"`)) fail(`${u}: switcher to ${l} does not point to ${byLang[l]}`);
    }
  }
}
ok.push(`${pageCount}/24 pages present; one H1 each; titles and descriptions unique; canonical, reciprocal hreflang (en/ar/fr/x-default) and language switcher checked`);

// 2. internal links resolve; no links to removed or held-back pages
const all = [...Object.values(PATHS).flatMap((b) => LANGS.map((l) => b[l])), '/404.html'];
const removed = /\/(journal|wedding-and-formalwear|restoration|mariage-ceremonie|restauration|gifts|cadeaux)\b/;
for (const u of all) {
  const f = u.endsWith('.html') ? u : fileFor(u);
  const h = read(f);
  for (const m of h.matchAll(/(?:href|src|srcset|poster)="(\/[^"#?]*)/g)) {
    const target = m[1];
    if (removed.test(target)) fail(`${u}: links to removed page ${target}`);
    const p = target.endsWith('/') ? path.join(target, 'index.html') : target;
    if (!fs.existsSync(path.join(ROOT, p))) fail(`${u}: broken link ${target}`);
  }
  // in-page anchors
  for (const m of h.matchAll(/href="#([^"]+)"/g)) {
    if (!h.includes(`id="${m[1]}"`)) fail(`${u}: missing anchor #${m[1]}`);
  }
}
ok.push('All internal links, images, posters and anchors resolve; no links to removed pages or to Gifts');

// 3. copy rules: no Jbeil in running copy, banned words, exclamation marks
const banned = [/not just [^.]*it'?s/i, /\bpassion/i, /\bcrafted\b/i, /\belevat/i, /\bjourney\b/i, /bespoke experience/i, /\bseamless/i, /we pride ourselves/i];
for (const u of all) {
  const f = u.endsWith('.html') ? u : fileFor(u);
  const h = read(f);
  const fullText = visibleText(h);
  let text = fullText;
  // Allowed: the exact address line (EN) and its FR form.
  text = text.split('Blat, Jbeil (Byblos) District, Mount Lebanon, Lebanon').join('')
    .split('Blat, district de Jbeil (Byblos), Mont-Liban, Liban').join('')
    .split('Blat, caza de Jbeil (Byblos), Mont-Liban, Liban').join(''); // FR address as written in home-copy.md
  if (/Jbeil/i.test(text)) fail(`${u}: "Jbeil" in running copy`);
  const meta = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const metaCheck = meta.replace('Blat, Jbeil (Byblos) District', '').replace('district de Jbeil (Byblos)', '');
  if (/Jbeil/i.test(metaCheck)) fail(`${u}: "Jbeil" in meta description`);
  for (const b of banned) if (b.test(text)) fail(`${u}: banned phrase ${b}`);
  if (/[!！]/.test(text.replace(/<!--[\s\S]*?-->/g, ''))) fail(`${u}: exclamation mark in copy`);
  if (!u.endsWith('.html') && !/Blat|بلاط/.test(fullText)) fail(`${u}: Blat not visible`);
}
ok.push('No "Jbeil" in running copy (only the address line and structured data); no banned phrases; no exclamation marks; Blat visible on every page');

// 4. facts + structured data
const FACT_STRINGS = ['+961 3 128 413', 'info@younestailor.com', '@younestailormestita'];
for (const u of all.filter((x) => !x.endsWith('.html'))) {
  const h = read(fileFor(u));
  for (const s of FACT_STRINGS) if (!h.includes(s)) fail(`${u}: missing fact ${s}`);
  if (u.startsWith('/ar/') ? !h.includes('بلاط، قضاء جبيل، جبل لبنان، لبنان') : u.startsWith('/fr/') ? !h.includes('Blat, district de Jbeil (Byblos), Mont-Liban, Liban') : !h.includes('Blat, Jbeil (Byblos) District, Mount Lebanon, Lebanon')) fail(`${u}: address line missing`);
  const ld = (h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  let data;
  try { data = JSON.parse(ld); } catch (e) { fail(`${u}: JSON-LD does not parse`); continue; }
  const g = data['@graph'];
  const biz = g.find((n) => Array.isArray(n['@type']) && n['@type'].includes('LocalBusiness'));
  if (!biz) { fail(`${u}: no LocalBusiness`); continue; }
  if (JSON.stringify(biz['@type']) !== '["LocalBusiness","ProfessionalService"]') fail(`${u}: business @type`);
  if (biz['@id'] !== SITE + '/#business' || biz.name !== 'Younes Tailor' || biz.telephone !== '+9613128413' || biz.email !== 'info@younestailor.com') fail(`${u}: business identity mismatch`);
  const oh = biz.openingHoursSpecification[0];
  if (oh.opens !== '09:00' || oh.closes !== '19:00' || oh.dayOfWeek.length !== 6 || oh.dayOfWeek.includes('Sunday')) fail(`${u}: hours mismatch`);
  if (biz.makesOffer.length !== 4) fail(`${u}: expected 4 Service offers`);
  const flat = JSON.stringify(data);
  if (/aggregateRating|"review"|"price"|priceRange|"rating"/i.test(flat)) fail(`${u}: rating/review/price in structured data`);
}
ok.push('Business identity identical on all 24 pages (@type ["LocalBusiness","ProfessionalService"], name, phone, email, hours); 4 Service entries; JSON-LD parses; no ratings, reviews or prices; NAP and address line visible on every page');

// 5. sitemap
const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== 24) fail(`sitemap has ${locs.length} URLs`);
if (locs.some((l) => removed.test(l))) fail('sitemap lists a removed URL');
ok.push(`sitemap.xml: ${locs.length} URLs with hreflang alternates, none removed`);

// 6. redirects: launch rules present and specific rules above catch-alls
const rd = read('_redirects').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const idx = (from) => rd.findIndex((l) => l.split(/\s+/)[0] === from);
for (const pre of ['', '/ar', '/fr']) {
  const catchAll = idx(`${pre}/journal/*`);
  if (catchAll < 0) fail(`missing ${pre}/journal/*`);
  rd.forEach((l, i) => { const from = l.split(/\s+/)[0]; if (from.startsWith(`${pre}/journal/`) && from !== `${pre}/journal/*` && i > catchAll) fail(`${from} sits below the catch-all`); });
}
for (const old of ['/our-story', '/services/made-to-measure', '/fr/services/sur-mesure']) if (idx(old) < 0) fail(`existing redirect ${old} lost`);
const BLOCK = ['/CLAUDE.md', '/docs/*', '/src/*'];
BLOCK.forEach((p, i) => { const l = rd[i] || ''; const [from, to, code] = l.split(/\s+/); if (from !== p || to !== '/404.html' || code !== '404!') fail(`internal path not blocked at top of _redirects: ${p}`); });
const moves = rd.filter((l) => !BLOCK.includes(l.split(/\s+/)[0]));
moves.forEach((l) => { const [, to, code] = l.split(/\s+/); if (code !== '301!') fail(`redirect not 301!: ${l}`); if (!all.includes(to)) fail(`redirect target not a live page: ${l}`); });
ok.push(`_redirects: CLAUDE.md, docs/ and src/ forced to 404 at the top; ${moves.length} moves, all 301! to live pages; existing rules kept; specific journal rules above catch-alls`);

// Round-1: unconfirmed claims must be gone from every generated page and llms.txt
const claims = [/saved design/i, /approve/i, /on a piece/i, /last batch/i, /digitised design/i, /motif enregistré/i, /validez le visuel|visuel validé|validation du visuel/i, /sur une pièce/i, /série précédente/i, /commandes? répétée/i, /vierge/i, /pièce unique/i, /التصميم المحفوظ/, /توافقون/, /الموافقة/, /على قطعة/, /الدفعة السابقة/, /تصميمكم الرقمي/, /الطلبات المتكرّرة/, /طلبات متكرّرة/];
const claimFiles = [...all.map((u) => (u.endsWith('.html') ? u : fileFor(u))), 'llms.txt'];
for (const f of claimFiles) { const t = read(f); for (const c of claims) if (c.test(t)) fail(`${f}: unconfirmed claim ${c}`); }
ok.push(`Removed claims: no matches for ${claims.length} EN/FR/AR patterns (saved design, approve, on a piece, last batch, repeat orders, vierge, pièce unique…) in ${claimFiles.length} files`);

// 7. contrast of every text colour pair used (Decision 03 look, all pages): cream ground, navy moments, tints
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
const lum = (h) => { const [r, g, b] = hex(h); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const mix = (fg, bg, a) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(fg.slice(i, i + 2), 16) * a + parseInt(bg.slice(i, i + 2), 16) * (1 - a)).toString(16).padStart(2, '0')).join('');
const CREAM = '#EEE8DA', INK = '#0B1120', NAVY = '#1F305D', INK2 = '#4A5266', GOLDTXT = '#7A5E2E', GOLD = '#CDB88A', MUTED = '#A9B0BD';
const panelBg = mix(NAVY, CREAM, 0.05);                 // .section--panel
const cardBg = mix(NAVY, CREAM, 0.06);                  // .card, hours/visit panels
const cardHover = mix(NAVY, CREAM, 0.1);                // .card:hover
const cardInPanel = mix('#FFFFFF', panelBg, 0.5);       // .section--panel .card
const chipBg = mix(NAVY, CREAM, 0.07);                  // .chips li
const fieldBg = mix('#FFFFFF', CREAM, 0.55);            // inputs
const asideBg = mix(INK, NAVY, 0.35);                   // .aside-box on navy
const sitePairs = [
  ['ink on cream', INK, CREAM], ['secondary #4A5266 on cream', INK2, CREAM], ['dark gold #7A5E2E on cream', GOLDTXT, CREAM],
  ['ink on tinted section', INK, panelBg], ['secondary on tinted section', INK2, panelBg], ['dark gold on tinted section', GOLDTXT, panelBg],
  ['ink on card', INK, cardBg], ['secondary on card', INK2, cardBg], ['secondary on card hover', INK2, cardHover],
  ['ink on card in tinted section', INK, cardInPanel], ['secondary on card in tinted section', INK2, cardInPanel],
  ['ink on chip', INK, chipBg], ['ink on form field', INK, fieldBg], ['secondary on form field', INK2, fieldBg],
  ['cream on navy #1F305D', CREAM, NAVY], ['#A9B0BD on navy', MUTED, NAVY], ['gold on navy', GOLD, NAVY],
  ['cream on aside box', CREAM, asideBg], ['#A9B0BD on aside box', MUTED, asideBg],
  ['cream on midnight', CREAM, INK], ['#A9B0BD on midnight', MUTED, INK], ['gold on midnight', GOLD, INK],
  ['button: cream on navy', CREAM, NAVY], ['button: ink on cream', INK, CREAM], ['button hover: ink on white', INK, '#FFFFFF'],
];
const siteRows = sitePairs.map(([name, f, b]) => { const r = ratio(f, b); if (r < 4.5) fail(`contrast ${name} = ${r.toFixed(2)}`); return `${name}: ${r.toFixed(2)}:1`; });
const fieldBorder = ratio(INK2, fieldBg); siteRows.push(`field border #4A5266 on field (non-text, needs 3:1): ${fieldBorder.toFixed(2)}:1`);
if (fieldBorder < 3) fail('field border contrast');
ok.push('Contrast, all pages (all ≥ 4.5:1):\n    ' + siteRows.join('\n    '));

// 8. body size and scoping: every page inlines the site CSS; the thread and marquee script stays on Home
const scss = read('css/site.css');
if (!/body \{[^}]*font-size: 17px/.test(scss)) fail('body font-size is not 17px');
const sSmall = [...scss.matchAll(/font(?:-size)?:[^;]*?(\d+)px/g)].map((m) => +m[1]).filter((n) => n < 12);
if (sSmall.length) fail(`font sizes under 12px: ${sSmall}`);
for (const [k, b] of Object.entries(PATHS)) for (const l of LANGS) {
  const h = read(fileFor(b[l]));
  if (!/<style>[^<]*\.p-hero/.test(h) || /href="\/css\//.test(h)) fail(`${b[l]}: site CSS not inlined`);
  if (k === 'home' ? !(h.includes('home.js') && h.includes('<svg class="thread"') && h.includes('data-marquee>')) : (h.includes('home.js') || h.includes('<svg class="thread"'))) fail(`${b[l]}: thread/marquee scoping wrong`);
}
const nf = read('404.html'); if (!/<style>[^<]*\.p-hero/.test(nf) || /href="\/css\//.test(nf)) fail('404.html: site CSS not inlined');
ok.push('Body text 17px (AR 18px); smallest label 12px (logo lockup caption). All 24 pages and 404.html use the Decision 03 look (inlined CSS); thread + marquee on the 3 Home pages only');


// Home copy: every cell of docs/decisions/home-copy.md must appear verbatim on the rendered Home page.
{
  const md = read('docs/decisions/home-copy.md').split(/\r?\n/);
  const norm = (t) => t.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
  const pages = { 1: read('index.html'), 2: read('ar/index.html'), 3: read('fr/index.html') };
  const vis = {}; const meta = {};
  for (const [k, h] of Object.entries(pages)) {
    vis[k] = norm(visibleText(h.slice(h.indexOf('<body')).replace(/<svg[\s\S]*?<\/svg>/g, ' ')));
    meta[k] = { title: (h.match(/<title>([^<]*)<\/title>/) || [])[1], desc: (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] };
  }
  const dec = (t) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  let cells = 0; const missing = [];
  let facts = false;
  for (const line of md) {
    if (/^## Confirmed facts/.test(line)) facts = true; else if (/^## /.test(line)) facts = false;
    if (facts || !/^\|/.test(line) || /^\|-/.test(line)) continue;
    const c = line.split('|').slice(1, -1).map(norm);
    if (c.length < 4 || /^(Element|Step)$/.test(c[0]) || (c[0] === '' && c[1] === 'English')) continue;
    for (const k of [1, 2, 3]) {
      const v = c[k]; if (!v) continue; cells++;
      if (/Page title/.test(c[0])) { if (dec(meta[k].title) !== v) missing.push(`${k}: title`); continue; }
      if (/Description/.test(c[0])) { if (dec(meta[k].desc) !== v) missing.push(`${k}: description`); continue; }
      let parts = v.split(' · ').map((x) => x.replace(/\s*·$/, '').trim()).filter(Boolean);
      if (/Field: service/.test(c[0])) { const m = parts[0].match(/^(.*?[?؟])\s*(.*)$/); parts = [m[1], m[2], ...parts.slice(1)]; }
      for (const p of parts) if (!vis[k].includes(p)) missing.push(`${['', 'en', 'ar', 'fr'][k]}: "${p}"`);
    }
  }
  if (missing.length) fail(`Home copy not verbatim: ${missing.slice(0, 12).join(' | ')}`);
  ok.push(`Home copy: all ${cells} EN/AR/FR cells of home-copy.md found verbatim on the rendered Home pages (titles and descriptions compared exactly)`);
}


// Home WhatsApp message: first line and line labels must match the templates in home-copy.md section 5.
{
  const md = read('docs/decisions/home-copy.md');
  const blocks = [...md.matchAll(/```\r?\n([\s\S]*?)```/g)].map((m) => m[1].trim().split(/\r?\n/)).filter((b) => b.length > 3);
  const files = { en: 'index.html', ar: 'ar/index.html', fr: 'fr/index.html' };
  const dec = (t) => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
  const langs = ['en', 'ar', 'fr'];
  if (blocks.length !== 3) fail(`home-copy.md: expected 3 WhatsApp templates, found ${blocks.length}`);
  blocks.forEach((b, i) => {
    const l = langs[i]; const h = read(files[l]);
    const intro = dec((h.match(/data-intro="([^"]*)"/) || [])[1] || '');
    if (intro !== b[0]) fail(`${l}: WhatsApp first line "${intro}" ≠ template "${b[0]}"`);
    const want = b.slice(1).map((x) => x.split(/\s*:\s*\{/)[0].trim());
    const form = h.slice(h.indexOf('data-enquiry'), h.indexOf('</form>'));
    const got = [...new Set([...form.matchAll(/data-label="([^"]*)"/g)].map((m) => dec(m[1])))];
    if (JSON.stringify(got) !== JSON.stringify(want)) fail(`${l}: WhatsApp labels ${JSON.stringify(got)} ≠ template ${JSON.stringify(want)}`);
  });
  ok.push('Home WhatsApp message: first line and the 7 line labels match the EN/AR/FR templates in home-copy.md, in order');
}


console.log('PASS:\n- ' + ok.join('\n- '));
if (fails.length) { console.log('\nFAIL:\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('\nAll local checks passed.');
