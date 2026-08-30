const STORE_KEY  = 'nexus-lcs:v1';
const THEME_KEY  = 'nexus-lcs:theme';
const LEGACY_KEY = 'lcs-companion:v1';
const TRY_KEY    = 'nexus-lcs:attempts';

/* The instructor's sequence, not Nise's. Chapter 5 gets a light pass at
   5.1-5.3 before Chapter 4 and a full treatment after; it is listed once,
   at the position where it is actually studied in depth. */
const COURSE_ORDER = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 3, 12];

/* Recurring objects, and every section that touches them. The chapters are
   views on these, not separate topics. */
const CONCEPTS = [
  { slug:'transfer-function', name:'The transfer function',
    blurb:'Output over input, zero initial conditions. Built once, reused everywhere.',
    secs:['2.3','2.4','2.5','5.2'] },
  { slug:'poles-zeros', name:'Poles and zeros',
    blurb:'Where the denominator vanishes sets the terms; where the numerator vanishes sets their weights.',
    secs:['2.3','4.2','4.3','4.7','4.8','5.3'] },
  { slug:'damping', name:'Damping ratio and natural frequency',
    blurb:'The angle of the pole fixes the shape; the distance fixes the time scale.',
    secs:['4.4','4.5','4.6','5.3'] },
  { slug:'closed-loop', name:'Closing the loop',
    blurb:'G/(1+GH). What feedback buys, and what it costs.',
    secs:['1.3','5.1','5.2','5.3'] },
  { slug:'characteristic-equation', name:'The characteristic equation',
    blurb:'1 + G(s)H(s) = 0. Stability, root locus, and design all reduce to this.',
    secs:['4.2','5.2','5.3'] },
  { slug:'laplace', name:'Laplace and the s-domain',
    blurb:'Why differentiation becomes multiplication, and what that buys.',
    secs:['2.2','2.3'] },
  { slug:'linearization', name:'Nonlinearity and linearization',
    blurb:'Operating point, deviation variables, and the slope you actually use.',
    secs:['2.10','2.11'] },
  { slug:'specifications', name:'Transient specifications',
    blurb:'%OS, Tp, Ts, Tr — read off a pole rather than solved for.',
    secs:['1.4','4.6','4.7','5.3'] }
];

/* Sections that get an interactive figure. */
const WIDGET_SLOTS = { '4.6':'splane', '4.5':'splane' };

let state = {
  view:'home', chapter:0, tab:'guide',
  solved:{}, attempts:{}, query:'', diff:'all', topic:'all', concept:null
};

/* ---------- storage ------------------------------------------------------ */
function loadProgress(){
  try {
    state.solved = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    if (!Object.keys(state.solved).length){
      const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '{}');
      if (legacy && typeof legacy === 'object') state.solved = legacy;
    }
  } catch (e) { state.solved = {}; }
  try { state.attempts = JSON.parse(localStorage.getItem(TRY_KEY)) || {}; }
  catch (e) { state.attempts = {}; }
}
function saveProgress(){
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state.solved)); } catch (e) {}
}
function saveAttempts(){
  try { localStorage.setItem(TRY_KEY, JSON.stringify(state.attempts)); } catch (e) {}
}
function applyTheme(theme){
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}
(function initTheme(){
  let theme = 'light', stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (stored) theme = stored;
  else if (matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  applyTheme(theme);
})();

/* ---------- markdown + math (unchanged pipeline) ------------------------- */
function mdMath(src){
  if (!src) return '';
  const figs = [], vault = [];
  const stashFig = m => { figs.push(m); return '<!--NXFIG' + (figs.length - 1) + '-->'; };
  const stash    = m => { vault.push(m); return '@@M' + (vault.length - 1) + '@@'; };
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
    delimiters:[
      { left:'$$', right:'$$', display:true },
      { left:'\\[', right:'\\]', display:true },
      { left:'\\(', right:'\\)', display:false },
      { left:'$',  right:'$',  display:false }
    ],
    throwOnError:false, strict:false
  });
}
function fill(el, md){ el.innerHTML = mdMath(md); typeset(el); }
function fillInline(el, md){ el.innerHTML = mdInline(md); typeset(el); }

