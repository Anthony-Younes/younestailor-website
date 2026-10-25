// Younes Tailor — site behaviour. Classic deferred script, no dependencies.
// 1 header state · 2 mobile menu · 3 sticky bar vs. typing · 4 enquiry form → WhatsApp
// 5 videos (lazy, pause button, reduced motion) · 6 click-to-load map · 7 open/closed status
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cfg = null;
  try { cfg = JSON.parse((document.getElementById('yt-config') || {}).textContent || 'null'); } catch (e) { cfg = null; }

  /* 1. header scrolled state */
  var header = document.querySelector('[data-header]');
  if (header) {
    var ticking = false;
    var setScrolled = function () { header.dataset.scrolled = String(window.scrollY > 8); ticking = false; };
    setScrolled();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(setScrolled); }
    }, { passive: true });
  }

  /* 2. mobile menu: <details> enhanced with escape, outside click and link close */
  var menu = document.querySelector('[data-menu]');
  if (menu) {
    var sync = function () { document.body.classList.toggle('menu-open', menu.open); };
    menu.addEventListener('toggle', sync);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.open = false; });
    });
  }

  /* 3. hide the phone sticky bar while a field has focus, so it never covers it */
  var isField = function (el) { return el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName); };
  document.addEventListener('focusin', function (e) { if (isField(e.target)) document.body.classList.add('is-typing'); });
  document.addEventListener('focusout', function (e) {
    if (!isField(e.target)) return;
    setTimeout(function () { if (!isField(document.activeElement)) document.body.classList.remove('is-typing'); }, 50);
  });

  /* 4. enquiry form */
  var form = document.querySelector('[data-enquiry]');
  if (form) {
    var service = form.querySelector('#f-service');
    var branchOf = function () {
      var o = service.options[service.selectedIndex];
      return o ? o.getAttribute('data-branch') : 'other';
    };
    var setDisabled = function (el, off) {
      el.hidden = off;
      el.disabled = off;
    };
    var applyService = function () {
      var b = branchOf();
      form.querySelectorAll('fieldset.branch').forEach(function (fs) { setDisabled(fs, fs.getAttribute('data-branch') !== b); });
      form.querySelectorAll('[data-only]').forEach(function (el) { setDisabled(el, el.getAttribute('data-only') !== service.value); });
      form.querySelectorAll('[data-note]').forEach(function (p) { p.hidden = p.getAttribute('data-note') !== b; });
    };
    service.addEventListener('change', applyService);
    applyService();

    // "Not sure" quantity clears and disables the number field.
    var unsure = form.querySelector('[data-unsure]');
    var qty = form.querySelector('#f-qty');
    if (unsure && qty) unsure.addEventListener('change', function () { qty.disabled = unsure.checked; if (unsure.checked) qty.value = ''; });

    // CTA buttons: move focus into the form after the jump.
    document.querySelectorAll('[data-cta]').forEach(function (a) {
      a.addEventListener('click', function () {
        setTimeout(function () { service.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [form.getAttribute('data-intro') || ''];
      var groups = {};
      var order = [];
      var add = function (label, value) {
        if (!value) return;
        // Unlabelled choices (radio groups without a visible label) become their own line.
        var key = label || ('#' + order.length);
        if (!groups[key]) { groups[key] = []; order.push(key); }
        groups[key].push(value);
      };
      form.querySelectorAll('[data-label]').forEach(function (el) {
        if (el.disabled || el.closest('[disabled]')) return;
        var label = el.getAttribute('data-label');
        if (el.tagName === 'SELECT') {
          var opt = el.options[el.selectedIndex];
          add(label, opt && el.value ? opt.text.trim() : '');
        } else if (el.type === 'checkbox' || el.type === 'radio') {
          if (!el.checked) return;
          if (el.hasAttribute('data-flag')) add(label, form.getAttribute('data-yes') || 'Yes');
          else add(label, el.value);
        } else {
          add(label, el.value.trim());
        }
      });
      order.forEach(function (key) {
        var vals = groups[key].join(form.getAttribute('data-sep') || ', ');
        if (key.charAt(0) === '#') { lines.push(vals); return; }
        // A label that already ends in ? or : (Latin or Arabic) needs no extra colon.
        lines.push(key + (/[?:؟]\s*$/.test(key) ? ' ' : ': ') + vals);
      });
      var wa = form.getAttribute('data-wa');
      var link = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lines.join('\n'));
      // One navigation only: a new tab with noopener. window.open returns null with
      // noopener, so no automatic fallback; a visible link covers the rare blocked case.
      window.open(link, '_blank', 'noopener');
      var fallback = form.querySelector('[data-wa-fallback]');
      if (fallback) {
        var a = fallback.querySelector('a');
        if (a) a.href = link;
        fallback.hidden = false;
      }
    });
  }

  /* 5. videos: play only while visible; pause button; static poster under reduced motion */
  var videos = document.querySelectorAll('[data-video]');
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (v.dataset.userPaused === 'true') return;
      if (en.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); }
    });
  }, { threshold: 0.25 }) : null;

  videos.forEach(function (v) {
    var btn = v.parentNode.querySelector('[data-video-toggle]');
    v.removeAttribute('controls');
    v.muted = true;
    var label = btn ? btn.querySelector('span') : null;
    var render = function () {
      if (!btn) return;
      var paused = v.paused;
      btn.dataset.state = paused ? 'paused' : 'playing';
      label.textContent = paused ? btn.getAttribute('data-label-play') : btn.getAttribute('data-label-pause');
    };
    v.addEventListener('play', render);
    v.addEventListener('pause', render);
    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () {
        if (v.paused) { v.dataset.userPaused = 'false'; v.play().catch(function () {}); }
        else { v.dataset.userPaused = 'true'; v.pause(); }
      });
    }
    render();
    if (reduceMotion) { v.dataset.userPaused = 'true'; return; }
    if (io) io.observe(v);
  });

  /* 6. click-to-load map */
  document.querySelectorAll('[data-map]').forEach(function (box) {
    var btn = box.querySelector('[data-map-load]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = box.getAttribute('data-src');
      f.title = box.getAttribute('data-title') || 'Map';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      var frame = box.querySelector('.frame');
      if (frame) frame.replaceWith(f); else box.prepend(f);
      btn.parentNode.remove();
      f.focus();
    });
  });

  /* 7. live open/closed status + today's row */
  (function status() {
    if (!cfg || !cfg.hours) return;
    var pills = document.querySelectorAll('[data-status]');
    var rows = document.querySelectorAll('[data-hours] [data-day]');
    if (!pills.length && !rows.length) return;
    var s = cfg.s || {};
    var ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var block = function (day) { return cfg.hours.filter(function (b) { return b.days.indexOf(day) !== -1; })[0]; };
    var dayName = function (d) { return (s.days && s.days[d]) || d; };
    function render() {
      var now = new Date();
      var day = new Intl.DateTimeFormat('en-US', { timeZone: cfg.tz, weekday: 'long' }).format(now);
      var time = new Intl.DateTimeFormat('en-GB', { timeZone: cfg.tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
      var b = block(day);
      var open = Boolean(b && time >= b.opens && time < b.closes);
      var msg;
      if (open) msg = s.open + ' · ' + s.closesAt + ' ' + b.closes;
      else if (b && time < b.opens) msg = s.closed + ' · ' + s.opensAt + ' ' + b.opens;
      else {
        var i = ORDER.indexOf(day), next = null;
        for (var k = 1; k <= 7 && !next; k++) { var d = ORDER[(i + k) % 7]; if (block(d)) next = { day: d, b: block(d) }; }
        msg = (b ? s.closed : s.closedToday) + (next ? ' · ' + s.opensAt + ' ' + dayName(next.day) + ' ' + next.b.opens : '');
      }
      pills.forEach(function (p) {
        p.hidden = false;
        p.dataset.open = String(open);
        var t = p.querySelector('[data-status-text]');
        if (t) t.textContent = msg;
      });
      rows.forEach(function (r) { r.dataset.today = String(r.getAttribute('data-day') === day); });
    }
    render();
    setInterval(render, 60000);
  })();
})();
