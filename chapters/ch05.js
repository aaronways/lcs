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
      example: "5-01",
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
      example: "5-01",
      sec: "5.2",
      body: `
A linear block diagram is built from four marks.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 320" class="nx-fig">
  <defs><marker id="nx0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="170" y="28" text-anchor="middle" font-size="13" opacity=".65">Signal</text>
  <line x1="50" y1="72" x2="290" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <text x="170" y="100" text-anchor="middle">R(s)</text>

  <text x="510" y="28" text-anchor="middle" font-size="13" opacity=".65">Block</text>
  <line x1="380" y1="72" x2="424" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <rect x="424" y="50" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="484" y="77" text-anchor="middle">G(s)</text>
  <line x1="544" y1="72" x2="630" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>

  <text x="170" y="168" text-anchor="middle" font-size="13" opacity=".65">Summing junction</text>
  <line x1="50" y1="220" x2="118" y2="220" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <circle cx="138" cy="220" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="138" y="226" text-anchor="middle" font-size="16">Σ</text>
  <text x="112" y="212" font-size="13">+</text>
  <line x1="138" y1="286" x2="138" y2="242" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <text x="150" y="282" font-size="13">− B(s)</text>
  <line x1="158" y1="220" x2="290" y2="220" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>

  <text x="510" y="168" text-anchor="middle" font-size="13" opacity=".65">Pickoff</text>
  <line x1="380" y1="220" x2="630" y2="220" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <circle cx="510" cy="220" r="3.5" fill="currentColor"/>
  <line x1="510" y1="220" x2="510" y2="286" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx0)"/>
  <text x="524" y="262" font-size="13">same R(s)</text>
</svg>
<figcaption>Four marks. A pickoff copies a signal. A summer adds them.</figcaption>
</figure>

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
      example: "5-04",
      sec: "5.2",
      body: `
Three topologies. Draw them until the equivalent $T(s)$ is automatic.

### Cascade

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 110" class="nx-fig">
  <defs><marker id="nx1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="8" y="60">R</text>
  <line x1="28" y1="54" x2="62" y2="54" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx1)"/>
  <rect x="62" y="32" width="88" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="106" y="59" text-anchor="middle">G₁</text>
  <line x1="150" y1="54" x2="184" y2="54" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx1)"/>
  <rect x="184" y="32" width="88" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="228" y="59" text-anchor="middle">G₂</text>
  <line x1="272" y1="54" x2="306" y2="54" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx1)"/>
  <text x="314" y="60">C</text>
  <text x="368" y="60" font-size="20">≡</text>
  <text x="402" y="60">R</text>
  <line x1="422" y1="54" x2="456" y2="54" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx1)"/>
  <rect x="456" y="32" width="130" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="521" y="59" text-anchor="middle">G₂ G₁</text>
  <line x1="586" y1="54" x2="624" y2="54" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx1)"/>
  <text x="632" y="60">C</text>
</svg>
<figcaption>Cascade. Equivalent transfer function is the product, if there is no loading.</figcaption>
</figure>

$$T = G_2G_1$$

Order in the product is the signal order, right to left if you write operators that
way; commutativity of scalar transfer functions makes $G_1G_2$ the same function.
The assumption is **no loading**: connecting $G_2$ does not change the output of $G_1$.

Two $RC$ stages soldered together load. The product $G_2G_1$ misses a cross term
$1/(R_2C_1)$ in the damping. An isolating amplifier between them restores the product.

### Parallel

