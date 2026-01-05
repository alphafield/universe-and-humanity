// app.js
console.log("app.js loaded");

window.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Scroll indicator: scroll down one viewport
  const indicator = document.querySelector(".scroll-indicator");
  console.log("scroll-indicator found:", indicator);

  if (indicator) {
    indicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // 2️⃣ Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
