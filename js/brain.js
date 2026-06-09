/* ============================================================
   BRAIN.JS | Hover/focus menu wiring for index.html.
   Theme toggle is handled by theme.js (shared across all pages).
   This file only manages the show/hide logic for brain menus.
   ============================================================ */

(function () {
  'use strict';

  /* On touch devices, tapping a zone should navigate directly — not open the menu.
     We detect the first touchstart and suppress showMenu for the rest of the session. */
  var hasTouched = false;
  document.addEventListener('touchstart', function () { hasTouched = true; }, { once: true, passive: true });

  /* Shift a menu horizontally so it stays within the viewport.
     Uses the CSS `translate` property (composites with `transform`) so
     the existing show/hide translateY animation is unaffected. */
  function clampToViewport(menu) {
    menu.style.translate = '';
    var rect = menu.getBoundingClientRect();
    var vw   = window.innerWidth;
    var GAP  = 8;
    var dx   = 0;
    if (rect.right > vw - GAP)  dx = vw - GAP - rect.right;
    else if (rect.left < GAP)   dx = GAP - rect.left;
    if (dx !== 0) menu.style.translate = Math.round(dx) + 'px 0';
  }

  /* Exposed globally so SVG inline onmouseenter/leave can call them */
  window.showMenu = function (menuId) {
    if (hasTouched) return;
    var menu = document.getElementById(menuId);
    if (!menu) return;
    if (menu._hideTimer) {
      clearTimeout(menu._hideTimer);
      menu._hideTimer = null;
    }
    clampToViewport(menu);
    menu.classList.add('visible');
  };

  window.hideMenu = function (menuId) {
    var menu = document.getElementById(menuId);
    if (!menu) return;
    menu._hideTimer = setTimeout(function () {
      menu.classList.remove('visible');
      menu.style.translate = '';
    }, 120);
  };

  function init() {
    /* Keep menus alive when cursor or keyboard focus moves into them */
    document.querySelectorAll('.brain-menu').forEach(function (menu) {
      menu.addEventListener('mouseenter', function () { window.showMenu(menu.id); });
      menu.addEventListener('mouseleave', function () { window.hideMenu(menu.id); });
      menu.addEventListener('focusin',    function () { window.showMenu(menu.id); });
      menu.addEventListener('focusout',   function () { window.hideMenu(menu.id); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