Same input, outputs summed.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" class="nx-fig">
  <defs><marker id="nxp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="8" y="116">R</text>
  <line x1="28" y1="110" x2="90" y2="110" stroke="currentColor" stroke-width="1.8"/>
  <circle cx="90" cy="110" r="3.5" fill="currentColor"/>
  <line x1="90" y1="40" x2="90" y2="180" stroke="currentColor" stroke-width="1.8"/>
  <line x1="90" y1="40" x2="150" y2="40" stroke="currentColor" stroke-width="1.8" marker-end="url(#nxp)"/>
  <line x1="90" y1="110" x2="150" y2="110" stroke="currentColor" stroke-width="1.8" marker-end="url(#nxp)"/>
  <line x1="90" y1="180" x2="150" y2="180" stroke="currentColor" stroke-width="1.8" marker-end="url(#nxp)"/>
  <rect x="150" y="18" width="100" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="200" y="45" text-anchor="middle">G₁</text>
  <rect x="150" y="88" width="100" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="200" y="115" text-anchor="middle">G₂</text>
  <rect x="150" y="158" width="100" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="200" y="185" text-anchor="middle">G₃</text>
  <line x1="250" y1="40" x2="340" y2="40" stroke="currentColor" stroke-width="1.8"/>
  <line x1="250" y1="110" x2="340" y2="110" stroke="currentColor" stroke-width="1.8"/>
  <line x1="250" y1="180" x2="340" y2="180" stroke="currentColor" stroke-width="1.8"/>
  <line x1="340" y1="40" x2="340" y2="180" stroke="currentColor" stroke-width="1.8"/>
  <line x1="340" y1="110" x2="378" y2="110" stroke="currentColor" stroke-width="1.8" marker-end="url(#nxp)"/>
  <circle cx="398" cy="110" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="398" y="116" text-anchor="middle" font-size="16">Σ</text>
  <text x="352" y="36" font-size="13">+</text>
  <text x="352" y="106" font-size="13">−</text>
  <text x="352" y="176" font-size="13">+</text>
  <line x1="418" y1="110" x2="500" y2="110" stroke="currentColor" stroke-width="1.8" marker-end="url(#nxp)"/>
  <text x="512" y="116">C</text>
</svg>
<figcaption>Parallel. Same input; the summer writes the signs.</figcaption>
</figure>

$$T = \\pm G_1 \\pm G_2 \\pm G_3$$

The signs are the signs at the summer.

### Feedback

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 210" class="nx-fig">
  <defs><marker id="nx2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="58">R</text>
  <line x1="26" y1="52" x2="70" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx2)"/>
  <circle cx="90" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="90" y="58" text-anchor="middle" font-size="16">Σ</text>
  <text x="64" y="44" font-size="13">+</text>
  <text x="98" y="86" font-size="13">−</text>
  <line x1="110" y1="52" x2="168" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx2)"/>
  <text x="132" y="42" font-size="13">E</text>
  <rect x="168" y="30" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="228" y="57" text-anchor="middle">G</text>
  <line x1="288" y1="52" x2="430" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx2)"/>
  <text x="444" y="58">C</text>
  <circle cx="360" cy="52" r="3.5" fill="currentColor"/>
  <line x1="360" y1="52" x2="360" y2="150" stroke="currentColor" stroke-width="1.8"/>
  <line x1="360" y1="150" x2="228" y2="150" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx2)"/>
  <rect x="168" y="128" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="228" y="155" text-anchor="middle">H</text>
  <line x1="168" y1="150" x2="90" y2="150" stroke="currentColor" stroke-width="1.8"/>
  <line x1="90" y1="150" x2="90" y2="74" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx2)"/>
</svg>
<figcaption>Negative feedback. E = R − HC and C = EG give T = G / (1 + GH).</figcaption>
</figure>

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
      example: "5-06",
      sec: "5.2",
      body: `
Cascade, parallel, and feedback are not always sitting on the page. A pickoff taken
from the error signal, or a block sitting after a summer, hides the form. Move the
block so a named form appears, then reduce.

The rule is not a memorized picture. Trace $R$ and the extra signal $X$ to $C$ on
both sides and require the same expression.

### Past a summing junction

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 280" class="nx-fig">
  <defs><marker id="nx3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="20" y="24" font-size="13" opacity=".65">G after the summer</text>
  <text x="8" y="78">R</text>
  <line x1="26" y1="72" x2="70" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <circle cx="88" cy="72" r="18" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="88" y="77" text-anchor="middle" font-size="15">Σ</text>
  <line x1="106" y1="72" x2="148" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <rect x="148" y="50" width="80" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="188" y="77" text-anchor="middle">G</text>
  <line x1="228" y1="72" x2="280" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <text x="288" y="78">C</text>
  <text x="70" y="128">X</text>
  <line x1="88" y1="116" x2="88" y2="92" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>

  <text x="360" y="78" font-size="22">≡</text>

  <text x="420" y="24" font-size="13" opacity=".65">G before the summer</text>
  <text x="400" y="78">R</text>
  <line x1="418" y1="72" x2="458" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <rect x="458" y="50" width="80" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="498" y="77" text-anchor="middle">G</text>
  <line x1="538" y1="72" x2="578" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <circle cx="596" cy="72" r="18" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="596" y="77" text-anchor="middle" font-size="15">Σ</text>
  <line x1="614" y1="72" x2="660" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <text x="666" y="78">C</text>
  <text x="400" y="168">X</text>
  <line x1="418" y1="162" x2="458" y2="162" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
  <rect x="458" y="140" width="80" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="498" y="167" text-anchor="middle">G</text>
  <line x1="538" y1="162" x2="596" y2="162" stroke="currentColor" stroke-width="1.8"/>
  <line x1="596" y1="162" x2="596" y2="92" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx3)"/>
</svg>
<figcaption>Moving G left through a summer. X must also pass through G, or C changes.</figcaption>
</figure>

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
      example: "5-08",
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
      example: "5-11",
      sec: "5.3",
      body: `
