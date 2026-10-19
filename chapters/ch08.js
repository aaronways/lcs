/* ===========================================================================
   NEXUS - Chapter 8: Root Locus Techniques
   Nise, Control Systems Engineering, 7e, sections 8.1-8.7.
   Every LaTeX backslash inside these template literals is doubled.
   =========================================================================== */
registerChapter({
  id: 8,
  title: "Root Locus Techniques",
  sections: "8.1–8.7",
  brief: `The closed-loop poles move when the gain changes, and the root locus is the picture of where they
go. Every point on it satisfies one condition: the angles from the open-loop zeros minus the angles
from the open-loop poles add to an odd multiple of $180^\\circ$. Five rules sketch the locus from
the open-loop poles and zeros alone. Breakaway points, $j\\omega$ crossings and departure angles
refine it. A damping-ratio line drawn across it turns a transient specification into a gain, and
the design is only as good as the second-order approximation behind it, so the last step is always
to find the other poles.`,

  sectionList: [
    { id: "8.1", title: "Introduction" },
    { id: "8.2", title: "Defining the Root Locus" },
    { id: "8.3", title: "Properties of the Root Locus" },
    { id: "8.4", title: "Sketching the Root Locus" },
    { id: "8.5", title: "Refining the Sketch" },
    { id: "8.6", title: "An Example" },
    { id: "8.7", title: "Transient Response Design via Gain Adjustment" },
  ],

  guide: [
    {
      title: "What this chapter is for",
      sec: "8.1",
      example: "8-02",
      body: `
Chapter 4 related pole positions to $\\%OS$, $T_{s}$ and $T_{p}$, but only for poles you already
had. Chapter 6 told you whether the closed-loop poles were stable for a given gain, and Chapter 7
told you the steady-state error for that gain. None of them answered the design question directly:
**as $K$ changes, where do the closed-loop poles go?**

The root locus is the answer, drawn. It is the set of paths traced by the closed-loop poles as $K$
runs from $0$ to $\\infty$. Read off it you get stability ranges, the gain at which the system
oscillates, the gain that gives a specified damping ratio, and how settling time and overshoot
trade against each other as the gain is turned up.

Its real value is order. For a second-order loop the quadratic formula already does all of this.
For third order and up, factoring for every $K$ is not available by hand, and the root locus gets
the same picture from the open-loop poles and zeros alone.

| Section | What it adds |
|---|---|
| 8.1 | Why closed-loop poles are hard to find, and complex numbers as vectors |
| 8.2 | The locus of a second-order loop, found by factoring |
| 8.3 | The angle and magnitude criteria: the definition everything else follows from |
| 8.4 | Five rules that sketch the locus without factoring anything |
| 8.5 | Breakaway points, $j\\omega$ crossings, departure and arrival angles, calibration |
| 8.6 | All of it on one system |
| 8.7 | Turning a transient specification into a gain, and checking the approximation |

### What it connects to

The $j\\omega$ crossing is the Routh boundary from Chapter 6. The damping-ratio line is the Chapter 4
angle $\\theta=\\cos^{-1}\\zeta$. The gain the locus picks also fixes $K_{p}$, $K_{v}$ or $K_{a}$ from
Chapter 7, which is the conflict 8.7 ends on and Chapter 9 resolves.
`
    },
    {
      title: "8.1: The control system problem",
      sec: "8.1",
      example: "8-02",
      body: `
Take the loop with forward path $KG(s)$ and feedback $H(s)$, and write each as a ratio of factored
polynomials, $G=N_{G}/D_{G}$ and $H=N_{H}/D_{H}$. Then

$$T(s)=\\frac{KG(s)}{1+KG(s)H(s)}=\\frac{KN_{G}(s)D_{H}(s)}{D_{G}(s)D_{H}(s)+KN_{G}(s)N_{H}(s)}$$

Three things follow from looking at it.

- **The open-loop poles and zeros are known.** $G$ and $H$ are built from first- and second-order
  pieces, so their poles and zeros are visible, and none of them depend on $K$.
- **The closed-loop zeros are known.** They are the zeros of $G$ and the poles of $H$. For unity
  feedback that is just the zeros of $G$.
- **The closed-loop poles are not.** They are roots of $D_{G}D_{H}+KN_{G}N_{H}$, which has to be
  factored again for every value of $K$.

The transient response and stability both live in those unknown roots. The root locus replaces
"factor for every $K$" with a sketch built from what is already known: the open-loop poles and
zeros.
`
    },
    {
      title: "8.1: Complex numbers as vectors",
      sec: "8.1",
      example: "8-01",
      body: `
A factor $(s+a)$ evaluated at a point $s$ is a complex number. Drawn in the $s$-plane, it is the
vector **from the zero at $-a$ to the point $s$**. That one picture is the whole geometric basis of
the chapter.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 303" class="nx-fig">
  <defs><marker id="nx8a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 230.0 L438.0 230.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8a)"/>
  <path d="M360.7 269.2 L360.7 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8a)"/>
  <text x="430.0" y="248.0" font-size="13">&#963;</text>
  <text x="366.7" y="32.0" font-size="13">j&#969;</text>
  <path d="M99.3 227.0 L99.3 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="99.3" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M164.7 227.0 L164.7 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="164.7" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M230.0 227.0 L230.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="230.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M295.3 227.0 L295.3 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="295.3" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M357.7 99.3 L363.7 99.3" stroke="currentColor" stroke-width="1"/>
  <text x="354.7" y="103.3" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <circle cx="230.0" cy="230.0" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M354.7 224.0 L366.7 236.0 M366.7 224.0 L354.7 236.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M93.3 224.0 L105.3 236.0 M105.3 224.0 L93.3 236.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M230.0 230.0 L230.0 99.3" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx8a)"/>
  <path d="M360.7 230.0 L230.0 99.3" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx8a)"/>
  <path d="M99.3 230.0 L230.0 99.3" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx8a)"/>
  <circle cx="230.0" cy="99.3" r="4.5" fill="currentColor" stroke="none"/>
  <text x="238.0" y="91.3" font-size="12" text-anchor="start">s = −2 + j2</text>
  <text x="301.3" y="162.7" font-size="11" text-anchor="start">2√2 ∠135°</text>
  <text x="156.7" y="162.7" font-size="11" text-anchor="end">2√2 ∠45°</text>
  <text x="236.0" y="164.7" font-size="11" text-anchor="start">2 ∠90°</text>
</svg>
<figcaption>Each factor of F(s) is a vector from its pole or zero to the test point. Lengths multiply and divide; angles add for zeros and subtract for poles.</figcaption>
</figure>

For a function with zeros $z_{i}$ and poles $p_{j}$,

$$F(s)=\\frac{\\prod_{i}(s-z_{i})}{\\prod_{j}(s-p_{j})}$$

the value at a point is

$$M=\\frac{\\prod\\text{zero lengths}}{\\prod\\text{pole lengths}},\\qquad
\\theta=\\sum\\text{zero angles}-\\sum\\text{pole angles}$$

with every angle measured counterclockwise from the positive real direction, at the tail of its
vector.

In the figure, $F(s)=\\dfrac{s+2}{s(s+4)}$ at $s=-2+j2$:

$$M=\\frac{2}{2\\sqrt2\\cdot2\\sqrt2}=\\frac14,\\qquad \\theta=90^\\circ-135^\\circ-45^\\circ=-90^\\circ$$

so $F=0.25\\angle-90^\\circ=-j0.25$, which direct substitution confirms (8-01).
`
    },
    {
      title: "8.2: The root locus of a second-order loop",
      sec: "8.2",
      example: "8-03",
      body: `
For a second-order loop the closed-loop poles can be found directly. With unity feedback and
$G(s)=\\dfrac{K}{s(s+6)}$,

$$T(s)=\\frac{K}{s^{2}+6s+K},\\qquad s=-3\\pm\\sqrt{9-K}$$

| $K$ | Closed-loop poles | Response |
|---|---|---|
| 0 | $0,\\ -6$ | open loop |
| 5 | $-1,\\ -5$ | overdamped |
| 9 | $-3,\\ -3$ | critically damped |
| 25 | $-3\\pm j4$ | underdamped, $\\zeta=0.6$ |
| 36 | $-3\\pm j5.20$ | underdamped, $\\zeta=0.5$ |

Plot those poles and join them, and the paths are the root locus.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 596" class="nx-fig">
  <defs><marker id="nx8b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 298.0 L398.0 298.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8b)"/>
  <path d="M342.0 562.0 L342.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8b)"/>
  <text x="390.0" y="316.0" font-size="13">&#963;</text>
  <text x="348.0" y="32.0" font-size="13">j&#969;</text>
  <path d="M78.0 295.0 L78.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="78.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M122.0 295.0 L122.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="122.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M166.0 295.0 L166.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="166.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M210.0 295.0 L210.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="210.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M254.0 295.0 L254.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="254.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M298.0 295.0 L298.0 301.0" stroke="currentColor" stroke-width="1"/>
  <text x="298.0" y="313.0" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M339.0 474.0 L345.0 474.0" stroke="currentColor" stroke-width="1"/>
  <text x="336.0" y="478.0" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M339.0 386.0 L345.0 386.0" stroke="currentColor" stroke-width="1"/>
  <text x="336.0" y="390.0" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M339.0 210.0 L345.0 210.0" stroke="currentColor" stroke-width="1"/>
  <text x="336.0" y="214.0" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M339.0 122.0 L345.0 122.0" stroke="currentColor" stroke-width="1"/>
  <text x="336.0" y="126.0" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M342.0 298.0 L340.5 298.0 L339.0 298.0 L337.4 298.0 L335.9 298.0 L334.4 298.0 L332.8 298.0 L331.3 298.0 L329.7 298.0 L328.1 298.0 L326.5 298.0 L325.0 298.0 L323.5 298.0 L321.8 298.0 L320.1 298.0 L318.6 298.0 L316.9 298.0 L315.4 298.0 L313.7 298.0 L311.9 298.0 L310.4 298.0 L308.7 298.0 L306.9 298.0 L305.4 298.0 L303.8 298.0 L302.1 298.0 L300.4 298.0 L298.5 298.0 L296.5 298.0 L295.0 298.0 L293.3 298.0 L291.6 298.0 L289.8 298.0 L287.9 298.0 L285.9 298.0 L283.8 298.0 L281.6 298.0 L280.0 298.0 L278.4 298.0 L276.7 298.0 L275.0 298.0 L273.1 298.0 L271.2 298.0 L269.2 298.0 L267.0 298.0 L264.7 298.0 L262.3 298.0 L259.7 298.0 L257.0 298.0 L254.0 298.0 L252.4 298.0 L250.7 298.0 L248.9 298.0 L247.1 298.0 L245.1 298.0 L243.0 298.0 L240.7 298.0 L238.2 298.0 L235.4 298.0 L232.3 298.0 L228.7 298.0 L227.2 298.0 L225.6 298.0 L224.1 298.0 L222.6 298.0 L221.0 298.0 L219.5 298.0 L217.9 298.0 L216.3 298.0 L214.8 298.0 L213.2 298.0 L211.3 298.0 L210.0 296.7 L210.0 295.0 L210.0 293.4 L210.0 291.8 L210.0 290.3 L210.0 288.8 L210.0 287.2 L210.0 285.7 L210.0 284.2 L210.0 282.6 L210.0 281.1 L210.0 279.6 L210.0 277.3 L210.0 273.7 L210.0 270.6 L210.0 267.8 L210.0 265.2 L210.0 262.8 L210.0 260.5 L210.0 258.3 L210.0 256.2 L210.0 254.2 L210.0 252.3 L210.0 250.5 L210.0 248.6 L210.0 246.9 L210.0 245.2 L210.0 243.5 L210.0 241.8 L210.0 240.2 L210.0 238.7 L210.0 237.1 L210.0 235.6 L210.0 234.1 L210.0 231.1 L210.0 228.3 L210.0 225.4 L210.0 222.7 L210.0 220.0 L210.0 217.3 L210.0 214.7 L210.0 212.2 L210.0 209.6 L210.0 207.1 L210.0 204.6 L210.0 202.1 L210.0 199.7 L210.0 197.2 L210.0 194.8 L210.0 192.4 L210.0 190.0 L210.0 187.6 L210.0 185.2 L210.0 182.9 L210.0 180.5 L210.0 178.1 L210.0 175.8 L210.0 173.4 L210.0 171.1 L210.0 168.8 L210.0 166.4 L210.0 164.1 L210.0 161.7 L210.0 159.4 L210.0 157.0 L210.0 154.7 L210.0 152.3 L210.0 150.0 L210.0 147.6 L210.0 145.2 L210.0 142.9 L210.0 140.5 L210.0 138.1 L210.0 135.7 L210.0 133.3 L210.0 130.9 L210.0 128.5 L210.0 126.1 L210.0 123.7 L210.0 121.2 L210.0 118.8 L210.0 116.3 L210.0 113.8 L210.0 111.4 L210.0 108.9 L210.0 106.4 L210.0 103.9 L210.0 101.3 L210.0 98.8 L210.0 96.2 L210.0 93.7 L210.0 91.1 L210.0 88.5 L210.0 85.9 L210.0 83.3 L210.0 80.7 L210.0 78.0 L210.0 75.3 L210.0 72.7 L210.0 70.0 L210.0 67.3 L210.0 64.5 L210.0 61.8 L210.0 59.0 L210.0 56.3 L210.0 53.5 L210.0 50.7 L210.0 47.8 L210.0 45.0 L210.0 42.1 L210.0 39.2 L210.0 36.3 L210.0 33.4 L210.0 30.5 L210.0 27.5 L210.0 26.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(210.0 246.9) rotate(-90.0)"/>
  <path d="M78.0 298.0 L79.5 298.0 L81.0 298.0 L82.6 298.0 L84.1 298.0 L85.6 298.0 L87.2 298.0 L88.7 298.0 L90.3 298.0 L91.9 298.0 L93.5 298.0 L95.0 298.0 L96.5 298.0 L98.2 298.0 L99.9 298.0 L101.4 298.0 L103.1 298.0 L104.6 298.0 L106.3 298.0 L108.1 298.0 L109.6 298.0 L111.3 298.0 L113.1 298.0 L114.6 298.0 L116.2 298.0 L117.9 298.0 L119.6 298.0 L121.5 298.0 L123.5 298.0 L125.0 298.0 L126.7 298.0 L128.4 298.0 L130.2 298.0 L132.1 298.0 L134.1 298.0 L136.2 298.0 L138.4 298.0 L140.0 298.0 L141.6 298.0 L143.3 298.0 L145.0 298.0 L146.9 298.0 L148.8 298.0 L150.8 298.0 L153.0 298.0 L155.3 298.0 L157.7 298.0 L160.3 298.0 L163.0 298.0 L166.0 298.0 L167.6 298.0 L169.3 298.0 L171.1 298.0 L172.9 298.0 L174.9 298.0 L177.0 298.0 L179.3 298.0 L181.8 298.0 L184.6 298.0 L187.7 298.0 L191.3 298.0 L192.8 298.0 L194.4 298.0 L195.9 298.0 L197.4 298.0 L199.0 298.0 L200.5 298.0 L202.1 298.0 L203.7 298.0 L205.2 298.0 L206.8 298.0 L208.7 298.0 L210.0 299.3 L210.0 301.0 L210.0 302.6 L210.0 304.2 L210.0 305.7 L210.0 307.2 L210.0 308.8 L210.0 310.3 L210.0 311.8 L210.0 313.4 L210.0 314.9 L210.0 316.4 L210.0 318.7 L210.0 322.3 L210.0 325.4 L210.0 328.2 L210.0 330.8 L210.0 333.2 L210.0 335.5 L210.0 337.7 L210.0 339.8 L210.0 341.8 L210.0 343.7 L210.0 345.5 L210.0 347.4 L210.0 349.1 L210.0 350.8 L210.0 352.5 L210.0 354.2 L210.0 355.8 L210.0 357.3 L210.0 358.9 L210.0 360.4 L210.0 361.9 L210.0 364.9 L210.0 367.7 L210.0 370.6 L210.0 373.3 L210.0 376.0 L210.0 378.7 L210.0 381.3 L210.0 383.8 L210.0 386.4 L210.0 388.9 L210.0 391.4 L210.0 393.9 L210.0 396.3 L210.0 398.8 L210.0 401.2 L210.0 403.6 L210.0 406.0 L210.0 408.4 L210.0 410.8 L210.0 413.1 L210.0 415.5 L210.0 417.9 L210.0 420.2 L210.0 422.6 L210.0 424.9 L210.0 427.2 L210.0 429.6 L210.0 431.9 L210.0 434.3 L210.0 436.6 L210.0 439.0 L210.0 441.3 L210.0 443.7 L210.0 446.0 L210.0 448.4 L210.0 450.8 L210.0 453.1 L210.0 455.5 L210.0 457.9 L210.0 460.3 L210.0 462.7 L210.0 465.1 L210.0 467.5 L210.0 469.9 L210.0 472.3 L210.0 474.8 L210.0 477.2 L210.0 479.7 L210.0 482.2 L210.0 484.6 L210.0 487.1 L210.0 489.6 L210.0 492.1 L210.0 494.7 L210.0 497.2 L210.0 499.8 L210.0 502.3 L210.0 504.9 L210.0 507.5 L210.0 510.1 L210.0 512.7 L210.0 515.3 L210.0 518.0 L210.0 520.7 L210.0 523.3 L210.0 526.0 L210.0 528.7 L210.0 531.5 L210.0 534.2 L210.0 537.0 L210.0 539.7 L210.0 542.5 L210.0 545.3 L210.0 548.2 L210.0 551.0 L210.0 553.9 L210.0 556.8 L210.0 559.7 L210.0 562.6 L210.0 565.5 L210.0 568.5 L210.0 570.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(210.0 349.1) rotate(90.0)"/>
  <path d="M336.0 292.0 L348.0 304.0 M348.0 292.0 L336.0 304.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M72.0 292.0 L84.0 304.0 M84.0 292.0 L72.0 304.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="122.0" cy="298.0" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="298.0" cy="298.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="298.0" y="288.0" font-size="11" text-anchor="start">K = 5</text>
  <circle cx="210.0" cy="298.0" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="210.0" cy="298.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="202.0" y="288.0" font-size="11" text-anchor="end">K = 9</text>
  <circle cx="210.0" cy="122.0" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="210.0" cy="474.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="218.0" y="126.0" font-size="11" text-anchor="start">K = 25</text>
  <circle cx="210.0" cy="69.4" r="3.5" fill="currentColor" stroke="none"/>
  <circle cx="210.0" cy="526.6" r="3.5" fill="currentColor" stroke="none"/>
  <text x="218.0" y="73.4" font-size="11" text-anchor="start">K = 36</text>
</svg>
<figcaption>Root locus of K/[s(s+6)]. The poles start at 0 and −6, meet at −3 when K = 9, and then move vertically. The real part stays at −3, so the settling time stops changing once the poles are complex.</figcaption>
</figure>

> The **root locus** is the set of paths traced by the closed-loop poles as a system parameter,
> usually the gain $K$, varies from $0$ to $\\infty$.

### What the picture says without more algebra

- Below $K=9$ the poles are real: overdamped. At $K=9$ they coincide: critically damped. Above,
  underdamped.
- Once complex, the real part stays at $-3$, so $T_{s}=4/3$ s for every underdamped gain.
- The imaginary part keeps growing, so $\\omega_{d}$ rises and $T_{p}$ falls.
- The angle from the negative real axis keeps growing, so $\\zeta$ falls and $\\%OS$ rises.
- The locus never enters the right half-plane: stable for every $K>0$.

None of this needed the root locus; Chapter 4 already had it. The point of the chapter is that the
same picture can be drawn for a fifth-order loop without solving a fifth-order equation.
`
    },
    {
      title: "8.3: The angle and magnitude criteria",
      sec: "8.3",
      example: "8-06",
      body: `
A closed-loop pole is a value of $s$ that makes the characteristic equation zero:

$$1+KG(s)H(s)=0\\qquad\\Longleftrightarrow\\qquad KG(s)H(s)=-1=1\\angle(2k+1)180^\\circ$$

That one complex equation is two real ones.

> **Angle criterion:** $\\angle G(s)H(s)=(2k+1)180^\\circ$
>
> **Magnitude criterion:** $|KG(s)H(s)|=1$, so $K=\\dfrac{1}{|G(s)H(s)|}$

$K$ is a positive scalar, so it has no angle. The angle criterion therefore involves only the
open-loop poles and zeros, and it alone decides whether a point is on the root locus. The magnitude
criterion then says what gain puts a closed-loop pole there.

In vector form, from the previous section:

$$\\sum\\text{zero angles}-\\sum\\text{pole angles}=(2k+1)180^\\circ$$

$$K=\\frac{\\prod\\text{pole lengths}}{\\prod\\text{zero lengths}}$$

### Using it

For $KG(s)=\\dfrac{K(s+4)}{s(s+2)}$ and the test point $s=-2+j2$:

$$\\underbrace{45^\\circ}_{\\text{zero at }-4}-\\underbrace{135^\\circ}_{\\text{pole at }0}-\\underbrace{90^\\circ}_{\\text{pole at }-2}=-180^\\circ$$

so the point is on the locus, and

$$K=\\frac{2\\sqrt2\\cdot2}{2\\sqrt2}=2$$

Check: with $K=2$, $s^{2}+2s+2(s+4)=s^{2}+4s+8$, whose roots are $-2\\pm j2$ (8-06).

Every rule in 8.4 and 8.5 is this criterion applied cleverly, so when a rule is forgotten, the
criterion still works.
`
    },
    {
      title: "8.4: Five rules for sketching",
      sec: "8.4",
      example: "8-09",
      body: `
Testing every point in the plane against the angle criterion is a computer's job. These five rules,
each a consequence of the criterion, give the shape with almost no arithmetic.

**1. Number of branches.** One branch per closed-loop pole: the order of the characteristic
polynomial.

**2. Symmetry.** The locus is symmetric about the real axis, because complex closed-loop poles come
in conjugate pairs; a physical system has real coefficients.

**3. Real-axis segments.**

> On the real axis, for $K>0$, the locus lies to the left of an **odd** number of real, finite
> open-loop poles and zeros.

Complex pairs contribute angles that cancel, and anything to the left of a real-axis point
contributes $0^\\circ$. Each real pole or zero to the right contributes $180^\\circ$, so an odd count
gives the required odd multiple.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 429" class="nx-fig">
  <defs><marker id="nx8c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 214.8 L498.0 214.8" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8c)"/>
  <path d="M432.8 395.6 L432.8 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8c)"/>
  <text x="490.0" y="232.8" font-size="13">&#963;</text>
  <text x="438.8" y="32.0" font-size="13">j&#969;</text>
  <path d="M60.6 211.8 L60.6 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="60.6" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−7</text>
  <path d="M113.8 211.8 L113.8 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="113.8" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M166.9 211.8 L166.9 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="166.9" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M220.1 211.8 L220.1 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="220.1" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M273.3 211.8 L273.3 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="273.3" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M326.5 211.8 L326.5 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="326.5" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M379.6 211.8 L379.6 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="379.6" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M429.8 321.2 L435.8 321.2" stroke="currentColor" stroke-width="1"/>
  <text x="426.8" y="325.2" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M429.8 108.4 L435.8 108.4" stroke="currentColor" stroke-width="1"/>
  <text x="426.8" y="112.4" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M432.8 214.8 L431.3 214.8 L429.8 214.8 L428.3 214.8 L426.8 214.8 L425.3 214.8 L423.8 214.8 L422.2 214.8 L420.7 214.8 L419.1 214.8 L417.6 214.8 L416.0 214.8 L414.4 214.8 L412.9 214.8 L411.4 214.8 L409.7 214.8 L408.1 214.8 L406.5 214.8 L404.9 214.8 L403.3 214.8 L401.6 214.8 L400.1 214.8 L398.4 214.8 L396.6 214.8 L395.1 214.8 L393.4 214.8 L391.6 214.8 L390.0 214.8 L388.3 214.8 L386.5 214.8 L384.5 214.8 L382.9 214.8 L381.1 214.8 L379.1 214.8 L377.6 214.8 L375.9 214.8 L373.9 214.8 L372.4 214.8 L370.9 214.8 L369.3 214.8 L367.8 214.8 L366.2 214.8 L365.4 213.4 L365.4 211.9 L365.3 210.4 L365.2 208.9 L365.0 206.5 L364.8 204.6 L364.6 203.0 L364.3 200.9 L364.1 199.1 L363.7 197.4 L363.4 195.9 L363.0 194.0 L362.6 192.2 L362.2 190.6 L361.7 189.0 L361.2 187.5 L360.8 186.0 L360.2 184.2 L359.6 182.5 L358.9 180.9 L358.3 179.3 L357.6 177.7 L356.9 176.1 L356.2 174.6 L355.5 173.2 L354.7 171.7 L353.9 170.3 L353.1 168.9 L352.3 167.5 L351.5 166.1 L350.6 164.8 L349.8 163.5 L348.9 162.1 L347.9 160.9 L347.0 159.6 L346.0 158.3 L345.0 157.1 L344.0 155.8 L343.0 154.6 L341.9 153.4 L340.9 152.2 L339.7 151.0 L338.6 149.9 L337.5 148.7 L336.3 147.6 L335.1 146.5 L333.8 145.4 L332.6 144.3 L331.3 143.3 L330.0 142.2 L328.7 141.2 L327.3 140.2 L326.0 139.2 L324.6 138.3 L323.1 137.3 L321.7 136.4 L320.2 135.5 L318.7 134.7 L317.2 133.8 L315.7 133.0 L314.1 132.2 L312.5 131.5 L310.9 130.7 L309.3 130.0 L307.7 129.4 L306.0 128.7 L304.4 128.1 L302.7 127.5 L301.0 127.0 L299.3 126.4 L297.5 125.9 L295.8 125.5 L294.0 125.1 L292.2 124.7 L290.5 124.3 L288.7 124.0 L286.9 123.7 L285.0 123.4 L283.2 123.2 L281.4 123.1 L279.6 122.9 L277.7 122.8 L275.9 122.7 L274.1 122.7 L272.2 122.7 L270.4 122.7 L268.6 122.8 L266.7 122.9 L264.9 123.1 L263.1 123.3 L261.3 123.5 L259.5 123.7 L257.6 124.0 L255.9 124.4 L254.1 124.7 L252.3 125.1 L250.5 125.5 L248.8 126.0 L247.1 126.5 L245.3 127.0 L243.6 127.6 L242.0 128.2 L240.3 128.8 L238.6 129.5 L237.0 130.1 L235.4 130.9 L233.8 131.6 L232.2 132.4 L230.7 133.2 L229.1 134.0 L227.6 134.8 L226.1 135.7 L224.7 136.6 L223.2 137.5 L221.8 138.4 L220.4 139.4 L219.0 140.4 L217.7 141.4 L216.4 142.4 L215.1 143.4 L213.8 144.5 L212.6 145.6 L211.3 146.7 L210.1 147.8 L209.0 148.9 L207.8 150.0 L206.7 151.2 L205.6 152.4 L204.5 153.6 L203.4 154.8 L202.4 156.0 L201.4 157.2 L200.4 158.5 L199.4 159.8 L198.5 161.1 L197.6 162.4 L196.7 163.7 L195.8 165.0 L195.0 166.4 L194.1 167.7 L193.3 169.1 L192.5 170.5 L191.8 171.9 L191.0 173.4 L190.3 174.9 L189.6 176.4 L188.9 177.9 L188.2 179.5 L187.6 181.1 L186.9 182.8 L186.3 184.5 L185.7 186.3 L185.3 187.8 L184.8 189.3 L184.3 190.9 L183.9 192.6 L183.5 194.4 L183.1 196.3 L182.8 197.9 L182.5 199.6 L182.2 201.4 L181.9 203.6 L181.7 205.3 L181.5 207.3 L181.4 208.8 L181.3 210.3 L181.2 211.9 L181.2 213.4 L181.9 214.8 L183.4 214.8 L184.9 214.8 L186.4 214.8 L188.7 214.8 L190.4 214.8 L192.4 214.8 L194.0 214.8 L195.8 214.8 L197.6 214.8 L199.2 214.8 L200.8 214.8 L202.4 214.8 L204.0 214.8 L205.5 214.8 L207.0 214.8 L208.6 214.8 L210.2 214.8 L211.7 214.8 L213.2 214.8 L214.8 214.8 L216.3 214.8 L217.8 214.8 L219.3 214.8 L220.1 214.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(306.0 128.7) rotate(-159.7)"/>
  <path d="M326.5 214.8 L328.0 214.8 L329.5 214.8 L331.0 214.8 L332.5 214.8 L334.1 214.8 L335.6 214.8 L337.2 214.8 L338.7 214.8 L340.2 214.8 L341.7 214.8 L343.3 214.8 L345.0 214.8 L346.8 214.8 L348.5 214.8 L350.3 214.8 L352.0 214.8 L354.0 214.8 L356.0 214.8 L357.6 214.8 L359.1 214.8 L360.7 214.8 L362.2 214.8 L363.7 214.8 L365.4 215.1 L365.4 216.7 L365.3 218.2 L365.3 219.7 L365.2 221.2 L365.0 223.1 L364.8 225.0 L364.6 226.6 L364.3 228.7 L364.1 230.5 L363.7 232.2 L363.4 233.7 L363.0 235.6 L362.6 237.4 L362.2 239.0 L361.7 240.6 L361.2 242.1 L360.8 243.6 L360.2 245.4 L359.6 247.1 L358.9 248.7 L358.3 250.3 L357.6 251.9 L356.9 253.5 L356.2 255.0 L355.5 256.4 L354.7 257.9 L353.9 259.3 L353.1 260.7 L352.3 262.1 L351.5 263.5 L350.6 264.8 L349.8 266.1 L348.9 267.5 L347.9 268.7 L347.0 270.0 L346.0 271.3 L345.0 272.5 L344.0 273.8 L343.0 275.0 L341.9 276.2 L340.9 277.4 L339.7 278.6 L338.6 279.7 L337.5 280.9 L336.3 282.0 L335.1 283.1 L333.8 284.2 L332.6 285.3 L331.3 286.3 L330.0 287.4 L328.7 288.4 L327.3 289.4 L326.0 290.4 L324.6 291.3 L323.1 292.3 L321.7 293.2 L320.2 294.1 L318.7 294.9 L317.2 295.8 L315.7 296.6 L314.1 297.4 L312.5 298.1 L310.9 298.9 L309.3 299.6 L307.7 300.2 L306.0 300.9 L304.4 301.5 L302.7 302.1 L301.0 302.6 L299.3 303.2 L297.5 303.7 L295.8 304.1 L294.0 304.5 L292.2 304.9 L290.5 305.3 L288.7 305.6 L286.9 305.9 L285.0 306.2 L283.2 306.4 L281.4 306.5 L279.6 306.7 L277.7 306.8 L275.9 306.9 L274.1 306.9 L272.2 306.9 L270.4 306.9 L268.6 306.8 L266.7 306.7 L264.9 306.5 L263.1 306.3 L261.3 306.1 L259.5 305.9 L257.6 305.6 L255.9 305.2 L254.1 304.9 L252.3 304.5 L250.5 304.1 L248.8 303.6 L247.1 303.1 L245.3 302.6 L243.6 302.0 L242.0 301.4 L240.3 300.8 L238.6 300.1 L237.0 299.5 L235.4 298.7 L233.8 298.0 L232.2 297.2 L230.7 296.4 L229.1 295.6 L227.6 294.8 L226.1 293.9 L224.7 293.0 L223.2 292.1 L221.8 291.2 L220.4 290.2 L219.0 289.2 L217.7 288.2 L216.4 287.2 L215.1 286.2 L213.8 285.1 L212.6 284.0 L211.3 282.9 L210.1 281.8 L209.0 280.7 L207.8 279.6 L206.7 278.4 L205.6 277.2 L204.5 276.0 L203.4 274.8 L202.4 273.6 L201.4 272.4 L200.4 271.1 L199.4 269.8 L198.5 268.5 L197.6 267.2 L196.7 265.9 L195.8 264.6 L195.0 263.2 L194.1 261.9 L193.3 260.5 L192.5 259.1 L191.8 257.7 L191.0 256.2 L190.3 254.7 L189.6 253.2 L188.9 251.7 L188.2 250.1 L187.6 248.5 L186.9 246.8 L186.3 245.1 L185.7 243.3 L185.3 241.8 L184.8 240.3 L184.3 238.7 L183.9 237.0 L183.5 235.2 L183.1 233.3 L182.8 231.7 L182.5 230.0 L182.2 228.2 L181.9 226.0 L181.7 224.3 L181.5 222.3 L181.4 220.8 L181.3 219.3 L181.2 217.7 L181.2 216.2 L180.5 214.8 L179.0 214.8 L177.4 214.8 L175.9 214.8 L174.4 214.8 L171.9 214.8 L170.0 214.8 L168.4 214.8 L166.3 214.8 L164.4 214.8 L162.7 214.8 L161.2 214.8 L159.3 214.8 L157.5 214.8 L155.9 214.8 L154.4 214.8 L152.6 214.8 L151.0 214.8 L149.4 214.8 L147.7 214.8 L146.1 214.8 L144.5 214.8 L142.9 214.8 L141.3 214.8 L139.7 214.8 L138.2 214.8 L136.6 214.8 L134.9 214.8 L133.4 214.8 L131.9 214.8 L130.4 214.8 L128.8 214.8 L127.3 214.8 L125.7 214.8 L124.2 214.8 L122.7 214.8 L121.2 214.8 L119.6 214.8 L118.1 214.8 L116.6 214.8 L115.1 214.8 L113.8 214.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(277.7 306.8) rotate(177.8)"/>
  <path d="M426.8 208.8 L438.8 220.8 M438.8 208.8 L426.8 220.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M320.5 208.8 L332.5 220.8 M332.5 208.8 L320.5 220.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="220.1" cy="214.8" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="113.8" cy="214.8" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="365.4" cy="214.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="369.4" y="206.8" font-size="11" text-anchor="start">−1.27</text>
  <circle cx="181.2" cy="214.8" r="3.5" fill="currentColor" stroke="none"/>
  <text x="177.2" y="206.8" font-size="11" text-anchor="end">−4.73</text>
</svg>
<figcaption>K(s+4)(s+6)/[s(s+2)]. The real-axis segments are [−2, 0] and [−6, −4], to the left of an odd count. The poles break away at −1.27, swing through the complex plane, break in at −4.73, and end on the two zeros.</figcaption>
</figure>

**4. Start and end.** The locus starts at the open-loop poles ($K=0$) and ends at the open-loop
zeros ($K\\to\\infty$). From $D_{G}D_{H}+KN_{G}N_{H}$: small $K$ leaves the denominator roots, large
$K$ leaves the numerator roots.

**5. Behaviour at infinity.** With $n$ finite poles and $m$ finite zeros, $n-m$ branches have no
finite zero to end on. They end on zeros at infinity, approaching straight-line asymptotes (next
section).

The figure uses rules 1 to 4 alone. Two poles, two zeros, two branches; the real-axis segments
$[-2,0]$ and $[-6,-4]$; start at $0$ and $-2$, end at $-4$ and $-6$. Since a branch cannot travel
along the axis between $-2$ and $-4$, the pair has to leave the axis, cross the complex plane, and
come back down: the shape is forced before any number is computed.
`
    },
    {
      title: "8.4: Asymptotes",
      sec: "8.4",
      example: "8-10",
      body: `
When there are more finite poles than finite zeros, $n-m$ branches go to infinity, and far from the
origin they approach straight lines that radiate from a single point on the real axis.

$$\\sigma_{a}=\\frac{\\sum\\text{finite poles}-\\sum\\text{finite zeros}}{n-m}$$

$$\\theta_{a}=\\frac{(2k+1)\\pi}{n-m},\\qquad k=0,\\pm1,\\pm2,\\ldots$$

Take as many values of $k$ as there are asymptotes; after that the angles repeat. For the sums, use
the pole and zero **values**, signs included: poles at $0,-2,-4$ sum to $-6$.

| $n-m$ | Asymptote angles |
|---|---|
| 1 | $180^\\circ$ |
| 2 | $\\pm90^\\circ$ |
| 3 | $\\pm60^\\circ,\\ 180^\\circ$ |
| 4 | $\\pm45^\\circ,\\ \\pm135^\\circ$ |

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 505" class="nx-fig">
  <defs><marker id="nx8d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 252.9 L498.0 252.9" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8d)"/>
  <path d="M367.1 471.7 L367.1 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8d)"/>
  <text x="490.0" y="270.9" font-size="13">&#963;</text>
  <text x="373.1" y="32.0" font-size="13">j&#969;</text>
  <path d="M81.6 249.9 L81.6 255.9" stroke="currentColor" stroke-width="1"/>
  <text x="81.6" y="267.9" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M176.7 249.9 L176.7 255.9" stroke="currentColor" stroke-width="1"/>
  <text x="176.7" y="267.9" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M271.9 249.9 L271.9 255.9" stroke="currentColor" stroke-width="1"/>
  <text x="271.9" y="267.9" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M462.2 249.9 L462.2 255.9" stroke="currentColor" stroke-width="1"/>
  <text x="462.2" y="267.9" font-size="11" text-anchor="middle" opacity=".75">2</text>
  <path d="M364.1 443.2 L370.1 443.2" stroke="currentColor" stroke-width="1"/>
  <text x="361.1" y="447.2" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M364.1 348.0 L370.1 348.0" stroke="currentColor" stroke-width="1"/>
  <text x="361.1" y="352.0" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M364.1 157.7 L370.1 157.7" stroke="currentColor" stroke-width="1"/>
  <text x="361.1" y="161.7" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M364.1 62.5 L370.1 62.5" stroke="currentColor" stroke-width="1"/>
  <text x="361.1" y="66.5" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M367.1 252.9 L365.5 252.9 L364.0 252.9 L362.5 252.9 L360.9 252.9 L359.4 252.9 L357.8 252.9 L356.2 252.9 L354.5 252.9 L352.9 252.9 L351.3 252.9 L349.6 252.9 L347.9 252.9 L346.2 252.9 L344.7 252.9 L343.0 252.9 L341.4 252.9 L339.7 252.9 L337.5 252.9 L335.7 252.9 L333.2 252.9 L331.7 252.9 L330.2 252.9 L328.7 252.9 L326.9 252.9 L326.8 251.3 L326.9 249.8 L326.9 248.3 L326.9 246.8 L327.0 245.1 L327.1 242.8 L327.3 240.8 L327.4 239.1 L327.5 237.6 L327.7 235.5 L327.9 233.6 L328.2 231.9 L328.4 230.2 L328.6 228.6 L328.8 227.1 L329.1 225.1 L329.4 223.2 L329.8 221.4 L330.1 219.6 L330.4 217.9 L330.8 216.2 L331.1 214.5 L331.5 212.8 L331.9 211.1 L332.3 209.5 L332.7 207.9 L333.1 206.3 L333.5 204.7 L333.9 203.1 L334.3 201.5 L334.8 199.9 L335.2 198.3 L335.7 196.7 L336.2 195.1 L336.7 193.4 L337.2 191.8 L337.7 190.2 L338.2 188.6 L338.7 187.0 L339.3 185.3 L339.8 183.7 L340.4 182.0 L341.0 180.4 L341.5 178.7 L342.1 177.0 L342.8 175.3 L343.4 173.6 L344.0 171.9 L344.7 170.2 L345.3 168.4 L346.0 166.7 L346.7 164.9 L347.4 163.1 L348.1 161.3 L348.9 159.5 L349.6 157.7 L350.4 155.8 L350.9 154.5 L351.5 153.0 L352.1 151.6 L352.7 150.2 L353.3 148.8 L353.9 147.3 L354.6 145.9 L355.2 144.4 L355.8 142.9 L356.5 141.4 L357.2 139.9 L357.8 138.4 L358.5 136.9 L359.2 135.4 L359.9 133.8 L360.6 132.3 L361.3 130.7 L362.0 129.1 L362.7 127.5 L363.5 125.9 L364.2 124.3 L365.0 122.7 L365.8 121.0 L366.5 119.4 L367.3 117.7 L368.1 116.0 L368.9 114.3 L369.8 112.6 L370.6 110.9 L371.4 109.1 L372.3 107.4 L373.1 105.6 L374.0 103.8 L374.9 102.0 L375.8 100.2 L376.7 98.3 L377.6 96.5 L378.5 94.6 L379.4 92.7 L380.4 90.8 L381.3 88.9 L382.3 87.0 L383.3 85.0 L384.3 83.1 L385.3 81.1 L386.3 79.1 L387.0 77.7 L387.6 76.4 L388.3 75.0 L389.0 73.7 L389.7 72.3 L390.4 70.9 L391.2 69.5 L391.9 68.1 L392.6 66.7 L393.3 65.3 L394.1 63.9 L394.8 62.4 L395.6 61.0 L396.3 59.5 L397.1 58.1 L397.8 56.6 L398.6 55.1 L399.4 53.6 L400.2 52.1 L400.9 50.6 L401.7 49.1 L402.5 47.6 L403.3 46.0 L404.1 44.5 L405.0 42.9 L405.8 41.4 L406.6 39.8 L407.4 38.2 L408.3 36.6 L409.1 35.0 L410.0 33.4 L410.8 31.8 L411.7 30.2 L412.6 28.5 L413.5 26.9 L414.4 25.2 L414.4 25.2" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(346.0 166.7) rotate(-68.7)"/>
  <path d="M271.9 252.9 L273.4 252.9 L274.9 252.9 L276.4 252.9 L277.9 252.9 L279.5 252.9 L281.0 252.9 L282.5 252.9 L284.1 252.9 L285.7 252.9 L287.3 252.9 L288.9 252.9 L290.4 252.9 L292.1 252.9 L293.8 252.9 L295.4 252.9 L297.1 252.9 L298.6 252.9 L300.4 252.9 L302.2 252.9 L303.9 252.9 L305.8 252.9 L307.3 252.9 L308.9 252.9 L310.8 252.9 L312.9 252.9 L314.5 252.9 L316.4 252.9 L318.7 252.9 L320.4 252.9 L321.9 252.9 L323.4 252.9 L324.9 252.9 L326.8 252.9 L326.8 254.4 L326.9 255.9 L326.9 257.5 L326.9 259.0 L327.0 260.6 L327.1 263.0 L327.3 264.9 L327.4 266.6 L327.5 268.1 L327.7 270.2 L327.9 272.1 L328.2 273.9 L328.4 275.5 L328.6 277.1 L328.8 278.7 L329.1 280.6 L329.4 282.5 L329.8 284.3 L330.1 286.1 L330.4 287.9 L330.8 289.6 L331.1 291.3 L331.5 292.9 L331.9 294.6 L332.3 296.2 L332.7 297.8 L333.1 299.5 L333.5 301.1 L333.9 302.7 L334.3 304.3 L334.8 305.9 L335.2 307.5 L335.7 309.1 L336.2 310.7 L336.7 312.3 L337.2 313.9 L337.7 315.5 L338.2 317.1 L338.7 318.8 L339.3 320.4 L339.8 322.0 L340.4 323.7 L341.0 325.3 L341.5 327.0 L342.1 328.7 L342.8 330.4 L343.4 332.1 L344.0 333.8 L344.7 335.5 L345.3 337.3 L346.0 339.0 L346.7 340.8 L347.4 342.6 L348.1 344.4 L348.9 346.2 L349.6 348.0 L350.4 349.9 L350.9 351.3 L351.5 352.7 L352.1 354.1 L352.7 355.5 L353.3 357.0 L353.9 358.4 L354.6 359.9 L355.2 361.3 L355.8 362.8 L356.5 364.3 L357.2 365.8 L357.8 367.3 L358.5 368.8 L359.2 370.4 L359.9 371.9 L360.6 373.5 L361.3 375.0 L362.0 376.6 L362.7 378.2 L363.5 379.8 L364.2 381.4 L365.0 383.1 L365.8 384.7 L366.5 386.4 L367.3 388.0 L368.1 389.7 L368.9 391.4 L369.8 393.1 L370.6 394.9 L371.4 396.6 L372.3 398.4 L373.1 400.1 L374.0 401.9 L374.9 403.7 L375.8 405.6 L376.7 407.4 L377.6 409.2 L378.5 411.1 L379.4 413.0 L380.4 414.9 L381.3 416.8 L382.3 418.7 L383.3 420.7 L384.3 422.6 L385.3 424.6 L386.3 426.6 L387.0 428.0 L387.6 429.3 L388.3 430.7 L389.0 432.1 L389.7 433.4 L390.4 434.8 L391.2 436.2 L391.9 437.6 L392.6 439.0 L393.3 440.4 L394.1 441.9 L394.8 443.3 L395.6 444.7 L396.3 446.2 L397.1 447.7 L397.8 449.1 L398.6 450.6 L399.4 452.1 L400.2 453.6 L400.9 455.1 L401.7 456.6 L402.5 458.1 L403.3 459.7 L404.1 461.2 L405.0 462.8 L405.8 464.3 L406.6 465.9 L407.4 467.5 L408.3 469.1 L409.1 470.7 L410.0 472.3 L410.8 473.9 L411.7 475.6 L412.6 477.2 L413.5 478.9 L414.4 480.5 L414.4 480.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(343.4 332.1) rotate(69.6)"/>
  <path d="M176.7 252.9 L175.2 252.9 L173.7 252.9 L172.2 252.9 L170.6 252.9 L169.1 252.9 L167.6 252.9 L166.0 252.9 L164.4 252.9 L162.9 252.9 L161.3 252.9 L159.7 252.9 L158.1 252.9 L156.5 252.9 L154.8 252.9 L153.2 252.9 L151.5 252.9 L150.0 252.9 L148.3 252.9 L146.8 252.9 L145.2 252.9 L143.6 252.9 L141.9 252.9 L140.3 252.9 L138.8 252.9 L137.2 252.9 L135.5 252.9 L133.8 252.9 L132.0 252.9 L130.5 252.9 L128.9 252.9 L127.3 252.9 L125.7 252.9 L124.0 252.9 L122.3 252.9 L120.5 252.9 L118.7 252.9 L116.9 252.9 L115.4 252.9 L113.8 252.9 L112.3 252.9 L110.7 252.9 L109.0 252.9 L107.4 252.9 L105.7 252.9 L104.0 252.9 L102.3 252.9 L100.5 252.9 L98.7 252.9 L96.9 252.9 L95.0 252.9 L93.1 252.9 L91.2 252.9 L89.2 252.9 L87.2 252.9 L85.7 252.9 L84.1 252.9 L82.6 252.9 L81.0 252.9 L79.4 252.9 L77.8 252.9 L76.2 252.9 L74.5 252.9 L72.8 252.9 L71.1 252.9 L69.4 252.9 L67.7 252.9 L65.9 252.9 L64.1 252.9 L62.3 252.9 L60.5 252.9 L58.7 252.9 L56.8 252.9 L54.9 252.9 L53.0 252.9 L51.1 252.9 L49.1 252.9 L47.2 252.9 L45.2 252.9 L43.1 252.9 L41.1 252.9 L39.0 252.9 L36.9 252.9 L34.8 252.9 L32.6 252.9 L30.5 252.9 L28.3 252.9 L26.1 252.9 L24.6 252.9" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(107.4 252.9) rotate(-180.0)"/>
  <path d="M271.9 252.9 L438.4 -35.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <path d="M271.9 252.9 L-61.2 252.9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <path d="M271.9 252.9 L438.4 541.3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <path d="M361.1 246.9 L373.1 258.9 M373.1 246.9 L361.1 258.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M265.9 246.9 L277.9 258.9 M277.9 246.9 L265.9 258.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M170.7 246.9 L182.7 258.9 M182.7 246.9 L170.7 258.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="271.9" cy="252.9" r="3.5" fill="currentColor" stroke="none"/>
  <text x="265.9" y="242.9" font-size="11" text-anchor="end">σ<tspan dy="3" font-size="9">a</tspan><tspan dy="-3"> = −2</tspan></text>
  <circle cx="367.1" cy="118.3" r="4" fill="currentColor" stroke="none"/>
  <circle cx="367.1" cy="387.4" r="4" fill="currentColor" stroke="none"/>
  <text x="375.1" y="122.3" font-size="11" text-anchor="start">j2.83, K = 48</text>
  <circle cx="326.8" cy="252.9" r="3.5" fill="currentColor" stroke="none"/>
  <text x="328.8" y="270.9" font-size="11" text-anchor="middle">−0.845</text>
</svg>
<figcaption>K/[s(s+2)(s+4)]. Three poles and no zeros give three asymptotes at 60°, 180° and 300° from σa = −2. The pair breaks away at −0.845 and crosses the jω axis at ±j2.83 when K = 48.</figcaption>
</figure>

### Two consequences

- **$n-m\\ge3$ means instability at high gain.** The $\\pm60^\\circ$ asymptotes point into the right
  half-plane, so some finite gain drives a pair across the axis. Every loop with three more poles
  than zeros has an upper gain limit.
- **$n-m\\le2$ with $\\sigma_{a}<0$ never crosses through the asymptotes.** The $\\pm90^\\circ$ lines
  stay at $\\sigma_{a}$. Such a loop can still be unstable elsewhere (8-05, 8-21), but not because of
  where its branches go at infinity.
`
    },
    {
      title: "8.5: Breakaway and break-in points",
      sec: "8.5",
      example: "8-12",
      body: `
Where two branches meet on the real axis and leave it, the point is a **breakaway point**; where they
come back to it, a **break-in point**.

Along a real-axis segment the gain is a function of position. Between two open-loop poles it rises
from $0$ at each pole, so it peaks in between: the **breakaway point is a local maximum of $K$**.
Between two zeros it falls from $\\infty$ at each zero, so the **break-in point is a local minimum
of $K$**.

### Method 1: differentiate

On the real axis $s=\\sigma$, and the magnitude criterion gives

$$K=-\\frac{1}{G(\\sigma)H(\\sigma)}$$

Set $dK/d\\sigma=0$ and keep the roots that lie on a real-axis segment.

### Method 2: the transition equation

The same condition, without differentiating:

$$\\sum_{i=1}^{m}\\frac{1}{\\sigma+z_{i}}=\\sum_{j=1}^{n}\\frac{1}{\\sigma+p_{j}}$$

where $z_{i}$ and $p_{j}$ are the **negatives** of the zero and pole values, so a pole at $-4$
contributes $\\dfrac{1}{\\sigma+4}$. With no finite zeros the left side is $0$.

For $\\dfrac{K}{s(s+2)(s+4)}$:

$$\\frac1\\sigma+\\frac{1}{\\sigma+2}+\\frac{1}{\\sigma+4}=0\\qquad\\Longrightarrow\\qquad3\\sigma^{2}+12\\sigma+8=0$$

$$\\sigma=-2\\pm\\frac{2}{\\sqrt3}=-0.845,\\ -3.155$$

Only $-0.845$ lies on a real-axis segment, between $0$ and $-2$. The other root is on no segment
of the $K>0$ locus and is discarded (8-12).

### The geometry at the point

The branches meet the real axis at $180^\\circ/n$, where $n$ is the number of branches arriving or
leaving. Two branches leave perpendicular to the axis.
`
    },
    {
      title: "8.5: Crossing the jω axis",
      sec: "8.5",
      example: "8-14",
      body: `
A $j\\omega$ crossing is where a branch passes between stable and unstable. Its gain is a boundary of
the stable range and its $\\omega$ is the frequency the system oscillates at there. Chapter 6 already
computes both.

1. Write the closed-loop characteristic polynomial with $K$ in it.
2. Build the Routh table and find the $K$ that makes a row zero.
3. Form the even polynomial from the row above; its roots are $\\pm j\\omega$.

For $s^{3}+6s^{2}+8s+K$: the $s^{1}$ entry is $(48-K)/6$, so $K=48$, and $6s^{2}+48=0$ gives
$\\omega=2\\sqrt2\\approx2.83$ rad/s.

The second method is the angle criterion applied on the axis itself: search $s=j\\omega$ for the
point where the angles add to $(2k+1)180^\\circ$. For poles only on the real axis this is a sum of
arctangents, often solvable by hand (8-19).

### The direction of the crossing

Most loops are stable at low gain and lose stability at the crossing. Loops with open-loop poles in
the right half-plane can do the opposite: their branches **start** on the right and cross into the
left half-plane as the gain rises, so they are unstable below the crossing gain and stable above it
(8-05, 8-21).
`
    },
    {
      title: "8.5: Angles of departure and arrival",
      sec: "8.5",
      example: "8-16",
      body: `
A branch leaves a complex open-loop pole in a definite direction, and that direction decides the
shape near the pole. Apply the angle criterion to a point a distance $\\epsilon$ from the pole. Every
other vector can be drawn to the pole itself, so the only unknown is the angle of the vector from
the pole, which is the departure angle:

$$\\theta_{\\text{dep}}=\\sum\\text{zero angles}-\\sum\\text{other pole angles}-180^\\circ\\pmod{360^\\circ}$$

and for a complex zero,

$$\\theta_{\\text{arr}}=\\sum\\text{pole angles}-\\sum\\text{other zero angles}+180^\\circ\\pmod{360^\\circ}$$

with every other angle measured **to** the complex pole or zero in question.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 518" class="nx-fig">
  <defs><marker id="nx8e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 259.4 L438.0 259.4" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8e)"/>
  <path d="M328.0 484.8 L328.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8e)"/>
  <text x="430.0" y="277.4" font-size="13">&#963;</text>
  <text x="334.0" y="32.0" font-size="13">j&#969;</text>
  <path d="M83.0 256.4 L83.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="83.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M132.0 256.4 L132.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="132.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M181.0 256.4 L181.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="181.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M230.0 256.4 L230.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="230.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M279.0 256.4 L279.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="279.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M377.0 256.4 L377.0 262.4" stroke="currentColor" stroke-width="1"/>
  <text x="377.0" y="274.4" font-size="11" text-anchor="middle" opacity=".75">1</text>
  <path d="M325.0 455.4 L331.0 455.4" stroke="currentColor" stroke-width="1"/>
  <text x="322.0" y="459.4" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M325.0 357.4 L331.0 357.4" stroke="currentColor" stroke-width="1"/>
  <text x="322.0" y="361.4" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M325.0 161.4 L331.0 161.4" stroke="currentColor" stroke-width="1"/>
  <text x="322.0" y="165.4" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M325.0 63.4 L331.0 63.4" stroke="currentColor" stroke-width="1"/>
  <text x="322.0" y="67.4" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M279.0 259.4 L277.5 259.4 L276.0 259.4 L274.4 259.4 L272.9 259.4 L271.3 259.4 L269.8 259.4 L268.2 259.4 L266.6 259.4 L265.0 259.4 L263.4 259.4 L261.8 259.4 L260.2 259.4 L258.6 259.4 L257.0 259.4 L255.4 259.4 L253.8 259.4 L252.0 259.4 L250.5 259.4 L248.8 259.4 L247.1 259.4 L245.2 259.4 L243.7 259.4 L242.1 259.4 L240.5 259.4 L238.8 259.4 L237.0 259.4 L235.2 259.4 L233.4 259.4 L231.5 259.4 L229.5 259.4 L227.6 259.4 L226.1 259.4 L224.5 259.4 L223.0 259.4 L221.4 259.4 L219.9 259.4 L218.3 259.4 L216.7 259.4 L215.1 259.4 L213.5 259.4 L211.9 259.4 L210.3 259.4 L208.7 259.4 L207.1 259.4 L205.4 259.4 L203.8 259.4 L202.2 259.4 L200.6 259.4 L199.0 259.4 L197.3 259.4 L195.7 259.4 L194.1 259.4 L192.5 259.4 L190.8 259.4 L189.2 259.4 L187.6 259.4 L186.0 259.4 L184.3 259.4 L182.7 259.4 L181.1 259.4 L179.5 259.4 L177.8 259.4 L176.2 259.4 L174.6 259.4 L172.9 259.4 L171.3 259.4 L169.7 259.4 L168.0 259.4 L166.4 259.4 L164.8 259.4 L163.1 259.4 L161.5 259.4 L159.8 259.4 L158.2 259.4 L156.5 259.4 L154.8 259.4 L153.2 259.4 L151.5 259.4 L149.8 259.4 L148.1 259.4 L146.4 259.4 L144.7 259.4 L143.0 259.4 L141.3 259.4 L139.6 259.4 L137.9 259.4 L136.2 259.4 L134.4 259.4 L132.7 259.4 L130.9 259.4 L129.1 259.4 L127.4 259.4 L125.6 259.4 L123.8 259.4 L122.0 259.4 L120.2 259.4 L118.4 259.4 L116.5 259.4 L114.7 259.4 L112.8 259.4 L111.0 259.4 L109.1 259.4 L107.2 259.4 L105.3 259.4 L103.4 259.4 L101.5 259.4 L99.5 259.4 L97.6 259.4 L95.6 259.4 L93.7 259.4 L91.7 259.4 L89.7 259.4 L87.7 259.4 L85.6 259.4 L83.6 259.4 L81.5 259.4 L79.5 259.4 L77.4 259.4 L75.3 259.4 L73.1 259.4 L71.0 259.4 L68.9 259.4 L66.7 259.4 L64.5 259.4 L62.3 259.4 L60.1 259.4 L57.8 259.4 L56.3 259.4 L54.8 259.4 L53.3 259.4 L51.8 259.4 L50.3 259.4 L48.7 259.4 L47.2 259.4 L45.6 259.4 L44.0 259.4 L42.5 259.4 L40.9 259.4 L39.3 259.4 L37.7 259.4 L36.1 259.4 L34.5 259.4 L32.8 259.4 L31.2 259.4 L29.6 259.4 L27.9 259.4 L26.2 259.4 L24.6 259.4 L24.6 259.4" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(163.1 259.4) rotate(-180.0)"/>
  <path d="M230.0 161.4 L231.4 162.1 L232.7 162.7 L234.2 163.2 L235.6 163.8 L237.1 164.2 L238.5 164.6 L240.1 164.9 L241.6 165.2 L243.2 165.4 L244.8 165.5 L246.3 165.6 L247.8 165.5 L249.5 165.4 L251.0 165.2 L252.6 165.0 L254.2 164.6 L255.7 164.2 L257.2 163.7 L258.8 163.1 L260.4 162.5 L261.9 161.8 L263.5 161.0 L264.9 160.2 L266.2 159.4 L267.6 158.6 L268.9 157.7 L270.3 156.8 L271.6 155.8 L273.0 154.8 L274.4 153.8 L275.7 152.7 L277.1 151.5 L278.4 150.3 L279.8 149.1 L281.1 147.9 L282.5 146.6 L283.6 145.5 L284.7 144.5 L285.8 143.4 L286.8 142.2 L287.9 141.1 L289.0 139.9 L290.1 138.7 L291.2 137.5 L292.4 136.3 L293.5 135.0 L294.6 133.7 L295.7 132.4 L296.8 131.1 L298.0 129.8 L299.1 128.4 L300.3 127.0 L301.4 125.6 L302.6 124.1 L303.8 122.7 L304.9 121.2 L306.1 119.7 L307.3 118.1 L308.5 116.6 L309.7 115.0 L310.6 113.8 L311.5 112.6 L312.5 111.3 L313.4 110.1 L314.3 108.8 L315.3 107.6 L316.2 106.3 L317.2 105.0 L318.1 103.6 L319.1 102.3 L320.1 100.9 L321.0 99.6 L322.0 98.2 L323.0 96.8 L324.0 95.4 L325.0 94.0 L326.0 92.5 L327.0 91.1 L328.0 89.6 L329.1 88.1 L330.1 86.6 L331.2 85.1 L332.2 83.5 L333.3 82.0 L334.4 80.4 L335.4 78.8 L336.5 77.2 L337.6 75.5 L338.7 73.9 L339.8 72.2 L341.0 70.6 L342.1 68.9 L343.2 67.1 L344.4 65.4 L345.5 63.6 L346.7 61.9 L347.9 60.1 L349.1 58.3 L350.3 56.4 L351.5 54.6 L352.7 52.7 L353.5 51.4 L354.3 50.2 L355.1 48.9 L356.0 47.6 L356.8 46.3 L357.6 45.0 L358.5 43.7 L359.3 42.4 L360.2 41.0 L361.0 39.7 L361.9 38.3 L362.8 37.0 L363.6 35.6 L364.5 34.2 L365.4 32.8 L366.3 31.4 L367.2 30.0 L368.1 28.6 L369.0 27.2 L369.9 25.7 L370.8 24.3 L370.8 24.3" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(306.1 119.7) rotate(-52.2)"/>
  <path d="M230.0 357.4 L231.4 356.7 L232.7 356.1 L234.2 355.6 L235.6 355.0 L237.1 354.6 L238.5 354.2 L240.1 353.9 L241.6 353.6 L243.2 353.4 L244.8 353.3 L246.3 353.2 L247.8 353.3 L249.5 353.4 L251.0 353.6 L252.6 353.8 L254.2 354.2 L255.7 354.6 L257.2 355.1 L258.8 355.7 L260.4 356.3 L261.9 357.0 L263.5 357.8 L264.9 358.6 L266.2 359.4 L267.6 360.2 L268.9 361.1 L270.3 362.0 L271.6 363.0 L273.0 364.0 L274.4 365.0 L275.7 366.1 L277.1 367.3 L278.4 368.5 L279.8 369.7 L281.1 370.9 L282.5 372.2 L283.6 373.3 L284.7 374.3 L285.8 375.4 L286.8 376.6 L287.9 377.7 L289.0 378.9 L290.1 380.1 L291.2 381.3 L292.4 382.5 L293.5 383.8 L294.6 385.1 L295.7 386.4 L296.8 387.7 L298.0 389.0 L299.1 390.4 L300.3 391.8 L301.4 393.2 L302.6 394.7 L303.8 396.1 L304.9 397.6 L306.1 399.1 L307.3 400.7 L308.5 402.2 L309.7 403.8 L310.6 405.0 L311.5 406.2 L312.5 407.5 L313.4 408.7 L314.3 410.0 L315.3 411.2 L316.2 412.5 L317.2 413.8 L318.1 415.2 L319.1 416.5 L320.1 417.9 L321.0 419.2 L322.0 420.6 L323.0 422.0 L324.0 423.4 L325.0 424.8 L326.0 426.3 L327.0 427.7 L328.0 429.2 L329.1 430.7 L330.1 432.2 L331.2 433.7 L332.2 435.3 L333.3 436.8 L334.4 438.4 L335.4 440.0 L336.5 441.6 L337.6 443.3 L338.7 444.9 L339.8 446.6 L341.0 448.2 L342.1 449.9 L343.2 451.7 L344.4 453.4 L345.5 455.2 L346.7 456.9 L347.9 458.7 L349.1 460.5 L350.3 462.4 L351.5 464.2 L352.7 466.1 L353.5 467.4 L354.3 468.6 L355.1 469.9 L356.0 471.2 L356.8 472.5 L357.6 473.8 L358.5 475.1 L359.3 476.4 L360.2 477.8 L361.0 479.1 L361.9 480.5 L362.8 481.8 L363.6 483.2 L364.5 484.6 L365.4 486.0 L366.3 487.4 L367.2 488.8 L368.1 490.2 L369.0 491.6 L369.9 493.1 L370.8 494.5 L370.8 494.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(306.1 399.1) rotate(52.2)"/>
  <path d="M246.3 259.4 L405.6 -16.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 4" opacity=".7"/>
  <path d="M246.3 259.4 L-72.2 259.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 4" opacity=".7"/>
  <path d="M246.3 259.4 L405.6 535.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="3 4" opacity=".7"/>
  <path d="M273.0 253.4 L285.0 265.4 M285.0 253.4 L273.0 265.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M224.0 155.4 L236.0 167.4 M236.0 155.4 L224.0 167.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M224.0 351.4 L236.0 363.4 M236.0 351.4 L224.0 363.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M230.0 161.4 L300.1 196.5" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#nx8e)"/>
  <text x="222.0" y="151.4" font-size="11" text-anchor="end">−26.6°</text>
</svg>
<figcaption>K/[(s+1)(s²+4s+8)]. The angle criterion, applied a short distance from the pole at −2 + j2, gives a departure angle of −26.6°: the branch first heads down and to the right before it bends toward the 60° asymptote.</figcaption>
</figure>

For $\\dfrac{K}{(s+1)(s^{2}+4s+8)}$ at the pole $-2+j2$: the pole at $-1$ contributes $116.57^\\circ$
and the conjugate pole contributes $90^\\circ$, so

$$\\theta_{\\text{dep}}=-116.57^\\circ-90^\\circ-180^\\circ=-386.57^\\circ\\equiv-26.57^\\circ$$

The upper branch first moves down and to the right, then turns toward its $60^\\circ$ asymptote.
Without the departure angle the natural guess is that it heads straight up, and the sketch would be
wrong exactly where the poles start.

Departure and arrival angles come in conjugate pairs: the lower pole's angle is the negative of the
upper one's.
`
    },
    {
      title: "8.5: Calibrating the locus",
      sec: "8.5",
      example: "8-18",
      body: `
A sketch shows the shape. Design needs exact points: where the locus crosses a given line, and the
gain there. Nise's procedure is a search.

1. Pick the line, for example the $\\zeta=0.45$ line at $\\theta=\\cos^{-1}0.45=63.3^\\circ$ from the
   negative real axis.
2. Test points along it. The point where the angles sum to an odd multiple of $180^\\circ$ is on the
   locus.
3. Take $K$ from the magnitude criterion: product of pole lengths over product of zero lengths.

### The algebraic shortcut for low order

For a third-order characteristic polynomial the search can be replaced by algebra. Put
$s=\\omega_{n}e^{j(180^\\circ-\\cos^{-1}\\zeta)}$ into the polynomial and set the real and imaginary
parts to zero. Two equations, two unknowns, $\\omega_{n}$ and $K$.

For $s^{3}+6s^{2}+8s+K$ on the $\\zeta=0.5$ line, $s=\\omega_{n}e^{j120^\\circ}$:

$$s^{2}=\\omega_{n}^{2}e^{j240^\\circ},\\qquad s^{3}=\\omega_{n}^{3}$$

The imaginary part, $-6\\omega_{n}^{2}\\tfrac{\\sqrt3}{2}+8\\omega_{n}\\tfrac{\\sqrt3}{2}=0$, gives
$\\omega_{n}=\\tfrac43$. The real part then gives $K=\\tfrac{224}{27}\\approx8.30$. The point is
$-0.667\\pm j1.155$ (8-24).

The imaginary-part equation does not contain $K$, because $K$ enters only as a real constant term.
That is what makes the shortcut work.

### Reading the gain at any point

Once a point is on the locus, its gain needs only lengths. That also finds the **other** closed-loop
poles: search the remaining branches for points with the same gain. For a cubic it is simpler still:
the closed-loop poles sum to minus the $s^{2}$ coefficient, so the third pole is that coefficient's
negative minus the pair's sum.
`
    },
    {
      title: "8.6: The whole procedure on one system",
      sec: "8.6",
      example: "8-20",
      body: `
Every rule from 8.4 and 8.5, in the order they are worth applying:

1. **Plot the open-loop poles and zeros.** Write the closed-loop characteristic polynomial.
2. **Real-axis segments.** Left of an odd count.
3. **Start and end.** Poles to zeros, finite or infinite.
4. **Asymptotes**, if $n\\neq m$: $\\sigma_{a}$ and $\\theta_{a}$.
5. **Departure and arrival angles** at any complex poles or zeros.
6. **Breakaway and break-in points** on any segment where two branches must meet.
7. **$j\\omega$ crossings** by Routh: the gain range for stability and the oscillation frequency.
8. **Calibrate** the points the problem asks for: a damping-ratio line, a settling-time line, a
   given gain.

Steps 2 to 4 give the shape. Steps 5 to 7 fix it near the places where a guess goes wrong. Step 8
is the design.

### A system with zeros in the right half-plane

Zeros are where branches end, wherever the zeros are. If they are in the right half-plane, the
branches must eventually cross into it, so there is always an upper gain limit, even with as many
zeros as poles. Problem 8-20 works one through all eight steps: stable for $0<K<1$, with the
crossing at $\\pm j2.83$.
`
    },
    {
      title: "8.7: From a specification to a line in the s-plane",
      sec: "8.7",
      example: "8-30",
      body: `
Each Chapter 4 specification is a locus of its own in the $s$-plane, and design means intersecting
it with the root locus.

| Specification | Fixes | Line in the $s$-plane |
|---|---|---|
| $\\%OS$ | $\\zeta=\\dfrac{-\\ln(\\%OS/100)}{\\sqrt{\\pi^{2}+\\ln^{2}(\\%OS/100)}}$ | radial line at $\\theta=\\cos^{-1}\\zeta$ from the negative real axis |
| $T_{s}$ | $\\sigma=\\zeta\\omega_{n}=\\dfrac{4}{T_{s}}$ | vertical line at $s=-\\sigma$ |
| $T_{p}$ | $\\omega_{d}=\\dfrac{\\pi}{T_{p}}$ | horizontal line at $\\pm j\\omega_{d}$ |

A gain picks one point on each branch. A percent-overshoot specification is met where the locus
crosses the radial line; a settling-time or peak-time specification where it crosses the vertical
or horizontal line. With only $K$ to adjust, one specification can be met at a time, and the others
are whatever that point gives.
`
    },
    {
      title: "8.7: Gain design and the second-order approximation",
      sec: "8.7",
      example: "8-24",
      body: `
The percent-overshoot and settling-time formulas were derived for two complex poles and no zeros.
A higher-order loop meets them only approximately, and Nise states when the approximation holds:

1. **The other closed-loop poles are much farther left** than the dominant pair. The text uses a
   factor of five in real part.
2. **Closed-loop zeros near the dominant pair are nearly cancelled** by a nearby closed-loop pole.
3. **Closed-loop zeros that are not cancelled are far from the dominant pair.**

For unity feedback the closed-loop zeros are the open-loop zeros, so the zeros of $G$ are always in
the response.

### The procedure

1. Sketch the root locus.
2. Assume a second-order system with no zeros, and find the gain where the locus crosses the line
   for the specification.
3. Find **all** the other closed-loop poles at that gain, and check the three conditions.
4. If they fail, simulate. Nise recommends simulating anyway.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 429" class="nx-fig">
  <defs><marker id="nx8f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 214.8 L498.0 214.8" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8f)"/>
  <path d="M416.5 395.6 L416.5 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8f)"/>
  <text x="490.0" y="232.8" font-size="13">&#963;</text>
  <text x="422.5" y="32.0" font-size="13">j&#969;</text>
  <path d="M68.8 211.8 L68.8 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="68.8" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M138.3 211.8 L138.3 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="138.3" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M207.8 211.8 L207.8 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="207.8" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M277.4 211.8 L277.4 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="277.4" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M346.9 211.8 L346.9 217.8" stroke="currentColor" stroke-width="1"/>
  <text x="346.9" y="229.8" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M413.5 353.9 L419.5 353.9" stroke="currentColor" stroke-width="1"/>
  <text x="410.5" y="357.9" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M413.5 284.3 L419.5 284.3" stroke="currentColor" stroke-width="1"/>
  <text x="410.5" y="288.3" font-size="11" text-anchor="end" opacity=".75">−j</text>
  <path d="M413.5 145.3 L419.5 145.3" stroke="currentColor" stroke-width="1"/>
  <text x="410.5" y="149.3" font-size="11" text-anchor="end" opacity=".75">j</text>
  <path d="M413.5 75.7 L419.5 75.7" stroke="currentColor" stroke-width="1"/>
  <text x="410.5" y="79.7" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M416.5 214.8 L415.0 214.8 L413.4 214.8 L411.9 214.8 L410.4 214.8 L408.8 214.8 L407.3 214.8 L405.8 214.8 L404.3 214.8 L402.7 214.8 L401.2 214.8 L399.5 214.8 L397.9 214.8 L396.3 214.8 L394.8 214.8 L393.0 214.8 L391.5 214.8 L389.7 214.8 L388.2 214.8 L386.4 214.8 L384.5 214.8 L382.9 214.8 L381.2 214.8 L379.2 214.8 L376.9 214.8 L375.2 214.8 L373.2 214.8 L370.8 214.8 L367.8 214.8 L366.3 214.8 L364.8 214.8 L363.3 214.8 L361.7 214.8 L360.2 214.8 L358.6 214.8 L357.7 213.5 L357.7 211.9 L357.7 210.4 L357.8 208.9 L357.8 207.4 L357.8 205.9 L357.9 203.5 L358.0 201.9 L358.2 199.0 L358.4 196.6 L358.5 194.5 L358.7 192.5 L358.9 190.6 L359.1 188.9 L359.2 187.2 L359.4 185.6 L359.6 184.1 L359.9 181.9 L360.2 179.8 L360.5 177.8 L360.8 175.9 L361.1 174.0 L361.4 172.1 L361.7 170.3 L362.0 168.5 L362.3 166.8 L362.7 165.0 L363.0 163.3 L363.3 161.7 L363.7 160.0 L364.0 158.4 L364.4 156.7 L364.8 155.1 L365.1 153.5 L365.5 151.9 L365.9 150.3 L366.3 148.7 L366.7 147.1 L367.1 145.5 L367.5 144.0 L367.9 142.4 L368.3 140.8 L368.8 139.2 L369.2 137.7 L369.6 136.1 L370.1 134.5 L370.5 133.0 L371.0 131.4 L371.5 129.8 L372.0 128.3 L372.4 126.7 L372.9 125.1 L373.4 123.5 L373.9 121.9 L374.4 120.3 L375.0 118.7 L375.5 117.1 L376.0 115.5 L376.6 113.9 L377.1 112.3 L377.7 110.7 L378.3 109.1 L378.8 107.4 L379.4 105.8 L380.0 104.1 L380.6 102.5 L381.2 100.8 L381.8 99.1 L382.4 97.5 L383.1 95.8 L383.7 94.1 L384.4 92.4 L385.0 90.7 L385.7 88.9 L386.4 87.2 L387.0 85.5 L387.7 83.7 L388.4 82.0 L389.1 80.2 L389.9 78.4 L390.6 76.6 L391.3 74.8 L392.1 73.0 L392.8 71.2 L393.6 69.3 L394.3 67.5 L395.1 65.6 L395.9 63.8 L396.7 61.9 L397.5 60.0 L398.4 58.1 L399.2 56.2 L400.0 54.2 L400.9 52.3 L401.7 50.3 L402.6 48.4 L403.5 46.4 L404.4 44.4 L405.3 42.4 L406.2 40.4 L407.1 38.3 L407.7 37.0 L408.4 35.6 L409.0 34.2 L409.6 32.8 L410.3 31.4 L410.9 30.0 L411.6 28.6 L412.2 27.2 L412.9 25.8 L413.5 24.4 L414.2 22.9 L414.9 21.5 L415.2 20.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(364.8 155.1) rotate(-77.0)"/>
  <path d="M277.4 214.8 L278.9 214.8 L280.4 214.8 L281.9 214.8 L283.5 214.8 L285.0 214.8 L286.6 214.8 L288.1 214.8 L289.7 214.8 L291.3 214.8 L292.9 214.8 L294.4 214.8 L295.9 214.8 L297.6 214.8 L299.2 214.8 L300.7 214.8 L302.3 214.8 L303.8 214.8 L305.5 214.8 L307.2 214.8 L308.7 214.8 L310.4 214.8 L312.1 214.8 L314.0 214.8 L315.6 214.8 L317.3 214.8 L319.2 214.8 L321.1 214.8 L322.7 214.8 L324.4 214.8 L326.1 214.8 L328.0 214.8 L330.1 214.8 L332.4 214.8 L334.0 214.8 L335.8 214.8 L337.7 214.8 L339.9 214.8 L342.4 214.8 L345.3 214.8 L347.1 214.8 L348.6 214.8 L350.1 214.8 L351.7 214.8 L353.2 214.8 L354.7 214.8 L356.4 214.8 L357.7 215.7 L357.7 217.3 L357.7 218.8 L357.7 220.3 L357.8 221.8 L357.8 223.3 L357.9 226.1 L358.0 227.7 L358.2 230.6 L358.4 233.0 L358.5 235.1 L358.7 237.1 L358.9 239.0 L359.1 240.7 L359.2 242.4 L359.4 244.0 L359.6 245.5 L359.9 247.7 L360.2 249.8 L360.5 251.8 L360.8 253.7 L361.1 255.6 L361.4 257.5 L361.7 259.3 L362.0 261.1 L362.3 262.8 L362.7 264.6 L363.0 266.3 L363.3 267.9 L363.7 269.6 L364.0 271.2 L364.4 272.9 L364.8 274.5 L365.1 276.1 L365.5 277.7 L365.9 279.3 L366.3 280.9 L366.7 282.5 L367.1 284.1 L367.5 285.6 L367.9 287.2 L368.3 288.8 L368.8 290.4 L369.2 291.9 L369.6 293.5 L370.1 295.1 L370.5 296.6 L371.0 298.2 L371.5 299.8 L372.0 301.3 L372.4 302.9 L372.9 304.5 L373.4 306.1 L373.9 307.7 L374.4 309.3 L375.0 310.9 L375.5 312.5 L376.0 314.1 L376.6 315.7 L377.1 317.3 L377.7 318.9 L378.3 320.5 L378.8 322.2 L379.4 323.8 L380.0 325.5 L380.6 327.1 L381.2 328.8 L381.8 330.5 L382.4 332.1 L383.1 333.8 L383.7 335.5 L384.4 337.2 L385.0 338.9 L385.7 340.7 L386.4 342.4 L387.0 344.1 L387.7 345.9 L388.4 347.6 L389.1 349.4 L389.9 351.2 L390.6 353.0 L391.3 354.8 L392.1 356.6 L392.8 358.4 L393.6 360.3 L394.3 362.1 L395.1 364.0 L395.9 365.8 L396.7 367.7 L397.5 369.6 L398.4 371.5 L399.2 373.4 L400.0 375.4 L400.9 377.3 L401.7 379.3 L402.6 381.2 L403.5 383.2 L404.4 385.2 L405.3 387.2 L406.2 389.2 L407.1 391.3 L407.7 392.6 L408.4 394.0 L409.0 395.4 L409.6 396.8 L410.3 398.2 L410.9 399.6 L411.6 401.0 L412.2 402.4 L412.9 403.8 L413.5 405.2 L414.2 406.7 L414.9 408.1 L415.2 408.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(362.3 262.8) rotate(79.2)"/>
  <path d="M138.3 214.8 L136.8 214.8 L135.3 214.8 L133.7 214.8 L132.2 214.8 L130.7 214.8 L129.2 214.8 L127.6 214.8 L126.0 214.8 L124.5 214.8 L122.9 214.8 L121.4 214.8 L119.8 214.8 L118.2 214.8 L116.7 214.8 L115.1 214.8 L113.5 214.8 L111.8 214.8 L110.2 214.8 L108.6 214.8 L107.0 214.8 L105.5 214.8 L103.8 214.8 L102.1 214.8 L100.6 214.8 L99.0 214.8 L97.4 214.8 L95.8 214.8 L94.0 214.8 L92.3 214.8 L90.8 214.8 L89.2 214.8 L87.6 214.8 L86.0 214.8 L84.3 214.8 L82.6 214.8 L80.8 214.8 L79.0 214.8 L77.2 214.8 L75.6 214.8 L74.1 214.8 L72.6 214.8 L71.0 214.8 L69.3 214.8 L67.7 214.8 L66.0 214.8 L64.3 214.8 L62.6 214.8 L60.8 214.8 L59.0 214.8 L57.2 214.8 L55.3 214.8 L53.4 214.8 L51.5 214.8 L49.5 214.8 L47.5 214.8 L46.0 214.8 L44.5 214.8 L42.9 214.8 L41.4 214.8 L39.8 214.8 L38.2 214.8 L36.5 214.8 L34.9 214.8 L33.2 214.8 L31.5 214.8 L29.8 214.8 L28.1 214.8 L26.4 214.8 L24.6 214.8 L22.8 214.8 L21.0 214.8 L20.4 214.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(84.3 214.8) rotate(-180.0)"/>
  <path d="M416.5 214.8 L312.2 34.1" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <path d="M416.5 214.8 L312.2 395.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <path d="M410.5 208.8 L422.5 220.8 M422.5 208.8 L410.5 220.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M271.4 208.8 L283.4 220.8 M283.4 208.8 L271.4 220.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M132.3 208.8 L144.3 220.8 M144.3 208.8 L132.3 220.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <rect x="365.6" y="130.0" width="9" height="9" fill="currentColor" stroke="none"/>
  <rect x="365.6" y="290.6" width="9" height="9" fill="currentColor" stroke="none"/>
  <rect x="87.4" y="210.3" width="9" height="9" fill="currentColor" stroke="none"/>
  <text x="380.1" y="130.5" font-size="11" text-anchor="start">−0.667 + j1.155</text>
  <text x="91.9" y="204.8" font-size="11" text-anchor="middle">−4.67</text>
  <text x="320.1" y="58.3" font-size="11" text-anchor="end">ζ = 0.5</text>
</svg>
<figcaption>Gain design on K/[s(s+2)(s+4)]. The ζ = 0.5 line (dashed) meets the locus at −0.667 ± j1.155 when K = 8.30. The third closed-loop pole (square) sits at −4.67, seven times farther from the axis, so the second-order estimates hold.</figcaption>
</figure>

For $\\dfrac{K}{s(s+2)(s+4)}$ and $\\%OS=16.3\\%$ ($\\zeta=0.5$), the gain is $8.30$, the third pole is
at $-4.67$, seven times farther from the axis than the pair, and there are no zeros. The estimates,
$\\%OS=16.3\\%$ and $T_{s}=6$ s, are close to the simulated $15.5\\%$ and $6.2$ s.

### When the check fails

A crossing can satisfy the specification on paper and miss it badly. Problem 8-27 has three
crossings of the same $\\zeta=0.8$ line ($1.5\\%$ overshoot predicted). One of them gives about
$1.7\\%$; the other two give $13\\%$ and $15\\%$, because an uncancelled zero sits near the dominant
pair. Problem 8-29 is the extreme case: a closed-loop zero with the same real part as the poles
turns a predicted $16\\%$ into $70\\%$.
`
    },
    {
      title: "8.7: What gain adjustment cannot do",
      sec: "8.7",
      example: "8-28",
      body: `
Gain moves the poles along fixed paths. Anything that is not on those paths is out of reach.

- **A settling time faster than the locus allows.** For $\\dfrac{K}{s(s+2)(s+4)}$ the dominant
  pair's real part is never more negative than $-0.845$, its breakaway point, so no gain gives
  $T_{s}=2$ s (8-25).
- **Two specifications at once.** One gain picks one point. If the point that meets the overshoot
  specification has too small a $K_{v}$, raising the gain improves $K_{v}$ and spoils the overshoot
  (8-28).
- **A transient specification above the stability limit.** The crossing of the $\\zeta$ line must
  come before the $j\\omega$ crossing along the branch.

Each of these is a statement that the root locus itself must be moved, which means adding poles
and zeros to the loop. That is compensation, and it is Chapter 9.
`
    },
  ],

  formulas: [
    { latex: `T(s)=\\frac{KN_{G}D_{H}}{D_{G}D_{H}+KN_{G}N_{H}}`,
      note: `Closed-loop zeros are the zeros of G and the poles of H. Closed-loop poles change with K.` },
    { latex: `M=\\frac{\\prod\\text{zero lengths}}{\\prod\\text{pole lengths}},\\qquad \\theta=\\sum\\text{zero angles}-\\sum\\text{pole angles}`,
      note: `Value of a rational function at a point, from vectors drawn from each pole and zero to the point.` },
    { latex: `\\angle G(s)H(s)=(2k+1)180^\\circ`,
      note: `Angle criterion. Decides whether a point is on the root locus, for some positive K.` },
    { latex: `K=\\frac{1}{|G(s)H(s)|}=\\frac{\\prod\\text{pole lengths}}{\\prod\\text{zero lengths}}`,
      note: `Magnitude criterion. The gain that puts a closed-loop pole at a point already on the locus.` },
    { latex: `\\text{branches}=\\text{order of the characteristic polynomial}`,
      note: `Rule 1. The locus is also symmetric about the real axis (rule 2).` },
    { latex: `\\text{real axis: left of an odd number of real finite poles and zeros}`,
      note: `Rule 3, for K > 0. Complex poles and zeros do not count.` },
    { latex: `K=0:\\ \\text{open-loop poles}\\qquad K\\to\\infty:\\ \\text{open-loop zeros}`,
      note: `Rule 4, counting zeros at infinity: there are n − m of them.` },
    { latex: `\\sigma_{a}=\\frac{\\sum\\text{finite poles}-\\sum\\text{finite zeros}}{n-m},\\qquad \\theta_{a}=\\frac{(2k+1)\\pi}{n-m}`,
      note: `Rule 5. Asymptotes for the branches that go to infinity. Use the pole and zero values with their signs.` },
    { latex: `\\sum_{i}\\frac{1}{\\sigma+z_{i}}=\\sum_{j}\\frac{1}{\\sigma+p_{j}}`,
      note: `Breakaway and break-in points; z and p are the negatives of the zero and pole values. Keep only roots on a real-axis segment.` },
    { latex: `\\frac{dK}{d\\sigma}=0,\\qquad K=-\\frac{1}{G(\\sigma)H(\\sigma)}`,
      note: `Same points by differentiation: maximum gain at breakaway, minimum at break-in.` },
    { latex: `\\text{Routh row of zeros}\\ \\Rightarrow\\ K,\\qquad P(s)=0\\ \\Rightarrow\\ \\pm j\\omega`,
      note: `jω-axis crossing: the stability boundary and the frequency of oscillation there.` },
    { latex: `\\theta_{\\text{dep}}=\\sum\\angle\\text{zeros}-\\sum\\angle\\text{other poles}-180^\\circ`,
      note: `Departure angle from a complex pole, all angles drawn to that pole. Arrival at a complex zero: sum of pole angles minus other zero angles plus 180 degrees.` },
    { latex: `\\theta=\\cos^{-1}\\zeta,\\qquad \\sigma=\\frac{4}{T_{s}},\\qquad \\omega_{d}=\\frac{\\pi}{T_{p}}`,
      note: `Specifications as lines: radial for %OS, vertical for settling time, horizontal for peak time.` },
    { latex: `\\text{third pole}\\ \\gtrsim5\\times\\ \\text{dominant real part}`,
      note: `Second-order approximation check, plus: zeros near the dominant pair must be cancelled by a nearby pole, or be far away.` },
  ],

  problems: [
    {
      id: "8-01", difficulty: "warmup", topic: "Vector evaluation", sec: "8.1",
      prompt: `Evaluate

$$F(s)=\\frac{s+2}{s(s+4)}$$

at $s=-2+j2$, first with vectors drawn from the poles and zero, then by direct substitution.`,
      hint: `Draw each vector from its pole or zero to the point. The zero is directly below the point.`,
      answer: `$F(-2+j2)=0.25\\angle-90^\\circ=-j0.25$.`,
      expert: `
**First glance:** the point sits directly above the zero and symmetrically between the two poles,
so every vector has a clean angle: $90^\\circ$, $135^\\circ$, $45^\\circ$.

**Discard:** expanding the denominator first. Substitution into a product is easier than into a
polynomial.

**Path:** $M=2/(2\\sqrt2\\cdot2\\sqrt2)=\\tfrac14$, $\\theta=90^\\circ-135^\\circ-45^\\circ=-90^\\circ$.

**Check:** $(-2+j2)(2+j2)=-8$, so $F=j2/(-8)=-j0.25$.
`,
      solution: `
**Step 1: the vectors.**

| From | Vector | Length | Angle |
|---|---|---|---|
| zero at $-2$ | $j2$ | $2$ | $90^\\circ$ |
| pole at $0$ | $-2+j2$ | $2\\sqrt2$ | $135^\\circ$ |
| pole at $-4$ | $2+j2$ | $2\\sqrt2$ | $45^\\circ$ |

**Step 2: combine.**

$$M=\\frac{2}{2\\sqrt2\\cdot2\\sqrt2}=\\frac{2}{8}=\\frac14,\\qquad
\\theta=90^\\circ-(135^\\circ+45^\\circ)=-90^\\circ$$

$$F(-2+j2)=0.25\\angle-90^\\circ=-j0.25$$

**Step 3: direct substitution.**

$$s(s+4)=(-2+j2)(2+j2)=-4-j4+j4+j^{2}4=-8,\\qquad s+2=j2$$

$$F=\\frac{j2}{-8}=-j0.25\\;\\checkmark$$

**Check.** The angle is not an odd multiple of $180^\\circ$, so if $F$ were an open-loop $G(s)$,
this point would not be on its root locus.
`
    },
    {
      id: "8-02", difficulty: "core", topic: "Root locus definition", sec: "8.1",
      prompt: `A loop has forward path $KG(s)$ and feedback $H(s)$ with

$$G(s)=\\frac{s+2}{s(s+1)},\\qquad H(s)=\\frac{s+4}{s+6}$$

**(a)** List the open-loop poles and zeros.

**(b)** Find $T(s)$. Which closed-loop zeros can you name without solving anything?

**(c)** Write the closed-loop characteristic polynomial and give its roots at $K=0$.`,
      hint: `$T=KN_{G}D_{H}/(D_{G}D_{H}+KN_{G}N_{H})$.`,
      answer: `**(a)** Poles $0,-1,-6$; zeros $-2,-4$. **(b)** $T=\\dfrac{K(s+2)(s+6)}{s^{3}+(7+K)s^{2}+(6+6K)s+8K}$;
closed-loop zeros $-2$ (zero of $G$) and $-6$ (pole of $H$). **(c)** At $K=0$ the roots are the
open-loop poles $0,-1,-6$.`,
      expert: `
**First glance:** the feedback path's pole at $-6$ ends up in the numerator of $T$, and its zero at
$-4$ ends up only in the denominator.

**Discard:** reducing with numbers substituted for $K$. The point is to see which parts of $T$ move
with $K$.

**Path:** $N_{G}D_{H}=(s+2)(s+6)$ on top; $D_{G}D_{H}+KN_{G}N_{H}=s(s+1)(s+6)+K(s+2)(s+4)$ below.

**Check:** at $K=0$ the denominator is $s(s+1)(s+6)$, the open-loop poles, which is rule 4 in
8.4.
`,
      solution: `
**Part (a).** $KG(s)H(s)=\\dfrac{K(s+2)(s+4)}{s(s+1)(s+6)}$. Open-loop poles $0,-1,-6$; open-loop
zeros $-2,-4$.

**Part (b).**

$$T=\\frac{KG}{1+KGH}=\\frac{K\\dfrac{s+2}{s(s+1)}}{1+\\dfrac{K(s+2)(s+4)}{s(s+1)(s+6)}}
=\\frac{K(s+2)(s+6)}{s(s+1)(s+6)+K(s+2)(s+4)}$$

$$s(s+1)(s+6)=s^{3}+7s^{2}+6s,\\qquad K(s+2)(s+4)=K(s^{2}+6s+8)$$

$$T(s)=\\frac{K(s+2)(s+6)}{s^{3}+(7+K)s^{2}+(6+6K)s+8K}$$

The closed-loop zeros are $-2$, the zero of $G$, and $-6$, the pole of $H$. Neither depends on $K$.

**Part (c).** $s^{3}+(7+K)s^{2}+(6+6K)s+8K$. At $K=0$ it is $s(s+1)(s+6)$, with roots $0,-1,-6$.
For any other $K$ the cubic has to be factored again.

**Check.** The zero of $H$ at $-4$ appears in the characteristic polynomial but not in the
numerator of $T$: it shapes the locus without being a zero of the closed-loop response.
`
    },
    {
      id: "8-03", difficulty: "warmup", topic: "Root locus definition", sec: "8.2",
      prompt: `A unity feedback loop has $G(s)=\\dfrac{K}{s(s+6)}$.

**(a)** Find the closed-loop poles as a function of $K$.

**(b)** For what gains is the response overdamped, critically damped and underdamped?

**(c)** Find $\\zeta$, $T_{s}$ and $T_{p}$ at $K=25$. Which of these change if $K$ rises to $36$?`,
      hint: `Quadratic formula on $s^{2}+6s+K$.`,
      answer: `**(a)** $s=-3\\pm\\sqrt{9-K}$. **(b)** Overdamped $0<K<9$, critical $K=9$, underdamped $K>9$.
**(c)** $-3\\pm j4$: $\\zeta=0.6$, $T_{s}=\\tfrac43$ s, $T_{p}=\\tfrac{\\pi}{4}\\approx0.785$ s. At $K=36$,
$T_{s}$ is unchanged; $\\zeta$ falls to $0.5$ and $T_{p}$ falls to $0.605$ s.`,
      expert: `
**First glance:** second order, so the locus is the quadratic formula drawn. The real part of the
complex poles is half the $s$ coefficient and does not involve $K$.

**Discard:** the sketching rules. They are for when factoring is not available.

**Path:** $-3\\pm\\sqrt{9-K}$; complex when $K>9$; real part $-3$ always.

**Check:** at $K=25$, $|s|=5=\\omega_{n}=\\sqrt{25}$ and $\\cos\\theta=3/5=0.6$.
`,
      solution: `
**Part (a).** $T=\\dfrac{K}{s^{2}+6s+K}$:

$$s=\\frac{-6\\pm\\sqrt{36-4K}}{2}=-3\\pm\\sqrt{9-K}$$

**Part (b).** Real and distinct for $K<9$, repeated at $-3$ for $K=9$, complex for $K>9$.

**Part (c).** At $K=25$: $s=-3\\pm j4$, $\\omega_{n}=5$.

$$\\zeta=\\frac35=0.6,\\qquad T_{s}=\\frac{4}{3}\\ \\text{s},\\qquad T_{p}=\\frac{\\pi}{4}\\approx0.785\\ \\text{s}$$

At $K=36$: $s=-3\\pm j\\sqrt{27}=-3\\pm j5.20$, $\\omega_{n}=6$.

$$\\zeta=\\frac36=0.5,\\qquad T_{s}=\\frac43\\ \\text{s},\\qquad T_{p}=\\frac{\\pi}{5.20}\\approx0.605\\ \\text{s}$$

The real part is $-3$ for every $K>9$, so $T_{s}$ does not move. The imaginary part grows, so $T_{p}$
falls; the angle grows, so $\\zeta$ falls and overshoot rises.

**Check.** $\\omega_{n}^{2}=K$ for this loop: $25$ and $36$.
`
    },
    {
      id: "8-04", difficulty: "core", topic: "Root locus definition", sec: "8.2",
      prompt: `For the loop of 8-03, $G(s)=\\dfrac{K}{s(s+6)}$:

**(a)** Find $K$ for 16.3% overshoot.

**(b)** Find $T_{p}$ at that gain.

**(c)** Can any gain give $T_{s}=1$ s? Explain from the root locus.`,
      hint: `16.3% overshoot is $\\zeta=0.5$. For (c), compare the required real part with the real part the
locus allows.`,
      answer: `**(a)** $K=36$. **(b)** $T_{p}=\\dfrac{\\pi}{3\\sqrt3}\\approx0.605$ s. **(c)** No: $T_{s}=1$ s needs a real
part of $-4$, and every point of the locus has real part between $-3$ and $0$ except the segment
from $-3$ to $-6$, which is overdamped and slower.`,
      expert: `
**First glance:** the complex part of this locus is the vertical line $\\sigma=-3$. Every
underdamped design has $T_{s}=4/3$ s.

**Discard:** solving for $K$ in (c). The locus shape answers it.

**Path:** $\\zeta=0.5$ means $2\\zeta\\omega_{n}=\\omega_{n}=6$, so $K=\\omega_{n}^{2}=36$.

**Check:** the slower of the two real poles, for $K<9$, sits between $-3$ and $0$, so overdamped
designs settle even more slowly.
`,
      solution: `
**Part (a).** $s^{2}+6s+K$ matches $s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}$. With $\\zeta=0.5$:

$$2(0.5)\\omega_{n}=6\\quad\\Longrightarrow\\quad\\omega_{n}=6,\\qquad K=\\omega_{n}^{2}=36$$

The poles are $-3\\pm j3\\sqrt3$.

**Part (b).**

$$T_{p}=\\frac{\\pi}{\\omega_{n}\\sqrt{1-\\zeta^{2}}}=\\frac{\\pi}{3\\sqrt3}\\approx0.605\\ \\text{s}$$

**Part (c).** $T_{s}=1$ s needs $\\zeta\\omega_{n}=4$: dominant poles at real part $-4$.

- For $K>9$ the real part is exactly $-3$.
- For $K\\le9$ the two poles are real, one in $[-6,-3]$ and one in $[-3,0]$. The slower one, the one
  that sets the settling time, is never left of $-3$.

So no gain gives $T_{s}<4/3$ s. Moving the vertical part of the locus to the left takes a
compensator.

**Check.** $\\%OS=100e^{-0.5\\pi/\\sqrt{0.75}}\\approx16.3\\%$, confirming $\\zeta=0.5$.
`
    },
    {
      id: "8-05", difficulty: "core", topic: "Root locus definition", sec: "8.2",
      prompt: `A unity feedback loop has an unstable plant:

$$G(s)=\\frac{K(s+1)}{s(s-2)}$$

**(a)** Find the closed-loop characteristic polynomial and the range of $K$ for stability.

**(b)** Find the $j\\omega$ crossing.

**(c)** Find the breakaway and break-in points, and describe the locus.`,
      hint: `Second order, so stability is "every coefficient positive".`,
      answer: `**(a)** $s^{2}+(K-2)s+K$: stable for $K>2$. **(b)** $\\pm j\\sqrt2$ at $K=2$. **(c)** Breakaway at
$\\sqrt3-1\\approx0.73$ ($K\\approx0.54$), break-in at $-1-\\sqrt3\\approx-2.73$ ($K\\approx7.46$). The
branches start at $0$ and $2$, circle through the left half-plane, and end at $-1$ and $-\\infty$.`,
      expert: `
**First glance:** a pole in the right half-plane. The locus starts in the unstable region, so the
question is whether it ever leaves it.

**Discard:** Routh. A quadratic with positive coefficients is stable.

**Path:** $K-2>0$ and $K>0$. Breakaway: $\\dfrac{1}{\\sigma+1}=\\dfrac1\\sigma+\\dfrac{1}{\\sigma-2}$, so
$\\sigma^{2}+2\\sigma-2=0$.

**Check:** this loop is unstable at **low** gain, the opposite of most loops in Chapter 6.
`,
      solution: `
**Part (a).**

$$s(s-2)+K(s+1)=s^{2}+(K-2)s+K$$

Stable iff both coefficients are positive: $K>2$.

**Part (b).** At $K=2$: $s^{2}+2=0$, so $s=\\pm j\\sqrt2\\approx\\pm j1.41$.

**Part (c).** Real-axis segments, counting the real poles and zeros to the right: $[0,2]$ (one pole
to the right) and $(-\\infty,-1]$ (three). Transition equation:

$$\\frac{1}{\\sigma+1}=\\frac1\\sigma+\\frac{1}{\\sigma-2}\\quad\\Longrightarrow\\quad\\sigma(\\sigma-2)=(\\sigma+1)(2\\sigma-2)\\quad\\Longrightarrow\\quad\\sigma^{2}+2\\sigma-2=0$$

$$\\sigma=-1\\pm\\sqrt3=0.732,\\ -2.732$$

$0.732$ is on $[0,2]$: breakaway. $-2.732$ is on $(-\\infty,-1]$: break-in. The gains:

$$K=\\frac{|\\sigma||\\sigma-2|}{|\\sigma+1|}$$

$$K(0.732)=\\frac{0.732\\cdot1.268}{1.732}\\approx0.536,\\qquad K(-2.732)=\\frac{2.732\\cdot4.732}{1.732}\\approx7.46$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 322" class="nx-fig">
  <defs><marker id="nx8p5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 161.4 L438.0 161.4" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p5)"/>
  <path d="M279.0 288.8 L279.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p5)"/>
  <text x="430.0" y="179.4" font-size="13">&#963;</text>
  <text x="285.0" y="32.0" font-size="13">j&#969;</text>
  <path d="M83.0 158.4 L83.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="83.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M132.0 158.4 L132.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="132.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M181.0 158.4 L181.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="181.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M230.0 158.4 L230.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="230.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M328.0 158.4 L328.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="328.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">1</text>
  <path d="M377.0 158.4 L377.0 164.4" stroke="currentColor" stroke-width="1"/>
  <text x="377.0" y="176.4" font-size="11" text-anchor="middle" opacity=".75">2</text>
  <path d="M276.0 259.4 L282.0 259.4" stroke="currentColor" stroke-width="1"/>
  <text x="273.0" y="263.4" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M276.0 63.4 L282.0 63.4" stroke="currentColor" stroke-width="1"/>
  <text x="273.0" y="67.4" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M279.0 161.4 L280.5 161.4 L282.0 161.4 L283.6 161.4 L285.2 161.4 L286.7 161.4 L288.3 161.4 L289.8 161.4 L291.5 161.4 L293.0 161.4 L294.7 161.4 L296.3 161.4 L297.8 161.4 L299.7 161.4 L301.3 161.4 L303.4 161.4 L305.2 161.4 L307.4 161.4 L308.9 161.4 L310.5 161.4 L312.0 161.4 L313.5 161.4 L314.9 160.6 L314.8 159.1 L314.8 157.6 L314.7 156.1 L314.5 153.7 L314.2 151.0 L313.9 148.8 L313.6 146.9 L313.3 145.2 L313.0 143.6 L312.5 141.5 L312.0 139.5 L311.5 137.6 L310.9 135.8 L310.4 134.1 L309.8 132.5 L309.2 130.9 L308.6 129.3 L307.9 127.8 L307.3 126.3 L306.6 124.9 L305.9 123.4 L305.2 122.0 L304.4 120.6 L303.7 119.2 L302.9 117.9 L302.0 116.5 L301.2 115.2 L300.3 113.8 L299.4 112.5 L298.5 111.2 L297.5 109.9 L296.5 108.6 L295.4 107.4 L294.4 106.1 L293.3 104.8 L292.1 103.6 L291.0 102.4 L289.8 101.1 L288.5 99.9 L287.2 98.7 L285.9 97.5 L284.5 96.3 L283.1 95.2 L281.6 94.0 L280.1 92.9 L278.5 91.7 L276.9 90.6 L275.2 89.6 L273.5 88.5 L271.7 87.5 L269.8 86.5 L267.9 85.5 L265.9 84.5 L263.9 83.6 L262.5 83.0 L261.1 82.4 L259.6 81.9 L258.2 81.3 L256.6 80.8 L255.1 80.3 L253.5 79.8 L251.9 79.4 L250.2 79.0 L248.5 78.6 L246.8 78.2 L245.0 77.9 L243.2 77.6 L241.4 77.3 L239.5 77.1 L237.6 76.9 L235.6 76.7 L233.6 76.6 L231.6 76.5 L229.5 76.5 L227.3 76.6 L225.1 76.7 L222.9 76.8 L220.6 77.0 L218.3 77.3 L215.9 77.7 L213.5 78.2 L211.0 78.7 L208.4 79.3 L205.8 80.0 L203.2 80.9 L200.5 81.8 L197.7 82.9 L196.3 83.5 L194.9 84.1 L193.4 84.8 L192.0 85.5 L190.5 86.3 L189.0 87.1 L187.5 87.9 L186.0 88.8 L184.4 89.8 L182.9 90.8 L181.3 91.9 L179.7 93.0 L178.1 94.2 L176.5 95.5 L174.9 96.9 L173.2 98.3 L171.6 99.9 L169.9 101.5 L168.2 103.3 L166.4 105.2 L164.7 107.2 L162.9 109.4 L161.1 111.8 L159.3 114.4 L157.5 117.3 L155.7 120.5 L153.8 124.0 L151.9 128.2 L150.0 133.0 L148.8 136.7 L148.4 138.2 L147.9 139.7 L147.6 141.2 L147.2 142.7 L146.9 144.2 L146.6 145.7 L146.3 147.2 L146.1 148.7 L145.9 150.3 L145.7 151.9 L145.5 153.5 L145.4 155.0 L145.3 156.7 L145.2 158.3 L145.1 160.7 L146.8 161.4 L148.5 161.4 L150.2 161.4 L151.9 161.4 L153.5 161.4 L155.0 161.4 L156.6 161.4 L158.1 161.4 L159.6 161.4 L161.1 161.4 L162.7 161.4 L164.2 161.4 L165.7 161.4 L169.6 161.4 L173.3 161.4 L176.3 161.4 L178.8 161.4 L181.1 161.4 L183.1 161.4 L184.9 161.4 L186.5 161.4 L189.3 161.4 L191.8 161.4 L194.0 161.4 L195.9 161.4 L197.6 161.4 L199.2 161.4 L201.3 161.4 L203.2 161.4 L204.9 161.4 L206.8 161.4 L208.5 161.4 L210.1 161.4 L211.8 161.4 L213.5 161.4 L215.1 161.4 L216.6 161.4 L218.1 161.4 L219.7 161.4 L221.3 161.4 L222.9 161.4 L224.4 161.4 L225.9 161.4 L227.5 161.4 L229.0 161.4 L229.9 161.4" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(222.9 76.8) rotate(174.4)"/>
  <path d="M377.0 161.4 L375.5 161.4 L374.0 161.4 L372.5 161.4 L370.9 161.4 L369.4 161.4 L367.8 161.4 L366.3 161.4 L364.7 161.4 L363.1 161.4 L361.5 161.4 L360.0 161.4 L358.4 161.4 L356.7 161.4 L355.2 161.4 L353.6 161.4 L351.8 161.4 L350.1 161.4 L348.3 161.4 L346.8 161.4 L345.1 161.4 L343.3 161.4 L341.4 161.4 L339.8 161.4 L338.1 161.4 L336.2 161.4 L334.1 161.4 L332.6 161.4 L331.0 161.4 L329.1 161.4 L327.0 161.4 L324.5 161.4 L323.0 161.4 L321.5 161.4 L320.0 161.4 L318.5 161.4 L317.0 161.4 L315.4 161.4 L314.9 162.9 L314.8 164.4 L314.7 165.9 L314.7 167.4 L314.5 169.1 L314.2 171.8 L313.9 174.0 L313.6 175.9 L313.3 177.6 L313.0 179.2 L312.5 181.3 L312.0 183.3 L311.5 185.2 L310.9 187.0 L310.4 188.7 L309.8 190.3 L309.2 191.9 L308.6 193.5 L307.9 195.0 L307.3 196.5 L306.6 197.9 L305.9 199.4 L305.2 200.8 L304.4 202.2 L303.7 203.6 L302.9 204.9 L302.0 206.3 L301.2 207.6 L300.3 209.0 L299.4 210.3 L298.5 211.6 L297.5 212.9 L296.5 214.2 L295.4 215.4 L294.4 216.7 L293.3 218.0 L292.1 219.2 L291.0 220.4 L289.8 221.7 L288.5 222.9 L287.2 224.1 L285.9 225.3 L284.5 226.5 L283.1 227.6 L281.6 228.8 L280.1 229.9 L278.5 231.1 L276.9 232.2 L275.2 233.2 L273.5 234.3 L271.7 235.3 L269.8 236.3 L267.9 237.3 L265.9 238.3 L263.9 239.2 L262.5 239.8 L261.1 240.4 L259.6 240.9 L258.2 241.5 L256.6 242.0 L255.1 242.5 L253.5 243.0 L251.9 243.4 L250.2 243.8 L248.5 244.2 L246.8 244.6 L245.0 244.9 L243.2 245.2 L241.4 245.5 L239.5 245.7 L237.6 245.9 L235.6 246.1 L233.6 246.2 L231.6 246.3 L229.5 246.3 L227.3 246.2 L225.1 246.1 L222.9 246.0 L220.6 245.8 L218.3 245.5 L215.9 245.1 L213.5 244.6 L211.0 244.1 L208.4 243.5 L205.8 242.8 L203.2 241.9 L200.5 241.0 L197.7 239.9 L196.3 239.3 L194.9 238.7 L193.4 238.0 L192.0 237.3 L190.5 236.5 L189.0 235.7 L187.5 234.9 L186.0 234.0 L184.4 233.0 L182.9 232.0 L181.3 230.9 L179.7 229.8 L178.1 228.6 L176.5 227.3 L174.9 225.9 L173.2 224.5 L171.6 222.9 L169.9 221.3 L168.2 219.5 L166.4 217.6 L164.7 215.6 L162.9 213.4 L161.1 211.0 L159.3 208.4 L157.5 205.5 L155.7 202.3 L153.8 198.8 L151.9 194.6 L150.0 189.8 L148.8 186.1 L148.4 184.6 L147.9 183.1 L147.6 181.6 L147.2 180.1 L146.9 178.6 L146.6 177.1 L146.3 175.6 L146.1 174.1 L145.9 172.5 L145.7 170.9 L145.5 169.3 L145.4 167.8 L145.3 166.1 L145.2 164.5 L145.1 162.1 L143.5 161.4 L141.6 161.4 L140.0 161.4 L138.3 161.4 L136.7 161.4 L135.1 161.4 L133.6 161.4 L132.0 161.4 L130.5 161.4 L128.9 161.4 L127.4 161.4 L125.8 161.4 L124.2 161.4 L122.7 161.4 L121.2 161.4 L119.6 161.4 L118.1 161.4 L116.5 161.4 L110.8 161.4 L103.0 161.4 L95.9 161.4 L89.2 161.4 L82.8 161.4 L76.5 161.4 L70.5 161.4 L64.5 161.4 L58.6 161.4 L52.8 161.4 L47.1 161.4 L41.4 161.4 L35.7 161.4 L30.0 161.4 L24.3 161.4 L24.3 161.4" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(222.9 246.0) rotate(-174.4)"/>
  <path d="M273.0 155.4 L285.0 167.4 M285.0 155.4 L273.0 167.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M371.0 155.4 L383.0 167.4 M383.0 155.4 L371.0 167.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="230.0" cy="161.4" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="279.0" cy="92.1" r="4" fill="currentColor" stroke="none"/>
  <circle cx="279.0" cy="230.7" r="4" fill="currentColor" stroke="none"/>
  <text x="287.0" y="86.1" font-size="11" text-anchor="start">j1.41, K = 2</text>
  <circle cx="314.9" cy="161.4" r="3.5" fill="currentColor" stroke="none"/>
  <text x="314.9" y="152.4" font-size="11" text-anchor="middle">0.73</text>
  <circle cx="145.1" cy="161.4" r="3.5" fill="currentColor" stroke="none"/>
  <text x="145.1" y="152.4" font-size="11" text-anchor="middle">−2.73</text>
</svg>
<figcaption>K(s+1)/[s(s−2)]. Both branches start in the right half-plane, break away at 0.73, cross the axis at ±j1.41 when K = 2, and break in at −2.73.</figcaption>
</figure>

**Check.** Two poles, one zero: one branch to infinity along $180^\\circ$, which is the segment left
of $-2.73$. The branches cross the axis exactly once, at $K=2$, so the system is stable for every
gain above it.
`
    },
    {
      id: "8-06", difficulty: "core", topic: "Angle and magnitude criteria", sec: "8.3",
      prompt: `For the open-loop transfer function

$$KG(s)H(s)=\\frac{K(s+4)}{s(s+2)}$$

decide whether each point is on the root locus. Where it is, find $K$ and confirm by closing the
loop.

**(a)** $s=-2+j2$

**(b)** $s=-1+j1$`,
      hint: `Zero angles minus pole angles. Only an odd multiple of $180^\\circ$ qualifies.`,
      answer: `**(a)** On the locus: $45^\\circ-135^\\circ-90^\\circ=-180^\\circ$, $K=2$. **(b)** Not on the locus:
$18.4^\\circ-135^\\circ-45^\\circ=-161.6^\\circ$.`,
      expert: `
**First glance:** (a) sits directly above the pole at $-2$, so one vector is vertical and the other
two are at $45^\\circ$ multiples.

**Discard:** computing $K$ before the angle test. A magnitude can be computed at any point; it only
means something on the locus.

**Path:** sum the angles; if $\\pm180^\\circ$, take pole lengths over zero lengths.

**Check:** $K=2$ gives $s^{2}+4s+8$, roots $-2\\pm j2$.
`,
      solution: `
**Part (a): $s=-2+j2$.**

| From | Vector | Length | Angle |
|---|---|---|---|
| zero $-4$ | $2+j2$ | $2\\sqrt2$ | $45^\\circ$ |
| pole $0$ | $-2+j2$ | $2\\sqrt2$ | $135^\\circ$ |
| pole $-2$ | $j2$ | $2$ | $90^\\circ$ |

$$45^\\circ-135^\\circ-90^\\circ=-180^\\circ\\quad\\checkmark$$

On the locus.

$$K=\\frac{\\prod\\text{pole lengths}}{\\prod\\text{zero lengths}}=\\frac{2\\sqrt2\\cdot2}{2\\sqrt2}=2$$

Closing the loop: $s(s+2)+2(s+4)=s^{2}+4s+8$, roots $-2\\pm j2$.

**Part (b): $s=-1+j1$.**

| From | Vector | Angle |
|---|---|---|
| zero $-4$ | $3+j$ | $18.43^\\circ$ |
| pole $0$ | $-1+j$ | $135^\\circ$ |
| pole $-2$ | $1+j$ | $45^\\circ$ |

$$18.43^\\circ-135^\\circ-45^\\circ=-161.57^\\circ$$

Not an odd multiple of $180^\\circ$: no positive gain puts a closed-loop pole at $-1+j1$.

**Check.** For (b), the characteristic polynomial $s^{2}+(2+K)s+4K$ would need $-1\\pm j1$ as roots,
which means $2+K=2$ and $4K=2$ at once. No $K$ satisfies both.
`
    },
    {
      id: "8-07", difficulty: "warmup", topic: "Angle and magnitude criteria", sec: "8.3",
      prompt: `For $KG(s)=\\dfrac{K}{(s+1)(s+3)(s+5)}$ in a unity loop, test the real-axis points $-2$, $-4$ and
$-6$. For each one on the locus, find $K$ and the other two closed-loop poles at that gain.`,
      hint: `On the real axis only the real poles to the right matter, each contributing $180^\\circ$.`,
      answer: `$-2$: on the locus, $K=3$, other poles $-1.70$ and $-5.30$. $-4$: not on the locus. $-6$: on the
locus, $K=15$, other poles $-1.5\\pm j1.66$.`,
      expert: `
**First glance:** real-axis points, real poles. The angle test is a count: one pole to the right of
$-2$, two to the right of $-4$, three to the right of $-6$.

**Discard:** the vector table. Every angle is $0^\\circ$ or $180^\\circ$.

**Path:** odd count, on the locus; $K$ is the product of distances.

**Check:** at $K=15$ the remaining quadratic is $s^{2}+3s+5$; its roots are complex, so $-6$ is
where the real branch has gone while the other two are already off the axis.
`,
      solution: `
**$s=-2$.** One pole ($-1$) to the right: $-180^\\circ$. On the locus.

$$K=|{-2}+1|\\,|{-2}+3|\\,|{-2}+5|=1\\cdot1\\cdot3=3$$

Closed loop: $(s+1)(s+3)(s+5)+3=s^{3}+9s^{2}+23s+18$. Dividing by $(s+2)$ leaves $s^{2}+7s+9$,
with roots $-1.70$ and $-5.30$.

**$s=-4$.** Two poles ($-1,-3$) to the right: $-360^\\circ$. Not on the locus.

**$s=-6$.** Three poles to the right: $-540^\\circ\\equiv-180^\\circ$. On the locus.

$$K=5\\cdot3\\cdot1=15$$

Closed loop: $s^{3}+9s^{2}+23s+30$. Dividing by $(s+6)$ leaves $s^{2}+3s+5$, roots
$-1.5\\pm j1.66$.

**Check.** Real-axis segments by rule 3: $[-3,-1]$ and $(-\\infty,-5]$. $-2$ and $-6$ are on them;
$-4$ is in the gap.
`
    },
    {
      id: "8-08", difficulty: "challenge", topic: "Angle and magnitude criteria", sec: "8.3",
      prompt: `For $KG(s)=\\dfrac{K(s+4)}{s(s+2)}$, the complex part of the root locus is a circle.

**(a)** Show from the closed-loop characteristic equation that complex closed-loop poles satisfy
$|s+4|=2\\sqrt2$.

**(b)** Find the breakaway and break-in points and their gains.

**(c)** Confirm that $-2+j2$, found in 8-06, lies on the circle.`,
      hint: `For complex roots of $s^{2}+bs+c$, $|s|^{2}=c$ and $2\\,\\text{Re}(s)=-b$. Express both in terms of
$K$ and eliminate it.`,
      answer: `**(a)** Complex roots of $s^{2}+(2+K)s+4K$ satisfy $\\sigma=-(2+K)/2$ and $\\sigma^{2}+\\omega^{2}=4K$;
eliminating $K$ gives $(\\sigma+4)^{2}+\\omega^{2}=8$. **(b)** $-4+2\\sqrt2\\approx-1.17$ ($K\\approx0.343$)
and $-4-2\\sqrt2\\approx-6.83$ ($K\\approx11.66$). **(c)** $|(-2+j2)+4|=|2+j2|=2\\sqrt2$.`,
      expert: `
**First glance:** two poles and one zero on the real axis, with the zero outside the poles. That
configuration always gives a circle centred on the zero.

**Discard:** testing many points with the angle criterion. The characteristic equation is a
quadratic; its complex roots can be described exactly.

**Path:** $K=-2\\sigma-2$ from the real part; substitute into $|s|^{2}=4K$.

**Check:** the circle meets the real axis at $-4\\pm2\\sqrt2$, which must agree with the transition
equation.
`,
      solution: `
**Part (a).** Closed loop: $s^{2}+(2+K)s+4K$. For complex roots $s=\\sigma\\pm j\\omega$:

$$2\\sigma=-(2+K),\\qquad \\sigma^{2}+\\omega^{2}=4K$$

From the first, $K=-2\\sigma-2$. Substituting:

$$\\sigma^{2}+\\omega^{2}=-8\\sigma-8\\quad\\Longrightarrow\\quad(\\sigma+4)^{2}+\\omega^{2}=8$$

a circle of radius $2\\sqrt2$ centred at $-4$, the zero: $|s+4|=2\\sqrt2$.

**Part (b).** The circle meets the real axis at $\\sigma=-4\\pm2\\sqrt2$. By the transition equation:

$$\\frac{1}{\\sigma+4}=\\frac1\\sigma+\\frac{1}{\\sigma+2}\\quad\\Longrightarrow\\quad\\sigma^{2}+8\\sigma+8=0\\quad\\Longrightarrow\\quad\\sigma=-4\\pm2\\sqrt2$$

$-1.17$ is between the poles: breakaway. $-6.83$ is left of the zero: break-in.

$$K(-1.17)=\\frac{1.17\\cdot0.83}{2.83}\\approx0.343,\\qquad K(-6.83)=\\frac{6.83\\cdot4.83}{2.83}\\approx11.66$$

**Part (c).** $|(-2+j2)+4|=|2+j2|=2\\sqrt2$. And $K=-2(-2)-2=2$, matching 8-06.

**Check.** Between $K=0.343$ and $K=11.66$ the poles are complex and on the circle. Above
$11.66$, one moves right to the zero at $-4$ and the other left to $-\\infty$.
`
    },
    {
      id: "8-09", difficulty: "warmup", topic: "Sketching rules", sec: "8.4",
      prompt: `Give the real-axis segments of the root locus, for $K>0$, for each open-loop pole-zero set.

**(a)** poles $0,\\ -3$; zero $-1$

**(b)** poles $-1,\\ -2,\\ -5$; zero $-4$

**(c)** poles $0,\\ -1\\pm j,\\ -4$; zero $-2$

**(d)** poles $0,\\ 0,\\ -5$; zero $-1$`,
      hint: `Count real poles and zeros to the right of each test interval. Complex ones never count; a double
pole counts twice.`,
      answer: `**(a)** $[-1,0]$ and $(-\\infty,-3]$. **(b)** $[-2,-1]$ and $[-5,-4]$. **(c)** $[-2,0]$ and
$(-\\infty,-4]$. **(d)** $[-5,-1]$ only.`,
      expert: `
**First glance:** each set is a short list on the real axis; walk it from right to left and toggle
"on locus" at every real pole or zero.

**Discard:** angle sums at test points. The toggle is the same computation.

**Path:** start off-locus at the far right, flip at each real singularity, count a double pole as
two flips.

**Check:** in (d) the two flips at the origin cancel, so the segment between $0$ and $-1$ is empty.
`,
      solution: `
Walk from the right; the locus switches on or off at each real pole or zero.

| Set | Walk | Segments |
|---|---|---|
| (a) | on at $0$, off at $-1$, on at $-3$ | $[-1,0]$, $(-\\infty,-3]$ |
| (b) | on at $-1$, off at $-2$, on at $-4$, off at $-5$ | $[-2,-1]$, $[-5,-4]$ |
| (c) | on at $0$, off at $-2$, on at $-4$ (complex pair skipped) | $[-2,0]$, $(-\\infty,-4]$ |
| (d) | on then off at $0$, on at $-1$, off at $-5$ | $[-5,-1]$ |

**Check.** Count branches that must leave the axis. In (b), the segment $[-2,-1]$ holds two poles
and nothing to end on, so those two branches meet and break away; $[-5,-4]$ holds a pole and a
zero, so that branch just runs from $-5$ to $-4$.
`
    },
    {
      id: "8-10", difficulty: "core", topic: "Sketching rules", sec: "8.4",
      prompt: `Find the asymptotes (intercept and angles) for each open-loop transfer function.

**(a)** $\\dfrac{K}{s(s+2)(s+4)}$

**(b)** $\\dfrac{K(s+1)}{s(s+3)(s+5)(s+7)}$

**(c)** $\\dfrac{K(s+2)}{s^{2}(s+10)}$

**(d)** $\\dfrac{K}{(s+1)(s+2)(s+3)(s+4)}$

For each, say whether the loop must become unstable at high gain.`,
      hint: `$\\sigma_{a}=(\\sum p-\\sum z)/(n-m)$ with values, signs included.`,
      answer: `**(a)** $\\sigma_{a}=-2$; $\\pm60^\\circ,180^\\circ$; unstable at high gain. **(b)** $\\sigma_{a}=-\\tfrac{14}{3}$;
$\\pm60^\\circ,180^\\circ$; unstable at high gain. **(c)** $\\sigma_{a}=-4$; $\\pm90^\\circ$; the asymptotes
stay in the left half-plane. **(d)** $\\sigma_{a}=-2.5$; $\\pm45^\\circ,\\pm135^\\circ$; unstable at high
gain.`,
      expert: `
**First glance:** $n-m$ is $3$, $3$, $2$, $4$. Three or more means asymptotes into the right
half-plane.

**Discard:** Routh for the "unstable at high gain" question. Asymptote angles of $\\pm60^\\circ$ or
$\\pm45^\\circ$ settle it.

**Path:** sum poles, subtract zeros, divide by $n-m$.

**Check:** in (b), adding the zero at $-1$ to three poles moves the intercept left of where the
poles alone would put it.
`,
      solution: `
| | $\\sum p$ | $\\sum z$ | $n-m$ | $\\sigma_{a}$ | Angles |
|---|---|---|---|---|---|
| (a) | $-6$ | $0$ | 3 | $-2$ | $60^\\circ,180^\\circ,300^\\circ$ |
| (b) | $-15$ | $-1$ | 3 | $-\\tfrac{14}{3}\\approx-4.67$ | $60^\\circ,180^\\circ,300^\\circ$ |
| (c) | $-10$ | $-2$ | 2 | $-4$ | $90^\\circ,270^\\circ$ |
| (d) | $-10$ | $0$ | 4 | $-2.5$ | $45^\\circ,135^\\circ,225^\\circ,315^\\circ$ |

**High gain.** Asymptotes at $60^\\circ$ or $45^\\circ$ head into the right half-plane, so (a), (b)
and (d) each have a finite gain above which a pair is unstable. In (c) the two infinite branches
approach the vertical line $\\sigma=-4$.

**Check for (c).** Closed loop $s^{3}+10s^{2}+Ks+2K$; cubic rule $10K>2K$ for every $K>0$. Stable
at every gain, consistent with the asymptotes.
`
    },
    {
      id: "8-11", difficulty: "core", topic: "Sketching rules", sec: "8.4",
      prompt: `Sketch the root locus of

$$KG(s)=\\frac{K(s+2)}{s^{2}(s+10)}$$

using rules 1 to 5. Include the direction in which the two branches leave the double pole at the
origin.`,
      hint: `For the departure from a double pole, apply the angle criterion near the origin: the two poles
there contribute $2\\phi$.`,
      answer: `Three branches. Real-axis segment $[-10,-2]$ only. The branch from $-10$ moves right and ends at
$-2$. The two branches from the origin leave vertically ($\\pm90^\\circ$) and approach the asymptotes
$\\sigma_{a}=-4$, $\\pm90^\\circ$. The loop is stable for every $K>0$.`,
      expert: `
**First glance:** a type 2 loop with a zero between the origin and the third pole: the
configuration Chapter 7 showed is stable at every gain.

**Discard:** breakaway points. The only real-axis segment holds one pole and one zero, so no two
branches meet on the axis.

**Path:** segments, start and end, asymptotes, then $2\\phi=\\pm180^\\circ$ at the origin.

**Check:** the two branches start at real part $0$ and end near real part $-4$, moving left the
whole way, so they never enter the right half-plane.
`,
      solution: `
**Rule 1.** Three closed-loop poles: three branches.

**Rule 3.** Walking from the right: the double pole at the origin flips twice (off), the zero at
$-2$ flips on, the pole at $-10$ flips off. Segment: $[-10,-2]$.

**Rule 4.** Start at $0,0,-10$; end at $-2$ and two zeros at infinity.

**Rule 5.** $n-m=2$:

$$\\sigma_{a}=\\frac{-10-(-2)}{2}=-4,\\qquad\\theta_{a}=\\pm90^\\circ$$

**Leaving the origin.** At a point a short distance from the origin at angle $\\phi$, the zero at
$-2$ and the pole at $-10$ each contribute about $0^\\circ$, and the double pole contributes $2\\phi$:

$$0-2\\phi=(2k+1)180^\\circ\\quad\\Longrightarrow\\quad\\phi=\\pm90^\\circ$$

The pair leaves vertically.

**The sketch.** The branch from $-10$ runs right along the axis to the zero at $-2$. The pair leaves
the origin straight up and down and bends left toward the vertical asymptotes at $\\sigma=-4$. Sample
values: at $K=20$ the pair is near $-0.93\\pm j2.01$; at $K=100$, near $-3.77\\pm j8.20$.

**Check.** Closed loop $s^{3}+10s^{2}+Ks+2K$: $10K>2K$ for every $K>0$, so stable at every gain.
`
    },
    {
      id: "8-12", difficulty: "core", topic: "Breakaway and break-in", sec: "8.5",
      prompt: `Find the breakaway point of the root locus of $\\dfrac{K}{s(s+2)(s+4)}$ and the gain there, by the
transition equation. Confirm the location by differentiating $K(\\sigma)$.`,
      hint: `No zeros, so the left side of the transition equation is zero. One of the two roots is not on the
locus.`,
      answer: `$\\sigma=-2+\\dfrac{2}{\\sqrt3}\\approx-0.845$, with $K=\\dfrac{16}{3\\sqrt3}\\approx3.08$. The other root,
$-3.155$, lies between $-2$ and $-4$, which is not a locus segment.`,
      expert: `
**First glance:** three poles evenly spaced, so the transition equation is symmetric about $-2$ and
its two roots are $-2\\pm$ the same amount.

**Discard:** the gain table search. The equation is a quadratic.

**Path:** $\\tfrac1\\sigma+\\tfrac{1}{\\sigma+2}+\\tfrac{1}{\\sigma+4}=0\\Rightarrow3\\sigma^{2}+12\\sigma+8=0$.

**Check:** $K(\\sigma)=-\\sigma(\\sigma+2)(\\sigma+4)$ has derivative $-(3\\sigma^{2}+12\\sigma+8)$: the same
quadratic.
`,
      solution: `
**Step 1: transition equation.**

$$\\frac1\\sigma+\\frac{1}{\\sigma+2}+\\frac{1}{\\sigma+4}=0$$

Multiply by $\\sigma(\\sigma+2)(\\sigma+4)$:

$$(\\sigma+2)(\\sigma+4)+\\sigma(\\sigma+4)+\\sigma(\\sigma+2)=3\\sigma^{2}+12\\sigma+8=0$$

$$\\sigma=\\frac{-12\\pm\\sqrt{144-96}}{6}=-2\\pm\\frac{2}{\\sqrt3}=-0.845,\\ -3.155$$

**Step 2: keep the root on the locus.** Real-axis segments are $[-2,0]$ and $(-\\infty,-4]$. Only
$-0.845$ is on one. $-3.155$ lies in the gap $[-4,-2]$.

**Step 3: the gain.**

$$K=|\\sigma|\\,|\\sigma+2|\\,|\\sigma+4|=0.845\\cdot1.155\\cdot3.155\\approx3.08$$

Exactly, with $\\sigma=-2+\\tfrac{2}{\\sqrt3}$: $K=\\left(2-\\tfrac{2}{\\sqrt3}\\right)\\left(\\tfrac{2}{\\sqrt3}\\right)\\left(2+\\tfrac{2}{\\sqrt3}\\right)=\\tfrac{2}{\\sqrt3}\\left(4-\\tfrac43\\right)=\\tfrac{16}{3\\sqrt3}$.

**Step 4: by differentiation.** On the axis $K=-\\sigma(\\sigma+2)(\\sigma+4)=-(\\sigma^{3}+6\\sigma^{2}+8\\sigma)$:

$$\\frac{dK}{d\\sigma}=-(3\\sigma^{2}+12\\sigma+8)=0$$

the same quadratic.

**Check.** At $K=3.08$ the closed-loop polynomial $s^{3}+6s^{2}+8s+3.08$ has a double root at $-0.845$
and a third at $-4.31$; the three sum to $-6$.
`
    },
    {
      id: "8-13", difficulty: "core", topic: "Breakaway and break-in", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K(s+4)(s+6)}{s(s+2)}$, find the breakaway and break-in points and the gain at
each.`,
      hint: `Two poles and two zeros on the real axis. The transition equation reduces to a quadratic.`,
      answer: `Breakaway $-3+\\sqrt3\\approx-1.27$ at $K\\approx0.072$; break-in $-3-\\sqrt3\\approx-4.73$ at
$K\\approx13.9$.`,
      expert: `
**First glance:** the singularities are symmetric about $-3$ ($0,-2$ against $-4,-6$), so the two
points are $-3\\pm$ the same distance.

**Discard:** looking for asymptotes: $n=m$, so every branch ends on a finite zero.

**Path:** $\\tfrac{1}{\\sigma+4}+\\tfrac{1}{\\sigma+6}=\\tfrac1\\sigma+\\tfrac{1}{\\sigma+2}$ reduces to
$\\sigma^{2}+6\\sigma+6=0$.

**Check:** the breakaway gain is a maximum on $[-2,0]$, the break-in gain a minimum on $[-6,-4]$, and
$0.072<13.9$ as the shape requires.
`,
      solution: `
**Step 1: transition equation.**

$$\\frac{1}{\\sigma+4}+\\frac{1}{\\sigma+6}=\\frac1\\sigma+\\frac{1}{\\sigma+2}$$

$$\\frac{2\\sigma+10}{(\\sigma+4)(\\sigma+6)}=\\frac{2\\sigma+2}{\\sigma(\\sigma+2)}$$

$$(\\sigma+5)\\sigma(\\sigma+2)=(\\sigma+1)(\\sigma+4)(\\sigma+6)$$

$$\\sigma^{3}+7\\sigma^{2}+10\\sigma=\\sigma^{3}+11\\sigma^{2}+34\\sigma+24\\quad\\Longrightarrow\\quad\\sigma^{2}+6\\sigma+6=0$$

$$\\sigma=-3\\pm\\sqrt3=-1.268,\\ -4.732$$

**Step 2: identify.** $-1.268$ is on $[-2,0]$, between the poles: breakaway. $-4.732$ is on $[-6,-4]$,
between the zeros: break-in.

**Step 3: gains.** $K=\\dfrac{|\\sigma||\\sigma+2|}{|\\sigma+4||\\sigma+6|}$:

$$K(-1.268)=\\frac{1.268\\cdot0.732}{2.732\\cdot4.732}\\approx0.072,\\qquad
K(-4.732)=\\frac{4.732\\cdot2.732}{0.732\\cdot1.268}\\approx13.9$$

**Check.** The locus is the figure in the 8.4 guide: leave the axis at $-1.27$, return at $-4.73$.
The two gains are reciprocals of each other, a consequence of the symmetry.
`
    },
    {
      id: "8-14", difficulty: "warmup", topic: "jω-axis crossing", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K}{s(s+2)(s+4)}$ in a unity loop, find the gain and frequency at the $j\\omega$-axis
crossing, and the range of $K$ for stability.`,
      hint: `Routh on $s^{3}+6s^{2}+8s+K$, or the cubic rule.`,
      answer: `$K=48$, $\\omega=2\\sqrt2\\approx2.83$ rad/s; stable for $0<K<48$.`,
      expert: `
**First glance:** a cubic with $K$ only in the constant term: the crossing is $a_{2}a_{1}=a_{0}$.

**Discard:** the angle search. Routh is exact here.

**Path:** $6\\cdot8=K$, then $6s^{2}+48=0$.

**Check:** at the crossing the third pole is at $-6$, since the three roots sum to $-6$ and the
crossing pair sums to $0$.
`,
      solution: `
**Step 1: closed loop.** $s^{3}+6s^{2}+8s+K$.

$$\\begin{array}{c|cc}
s^{3} & 1 & 8\\\\
s^{2} & 6 & K\\\\
s^{1} & \\dfrac{48-K}{6} & 0\\\\
s^{0} & K & 0
\\end{array}$$

**Step 2: the row of zeros.** $K=48$.

**Step 3: frequency.** Row above: $6s^{2}+48=0$, so $s=\\pm j2\\sqrt2\\approx\\pm j2.83$.

**Step 4: range.** $0<K<48$.

**Check.** $(s+6)(s^{2}+8)=s^{3}+6s^{2}+8s+48$ ✓.
`
    },
    {
      id: "8-15", difficulty: "challenge", topic: "jω-axis crossing", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K(s+3)}{s(s+1)(s+2)(s+5)}$ in a unity loop, find the gain and frequency where the
locus crosses the $j\\omega$ axis, and the stable range of $K$.`,
      hint: `Fourth order: carry $K$ through the full Routh table. The $s^{1}$ entry gives a quadratic in $K$.`,
      answer: `$K=14$, $\\omega=\\sqrt3\\approx1.73$ rad/s; stable for $0<K<14$.`,
      expert: `
**First glance:** $n-m=3$, so there is a crossing. The zero at $-3$ only shifts it.

**Discard:** an angle search; Routh gives the exact gain.

**Path:** $s^{4}+8s^{3}+17s^{2}+(10+K)s+3K$; the $s^{1}$ entry's numerator is $-(K^{2}+76K-1260)$,
with positive root $K=14$.

**Check:** at $K=14$ the $s^{2}$ row gives $14s^{2}+42=0$, $\\omega=\\sqrt3$, and the quartic factors with
$s^{2}+3$.
`,
      solution: `
**Step 1: closed loop.**

$$s(s+1)(s+2)(s+5)+K(s+3)=s^{4}+8s^{3}+17s^{2}+(10+K)s+3K$$

**Step 2: Routh.**

$$\\begin{array}{c|ccc}
s^{4} & 1 & 17 & 3K\\\\
s^{3} & 8 & 10+K & 0\\\\
s^{2} & \\dfrac{126-K}{8} & 3K & 0\\\\
s^{1} & \\dfrac{\\tfrac{126-K}{8}(10+K)-24K}{\\tfrac{126-K}{8}} & 0 & 0\\\\
s^{0} & 3K & 0 & 0
\\end{array}$$

The $s^{2}$ entry: $\\dfrac{8\\cdot17-(10+K)}{8}=\\dfrac{126-K}{8}$.

The $s^{1}$ numerator: $\\dfrac{(126-K)(10+K)}{8}-24K=\\dfrac{1260+116K-K^{2}-192K}{8}=\\dfrac{-(K^{2}+76K-1260)}{8}$.

**Step 3: the row of zeros.** $K^{2}+76K-1260=0$, so $K=14$ or $K=-90$. The positive root is the
crossing.

**Step 4: frequency.** The $s^{2}$ row at $K=14$: $\\dfrac{112}{8}s^{2}+42=14s^{2}+42=0$, so
$\\omega=\\sqrt3\\approx1.73$ rad/s.

**Step 5: range.** For $0<K<14$: $126-K>0$, the $s^{1}$ numerator is positive, and $3K>0$. Stable
for $0<K<14$.

**Check.** At $K=14$: $s^{4}+8s^{3}+17s^{2}+24s+42=(s^{2}+3)(s^{2}+8s+14)$. Expanding:
$s^{4}+8s^{3}+17s^{2}+24s+42$ ✓.
`
    },
    {
      id: "8-16", difficulty: "core", topic: "Departure and arrival angles", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K(s+2)}{s^{2}+2s+5}$:

**(a)** Find the angle of departure from the pole at $-1+j2$.

**(b)** Find the break-in point and its gain.

**(c)** Show that the complex part of the locus is a circle centred on the zero.`,
      hint: `Draw every other vector to $-1+j2$: the zero's and the conjugate pole's.`,
      answer: `**(a)** $153.4^\\circ$. **(b)** $-2-\\sqrt5\\approx-4.24$, $K=2+2\\sqrt5\\approx6.47$. **(c)** Complex closed-loop
poles satisfy $(\\sigma+2)^{2}+\\omega^{2}=5$.`,
      expert: `
**First glance:** two complex poles and one real zero: the locus is an arc around the zero that
lands on the real axis to its left.

**Discard:** guessing the departure direction from the zero's position. The angle criterion fixes it.

**Path:** $63.43^\\circ-90^\\circ-\\theta=180^\\circ$ gives $\\theta=-206.57^\\circ\\equiv153.43^\\circ$.

**Check:** the distance from the zero to either pole is $\\sqrt{1+4}=\\sqrt5$, the radius of the circle.
`,
      solution: `
**Part (a).** Vectors to $-1+j2$:

| From | Vector | Angle |
|---|---|---|
| zero $-2$ | $1+j2$ | $63.43^\\circ$ |
| pole $-1-j2$ | $j4$ | $90^\\circ$ |
| pole $-1+j2$ | unknown | $\\theta$ |

$$63.43^\\circ-90^\\circ-\\theta=180^\\circ\\quad\\Longrightarrow\\quad\\theta=-206.57^\\circ\\equiv153.43^\\circ$$

The branch leaves up and to the left. By symmetry the lower one leaves at $-153.43^\\circ$.

**Part (b).** Transition equation:

$$\\frac{1}{\\sigma+2}=\\frac{2\\sigma+2}{\\sigma^{2}+2\\sigma+5}\\quad\\Longrightarrow\\quad\\sigma^{2}+2\\sigma+5=(2\\sigma+2)(\\sigma+2)$$

$$\\sigma^{2}+4\\sigma-1=0\\quad\\Longrightarrow\\quad\\sigma=-2\\pm\\sqrt5$$

Only $-2-\\sqrt5\\approx-4.24$ is on a locus segment, which is $(-\\infty,-2]$.

$$K=\\frac{|\\sigma^{2}+2\\sigma+5|}{|\\sigma+2|}=\\frac{(-4.236)^{2}+2(-4.236)+5}{2.236}=\\frac{14.47}{2.236}\\approx6.47$$

**Part (c).** Closed loop $s^{2}+(2+K)s+(5+2K)$. For complex roots: $2\\sigma=-(2+K)$ and
$\\sigma^{2}+\\omega^{2}=5+2K$. Eliminate $K=-2\\sigma-2$:

$$\\sigma^{2}+\\omega^{2}=5-4\\sigma-4\\quad\\Longrightarrow\\quad(\\sigma+2)^{2}+\\omega^{2}=5$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 404" class="nx-fig">
  <defs><marker id="nx8p16" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 202.0 L438.0 202.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p16)"/>
  <path d="M370.0 370.0 L370.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p16)"/>
  <text x="430.0" y="220.0" font-size="13">&#963;</text>
  <text x="376.0" y="32.0" font-size="13">j&#969;</text>
  <path d="M90.0 199.0 L90.0 205.0" stroke="currentColor" stroke-width="1"/>
  <text x="90.0" y="217.0" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M146.0 199.0 L146.0 205.0" stroke="currentColor" stroke-width="1"/>
  <text x="146.0" y="217.0" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M202.0 199.0 L202.0 205.0" stroke="currentColor" stroke-width="1"/>
  <text x="202.0" y="217.0" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M258.0 199.0 L258.0 205.0" stroke="currentColor" stroke-width="1"/>
  <text x="258.0" y="217.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M314.0 199.0 L314.0 205.0" stroke="currentColor" stroke-width="1"/>
  <text x="314.0" y="217.0" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M367.0 314.0 L373.0 314.0" stroke="currentColor" stroke-width="1"/>
  <text x="364.0" y="318.0" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M367.0 90.0 L373.0 90.0" stroke="currentColor" stroke-width="1"/>
  <text x="364.0" y="94.0" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M314.0 90.0 L312.6 89.3 L311.3 88.7 L309.9 88.0 L308.5 87.4 L307.1 86.8 L305.7 86.2 L304.2 85.6 L302.7 85.0 L301.3 84.5 L299.9 84.0 L298.4 83.5 L296.8 83.0 L295.3 82.5 L293.8 82.0 L292.3 81.6 L290.8 81.2 L289.3 80.7 L287.6 80.3 L285.9 79.9 L284.3 79.6 L282.7 79.2 L280.9 78.9 L279.1 78.6 L277.6 78.3 L276.0 78.1 L274.3 77.8 L272.6 77.6 L270.8 77.4 L268.9 77.3 L266.9 77.1 L265.3 77.0 L263.7 76.9 L262.1 76.8 L260.4 76.8 L258.6 76.8 L256.8 76.8 L254.9 76.8 L253.0 76.9 L251.0 77.0 L248.9 77.1 L246.8 77.3 L244.6 77.5 L243.1 77.7 L241.5 77.9 L240.0 78.1 L238.4 78.3 L236.7 78.6 L235.0 78.9 L233.3 79.2 L231.6 79.6 L229.8 80.0 L227.9 80.4 L226.1 80.9 L224.2 81.4 L222.2 82.0 L220.2 82.6 L218.2 83.3 L216.1 84.0 L214.0 84.8 L211.8 85.6 L209.6 86.5 L207.3 87.5 L205.0 88.6 L202.6 89.7 L200.2 90.9 L197.7 92.3 L195.2 93.7 L192.6 95.2 L191.3 96.0 L190.0 96.9 L188.6 97.8 L187.3 98.7 L185.9 99.6 L184.5 100.6 L183.1 101.7 L181.7 102.7 L180.3 103.8 L178.8 105.0 L177.3 106.2 L175.9 107.5 L174.4 108.8 L172.9 110.2 L171.3 111.6 L169.8 113.1 L168.2 114.7 L166.7 116.3 L165.1 118.1 L163.5 119.9 L161.8 121.8 L160.2 123.8 L158.5 125.9 L156.8 128.2 L155.1 130.6 L153.4 133.1 L151.7 135.8 L149.9 138.7 L148.2 141.9 L146.4 145.3 L144.6 149.0 L142.7 153.1 L140.9 157.7 L139.0 163.0 L137.1 169.3 L136.4 172.1 L136.0 173.6 L135.7 175.1 L135.4 176.6 L135.1 178.2 L134.8 179.7 L134.5 181.3 L134.3 182.9 L134.0 184.4 L133.8 186.1 L133.6 187.7 L133.4 189.2 L133.3 190.7 L133.2 192.2 L133.1 193.7 L133.0 195.2 L132.9 197.1 L132.8 198.8 L132.8 201.0 L134.7 202.0 L136.3 202.0 L137.8 202.0 L139.6 202.0 L141.2 202.0 L142.7 202.0 L144.4 202.0 L146.0 202.0 L147.6 202.0 L149.1 202.0 L150.7 202.0 L152.2 202.0 L153.8 202.0 L155.3 202.0 L156.9 202.0 L158.5 202.0 L164.6 202.0 L169.2 202.0 L173.0 202.0 L176.2 202.0 L179.2 202.0 L181.8 202.0 L184.2 202.0 L186.4 202.0 L188.4 202.0 L190.3 202.0 L192.0 202.0 L193.7 202.0 L195.3 202.0 L198.2 202.0 L200.8 202.0 L203.2 202.0 L205.4 202.0 L207.5 202.0 L209.4 202.0 L211.2 202.0 L212.9 202.0 L214.4 202.0 L216.6 202.0 L218.6 202.0 L220.5 202.0 L222.3 202.0 L223.9 202.0 L225.4 202.0 L227.3 202.0 L229.0 202.0 L230.6 202.0 L232.4 202.0 L234.1 202.0 L235.7 202.0 L237.3 202.0 L238.9 202.0 L240.5 202.0 L242.2 202.0 L243.8 202.0 L245.4 202.0 L247.0 202.0 L248.5 202.0 L250.0 202.0 L251.6 202.0 L253.1 202.0 L254.6 202.0 L256.1 202.0 L257.6 202.0 L257.7 202.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(158.5 125.9) rotate(126.8)"/>
  <path d="M314.0 314.0 L312.6 314.7 L311.3 315.3 L309.9 316.0 L308.5 316.6 L307.1 317.2 L305.7 317.8 L304.2 318.4 L302.7 319.0 L301.3 319.5 L299.9 320.0 L298.4 320.5 L296.8 321.0 L295.3 321.5 L293.8 322.0 L292.3 322.4 L290.8 322.8 L289.3 323.3 L287.6 323.7 L285.9 324.1 L284.3 324.4 L282.7 324.8 L280.9 325.1 L279.1 325.4 L277.6 325.7 L276.0 325.9 L274.3 326.2 L272.6 326.4 L270.8 326.6 L268.9 326.7 L266.9 326.9 L265.3 327.0 L263.7 327.1 L262.1 327.2 L260.4 327.2 L258.6 327.2 L256.8 327.2 L254.9 327.2 L253.0 327.1 L251.0 327.0 L248.9 326.9 L246.8 326.7 L244.6 326.5 L243.1 326.3 L241.5 326.1 L240.0 325.9 L238.4 325.7 L236.7 325.4 L235.0 325.1 L233.3 324.8 L231.6 324.4 L229.8 324.0 L227.9 323.6 L226.1 323.1 L224.2 322.6 L222.2 322.0 L220.2 321.4 L218.2 320.7 L216.1 320.0 L214.0 319.2 L211.8 318.4 L209.6 317.5 L207.3 316.5 L205.0 315.4 L202.6 314.3 L200.2 313.1 L197.7 311.7 L195.2 310.3 L192.6 308.8 L191.3 308.0 L190.0 307.1 L188.6 306.2 L187.3 305.3 L185.9 304.4 L184.5 303.4 L183.1 302.3 L181.7 301.3 L180.3 300.2 L178.8 299.0 L177.3 297.8 L175.9 296.5 L174.4 295.2 L172.9 293.8 L171.3 292.4 L169.8 290.9 L168.2 289.3 L166.7 287.7 L165.1 285.9 L163.5 284.1 L161.8 282.2 L160.2 280.2 L158.5 278.1 L156.8 275.8 L155.1 273.4 L153.4 270.9 L151.7 268.2 L149.9 265.3 L148.2 262.1 L146.4 258.7 L144.6 255.0 L142.7 250.9 L140.9 246.3 L139.0 241.0 L137.1 234.7 L136.4 231.9 L136.0 230.4 L135.7 228.9 L135.4 227.4 L135.1 225.8 L134.8 224.3 L134.5 222.7 L134.3 221.1 L134.0 219.6 L133.8 217.9 L133.6 216.3 L133.4 214.8 L133.3 213.3 L133.2 211.8 L133.1 210.3 L133.0 208.8 L132.9 206.9 L132.8 205.2 L132.8 203.0 L130.9 202.0 L129.2 202.0 L127.5 202.0 L125.9 202.0 L124.3 202.0 L122.7 202.0 L121.0 202.0 L119.4 202.0 L117.9 202.0 L116.3 202.0 L114.7 202.0 L113.1 202.0 L111.6 202.0 L110.0 202.0 L108.4 202.0 L106.8 202.0 L105.3 202.0 L103.7 202.0 L102.2 202.0 L100.7 202.0 L99.1 202.0 L90.1 202.0 L81.5 202.0 L73.6 202.0 L66.2 202.0 L59.1 202.0 L52.3 202.0 L45.7 202.0 L39.2 202.0 L32.8 202.0 L26.5 202.0 L26.5 202.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(165.1 285.9) rotate(-131.5)"/>
  <path d="M308.0 84.0 L320.0 96.0 M320.0 84.0 L308.0 96.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M308.0 308.0 L320.0 320.0 M320.0 308.0 L308.0 320.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="258.0" cy="202.0" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="132.8" cy="202.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="132.8" y="193.0" font-size="11" text-anchor="middle">−4.24</text>
  <path d="M314.0 90.0 L258.9 62.4" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#nx8p16)"/>
  <text x="322.0" y="84.0" font-size="11" text-anchor="start">153.4°</text>
</svg>
<figcaption>K(s+2)/(s²+2s+5). The branches leave the complex poles at ±153.4°, follow a circle of radius √5 centred on the zero, and meet at −4.24.</figcaption>
</figure>

**Check.** The circle passes through both open-loop poles ($(-1+2)^{2}+2^{2}=5$) and meets the axis at
$-2\\pm\\sqrt5$, matching part (b).
`
    },
    {
      id: "8-17", difficulty: "challenge", topic: "Departure and arrival angles", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K(s^{2}+4s+8)}{s(s+1)}$:

**(a)** Find the real-axis segments and the breakaway point.

**(b)** Find the angle of arrival at the zero $-2+j2$.

**(c)** Is the closed loop stable for every $K>0$?`,
      hint: `For the arrival angle, draw the vectors from both poles and from the other zero to $-2+j2$.`,
      answer: `**(a)** Segment $[-1,0]$; breakaway at about $-0.558$. **(b)** $341.6^\\circ$, that is, $-18.4^\\circ$.
**(c)** Yes: $(1+K)s^{2}+(1+4K)s+8K$ has all coefficients positive.`,
      expert: `
**First glance:** two poles, two complex zeros. The branches leave the axis between the poles and end on
the zeros, so the arrival angle tells you from which side they come in.

**Discard:** asymptotes; $n=m$.

**Path:** $\\theta_{\\text{arr}}=135^\\circ+116.57^\\circ-90^\\circ+180^\\circ=341.57^\\circ$.

**Check:** at $K=100$ the closed-loop poles are near $-1.985+j1.995$: just right of and below the zero,
which is the direction $-18.4^\\circ$ from it.
`,
      solution: `
**Part (a).** Real singularities: poles $0$ and $-1$. Segment $[-1,0]$. Transition equation, with the
complex zeros written as a quadratic:

$$\\frac{2\\sigma+4}{\\sigma^{2}+4\\sigma+8}=\\frac1\\sigma+\\frac{1}{\\sigma+1}=\\frac{2\\sigma+1}{\\sigma(\\sigma+1)}$$

$$(2\\sigma+4)(\\sigma^{2}+\\sigma)=(2\\sigma+1)(\\sigma^{2}+4\\sigma+8)$$

$$2\\sigma^{3}+6\\sigma^{2}+4\\sigma=2\\sigma^{3}+9\\sigma^{2}+20\\sigma+8\\quad\\Longrightarrow\\quad3\\sigma^{2}+16\\sigma+8=0$$

$$\\sigma=\\frac{-16\\pm\\sqrt{160}}{6}=-0.558,\\ -4.775$$

Only $-0.558$ is on $[-1,0]$.

**Part (b).** Vectors to $-2+j2$:

| From | Vector | Angle |
|---|---|---|
| pole $0$ | $-2+j2$ | $135^\\circ$ |
| pole $-1$ | $-1+j2$ | $116.57^\\circ$ |
| zero $-2-j2$ | $j4$ | $90^\\circ$ |

$$\\theta+90^\\circ-135^\\circ-116.57^\\circ=180^\\circ\\quad\\Longrightarrow\\quad\\theta=341.57^\\circ\\equiv-18.43^\\circ$$

**Part (c).** $s(s+1)+K(s^{2}+4s+8)=(1+K)s^{2}+(1+4K)s+8K$. Every coefficient is positive for $K>0$:
stable at every gain.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 506" class="nx-fig">
  <defs><marker id="nx8p17" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 253.0 L398.0 253.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p17)"/>
  <path d="M307.8 472.0 L307.8 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p17)"/>
  <text x="390.0" y="271.0" font-size="13">&#963;</text>
  <text x="313.8" y="32.0" font-size="13">j&#969;</text>
  <path d="M73.1 250.0 L73.1 256.0" stroke="currentColor" stroke-width="1"/>
  <text x="73.1" y="268.0" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M151.3 250.0 L151.3 256.0" stroke="currentColor" stroke-width="1"/>
  <text x="151.3" y="268.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M229.6 250.0 L229.6 256.0" stroke="currentColor" stroke-width="1"/>
  <text x="229.6" y="268.0" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M304.8 409.5 L310.8 409.5" stroke="currentColor" stroke-width="1"/>
  <text x="301.8" y="413.5" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M304.8 96.6 L310.8 96.6" stroke="currentColor" stroke-width="1"/>
  <text x="301.8" y="100.6" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M307.8 253.0 L306.3 253.0 L304.8 253.0 L303.2 253.0 L301.7 253.0 L300.1 253.0 L298.5 253.0 L296.9 253.0 L295.3 253.0 L293.7 253.0 L292.0 253.0 L290.3 253.0 L288.6 253.0 L287.0 253.0 L285.3 253.0 L283.7 253.0 L281.9 253.0 L280.4 253.0 L278.7 253.0 L276.7 253.0 L275.2 253.0 L273.4 253.0 L271.1 253.0 L267.7 253.0 L264.1 250.8 L264.0 248.2 L264.0 246.6 L263.9 244.2 L263.7 242.3 L263.6 240.6 L263.5 239.1 L263.3 237.1 L263.1 235.2 L262.9 233.5 L262.7 231.8 L262.5 230.3 L262.3 228.7 L262.0 226.8 L261.7 224.9 L261.3 223.0 L261.0 221.2 L260.6 219.5 L260.3 217.7 L259.9 216.0 L259.5 214.2 L259.0 212.5 L258.6 210.8 L258.1 209.1 L257.7 207.4 L257.2 205.7 L256.6 204.0 L256.1 202.3 L255.5 200.6 L254.9 198.9 L254.3 197.1 L253.7 195.4 L253.1 193.7 L252.4 192.0 L251.7 190.2 L250.9 188.5 L250.2 186.8 L249.4 185.0 L248.6 183.3 L247.8 181.5 L246.9 179.8 L246.0 178.0 L245.1 176.2 L244.2 174.5 L243.5 173.2 L242.7 171.8 L242.0 170.5 L241.2 169.2 L240.4 167.9 L239.6 166.6 L238.8 165.3 L238.0 164.0 L237.1 162.7 L236.3 161.4 L235.4 160.1 L234.5 158.8 L233.6 157.5 L232.7 156.3 L231.8 155.0 L230.9 153.7 L229.9 152.5 L228.9 151.3 L228.0 150.0 L227.0 148.8 L226.0 147.6 L225.0 146.4 L224.0 145.2 L222.9 144.0 L221.9 142.9 L220.9 141.7 L219.8 140.6 L218.8 139.5 L217.7 138.4 L216.6 137.3 L215.6 136.2 L214.5 135.1 L213.1 133.7 L211.6 132.4 L210.2 131.1 L208.7 129.8 L207.3 128.5 L205.9 127.3 L204.4 126.1 L203.0 124.9 L201.6 123.8 L200.2 122.7 L198.8 121.6 L197.4 120.6 L196.0 119.6 L194.7 118.6 L193.3 117.6 L192.0 116.7 L190.7 115.9 L189.5 115.0 L187.9 114.0 L186.4 113.0 L184.9 112.1 L183.4 111.3 L182.0 110.4 L180.6 109.6 L179.3 108.9 L177.8 108.0 L176.3 107.3 L174.9 106.5 L173.5 105.8 L172.0 105.1 L170.6 104.4 L169.1 103.6 L167.6 103.0 L166.1 102.3 L164.6 101.7 L163.2 101.1 L161.7 100.4 L160.3 99.9 L158.9 99.3 L157.5 98.8 L156.0 98.2 L154.6 97.7 L153.2 97.2 L151.7 96.7 L151.3 96.6" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(249.4 185.0) rotate(-114.7)"/>
  <path d="M229.6 253.0 L231.1 253.0 L232.6 253.0 L234.1 253.0 L235.6 253.0 L237.1 253.0 L238.7 253.0 L240.2 253.0 L241.9 253.0 L243.5 253.0 L245.0 253.0 L246.6 253.0 L248.4 253.0 L250.2 253.0 L251.8 253.0 L253.7 253.0 L255.3 253.0 L257.3 253.0 L260.6 253.0 L264.1 255.3 L264.0 257.8 L264.0 259.4 L263.9 261.9 L263.7 263.8 L263.6 265.5 L263.5 267.0 L263.3 269.0 L263.1 270.8 L262.9 272.6 L262.7 274.2 L262.5 275.8 L262.3 277.3 L262.0 279.3 L261.7 281.2 L261.3 283.0 L261.0 284.8 L260.6 286.6 L260.3 288.3 L259.9 290.1 L259.5 291.8 L259.0 293.5 L258.6 295.2 L258.1 297.0 L257.7 298.7 L257.2 300.4 L256.6 302.1 L256.1 303.8 L255.5 305.5 L254.9 307.2 L254.3 308.9 L253.7 310.6 L253.1 312.3 L252.4 314.1 L251.7 315.8 L250.9 317.5 L250.2 319.3 L249.4 321.0 L248.6 322.8 L247.8 324.5 L246.9 326.3 L246.0 328.0 L245.1 329.8 L244.2 331.6 L243.5 332.9 L242.7 334.2 L242.0 335.5 L241.2 336.8 L240.4 338.1 L239.6 339.4 L238.8 340.8 L238.0 342.1 L237.1 343.4 L236.3 344.7 L235.4 345.9 L234.5 347.2 L233.6 348.5 L232.7 349.8 L231.8 351.0 L230.9 352.3 L229.9 353.6 L228.9 354.8 L228.0 356.0 L227.0 357.2 L226.0 358.5 L225.0 359.7 L224.0 360.8 L222.9 362.0 L221.9 363.2 L220.9 364.3 L219.8 365.5 L218.8 366.6 L217.7 367.7 L216.6 368.8 L215.6 369.9 L214.5 370.9 L213.1 372.3 L211.6 373.7 L210.2 375.0 L208.7 376.3 L207.3 377.5 L205.9 378.8 L204.4 380.0 L203.0 381.1 L201.6 382.3 L200.2 383.4 L198.8 384.5 L197.4 385.5 L196.0 386.5 L194.7 387.5 L193.3 388.4 L192.0 389.3 L190.7 390.2 L189.5 391.0 L187.9 392.0 L186.4 393.0 L184.9 393.9 L183.4 394.8 L182.0 395.6 L180.6 396.4 L179.3 397.2 L177.8 398.0 L176.3 398.8 L174.9 399.5 L173.5 400.2 L172.0 401.0 L170.6 401.7 L169.1 402.4 L167.6 403.1 L166.1 403.7 L164.6 404.4 L163.2 405.0 L161.7 405.6 L160.3 406.2 L158.9 406.7 L157.5 407.3 L156.0 407.8 L154.6 408.3 L153.2 408.8 L151.7 409.3 L151.3 409.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(246.9 326.3) rotate(116.7)"/>
  <path d="M301.8 247.0 L313.8 259.0 M313.8 247.0 L301.8 259.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M223.6 247.0 L235.6 259.0 M235.6 247.0 L223.6 259.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="151.3" cy="96.6" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="151.3" cy="409.5" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="264.1" cy="253.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="264.1" y="271.0" font-size="11" text-anchor="middle">−0.56</text>
  <text x="161.3" y="88.6" font-size="11" text-anchor="start">arrives at −18.4°</text>
