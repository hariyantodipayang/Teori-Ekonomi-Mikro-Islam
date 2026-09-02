// Era filter — only present on index.html; no-ops safely on detail pages.
(function () {
  var buttons = document.querySelectorAll('.filter-btn');
  var eras = document.querySelectorAll('.era');
  if (!buttons.length || !eras.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      eras.forEach(function (era) {
        era.style.display = (f === 'all' || era.getAttribute('data-era') === f) ? '' : 'none';
      });
    });
  });
})();
