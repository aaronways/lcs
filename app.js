const STORE_KEY = 'nexus-lcs:v1';
const THEME_KEY = 'nexus-lcs:theme';
const LEGACY_KEY = 'lcs-companion:v1';

const COURSE = [
  { key:'1',      ch:1, label:'Chapter 1', title:'Introduction', note:'Open versus closed loop. Transient, error, stability.' },
  { key:'2',      ch:2, label:'Chapter 2', title:'Frequency-domain modeling', note:'Laplace, G(s), impedances, linearization. 2.1–2.5 and 2.10–2.11.' },
  { key:'5-lite', ch:5, label:'5.1–5.3',  title:'Block diagrams, first pass', lite:true, secs:['5.1','5.2','5.3'], note:'Read 5.1–5.3 now. Return after Chapter 4.' },
  { key:'4',      ch:4, label:'Chapter 4', title:'Time response', note:'From pole location to settling, peak time, and overshoot. 4.1–4.8.' },
  { key:'5',      ch:5, label:'Chapter 5', title:'Reduction of multiple subsystems', note:'Loading, Mason, closed-loop G/(1+GH). Full chapter.' },
  { key:'6',      ch:6, label:'Chapter 6', title:'Stability', note:'Routh–Hurwitz.' },
  { key:'7',      ch:7, label:'Chapter 7', title:'Steady-state error', note:'Sections 7.1–7.4.' },
  { key:'8',      ch:8, label:'Chapter 8', title:'Root locus', note:'8.1–8.7.' },
  { key:'9',      ch:9, label:'Chapter 9', title:'Design via root locus', note:'9.1–9.4.' },
  { key:'10',     ch:10,label:'Chapter 10',title:'Frequency response', note:'10.1–10.7.' },
  { key:'11',     ch:11,label:'Chapter 11',title:'Design via frequency response', note:'Lead, lag, and the Bode picture.' },
  { key:'3',      ch:3, label:'Chapter 3', title:'State space', note:'After the classical sequence.' },
  { key:'12',     ch:12,label:'Chapter 12',title:'State-space design' }
];

const CONCEPTS = [
  {
    slug:'poles-zeros',
    title:'Poles and zeros',
    blurb:'Modes live in the poles. Zeros only set residues. Geometry in the s-plane is behavior in time.',
    secs:['4.2','4.7','4.8','2.2','2.3'],
    re:/\bpoles?\b|\bzeros?\b|s-plane|left-half|right-half|residue|\bmodes?\b/i
  },
  {
    slug:'zeta-wn',
    title:'Damping and natural frequency',
    blurb:'ζ is shape. ωn is the clock. Overshoot never depends on ωn.',
    secs:['4.3','4.4','4.5','4.6'],
    re:/damping|\bzeta\b|ζ|\\zeta|natural frequency|ω_?n|\\omega_\{?n\}?|percent overshoot|%OS|settling time|peak time/i
  },
  {
    slug:'closed-loop',
    title:'Closed-loop gain G/(1+GH)',
    blurb:'The algebra of feedback, and what it does to the poles.',
    secs:['5.2','5.3','1.3'],
    re:/closed-loop|closed loop|G\/\(1\+GH\)|1\+GH|unity feedback|loop gain|forward path|feedback path/i
  },
  {
    slug:'characteristic-equation',
    title:'Characteristic equation',
    blurb:'1+G(s)H(s)=0. The roots are the closed-loop poles.',
    secs:['5.3','4.2','6.1'],
    re:/characteristic equation|1\s*\+\s*G|closed-loop poles|char(?:acteristic)? poly/i
  },
  {
    slug:'steady-state-error',
    title:'Steady-state error',
    blurb:'What is left after the natural response has died. Chapter 7 makes it quantitative.',
    secs:['1.4','7.1','7.2','7.3','7.4'],
    re:/steady-state error|steady state error|\bess\b|position error|velocity error|final value theorem/i
  }
];

let state = {
  view:'home', chapter:0, tab:'guide',
  solved:{}, query:'', diff:'all', topic:'all', sec:'all',
  lite:false, concept:null, scrollTo:null
};

let sectionObserver = null;

function loadProgress(){
  try {
    state.solved = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    if (!Object.keys(state.solved).length) {
      const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '{}');
      if (legacy && typeof legacy === 'object') state.solved = legacy;
    }
  } catch (e) { state.solved = {}; }
}
function saveProgress(){
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state.solved)); } catch (e) {}
}