Section 5.3 is Chapter 4 applied to $T(s)$ after the diagram has collapsed.

The standard plant in this section is a gain times a type-1 second-order piece,
unity feedback:

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 200" class="nx-fig">
  <defs><marker id="nx4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="58">R</text>
  <line x1="26" y1="52" x2="70" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx4)"/>
  <circle cx="90" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="90" y="58" text-anchor="middle" font-size="16">Σ</text>
  <text x="64" y="44" font-size="13">+</text>
  <text x="98" y="86" font-size="13">−</text>
  <line x1="110" y1="52" x2="168" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx4)"/>
  <rect x="168" y="28" width="160" height="48" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="248" y="57" text-anchor="middle">K / [s(s + a)]</text>
  <line x1="328" y1="52" x2="430" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx4)"/>
  <text x="444" y="58">C</text>
  <circle cx="360" cy="52" r="3.5" fill="currentColor"/>
  <line x1="360" y1="52" x2="360" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="360" y1="140" x2="90" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="90" y1="140" x2="90" y2="74" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx4)"/>
</svg>
<figcaption>Unity feedback around K / [s(s + a)]. Closed-loop T = K / (s² + a s + K).</figcaption>
</figure>

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
      note: "Cascade, no loading." },
    { latex: "T=\\pm G_1\\pm G_2",
      note: "Parallel. Signs are the signs at the summer." },
    { latex: "T=\\dfrac{G}{1+GH}",
      note: "Negative feedback. Positive feedback uses $1-GH$. $GH$ is the loop gain." },
    { latex: "T=\\dfrac{K}{s^{2}+as+K}",
      note: "Unity feedback around $K/[s(s+a)]$. Then $\\omega_n=\\sqrt{K}$ and $\\zeta=a/(2\\sqrt{K})$." },
    { latex: "(R\\pm X)G \\equiv RG\\pm XG",
      note: "Moving $G$ left through a summer: copy $G$ onto the $X$ path." }
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

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" class="nx-fig">
  <defs><marker id="nx5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="58">R</text>
  <line x1="24" y1="52" x2="58" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
  <rect x="58" y="30" width="64" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="90" y="57" text-anchor="middle">2</text>
  <line x1="122" y1="52" x2="168" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
  <circle cx="188" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="188" y="58" text-anchor="middle" font-size="16">Σ</text>
  <text x="162" y="44" font-size="13">+</text>
  <text x="196" y="86" font-size="13">−</text>
  <line x1="208" y1="52" x2="256" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
  <rect x="256" y="30" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="316" y="57" text-anchor="middle">1 / (s + 1)</text>
  <line x1="376" y1="52" x2="490" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
  <text x="504" y="58">C</text>
  <circle cx="430" cy="52" r="3.5" fill="currentColor"/>
  <line x1="430" y1="52" x2="430" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="430" y1="140" x2="256" y2="140" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
  <rect x="196" y="118" width="60" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="226" y="145" text-anchor="middle">s</text>
  <line x1="196" y1="140" x2="188" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="188" y1="140" x2="188" y2="74" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx5)"/>