</svg>
<figcaption>K(s²+4s+8)/[s(s+1)]. The pair breaks away at −0.56 and approaches each complex zero from the lower right, arriving at −18.4°.</figcaption>
</figure>

**Check.** The locus stays in the left half-plane because both ends of every branch are there and,
for a second-order characteristic polynomial, positive coefficients are enough.
`
    },
    {
      id: "8-18", difficulty: "core", topic: "Calibrating the locus", sec: "8.5",
      prompt: `For $KG(s)=\\dfrac{K}{(s+2)(s+4)(s+6)}$ in a unity loop, find the point where the root locus
crosses the $\\zeta=0.707$ line, the gain there, and the third closed-loop pole.`,
      hint: `Put $s=\\omega_{n}e^{j135^\\circ}$ into $s^{3}+12s^{2}+44s+48+K$. The imaginary part does not
contain $K$.`,
      answer: `$s\\approx-2.26\\pm j2.26$ ($\\omega_{n}\\approx3.19$), $K\\approx28.3$; third pole near $-7.48$.`,
      expert: `
**First glance:** $\\zeta=0.707$ is the $45^\\circ$ line, $s=-a+ja$. Substituting that form is simpler
than polar form.

**Discard:** the trial-and-error search; for a cubic the crossing is two equations in two unknowns.

