/* ============================================================
   SPOKE.JS | Sidebar accordion and active section tracking
   for all spoke pages. Theme toggle is handled by theme.js.
   ============================================================ */

(function () {
  'use strict';

  /* ── Sidebar accordion ───────────────────────────────────── */
  function initSidebar() {
    const triggers = document.querySelectorAll('.sidebar-zone-trigger');
    triggers.forEach(trigger => {
      const zone = trigger.closest('.sidebar-zone');
      // Current zone is always expanded, no toggle needed
      if (zone.classList.contains('is-current')) return;

      trigger.addEventListener('click', (e) => {
        // If the click came from the zone-name link, let it navigate — don't toggle
        if (e.target.closest('.sidebar-zone-name')) return;

        const isOpen = zone.classList.contains('is-open');
        // Close all non-current zones first
        document.querySelectorAll('.sidebar-zone:not(.is-current)')
          .forEach(z => z.classList.remove('is-open'));
        // Toggle this one
        if (!isOpen) zone.classList.add('is-open');
      });
    });
  }

  /* ── Active section highlighting via IntersectionObserver ── */
  function initActiveLinks() {
    const sections = document.querySelectorAll('.spoke-section[id]');
    const links    = document.querySelectorAll('.sidebar-links a[href*="#"]');
    if (!sections.length || !links.length) return;

    // Map anchor → link element
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
          // Remove active from all, add to this one
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
    initSidebar();
    initActiveLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
