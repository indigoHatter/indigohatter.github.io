/* ============================================================
   SPOKE.JS | Sidebar build, accordion, and active section tracking
   for all spoke pages. Theme toggle is handled by theme.js.
   ============================================================ */

(function () {
  'use strict';

  /* ── Zone / section config ───────────────────────────────── */
  /*
     Single source of truth for the sidebar (and mobile top-bar).
     To add, remove, or rename a zone or section, edit ZONES only
     — no HTML changes needed.

     Fields per zone:
       id       — matches the body class suffix (zone-<id>)
       name     — display name in the sidebar header
       page     — filename for cross-page links
       label    — aria-label base ("Left brain sections / navigation")
       sections — array of { label, id } for in-page anchor links
  */
  const ZONES = [
    {
      id:    'left',
      name:  'Left Brain',
      page:  'left.html',
      label: 'Left brain',
      sections: [
        { label: 'About',                id: 'bio' },
        { label: 'Résumé',               id: 'resume' },
        { label: 'Skills',               id: 'skills' },
        { label: 'Education',            id: 'education' },
        { label: 'Certifications',       id: 'certifications' },
        { label: 'Awards',               id: 'awards' },
//        { label: 'Publications',         id: 'publications' },
        { label: 'Professional services',id: 'services' },
      ],
    },
    {
      id:    'right',
      name:  'Right Brain',
      page:  'right.html',
      label: 'Right brain',
      sections: [
        { label: 'Bio',                id: 'bio' },
        { label: 'Acting résumé',      id: 'acting' },
        { label: 'Production history', id: 'productions' },
        { label: 'Creative projects',  id: 'projects' },
      ],
    },
    {
      id:    'dream',
      name:  'Dream Cloud',
      page:  'dream.html',
      label: 'Dream cloud',
      sections: [
        { label: 'Hobbies',    id: 'hobbies' },
        { label: 'Photos',     id: 'photos' },
        { label: 'Adventures', id: 'adventures' },
      ],
    },
    {
      id:    'pfc',
      name:  'Prefrontal',
      page:  'pfc.html',
      label: 'Prefrontal cortex',
      sections: [
        { label: 'About',        id: 'about' },
        { label: 'Bio',          id: 'bio' },
        { label: 'Why a brain?', id: 'concept' },
        { label: 'Currently',    id: 'currently' },
        { label: 'Contact',      id: 'contact' },
      ],
    },
  ];

  /* ── Detect current zone from body class ─────────────────── */
  function getCurrentZoneId() {
    for (const z of ZONES) {
      if (document.body.classList.contains('zone-' + z.id)) return z.id;
    }
    return null;
  }

  /* ── Build sidebar DOM ───────────────────────────────────── */
  /*
     Emits two layout-wrapper divs that CSS treats differently at each
     breakpoint:

     .sidebar-brand-row  — home link + theme toggle
       Desktop: display:contents → children are direct sidebar flex children
                (home stays at top, footer stays at bottom via margin-top:auto)
       Mobile:  flex row, space-between → visible row 1

     .sidebar-zones  — all zone navs + dividers
       Desktop: display:contents → zones flow normally in the flex column
       Mobile:  flex row → zone tabs (row 2)

     .sidebar-mobile-strip  — section links for the active mobile tab
       Desktop: display:none
       Mobile:  horizontal scroll strip (row 3)
  */
  function buildSidebar() {
    const sidebar = document.querySelector('.spoke-sidebar');
    if (!sidebar) return;

    const currentId  = getCurrentZoneId();
    const frag = document.createDocumentFragment();

    /* Brand row */
    const brandRow = document.createElement('div');
    brandRow.className = 'sidebar-brand-row';

    const home = document.createElement('a');
    home.href      = 'index.html';
    home.className = 'sidebar-home';
    home.innerHTML = '<span class="sidebar-home-glyph">&#9675;</span> porterwhatever.io';
    brandRow.appendChild(home);

    const footer = document.createElement('div');
    footer.className = 'sidebar-footer';
    footer.innerHTML = '<button class="sidebar-theme-btn" id="sidebarThemeBtn">&#9728; light</button>';
    brandRow.appendChild(footer);

    frag.appendChild(brandRow);

    /* Zones wrapper */
    const zonesWrapper = document.createElement('div');
    zonesWrapper.className = 'sidebar-zones';

    ZONES.forEach((zone, idx) => {
      const isCurrent = zone.id === currentId;

      /* Divider before current zone (skip if first) */
      if (isCurrent && idx > 0) zonesWrapper.appendChild(makeDivider());

      const nav = document.createElement('nav');
      nav.className = 'sidebar-zone' + (isCurrent ? ' is-current' : '');
      nav.dataset.zone = zone.id;
      nav.setAttribute('aria-label', zone.label + (isCurrent ? ' sections' : ' navigation'));

      const trigger = document.createElement('div');
      trigger.className = 'sidebar-zone-trigger';

      if (isCurrent) {
        const nameSpan = document.createElement('span');
        nameSpan.className   = 'sidebar-zone-name';
        nameSpan.textContent = zone.name;
        trigger.appendChild(nameSpan);

        /* ◀ caret — only visible on mobile. Points left when another
           zone's strip is showing (current zone not open); rotates
           to ▼ when this zone's strip is showing (is-open). */
        const caret = document.createElement('span');
        caret.className = 'sidebar-caret--current';
        caret.innerHTML = '&#9664;'; /* ◀ */
        trigger.appendChild(caret);
      } else {
        const nameLink = document.createElement('a');
        nameLink.className   = 'sidebar-zone-name';
        nameLink.href        = zone.page;
        nameLink.textContent = zone.name;
        trigger.appendChild(nameLink);

        const caretBtn = document.createElement('button');
        caretBtn.className = 'sidebar-caret-btn';
        caretBtn.setAttribute('aria-expanded', 'false');
        caretBtn.setAttribute('aria-label', 'Toggle ' + zone.name);
        caretBtn.innerHTML = '<span class="sidebar-caret">&#9658;</span>'; /* ▶ */
        trigger.appendChild(caretBtn);
      }

      nav.appendChild(trigger);

      /* Section links (desktop accordion / source for mobile strip) */
      const ul = document.createElement('ul');
      ul.className = 'sidebar-links';
      zone.sections.forEach(sec => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href        = isCurrent ? '#' + sec.id : zone.page + '#' + sec.id;
        a.textContent = sec.label;
        li.appendChild(a);
        ul.appendChild(li);
      });
      nav.appendChild(ul);
      zonesWrapper.appendChild(nav);

      /* Divider after current zone (skip if last) */
      if (isCurrent && idx < ZONES.length - 1) zonesWrapper.appendChild(makeDivider());
    });

    frag.appendChild(zonesWrapper);

    /* Mobile row 3 — populated dynamically by initMobileStrip / handleMobileTap */
    const strip = document.createElement('div');
    strip.className = 'sidebar-mobile-strip';
    strip.setAttribute('aria-label', 'Section links');
    frag.appendChild(strip);

    sidebar.appendChild(frag);
  }

  function makeDivider() {
    const d = document.createElement('div');
    d.className = 'sidebar-divider';
    return d;
  }

  /* ── Mobile helpers ──────────────────────────────────────── */
  function isMobileLayout() {
    return window.innerWidth <= 700;
  }

  /* Write the active zone's sections into the mobile strip */
  function populateStrip(zone, isCurrent) {
    const strip = document.querySelector('.sidebar-mobile-strip');
    if (!strip) return;
    strip.innerHTML = '';
    zone.sections.forEach(sec => {
      const a = document.createElement('a');
      a.href        = isCurrent ? '#' + sec.id : zone.page + '#' + sec.id;
      a.textContent = sec.label;
      strip.appendChild(a);
    });
  }

  /* On load: open the current zone and populate the strip with its sections */
  function initMobileStrip() {
    const currentNav = document.querySelector('.sidebar-zone.is-current');
    if (!currentNav) return;
    currentNav.classList.add('is-open');
    const zone = ZONES.find(z => z.id === currentNav.dataset.zone);
    if (zone) populateStrip(zone, true);
  }

  /*
     Mobile tab tap logic:
       Current zone     → do nothing (strip already populated by openCurrentZone() on init)
       Non-current zone → navigate immediately on first tap
  */
  function handleMobileTap(zoneNav, zone, isCurrent) {
    if (!isCurrent) {
      window.location.href = zone.page;
    }
  }

  /* ── Trigger click handler (desktop accordion + mobile tabs) */
  /*
     Desktop: clicking the trigger row (whitespace or caret) folds/unfolds
     the zone. Clicks on the zone name <a> pass through so the link navigates.

     Mobile: all clicks on the trigger are intercepted; tapping a non-current
     zone navigates immediately on first tap.

     TO CHANGE DESKTOP WHITESPACE CLICKS TO NAVIGATE INSTEAD OF TOGGLE:
     Replace the desktop branch below with:
       if (e.target.closest('.sidebar-caret-btn')) {
         e.preventDefault();
         toggleZone(zoneNav, btn);
       } else if (!e.target.closest('.sidebar-zone-name')) {
         window.location.href = zone.page;
       }
       // Clicks on .sidebar-zone-name fall through to the <a> href naturally
  */
  function initTriggers() {
    document.querySelectorAll('.sidebar-zone').forEach(zoneNav => {
      const trigger   = zoneNav.querySelector('.sidebar-zone-trigger');
      const btn       = zoneNav.querySelector('.sidebar-caret-btn');
      const zone      = ZONES.find(z => z.id === zoneNav.dataset.zone);
      const isCurrent = zoneNav.classList.contains('is-current');
      if (!trigger || !zone) return;

      trigger.addEventListener('click', (e) => {
        if (isMobileLayout()) {
          e.preventDefault();
          handleMobileTap(zoneNav, zone, isCurrent);
          return;
        }
        /* Desktop: let zone-name <a> navigate naturally */
        if (e.target.closest('.sidebar-zone-name')) return;
        if (isCurrent) return;
        e.preventDefault();
        toggleZone(zoneNav, btn);
      });
    });
  }

  function toggleZone(zone, btn) {
    const isOpen = zone.classList.contains('is-open');

    /* Step 1: close all open non-current zones; capture the animating element
       so we can wait for it before opening the new one. */
    let closingLinks = null;
    document.querySelectorAll('.sidebar-zone:not(.is-current)').forEach(z => {
      if (z.classList.contains('is-open')) {
        z.classList.remove('is-open');
        const b = z.querySelector('.sidebar-caret-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (!closingLinks) closingLinks = z.querySelector('.sidebar-links');
      }
    });

    if (isOpen) return; /* was open — just closed it above, nothing more to do */

    /* Step 2: open the requested zone only after the close animation finishes.
       Falls back to a timer in case transitionend doesn't fire (e.g. reduced-motion,
       or nothing was open and closingLinks is null). */
    function openZone() {
      zone.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    if (closingLinks) {
      /* Open when the close animation is halfway done. --t-med is 250ms,
         Adjust this value to taste:
           0   = simultaneous (if scrollbar can draw, it may flash briefly)
           50  = mostly simultaneous (feels snappy, but slightly too fast)
           125 = midpoint (feels smooth, but still too slow)
           250 = fully sequential (feels slow) */
      setTimeout(openZone, 80);
    } else {
      openZone(); /* nothing was animating closed; expand immediately */
    }
  }

  /* ── Active section highlighting ───────────────────────────
     Replaces the old IntersectionObserver approach, which only
     handled enter events and never updated the mobile strip.

     Strategy: on each scroll tick, find the last section whose
     top has crossed 25% of the viewport — that's the one the
     user is currently reading. setActive() updates both the
     desktop sidebar links and the mobile strip links (queried
     live, since populateStrip() recreates those nodes on tab
     switches).
  */
  function initActiveLinks() {
    const sections = Array.from(document.querySelectorAll('.spoke-section[id]'));
    const links    = document.querySelectorAll('.sidebar-zone.is-current .sidebar-links a[href*="#"]');
    if (!sections.length || !links.length) return;

    const linkMap = {};
    links.forEach(link => {
      const hash = link.getAttribute('href').split('#')[1];
      if (hash) linkMap[hash] = link;
    });

    function setActive(id) {
      Object.values(linkMap).forEach(l => l.classList.remove('is-active'));
      if (linkMap[id]) linkMap[id].classList.add('is-active');
      /* Mobile strip nodes are recreated by populateStrip() on each tab
         switch, so query them live rather than capturing once at init. */
      document.querySelectorAll('.sidebar-mobile-strip a').forEach(a => {
        const hash = a.getAttribute('href').split('#')[1];
        a.classList.toggle('is-active', hash === id);
      });
      /* Auto-scroll strip to keep active link in view. */
      /*-------- STAGED EDIT: Uncomment if the strip does not scroll automatically on section change.
      //  const strip      = document.querySelector('.sidebar-mobile-strip');
      //  const activeLink = strip?.querySelector('a.is-active');
      //  if (strip && activeLink) {
      //   const linkLeft  = activeLink.offsetLeft;
      //   const linkRight = linkLeft + activeLink.offsetWidth;
      //   const viewLeft  = strip.scrollLeft;
      //   const viewRight = viewLeft + strip.offsetWidth;
      //   if (linkLeft < viewLeft)
      //     strip.scrollLeft = linkLeft;
      //   else if (linkRight > viewRight)
      //     strip.scrollLeft = linkRight - strip.offsetWidth;
      // }
      */
    }

    function getActiveSection() {
      const threshold = window.innerHeight * 0.25;
      let active = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= threshold) active = s;
      }
      return active;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(getActiveSection().id);
        ticking = false;
      });
    }, { passive: true });

    setActive(getActiveSection().id);
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    buildSidebar();     /* Build DOM first — theme.js needs #sidebarThemeBtn */
    initMobileStrip();  /* Open current zone + populate strip on mobile */
    initTriggers();     /* Wire all trigger clicks (desktop + mobile) */
    initActiveLinks();  /* IntersectionObserver for desktop sidebar links */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
