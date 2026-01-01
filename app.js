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