**Path:** with $s=-a+ja$: $s^{2}=-j2a^{2}$, $s^{3}=2a^{3}+j2a^{3}$. The imaginary part,
$2a^{3}-24a^{2}+44a=0$, gives $a$; the real part gives $K$.

**Check:** the closed-loop poles sum to $-12$.
`,
      solution: `
**Step 1: closed loop.** $(s+2)(s+4)(s+6)+K=s^{3}+12s^{2}+44s+48+K$.

**Step 2: substitute $s=-a+ja$.**

$$s^{2}=(-a+ja)^{2}=-j2a^{2},\\qquad s^{3}=s\\cdot s^{2}=(-a+ja)(-j2a^{2})=2a^{3}+j2a^{3}$$

**Step 3: imaginary part.**

$$2a^{3}-24a^{2}+44a=0\\quad\\Longrightarrow\\quad a^{2}-12a+22=0\\quad\\Longrightarrow\\quad a=6\\pm\\sqrt{14}$$

so $a=2.258$ or $9.742$.

**Step 4: real part.**

$$2a^{3}+0-44a+48+K=0\\quad\\Longrightarrow\\quad K=44a-2a^{3}-48$$

$a=2.258$: $K=99.36-23.03-48\\approx28.3$. $a=9.742$: $K<0$, not on the $K>0$ locus.

