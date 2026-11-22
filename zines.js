/* ============ dila's zine shelf ============
   To add a zine: put its 8 panels in zines/pages/<id>/1.jpg … 8.jpg
   (1 = front cover, 2–7 = inside pages, 8 = back cover),
   then add it to ZINES and place it on a shelf in SHELVES. */

const ZINES = {
  'harbour':        { title: 'the harbour and the change', meta: 'october 2026' },
  'november-birds': { title: 'november birds', meta: '2026' },
  'nagano':         { title: 'november in nagano', meta: '2025' },
};

/* Drawings: [width, height, shapes]. Each is drawn twice: a colour layer and a
   wobbly ink outline on top, slightly out of register, like a marker doodle.
   class="hl" = no outline, class="ink" = solid ink. */
/* leaf helpers for the plants */
const HEART = 'M0 0c-6-6-13-2-11 5 2 6 11 10 11 15 0-5 9-9 11-15 2-7-5-11-11-5Z';
const PCOL = ['#8fb08a', '#a9c6a3', '#7da078'];
const leaf = (x, y, r, i, s = 1) =>
  `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path class="lf" style="--d:${(i * 0.05).toFixed(2)}s" d="${HEART}" fill="${PCOL[i % 3]}"/></g>`;
/* monstera leaf: oval with split edges, drawn pointing up from its stem tip */
function mleaf(x, y, rot, i, col, L = 58, W = 52) {
  const pt = (t) => [Math.sin(t) * W / 2, -L / 2 - Math.cos(t) * L / 2];  // t=0 top, t=PI base
  let d = '';
  for (let k = 0; k <= 36; k++) {
    const t = (k / 36) * Math.PI * 2;
    let [px, py] = pt(t);
    if (Math.abs(t - Math.PI) < .35) py -= 5 * (1 - Math.abs(t - Math.PI) / .35); // notch at the stem
    d += (k ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1);
  }
  let cuts = '';
  [.75, 1.25, 1.75, 2.3].forEach((t) => [t, -t].forEach((tt) => {
    const [a1, b1] = pt(tt - .09), [a2, b2] = pt(tt + .09), [ex, ey] = pt(tt);
    const ix = ex * .4, iy = ey + (-L / 2 - ey) * .25;
    cuts += `<path class="cut" d="M${a1.toFixed(1)} ${b1.toFixed(1)}L${ix.toFixed(1)} ${iy.toFixed(1)}L${a2.toFixed(1)} ${b2.toFixed(1)}Z" fill="#fbfaf6"/>`;
  }));
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="lf" style="--d:${(i * .08).toFixed(2)}s">` +
    `<path d="${d}Z" fill="${col}"/><path d="M0 -2V${-L + 6}" fill="none"/>${cuts}</g></g>`;
}

const ART = {
  pothos: [96, 80, `
    ${leaf(30, 46, 155, 0, 1.25)}${leaf(46, 40, 180, 1, 1.4)}${leaf(62, 46, -155, 2, 1.25)}${leaf(38, 44, 205, 4, 1.05)}${leaf(55, 43, 165, 3, 1.05)}
    <path d="M20 50h56l-6 30H26Z" fill="#e39a7b"/>
    <rect x="16" y="44" width="64" height="10" rx="2" fill="#d98a6a"/>
    <g class="vine v1"><path d="M24 50C10 62 4 86 9 108 12 124 6 138 5 150" fill="none"/>
      ${leaf(15, 60, 50, 1)}${leaf(6, 82, -35, 2)}${leaf(8, 104, 35, 0)}${leaf(9, 126, -25, 1)}${leaf(5, 148, 0, 2, .9)}</g>
    <g class="vine v2"><path d="M72 50C84 60 88 80 84 98 82 108 85 114 84 122" fill="none"/>
      ${leaf(81, 60, -45, 2)}${leaf(88, 80, 35, 0)}${leaf(85, 100, -25, 1)}${leaf(84, 120, 0, 2, .9)}</g>`],
  monstera: [130, 172, `
    <path d="M62 140C56 110 42 92 30 80" fill="none"/>
    <path d="M64 140C64 104 68 72 72 50" fill="none"/>
    <path d="M66 140C80 124 96 112 108 104" fill="none"/>
    ${mleaf(30, 80, -48, 0, '#7fa577')}
    ${mleaf(72, 50, 6, 1, '#94b88c', 62, 56)}
    ${mleaf(108, 104, 62, 2, '#6f9468', 48, 44)}
    <path d="M44 140h44l-5 30H49Z" fill="#f4ece0"/>
    <rect x="40" y="136" width="52" height="8" rx="2" fill="#efe4d3"/>`],
  lamp: [74, 128, `
    <path class="beam noline" d="M8 52L-26 126h126L66 52Z" fill="url(#beamGrad)"/>
    <ellipse class="halo noline" cx="37" cy="34" rx="44" ry="30" fill="url(#haloGrad)"/>
    <path class="shade" d="M18 8h38l14 42H4Z" fill="#f6d77c"/>
    <rect x="35" y="50" width="4" height="66" fill="#f4ece0"/>
    <ellipse cx="37" cy="120" rx="20" ry="6" fill="#f4ece0"/>
    <path d="M48 112v-14" fill="none"/><circle cx="48" cy="96" r="2.5" fill="#f4ece0"/>`],
  books: [96, 72, `
    <g class="bk bk1"><rect x="6" y="54" width="84" height="18" rx="2" fill="#9cc0dc"/><path d="M12 54v18" fill="none"/></g>
    <g class="bk bk2"><rect x="12" y="38" width="72" height="16" rx="2" fill="#f2b8c2"/><path d="M78 38v16" fill="none"/></g>
    <g class="bk bk3"><rect x="18" y="24" width="62" height="14" rx="2" fill="#f4ece0"/></g>`],
  mug: [66, 72, `
    <path class="steam" d="M22 4c-6 6 6 10 0 16" fill="none"/><path class="steam s2" d="M34 4c-6 6 6 10 0 16" fill="none"/>
    <path d="M46 34h6a10 10 0 0 1 0 20h-6v-6h6a4 4 0 0 0 0-8h-6Z" fill="#e39a7b"/>
    <rect x="8" y="28" width="40" height="42" rx="6" fill="#e39a7b"/>
`],
  camera: [98, 70, `
    <rect x="14" y="6" width="22" height="12" rx="2" fill="#6d6a66"/>
    <rect x="72" y="8" width="12" height="8" rx="2" fill="#d8d2c8"/>
    <rect x="4" y="14" width="90" height="56" rx="8" fill="#6d6a66"/>
    <rect x="4" y="32" width="90" height="26" fill="#57544f"/>
    <rect x="70" y="20" width="16" height="8" rx="1" fill="#9cc0dc"/>
    <circle cx="48" cy="44" r="21" fill="#f4ece0"/>
    <circle cx="48" cy="44" r="14" fill="#7ea6c6"/>
    <circle class="hl" cx="43" cy="39" r="4" fill="#fff" opacity=".8"/>`],
  matcha: [92, 78, `
    <path d="M2 42a28 28 0 0 0 56 0Z" fill="#f4ece0"/>
    <rect x="20" y="68" width="20" height="8" rx="2" fill="#f4ece0"/>
    <ellipse cx="30" cy="42" rx="28" ry="5" fill="#a5c773"/>
    <path d="M65 40 63 74h22l-2-34Z" fill="#ecd9b3"/>
    <path d="M69 46l-1 26M74 46v26M79 46l1 26" fill="none"/>
    <rect x="68" y="10" width="12" height="32" rx="4" fill="#dcbc93"/>`],
  paint: [70, 110, `
    <g transform="rotate(-12 22 70)"><rect x="19" y="14" width="6" height="60" rx="3" fill="#e39a7b"/><path d="M19 14c0-7 3-11 3-11s3 4 3 11Z" fill="#57544f"/></g>
    <g><rect x="33" y="8" width="6" height="64" rx="3" fill="#9cc0dc"/><path d="M33 8c0-6 3-9 3-9s3 3 3 9Z" fill="#f2b8c2"/></g>
    <g transform="rotate(10 50 70)"><rect x="46" y="16" width="6" height="58" rx="3" fill="#f6d77c"/><path d="M46 16c0-7 3-10 3-10s3 3 3 10Z" fill="#a5c773"/></g>
    <rect x="8" y="48" width="54" height="60" rx="8" fill="#dbe9f1"/>
    <path class="noline" d="M8 74h54v26a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8Z" fill="#b8d3e2"/>`],
  frame: [80, 100, `
    <rect x="4" y="4" width="72" height="92" rx="2" fill="#d4a97f"/>
    <rect x="13" y="13" width="54" height="74" fill="#9cc0dc"/>
    <circle cx="50" cy="32" r="6" fill="#f6d77c"/>
    <path d="M13 70q14-14 26-4t28-6v27H13Z" fill="#8fb08a"/>`],
  strip: [36, 112, `
    <rect x="1" y="1" width="34" height="110" rx="1" fill="#fff"/>
    <rect x="6" y="6" width="24" height="22" fill="#f2b8c2"/>
    <rect x="6" y="32" width="24" height="22" fill="#9cc0dc"/>
    <rect x="6" y="58" width="24" height="22" fill="#f6d77c"/>
    <rect x="6" y="84" width="24" height="22" fill="#a9c6a3"/>`],
  bottle: [50, 110, `
    <rect x="19" y="2" width="12" height="12" rx="2" fill="#d4a97f"/>
    <path d="M18 14h14v18c12 8 14 18 14 28v40a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V60c0-10 2-20 14-28Z" fill="#dbe9f1"/>
    <rect x="16" y="56" width="18" height="36" rx="3" fill="#f8edd2"/>
    <path d="M16 72h18" fill="none"/>
    <rect class="hl" x="9" y="58" width="4" height="30" rx="2" fill="#fff"/>`],
  pin: [16, 16, `
    <circle cx="8" cy="8" r="7" fill="#e8737a"/>
    <circle class="hl" cx="5.5" cy="5.5" r="2" fill="#fff" opacity=".8"/>`],
  /* little matcha mascot for the header */
  mascot: [72, 72, `
    <path class="steam" d="M44 4c-5 5 5 8 0 13" fill="none"/><path class="steam s2" d="M54 6c-5 5 5 8 0 13" fill="none"/>
    <path d="M6 24h60l-6 36a9 9 0 0 1-9 8H21a9 9 0 0 1-9-8Z" fill="#f4ece0"/>
    <ellipse cx="36" cy="24" rx="30" ry="7" fill="#a5c773"/>
`],
};

/* What sits on each shelf, left to right.
   { zine: id, lean } | { art, label?, href?, hideSm? } (no href = decoration) */
const SHELVES = [
  { cls: 'short', items: [
    { art: 'pothos', cls: 'plant pothos' },
    { zine: 'harbour', lean: -2 },
    { art: 'camera', label: 'photography ↗', href: 'https://www.instagram.com/diladialed/' },
    { zine: 'november-birds', lean: 2 },
    { art: 'lamp', toggle: true, label: 'click me ✧', hideSm: true },
  ] },
  { cls: 'long', items: [
    { art: 'books', cls: 'books', hideSm: true },
    { zine: 'nagano', lean: -1.5 },
    { art: 'mug', cls: 'mug', hideSm: true },
    { art: 'strip',  label: 'photostrip ↗', href: 'https://photostrip-kappa.vercel.app/', lean: 4 },
    { art: 'monstera', cls: 'plant', hideSm: true },
  ] },
];

/* Pinned to the wall, to the right of the short shelf */
const WALL = { art: 'frame', label: 'gallery ↗', href: 'https://galler-bay.vercel.app/' };

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const page = (id, n) => `pages/${id}/${n}.jpg`;
const pageName = (n) => (n === 1 ? 'front cover' : n === 8 ? 'back cover' : `page ${n - 1}`);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function doodle(name) {
  const [w, h, body] = ART[name];
  return `<svg class="doodle" viewBox="-4 -4 ${w + 8} ${h + 8}" width="${w + 8}" height="${h + 8}" style="--w:${w + 8}" aria-hidden="true">
    <g class="fill" filter="url(#wob2)" transform="translate(1.8 1.6)">${body}</g>
    <g class="line" filter="url(#wob)">${body}</g></svg>`;
}

function plank() {
  return `<svg class="plank doodle" viewBox="0 0 800 18" preserveAspectRatio="none" aria-hidden="true">
    <g class="fill" filter="url(#wob2)" transform="translate(1.5 1.5)"><rect x="2" y="3" width="796" height="11" fill="#dcbc93"/></g>
    <g class="line" filter="url(#wob)"><path d="M2 3h796v11H2Z" vector-effect="non-scaling-stroke"/><path d="M40 8.5h120M420 9h90M640 8h60" vector-effect="non-scaling-stroke" style="stroke-width:1.2"/></g></svg>`;
}

$('#mascot').innerHTML = doodle('mascot');

/* ---------- clock (Sydney time) ---------- */
const clockEl = $('#clock');
function tick() {
  const now = new Date();
  const d = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', day: 'numeric', month: 'short' }).format(now).toLowerCase();
  const t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);
  clockEl.textContent = `${d}\n${t}`;
}
tick(); setInterval(tick, 1000);

/* ---------- paper sounds (made with Web Audio, no files) ---------- */
const sfx = (() => {
  let ctx = null, noise = null;
  let on = true;
  try { on = localStorage.getItem('zine-sound') !== 'off'; } catch (e) {}
  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function burst({ at = 0, dur = .2, f = 2000, to, q = 1, gain = .2, type = 'bandpass' }) {
    const c = ac(); if (!c) return;
    const t0 = c.currentTime + at;
    const src = c.createBufferSource(); src.buffer = noise;
    const fl = c.createBiquadFilter(); fl.type = type; fl.Q.value = q;
    fl.frequency.setValueAtTime(f, t0);
    if (to) fl.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + .015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(fl).connect(g).connect(c.destination);
    src.start(t0, Math.random() * .5); src.stop(t0 + dur + .02);
  }
  function thump(gain = .25) {
    const c = ac(); if (!c) return;
    const t0 = c.currentTime;
    const o = c.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(150, t0); o.frequency.exponentialRampToValueAtTime(55, t0 + .14);
    const g = c.createGain();
    g.gain.setValueAtTime(gain, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + .16);
    o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + .18);
  }
  let last = 0;
  return {
    get on() { return on; },
    toggle() { on = !on; try { localStorage.setItem('zine-sound', on ? 'on' : 'off'); } catch (e) {} if (on) ac(); return on; },
    pickUp() { if (!on) return; burst({ dur: .3, f: 900, to: 3800, q: .7, gain: .32 }); burst({ at: .07, dur: .14, f: 4200, q: 1.4, gain: .12 }); },
    click(on) {
      if (!this.on) return;
      burst({ dur: .03, f: on ? 3800 : 2600, q: 3, gain: .2 });
      burst({ at: .045, dur: .025, f: on ? 2400 : 3600, q: 3, gain: .12 });
    },
    putDown() { if (!on) return; burst({ dur: .22, f: 3200, to: 700, q: .8, gain: .26 }); thump(.22); },
    rustle(speed) {
      if (!on) return;
      const now = performance.now();
      if (now - last < 65) return;
      last = now;
      burst({ dur: .04 + Math.random() * .06, f: 1800 + Math.random() * 3200, q: 1.8, gain: clamp(speed / 700, .025, .11) });
    },
  };
})();

const soundBtn = $('#soundBtn');
const paintSound = () => { soundBtn.textContent = sfx.on ? 'sound on ♪' : 'sound off'; soundBtn.setAttribute('aria-pressed', sfx.on); };
paintSound();
soundBtn.addEventListener('click', () => { sfx.toggle(); paintSound(); });

/* ---------- build the shelves ---------- */
const shelvesEl = $('#shelves');
SHELVES.forEach(({ cls, items: row }) => {
  const shelf = document.createElement('div');
  shelf.className = 'shelf ' + cls;
  const items = document.createElement('div');
  items.className = 'shelf-items';

  row.forEach((it) => {
    let el;
    if (it.zine) {
      const z = ZINES[it.zine];
      el = document.createElement('button');
      el.className = 'item zine';
      el.style.setProperty('--lean', (it.lean || 0) + 'deg');
      el.setAttribute('aria-label', `Read ${z.title}`);
      el.innerHTML = `<div class="cover"><img src="${page(it.zine, 1)}" alt="" draggable="false"></div><span class="label">${esc(z.title)}</span>`;
      el.addEventListener('click', () => openZine(it.zine, el));
    } else if (it.toggle) {
      el = document.createElement('button');
      el.className = 'item lamp';
      el.setAttribute('aria-label', 'Desk lamp');
      el.setAttribute('aria-pressed', 'false');
      el.innerHTML = doodle(it.art) + `<span class="label">${esc(it.label)}</span>`;
      el.addEventListener('click', () => {
        const on = el.classList.toggle('on');
        el.setAttribute('aria-pressed', on);
        sfx.click(on);
      });
    } else if (it.href) {
      el = document.createElement('a');
      el.className = 'item';
      el.href = it.href;
      if (/^https?:/.test(it.href)) { el.target = '_blank'; el.rel = 'noopener'; }
      el.setAttribute('aria-label', it.label.replace(/[↗→]/g, '').trim());
      el.innerHTML = doodle(it.art) + `<span class="label">${esc(it.label)}</span>`;
    } else {
      el = document.createElement('div');
      el.className = 'item';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = doodle(it.art);
    }
    el.style.setProperty('--wig', (Math.random() < .5 ? -2.5 : 2.5) + 'deg');
    if (it.hideSm) el.classList.add('hide-sm');
    if (it.cls) el.classList.add(...it.cls.split(' '));
    if (it.lean && !it.zine) el.style.transform = `rotate(${it.lean}deg)`;
    items.append(el);
  });

  shelf.append(items);
  shelf.insertAdjacentHTML('beforeend', plank());
  shelvesEl.append(shelf);
});

{
  const w = document.createElement('a');
  w.className = 'item pinned';
  w.href = WALL.href; w.target = '_blank'; w.rel = 'noopener';
  w.setAttribute('aria-label', WALL.label.replace(/[↗→]/g, '').trim());
  w.innerHTML = `<span class="pin">${doodle('pin')}</span>${doodle(WALL.art)}<span class="label">${esc(WALL.label)}</span>`;
  shelvesEl.querySelector('.shelf.short').append(w);
}

/* shrink the shelves if they'd overflow the screen */
function fitShelves() {
  shelvesEl.style.setProperty('--fit', 1);
  const shelves = [...shelvesEl.querySelectorAll('.shelf')];
  const need = shelves.reduce((h, s) => h + s.offsetHeight, 0) + 24 * shelves.length;
  const fit = clamp(shelvesEl.clientHeight / need, .45, 1);
  shelvesEl.style.setProperty('--fit', fit.toFixed(3));
}
fitShelves();
addEventListener('resize', fitShelves);
document.fonts?.ready.then(fitShelves);
document.querySelectorAll('.zine img').forEach((i) => i.complete || i.addEventListener('load', fitShelves, { once: true }));

/* ============ viewer: scrunched → unfolds → slides ============ */
const viewer = $('#viewer');
const stage = $('#stage');
const strip = $('#strip');
const hint = $('#viewerHint');
const N = 8;
const D = Math.PI / 180;
let panels = [], opener = null;
let PW = 0, PH = 0, FOLD = 0, UNFOLD = 0, PAN = 0, MARGIN = 0, VW = 0;
let target = 0, pos = 0, base = 0, baseTarget = 0, raf = 0;

function measure() {
  VW = stage.clientWidth;
  const small = VW < 700;
  PH = small ? Math.min(stage.clientHeight * .62, VW * .58 * 148.5 / 105) : Math.min(innerHeight * .4, 430);
  PW = PH * 105 / 148.5;
  // fold angle so the scrunched zine takes up roughly the middle of the screen
  FOLD = clamp(Math.acos(clamp((small ? .9 : .62) * VW / (N * PW), 0, 1)), 35 * D, 74 * D);
  UNFOLD = small ? 420 : 650;              // scroll distance spent unfolding
  MARGIN = small ? VW * .08 : VW * .07;
  PAN = Math.max(0, N * PW - (VW - 2 * MARGIN)); // scroll distance spent sliding
  strip.style.height = PH + 'px';
  panels.forEach((p) => { p.style.width = PW + 'px'; p.style.height = PH + 'px'; });
}

function render() {
  const u = clamp(pos / UNFOLD, 0, 1);        // 0 = scrunched, 1 = flat
  const a = base * (1 - u);
  const c = Math.cos(a), s = Math.sin(a);
  const total = N * PW * c;
  const centred = (VW - total) / 2;
  const x0 = Math.max(centred, MARGIN) - Math.max(0, pos - UNFOLD); // cover stays on screen
  const zOff = PW * s / 2;
  panels.forEach((p, i) => {
    const odd = i % 2 === 1;
    const x = x0 + i * PW * c;
    const z = (odd ? -PW * s : 0) + zOff;
    p.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${odd ? -a : a}rad)`;
    p.style.setProperty('--s', ((odd ? .2 : .05) * s).toFixed(3));
  });
  hint.textContent = u < .98 ? 'scroll to unfold ✧' : pos >= UNFOLD + PAN - 2 ? 'the end ♡ scroll back to fold' : 'keep scrolling →';
}

