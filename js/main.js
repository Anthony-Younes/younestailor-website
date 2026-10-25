// ─────────────────────────────────────────────────────────────────────────────
// Site behaviour: nav disclosures, mobile nav, booking drawer + WhatsApp
// composer, FAQ accordion, live open/closed status, reveal-on-scroll, hero
// word-split. Classic deferred script (no bundler) — runs once, DOM is
// already parsed by the time `defer` fires. Decorative cursor effects
// (tilt/magnetic/dust) live in fx.js so this file works with zero risk even
// if that module fails to load.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var locale = document.body.dataset.locale || 'en';

  var cfg = null;
  var cfgEl = document.getElementById('yt-config');
  if (cfgEl) {
    try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { cfg = null; }
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments;
      t = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }

  /* ── 1. header scroll state ─────────────────────────────────────────────── */
  (function headerScroll() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var ticking = false;
    function update() {
      header.dataset.scrolled = String(window.scrollY > 8);
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  })();

  /* ── 2. generic disclosures (services dropdown, language switch) ─────────── */
  function openDisclosure(root, toggle) {
    root.dataset.open = 'true';
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDisclosure(root) {
    if (root.dataset.open !== 'true') return;
    root.dataset.open = 'false';
    var toggle = root.querySelector('[aria-haspopup], [data-dd-toggle], [data-lang-toggle]');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  function setupDisclosures(rootSelector, toggleSelector) {
    var roots = Array.prototype.slice.call(document.querySelectorAll(rootSelector));
    roots.forEach(function (root) {
      var toggle = root.querySelector(toggleSelector);
      if (!toggle) return;
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = root.dataset.open !== 'true';
        roots.forEach(closeDisclosure);
        if (willOpen) openDisclosure(root, toggle);
      });
    });
    document.addEventListener('click', function (e) {
      roots.forEach(function (root) {
        if (root.dataset.open === 'true' && !root.contains(e.target)) closeDisclosure(root);
      });
    });
    return roots;
  }
  var disclosureRoots = setupDisclosures('[data-dd]', '[data-dd-toggle]')
    .concat(setupDisclosures('[data-lang]', '[data-lang-toggle]'));

  /* ── 3. mobile nav ─────────────────────────────────────────────────────── */
  var mobileNav = document.querySelector('[data-mobile-nav]');
  var navToggle = document.querySelector('[data-nav-toggle]');
  var lastFocused = null;

  function trapTab(panel, e) {
    if (e.key !== 'Tab') return;
    var focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    lastFocused = document.activeElement;
    document.body.dataset.mobileOpen = 'true';
    document.body.classList.add('no-scroll');
    navToggle.setAttribute('aria-expanded', 'true');
    var closeBtn = mobileNav.querySelector('[data-nav-close].drawer__close, .drawer__close');
    if (closeBtn) closeBtn.focus();
  }
  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    document.body.dataset.mobileOpen = 'false';
    document.body.classList.remove('no-scroll');
    navToggle.setAttribute('aria-expanded', 'false');
    if (lastFocused) lastFocused.focus();
  }
  function isMobileNavOpen() { return document.body.dataset.mobileOpen === 'true'; }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (isMobileNavOpen()) closeMobileNav(); else openMobileNav();
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('[data-nav-close]').forEach(function (el) {
      el.addEventListener('click', closeMobileNav);
    });
    mobileNav.addEventListener('keydown', function (e) {
      if (isMobileNavOpen()) trapTab(mobileNav, e);
    });
  }
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth >= 880 && isMobileNavOpen()) closeMobileNav();
  }, 150));

  /* ── 4. booking drawer + WhatsApp composer ────────────────────────────── */
  var drawer = document.querySelector('[data-drawer]');
  var drawerLastFocused = null;

  function isDrawerOpen() { return document.body.dataset.drawerOpen === 'true'; }
  function openDrawer() {
    if (!drawer) return;
    if (isMobileNavOpen()) closeMobileNav();
    drawerLastFocused = document.activeElement;
    document.body.dataset.drawerOpen = 'true';
    document.body.classList.add('no-scroll');
    var closeBtn = drawer.querySelector('[data-drawer-close].drawer__close, .drawer__close');
    var firstField = drawer.querySelector('input, select, textarea');
    (closeBtn || firstField || drawer).focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    document.body.dataset.drawerOpen = 'false';
    document.body.classList.remove('no-scroll');
    if (drawerLastFocused) drawerLastFocused.focus();
  }

  document.querySelectorAll('[data-open-drawer]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!drawer) return; // no JS-less fallback: let the real href (#book) work
      e.preventDefault();
      openDrawer();
    });
  });
  if (drawer) {
    drawer.querySelectorAll('[data-drawer-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });
    drawer.addEventListener('keydown', function (e) {
      if (isDrawerOpen()) trapTab(drawer, e);
    });

    var waForm = drawer.querySelector('[data-wa-form]');
    if (waForm) {
      waForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var garment = (waForm.querySelector('#f-garment') || {}).value || '';
        var serviceEl = waForm.querySelector('#f-service');
        var service = serviceEl ? serviceEl.value : '';
        var whenEl = waForm.querySelector('input[name="when"]:checked');
        var when = whenEl ? whenEl.value : '';
        var name = (waForm.querySelector('#f-name') || {}).value || '';

        var lines = [waForm.dataset.waPrefix || ''];
        if (garment.trim()) lines.push((waForm.dataset.lblGarment || '') + ': ' + garment.trim());
        if (service) lines.push((waForm.dataset.lblService || '') + ': ' + service);
        if (when) lines.push((waForm.dataset.lblWhen || '') + ': ' + when);
        if (name.trim()) lines.push((waForm.dataset.lblName || '') + ': ' + name.trim());

        var wa = cfg && cfg.wa;
        if (!wa) return;
        var url = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');
        closeDrawer();
      });
    }
  }

  /* ── 5. shared escape handling for overlays + disclosures ────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (isDrawerOpen()) { closeDrawer(); return; }
    if (isMobileNavOpen()) { closeMobileNav(); return; }
    disclosureRoots.forEach(closeDisclosure);
  });

  /* ── 6. FAQ accordion ──────────────────────────────────────────────────── */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.style.maxBlockSize = open ? '0px' : panel.scrollHeight + 'px';
    });
  });
  window.addEventListener('resize', debounce(function () {
    document.querySelectorAll('.faq__q[aria-expanded="true"]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.style.maxBlockSize = panel.scrollHeight + 'px';
    });
  }, 150));

  /* ── 7. live open/closed status + "today" row highlight ───────────────── */
  (function status() {
    var pill = document.querySelector('[data-status]');
    if (!pill || !cfg || !cfg.hours) return;
    var textEl = pill.querySelector('[data-status-text]');
    var s = cfg.s || {};
    var tz = cfg.tz || 'Asia/Beirut';
    var ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function parts() {
      var dayFmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' });
      var timeFmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false });
      var now = new Date();
      return { day: dayFmt.format(now), time: timeFmt.format(now) };
    }
    function blockFor(day) {
      return cfg.hours.filter(function (b) { return b.days.indexOf(day) !== -1; })[0];
    }
    function nextOpen(fromDay) {
      var start = ORDER.indexOf(fromDay);
      for (var i = 1; i <= 7; i++) {
        var day = ORDER[(start + i) % 7];
        var block = blockFor(day);
        if (block) return { day: day, block: block };
      }
      return null;
    }
    function dayLabel(day) {
      return (s.days && s.days[day]) || day;
    }

    function render() {
      var now = parts();
      var block = blockFor(now.day);
      var open = Boolean(block && now.time >= block.opens && now.time < block.closes);
      var msg;

      if (open) {
        msg = s.opensAt ? (s.open + ' · ' + s.closesAt + ' ' + block.closes) : s.open;
      } else if (block && now.time < block.opens) {
        msg = s.opensAt ? (s.closed + ' · ' + s.opensAt + ' ' + block.opens) : s.closed;
      } else {
        var base = block ? s.closed : s.closedToday;
        var next = nextOpen(now.day);
        msg = (next && s.opensAt)
          ? (base + ' · ' + s.opensAt + ' ' + dayLabel(next.day) + ' ' + next.block.opens)
          : base;
      }

      pill.hidden = false;
      pill.dataset.open = String(open);
      if (textEl) textEl.textContent = msg;

      document.querySelectorAll('[data-hours] .row').forEach(function (row) {
        row.dataset.today = String(row.dataset.day === now.day);
      });
    }

    render();
    setInterval(render, 60000);
  })();

  /* ── 8. reveal on scroll ───────────────────────────────────────────────── */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ── 9. hero word-split headline ──────────────────────────────────────── */
  (function splitHero() {
    var h1 = document.querySelector('.hero h1');
    if (!h1 || locale === 'ar' || reduceMotion) return;

    function splitNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (token) {
          if (token === '') return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else {
            var w = document.createElement('span');
            w.className = 'w';
            var wi = document.createElement('span');
            wi.className = 'wi';
            wi.textContent = token;
            w.appendChild(wi);
            frag.appendChild(w);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.prototype.slice.call(node.childNodes).forEach(splitNode);
      }
    }
    Array.prototype.slice.call(h1.childNodes).forEach(splitNode);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { h1.classList.add('is-in'); });
    });
  })();
})();
