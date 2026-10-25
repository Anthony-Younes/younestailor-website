// ─────────────────────────────────────────────────────────────────────────────
// Purely decorative cursor/canvas effects: paper-dust motes in the hero
// portrait, cursor-driven 3D tilt on [data-tilt]/[data-tilt-strong], and a
// magnetic pull on primary CTAs. Loaded as a module so a failure here can
// never block main.js (nav, drawer, FAQ, booking) from working.
// Gated behind prefers-reduced-motion; tilt/magnetic also require a fine
// hover-capable pointer so touch devices never see half-finished hover state.
// ─────────────────────────────────────────────────────────────────────────────

var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function hexToRgba(hex, a) {
  var h = hex.replace('#', '');
  var r = parseInt(h.substring(0, 2), 16);
  var g = parseInt(h.substring(2, 4), 16);
  var b = parseInt(h.substring(4, 6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

/* ── paper-dust motes ─────────────────────────────────────────────────────── */
function initDust() {
  if (prefersReduced) return;
  var containers = document.querySelectorAll('[data-dust]');
  if (!containers.length) return;

  var gold = (getComputedStyle(document.documentElement).getPropertyValue('--gold') || '#C9A961').trim();

  containers.forEach(function (container) {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.inlineSize = '100%';
    canvas.style.blockSize = '100%';
    container.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, particles = [], raf = null, running = false;

    function makeParticle(fresh) {
      return {
        x: Math.random() * w,
        y: fresh ? Math.random() * h : h + 4,
        r: 0.6 + Math.random() * 1.5,
        vy: -(0.1 + Math.random() * 0.2),
        vx: (Math.random() - 0.5) * 0.1,
        a: 0.1 + Math.random() * 0.26,
        drift: Math.random() * Math.PI * 2,
      };
    }
    function sizeAndSpawn() {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(8, Math.min(24, Math.round((w * h) / 16000)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(true));
    }
    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.drift += 0.012;
        p.x += p.vx + Math.sin(p.drift) * 0.05;
        p.y += p.vy;
        if (p.y < -4 || p.x < -4 || p.x > w + 4) particles[i] = makeParticle(false);
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(gold, p.a);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }
    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    sizeAndSpawn();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && document.visibilityState === 'visible') start();
          else stop();
        });
      }, { threshold: 0.05 });
      io.observe(container);
    } else {
      start();
    }
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') start(); else stop();
    });
    window.addEventListener('resize', function () {
      sizeAndSpawn();
    });
  });
}

/* ── cursor tilt ───────────────────────────────────────────────────────────── */
function initTilt() {
  if (!canHover || prefersReduced) return;
  document.querySelectorAll('[data-tilt], [data-tilt-strong]').forEach(function (el) {
    var max = el.hasAttribute('data-tilt-strong') ? 9 : 5.5;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var ry = (px - 0.5) * max * 2;
      var rx = (0.5 - py) * max * 2;
      el.style.transition = 'transform .1s linear';
      el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });
    el.addEventListener('pointerleave', function () {
      el.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ── magnetic primary CTAs ────────────────────────────────────────────────── */
function initMagnetic() {
  if (!canHover || prefersReduced) return;
  document.querySelectorAll('.btn--primary').forEach(function (btn) {
    var max = 9;
    btn.addEventListener('pointermove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      btn.style.transition = 'transform .12s ease-out';
      btn.style.transform = 'translate(' + (x * max).toFixed(1) + 'px,' + (y * max * 0.6).toFixed(1) + 'px)';
    });
    btn.addEventListener('pointerleave', function () {
      btn.style.transition = 'transform .4s cubic-bezier(.2,.7,.2,1)';
      btn.style.transform = '';
    });
  });
}

initDust();
initTilt();
initMagnetic();