function applyTheme(theme){
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}
(function initTheme(){
  let theme = 'light';
  try { theme = localStorage.getItem(THEME_KEY) || theme; } catch (e) {}
  if (!localStorage.getItem(THEME_KEY) && matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  applyTheme(theme);
})();

function mdMath(src){
  if (!src) return '';
  const figs = [];
  const vault = [];
  const stashFig = m => { figs.push(m); return '<!--NXFIG' + (figs.length - 1) + '-->'; };
  const stash = m => { vault.push(m); return '@@M' + (vault.length - 1) + '@@'; };
  let s = String(src)
    .replace(/<figure[\s\S]*?<\/figure>/g, stashFig)
    .replace(/<svg[\s\S]*?<\/svg>/g, stashFig)
    .replace(/\$\$([\s\S]*?)\$\$/g, stash)
    .replace(/\\\[([\s\S]*?)\\\]/g, stash)
    .replace(/\\\(([\s\S]*?)\\\)/g, stash)
    .replace(/\$([^$\n]+?)\$/g, stash);
  let html = (typeof marked !== 'undefined')
    ? marked.parse(s, { breaks:false, mangle:false, headerIds:false })
    : s.replace(/\n\n/g, '<br><br>');
  html = html.replace(/@@M(\d+)@@/g, (_, i) => vault[+i]);
  html = html.replace(/<!--NXFIG(\d+)-->/g, (_, i) => figs[+i]);
  return html;
}
function mdInline(src){
  return mdMath(src).replace(/^<p>/, '').replace(/<\/p>\s*$/, '').trim();
}
function typeset(el){
  if (typeof renderMathInElement !== 'function') return;
  renderMathInElement(el, {
    delimiters: [
      { left:'$$', right:'$$', display:true },
      { left:'\\[', right:'\\]', display:true },
      { left:'\\(', right:'\\)', display:false },
      { left:'$', right:'$', display:false }
    ],
    throwOnError:false, strict:false
  });
}
function fill(el, markdown){ el.innerHTML = mdMath(markdown); typeset(el); }
function fillInline(el, markdown){ el.innerHTML = mdInline(markdown); typeset(el); }

function chapterById(id){ return CHAPTERS.find(c => c.id === id); }
function chapterIndexById(id){ return CHAPTERS.findIndex(c => c.id === id); }
function chapterProgress(ch){
  const total = (ch.problems || []).length;
  if (!total) return { done:0, total:0, pct:0 };
  const done = ch.problems.filter(p => state.solved[p.id]).length;
  return { done, total, pct:Math.round(100 * done / total) };
}
function chapterSections(ch){
  if (ch.sectionList && ch.sectionList.length) return ch.sectionList;
  const seen = [];
  (ch.guide || []).forEach(g => {
    if (g.sec && !seen.some(s => s.id === g.sec)) seen.push({ id:g.sec, title:'' });
  });
  return seen;
}
function closeNav(){
  document.getElementById('nav').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
}

function openChapter(id, tab, opts){
  const idx = chapterIndexById(id);
  if (idx < 0) return;
  opts = opts || {};
  state.view = 'chapter';
  state.chapter = idx;
  state.tab = tab || 'guide';
  state.lite = !!opts.lite;
  state.sec = opts.sec || 'all';
  state.concept = null;
  state.scrollTo = opts.scrollTo || null;
  closeNav();
  render();
  window.scrollTo(0, 0);
}

function availableStops(){
  return COURSE.filter(s => chapterById(s.ch));
}
function currentStopKey(){
  const ch = CHAPTERS[state.chapter];
  if (!ch) return null;
  if (state.lite && ch.id === 5) return '5-lite';
  return String(ch.id);
}
function neighborStops(){
  const stops = availableStops();
  const key = currentStopKey();
  const i = stops.findIndex(s => s.key === key);
  return { prev: i > 0 ? stops[i-1] : null, next: i >= 0 && i < stops.length-1 ? stops[i+1] : null };
}

function renderNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  nav.insertAdjacentHTML('beforeend', '<h2>Start</h2>');
  addNavBtn(nav, state.view === 'home', 'Map<span class="ch-meta">Course sequence</span>', () => {
    state.view = 'home'; state.lite = false; closeNav(); render(); window.scrollTo(0,0);
  });
  addNavBtn(nav, state.view === 'concepts' && !state.concept, 'Concepts<span class="ch-meta">Poles, ζ, error, G/(1+GH)</span>', () => {
    state.view = 'concepts'; state.concept = null; closeNav(); render(); window.scrollTo(0,0);
  });

  if (REFERENCE) {
    nav.insertAdjacentHTML('beforeend', '<h2>Reference</h2>');
    addNavBtn(nav, state.view === 'reference', 'Tables<span class="ch-meta">Transforms, impedances, algebra</span>', () => {
      state.view = 'reference'; state.lite = false; closeNav(); render(); window.scrollTo(0,0);
    });
  }

  nav.insertAdjacentHTML('beforeend', '<h2>Chapters</h2>');
  CHAPTERS.forEach((ch, i) => {
    const p = chapterProgress(ch);
    const active = state.view === 'chapter' && i === state.chapter && !state.lite;
    addNavBtn(nav, active,
      'Chapter ' + ch.id + '<span class="ch-meta">' + ch.title + (p.total ? ' · ' + p.done + '/' + p.total : '') + '</span>',
      () => openChapter(ch.id, 'guide', { lite:false })
    );
    const bar = document.createElement('div');
    bar.className = 'prog';
    bar.innerHTML = '<span style="width:' + p.pct + '%"></span>';
    nav.appendChild(bar);
  });
}
function addNavBtn(nav, active, html, onClick){
  const b = document.createElement('button');
  b.className = active ? 'active' : '';
  b.innerHTML = html;
  b.onclick = onClick;
  nav.appendChild(b);
}

