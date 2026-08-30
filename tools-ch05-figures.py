# -*- coding: utf-8 -*-
"""
Generates the Chapter 5 block diagrams as inline SVG in the existing house
style: <figure class="nx-frame"> wrapping <svg class="nx-fig">, strokes in
currentColor so .nx-schematic themes them in both light and dark.

Geometry is computed, not typed, so blocks and wires always line up.
"""
SW = '1.8'          # stroke width used by every existing figure
BH = 44             # block height
SR = 20             # summing-junction radius

def marker(mid):
    return ('<defs><marker id="%s" viewBox="0 0 10 10" refX="9" refY="5" '
            'markerWidth="8" markerHeight="8" orient="auto">'
            '<path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>' % mid)

def block(x, cy, w, label, h=BH):
    y = cy - h / 2.0
    return ('<rect x="%g" y="%g" width="%g" height="%g" rx="6" fill="var(--panel)" '
            'stroke="currentColor" stroke-width="%s"/>'
            '<text x="%g" y="%g" text-anchor="middle" font-size="15">%s</text>'
            % (x, y, w, h, SW, x + w / 2.0, cy + 5, label))

def summer(cx, cy, marks):
    """marks: list of (dx, dy, sign) placed just outside the circle."""
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
    d = 'M' + ' L'.join('%g %g' % p for p in pts)
    a = ' marker-end="url(#%s)"' % mid if arrow else ''
    return ('<path d="%s" fill="none" stroke="currentColor" stroke-width="%s"%s/>'
            % (d, SW, a))

def txt(x, y, s, anchor='start', size=15):
    return ('<text x="%g" y="%g" text-anchor="%s" font-size="%g">%s</text>'
            % (x, y, anchor, size, s))

def G(i, arg=True):
    """G with a subscript, optionally followed by (s)."""
    body = 'G<tspan dy="4" font-size="11">%s</tspan>' % i
    return body + ('<tspan dy="-4">(s)</tspan>' if arg else '<tspan dy="-4"></tspan>')

def fig(svg_body, vw, vh, mid, caption):
    return ('<figure class="nx-frame">\n'
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %g %g" class="nx-fig">\n'
            '  %s\n  %s\n</svg>\n'
            '<figcaption>%s</figcaption>\n</figure>' % (vw, vh, marker(mid), svg_body, caption))

FIGS = {}

# ---------------------------------------------------------------- cascade ----
m = 'nxc1'
b = []
y1, y2 = 52, 152
b.append(txt(8, y1 + 6, 'R(s)'))
b.append(wire([(46, y1), (86, y1)], m))
xs = [86, 196, 306]
for i, x in enumerate(xs):
    b.append(block(x, y1, 62, G(i + 1, False)))
labels = ['G<tspan dy="4" font-size="11">1</tspan><tspan dy="-4">R</tspan>',
          'G<tspan dy="4" font-size="11">2</tspan><tspan dy="-4">G</tspan>'
          '<tspan dy="4" font-size="11">1</tspan><tspan dy="-4">R</tspan>']
for i in range(2):
    b.append(wire([(xs[i] + 62, y1), (xs[i + 1], y1)], m))
    b.append(txt((xs[i] + 62 + xs[i + 1]) / 2.0, y1 - 12, labels[i], 'middle', 12))
b.append(wire([(368, y1), (452, y1)], m))
b.append(txt(410, y1 - 12,
             'G<tspan dy="4" font-size="11">3</tspan><tspan dy="-4">G</tspan>'
             '<tspan dy="4" font-size="11">2</tspan><tspan dy="-4">G</tspan>'
             '<tspan dy="4" font-size="11">1</tspan><tspan dy="-4">R</tspan>', 'middle', 12))
b.append(txt(460, y1 + 6, 'C(s)'))
b.append(txt(270, 104, 'is the same system as', 'middle', 12))
b.append(txt(8, y2 + 6, 'R(s)'))
b.append(wire([(46, y2), (150, y2)], m))
b.append(block(150, y2, 176,
               'G<tspan dy="4" font-size="11">3</tspan><tspan dy="-4">(s)G</tspan>'
               '<tspan dy="4" font-size="11">2</tspan><tspan dy="-4">(s)G</tspan>'
               '<tspan dy="4" font-size="11">1</tspan><tspan dy="-4">(s)</tspan>'))
b.append(wire([(326, y2), (452, y2)], m))
b.append(txt(460, y2 + 6, 'C(s)'))
FIGS['cascade'] = fig(''.join(b), 520, 190, m,
    'Cascade form. Trace the signal and the product writes itself. '
    'Valid only when the stages do not load each other.')

# --------------------------------------------------------------- parallel ----
m = 'nxc2'
b = []
cy, ys = 110, [42, 110, 178]
b.append(txt(8, cy + 6, 'R(s)'))
b.append(wire([(46, cy), (96, cy)], m, arrow=False))
b.append(pickoff(96, cy))
b.append(wire([(96, ys[0]), (96, ys[2])], m, arrow=False))
for i, y in enumerate(ys):
    b.append(wire([(96, y), (166, y)], m))
    b.append(block(166, y, 62, G(i + 1, False)))
