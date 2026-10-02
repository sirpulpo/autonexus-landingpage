const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.12 },
);
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// Contadores
const cio = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  cio.unobserve(e.target);
  const el = e.target as HTMLElement;
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  if (reduced) { el.textContent = end + suffix; return; }
  const t0 = performance.now();
  const tick = (t: number) => {
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}), { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

// Timeline: enciende pasos al hacer scroll
const steps = document.querySelectorAll<HTMLElement>('.tl-step');
const tio = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) e.target.classList.add('on');
}), { threshold: 0.6 });
steps.forEach((s) => tio.observe(s));

// Header con fondo al scroll
const header = document.querySelector<HTMLElement>('.site-header');
const onScroll = () => header?.classList.toggle('scrolled', scrollY > 20);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menú móvil
const burger = document.querySelector<HTMLButtonElement>('.burger');
burger?.addEventListener('click', () => {
  const open = header?.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(!!open));
});
document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => {
  header?.classList.remove('open'); burger?.setAttribute('aria-expanded', 'false');
}));

// Tilt 3D
if (!reduced && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// Red "nexus" de partículas
const canvas = document.getElementById('nexus') as HTMLCanvasElement | null;
if (canvas && !reduced) {
  const ctx = canvas.getContext('2d')!;
  let w = 0, h = 0, raf = 0, visible = true;
  type P = { x: number; y: number; vx: number; vy: number };
  let pts: P[] = [];
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.floor((w * h) / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
        if (d < 18000) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 18000) * 0.28})`;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(147,197,253,.8)';
      ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.6, 0, 6.283); ctx.fill();
    }
    if (visible) raf = requestAnimationFrame(draw);
  };
  resize();
  addEventListener('resize', resize);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(draw);
  }).observe(canvas);
}

// Mockup: avanza estados en bucle
const phone = document.querySelectorAll<HTMLElement>('[data-cycle]');
phone.forEach((root) => {
  const items = root.querySelectorAll<HTMLElement>('[data-s]');
  const label = root.querySelector<HTMLElement>('[data-label]');
  const names = ['Recibido', 'Diagnóstico', 'En reparación', 'Control de calidad', 'Listo'];
  let i = 2;
  const set = () => {
    items.forEach((it, k) => it.classList.toggle('done', k <= i));
    if (label) label.textContent = names[i];
  };
  set();
  if (reduced) return;
  setInterval(() => { i = (i + 1) % names.length; set(); }, 2200);
});

// Formulario → WhatsApp
const form = document.getElementById('contact-form') as HTMLFormElement | null;
form?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const d = new FormData(form);
  const msg = `Hola, soy ${d.get('nombre')} del taller "${d.get('taller')}" (${d.get('ciudad')}). Tel: ${d.get('tel')}. ${d.get('msg') || 'Quiero una demo de AutoNexus.'}`;
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    try { await fetch(endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } }); } catch { /* sigue a WhatsApp */ }
  }
  open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  const ok = document.getElementById('form-ok');
  if (ok) ok.hidden = false;
  form.reset();
});
