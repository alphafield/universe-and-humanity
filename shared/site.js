/* /shared/site.js
   Stable minimal site script
   - Language switch (.lang / .lang-zh / .lang-en)
   - Lang buttons (.langbtn[data-lang])
   - Safe init, single entry, no duplication
*/

(function () {

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function setLang(lang) {
    const safe = (lang === "en") ? "en" : "zh";

    try { localStorage.setItem("site_lang", safe); } catch (e) {}

    // toggle content
    document.querySelectorAll(".lang").forEach(el => {
      el.classList.remove("active");
    });
    document.querySelectorAll(".lang-" + safe).forEach(el => {
      el.classList.add("active");
    });

    // toggle buttons (if exist)
    document.querySelectorAll(".langbtn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === safe);
    });

    // html lang (optional)
    document.documentElement.setAttribute(
      "lang",
      safe === "zh" ? "zh-CN" : "en"
    );
  }

  // expose (optional)
  window.setLang = setLang;

  ready(() => {
    // init language
    let lang = "zh";
    try {
      const saved = localStorage.getItem("site_lang");
      if (saved === "zh" || saved === "en") lang = saved;
    } catch (e) {}
    setLang(lang);

    // event delegation for lang buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".langbtn");
      if (!btn) return;
      const l = btn.dataset.lang;
      if (l === "zh" || l === "en") setLang(l);
    });
  });

})();