function renderTabs(main, ch){
  const wrap = document.createElement('div');
  wrap.className = 'tabs';
  [['guide','Guide'],['formulas','Formulas'],['problems','Problems']].forEach(([key,label]) => {
    const b = document.createElement('button');
    b.textContent = key === 'problems' && ch.problems ? label + ' (' + ch.problems.length + ')' : label;
    b.className = state.tab === key ? 'active' : '';
    b.onclick = () => { state.tab = key; render(); };
    wrap.appendChild(b);
  });
  main.appendChild(wrap);
}

function renderGuide(main, ch){
  const items = ch.guide || [];
  if (!items.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No guide for this chapter yet.</p>');
    return;
  }
  const list = chapterSections(ch);
  const liteSecs = state.lite ? (COURSE.find(s => s.key === '5-lite') || {}).secs : null;
  const visible = liteSecs ? items.filter(g => liteSecs.indexOf(g.sec) >= 0) : items;

  if (state.lite) {
    const ban = document.createElement('div');
    ban.className = 'lite-banner';
    ban.innerHTML = 'First pass through block diagrams (5.1–5.3). After time response, come back for the full chapter.';
    main.appendChild(ban);
  }

  const usedSecs = [];
  visible.forEach(g => { if (g.sec && usedSecs.indexOf(g.sec) < 0) usedSecs.push(g.sec); });
  const railSecs = list.filter(s => !liteSecs || liteSecs.indexOf(s.id) >= 0);

  const mob = document.createElement('div');
  mob.className = 'mob-rail';
  railSecs.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = '#sec-' + s.id.replace('.', '-');
    a.dataset.sec = s.id;
    a.textContent = s.id;
    if (i === 0) a.className = 'active';
    a.onclick = ev => { ev.preventDefault(); jumpSec(s.id); };
    mob.appendChild(a);
  });
  main.appendChild(mob);

  const doc = document.createElement('div');
  doc.className = 'doc';
  const col = document.createElement('div');
  doc.appendChild(col);

  railSecs.forEach(s => {
    const members = visible.filter(g => g.sec === s.id);
    if (!members.length) return;
    const head = document.createElement('div');
    head.className = 'sec-head';
    head.id = 'sec-' + s.id.replace('.', '-');
    head.dataset.sec = s.id;
    head.innerHTML = '<span class="sec-id">' + s.id + '</span>' +
      (s.title ? '<span class="sec-title">' + s.title + '</span>' : '');
    col.appendChild(head);
    members.forEach(sec => col.appendChild(makeArticle(ch, sec)));
  });
  const untagged = visible.filter(g => !g.sec);
  untagged.forEach(sec => col.appendChild(makeArticle(ch, sec)));

  const rail = document.createElement('aside');
  rail.className = 'rail';
  rail.innerHTML = '<h3>On this page</h3>';
  railSecs.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = '#sec-' + s.id.replace('.', '-');
    a.dataset.sec = s.id;
    a.innerHTML = '<span class="rail-x">×</span>' + s.id + (s.title ? ' ' + s.title : '');
    if (i === 0) a.className = 'active';
    a.onclick = ev => { ev.preventDefault(); jumpSec(s.id); };
    rail.appendChild(a);
  });
  doc.appendChild(rail);
  main.appendChild(doc);
  watchSections(main);
}

function makeArticle(ch, sec){
  const art = document.createElement('article');
  art.className = 'guide-article';
  if (sec.sec) art.dataset.sec = sec.sec;
  const h = document.createElement('h3');
  h.className = 'art-title';
  art.appendChild(h);
  const body = document.createElement('div');
  body.className = 'guide-body';
  art.appendChild(body);
  fillInline(h, sec.title);
  fill(body, sec.body);
  attachExample(body, ch, sec.example);
  return art;
}

