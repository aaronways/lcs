# -*- coding: utf-8 -*-
"""Rebuilds the 'moves' and 'reduction' figures with collision checking."""
import json, io, re
from xml.dom import minidom

SW, SR = '1.8', 20
SHAPES = []          # (kind, x0, y0, x1, y1, note)  — solid things
SEGS   = []          # (x0, y0, x1, y1) — wire segments


def reset():
    del SHAPES[:]; del SEGS[:]


def marker(mid):
    return ('<defs><marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" '
            'markerWidth="8" markerHeight="8" orient="auto">'
            '<path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>' % mid)


def block(x, cy, w, label, h=44, note=''):
    y = cy - h / 2.0
    SHAPES.append(('block', x, y, x + w, y + h, note or label))
    return ('<rect x="%g" y="%g" width="%g" height="%g" rx="6" fill="var(--panel)" '
            'stroke="currentColor" stroke-width="%s"/>'
            '<text x="%g" y="%g" text-anchor="middle" font-size="15">%s</text>'
            % (x, y, w, h, SW, x + w / 2.0, cy + 5, label))


def summer(cx, cy, marks, note='sum'):
    SHAPES.append(('summer', cx - SR, cy - SR, cx + SR, cy + SR, note))
    s = ('<circle cx="%g" cy="%g" r="%g" fill="var(--panel)" stroke="currentColor" '
         'stroke-width="%s"/>' % (cx, cy, SR, SW))
    s += ('<path d="M%g %g L%g %g M%g %g L%g %g" stroke="currentColor" stroke-width="1.1" '
          'opacity=".45"/>' % (cx - 13, cy, cx + 13, cy, cx, cy - 13, cx, cy + 13))
    for dx, dy, sign in marks:
        s += ('<text x="%g" y="%g" text-anchor="middle" font-size="14">%s</text>'
              % (cx + dx, cy + dy, sign))
    return s


def pickoff(cx, cy):
    return '<circle cx="%g" cy="%g" r="4" fill="currentColor" stroke="none"/>' % (cx, cy)


def wire(pts, mid, arrow=True):
    for a, b in zip(pts, pts[1:]):
        SEGS.append((a[0], a[1], b[0], b[1]))
    d = 'M' + ' L'.join('%g %g' % p for p in pts)
    a = ' marker-end="url(#%s)"' % mid if arrow else ''
    return ('<path d="%s" fill="none" stroke="currentColor" stroke-width="%s"%s/>'
            % (d, SW, a))


def txt(x, y, s, anchor='start', size=15):
    return ('<text x="%g" y="%g" text-anchor="%s" font-size="%g">%s</text>'
            % (x, y, anchor, size, s))


def check(name, vw, vh):
    """Solid shapes must not overlap, and no wire may cross a solid interior."""
    bad = []
    for i in range(len(SHAPES)):
        for j in range(i + 1, len(SHAPES)):
            k1, ax0, ay0, ax1, ay1, n1 = SHAPES[i]
            k2, bx0, by0, bx1, by1, n2 = SHAPES[j]
            ox = min(ax1, bx1) - max(ax0, bx0)
            oy = min(ay1, by1) - max(ay0, by0)
            if ox > 1 and oy > 1:
                bad.append('OVERLAP %s <-> %s (%gx%g)' % (n1, n2, ox, oy))
    for (x0, y0, x1, y1) in SEGS:
        for k, sx0, sy0, sx1, sy1, n in SHAPES:
            if x0 == x1:                                   # vertical
                if sx0 + 2 < x0 < sx1 - 2:
                    lo, hi = sorted((y0, y1))
                    if lo < sy1 - 2 and hi > sy0 + 2:
                        bad.append('WIRE through %s (vertical x=%g)' % (n, x0))
            elif y0 == y1:                                 # horizontal
                if sy0 + 2 < y0 < sy1 - 2:
                    lo, hi = sorted((x0, x1))
                    if lo < sx1 - 2 and hi > sx0 + 2:
                        bad.append('WIRE through %s (horizontal y=%g)' % (n, y0))
    for k, x0, y0, x1, y1, n in SHAPES:
        if x0 < 0 or y0 < 0 or x1 > vw or y1 > vh:
            bad.append('OUT OF FRAME %s' % n)
    print('%-10s %s' % (name, 'clean' if not bad else 'PROBLEMS:'))
    for b in bad:
        print('             ' + b)
    return not bad


def fig(body, vw, vh, mid, caption):
    return ('<figure class="nx-frame">\n'
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %g %g" class="nx-fig">\n'
            '  %s\n  %s\n</svg>\n<figcaption>%s</figcaption>\n</figure>'
            % (vw, vh, marker(mid), body, caption))


OUT = {}

# ------------------------------------------------------------- moves --------
reset()
m, b = 'nxc4', []
VW, VH = 600, 400