**Step 5: the point and the third pole.**

$$s=-2.26\\pm j2.26,\\qquad \\omega_{n}=2.258\\sqrt2\\approx3.19$$

The three poles sum to $-12$: third pole $=-12+2(2.258)\\approx-7.48$.

**Check.** $K$ by lengths: $|s+2||s+4||s+6|=|{-0.258}+j2.258|\\cdot|1.742+j2.258|\\cdot|3.742+j2.258|$
$\\approx2.273\\cdot2.852\\cdot4.371\\approx28.3$ ✓.
`
    },
    {
      id: "8-19", difficulty: "core", topic: "jω-axis crossing", sec: "8.5",
      prompt: `Find the $j\\omega$-axis crossing of the root locus of $\\dfrac{K}{(s+1)(s+2)(s+3)}$ **without** a Routh
table: use the angle criterion on $s=j\\omega$, then the magnitude criterion for $K$. Compare with
7-04.`,
      hint: `On the axis the three pole angles are $\\tan^{-1}\\omega$, $\\tan^{-1}(\\omega/2)$, $\\tan^{-1}(\\omega/3)$, and
they must add to $180^\\circ$. Take the tangent of the first two together.`,
      answer: `$\\omega=\\sqrt{11}\\approx3.32$ rad/s, $K=60$.`,
      expert: `
