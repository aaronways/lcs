registerChapter({
  id: 5,
  title: "Reduction of Multiple Subsystems",
  sections: "5.1–5.3",
  brief: "A block is a transfer function. Cascade multiplies, parallel adds, feedback produces $G/(1\\pm GH)$. Loading is the reason cascade is not automatic. Once the diagram is one block, Chapter 4 applies to the closed-loop poles.",
  sectionList: [
    { id: "5.1", title: "Introduction" },
    { id: "5.2", title: "Block diagrams" },
    { id: "5.3", title: "Analysis and design of feedback systems" }
  ],

  guide: [
    {
      title: "What this chapter is for",
      sec: "5.1",
      body: `
Chapters 2 and 4 gave you one block: $G(s)$, then the time response of that $G(s)$.
A control system is several blocks. The job of 5.1–5.3 is to turn the diagram into
**one** closed-loop transfer function $T(s)=C(s)/R(s)$ so the Chapter 4 dictionary
still applies.

Signal-flow graphs and Mason's rule are 5.4–5.5. They are not in this cut.

> The only new algebra is three reductions and the right to move a block past a
> summer or a pickoff. Everything else is Chapter 2 multiplication and Chapter 4 poles.
`
    },
    {
      title: "The four marks on the page",
      sec: "5.2",
      body: `
A linear block diagram is built from four marks.

<svg viewBox="0 0 720 168" class="nx-fig" aria-label="Four block-diagram elements">
  <defs>
    <marker id="n5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
  </defs>
  <text x="78" y="18" text-anchor="middle" font-size="12" opacity=".6">signal</text>
  <line x1="18" y1="48" x2="138" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <text x="78" y="72" text-anchor="middle" font-size="13">R(s)</text>

  <text x="268" y="18" text-anchor="middle" font-size="12" opacity=".6">block</text>
  <line x1="178" y1="48" x2="214" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <rect x="214" y="26" width="110" height="44" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="269" y="53" text-anchor="middle" font-size="14">G(s)</text>
  <line x1="324" y1="48" x2="360" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>

  <text x="478" y="18" text-anchor="middle" font-size="12" opacity=".6">summing junction</text>
  <line x1="392" y1="48" x2="430" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <circle cx="448" cy="48" r="16" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="448" y="53" text-anchor="middle" font-size="14">+</text>
  <line x1="448" y1="92" x2="448" y2="66" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <text x="466" y="96" font-size="13">-\\,B</text>
  <line x1="464" y1="48" x2="510" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>

  <text x="628" y="18" text-anchor="middle" font-size="12" opacity=".6">pickoff</text>
  <line x1="546" y1="48" x2="700" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <circle cx="620" cy="48" r="3.2" fill="currentColor"/>
  <line x1="620" y1="48" x2="620" y2="118" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5a)"/>
  <text x="636" y="92" font-size="13">same R</text>
</svg>

- A **signal** is a Laplace transform, not a wire gauge.
- A **block** multiplies. $C=RG$.
- A **summing junction** adds, with the sign written at the incoming arrow. Negative
  feedback is a minus on the feedback arrow, not a property of $H(s)$.
- A **pickoff** copies a signal without changing it. The same $R(s)$ leaves on every
  branch.

If two blocks share a node, ask which mark it is. Summer or pickoff. The reductions
are different.
`
    },
    {
      title: "Cascade, parallel, feedback",
      sec: "5.2",
      body: `
Three topologies. Draw them until the equivalent $T(s)$ is automatic.

### Cascade

<svg viewBox="0 0 680 86" class="nx-fig" aria-label="Cascade equivalent">
  <defs><marker id="n5b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="8" y="48" font-size="13">R</text>
  <line x1="28" y1="44" x2="58" y2="44" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5b)"/>
  <rect x="58" y="24" width="88" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="102" y="49" text-anchor="middle">G_1</text>
  <line x1="146" y1="44" x2="176" y2="44" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5b)"/>
  <rect x="176" y="24" width="88" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="220" y="49" text-anchor="middle">G_2</text>
  <line x1="264" y1="44" x2="294" y2="44" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5b)"/>
  <text x="308" y="49">C</text>
  <text x="370" y="49" font-size="18">=</text>
  <line x1="404" y1="44" x2="434" y2="44" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5b)"/>
  <rect x="434" y="24" width="130" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="499" y="49" text-anchor="middle">G_2G_1</text>
  <line x1="564" y1="44" x2="594" y2="44" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5b)"/>
</svg>

$$T = G_2G_1$$

Order in the product is the signal order, right to left if you write operators that
way; commutativity of scalar transfer functions makes $G_1G_2$ the same function.
The assumption is **no loading**: connecting $G_2$ does not change the output of $G_1$.

Two $RC$ stages soldered together load. The product $G_2G_1$ misses a cross term
$1/(R_2C_1)$ in the damping. An isolating amplifier between them restores the product.

### Parallel

Same input, outputs summed.

$$T = \\pm G_1 \\pm G_2 \\pm G_3$$

The signs are the signs at the summer.

### Feedback

<svg viewBox="0 0 640 168" class="nx-fig" aria-label="Negative feedback loop">
  <defs><marker id="n5c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="10" y="52" font-size="13">R</text>
  <line x1="32" y1="48" x2="70" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5c)"/>
  <circle cx="86" cy="48" r="16" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="86" y="44" text-anchor="middle" font-size="12">+</text>
  <text x="86" y="62" text-anchor="middle" font-size="12">-</text>
  <line x1="102" y1="48" x2="150" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5c)"/>
  <text x="118" y="38" font-size="12">E</text>
  <rect x="150" y="28" width="100" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="200" y="53" text-anchor="middle">G</text>
  <line x1="250" y1="48" x2="360" y2="48" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5c)"/>
  <text x="372" y="52" font-size="13">C</text>
  <circle cx="300" cy="48" r="3" fill="currentColor"/>
  <line x1="300" y1="48" x2="300" y2="120" stroke="currentColor" stroke-width="1.6"/>
  <rect x="150" y="100" width="100" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="200" y="125" text-anchor="middle">H</text>
  <line x1="150" y1="120" x2="86" y2="120" stroke="currentColor" stroke-width="1.6"/>
  <line x1="86" y1="120" x2="86" y2="66" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5c)"/>
</svg>

$$E = R - HC,\\qquad C = EG
\\quad\\Longrightarrow\\quad
T = \\frac{C}{R} = \\frac{G}{1+GH}$$

Minus at the summer gives the $+$ in the denominator. Positive feedback is
$G/(1-GH)$. The product $GH$ is the **loop gain**, or open-loop transfer function.

Unity feedback is $H=1$, so $T=G/(1+G)$. Almost every 5.3 design problem is that case.
`
    },
    {
      title: "Moving a block past a summer or a pickoff",
      sec: "5.2",
      body: `
Cascade, parallel, and feedback are not always sitting on the page. A pickoff taken
from the error signal, or a block sitting after a summer, hides the form. Move the
block so a named form appears, then reduce.

The rule is not a memorized picture. Trace $R$ and the extra signal $X$ to $C$ on
both sides and require the same expression.

### Past a summing junction

<svg viewBox="0 0 700 200" class="nx-fig" aria-label="Move G past a summing junction">
  <defs><marker id="n5d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="0" y="16" font-size="12" opacity=".65">Move G left through the summer: X must also meet G.</text>
  <text x="8" y="64" font-size="13">R</text>
  <line x1="28" y1="60" x2="58" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <circle cx="74" cy="60" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="74" y="65" text-anchor="middle" font-size="14">+</text>
  <line x1="88" y1="60" x2="118" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <rect x="118" y="40" width="72" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="154" y="65" text-anchor="middle">G</text>
  <line x1="190" y1="60" x2="230" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <text x="238" y="64" font-size="13">C</text>
  <text x="74" y="112" text-anchor="middle" font-size="13">X</text>
  <line x1="74" y1="100" x2="74" y2="76" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>

  <text x="300" y="65" font-size="18">=</text>

  <text x="340" y="64" font-size="13">R</text>
  <line x1="360" y1="60" x2="390" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <rect x="390" y="40" width="72" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="426" y="65" text-anchor="middle">G</text>
  <line x1="462" y1="60" x2="492" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <circle cx="508" cy="60" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="508" y="65" text-anchor="middle" font-size="14">+</text>
  <line x1="522" y1="60" x2="562" y2="60" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <text x="570" y="64" font-size="13">C</text>
  <rect x="390" y="118" width="72" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="426" y="143" text-anchor="middle">G</text>
  <text x="360" y="144" font-size="13">X</text>
  <line x1="376" y1="138" x2="390" y2="138" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
  <line x1="462" y1="138" x2="508" y2="138" stroke="currentColor" stroke-width="1.6"/>
  <line x1="508" y1="138" x2="508" y2="76" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5d)"/>
</svg>

Left side: $C=(R\\pm X)G = RG\\pm XG$.  
Right side: both inputs pass through $G$ before they add. Same $C$.

Moving $G$ the other way, *to the right* through the summer, means $X$ no longer
sees $G$. To keep $C$ unchanged you insert $1/G$ on the $X$ path.

### Past a pickoff

Pushing $G$ to the left past a pickoff: the branch that used to carry $R$ now
carries $RG$, so put $1/G$ on that branch to restore $R$.

Pushing $G$ to the right past a pickoff: the branch that used to carry $R$ must
now carry $RG$, so put a copy of $G$ on that branch.

Never move a block through a pickoff or summer "for free." One path will be missing
a factor. That missing factor is the $G$ or $1/G$ you add.
`
    },
    {
      title: "How to reduce a diagram that is not already a named form",
      sec: "5.2",
      body: `
A working order. Not a ritual: if a feedback pair is already isolated, take it first.

1. Name $R$ and $C$. If the question wants an intermediate signal, name that too.
   A correct $T$ for the wrong pair is a wrong answer.
2. Collapse adjacent summers that share a node and add nothing between them.
3. Reduce every isolated cascade to a product and every isolated parallel pair to a sum.
4. Reduce every isolated feedback pair with $G/(1\\pm GH)$.
5. If a pickoff or an extra summer blocks a reduction, move one block using the
   identities above, then return to 3.

**Check.** Degrees: each genuine energy-storage element in the plants should still
be visible in the denominator after cancellation of shared factors. DC: set $s=0$
and ask what a constant input does physically.

A minor loop inside a major loop is just two uses of the feedback formula. Reduce
the inner loop first. Its $T_{\\text{inner}}$ becomes a block in the outer forward path.
`
    },
    {
      title: "Closed-loop poles move when the gain moves",
      sec: "5.3",
      body: `
Section 5.3 is Chapter 4 applied to $T(s)$ after the diagram has collapsed.

The standard plant in this section is a gain times a type-1 second-order piece,
unity feedback:

<svg viewBox="0 0 560 100" class="nx-fig" aria-label="Unity-feedback second-order loop">
  <defs><marker id="n5e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="6" y="42" font-size="13">R</text>
  <line x1="28" y1="38" x2="58" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5e)"/>
  <circle cx="74" cy="38" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="74" y="34" text-anchor="middle" font-size="11">+</text>
  <text x="74" y="50" text-anchor="middle" font-size="11">-</text>
  <line x1="88" y1="38" x2="130" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5e)"/>
  <rect x="130" y="18" width="150" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="205" y="43" text-anchor="middle">K/[s(s+a)]</text>
  <line x1="280" y1="38" x2="360" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5e)"/>
  <text x="370" y="42" font-size="13">C</text>
  <circle cx="320" cy="38" r="3" fill="currentColor"/>
  <line x1="320" y1="38" x2="320" y2="84" stroke="currentColor" stroke-width="1.6"/>
  <line x1="320" y1="84" x2="74" y2="84" stroke="currentColor" stroke-width="1.6"/>
  <line x1="74" y1="84" x2="74" y2="54" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5e)"/>
</svg>

$$T(s)=\\frac{K}{s^{2}+as+K}$$

Read Chapter 4 off this polynomial:

$$\\omega_n=\\sqrt{K},\\qquad 2\\zeta\\omega_n=a\\quad\\Rightarrow\\quad \\zeta=\\frac{a}{2\\sqrt{K}}$$

As $K$ increases:

| $K$ | Poles | What moves |
|---|---|---|
| $0<K<a^{2}/4$ | two real, distinct | they walk toward each other |
| $K=a^{2}/4$ | repeated at $-a/2$ | critical damping |
| $K>a^{2}/4$ | $-a/2\\pm j\\sqrt{K-a^{2}/4}$ | real part **fixed**, imaginary part grows |

So for this plant, **settling time is independent of $K$ once the system is
underdamped**: $T_s=4/(a/2)=8/a$. Overshoot and peak time are not. Larger $K$
means larger $\\omega_n$, smaller $\\zeta$, more overshoot, smaller $T_p$.

That is the design knob 5.3 gives you. One parameter. It cannot set $T_s$ and
$\\%OS$ independently. That limitation is why later chapters add a compensator.
`
    }
  ],

  formulas: [
    { latex: "T=G_2G_1",
      note: "Cascade, no loading. Connecting $G_2$ must not change the output of $G_1$." },
    { latex: "T=\\pm G_1\\pm G_2",
      note: "Parallel. Signs are the signs at the summing junction." },
    { latex: "T=\\dfrac{G}{1+GH}",
      note: "Negative feedback. Positive feedback replaces the $+$ with $-$. $GH$ is the loop gain." },
    { latex: "T=\\dfrac{K}{s^{2}+as+K}",
      note: "Unity feedback around $K/[s(s+a)]$. Then $\\omega_n=\\sqrt{K}$ and $\\zeta=a/(2\\sqrt{K})$." },
    { latex: "(R\\pm X)G \\;\\equiv\\; RG\\pm XG",
      note: "Identity for moving $G$ left through a summer: copy $G$ onto the $X$ path." }
  ],

  problems: [
    {
      id: "5-01", difficulty: "warmup", topic: "Block diagram elements",
      sec: "5.2",
      prompt: `On a block diagram, a line leaves $C(s)$ and feeds two places: the output node and
the input of $H(s)$. What mark is that, and what is true of the two departing signals?`,
      hint: "Does the signal split and stay the same, or do the two paths add?",
      answer: "A pickoff. Both departing signals equal $C(s)$. Nothing is scaled or added there.",
      expert: `
**First glance:** two arrows leaving one node, no circle, no $\\pm$. That is a pickoff.

**Discard:** a summing junction. Summers have incoming arrows and a written sign.
A block would have a rectangle.

**Path:** pickoff copies. $C$ on the output wire is the same $C$ that enters $H$.
`,
      solution: `
A node with one incoming signal and several outgoing branches, no rectangle and no
$\\pm$, is a **pickoff**.

Each outgoing branch carries the incoming transform unchanged. If the incoming
signal is $C(s)$, both the output node and $H(s)$ receive $C(s)$.

A summing junction is the other mark: several incoming branches, one outgoing,
signs written at the incoming arrows.
`
    },
    {
      id: "5-02", difficulty: "warmup", topic: "Cascade and loading",
      sec: "5.2",
      prompt: `Two isolated stages have

$$G_1=\\frac{2}{s+2},\\qquad G_2=\\frac{4}{s+4}.$$

**(a)** If they are cascaded with no loading, what is $T=C/R$?
**(b)** A later measurement of the connected hardware gives

$$T=\\frac{8}{s^{2}+8s+8}.$$

What happened? Name the missing term.`,
      hint: "Write $G_2G_1$. Compare damping coefficients.",
      answer: "**(a)** $T=8/[(s+2)(s+4)]=8/(s^2+6s+8)$. **(b)** Loading. The connected denominator has $8s$ instead of $6s$; the extra $2s$ is the interaction term the product misses.",
      expert: `
**First glance:** part (a) is the product. Part (b) is the same DC gain $8/8=1=G_1(0)G_2(0)$,
so the discrepancy is not a gain error. It lives in the $s$ coefficient.

**Discard:** "the stages were numbered backwards." Transfer functions commute.
$G_1G_2=G_2G_1$ as functions.

**Path:** product damping $2+4=6$. Measured damping $8$. The extra $2$ is exactly
the kind of $1/(R_2C_1)$ cross term two passive stages produce when they share a node.
`,
      solution: `
## (a)

No loading means the equivalent is the product.

$$T=G_2G_1=\\frac{4}{s+4}\\cdot\\frac{2}{s+2}=\\frac{8}{(s+2)(s+4)}=\\frac{8}{s^{2}+6s+8}$$

## (b)

The measured function has the same numerator and the same constant term, so the same
DC gain $T(0)=1$. The linear coefficients differ: $6$ versus $8$.

That extra $2s$ is the loading term. Connecting the second stage changes the current
drawn from the first, which adds a cross coefficient the isolated models do not know
about. An isolating amplifier between the stages would have restored the product in (a).
`
    },
    {
      id: "5-03", difficulty: "warmup", topic: "Parallel form",
      sec: "5.2",
      prompt: `Three blocks share an input $R$. Their outputs enter a summer as $+G_1$, $-G_2$, $+G_3$,
and the summer output is $C$. Write $T=C/R$.`,
      answer: "$$T=G_1-G_2+G_3$$",
      expert: `
**First glance:** one $R$, three forward paths, one summer. Parallel.

**Path:** copy the signs off the summer. $T=G_1-G_2+G_3$.
`,
      solution: `
Each path sees the same $R$, so $C=(G_1-G_2+G_3)R$, hence

$$T=G_1-G_2+G_3.$$

The only content is the minus on $G_2$.
`
    },
    {
      id: "5-04", difficulty: "core", topic: "Feedback formula",
      sec: "5.2",
      prompt: `For negative unity feedback around $G$, derive $T=C/R$ from $E=R-C$ and $C=EG$.
Then state what changes if the summer is $E=R+C$ instead.`,
      hint: "Eliminate $E$. Do not quote the boxed formula until you have it.",
      answer: "Negative: $T=G/(1+G)$. Positive: $T=G/(1-G)$.",
      expert: `
**First glance:** two equations, two unknowns $E,C$. Algebra, not a picture memory.

**Discard:** writing $1+GH$ with a leftover $H$. Here $H=1$.

**Check:** DC of $G=K$ large. Negative unity feedback gives $T\\to 1$. Positive
unity feedback around a large $G$ is a pole near $+1$ in the $T$ denominator and
runs away. The sign in the denominator is the stability tell.
`,
      solution: `
Negative unity feedback:

$$E=R-C,\\qquad C=EG=G(R-C).$$

$$C=GR-GC\\quad\\Rightarrow\\quad C(1+G)=GR\\quad\\Rightarrow\\quad T=\\frac{G}{1+G}.$$

Positive summer $E=R+C$:

$$C=G(R+C)\\quad\\Rightarrow\\quad C-GC=GR\\quad\\Rightarrow\\quad T=\\frac{G}{1-G}.$$

The sign at the summer is the sign that appears, flipped, in the denominator.
`
    },
    {
      id: "5-05", difficulty: "core", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Unity-gain prefilter $G_1=2$, then a negative-feedback loop with forward $G_2=1/(s+1)$
and feedback $H=s$. Find $T=C/R$.

<svg viewBox="0 0 620 150" class="nx-fig" aria-label="Prefilter and inner loop">
  <defs><marker id="n5f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="4" y="42" font-size="13">R</text>
  <line x1="24" y1="38" x2="50" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5f)"/>
  <rect x="50" y="18" width="70" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="85" y="43" text-anchor="middle">2</text>
  <line x1="120" y1="38" x2="160" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5f)"/>
  <circle cx="176" cy="38" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="176" y="34" text-anchor="middle" font-size="11">+</text>
  <text x="176" y="50" text-anchor="middle" font-size="11">-</text>
  <line x1="190" y1="38" x2="230" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5f)"/>
  <rect x="230" y="18" width="100" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="280" y="43" text-anchor="middle">1/(s+1)</text>
  <line x1="330" y1="38" x2="410" y2="38" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5f)"/>
  <text x="420" y="42" font-size="13">C</text>
  <circle cx="360" cy="38" r="3" fill="currentColor"/>
  <line x1="360" y1="38" x2="360" y2="110" stroke="currentColor" stroke-width="1.6"/>
  <rect x="230" y="90" width="70" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="265" y="115" text-anchor="middle">s</text>
  <line x1="230" y1="110" x2="176" y2="110" stroke="currentColor" stroke-width="1.6"/>
  <line x1="176" y1="110" x2="176" y2="54" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5f)"/>
