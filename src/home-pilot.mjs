// Home pilot — Decision 03 "the thread", text from docs/decisions/home-copy.md (via content-home.mjs).
// Home only (EN/AR/FR); other pages keep Decision 02 styles and their own copy.
// Receives shared helpers from build.mjs so header, footer and sticky bar stay one source.

export function renderHomePilot(lang, page, x) {
  const { esc, icon, url, FACTS, UI, video, picture, poster } = x;
  const h = page.home;
  const u = UI[lang];

  // Headline: wrap the emphasis words (EN/FR) in <em>; Arabic has none (Aref Ruqaa carries the hand).
  let h1 = esc(h.h1);
  for (const w of h.em) h1 = h1.replace(esc(w), `<em>${esc(w)}</em>`);

  const pill = (k, label) => `<li><a class="pill" href="${url(k, lang)}">${esc(label)}${icon('arrow-right', 'i-arrow')}</a></li>`;
  const steps = (list, id) => `<ol class="p-steps" aria-labelledby="${id}">${list.map(([lead, rest]) =>
    `<li class="p-step" data-thread-stop="dot"><p><strong>${esc(lead)}</strong> ${esc(rest)}</p></li>`).join('')}</ol>`;
  const stitch = (cls = '') => `<svg class="p-stitch${cls ? ' ' + cls : ''}" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 14 C 60 2 120 2 180 12 S 300 24 360 12 S 480 0 540 10 S 660 24 720 13 S 840 1 900 11 S 1020 23 1080 12 S 1170 4 1200 9"/></svg>`;
  const arrow = (cls) => `<svg class="p-arrow ${cls}" viewBox="0 0 120 80" aria-hidden="true" focusable="false"><path d="M6 12 C 30 4 62 8 78 26 C 92 42 92 58 84 70"/><path d="M72 60 L 84 72 L 96 58"/></svg>`;
  const dots = ['#C23B3B', '#CDB88A', '#1F305D', '#E8A33D', '#3E7C59', '#7A5E2E', '#8E5BA8', '#3F7CB8'];
  const marqueeWords = h.marquee.map((w) => `<span>${esc(w)}</span><span aria-hidden="true" class="p-marquee__dot">·</span>`).join('');
  const tel = `<a href="tel:${FACTS.phoneE164}">${'<span class="ltr" dir="ltr">' + esc(h.phone) + '</span>'}</a>`;

  return `
<svg class="thread" data-thread aria-hidden="true" focusable="false"><path data-thread-path pathLength="1"/><g data-thread-dots></g></svg>

<section class="p-hero" aria-labelledby="hero-h">
<div class="p-wrap p-hero__grid">
<div class="p-hero__copy">
<h1 id="hero-h" data-thread-stop="start">${h1}</h1>
<p class="p-lede">${esc(h.lede)}</p>
<div class="p-branches">
<a class="p-branch" href="${url('services', lang)}#tailoring">${icon('scissors')}<span>${esc(h.btnTailoring)}</span>${icon('arrow-right', 'i-arrow')}</a>
<a class="p-branch" href="${url('embroidery', lang)}">${icon('needle')}<span>${esc(h.btnEmbroidery)}</span>${icon('arrow-right', 'i-arrow')}</a>
<span class="p-note" aria-hidden="true">${arrow('p-note__arrow')}<span class="p-note__text">${esc(h.note)}</span></span>
</div>
<p class="p-hero__hours">${esc(h.hours)}</p>
</div>
<div class="p-hero__media">${video(1, lang, '/assets/media/machine-01-poster-540.webp', { caption: false })}</div>
</div>
</section>

<section class="p-marquee" aria-label="${esc(h.marquee.join(' · '))}" data-marquee>
<div class="p-marquee__viewport">
<p class="p-marquee__track" id="marquee-track"><span class="p-marquee__words">${marqueeWords}</span><span class="p-marquee__words p-marquee__copy" aria-hidden="true">${marqueeWords}</span></p>
</div>
<button class="p-marquee__toggle" type="button" aria-controls="marquee-track" data-marquee-toggle data-label-pause="${esc(u.video.pause)}" data-label-play="${esc(u.video.play)}" hidden>${icon('pause', 'i-pause')}${icon('play', 'i-play')}<span data-marquee-label>${esc(u.video.play)}</span></button>
</section>

<section class="p-services" id="services" aria-labelledby="services-h">
<div class="p-wrap">
<h2 id="services-h" class="p-h2" data-thread-stop="loop">${esc(h.whatH2)}</h2>
</div>

<div class="p-panel p-panel--tailoring" id="tailoring">
<div class="p-wrap p-panel__grid">
<div class="p-panel__media"><div class="p-swatch p-swatch--soft">${picture('lockstitch', lang, { sizes: '(min-width: 880px) 34vw, 80vw' })}</div></div>
<div class="p-panel__copy">
<h3 class="p-h3" data-thread-stop="loop">${esc(h.tTitle)}</h3>
<p class="p-line">${esc(h.tLine)}</p>
<ul class="p-pills">${pill('alterations', h.tPills[0])}${pill('repairs', h.tPills[1])}</ul>
<p class="p-panel__btn"><a class="p-btn p-btn--ink" href="${url('services', lang)}#tailoring">${esc(h.tBtn)}${icon('arrow-right', 'i-arrow')}</a></p>
</div>
</div>
<div class="p-wrap p-process">
<h4 class="p-process__h" id="proc-t">${esc(h.tProcH)}</h4>
${steps(h.tSteps, 'proc-t')}
</div>
</div>

<div class="p-panel p-panel--embroidery" id="embroidery">
${stitch('p-stitch--top')}
<div class="p-wrap p-panel__grid p-panel__grid--flip">
<div class="p-panel__copy">
<h3 class="p-h3" data-thread-stop="loop">${esc(h.eTitle)}</h3>
<p class="p-line">${esc(h.eLine)}</p>
<ul class="p-pills p-pills--on-navy">${pill('embroidery', h.ePills[0])}${pill('uniforms', h.ePills[1])}</ul>
<p class="p-panel__btn"><a class="p-btn p-btn--cream" href="${url('embroidery', lang)}">${esc(h.eBtn)}${icon('arrow-right', 'i-arrow')}</a></p>
<ul class="trio">${h.promises.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
</div>
<div class="p-panel__media"><div class="p-swatch p-swatch--arch">${poster(3, lang)}</div></div>
</div>
<div class="p-wrap">
<h4 class="p-strip__h" id="stitch-on">${esc(h.stripLabel)}</h4>
<ul class="p-strip" aria-labelledby="stitch-on">${h.strip.map((t, i) => `<li><span class="p-strip__dot" style="--dot:${dots[i % dots.length]}" aria-hidden="true"></span>${esc(t)}</li>`).join('')}</ul>
</div>
<div class="p-wrap p-process">
<h4 class="p-process__h" id="proc-e">${esc(h.eProcH)}</h4>
${steps(h.eSteps, 'proc-e')}
</div>
${stitch('p-stitch--bottom')}
</div>
</section>

<section class="p-visit" id="visit" aria-labelledby="visit-h">
<div class="p-wrap p-visit__grid">
<div>
<h2 id="visit-h" class="p-h2" data-thread-stop="end">${esc(h.visitH2)}</h2>
<p class="p-line">${esc(h.visitLine)}</p>
<ul class="contact-list">
<li>${icon('map-pin')}<span>${esc(h.address)}</span></li>
<li>${icon('phone')}<span>${tel}</span></li>
<li>${icon('clock')}<span>${esc(h.hours)}</span></li>
<li>${icon('check')}<span>${esc(h.parking)}</span></li>
<li>${icon('check')}<span>${esc(h.payment)}</span></li>
</ul>
<p class="p-visit__actions">
<a class="p-btn p-btn--ink" href="${esc(FACTS.directions)}" rel="noopener">${icon('navigation-arrow')}<span>${esc(h.visitBtns[0])}</span></a>
<a class="p-btn p-btn--ghost" href="https://wa.me/${FACTS.wa}" rel="noopener">${icon('whatsapp-logo')}<span>${esc(h.visitBtns[1])}</span></a>
<a class="p-btn p-btn--ghost" href="tel:${FACTS.phoneE164}">${icon('phone')}<span>${esc(h.visitBtns[2])}</span></a>
</p>
</div>
<div class="p-visit__side">
<div class="p-swatch p-swatch--soft p-swatch--wide">${picture('storefront', lang, { sizes: '(min-width: 880px) 40vw, 90vw' })}</div>
</div>
</div>
<div class="p-wrap p-faq">
<div class="faq">${h.faq.map(([q, a]) => `<details class="faq__item"><summary>${esc(q)}</summary><div class="faq__a"><p>${esc(a)}</p></div></details>`).join('')}</div>
</div>
</section>

${homeEnquire(lang, h, x)}`;
}