sx = 356
b.append(wire([(228, ys[0]), (sx, ys[0]), (sx, cy - SR - 4)], m))
b.append(wire([(228, cy), (sx - SR - 4, cy)], m))
b.append(wire([(228, ys[2]), (sx, ys[2]), (sx, cy + SR + 4)], m))
b.append(summer(sx, cy, [(-30, -8, '+'), (14, -26, '+'), (14, 32, '+')]))
b.append(wire([(sx + SR, cy), (438, cy)], m))
b.append(txt(446, cy + 6, 'C(s)'))
FIGS['parallel'] = fig(''.join(b), 500, 230, m,
    'Parallel form. The pickoff sends the whole of R(s) down every branch, '
    'so the summing junction adds three full-strength signals.')

# --------------------------------------------------------------- feedback ----
m = 'nxc3'
b = []
cy, fy = 74, 168
b.append(txt(8, cy + 6, 'R(s)'))
b.append(wire([(48, cy), (110 - SR - 4, cy)], m))
b.append(summer(110, cy, [(-30, -8, '+'), (-16, 34, '\u2212')]))
b.append(wire([(110 + SR, cy), (206, cy)], m))
b.append(txt(168, cy - 12, 'E(s)', 'middle', 12))
b.append(block(206, cy, 78, 'G(s)'))
b.append(wire([(284, cy), (416, cy)], m))
b.append(pickoff(370, cy))
b.append(txt(424, cy + 6, 'C(s)'))
b.append(wire([(370, cy), (370, fy), (302, fy)], m))
b.append(block(240, fy, 62, 'H(s)'))
b.append(wire([(240, fy), (110, fy), (110, cy + SR + 4)], m))
b.append(txt(336, fy - 12, 'H(s)C(s)', 'middle', 12))
b.append(txt(8, fy + 6, 'error', 'start', 12))
b.append(txt(8, fy + 22, 'signal', 'start', 12))
FIGS['feedback'] = fig(''.join(b), 480, 210, m,
    'The canonical negative-feedback loop. Two equations live in this picture: '
    'E = R \u2212 HC at the summing junction, and C = GE at the block.')

# ------------------------------------------------------ moving blocks --------
m = 'nxc4'
b = []
# --- past a summing junction
y = 66
b.append(txt(8, 22, 'Moving a block past a summing junction', 'start', 13))
b.append(txt(8, y + 6, 'R'))
b.append(wire([(30, y), (62, y)], m))
b.append(block(62, y, 52, 'G'))
b.append(wire([(114, y), (168 - SR - 4, y)], m))
b.append(summer(168, y, [(-28, -8, '+'), (-14, 32, '+')]))
b.append(wire([(168, y + 74), (168, y + SR + 4)], m))
b.append(txt(168, y + 90, 'X', 'middle'))
b.append(wire([(188, y), (240, y)], m))
b.append(txt(248, y + 6, 'C'))
b.append(txt(292, y + 6, '\u2261', 'middle', 20))
b.append(txt(330, y + 6, 'R'))
b.append(wire([(352, y), (400 - SR - 4, y)], m))
b.append(summer(400, y, [(-28, -8, '+'), (-14, 32, '+')]))
b.append(wire([(400, y + 74), (400, y + 46)], m))
b.append(block(372, y + 24, 56, '1/G', h=38))
b.append(wire([(400, y + 24 - 19), (400, y + SR + 4)], m))
b.append(txt(400, y + 90, 'X', 'middle'))
b.append(wire([(420, y), (462, y)], m))
b.append(block(462, y, 52, 'G'))
b.append(wire([(514, y), (556, y)], m))
b.append(txt(564, y + 6, 'C'))
# --- past a pickoff
y2 = 236
b.append(txt(8, y2 - 44, 'Moving a block past a pickoff', 'start', 13))
b.append(txt(8, y2 + 6, 'R'))
b.append(wire([(30, y2), (62, y2)], m))
b.append(block(62, y2, 52, 'G'))
b.append(wire([(114, y2), (240, y2)], m))
b.append(pickoff(176, y2))
b.append(txt(248, y2 + 6, 'C'))
b.append(wire([(176, y2), (176, y2 + 58)], m))
b.append(txt(176, y2 + 76, 'GR', 'middle', 13))
b.append(txt(292, y2 + 6, '\u2261', 'middle', 20))
b.append(txt(330, y2 + 6, 'R'))
b.append(wire([(352, y2), (404, y2)], m))
b.append(pickoff(384, y2))
b.append(block(404, y2, 52, 'G'))
b.append(wire([(456, y2), (556, y2)], m))
b.append(txt(564, y2 + 6, 'C'))
b.append(wire([(384, y2), (384, y2 + 22)], m, arrow=False))
b.append(wire([(384, y2 + 22), (410, y2 + 22)], m, arrow=False))
b.append(block(410, y2 + 4, 52, 'G', h=36))
b.append(wire([(436, y2 + 22), (436, y2 + 58)], m))
b.append(txt(436, y2 + 76, 'GR', 'middle', 13))
FIGS['moves'] = fig(''.join(b), 600, 330, m,
    'A block crosses a summing junction only if the other input is rescaled; it crosses '
    'a pickoff only if the branch is given its own copy. Verify by tracing, never by memory.')

