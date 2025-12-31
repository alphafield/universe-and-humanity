// app.js
// ===== Series panel toggle =====
const btn = document.getElementById('seriesBtn');
const panel = document.getElementById('panel');

function closePanel(){
  panel.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
}
btn?.addEventListener('click', (e)=>{
  e.stopPropagation();
  const open = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.addEventListener('click', closePanel);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closePanel(); });

// ===== Scientists platform cards (duplicate for seamless loop) =====
const people = [
  { name:"Michael Faraday", meta:"Physics · 1831", mark:"∮E·dl = − dΦB/dt" },
  { name:"James Clerk Maxwell", meta:"Physics · 1865", mark:"∇·E = ρ/ε₀" },
  { name:"Max Planck", meta:"Physics · 1900", mark:"E = hν" },
  { name:"Albert Einstein", meta:"Physics · 1905–1915", mark:"E = mc²" },
  { name:"Niels Bohr", meta:"Physics · 1913", mark:"Eₙ ∝ −1/n²" },
  { name:"Emmy Noether", meta:"Math/Physics · 1918", mark:"Symmetry ⇔ Conservation" },
  { name:"Werner Heisenberg", meta:"Physics · 1927", mark:"ΔxΔp ≥ ħ/2" },
  { name:"Erwin Schrödinger", meta:"Physics · 1926", mark:"iħ∂ψ/∂t = Ĥψ" },
  { name:"Paul Dirac", meta:"Physics · 1928", mark:"(iγ·∂ − m)ψ = 0" },
  { name:"Alan Turing", meta:"Computation · 1936", mark:"Universal Machine" },
  { name:"Claude Shannon", meta:"Information · 1948", mark:"H = −Σ p log p" }
];

const track = document.getElementById('track');
function card(p){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `
    <div class="cname">${p.name}</div>
    <div class="cmeta">${p.meta}</div>
    <div class="cmark">${p.mark}</div>
  `;
  return el;
}
if(track){
  people.forEach(p=>track.appendChild(card(p)));
  people.forEach(p=>track.appendChild(card(p))); // duplicate for loop
}

// ===== α visual: prefer video, slow it down; fallback to gif if needed =====
const vid = document.getElementById('alphaVisual');
const gif = document.querySelector('.alphaFallback');

function showGifFallback(){
  if(vid) vid.style.display = 'none';
  if(gif) gif.style.display = 'block';
}

if(vid){
  // 如果能播放：把“速度快”压慢（内在动更敬畏）
  vid.addEventListener('loadeddata', ()=>{
    try{
      vid.playbackRate = 0.22; // ✅ 你可以改 0.18–0.30
      gif && (gif.style.display = 'none');
    }catch(_){}
  });

  vid.addEventListener('error', showGifFallback);

  // iOS/某些浏览器可能 autoplay 被拦：尝试播放，不行就 fallback
  vid.play().catch(()=> showGifFallback());
}else{
  showGifFallback();
}
