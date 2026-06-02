/* ============================================================
   SPOKE.JS | Sidebar build, accordion, and active section tracking
   for all spoke pages. Theme toggle is handled by theme.js.
   ============================================================ */

(function () {
  'use strict';

  /* ── Zone / section config ───────────────────────────────── */
  /*
     Single source of truth for the sidebar (and eventually the
     mobile top-bar). To add, remove, or rename a zone or section,
     edit ZONES only — no HTML changes needed.

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
        { label: 'Education',            id: 'education' },
        { label: 'Awards',               id: 'awards' },
        { label: 'Publications',         id: 'publications' },
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
        { label: 'About',       id: 'about' },
        { label: 'Bio',         id: 'bio' },
        { label: 'Why a brain?',id: 'concept' },
        { label: 'Currently',   id: 'currently' },
        { label: 'Contact',     id: 'contact' },
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
  function buildSidebar() {
    const sidebar = document.querySelector('.spoke-sidebar');
    if (!sidebar) return;

    const currentId  = getCurrentZoneId();
    const currentIdx = ZONES.findIndex(z => z.id === currentId);
    const frag = document.createDocumentFragment();

    /* Home link */
    const home = document.createElement('a');
    home.href      = 'index.html';
    home.className = 'sidebar-home';
    home.innerHTML = '<span class="sidebar-home-glyph">&#9675;</span> porterwhatever.io';
    frag.appendChild(home);

    /* Zone navs */
    ZONES.forEach((zone, idx) => {
      const isCurrent = zone.id === currentId;

      /* Divider BEFORE current zone (skip if it's the first item) */
      if (isCurrent && idx > 0) frag.appendChild(makeDivider());

      /* Nav block */
      const nav = document.createElement('nav');
      nav.className = 'sidebar-zone' + (isCurrent ? ' is-current' : '');
      nav.setAttribute('aria-label', zone.label + (isCurrent ? ' sections' : ' navigation'));

      /* Trigger row */
      const trigger = document.createElement('div');
      trigger.className = 'sidebar-zone-trigger';

      if (isCurrent) {
        /* Current zone — plain span, no link or caret */
        const nameSpan = document.createElement('span');
        nameSpan.className   = 'sidebar-zone-name';
        nameSpan.textContent = zone.name;
        trigger.appendChild(nameSpan);
      } else {
        /* Other zones — linked name + caret button */
        const nameLink = document.createElement('a');
        nameLink.className   = 'sidebar-zone-name';
        nameLink.href        = zone.page;
        nameLink.textContent = zone.name;
        trigger.appendChild(nameLink);

        const caretBtn = document.createElement('button');
        caretBtn.className = 'sidebar-caret-btn';
        caretBtn.setAttribute('aria-expanded', 'false');
        caretBtn.setAttribute('aria-label', 'Toggle ' + zone.name);
        caretBtn.innerHTML = '<span class="sidebar-caret">&#9658;</span>';
        trigger.appendChild(caretBtn);
      }

      nav.appendChild(trigger);

      /* Section links */
      const ul = document.createElement('ul');
      ul.className = 'sidebar-links';
      zone.sections.forEach(sec => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        /* In-page anchors for the current zone; cross-page hrefs for others */
        a.href        = isCurrent ? '#' + sec.id : zone.page + '#' + sec.id;
        a.textContent = sec.label;
        li.appendChild(a);
        ul.appendChild(li);
      });
      nav.appendChild(ul);
      frag.appendChild(nav);

      /* Divider AFTER current zone (skip if it's the last item) */
      if (isCurrent && idx < ZONES.length - 1) frag.appendChild(makeDivider());
    });

    /* Footer / theme toggle */
    const footer = document.createElement('div');
    footer.className = 'sidebar-footer';
    footer.innerHTML = '<button class="sidebar-theme-btn" id="sidebarThemeBtn">&#9728; light</button>';
    frag.appendChild(footer);

    sidebar.appendChild(frag);
  }

  function makeDivider() {
    const d = document.createElement('div');
    d.className = 'sidebar-divider';
    return d;
  }

  /* ── Sidebar accordion ───────────────────────────────────── */
  /*
     Clicking anywhere on the trigger row (whitespace or caret) toggles
     the zone open/closed. Clicks on the zone name <a> are left alone so
     they navigate normally.

     TO CHANGE WHITESPACE CLICKS TO NAVIGATE INSTEAD OF TOGGLE:
     Replace the trigger.addEventListener block below with:

       trigger.addEventListener('click', (e) => {
         if (e.target.closest('.sidebar-caret-btn')) {
           e.preventDefault();
           toggleZone(zone, btn);
         } else if (!e.target.closest('.sidebar-zone-name')) {
           window.location.href = zone.page;
         }
         // Clicks on .sidebar-zone-name fall through to the <a> href naturally
       });
  */
  function initSidebar() {
    document.querySelectorAll('.sidebar-zone:not(.is-current)').forEach(zone => {
      const trigger = zone.querySelector('.sidebar-zone-trigger');
      const btn     = zone.querySelector('.sidebar-caret-btn');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        /* Let native link behaviour on the zone name proceed as-is */
        if (e.target.closest('.sidebar-zone-name')) return;
        e.preventDefault();
        toggleZone(zone, btn);
      });
    });
  }

  function toggleZone(zone, btn) {
    const isOpen = zone.classList.contains('is-open');
    /* Collapse all non-current zones first */
    document.querySelectorAll('.sidebar-zone:not(.is-current)').forEach(z => {
      z.classList.remove('is-open');
      const b = z.querySelector('.sidebar-caret-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
    /* Then open this one if it was closed */
    if (!isOpen) {
      zone.classList.add('is-open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  }

  /* ── Active section highlighting via IntersectionObserver ── */
  function initActiveLinks() {
    const sections = document.querySelectorAll('.spoke-section[id]');
    const links    = document.querySelectorAll('.sidebar-links a[href*="#"]');
    if (!sections.length || !links.length) return;

    const linkMap = {};
    links.forEach(link => {
      const hash = link.getAttribute('href').split('#')[1];
      if (hash) linkMap[hash] = link;
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(linkMap).forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    sections.forEach(s => observer.observe(s));
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    buildSidebar();   /* Must run before initSidebar (builds the DOM first) */
    initSidebar();
    initActiveLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