function jumpSec(id){
  const el = document.getElementById('sec-' + String(id).replace('.', '-'));
  if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start' });
  markRail(id);
}

function markRail(id){
  document.querySelectorAll('.rail a, .mob-rail a').forEach(a => {
    a.classList.toggle('active', a.dataset.sec === id);
  });
}

function watchSections(root){
  if (sectionObserver) sectionObserver.disconnect();
  const nodes = root.querySelectorAll('.sec-head[data-sec]');
  if (!nodes.length) return;
  sectionObserver = new IntersectionObserver(entries => {
    const vis = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (vis[0]) markRail(vis[0].target.dataset.sec);
  }, { rootMargin:'-20% 0px -70% 0px', threshold:[0, .25, 1] });
  nodes.forEach(n => sectionObserver.observe(n));
}

function renderFormulas(main, ch){
  const items = ch.formulas || [];
  if (!items.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No formula sheet for this chapter yet.</p>');
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'formula-grid';
  main.appendChild(grid);
  items.forEach(f => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    const eq = document.createElement('div');
    eq.className = 'formula-eq';
    card.appendChild(eq);
    if (f.note) {
      const n = document.createElement('div');
      n.className = 'formula-note';
      card.appendChild(n);
      fill(n, f.note);
    }
    grid.appendChild(card);
    if (typeof katex !== 'undefined') {
      try { katex.render(f.latex, eq, { displayMode:true, throwOnError:false, strict:false }); }
      catch (err) { fill(eq, '$$' + f.latex + '$$'); }
    } else fill(eq, '$$' + f.latex + '$$');
  });
}

function addReveal(body, acts, title, markdown, btnLabel, extraClass){
  const box = document.createElement('div');
  box.className = 'reveal hidden' + (extraClass ? ' ' + extraClass : '');
  box.innerHTML = '<h4>' + title + '</h4><div class="body"></div>';
  body.appendChild(box);
  const btn = document.createElement('button');
  btn.className = 'act' + (extraClass ? ' ' + extraClass : '');
  btn.textContent = btnLabel;
  btn.onclick = () => {
    box.classList.toggle('hidden');
    btn.textContent = box.classList.contains('hidden') ? btnLabel : 'Hide';
    if (!box.dataset.rendered) {
      fill(box.querySelector('.body'), markdown);
      box.dataset.rendered = '1';
    }
  };
  acts.appendChild(btn);
}

function mountProblemCard(list, p){
  const card = document.createElement('div');
  card.className = 'prob' + (state.solved[p.id] ? ' done' : '');
  card.id = 'prob-' + p.id;
  const head = document.createElement('div');
  head.className = 'prob-head';
  head.innerHTML =
    '<span class="prob-num">' + p.id + '</span>' +
    (p.sec ? '<span class="tag sec">' + p.sec + '</span>' : '') +
    (p.difficulty ? '<span class="tag ' + p.difficulty + '">' + p.difficulty + '</span>' : '') +
    (p.topic ? '<span class="tag">' + p.topic + '</span>' : '');
  card.appendChild(head);
  const body = document.createElement('div');
  body.className = 'prob-body';
  card.appendChild(body);
  const prompt = document.createElement('div');
  body.appendChild(prompt);
  const acts = document.createElement('div');
  acts.className = 'prob-actions';
  body.appendChild(acts);
  if (p.hint) addReveal(body, acts, 'Hint', p.hint, 'Hint');
  addReveal(body, acts, 'Answer', p.answer, 'Answer');
  if (p.expert) addReveal(body, acts, 'Expert read', p.expert, 'Expert read', 'expert');
  addReveal(body, acts, 'Solution', p.solution, 'Solution');
  const doneBtn = document.createElement('button');
  doneBtn.className = 'act' + (state.solved[p.id] ? ' done' : '');
  doneBtn.textContent = state.solved[p.id] ? 'Solved' : 'Solved?';
  doneBtn.onclick = () => {
    if (state.solved[p.id]) delete state.solved[p.id];
    else state.solved[p.id] = true;
    saveProgress();
    doneBtn.classList.toggle('done', !!state.solved[p.id]);
    doneBtn.textContent = state.solved[p.id] ? 'Solved' : 'Solved?';
    card.classList.toggle('done', !!state.solved[p.id]);
    renderNav();
  };
  acts.appendChild(doneBtn);
  list.appendChild(card);
  fill(prompt, p.prompt);
  return card;
}

