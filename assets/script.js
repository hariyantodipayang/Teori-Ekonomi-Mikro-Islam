/* Teori Ekonomi Mikro Islam — perilaku antarmuka bersama.
   Aman dipanggil di halaman mana pun: setiap bagian berhenti sendiri
   bila elemen yang dibutuhkannya tidak ada di halaman itu. */

(function () {
  'use strict';

  /* ---------- 1. Tema terang / gelap ---------- */
  var STORE_KEY = 'temi-tema';
  var root = document.documentElement;

  function bacaTema() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function simpanTema(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* mode privat: abaikan */ }
  }
  function temaEfektif() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }
  function terapkanTema(v) {
    root.setAttribute('data-theme', v);
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var gelap = v === 'dark';
    btn.querySelector('.ico').textContent = gelap ? '☀' : '☾';
    btn.querySelector('.lbl').textContent = gelap ? 'Mode Terang' : 'Mode Gelap';
    btn.setAttribute('aria-label', gelap ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  }

  var tersimpan = bacaTema();
  if (tersimpan === 'dark' || tersimpan === 'light') root.setAttribute('data-theme', tersimpan);

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    terapkanTema(temaEfektif());
    toggle.addEventListener('click', function () {
      var baru = temaEfektif() === 'dark' ? 'light' : 'dark';
      terapkanTema(baru);
      simpanTema(baru);
    });
  }

  /* ---------- 2. Dua tab utama: Pengantar & Materi Kuliah ---------- */
  var tabs = document.querySelectorAll('.tab-btn');
  var eras = document.querySelectorAll('.era');
  var subnav = document.querySelector('.subnav');

  if (tabs.length && eras.length) {
    // isi jumlah topik pada tiap tab
    tabs.forEach(function (btn) {
      var g = btn.getAttribute('data-tab');
      var cnt = btn.querySelector('.cnt');
      if (cnt) cnt.textContent = document.querySelectorAll('.era[data-group="' + g + '"] .entry-link').length;
    });

    function bukaTab(g, gulir) {
      tabs.forEach(function (b) {
        var aktif = b.getAttribute('data-tab') === g;
        b.classList.toggle('active', aktif);
        b.setAttribute('aria-pressed', aktif ? 'true' : 'false');
      });
      eras.forEach(function (era) {
        era.style.display = era.getAttribute('data-group') === g ? '' : 'none';
      });
      // sub-navigasi modul hanya relevan pada tab Pengantar
      if (subnav) subnav.hidden = (g !== 'pengantar');
      if (gulir) window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('tab', g);
        history.replaceState(null, '', url);
      } catch (e) { /* file:// tanpa dukungan URL: abaikan */ }
    }

    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        bukaTab(btn.getAttribute('data-tab'), true);
      });
    });

    // tentukan tab awal: ?tab=..., lalu #m0/#m3, jika tidak ada pakai Pengantar
    var awal = null;
    try { awal = new URL(window.location.href).searchParams.get('tab'); } catch (e) { /* abaikan */ }
    if (awal !== 'pengantar' && awal !== 'materi') {
      var h = (window.location.hash || '').replace('#', '');
      var sec = h && document.getElementById(h);
      awal = sec && sec.classList.contains('era')
        ? sec.getAttribute('data-group')
        : 'pengantar';
    }
    bukaTab(awal, false);

    // tautan sub-navigasi: pastikan tab Pengantar terbuka lebih dulu
    if (subnav) {
      subnav.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (ev) {
          var target = document.getElementById(a.getAttribute('href').slice(1));
          if (!target) return;
          ev.preventDefault();
          if (target.getAttribute('data-group') !== 'pengantar') bukaTab('pengantar', false);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }

  /* ---------- 3. Tombol kembali ke atas ---------- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      window.requestAnimationFrame(function () {
        toTop.classList.toggle('show', window.scrollY > 520);
        tick = false;
      });
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
