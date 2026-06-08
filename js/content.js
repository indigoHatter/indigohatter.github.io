/* ============================================================
   CONTENT.JS | Data-driven entry rendering for spoke pages.
   Each page loads its own data/<zone>.js before this file.
   Mirrors the IIFE + createElement pattern from spoke.js.
   ============================================================ */

(function () {
  'use strict';

  /* ── Date formatting ─────────────────────────────────────── */
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];

  function formatDate(iso) {
    if (!iso) return 'Present';
    const parts = String(iso).split('-');
    if (parts.length < 2) return parts[0];
    const month = parseInt(parts[1], 10);
    return (MONTHS[month - 1] || '') + ' ' + parts[0];
  }

  function dateRange(start, end) {
    if (!start) return formatDate(end);
    return formatDate(start) + ' – ' + formatDate(end);
  }

  /* ── DOM helpers ─────────────────────────────────────────── */
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls)            node.className   = cls;
    if (text != null)   node.textContent = text;
    return node;
  }

  function makeTagsEl(arr) {
    if (!arr || !arr.length) return null;
    const wrap = el('div', 'spoke-tags');
    arr.forEach(t => wrap.appendChild(el('span', 'spoke-tag', t)));
    return wrap;
  }

  function makeHighlightsList(arr) {
    if (!arr || !arr.length) return null;
    const ul = el('ul', 'spoke-entry-bullets');
    arr.forEach(h => {
      const li = document.createElement('li');
      li.textContent = h;
      ul.appendChild(li);
    });
    return ul;
  }

  function makeEntry(children) {
    const entry = el('div', 'spoke-entry');
    children.forEach(child => { if (child) entry.appendChild(child); });
    return entry;
  }

  /* ── Section renderer ────────────────────────────────────── */
  function renderInto(sectionId, items, makeFn) {
    if (!items || !items.length) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.querySelectorAll('.spoke-entry').forEach(e => e.remove());
    const placeholder = section.querySelector('.spoke-placeholder');
    items.forEach(item => {
      const entry = makeFn(item);
      placeholder ? section.insertBefore(entry, placeholder) : section.appendChild(entry);
    });
    if (placeholder) placeholder.hidden = true;
  }

  /* ── Entry factories ─────────────────────────────────────── */

  function makeWorkEntry(item) {
    const title = (item.position && item.name)
      ? item.position + ' — ' + item.name
      : (item.position || item.name || '');
    return makeEntry([
      el('span', 'spoke-entry-title', title),
      (item.startDate || item.endDate)
        ? el('span', 'spoke-entry-date', dateRange(item.startDate, item.endDate))
        : null,
      item.location                  ? el('span', 'spoke-entry-meta',   item.location)              : null,
      (item.headline || item.summary) ? el('p',    'spoke-entry-detail', item.headline || item.summary) : null,
      makeHighlightsList(item.highlights),
      makeTagsEl(item.keywords),
    ]);
  }

  function makeEducationEntry(item) {
    const parts = [item.studyType, item.area].filter(Boolean);
    const title  = parts.length
      ? parts.join(' ') + ' — ' + item.institution
      : (item.institution || '');
    const metaText = item.meta || null;
    return makeEntry([
      el('span', 'spoke-entry-title', title),
      item.endDate ? el('span', 'spoke-entry-date', formatDate(item.endDate)) : null,
      metaText     ? el('span', 'spoke-entry-meta',  metaText)               : null,
      item.detail  ? el('p',    'spoke-entry-detail', item.detail)           : null,
    ]);
  }

  function makeAwardEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.title),
      item.date    ? el('span', 'spoke-entry-date',   formatDate(item.date)) : null,
      item.awarder ? el('span', 'spoke-entry-meta',   item.awarder)          : null,
      item.summary ? el('p',    'spoke-entry-detail', item.summary)          : null,
    ]);
  }

  function makePublicationEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.name),
      item.releaseDate ? el('span', 'spoke-entry-date',   formatDate(item.releaseDate)) : null,
      item.publisher   ? el('span', 'spoke-entry-meta',   item.publisher)               : null,
      item.summary     ? el('p',    'spoke-entry-detail', item.summary)                 : null,
    ]);
  }

  function makeServiceEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.title),
      item.meta   ? el('span', 'spoke-entry-meta',   item.meta)   : null,
      item.detail ? el('p',    'spoke-entry-detail', item.detail) : null,
    ]);
  }

  function makeSkillEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.name),
      item.level    ? el('span', 'spoke-entry-meta', item.level) : null,
      makeTagsEl(item.keywords),
    ]);
  }

  function makeCertificateEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.name),
      item.date   ? el('span', 'spoke-entry-date', formatDate(item.date)) : null,
      item.issuer ? el('span', 'spoke-entry-meta',  item.issuer)          : null,
    ]);
  }

  function makeActingEntry(item) {
    const title = (item.role && item.production)
      ? item.role + ' — ' + item.production
      : (item.role || item.production || '');
    const meta = [item.company, item.director].filter(Boolean).join(' · ');
    return makeEntry([
      el('span', 'spoke-entry-title', title),
      item.date ? el('span', 'spoke-entry-date', formatDate(item.date)) : null,
      meta      ? el('span', 'spoke-entry-meta', meta)                  : null,
    ]);
  }

  function makeProductionEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.name),
      item.startDate   ? el('span', 'spoke-entry-date',   formatDate(item.startDate)) : null,
      item.entity      ? el('span', 'spoke-entry-meta',   item.entity)                : null,
      item.description ? el('p',    'spoke-entry-detail', item.description)           : null,
      makeTagsEl(item.roles),
    ]);
  }

  function makeHobbyEntry(item) {
    return makeEntry([
      el('span', 'spoke-entry-title', item.name),
      item.detail ? el('p', 'spoke-entry-detail', item.detail) : null,
    ]);
  }

  /* ── Zone renderers ──────────────────────────────────────── */

  function renderLeft() {
    if (typeof LEFT_DATA === 'undefined') return;
    renderInto('resume',        LEFT_DATA.work,         makeWorkEntry);
    renderInto('skills',        LEFT_DATA.skills,       makeSkillEntry);
    renderInto('education',     LEFT_DATA.education,    makeEducationEntry);
    renderInto('certificates',  LEFT_DATA.certificates, makeCertificateEntry);
    renderInto('awards',        LEFT_DATA.awards,       makeAwardEntry);
    renderInto('publications',  LEFT_DATA.publications, makePublicationEntry);
    renderInto('services',      LEFT_DATA.services,     makeServiceEntry);
  }

  function renderRight() {
    if (typeof RIGHT_DATA === 'undefined') return;
    renderInto('acting',      RIGHT_DATA.acting,      makeActingEntry);
    renderInto('productions', RIGHT_DATA.productions, makeProductionEntry);
  }

  function renderDream() {
    if (typeof DREAM_DATA === 'undefined') return;
    renderInto('hobbies', DREAM_DATA.hobbies, makeHobbyEntry);
  }

  function renderPfc() {
    if (typeof PFC_DATA === 'undefined') return;
    const c = PFC_DATA.currently;
    if (!c) return;
    const keys  = ['workingOn', 'inRehearsal', 'obsessing', 'reading'];
    const items = document.querySelectorAll('.currently-item');
    items.forEach((item, i) => {
      const val = c[keys[i]];
      if (val == null) return;
      const valEl = item.querySelector('.currently-value');
      if (valEl) valEl.textContent = val;
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    const b = document.body;
    if (b.classList.contains('zone-left'))  renderLeft();
    if (b.classList.contains('zone-right')) renderRight();
    if (b.classList.contains('zone-dream')) renderDream();
    if (b.classList.contains('zone-pfc'))   renderPfc();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
