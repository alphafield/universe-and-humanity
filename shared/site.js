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
    document.querySelectorAll(".lang").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".lang-" + safe).forEach(el => el.classList.add("active"));

    // toggle buttons (if exist)
    document.querySelectorAll(".langbtn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === safe);
    });

    // html lang (optional)
    document.documentElement.setAttribute("lang", safe === "zh" ? "zh-CN" : "en");
  }

  // expose globally (optional)
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
<script>
  // Minimal i18n for this page
  const I18N = {
    zh: {
      overview_kicker: "OVERVIEW",
      overview_title: "我们在做什么",
      overview_lead:
        "人类对宇宙的理解，来自一代又一代思想者的提问与计算：宇宙是什么、时空是什么、生命是什么、信息是什么、意识是什么。我们把这些问题放在同一条“结构轨迹”上，尝试用一个统一的结构坐标来组织它们。",
      overview_desc:
        "这里不是宣言式结论，而是一个公开的探索接口：把可读的观点、图、时间戳与卷著发布对齐，让读者直接进入核心内容，并找到进一步的技术资源入口（研究院）。",
      chip_1: "Universe → Life → Consciousness → Civilization",
      chip_2: "Figures + Timestamps",
      chip_3: "Books as the main release",
      btn_volumes: "VOLUMES →",
      btn_publishing: "PUBLISHING →",
      fig1_title: "Standing on shoulders",
      fig1_sub: "把 Hero 的思想家时间线，延展为站点的结构入口。",

      alpha_kicker: "ALPHA",
      alpha_title: "α：一个统一的结构坐标",
      alpha_lead:
        "我们用 α 描述“相干结构维持”与“扰动/噪声/重组压力”之间的结构关系，作为跨尺度的统一坐标：把宇宙演化、生命出现、意识阈值与文明路径放在同一张可导航的图上。",
      alpha_note:
        "在公开层面，我们只给出可读的图与可验证的结构叙述；更细的方程与推导，作为研究院资源库逐步开放（带时间戳与版本）。",
      fig2_title: "α as a structural coordinate",
      fig2_sub: "One parameter. One structural trajectory.",
      btn_enter_alpha: "ENTER α →",
      btn_universe: "UNIVERSE →",
      btn_humanity: "HUMANITY →",
      btn_civilization: "CIVILIZATION →",

      footer_uh: "是卷著的公共发布接口：图、时间戳、可读结构与导航。",
      footer_afi: "是技术资源库：中性定义、内部笔记、分阶段公开与版本化发布。",
      footer_nav_title: "Navigate",
      footer_lang_title: "Language",
      footer_build: "Build: minimal / SpaceX-style bands · Assets: your original figures"
    },
    en: {
      overview_kicker: "OVERVIEW",
      overview_title: "What we’re building",
      overview_lead:
        "Our understanding of the universe is shaped by generations of questions and calculations: What is the universe, spacetime, life, information, and consciousness? We place them on a single structural trajectory and organize them with one navigable coordinate.",
      overview_desc:
        "This is not a manifesto. It is a public interface: aligning readable viewpoints, figures, and timestamps with the book releases—so readers can enter the core content and find the technical resource gateway (the Institute).",
      chip_1: "Universe → Life → Consciousness → Civilization",
      chip_2: "Figures + Timestamps",
      chip_3: "Books as the main release",
      btn_volumes: "VOLUMES →",
      btn_publishing: "PUBLISHING →",
      fig1_title: "Standing on shoulders",
      fig1_sub: "A minimal bridge from the Hero timeline into the site structure.",

      alpha_kicker: "ALPHA",
      alpha_title: "α: a unified structural coordinate",
      alpha_lead:
        "We use α to describe the relation between coherence maintenance and perturbation/noise/reconfiguration pressure—an across-scale coordinate that maps cosmic evolution, life, consciousness thresholds, and civilizational paths onto one navigable chart.",
      alpha_note:
        "Publicly, we provide readable figures and testable structural claims. Equation-level details are staged within the Institute resource library (with timestamps and versions).",
      fig2_title: "α as a structural coordinate",
      fig2_sub: "One parameter. One structural trajectory.",
      btn_enter_alpha: "ENTER α →",
      btn_universe: "UNIVERSE →",
      btn_humanity: "HUMANITY →",
      btn_civilization: "CIVILIZATION →",

      footer_uh: "Public release interface for the volumes: figures, timestamps, readable structure, navigation.",
      footer_afi: "Technical resource library: neutral definitions, internal notes, staged releases, versioning.",
      footer_nav_title: "Navigate",
      footer_lang_title: "Language",
      footer_build: "Build: minimal / SpaceX-style bands · Assets: your original figures"
    }
  };

  function setLang(lang){
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
    });

    document.querySelectorAll("[data-lang]").forEach(btn=>{
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    document.documentElement.setAttribute("lang", lang === "zh" ? "zh" : "en");
    localStorage.setItem("uh_lang", lang);
  }

  // Bind buttons (both top and footer)
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.getAttribute("data-lang")));
  });

  // Init
  const saved = localStorage.getItem("uh_lang") || "zh";
  setLang(saved);
</script>