</svg>
<figcaption>Problem 5-05. The block 2 sits outside the loop.</figcaption>
</figure>`,
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

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 230" class="nx-fig">
  <defs><marker id="nx6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="4" y="58">R</text>
  <line x1="22" y1="52" x2="58" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <circle cx="78" cy="52" r="18" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="78" y="57" text-anchor="middle" font-size="15">Σ</text>
  <text x="54" y="44" font-size="12">+</text>
  <line x1="96" y1="52" x2="132" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <rect x="132" y="30" width="56" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="160" y="57" text-anchor="middle">1</text>
  <line x1="188" y1="52" x2="230" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <circle cx="248" cy="52" r="18" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="248" y="57" text-anchor="middle" font-size="15">Σ</text>
  <text x="224" y="44" font-size="12">+</text>
  <line x1="266" y1="52" x2="304" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <rect x="304" y="30" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="364" y="57" text-anchor="middle">2 / (s + 2)</text>
  <line x1="424" y1="52" x2="560" y2="52" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <text x="572" y="58">C</text>
  <circle cx="500" cy="52" r="3.5" fill="currentColor"/>
  <line x1="500" y1="52" x2="500" y2="120" stroke="currentColor" stroke-width="1.8"/>
  <rect x="304" y="98" width="56" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="332" y="125" text-anchor="middle">1</text>
  <line x1="304" y1="120" x2="248" y2="120" stroke="currentColor" stroke-width="1.8"/>
  <line x1="248" y1="120" x2="248" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <text x="256" y="92" font-size="12">−</text>
  <line x1="500" y1="120" x2="500" y2="188" stroke="currentColor" stroke-width="1.8"/>
  <rect x="132" y="166" width="56" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="160" y="193" text-anchor="middle">3</text>
  <line x1="500" y1="188" x2="188" y2="188" stroke="currentColor" stroke-width="1.8"/>
  <line x1="132" y1="188" x2="78" y2="188" stroke="currentColor" stroke-width="1.8"/>
  <line x1="78" y1="188" x2="78" y2="72" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6)"/>
  <text x="86" y="92" font-size="12">−</text>
</svg>
<figcaption>Problem 5-08. Inner loop first, then the outer loop.</figcaption>
</figure>`,
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
    },

    {
      id: "5-13", difficulty: "challenge", topic: "Loading",
      sec: "5.2",
      prompt: `A diagram prints two cascaded blocks and $T=G_2G_1$. The hardware is two passive $RC$ stages soldered together. Is the printed $T$ the hardware $T$? What block would make the diagram honest?`,
      hint: "Cascade-as-product assumes no loading.",
      answer: "No. Insert an isolating amplifier between the stages.",
      expert: `
**First glance:** a product on paper is a claim about impedances, not a soldering diagram.
`,
      solution: `
Connecting the second $RC$ stage draws current from the first capacitor and adds a cross term to the damping. The product $G_2G_1$ is then false.

A buffer with high input impedance and low output impedance restores the unloaded stages, and the product holds.
`
    },
    {
      id: "5-14", difficulty: "challenge", topic: "Feedback formula",
      sec: "5.2",
      prompt: `The summer is $E=R+HC$ with $H\\neq 1$, and $C=EG$. Find $T=C/R$ and name the sign of the loop.`,
      answer: "$$T=\\dfrac{G}{1-GH}.$$ Positive feedback.",
      expert: `
**Path:** $C=G(R+HC)$ rearranges to $C-GHC=GR$.
`,
      solution: `
$$C=G(R+HC)=GR+GHC,\\qquad C(1-GH)=GR,\\qquad T=\\frac{G}{1-GH}.$$

A plus at the summer is a minus in the denominator.
`
    },
    {
      id: "5-15", difficulty: "challenge", topic: "Moving blocks",
      sec: "5.2",
      prompt: `A pickoff *before* $G$ currently feeds $H$. You slide $G$ left, past that pickoff. What belongs on the branch to $H$?`,
      answer: "$1/G$. The pickoff now carries $RG$; $H$ used to receive $R$.",
      expert: `
**Discard:** putting $G$ on the branch. That restores $RG$ when $H$ already wanted $R$.
`,
      solution: `
Before the move, the node is $R$ and $H$ sees $R$.

After $G$ sits to the left of the pickoff, the node is $RG$. The branch must undo $G$, so it carries $1/G$.
`
    },
    {
      id: "5-16", difficulty: "core", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Forward path $G=2/(s+2)$ in negative unity feedback. A prefilter $F=s+2$ sits *outside* the loop, in cascade with $R$. Find $T=C/R$.`,
      hint: "Close the loop on $G$ alone, then multiply by $F$.",
      answer: "$$T=\\dfrac{2(s+2)}{s+4}.$$",
      expert: `
**First glance:** $F$ is not inside $G$. Do not cancel $s+2$ before applying the feedback formula.
`,
      solution: `
$$T_{\\text{cl}}=\\frac{G}{1+G}=\\frac{2/(s+2)}{1+2/(s+2)}=\\frac{2}{s+4}.$$

$$T=F\\,T_{\\text{cl}}=\\frac{2(s+2)}{s+4}.$$

The cancelled-looking factor survives as a zero of $T$.
`
    },
    {
      id: "5-17", difficulty: "core", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Negative feedback, $G=1/s$, $H=2$. Find $T$ and the closed-loop time constant.`,
      answer: "$$T=\\dfrac{1}{s+2},\\qquad \\tau=\\dfrac12.$$",
      expert: `
**Path:** an integrator in a loop with constant $H$ becomes a real pole at $-H$.
`,
      solution: `
$$T=\\frac{1/s}{1+2/s}=\\frac{1}{s+2}.$$

Pole at $-2$, so $\\tau=1/2$. Feedback turned an integrator into a lag.
`
    },
    {
      id: "5-18", difficulty: "challenge", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Two parallel forward blocks $G_1=1$ and $G_2=1/s$ add ($+$ and $+$). That sum is then the forward path of a negative unity-feedback loop. Find $T=C/R$.`,
      hint: "Parallel first, then the feedback formula.",
      answer: "$$T=\\dfrac{s+1}{2s+1}.$$",
      expert: `
**Path:** $G_e=(s+1)/s$, then $T=G_e/(1+G_e)$.
`,
      solution: `
$$G_e=1+\\frac{1}{s}=\\frac{s+1}{s},\\qquad
1+G_e=\\frac{2s+1}{s},\\qquad
T=\\frac{s+1}{2s+1}.$$
`
    },
    {
      id: "5-19", difficulty: "core", topic: "Closed-loop specs",
      sec: "5.3",
      prompt: `Unity negative feedback around $G=K/[s(s+20)]$. Choose $K$ so that $\\zeta=1/2$. What is $T_s$?`,
      answer: "$K=400$, $T_s=0.4$ s.",
      expert: `
**Path:** $\\zeta=10/\\sqrt{K}=1/2$ gives $K=400$. $\\sigma_d=10$.
`,
      solution: `
$$T=\\frac{K}{s^{2}+20s+K},\\qquad
\\zeta=\\frac{10}{\\sqrt{K}}=\\frac12,\\qquad K=400.$$

$\\sigma_d=10$, so $T_s=0.4$ s.
`
    },
    {
      id: "5-20", difficulty: "challenge", topic: "Gain design",
      sec: "5.3",
      prompt: `Same plant $G=K/[s(s+20)]$, unity negative feedback. Can one $K$ give both $T_s=0.2$ s and $\\zeta=1/2$?`,
      answer: "No. For every underdamped $K$, $T_s=0.4$ s.",
      expert: `
**The limit:** $\\sigma_d$ is glued to $a/2=10$. Asking for $T_s=0.2$ asks for $\\sigma_d=20$.
`,
      solution: `
Underdamped poles are $-10\\pm j\\sqrt{K-100}$. The real part does not move with $K$.

$T_s=4/10=0.4$ s for all $K>100$. Meeting $0.2$ s needs a different $a$ or a compensator.
`
    },
    {
      id: "5-21", difficulty: "core", topic: "Pole migration",
      sec: "5.3",
      prompt: `For $T=K/(s^{2}+10s+K)$, at what $K$ does the step response become underdamped? What happens to $T_p$ as $K$ grows past that value?`,
      answer: "Underdamped for $K>25$. $T_p=\\pi/\\sqrt{K-25}$ decreases toward $0$.",
      expert: `
**Path:** critical at $K=a^{2}/4=25$. Then $\\omega_d=\\sqrt{K-25}$.
`,
      solution: `
Discriminant $100-4K$. Repeated poles at $K=25$.

For $K>25$, $\\omega_d=\\sqrt{K-25}$ and $T_p=\\pi/\\omega_d$ falls as $K$ grows. Overshoot rises with it.
`
    },
    {
      id: "5-22", difficulty: "core", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Minor loop: $G_2=1/(s+1)$, $H_2=1$, negative. That combination is the plant for a major loop with $G_1=K$ and $H_1=1$, negative. Find $T(s)$.`,
      answer: "$$T=\\dfrac{K}{s+2+K}.$$",
      expert: `
**Path:** inner first, $T_i=1/(s+2)$. Then $T=KT_i/(1+KT_i)$.
`,
      solution: `
$$T_i=\\frac{1/(s+1)}{1+1/(s+1)}=\\frac{1}{s+2}.$$

$$T=\\frac{K/(s+2)}{1+K/(s+2)}=\\frac{K}{s+2+K}.$$
`
    },
    {
      id: "5-23", difficulty: "challenge", topic: "Feedback formula",
      sec: "5.2",
      prompt: `Unity *positive* feedback around $G=2/(s+3)$. Find the closed-loop pole. Is the loop stable?`,
      hint: "$T=G/(1-G)$. Positive feedback is unstable only if the loop gain reaches $1$ in the RHP sense.",
      answer: "Pole at $s=-1$. Stable. $G(0)=2/3<1$.",
      expert: `
**Discard:** "positive feedback means unstable." That is a slogan, not a calculation.
`,
      solution: `
$$T=\\frac{G}{1-G}=\\frac{2/(s+3)}{1-2/(s+3)}=\\frac{2}{s+1}.$$

The pole is at $-1$, in the LHP. DC loop gain $2/3$ is less than $1$, so the plus in the summer never quite regenerates.
`
    },
    {
      id: "5-24", difficulty: "core", topic: "Closed-loop specs",
      sec: "5.3",
      prompt: `Unity negative feedback around $G=36/[s(s+3)]$. Compute $\\zeta$, $\\omega_n$, $T_s$, and $\\%OS$.`,
      answer: "$\\omega_n=6$, $\\zeta=1/4$, $T_s=8/3$ s, $\\%OS=100e^{-\\pi/\\sqrt{15}}$.",
      expert: `
**Path:** $T=36/(s^{2}+3s+36)$. $2\\zeta\\omega_n=3$, $\\omega_n=6$.
`,
      solution: `
$$T=\\frac{36}{s^{2}+3s+36},\\qquad \\omega_n=6,\\qquad \\zeta=\\frac{3}{12}=\\frac14.$$

$$\\sigma_d=1.5,\\qquad T_s=\\frac{4}{1.5}=\\frac{8}{3}\\ \\text{s},\\qquad
\\%OS=100e^{-\\pi\\zeta/\\sqrt{1-\\zeta^{2}}}=100e^{-\\pi/\\sqrt{15}}.$$
`
    },
    {
      id: "5-25", difficulty: "challenge", topic: "Gain design",
      sec: "5.3",
      prompt: `Unity negative feedback, $G=K/[s(s+8)]$. You need $\\%OS=16.3\\%$ ($\\zeta=1/2$) and you would like $T_p$ as small as possible.

What $K$ meets the overshoot, and can $T_p$ be reduced further without changing $\\zeta$?`,
      answer: "$K=64$. Not with this plant: $\\zeta$ fixes $K$, and $T_p=\\pi/(\\omega_n\\sqrt{1-\\zeta^{2}})$ is then fixed too.",
      expert: `
**Path:** $\\zeta=4/\\sqrt{K}=1/2$ pins $K=64$. One knob, two wishes.
`,
      solution: `
$$\\zeta=\\frac{8}{2\\sqrt{K}}=\\frac{4}{\\sqrt{K}}=\\frac12\\quad\\Rightarrow\\quad K=64.$$

Then $\\omega_n=8$, $\\omega_d=4\\sqrt{3}$, $T_p=\\pi/(4\\sqrt{3})$.

A smaller $T_p$ at the same $\\zeta$ needs a larger $\\omega_n$, hence a larger $a$ as well. Gain alone cannot do it.
`
    },
    {
      id: "5-26", difficulty: "core", topic: "Block diagram elements",
      sec: "5.2",
      prompt: `A node has two incoming arrows, marked $+$ and $-$, and one outgoing arrow. A classmate calls it a pickoff because "the signal splits." Correct them.`,
      answer: "It is a summing junction. Pickoffs have one incoming signal and several outgoing copies.",
      expert: `
**First glance:** count incoming vs outgoing, then look for $\\pm$.
`,
      solution: `
A pickoff copies one signal onto several branches. No signs.

A summer *combines* several incoming signals with written signs. Two in, one out, $+$ and $-$, is a summer. The outgoing signal is the algebraic sum, not a copy of either input.
`
    },
    {
      id: "5-27", difficulty: "challenge", topic: "Moving blocks",
      sec: "5.2",
      prompt: `You want to move $G$ *right* through a summer whose second input is $X$. After the move, $R$ meets $G$ before the summer. What must sit on the $X$ path?`,
      answer: "$1/G$. Otherwise $X$ would be added after $G$ and $C$ would gain an extra $XG$ it did not have.",
      expert: `
**Check:** original $C=RG\\pm X$. After a naive move, $C=(R\\pm X)G=RG\\pm XG$. The extra $G$ on $X$ is cancelled by $1/G$.
`,
      solution: `
Original: $C=RG\\pm X$.

If $G$ sits before the summer and $X$ is untouched, $C=(R\\pm X)G=RG\\pm XG$.

To recover $RG\\pm X$, the $X$ branch must carry $1/G$.
`
    },
    {
      id: "5-28", difficulty: "core", topic: "Closed-loop specs",
      sec: "5.3",
      prompt: `Unity negative feedback, $G=9/[s(s+6)]$. Are the closed-loop poles overdamped, critical, or underdamped?`,
      answer: "Critical. $K=9=a^{2}/4$. Repeated pole at $-3$.",
      expert: `
**Path:** $T=9/(s^{2}+6s+9)=(s+3)^{-2}$.
`,
      solution: `
$$T=\\frac{9}{s^{2}+6s+9}=\\frac{9}{(s+3)^{2}}.$$

$K=a^{2}/4$ exactly. Critically damped. No overshoot; $T_s$ still uses $\\sigma_d=3$ as a first estimate.
`
    },
    {
      id: "5-29", difficulty: "challenge", topic: "Block diagram reduction",
      sec: "5.2",
      prompt: `Forward path $G_1=1$, then $G_2=3/(s+3)$, negative feedback $H=s$ around $G_2$ only. Find $T=C/R$.`,
      answer: "$$T=\\dfrac{3}{4s+3}.$$",
      expert: `
**Path:** inner loop first. $H=s$ is not around $G_1$.
`,
      solution: `
$$T_i=\\frac{3/(s+3)}{1+3s/(s+3)}=\\frac{3}{s+3+3s}=\\frac{3}{4s+3}.$$

$G_1=1$ sits outside, so $T=T_i$.
`
    },
    {
      id: "5-30", difficulty: "challenge", topic: "Pole migration",
      sec: "5.3",
      prompt: `A student says: "On $T=K/(s^{2}+as+K)$, increasing $K$ always speeds every spec." Name one spec that gets worse and one that does not move, once the system is underdamped.`,
      answer: "Overshoot gets worse ($\\zeta$ falls). Settling time does not move ($\\sigma_d=a/2$ is fixed).",
      expert: `
**First glance:** three specs, one knob. Something is invariant, something pays.
`,
      solution: `
Underdamped: $s=-a/2\\pm j\\sqrt{K-a^{2}/4}$.

- $T_s=8/a$ is independent of $K$.
- $\\zeta=a/(2\\sqrt{K})$ falls, so $\\%OS$ rises.
- $T_p=\\pi/\\sqrt{K-a^{2}/4}$ falls.

"Faster" is not one number. Peak time improves. Settling does not. Overshoot pays for the peak time.
`
    }

  ]
});