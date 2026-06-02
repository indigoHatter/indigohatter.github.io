/* ============================================================
   THEME.JS — Light/dark toggle with localStorage persistence
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'pw-theme';
  const DARK  = 'theme-dark';
  const LIGHT = 'theme-light';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }
  function store(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
  }

  function apply(theme) {
    // Set on both <html> (for flash prevention) and <body> (for zone classes)
    document.documentElement.classList.remove(DARK, LIGHT);
    document.documentElement.classList.add(theme);
    document.body.classList.remove(DARK, LIGHT);
    document.body.classList.add(theme);
    store(theme);
    // Keep sidebar button label in sync
    const sidebarBtn = document.getElementById('sidebarThemeBtn');
    if (sidebarBtn) sidebarBtn.textContent = theme === DARK ? '\u2600 light' : '\u263d dark';
  }

  function init() {
    // Respect stored preference; fall back to system preference
    const stored = getStored();
    if (stored === LIGHT || stored === DARK) {
      apply(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      apply(prefersDark ? DARK : LIGHT);
    }

    // Wire splash toggle button
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.contains(DARK);
        apply(isDark ? LIGHT : DARK);
      });
    }

    // Wire spoke sidebar toggle button
    const sidebarBtn = document.getElementById('sidebarThemeBtn');
    if (sidebarBtn) {
      sidebarBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains(DARK);
        apply(isDark ? LIGHT : DARK);
      });
      // Set initial label
      sidebarBtn.textContent = document.body.classList.contains(DARK) ? '\u2600 light' : '\u263d dark';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
