/* Jedno heslo pro celou kroniku: <script src="heslo.js"></script> v <head>. Po zadání platí do zavření prohlížeče.
   Na úvodní stránce je vidět přebal; heslo se chce až po kliknutí na něj (window.kronikaZeptejSe). */
(function () {
  var HESLO = '26092026';
  var klic = 'kronika-heslo';
  var naIndexu = /(^|\/)(index\.html)?$/.test(location.pathname);
  function odemceno() { try { return sessionStorage.getItem(klic) === '1'; } catch (e) { return false; } }
  function uloz() { try { sessionStorage.setItem(klic, '1'); } catch (e) {} }
  window.kronikaOdemceno = odemceno;

  var st = document.createElement('style');
  st.textContent =
    'html.zamceno body > *:not(#hesloBrana) { display: none !important; }' +
    'html.zamceno body { background: #f7f2e7; }' +
    '#hesloBrana { max-width: 340px; margin: 18vh auto 0; padding: 0 20px; text-align: center; font-family: Georgia, "Times New Roman", serif; color: #2b241b; }' +
    '#hesloBrana.prekryv { position: fixed; inset: 0; max-width: none; margin: 0; padding: 20px; background: rgba(25,18,12,0.62); display: flex; align-items: center; justify-content: center; z-index: 50; }' +
    '#hesloBrana.prekryv .okno { background: #f7f2e7; border-radius: 12px; padding: 26px 22px 20px; width: 100%; max-width: 340px; box-shadow: 0 8px 30px rgba(0,0,0,0.35); }' +
    '#hesloBrana label { display: block; font-style: italic; margin-bottom: 0.7rem; }' +
    '#hesloBrana input { font: inherit; width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #6f6253; border-radius: 8px; background: #efe6d2; color: #2b241b; text-align: center; letter-spacing: 0.15em; }' +
    '#hesloBrana button { font: inherit; margin-top: 0.7rem; padding: 9px 22px; border: 0; border-radius: 8px; background: #8e2020; color: #fff; cursor: pointer; }' +
    '#hesloBrana p { color: #8e2020; min-height: 1.4em; margin: 0.6rem 0 0; font-style: italic; }' +
    '#hesloBrana a { color: #8e2020; font-size: 0.9rem; cursor: pointer; }';
  document.head.appendChild(st);

  function formular(prekryv, onOk) {
    if (document.getElementById('hesloBrana')) return;
    var f = document.createElement('form');
    f.id = 'hesloBrana'; f.autocomplete = 'off';
    if (prekryv) f.className = 'prekryv';
    f.innerHTML = '<div class="okno"><label for="hesloKap">Kronika z Nižboru je zamčená. Zadejte heslo.</label>' +
      '<input type="password" id="hesloKap" inputmode="numeric" autocomplete="off">' +
      '<button type="submit">Odemknout</button><p id="hesloKapChyba" role="alert"></p>' +
      (prekryv ? '<a id="hesloZpet" role="button" tabindex="0">← Zpět k přebalu</a>' : '<a href="index.html">← Zpět na úvod</a>') + '</div>';
    document.body.appendChild(f);
    var pole = f.querySelector('input'), ch = f.querySelector('p');
    pole.focus();
    function zavri() { f.remove(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') zavri(); }
    if (prekryv) {
      document.addEventListener('keydown', esc);
      f.querySelector('#hesloZpet').addEventListener('click', zavri);
      f.addEventListener('click', function (e) { if (e.target === f) zavri(); });
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (pole.value.trim() === HESLO) { uloz(); zavri(); onOk(); }
      else { ch.textContent = 'Heslo nesouhlasí. Zkuste to znovu.'; pole.select(); }
    });
  }

  if (naIndexu) {
    window.kronikaZeptejSe = function (onOk) { if (odemceno()) onOk(); else formular(true, onOk); };
    return;
  }
  if (odemceno()) return;
  var root = document.documentElement;
  root.classList.add('zamceno');
  function vloz() { formular(false, function () { root.classList.remove('zamceno'); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vloz); else vloz();
})();
