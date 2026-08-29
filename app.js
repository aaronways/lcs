const STORE_KEY = 'nexus-lcs:v1';
const THEME_KEY = 'nexus-lcs:theme';
const LEGACY_KEY = 'lcs-companion:v1';

let state = {
  view: 'home', chapter: 0, tab: 'guide',
  solved: {}, query: '', diff: 'all', topic: 'all', sec: 'all'
};

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
    throwOnError: false,
    strict: false
  });
}
function fill(el, markdown){
  el.innerHTML = mdMath(markdown);
  typeset(el);
}
function fillInline(el, markdown){
  el.innerHTML = mdInline(markdown);
  typeset(el);
}

function chapterProgress(ch){
  const total = (ch.problems || []).length;
  if (!total) return { done:0, total:0, pct:0 };
  const done = ch.problems.filter(p => state.solved[p.id]).length;
  return { done, total, pct: Math.round(100 * done / total) };
}
function closeNav(){
  document.getElementById('nav').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
}

function renderNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  nav.insertAdjacentHTML('beforeend', '<h2>Start</h2>');
  const home = document.createElement('button');
  home.className = state.view === 'home' ? 'active' : '';
  home.innerHTML = 'Map<span class="ch-meta">Course sequence</span>';
  home.onclick = () => { state.view = 'home'; closeNav(); render(); window.scrollTo(0,0); };
  nav.appendChild(home);

  if (REFERENCE) {
    nav.insertAdjacentHTML('beforeend', '<h2>Reference</h2>');
    const r = document.createElement('button');
    r.className = state.view === 'reference' ? 'active' : '';
    r.innerHTML = 'Tables<span class="ch-meta">Transforms, impedances, algebra</span>';
    r.onclick = () => { state.view = 'reference'; closeNav(); render(); window.scrollTo(0,0); };
    nav.appendChild(r);
  }

  nav.insertAdjacentHTML('beforeend', '<h2>Chapters</h2>');
  CHAPTERS.forEach((ch, i) => {
    const p = chapterProgress(ch);
    const b = document.createElement('button');
    b.className = (state.view === 'chapter' && i === state.chapter ? 'active' : '');
    b.innerHTML =
      'Chapter ' + ch.id +
      '<span class="ch-meta">' + ch.title +
      (p.total ? ' · ' + p.done + '/' + p.total : '') + '</span>';
    b.onclick = () => {
      state.view = 'chapter'; state.chapter = i; state.tab = 'guide'; state.sec = 'all';
      closeNav(); render(); window.scrollTo(0,0);
    };
    nav.appendChild(b);
    const bar = document.createElement('div');
    bar.className = 'prog';
    bar.innerHTML = '<span style="width:' + p.pct + '%"></span>';
    nav.appendChild(bar);
  });
}

function renderTabs(main, ch){
  const wrap = document.createElement('div');
  wrap.className = 'tabs';
  [['guide','Guide'],['formulas','Formulas'],['problems','Problems']].forEach(([key,label]) => {
    const b = document.createElement('button');
    b.textContent = label;
    if (key === 'problems' && ch.problems) b.textContent += ' (' + ch.problems.length + ')';
    b.className = state.tab === key ? 'active' : '';
    b.onclick = () => { state.tab = key; render(); };
    wrap.appendChild(b);
  });
  main.appendChild(wrap);
}

function chapterSections(ch){
  if (ch.sectionList && ch.sectionList.length) return ch.sectionList;
  const seen = [];
  (ch.guide || []).forEach(g => {
    if (g.sec && !seen.some(s => s.id === g.sec)) seen.push({ id: g.sec, title: '' });
  });
  return seen;
}

function renderSecNav(main, ch){
  const list = chapterSections(ch);
  if (!list.length) return;
  const nav = document.createElement('div');
  nav.className = 'sec-nav';
  const all = document.createElement('button');
  all.className = 'sec-chip' + (state.sec === 'all' ? ' active' : '');
  all.textContent = 'All';
  all.onclick = () => { state.sec = 'all'; render(); };
  nav.appendChild(all);
  list.forEach(s => {
    const b = document.createElement('button');
    b.className = 'sec-chip' + (state.sec === s.id ? ' active' : '');
    b.textContent = s.id;
    b.title = s.title || s.id;
    b.onclick = () => { state.sec = s.id; render(); };
    nav.appendChild(b);
  });
  main.appendChild(nav);
}