function attachExample(body, ch, exampleId){
  if (!exampleId) return;
  const p = (ch.problems || []).find(x => x.id === exampleId);
  if (!p) return;
  const row = document.createElement('div');
  row.className = 'example-row';
  const btn = document.createElement('button');
  btn.className = 'act';
  btn.type = 'button';
  btn.textContent = 'Example · ' + p.id;
  const jump = document.createElement('button');
  jump.className = 'act';
  jump.type = 'button';
  jump.textContent = 'Open in Problems';
  const hold = document.createElement('div');
  hold.className = 'example-hold hidden';
  btn.onclick = () => {
    hold.classList.toggle('hidden');
    btn.textContent = hold.classList.contains('hidden') ? ('Example · ' + p.id) : 'Hide example';
    if (!hold.dataset.ready) { mountProblemCard(hold, p); hold.dataset.ready = '1'; }
  };
  jump.onclick = () => openChapter(ch.id, 'problems', { lite:false, scrollTo:'prob-' + p.id });
  row.appendChild(btn);
  row.appendChild(jump);
  body.appendChild(row);
  body.appendChild(hold);
}

function renderProblems(main, ch){
  let all = ch.problems || [];
  if (!all.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No problem set for this chapter yet.</p>');
    return;
  }
  if (state.lite) {
    const secs = (COURSE.find(s => s.key === '5-lite') || {}).secs || [];
    all = all.filter(p => secs.indexOf(p.sec) >= 0);
  }
  const topics = ['all', ...Array.from(new Set(all.map(p => p.topic).filter(Boolean))).sort()];
  const bar = document.createElement('div');
  bar.className = 'filters';
  bar.innerHTML =
    '<label>Difficulty <select id="f-diff">' +
      ['all','warmup','core','challenge'].map(d =>
        '<option value="' + d + '"' + (state.diff === d ? ' selected' : '') + '>' + d + '</option>').join('') +
    '</select></label>' +
    '<label>Section <select id="f-sec">' +
      ['all', ...chapterSections(ch).map(s => s.id)].map(d =>
        '<option value="' + d + '"' + (state.sec === d ? ' selected' : '') + '>' + d + '</option>').join('') +
    '</select></label>' +
    '<label>Topic <select id="f-topic">' +
      topics.map(t =>
        '<option value="' + t + '"' + (state.topic === t ? ' selected' : '') + '>' + t + '</option>').join('') +
    '</select></label>' +
    '<div class="pbar"><span id="pbar-fill"></span></div>' +
    '<div class="pcount" id="pbar-count"></div>' +
    '<button class="act" id="reset-ch">Reset chapter</button>';
  main.appendChild(bar);
  const list = document.createElement('div');
  main.appendChild(list);
  const shown = all.filter(p =>
    (state.diff === 'all' || p.difficulty === state.diff) &&
    (state.topic === 'all' || p.topic === state.topic) &&
    (state.sec === 'all' || p.sec === state.sec)
  );
  const prog = chapterProgress(ch);
  document.getElementById('pbar-fill').style.width = prog.pct + '%';
  document.getElementById('pbar-count').textContent = prog.done + ' / ' + prog.total + ' solved';
  document.getElementById('f-diff').onchange = e => { state.diff = e.target.value; render(); };
  document.getElementById('f-sec').onchange = e => { state.sec = e.target.value; render(); };
  document.getElementById('f-topic').onchange = e => { state.topic = e.target.value; render(); };
  document.getElementById('reset-ch').onclick = () => {
    (ch.problems || []).forEach(p => { delete state.solved[p.id]; });
    saveProgress(); render();
  };
  if (!shown.length) {
    list.innerHTML = '<p class="empty">No problems match those filters.</p>';
    return;
  }
  shown.forEach(p => mountProblemCard(list, p));
}

function renderReference(main){
  const h = document.createElement('h2');
  h.className = 'chap';
  h.textContent = REFERENCE.title || 'Reference';
  main.appendChild(h);
  if (REFERENCE.subtitle) {
    const sub = document.createElement('div');
    sub.className = 'chap-sub';
    sub.textContent = REFERENCE.subtitle;
    main.appendChild(sub);
  }
  (REFERENCE.sections || []).forEach((sec, i) => {
    const art = document.createElement('article');
    art.className = 'guide-article';
    const title = document.createElement('h3');
    title.className = 'art-title';
    art.appendChild(title);
    const body = document.createElement('div');
    body.className = 'guide-body';
    art.appendChild(body);
    main.appendChild(art);
    fillInline(title, sec.title);
    fill(body, sec.body);
  });
}

