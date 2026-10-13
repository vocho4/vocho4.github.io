/* Heslo ke kapitole: <script src="heslo.js" data-heslo="..."></script> v <head> kapitoly. */
(function () {
  var s = document.currentScript;
  var HESLO = s && s.getAttribute('data-heslo');
  if (!HESLO) return;
  var klic = 'kronika-kap-' + location.pathname.split('/').pop();
  try { if (sessionStorage.getItem(klic) === '1') return; } catch (e) {}
  var root = document.documentElement;
  root.classList.add('zamceno');
  var st = document.createElement('style');
  st.textContent =
    'html.zamceno body > *:not(#hesloBrana) { display: none !important; }' +
    '#hesloBrana { max-width: 340px; margin: 18vh auto 0; padding: 0 20px; text-align: center; font-family: Georgia, "Times New Roman", serif; color: #2b241b; }' +
    '#hesloBrana label { display: block; font-style: italic; margin-bottom: 0.7rem; }' +
    '#hesloBrana input { font: inherit; width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #6f6253; border-radius: 8px; background: #efe6d2; color: #2b241b; text-align: center; letter-spacing: 0.15em; }' +
    '#hesloBrana button { font: inherit; margin-top: 0.7rem; padding: 9px 22px; border: 0; border-radius: 8px; background: #8e2020; color: #fff; cursor: pointer; }' +
    '#hesloBrana p { color: #8e2020; min-height: 1.4em; margin: 0.6rem 0 0; font-style: italic; }' +
    '#hesloBrana a { color: #8e2020; font-size: 0.9rem; }' +
    'html.zamceno body { background: #f7f2e7; }';
  document.head.appendChild(st);
  function vloz() {
    var f = document.createElement('form');
    f.id = 'hesloBrana'; f.autocomplete = 'off';
    f.innerHTML = '<label for="hesloKap">Tato kapitola je zamčená. Zadejte heslo.</label>' +
      '<input type="password" id="hesloKap" inputmode="numeric" autocomplete="off">' +
      '<button type="submit">Odemknout</button><p id="hesloKapChyba" role="alert"></p>' +
      '<a href="index.html#obsah">← Zpět na obsah</a>';
    document.body.appendChild(f);
    var pole = f.querySelector('input'), ch = f.querySelector('p');
    pole.focus();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (pole.value.trim() === HESLO) {
        try { sessionStorage.setItem(klic, '1'); } catch (x) {}
        root.classList.remove('zamceno'); f.remove();
      } else { ch.textContent = 'Heslo nesouhlasí. Zkuste to znovu.'; pole.select(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vloz); else vloz();
})();
