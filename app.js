(() => {
  // --- dropdown (keep yours if already exists) ---
  const btn = document.getElementById("libraryBtn");
  const panel = document.getElementById("libraryPanel");

  const closePanel = () => {
    if (!panel || !btn) return;
    panel.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  };
  const openPanel = () => {
    if (!panel || !btn) return;
    panel.classList.add("show");
    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.contains("show") ? closePanel() : openPanel();
  });
  document.addEventListener("click", () => closePanel());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });

  // --- scientists (CN/EN separated principles) ---
  const isEN = (document.documentElement.lang || "").toLowerCase().startsWith("en");

  const scientistsCN = [
    { a:"E", n:"Einstein", y:"1905", c:"相对论 · 时空结构", m:"E = mc²" },
    { a:"S", n:"Schrödinger", y:"1926 / 1944", c:"量子奠基 · 生命之问", m:"生命的意义？生命是什么？" },
    { a:"D", n:"Dirac", y:"1928", c:"相对论量子化 · 对称", m:"(iγ^μ∂_μ − m)ψ = 0" },
    { a:"F", n:"Feynman", y:"1948", c:"路径积分 · 计算直觉", m:"Path Integral" },
    { a:"H", n:"Hawking", y:"1974", c:"黑洞热力学 · 信息", m:"S ∝ A" },
    { a:"W", n:"Wheeler", y:"1989", c:"信息本体 · 现实", m:"It from Bit" },
    { a:"老", n:"老子 Laozi", y:"公元前 6世纪", c:"结构直觉 · 道", m:"道可道，非常道" },
    { a:"佛", n:"佛陀 Buddha", y:"公元前 5世纪", c:"缘起 · 空性", m:"缘起性空" }
  ];

  const scientistsEN = [
    { a:"E", n:"Einstein", y:"1905", c:"Relativity · Spacetime", m:"E = mc²" },
    { a:"S", n:"Schrödinger", y:"1926 / 1944", c:"Quantum Foundations · Life", m:"What is Life?" },
    { a:"D", n:"Dirac", y:"1928", c:"QFT · Symmetry", m:"(iγ^μ∂_μ − m)ψ = 0" },
    { a:"F", n:"Feynman", y:"1948", c:"Path Integral · Computation", m:"Path Integral" },
    { a:"H", n:"Hawking", y:"1974", c:"Black Holes · Information", m:"S ∝ A" },
    { a:"W", n:"Wheeler", y:"1989", c:"Information · Reality", m:"It from Bit" },
    { a:"L", n:"Laozi", y:"c. 6th BCE", c:"Dao · Structural Intuition", m:"Dao that can be told…" },
    { a:"B", n:"Buddha", y:"c. 5th BCE", c:"Dependent Origination", m:"Emptiness & Origin" }
  ];

  const data = isEN ? scientistsEN : scientistsCN;

  const track = document.getElementById("scientistsTrack");
  if (track) {
    const make = (x) => {
      const card = document.createElement("div");
      card.className = "scientist-card";

      const av = document.createElement("div");
      av.className = "scientist-avatar";
      av.textContent = x.a;

      const name = document.createElement("div");
      name.className = "scientist-name";
      name.textContent = x.n;

      const year = document.createElement("div");
      year.className = "scientist-year";
      year.textContent = x.y;

      const contrib = document.createElement("div");
      contrib.className = "scientist-contribution";
      contrib.textContent = x.c;

      const mark = document.createElement("div");
      mark.className = "scientist-mark";
      mark.textContent = x.m;

      card.appendChild(av);
      card.appendChild(name);
      card.appendChild(year);
      card.appendChild(contrib);
      card.appendChild(mark);
      return card;
    };

    // 必须复制一遍实现无缝滚动（配合 translateX(-50%)）
    const doubled = [...data, ...data];
    doubled.forEach(x => track.appendChild(make(x)));
  }
})();
/* =========================
   Scientists strip data + infinite loop
   (CN version)
========================= */

(function () {
  const track = document.getElementById("scientistsTrack");
  if (!track) return;

  // ✅ 你说：科学家“组成和内容按我们之前的设计”，这里只是示例模板
  // 你把这一组改成你最终名单即可（中英各一份）
  const scientistsCN = [
    { avatar: "E", name: "Einstein", year: "1905", brief: "相对论 · 时空结构", eq: "E = mc²" },
    { avatar: "S", name: "Schrödinger", year: "1926 / 1944", brief: "量子基础 · 生命之问", eq: "生命的意义？ 生命是什么？" },
    { avatar: "D", name: "Dirac", year: "1928", brief: "相对论量子化 · 对称", eq: "(iγ^μ∂_μ − m)ψ = 0" },
    { avatar: "F", name: "Feynman", year: "1948", brief: "路径积分 · 计算直觉", eq: "Path Integral" },
    { avatar: "H", name: "Hawking", year: "1974", brief: "黑洞热力学", eq: "S = kA/4ℓₚ²" },
    { avatar: "W", name: "Wheeler", year: "1989", brief: "信息本体", eq: "It from Bit" },
    { avatar: "老", name: "老子 Laozi", year: "公元前 6世纪", brief: "道的结构语言", eq: "道可道，非常道" },
    { avatar: "佛", name: "佛陀 Buddha", year: "公元前 5世纪", brief: "缘起论", eq: "缘起性空" }
  ];

  function cardHTML(x) {
    return `
      <article class="scientist-card">
        <div class="scientist-avatar">${x.avatar}</div>
        <div class="scientist-name">${x.name}</div>
        <div class="scientist-year">${x.year}</div>
        <div class="scientist-brief">${x.brief}</div>
        <p class="scientist-eq">${x.eq}</p>
      </article>
    `;
  }

  // 1) 注入一次
  track.innerHTML = scientistsCN.map(cardHTML).join("");

  // 2) 复制一遍实现无缝（配合 CSS 的 -50%）
  track.innerHTML += track.innerHTML;

  // 3) 用户交互：悬停时暂停（可选，很多人喜欢；不影响速度）
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
})();

