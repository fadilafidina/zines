/* ============ dila's zine shelf ============
   To add a zine: put its 8 panels in zines/pages/<id>/1.jpg … 8.jpg
   (1 = front cover, 2–7 = inside pages, 8 = back cover),
   then add it to ZINES and place it on a shelf in SHELVES. */

const ZINES = {
  'harbour':        { title: 'the harbour and the change', meta: 'october 2026' },
  'november-birds': { title: 'november birds', meta: '2026' },
  'nagano':         { title: 'november in nagano', meta: '2025' },
};

/* Flat illustrations: [width in px, viewBox height, svg body] */
const ART = {
  plant: [84, 110, `
    <path d="M42 68C30 42 10 40 6 24c18-2 34 12 36 44Z" fill="#7f9f7a"/>
    <path d="M42 68c4-30 20-46 38-48-2 20-20 34-38 48Z" fill="#9bb59a"/>
    <path d="M42 68c-4-26-2-50 4-64 10 20 6 44-4 64Z" fill="#6f8f6c"/>
    <path d="M42 68C26 60 14 64 4 54c14-8 30-2 38 14Z" fill="#9bb59a"/>
    <path d="M42 68c14-10 28-8 40-18-14-8-30 0-40 18Z" fill="#7f9f7a"/>
    <path d="M20 68h44l-6 40H26Z" fill="#d58a6a"/>
    <rect x="16" y="64" width="52" height="10" rx="2" fill="#c97a5a"/>`],
  snake: [60, 130, `
    <path d="M30 94c-6-32-8-62-2-88 8 26 8 56 6 88Z" fill="#5f7f5c"/>
    <path d="M26 94C14 72 8 48 10 24c10 22 16 44 20 70Z" fill="#7f9f7a"/>
    <path d="M34 94c8-22 14-42 14-62-10 20-16 40-18 62Z" fill="#6f8f6c"/>
    <rect x="12" y="90" width="36" height="40" rx="4" fill="#efe6d8"/>
    <rect x="12" y="90" width="36" height="6" fill="#e2d6c3"/>`],
  lamp: [74, 128, `
    <path d="M18 8h38l14 42H4Z" fill="#f1d38a"/>
    <rect x="4" y="48" width="66" height="4" fill="#e6c26f"/>
    <rect x="35" y="52" width="4" height="66" fill="#3b3a36"/>
    <ellipse cx="37" cy="121" rx="20" ry="6" fill="#3b3a36"/>`],
  books: [96, 72, `
    <rect x="6" y="54" width="84" height="18" rx="2" fill="#8fb3cc"/>
    <rect x="6" y="54" width="6" height="18" fill="#7aa0bb"/>
    <rect x="12" y="38" width="72" height="16" rx="2" fill="#e8b4b8"/>
    <rect x="78" y="38" width="6" height="16" fill="#d99ca1"/>
    <rect x="18" y="24" width="62" height="14" rx="2" fill="#efe6d8"/>
    <rect x="18" y="29" width="62" height="2" fill="#d9b896"/>`],
  mug: [64, 70, `
    <path d="M22 4c-6 6 6 10 0 16M34 4c-6 6 6 10 0 16" fill="none" stroke="#d6cec2" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M48 36h4a8 8 0 0 1 0 16h-4" fill="none" stroke="#d58a6a" stroke-width="6"/>
    <rect x="8" y="28" width="40" height="42" rx="6" fill="#d58a6a"/>
    <rect x="8" y="40" width="40" height="5" fill="#e8b4b8"/>`],
  camera: [98, 70, `
    <rect x="14" y="6" width="22" height="12" rx="2" fill="#3b3a36"/>
    <rect x="72" y="8" width="12" height="8" rx="2" fill="#bdb6aa"/>
    <rect x="4" y="14" width="90" height="56" rx="8" fill="#3b3a36"/>
    <rect x="4" y="32" width="90" height="26" fill="#55524c"/>
    <rect x="70" y="20" width="16" height="8" rx="1" fill="#8fb3cc"/>
    <circle cx="48" cy="44" r="21" fill="#efe6d8"/>
    <circle cx="48" cy="44" r="16" fill="#3b3a36"/>
    <circle cx="48" cy="44" r="10" fill="#5f86a3"/>
    <circle cx="44" cy="40" r="3" fill="#fff" opacity=".7"/>`],
  matcha: [90, 76, `
    <path d="M2 42a28 28 0 0 0 56 0Z" fill="#efe6d8"/>
    <rect x="20" y="66" width="20" height="8" rx="2" fill="#e2d6c3"/>
    <ellipse cx="30" cy="42" rx="28" ry="5" fill="#9bbf6a"/>
    <path d="M65 40 63 74h22l-2-34Z" fill="#e8d4b0"/>
    <path d="M68 44l-1 28M74 44v28M80 44l1 28" stroke="#d6bf96" stroke-width="1.5"/>
    <rect x="68" y="10" width="12" height="34" rx="4" fill="#d9b896"/>`],
  paint: [70, 110, `
    <g transform="rotate(-12 22 70)"><rect x="19" y="14" width="6" height="60" rx="3" fill="#d58a6a"/><rect x="19" y="10" width="6" height="8" fill="#bdb6aa"/><path d="M19 10c0-6 3-9 3-9s3 3 3 9Z" fill="#3b3a36"/></g>
    <g><rect x="33" y="6" width="6" height="66" rx="3" fill="#8fb3cc"/><rect x="33" y="2" width="6" height="8" fill="#bdb6aa"/></g>
    <g transform="rotate(10 50 70)"><rect x="46" y="16" width="6" height="58" rx="3" fill="#f1d38a"/><rect x="46" y="12" width="6" height="8" fill="#bdb6aa"/><path d="M46 12c0-6 3-9 3-9s3 3 3 9Z" fill="#e8b4b8"/></g>
    <rect x="8" y="50" width="54" height="58" rx="8" fill="#dbe8ef" opacity=".92"/>
    <rect x="8" y="72" width="54" height="36" rx="8" fill="#b4cfdd"/>
    <rect x="6" y="46" width="58" height="8" rx="3" fill="#c3d7e2"/>`],
  frame: [80, 100, `
    <rect x="4" y="4" width="72" height="92" rx="2" fill="#bf9670"/>
    <rect x="12" y="12" width="56" height="76" fill="#faf7f2"/>
    <rect x="18" y="18" width="44" height="64" fill="#8fb3cc"/>
    <circle cx="50" cy="32" r="6" fill="#f1d38a"/>
    <path d="M18 66q14-14 26-4t18-4v24H18Z" fill="#7f9f7a"/>`],
  strip: [34, 110, `
    <rect x="0" y="0" width="34" height="110" rx="1" fill="#fff"/>
    <rect x="5" y="5" width="24" height="22" fill="#e8b4b8"/>
    <rect x="5" y="31" width="24" height="22" fill="#8fb3cc"/>
    <rect x="5" y="57" width="24" height="22" fill="#f1d38a"/>
    <rect x="5" y="83" width="24" height="22" fill="#9bb59a"/>`],
  bottle: [50, 110, `
    <rect x="19" y="2" width="12" height="12" rx="2" fill="#bf9670"/>
    <rect x="18" y="12" width="14" height="22" fill="#cfe0ea"/>
    <path d="M18 32C6 40 4 50 4 60v40a8 8 0 0 0 8 8h26a8 8 0 0 0 8-8V60c0-10-2-20-14-28Z" fill="#cfe0ea"/>
    <rect x="16" y="56" width="18" height="36" rx="3" fill="#f3e7c9"/>
    <rect x="16" y="70" width="18" height="4" fill="#d58a6a"/>
    <rect x="9" y="58" width="4" height="34" rx="2" fill="#fff" opacity=".6"/>`],
};