/* ---------- helpers ------------------------------------------------------ */
function esc(s){
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}
function chapterProgress(ch){
  const total = (ch.problems || []).length;
  if (!total) return { done:0, total:0, pct:0 };
  const done = ch.problems.filter(p => state.solved[p.id]).length;
  return { done, total, pct: Math.round(100 * done / total) };
}
function chapterSections(ch){
  if (ch.sectionList && ch.sectionList.length) return ch.sectionList;
  const seen = [];
  (ch.guide || []).forEach(g => {
    if (g.sec && !seen.some(s => s.id === g.sec)) seen.push({ id:g.sec, title:'' });
  });
  return seen;
}
function orderedChapters(){
  const out = [];
  COURSE_ORDER.forEach(id => {
    const i = CHAPTERS.findIndex(c => c.id === id);
    if (i >= 0) out.push(i);
  });
  CHAPTERS.forEach((c, i) => { if (out.indexOf(i) < 0) out.push(i); });
  return out;
}
function closeNav(){
  document.getElementById('nav').classList.remove('open');
  document.getElementById('backdrop').classList.remove('show');
}
function go(patch, top){
  Object.assign(state, patch);
  closeNav();
  render();
  if (top !== false) window.scrollTo(0, 0);
}
function openChapter(idx, tab){
  go({ view:'chapter', chapter:idx, tab: tab || 'guide', query:'', concept:null });
  const s = document.getElementById('search'); if (s) s.value = '';
}

/* ---------- chapter drawer ----------------------------------------------- */
function renderNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = '';
  const add = (html, cls, fn, extra) => {
    const b = document.createElement('button');
    b.className = 'nav-item ' + (cls || '');
    b.innerHTML = html;
    if (fn) b.onclick = fn; else b.classList.add('pending');
    nav.appendChild(b);
    if (extra) nav.appendChild(extra);
    return b;
  };
  nav.insertAdjacentHTML('beforeend', '<h2>Start</h2>');
  add('<span class="n">Map</span><span class="t">Course sequence</span>',
      state.view === 'home' ? 'active' : '', () => go({ view:'home' }));
  add('<span class="n">Concepts</span><span class="t">Threads across chapters</span>',
      state.view === 'concepts' ? 'active' : '', () => go({ view:'concepts', concept:null }));
  if (REFERENCE)
    add('<span class="n">Reference</span><span class="t">Transforms, impedances, algebra</span>',
        state.view === 'reference' ? 'active' : '', () => go({ view:'reference' }));

  nav.insertAdjacentHTML('beforeend', '<h2>Chapters · course order</h2>');
  orderedChapters().forEach(i => {
    const ch = CHAPTERS[i], p = chapterProgress(ch);
    const bar = document.createElement('div');
    bar.className = 'prog';
    bar.innerHTML = '<span style="width:' + p.pct + '%"></span>';
    add('<span class="n">Ch ' + ch.id + '</span><span class="t">' + esc(ch.title) +
        (p.total ? ' · ' + p.done + '/' + p.total : '') + '</span>',
        (state.view === 'chapter' && i === state.chapter) ? 'active' : '',
        () => openChapter(i), bar);
  });

  const missing = COURSE_ORDER.filter(id => !CHAPTERS.some(c => c.id === id));
  if (missing.length){
    nav.insertAdjacentHTML('beforeend', '<h2>Not written yet</h2>');
    add('<span class="n">Ch ' + missing.join(', ') + '</span>' +
        '<span class="t">Remaining in the sequence</span>', '', null);
  }
}

/* ---------- section rail + scroll spy ------------------------------------ */
let spyTargets = [];
function buildRail(ch){
  const list = chapterSections(ch).filter(s => (ch.guide || []).some(g => g.sec === s.id));
  const wrap = document.createElement('aside');
  wrap.className = 'railwrap';
  if (!list.length) return { wrap, strip:document.createElement('div') };

  wrap.innerHTML = '<div class="rail-title">Chapter ' + ch.id + '</div>' +
    '<div class="rail"><div class="rail-mark"></div></div>' +
    '<div class="rail-foot"></div>';
  const rail = wrap.querySelector('.rail');
  const strip = document.createElement('div');
  strip.className = 'strip';

  list.forEach(s => {
    const a = document.createElement('a');
    a.href = '#sec-' + s.id;
    a.dataset.sec = s.id;
    a.innerHTML = '<span class="id">' + esc(s.id) + '</span>' + esc(s.title || '');
    rail.appendChild(a);
    const c = document.createElement('a');
    c.href = '#sec-' + s.id;
    c.dataset.sec = s.id;
    c.textContent = s.id;
    strip.appendChild(c);
  });

  const foot = wrap.querySelector('.rail-foot');
  const ord = orderedChapters(), here = ord.indexOf(state.chapter);
  const seq = (label, idx) => {
    const b = document.createElement('button');
    b.className = 'seqbtn';
    if (idx == null){ b.disabled = true; b.innerHTML = '<span class="k">' + label + '</span><span class="v">—</span>'; }
    else {
      b.innerHTML = '<span class="k">' + label + '</span><span class="v">Ch ' +
        CHAPTERS[idx].id + ' · ' + esc(CHAPTERS[idx].title) + '</span>';
      b.onclick = () => openChapter(idx);
    }
    foot.appendChild(b);
  };
  seq('Previous', here > 0 ? ord[here - 1] : null);
  seq('Next', here >= 0 && here < ord.length - 1 ? ord[here + 1] : null);
  return { wrap, strip };
}