function planeSVG(){
  return '<figure class="plane"><svg viewBox="0 0 420 168" role="img" aria-label="s-plane: real axis sigma, imaginary axis j omega, left-half-plane zero and conjugate poles">' +
    '<line x1="24" y1="84" x2="396" y2="84" stroke="currentColor" stroke-width="1" opacity=".45"/>' +
    '<line x1="210" y1="16" x2="210" y2="152" stroke="currentColor" stroke-width="1" opacity=".45"/>' +
    '<polygon points="396,84 388,80 388,88" fill="currentColor" opacity=".45"/>' +
    '<polygon points="210,16 206,24 214,24" fill="currentColor" opacity=".45"/>' +
    '<text x="388" y="102" font-size="11" fill="currentColor" opacity=".55">σ</text>' +
    '<text x="218" y="28" font-size="11" fill="currentColor" opacity=".55">jω</text>' +
    '<circle cx="126" cy="84" r="6.5" fill="none" stroke="#B4472A" stroke-width="2"/>' +
    '<path d="M156 50 l9 9 m0-9 l-9 9" stroke="#B4472A" stroke-width="2.2" fill="none"/>' +
    '<path d="M156 109 l9 9 m0-9 l-9 9" stroke="#B4472A" stroke-width="2.2" fill="none"/>' +
    '<text x="86" y="72" font-size="11" fill="#B4472A">zero</text>' +
    '<text x="172" y="54" font-size="11" fill="#B4472A">poles</text>' +
    '</svg><figcaption>Distance from the imaginary axis is speed. Angle from the negative real axis is damping.</figcaption></figure>';
}

function renderHome(main){
  const hero = document.createElement('div');
  hero.className = 'home-hero';
  hero.innerHTML =
    '<div class="home-kicker"><img src="logo-transparent.png" alt="">Nexus</div>' +
    '<h2>The structure behind the response.</h2>' +
    '<p>Poles, zeros, energy storage, and the geometry of the $s$-plane. Written so a problem you have not seen still has a place to stand.</p>';
  main.appendChild(hero);
  typeset(hero);
  main.insertAdjacentHTML('beforeend', planeSVG());

  const path = document.createElement('div');
  path.className = 'path';
  COURSE.forEach(row => {
    const ch = chapterById(row.ch);
    const el = document.createElement('div');
    el.className = 'path-row' + (ch ? ' openable' : '');
    el.innerHTML =
      '<div class="wk">' + (ch ? (row.lite ? 'Pass' : 'Open') : 'Next') + '</div>' +
      '<div class="what">' + row.label + ' · ' + row.title +
        '<small>' + (row.note || (ch && ch.sections) || 'Not written yet.') + '</small></div>' +
      '<div class="go">' + (ch ? 'Open' : '') + '</div>';
    if (ch) el.onclick = () => openChapter(row.ch, 'guide', { lite:!!row.lite });
    path.appendChild(el);
  });
  main.appendChild(path);
}

function renderPager(main){
  if (state.view !== 'chapter') return;
  const { prev, next } = neighborStops();
  const bar = document.createElement('div');
  bar.className = 'pager';
  bar.innerHTML =
    '<button class="page' + (prev ? '' : ' gone') + '" id="pg-prev"><span class="lbl">Previous</span><span id="pg-prev-t"></span></button>' +
    '<button class="page next' + (next ? '' : ' gone') + '" id="pg-next"><span class="lbl">Next</span><span id="pg-next-t"></span></button>';
  main.appendChild(bar);
  if (prev) {
    document.getElementById('pg-prev-t').textContent = prev.label + ' · ' + prev.title;
    document.getElementById('pg-prev').onclick = () => openChapter(prev.ch, 'guide', { lite:!!prev.lite });
  }
  if (next) {
    document.getElementById('pg-next-t').textContent = next.label + ' · ' + next.title;
    document.getElementById('pg-next').onclick = () => openChapter(next.ch, 'guide', { lite:!!next.lite });
  }
}

function hayOfGuide(g){ return [g.title, g.body, g.sec].join(' '); }
function hayOfProb(p){ return [p.id, p.topic, p.prompt, p.answer, p.expert || '', p.solution, p.sec].join(' '); }

function conceptHits(concept){
  const guides = [];
  const problems = [];
  CHAPTERS.forEach(ch => {
    (ch.guide || []).forEach(g => {
      const text = hayOfGuide(g);
      if ((g.sec && concept.secs.indexOf(g.sec) >= 0) || concept.re.test(text)) {
        guides.push({ ch, g });
      }
    });
    (ch.problems || []).forEach(p => {
      const text = hayOfProb(p);
      if ((p.sec && concept.secs.indexOf(p.sec) >= 0) || concept.re.test(text)) {
        problems.push({ ch, p });
      }
    });
  });
  return { guides, problems };
}