</svg>`,
      hint: "Inner loop first. Then multiply by the cascade 2.",
      answer: "$$T=\\dfrac{2}{2s+1}$$",
      expert: `
**First glance:** a cascade in front of an isolated feedback pair. Inner loop first.

**Discard:** feeding $H=s$ around both blocks. The pickoff is after $G_2$, the summer
is after $G_1$. $G_1$ is outside the loop.

**Path:** $T_{\\text{inner}}=G_2/(1+G_2H)=\\dfrac{1/(s+1)}{1+s/(s+1)}=1/(2s+1)$.
Then $T=2\\cdot T_{\\text{inner}}$.
`,
      solution: `
Inner loop, negative feedback:

$$T_{\\text{inner}}=\\frac{G_2}{1+G_2H}=\\frac{1/(s+1)}{1+\\dfrac{s}{s+1}}=\\frac{1/(s+1)}{(s+1+s)/(s+1)}=\\frac{1}{2s+1}.$$

$G_1=2$ is cascaded in front and is not inside the loop, so

$$T=2\\cdot\\frac{1}{2s+1}=\\frac{2}{2s+1}.$$

Check: $T(0)=2$. A constant $R$ produces $E$ such that $C=E/(1)$ wait: at DC,
$G_2(0)=1$, $H(0)=0$, so the inner loop is open at DC and $T_{\\text{inner}}(0)=1$,
$T(0)=2$. The $H=s$ block is a differentiator; it is silent on constants. ✓
`
    },
    {
      id: "5-06", difficulty: "core", topic: "Moving blocks",
      sec: "5.2",
      prompt: `A summer forms $R-X$, then a block $G$ produces $C=(R-X)G$. You want $G$ to sit