function loop() {
  base += (baseTarget - base) * .085;
  const prev = pos;
  pos += (target - pos) * .11;
  render();
  if (Math.abs(target - pos) > .2 || Math.abs(baseTarget - base) > .0003) raf = requestAnimationFrame(loop);
  else { pos = target; base = baseTarget; render(); raf = 0; }
  return prev;
}
const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

function move(delta) {
  const before = target;
  target = clamp(target + delta, 0, UNFOLD + PAN);
  if (target !== before) sfx.rustle(Math.abs(delta));
  kick();
}

function openZine(id, from) {
  opener = from;
  const z = ZINES[id];
  $('#viewerTitle').textContent = z.title;
  $('#viewerMeta').textContent = z.meta ? `· ${z.meta}` : '';
  strip.innerHTML = '';
  panels = [];
  for (let n = 1; n <= N; n++) {
    const p = document.createElement('figure');
    p.className = 'panel';
    p.innerHTML = `<img src="${page(id, n)}" alt="${esc(z.title)}, ${pageName(n)}" draggable="false">`;
    strip.append(p);
    panels.push(p);
  }
  scrollTo(0, 0);
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  stage.style.animation = 'none'; stage.offsetHeight; stage.style.animation = '';
  measure();
  target = pos = 0;
  base = 88 * D; baseTarget = FOLD;   // starts nearly shut, settles into the scrunch
  render(); kick();
  sfx.pickUp();
  stage.focus({ preventScroll: true });
}

