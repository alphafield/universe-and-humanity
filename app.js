import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("bg");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
camera.position.set(0, 0.1, 8);

// Galaxy (points)
const params = {
  count: 52000,
  radius: 6.0,
  branches: 4,
  spin: 1.25,
  randomness: 0.45,
  randomnessPower: 2.2,
};

let points, geometry, material;

function buildGalaxy() {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  const colorInside = new THREE.Color(0xffcc33);
  const colorOutside = new THREE.Color(0x3a6ff5);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;
    const r = Math.random() * params.radius;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;
    const spinAngle = r * params.spin;

    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      r;
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      r *
      0.35;
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      r;

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * r + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

    const mixed = colorInside.clone();
    mixed.lerp(colorOutside, r / params.radius);

    colors[i3 + 0] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
  });

  points = new THREE.Points(geometry, material);
  points.rotation.x = -0.12;
  scene.add(points);

  // subtle center glow
  const glowGeo = new THREE.SphereGeometry(0.75, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffcc33,
    transparent: true,
    opacity: 0.06,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);
}

buildGalaxy();

// Resize
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize, { passive: true });
resize();

// Animation loop
let t = 0;
function tick() {
  t += 0.0015;
  if (points) {
    points.rotation.y = t * 0.55;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