# --- past a summing junction, main line at y = 70
y = 70
b.append(txt(8, 22, 'Moving a block past a summing junction', 'start', 13))
b.append(txt(8, y + 6, 'R'))
b.append(wire([(30, y), (58, y)], m))
b.append(block(58, y, 52, 'G', note='G-before'))
b.append(wire([(110, y), (150, y)], m))
b.append(summer(170, y, [(-28, -8, '+'), (-14, 32, '+')], note='sum-before'))
b.append(wire([(170, 140), (170, y + 24)], m))
b.append(txt(170, 158, 'X', 'middle'))
b.append(wire([(190, y), (236, y)], m))
b.append(txt(244, y + 6, 'C'))
b.append(txt(282, y + 6, '\u2261', 'middle', 20))
b.append(txt(316, y + 6, 'R'))
b.append(wire([(338, y), (384, y)], m))
b.append(summer(404, y, [(-28, -8, '+'), (-40, 32, '+')], note='sum-after'))
# the 1/G block sits clear below the circle: circle bottom is y+20 = 90
b.append(block(376, 131, 56, '1/G', h=38, note='1/G'))
b.append(wire([(404, 112), (404, y + 24)], m))
b.append(wire([(404, 190), (404, 154)], m))
b.append(txt(404, 208, 'X', 'middle'))
b.append(wire([(424, y), (462, y)], m))
b.append(block(462, y, 52, 'G', note='G-after'))
b.append(wire([(514, y), (552, y)], m))
b.append(txt(560, y + 6, 'C'))

# --- past a pickoff, main line at y = 306
y2 = 306
b.append(txt(8, 258, 'Moving a block past a pickoff', 'start', 13))
b.append(txt(8, y2 + 6, 'R'))
b.append(wire([(30, y2), (58, y2)], m))
b.append(block(58, y2, 52, 'G', note='Gp-before'))
b.append(wire([(110, y2), (236, y2)], m))
b.append(pickoff(172, y2))
b.append(txt(244, y2 + 6, 'C'))
b.append(wire([(172, y2), (172, 356)], m))
b.append(txt(172, 374, 'GR', 'middle', 13))
b.append(txt(282, y2 + 6, '\u2261', 'middle', 20))
b.append(txt(316, y2 + 6, 'R'))
b.append(wire([(338, y2), (404, y2)], m))
b.append(pickoff(368, y2))
b.append(block(404, y2, 52, 'G', note='Gp-main'))
b.append(wire([(456, y2), (546, y2)], m))
b.append(txt(554, y2 + 6, 'C'))
# branch drops clear of the main line, then gets its own copy of G
b.append(wire([(368, y2), (368, 352), (404, 352)], m))
b.append(block(404, 352, 52, 'G', h=36, note='Gp-branch'))
b.append(wire([(456, 352), (508, 352)], m))
b.append(txt(516, 358, 'GR', 'start', 13))

ok1 = check('moves', VW, VH)
OUT['moves'] = fig(''.join(b), VW, VH, m,
    'A block crosses a summing junction only if the other input is rescaled; it crosses '
    'a pickoff only if the branch is given its own copy. Verify by tracing, never by memory.')

# --------------------------------------------------------- reduction --------
reset()
m, b = 'nxc6', []
VW, VH = 600, 330

y = 70
b.append(txt(8, 22, 'Step 1 \u00b7 innermost loop first', 'start', 13))
b.append(txt(8, y + 6, 'R'))
b.append(wire([(26, y), (60, y)], m))
b.append(summer(80, y, [(-28, -8, '+'), (-40, 32, '\u2212')], note='sum'))
b.append(wire([(100, y), (140, y)], m))
b.append(block(140, y, 72, 'G<tspan dy="4" font-size="11">2</tspan>', note='G2'))
b.append(wire([(212, y), (300, y)], m))
b.append(pickoff(256, y))
b.append(txt(308, y + 6, 'C'))
# feedback: down from the pickoff, left into H's right edge
b.append(wire([(256, y), (256, 140), (216, 140)], m))
b.append(block(154, 140, 62, 'H<tspan dy="4" font-size="11">1</tspan>', note='H1'))
# return: out of H's left edge, left to the summer's column, up into its underside
b.append(wire([(154, 140), (80, 140), (80, y + 24)], m))

y2 = 258
b.append(txt(8, 210, 'Step 2 \u00b7 the inner loop is now a single block', 'start', 13))
b.append(txt(8, y2 + 6, 'R'))
b.append(wire([(26, y2), (70, y2)], m))
b.append(block(70, y2, 190,
               'G<tspan dy="4" font-size="11">2</tspan>'
               '<tspan dy="-4">/(1+G</tspan><tspan dy="4" font-size="11">2</tspan>'
               '<tspan dy="-4">H</tspan><tspan dy="4" font-size="11">1</tspan>'
               '<tspan dy="-4">)</tspan>', note='collapsed'))
b.append(wire([(260, y2), (320, y2)], m))
b.append(txt(328, y2 + 6, 'C'))
b.append(txt(376, y2 + 6, 'then close the outer loop the same way', 'start', 13))

ok2 = check('reduction', VW, VH)
OUT['reduction'] = fig(''.join(b), VW, VH, m,
    'Reduction is always innermost-first. Collapse one loop to a single block, '
    'redraw, and the next loop is a named form again.')

for k, v in OUT.items():
    minidom.parseString(re.search(r'<svg[\s\S]*?</svg>', v).group(0))
print('xml well-formed: yes')
if not (ok1 and ok2):
    raise SystemExit('geometry check failed')
io.open('/home/claude/build/figs2.json', 'w', encoding='utf-8').write(
    json.dumps(OUT, ensure_ascii=False))
print('written')