/* What sits on each shelf, left to right.
   { zine: id, lean } | { art, label?, href?, hideSm? } — no href means decoration */
const SHELVES = [
  [
    { art: 'plant' },
    { zine: 'harbour', lean: -2 },
    { art: 'lamp', hideSm: true },
  ],
  [
    { art: 'books', hideSm: true },
    { zine: 'november-birds', lean: 0 },
    { zine: 'nagano', lean: -1.5 },
    { art: 'mug' },
  ],
  [
    { art: 'camera', label: 'photography ↗', href: 'https://www.instagram.com/diladialed/' },
    { art: 'matcha', label: 'matchadou bakes ↗', href: 'https://www.instagram.com/matchadou/' },
    { art: 'paint',  label: 'paintings →', href: '../#painting' },
    { art: 'frame',  label: 'gallery ↗', href: 'https://galler-bay.vercel.app/' },
    { art: 'strip',  label: 'photostrip ↗', href: 'https://photostrip-kappa.vercel.app/', lean: 4 },
    { art: 'bottle', label: 'drift ↗', href: 'https://drift-coral-iota.vercel.app/' },
    { art: 'snake',  hideSm: true },
  ],
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const page = (id, n) => `pages/${id}/${n}.jpg`;
const pageName = (n) => (n === 1 ? 'front cover' : n === 8 ? 'back cover' : `page ${n - 1}`);

function svg(name) {
  const [w, h, body] = ART[name];
  // viewBox widths match the px widths, so width = w keeps them at a natural size
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="--w:${w}" aria-hidden="true">${body}</svg>`;
}

/* ---------- build the shelves ---------- */
const shelvesEl = $('#shelves');
SHELVES.forEach((row) => {
  const shelf = document.createElement('div');
  shelf.className = 'shelf';
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
    } else if (it.href) {
      el = document.createElement('a');
      el.className = 'item';
      el.href = it.href;
      if (/^https?:/.test(it.href)) { el.target = '_blank'; el.rel = 'noopener'; }
      el.setAttribute('aria-label', it.label.replace(/[↗→]/g, '').trim());
      el.innerHTML = svg(it.art) + `<span class="label">${esc(it.label)}</span>`;
    } else {
      el = document.createElement('div');
      el.className = 'item';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = svg(it.art);
    }
    if (it.hideSm) el.classList.add('hide-sm');
    if (it.lean && !it.zine) el.style.transform = `rotate(${it.lean}deg)`;
    items.append(el);
  });

  const plank = document.createElement('div');
  plank.className = 'plank';
  shelf.append(items, plank);
  shelvesEl.append(shelf);
});

/* ---------- viewer: big pages, scroll sideways ---------- */
const viewer = $('#viewer');
const acc = $('#accordion');
let opener = null;

function openZine(id, from) {
  opener = from;
  const z = ZINES[id];
  $('#viewerTitle').textContent = z.title;
  $('#viewerMeta').textContent = z.meta || '';
  acc.innerHTML = '';
  for (let n = 1; n <= 8; n++) {
    const p = document.createElement('figure');
    p.className = 'panel';
    p.style.setProperty('--i', n - 1);
    p.innerHTML = `<img src="${page(id, n)}" alt="${esc(z.title)}, ${pageName(n)}" draggable="false">`;
    acc.append(p);
  }
  acc.scrollLeft = 0;
  acc.classList.add('folded');
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => acc.classList.remove('folded')));
  acc.focus({ preventScroll: true });
}

function closeZine() {
  viewer.hidden = true;
  document.body.style.overflow = '';
  opener?.focus();
}
$('#viewerClose').addEventListener('click', closeZine);

/* the mouse wheel moves the pages sideways */
acc.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad sideways swipe: leave it
  e.preventDefault();
  acc.scrollLeft += e.deltaY;
}, { passive: false });

/* drag to scroll with the mouse */
let drag = null;
acc.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse') return;
  drag = { x: e.clientX, left: acc.scrollLeft };
  acc.classList.add('dragging');
});
addEventListener('pointermove', (e) => { if (drag) acc.scrollLeft = drag.left - (e.clientX - drag.x); });
addEventListener('pointerup', () => { drag = null; acc.classList.remove('dragging'); });

document.addEventListener('keydown', (e) => {
  if (viewer.hidden) return;
  const step = acc.firstElementChild?.offsetWidth || 300;
  if (e.key === 'Escape') closeZine();
  if (e.key === 'ArrowRight') { e.preventDefault(); acc.scrollBy({ left: step, behavior: 'smooth' }); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); acc.scrollBy({ left: -step, behavior: 'smooth' }); }
});
