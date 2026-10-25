// Younes Tailor — static page generator for Launch 1.
// Run: node src/build.mjs
// Writes plain HTML files (index.html per URL), sitemap.xml and 404.html into the repo root.
// The generated files are committed; Netlify serves them as-is (no build step on Netlify).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FACTS, UI } from './content-ui.mjs';
import { PATHS, PARENT, ALT, PAGES } from './content-pages.mjs';
import { ICONS } from './icons.mjs';
import { renderHomePilot } from './home-pilot.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'ar', 'fr'];
const SITE = FACTS.site;
const LASTMOD = '2026-10-25';
const SERVICE_KEYS = ['alterations', 'repairs', 'embroidery', 'uniforms'];

// ── helpers ────────────────────────────────────────────────────────────────
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name, cls = '') => `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
const ltr = (s) => `<span class="ltr" dir="ltr">${esc(s)}</span>`;
const url = (key, lang) => PATHS[key][lang];
const abs = (key, lang) => SITE + PATHS[key][lang];
// Internal link spec: 'services#tailoring' → page key + hash.
const href = (spec, lang) => {
  const [key, hash] = spec.split('#');
  return url(key, lang) + (hash ? '#' + hash : '');
};
const two = (n) => String(n).padStart(2, '0');
let uid = 0;
const nextId = (p) => `${p}-${++uid}`;

const WORK = {
  lockstitch: { base: '/assets/work/machine-lockstitch', w: 1048, h: 1400 },
  overlock: { base: '/assets/work/machine-overlock', w: 1050, h: 1400 },
  storefront: { base: '/assets/work/storefront-visit', w: 1400, h: 840 },
};

function picture(key, lang, { eager = false, sizes = '(min-width: 880px) 40vw, 100vw' } = {}) {
  const m = WORK[key];
  const load = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<picture><source srcset="${m.base}.webp" type="image/webp"><img src="${m.base}.jpg" alt="${esc(ALT[key][lang])}" width="${m.w}" height="${m.h}" ${load} decoding="async" sizes="${sizes}"></picture>`;
}
function poster(n, lang, { eager = false } = {}) {
  const load = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<img src="/assets/media/machine-${two(n)}-poster.webp" alt="${esc(ALT.machine[lang])}" width="720" height="1280" ${load} decoding="async">`;
}
function video(n, lang, posterSrc) {
  const u = UI[lang];
  return `<figure class="media media--video">
<div class="frame frame--video">
<video data-video muted playsinline loop controls preload="none" width="720" height="1280" poster="${posterSrc || `/assets/media/machine-${two(n)}-poster.webp`}" aria-label="${esc(u.video.caption)}"><source src="/assets/media/machine-${two(n)}.mp4" type="video/mp4"></video>
<button class="video-toggle" type="button" data-video-toggle data-label-pause="${esc(u.video.pause)}" data-label-play="${esc(u.video.play)}" hidden>${icon('pause', 'i-pause')}${icon('play', 'i-play')}<span>${esc(u.video.pause)}</span></button>
</div>
<figcaption>${esc(u.video.caption)}</figcaption>
</figure>`;
}
function stillFigure(spec, lang, eager) {
  if (spec.image) return `<figure class="media"><div class="frame">${picture(spec.image, lang, { eager })}</div></figure>`;
  if (spec.video && eager) return `<figure class="media"><div class="frame">${poster(spec.video, lang, { eager: true })}</div></figure>`;
  if (spec.video) return video(spec.video, lang);
  return '';
}

const eyebrow = (t) => t ? `<p class="eyebrow">${esc(t)}</p>` : '';
const trio = (lang) => `<ul class="trio">${UI[lang].trio.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
const ctaButton = (page, lang, cls = 'btn btn--primary') =>
  `<a class="${cls}" href="#enquire" data-cta>${esc(page.ctaLabel)}</a>`;

// ── shared chrome ──────────────────────────────────────────────────────────
function langLinks(key, lang, cls) {
  return LANGS.filter((l) => l !== lang).map((l) =>
    `<a class="${cls}" href="${url(key, l)}" hreflang="${l}" lang="${l}">${esc(UI[l].langName)}</a>`).join('');
}

function header(key, lang, page) {
  const u = UI[lang];
  const navItems = [['services', u.nav.services], ['about', u.nav.about], ['visit', u.nav.visit]];
  const isCurrent = (k) => k === key || (k === 'services' && ['alterations', 'repairs', 'embroidery', 'uniforms'].includes(key));
  const links = navItems.map(([k, label]) =>
    `<li><a href="${url(k, lang)}"${isCurrent(k) ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`).join('');
  return `<a class="skip-link" href="#main">${esc(u.skip)}</a>
<header class="site-header" data-header>
<div class="container site-header__inner">
<a class="brand" href="${url('home', lang)}"><img src="/assets/logo/younes-signature-ivory.svg" alt="Younes Tailor — ${esc(u.home)}" width="132" height="51"></a>
<nav class="nav" aria-label="${esc(u.nav.services)} · ${esc(u.nav.about)} · ${esc(u.nav.visit)}"><ul>${links}</ul></nav>
<div class="site-header__end">
<div class="langs" aria-label="${esc(u.langLabel)}">${icon('globe')}${langLinks(key, lang, 'langs__link')}</div>
${ctaButton(page, lang, 'btn btn--primary btn--sm site-header__cta')}
<details class="menu" data-menu>
<summary class="menu__toggle">${icon('list', 'i-open')}${icon('x', 'i-close')}<span class="menu__open">${esc(u.menu)}</span><span class="menu__close">${esc(u.close)}</span></summary>
<div class="menu__panel">
<nav aria-label="${esc(u.menu)}"><ul class="menu__links">
<li><a href="${url('home', lang)}"${key === 'home' ? ' aria-current="page"' : ''}>${esc(u.home)}</a></li>
${navItems.map(([k, label]) => `<li><a href="${url(k, lang)}"${isCurrent(k) ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`).join('')}
</ul>
<ul class="menu__sub">
${SERVICE_KEYS.map((k) => `<li><a href="${url(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${esc(k === 'uniforms' ? u.services.uniforms : u.services[k])}</a></li>`).join('')}
</ul></nav>
${ctaButton(page, lang, 'btn btn--primary btn--block')}
<p class="menu__langs"><span>${esc(u.langLabel)}:</span> ${langLinks(key, lang, 'menu__lang')}</p>
</div>
</details>
</div>
</div>
</header>`;
}

function stickyBar(lang) {
  const u = UI[lang];
  return `<nav class="sticky-bar" aria-label="${esc(u.form.direct)}" data-sticky>
<a href="https://wa.me/${FACTS.wa}" rel="noopener">${icon('whatsapp-logo')}<span>${esc(u.sticky.wa)}</span></a>
<a href="tel:${FACTS.phoneE164}">${icon('phone')}<span>${esc(u.sticky.call)}</span></a>
<a href="${esc(FACTS.directions)}" rel="noopener">${icon('navigation-arrow')}<span>${esc(u.sticky.directions)}</span></a>
</nav>`;
}

function hoursList(lang, { table = false } = {}) {
  const u = UI[lang];
  const EN_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const rows = EN_DAYS.map((d, i) => {
    const val = i < 6 ? ltr('09:00–19:00') : esc(u.closed);
    return `<div class="hours__row" data-day="${d}"><dt>${esc(u.days[i])}</dt><dd>${val}</dd></div>`;
  }).join('');
  return `<dl class="hours${table ? ' hours--table' : ''}" data-hours>${rows}</dl>`;
}

function contactList(lang) {
  const u = UI[lang];
  return `<ul class="contact-list">
<li>${icon('map-pin')}<span><span class="contact-list__label">${esc(u.labels.address)}</span>${esc(u.addressLine)}</span></li>
<li>${icon('phone')}<span><span class="contact-list__label">${esc(u.labels.phone)}</span><a href="tel:${FACTS.phoneE164}">${ltr(FACTS.phoneDisplay)}</a></span></li>
<li>${icon('whatsapp-logo')}<span><span class="contact-list__label">${esc(u.labels.whatsapp)}</span><a href="https://wa.me/${FACTS.wa}" rel="noopener">${ltr(FACTS.phoneDisplay)}</a></span></li>
<li>${icon('envelope-simple')}<span><span class="contact-list__label">${esc(u.labels.email)}</span><a href="mailto:${FACTS.email}">${ltr(FACTS.email)}</a></span></li>
<li>${icon('instagram-logo')}<span><span class="contact-list__label">${esc(u.labels.instagram)}</span><a href="${FACTS.instagram}" rel="noopener">${ltr(FACTS.instagramHandle)}</a></span></li>
</ul>`;
}

function statusPill() {
  return `<p class="status" data-status hidden><span class="status__dot" aria-hidden="true"></span><span data-status-text></span></p>`;
}

function footer(key, lang) {
  const u = UI[lang];
  const pages = ['home', 'services', 'alterations', 'repairs', 'embroidery', 'uniforms', 'about', 'visit'];
  const label = (k) => k === 'home' ? u.home : k === 'services' ? u.nav.services : k === 'about' ? u.nav.about : k === 'visit' ? u.nav.visit : k === 'uniforms' ? u.services.uniforms : u.services[k];
  return `<footer class="site-footer">
<div class="container">
<div class="site-footer__grid">
<div class="lockup">
<img src="/assets/logo/younes-bilingual-ivory.svg" alt="Younes Tailor — يونس" width="180" height="137" loading="lazy">
<span class="lockup__caption" lang="en" dir="ltr">Tailor · Byblos</span>
</div>
<div>
<h2 class="site-footer__h">${esc(u.footer.address)}</h2>
<p>${esc(u.addressLine)}</p>
<p><a class="textlink" href="${esc(FACTS.directions)}" rel="noopener">${esc(u.visitBlock.directions)}</a></p>
</div>
<div>
<h2 class="site-footer__h">${esc(u.footer.hours)}</h2>
<p>${esc(u.hoursShort)}</p>
<h2 class="site-footer__h">${esc(u.footer.contact)}</h2>
<p><a href="tel:${FACTS.phoneE164}">${ltr(FACTS.phoneDisplay)}</a><br><a href="mailto:${FACTS.email}">${ltr(FACTS.email)}</a><br><a href="${FACTS.instagram}" rel="noopener">${ltr(FACTS.instagramHandle)}</a></p>
</div>
<nav aria-label="${esc(u.footer.pages)}">
<h2 class="site-footer__h">${esc(u.footer.pages)}</h2>
<ul class="site-footer__links">${pages.map((k) => `<li><a href="${url(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${esc(label(k))}</a></li>`).join('')}</ul>
</nav>
</div>
<hr class="rule-gold">
<div class="site-footer__base">
<p>© 2026 ${esc(u.footer.rights)}</p>
<p class="site-footer__langs">${LANGS.map((l) => l === lang ? `<span aria-current="true" lang="${l}">${esc(UI[l].langName)}</span>` : `<a href="${url(key, l)}" hreflang="${l}" lang="${l}">${esc(UI[l].langName)}</a>`).join('<span aria-hidden="true"> · </span>')}</p>
</div>
</div>
</footer>`;
}

function breadcrumbs(key, lang) {
  if (key === 'home') return '';
  const chain = [];
  for (let k = key; k; k = PARENT[k]) chain.unshift(k);
  const u = UI[lang];
  const name = (k) => k === 'home' ? u.home : PAGES[k][lang].sections[0].h1;
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${chain.map((k) =>
    k === key ? `<li><span aria-current="page">${esc(name(k))}</span></li>` : `<li><a href="${url(k, lang)}">${esc(name(k))}</a></li>`).join('')}</ol></nav>`;
}

// ── sections ───────────────────────────────────────────────────────────────
function sHero(s, key, lang, page) {
  return `<section class="hero band-night">
<div class="container hero__grid">
<div class="hero__copy">
${eyebrow(s.eyebrow)}
<h1>${esc(s.h1)}</h1>
<p class="lede">${esc(s.lede)}</p>
<div class="btn-row">${s.buttons.map((b) => `<a class="btn btn--branch" href="${href(b.href, lang)}">${icon(b.icon)}<span>${esc(b.label)}</span>${icon('arrow-right', 'i-arrow')}</a>`).join('')}</div>
<div class="hero__meta">${statusPill()}<p>${esc(UI[lang].hoursShort)}</p></div>
</div>
${stillFigure({ image: s.image }, lang, true)}
</div>
</section>`;
}

function sPagehead(s, key, lang, page) {
  const media = s.image || s.video ? stillFigure(s, lang, true) : '';
  return `<section class="pagehead band-night${media ? ' pagehead--media' : ''}">
<div class="container pagehead__grid">
<div class="pagehead__copy">
${breadcrumbs(key, lang)}
${eyebrow(s.eyebrow)}
<h1>${esc(s.h1)}</h1>
<p class="lede">${esc(s.lede)}</p>
<div class="btn-row">${ctaButton(page, lang)}<a class="btn btn--ghost" href="https://wa.me/${FACTS.wa}" rel="noopener">${icon('whatsapp-logo')}<span>${esc(UI[lang].form.waDirect)}</span></a></div>
${s.trio ? trio(lang) : ''}
</div>
${media}
</div>
</section>`;
}

function card(c, lang) {
  const u = UI[lang];
  const title = c.key === 'uniforms' ? u.services.uniforms : u.services[c.key];
  const ic = { alterations: 'scissors', repairs: 'needle', embroidery: 't-shirt', uniforms: 'users-three' }[c.key];
  return `<article class="card">
${icon(ic, 'card__icon')}
<h3><a class="card__link" href="${url(c.key, lang)}">${esc(title)}</a></h3>
<p>${esc(c.text)}</p>
${c.bullets ? `<ul class="dots">${c.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
<span class="textlink" aria-hidden="true">${esc(u.seeService)} ${icon('arrow-right', 'i-arrow')}</span>
</article>`;
}

function sGroups(s, key, lang, page) {
  const head = s.h2 ? `<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>` : '';
  return `<section class="section"${s.id ? ` id="${s.id}"` : ''}>
<div class="container">
${head}
<div class="groups">
${s.groups.map((g) => `<div class="group" id="${g.id}">
<div class="group__head"><h2 class="group__title">${esc(g.title)}</h2>${g.intro ? `<p>${esc(g.intro)}</p>` : ''}</div>
<div class="cards">${g.cards.map((c) => card(c, lang)).join('')}</div>
${g.trio ? trio(lang) : ''}
</div>`).join('')}
</div>
${key === 'services' ? `<div class="section-cta">${ctaButton(page, lang)}</div>` : ''}
</div>
</section>`;
}

function sProcess(s, key, lang, page) {
  const u = UI[lang];
  const base = s.which === 'tailoring' ? u.processTailoring : u.processEmbroidery;
  const steps = base.steps.map((st, i) => (s.override && s.override[i]) || st);
  const media = s.media ? stillFigure(s.media, lang, false) : '';
  const isEmb = s.which === 'embroidery';
  return `<section class="section${s.which === 'tailoring' ? ' section--panel' : ''}" id="process-${s.which}">
<div class="container${media ? ' split' : ''}">
<div>
<div class="section-head">${eyebrow(base.eyebrow)}<h2>${esc(base.h2)}</h2></div>
<ol class="steps">${steps.map(([h, p], i) => `<li class="step"><span class="step__n" aria-hidden="true">${two(i + 1)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
${s.trio ? trio(lang) : ''}
${key === 'home' ? `<p class="section-cta"><a class="btn btn--ghost" href="${url(isEmb ? 'embroidery' : 'alterations', lang)}">${esc(isEmb ? u.services.embroidery : u.services.alterations)} ${icon('arrow-right', 'i-arrow')}</a></p>` : `<p class="section-cta">${ctaButton(page, lang)}</p>`}
</div>
${media}
</div>
</section>`;
}

function sList(s, key, lang) {
  return `<section class="section">
<div class="container narrow">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2>${s.intro ? `<p>${esc(s.intro)}</p>` : ''}</div>
<ul class="checks">${s.items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}
</div>
</section>`;
}

function asideBox(a) {
  return `<aside class="aside-box"><h3>${esc(a.h)}</h3><ul class="dots">${a.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></aside>`;
}

function sTimeline(s, key, lang, page) {
  return `<section class="section band-navy" id="${s.id}">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2><p>${esc(s.intro)}</p></div>
<div class="split split--aside">
<div>
<h3 class="subhead">${esc(s.stepsTitle)}</h3>
<ol class="timeline">${s.steps.map(([when, h, p]) => `<li><p class="timeline__when">${esc(when)}</p><h4>${esc(h)}</h4><p>${esc(p)}</p></li>`).join('')}</ol>
<p class="note">${esc(s.after)}</p>
</div>
${asideBox(s.aside)}
</div>
</div>
</section>`;
}

function sCompare(s) {
  return `<section class="section">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<div class="compare">
<div class="compare__col"><h3>${esc(s.good.h)}</h3><ul class="checks">${s.good.items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul></div>
<div class="compare__col compare__col--muted"><h3>${esc(s.bad.h)}</h3><ul class="crosses">${s.bad.items.map((i) => `<li>${icon('x')}<span>${esc(i)}</span></li>`).join('')}</ul></div>
</div>
<p class="note">${esc(s.after)}</p>
</div>
</section>`;
}

function sRestoration(s) {
  return `<section class="section band-navy" id="${s.id}">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2><p>${esc(s.intro)}</p></div>
<div class="split split--aside">
<div>
<ul class="checks">${s.items.map((i) => `<li>${icon('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
<p class="note">${esc(s.note)}</p>
</div>
${asideBox(s.aside)}
</div>
</div>
</section>`;
}

function sChips(s) {
  return `<section class="section">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<ul class="chips">${s.items.map(([ic, label]) => `<li>${icon(ic)}<span>${esc(label)}</span></li>`).join('')}</ul>
${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}
</div>
</section>`;
}

function sTwocol(s) {
  return `<section class="section section--panel">
<div class="container twocol">
${s.cols.map((c) => `<div>${eyebrow(c.eyebrow)}<h2>${esc(c.h2)}</h2><p>${esc(c.p)}</p></div>`).join('')}
</div>
</section>`;
}

function sVideos(s, key, lang) {
  return `<section class="section">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<div class="videos">${s.clips.map((n) => video(n, lang)).join('')}</div>
</div>
</section>`;
}

function sProse(s) {
  return `<section class="section">
<div class="container narrow">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<div class="prose">${s.paras.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
</div>
</section>`;
}

function sValues(s) {
  return `<section class="section section--panel">
<div class="container">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<ul class="values">${s.items.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ul>
</div>
</section>`;
}

function sVisit(s, key, lang) {
  const u = UI[lang];
  return `<section class="section band-navy" id="visit">
<div class="container split">
<div>
<div class="section-head">${eyebrow(u.visitBlock.eyebrow)}<h2>${esc(u.visitBlock.h2)}</h2><p>${esc(u.visitBlock.p)}</p></div>
${statusPill()}
${contactList(lang)}
<div class="btn-row"><a class="btn btn--primary" href="${esc(FACTS.directions)}" rel="noopener">${icon('navigation-arrow')}<span>${esc(u.visitBlock.directions)}</span></a><a class="btn btn--ghost" href="${url('visit', lang)}">${esc(u.visitBlock.more)} ${icon('arrow-right', 'i-arrow')}</a></div>
</div>
<div class="panel"><h3 class="subhead">${esc(u.footer.hours)}</h3>${hoursList(lang)}</div>
</div>
</section>`;
}

function sVisitFull(s, key, lang) {
  const u = UI[lang];
  return `<section class="section">
<div class="container split">
<div>
${statusPill()}
${contactList(lang)}
<div class="btn-row"><a class="btn btn--primary" href="${esc(FACTS.directions)}" rel="noopener">${icon('navigation-arrow')}<span>${esc(u.visitBlock.directions)}</span></a><a class="btn btn--ghost" href="https://wa.me/${FACTS.wa}" rel="noopener">${icon('whatsapp-logo')}<span>${esc(u.form.waDirect)}</span></a></div>
<div class="panel"><h2 class="subhead">${esc(u.footer.hours)}</h2>${hoursList(lang, { table: true })}</div>
</div>
<div>
<div class="map" data-map data-src="${esc(FACTS.mapEmbed)}" data-title="${esc(u.map.title)}">
<div class="frame">${picture('storefront', lang, { sizes: '(min-width: 880px) 45vw, 100vw' })}</div>
<p class="map__actions"><button class="btn btn--ghost" type="button" data-map-load>${icon('map-trifold')}<span>${esc(u.map.load)}</span></button> <span class="map__note">${esc(u.map.note)}</span></p>
</div>
</div>
</div>
</section>
<section class="section section--panel">
<div class="container twocol">
<div><h2>${esc(s.areasTitle)}</h2><ul class="chips chips--plain">${s.areas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
<div><h2>${esc(s.reviews.h)}</h2><p>${esc(s.reviews.p)}</p><p><a class="textlink" href="${FACTS.gbp}" rel="noopener">${esc(s.reviews.link)} ${icon('arrow-right', 'i-arrow')}</a></p></div>
</div>
</section>`;
}

function sFaq(s) {
  return `<section class="section">
<div class="container narrow">
<div class="section-head">${eyebrow(s.eyebrow)}<h2>${esc(s.h2)}</h2></div>
<div class="faq">${s.items.map(([q, a]) => `<details class="faq__item"><summary>${esc(q)}</summary><div class="faq__a"><p>${esc(a)}</p></div></details>`).join('')}</div>
</div>
</section>`;
}

function sEnquire(key, lang, page) {
  const u = UI[lang]; const f = u.form;
  const svc = page.cta === 'general' ? 'other' : page.cta;
  const branchOf = (s) => (s === 'alterations' || s === 'repairs') ? 'tailoring' : (s === 'embroidery' || s === 'uniforms') ? 'embroidery' : 'other';
  const b = branchOf(svc);
  const hid = (want) => (b === want ? '' : ' hidden disabled');
  const opt = (v, label) => `<option value="${v}" data-branch="${branchOf(v)}"${v === svc ? ' selected' : ''}>${esc(label)}</option>`;
  const h2 = page.cta === 'general' ? f.h2 : page.ctaLabel;
  return `<section class="section enquire" id="enquire" aria-labelledby="enquire-h">
<div class="container split split--form">
<div>
${eyebrow(f.eyebrow)}
<h2 id="enquire-h">${esc(h2)}</h2>
<p>${esc(f.intro)}</p>
<form class="form" data-enquiry data-wa="${FACTS.wa}" data-intro="${esc(f.msgIntro)}" data-yes="${esc(f.yes)}" data-sep="${lang === 'ar' ? '، ' : ', '}" novalidate>
<div class="field">
<label for="f-service">${esc(f.service)}</label>
<select id="f-service" name="service" data-label="${esc(f.service)}">
${opt('alterations', u.services.alterations)}${opt('repairs', u.services.repairs)}${opt('embroidery', u.services.embroidery)}${opt('uniforms', u.services.uniformsLong)}${opt('other', u.services.other)}
</select>
</div>
<fieldset class="branch" data-branch="tailoring"${hid('tailoring')}>
<legend class="sr-only">${esc(u.groups.tailoring)}</legend>
<div class="field"><label for="f-garment">${esc(f.garment)}</label><input id="f-garment" name="garment" type="text" autocomplete="off" aria-describedby="f-garment-hint" data-label="${esc(f.garment)}"><p class="hint" id="f-garment-hint">${esc(f.garmentHint)}</p></div>
<div class="field"><label for="f-job">${esc(f.job)}</label><textarea id="f-job" name="job" rows="3" aria-describedby="f-job-hint" data-label="${esc(f.job)}"></textarea><p class="hint" id="f-job-hint">${esc(f.jobHint)}</p></div>
<div class="field"><label for="f-deadline-t">${esc(f.deadline)}</label><input id="f-deadline-t" name="deadline" type="text" autocomplete="off" data-label="${esc(f.deadline.replace(/ \(.*\)| ؟.*$/, ''))}"></div>
</fieldset>
<fieldset class="branch" data-branch="embroidery"${hid('embroidery')}>
<legend class="sr-only">${esc(u.groups.embroidery)}</legend>
<div class="field"><label for="f-item">${esc(f.item)}</label><select id="f-item" name="item" data-label="${esc(f.item)}"><option value=""></option>${f.items.map((i) => `<option>${esc(i)}</option>`).join('')}</select></div>
<div class="field field--qty"><label for="f-qty">${esc(f.quantity)}</label><input id="f-qty" name="quantity" type="text" inputmode="numeric" autocomplete="off" data-label="${esc(f.quantity)}">
<label class="check"><input type="checkbox" name="qtyunsure" data-unsure data-label="${esc(f.quantity)}" value="${esc(f.notSure)}"><span>${esc(f.notSure)}</span></label></div>
<fieldset class="field field--choice"><legend>${esc(f.blank)}</legend>
<label class="check"><input type="radio" name="blank" value="${esc(f.blankSupply)}" data-label="${esc(f.blank)}"><span>${esc(f.blankSupply)}</span></label>
<label class="check"><input type="radio" name="blank" value="${esc(f.blankOwn)}" data-label="${esc(f.blank)}"><span>${esc(f.blankOwn)}</span></label>
</fieldset>
<fieldset class="field field--choice" data-only="uniforms"${svc === 'uniforms' ? '' : ' hidden disabled'}><legend>${esc(f.placement)}</legend>
${f.placements.map((p) => `<label class="check"><input type="checkbox" name="placement" value="${esc(p)}" data-label="${esc(f.placement)}"><span>${esc(p)}</span></label>`).join('')}
</fieldset>
<div class="field"><label for="f-stitch">${esc(f.stitch)}</label><input id="f-stitch" name="stitch" type="text" autocomplete="off" aria-describedby="f-stitch-hint" data-label="${esc(f.stitch)}"><p class="hint" id="f-stitch-hint">${esc(f.stitchHint)}</p></div>
<label class="check"><input type="checkbox" name="artwork" value="${esc(f.artworkHelp)}" data-label="${esc(f.artworkHelp)}" data-flag><span>${esc(f.artworkHelp)}</span></label>
<div class="field"><label for="f-deadline-e">${esc(f.deadline)}</label><input id="f-deadline-e" name="deadline" type="text" autocomplete="off" data-label="${esc(f.deadline.replace(/ \(.*\)| ؟.*$/, ''))}"></div>
</fieldset>
<fieldset class="branch" data-branch="other"${hid('other')}>
<legend class="sr-only">${esc(f.message)}</legend>
<div class="field"><label for="f-msg">${esc(f.message)}</label><textarea id="f-msg" name="message" rows="4" data-label="${esc(f.message)}"></textarea></div>
</fieldset>
<div class="field"><label for="f-name">${esc(f.name)}</label><input id="f-name" name="name" type="text" autocomplete="name" data-label="${esc(f.name.replace(/ \(.*\)/, ''))}"></div>
<p class="form__note" data-note="tailoring"${b === 'tailoring' ? '' : ' hidden'}>${esc(f.noteTailoring)}</p>
<p class="form__note" data-note="embroidery"${b === 'embroidery' ? '' : ' hidden'}>${esc(f.noteEmbroidery)}</p>
<button class="btn btn--primary btn--block" type="submit">${icon('whatsapp-logo')}<span>${esc(f.submit)}</span></button>
<p class="form__fallback" data-wa-fallback role="status" hidden>${esc(f.waFallback)} <a href="https://wa.me/${FACTS.wa}" target="_blank" rel="noopener">${esc(f.waFallbackLink)}</a></p>
</form>
</div>
<aside class="panel direct">
<h3>${esc(f.direct)}</h3>
<p>${esc(f.directText)}</p>
<p class="btn-col"><a class="btn btn--ghost btn--block" href="tel:${FACTS.phoneE164}">${icon('phone')}<span>${esc(f.call)} ${ltr(FACTS.phoneDisplay)}</span></a>
<a class="btn btn--ghost btn--block" href="https://wa.me/${FACTS.wa}?text=${encodeURIComponent(f.waHello)}" rel="noopener">${icon('whatsapp-logo')}<span>${esc(f.waDirect)}</span></a></p>
<p class="direct__hours">${esc(u.hoursShort)}</p>
</aside>
</div>
</section>`;
}

const RENDER = {
  hero: sHero, pagehead: sPagehead, groups: sGroups, process: sProcess, list: sList,
  timeline: sTimeline, compare: sCompare, restoration: sRestoration, chips: sChips,
  twocol: sTwocol, videos: sVideos, prose: sProse, values: sValues, visit: sVisit,
  visitfull: sVisitFull, faq: sFaq,
};

// ── structured data ────────────────────────────────────────────────────────
function business(lang) {
  const u = UI[lang];
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': SITE + '/#business',
    name: FACTS.name,
    description: 'Tailoring and embroidery in Blat, Byblos: alterations, repairs, embroidery and uniform embroidery.',
    url: SITE + '/',
    telephone: FACTS.phoneE164,
    email: FACTS.email,
    image: SITE + '/assets/og-card.png',
    logo: SITE + '/assets/icon-512.png',
    address: { '@type': 'PostalAddress', addressLocality: 'Blat', addressRegion: 'Mount Lebanon', addressCountry: 'LB' },
    geo: { '@type': 'GeoCoordinates', latitude: FACTS.geo.lat, longitude: FACTS.geo.lng },
    hasMap: FACTS.gbp,
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' }],
    areaServed: ['Blat', 'Jbeil (Byblos)', 'Amchit', 'Halat', 'Fidar', 'Kfaryassine', 'Mastita', 'Mount Lebanon'].map((n) => ({ '@type': 'Place', name: n })),
    knowsLanguage: ['ar', 'fr', 'en'],
    foundingDate: '2025',
    knowsAbout: ['clothing alterations', 'garment repairs', 'wedding dress alterations', 'garment restoration', 'embroidery', 'logo embroidery', 'cap embroidery', 'uniform embroidery'],
    makesOffer: SERVICE_KEYS.map((k) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', '@id': abs(k, lang) + '#service', name: u.schemaServices[k], url: abs(k, lang) },
    })),
    sameAs: [FACTS.gbp, FACTS.instagram],
  };
}

function jsonld(key, lang, page) {
  const u = UI[lang];
  const pageUrl = abs(key, lang);
  const chain = [];
  for (let k = key; k; k = PARENT[k]) chain.unshift(k);
  const graph = [
    business(lang),
    { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: FACTS.name, publisher: { '@id': SITE + '/#business' } },
    {
      '@type': 'WebPage', '@id': pageUrl + '#webpage', url: pageUrl, name: page.title, description: page.description,
      inLanguage: lang, isPartOf: { '@id': SITE + '/#website' }, about: { '@id': SITE + '/#business' }, breadcrumb: { '@id': pageUrl + '#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList', '@id': pageUrl + '#breadcrumb',
      itemListElement: chain.map((k, i) => ({ '@type': 'ListItem', position: i + 1, name: k === 'home' ? u.home : PAGES[k][lang].sections[0].h1, item: abs(k, lang) })),
    },
  ];
  if (SERVICE_KEYS.includes(key)) {
    graph.push({
      '@type': 'Service', '@id': pageUrl + '#service', name: u.schemaServices[key], description: page.description,
      url: pageUrl, provider: { '@id': SITE + '/#business' }, areaServed: { '@type': 'Place', name: 'Jbeil (Byblos) District, Mount Lebanon' },
      serviceType: u.schemaServices[key],
    });
  }
  const faq = page.sections.find((s) => s.t === 'faq');
  if (faq) {
    graph.push({
      '@type': 'FAQPage', '@id': pageUrl + '#faq', inLanguage: lang,
      mainEntity: faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

function config(lang) {
  const u = UI[lang];
  return JSON.stringify({ tz: 'Asia/Beirut', hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' }], s: u.status });
}

// Home pilot CSS is inlined (fonts + home.css), read once per build.
const readCss = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').trim();
const PILOT_CSS = { latin: readCss('css/fonts-home-latin.css') + '\n' + readCss('css/home.css'), ar: readCss('css/fonts-home-arabic.css') + '\n' + readCss('css/home.css') };

// ── page ───────────────────────────────────────────────────────────────────
function head(key, lang, page) {
  const u = UI[lang];
  const pageUrl = abs(key, lang);
  const pilot = key === 'home';
  const fonts = pilot ? (lang === 'ar'
    ? `<link rel="preload" href="/assets/fonts/plexarabic-arabic-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/arefruqaa-arabic-700.woff2" as="font" type="font/woff2" crossorigin>`
    : `<link rel="preload" href="/assets/fonts/instrumentserif-latin-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/manrope-latin-400.woff2" as="font" type="font/woff2" crossorigin>`)
    : lang === 'ar'
    ? `<link rel="preload" href="/assets/fonts/plexarabic-arabic-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/amiri-arabic-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/css/fonts-arabic.css">`
    : `<link rel="preload" href="/assets/fonts/playfair-latin-400i.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/montserrat-latin-400.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/montserrat-latin-600.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/css/fonts-latin.css">`;
  const heroImg = pilot ? `<link rel="preload" href="/assets/media/machine-01-poster-540.webp" as="image" type="image/webp" fetchpriority="high">` : page.sections[0].image ? `<link rel="preload" href="${WORK[page.sections[0].image].base}.webp" as="image" type="image/webp">`
    : page.sections[0].video ? `<link rel="preload" href="/assets/media/machine-${two(page.sections[0].video)}-poster.webp" as="image" type="image/webp">` : '';
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(key, l)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${abs(key, 'en')}">`;
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${pageUrl}">
${alternates}
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#0B1120">
<meta name="color-scheme" content="${pilot ? 'light' : 'dark'}">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website"><meta property="og:site_name" content="Younes Tailor"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${pageUrl}"><meta property="og:image" content="${SITE}/assets/og-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Younes Tailor — ${esc(u.place)}"><meta property="og:locale" content="${u.locale}">${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${UI[l].locale}">`).join('')}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="icon" href="/assets/icon-192.png" sizes="192x192" type="image/png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest">
${pilot ? heroImg + '\n' + fonts : fonts + '\n' + heroImg}
${pilot ? `<style>${PILOT_CSS[lang === 'ar' ? 'ar' : 'latin']}</style>` : '<link rel="stylesheet" href="/css/styles.css">'}
<script type="application/ld+json">${jsonld(key, lang, page)}</script>
<script id="yt-config" type="application/json">${config(lang)}</script>
<script src="/js/main.js" defer></script>${pilot ? '\n<script src="/js/home.js" defer></script>' : ''}`;
}

function renderPage(key, lang) {
  uid = 0;
  const page = PAGES[key][lang];
  page.cta = PAGES[key].cta;
  const u = UI[lang];
  const body = key === 'home'
    ? renderHomePilot(lang, page, { esc, icon, url, UI, FACTS, statusPill, contactList, hoursList, sFaq, sEnquire, video, picture, poster, trio })
    : page.sections.map((s) => RENDER[s.t](s, key, lang, page)).join('\n');
  return `<!doctype html>
<html lang="${lang}" dir="${u.dir}">
<head>
${head(key, lang, page)}
</head>
<body class="page-${key} lang-${lang}${key === 'home' ? ' pilot' : ''}">
${header(key, lang, page)}
<main id="main">
${body}
${key === 'home' ? '' : sEnquire(key, lang, page)}
</main>
${footer(key, lang)}
${stickyBar(lang)}
</body>
</html>
`;
}

function render404() {
  const blocks = LANGS.map((l) => {
    const u = UI[l];
    return `<div class="nf__block" lang="${l}" dir="${u.dir}"><h${l === 'en' ? '1' : '2'}>${esc(u.notFound.title)}</h${l === 'en' ? '1' : '2'}><p>${esc(u.notFound.p)}</p><p class="btn-row"><a class="btn btn--primary" href="${url('home', l)}">${esc(u.home)}</a><a class="btn btn--ghost" href="${url('services', l)}">${esc(u.nav.services)}</a><a class="btn btn--ghost" href="${url('visit', l)}">${esc(u.nav.visit)}</a></p></div>`;
  }).join('<hr class="rule-gold">');
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Page not found — Younes Tailor</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#0B1120">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/fonts-latin.css">
<link rel="stylesheet" href="/css/fonts-arabic.css">
<link rel="stylesheet" href="/css/styles.css">
</head>
<body class="page-404">
<main id="main" class="section nf">
<div class="container narrow">
<a class="brand nf__brand" href="/"><img src="/assets/logo/younes-bilingual-ivory.svg" alt="Younes Tailor — يونس" width="180" height="137"></a>
${blocks}
<p class="nf__contact"><a href="tel:${FACTS.phoneE164}">${ltr(FACTS.phoneDisplay)}</a> · <a href="https://wa.me/${FACTS.wa}" rel="noopener">WhatsApp</a></p>
</div>
</main>
</body>
</html>
`;
}

function sitemap() {
  const keys = Object.keys(PATHS);
  const urls = [];
  for (const k of keys) for (const l of LANGS) {
    urls.push(`  <url>
    <loc>${abs(k, l)}</loc>
    <lastmod>${LASTMOD}</lastmod>
${LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${abs(k, x)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(k, 'en')}"/>
  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

// ── write ──────────────────────────────────────────────────────────────────
let count = 0;
for (const key of Object.keys(PATHS)) {
  for (const lang of LANGS) {
    const out = path.join(ROOT, PATHS[key][lang], 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, renderPage(key, lang));
    count++;
  }
}
fs.writeFileSync(path.join(ROOT, '404.html'), render404());
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap());
console.log(`Wrote ${count} pages, 404.html and sitemap.xml`);