function initSpy(){
  const links = Array.from(document.querySelectorAll('.rail a, .strip a'));
  const mark  = document.querySelector('.rail-mark');
  spyTargets = Array.from(document.querySelectorAll('.gsec'));
  if (!spyTargets.length || !links.length) return;
  let ticking = false;
  function update(){
    ticking = false;
    let cur = spyTargets[0].dataset.sec;
    for (const t of spyTargets){
      if (t.getBoundingClientRect().top <= 140) cur = t.dataset.sec; else break;
    }
    links.forEach(a => a.classList.toggle('on', a.dataset.sec === cur));
    const active = document.querySelector('.rail a.on');
    if (mark && active) mark.style.top = (active.offsetTop + 9) + 'px';
    const chip = document.querySelector('.strip a.on');
    if (chip && chip.parentElement.scrollWidth > chip.parentElement.clientWidth){
      const p = chip.parentElement;
      const want = chip.offsetLeft - p.clientWidth / 2 + chip.clientWidth / 2;
      p.scrollTo({ left:want, behavior:'smooth' });
    }
  }
  window.addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(update); }
  }, { passive:true });
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById('sec-' + a.dataset.sec);
    if (t) t.scrollIntoView({ behavior:'smooth', block:'start' });
  }));
  update();
}

/* ---------- guide: one continuous document ------------------------------- */
function renderGuide(main, ch){
  const items = ch.guide || [];
  if (!items.length){
    main.insertAdjacentHTML('beforeend', '<p class="empty">No guide for this chapter yet.</p>');
    return;
  }
  const list = chapterSections(ch);
  const groups = [];
  list.forEach(s => {
    const members = items.filter(g => g.sec === s.id);
    if (members.length) groups.push({ sec:s, members });
  });
  const untagged = items.filter(g => !g.sec);
  if (untagged.length) groups.push({ sec:{ id:'', title:'' }, members:untagged });

  groups.forEach(group => {
    const sec = document.createElement('section');
    sec.className = 'gsec';
    if (group.sec.id){
      sec.id = 'sec-' + group.sec.id;
      sec.dataset.sec = group.sec.id;
      sec.innerHTML =
        '<div class="gsec-head"><span class="gsec-id">' + esc(group.sec.id) + '</span>' +
        '<span class="gsec-name">' + esc(group.sec.title || '') + '</span></div>' +
        '<div class="gsec-rule"></div>';
    }
    group.members.forEach(g => {
      const item = document.createElement('article');
      item.className = 'gitem';
      const h = document.createElement('h2');
      h.className = 'gitem-title';
      const body = document.createElement('div');
      body.className = 'guide-body';
      item.appendChild(h); item.appendChild(body);
      sec.appendChild(item);
      fillInline(h, g.title);
      fill(body, g.body);
      attachExample(body, ch, g.example);
    });
    if (group.sec.id && WIDGET_SLOTS[group.sec.id] === 'splane' && typeof NXW !== 'undefined'){
      const hold = document.createElement('div');
      sec.appendChild(hold);
      NXW.sPlane(hold, { title:'Move the pole, watch the response' });
    }
    main.appendChild(sec);
  });
}

/* ---------- problems ------------------------------------------------------ */
function addReveal(body, acts, title, md, label, cls){
  const box = document.createElement('div');
  box.className = 'reveal hidden' + (cls ? ' ' + cls : '');
  box.innerHTML = '<h4>' + title + '</h4><div class="body"></div>';
  body.appendChild(box);
  const btn = document.createElement('button');
  btn.className = 'act' + (cls ? ' ' + cls : '');
  btn.textContent = label;
  btn.onclick = () => {
    box.classList.toggle('hidden');
    btn.textContent = box.classList.contains('hidden') ? label : 'Hide';
    if (!box.dataset.rendered){ fill(box.querySelector('.body'), md); box.dataset.rendered = '1'; }
  };
  acts.appendChild(btn);
  return { box, btn };
}

/* Solution sits behind one attempt. Not a wall — one click past an empty
   box — but enough that the default path is to commit to something first. */
