// ------------------------------
// 1) Scientists Marquee (30 names)
// ------------------------------
const names = [
  "Isaac Newton",
  "Albert Einstein",
  "James Clerk Maxwell",
  "Michael Faraday",
  "Niels Bohr",
  "Werner Heisenberg",
  "Erwin Schrödinger",
  "Paul Dirac",
  "Richard Feynman",
  "Max Planck",
  "Emmy Noether",
  "Stephen Hawking",
  "Roger Penrose",
  "Edwin Hubble",
  "Georges Lemaître",
  "Subrahmanyan Chandrasekhar",
  "Vera Rubin",
  "Jocelyn Bell Burnell",
  "Henri Poincaré",
  "Alan Guth",
  "Carlo Rovelli",
  "John Wheeler",
  "Murray Gell-Mann",
  "Steven Weinberg",
  "Abdus Salam",
  "Peter Higgs",
  "Enrico Fermi",
  "Wolfgang Pauli",
  "Hendrik Lorentz",
  "David Hilbert"
];

const track = document.getElementById("marqueeTrack");
if (track) {
  const build = (arr) => arr.map(n => `<span>${n}</span>`).join("");
  // duplicate once for seamless loop (-50%)
  track.innerHTML = build(names) + build(names);
}

// ------------------------------
// 2) Three.js Galaxy Background (stable, lightweight)
// ------------------------------
const canvas = document.getElementById("galaxy-canvas");
if (canvas && window.THREE) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 7.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Particles
  const particleCount = 22000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // galaxy params
  const arms = 3;
  const radiusMax = 5.2;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // radius biased to center
    const r = Math.pow(Math.random(), 0.55) * radiusMax;
    const arm = i % arms;
    const baseAngle = (arm / arms) * Math.PI * 2;

    // twist
    const twist = r * 0.85;
    const angle = baseAngle + twist + (Math.random() - 0.5) * 0.35;

    // thickness
    const y = (Math.random() - 0.5) * 0.9 * (1 - r / radiusMax);

    positions[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.06;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.06;

    // color: cool white
    const t = r / radiusMax;
    colors[i3] = 0.55 + (1 - t) * 0.20;      // R
    colors[i3 + 1] = 0.70 + (1 - t) * 0.18;  // G
    colors[i3 + 2] = 1.00;                   // B
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.018,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Subtle drift (do not overreact to mouse)
  let targetRX = 0, targetRY = 0;
  let rx = 0, ry = 0;

  window.addEventListener("mousemove", (e) => {
    const mx = (e.clientX / window.innerWidth) * 2 - 1;
    const my = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRY = mx * 0.10;
    targetRX = my * 0.08;
  });

  function animate() {
    requestAnimationFrame(animate);

    ry += (targetRY - ry) * 0.03;
    rx += (targetRX - rx) * 0.03;

    points.rotation.y = ry + performance.now() * 0.00004;
    points.rotation.x = rx + performance.now() * 0.00002;

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