*before* the summer. What block must appear on the $X$ path so $C$ is unchanged?`,
      hint: "Write $C$ both ways and match coefficients of $X$.",
      answer: "A copy of $G$ on the $X$ path, so the summer sees $RG$ and $XG$.",
      expert: `
**First glance:** this is the left-through-summer identity. $C=RG-XG$ already.

**Path:** after the move, $R$ goes through $G$ first. For $X$ to still be multiplied
by $G$, $X$ must also go through a $G$ before the summer.
`,
      solution: `
As drawn, $C=(R-X)G=RG-XG$.

After $G$ moves left, $R$ is multiplied by $G$ before the summer. The summer output
is then (something)$\\,-\\,$(something). To keep $C=RG-XG$, the subtracted something
must be $XG$. So the $X$ path also passes through $G$.

Putting $1/G$ on that path would cancel the new $G$ and leave $C=RG-X$, which is a
different system.
`
    },
    {
      id: "5-07", difficulty: "core", topic: "Moving blocks",
      sec: "5.2",
      prompt: `A block $G$ sits on the forward line. A pickoff *after* $G$ currently feeds $H$.
You move $G$ to the right, past that pickoff. What must you place on the branch
that goes to $H$ so the signals are unchanged?`,
      answer: "A copy of $G$. The branch to $H$ used to carry $RG$; after the move the pickoff sees $R$, so $H$ needs its own $G$.",
      expert: `