function addSolution(body, acts, p){
  const gate = document.createElement('div');
  gate.className = 'attempt';
  gate.innerHTML = '<div class="attempt-lbl">Your first step</div><textarea rows="2" ' +
    'placeholder="What is the first thing you would write down? A guess counts."></textarea>';
  const ta = gate.querySelector('textarea');
  ta.value = state.attempts[p.id] || '';
  ta.addEventListener('change', () => {
    if (ta.value.trim()) state.attempts[p.id] = ta.value; else delete state.attempts[p.id];
    saveAttempts();
  });
  body.appendChild(gate);

  const yours = document.createElement('div');
  yours.className = 'yours hidden';
  yours.innerHTML = '<div class="attempt-lbl">You wrote</div><pre></pre>';
  body.appendChild(yours);

  const box = document.createElement('div');
  box.className = 'reveal hidden';
  box.innerHTML = '<h4>Solution</h4><div class="body"></div>';
  body.appendChild(box);

  const btn = document.createElement('button');
  btn.className = 'act primary';
  btn.textContent = 'Show solution';
  btn.onclick = () => {
    const open = !box.classList.contains('hidden');
    if (open){
      box.classList.add('hidden'); yours.classList.add('hidden');
      gate.classList.remove('hidden'); btn.textContent = 'Show solution'; return;
    }
    if (!ta.value.trim() && btn.dataset.armed !== '1'){
      btn.dataset.armed = '1';
      btn.textContent = 'Show it anyway';
      ta.focus();
      return;
    }
    if (ta.value.trim()){
      state.attempts[p.id] = ta.value; saveAttempts();
      yours.querySelector('pre').textContent = ta.value;
      yours.classList.remove('hidden');
      gate.classList.add('hidden');
    }
    box.classList.remove('hidden');
    btn.textContent = 'Hide';
    btn.dataset.armed = '0';
    if (!box.dataset.rendered){ fill(box.querySelector('.body'), p.solution); box.dataset.rendered = '1'; }
  };
  acts.appendChild(btn);
}

function mountProblemCard(list, p){
  const card = document.createElement('div');
  card.className = 'prob' + (state.solved[p.id] ? ' done' : '');
  card.id = 'prob-' + p.id;
  card.innerHTML =
    '<div class="prob-head"><span class="prob-num">' + esc(p.id) + '</span>' +
    (p.sec ? '<span class="tag sec">' + esc(p.sec) + '</span>' : '') +
    (p.difficulty ? '<span class="tag ' + esc(p.difficulty) + '">' + esc(p.difficulty) + '</span>' : '') +
    (p.topic ? '<span class="tag">' + esc(p.topic) + '</span>' : '') + '</div>';
  const body = document.createElement('div');
  body.className = 'prob-body';
  card.appendChild(body);
  const prompt = document.createElement('div');
  body.appendChild(prompt);
  const acts = document.createElement('div');
  acts.className = 'prob-actions';
  body.appendChild(acts);

  if (p.hint)   addReveal(body, acts, 'Hint', p.hint, 'Hint');
  addReveal(body, acts, 'Answer', p.answer, 'Answer');
  if (p.expert) addReveal(body, acts, 'Expert read', p.expert, 'Expert read', 'expert');
  addSolution(body, acts, p);

  const done = document.createElement('button');
  done.className = 'act' + (state.solved[p.id] ? ' done' : '');
  done.textContent = state.solved[p.id] ? 'Solved' : 'Mark solved';
  done.onclick = () => {
    if (state.solved[p.id]) delete state.solved[p.id]; else state.solved[p.id] = true;
    saveProgress();
    card.classList.toggle('done', !!state.solved[p.id]);
    done.classList.toggle('done', !!state.solved[p.id]);
    done.textContent = state.solved[p.id] ? 'Solved' : 'Mark solved';
    const f = document.getElementById('pbar-fill'), c = document.getElementById('pbar-count');
    if (f && c){
      const pr = chapterProgress(CHAPTERS[state.chapter]);
      f.style.width = pr.pct + '%';
      c.textContent = pr.done + ' / ' + pr.total + ' solved';
    }
    renderNav();
  };
  acts.appendChild(done);
  list.appendChild(card);
  fill(prompt, p.prompt);
  return card;
}

function attachExample(body, ch, exampleId){
  if (!exampleId) return;
  const p = (ch.problems || []).find(x => x.id === exampleId);
  if (!p) return;
  const row = document.createElement('div');
  row.className = 'prob-actions';
  const btn = document.createElement('button');
  btn.className = 'act';
  btn.textContent = 'Worked example · ' + p.id;
  const hold = document.createElement('div');
  hold.className = 'hidden';
  hold.style.marginTop = '10px';
  btn.onclick = () => {
    hold.classList.toggle('hidden');
    btn.textContent = hold.classList.contains('hidden')
      ? 'Worked example · ' + p.id : 'Hide example';
    if (!hold.dataset.ready){ mountProblemCard(hold, p); hold.dataset.ready = '1'; }
  };
  row.appendChild(btn);
  body.appendChild(row);
  body.appendChild(hold);
}

