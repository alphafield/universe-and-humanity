// app.js
console.log("app.js loaded");

// ---- 工具：DOM Ready ----
function onReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

onReady(() => {
  bindLangSwitch();
  bindAnchorSmoothScroll();
  bindScrollIndicator();
});

// ---- 1) 语言切换（统一绑定，不写内联 onclick）----
function bindLangSwitch() {
  const langBtns = document.querySelectorAll(".lang-switch span[data-lang]");
  if (!langBtns.length) return;

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      switchLang(lang);
    });
  });
}

function switchLang(lang) {
  const titleEl = document.getElementById("hero-title");
  const enText = document.getElementById("hero-text-en");
  const zhText = document.getElementById("hero-text-zh");

  const langBtns = document.querySelectorAll(".lang-switch span[data-lang]");
  const navLinks = document.querySelectorAll(".nav-menu > a");
  const navDropdowns = document.querySelectorAll(".nav-menu .nav-dropdown > span");
  const dropdownTitles = document.querySelectorAll(".nav-dropdown-title");
  const seriesDropdownLinks = document.querySelectorAll(".nav-menu .nav-dropdown:last-child .nav-dropdown-content a");
  const humanityDropdownLinks = document.querySelectorAll(".nav-menu .nav-dropdown:first-of-type .nav-dropdown-content a");

  const scientistNames = document.querySelectorAll(".scientist-name");
  const scientistYears = document.querySelectorAll(".scientist-year");
  const scientistBlurbs = document.querySelectorAll(".scientist-blurb");
  const scientistContributions = document.querySelectorAll(".scientist-contribution");

  const volumesHeader = document.querySelector(".volumes-header h2");
  const volumesSubtitle = document.querySelector(".volumes-header .subtitle");

  const setActive = (activeLang) => {
    langBtns.forEach(b => {
      const isActive = b.getAttribute("data-lang") === activeLang;
      b.classList.toggle("active", isActive);
    });
  };

  if (lang === "en") {
    if (titleEl) titleEl.textContent = "UNIVERSE & HUMANITY";
    if (enText) enText.style.display = "block";
    if (zhText) zhText.style.display = "none";

    if (navLinks[0]) navLinks[0].textContent = "ALPHA";
    if (navLinks[1]) navLinks[1].textContent = "UNIVERSE";
    if (navLinks[2]) navLinks[2].textContent = "NEW CIVILIZATION";

    if (navDropdowns[0]) navDropdowns[0].innerHTML = "HUMANITY ▾";
    if (navDropdowns[1]) navDropdowns[1].innerHTML = "UNIVERSE & HUMANITY SERIES ▾";

    if (dropdownTitles[0]) dropdownTitles[0].textContent = "Human Exploration";
    if (humanityDropdownLinks[0]) humanityDropdownLinks[0].textContent = "Humanity Overview";
    if (humanityDropdownLinks[1]) humanityDropdownLinks[1].textContent = "Thinkers";

    if (dropdownTitles[1]) dropdownTitles[1].textContent = "Complete Series";
    if (seriesDropdownLinks[0]) seriesDropdownLinks[0].textContent = "Nine Volumes (Scientific Edition)";
    if (seriesDropdownLinks[1]) seriesDropdownLinks[1].textContent = "Universe Epic (Narrative Edition)";
    if (seriesDropdownLinks[2]) seriesDropdownLinks[2].textContent = "Cosmic Dao (Eastern Wisdom Edition)";
    if (seriesDropdownLinks[3]) seriesDropdownLinks[3].textContent = "Cosmic Sutra (Condensed Edition)";
    if (seriesDropdownLinks[4]) seriesDropdownLinks[4].textContent = "Cosmic Parables (Poetic Edition)";
    if (seriesDropdownLinks[5]) seriesDropdownLinks[5].textContent = "Publishing & Collaboration";
    if (seriesDropdownLinks[6]) seriesDropdownLinks[6].textContent = "Contact Us";

    scientistNames.forEach(el => el.textContent = el.dataset.en || el.textContent);
    scientistYears.forEach(el => el.textContent = el.dataset.en || el.textContent);
    scientistBlurbs.forEach(el => el.textContent = el.dataset.en || el.textContent);
    scientistContributions.forEach(el => el.textContent = el.dataset.en || el.textContent);

    if (volumesHeader) volumesHeader.textContent = volumesHeader.dataset.en || volumesHeader.textContent;
    if (volumesSubtitle) volumesSubtitle.textContent = volumesSubtitle.dataset.en || volumesSubtitle.textContent;

    setActive("en");
  } else {
    if (titleEl) titleEl.textContent = "宇宙与人类";
    if (enText) enText.style.display = "none";
    if (zhText) zhText.style.display = "block";

    if (navLinks[0]) navLinks[0].textContent = "阿尔法无量纲";
    if (navLinks[1]) navLinks[1].textContent = "宇宙";
    if (navLinks[2]) navLinks[2].textContent = "新文明";

    if (navDropdowns[0]) navDropdowns[0].innerHTML = "人类 ▾";
    if (navDropdowns[1]) navDropdowns[1].innerHTML = "《宇宙与人类》系列卷著 ▾";

    if (dropdownTitles[0]) dropdownTitles[0].textContent = "人类探索";
    if (humanityDropdownLinks[0]) humanityDropdownLinks[0].textContent = "人类概述";
    if (humanityDropdownLinks[1]) humanityDropdownLinks[1].textContent = "思想家";

    if (dropdownTitles[1]) dropdownTitles[1].textContent = "完整系列";
    if (seriesDropdownLinks[0]) seriesDropdownLinks[0].textContent = "九卷（科学理论版）";
    if (seriesDropdownLinks[1]) seriesDropdownLinks[1].textContent = "宇宙史诗（叙事版）";
    if (seriesDropdownLinks[2]) seriesDropdownLinks[2].textContent = "宇宙之道（东方智慧版）";
    if (seriesDropdownLinks[3]) seriesDropdownLinks[3].textContent = "宇宙心经（精简版）";
    if (seriesDropdownLinks[4]) seriesDropdownLinks[4].textContent = "宇宙寓言（诗歌艺术版）";
    if (seriesDropdownLinks[5]) seriesDropdownLinks[5].textContent = "出版与合作";
    if (seriesDropdownLinks[6]) seriesDropdownLinks[6].textContent = "联系我们";

    scientistNames.forEach(el => el.textContent = el.dataset.zh || el.textContent);
    scientistYears.forEach(el => el.textContent = el.dataset.zh || el.textContent);
    scientistBlurbs.forEach(el => el.textContent = el.dataset.zh || el.textContent);
    scientistContributions.forEach(el => el.textContent = el.dataset.zh || el.textContent);

    if (volumesHeader) volumesHeader.textContent = volumesHeader.dataset.zh || volumesHeader.textContent;
    if (volumesSubtitle) volumesSubtitle.textContent = volumesSubtitle.dataset.zh || volumesSubtitle.textContent;

    setActive("zh");
  }
}

// ---- 2) 锚点平滑滚动（只拦截 #...）----
function bindAnchorSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return; // 如果目标不存在，别拦截

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ---- 3) Hero 大V箭头：滚动一屏 ----
function bindScrollIndicator() {
  const indicator = document.getElementById("scroll-indicator");
  if (!indicator) return;

  indicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: "smooth"
    });
  });
}