**First glance:** pickoff identity, move right. The branch loses $G$ unless you
put $G$ on it.

**Discard:** putting $1/G$ on the $H$ branch. That would be the move *left*
past the pickoff.
`,
      solution: `
Before the move the pickoff is after $G$, so $H$ receives $RG$.

After $G$ is pushed right of the pickoff, the pickoff node carries $R$. For $H$
to keep receiving $RG$, the branch to $H$ must contain $G$.

The opposite move (slide $G$ left through the pickoff) puts $1/G$ on the branch,
because that branch would otherwise carry $RG$ when it used to carry $R$.
`
    },
    {
      id: "5-08", difficulty: "challenge", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Reduce the system below to $T=C/R$.

Forward path: $G_1=1$, then a summer, then $G_2=2/(s+2)$, then $C$.
Feedback from $C$ through $H_1=1$ (negative) into that summer.
A second feedback from $C$ through $H_2=3$ (negative) into a summer *in front of*
$G_1$, where it subtracts from $R$.

<svg viewBox="0 0 680 190" class="nx-fig" aria-label="Minor and major loops">
  <defs><marker id="n5g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
  <text x="4" y="50" font-size="13">R</text>
  <line x1="24" y1="46" x2="54" y2="46" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <circle cx="70" cy="46" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="70" y="42" text-anchor="middle" font-size="11">+</text>
  <text x="70" y="58" text-anchor="middle" font-size="11">-</text>
  <line x1="84" y1="46" x2="120" y2="46" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <rect x="120" y="26" width="60" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="150" y="51" text-anchor="middle">1</text>
  <line x1="180" y1="46" x2="220" y2="46" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <circle cx="236" cy="46" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="236" y="42" text-anchor="middle" font-size="11">+</text>
  <text x="236" y="58" text-anchor="middle" font-size="11">-</text>
  <line x1="250" y1="46" x2="286" y2="46" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <rect x="286" y="26" width="100" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="336" y="51" text-anchor="middle">2/(s+2)</text>
  <line x1="386" y1="46" x2="470" y2="46" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <text x="480" y="50" font-size="13">C</text>
  <circle cx="430" cy="46" r="3" fill="currentColor"/>
  <line x1="430" y1="46" x2="430" y2="100" stroke="currentColor" stroke-width="1.6"/>
  <rect x="286" y="84" width="50" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="311" y="105" text-anchor="middle">1</text>
  <line x1="286" y1="100" x2="236" y2="100" stroke="currentColor" stroke-width="1.6"/>
  <line x1="236" y1="100" x2="236" y2="62" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
  <line x1="430" y1="100" x2="430" y2="150" stroke="currentColor" stroke-width="1.6"/>
  <rect x="120" y="134" width="50" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <text x="145" y="155" text-anchor="middle">3</text>
  <line x1="430" y1="150" x2="170" y2="150" stroke="currentColor" stroke-width="1.6"/>
  <line x1="120" y1="150" x2="70" y2="150" stroke="currentColor" stroke-width="1.6"/>
  <line x1="70" y1="150" x2="70" y2="62" stroke="currentColor" stroke-width="1.6" marker-end="url(#n5g)"/>
</svg>`,
      hint: "Inner loop $G_2$ with $H_1=1$ first. That block then sits in the outer loop with $H_2=3$.",
      answer: "$$T=\\dfrac{2}{s+10}$$",
      expert: `
**First glance:** minor loop around $G_2$, major loop around everything. Inner first.

**Path:** $T_{\\text{inner}}=\\dfrac{2/(s+2)}{1+2/(s+2)}=2/(s+4)$.
Outer forward path is $1\\cdot T_{\\text{inner}}=2/(s+4)$, $H_2=3$, so
$T=\\dfrac{2/(s+4)}{1+6/(s+4)}=2/(s+10)$.
`,
      solution: `
**Inner loop.** Forward $G_2=2/(s+2)$, $H_1=1$, negative.

$$T_{\\text{inner}}=\\frac{2/(s+2)}{1+2/(s+2)}=\\frac{2}{s+2+2}=\\frac{2}{s+4}.$$

**Outer loop.** Forward $G_1T_{\\text{inner}}=2/(s+4)$, $H_2=3$, negative.

$$T=\\frac{2/(s+4)}{1+3\\cdot 2/(s+4)}=\\frac{2}{s+4+6}=\\frac{2}{s+10}.$$

DC check: $T(0)=1/5$. A unit step should settle at $0.2$. Both loops are negative
and $H_2=3$ is a heavy DC feedback, so a small final value is the right shape. ✓
`
    },
    {
      id: "5-09", difficulty: "core", topic: "Closed-loop specs",
      sec: "5.3",
      prompt: `Unity negative feedback around $G=100/[s(s+10)]$. Find $\\zeta$, $\\omega_n$, $T_s$,
$T_p$, and $\\%OS$ of the closed-loop step response.`,
      hint: "Form $T=G/(1+G)$, then read $s^2+2\\zeta\\omega_n s+\\omega_n^2$.",
      answer: "$\\omega_n=10$, $\\zeta=1/2$, $T_s=0.8$ s, $T_p=\\pi/(5\\sqrt{3})$ s, $\\%OS=100e^{-\\pi/\\sqrt{3}}$.",
      expert: `
**First glance:** 5.3 plant. $T=100/(s^2+10s+100)$. $\\omega_n=10$, $2\\zeta\\omega_n=10$
so $\\zeta=1/2$. The rest is Chapter 4 at $\\zeta=1/2$.

**Discard:** reading specs off the *open*-loop poles $0$ and $-10$. Those are not
the closed-loop poles.
`,
      solution: `
$$T=\\frac{G}{1+G}=\\frac{100/[s(s+10)]}{1+100/[s(s+10)]}=\\frac{100}{s^{2}+10s+100}.$$

$$\\omega_n=10,\\qquad 2\\zeta\\omega_n=10\\quad\\Rightarrow\\quad \\zeta=\\tfrac12.$$

Poles: $-5\\pm j5\\sqrt{3}$. Then

$$T_s=\\frac{4}{5}=0.8\\ \\text{s},\\qquad
T_p=\\frac{\\pi}{5\\sqrt{3}}\\ \\text{s},\\qquad
\\%OS=100e^{-\\pi/\\sqrt{3}}.$$

$\\zeta=1/2$ is the $60^{\\circ}$ line. No calculator.
`
    },
    {
      id: "5-10", difficulty: "core", topic: "Gain design",
      sec: "5.3",
      prompt: `Unity negative feedback around $G=K/[s(s+8)]$. Choose $K$ so that $\\%OS=100e^{-\\pi}$.
With that $K$, what is $T_s$?`,
      hint: "$100e^{-\\pi}$ is $\\zeta=\\sqrt{2}/2$. Then $\\zeta=8/(2\\sqrt{K})$.",
      answer: "$K=32$, $T_s=1$ s.",
      expert: `
**First glance:** $\\%OS=100e^{-\\pi}$ is the $45^{\\circ}$ case, $\\zeta=\\sqrt{2}/2$,
no logarithm required.

**Path:** $\\zeta=a/(2\\sqrt{K})=8/(2\\sqrt{K})=4/\\sqrt{K}=\\sqrt{2}/2$, so
$\\sqrt{K}=8/\\sqrt{2}=4\\sqrt{2}$, $K=32$. Real part $a/2=4$, $T_s=1$.
`,
      solution: `
$\\%OS=100e^{-\\pi}$ means $\\zeta=\\sqrt{2}/2$.

$$T=\\frac{K}{s^{2}+8s+K},\\qquad \\zeta=\\frac{8}{2\\sqrt{K}}=\\frac{4}{\\sqrt{K}}.$$

$$\\frac{4}{\\sqrt{K}}=\\frac{\\sqrt{2}}{2}\\quad\\Rightarrow\\quad \\sqrt{K}=\\frac{8}{\\sqrt{2}}=4\\sqrt{2}
\\quad\\Rightarrow\\quad K=32.$$

Underdamped real part is $a/2=4$, so $T_s=4/4=1$ s. Gain does not move that real
part on this plant. ✓
`
    },
    {
      id: "5-11", difficulty: "core", topic: "Pole migration",
      sec: "5.3",
      prompt: `For $T=K/(s^{2}+6s+K)$, describe the closed-loop poles as $K$ goes from $0$ through
$9$ and beyond. What happens to $T_s$ for $K>9$?`,
      answer: "For $0<K<9$, two real poles walk toward $-3$. At $K=9$, a repeated pole at $-3$. For $K>9$, poles $-3\\pm j\\sqrt{K-9}$; $T_s=4/3$ s, constant.",
      expert: `
**First glance:** discriminant $36-4K$. Critical at $K=9$. After that the real part
is locked at $-3$.

**Check:** $T_s=4/\\sigma_d=4/3$ once underdamped. Gain buys $\\omega_d$ and overshoot,
not settling, on this plant.
`,
      solution: `
Characteristic polynomial $s^{2}+6s+K$. Discriminant $36-4K$.

- $K<9$: real poles $-3\\pm\\sqrt{9-K}$, moving toward each other.
- $K=9$: repeated pole at $-3$.
- $K>9$: $-3\\pm j\\sqrt{K-9}$.

For $K>9$, $\\sigma_d=3$ is independent of $K$, so $T_s=4/3$ s stays put while
$T_p=\\pi/\\sqrt{K-9}$ falls and $\\%OS$ rises.
`
    },
    {
      id: "5-12", difficulty: "challenge", topic: "Closed-loop specs",
      sec: "5.3",
      prompt: `A plant $G=4/[s(s+4)]$ is already under unity negative feedback. An engineer adds a
**proportional gain $K$ in cascade in front of $G$**, still inside the loop
(after the error summer).

**(a)** Write $T(s)$.
**(b)** Find $K$ so that $\\zeta=1/2$.
**(c)** With that $K$, can this architecture meet $T_s\\le 0.5$ s? If not, what
would have to change?`,
      hint: "The forward path is $KG$. Settling is set by the real part $a/2=2$.",
      answer: "**(a)** $T=4K/(s^2+4s+4K)$. **(b)** $K=4$. **(c)** No. $T_s=2$ s is fixed. Meeting $0.5$ s requires a larger $a$, i.e. a different plant or a compensator that moves the real part.",
      expert: `
**First glance:** still the 5.3 plant, with $K$ absorbed into the numerator constant
$4K$. Real part stays $2$.

**The curveball:** part (c) is the point of 5.3. One gain cannot set $\\zeta$ and
$T_s$ at once on $K/[s(s+a)]$. Choosing $\\zeta$ spends $K$. $T_s$ was never on
that knob.
`,
      solution: `
## (a)

Forward path $KG=4K/[s(s+4)]$, $H=1$,

$$T=\\frac{4K}{s^{2}+4s+4K}.$$

## (b)

$$\\omega_n=2\\sqrt{K},\\qquad \\zeta=\\frac{4}{2\\cdot 2\\sqrt{K}}=\\frac{1}{\\sqrt{K}}.$$

$\\zeta=1/2$ gives $\\sqrt{K}=2$, $K=4$. Then $T=16/(s^{2}+4s+16)$, poles $-2\\pm j2\\sqrt{3}$.

## (c)

$T_s=4/2=2$ s for every underdamped $K$. The requirement $T_s\\le 0.5$ needs
$\\sigma_d\\ge 8$, but $\\sigma_d$ is glued to $a/2=2$. Gain cannot move it.

To move $\\sigma_d$ you change $a$ (a different motor, or rate feedback that
enlarges the $s$ coefficient) or you leave this architecture. That is the argument
for Chapter 9.
`
    }
  ]
});