function renderProblems(main, ch){
  const all = ch.problems || [];
  if (!all.length){
    main.insertAdjacentHTML('beforeend', '<p class="empty">No problem set for this chapter yet.</p>');
    return;
  }
  const topics = ['all', ...Array.from(new Set(all.map(p => p.topic).filter(Boolean))).sort()];
  const bar = document.createElement('div');
  bar.className = 'filters';
  bar.innerHTML =
    '<label>Difficulty<select id="f-diff">' +
      ['all','warmup','core','challenge'].map(d =>
        '<option value="' + d + '"' + (state.diff === d ? ' selected' : '') + '>' + d + '</option>').join('') +
    '</select></label>' +
    '<label>Topic<select id="f-topic">' +
      topics.map(t => '<option value="' + esc(t) + '"' + (state.topic === t ? ' selected' : '') +
        '>' + esc(t) + '</option>').join('') +
    '</select></label>' +
    '<div class="pbar"><span id="pbar-fill"></span></div>' +
    '<div class="pcount" id="pbar-count"></div>' +
    '<button class="act" id="reset-ch">Reset</button>';
  main.appendChild(bar);

  const list = document.createElement('div');
  main.appendChild(list);

  const shown = all.filter(p =>
    (state.diff === 'all' || p.difficulty === state.diff) &&
    (state.topic === 'all' || p.topic === state.topic));

  const prog = chapterProgress(ch);
  document.getElementById('pbar-fill').style.width = prog.pct + '%';
  document.getElementById('pbar-count').textContent = prog.done + ' / ' + prog.total + ' solved';
  document.getElementById('f-diff').onchange  = e => { state.diff = e.target.value; render(); };
  document.getElementById('f-topic').onchange = e => { state.topic = e.target.value; render(); };
  document.getElementById('reset-ch').onclick = () => {
    all.forEach(p => { delete state.solved[p.id]; });
    saveProgress(); render();
  };
  if (!shown.length){ list.innerHTML = '<p class="empty">Nothing matches those filters.</p>'; return; }
  shown.forEach(p => mountProblemCard(list, p));
}