// Home form: fields and wording from home-copy.md section 5. Same submit script as the other pages.
function homeEnquire(lang, h, { esc, icon, FACTS }) {
  const svc = ['alterations', 'repairs', 'embroidery', 'uniforms', 'other'];
  const branch = (v) => (v === 'embroidery' || v === 'uniforms') ? 'embroidery' : v === 'other' ? 'other' : 'tailoring';
  return `<section class="section enquire" id="enquire" aria-labelledby="enquire-h">
<div class="container narrow">
<h2 id="enquire-h">${esc(h.formH)}</h2>
<p>${esc(h.formIntro)}</p>
<form class="form" data-enquiry data-wa="${FACTS.wa}" data-intro="${esc(h.msg.intro)}" data-colon="${lang === 'fr' ? ' : ' : ': '}" data-sep="${lang === 'ar' ? '، ' : ', '}" novalidate>
<div class="field">
<label for="f-service">${esc(h.fService)}</label>
<select id="f-service" name="service" data-label="${esc(h.msg.service)}">
${svc.map((v, i) => `<option value="${v}" data-branch="${branch(v)}">${esc(h.fServiceOpts[i])}</option>`).join('')}
</select>
</div>
<div class="field"><label for="f-item" id="f-item-l">${esc(h.fItem)} ${esc(h.fItemEg)}</label><input id="f-item" name="item" type="text" autocomplete="off" data-label="${esc(h.msg.item)}"></div>
<div class="field"><label for="f-do">${esc(h.fDo)} ${esc(h.fDoEg)}</label><textarea id="f-do" name="do" rows="3" data-label="${esc(h.msg.do)}"></textarea></div>
<fieldset class="branch" data-branch="embroidery" hidden disabled>
<div class="field field--qty"><label for="f-qty">${esc(h.fQty)}</label><input id="f-qty" name="quantity" type="text" inputmode="numeric" autocomplete="off" data-label="${esc(h.msg.qty)}">
<label class="check"><input type="checkbox" name="qtyunsure" data-unsure data-label="${esc(h.msg.qty)}" value="${esc(h.fQtyUnsure)}"><span>${esc(h.fQtyUnsure)}</span></label></div>
<div class="field field--choice" role="radiogroup" aria-labelledby="f-item-l">
${h.fGarment.map((t) => `<label class="check"><input type="radio" name="garment" value="${esc(t)}" data-label="${esc(h.msg.garment)}"><span>${esc(t)}</span></label>`).join('')}
</div>
<div class="field field--choice" role="radiogroup">
${h.fDesign.map((t) => `<label class="check"><input type="radio" name="design" value="${esc(t)}" data-label="${esc(h.msg.design)}"><span>${esc(t)}</span></label>`).join('')}
</div>
</fieldset>
<div class="field"><label for="f-date">${esc(h.fDate)} ${esc(h.fDateOpt)}</label><input id="f-date" name="date" type="text" autocomplete="off" data-label="${esc(h.msg.date)}"></div>
<p class="form__note">${esc(h.photoNote)}</p>
<button class="btn btn--primary btn--block" type="submit">${icon('whatsapp-logo')}<span>${esc(h.send)}</span></button>
<p class="form__fallback" data-wa-fallback role="status" hidden>${esc(h.fallback)} <a href="https://wa.me/${FACTS.wa}" target="_blank" rel="noopener">${esc(h.fallbackLink)}</a></p>
</form>
<p class="form__rather">${esc(h.rather)} <a href="tel:${FACTS.phoneE164}"><span class="ltr" dir="ltr">${esc(h.phone)}</span></a></p>
</div>
</section>`;
}
