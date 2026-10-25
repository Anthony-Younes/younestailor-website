// Home pilot — Decision 03 "the thread". Home only (EN/AR/FR); other pages keep Decision 02 styles.
// Receives the shared helpers from build.mjs so markup for header, footer, form and sticky bar stays one source.

export function renderHomePilot(lang, page, h) {
  const { esc, icon, url, UI, FACTS, statusPill, contactList, hoursList, sFaq, sEnquire, video, picture, poster, trio } = h;
  const u = UI[lang];
  const p = page.pilot;
  const hero = page.sections.find((s) => s.t === 'hero');
  const faq = page.sections.find((s) => s.t === 'faq');
  const groups = page.sections.find((s) => s.t === 'groups');
  const tGroup = groups.groups.find((g) => g.id === 'tailoring');
  const eGroup = groups.groups.find((g) => g.id === 'embroidery');

  // Headline: wrap the emphasis words (EN/FR) in <em>; Arabic has none (Aref Ruqaa carries the hand).
  let h1 = esc(hero.h1);
  for (const w of p.em) h1 = h1.replace(esc(w), `<em>${esc(w)}</em>`);

  const pill = (k) => `<li><a class="pill" href="${url(k, lang)}">${esc(k === 'uniforms' ? u.services.uniforms : u.services[k])}${icon('arrow-right', 'i-arrow')}</a></li>`;
  const steps = (proc, id) => `<ol class="p-steps" aria-labelledby="${id}">${proc.steps.map(([t, d], i) =>
    `<li class="p-step" data-thread-stop="dot"><span class="p-step__n" aria-hidden="true">${i + 1}</span><h4>${esc(t)}</h4><p>${esc(d)}</p></li>`).join('')}</ol>`;
  // A loose stitched wave between moments (decorative).
  const stitch = (cls = '') => `<svg class="p-stitch${cls ? ' ' + cls : ''}" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 14 C 60 2 120 2 180 12 S 300 24 360 12 S 480 0 540 10 S 660 24 720 13 S 840 1 900 11 S 1020 23 1080 12 S 1170 4 1200 9"/></svg>`;
  // Hand-drawn arrow (decorative, repeats nothing; the buttons carry the text). Max 2 per page.
  const arrow = (cls) => `<svg class="p-arrow ${cls}" viewBox="0 0 120 80" aria-hidden="true" focusable="false"><path d="M6 12 C 30 4 62 8 78 26 C 92 42 92 58 84 70"/><path d="M72 60 L 84 72 L 96 58"/></svg>`;
  const dots = ['#C23B3B', '#CDB88A', '#1F305D', '#E8A33D', '#3E7C59', '#7A5E2E'];
  const marqueeWords = p.marquee.map((w) => `<span>${esc(w)}</span>`).join('<span aria-hidden="true" class="p-marquee__dot">·</span>');

  return `
<svg class="thread" data-thread aria-hidden="true" focusable="false"><path data-thread-path pathLength="1"/><g data-thread-dots></g></svg>

<section class="p-hero" aria-labelledby="hero-h">
<div class="p-wrap p-hero__grid">
<div class="p-hero__copy">
<h1 id="hero-h" data-thread-stop="start">${h1}</h1>
<p class="p-lede">${esc(hero.lede)}</p>
<div class="p-branches">
<a class="p-branch" href="${url('services', lang)}#tailoring">${icon('scissors')}<span>${esc(p.tailoringBtn)}</span>${icon('arrow-right', 'i-arrow')}</a>
<a class="p-branch" href="${url('embroidery', lang)}">${icon('needle')}<span>${esc(p.embroideryBtn)}</span>${icon('arrow-right', 'i-arrow')}</a>
${arrow('p-arrow--hero')}
</div>
<div class="p-hero__meta">${statusPill()}<p>${esc(u.hoursShort)}</p></div>
</div>
<div class="p-hero__media">${video(1, lang, '/assets/media/machine-01-poster-540.webp')}</div>
</div>
</section>

<section class="p-marquee" aria-label="${esc(p.marqueeLabel)}" data-marquee>
<div class="p-marquee__viewport">
<p class="p-marquee__track" id="marquee-track"><span class="p-marquee__words">${marqueeWords}</span><span class="p-marquee__words p-marquee__copy" aria-hidden="true">${marqueeWords}</span></p>
</div>
<button class="p-marquee__toggle" type="button" aria-controls="marquee-track" data-marquee-toggle data-label-pause="${esc(u.video.pause)}" data-label-play="${esc(u.video.play)}" hidden>${icon('pause', 'i-pause')}${icon('play', 'i-play')}<span data-marquee-label>${esc(u.video.play)}</span><span class="sr-only"> ${esc(p.marqueeWhat)}</span></button>
</section>

<section class="p-services" id="services" aria-labelledby="services-h">
<div class="p-wrap">
<h2 id="services-h" class="p-h2" data-thread-stop="loop">${esc(groups.h2)}</h2>
</div>

<div class="p-panel p-panel--tailoring" id="tailoring">
<div class="p-wrap p-panel__grid">
<div class="p-panel__media"><div class="p-swatch p-swatch--soft">${picture('lockstitch', lang, { sizes: '(min-width: 880px) 34vw, 80vw' })}</div></div>
<div class="p-panel__copy">
<h3 class="p-h3" data-thread-stop="loop">${esc(tGroup.title)}</h3>
<p class="p-line">${esc(p.tailoringLine)}</p>
<p><a class="p-btn p-btn--ink" href="${url('services', lang)}#tailoring">${esc(p.tailoringBtn)}${icon('arrow-right', 'i-arrow')}</a></p>
<ul class="p-pills">${pill('alterations')}${pill('repairs')}</ul>
</div>
</div>
<div class="p-wrap p-process">
<h4 class="p-process__h" id="proc-t">${esc(u.processTailoring.h2)}</h4>
${steps(u.processTailoring, 'proc-t')}
</div>
</div>

<div class="p-panel p-panel--embroidery" id="embroidery">
${stitch('p-stitch--top')}
<div class="p-wrap p-panel__grid p-panel__grid--flip">
<div class="p-panel__copy">
<h3 class="p-h3" data-thread-stop="loop">${esc(eGroup.title)}</h3>
<p class="p-line">${esc(p.embroideryLine)}</p>
<p><a class="p-btn p-btn--cream" href="${url('embroidery', lang)}">${esc(p.embroideryBtn)}${icon('arrow-right', 'i-arrow')}</a></p>
<ul class="p-pills p-pills--on-navy">${pill('embroidery')}${pill('uniforms')}</ul>
${trio(lang)}
</div>
<div class="p-panel__media"><div class="p-swatch p-swatch--arch">${poster(3, lang)}</div></div>
</div>
<div class="p-wrap">
<h4 class="p-strip__h" id="stitch-on">${esc(p.stitchOnTitle)}</h4>
<ul class="p-strip" aria-labelledby="stitch-on">${p.stitchOn.map((t, i) => `<li><span class="p-strip__dot" style="--dot:${dots[i % dots.length]}" aria-hidden="true"></span>${esc(t)}</li>`).join('')}</ul>
</div>
<div class="p-wrap p-process">
<h4 class="p-process__h" id="proc-e">${esc(u.processEmbroidery.h2)}</h4>
${steps(u.processEmbroidery, 'proc-e')}
</div>
${stitch('p-stitch--bottom')}
</div>
</section>

<section class="p-visit" id="visit" aria-labelledby="visit-h">
<div class="p-wrap p-visit__grid">
<div>
<h2 id="visit-h" class="p-h2" data-thread-stop="end">${esc(u.visitBlock.h2)}</h2>
<p class="p-line">${esc(u.visitBlock.p)}</p>
${statusPill()}
${contactList(lang)}
<p class="p-visit__actions"><a class="p-btn p-btn--ink" href="${esc(FACTS.directions)}" rel="noopener">${icon('navigation-arrow')}<span>${esc(u.visitBlock.directions)}</span></a><a class="p-btn p-btn--ghost" href="${url('visit', lang)}">${esc(u.visitBlock.more)}${icon('arrow-right', 'i-arrow')}</a></p>
${arrow('p-arrow--visit')}
</div>
<div class="p-visit__side">
<div class="p-swatch p-swatch--soft p-swatch--wide">${picture('storefront', lang, { sizes: '(min-width: 880px) 40vw, 90vw' })}</div>
<div class="p-hours"><h3 class="p-h4">${esc(u.footer.hours)}</h3>${hoursList(lang)}</div>
</div>
</div>
</section>

${sFaq(faq)}
${sEnquire('home', lang, page)}`;
}
