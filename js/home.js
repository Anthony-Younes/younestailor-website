// Younes Tailor — Home pilot behaviour (Decision 03). Loaded on Home only.
// 1. The thread: one hand-drawn line in the reserved lane, built from the real layout
//    (so it adapts to phone, desktop and RTL, and never crosses text), drawn as you scroll.
// 2. The marquee: one slow line with a pause/play button; stopped under reduced motion.
// Everything here is decoration: the page is complete without this script.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var rtl = document.documentElement.dir === 'rtl';

  /* ── 1. thread ───────────────────────────────────────────────── */
  var main = document.getElementById('main');
  var svg = document.querySelector('[data-thread]');
  var path = svg && svg.querySelector('[data-thread-path]');
  var dotsG = svg && svg.querySelector('[data-thread-dots]');
  var NS = 'http://www.w3.org/2000/svg';
  var startY = 0, endY = 1;

  function laneX(el) {
    // Centre of the lane inside the element's .p-wrap (inline-start padding minus the gutter).
    var wrap = el.closest('.p-wrap') || el.parentNode;
    var r = wrap.getBoundingClientRect();
    var cs = getComputedStyle(wrap);
    var mainR = main.getBoundingClientRect();
    var lane = parseFloat(cs.getPropertyValue('--lane')) || 28;
    var gutter = parseFloat(cs.getPropertyValue('--gutter')) || 20;
    var x = rtl ? (r.right - gutter - lane / 2) : (r.left + gutter + lane / 2);
    return { x: x - mainR.left, lane: lane, gutter: gutter };
  }

  function build() {
    if (!svg || !path || !main) return;
    var stops = Array.prototype.slice.call(main.querySelectorAll('[data-thread-stop]'));
    if (stops.length < 2) return;
    var mainR = main.getBoundingClientRect();
    var pts = stops.map(function (el) {
      var kind = el.getAttribute('data-thread-stop');
      var target = kind === 'dot' ? (el.querySelector('h4') || el) : el;
      var r = target.getBoundingClientRect();
      var lx = laneX(el);
      // Headings: thread meets them at the first line; dots sit on the step title.
      var y = r.top - mainR.top + Math.min(r.height / 2, kind === 'dot' ? 24 : 34);
      return { x: lx.x, y: y, lane: lx.lane, gutter: lx.gutter, kind: kind };
    });

    svg.setAttribute('width', mainR.width);
    svg.setAttribute('height', main.scrollHeight);
    svg.style.height = main.scrollHeight + 'px';
    svg.setAttribute('viewBox', '0 0 ' + mainR.width + ' ' + main.scrollHeight);

    var d = 'M' + pts[0].x.toFixed(1) + ' ' + (pts[0].y - 30).toFixed(1);
    var flip = 1;
    while (dotsG.firstChild) dotsG.removeChild(dotsG.firstChild);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var prev = i === 0 ? { x: p.x, y: p.y - 30 } : pts[i - 1];
      var wob = Math.max(4, p.lane * 0.28) * flip; // gentle sway, stays inside the lane
      var dy = p.y - prev.y;
      d += ' C' + (prev.x + wob).toFixed(1) + ' ' + (prev.y + dy * 0.35).toFixed(1) + ' ' +
        (p.x - wob).toFixed(1) + ' ' + (p.y - dy * 0.35).toFixed(1) + ' ' + p.x.toFixed(1) + ' ' + p.y.toFixed(1);
      flip = -flip;
      if (p.kind === 'loop') {
        // A small hand loop beside the heading. It curls toward the outer margin
        // (left in LTR, right in RTL), away from the text, sized to the free space.
        var s = rtl ? 1 : -1;
        var room = p.lane / 2 + (p.gutter || 20) * 0.5;
        var rr = Math.max(5, Math.min(18, room / 1.7));
        d += ' c' + (s * rr * 1.6) + ' ' + (-rr * 0.2) + ' ' + (s * rr * 1.4) + ' ' + (-rr * 2.1) + ' 0 ' + (-rr * 1.6);
        d += ' c' + (-s * rr * 0.5) + ' ' + (rr * 0.4) + ' ' + (-s * rr * 0.35) + ' ' + (rr * 1.3) + ' 0 ' + (rr * 1.6);
      }
      if (p.kind === 'dot' || p.kind === 'start' || p.kind === 'end') {
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', p.x.toFixed(1));
        c.setAttribute('cy', p.y.toFixed(1));
        c.setAttribute('r', p.kind === 'dot' ? 5 : 4);
        c.setAttribute('data-y', p.y.toFixed(1));
        dotsG.appendChild(c);
      }
    }
    path.setAttribute('d', d);
    startY = pts[0].y - 30;
    endY = pts[pts.length - 1].y;
    draw();
  }

  var ticking = false;
  function draw() {
    ticking = false;
    if (!path) return;
    if (reduce.matches) { svg.style.setProperty('--thread-off', '0'); setDots(Infinity); return; }
    // The tip follows a point 65% down the viewport.
    var mainTop = main.getBoundingClientRect().top + window.scrollY;
    var tipY = window.scrollY + window.innerHeight * 0.65 - mainTop;
    var prog = Math.max(0, Math.min(1, (tipY - startY) / Math.max(1, endY - startY)));
    svg.style.setProperty('--thread-off', (1 - prog).toFixed(4));
    setDots(tipY);
  }
  function setDots(tipY) {
    if (!dotsG) return;
    Array.prototype.forEach.call(dotsG.children, function (c) {
      c.style.opacity = (+c.getAttribute('data-y') <= tipY) ? '1' : '0';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(draw); } }

  if (svg && main) {
    var rebuild = (function () { var t; return function () { clearTimeout(t); t = setTimeout(build, 120); }; })();
    build();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', rebuild);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(main);
    window.addEventListener('load', build);
    if (reduce.addEventListener) reduce.addEventListener('change', draw);
  }

  /* ── 2. marquee ──────────────────────────────────────────────── */
  var mq = document.querySelector('[data-marquee]');
  var btn = mq && mq.querySelector('[data-marquee-toggle]');
  if (mq && btn) {
    var label = btn.querySelector('[data-marquee-label]');
    var set = function (state) {
      mq.setAttribute('data-state', state);
      btn.setAttribute('data-state', state);
      label.textContent = state === 'playing' ? btn.getAttribute('data-label-pause') : btn.getAttribute('data-label-play');
    };
    btn.hidden = false;
    set(reduce.matches ? 'paused' : 'playing');
    btn.addEventListener('click', function () {
      set(mq.getAttribute('data-state') === 'playing' ? 'paused' : 'playing');
    });
    if (reduce.addEventListener) reduce.addEventListener('change', function () { if (reduce.matches) set('paused'); });
  }
})();