function renderGuide(main, ch){
  const items = ch.guide || [];
  if (!items.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No guide for this chapter yet.</p>');
    return;
  }
  renderSecNav(main, ch);
  const list = chapterSections(ch);
  const groups = [];
  if (list.length) {
    list.forEach(s => {
      const members = items.filter(g => g.sec === s.id);
      if (members.length && (state.sec === 'all' || state.sec === s.id)) {
        groups.push({ sec: s, members });
      }
    });
    const untagged = items.filter(g => !g.sec);
    if (untagged.length && state.sec === 'all') groups.push({ sec: { id: '', title: '' }, members: untagged });
  } else {
    groups.push({ sec: { id: '', title: '' }, members: items });
  }
  if (!groups.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No notes in that section.</p>');
    return;
  }
  let opened = false;
  groups.forEach(group => {
    if (group.sec.id) {
      const head = document.createElement('div');
      head.className = 'sec-head';
      head.innerHTML = '<span class="sec-id">' + group.sec.id + '</span>' +
        (group.sec.title ? '<span class="sec-title">' + group.sec.title + '</span>' : '');
      main.appendChild(head);
    }
    group.members.forEach(sec => {
      const d = document.createElement('details');
      d.className = 'guide-sec';
      if (!opened) { d.open = true; opened = true; }
      const s = document.createElement('summary');
      s.innerHTML = '<span class="chev">▾</span>';
      const label = document.createElement('span');
      label.className = 'sum-text';
      s.appendChild(label);
      d.appendChild(s);
      const body = document.createElement('div');
      body.className = 'guide-body';
      d.appendChild(body);
      main.appendChild(d);
      fillInline(label, sec.title);
      fill(body, sec.body);
      attachExample(body, ch, sec.example);
    });
  });
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
      try {
        katex.render(f.latex, eq, { displayMode: true, throwOnError: false, strict: false });
      } catch (err) {
        fill(eq, '$$' + f.latex + '$$');
      }
    } else {
      fill(eq, '$$' + f.latex + '$$');
    }
  });
}

function matches(p, q){
  if (!q) return true;
  const hay = [p.id, p.topic, p.prompt, p.answer, p.expert || '', p.solution].join(' ').toLowerCase();
  return hay.indexOf(q.toLowerCase()) !== -1;
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
    saveProgress(); render();
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
    if (!hold.dataset.ready) {
      mountProblemCard(hold, p);
      hold.dataset.ready = '1';
    }
  };
  jump.onclick = () => {
    state.tab = 'problems';
    state.query = p.id;
    state.sec = 'all';
    state.topic = 'all';
    state.diff = 'all';
    const search = document.getElementById('search');
    if (search) search.value = p.id;
    render();
  };
  row.appendChild(btn);
  row.appendChild(jump);
  body.appendChild(row);
  body.appendChild(hold);
}