**First glance:** three real poles, so the angles at $j\\omega$ are arctangents and the condition is that
they sum to $180^\\circ$.

**Discard:** numerical search. The tangent addition formula turns the condition into a polynomial.

**Path:** $\\tan^{-1}\\omega+\\tan^{-1}(\\omega/2)=180^\\circ-\\tan^{-1}(\\omega/3)$; take tangents:
$\\dfrac{3\\omega/2}{1-\\omega^{2}/2}=-\\dfrac\\omega3$, so $\\omega^{2}=11$.

**Check:** Routh on $s^{3}+6s^{2}+11s+6+K$ gives $66=6+K$, $K=60$, $6s^{2}+66=0$: the same crossing,
and the same boundary as 7-04 and 7-27.
`,
      solution: `
**Step 1: the angle condition at $s=j\\omega$.** Each pole at $-a$ contributes $\\tan^{-1}(\\omega/a)$:

$$\\tan^{-1}\\omega+\\tan^{-1}\\frac\\omega2+\\tan^{-1}\\frac\\omega3=180^\\circ$$

**Step 2: tangent addition.** $\\tan^{-1}\\omega+\\tan^{-1}\\tfrac\\omega2$ has tangent
$\\dfrac{\\omega+\\omega/2}{1-\\omega^{2}/2}$. It must equal $\\tan(180^\\circ-\\tan^{-1}\\tfrac\\omega3)=-\\tfrac\\omega3$:

