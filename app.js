// /app.js  (下拉 + 科学家站台注入)
(() => {
  // Volumes dropdown
  const root = document.querySelector('[data-volumes]');
  const btn = document.querySelector('[data-volumes-btn]');
  const menu = document.querySelector('[data-volumes-menu]');

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!menu || !btn) return;
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Scientists marquee (中文站示例；英文站用另一套 data)
  const scientists = [
    { name:"Albert Einstein / 爱因斯坦", era:"1879–1955", field:"Physics", line4:"相对论奠基 · 时空结构" },
    { name:"Niels Bohr / 玻尔", era:"1885–1962", field:"Physics", line4:"量子诠释奠基 · 互补原理" },
    { name:"Erwin Schrödinger / 薛定谔", era:"1887–1961", field:"Physics", line4:"波动力学 · 薛定谔方程" },
    { name:"Paul Dirac / 狄拉克", era:"1902–1984", field:"Physics", line4:"相对论量子化 · 反物质" },
    { name:"Werner Heisenberg / 海森堡", era:"1901–1976", field:"Physics", line4:"不确定性原理 · 测量问题" },
    { name:"Richard Feynman / 费曼", era:"1918–1988", field:"Physics", line4:"路径积分 · 量子电动力学" },
    { name:"Emmy Noether / 诺特", era:"1882–1935", field:"Mathematics", line4:"对称性 ⇒ 守恒 · Noether 定理" },
    { name:"Alan Turing / 图灵", era:"1912–1954", field:"Computation", line4:"计算奠基 · 可计算性" },
  ];

  const track = document.querySelector('[data-track]');
  if (track) {
    const makeCard = (s) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div class="c1">${s.name}</div>
        <div class="c2">${s.era}</div>
        <div class="c3">${s.field}</div>
        <div class="c4">${s.line4}</div>
      `;
      return el;
    };

    // inject once
    scientists.forEach(s => track.appendChild(makeCard(s)));
    // duplicate for seamless scroll
    scientists.forEach(s => track.appendChild(makeCard(s)));
  }
})();
