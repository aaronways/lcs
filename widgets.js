/* ===========================================================================
   NEXUS — interactive figures
   Physics only. Every curve here is the closed-form response, not a sketch.

     G(s) = wn^2 / (s^2 + 2*z*wn*s + wn^2),  poles at s = sig +/- j*wd
     sig = -z*wn,  wd = wn*sqrt(1-z^2)

   Unit step, zero initial conditions, 0 <= z < 1:
     c(t) = 1 - e^(sig*t) * ( cos(wd*t) - (sig/wd) sin(wd*t) )
   The same expression continues analytically to sig > 0 (divergent) and, in
   the limit wd -> 0, to the critically damped case
     c(t) = 1 - e^(sig*t) (1 - sig*t)
   which is what the wd < EPS branch below evaluates.
   ========================================================================= */

const NXW = (function(){
  'use strict';

  const SVGNS = 'http://www.w3.org/2000/svg';
  const EPS = 1e-4;

  function el(name, attrs, parent){
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  const fmt = (v, d) => (Math.abs(v) < 5e-3 ? 0 : v).toFixed(d === undefined ? 2 : d);

  /* --- response ---------------------------------------------------------- */
  function step(t, sig, wd){
    if (Math.abs(wd) < EPS) return 1 - Math.exp(sig * t) * (1 - sig * t);
    return 1 - Math.exp(sig * t) * (Math.cos(wd * t) - (sig / wd) * Math.sin(wd * t));
  }

  function specs(sig, wd){
    const wn = Math.hypot(sig, wd);
    const z  = wn < EPS ? 0 : -sig / wn;
    const s = { sig, wd, wn, z, stable: sig < -EPS };
    if (s.stable && z < 1 - EPS && wd > EPS){
      s.os = 100 * Math.exp(-z * Math.PI / Math.sqrt(1 - z * z));
      s.tp = Math.PI / wd;
      s.ts = 4 / Math.abs(sig);
    } else if (s.stable){
      s.os = 0;
      s.tp = null;
      s.ts = 4 / Math.abs(sig);
    }
    return s;
  }

  /* --- s-plane geometry -------------------------------------------------- */
  const PW = 250, PH = 210;          // s-plane viewBox
  const OX = 176, OY = PH / 2;       // origin, leaves room for the RHP
  const U  = 20;                     // px per rad/s
  const SIG_MIN = -(OX - 8) / U, SIG_MAX = (PW - OX - 8) / U;
  const WD_MAX  = (OY - 8) / U;

  const toX = sig => OX + sig * U;
  const toY = wd  => OY - wd  * U;
  const fromX = x => (x - OX) / U;
  const fromY = y => (OY - y) / U;

  function drawPlane(svg){
    const g = el('g', {}, svg);
    for (let x = OX % U; x < PW; x += U)
      el('line', { x1:x, y1:0, x2:x, y2:PH, stroke:'var(--hair)', 'stroke-width':1 }, g);
    for (let y = OY % U; y < PH; y += U)
      el('line', { x1:0, y1:y, x2:PW, y2:y, stroke:'var(--hair)', 'stroke-width':1 }, g);
    el('rect', { x:OX, y:0, width:PW - OX, height:PH,
                 fill:'var(--unstable-soft)', opacity:'.85' }, g);
    el('line', { x1:0, y1:OY, x2:PW, y2:OY, stroke:'var(--muted)', 'stroke-width':1.1 }, g);
    el('line', { x1:OX, y1:0, x2:OX, y2:PH, stroke:'var(--unstable)',
                 'stroke-width':1.4, 'stroke-dasharray':'4 3' }, g);
    const lab = (x, y, t, fill, anchor) => {
      const n = el('text', { x, y, fill, 'font-family':'var(--mono)', 'font-size':9,
                             'letter-spacing':'.06em', 'text-anchor':anchor || 'start' }, g);
      n.textContent = t; return n;
    };
    lab(OX + 5, 12, 'RHP · unstable', 'var(--unstable)');
    lab(OX - 5, 12, 'LHP · stable', 'var(--stable)', 'end');
    lab(6, OY - 6, 'jw', 'var(--faint)');
    lab(PW - 6, OY + 12, 's', 'var(--faint)', 'end');
    return g;
  }

  /* --- step-response geometry -------------------------------------------- */
  const RW = 250, RH = 210;
  const L = 30, R = RW - 12, T = 14, B = RH - 26;
  const VMAX = 2;
  const vY = v => B - (v / VMAX) * (B - T);

  function drawAxes(svg){
    const g = el('g', {}, svg);
    for (let v = 0.5; v <= VMAX; v += 0.5)
      el('line', { x1:L, y1:vY(v), x2:R, y2:vY(v), stroke:'var(--hair)', 'stroke-width':1 }, g);
    el('rect', { x:L, y:vY(1.02), width:R - L, height:vY(0.98) - vY(1.02),
                 fill:'var(--stable)', opacity:'.13' }, g);
    el('line', { x1:L, y1:vY(1), x2:R, y2:vY(1), stroke:'var(--stable-line)',
                 'stroke-width':1, 'stroke-dasharray':'3 3' }, g);
    el('line', { x1:L, y1:vY(0), x2:R, y2:vY(0), stroke:'var(--muted)', 'stroke-width':1.1 }, g);
    el('line', { x1:L, y1:T, x2:L, y2:vY(0), stroke:'var(--muted)', 'stroke-width':1.1 }, g);
    [[1,'1.0'],[2,'2.0'],[0,'0']].forEach(([v, t]) => {
      const n = el('text', { x:L - 5, y:vY(v) + 3.5, fill:'var(--faint)', 'text-anchor':'end',
                             'font-family':'var(--mono)', 'font-size':9 }, g);
      n.textContent = t;
    });
    return g;
  }

  /* --- the widget --------------------------------------------------------- */
  function sPlane(host, opts){
    opts = opts || {};
    const box = document.createElement('div');
    box.className = 'widget';
    box.innerHTML =
      '<div class="widget-head">' +
        '<span class="wt">' + (opts.title || 'Pole location and step response') + '</span>' +
        '<span class="wh">drag the pole</span>' +
      '</div>' +
      '<div class="panes">' +
        '<div class="pane"><div class="pane-lbl">s-plane</div></div>' +
        '<div class="pane"><div class="pane-lbl">unit step response <span class="thor"></span></div></div>' +
      '</div>' +
      '<div class="readout">' +
        ['z','wn','%OS','Tp','Ts'].map(k =>
          '<div class="ro"><div class="k" data-k="' + k + '"></div><div class="v" data-v="' + k + '">—</div></div>'
        ).join('') +
      '</div>' +
      '<div class="wctl"><label for="">zeta</label><input type="range" class="rz" min="0" max="1.35" step="0.01"></div>' +
      '<div class="wctl"><label>omega n</label><input type="range" class="rw" min="0.4" max="8" step="0.05"></div>' +
      '<div class="wnote"></div>';

    const panes  = box.querySelectorAll('.pane');
    const plane  = el('svg', { viewBox:'0 0 ' + PW + ' ' + PH, role:'img',
                               'aria-label':'Complex plane with a draggable pole pair' });
    const resp   = el('svg', { viewBox:'0 0 ' + RW + ' ' + RH, role:'img',
                               'aria-label':'Unit step response of the current pole pair' });
    panes[0].appendChild(plane);
    panes[1].appendChild(resp);

    drawPlane(plane);
    const zeta  = el('line', { stroke:'var(--stable-line)', 'stroke-width':1, 'stroke-dasharray':'3 3' }, plane);
    const zeta2 = el('line', { stroke:'var(--stable-line)', 'stroke-width':1, 'stroke-dasharray':'3 3' }, plane);
    const arc   = el('circle', { cx:OX, cy:OY, fill:'none', stroke:'var(--stable-line)',
                                 'stroke-width':1, 'stroke-dasharray':'2 4' }, plane);
    const pole  = el('path', { class:'pole' }, plane);
    const conj  = el('path', { class:'pole' }, plane);
    const grab  = el('circle', { class:'pole-hit', r:17, tabindex:0, role:'slider',
                                 'aria-label':'Pole position. Arrow keys move it.' }, plane);

    drawAxes(resp);
    const curve = el('path', { fill:'none', stroke:'var(--stable)', 'stroke-width':2,
                               'stroke-linejoin':'round', 'stroke-linecap':'round' }, resp);
    const tpMark = el('line', { stroke:'var(--locus)', 'stroke-width':1, 'stroke-dasharray':'3 2' }, resp);
    const tsMark = el('line', { stroke:'var(--faint)', 'stroke-width':1, 'stroke-dasharray':'2 3' }, resp);

    const ro    = k => box.querySelector('[data-v="' + k + '"]');
    const rz    = box.querySelector('.rz');
    const rw    = box.querySelector('.rw');
    const note  = box.querySelector('.wnote');
    const thor  = box.querySelector('.thor');

    box.querySelector('[data-k="z"]').textContent   = 'zeta';
    box.querySelector('[data-k="wn"]').textContent  = 'omega n';
    box.querySelector('[data-k="%OS"]').textContent = '%OS';
    box.querySelector('[data-k="Tp"]').textContent  = 'Tp';
    box.querySelector('[data-k="Ts"]').textContent  = 'Ts';

    let sig = opts.sig !== undefined ? opts.sig : -1.4;
    let wd  = opts.wd  !== undefined ? opts.wd  : 3.2;

    function horizon(s){
      if (s.stable){
        const settle = 5.2 / Math.abs(s.sig);
        const rings  = s.wd > EPS ? 3.2 * (2 * Math.PI / s.wd) : 0;
        return clamp(Math.max(settle, rings), 0.8, 60);
      }
      return clamp(7 / Math.max(s.wn, 0.4), 0.8, 40);
    }

    function draw(){
      sig = clamp(sig, SIG_MIN, SIG_MAX);
      wd  = clamp(wd, 0, WD_MAX);
      const s  = specs(sig, wd);
      const px = toX(sig), py = toY(wd), cy = toY(-wd);

      const mk = (x, y) => 'M' + (x-5) + ' ' + (y-5) + 'L' + (x+5) + ' ' + (y+5) +
                           'M' + (x+5) + ' ' + (y-5) + 'L' + (x-5) + ' ' + (y+5);
      pole.setAttribute('d', mk(px, py));
      conj.setAttribute('d', mk(px, cy));
      grab.setAttribute('cx', px); grab.setAttribute('cy', py);
      grab.setAttribute('aria-valuetext',
        'sigma ' + fmt(sig) + ', omega d ' + fmt(wd) + ', zeta ' + fmt(s.z));
      const shown = s.wn > 0.05;
      [zeta, zeta2, arc].forEach(n => n.setAttribute('opacity', shown ? '1' : '0'));
      zeta.setAttribute('x1', OX);  zeta.setAttribute('y1', OY);
      zeta.setAttribute('x2', px);  zeta.setAttribute('y2', py);
      zeta2.setAttribute('x1', OX); zeta2.setAttribute('y1', OY);
      zeta2.setAttribute('x2', px); zeta2.setAttribute('y2', cy);
      arc.setAttribute('r', s.wn * U);

      box.classList.toggle('unstable', !s.stable);

      const tmax = horizon(s);
      thor.textContent = '· 0 to ' + fmt(tmax, 1) + ' s';
      const N = 300;
      let d = '', clipped = false;
      for (let i = 0; i <= N; i++){
        const t = tmax * i / N;
        let v = step(t, sig, wd);
        if (v > VMAX){ v = VMAX; clipped = true; }
        if (v < -VMAX * 0.02) v = -VMAX * 0.02;
        const x = L + (R - L) * i / N;
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + vY(v).toFixed(1);
      }
      curve.setAttribute('d', d);
      curve.setAttribute('stroke', s.stable ? 'var(--stable)' : 'var(--unstable)');

      const tx = t => L + (R - L) * clamp(t / tmax, 0, 1);
      if (s.tp && s.tp < tmax){
        tpMark.setAttribute('x1', tx(s.tp)); tpMark.setAttribute('x2', tx(s.tp));
        tpMark.setAttribute('y1', T); tpMark.setAttribute('y2', vY(0));
        tpMark.setAttribute('opacity', 1);
      } else tpMark.setAttribute('opacity', 0);
      if (s.stable && s.ts < tmax){
        tsMark.setAttribute('x1', tx(s.ts)); tsMark.setAttribute('x2', tx(s.ts));
        tsMark.setAttribute('y1', T); tsMark.setAttribute('y2', vY(0));
        tsMark.setAttribute('opacity', 1);
      } else tsMark.setAttribute('opacity', 0);

      ro('z').textContent  = fmt(s.z);
      ro('wn').textContent = fmt(s.wn) + '';
      ro('%OS').textContent = s.stable ? (s.z < 1 - EPS && wd > EPS ? fmt(s.os, 1) + '%' : '0%') : '—';
      ro('Tp').textContent  = s.tp ? fmt(s.tp) + ' s' : '—';
      ro('Ts').textContent  = s.stable ? fmt(s.ts) + ' s' : '—';

      if (!s.stable){
        note.innerHTML = '<b>Right half-plane.</b> The natural mode is ' +
          'e<sup>+' + fmt(Math.abs(sig)) + 't</sup>, so the response grows without bound and no ' +
          'settling time exists. No bounded input fixes this — only moving the pole does.';
      } else if (wd <= EPS){
        note.innerHTML = '<b>Critically damped.</b> Both poles sit at s = ' + fmt(sig) +
          '. Fastest approach with no overshoot; any further left and you would need two ' +
          'distinct real poles.';
      } else if (s.z >= 1 - EPS){
        note.innerHTML = '<b>No oscillation.</b> Damping ratio has reached 1.';
      } else {
        note.innerHTML = '<b>Slide zeta at fixed omega n</b> and the pole rides the dashed arc: ' +
          'overshoot changes. <b>Slide omega n at fixed zeta</b> and it rides the ray: the curve ' +
          'keeps its shape and only the time axis rescales. Overshoot depends on the angle, ' +
          'never on the distance.';
      }
      if (clipped) note.innerHTML += ' <span style="color:var(--unstable)">Curve clipped at 2.0.</span>';

      const s2 = specs(sig, wd);
      rz.value = clamp(s2.z, 0, 1.35);
      rw.value = clamp(s2.wn, 0.4, 8);
    }

    /* pointer drag */
    let dragging = false;
    function place(evt){
      const r = plane.getBoundingClientRect();
      const x = (evt.clientX - r.left) / r.width  * PW;
      const y = (evt.clientY - r.top)  / r.height * PH;
      sig = clamp(fromX(x), SIG_MIN, SIG_MAX);
      wd  = clamp(Math.abs(fromY(y)), 0, WD_MAX);
      draw();
    }
    plane.addEventListener('pointerdown', e => {
      dragging = true; pole.classList.add('drag');
      plane.setPointerCapture(e.pointerId); place(e); e.preventDefault();
    });
    plane.addEventListener('pointermove', e => { if (dragging) place(e); });
    const stop = e => {
      if (!dragging) return;
      dragging = false; pole.classList.remove('drag');
      try { plane.releasePointerCapture(e.pointerId); } catch (err) {}
    };
    plane.addEventListener('pointerup', stop);
    plane.addEventListener('pointercancel', stop);

    /* keyboard */
    grab.addEventListener('keydown', e => {
      const k = e.key, d = e.shiftKey ? 0.5 : 0.1;
      if (k === 'ArrowLeft')  sig -= d; else if (k === 'ArrowRight') sig += d;
      else if (k === 'ArrowUp') wd += d; else if (k === 'ArrowDown') wd -= d;
      else return;
      e.preventDefault(); draw();
    });

    /* sliders — the reliable path on a phone */
    rz.addEventListener('input', () => {
      const wn = Math.max(Math.hypot(sig, wd), 0.4), z = clamp(+rz.value, 0, 1.35);
      sig = -z * wn;
      wd  = z < 1 ? wn * Math.sqrt(1 - z * z) : 0;
      draw();
    });
    rw.addEventListener('input', () => {
      const cur = specs(sig, wd), z = clamp(cur.z, 0, 1.35), wn = +rw.value;
      sig = -z * wn;
      wd  = z < 1 ? wn * Math.sqrt(1 - z * z) : 0;
      draw();
    });

    host.appendChild(box);
    draw();
    return box;
  }

  return { sPlane, step, specs };
})();