function renderConcepts(main){
  const h = document.createElement('h2');
  h.className = 'chap';
  h.textContent = state.concept
    ? CONCEPTS.find(c => c.slug === state.concept).title
    : 'Concept index';
  main.appendChild(h);
  const sub = document.createElement('div');
  sub.className = 'chap-sub';
  sub.textContent = 'The same objects return in every chapter. These pages gather the notes and problems that touch them.';
  main.appendChild(sub);

  if (!state.concept) {
    const grid = document.createElement('div');
    grid.className = 'concept-grid';
    CONCEPTS.forEach(c => {
      const hits = conceptHits(c);
      const b = document.createElement('button');
      b.className = 'concept-card';
      b.innerHTML = '<h3>' + c.title + '</h3><p>' + c.blurb + '</p><p style="margin-top:8px">' +
        hits.guides.length + ' notes · ' + hits.problems.length + ' problems</p>';
      b.onclick = () => { state.view = 'concepts'; state.concept = c.slug; render(); window.scrollTo(0,0); };
      grid.appendChild(b);
    });
    main.appendChild(grid);
    return;
  }

  const c = CONCEPTS.find(x => x.slug === state.concept);
  const hits = conceptHits(c);
  const blurb = document.createElement('p');
  blurb.className = 'brief';
  blurb.textContent = c.blurb;
  main.appendChild(blurb);

  if (hits.guides.length) {
    const k = document.createElement('div');
    k.className = 'chap-kicker';
    k.textContent = 'Notes';
    main.appendChild(k);
    hits.guides.forEach(({ ch, g }) => {
      const art = document.createElement('article');
      art.className = 'guide-article';
      const t = document.createElement('h3');
      t.className = 'art-title';
      art.appendChild(t);
      const meta = document.createElement('div');
      meta.className = 'chap-sub';
      meta.textContent = 'Chapter ' + ch.id + (g.sec ? ' · ' + g.sec : '');
      art.appendChild(meta);
      const body = document.createElement('div');
      body.className = 'guide-body';
      art.appendChild(body);
      main.appendChild(art);
      fillInline(t, g.title);
      fill(body, g.body);
    });
  }
  if (hits.problems.length) {
    const k = document.createElement('div');
    k.className = 'chap-kicker';
    k.textContent = 'Problems';
    main.appendChild(k);
    hits.problems.forEach(({ p }) => mountProblemCard(main, p));
  }
}

function searchIndex(){
  const rows = [];
  CHAPTERS.forEach(ch => {
    (ch.guide || []).forEach(g => rows.push({
      kind:'Guide', ch, title:g.title, hay:hayOfGuide(g),
      go:() => openChapter(ch.id, 'guide', { lite:false })
    }));
    (ch.problems || []).forEach(p => rows.push({
      kind:'Problem ' + p.id, ch, title:p.topic || p.id, hay:hayOfProb(p),
      go:() => openChapter(ch.id, 'problems', { lite:false, scrollTo:'prob-' + p.id })
    }));
    (ch.formulas || []).forEach(f => rows.push({
      kind:'Formula', ch, title:f.note || f.latex, hay:[f.latex, f.note||''].join(' '),
      go:() => openChapter(ch.id, 'formulas', { lite:false })
    }));
  });
  if (REFERENCE) {
    (REFERENCE.sections || []).forEach(s => rows.push({
      kind:'Reference', ch:null, title:s.title, hay:s.title + ' ' + s.body,
      go:() => { state.view = 'reference'; render(); window.scrollTo(0,0); }
    }));
  }
  return rows;
}