function closeZine() {
  if (viewer.hidden) return;
  if (viewer.classList.contains('closing')) return;
  sfx.putDown();
  // fold it back up, then drop it
  target = 0; baseTarget = 88 * D; kick();
  viewer.classList.add('closing');
  setTimeout(() => {
    viewer.hidden = true;
    viewer.classList.remove('closing');
    document.body.style.overflow = '';
    cancelAnimationFrame(raf); raf = 0;
    opener?.focus();
  }, 320);
}
$('#viewerClose').addEventListener('click', closeZine);

/* wheel / trackpad */
stage.addEventListener('wheel', (e) => {
  e.preventDefault();
  const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  move(d * (e.deltaMode === 1 ? 30 : 1));
}, { passive: false });

/* touch and mouse drag */
let drag = null;
stage.addEventListener('pointerdown', (e) => {
  drag = { x: e.clientX, y: e.clientY, moved: 0, onZine: !!e.target.closest('.panel') };
  stage.setPointerCapture(e.pointerId);
  stage.classList.add('dragging');
});
stage.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = drag.x - e.clientX, dy = drag.y - e.clientY;
  drag = { ...drag, x: e.clientX, y: e.clientY, moved: drag.moved + Math.abs(dx) + Math.abs(dy) };
  move((Math.abs(dx) >= Math.abs(dy) ? dx : dy) * 1.6);
});
const endDrag = () => { drag = null; stage.classList.remove('dragging'); };
/* a plain click (not a drag) anywhere off the zine puts it back */
stage.addEventListener('pointerup', (e) => {
  const tap = drag && drag.moved < 6 && !drag.onZine;
  endDrag();
  if (tap) closeZine();
});
viewer.addEventListener('click', (e) => {
  if (e.target === viewer || e.target.closest('.viewer-title, .viewer-hint')) closeZine();
});
stage.addEventListener('pointercancel', endDrag);

document.addEventListener('keydown', (e) => {
  if (viewer.hidden) return;
  if (e.key === 'Escape') closeZine();
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(PW * .9); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-PW * .9); }
});

addEventListener('resize', () => {
  if (viewer.hidden) return;
  measure();
  // keep easing instead of snapping to the new layout
  if (!viewer.classList.contains('closing')) baseTarget = FOLD;
  target = clamp(target, 0, UNFOLD + PAN); pos = clamp(pos, 0, UNFOLD + PAN);
  render(); kick();
});
