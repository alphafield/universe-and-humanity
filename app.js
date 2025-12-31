/* =========================
   0) Safety: stop CSS text showing on page
   (If you ever see raw CSS text again, it means styles.css got pasted into HTML body.
    This JS does nothing to "fix" that; you must keep files separated.
   ========================= */

/* =========================
   1) Top-right Library toggle
   ========================= */
(() => {
  const trigger = document.querySelector(".library-trigger");
  const panel = document.querySelector(".library-panel");
  if (!trigger || !panel) return;

  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".library-menu")) {
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    }
  });
})();

/* =========================
   2) Scientists cards marquee (duplicate for seamless loop)
   ========================= */
(() => {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  const scientists = [
    { name: "Michael Faraday", meta: "Physics · 1831", mark: "∂B/∂t" },
    { name: "Albert Einstein", meta: "Physics · 1905–1915", mark: "E = mc²" },
    { name: "Max Planck", meta: "Physics · 1900", mark: "E = hν" },
    { name: "Niels Bohr", meta: "Physics · 1913", mark: "Eₙ ∝ −1/n²" },
    { name: "Werner Heisenberg", meta: "Physics · 1927", mark: "Δx·Δp ≥ ħ/2" },
    { name: "Erwin Schrödinger", meta: "Physics · 1926", mark: "iħ∂ψ/∂t = Hψ" },
    { name: "Paul Dirac", meta: "Physics · 1928", mark: "(iγ·∂ − m)ψ = 0" },
    { name: "Wolfgang Pauli", meta: "Physics · 1925", mark: "[σᵢ,σⱼ]=2iεᵢⱼₖσₖ" }
  ];

  const makeCard = (s) => {
    const card = document.createElement("div");
    card.className = "marquee-card";
    card.innerHTML = `
      <div class="m-name">${s.name}</div>
      <div class="m-meta">${s.meta}</div>
      <div class="m-mark">${s.mark}</div>
    `;
    return card;
  };

  track.innerHTML = "";
  scientists.forEach(s => track.appendChild(makeCard(s)));
  // Duplicate once for seamless loop
  scientists.forEach(s => track.appendChild(makeCard(s)));
})();

/* =========================
   3) Galaxy background (stable, no WebGPU dependency)
   — You can later swap to real Three/WebGPU; this keeps site always working.
   ========================= */
(() => {
  const canvas = document.getElementById("galaxy-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let w, h, dpr;
  const stars = [];
  const STAR_N = 4200;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(innerWidth * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }

  function seed(){
    stars.length = 0;
    const cx = w * 0.5, cy = h * 0.52;
    const maxR = Math.min(w, h) * 0.46;

    for(let i=0;i<STAR_N;i++){
      const t = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.55) * maxR;
      const arm = Math.sin(t*2.6) * 0.18 * r;
      const x = cx + Math.cos(t) * (r + arm) + (Math.random()-0.5) * 10*dpr;
      const y = cy + Math.sin(t) * (r + arm) + (Math.random()-0.5) * 10*dpr;

      const s = 0.6 + Math.random() * 1.4;
      const a = 0.15 + Math.random() * 0.55;
      const hue = 210 + Math.random() * 30; // cold blue-white
      stars.push({ x, y, r, s, a, hue });
    }
  }

  let tick = 0;
  function draw(){
    tick += 0.0035;
    ctx.clearRect(0,0,w,h);

    // subtle core glow
    const cx = w*0.5, cy = h*0.52;
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*0.28);
    g.addColorStop(0, "rgba(255,255,255,0.08)");
    g.addColorStop(0.35, "rgba(150,190,255,0.05)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // rotate very slowly around center
    const cos = Math.cos(tick), sin = Math.sin(tick);

    for(const p of stars){
      const dx = p.x - cx, dy = p.y - cy;
      const rx = cx + dx*cos - dy*sin;
      const ry = cy + dx*sin + dy*cos;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 78%, ${p.a})`;
      ctx.arc(rx, ry, p.s, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  seed();
  draw();

  window.addEventListener("resize", () => {
    resize();
    seed();
  });
})();