function renderSearch(main){
  const q = state.query.trim();
  const h = document.createElement('h2');
  h.className = 'chap';
  h.textContent = q ? 'Search' : 'Search the course';
  main.appendChild(h);
  const sub = document.createElement('div');
  sub.className = 'chap-sub';
  sub.textContent = q ? ('Results for “' + q + '”') : 'Guides, problems, formulas, and tables.';
  main.appendChild(sub);
  if (q.length < 2) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">Type at least two characters.</p>');
    return;
  }
  const needle = q.toLowerCase();
  const hits = searchIndex().filter(r => r.hay.toLowerCase().indexOf(needle) >= 0).slice(0, 60);
  if (!hits.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">Nothing matched.</p>');
    return;
  }
  hits.forEach(r => {
    const b = document.createElement('button');
    b.className = 'hit';
    const snipAt = r.hay.toLowerCase().indexOf(needle);
    const snip = r.hay.replace(/\s+/g, ' ').slice(Math.max(0, snipAt - 40), snipAt + 80);
    b.innerHTML = '<div class="where">' + r.kind + (r.ch ? ' · Chapter ' + r.ch.id : '') + '</div>' +
      '<div class="ttl"></div><div class="snip"></div>';
    b.querySelector('.ttl').textContent = String(r.title).replace(/[#*_$\\]/g, ' ').slice(0, 120);
    b.querySelector('.snip').textContent = (snipAt > 0 ? '…' : '') + snip + '…';
    b.onclick = r.go;
    main.appendChild(b);
  });
}

function syncHash(){
  let hash = '#/';
  if (state.view === 'home') hash = '#/';
  else if (state.view === 'reference') hash = '#/ref';
  else if (state.view === 'search') hash = '#/search/' + encodeURIComponent(state.query);
  else if (state.view === 'concepts') hash = state.concept ? '#/concept/' + state.concept : '#/concepts';
  else {
    const ch = CHAPTERS[state.chapter];
    hash = '#/ch/' + (ch ? ch.id : 1) + '/' + state.tab + (state.lite ? '/lite' : '');
  }
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

function applyHash(){
  const raw = (location.hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  state.lite = false;
  state.concept = null;
  if (!parts.length) { state.view = 'home'; return; }
  if (parts[0] === 'ref') { state.view = 'reference'; return; }
  if (parts[0] === 'search') { state.view = 'search'; state.query = decodeURIComponent(parts.slice(1).join('/') || ''); return; }
  if (parts[0] === 'concepts') { state.view = 'concepts'; return; }
  if (parts[0] === 'concept' && parts[1]) { state.view = 'concepts'; state.concept = parts[1]; return; }
  if (parts[0] === 'ch') {
    const id = Number(parts[1]);
    const idx = chapterIndexById(id);
    if (idx >= 0) {
      state.view = 'chapter';
      state.chapter = idx;
      if (parts[2] === 'guide' || parts[2] === 'formulas' || parts[2] === 'problems') state.tab = parts[2];
      if (parts[2] === 'lite' || parts[3] === 'lite') state.lite = true;
    }
  }
}

function render(){
  renderNav();
  const main = document.getElementById('main');
  main.innerHTML = '';

  if (state.view === 'home') renderHome(main);
  else if (state.view === 'reference' && REFERENCE) renderReference(main);
  else if (state.view === 'search') renderSearch(main);
  else if (state.view === 'concepts') renderConcepts(main);
  else if (!CHAPTERS.length) main.innerHTML = '<p class="empty">No chapters loaded.</p>';
  else {
    const ch = CHAPTERS[state.chapter];
    const kick = document.createElement('div');
    kick.className = 'chap-kicker';
    kick.textContent = state.lite ? 'First pass' : ('Chapter ' + ch.id);
    main.appendChild(kick);
    const h = document.createElement('h2');
    h.className = 'chap';
    h.textContent = state.lite ? 'Block diagrams' : ch.title;
    main.appendChild(h);
    if (ch.sections && !state.lite) {
      const sub = document.createElement('div');
      sub.className = 'chap-sub';
      sub.textContent = ch.sections;
      main.appendChild(sub);
    }
    if (ch.brief && !state.lite) {
      const b = document.createElement('div');
      b.className = 'brief';
      main.appendChild(b);
      fill(b, ch.brief);
    }
    renderTabs(main, ch);
    if (state.tab === 'guide') renderGuide(main, ch);
    else if (state.tab === 'formulas') renderFormulas(main, ch);
    else renderProblems(main, ch);
    renderPager(main);
  }
  syncHash();
  if (state.scrollTo) {
    const el = document.getElementById(state.scrollTo);
    state.scrollTo = null;
    if (el) setTimeout(() => el.scrollIntoView({ block:'start' }), 40);
  }
}

const searchBox = document.getElementById('search');
let searchTimer = null;
searchBox.addEventListener('input', e => {
  state.query = e.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (state.query.trim()) state.view = 'search';
    render();
  }, 80);
});
searchBox.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchBox.value = '';
    state.query = '';
    state.view = 'home';
    render();
  }
});

document.getElementById('theme-btn').onclick = () => {
  applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
};
document.getElementById('menu-btn').onclick = () => {
  document.getElementById('nav').classList.toggle('open');
  document.getElementById('backdrop').classList.toggle('show');
};
document.getElementById('backdrop').onclick = closeNav;
document.getElementById('brand-btn').onclick = () => {
  state.view = 'home'; state.lite = false; state.query = '';
  searchBox.value = '';
  closeNav(); render(); window.scrollTo(0,0);
};
window.addEventListener('hashchange', () => { applyHash(); if (state.view !== 'search') searchBox.value = state.query; render(); });
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchBox && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    searchBox.focus();
  }
});

loadProgress();
applyHash();
if (state.view === 'search') searchBox.value = state.query;
window.addEventListener('DOMContentLoaded', render);
if (document.readyState !== 'loading') render();
