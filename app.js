// ==============================
// Scientists Marquee (30) — 四段卡片
// ==============================
const scientists = [
  { name:"Isaac Newton", era:"1687", field:"Physics", mark:"F = G m₁m₂/r²" },
  { name:"James Clerk Maxwell", era:"1865", field:"Physics", mark:"∇·E = ρ/ε₀" },
  { name:"Michael Faraday", era:"1831", field:"Physics", mark:"∮E·dl = −dΦ/dt" },
  { name:"Albert Einstein", era:"1905–1915", field:"Physics", mark:"E = mc²" },
  { name:"Max Planck", era:"1900", field:"Physics", mark:"E = hν" },
  { name:"Niels Bohr", era:"1913", field:"Physics", mark:"Eₙ ∝ −1/n²" },
  { name:"Werner Heisenberg", era:"1927", field:"Physics", mark:"ΔxΔp ≥ ħ/2" },
  { name:"Erwin Schrödinger", era:"1926", field:"Physics", mark:"iħ∂ψ/∂t = Ĥψ" },
  { name:"Paul Dirac", era:"1928", field:"Physics", mark:"(iγ·∂ − m)ψ = 0" },
  { name:"Wolfgang Pauli", era:"1925", field:"Physics", mark:"[σᵢ,σⱼ]=2iεᵢⱼkσ_k" },
  { name:"Enrico Fermi", era:"1934", field:"Physics", mark:"(weak interaction)" },
  { name:"Richard Feynman", era:"1948", field:"Physics", mark:"∫𝒟x e^{iS/ħ}" },
  { name:"Emmy Noether", era:"1918", field:"Mathematics", mark:"Symmetry → Conservation" },
  { name:"John Wheeler", era:"1989", field:"Physics", mark:"It from Bit" },
  { name:"Stephen Hawking", era:"1974", field:"Cosmology", mark:"T ∝ 1/M" },
  { name:"Roger Penrose", era:"1965–", field:"Mathematics", mark:"Singularity theorems" },
  { name:"Edwin Hubble", era:"1929", field:"Astronomy", mark:"v = H₀ d" },
  { name:"Georges Lemaître", era:"1931", field:"Cosmology", mark:"Primeval atom" },
  { name:"Henri Poincaré", era:"1890s", field:"Mathematics", mark:"Qualitative dynamics" },
  { name:"David Hilbert", era:"1900", field:"Mathematics", mark:"Hilbert problems" },
  { name:"Alan Guth", era:"1981", field:"Cosmology", mark:"Inflation" },
  { name:"Carlo Rovelli", era:"1990s–", field:"Physics", mark:"Loop quantum gravity" },
  { name:"Subrahmanyan Chandrasekhar", era:"1931", field:"Astrophysics", mark:"M_Ch ≈ 1.44M☉" },
  { name:"Vera Rubin", era:"1970s", field:"Astronomy", mark:"Galaxy rotation curves" },
  { name:"Jocelyn Bell Burnell", era:"1967", field:"Astronomy", mark:"Pulsars" },
  { name:"Murray Gell-Mann", era:"1964", field:"Physics", mark:"Quarks" },
  { name:"Steven Weinberg", era:"1967", field:"Physics", mark:"Electroweak" },
  { name:"Abdus Salam", era:"1968", field:"Physics", mark:"Gauge unification" },
  { name:"Peter Higgs", era:"1964", field:"Physics", mark:"Higgs mechanism" },
  { name:"Hendrik Lorentz", era:"1904", field:"Physics", mark:"Lorentz transform" },
];

const track = document.getElementById("marqueeTrack");
if (track) {
  const cardHTML = (s) => `
    <div class="marquee-card">
      <div class="m-name">${s.name}</div>
      <div class="m-meta">${s.field} · ${s.era}</div>
      <div class="m-mark">${s.mark}</div>
    </div>`;
  const build = (arr) => arr.map(cardHTML).join("");
  track.innerHTML = build(scientists) + build(scientists); // 无缝循环
}

// ==============================
// Galaxy — 快速展开 → 慢速呼吸；亮度更真实
// ==============================
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

const canvas = document.getElementById("galaxy-canvas");
if (!canvas || !window.THREE || !hasWebGL()) {
  console.warn("[Galaxy] WebGL/THREE unavailable. Using CSS fallback.");
} else {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);

  // 关键：初始“远”，用于快速推进展开
  const Z_START = 18.0;
  const Z_END   = 6.4;
  camera.position.z = Z_START;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  // 更“宇宙”而非“艺术品”：粒子更小、更淡、颜色更克制
  const particleCount = 52000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const arms = 3;
  const radiusMax = 5.4;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const r = Math.pow(Math.random(), 0.55) * radiusMax;
    const arm = i % arms;
    const baseAngle = (arm / arms) * Math.PI * 2;
    const twist = r * 0.92;
    const angle = baseAngle + twist + (Math.random() - 0.5) * 0.42;

    const thickness = (1 - r / radiusMax);
    const y = (Math.random() - 0.5) * 1.1 * thickness;

    positions[i3]     = Math.cos(angle) * r + (Math.random() - 0.5) * 0.07;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.07;

    // 颜色：白偏冷，但不“发蓝灯”
    const t = r / radiusMax;
    const core = (1 - t);
    colors[i3]     = 0.72 + core * 0.10;
    colors[i3 + 1] = 0.76 + core * 0.10;
    colors[i3 + 2] = 0.92 + core * 0.08;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.018,                 // ✅ 更真实：小
    vertexColors: true,
    transparent: true,
    opacity: 0.58,               // ✅ 降亮度
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // 鼠标“很轻”的牵引
  let targetRX = 0, targetRY = 0, rx = 0, ry = 0;
  window.addEventListener("mousemove", (e) => {
    const mx = (e.clientX / window.innerWidth) * 2 - 1;
    const my = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRY = mx * 0.06;
    targetRX = my * 0.05;
  });

  // 快速展开：1.1s 内从远到近 + scale 从 0.88 到 1.0
  const t0 = performance.now();
  const introMs = 1100;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    const introT = Math.min(1, (now - t0) / introMs);
    const e = easeOutCubic(introT);

    // “快速铺开”效果：镜头推进 + 轻微放大
    camera.position.z = Z_START + (Z_END - Z_START) * e;
    const s = 0.88 + 0.12 * e;
    points.scale.set(s, s, s);

    // intro 后进入“慢速呼吸”
    const baseSpin = 0.00022; // ✅ 慢
    const breath = 0.00010 * Math.sin(now * 0.00035);

    ry += (targetRY - ry) * 0.025;
    rx += (targetRX - rx) * 0.025;

    points.rotation.y = ry + (now * (baseSpin + breath));
    points.rotation.x = rx + (now * (baseSpin * 0.55));

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  });
}