function renderProblems(main, ch){
  const all = ch.problems || [];
  if (!all.length) {
    main.insertAdjacentHTML('beforeend', '<p class="empty">No problem set for this chapter yet.</p>');
    return;
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
    (state.sec === 'all' || p.sec === state.sec) &&
    matches(p, state.query));

  const prog = chapterProgress(ch);
  document.getElementById('pbar-fill').style.width = prog.pct + '%';
  document.getElementById('pbar-count').textContent = prog.done + ' / ' + prog.total + ' solved';
  document.getElementById('f-diff').onchange = e => { state.diff = e.target.value; render(); };
  const fs = document.getElementById('f-sec');
  if (fs) fs.onchange = e => { state.sec = e.target.value; render(); };
  document.getElementById('f-topic').onchange = e => { state.topic = e.target.value; render(); };
  document.getElementById('reset-ch').onclick = () => {
    all.forEach(p => { delete state.solved[p.id]; });
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
    const d = document.createElement('details');
    d.className = 'guide-sec';
    if (i === 0) d.open = true;
    const s = document.createElement('summary');
    s.innerHTML = '<span class="chev">▾</span>';
    const label = document.createElement('span');
    label.className = 'sum-text';
    s.appendChild(label);
    d.appendChild(s);
    const body = document.createElement('div');
    body.className = 'guide-body';
    d.appendChild(body);
    main.appendChild(d);
    fillInline(label, sec.title);
    fill(body, sec.body);
  });
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

  const path = document.createElement('div');
  path.className = 'path';
  const rows = [
    { id:1, label:'Open', title:'Chapter 1 · Introduction', note:'What a control system is. Open versus closed loop. Transient, error, stability.' },
    { id:2, label:'Open', title:'Chapter 2 · Frequency-domain modeling', note:'Laplace, $G(s)$, impedances, linearization. Sections 2.1–2.5 and 2.10–2.11.' },
    { id:4, label:'Open', title:'Chapter 4 · Time response', note:'From pole location to $T_s$, $T_p$, and overshoot. Sections 4.1–4.8.' },
    { id:5, label:'Open', title:'Chapter 5 · Reduction of multiple subsystems', note:'Block diagrams, loading, closed-loop $G/(1+GH)$. Sections 5.1–5.3.' },
    { id:null, label:'Next', title:'Chapter 6 · Stability', note:'Routh–Hurwitz.' },
    { id:null, label:'Next', title:'Chapter 7 · Steady-state error', note:'Sections 7.1–7.4.' },
    { id:null, label:'Next', title:'Chapters 8–11 · Design', note:'Root locus, time-domain design, frequency response.' },
    { id:null, label:'Later', title:'Chapters 3 and 12 · State space', note:'After the classical sequence.' }
  ];
  rows.forEach(row => {
    const el = document.createElement('div');
    const idx = CHAPTERS.findIndex(c => c.id === row.id);
    el.className = 'path-row' + (idx >= 0 ? ' openable' : '');
    el.innerHTML =
      '<div class="wk">' + row.label + '</div>' +
      '<div class="what">' + row.title + '<small>' + row.note + '</small></div>' +
      '<div class="go">' + (idx >= 0 ? 'Open' : '') + '</div>';
    if (idx >= 0) {
      el.onclick = () => {
        state.view = 'chapter'; state.chapter = idx; state.tab = 'guide'; state.sec = 'all';
        render(); window.scrollTo(0,0);
      };
    }
    path.appendChild(el);
    typeset(el);
  });
  main.appendChild(path);
}

function syncHash(){
  let hash = '#/';
  if (state.view === 'home') hash = '#/';
  else if (state.view === 'reference') hash = '#/ref';
  else {
    const ch = CHAPTERS[state.chapter];
    hash = '#/ch/' + (ch ? ch.id : 1) + '/' + state.tab;
  }
  if (location.hash !== hash) history.replaceState(null, '', hash);
}
function applyHash(){
  const raw = (location.hash || '#/').replace(/^#/, '');
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) { state.view = 'home'; return; }
  if (parts[0] === 'ref') { state.view = 'reference'; return; }
  if (parts[0] === 'ch') {
    const id = Number(parts[1]);
    const idx = CHAPTERS.findIndex(c => c.id === id);
    if (idx >= 0) {
      state.view = 'chapter';
      state.chapter = idx;
      if (parts[2] === 'guide' || parts[2] === 'formulas' || parts[2] === 'problems') state.tab = parts[2];
    }
  }
}

function render(){
  renderNav();
  const main = document.getElementById('main');
  main.innerHTML = '';

  if (state.view === 'home') { renderHome(main); syncHash(); return; }
  if (state.view === 'reference' && REFERENCE) { renderReference(main); syncHash(); return; }
  if (!CHAPTERS.length) {
    main.innerHTML = '<p class="empty">No chapters loaded.</p>';
    return;
  }

  const ch = CHAPTERS[state.chapter];
  const h = document.createElement('h2');
  h.className = 'chap';
  h.textContent = 'Chapter ' + ch.id + ': ' + ch.title;
  main.appendChild(h);
  if (ch.sections) {
    const sub = document.createElement('div');
    sub.className = 'chap-sub';
    sub.textContent = ch.sections;
    main.appendChild(sub);
  }
  if (ch.brief) {
    const b = document.createElement('div');
    b.className = 'brief';
    main.appendChild(b);
    fill(b, ch.brief);
  }
  renderTabs(main, ch);
  if (state.tab === 'guide') renderGuide(main, ch);
  else if (state.tab === 'formulas') renderFormulas(main, ch);
  else renderProblems(main, ch);
  syncHash();
}

document.getElementById('search').addEventListener('input', e => {
  state.query = e.target.value;
  if (state.query) { state.view = 'chapter'; state.tab = 'problems'; }
  render();
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
  state.view = 'home'; closeNav(); render(); window.scrollTo(0,0);
};
window.addEventListener('hashchange', () => { applyHash(); render(); });

loadProgress();
applyHash();
window.addEventListener('DOMContentLoaded', render);
if (document.readyState !== 'loading') render();
