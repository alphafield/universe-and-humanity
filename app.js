// app.js
console.log("app.js loaded");

// 1) Scroll indicator click -> scroll down one viewport
(function bindScrollIndicator() {
  const indicator = document.querySelector(".scroll-indicator");
  if (!indicator) return;

  indicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: "smooth",
    });
  });
})();

// 2) Smooth scroll for internal anchors: <a href="#section">
(function bindAnchorSmoothScroll() {
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
})();