$$\\frac{3\\omega/2}{1-\\omega^{2}/2}=-\\frac\\omega3\\quad\\Longrightarrow\\quad\\frac92=-1+\\frac{\\omega^{2}}{2}\\quad\\Longrightarrow\\quad\\omega^{2}=11$$

$\\omega=\\sqrt{11}\\approx3.32$ rad/s.

**Step 3: the gain.**

$$K=|j\\omega+1|\\,|j\\omega+2|\\,|j\\omega+3|=\\sqrt{12}\\sqrt{15}\\sqrt{20}=\\sqrt{3600}=60$$

**Check.** Angles: $\\tan^{-1}3.317=73.2^\\circ$, $\\tan^{-1}1.658=58.9^\\circ$, $\\tan^{-1}1.106=47.9^\\circ$;
sum $180.0^\\circ$. Routh on $s^{3}+6s^{2}+11s+(6+K)$: the cubic rule $66>6+K$ gives the same $K=60$.
`
    },
    {
      id: "8-20", difficulty: "challenge", topic: "Complete sketch", sec: "8.6",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{K(s^{2}-4s+13)}{(s+1)(s+3)}$$

whose zeros are $2\\pm j3$. Sketch the root locus and find:

**(a)** the breakaway point and its gain;

**(b)** the $j\\omega$ crossing and the range of $K$ for stability;

**(c)** the angle of arrival at $2+j3$;

**(d)** the point and gain where the locus crosses the $\\zeta=0.5$ line.`,
      hint: `Closed loop: $(1+K)s^{2}+(4-4K)s+(3+13K)$. Second order, so stability is "all coefficients
positive". For (d), put $s=\\omega_{n}e^{j120^\\circ}$ into it.`,
      answer: `**(a)** $\\sigma\\approx-1.84$, $K\\approx0.041$. **(b)** $\\pm j2\\sqrt2$ at $K=1$; stable for $0<K<1$.
**(c)** About $166.0^\\circ$. **(d)** $s\\approx-1.14\\pm j1.97$ ($\\omega_{n}\\approx2.27$) at $K\\approx0.276$.`,
      expert: `
**First glance:** the branches end on zeros in the right half-plane, so the loop has an upper gain
limit despite $n=m$.

**Discard:** asymptotes; there are none. Routh on a quadratic is "all coefficients positive".

**Path:** $4-4K>0$ is the only condition that can fail: $K<1$. At $K=1$, $2s^{2}+16=0$.

**Check:** the damping-ratio crossing has to come before the axis crossing along the branch, and
$0.276<1$.
`,
      solution: `
**Shape.** Real-axis segment $[-3,-1]$. The two branches start at $-1$ and $-3$, meet, leave the axis,
and end on the zeros $2\\pm j3$, crossing the $j\\omega$ axis on the way.

**Part (a).** Transition equation, with the complex zeros as a quadratic:

$$\\frac{2\\sigma-4}{\\sigma^{2}-4\\sigma+13}=\\frac{1}{\\sigma+1}+\\frac{1}{\\sigma+3}=\\frac{2\\sigma+4}{\\sigma^{2}+4\\sigma+3}$$

Cross-multiplying and collecting gives $8\\sigma^{2}-20\\sigma-64=0$, i.e. $2\\sigma^{2}-5\\sigma-16=0$:

$$\\sigma=\\frac{5\\pm\\sqrt{153}}{4}=-1.842,\\ 4.342$$

$-1.842$ is on $[-3,-1]$.

$$K=\\frac{|\\sigma+1||\\sigma+3|}{\\sigma^{2}-4\\sigma+13}=\\frac{0.842\\cdot1.158}{3.39+7.37+13}\\approx0.041$$

**Part (b).** Closed loop:

$$(s+1)(s+3)+K(s^{2}-4s+13)=(1+K)s^{2}+(4-4K)s+(3+13K)$$

All positive iff $K<1$. At $K=1$: $2s^{2}+16=0$, $s=\\pm j2\\sqrt2\\approx\\pm j2.83$. **Stable for
$0<K<1$.**

**Part (c).** Vectors to $2+j3$:

| From | Vector | Angle |
|---|---|---|
| pole $-1$ | $3+j3$ | $45^\\circ$ |
| pole $-3$ | $5+j3$ | $30.96^\\circ$ |
| zero $2-j3$ | $j6$ | $90^\\circ$ |

$$\\theta+90^\\circ-45^\\circ-30.96^\\circ=180^\\circ\\quad\\Longrightarrow\\quad\\theta=165.96^\\circ$$

The branches approach the zeros from the left, slightly from below.

**Part (d).** For a second-order closed loop, match coefficients. Dividing by $1+K$:

$$2\\zeta\\omega_{n}=\\frac{4-4K}{1+K},\\qquad \\omega_{n}^{2}=\\frac{3+13K}{1+K}$$

With $\\zeta=0.5$, $\\omega_{n}^{2}=(2\\zeta\\omega_{n})^{2}$:

$$\\frac{3+13K}{1+K}=\\frac{16(1-K)^{2}}{(1+K)^{2}}\\quad\\Longrightarrow\\quad(3+13K)(1+K)=16(1-K)^{2}$$

$$13K^{2}+16K+3=16K^{2}-32K+16\\quad\\Longrightarrow\\quad3K^{2}-48K+13=0$$

$$K=\\frac{48-\\sqrt{2148}}{6}\\approx0.276$$

(the other root, $15.7$, makes $4-4K$ negative). Then $\\omega_{n}=\\dfrac{4-4K}{1+K}\\approx2.27$, and
$s=-1.14\\pm j1.97$.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 460" class="nx-fig">
  <defs><marker id="nx8p20" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 230.0 L438.0 230.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p20)"/>
  <path d="M230.0 426.0 L230.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p20)"/>
  <text x="430.0" y="248.0" font-size="13">&#963;</text>
  <text x="236.0" y="32.0" font-size="13">j&#969;</text>
  <path d="M83.0 227.0 L83.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="83.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M132.0 227.0 L132.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="132.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M181.0 227.0 L181.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="181.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M279.0 227.0 L279.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="279.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">1</text>
  <path d="M328.0 227.0 L328.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="328.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">2</text>
  <path d="M377.0 227.0 L377.0 233.0" stroke="currentColor" stroke-width="1"/>
  <text x="377.0" y="245.0" font-size="11" text-anchor="middle" opacity=".75">3</text>
  <path d="M227.0 377.0 L233.0 377.0" stroke="currentColor" stroke-width="1"/>
  <text x="224.0" y="381.0" font-size="11" text-anchor="end" opacity=".75">−j3</text>
  <path d="M227.0 328.0 L233.0 328.0" stroke="currentColor" stroke-width="1"/>
  <text x="224.0" y="332.0" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M227.0 132.0 L233.0 132.0" stroke="currentColor" stroke-width="1"/>
  <text x="224.0" y="136.0" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M227.0 83.0 L233.0 83.0" stroke="currentColor" stroke-width="1"/>
  <text x="224.0" y="87.0" font-size="11" text-anchor="end" opacity=".75">j3</text>
  <path d="M181.0 230.0 L179.5 230.0 L178.0 230.0 L176.4 230.0 L174.9 230.0 L173.3 230.0 L171.7 230.0 L170.2 230.0 L168.6 230.0 L166.9 230.0 L165.4 230.0 L163.6 230.0 L161.8 230.0 L160.2 230.0 L158.4 230.0 L156.7 230.0 L154.8 230.0 L153.3 230.0 L151.5 230.0 L149.3 230.0 L146.4 230.0 L144.9 230.0 L143.4 230.0 L141.9 230.0 L140.3 230.0 L139.7 228.5 L139.8 227.0 L139.8 225.5 L139.8 224.0 L139.9 221.9 L140.0 220.3 L140.2 217.7 L140.4 215.5 L140.6 213.5 L140.8 211.7 L141.0 210.1 L141.3 208.5 L141.6 206.3 L141.9 204.3 L142.3 202.3 L142.6 200.4 L143.0 198.6 L143.4 196.8 L143.8 195.0 L144.2 193.3 L144.7 191.6 L145.1 190.0 L145.6 188.3 L146.0 186.7 L146.5 185.1 L147.0 183.5 L147.5 181.9 L148.1 180.4 L148.6 178.8 L149.2 177.2 L149.8 175.7 L150.4 174.1 L151.0 172.6 L151.7 171.0 L152.3 169.5 L153.0 168.0 L153.7 166.4 L154.4 164.9 L155.2 163.3 L155.9 161.8 L156.7 160.3 L157.5 158.7 L158.4 157.2 L159.2 155.7 L160.1 154.1 L161.0 152.6 L161.9 151.1 L162.9 149.5 L163.8 148.0 L164.8 146.5 L165.8 145.0 L166.9 143.4 L168.0 141.9 L169.1 140.4 L170.2 138.9 L171.3 137.4 L172.5 135.9 L173.7 134.4 L174.9 132.9 L176.2 131.4 L177.4 130.0 L178.7 128.5 L180.1 127.1 L181.4 125.6 L182.8 124.2 L184.2 122.8 L185.6 121.4 L187.1 120.0 L188.5 118.6 L190.0 117.3 L191.5 115.9 L193.1 114.6 L194.6 113.3 L196.2 112.0 L197.8 110.7 L199.4 109.5 L201.1 108.2 L202.7 107.0 L204.4 105.8 L206.1 104.7 L207.8 103.5 L209.5 102.4 L211.3 101.3 L213.0 100.2 L214.8 99.2 L216.5 98.2 L218.3 97.2 L220.1 96.2 L221.9 95.3 L223.7 94.4 L225.5 93.5 L227.3 92.6 L229.1 91.8 L230.9 91.0 L232.7 90.2 L234.5 89.5 L236.3 88.8 L238.1 88.1 L239.9 87.4 L241.7 86.8 L243.5 86.2 L245.2 85.6 L247.0 85.1 L248.7 84.6 L250.5 84.1 L252.2 83.6 L253.9 83.2 L255.6 82.7 L257.3 82.3 L258.9 82.0 L260.6 81.6 L262.2 81.3 L263.8 81.0 L265.4 80.7 L266.9 80.4 L268.5 80.2 L270.0 80.0 L271.5 79.8 L273.4 79.5 L275.3 79.3 L277.2 79.1 L279.0 79.0 L280.8 78.8 L282.6 78.7 L284.3 78.6 L285.9 78.6 L287.5 78.5 L289.1 78.5 L290.6 78.5 L292.4 78.5 L294.2 78.5 L295.8 78.5 L297.5 78.6 L299.0 78.7 L300.8 78.8 L302.5 78.9 L304.1 79.0 L305.6 79.2 L307.2 79.3 L308.8 79.5 L310.4 79.7 L311.9 79.9 L313.5 80.1 L315.0 80.4 L316.6 80.6 L318.1 80.9 L319.6 81.1 L321.1 81.4 L322.6 81.8 L324.1 82.1 L325.6 82.4 L327.1 82.8 L328.0 83.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(172.5 135.9) rotate(-51.2)"/>
  <path d="M83.0 230.0 L84.5 230.0 L86.0 230.0 L87.6 230.0 L89.1 230.0 L90.7 230.0 L92.2 230.0 L93.7 230.0 L95.4 230.0 L96.9 230.0 L98.5 230.0 L100.1 230.0 L101.8 230.0 L103.5 230.0 L105.0 230.0 L106.6 230.0 L108.5 230.0 L110.1 230.0 L111.9 230.0 L113.8 230.0 L115.4 230.0 L117.2 230.0 L119.2 230.0 L121.3 230.0 L123.0 230.0 L124.8 230.0 L126.9 230.0 L129.5 230.0 L131.0 230.0 L132.7 230.0 L134.2 230.0 L135.7 230.0 L137.3 230.0 L138.8 230.0 L139.7 231.2 L139.8 232.7 L139.8 234.2 L139.8 235.8 L139.9 238.1 L140.0 239.7 L140.2 242.3 L140.4 244.5 L140.6 246.5 L140.8 248.3 L141.0 249.9 L141.3 251.5 L141.6 253.7 L141.9 255.7 L142.3 257.7 L142.6 259.6 L143.0 261.4 L143.4 263.2 L143.8 265.0 L144.2 266.7 L144.7 268.4 L145.1 270.0 L145.6 271.7 L146.0 273.3 L146.5 274.9 L147.0 276.5 L147.5 278.1 L148.1 279.6 L148.6 281.2 L149.2 282.8 L149.8 284.3 L150.4 285.9 L151.0 287.4 L151.7 289.0 L152.3 290.5 L153.0 292.0 L153.7 293.6 L154.4 295.1 L155.2 296.7 L155.9 298.2 L156.7 299.7 L157.5 301.3 L158.4 302.8 L159.2 304.3 L160.1 305.9 L161.0 307.4 L161.9 308.9 L162.9 310.5 L163.8 312.0 L164.8 313.5 L165.8 315.0 L166.9 316.6 L168.0 318.1 L169.1 319.6 L170.2 321.1 L171.3 322.6 L172.5 324.1 L173.7 325.6 L174.9 327.1 L176.2 328.6 L177.4 330.0 L178.7 331.5 L180.1 332.9 L181.4 334.4 L182.8 335.8 L184.2 337.2 L185.6 338.6 L187.1 340.0 L188.5 341.4 L190.0 342.7 L191.5 344.1 L193.1 345.4 L194.6 346.7 L196.2 348.0 L197.8 349.3 L199.4 350.5 L201.1 351.8 L202.7 353.0 L204.4 354.2 L206.1 355.3 L207.8 356.5 L209.5 357.6 L211.3 358.7 L213.0 359.8 L214.8 360.8 L216.5 361.8 L218.3 362.8 L220.1 363.8 L221.9 364.7 L223.7 365.6 L225.5 366.5 L227.3 367.4 L229.1 368.2 L230.9 369.0 L232.7 369.8 L234.5 370.5 L236.3 371.2 L238.1 371.9 L239.9 372.6 L241.7 373.2 L243.5 373.8 L245.2 374.4 L247.0 374.9 L248.7 375.4 L250.5 375.9 L252.2 376.4 L253.9 376.8 L255.6 377.3 L257.3 377.7 L258.9 378.0 L260.6 378.4 L262.2 378.7 L263.8 379.0 L265.4 379.3 L266.9 379.6 L268.5 379.8 L270.0 380.0 L271.5 380.2 L273.4 380.5 L275.3 380.7 L277.2 380.9 L279.0 381.0 L280.8 381.2 L282.6 381.3 L284.3 381.4 L285.9 381.4 L287.5 381.5 L289.1 381.5 L290.6 381.5 L292.4 381.5 L294.2 381.5 L295.8 381.5 L297.5 381.4 L299.0 381.3 L300.8 381.2 L302.5 381.1 L304.1 381.0 L305.6 380.8 L307.2 380.7 L308.8 380.5 L310.4 380.3 L311.9 380.1 L313.5 379.9 L315.0 379.6 L316.6 379.4 L318.1 379.1 L319.6 378.9 L321.1 378.6 L322.6 378.2 L324.1 377.9 L325.6 377.6 L327.1 377.2 L328.0 377.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(168.0 318.1) rotate(54.1)"/>
  <path d="M175.0 224.0 L187.0 236.0 M187.0 224.0 L175.0 236.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M77.0 224.0 L89.0 236.0 M89.0 224.0 L77.0 236.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="328.0" cy="83.0" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="328.0" cy="377.0" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="230.0" cy="91.4" r="4" fill="currentColor" stroke="none"/>
  <circle cx="230.0" cy="368.6" r="4" fill="currentColor" stroke="none"/>
  <text x="238.0" y="105.4" font-size="11" text-anchor="start">j2.83, K = 1</text>
  <path d="M230.0 230.0 L141.8 77.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="169.8" y="129.1" width="9" height="9" fill="currentColor" stroke="none"/>
  <text x="166.3" y="129.6" font-size="11" text-anchor="end">K = 0.276</text>
  <circle cx="139.7" cy="230.0" r="3.5" fill="currentColor" stroke="none"/>
  <text x="135.7" y="222.0" font-size="11" text-anchor="end">−1.84</text>
</svg>
<figcaption>K(s²−4s+13)/[(s+1)(s+3)]. The branches end on zeros in the right half-plane, so stability is lost at K = 1. The ζ = 0.5 line (dashed) is crossed at K = 0.276.</figcaption>
</figure>

**Check.** At $K=0.276$: $1.276s^{2}+2.896s+6.59$, i.e. $s^{2}+2.27s+5.16$, with $\\zeta=2.27/(2\\sqrt{5.16})=0.50$ ✓.
`
    },
    {
      id: "8-21", difficulty: "challenge", topic: "Complete sketch", sec: "8.6",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{K(s+1)}{s(s-1)(s+6)}$$

**(a)** Find the real-axis segments and asymptotes.

**(b)** Find the $j\\omega$ crossing.

**(c)** For what gains is the closed loop stable? How does this differ from the loops of 8-14 and
8-15?`,
      hint: `Closed loop $s^{3}+5s^{2}+(K-6)s+K$. Use the cubic rule.`,
      answer: `**(a)** Segments $[0,1]$ and $[-6,-1]$; asymptotes at $\\sigma_{a}=-2$, $\\pm90^\\circ$. **(b)** $\\pm j\\sqrt{1.5}\\approx\\pm j1.22$
at $K=7.5$. **(c)** Stable for $K>7.5$: unstable at low gain and stable at high gain, the reverse of 8-14
and 8-15.`,
      expert: `
**First glance:** one open-loop pole at $+1$. Two branches start on the right, and $n-m=2$ with
$\\sigma_{a}<0$ pulls them left as $K$ grows.

**Discard:** a full table; the cubic rule gives the condition.

**Path:** $5(K-6)>K$ gives $K>7.5$; at $K=7.5$, $5s^{2}+7.5=0$.

**Check:** at $K=10$ the poles are $-4.60$ and $-0.20\\pm j1.46$: all on the left.
`,
      solution: `
**Part (a).** Walking from the right: on at $1$, off at $0$, on at $-1$, off at $-6$. Segments $[0,1]$
and $[-6,-1]$. With $n-m=2$:

$$\\sigma_{a}=\\frac{(0+1-6)-(-1)}{2}=-2,\\qquad\\theta_{a}=\\pm90^\\circ$$

The poles at $0$ and $1$ meet near $0.43$ and leave the axis; the branch from $-6$ runs right to the
zero at $-1$.

**Part (b).** Closed loop:

$$s(s-1)(s+6)+K(s+1)=s^{3}+5s^{2}+(K-6)s+K$$

Cubic rule boundary: $5(K-6)=K$, so $K=7.5$. The $s^{2}$ row gives $5s^{2}+7.5=0$:
$\\omega=\\sqrt{1.5}\\approx1.22$ rad/s.

**Part (c).** Stable iff $K-6>0$, $K>0$ and $5(K-6)>K$. The last is the strongest: **$K>7.5$**.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 416" class="nx-fig">
  <defs><marker id="nx8p21" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 208.2 L438.0 208.2" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p21)"/>
  <path d="M338.9 382.4 L338.9 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p21)"/>
  <text x="430.0" y="226.2" font-size="13">&#963;</text>
  <text x="344.9" y="32.0" font-size="13">j&#969;</text>
  <path d="M77.6 205.2 L77.6 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="77.6" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M121.1 205.2 L121.1 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="121.1" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−5</text>
  <path d="M164.7 205.2 L164.7 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="164.7" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M208.2 205.2 L208.2 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="208.2" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M251.8 205.2 L251.8 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="251.8" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M295.3 205.2 L295.3 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="295.3" y="223.2" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M382.4 205.2 L382.4 211.2" stroke="currentColor" stroke-width="1"/>
  <text x="382.4" y="223.2" font-size="11" text-anchor="middle" opacity=".75">1</text>
  <path d="M335.9 338.9 L341.9 338.9" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="342.9" font-size="11" text-anchor="end" opacity=".75">−j3</text>
  <path d="M335.9 295.3 L341.9 295.3" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="299.3" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M335.9 251.8 L341.9 251.8" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="255.8" font-size="11" text-anchor="end" opacity=".75">−j</text>
  <path d="M335.9 164.7 L341.9 164.7" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="168.7" font-size="11" text-anchor="end" opacity=".75">j</text>
  <path d="M335.9 121.1 L341.9 121.1" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="125.1" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M335.9 77.6 L341.9 77.6" stroke="currentColor" stroke-width="1"/>
  <text x="332.9" y="81.6" font-size="11" text-anchor="end" opacity=".75">j3</text>
  <path d="M338.9 208.2 L340.4 208.2 L341.9 208.2 L343.5 208.2 L345.1 208.2 L346.6 208.2 L348.3 208.2 L349.9 208.2 L351.5 208.2 L353.1 208.2 L355.0 208.2 L357.8 206.8 L357.7 204.7 L357.6 202.9 L357.5 201.1 L357.3 199.3 L357.1 197.7 L356.8 196.0 L356.6 194.4 L356.3 192.9 L356.0 191.4 L355.6 189.7 L355.2 188.0 L354.8 186.4 L354.3 184.7 L353.8 183.1 L353.3 181.6 L352.8 180.2 L352.3 178.7 L351.7 177.2 L351.0 175.7 L350.4 174.1 L349.6 172.5 L348.9 170.9 L348.2 169.5 L347.4 168.1 L346.6 166.7 L345.8 165.2 L344.9 163.7 L343.9 162.2 L343.1 160.9 L342.3 159.6 L341.4 158.3 L340.4 156.9 L339.4 155.6 L338.3 154.2 L337.2 152.7 L336.0 151.2 L334.8 149.7 L333.8 148.6 L332.7 147.4 L331.7 146.2 L330.5 144.9 L329.3 143.6 L328.1 142.3 L326.8 141.0 L325.4 139.6 L324.0 138.2 L322.4 136.7 L320.8 135.2 L319.7 134.2 L318.6 133.1 L317.4 132.0 L316.2 130.9 L314.9 129.7 L313.6 128.5 L312.2 127.3 L310.8 126.0 L309.3 124.6 L307.8 123.2 L306.2 121.8 L304.6 120.2 L302.9 118.6 L301.1 116.9 L299.4 115.1 L297.5 113.2 L295.7 111.2 L293.8 109.1 L291.9 106.8 L291.0 105.6 L290.0 104.4 L289.1 103.2 L288.2 101.9 L287.2 100.6 L286.3 99.2 L285.4 97.8 L284.5 96.4 L283.7 95.0 L282.8 93.5 L282.0 92.0 L281.2 90.5 L280.4 88.9 L279.6 87.4 L278.8 85.8 L278.1 84.1 L277.4 82.5 L276.7 80.9 L276.1 79.2 L275.4 77.5 L274.8 75.8 L274.2 74.2 L273.6 72.4 L273.1 70.7 L272.5 69.0 L272.0 67.3 L271.5 65.6 L271.0 63.8 L270.6 62.1 L270.1 60.3 L269.7 58.6 L269.3 56.8 L268.9 55.1 L268.5 53.3 L268.1 51.6 L267.8 49.8 L267.4 48.0 L267.1 46.3 L266.7 44.5 L266.4 42.7 L266.1 40.9 L265.8 39.2 L265.5 37.4 L265.2 35.6 L265.0 33.8 L264.7 32.0 L264.4 30.3 L264.2 28.5 L264.0 26.7 L264.0 26.7" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(319.7 134.2) rotate(-137.1)"/>
  <path d="M382.4 208.2 L380.9 208.2 L379.4 208.2 L377.9 208.2 L376.4 208.2 L374.8 208.2 L373.2 208.2 L371.6 208.2 L370.0 208.2 L368.3 208.2 L366.8 208.2 L365.2 208.2 L363.7 208.2 L362.1 208.2 L359.6 208.2 L357.8 209.6 L357.7 211.7 L357.6 213.5 L357.5 215.3 L357.3 217.1 L357.1 218.7 L356.8 220.4 L356.6 222.0 L356.3 223.6 L356.0 225.1 L355.6 226.7 L355.2 228.4 L354.8 230.1 L354.3 231.7 L353.8 233.4 L353.3 234.8 L352.8 236.3 L352.3 237.7 L351.7 239.2 L351.0 240.8 L350.4 242.3 L349.6 243.9 L348.9 245.5 L348.2 246.9 L347.4 248.3 L346.6 249.8 L345.8 251.2 L344.9 252.7 L343.9 254.3 L343.1 255.6 L342.3 256.8 L341.4 258.2 L340.4 259.5 L339.4 260.9 L338.3 262.3 L337.2 263.7 L336.0 265.2 L334.8 266.7 L333.8 267.9 L332.7 269.1 L331.7 270.3 L330.5 271.5 L329.3 272.8 L328.1 274.1 L326.8 275.5 L325.4 276.8 L324.0 278.3 L322.4 279.7 L320.8 281.2 L319.7 282.3 L318.6 283.3 L317.4 284.4 L316.2 285.6 L314.9 286.7 L313.6 287.9 L312.2 289.2 L310.8 290.5 L309.3 291.8 L307.8 293.2 L306.2 294.7 L304.6 296.2 L302.9 297.8 L301.1 299.5 L299.4 301.3 L297.5 303.2 L295.7 305.2 L293.8 307.4 L291.9 309.6 L291.0 310.8 L290.0 312.0 L289.1 313.3 L288.2 314.5 L287.2 315.9 L286.3 317.2 L285.4 318.6 L284.5 320.0 L283.7 321.5 L282.8 322.9 L282.0 324.4 L281.2 326.0 L280.4 327.5 L279.6 329.1 L278.8 330.7 L278.1 332.3 L277.4 333.9 L276.7 335.6 L276.1 337.2 L275.4 338.9 L274.8 340.6 L274.2 342.3 L273.6 344.0 L273.1 345.7 L272.5 347.4 L272.0 349.2 L271.5 350.9 L271.0 352.6 L270.6 354.4 L270.1 356.1 L269.7 357.9 L269.3 359.6 L268.9 361.4 L268.5 363.1 L268.1 364.9 L267.8 366.7 L267.4 368.4 L267.1 370.2 L266.7 372.0 L266.4 373.7 L266.1 375.5 L265.8 377.3 L265.5 379.1 L265.2 380.8 L265.0 382.6 L264.7 384.4 L264.4 386.2 L264.2 388.0 L264.0 389.8 L264.0 389.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(322.4 279.7) rotate(136.5)"/>
  <path d="M77.6 208.2 L79.1 208.2 L80.6 208.2 L82.1 208.2 L83.6 208.2 L85.2 208.2 L86.8 208.2 L88.3 208.2 L89.9 208.2 L91.5 208.2 L93.1 208.2 L94.8 208.2 L96.4 208.2 L97.9 208.2 L99.6 208.2 L101.2 208.2 L102.9 208.2 L104.4 208.2 L106.0 208.2 L107.7 208.2 L109.5 208.2 L111.0 208.2 L112.7 208.2 L114.4 208.2 L116.2 208.2 L118.1 208.2 L120.1 208.2 L121.7 208.2 L123.3 208.2 L125.0 208.2 L126.8 208.2 L128.7 208.2 L130.7 208.2 L132.7 208.2 L134.8 208.2 L137.1 208.2 L138.6 208.2 L140.2 208.2 L141.9 208.2 L143.6 208.2 L145.3 208.2 L147.2 208.2 L149.0 208.2 L151.0 208.2 L153.0 208.2 L155.0 208.2 L157.2 208.2 L159.4 208.2 L161.7 208.2 L164.1 208.2 L166.6 208.2 L169.1 208.2 L171.8 208.2 L174.5 208.2 L177.4 208.2 L180.3 208.2 L181.8 208.2 L183.4 208.2 L184.9 208.2 L186.5 208.2 L188.1 208.2 L189.8 208.2 L191.4 208.2 L193.1 208.2 L194.9 208.2 L196.6 208.2 L198.4 208.2 L200.2 208.2 L202.0 208.2 L203.8 208.2 L205.7 208.2 L207.5 208.2 L209.4 208.2 L211.3 208.2 L213.2 208.2 L215.1 208.2 L216.9 208.2 L218.8 208.2 L220.7 208.2 L222.6 208.2 L224.4 208.2 L226.3 208.2 L228.1 208.2 L229.8 208.2 L231.6 208.2 L233.3 208.2 L235.0 208.2 L236.6 208.2 L238.2 208.2 L239.7 208.2 L241.2 208.2 L244.1 208.2 L246.8 208.2 L249.3 208.2 L251.6 208.2 L253.8 208.2 L255.8 208.2 L257.7 208.2 L259.5 208.2 L261.1 208.2 L262.7 208.2 L264.8 208.2 L266.7 208.2 L268.4 208.2 L270.0 208.2 L271.9 208.2 L273.6 208.2 L275.2 208.2 L276.9 208.2 L278.4 208.2 L280.0 208.2 L281.6 208.2 L283.2 208.2 L284.7 208.2 L286.2 208.2 L287.8 208.2 L289.3 208.2 L290.8 208.2 L292.3 208.2 L293.8 208.2 L294.9 208.2" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(177.4 208.2) rotate(-0.0)"/>
  <path d="M332.9 202.2 L344.9 214.2 M344.9 202.2 L332.9 214.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M376.4 202.2 L388.4 214.2 M388.4 202.2 L376.4 214.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M71.6 202.2 L83.6 214.2 M83.6 202.2 L71.6 214.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="295.3" cy="208.2" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="338.9" cy="154.9" r="4" fill="currentColor" stroke="none"/>
  <circle cx="338.9" cy="261.6" r="4" fill="currentColor" stroke="none"/>
  <text x="346.9" y="148.9" font-size="11" text-anchor="start">j1.22, K = 7.5</text>
</svg>
<figcaption>K(s+1)/[s(s−1)(s+6)]. The pair starts on the right, crosses into the left half-plane at K = 7.5 and stays there: unstable at low gain, stable at high gain.</figcaption>
</figure>

In 8-14 and 8-15 the locus starts in the left half-plane and leaves it at the crossing gain, so the
stable range is $0<K<K_{\\max}$. Here it starts in the right half-plane and enters the left at the
crossing, so the stable range is $K>K_{\\min}$. The crossing is the same kind of boundary; the
direction of travel is opposite.

**Check.** At $K=5$: poles $-5.36$ and $0.18\\pm j0.95$, unstable. At $K=10$: $-4.60$ and
$-0.20\\pm j1.46$, stable.
`
    },
    {
      id: "8-22", difficulty: "challenge", topic: "Complete sketch", sec: "8.6",
      prompt: `For $KG(s)=\\dfrac{K}{(s+1)(s^{2}+4s+8)}$ in a unity loop:

**(a)** Find the real-axis segment, the asymptotes and the angle of departure from $-2+j2$.

**(b)** Find the $j\\omega$ crossing and the stable range of $K$.

**(c)** Find where the locus crosses the $\\zeta=0.5$ line, the gain there, and the third pole.

**(d)** Is a second-order approximation justified at that gain?`,
      hint: `Closed loop $s^{3}+5s^{2}+12s+8+K$. For (c), $s=\\omega_{n}e^{j120^\\circ}$; the imaginary part gives
$\\omega_{n}$.`,
      answer: `**(a)** $(-\\infty,-1]$; $\\sigma_{a}=-\\tfrac53$ at $\\pm60^\\circ,180^\\circ$; departure $-26.6^\\circ$. **(b)**
$\\pm j2\\sqrt3\\approx\\pm j3.46$ at $K=52$; stable for $0<K<52$. **(c)** $-1.2\\pm j2.08$
($\\omega_{n}=2.4$), $K\\approx6.98$, third pole $-2.6$. **(d)** No: the third pole is only about $2.2$
times as far from the axis. The simulated overshoot is about 9%, not 16.3%.`,
      expert: `
**First glance:** the complex open-loop poles are to the left of the real one, so the dominant
branches are the ones that start at $-2\\pm j2$, and they start by moving right.

**Discard:** assuming the branches head straight for the asymptotes. The departure angle sends them
down and right first.

**Path:** imaginary part on the $120^\\circ$ line: $-5\\omega_{n}^{2}\\tfrac{\\sqrt3}{2}+12\\omega_{n}\\tfrac{\\sqrt3}{2}=0$,
so $\\omega_{n}=2.4$; real part gives $K$; the poles sum to $-5$.

**Check:** $1.2\\cdot5=6<2.6$ fails the factor-of-five test, so the third pole participates in the
response.
`,
      solution: `
**Part (a).** Only one real singularity, the pole at $-1$: segment $(-\\infty,-1]$.

$$\\sigma_{a}=\\frac{-1-2-2}{3}=-\\frac53,\\qquad\\theta_{a}=60^\\circ,180^\\circ,300^\\circ$$

Departure from $-2+j2$: the pole at $-1$ contributes $116.57^\\circ$, the conjugate pole $90^\\circ$:

$$-116.57^\\circ-90^\\circ-\\theta=180^\\circ\\quad\\Longrightarrow\\quad\\theta=-386.57^\\circ\\equiv-26.57^\\circ$$

This is the system in the departure-angle figure of the 8.5 guide.

**Part (b).** Closed loop $s^{3}+5s^{2}+12s+(8+K)$. Cubic rule: $60>8+K$, so $K<52$. At $K=52$,
$5s^{2}+60=0$: $\\omega=\\sqrt{12}\\approx3.46$ rad/s. **Stable for $0<K<52$.**

**Part (c).** $s=\\omega_{n}e^{j120^\\circ}$, so $s^{2}=\\omega_{n}^{2}e^{j240^\\circ}$ and $s^{3}=\\omega_{n}^{3}$.

Imaginary part: $5\\omega_{n}^{2}\\left(-\\tfrac{\\sqrt3}{2}\\right)+12\\omega_{n}\\tfrac{\\sqrt3}{2}=0$, so
$\\omega_{n}=2.4$.

Real part: $\\omega_{n}^{3}-\\tfrac52\\omega_{n}^{2}-6\\omega_{n}+8+K=0$:

$$K=-13.824+14.4+14.4-8=6.976$$

The point is $2.4\\angle120^\\circ=-1.2\\pm j2.078$. The poles sum to $-5$, so the third is at $-5+2.4=-2.6$.

**Part (d).** The dominant real part is $1.2$; the third pole is at $2.6$, a ratio of about $2.2$, well
short of five. There are no zeros to cancel it. The approximation is not justified. Simulating the
closed loop at $K=6.976$ gives about $9.1\\%$ overshoot instead of $16.3\\%$: the slow real pole adds a
sluggish exponential that pulls the peak down.

**Check.** $K$ by lengths at $-1.2+j2.078$: $|{-0.2}+j2.078|\\cdot|0.8+j0.078|\\cdot|0.8+j4.078|\\approx2.088\\cdot0.804\\cdot4.156\\approx6.98$ ✓.
`
    },
    {
      id: "8-23", difficulty: "warmup", topic: "Second-order approximation", sec: "8.7",
      prompt: `Each line lists the closed-loop poles and zeros of a unity feedback design whose dominant pair is
$-1\\pm j2$. Decide whether a second-order approximation is justified.

**(a)** third pole at $-10$; no zeros

**(b)** third pole at $-3$; no zeros

**(c)** third pole at $-2.1$; a zero at $-2$

**(d)** third pole at $-8$; a zero at $-1.5$`,
      hint: `Two tests: is every other pole at least five times farther left, and is every zero either cancelled
or far away?`,
      answer: `**(a)** Yes. **(b)** No. **(c)** Yes, by near cancellation. **(d)** No: the zero at $-1.5$ is close to the
pair and nothing cancels it.`,
      expert: `
**First glance:** the dominant real part is $1$. Five times that is $5$.

**Discard:** partial fractions; the three conditions are enough for a verdict.

**Path:** (a) $10\\ge5$. (b) $3<5$. (c) pole and zero $0.1$ apart. (d) pole far, zero near and alone.

**Check:** (d) passes the pole test and still fails. A zero near the dominant pair raises overshoot
whatever the other poles do.
`,
      solution: `
| Case | Other poles | Zeros | Verdict |
|---|---|---|---|
| (a) | $-10$: ten times farther | none | **justified** |
| (b) | $-3$: three times | none | **not justified**: the third pole's exponential is comparable in speed |
| (c) | $-2.1$ | $-2$, $0.1$ from the pole | **justified**: the pole and zero nearly cancel, so the third term's residue is small |
| (d) | $-8$: eight times | $-1.5$, near the pair, uncancelled | **not justified**: the zero raises overshoot and speeds the rise |

**Check.** Condition 3 in Nise asks for uncancelled zeros to be far from the dominant pair. In (d) the
zero's real part is only $1.5$ times the pair's, and the nearest pole to it is the pair itself, so
nothing cancels it.
`
    },
    {
      id: "8-24", difficulty: "core", topic: "Gain design", sec: "8.7",
      prompt: `Design the gain of $\\dfrac{K}{s(s+2)(s+4)}$ in a unity loop for 16.3% overshoot. Estimate $T_{s}$,
$T_{p}$ and $K_{v}$, and justify the second-order approximation.`,
      hint: `16.3% overshoot is $\\zeta=0.5$. The calibration is worked in the 8.5 guide.`,
      answer: `$K=\\tfrac{224}{27}\\approx8.30$; poles $-0.667\\pm j1.155$ and $-4.67$. $T_{s}\\approx6$ s,
$T_{p}\\approx2.72$ s, $K_{v}\\approx1.04$. The third pole is seven times farther from the axis, and there
are no zeros: justified. Simulation gives 15.5% overshoot and $T_{s}\\approx6.2$ s.`,
      expert: `
**First glance:** type 1, no zeros, three poles. The only thing that can spoil the approximation is the
third pole.

**Discard:** an angle search; the $120^\\circ$ substitution solves the cubic exactly.

**Path:** imaginary part gives $\\omega_{n}=\\tfrac43$; real part gives $K=\\tfrac{224}{27}$; poles sum to $-6$.

**Check:** $K_{v}=K/8\\approx1.04$, a ramp error near $1$ per unit slope. That number comes with the gain;
the design did not choose it.
`,
      solution: `
**Step 1: the crossing.** As in the guide, $s=\\omega_{n}e^{j120^\\circ}$ in $s^{3}+6s^{2}+8s+K$:

$$\\text{Im}:\\ -6\\omega_{n}^{2}\\tfrac{\\sqrt3}{2}+8\\omega_{n}\\tfrac{\\sqrt3}{2}=0\\ \\Rightarrow\\ \\omega_{n}=\\tfrac43$$

$$\\text{Re}:\\ \\omega_{n}^{3}-3\\omega_{n}^{2}-4\\omega_{n}+K=0\\ \\Rightarrow\\ K=-\\tfrac{64}{27}+\\tfrac{16}{3}+\\tfrac{16}{3}=\\tfrac{224}{27}\\approx8.30$$

Dominant poles: $-\\tfrac23\\pm j\\tfrac{2}{\\sqrt3}=-0.667\\pm j1.155$.

**Step 2: the third pole.** The poles sum to $-6$: $-6+\\tfrac43=-4.67$.

**Step 3: estimates.**

$$T_{s}=\\frac{4}{0.667}=6\\ \\text{s},\\qquad T_{p}=\\frac{\\pi}{1.155}\\approx2.72\\ \\text{s},\\qquad K_{v}=\\frac{K}{2\\cdot4}\\approx1.04$$

**Step 4: justify.** $4.67/0.667=7>5$, and $G$ has no zeros, so the closed loop has none.
Justified.

**Check.** Simulated step response at $K=8.30$: about $15.5\\%$ overshoot and $T_{s}\\approx6.2$ s,
within a percentage point and a few percent of the estimates.
`
    },
    {
      id: "8-25", difficulty: "core", topic: "Gain design", sec: "8.7",
      prompt: `For the same loop, $\\dfrac{K}{s(s+2)(s+4)}$, a settling time of 2 s is required.

**(a)** What real part do the dominant poles need?

**(b)** What is the most negative real part the dominant poles reach for any $K>0$, and at what gain?

**(c)** Can the requirement be met by gain adjustment?`,
      hint: `Follow the branches that start at $0$ and $-2$. Where are they farthest left?`,
      answer: `**(a)** $-2$. **(b)** $-0.845$, at the breakaway gain $K\\approx3.08$. **(c)** No. The $4/\\sigma$ estimate cannot
go below about $4.7$ s; a simulation sweep finds the best 2% settling time near $3.9$ s at $K\\approx4.5$.`,
      expert: `
**First glance:** the dominant branches start at $0$ and $-2$, meet at $-0.845$, and then move right,
toward the $60^\\circ$ asymptotes. They are never farther left than the breakaway point.

**Discard:** solving for the crossing of the line $\\sigma=-2$. The dominant branches never reach it.

**Path:** $T_{s}=2$ needs $\\sigma=2$; the branches top out at $0.845$.

**Check:** the $4/\\sigma$ rule is an envelope estimate for underdamped poles. Near the breakaway the
response is close to critically damped and the estimate is rough, which is why the simulated best
differs from $4.7$ s.
`,
      solution: `
**Part (a).** $T_{s}=\\dfrac{4}{\\sigma}=2$, so $\\sigma=2$: dominant poles at real part $-2$.

**Part (b).** The dominant branches start at $0$ and $-2$ and meet at the breakaway point $-0.845$
(8-12). After that they move into the complex plane and to the right along the $\\pm60^\\circ$
asymptotes. The farthest left the dominant pair ever gets is $-0.845$, at $K\\approx3.08$.

The third branch runs from $-4$ to $-\\infty$ and gets faster as $K$ grows, but it does not set the
settling time.

**Part (c).** No. The estimate $4/0.845\\approx4.7$ s is the best the dominant pair's envelope allows.
A simulation sweep over $K$ gives the shortest actual 2% settling time as about $3.9$ s near $K=4.5$,
where the response is slightly underdamped and enters the band early. Either way, 2 s is out of reach.

**Check.** At $K=4.5$ the dominant poles are near $-0.79\\pm j0.63$: still to the right of $-0.845$.
Reaching $\\sigma=-2$ means moving the locus itself, for example with a zero that pulls the branches
left, which is Chapter 9.
`
    },
    {
      id: "8-26", difficulty: "core", topic: "Gain design", sec: "8.7",
      prompt: `Design the gain of $\\dfrac{K}{(s+2)(s+4)(s+6)}$ in a unity loop for 16.3% overshoot. Find the
third pole, judge the approximation, and give the steady-state error to a unit step.`,
      hint: `Same $120^\\circ$ substitution, with $s^{3}+12s^{2}+44s+48+K$.`,
      answer: `$\\omega_{n}=\\tfrac{11}{3}$, poles $-1.83\\pm j3.18$, $K\\approx64.0$; third pole $-8.33$, a ratio of about
4.5: borderline. Simulation: about 14.4% overshoot. $e_{\\text{step}}=\\dfrac{1}{1+64/48}\\approx0.43$.`,
      expert: `
**First glance:** type 0, so whatever gain gives the transient also fixes a finite step error.

**Discard:** an angle search; the substitution is exact.

**Path:** imaginary part: $-12\\omega_{n}^{2}\\tfrac{\\sqrt3}{2}+44\\omega_{n}\\tfrac{\\sqrt3}{2}=0$, so
$\\omega_{n}=\\tfrac{11}{3}$; poles sum to $-12$.

**Check:** a ratio of $4.5$ is just under the factor of five; the simulated overshoot misses $16.3\\%$ by
about two points, which is what a borderline case looks like.
`,
      solution: `
**Step 1: the crossing.** Closed loop $s^{3}+12s^{2}+44s+48+K$, $s=\\omega_{n}e^{j120^\\circ}$.

$$\\text{Im}:\\ -12\\omega_{n}^{2}\\tfrac{\\sqrt3}{2}+44\\omega_{n}\\tfrac{\\sqrt3}{2}=0\\ \\Rightarrow\\ \\omega_{n}=\\tfrac{11}{3}$$

$$\\text{Re}:\\ \\omega_{n}^{3}-6\\omega_{n}^{2}-22\\omega_{n}+48+K=0$$

$$K=-49.30+80.67+80.67-48\\approx64.0$$

Dominant poles: $-\\tfrac{11}{6}\\pm j\\tfrac{11}{6}\\sqrt3=-1.83\\pm j3.18$.

**Step 2: third pole.** Sum $-12$: $-12+\\tfrac{11}{3}=-8.33$.

**Step 3: judge.** $8.33/1.83\\approx4.5$: just under five, no zeros. Borderline. A simulation gives
about $14.4\\%$ overshoot and $T_{s}\\approx2.3$ s, against estimates of $16.3\\%$ and $2.18$ s.

**Step 4: steady-state error.** Type 0, $K_{p}=K/48\\approx1.33$:

$$e_{\\text{step}}=\\frac{1}{1+1.33}\\approx0.43$$

**Check.** The 43% step error is the Chapter 7 cost of a type 0 loop at a gain chosen for damping. The
root locus picked $K$; the error followed.
`
    },
    {
      id: "8-27", difficulty: "challenge", topic: "Gain design", sec: "8.7",
      prompt: `For $\\dfrac{K(s+2)}{s(s+1)(s+12)}$ in a unity loop, the locus crosses the $\\zeta=0.8$ line (1.52%
overshoot) three times:

| Point | Dominant poles | $K$ | Third pole |
|---|---|---|---|
| (a) | $-0.649\\pm j0.487$ | $3.85$ | $-11.70$ |
| (b) | $-2.326\\pm j1.745$ | $35.3$ | $-8.35$ |
| (c) | $-5.084\\pm j3.813$ | $57.2$ | $-2.83$ |

For each, judge the second-order approximation, then check it with the residues of the step response.
Which crossing actually delivers about 1.5% overshoot?`,
      hint: `$C(s)=\\dfrac{K(s+2)}{s\\,(s-p_{3})(s^{2}+2\\sigma s+|p|^{2})}$. Compare the third pole's residue with the
amplitude of the dominant pair's term.`,
      answer: `Only **(a)**: the third pole is $18$ times farther, its residue is $0.026$, and the simulated overshoot is
about $1.7\\%$. In (b) the zero at $-2$ sits next to the dominant pair, uncancelled (residue of the third
pole $0.68$): about $12.8\\%$. In (c) the third pole is near the zero but not near enough (residue $0.86$):
about $14.9\\%$.`,
      expert: `
**First glance:** the zero at $-2$ is fixed. Each crossing puts the dominant pair at a different
distance from it, and puts the third pole at a different distance from it.

**Discard:** judging by the third pole's distance alone. (b) passes that test ($3.6$ times) and fails
badly.

**Path:** compute the residue of the third pole in $C(s)$ and the amplitude of the dominant pair's term,
$2|r|$ for complex residue $r$.

**Check:** the residues at $s=0$, the pair, and the third pole must sum to zero, since $c(0)=0$.
`,
      solution: `
<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 405" class="nx-fig">
  <defs><marker id="nx8p26" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 202.6 L518.0 202.6" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p26)"/>
  <path d="M472.3 371.1 L472.3 22.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx8p26)"/>
  <text x="510.0" y="220.6" font-size="13">&#963;</text>
  <text x="478.3" y="32.0" font-size="13">j&#969;</text>
  <path d="M67.7 199.6 L67.7 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="67.7" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−12</text>
  <path d="M135.1 199.6 L135.1 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="135.1" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−10</text>
  <path d="M202.6 199.6 L202.6 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="202.6" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M270.0 199.6 L270.0 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="270.0" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M337.4 199.6 L337.4 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="337.4" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M404.9 199.6 L404.9 205.6" stroke="currentColor" stroke-width="1"/>
  <text x="404.9" y="217.6" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M469.3 337.4 L475.3 337.4" stroke="currentColor" stroke-width="1"/>
  <text x="466.3" y="341.4" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M469.3 270.0 L475.3 270.0" stroke="currentColor" stroke-width="1"/>
  <text x="466.3" y="274.0" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M469.3 135.1 L475.3 135.1" stroke="currentColor" stroke-width="1"/>
  <text x="466.3" y="139.1" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M469.3 67.7 L475.3 67.7" stroke="currentColor" stroke-width="1"/>
  <text x="466.3" y="71.7" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M472.3 202.6 L470.8 202.6 L469.2 202.6 L467.7 202.6 L466.1 202.6 L464.6 202.6 L463.0 202.6 L461.5 202.6 L459.8 202.6 L458.0 202.6 L456.3 202.6 L453.8 202.6 L452.9 200.9 L452.8 198.9 L452.6 197.3 L452.5 195.7 L452.2 194.0 L451.9 192.4 L451.6 190.8 L451.3 189.3 L450.9 187.8 L450.4 186.2 L449.9 184.6 L449.4 183.2 L448.8 181.7 L448.2 180.3 L447.5 178.8 L446.8 177.3 L446.0 175.8 L445.2 174.4 L444.4 173.1 L443.5 171.7 L442.5 170.3 L441.5 168.8 L440.5 167.6 L439.5 166.4 L438.4 165.1 L437.2 163.8 L435.9 162.5 L434.8 161.5 L433.7 160.4 L432.5 159.3 L431.1 158.2 L429.7 157.2 L428.3 156.1 L426.7 155.0 L425.4 154.1 L424.0 153.3 L422.6 152.5 L421.1 151.7 L419.6 150.9 L417.9 150.1 L416.1 149.3 L414.2 148.5 L412.2 147.8 L410.1 147.1 L408.6 146.6 L407.0 146.1 L405.3 145.7 L403.6 145.3 L401.8 144.9 L399.8 144.5 L397.8 144.2 L395.6 143.9 L393.3 143.7 L390.8 143.5 L388.1 143.4 L385.2 143.3 L383.7 143.3 L382.1 143.4 L380.4 143.4 L378.6 143.5 L376.7 143.6 L374.7 143.8 L372.6 144.0 L370.3 144.3 L367.9 144.6 L365.3 145.0 L362.3 145.4 L359.1 145.9 L355.4 146.5 L351.1 147.1 L345.8 147.7 L339.2 147.7 L331.0 145.8 L323.5 140.6 L318.4 134.2 L315.0 128.1 L312.5 122.5 L310.5 117.2 L309.0 112.3 L307.6 107.7 L306.5 103.3 L305.5 99.1 L304.6 95.1 L303.8 91.2 L303.1 87.4 L302.4 83.7 L301.8 80.1 L301.3 76.6 L300.8 73.2 L300.3 69.9 L299.8 66.6 L299.4 63.3 L299.0 60.1 L298.7 57.0 L298.3 53.9 L298.0 50.8 L297.7 47.8 L297.4 44.8 L297.1 41.8 L296.8 38.8 L296.6 35.9 L296.3 33.0 L296.1 30.1 L296.1 30.1" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(367.9 144.6) rotate(172.0)"/>
  <path d="M438.6 202.6 L440.1 202.6 L441.6 202.6 L443.2 202.6 L444.7 202.6 L446.2 202.6 L447.9 202.6 L449.7 202.6 L452.0 202.6 L452.9 204.2 L452.8 206.2 L452.6 207.9 L452.5 209.5 L452.2 211.1 L451.9 212.8 L451.6 214.4 L451.3 215.8 L450.9 217.3 L450.4 218.9 L449.9 220.6 L449.4 222.0 L448.8 223.4 L448.2 224.9 L447.5 226.3 L446.8 227.8 L446.0 229.4 L445.2 230.7 L444.4 232.1 L443.5 233.5 L442.5 234.9 L441.5 236.3 L440.5 237.5 L439.5 238.8 L438.4 240.0 L437.2 241.3 L435.9 242.6 L434.8 243.7 L433.7 244.7 L432.5 245.8 L431.1 246.9 L429.7 248.0 L428.3 249.1 L426.7 250.2 L425.4 251.0 L424.0 251.8 L422.6 252.6 L421.1 253.5 L419.6 254.3 L417.9 255.1 L416.1 255.8 L414.2 256.6 L412.2 257.4 L410.1 258.1 L408.6 258.6 L407.0 259.0 L405.3 259.4 L403.6 259.9 L401.8 260.2 L399.8 260.6 L397.8 260.9 L395.6 261.2 L393.3 261.5 L390.8 261.6 L388.1 261.8 L385.2 261.8 L383.7 261.8 L382.1 261.8 L380.4 261.7 L378.6 261.6 L376.7 261.5 L374.7 261.3 L372.6 261.1 L370.3 260.9 L367.9 260.6 L365.3 260.2 L362.3 259.7 L359.1 259.2 L355.4 258.6 L351.1 258.0 L345.8 257.5 L339.2 257.4 L331.0 259.4 L323.5 264.5 L318.4 270.9 L315.0 277.0 L312.5 282.7 L310.5 287.9 L309.0 292.8 L307.6 297.4 L306.5 301.8 L305.5 306.0 L304.6 310.1 L303.8 314.0 L303.1 317.8 L302.4 321.4 L301.8 325.0 L301.3 328.5 L300.8 331.9 L300.3 335.3 L299.8 338.6 L299.4 341.8 L299.0 345.0 L298.7 348.2 L298.3 351.3 L298.0 354.3 L297.7 357.4 L297.4 360.4 L297.1 363.4 L296.8 366.3 L296.6 369.3 L296.3 372.2 L296.1 375.1 L296.1 375.1" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(365.3 260.2) rotate(-171.4)"/>
  <path d="M67.7 202.6 L69.2 202.6 L70.7 202.6 L72.3 202.6 L73.8 202.6 L75.3 202.6 L76.9 202.6 L78.5 202.6 L80.1 202.6 L81.6 202.6 L83.3 202.6 L85.0 202.6 L86.6 202.6 L88.2 202.6 L89.8 202.6 L91.6 202.6 L93.2 202.6 L94.9 202.6 L96.8 202.6 L98.3 202.6 L100.0 202.6 L101.8 202.6 L103.7 202.6 L105.7 202.6 L107.2 202.6 L108.9 202.6 L110.6 202.6 L112.4 202.6 L114.3 202.6 L116.3 202.6 L118.4 202.6 L120.5 202.6 L122.1 202.6 L123.6 202.6 L125.3 202.6 L126.9 202.6 L128.7 202.6 L130.5 202.6 L132.3 202.6 L134.3 202.6 L136.3 202.6 L138.4 202.6 L140.5 202.6 L142.8 202.6 L145.1 202.6 L147.6 202.6 L150.1 202.6 L152.7 202.6 L155.5 202.6 L158.4 202.6 L161.4 202.6 L163.0 202.6 L164.6 202.6 L166.2 202.6 L167.9 202.6 L169.6 202.6 L171.4 202.6 L173.2 202.6 L175.1 202.6 L177.0 202.6 L178.9 202.6 L181.0 202.6 L183.0 202.6 L185.2 202.6 L187.4 202.6 L189.7 202.6 L192.1 202.6 L194.5 202.6 L197.0 202.6 L199.6 202.6 L202.4 202.6 L205.2 202.6 L208.2 202.6 L211.2 202.6 L214.5 202.6 L217.8 202.6 L221.4 202.6 L225.1 202.6 L229.1 202.6 L233.3 202.6 L237.9 202.6 L242.8 202.6 L248.1 202.6 L253.9 202.6 L260.4 202.6 L267.8 202.6 L276.4 202.6 L286.9 202.6 L300.2 202.6 L316.6 202.6 L331.6 202.6 L341.7 202.6 L348.6 202.6 L353.6 202.6 L357.5 202.6 L360.7 202.6 L363.3 202.6 L365.6 202.6 L367.6 202.6 L369.4 202.6 L371.0 202.6 L373.7 202.6 L376.0 202.6 L378.0 202.6 L379.7 202.6 L381.3 202.6 L383.2 202.6 L384.9 202.6 L386.9 202.6 L388.5 202.6 L390.3 202.6 L392.0 202.6 L393.6 202.6 L395.2 202.6 L396.7 202.6 L398.3 202.6 L399.8 202.6 L401.4 202.6 L402.9 202.6 L404.4 202.6 L404.8 202.6" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(221.4 202.6) rotate(-0.0)"/>
  <path d="M466.3 196.6 L478.3 208.6 M478.3 196.6 L466.3 208.6" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M432.6 196.6 L444.6 208.6 M444.6 196.6 L432.6 208.6" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M61.7 196.6 L73.7 208.6 M73.7 196.6 L61.7 208.6" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="404.9" cy="202.6" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M472.3 202.6 L270.0 50.9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="446.4" y="182.2" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="440.4" y="180.2" font-size="12" text-anchor="end">a</text>
  <rect x="389.9" y="139.7" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="383.9" y="137.7" font-size="12" text-anchor="end">b</text>
  <rect x="296.9" y="70.0" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="290.9" y="68.0" font-size="12" text-anchor="end">c</text>
</svg>
<figcaption>K(s+2)/[s(s+1)(s+12)] with the ζ = 0.8 line. The locus crosses it three times: (a) K = 3.85, (b) K = 35.3, (c) K = 57.2.</figcaption>
</figure>

**The screen.** Zero at $-2$ in every case.

- (a) Third pole $11.70/0.649=18$ times farther. The zero is $3$ times the dominant real part, not
  cancelled. Mostly passes.
- (b) Third pole $8.35/2.33=3.6$ times. The zero at $-2$ is right next to the pair, and the third pole
  at $-8.35$ is far from it, so nothing cancels it. Fails.
- (c) Third pole at $-2.83$, nearer the axis than the pair. It is $0.83$ from the zero: partial
  cancellation at best. Doubtful.

**The residues.** Expanding $C(s)=\\dfrac{K(s+2)}{s\\prod(s-p_{i})}$:

| Point | Residue at $s=0$ | Dominant pair residue $r$ | Pair amplitude $2|r|$ | Third-pole residue |
|---|---|---|---|---|
| (a) | $1$ | $-0.513\\pm j0.370$ | $1.27$ | $0.026$ |
| (b) | $1$ | $-0.842\\mp j0.512$ | $1.97$ | $0.683$ |
| (c) | $1$ | $-0.928\\mp j0.920$ | $2.61$ | $0.856$ |

In (a) the third pole's term is negligible. In (b) and (c) it is a third to a half of the pair's
amplitude, so the response is not second order.

**The simulated overshoot.** (a) $1.7\\%$, (b) $12.8\\%$, (c) $14.9\\%$, against a prediction of
$1.52\\%$ for all three. Only (a) delivers the specification. It is also the slowest design
($K_{v}=3.85\\cdot2/12\\approx0.64$), so meeting the overshoot spec here costs speed and accuracy.

**Check.** Each row's residues sum to zero: (a) $1+2(-0.513)+0.026\\approx0$, (b)
$1+2(-0.842)+0.683\\approx0$, (c) $1+2(-0.928)+0.856=0$.
`
    },
    {
      id: "8-28", difficulty: "challenge", topic: "Gain design", sec: "8.7",
      prompt: `The loop $\\dfrac{K}{s(s+2)(s+4)}$ must have at least $\\zeta=0.5$ **and** a unit-ramp error of at most
$0.5$.

**(a)** What range of $K$ meets the damping requirement?

**(b)** What range meets the error requirement?

**(c)** Is there a gain that meets both? What is $\\zeta$ at the smallest gain that meets the error
requirement?`,
      hint: `$\\zeta$ of the dominant pair falls as $K$ rises past the breakaway gain. $K_{v}=K/8$.`,
      answer: `**(a)** $0<K\\le8.30$. **(b)** $K\\ge16$. **(c)** No. At $K=16$ the dominant poles are $-0.48\\pm j1.72$,
$\\zeta\\approx0.27$, about 39% overshoot in simulation.`,
      expert: `
**First glance:** the two requirements pull $K$ in opposite directions: damping wants it small, $K_{v}$
wants it large.

**Discard:** looking for a compromise gain. The ranges do not overlap, so there is none.

**Path:** $\\zeta\\ge0.5$ up to the crossing at $K=8.30$ (8-24); $K/8\\ge2$ gives $K\\ge16$.

**Check:** both ranges lie inside the stable range $0<K<48$, so stability is not what blocks the design.
`,
      solution: `
**Part (a).** Below the breakaway gain ($3.08$) the dominant poles are real, $\\zeta\\ge1$. Above it, the
pair moves up and to the right and $\\zeta$ falls continuously, reaching $0.5$ at $K=8.30$ (8-24). So
$\\zeta\\ge0.5$ for $0<K\\le8.30$.

**Part (b).** Type 1, $K_{v}=\\dfrac{K}{2\\cdot4}=\\dfrac K8$.

$$\\frac{1}{K_{v}}\\le0.5\\quad\\Longrightarrow\\quad K_{v}\\ge2\\quad\\Longrightarrow\\quad K\\ge16$$

**Part (c).** $(0,8.30]$ and $[16,48)$ do not intersect. At $K=16$ the closed-loop poles are about
$-5.04$ and $-0.48\\pm j1.72$:

$$\\zeta=\\frac{0.48}{\\sqrt{0.48^{2}+1.72^{2}}}\\approx0.27$$

and a simulated step response overshoots by about $39\\%$.

**Check.** One gain picks one point on the locus, and $K_{v}$ is proportional to that same gain. Meeting
both specifications needs a controller that raises $K_{v}$ without moving the dominant poles, which is
the lag compensator of Chapter 9.
`
    },
    {
      id: "8-29", difficulty: "core", topic: "Second-order approximation", sec: "8.7",
      prompt: `Return to the unstable plant of 8-05, $G(s)=\\dfrac{K(s+1)}{s(s-2)}$, in a unity loop.

**(a)** Find $K$ so the closed-loop poles have $\\zeta=0.5$.

**(b)** The closed loop is second order. Does the standard formula predict its overshoot? Explain.`,
      hint: `Closed loop $s^{2}+(K-2)s+K$. Match $2\\zeta\\omega_{n}=K-2$ and $\\omega_{n}^{2}=K$. Then look at the
numerator of $T(s)$.`,
      answer: `**(a)** $K=4$: poles $-1\\pm j\\sqrt3$. **(b)** No. $T=\\dfrac{4(s+1)}{s^{2}+2s+4}$ has a zero at $-1$, at the
same real part as the poles. Simulated overshoot is about 70%, against 16.3% predicted.`,
      expert: `
**First glance:** second order in the denominator, but the plant's zero is in the closed loop's
numerator. The overshoot formula assumed no zeros.

**Discard:** trusting "second order" to mean "the formulas apply". They apply to $\\omega_{n}^{2}/(s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2})$
only.

**Path:** $(K-2)^{2}=K$ gives $K=4$ or $1$; $K=1$ makes the $s$ coefficient negative.

**Check:** a zero at $-1$ adds a scaled derivative of the response, $\\tfrac{1}{1}\\dot c$, to the output,
and the derivative of a fast-rising response is large: overshoot balloons.
`,
      solution: `
**Part (a).** $T=\\dfrac{K(s+1)}{s^{2}+(K-2)s+K}$. Match $s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}$ with
$\\zeta=0.5$:

$$\\omega_{n}=K-2,\\qquad\\omega_{n}^{2}=K\\quad\\Longrightarrow\\quad(K-2)^{2}=K\\quad\\Longrightarrow\\quad K^{2}-5K+4=0$$

$K=4$ or $K=1$. At $K=1$ the $s$ coefficient is $-1$: unstable, a "damping ratio" of $-0.5$. So
$K=4$, with poles $s^{2}+2s+4=0$, $s=-1\\pm j\\sqrt3$.

**Part (b).** No.

$$T(s)=\\frac{4(s+1)}{s^{2}+2s+4}=\\frac{4}{s^{2}+2s+4}+\\frac{4s}{s^{2}+2s+4}$$

The first term is the standard second-order response with $16.3\\%$ overshoot. The second is $s$ times
the first, so it adds the derivative of that response to it. The zero at $-1$ has the same real part as
the poles, so this derivative term is as large as the response itself.

Simulating the step response gives a peak about $70\\%$ above the final value, at about $0.9$ s.

**Check.** Condition 3 of 8.7: uncancelled zeros must be far from the dominant pair. Here the zero is
$\\sqrt3$ away from each pole, with nothing nearby to cancel it, so the approximation fails as badly as
it can.
`
    },
    {
      id: "8-30", difficulty: "warmup", topic: "Gain design", sec: "8.7",
      prompt: `Translate each specification into a line in the $s$-plane.

**(a)** 20% overshoot

**(b)** $T_{s}=2$ s

**(c)** $T_{p}=1$ s`,
      hint: `$\\zeta$ from $\\%OS$; then $\\theta=\\cos^{-1}\\zeta$ from the negative real axis.`,
      answer: `**(a)** $\\zeta\\approx0.456$: the radial line at $62.9^\\circ$ from the negative real axis ($117.1^\\circ$ from the
positive). **(b)** The vertical line $\\sigma=-2$. **(c)** The horizontal lines $\\omega=\\pm\\pi\\approx\\pm3.14$.`,
      expert: `
**First glance:** three specifications, three different geometries: angle, real part, imaginary part.

**Discard:** working out $\\omega_{n}$ for (a). Overshoot depends on the angle only.

**Path:** (a) $\\zeta=-\\ln0.2/\\sqrt{\\pi^{2}+\\ln^{2}0.2}$; (b) $4/T_{s}$; (c) $\\pi/T_{p}$.

**Check:** $\\cos62.9^\\circ=0.456$.
`,
      solution: `
**Part (a).**

$$\\zeta=\\frac{-\\ln0.2}{\\sqrt{\\pi^{2}+\\ln^{2}0.2}}=\\frac{1.609}{\\sqrt{9.870+2.590}}\\approx0.456$$

$$\\theta=\\cos^{-1}0.456\\approx62.9^\\circ$$

measured from the negative real axis: the rays at $\\pm117.1^\\circ$ from the positive real axis.

**Part (b).** $\\zeta\\omega_{n}=4/T_{s}=2$: the vertical line through $-2$. Poles to its left settle
faster.

**Part (c).** $\\omega_{d}=\\pi/T_{p}=\\pi$: the horizontal lines at $\\pm j3.14$. Poles above them peak
sooner.

**Check.** On a root locus, (a) is met where the locus crosses the rays, (b) and (c) where it crosses
those lines. One gain can sit on only one of them unless the locus happens to pass through an
intersection.
`
    },
  ]
});
