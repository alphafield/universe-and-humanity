// app.js (root)

(function () {
  // 1) Scroll indicator: scroll to next section
  function bindScrollIndicator() {
    const indicators = document.querySelectorAll(".scroll-indicator");
    if (!indicators.length) return;

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const currentSection = indicator.closest("section");
        if (!currentSection) {
          // fallback
          window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: "smooth" });
          return;
        }
        const next = currentSection.nextElementSibling;
        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // 2) Smooth scroll for internal anchors
  function bindAnchorSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Run after DOM ready (works with/without defer)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindScrollIndicator();
      bindAnchorSmoothScroll();
    });
  } else {
    bindScrollIndicator();
    bindAnchorSmoothScroll();
  }
})();