/* ---------- formulas ------------------------------------------------------ */
function renderFormulas(main, ch){
  const items = ch.formulas || [];
  if (!items.length){
    main.insertAdjacentHTML('beforeend', '<p class="empty">No formula sheet for this chapter yet.</p>');
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'cgrid';
  main.appendChild(grid);
  items.forEach(f => {
    const card = document.createElement('div');
    card.className = 'ccard';
    card.style.cursor = 'default';
    const eq = document.createElement('div');
    eq.style.overflowX = 'auto';
    card.appendChild(eq);
    if (f.note){
      const n = document.createElement('div');
      n.className = 'cd';
      n.style.marginTop = '8px';
      card.appendChild(n);
      fill(n, f.note);
    }
    grid.appendChild(card);
    if (typeof katex !== 'undefined'){
      try { katex.render(f.latex, eq, { displayMode:true, throwOnError:false, strict:false }); }
      catch (err) { fill(eq, '$$' + f.latex + '$$'); }
    } else fill(eq, '$$' + f.latex + '$$');
  });
}

/* ---------- global search -------------------------------------------------- */
function snippet(text, q){
  const plain = String(text).replace(/\$\$[\s\S]*?\$\$/g, ' [math] ')
                            .replace(/\$[^$\n]*?\$/g, ' ')
                            .replace(/[#*`>|_]/g, ' ').replace(/\s+/g, ' ').trim();
  const i = plain.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return plain.slice(0, 150);
  const a = Math.max(0, i - 60), b = Math.min(plain.length, i + q.length + 90);
  return (a ? '… ' : '') + esc(plain.slice(a, i)) + '<mark>' + esc(plain.slice(i, i + q.length)) +
         '</mark>' + esc(plain.slice(i + q.length, b)) + (b < plain.length ? ' …' : '');
}
function renderSearch(main, q){
  main.insertAdjacentHTML('beforeend',
    '<div class="eyebrow">Search · every chapter</div>' +
    '<h1 class="chap">' + esc(q) + '</h1>');
  const needle = q.toLowerCase();
  let hits = 0;
  CHAPTERS.forEach((ch, ci) => {
    const found = [];
    (ch.guide || []).forEach(g => {
      const hay = (g.title + ' ' + g.body).toLowerCase();
      if (hay.indexOf(needle) >= 0)
        found.push({ where:'Ch ' + ch.id + (g.sec ? ' · ' + g.sec : ''), title:g.title,
                     text:g.body, go:() => { openChapter(ci, 'guide');
                       setTimeout(() => { const t = document.getElementById('sec-' + g.sec);
                         if (t) t.scrollIntoView(); }, 60); } });
    });
    (ch.problems || []).forEach(p => {
      const hay = [p.id, p.topic, p.prompt, p.answer, p.expert || '', p.solution].join(' ').toLowerCase();
      if (hay.indexOf(needle) >= 0)
        found.push({ where:'Ch ' + ch.id + ' · problem ' + p.id, title:'', text:p.prompt,
                     go:() => { openChapter(ci, 'problems');
                       setTimeout(() => { const t = document.getElementById('prob-' + p.id);
                         if (t) t.scrollIntoView(); }, 60); } });
    });
    if (!found.length) return;
    hits += found.length;
    main.insertAdjacentHTML('beforeend',
      '<div class="sres-grp">Chapter ' + ch.id + ' · ' + esc(ch.title) +
      ' · ' + found.length + '</div>');
    found.slice(0, 12).forEach(f => {
      const b = document.createElement('button');
      b.className = 'chit sres';
      b.innerHTML = '<div class="cw">' + esc(f.where) + '</div>' +
        (f.title ? '<div class="cb">' + esc(String(f.title).replace(/\$[^$]*\$/g, '')) + '</div>' : '') +
        '<div class="cx">' + snippet(f.text, q) + '</div>';
      b.onclick = f.go;
      main.appendChild(b);
    });
  });
  if (!hits) main.insertAdjacentHTML('beforeend', '<p class="empty">Nothing found.</p>');
}

/* ---------- concepts -------------------------------------------------------- */
function renderConceptIndex(main){
  main.insertAdjacentHTML('beforeend',
    '<div class="eyebrow">Concepts</div>' +
    '<h1 class="chap">Eight objects, twelve chapters.</h1>' +
    '<div class="brief"><p>The chapters are not separate topics. They are views on the ' +
    'same handful of objects. Pick one and see every place the course touches it.</p></div>' +
    '<div class="sect-label">Threads</div>');
  const grid = document.createElement('div');
  grid.className = 'cgrid';
  CONCEPTS.forEach(c => {
    const live = c.secs.filter(s => CHAPTERS.some(ch =>
      (ch.guide || []).some(g => g.sec === s) || (ch.problems || []).some(p => p.sec === s)));
    const b = document.createElement('button');
    b.className = 'ccard';
    b.innerHTML = '<div class="cn">' + esc(c.name) + '</div>' +
      '<div class="cd">' + esc(c.blurb) + '</div>' +
      '<div class="cs">' + esc(c.secs.join(' · ')) + ' — ' + live.length + ' written</div>';
    b.onclick = () => go({ view:'concepts', concept:c.slug });
    grid.appendChild(b);
  });
  main.appendChild(grid);
}
function renderConcept(main, c){
  main.insertAdjacentHTML('beforeend',
    '<div class="eyebrow">Concept · ' + esc(c.secs.join(' · ')) + '</div>' +
    '<h1 class="chap">' + esc(c.name) + '</h1>' +
    '<div class="brief"><p>' + esc(c.blurb) + '</p></div>');
  const back = document.createElement('button');
  back.className = 'act';
  back.textContent = 'All concepts';
  back.style.margin = '14px 0 0';
  back.onclick = () => go({ view:'concepts', concept:null });
  main.appendChild(back);

  let any = false;
  CHAPTERS.forEach((ch, ci) => {
    const gs = (ch.guide || []).filter(g => c.secs.indexOf(g.sec) >= 0);
    const ps = (ch.problems || []).filter(p => c.secs.indexOf(p.sec) >= 0);
    if (!gs.length && !ps.length) return;
    any = true;
    main.insertAdjacentHTML('beforeend',
      '<div class="sect-label">Chapter ' + ch.id + ' · ' + esc(ch.title) + '</div>');
    gs.forEach(g => {
      const b = document.createElement('button');
      b.className = 'chit';
      const t = document.createElement('span');
      fillInline(t, g.title);
      b.innerHTML = '<div class="cw">' + esc(g.sec) + ' · reading</div><div class="cb"></div>';
      b.querySelector('.cb').appendChild(t);
      b.onclick = () => { openChapter(ci, 'guide');
        setTimeout(() => { const n = document.getElementById('sec-' + g.sec);
          if (n) n.scrollIntoView(); }, 60); };
      main.appendChild(b);
    });
    if (ps.length){
      const b = document.createElement('button');
      b.className = 'chit';
      b.innerHTML = '<div class="cw">problems</div><div class="cb">' + ps.length +
        ' problems in ' + esc(Array.from(new Set(ps.map(p => p.sec))).join(', ')) + '</div>' +
        '<div class="cx">' + ps.map(p => esc(p.id)).join(' · ') + '</div>';
      b.onclick = () => openChapter(ci, 'problems');
      main.appendChild(b);
    }
  });
  if (!any) main.insertAdjacentHTML('beforeend',
    '<p class="empty">None of those sections are written yet.</p>');
}

/* ---------- reference ------------------------------------------------------- */
function renderReference(main){
  main.insertAdjacentHTML('beforeend',
    '<div class="eyebrow">Reference</div>' +
    '<h1 class="chap">' + esc(REFERENCE.title || 'Reference') + '</h1>' +
    (REFERENCE.subtitle ? '<div class="chap-sub">' + esc(REFERENCE.subtitle) + '</div>' : ''));
  (REFERENCE.sections || []).forEach(sec => {
    const s = document.createElement('section');
    s.className = 'gsec';
    const h = document.createElement('h2');
    h.className = 'gitem-title';
    const body = document.createElement('div');
    body.className = 'guide-body';
    s.appendChild(h); s.appendChild(body);
    main.appendChild(s);
    fillInline(h, sec.title);
    fill(body, sec.body);
  });
}

/* ---------- home ------------------------------------------------------------ */
const SEQUENCE = [
  { ch:1,  t:'Introduction', n:'Open versus closed loop. Transient response, steady-state error, stability.' },
  { ch:2,  t:'Modeling in the frequency domain', n:'Laplace, G(s), impedances, linearization. 2.1–2.5 and 2.10–2.11.' },
  { ch:5,  t:'Block diagrams — first pass', n:'A light introduction to 5.1–5.3 before the time response work.', light:true },
  { ch:4,  t:'Time response', n:'Pole location to Ts, Tp and overshoot. 4.1–4.8.' },
  { ch:5,  t:'Reduction of multiple subsystems', n:'Loading, closed-loop G/(1+GH), the second and full pass.' },
  { ch:6,  t:'Stability', n:'Routh–Hurwitz.' },
  { ch:7,  t:'Steady-state error', n:'7.1–7.4.' },
  { ch:8,  t:'Root locus', n:'8.1–8.7.' },
  { ch:9,  t:'Design via root locus', n:'9.1–9.4.' },
  { ch:10, t:'Frequency response', n:'10.1–10.7.' },
  { ch:11, t:'Design via frequency response', n:'Chapter 11.' },
  { ch:3,  t:'State-space modeling', n:'Returned to at the end of the semester.' },
  { ch:12, t:'State-space design', n:'Prior chapters applied to state-space models.' }
];

function renderHome(main){
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML =
    '<h1>The structure behind the <em>response</em>.</h1>' +
    '<p>Where a pole sits decides how a system answers. Drag one and watch the ' +
    'consequence — then read the chapter that proves it.</p>';
  main.appendChild(hero);

  if (typeof NXW !== 'undefined'){
    const hold = document.createElement('div');
    main.appendChild(hold);
    NXW.sPlane(hold, { title:'Second-order poles and their step response', sig:-1.2, wd:3.4 });
  }

  main.insertAdjacentHTML('beforeend', '<div class="sect-label">Course sequence</div>');
  const seq = document.createElement('div');
  seq.className = 'seq';
  SEQUENCE.forEach((row, i) => {
    const idx = CHAPTERS.findIndex(c => c.id === row.ch);
    const live = idx >= 0;
    const b = document.createElement('button');
    b.className = 'seqrow' + (live ? ' live' : ' dim');
    b.innerHTML =
      '<span class="ord">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="ttl">Chapter ' + row.ch + ' · ' + esc(row.t) +
        '<small>' + esc(row.n) + '</small></span>' +
      '<span class="st">' + (live ? (row.light ? 'Open' : 'Open') : 'Not written') + '</span>';
    if (live) b.onclick = () => openChapter(idx);
    seq.appendChild(b);
  });
  main.appendChild(seq);

  main.insertAdjacentHTML('beforeend', '<div class="sect-label">Or follow a thread</div>');
  const grid = document.createElement('div');
  grid.className = 'cgrid';
  CONCEPTS.slice(0, 4).forEach(c => {
    const b = document.createElement('button');
    b.className = 'ccard';
    b.innerHTML = '<div class="cn">' + esc(c.name) + '</div><div class="cd">' + esc(c.blurb) + '</div>';
    b.onclick = () => go({ view:'concepts', concept:c.slug });
    grid.appendChild(b);
  });
  main.appendChild(grid);
}

/* ---------- routing --------------------------------------------------------- */
function syncHash(){
  let hash = '#/';
  if (state.view === 'reference') hash = '#/ref';
  else if (state.view === 'concepts') hash = state.concept ? '#/concept/' + state.concept : '#/concepts';
  else if (state.view === 'chapter'){
    const ch = CHAPTERS[state.chapter];
    hash = '#/ch/' + (ch ? ch.id : 1) + '/' + state.tab;
  }
  if (location.hash !== hash) history.replaceState(null, '', hash);
}
function applyHash(){
  const parts = (location.hash || '#/').replace(/^#/, '').split('/').filter(Boolean);
  if (!parts.length){ state.view = 'home'; return; }
  if (parts[0] === 'ref'){ state.view = 'reference'; return; }
  if (parts[0] === 'concepts'){ state.view = 'concepts'; state.concept = null; return; }
  if (parts[0] === 'concept'){
    state.view = 'concepts';
    state.concept = CONCEPTS.some(c => c.slug === parts[1]) ? parts[1] : null;
    return;
  }
  if (parts[0] === 'ch'){
    const idx = CHAPTERS.findIndex(c => c.id === Number(parts[1]));
    if (idx >= 0){
      state.view = 'chapter'; state.chapter = idx;
      if (['guide','formulas','problems'].indexOf(parts[2]) >= 0) state.tab = parts[2];
    }
  }
}

/* ---------- render ---------------------------------------------------------- */
function render(){
  renderNav();
  const layout = document.getElementById('layout');
  const main = document.getElementById('main');
  main.innerHTML = '';
  const oldRail = layout.querySelector('.railwrap');
  if (oldRail) oldRail.remove();
  const oldStrip = document.querySelector('.strip');
  if (oldStrip) oldStrip.remove();

  if (state.query.trim()){ renderSearch(main, state.query.trim()); syncHash(); return; }
  if (state.view === 'home'){ renderHome(main); syncHash(); return; }
  if (state.view === 'concepts'){
    const c = CONCEPTS.find(x => x.slug === state.concept);
    if (c) renderConcept(main, c); else renderConceptIndex(main);
    syncHash(); return;
  }
  if (state.view === 'reference' && REFERENCE){ renderReference(main); syncHash(); return; }
  if (!CHAPTERS.length){ main.innerHTML = '<p class="empty">No chapters loaded.</p>'; return; }

  const ch = CHAPTERS[state.chapter];
  const head = document.createElement('div');
  head.className = 'masthead';
  head.innerHTML =
    '<div class="eyebrow">Chapter ' + ch.id + (ch.sections ? ' · ' + esc(ch.sections) : '') + '</div>' +
    '<h1 class="chap">' + esc(ch.title) + '</h1>';
  main.appendChild(head);
  if (ch.brief){
    const b = document.createElement('div');
    b.className = 'brief';
    main.appendChild(b);
    fill(b, ch.brief);
  }

  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  [['guide','Reading', (ch.guide || []).length],
   ['formulas','Formulas', (ch.formulas || []).length],
   ['problems','Problems', (ch.problems || []).length]].forEach(([k, label, n]) => {
    const b = document.createElement('button');
    b.innerHTML = label + (n ? '<span class="count">' + n + '</span>' : '');
    b.className = state.tab === k ? 'active' : '';
    b.onclick = () => { state.tab = k; render(); };
    tabs.appendChild(b);
  });
  main.appendChild(tabs);

  if (state.tab === 'guide'){
    const { wrap, strip } = buildRail(ch);
    layout.appendChild(wrap);
    if (strip.children.length) layout.parentNode.insertBefore(strip, layout);
    renderGuide(main, ch);
    initSpy();
  } else if (state.tab === 'formulas') renderFormulas(main, ch);
  else renderProblems(main, ch);
  syncHash();
}

/* ---------- wiring ----------------------------------------------------------- */
let searchTimer = null;
document.getElementById('search').addEventListener('input', e => {
  clearTimeout(searchTimer);
  const v = e.target.value;
  searchTimer = setTimeout(() => { state.query = v; render(); }, 160);
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
  const s = document.getElementById('search'); if (s) s.value = '';
  go({ view:'home', query:'', concept:null });
};
window.addEventListener('hashchange', () => { applyHash(); render(); });
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA'){
    e.preventDefault(); document.getElementById('search').focus();
  }
  if (e.key === 'Escape'){ closeNav(); }
});

loadProgress();
applyHash();
if (document.readyState === 'loading')
  window.addEventListener('DOMContentLoaded', render);
else render();
