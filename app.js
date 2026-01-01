const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createStars() {
  stars = [];
  const count = Math.floor((w * h) / 8000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5,
      a: Math.random()
    });
  }
}
createStars();

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
