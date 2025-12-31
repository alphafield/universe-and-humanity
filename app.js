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

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

const canvas = document.getElementById('galaxy-canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 8;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const params = {
  count: 20000,
  radius: 6,
  branches: 4,
  spin: 1.2,
  randomness: 0.35,
  randomnessPower: 3,
  insideColor: new THREE.Color(0xffffff),
  outsideColor: new THREE.Color(0x3b6cff),
};

let geometry, material, points;

function generateGalaxy() {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    const r = Math.random() * params.radius;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;
    const spinAngle = r * params.spin;

    const rand = (scale) =>
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      r *
      scale;

    positions[i3]     = Math.cos(branchAngle + spinAngle) * r + rand(1);
    positions[i3 + 1] = rand(0.25);
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand(1);

    const mixed = params.insideColor.clone();
    mixed.lerp(params.outsideColor, r / params.radius);

    colors[i3]     = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: 0.025,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

generateGalaxy();

let burst = true;
let t = 0;
const clock = new THREE.Clock();

function tick() {
  const dt = clock.getDelta();
  t += dt;
  if (burst && t > 2.0) burst = false;

  const speed = burst ? 0.4 : 0.03;
  points.rotation.y += speed * dt;
  points.rotation.x += speed * 0.15 * dt;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// ===== Scientists Cards (bottom platform) =====
const track = document.getElementById('marqueeTrack');

if (track) {
  const data = [
    { name: "Michael Faraday", meta: "Physics · 1831", mark: "∂B/∂t" },
    { name: "Albert Einstein", meta: "Physics · 1905–1915", mark: "E = mc²" },
    { name: "Max Planck", meta: "Physics · 1900", mark: "E = hν" },
    { name: "Niels Bohr", meta: "Physics · 1913", mark: "Eₙ ∝ -1/n²" },
    { name: "Werner Heisenberg", meta: "Physics · 1927", mark: "ΔxΔp ≥ ħ/2" },
    { name: "Erwin Schrödinger", meta: "Physics · 1926", mark: "iħ∂ψ/∂t = Ĥψ" },
    { name: "Paul Dirac", meta: "Physics · 1928", mark: "(iγ·∂ − m)ψ = 0" },
    { name: "Emmy Noether", meta: "Math/Physics · 1918", mark: "Symmetry ↔ Conservation" },
  ];

  const makeCard = (x) => {
    const card = document.createElement('div');
    card.className = 'marquee-card';

    const n = document.createElement('div');
    n.className = 'm-name';
    n.textContent = x.name;

    const m = document.createElement('div');
    m.className = 'm-meta';
    m.textContent = x.meta;

    const k = document.createElement('div');
    k.className = 'm-mark';
    k.textContent = x.mark;

    card.appendChild(n);
    card.appendChild(m);
    card.appendChild(k);
    return card;
  };

  track.innerHTML = '';
  const frag = document.createDocumentFragment();
  data.forEach(x => frag.appendChild(makeCard(x)));
  track.appendChild(frag);

  // duplicate once for seamless scroll
  const copy = track.cloneNode(true);
  while (copy.firstChild) track.appendChild(copy.firstChild);
}