# ------------------------------------------------------------ disturbance ----
m = 'nxc5'
b = []
cy, fy = 96, 190
b.append(txt(8, cy + 6, 'R(s)'))
b.append(wire([(48, cy), (104 - SR - 4, cy)], m))
b.append(summer(104, cy, [(-30, -8, '+'), (-16, 34, '\u2212')]))
b.append(wire([(104 + SR, cy), (168, cy)], m))
b.append(block(168, cy, 68, G(1, False)))
b.append(wire([(236, cy), (290 - SR - 4, cy)], m))
b.append(summer(290, cy, [(-28, -8, '+'), (16, -26, '+')]))
b.append(wire([(290, 24), (290, cy - SR - 4)], m))
b.append(txt(290, 16, 'D(s)', 'middle'))
b.append(wire([(290 + SR, cy), (356, cy)], m))
b.append(block(356, cy, 68, G(2, False)))
b.append(wire([(424, cy), (528, cy)], m))
b.append(pickoff(482, cy))
b.append(txt(536, cy + 6, 'C(s)'))
b.append(wire([(482, cy), (482, fy), (296, fy)], m))
b.append(block(234, fy, 62, 'H(s)'))
b.append(wire([(234, fy), (104, fy), (104, cy + SR + 4)], m))
FIGS['disturbance'] = fig(''.join(b), 590, 220, m,
    'A disturbance enters between the controller and the plant, so it sees only '
    'G\u2082 on the way out but the full loop gain on the way back.')

# --------------------------------------------------- reduction sequence ------
m = 'nxc6'
b = []
def loop(x0, y, gtxt, htxt, sumsign='\u2212', width=72):
    """One feedback loop starting at x0, returns (svg, x_end)."""
    s = summer(x0 + SR, y, [(-30, -8, '+'), (-16, 34, sumsign)])
    s += wire([(x0 + 2 * SR, y), (x0 + 2 * SR + 30, y)], m)
    s += block(x0 + 2 * SR + 30, y, width, gtxt)
    xe = x0 + 2 * SR + 30 + width
    s += wire([(xe, y), (xe + 64, y)], m)
    s += pickoff(xe + 34, y)
    s += wire([(xe + 34, y), (xe + 34, y + 56), (x0 + SR + 34, y + 56)], m)
    s += block(x0 + SR - 28, y + 56, 62, htxt)
    s += wire([(x0 + SR - 28, y + 56), (x0 + SR, y + 56), (x0 + SR, y + SR + 4)], m)
    return s, xe + 64

b.append(txt(8, 20, 'Step 1 \u00b7 innermost loop first', 'start', 13))
s1, xe = loop(60, 62, G(2, False), 'H<tspan dy="4" font-size="11">1</tspan>')
b.append(s1)
b.append(txt(8, 68, 'R'))
b.append(wire([(26, 62), (56, 62)], m))
b.append(wire([(xe, 62), (xe + 40, 62)], m))
b.append(txt(xe + 48, 68, 'C'))

b.append(txt(8, 190, 'Step 2 \u00b7 the inner loop is now a single block', 'start', 13))
y = 232
b.append(txt(8, y + 6, 'R'))
b.append(wire([(26, y), (66, y)], m))
b.append(block(66, y, 168,
               '<tspan font-size="13">G</tspan><tspan dy="4" font-size="10">2</tspan>'
               '<tspan dy="-4" font-size="13">/(1+G</tspan>'
               '<tspan dy="4" font-size="10">2</tspan>'
               '<tspan dy="-4" font-size="13">H</tspan>'
               '<tspan dy="4" font-size="10">1</tspan>'
               '<tspan dy="-4" font-size="13">)</tspan>'))
b.append(wire([(234, y), (300, y)], m))
b.append(txt(308, y + 6, 'C'))
b.append(txt(360, y + 6, 'then close the outer loop the same way', 'start', 13))
FIGS['reduction'] = fig(''.join(b), 600, 300, m,
    'Reduction is always innermost-first. Collapse one loop to a single block, '
    'redraw, and the next loop is a named form again.')

if __name__ == '__main__':
    import json, io, sys, re
    from xml.dom import minidom
    for k, v in FIGS.items():
        svg = re.search(r'<svg[\s\S]*?</svg>', v).group(0)
        minidom.parseString(svg)          # raises if malformed
        print('%-12s ok  %6d chars' % (k, len(v)))
    io.open('/home/claude/build/figs.json', 'w', encoding='utf-8').write(
        json.dumps(FIGS, ensure_ascii=False))
