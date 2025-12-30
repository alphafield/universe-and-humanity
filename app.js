// ------------------------------
// 1) Scientists Marquee (30)
// ------------------------------
const names = [
  "Isaac Newton","Albert Einstein","James Clerk Maxwell","Michael Faraday","Niels Bohr",
  "Werner Heisenberg","Erwin Schrödinger","Paul Dirac","Richard Feynman","Max Planck",
  "Emmy Noether","Stephen Hawking","Roger Penrose","Edwin Hubble","Georges Lemaître",
  "Subrahmanyan Chandrasekhar","Vera Rubin","Jocelyn Bell Burnell","Henri Poincaré",
  "Alan Guth","Carlo Rovelli","John Wheeler","Murray Gell-Mann","Steven Weinberg",
  "Abdus Salam","Peter Higgs","Enrico Fermi","Wolfgang Pauli","Hendrik Lorentz","David Hilbert"
];

const track = document.getElementById("marqueeTrack");
if (track) {
  const build = (arr) => arr.map(n => `<span>${n}</span>`).join("");
  track.innerHTML = build(names) + build(names);
}

// ------------------------------
// 2) WebGL guard + Galaxy (VISIBLE)
// ------------------------------
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

const canvas = document.getElementById("galaxy-canvas");
if (!canvas || !window.THREE || !hasWebGL()) {
  // WebGL 不可用：CSS 兜底背景会顶上来，这里直接退出
  console.warn("[Galaxy] WebGL/THREE unavailable. Using CSS fallback.");
} else {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 2000
  );
  camera.position.z = 6.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // 透明，配合 body 背景

  // 让它“必然看得见”：更大点、更亮、更多粒子
  const particleCount = 65000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const arms = 3;
  const radiusMax = 5.6;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    const r = Math.pow(Math.random(), 0.52) * radiusMax;
    const arm = i % arms;
    const baseAngle = (arm / arms) * Math.PI * 2;

    const twist = r * 0.92;
    const angle = baseAngle + twist + (Math.random() - 0.5) * 0.45;

    const thickness = (1 - r / radiusMax);
    const y = (Math.random() - 0.5) * 1.2 * thickness;

    positions[i3]     = Math.cos(angle) * r + (Math.random() - 0.5) * 0.08;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.08;

    // 颜色：外圈冷白，内核更亮一点
    const t = r / radiusMax;
    const core = (1 - t);
    colors[i3]     = 0.65 + core * 0.25; // R
    colors[i3 + 1] = 0.72 + core * 0.20; // G
    colors[i3 + 2] = 1.00;               // B
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.032,                 // ✅ 关键：更大
    vertexColors: true,
    transparent: true,
    opacity: 1.0,                // ✅ 关键：更亮
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let targetRX = 0, targetRY = 0;
  let rx = 0, ry = 0;

  window.addEventListener("mousemove", (e) => {
    const mx = (e.clientX / window.innerWidth) * 2 - 1;
    const my = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRY = mx * 0.12;
    targetRX = my * 0.10;
  });

  function animate() {
    requestAnimationFrame(animate);

    ry += (targetRY - ry) * 0.03;
    rx += (targetRX - rx) * 0.03;

    points.rotation.y = ry + performance.now() * 0.00005;
    points.rotation.x = rx + performance.now() * 0.00003;

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
