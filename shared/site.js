/* /shared/site.js
   Stable site behaviors:
   - Language switch (data-en / data-zh)
   - Smooth scroll for in-page anchors (#...)
   - Hero scroll indicator
   - Safe: never relies on nav index order
*/

(function () {
  // ---- 工具：DOM Ready ----
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // ---- 工具：安全取元素 ----
  function $(sel, root = document) {
    return root.querySelector(sel);
  }
  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  // ---- 工具：按 data-key 找需要翻译的节点 ----
  // HTML 中给需要切换文字的元素加：data-i18n="nav_alpha" 以及 data-en / data-zh
  function applyDatasetLang(lang) {
    $all("[data-en][data-zh]").forEach(el => {
      const v = el.dataset[lang];
      if (typeof v === "string" && v.length) el.textContent = v;
    });
  }

  // ---- 语言切换 ----
  function setActiveLangBtn(lang) {
    $all('.lang-switch span[data-lang]').forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }

  function switchLang(lang) {
    const safeLang = (lang === "en") ? "en" : "zh";
    try { localStorage.setItem("site_lang", safeLang); } catch (e) {}

    // 1) 页面通用：所有 data-en/data-zh 自动切换
    applyDatasetLang(safeLang);

    // 2) Hero：若存在则切换显示（不强依赖）
    const titleEl = document.getElementById("hero-title");
    const enText = document.getElementById("hero-text-en");
    const zhText = document.getElementById("hero-text-zh");

    if (titleEl) titleEl.textContent = (safeLang === "en") ? "UNIVERSE & HUMANITY" : "宇宙与人类";
    if (enText && zhText) {
      enText.style.display = (safeLang === "en") ? "block" : "none";
      zhText.style.display = (safeLang === "en") ? "none" : "block";
    }

    // 3) 标记按钮
    setActiveLangBtn(safeLang);
  }

  function bindLangSwitch() {
    const btns = $all('.lang-switch span[data-lang]');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        switchLang(lang);
      });
    });
  }

  // ---- 平滑滚动：只拦截纯 #... ----
  function bindAnchorSmoothScroll() {
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return; // 目标不存在，不拦截（保持默认行为）

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // ---- Hero 指示器：滚动一屏 ----
  function bindScrollIndicator() {
    // 兼容：你可能用 id 或 class
    const indicator = document.getElementById("scroll-indicator") || $(".scroll-indicator");
    if (!indicator) return;

    indicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth"
      });
    });
  }

  // ---- 初始化 ----
  onReady(() => {
    bindLangSwitch();
    bindAnchorSmoothScroll();
    bindScrollIndicator();

    // 启动时应用记忆语言（默认 zh）
    let lang = "zh";
    try {
      const saved = localStorage.getItem("site_lang");
      if (saved === "en" || saved === "zh") lang = saved;
    } catch (e) {}
    switchLang(lang);
  });
})();


