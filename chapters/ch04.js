registerChapter({
  id: 4,
  title: "Time Response",
  sections: "4.1–4.8",
  brief: "A pole's location is a number you can measure. Real part sets settling, imaginary part sets peak time, angle sets overshoot. $\\omega_n$ only scales the clock. Zeros change how strongly each mode is excited, not which modes exist.",
  sectionList: [
    { id: "4.1", title: "Introduction" },
    { id: "4.2", title: "Poles, zeros, and system response" },
    { id: "4.3", title: "First-order systems" },
    { id: "4.4", title: "Second-order systems: introduction" },
    { id: "4.5", title: "The general second-order system" },
    { id: "4.6", title: "Underdamped second-order systems" },
    { id: "4.7", title: "System response with additional poles" },
    { id: "4.8", title: "System response with zeros" }
  ],

  guide: [
    {
      title: "What this chapter is for",
      example: "4-01",
      sec: "4.1",
      body: `
Chapter 2 asked *what is the transfer function*. Chapter 4 asks **what does the system
actually do**, and it delivers the most valuable single idea in the course:

$$\\boxed{\\;\\text{A pole's location on a page tells you a number you could measure on a bench.}\\;}$$

Not qualitatively. Quantitatively. Given a pole at $-3\\pm j4$ you can state the settling
time, the peak time, and the percent overshoot in about ten seconds, without solving a
differential equation, without a partial fraction, without a plot.

Everything in this chapter is building that dictionary between **geometry in the
$s$-plane** and **behaviour in time**. Once you have it, the design chapters become
possible: instead of asking "what response does this system have," you ask "where must I
put the poles to get the response I want," and then Chapters 8–11 tell you how to move
them there.

**The chapter's arc:**

$$\\underbrace{\\text{poles \\& zeros}}_{4.2}
\\;\\to\\;\\underbrace{\\text{one pole}}_{4.3}
\\;\\to\\;\\underbrace{\\text{two poles}}_{4.4\\text{–}4.6}
\\;\\to\\;\\underbrace{\\text{when the two-pole picture breaks}}_{4.7\\text{–}4.8}$$`
    },
    {
      title: "Poles are modes, zeros are amplitudes",
      example: "4-01",
      sec: "4.2",
      body: `
This split governs the entire chapter, so it is worth stating precisely.

### Two sources of poles

$$C(s)=R(s)\\,G(s)$$

so the poles of the response come from **two places**:

- **Poles of the input** generate the **forced response**. A step contributes a pole at
  the origin, which generates the constant term: the steady-state value.
- **Poles of the transfer function** generate the **natural response**. These belong to
  the system and appear no matter what you drive it with.

That is the Chapter 1 natural/forced decomposition, now visible as a list of poles.

### The dictionary

| Pole | Term in $c(t)$ |
|---|---|
| $s=0$ | constant |
| $s=-a$ | $e^{-at}$ |
| $s=-\\sigma_{d}\\pm j\\omega_{d}$ | $e^{-\\sigma_{d}t}\\cos\\left(\\omega_{d}t+\\phi\\right)$ |
| $s=\\pm j\\omega$ | undamped sinusoid |
| repeated $s=-a$ | $t^{k}e^{-at}$ |

**Distance from the imaginary axis is speed.** A pole at $-5$ decays five times faster
than one at $-1$.

### What zeros do: and do not do

Zeros **cannot create or destroy a term.** They set the **residues** - how strongly each
mode is excited.

$$C(s)=\\frac{s+3}{s(s+1)(s+5)}\\;\\Longrightarrow\\;c(t)=A+Be^{-t}+Ce^{-5t}$$

Four poles would give four terms. The zero at $-3$ changes only the values of $A$, $B$,
$C$. So you can write the *shape* of any response in ten seconds, before computing
anything: and questions asking only "how many terms," "will it oscillate," or "which term
lasts longest" are fully answered at that point.

**Dominance, stated once:** the mode nearest the imaginary axis decays slowest and
therefore dominates the late response. This is the seed of Sections 4.7 and 4.8.`
    },
    {
      title: "First order: one storage element, one mode",
      example: "4-02",
      sec: "4.3",
      body: `
$$G(s)=\\frac{a}{s+a}\\;\\Longrightarrow\\;c(t)=1-e^{-at}$$

One pole, one exponential, no oscillation possible. **A first-order system cannot
overshoot**, and understanding *why* matters more than the formula.

### Why it cannot oscillate

Oscillation requires energy to move back and forth between two different storage forms. A
first-order system has exactly **one** energy-storage element: one capacitor, or one
mass, or one thermal mass. There is nowhere for the energy to slosh *to*. It can only
drain monotonically toward equilibrium.

That single sentence explains the entire difference between this section and the next one.

### The specifications

| Quantity | Value | Meaning |
|---|---|---|
| Time constant $\\tau$ | $\\dfrac{1}{a}$ | time to reach $63\\%$ of final value |
| Rise time $T_{r}$ | $\\dfrac{2.2}{a}$ | $0.1$ to $0.9$ of final value |
| Settling time $T_{s}$ | $\\dfrac{4}{a}$ | reach and stay within $2\\%$ |

All three are built from the **single number $a$**, and they are locked in the fixed ratio

$$\\tau\\;:\\;T_{r}\\;:\\;T_{s}\\;=\\;1\\;:\\;2.2\\;:\\;4$$

If your three answers are not in that ratio, you have an arithmetic error.

**Where $\\tau=1/a$ comes from:** at $t=1/a$, $c=1-e^{-1}=0.632$. **Where $T_{s}=4/a$ comes
from:** $e^{-4}=0.0183$, so the response is within about $2\\%$ of final after four time
constants.

### Two identifying fingerprints

- **no overshoot**, and
- **nonzero initial slope**

Together these identify a first-order system from a plot. A second-order system with a
constant numerator has $\\dot c(0^{+})=0$: it leaves the origin flat.

### The trap

$c(t)=1-e^{-at}$ holds **only** for the normalized form $\\dfrac{a}{s+a}$. For
$\\dfrac{10}{s+2}$ the final value is the dc gain $G(0)=5$, not 1. Check $G(0)$ on every
transfer function before saying anything about final values.`
    },
    {
      title: "Why two storage elements can oscillate",
      example: "4-04",
      sec: "4.4",
      body: `
This is the conceptual heart of the chapter.

Give a system **two** energy-storage elements of complementary type and energy can move
back and forth between them:

| System | Storage A | Storage B |
|---|---|---|
| mass–spring | kinetic energy in $M$ | potential energy in $K$ |
| $LC$ circuit | magnetic field in $L$ | electric field in $C$ |

A mass moving toward equilibrium arrives with kinetic energy, which must go somewhere - so
it compresses the spring, overshoots, and gets pushed back. **Overshoot is stored
momentum, not a design flaw.**

Add a dissipative element: a damper, a resistor: and each round trip loses energy, so
the oscillation decays. Add enough dissipation and the energy drains before it can complete
even one exchange: no oscillation at all.

**That spectrum, from no dissipation, to a little, to enough, to more than enough, is
exactly the four damping cases.**

### The canonical form

$$G(s)=\\frac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$$

Read the parameters straight off a denominator $s^{2}+bs+c$:

$$\\omega_{n}=\\sqrt{c},\\qquad \\zeta=\\frac{b}{2\\omega_{n}}=\\frac{b}{2\\sqrt{c}}$$

**Critically, the leading coefficient must be 1 first.** For $Ms^{2}+f_{v}s+K$ divide
through by $M$ before reading anything, giving $\\omega_{n}=\\sqrt{K/M}$ and
$\\zeta=\\dfrac{f_{v}}{2\\sqrt{KM}}$. Skipping that step is a standard lost mark.

**The numerator is only a scale factor.** It sets the dc gain and nothing about the shape,
which is why the whole chapter can discuss "the" second-order response without reference
to it.`
    },
    {
      title: "What $\zeta$ and $\omega_{n}$ actually measure",
      example: "4-06",
      sec: "4.4",
      body: `
These are not arbitrary symbols. Each answers a specific physical question.

### $\\omega_{n}$: the natural frequency

**The frequency the system would ring at if the damping were removed.** Set $\\zeta=0$ and
the poles become $\\pm j\\omega_{n}$: a pure sinusoid at exactly $\\omega_{n}$.

Physically it is set by the *ratio of stiffness to inertia* - $\\omega_{n}=\\sqrt{K/M}$
mechanically, $\\omega_{n}=1/\\sqrt{LC}$ electrically. Stiffer or lighter means faster.

### $\\zeta$: the damping ratio

$$\\zeta=\\frac{\\text{actual damping}}{\\text{critical damping}}$$

**A ratio of like quantities, so it is dimensionless** - which is precisely why it can
govern the *shape* of a response independent of its timescale.

"Critical damping" is the exact amount that just barely prevents oscillation. So $\\zeta<1$
means less than that (it oscillates), $\\zeta=1$ means exactly that, $\\zeta>1$ means more
than enough.

### The consequence that organizes everything downstream

**$\\omega_{n}$ is a time-axis scale factor. $\\zeta$ is the shape.**

Double $\\omega_{n}$ with $\\zeta$ fixed and you get *the identical response, played twice as
fast*: same overshoot, half the settling time, half the peak time. Change $\\zeta$ and the
response is a genuinely different shape.

This is why, as you will see, **percent overshoot depends on $\\zeta$ alone and never on
$\\omega_{n}$.** It is a shape property, and shape does not care how fast you run the clock.`
    },
    {
      title: "The four cases as one story of pole migration",
      example: "4-05",
      sec: "4.4",
      body: `
Fix $\\omega_{n}$ and sweep the damping from heavy to none. Watch where the poles go.

$$s=-\\zeta\\omega_{n}\\pm\\omega_{n}\\sqrt{\\zeta^{2}-1}$$

| $\\zeta$ | Poles | Name | Response |
|---|---|---|---|
| $\\zeta>1$ | two real, distinct | **overdamped** | two exponentials, no overshoot |
| $\\zeta=1$ | $-\\omega_{n}$, repeated | **critically damped** | fastest possible with no overshoot |
| $0<\\zeta<1$ | $-\\sigma_{d}\\pm j\\omega_{d}$ | **underdamped** | damped sinusoid, overshoots |
| $\\zeta=0$ | $\\pm j\\omega_{n}$ | **undamped** | pure sinusoid, never settles |

### The migration, and why it traces a circle

Start with $\\zeta$ large: two real poles, one near the origin and one far out. As $\\zeta$
decreases they **slide toward each other along the real axis**, meet at $-\\omega_{n}$ when
$\\zeta=1$, then **split off the axis** into a complex pair.

Once complex, the poles are at $-\\sigma_{d}\\pm j\\omega_{d}$ with

$$\\sigma_{d}=\\zeta\\omega_{n},\\qquad \\omega_{d}=\\omega_{n}\\sqrt{1-\\zeta^{2}}$$

$$\\sigma_{d}^{2}+\\omega_{d}^{2}=\\zeta^{2}\\omega_{n}^{2}+\\omega_{n}^{2}\\left(1-\\zeta^{2}\\right)=\\omega_{n}^{2}$$

**The distance from the origin is exactly $\\omega_{n}$, no matter what $\\zeta$ is.** So as
damping falls, the poles travel **up a circle of radius $\\omega_{n}$**, reaching the
imaginary axis at $\\zeta=0$.

### The angle

$$\\zeta=\\cos\\theta$$

where $\\theta$ is measured from the **negative real axis**. Heavily damped means near the
real axis; undamped means at $90°$. The angle *is* the damping ratio, read geometrically.

### Practical classification

Compute the discriminant $b^{2}-4c$ before attempting to factor:

| $b^{2}-4c$ | Roots | Action |
|---|---|---|
| perfect square | rational | factor by inspection |
| $=0$ | repeated | it is $\\left(s+\\tfrac{b}{2}\\right)^{2}$ |
| $>0$, not a square | irrational | quadratic formula, keep the surd |
| $<0$ | complex | **do not factor**: complete the square |`
    },
    {
      title: "The underdamped response, derived",
      example: "4-09",
      sec: "4.6",
      body: `
For $0<\\zeta<1$ with a unit step, the response is

$$c(t)=1-\\frac{1}{\\sqrt{1-\\zeta^{2}}}\\,e^{-\\zeta\\omega_{n}t}\\cos\\left(\\omega_{d}t-\\phi\\right),
\\qquad \\phi=\\arctan\\frac{\\zeta}{\\sqrt{1-\\zeta^{2}}}$$

### Reading it

- The **$1$** is the forced response: the steady-state value from the input's pole at the
  origin.
- The **$e^{-\\zeta\\omega_{n}t}$** is the envelope. Its rate is the real part of the pole.
- The **$\\cos\\omega_{d}t$** oscillates at the imaginary part.

So the two parts of the pole appear directly and separately in the answer: **real part
$\\to$ decay, imaginary part $\\to$ oscillation.**

### Getting there by hand

$$C(s)=\\frac{\\omega_{n}^{2}}{s\\left(s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}\\right)}$$

The discriminant is negative, so this is Case 3 from Chapter 2. The expansion is **always**

$$C(s)=\\frac{1}{s}-\\frac{s+2\\zeta\\omega_{n}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$$

- residue 1 at the origin (it is the dc gain), and the remaining numerator forced to be
$s+b$. Complete the square, split the numerator, invert.

**Concrete example.** $G=\\dfrac{25}{s^{2}+6s+25}$ gives $\\sigma_{d}=3$, $\\omega_{d}=4$ and

$$c(t)=1-e^{-3t}\\left(\\cos4t+\\tfrac34\\sin4t\\right)$$

### The derivative, which you will need

$$\\dot c(t)=\\frac{\\omega_{n}}{\\sqrt{1-\\zeta^{2}}}\\,e^{-\\zeta\\omega_{n}t}\\sin\\omega_{d}t$$

**Pure sine: no cosine.** For the example above it is $\\tfrac{25}{4}e^{-3t}\\sin4t$.

Notice it is zero at $t=0$ (the response leaves the origin flat, the second-order
fingerprint) and zero again at $\\omega_{d}t=\\pi$. **That second zero is the first peak** -
which is where the peak time formula comes from.`
    },
    {
      title: "Where each specification comes from",
      example: "4-08",
      sec: "4.6",
      body: `
Set the derivative to zero to find the peak; use the envelope to find settling; evaluate
the peak height to find overshoot.

### Peak time: from the derivative

$\\dot c=0$ when $\\sin\\omega_{d}t=0$, first non-trivially at $\\omega_{d}t=\\pi$:

$$\\boxed{\\;T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{\\omega_{n}\\sqrt{1-\\zeta^{2}}}\\;}$$

**Half a period of the damped oscillation.** Depends on the **imaginary part only**.

### Settling time: from the envelope

The transient is bounded by $e^{-\\zeta\\omega_{n}t}/\\sqrt{1-\\zeta^{2}}$. Requiring it below
$2\\%$ gives approximately four time constants of the envelope:

$$\\boxed{\\;T_{s}=\\frac{4}{\\zeta\\omega_{n}}=\\frac{4}{\\sigma_{d}}\\;}$$

Depends on the **real part only**.

### Percent overshoot: evaluate $c$ at $T_{p}$

Substituting $t=T_{p}$ into $c(t)$ and subtracting the final value:

$$\\boxed{\\;\\%OS=100\\,e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}\\;}$$

$$\\zeta=\\frac{-\\ln\\left(\\%OS/100\\right)}{\\sqrt{\\pi^{2}+\\ln^{2}\\left(\\%OS/100\\right)}}$$

**Depends on $\\zeta$ alone: $\\omega_{n}$ has cancelled out entirely.** That cancellation
is the mathematical form of "$\\omega_{n}$ only scales time; shape lives in $\\zeta$."

### The form to actually use

Since $\\sigma_{d}=\\zeta\\omega_{n}$ and $\\omega_{d}=\\omega_{n}\\sqrt{1-\\zeta^{2}}$, the
overshoot exponent is just the **ratio of the two parts of the pole**:

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\frac{\\sigma_{d}}{\\omega_{d}}\\,\\pi$$

So from a pole at $-\\sigma_{d}\\pm j\\omega_{d}$, **all three specifications follow from two
numbers**:

$$T_{p}=\\frac{\\pi}{\\omega_{d}},\\qquad
T_{s}=\\frac{4}{\\sigma_{d}},\\qquad
\\%OS=100\\,e^{-\\pi\\sigma_{d}/\\omega_{d}}$$

$\\zeta$ and $\\omega_{n}$ never need to be computed. Learn this version.

### Rise time

**There is no closed form.** It comes from a normalized table or plot. Do not invent one -
inventing a rise-time formula is a recognizable error.

### Exact values standard values

| $\\zeta$ | $\\sqrt{1-\\zeta^{2}}$ | exponent | $\\theta$ |
|---|---|---|---|
| $\\tfrac12$ | $\\tfrac{\\sqrt3}{2}$ | $\\tfrac{\\pi}{\\sqrt3}$ | $60°$ |
| $\\tfrac{\\sqrt2}{2}$ | $\\tfrac{\\sqrt2}{2}$ | $\\pi$ | $45°$ |
| $\\tfrac{\\sqrt3}{2}$ | $\\tfrac12$ | $\\sqrt3\\,\\pi$ | $30°$ |
| $\\tfrac35$ | $\\tfrac45$ | $\\tfrac{3\\pi}{4}$ | - |
| $\\tfrac45$ | $\\tfrac35$ | $\\tfrac{4\\pi}{3}$ | - |

The last two are the $3\\text{-}4\\text{-}5$ triangle. Any problem whose numbers come out
cleanly was built from one of these five.`
    },
    {
      title: "The $s$-plane as a design canvas",
      example: "4-11",
      sec: "4.6",
      body: `
Because each specification depends on a different geometric feature, each has its own
family of constant-value curves. **This picture is the most useful thing in the chapter.**

| Specification | Depends on | Constant along |
|---|---|---|
| $\\%OS$ (i.e. $\\zeta$) | the angle $\\theta$ | **radial lines** through the origin |
| $T_{s}$ | the real part $\\sigma_{d}$ | **vertical lines** |
| $T_{p}$ | the imaginary part $\\omega_{d}$ | **horizontal lines** |
| $\\omega_{n}$ | the radius | **circles** about the origin |

### Reading requirements as regions

A specification becomes a boundary, and the inequality direction is where people slip:

$$T_{s}\\le T_{s}^{\\max}\\;\\Longrightarrow\\;\\sigma_{d}\\ge\\frac{4}{T_{s}^{\\max}}
\\qquad\\text{(poles at or left of a vertical line)}$$

$$\\%OS\\le\\%OS^{\\max}\\;\\Longrightarrow\\;\\zeta\\ge\\zeta^{\\min}\\;\\Longrightarrow\\;\\theta\\le\\theta^{\\max}
\\qquad\\text{(poles inside a wedge)}$$

**Both flip when rearranged.** Faster settling requires a *larger* $\\sigma_{d}$. Less
overshoot requires *more* damping but a *smaller* angle. Say the direction out loud before
writing it.

For the common case $\\zeta\\ge\\tfrac{\\sqrt2}{2}$ (i.e. $\\%OS\\le100e^{-\\pi}$), the wedge
condition simplifies beautifully to

$$\\omega_{d}\\le\\sigma_{d}$$

- a $45°$ test you can apply to a candidate pole by eye.

### Designing backwards

Given specifications, read off the pole directly:

$$\\sigma_{d}=\\frac{4}{T_{s}},\\qquad \\omega_{d}=\\frac{\\pi}{T_{p}}$$

then build the denominator with **middle coefficient $=2\\sigma_{d}$** and **constant
$=\\sigma_{d}^{2}+\\omega_{d}^{2}=\\omega_{n}^{2}$**:

$$\\left(s+\\sigma_{d}\\right)^{2}+\\omega_{d}^{2}=s^{2}+2\\sigma_{d}s+\\omega_{n}^{2}$$

### The design tension, stated once

You have **two** knobs ($\\sigma_{d}$, $\\omega_{d}$) and **three** specifications. Fixing
any two forces the third. If the forced value is unacceptable, **no second-order system can
satisfy all three**: you need a controller with dynamics of its own.

That sentence is the entire motivation for Chapter 9.`
    },
    {
      title: "Higher-order systems and dominance",
      example: "4-14",
      sec: "4.7",
      body: `
Real systems have more than two poles. These sections tell you when you may ignore the
extras: and knowing when your tools *do not* apply is the hardest judgment in the chapter.

### The five-times rule

With a dominant complex pair at $-\\sigma_{d}\\pm j\\omega_{d}$ and a third real pole at
$-\\alpha_{r}$:

$$\\boxed{\\;\\alpha_{r}\\ge5\\,\\sigma_{d}\\;\\Longrightarrow\\;\\text{treat as second order}\\;}$$

**Why five.** The third pole contributes $e^{-\\alpha_{r}t}$ with time constant
$1/\\alpha_{r}$. If $\\alpha_{r}$ is five times larger, that term has essentially vanished
after $5/\\alpha_{r}=1/\\sigma_{d}$: well before the dominant pair reaches its peak. The
extra mode is over before the interesting behaviour begins.

If $\\alpha_{r}<5\\sigma_{d}$, **the specification formulas simply do not apply**, and saying
so is the correct answer. Producing $T_{p}$, $T_{s}$ and $\\%OS$ anyway yields three
confidently wrong numbers with nothing in the algebra to warn you.

### Always match the dc gain

You cannot simply delete a factor. Replace it by its value at $s=0$:

$$\\frac{20}{(s+10)\\left(s^{2}+2s+2\\right)}\\;\\longrightarrow\\;\\frac{20}{(10)\\left(s^{2}+2s+2\\right)}=\\frac{2}{s^{2}+2s+2}$$

Crossing out $(s+10)$ instead would change the steady-state value tenfold.

### Residues are the second, independent test

Location is a heuristic; **residue size is evidence.** A pole can be far away and still
carry a large residue, or be close and nearly cancelled by a zero and carry almost none.
Nise asks you to check both:

- is the pole far enough left?
- is its residue small compared with the others?

For $T=\\dfrac{20}{(s+1)(s+20)}$ the step response is
$1-\\tfrac{20}{19}e^{-t}+\\tfrac{1}{19}e^{-20t}$: the fast term is $20\\times$ smaller
**and** decays $20\\times$ faster. Both arguments agree, so the first-order approximation
$\\tfrac{1}{s+1}$ is safe.

### Pole–zero cancellation

If a zero sits at or very near a pole, that pole's residue becomes negligible and its term
drops out. Justify it the same two ways: near-cancellation of the factors, **and** a small
residue relative to the others.`
    },
    {
      title: "Zeros revisited: the derivative decomposition",
      example: "4-16",
      sec: "4.8",
      body: `
Zeros never add modes. So how do they change a response? Through one identity that explains
everything in this section.

$$(s+a)C(s)=\\underbrace{sC(s)}_{\\to\\;\\dot c(t)}+\\underbrace{aC(s)}_{\\to\\;a\\,c(t)}$$

$$\\boxed{\\;c_{\\text{with zero}}(t)=c(t)+\\frac{1}{a}\\,\\dot c(t)\\;}$$

(after dividing by $a$ to preserve the dc gain).

**A zero adds a scaled copy of the response's own derivative.**

### Why a nearby zero increases overshoot

The derivative of an underdamped step response is $\\propto e^{-\\sigma_{d}t}\\sin\\omega_{d}t$
- **positive throughout $0<\\omega_{d}t<\\pi$**, and the first peak occurs at exactly
$\\omega_{d}t=\\pi$. So the added term is positive across the entire rise and right up to the
peak. It cannot do anything but raise it.

The weight is $\\tfrac1a$:

- **$a$ large** (zero far away): the term vanishes and $c_{z}\\to c$. This is why a distant
  zero is negligible.
- **$a$ small** (zero near the origin): the derivative dominates and overshoot grows
  without bound.

### Why a distant zero acts like a plain gain

In the partial fraction expansion, a far-off zero at $-a$ multiplies **every residue by
approximately the same factor**. Uniform scaling leaves *relative* amplitudes unchanged,
so the shape is unchanged: divide the gain back out and you recover the original
response. The same $5\\times$ yardstick applies: compare $|{\\rm zero}|$ to $\\sigma_{d}$.

### Right-half-plane zeros

A zero at $+a$ gives $-sC(s)+aC(s)$: the derivative enters with the **opposite sign**.
Early on the derivative is large while the response is still near zero, so the output
initially moves **the wrong way** before reversing.

This is a **nonminimum-phase** system. A motorcycle must be steered briefly left to turn
right; an aircraft's altitude dips before it climbs.

**Detect it without solving anything**: compare two limits:

$$\\dot c(0^{+})=\\lim_{s\\to\\infty}s^{2}C(s)
\\qquad\\text{versus}\\qquad
c(\\infty)=\\lim_{s\\to0}sC(s)$$

Opposite signs means initial reversal.

**Why it matters later:** an RHP zero cannot be cancelled by a controller - doing so would
require an RHP pole, making the loop unstable. Nonminimum-phase systems have a hard ceiling
on achievable performance, which is why they get a name.

### One more structural fact

$$c(0^{+})=G(\\infty)$$

If $\\deg N<\\deg D$, the response starts at zero. If $\\deg N=\\deg D$, it **jumps**
immediately to the ratio of leading coefficients. Evaluating $c(0^{+})$ from data therefore
tells you the numerator's degree before you compute anything.`
    },
    {
      title: "The chapter in one picture",
      example: "4-07",
      sec: "4.1",
      body: `
$$\\underbrace{G(s)}_{\\text{Chapter 2}}
\\;\\to\\;\\underbrace{\\text{poles}}_{\\text{factor / complete the square}}
\\;\\to\\;\\underbrace{-\\sigma_{d}\\pm j\\omega_{d}}_{\\text{geometry}}
\\;\\to\\;\\underbrace{T_{p},\\,T_{s},\\,\\%OS}_{\\text{behaviour}}$$

### The six things to carry forward

1. **Poles are modes, zeros are amplitudes.** The form of a response is readable in
   seconds; only the numbers need work.
2. **One storage element cannot oscillate; two can.** Overshoot is stored momentum, and
   damping is what drains it.
3. **$\\omega_{n}$ scales time; $\\zeta$ sets shape.** This is why $\\%OS$ depends on $\\zeta$
   alone.
4. **All three specifications come from the two parts of the pole:**
   $T_{p}=\\pi/\\omega_{d}$, $T_{s}=4/\\sigma_{d}$, $\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}$.
5. **The $s$-plane has constant-specification loci**: radial for overshoot, vertical for
   settling, horizontal for peak time, circular for $\\omega_{n}$. Requirements become
   regions.
6. **Know when the tools stop applying.** Run the five-times test before quoting any
   second-order specification, and check residues as well as locations.

### The gap this chapter opens

Two knobs, three specifications. A second-order system cannot meet arbitrary requirements,
and a real plant rarely has its poles where you want them anyway.

Chapter 6 asks whether the poles are even in the left half-plane. Chapter 7 asks what
steady-state error survives. Chapters 8–11 are about **moving the poles** - first by
adjusting gain, then, when gain alone cannot do it, by adding a compensator with dynamics
of its own.

Everything from here is about relocating the poles you have just learned to read.`
    }
  ],

  formulas: [
    { latex: "G(s)=\\dfrac{\\omega_n^{2}}{s^{2}+2\\zeta\\omega_n s+\\omega_n^{2}}",
      note: "Canonical second-order plant. Divide so the leading denominator coefficient is $1$ before reading $\\omega_n$ and $\\zeta$." },
    { latex: "\\omega_n=\\sqrt{c}",
      note: "From $s^{2}+bs+c$." },
    { latex: "\\zeta=\\dfrac{b}{2\\sqrt{c}}",
      note: "From $s^{2}+bs+c$." },
    { latex: "s=-\\zeta\\omega_n\\pm j\\omega_n\\sqrt{1-\\zeta^{2}}=-\\sigma_d\\pm j\\omega_d",
      note: "Underdamped poles. Distance from the origin is $\\omega_n$." },
    { latex: "T_p=\\dfrac{\\pi}{\\omega_d}",
      note: "Peak time. Imaginary part only." },
    { latex: "T_s=\\dfrac{4}{\\sigma_d}",
      note: "Two-percent settling. Real part only." },
    { latex: "\\%OS=100e^{-\\pi\\sigma_d/\\omega_d}",
      note: "Overshoot. Ratio of real to imaginary part; $\\omega_n$ cancels." },
    { latex: "\\zeta=\\dfrac{-\\ln(\\%OS/100)}{\\sqrt{\\pi^{2}+\\ln^{2}(\\%OS/100)}}=\\cos\\theta",
      note: "$\\theta$ is measured from the negative real axis." },
    { latex: "\\tau=\\dfrac{1}{a},\\quad T_r=\\dfrac{2.2}{a},\\quad T_s=\\dfrac{4}{a}",
      note: "First-order system, pole at $-a$. No overshoot." },
    { latex: "\\dot c(t)=\\dfrac{\\omega_n}{\\sqrt{1-\\zeta^{2}}}e^{-\\sigma_d t}\\sin\\omega_d t",
      note: "Derivative of the unit-step response of the canonical underdamped plant." },
    { latex: "\\alpha_r \\ge 5\\sigma_d",
      note: "A real pole this far left can be dropped for the visible transient." }
  ],

  problems: [

    {
      id: "4-01", difficulty: "warmup", topic: "Poles and zeros",
      sec: "4.2",
      prompt: "For $$G(s)=\\frac{s+3}{(s+1)(s+5)}$$ list the poles and zeros, and write the **form** of the unit step response $c(t)$ with unknown constants. Do not compute any residues.",
      hint: "The input contributes its own pole. Zeros change amplitudes, not the form.",
      answer: "Poles at $s=-1$ and $s=-5$; zero at $s=-3$. $$c(t)=A+Be^{-t}+Ce^{-5t}$$",
      expert: `
**First glance:** the question says "do not compute residues," which means it is testing whether you know that **poles set the form and zeros set the amplitudes**. Ten seconds of work.

List the poles of $C(s)$, not of $G(s)$: the input contributes one at the origin. Three poles, three terms: a constant and two exponentials.

**Discard:** partial fractions, cover-up, anything numeric. Also ruled out: any term arising from the zero at $-3$. Zeros cannot create or destroy terms.

**Habit:** do this on *every* response problem before starting the algebra. Knowing the shape of the answer in advance tells you how many residues to expect and catches a dropped term immediately.

**Check:** $e^{-5t}$ decays five times faster than $e^{-t}$, so after a couple of time constants the response is essentially $A+Be^{-t}$. If the question had asked "which pole dominates," that is already answered - the one nearest the imaginary axis, always.
`,
      solution: `
**Step 1: poles and zeros of $G(s)$.**

Zeros are the roots of the numerator: $s+3=0\\Rightarrow s=-3$.

Poles are the roots of the denominator: $s=-1$ and $s=-5$.

**Step 2: form $C(s)$ for a unit step.**

$$C(s)=R(s)G(s)=\\frac{1}{s}\\cdot\\frac{s+3}{(s+1)(s+5)}=\\frac{s+3}{s(s+1)(s+5)}$$

Notice the input contributed a **new pole at the origin**. That pole was not in $G(s)$;
it came from $R(s)=1/s$.

**Step 3: write the form directly from the pole list.**

Each pole of $C(s)$ generates one term:

| Pole of $C(s)$ | Origin | Term it generates |
|---|---|---|
| $s=0$ | the input | $A$ (a constant: the forced response) |
| $s=-1$ | the system | $Be^{-t}$ |
| $s=-5$ | the system | $Ce^{-5t}$ |

$$\\boxed{\\;c(t)=A+Be^{-t}+Ce^{-5t}\\;}$$

---

**Where the zero went.** Nowhere, as far as the *form* is concerned. The zero at $-3$
influences the numerical values of $A$, $B$ and $C$, but it cannot create or destroy a
term. This is the central idea of Section 4.2: **poles determine the form of the
response; zeros determine the amplitudes.**

**Why this matters on an exam.** You can write down the shape of any response in about
ten seconds, before doing a single partial fraction. If you are asked only "will it
oscillate?" or "how many exponential terms?", that ten seconds is the entire answer.

**Speed reading of the terms:** $e^{-5t}$ decays five times faster than $e^{-t}$, because
its pole is five times farther from the imaginary axis. By the time the slow term is
still visible, the fast one is gone.
`
    },

    {
      id: "4-02", difficulty: "warmup", topic: "First-order systems",
      sec: "4.3",
      prompt: "For $$G(s)=\\frac{10}{s+2}$$ find the time constant, rise time, settling time, and the final value of the unit step response.",
      hint: "Put the pole location in evidence first. Every first-order specification is built from that single number.",
      answer: "$\\tau=\\tfrac12$ s, $T_{r}=1.1$ s, $T_{s}=2$ s, and $c(\\infty)=5$.",
      expert: `
**First glance:** one pole, so first order, so every specification comes from the single number $a=2$. There is nothing to derive:

$$\\tau=\\frac1a,\\qquad T_{r}=\\frac{2.2}{a},\\qquad T_{s}=\\frac4a$$

$\\tfrac12$, $1.1$, $2$. Written in one pass.

**The trap, and it catches people constantly:** the numerator is $10$, not $a=2$. The remembered formula $c(t)=1-e^{-at}$ applies **only** to $\\tfrac{a}{s+a}$. Here the dc gain is $G(0)=\\tfrac{10}{2}=5$, so the response settles at 5, not 1.

An expert checks $G(0)$ reflexively on every transfer function before saying anything about final values.

**Discard:** forming $C(s)$ and applying the final value theorem. $G(0)$ *is* the step-response final value; the theorem is the long way round.

**Free ordering check:** $\\tau<T_{r}<T_{s}$ always, in the fixed ratio $1:2.2:4$. Here $0.5<1.1<2$ ✓ If your three numbers are not in that ratio you have made an arithmetic slip.
`,
      solution: `
**Step 1: identify $a$ from the pole.**

The pole is where $s+2=0$, so $s=-2$ and therefore $a=2$.

Every first-order specification is built from $a$ alone. Get this number right and the
rest is arithmetic.

**Step 2: time constant.**

$$\\tau=\\frac{1}{a}=\\frac{1}{2}\\ \\text{s}$$

This is the time to reach $63\\%$ of the final value, and it is the reciprocal of the pole
location.

**Step 3: rise time.**

$$T_{r}=\\frac{2.2}{a}=\\frac{2.2}{2}=1.1\\ \\text{s}$$

**Step 4: settling time.**

$$T_{s}=\\frac{4}{a}=\\frac{4}{2}=2\\ \\text{s}$$

**Step 5: final value.**

Here the numerator is $10$, not $a=2$, so this is **not** in the normalized form
$a/(s+a)$ and the final value is not 1. Use the final value theorem on
$C(s)=R(s)G(s)$ with $R(s)=1/s$:

$$c(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{1}{s}\\cdot\\frac{10}{s+2}=\\lim_{s\\to0}\\frac{10}{s+2}=\\frac{10}{2}=5$$

Equivalently, the dc gain is $G(0)=10/2=5$.

$$\\boxed{\\;\\tau=\\tfrac12\\ \\text{s},\\quad T_{r}=1.1\\ \\text{s},\\quad T_{s}=2\\ \\text{s},\\quad c(\\infty)=5\\;}$$

---

**Sanity check on the ordering.** For any first-order system,
$T_{r}=2.2\\tau$ and $T_{s}=4\\tau$, so always $\\tau<T_{r}<T_{s}$. Here
$0.5<1.1<2$. ✓

**The trap.** A very common error is reporting $c(\\infty)=1$ because the response "of a
first-order system" is remembered as $1-e^{-at}$. That formula holds only when the
numerator equals $a$. Check the dc gain every time.
`
    },

    {
      id: "4-03", difficulty: "warmup", topic: "First-order systems",
      sec: "4.3",
      prompt: "A system's unit step response is measured to be $$c(t)=5\\left(1-e^{-4t}\\right).$$ Find its transfer function $G(s)$.",
      hint: "Transform the response, then divide by the transform of the input.",
      answer: "$$G(s)=\\frac{20}{s+4}$$",
      expert: `
**First glance:** read the parameters straight off the data - do not transform anything.

$$c(t)=\\frac{K}{a}\\left(1-e^{-at}\\right)$$

The **exponent is the pole**: $a=4$. The **amplitude is the dc gain**: $K/a=5$, so $K=20$. Answer: $\\tfrac{20}{s+4}$, in about eight seconds.

**Discard:** transforming term by term, combining over a common denominator, dividing by $R(s)$. All correct, all unnecessary once you recognize the standard form.

**The general principle, which carries through the whole chapter:** the exponents appearing in a measured response *are* the system poles. This is the fastest route into any identification problem - 4-19, 4-20 and 4-24 all lean on it.

**Confirm with one limit:** $G(0)=\\tfrac{20}{4}=5$, matching the observed final value ✓

**And note what is being asserted:** no overshoot plus nonzero initial slope is the fingerprint of a first-order system. If the data had shown overshoot, a single pole could not produce it and the whole approach changes.
`,
      solution: `
**Step 1: transform the response.**

Expand first: $c(t)=5-5e^{-4t}$.

$$C(s)=\\frac{5}{s}-\\frac{5}{s+4}$$

**Step 2: combine over a common denominator.**

$$C(s)=\\frac{5(s+4)-5s}{s(s+4)}=\\frac{5s+20-5s}{s(s+4)}=\\frac{20}{s(s+4)}$$

The $5s$ terms cancel: expected, because $c(0)=5(1-1)=0$ and a response starting at zero
must have numerator order at least one below denominator order.

**Step 3: divide by the input transform.**

The input was a unit step, so $R(s)=\\dfrac{1}{s}$. Dividing by $1/s$ means multiplying
by $s$:

$$G(s)=\\frac{C(s)}{R(s)}=s\\cdot\\frac{20}{s(s+4)}=\\frac{20}{s+4}$$

$$\\boxed{\\;G(s)=\\frac{20}{s+4}\\;}$$

---

**Reading it back off the data directly.** For $G(s)=\\dfrac{K}{s+a}$ the step response is
$\\dfrac{K}{a}\\left(1-e^{-at}\\right)$. Matching against $5\\left(1-e^{-4t}\\right)$:

- the exponent gives $a=4$ immediately - **the exponent of the response is the pole**
- the amplitude gives $K/a=5$, so $K=5a=20$

Same answer with no algebra. On an exam, do it this way.

**Check.** $G(0)=20/4=5$, matching the observed final value. ✓ And $\\tau=1/4$ s, so the
response should reach $63\\%$ of $5$, i.e. $5\\left(1-e^{-1}\\right)$, at $t=\\tfrac14$ s.
`
    },

    {
      id: "4-04", difficulty: "warmup", topic: "Second-order systems",
      sec: "4.4",
      prompt: "For $$G(s)=\\frac{36}{s^{2}+6s+36}$$ find $\\omega_{n}$ and $\\zeta$, classify the damping, and locate the poles.",
      hint: "Compare term by term against the canonical form. Do not use the quadratic formula until you have $\\zeta$.",
      answer: "$\\omega_{n}=6$ rad/s, $\\zeta=\\tfrac12$, underdamped, poles at $s=-3\\pm j3\\sqrt3$.",
      expert: `
**First glance:** compare with $s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}$ and read two numbers off. $\\omega_{n}=\\sqrt{36}=6$; then $2\\zeta(6)=6$ gives $\\zeta=\\tfrac12$.

**But the faster route skips $\\zeta$ entirely.** Complete the square by eye - half of 6 is 3, $3^{2}=9$, $36-9=27$: giving $(s+3)^{2}+27$ and poles $-3\\pm j3\\sqrt3$ directly, since $\\sqrt{27}=3\\sqrt3$.

Experts often go straight to the pole location because **every specification in this chapter is built from the real and imaginary parts**, not from $\\zeta$ and $\\omega_{n}$. Those two are intermediate quantities.

**Discard:** the quadratic formula. Completing the square is faster and gives you the pole in the form you actually want.

**Two checks that cost nothing:**
- radial distance: $\\sqrt{9+27}=\\sqrt{36}=6=\\omega_{n}$ ✓
- angle: $\\tan\\theta=\\tfrac{3\\sqrt3}{3}=\\sqrt3\\Rightarrow\\theta=60^{\\circ}$, and $\\cos60^{\\circ}=\\tfrac12=\\zeta$ ✓

**Recognize $\\zeta=\\tfrac12$ on sight.** It is one of the five exact damping ratios standard values, and it always comes with $\\sqrt{1-\\zeta^{2}}=\\tfrac{\\sqrt3}{2}$ and $60^{\\circ}$.
`,
      solution: `
**Step 1: compare against the canonical form.**

$$G(s)=\\frac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}
\\qquad\\text{versus}\\qquad
\\frac{36}{s^{2}+6s+36}$$

**Step 2: $\\omega_{n}$ from the constant term.**

$$\\omega_{n}^{2}=36\\;\\Longrightarrow\\;\\omega_{n}=6\\ \\text{rad/s}$$

Take the positive root; $\\omega_{n}$ is a frequency.

**Step 3: $\\zeta$ from the $s$ term.**

$$2\\zeta\\omega_{n}=6\\;\\Longrightarrow\\;2\\zeta(6)=6\\;\\Longrightarrow\\;12\\zeta=6\\;\\Longrightarrow\\;\\zeta=\\frac{1}{2}$$

**Step 4: classify.**

$0<\\zeta<1$, so the system is **underdamped**. Confirm with the discriminant:

$$b^{2}-4c=6^{2}-4(36)=36-144=-108<0$$

Negative, so complex poles. ✓

**Step 5: locate the poles.**

$$s=-\\zeta\\omega_{n}\\pm j\\omega_{n}\\sqrt{1-\\zeta^{2}}$$

Real part: $\\;\\sigma_{d}=\\zeta\\omega_{n}=\\tfrac12(6)=3$

Imaginary part: first compute $\\sqrt{1-\\zeta^{2}}$:

$$\\sqrt{1-\\left(\\tfrac12\\right)^{2}}=\\sqrt{1-\\tfrac14}=\\sqrt{\\tfrac34}=\\frac{\\sqrt3}{2}$$

$$\\omega_{d}=\\omega_{n}\\sqrt{1-\\zeta^{2}}=6\\cdot\\frac{\\sqrt3}{2}=3\\sqrt3$$

$$\\boxed{\\;\\omega_{n}=6,\\quad \\zeta=\\tfrac12,\\quad \\text{underdamped},\\quad s=-3\\pm j3\\sqrt3\\;}$$

---

**Check by completing the square**: an independent route to the same poles:

$$s^{2}+6s+36=(s+3)^{2}+(36-9)=(s+3)^{2}+27$$

and $\\sqrt{27}=\\sqrt{9\\cdot3}=3\\sqrt3$, giving $s=-3\\pm j3\\sqrt3$. ✓

**Check the radial distance.** $\\omega_{n}$ is the distance from the origin to the pole:

$$\\sqrt{3^{2}+\\left(3\\sqrt3\\right)^{2}}=\\sqrt{9+27}=\\sqrt{36}=6=\\omega_{n}\\;\\checkmark$$

**Check the angle.** $\\zeta=\\cos\\theta=\\tfrac12$ means $\\theta=60^{\\circ}$ from the
negative real axis. Consistent with $\\tan\\theta=\\dfrac{3\\sqrt3}{3}=\\sqrt3$, and
$\\arctan\\sqrt3=60^{\\circ}$. ✓
`
    },

    {
      id: "4-05", difficulty: "warmup", topic: "Second-order systems",
      sec: "4.4",
      prompt: `Classify each system by its damping - undamped, underdamped, critically damped, or overdamped - and give the poles.

**(a)** $\\dfrac{16}{s^{2}+10s+16}$ &nbsp;&nbsp; **(b)** $\\dfrac{16}{s^{2}+8s+16}$ &nbsp;&nbsp; **(c)** $\\dfrac{16}{s^{2}+16}$ &nbsp;&nbsp; **(d)** $\\dfrac{16}{s^{2}+4s+16}$`,
      hint: "All four have the same $\\omega_{n}$. Only the $s$ coefficient changes, so only $\\zeta$ changes.",
      answer: "**(a)** overdamped, $s=-2,-8$. **(b)** critically damped, $s=-4$ twice. **(c)** undamped, $s=\\pm j4$. **(d)** underdamped, $s=-2\\pm j2\\sqrt3$.",
      expert: `
**First glance:** all four share $\\omega_{n}=4$. Only the middle coefficient changes, so this is a study of $\\zeta$ alone and there is nothing to compute beyond $\\zeta=\\tfrac{b}{8}$ in each case.

**The classification comes from the discriminant, and an expert computes it before attempting to factor:**

| $b^{2}-4c$ | meaning | what to do |
|---|---|---|
| perfect square | rational roots | factor by inspection |
| $=0$ | repeated | it is $(s+\\tfrac b2)^{2}$ |
| $<0$ | complex | complete the square, never factor |
| $>0$, not a square | irrational | quadratic formula, keep the surd |

$36$, $0$, $-64$, $-48$: the four cases in order, decided before any factoring is attempted.

**The one to spot instantly:** $b=0$ means $\\zeta=0$ means poles on the imaginary axis means a sinusoid that never settles. That is also the case where the final value theorem fails.

**The picture worth carrying:** as $b$ falls from $10$ to $0$, the poles slide together along the real axis, collide at $-\\omega_{n}$, then split onto a **circle of radius $\\omega_{n}$** and travel up it toward the imaginary axis. Every underdamped member of this family sits exactly 4 units from the origin - check (d): $\\sqrt{4+12}=4$ ✓
`,
      solution: `
Every one has $\\omega_{n}^{2}=16$, so $\\omega_{n}=4$ throughout. Only the middle
coefficient changes, so this is a study of $\\zeta$ alone.

Recall $\\zeta=\\dfrac{b}{2\\omega_{n}}=\\dfrac{b}{8}$ in every case here.

---

**(a) $s^{2}+10s+16$.**

$$\\zeta=\\frac{10}{8}=\\frac{5}{4}>1$$

Discriminant: $100-4(16)=100-64=36>0$, and $36$ is a perfect square, so the roots are
rational. Factor by inspection: two numbers multiplying to $16$ and adding to $10$ are
$2$ and $8$:

$$s^{2}+10s+16=(s+2)(s+8)\\;\\Longrightarrow\\;s=-2,\\;-8$$

**Overdamped.** Two real distinct poles, response is a sum of two exponentials, no
overshoot.

---

**(b) $s^{2}+8s+16$.**

$$\\zeta=\\frac{8}{8}=1$$

Discriminant: $64-64=0$. A perfect square trinomial:

$$s^{2}+8s+16=(s+4)^{2}\\;\\Longrightarrow\\;s=-4\\ \\text{(repeated)}$$

**Critically damped.** The response contains a $te^{-4t}$ term: the signature of a
repeated root. This is the fastest response achievable with no overshoot.

---

**(c) $s^{2}+16$.**

$$b=0\\;\\Longrightarrow\\;\\zeta=\\frac{0}{8}=0$$

$$s^{2}=-16\\;\\Longrightarrow\\;s=\\pm j4$$

**Undamped.** Poles sit on the imaginary axis. The response is a pure sinusoid at
$\\omega_{n}=4$ rad/s that never decays. Note this is also the case where the final value
theorem is invalid.

---

**(d) $s^{2}+4s+16$.**

$$\\zeta=\\frac{4}{8}=\\frac{1}{2}$$

Discriminant: $16-64=-48<0$, so complex. Complete the square:

$$s^{2}+4s+16=(s+2)^{2}+(16-4)=(s+2)^{2}+12$$

$$\\sqrt{12}=\\sqrt{4\\cdot3}=2\\sqrt3\\;\\Longrightarrow\\;s=-2\\pm j2\\sqrt3$$

**Underdamped.** Damped sinusoid with overshoot.

---

**The pattern to carry away.** As $b$ falls from $10$ to $0$, $\\zeta$ falls from
$\\tfrac54$ to $0$, and the poles migrate from **two points on the real axis**, to a
**single repeated point** at $-\\omega_{n}$, then off the real axis onto a **circle of
radius $\\omega_{n}=4$**, finally reaching the imaginary axis. Every underdamped pole in
this family sits exactly $4$ units from the origin - check (d):
$\\sqrt{2^{2}+(2\\sqrt3)^{2}}=\\sqrt{4+12}=4$ ✓
`
    },

    {
      id: "4-06", difficulty: "warmup", topic: "Underdamped specifications",
      sec: "4.6",
      prompt: "For $$G(s)=\\frac{25}{s^{2}+6s+25}$$ find $T_{p}$, $T_{s}$ and $\\%OS$. Leave every answer exact.",
      hint: "Get $\\zeta$ and $\\omega_n$ first, then the pole location. Peak time needs only the imaginary part; settling time needs only the real part.",
      answer: "$T_{p}=\\dfrac{\\pi}{4}$ s, $T_{s}=\\dfrac{4}{3}$ s, $\\%OS=100e^{-3\\pi/4}$.",
      expert: `
**First glance:** $25$ and $6$ mean $\\omega_{n}=5$ and $\\sigma_{d}=3$, and $5\\text{-}3$ forces $\\omega_{d}=4$: a **3-4-5 triangle**. Recognizing that pattern is the whole problem; every number will be rational.

**The form an expert actually uses**, which eliminates $\\zeta$ and $\\omega_{n}$ from the arithmetic entirely:

$$T_{p}=\\frac{\\pi}{\\omega_{d}},\\qquad T_{s}=\\frac{4}{\\sigma_{d}},\\qquad \\%OS=100\\,e^{-\\pi\\sigma_{d}/\\omega_{d}}$$

Once you have the pole $-3\\pm j4$, all three specs come from the numbers $3$ and $4$:
$\\tfrac{\\pi}{4}$, $\\tfrac43$, $100e^{-3\\pi/4}$. No $\\zeta$, no $\\sqrt{1-\\zeta^{2}}$, no square roots at all.

**Discard:** computing $\\zeta=\\tfrac35$, then $\\sqrt{1-\\zeta^{2}}=\\tfrac45$, then $\\zeta\\pi/\\sqrt{1-\\zeta^{2}}$. All correct, all a detour.

**The two exact triangles standard values** so you can spot them from the coefficients: $3\\text{-}4\\text{-}5$ gives $\\zeta=\\tfrac35$ or $\\tfrac45$ with exponents $\\tfrac{3\\pi}{4}$ and $\\tfrac{4\\pi}{3}$. Any problem whose numbers come out this cleanly was built around one of them.

**And stop at the exponential.** $100e^{-3\\pi/4}$ is the finished answer.
`,
      solution: `
**Step 1: extract $\\omega_{n}$ and $\\zeta$.**

$$\\omega_{n}^{2}=25\\;\\Longrightarrow\\;\\omega_{n}=5$$

$$2\\zeta\\omega_{n}=6\\;\\Longrightarrow\\;10\\zeta=6\\;\\Longrightarrow\\;\\zeta=\\frac{3}{5}$$

**Step 2: get the pole location, because every specification reads off it.**

$$\\sigma_{d}=\\zeta\\omega_{n}=\\frac{3}{5}(5)=3$$

$$\\sqrt{1-\\zeta^{2}}=\\sqrt{1-\\frac{9}{25}}=\\sqrt{\\frac{16}{25}}=\\frac{4}{5}$$

$$\\omega_{d}=\\omega_{n}\\sqrt{1-\\zeta^{2}}=5\\cdot\\frac{4}{5}=4$$

Poles at $s=-3\\pm j4$. Note this is a $3\\text{-}4\\text{-}5$ right triangle: that is why
every number comes out rational.

**Step 3: peak time uses the imaginary part only.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{4}\\ \\text{s}$$

**Step 4: settling time uses the real part only.**

$$T_{s}=\\frac{4}{\\sigma_{d}}=\\frac{4}{3}\\ \\text{s}$$

**Step 5: percent overshoot uses $\\zeta$ only.**

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\frac{\\left(\\tfrac35\\right)\\pi}{\\tfrac45}
=\\frac{3\\pi}{5}\\cdot\\frac{5}{4}=\\frac{3\\pi}{4}$$

$$\\%OS=100e^{-3\\pi/4}$$

$$\\boxed{\\;T_{p}=\\frac{\\pi}{4}\\ \\text{s},\\qquad T_{s}=\\frac{4}{3}\\ \\text{s},\\qquad \\%OS=100e^{-3\\pi/4}\\;}$$

---

**This is a finished answer.** $100e^{-3\\pi/4}$ is exact. Do not reach for a decimal -
you have no calculator, and the grader wants the closed form.

**Note the shortcut hiding in the algebra.** Since $\\sigma_{d}=\\zeta\\omega_{n}$ and
$\\omega_{d}=\\omega_{n}\\sqrt{1-\\zeta^{2}}$, the overshoot exponent is just the ratio of
the two parts of the pole:

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\frac{\\sigma_{d}}{\\omega_{d}}\\,\\pi=\\frac{3}{4}\\pi$$

So once you have the pole $-3\\pm j4$, all three specifications follow from $3$ and $4$
directly: $T_{p}=\\pi/4$, $T_{s}=4/3$, $\\%OS=100e^{-3\\pi/4}$. **Learn this version** -
it removes $\\zeta$ and $\\omega_{n}$ from the arithmetic entirely.
`
    },

    {
      id: "4-07", difficulty: "core", topic: "Poles and zeros",
      sec: "4.2",
      prompt: "Write the **form** of $c(t)$, with unknown constants, for $$C(s)=\\frac{s+4}{s(s+2)\\left(s^{2}+2s+5\\right)}.$$ Do not evaluate any residue. State which term dominates at large $t$ and why.",
      hint: "Test the quadratic's discriminant. A complex pair generates one damped-sinusoid term, not two exponentials.",
      answer: "$$c(t)=A+Be^{-2t}+e^{-t}\\left(C\\cos2t+D\\sin2t\\right)$$ At large $t$ the constant $A$ dominates; among the transients the $e^{-t}$ pair decays slowest because its poles are closest to the imaginary axis.",
      expert: `
**First glance:** test the quadratic's discriminant before anything else. $4-20=-16<0$, so that pair is complex and produces **one** damped-sinusoid term with two constants: not two separate exponentials.

Four poles, three terms. Counting correctly is the entire problem.

**Discard:** factoring $s^{2}+2s+5$, computing any residue, and writing the complex pair as $Ce^{(-1+j2)t}+De^{(-1-j2)t}$: technically valid, but not a real-valued form and not what is wanted.

**Reading dominance without computing:** compare distances from the imaginary axis. The real pole is at $-2$; the complex pair sits at $-1$. The pair decays **half as fast**, so the oscillation is the last thing to disappear. Nearest the imaginary axis always wins.

**The trap for later:** having identified the dominant pair, the instinct is to quote $T_{s}=4/1=4$ and $T_{p}=\\pi/2$. Do not - the real pole at $-2$ is only $2\\times$ farther out, failing the five-times rule. An expert notices the temptation and refuses it. That exact scenario is problem 4-15.
`,
      solution: `
**Step 1: inventory the poles.**

- $s=0$: from the input
- $s=-2$: real
- roots of $s^{2}+2s+5$: test the discriminant first:

$$b^{2}-4ac=4-4(1)(5)=4-20=-16<0$$

Negative, so this pair is **complex**. Do not attempt to factor it. Complete the square:

$$s^{2}+2s+5=(s+1)^{2}+(5-1)=(s+1)^{2}+2^{2}$$

so the poles are $s=-1\\pm j2$.

**Step 2: one term per pole, but a conjugate pair shares one term.**

| Pole | Term generated |
|---|---|
| $s=0$ | $A$ |
| $s=-2$ | $Be^{-2t}$ |
| $s=-1\\pm j2$ | $e^{-t}\\left(C\\cos2t+D\\sin2t\\right)$ |

$$\\boxed{\\;c(t)=A+Be^{-2t}+e^{-t}\\left(C\\cos2t+D\\sin2t\\right)\\;}$$

The complex pair produces **one** damped-sinusoid term with two constants, not two
separate exponentials. Writing $Ce^{(-1+j2)t}+De^{(-1-j2)t}$ is not wrong, but it is not
a real-valued form and is not what is wanted.

**Step 3: which term dominates.**

As $t\\to\\infty$ both exponential terms vanish and only $A$ survives - that is the steady
state, the forced response from the input pole.

Among the **transient** terms, compare distances from the imaginary axis:

- the pole at $-2$ gives $e^{-2t}$, time constant $\\tfrac12$
- the pair at $-1\\pm j2$ gives $e^{-t}$, time constant $1$

The $e^{-t}$ envelope decays **half as fast**, so the oscillatory term is the last
transient to disappear. **The complex pair is dominant.**

---

**The zero at $-4$ appears nowhere in the form.** It affects $A$, $B$, $C$, $D$ and
nothing else. If the question had asked "how many terms and of what type," the zero would
have been irrelevant information: recognizing that quickly is the point.

**Read the numbers off, not the algebra.** $\\sigma_{d}=1$ and $\\omega_{d}=2$ for the
dominant pair, so if you were asked for approximate specifications you could say
immediately $T_{s}\\approx4/1=4$ s and $T_{p}\\approx\\pi/2$ s - subject to checking the
$-2$ pole is far enough away, which it is not ($2<5\\times1$). See problem 4-15.
`
    },

    {
      id: "4-08", difficulty: "core", topic: "Underdamped specifications",
      sec: "4.6",
      prompt: "For $$G(s)=\\frac{100}{s^{2}+12s+100}$$ find $\\omega_{n}$, $\\zeta$, the pole locations, $T_{p}$, $T_{s}$, and $\\%OS$.",
      hint: "Once you have the poles as $-\\sigma_d \\pm j\\omega_d$, every specification is built from those two numbers alone.",
      answer: "$\\omega_{n}=10$, $\\zeta=\\tfrac35$, poles $s=-6\\pm j8$, $T_{p}=\\dfrac{\\pi}{8}$ s, $T_{s}=\\dfrac{2}{3}$ s, $\\%OS=100e^{-3\\pi/4}$.",
      expert: `
**First glance:** $100$ and $12$ give $\\omega_{n}=10$ and $\\sigma_{d}=6$, so $\\omega_{d}=8$ - the 3-4-5 triangle scaled by 2. Poles $-6\\pm j8$, and all three specifications follow from $6$ and $8$ alone.

$$T_{p}=\\frac{\\pi}{8},\\qquad T_{s}=\\frac{4}{6}=\\frac23,\\qquad \\%OS=100e^{-6\\pi/8}=100e^{-3\\pi/4}$$

**The recognition that makes this nearly free:** this is problem 4-06 with both pole parts doubled. An expert who has just done 4-06 sees $-6\\pm j8$ as $2\\times(-3\\pm j4)$ and knows instantly that:

- $\\zeta$ is unchanged, so $\\%OS$ is **identical**
- both times **halve**

because scaling both parts of a pole scales $\\omega_{n}$ and leaves the angle alone.

**The general principle worth internalizing:** $\\omega_{n}$ is a **time-axis scale factor**. It changes how fast the response happens, never its shape. Only the angle (that is, $\\zeta$) changes shape.

**Free check:** $\\sqrt{36+64}=\\sqrt{100}=10=\\omega_{n}$ ✓
`,
      solution: `
**Step 1: $\\omega_{n}$ and $\\zeta$.**

$$\\omega_{n}^{2}=100\\;\\Longrightarrow\\;\\omega_{n}=10$$

$$2\\zeta\\omega_{n}=12\\;\\Longrightarrow\\;20\\zeta=12\\;\\Longrightarrow\\;\\zeta=\\frac{12}{20}=\\frac{3}{5}$$

**Step 2: pole location.**

$$\\sigma_{d}=\\zeta\\omega_{n}=\\frac{3}{5}(10)=6$$

$$\\sqrt{1-\\zeta^{2}}=\\sqrt{1-\\frac{9}{25}}=\\sqrt{\\frac{16}{25}}=\\frac{4}{5}
\\;\\Longrightarrow\\;\\omega_{d}=10\\cdot\\frac{4}{5}=8$$

$$s=-6\\pm j8$$

**Step 3: the three specifications, straight off the pole.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{8}\\ \\text{s}$$

$$T_{s}=\\frac{4}{\\sigma_{d}}=\\frac{4}{6}=\\frac{2}{3}\\ \\text{s}$$

$$\\%OS=100\\,e^{-\\pi\\sigma_{d}/\\omega_{d}}=100\\,e^{-6\\pi/8}=100e^{-3\\pi/4}$$

$$\\boxed{\\;s=-6\\pm j8,\\quad T_{p}=\\frac{\\pi}{8},\\quad T_{s}=\\frac{2}{3},\\quad \\%OS=100e^{-3\\pi/4}\\;}$$

---

**Compare with problem 4-06.** That system had poles at $-3\\pm j4$ and this one has
$-6\\pm j8$ - **exactly double**. Look at what happened:

| | 4-06: $-3\\pm j4$ | 4-08: $-6\\pm j8$ | Change |
|---|---|---|---|
| $\\zeta$ | $3/5$ | $3/5$ | unchanged |
| $\\omega_{n}$ | $5$ | $10$ | doubled |
| $T_{p}$ | $\\pi/4$ | $\\pi/8$ | halved |
| $T_{s}$ | $4/3$ | $2/3$ | halved |
| $\\%OS$ | $100e^{-3\\pi/4}$ | $100e^{-3\\pi/4}$ | **unchanged** |

**Scaling both parts of the pole by the same factor leaves $\\zeta$ and therefore
$\\%OS$ untouched, and scales both times inversely.** The two responses have identical
shape; one is simply a time-compressed copy of the other. This is Nise's point that
$\\omega_{n}$ is a time-axis scale factor.

**Check the radial distance.** $\\sqrt{6^{2}+8^{2}}=\\sqrt{36+64}=\\sqrt{100}=10=\\omega_{n}$ ✓
`
    },

    {
      id: "4-09", difficulty: "core", topic: "Underdamped step response",
      sec: "4.6",
      prompt: "Find the complete unit step response $c(t)$ for $$G(s)=\\frac{25}{s^{2}+6s+25}$$ by partial fraction expansion.",
      hint: "Case 3 partial fractions from Chapter 2. The quadratic is irreducible - complete the square and match the damped sine and cosine pairs.",
      answer: "$$c(t)=1-e^{-3t}\\left(\\cos4t+\\tfrac{3}{4}\\sin4t\\right)$$",
      expert: `
**First glance:** this is a Chapter 2 Case 3 partial fraction wearing a Chapter 4 hat. The discriminant is negative, so complete the square and match the damped-sine and damped-cosine pairs.

**The pattern that skips the coefficient balancing.** For $\\dfrac{\\omega_{n}^{2}}{s\\left(s^{2}+bs+\\omega_{n}^{2}\\right)}$ the expansion is **always**

$$\\frac{1}{s}-\\frac{s+b}{s^{2}+bs+\\omega_{n}^{2}}$$

Residue at the origin is 1 (it is the dc gain), and the remaining numerator is forced to be $s+b$. An expert writes that down and goes straight to completing the square.

**Splitting the numerator:** $s+6=(s+3)+3$, and since $\\omega=4$ the sine coefficient is $\\tfrac34$. Read it as "leftover over omega."

**Two checks:** $c(0)=1-1=0$: a second-order system with no zeros always starts at zero. And the envelope $e^{-3t}$ must match $\\sigma_{d}=3$, the oscillation $4$ rad/s must match $\\omega_{d}=4$ ✓

**Worth keeping:** the derivative collapses beautifully to $\\dot c=\\tfrac{25}{4}e^{-3t}\\sin4t$: pure sine, no cosine. It is zero at $t=0$ and again at $\\omega_{d}t=\\pi$, which is *why* $T_{p}=\\pi/\\omega_{d}$. You will need this exact result in 4-23.
`,
      solution: `
**Step 1: form $C(s)$.**

$$C(s)=\\frac{1}{s}\\cdot\\frac{25}{s^{2}+6s+25}=\\frac{25}{s\\left(s^{2}+6s+25\\right)}$$

**Step 2: test the quadratic.** Discriminant $36-100=-64<0$, so it is irreducible. Keep
it whole with a linear numerator - **Case 3**:

$$C(s)=\\frac{K_{1}}{s}+\\frac{K_{2}s+K_{3}}{s^{2}+6s+25}$$

**Step 3: $K_{1}$ by cover-up.**

Cover $s$, evaluate the rest at $s=0$:

$$K_{1}=\\frac{25}{0+0+25}=1$$

**Step 4: clear fractions and balance coefficients.**

$$25=K_{1}\\left(s^{2}+6s+25\\right)+\\left(K_{2}s+K_{3}\\right)s$$

$$25=\\left(K_{1}+K_{2}\\right)s^{2}+\\left(6K_{1}+K_{3}\\right)s+25K_{1}$$

| Power | Equation | Solve |
|---|---|---|
| $s^{2}$ | $K_{1}+K_{2}=0$ | $K_{2}=-1$ |
| $s^{1}$ | $6K_{1}+K_{3}=0$ | $K_{3}=-6$ |
| $s^{0}$ | $25K_{1}=25$ | $K_{1}=1$ ✓ |

The $s^{0}$ row confirms Step 3.

$$C(s)=\\frac{1}{s}-\\frac{s+6}{s^{2}+6s+25}$$

**Step 5: complete the square.**

$$s^{2}+6s+25=\\left(s+3\\right)^{2}+\\left(25-9\\right)=(s+3)^{2}+16=(s+3)^{2}+4^{2}$$

So the shift is $3$ and $\\omega=4$: matching the pole $-3\\pm j4$ we already know.

**Step 6: split the numerator to match the table.**

Target form $\\dfrac{A(s+3)+B(4)}{(s+3)^{2}+4^{2}}$. Rewrite $s+6$ in terms of $(s+3)$:

$$s+6=(s+3)+3=\\underbrace{1}_{A}(s+3)+\\underbrace{\\tfrac34}_{B}\\underbrace{(4)}_{\\omega}$$

since $\\tfrac34\\times4=3$. ✓

$$C(s)=\\frac{1}{s}-\\left[\\frac{s+3}{(s+3)^{2}+4^{2}}+\\frac{3}{4}\\cdot\\frac{4}{(s+3)^{2}+4^{2}}\\right]$$

**Step 7: invert.**

$$\\boxed{\\;c(t)=1-e^{-3t}\\left(\\cos4t+\\frac{3}{4}\\sin4t\\right)\\;}$$

---

**Check: initial value.** $c(0)=1-1\\cdot(1+0)=0$ ✓ (a second-order system with no zeros
starts at zero).

**Check: final value.** Both trig terms are bounded and $e^{-3t}\\to0$, so
$c(\\infty)=1$, matching $G(0)=25/25=1$ ✓

**Check against the specification formulas.** The envelope is $e^{-3t}$, so
$\\sigma_{d}=3$ and $T_{s}=4/3$ ✓ agreeing with 4-06. The oscillation is at $4$ rad/s, so
$T_{p}=\\pi/4$ ✓

**The derivative, which you need in 4-23.** Differentiating the boxed result gives a
remarkably clean form:

$$\\dot c(t)=\\frac{25}{4}e^{-3t}\\sin4t$$

which matches the general formula
$\\dot c=\\dfrac{\\omega_{n}}{\\sqrt{1-\\zeta^{2}}}e^{-\\sigma_{d}t}\\sin\\omega_{d}t=\\dfrac{5}{4/5}e^{-3t}\\sin4t$ ✓
Note it is zero at $t=0$ and again at $\\omega_{d}t=\\pi$, i.e. $t=\\pi/4=T_{p}$ - which is
precisely how $T_{p}$ was derived.
`
    },

    {
      id: "4-10", difficulty: "core", topic: "Pole plot",
      sec: "4.6",
      prompt: "A second-order system has poles at $s=-4\\pm j3$. Find $\\omega_{n}$, $\\zeta$, $T_{p}$, $T_{s}$, $\\%OS$, and write the transfer function assuming unity dc gain.",
      hint: "Work backwards from the pole plot. The radial distance is $\\omega_n$ and the cosine of the angle from the negative real axis is $\\zeta$.",
      answer: "$\\omega_{n}=5$, $\\zeta=\\tfrac45$, $T_{p}=\\dfrac{\\pi}{3}$ s, $T_{s}=1$ s, $\\%OS=100e^{-4\\pi/3}$, and $$G(s)=\\frac{25}{s^{2}+8s+25}$$",
      expert: `
**First glance:** $-4\\pm j3$ is a 3-4-5 triangle, so $\\omega_{n}=5$ without computing a square root, and $\\zeta=\\tfrac45$ by the adjacent-over-hypotenuse reading.

All three specs come straight from $4$ and $3$: $T_{p}=\\tfrac{\\pi}{3}$, $T_{s}=\\tfrac44=1$, $\\%OS=100e^{-4\\pi/3}$.

**Building the transfer function without $\\zeta$ at all:**

$$(s+\\sigma_{d})^{2}+\\omega_{d}^{2}=s^{2}+2\\sigma_{d}s+\\omega_{n}^{2}$$

So the middle coefficient is **twice the real part** and the constant is $\\omega_{n}^{2}$: $s^{2}+8s+25$. Numerator $25$ for unity dc gain. Written in one line.

**Discard:** computing $\\zeta$, then $2\\zeta\\omega_{n}$, then assembling. Same answer, three times the arithmetic.

**The comparison an expert makes automatically:** 4-08 had $-6\\pm j8$ and this has $-4\\pm j3$: same triangle, **legs swapped**. Larger $\\zeta$ ($\\tfrac45$ vs $\\tfrac35$) means a larger exponent magnitude means **less** overshoot, exactly as more damping should. Checking that the direction of change makes physical sense costs two seconds and catches reversed ratios.
`,
      solution: `
**Step 1: read the pole directly.**

$$\\sigma_{d}=4\\quad(\\text{real part magnitude}),\\qquad \\omega_{d}=3\\quad(\\text{imaginary part})$$

**Step 2: $\\omega_{n}$ is the radial distance from the origin.**

$$\\omega_{n}=\\sqrt{\\sigma_{d}^{2}+\\omega_{d}^{2}}=\\sqrt{4^{2}+3^{2}}=\\sqrt{16+9}=\\sqrt{25}=5$$

Another $3\\text{-}4\\text{-}5$ triangle: recognize these on sight and the arithmetic
disappears.

**Step 3: $\\zeta$ is the cosine of the angle from the negative real axis.**

$$\\zeta=\\cos\\theta=\\frac{\\text{adjacent}}{\\text{hypotenuse}}=\\frac{\\sigma_{d}}{\\omega_{n}}=\\frac{4}{5}$$

Equivalently $\\zeta\\omega_{n}=\\sigma_{d}$, so $\\zeta=4/5$. Same thing.

**Step 4: the three specifications.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{3}\\ \\text{s}$$

$$T_{s}=\\frac{4}{\\sigma_{d}}=\\frac{4}{4}=1\\ \\text{s}$$

$$\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}=100e^{-4\\pi/3}$$

**Step 5: build the transfer function.**

$$G(s)=\\frac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$$

$$\\omega_{n}^{2}=25,\\qquad 2\\zeta\\omega_{n}=2\\sigma_{d}=2(4)=8$$

$$\\boxed{\\;G(s)=\\frac{25}{s^{2}+8s+25}\\;}$$

---

**The fastest construction, standard values.** For poles at $-\\sigma_{d}\\pm j\\omega_{d}$
the denominator is just

$$\\left(s+\\sigma_{d}\\right)^{2}+\\omega_{d}^{2}=s^{2}+2\\sigma_{d}s+\\left(\\sigma_{d}^{2}+\\omega_{d}^{2}\\right)$$

so the middle coefficient is **twice the real part** and the constant is
**$\\omega_{n}^{2}$**. Here: $s^{2}+8s+25$. No $\\zeta$ needed at all.

**Compare with 4-08.** That system had poles $-6\\pm j8$: same $\\omega_{n}$-to-parts
ratio $3\\text{-}4\\text{-}5$ but with the legs **swapped**. There $\\zeta=3/5$ and
$\\%OS=100e^{-3\\pi/4}$; here $\\zeta=4/5$ and $\\%OS=100e^{-4\\pi/3}$. Larger $\\zeta$
means a bigger exponent magnitude means **less** overshoot - as it must, since more
damping suppresses the peak.
`
    },

    {
      id: "4-11", difficulty: "core", topic: "Design from specifications",
      sec: "4.6",
      prompt: "Find the transfer function of a second-order system with unity dc gain that has $T_{s}=2$ s and $T_{p}=\\dfrac{\\pi}{4}$ s.",
      hint: "Each specification pins down one part of the pole. Settling time gives the real part; peak time gives the imaginary part.",
      answer: "Poles at $s=-2\\pm j4$, giving $$G(s)=\\frac{20}{s^{2}+4s+20}$$ with $\\omega_{n}=2\\sqrt5$ and $\\zeta=\\dfrac{\\sqrt5}{5}$.",
      expert: `
**First glance:** two time-domain specs, two parts of a pole. They map one-to-one and there is nothing to solve simultaneously:

$$T_{s}\\;\\to\\;\\sigma_{d}=\\frac{4}{T_{s}}=2,
\\qquad
T_{p}\\;\\to\\;\\omega_{d}=\\frac{\\pi}{T_{p}}=4$$

Poles $-2\\pm j4$. Denominator $s^{2}+4s+20$ by the twice-the-real-part rule. Numerator 20 for unity dc gain. Under thirty seconds.

**Notice the specification was given as $\\pi/4$, not $0.785$.** Whenever a peak time arrives with a $\\pi$ in it, the $\\pi$ is meant to cancel. That is a deliberate signal from the problem author that the numbers will be clean.

**Discard:** solving for $\\zeta$ and $\\omega_{n}$ first. You would end up at $\\omega_{n}=2\\sqrt5$ and $\\zeta=\\tfrac{1}{\\sqrt5}$ - correct but irrational, and unnecessary, because the pole parts are integers.

**The structural insight an expert states unprompted:** two knobs, three specifications. Fixing $T_{s}$ and $T_{p}$ **forces** $\\%OS=100e^{-\\pi/2}$ whether you like it or not. If that third number is unacceptable, no second-order system can satisfy all three: you need a compensator. That observation is the reason Chapter 9 exists.
`,
      solution: `
This is 4-10 run in reverse, and it is the shape most design questions take: you are
handed time-domain requirements and must produce a pole location.

---

**Step 1: settling time fixes the real part.**

$$T_{s}=\\frac{4}{\\sigma_{d}}\\;\\Longrightarrow\\;\\sigma_{d}=\\frac{4}{T_{s}}=\\frac{4}{2}=2$$

**Step 2: peak time fixes the imaginary part.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}\\;\\Longrightarrow\\;\\omega_{d}=\\frac{\\pi}{T_{p}}=\\frac{\\pi}{\\pi/4}=4$$

The $\\pi$ cancels exactly: that is why the specification was given as $\\pi/4$ rather
than a decimal.

**Step 3: the poles.**

$$s=-2\\pm j4$$

**Step 4: build the denominator.**

Middle coefficient is twice the real part; constant is $\\sigma_{d}^{2}+\\omega_{d}^{2}$:

$$(s+2)^{2}+4^{2}=s^{2}+4s+4+16=s^{2}+4s+20$$

**Step 5: set the numerator for unity dc gain.**

$$G(0)=\\frac{N}{20}=1\\;\\Longrightarrow\\;N=20$$

$$\\boxed{\\;G(s)=\\frac{20}{s^{2}+4s+20}\\;}$$

---

**Step 6: report $\\omega_{n}$ and $\\zeta$ exactly.**

$$\\omega_{n}=\\sqrt{20}=\\sqrt{4\\cdot5}=2\\sqrt5$$

$$\\zeta=\\frac{\\sigma_{d}}{\\omega_{n}}=\\frac{2}{2\\sqrt5}=\\frac{1}{\\sqrt5}=\\frac{\\sqrt5}{5}$$

Rationalizing the denominator is the expected final form. Do **not** write $0.447$.

**Check both specifications against the finished transfer function.**

- $2\\zeta\\omega_{n}=2\\left(\\tfrac{1}{\\sqrt5}\\right)\\left(2\\sqrt5\\right)=4$ ✓ matches
  the $s$ coefficient
- $T_{s}=4/2=2$ ✓ and $T_{p}=\\pi/4$ ✓

**And the overshoot that comes along for free.** You did not choose it - it is determined
once the poles are fixed:

$$\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}=100e^{-2\\pi/4}=100e^{-\\pi/2}$$

**This is the central design tension.** You have two knobs ($\\sigma_{d}$ and
$\\omega_{d}$) and three specifications ($T_{s}$, $T_{p}$, $\\%OS$). Fixing any two fixes
the third. If the third is unacceptable, no second-order system can satisfy all three -
you need a compensator, which is Chapter 9.
`
    },

    {
      id: "4-12", difficulty: "core", topic: "Design from specifications",
      sec: "4.6",
      prompt: "A system is required to have $\\%OS=100e^{-\\pi}$. Find the exact damping ratio $\\zeta$, and the angle the poles make with the negative real axis.",
      hint: "Set the overshoot exponent equal to $\\pi$ and solve algebraically. Do not reach for the logarithm formula - the numbers are arranged so you do not need it.",
      answer: "$\\zeta=\\dfrac{\\sqrt2}{2}=\\dfrac{1}{\\sqrt2}$, and the poles lie at $45^{\\circ}$ from the negative real axis.",
      expert: `
**First glance:** the overshoot is quoted as $100e^{-\\pi}$, not as a percentage. That phrasing is the giveaway that the exponents are meant to be matched directly, not run through the logarithm formula.

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\pi\\;\\Longrightarrow\\;\\zeta=\\sqrt{1-\\zeta^{2}}\\;\\Longrightarrow\\;\\zeta=\\frac{1}{\\sqrt2}$$

Three lines, no calculator, no logarithm.

**Discard:**
$\\zeta=\\dfrac{-\\ln(\\%OS/100)}{\\sqrt{\\pi^{2}+\\ln^{2}(\\%OS/100)}}$. It gives the same answer, but it is the tool for when $\\%OS$ is a decimal you cannot match by inspection - which on a closed-book exam it will not be.

**The geometric reading, which is faster still:** $\\zeta=\\tfrac{\\sqrt2}{2}$ means $\\theta=45^{\\circ}$ means $\\sigma_{d}=\\omega_{d}$. **Any pole of the form $-k\\pm jk$ has this damping ratio.** So the moment you see equal real and imaginary parts anywhere in this chapter, $\\%OS=100e^{-\\pi}$ with no computation.

**Memorize the five exact pairs**: $\\zeta=\\tfrac12,\\tfrac{\\sqrt2}{2},\\tfrac{\\sqrt3}{2},\\tfrac35,\\tfrac45$ with exponents $\\tfrac{\\pi}{\\sqrt3},\\pi,\\sqrt3\\pi,\\tfrac{3\\pi}{4},\\tfrac{4\\pi}{3}$. Every non-calculator problem in this chapter is built from one of them.
`,
      solution: `
**Step 1: set the exponents equal.**

$$\\%OS=100e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}=100e^{-\\pi}$$

Since the bases and the leading $100$ match, the exponents must match:

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\pi$$

**Step 2: cancel $\\pi$ and solve.**

$$\\frac{\\zeta}{\\sqrt{1-\\zeta^{2}}}=1$$

$$\\zeta=\\sqrt{1-\\zeta^{2}}$$

Square both sides (legitimate here since both sides are positive for $0<\\zeta<1$):

$$\\zeta^{2}=1-\\zeta^{2}$$

$$2\\zeta^{2}=1$$

$$\\zeta^{2}=\\frac{1}{2}\\;\\Longrightarrow\\;\\zeta=\\frac{1}{\\sqrt2}=\\frac{\\sqrt2}{2}$$

**Step 3: the pole angle.**

$$\\zeta=\\cos\\theta=\\frac{\\sqrt2}{2}\\;\\Longrightarrow\\;\\theta=45^{\\circ}$$

from the exact-value table.

$$\\boxed{\\;\\zeta=\\frac{\\sqrt2}{2},\\qquad \\theta=45^{\\circ}\\;}$$

---

**Why the logarithm formula was not needed.** The general inverse is

$$\\zeta=\\frac{-\\ln\\left(\\%OS/100\\right)}{\\sqrt{\\pi^{2}+\\ln^{2}\\left(\\%OS/100\\right)}}$$

Substituting $\\%OS/100=e^{-\\pi}$ gives $\\ln\\left(e^{-\\pi}\\right)=-\\pi$, so

$$\\zeta=\\frac{\\pi}{\\sqrt{\\pi^{2}+\\pi^{2}}}=\\frac{\\pi}{\\pi\\sqrt2}=\\frac{1}{\\sqrt2}$$

Same answer. But on a no-calculator exam the first route is faster and cannot go wrong.

**What $\\zeta=\\dfrac{\\sqrt2}{2}$ means geometrically.** The poles sit at exactly
$45^{\\circ}$, so $\\sigma_{d}=\\omega_{d}$: the real and imaginary parts are **equal**.
Any pole of the form $-k\\pm jk$ has this damping ratio, whatever $k$ is.

**Three exact pairs standard values** for a closed-book exam:

| $\\zeta$ | $\\sqrt{1-\\zeta^{2}}$ | exponent $\\dfrac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}$ | $\\theta$ |
|---|---|---|---|
| $\\tfrac12$ | $\\tfrac{\\sqrt3}{2}$ | $\\dfrac{\\pi}{\\sqrt3}=\\dfrac{\\pi\\sqrt3}{3}$ | $60^{\\circ}$ |
| $\\tfrac{\\sqrt2}{2}$ | $\\tfrac{\\sqrt2}{2}$ | $\\pi$ | $45^{\\circ}$ |
| $\\tfrac{\\sqrt3}{2}$ | $\\tfrac12$ | $\\sqrt3\\,\\pi$ | $30^{\\circ}$ |

Plus the rational pair $\\zeta=\\tfrac35$ (exponent $\\tfrac{3\\pi}{4}$) and
$\\zeta=\\tfrac45$ (exponent $\\tfrac{4\\pi}{3}$) from the $3\\text{-}4\\text{-}5$ triangle.
`
    },

    {
      id: "4-13", difficulty: "core", topic: "Pole plot",
      sec: "4.6",
      prompt: `Three systems have poles as follows:

**(a)** $-2\\pm j2$ &nbsp;&nbsp; **(b)** $-4\\pm j4$ &nbsp;&nbsp; **(c)** $-2\\pm j6$

Without computing any transfer function, rank them by percent overshoot and by settling time, and justify each ranking from the pole plot alone.`,
      hint: "Overshoot depends on the angle from the negative real axis. Settling time depends on the horizontal distance from the imaginary axis.",
      answer: "**Overshoot:** (a) and (b) are **equal** (both at $45^{\\circ}$, $\\%OS=100e^{-\\pi}$); (c) has **more** ($\\%OS=100e^{-\\pi/3}$). **Settling time:** (b) is fastest ($T_{s}=1$ s); (a) and (c) are **equal and slower** ($T_{s}=2$ s each).",
      expert: `
**First glance:** no transfer functions needed, no formulas evaluated. Both rankings are geometry.

$$\\%OS\\;\\leftrightarrow\\;\\textbf{angle from the negative real axis}
\\qquad
T_{s}\\;\\leftrightarrow\\;\\textbf{horizontal distance from the imaginary axis}$$

(a) and (b) both have $\\omega_{d}=\\sigma_{d}$, so both sit on the $45^{\\circ}$ line - **identical overshoot**, spotted without arithmetic. (c) is steeper, so less damped, so more overshoot.

(a) and (c) share $\\sigma_{d}=2$, so they sit on the same vertical line - **identical settling time**, again by inspection.

**The four families of constant-specification lines**, which an expert has as a mental picture:

| constant | locus |
|---|---|
| $\\%OS$, $\\zeta$ | radial lines through the origin |
| $T_{s}$ | vertical lines |
| $T_{p}$ | horizontal lines |
| $\\omega_{n}$ | circles about the origin |

**Discard:** building $s^{2}+2\\sigma_{d}s+\\omega_{n}^{2}$ for each and evaluating three formulas nine times.

**The counterintuitive result worth noticing:** (c) has the *shortest* peak time ($\\pi/6$) and the *worst* overshoot. Fast to the peak and well damped are different things - $T_{p}$ lives on the imaginary axis, damping lives in the angle.
`,
      solution: `
The whole point of this problem is that both rankings are visible on the pole plot with
no algebra.

---

**Overshoot depends only on the angle $\\theta$ from the negative real axis**, because
$\\zeta=\\cos\\theta$ and $\\%OS$ depends only on $\\zeta$.

$$\\tan\\theta=\\frac{\\omega_{d}}{\\sigma_{d}}$$

| Poles | $\\omega_{d}/\\sigma_{d}$ | $\\theta$ | $\\zeta=\\cos\\theta$ |
|---|---|---|---|
| (a) $-2\\pm j2$ | $2/2=1$ | $45^{\\circ}$ | $\\tfrac{\\sqrt2}{2}$ |
| (b) $-4\\pm j4$ | $4/4=1$ | $45^{\\circ}$ | $\\tfrac{\\sqrt2}{2}$ |
| (c) $-2\\pm j6$ | $6/2=3$ | $\\arctan3$ (larger) | smaller |

(a) and (b) sit on the **same radial line** through the origin, so they have identical
$\\zeta$ and identical overshoot. (c) sits at a **steeper angle**, so smaller $\\zeta$,
so **more** overshoot.

Numerically, using $\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}$:

$$\\text{(a), (b)}:\\;100e^{-2\\pi/2}=100e^{-\\pi}
\\qquad
\\text{(c)}:\\;100e^{-2\\pi/6}=100e^{-\\pi/3}$$

Since $e^{-\\pi/3}>e^{-\\pi}$, (c) overshoots most.

$$\\boxed{\\;\\%OS:\\;\\text{(c)}>\\text{(a)}=\\text{(b)}\\;}$$

---

**Settling time depends only on the horizontal distance from the imaginary axis**, since
$T_{s}=4/\\sigma_{d}$.

| Poles | $\\sigma_{d}$ | $T_{s}=4/\\sigma_{d}$ |
|---|---|---|
| (a) | $2$ | $2$ s |
| (b) | $4$ | $1$ s |
| (c) | $2$ | $2$ s |

(a) and (c) lie on the **same vertical line** $\\sigma=-2$, so they settle in the same
time despite looking very different. (b) is twice as far left, so it settles twice as
fast.

$$\\boxed{\\;T_{s}:\\;\\text{(b)}\\;(1\\text{ s})\\;<\\;\\text{(a)}=\\text{(c)}\\;(2\\text{ s})\\;}$$

---

**The three families of constant-specification lines**: this is the single most useful
picture in Chapter 4:

| Specification | Constant along | Because |
|---|---|---|
| $\\%OS$ (i.e. $\\zeta$) | **radial lines** through the origin | $\\zeta=\\cos\\theta$ |
| $T_{s}$ | **vertical lines** | $T_{s}=4/\\sigma_{d}$ |
| $T_{p}$ | **horizontal lines** | $T_{p}=\\pi/\\omega_{d}$ |
| $\\omega_{n}$ | **circles** centred on the origin | $\\omega_{n}$ is the radius |

**(a) versus (b) restated.** Same angle, different radius: same shape of response,
$\\omega_{n}$ doubled from $2\\sqrt2$ to $4\\sqrt2$, so the whole response happens twice as
fast. Both $T_{s}$ and $T_{p}$ halve while $\\%OS$ is untouched.

**Peak times, for completeness.** $T_{p}=\\pi/\\omega_{d}$ gives
$\\pi/2$, $\\pi/4$, $\\pi/6$ for (a), (b), (c): so (c) actually peaks *soonest* while
overshooting *most*. Fast to the peak and badly damped are not the same thing.
`
    },

    {
      id: "4-14", difficulty: "core", topic: "Additional poles",
      sec: "4.7",
      prompt: "For $$T(s)=\\frac{20}{(s+10)\\left(s^{2}+2s+2\\right)}$$ determine whether a second-order approximation is justified. If it is, write the approximating transfer function and give $T_{p}$, $T_{s}$ and $\\%OS$.",
      hint: "Compare the third pole's distance from the imaginary axis to the dominant pair's. Then match dc gain, not just numerator.",
      answer: "Justified: the third pole at $-10$ is $10\\times$ farther left than $\\sigma_{d}=1$, and $10\\ge5$. The approximation is $$T(s)\\approx\\frac{2}{s^{2}+2s+2}$$ with $T_{p}=\\pi$ s, $T_{s}=4$ s, $\\%OS=100e^{-\\pi}$.",
      expert: `
**First glance:** three poles, one real and one complex pair. The question is only ever "how far out is the extra pole compared to $\\sigma_{d}$?" - a single ratio.

$s^{2}+2s+2\\Rightarrow(s+1)^{2}+1$, so $\\sigma_{d}=1$. Third pole at $-10$. Ratio $=10\\ge5$. **Approximate.** That decision takes about eight seconds.

**The dc-matching shortcut nobody should skip:** replace the deleted factor by its value at $s=0$.

$$\\frac{20}{(s+10)\\left(s^{2}+2s+2\\right)}\\;\\longrightarrow\\;\\frac{20}{(10)\\left(s^{2}+2s+2\\right)}=\\frac{2}{s^{2}+2s+2}$$

One line. Simply crossing out $(s+10)$ changes the steady-state value by a factor of ten and is the most common error in this section.

**Recognize the pole:** $-1\\pm j1$ has equal parts, so $45^{\\circ}$, so $\\zeta=\\tfrac{\\sqrt2}{2}$, so $\\%OS=100e^{-\\pi}$ instantly: no exponent arithmetic at all.

**State the scope, because graders look for it:** the approximation is good for $T_{p}$, $T_{s}$ and $\\%OS$; it is not a claim that the two transfer functions are equal, and the very early response still contains a real $e^{-10t}$ term.
`,
      solution: `
**Step 1: locate the dominant pair.**

$$s^{2}+2s+2:\\quad\\text{discriminant}=4-8=-4<0,\\;\\text{so complex}$$

Complete the square:

$$s^{2}+2s+2=(s+1)^{2}+(2-1)=(s+1)^{2}+1^{2}$$

Poles at $s=-1\\pm j1$, so $\\sigma_{d}=1$ and $\\omega_{d}=1$.

**Step 2: apply the five-times rule.**

The third pole is at $-10$, so $\\alpha_{r}=10$.

$$\\frac{\\alpha_{r}}{\\sigma_{d}}=\\frac{10}{1}=10\\;\\ge\\;5$$

**Justified.** The exponential $e^{-10t}$ from the third pole has decayed to
insignificance long before the dominant pair reaches its first peak at $T_{p}=\\pi$.

**Step 3: write the approximation, matching dc gain.**

This is the step people skip. You cannot simply delete the factor $(s+10)$ - that would
change the steady-state value by a factor of 10.

Compute the true dc gain:

$$T(0)=\\frac{20}{(10)(2)}=\\frac{20}{20}=1$$

Now build a second-order system with the dominant denominator and the **same** dc gain:

$$T_{\\text{approx}}(s)=\\frac{N}{s^{2}+2s+2},\\qquad T_{\\text{approx}}(0)=\\frac{N}{2}=1\\;\\Longrightarrow\\;N=2$$

$$\\boxed{\\;T(s)\\approx\\frac{2}{s^{2}+2s+2}\\;}$$

**Step 4: specifications from the dominant pair.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{1}=\\pi\\ \\text{s}$$

$$T_{s}=\\frac{4}{\\sigma_{d}}=\\frac{4}{1}=4\\ \\text{s}$$

$$\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}=100e^{-\\pi}$$

Note $\\sigma_{d}=\\omega_{d}$ means $45^{\\circ}$ poles, so $\\zeta=\\tfrac{\\sqrt2}{2}$
and $\\%OS=100e^{-\\pi}$: the standard pair from 4-12.

---

**The mechanical shortcut for dc matching.** Take the factor you are deleting and replace
it by its value at $s=0$:

$$\\frac{20}{(s+10)\\left(s^{2}+2s+2\\right)}\\;\\longrightarrow\\;\\frac{20}{(10)\\left(s^{2}+2s+2\\right)}=\\frac{2}{s^{2}+2s+2}$$

Same result, one line.

**What the approximation costs you.** The neglected term is a genuine $e^{-10t}$ present
in the real response. It is significant for roughly $t<0.5$ s - well before the first
peak at $t=\\pi\\approx3$ s. So $T_{p}$, $T_{s}$ and $\\%OS$ are all reliable, while the
very first fraction of a second of the response is not exactly reproduced. That is the
correct scope of the claim.
`
    },

    {
      id: "4-15", difficulty: "core", topic: "Additional poles",
      sec: "4.7",
      prompt: "For $$T(s)=\\frac{6}{(s+3)\\left(s^{2}+2s+2\\right)}$$ determine whether a second-order approximation is justified, and state precisely what you may and may not conclude.",
      hint: "Same test as the previous problem. The correct answer here may be that the tools do not apply.",
      answer: "**Not justified.** The third pole at $-3$ is only $3\\times$ farther left than $\\sigma_{d}=1$, and $3<5$. The formulas for $T_{p}$, $T_{s}$ and $\\%OS$ **may not be used**. All that can be said is that the response contains a decaying $e^{-3t}$ term alongside a damped oscillation at $1$ rad/s, and settles because all poles are in the left half-plane.",
      expert: `
**First glance:** identical dominant pair to 4-14, only the third pole moved from $-10$ to $-3$. Ratio $3/1=3<5$. **The tools do not apply, and saying so is the answer.**

**This is the most important habit in the chapter.** The formulas will happily produce $T_{p}=\\pi$, $T_{s}=4$, $\\%OS=100e^{-\\pi}$: three confidently wrong numbers. Nothing in the algebra warns you. Only the test does.

**Run the test first, always.** Before writing a single specification, compute $\\alpha_{r}/\\sigma_{d}$. It costs three seconds and it is the difference between a correct answer and a plausible one.

**What you can still say, and should**: an expert never answers "cannot be done" and stops:

- poles $-3$ and $-1\\pm j1$, all left-half-plane, so **stable**
- response form $A+Be^{-3t}+e^{-t}\\left(C\\cos t+D\\sin t\\right)$, by inspection
- dc gain $\\tfrac{6}{(3)(2)}=1$, so $c(\\infty)=1$
- the complex pair still decays slowest, so it still dominates in that sense - it just is not dominant *enough* for two-pole formulas

**The pattern to recognize:** any problem presenting two nearly identical systems is testing the boundary between them, not the arithmetic. Find the discriminating feature.
`,
      solution: `
**Step 1: the dominant pair is the same as in 4-14.**

$$s^{2}+2s+2=(s+1)^{2}+1^{2}\\;\\Longrightarrow\\;s=-1\\pm j1,\\quad\\sigma_{d}=1,\\;\\omega_{d}=1$$

**Step 2: apply the test.**

$$\\frac{\\alpha_{r}}{\\sigma_{d}}=\\frac{3}{1}=3\\;<\\;5$$

**The approximation is not justified**, and the honest answer to this problem is to say
so and stop.

**Step 3: why the rule fails here, physically.**

The third pole contributes $e^{-3t}$, with time constant $\\tfrac13$ s. The dominant pair
reaches its first peak at

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\pi\\approx3\\ \\text{s}$$

which is about **nine time constants** of the third pole - that part is fine. But
settling is judged over the full $T_{s}$ window, and more importantly the peak *height*
is set by the sum of all three terms while the $e^{-3t}$ term is still contributing
meaningfully during the rise. The $5\\times$ threshold is the textbook's stated criterion
for when this contribution can be ignored, and $3$ does not meet it.

**Step 4: what you may still legitimately state.**

$$\\boxed{\\;\\text{No second-order approximation. }T_{p},\\,T_{s},\\,\\%OS\\text{ formulas do not apply.}\\;}$$

You can still say all of this without any approximation:

- **Poles:** $s=-3$ and $s=-1\\pm j1$. All have negative real parts, so the system is
  **stable** and the response settles.
- **Form of the response** to a unit step, by inspection:
  $$c(t)=A+Be^{-3t}+e^{-t}\\left(C\\cos t+D\\sin t\\right)$$
- **DC gain:** $T(0)=\\dfrac{6}{(3)(2)}=1$, so $c(\\infty)=1$.
- **The oscillation** is at $1$ rad/s with envelope $e^{-t}$.
- **Which term lasts longest:** the $e^{-t}$ pair, since $1<3$. The complex pair is still
  dominant in the sense of slowest decay: it just is not dominant *enough* for the
  two-pole formulas.

---

**Why this problem exists.** On an application exam the hardest judgment is knowing when
your tools do not apply. A student who computes $T_{p}=\\pi$, $T_{s}=4$,
$\\%OS=100e^{-\\pi}$ here has produced three confidently wrong numbers. The student who
writes "the five-times rule fails, so I cannot use the second-order specifications" has
the correct answer.

**Compare directly with 4-14.** Identical dominant pair, identical dc gain, only the third
pole moved from $-10$ to $-3$. Same question, opposite answer. **Always run the test; never
assume.**
`
    },

    {
      id: "4-16", difficulty: "core", topic: "Zeros",
      sec: "4.8",
      prompt: `Consider

$$T_{1}(s)=\\frac{25}{s^{2}+6s+25}
\\qquad\\text{and}\\qquad
T_{2}(s)=\\frac{25\\,(s+20)}{20\\left(s^{2}+6s+25\\right)}$$

$T_{2}$ is $T_{1}$ with a zero added at $s=-20$, scaled to preserve the dc gain. Determine whether the zero can be neglected, and explain your criterion.`,
      hint: "The same five-times yardstick applies to zeros. Compare the zero's distance from the imaginary axis to the dominant poles'.",
      answer: "The zero **can** be neglected: it sits at $-20$ while $\\sigma_{d}=3$, a ratio of $\\tfrac{20}{3}>5$. Both systems have dc gain 1, so $T_{2}(s)\\approx T_{1}(s)$ and the specifications $T_{p}=\\tfrac{\\pi}{4}$, $T_{s}=\\tfrac43$, $\\%OS=100e^{-3\\pi/4}$ apply to both.",
      expert: `
**First glance:** same five-times yardstick as additional poles, now applied to a zero. $\\sigma_{d}=3$, zero at $-20$, ratio $\\tfrac{20}{3}>\\tfrac{15}{3}=5$. **Negligible.** Ten seconds.

**Check the dc gains match before comparing anything.** The $20$ in the denominator of $T_{2}$ exists precisely to make $T_{2}(0)=1$. Without that normalization the comparison is meaningless - you would be comparing a system to a 20-times-larger copy of itself.

**Why a distant zero acts like a plain gain**, which is the reasoning behind the rule: in the partial fraction expansion, a far-off zero at $-a$ multiplies **every** residue by approximately the same factor $-a$. Same scaling everywhere means unchanged *relative* amplitudes means unchanged shape. Divide the gain back out and you recover the original response.

**The contrast that makes this a real distinction:** a *near* zero scales the residues by *different* factors, changing relative amplitudes and therefore the shape - specifically increasing overshoot. That is problem 4-23.

**Be precise about the claim.** "Negligible" means the transient shape and the three specifications survive. The two transfer functions are not equal - they differ at high frequency, where $T_{2}$ rolls off one order more slowly.
`,
      solution: `
**Step 1: locate the dominant poles.**

$$s^{2}+6s+25=(s+3)^{2}+16\\;\\Longrightarrow\\;s=-3\\pm j4,\\quad\\sigma_{d}=3,\\;\\omega_{d}=4$$

**Step 2: apply the yardstick to the zero.**

$$\\frac{|\\text{zero}|}{\\sigma_{d}}=\\frac{20}{3}\\;\\ge\\;5\\qquad\\text{since }5=\\frac{15}{3}$$

**The zero is far enough away to neglect.**

**Step 3: verify the dc gains match.**

$$T_{1}(0)=\\frac{25}{25}=1$$

$$T_{2}(0)=\\frac{25(0+20)}{20(25)}=\\frac{500}{500}=1$$

Both unity. The $20$ in the denominator of $T_{2}$ was placed there precisely to make
this true: without it the zero would have multiplied the steady-state value by 20 and
the comparison would be meaningless.

$$\\boxed{\\;T_{2}(s)\\approx T_{1}(s);\\quad T_{p}=\\frac{\\pi}{4},\\;T_{s}=\\frac{4}{3},\\;\\%OS=100e^{-3\\pi/4}\\;}$$

---

**Why a distant zero behaves like a plain gain.** Write the partial fraction expansion of
a system with poles at $-b$ and $-c$ and a zero at $-a$:

$$\\frac{s+a}{(s+b)(s+c)}=\\frac{(b-a)/(b-c)}{s+b}+\\frac{(c-a)/(c-b)}{s+c}$$

If $a$ is large compared with $b$ and $c$, then $b-a\\approx-a$ and $c-a\\approx-a$, so
**both residues are scaled by the same factor $-a$**:

$$\\approx a\\left[\\frac{1/(b-c)}{s+b}+\\frac{1/(c-b)}{s+c}\\right]=\\frac{a}{(s+b)(s+c)}$$

The zero has changed all amplitudes by the same multiple. Relative amplitudes are
untouched, so the **shape** of the response is unchanged - which is exactly what "acts
like a gain" means. Dividing that gain back out recovers the original response.

**The contrast to keep in mind.** A zero *close* to the poles scales the residues by
*different* factors, which changes relative amplitudes and therefore changes the shape -
specifically it increases overshoot. Problem 4-23 works that case quantitatively.

**The scope of the claim.** "Neglect the zero" means the transient *shape* and the three
specifications are preserved. It does not mean the two transfer functions are equal; they
differ at high frequency, where $T_{2}$ rolls off one order more slowly.
`
    },

    {
      id: "4-17", difficulty: "core", topic: "Zeros",
      sec: "4.8",
      prompt: `A system has

$$G(s)=\\frac{s-2}{(s+1)(s+2)}$$

**(a)** Find the initial value, initial slope, and final value of the unit step response, without computing $c(t)$ in full.
**(b)** Describe what makes this response qualitatively unusual, and name the property.`,
      hint: "Use the initial and final value theorems. Compare the sign of the initial slope with the sign of the final value.",
      answer: "**(a)** $c(0^{+})=0$, initial slope $\\dot c(0^{+})=+1$, $c(\\infty)=-1$. **(b)** The response initially moves in the **positive** direction but settles at a **negative** value - it starts off in the wrong direction. This is a **nonminimum-phase** system, caused by the zero at $s=+2$ in the right half-plane.",
      expert: `
**First glance:** $s-2$ in the numerator. A **right-half-plane zero**, and an expert names the consequence before computing anything: *nonminimum phase, the response starts off in the wrong direction.*

**The two limits that prove it, with no inverse transform:**

$$\\dot c(0^{+})=\\lim_{s\\to\\infty}s^{2}C(s)=+1
\\qquad
c(\\infty)=\\lim_{s\\to0}sC(s)=-1$$

Initial slope positive, final value negative. Opposite signs - that *is* the reversal, established in two limits.

**Discard:** partial fractions. The question asks about initial and final behaviour, and limit theorems answer that directly. Compute $c(t)$ only to check.

**The mechanism in one line:** the zero at $+a$ gives $-sC(s)+aC(s)$: the derivative term enters with a **flipped sign** relative to the left-half-plane case. Early on the derivative dominates, so the output goes the wrong way; later the scaled term takes over.

**Same decomposition, opposite sign, opposite behaviour** - compare with 4-23, where an LHP zero *adds* the derivative and increases overshoot.

**The design consequence worth knowing now:** you cannot cancel an RHP zero with a controller pole - that would put an RHP pole in the loop. Nonminimum-phase systems have a hard performance ceiling, which is why they get a name.
`,
      solution: `
## Part (a)

**Step 1: form $C(s)$.**

$$C(s)=\\frac{1}{s}\\cdot\\frac{s-2}{(s+1)(s+2)}=\\frac{s-2}{s(s+1)(s+2)}$$

**Step 2: initial value.**

$$c(0^{+})=\\lim_{s\\to\\infty}sC(s)=\\lim_{s\\to\\infty}\\frac{s-2}{(s+1)(s+2)}$$

Numerator degree 1, denominator degree 2, so the limit is $0$.

$$c(0^{+})=0$$

**Step 3: initial slope.** Apply the initial value theorem to $\\dot c$, whose transform
is $sC(s)$ with zero initial conditions:

$$\\dot c(0^{+})=\\lim_{s\\to\\infty}s\\left[sC(s)\\right]=\\lim_{s\\to\\infty}\\frac{s(s-2)}{(s+1)(s+2)}$$

Now numerator and denominator are both degree 2, so the limit is the ratio of leading
coefficients:

$$\\dot c(0^{+})=\\frac{1}{1}=+1$$

**Positive.** The response starts by going up.

**Step 4: final value.** Check the precondition first: the poles of $sC(s)$ are $-1$ and
$-2$, both left-half-plane, so the theorem is valid.

$$c(\\infty)=\\lim_{s\\to0}sC(s)=\\frac{0-2}{(0+1)(0+2)}=\\frac{-2}{2}=-1$$

**Negative.**

$$\\boxed{\\;c(0^{+})=0,\\qquad \\dot c(0^{+})=+1,\\qquad c(\\infty)=-1\\;}$$

---

## Part (b)

The response **starts at zero, moves upward, then reverses and settles at $-1$.** It
initially travels in the direction *opposite* to where it is going to end up.

$$\\boxed{\\;\\text{Nonminimum-phase system: caused by the right-half-plane zero at }s=+2\\;}$$

**Why the RHP zero does this.** Using the decomposition from Section 4.8, a zero at $+a$
means the numerator is $(s-a)$, and

$$(s-a)C(s)=\\underbrace{sC(s)}_{\\text{derivative of }c}-\\underbrace{aC(s)}_{\\text{scaled }c}$$

The derivative term now enters with the **opposite sign** relative to the scaled response.
Early in a step response the derivative is large while the response itself is still near
zero, so the derivative term wins at first and drives the output the wrong way. Later the
scaled term takes over and the response reverses.

**Verification by full solution** (not required, but confirms the reasoning). Partial
fractions on $C(s)$ give

$$c(t)=-1+3e^{-t}-2e^{-2t}$$

Check: $c(0)=-1+3-2=0$ ✓ and $\\dot c(t)=-3e^{-t}+4e^{-2t}$, so
$\\dot c(0)=-3+4=+1$ ✓ and $c(\\infty)=-1$ ✓

**The physical intuition Nise gives.** A motorcycle turning right must first be steered
briefly *left* to lean the machine over. The output goes the wrong way before it goes the
right way. An aircraft's altitude response to elevator does the same thing.

**The design consequence, for later chapters.** RHP zeros cannot be cancelled by a
controller: putting an RHP pole in the compensator to cancel one creates an unstable
system. They fundamentally limit achievable performance, which is why they get a name.
`
    },

    {
      id: "4-18", difficulty: "core", topic: "Pole dominance",
      sec: "4.7",
      prompt: `For $$T(s)=\\frac{20}{(s+1)(s+20)}$$ find the unit step response by partial fractions, then justify a **first-order** approximation using two independent arguments.`,
      hint: "Compute all three residues. Then compare both the pole locations and the residue sizes.",
      answer: "$$c(t)=1-\\tfrac{20}{19}e^{-t}+\\tfrac{1}{19}e^{-20t}$$ The $e^{-20t}$ term is negligible because its pole is $20\\times$ farther left **and** its residue is $20\\times$ smaller. Hence $T(s)\\approx\\dfrac{1}{s+1}$.",
      expert: `
**First glance:** poles at $-1$ and $-20$, twenty to one. Wildly separated poles mean the fast one is irrelevant and the system behaves first-order. An expert predicts the conclusion before computing residues.

**But this problem wants both arguments, and they are genuinely independent:**

1. **Location**: $\\tfrac{20}{1}=20\\ge5$, so the fast term is gone in $\\tfrac14$ s while the slow one has a 1-second time constant.
2. **Residue size**: $\\left|\\tfrac{K_{3}}{K_{2}}\\right|=\\tfrac{1/19}{20/19}=\\tfrac{1}{20}$, so even at its largest the fast term is 5% of the slow one.

**Why both are needed:** a pole can be far away and still carry a large residue, or be close and nearly cancelled by a zero and carry almost none. Location alone is a heuristic; residues are the evidence.

**The residue arithmetic: where errors happen:** $(-20)(-19)=+380$. Negative times negative. Write the two factor values down separately before multiplying.

**Free check:** residues must sum to zero here (denominator exceeds numerator by 3): $1-\\tfrac{20}{19}+\\tfrac{1}{19}=0$ ✓

**The reduction, with dc matching:** replace $(s+20)$ by 20, giving $\\tfrac{1}{s+1}$. Then $\\tau=1$, $T_{s}=4$, no overshoot - both poles real.
`,
      solution: `
**Step 1: form $C(s)$ and expand.**

$$C(s)=\\frac{20}{s(s+1)(s+20)}=\\frac{K_{1}}{s}+\\frac{K_{2}}{s+1}+\\frac{K_{3}}{s+20}$$

**Step 2: residues by cover-up.**

$$K_{1}=\\left.\\frac{20}{(s+1)(s+20)}\\right|_{s=0}=\\frac{20}{(1)(20)}=\\frac{20}{20}=1$$

$$K_{2}=\\left.\\frac{20}{s(s+20)}\\right|_{s=-1}=\\frac{20}{(-1)(19)}=-\\frac{20}{19}$$

Work the denominator piecewise: $s=-1$, and $s+20=-1+20=19$, so the product is $-19$.

$$K_{3}=\\left.\\frac{20}{s(s+1)}\\right|_{s=-20}=\\frac{20}{(-20)(-19)}=\\frac{20}{380}=\\frac{1}{19}$$

Here $s=-20$ and $s+1=-19$, and negative times negative is positive.

**Step 3: the response.**

$$\\boxed{\\;c(t)=1-\\frac{20}{19}e^{-t}+\\frac{1}{19}e^{-20t}\\;}$$

**Check:** $c(0)=1-\\tfrac{20}{19}+\\tfrac{1}{19}=\\tfrac{19-20+1}{19}=0$ ✓ and
$c(\\infty)=1=T(0)=\\tfrac{20}{20}$ ✓

---

**Argument 1: pole location.**

$$\\frac{20}{1}=20\\;\\ge\\;5$$

The fast pole is twenty times farther from the imaginary axis than the slow one, easily
clearing the five-times threshold. Its exponential $e^{-20t}$ has a time constant of
$\\tfrac{1}{20}$ s and is effectively gone after $\\tfrac{5}{20}=0.25$ s, while the
dominant term has a time constant of $1$ s.

**Argument 2: residue size.**

$$\\left|\\frac{K_{3}}{K_{2}}\\right|=\\frac{1/19}{20/19}=\\frac{1}{20}$$

The fast term's **amplitude** is only $\\tfrac{1}{20}$ of the slow term's. Even at
$t=0$, where $e^{-20t}$ is at its largest, it contributes $\\tfrac{1}{19}\\approx5\\%$ of
the total.

**Both arguments matter and they are independent.** A pole can be far away but carry a
large residue, or be nearby but nearly cancelled by a zero and carry a tiny one. Nise
requires you to check both before discarding a term.

**Step 4: write the approximation with dc matching.**

$$T(s)=\\frac{20}{(s+1)(s+20)}\\;\\longrightarrow\\;\\frac{20}{(s+1)(20)}=\\frac{1}{s+1}$$

$$c(t)\\approx1-e^{-t}$$

Compare coefficients: the exact answer has $-\\tfrac{20}{19}=-1.0526\\ldots$ where the
approximation has $-1$. About $5\\%$ error in that amplitude, and the missing term
supplies the difference at $t=0$.

**First-order specifications then follow:** $\\tau=1$ s, $T_{r}=2.2$ s, $T_{s}=4$ s, and
**no overshoot**: which the exact two-pole system also has, since both its poles are
real.
`
    },

    {
      id: "4-19", difficulty: "core", topic: "System identification",
      sec: "4.2",
      prompt: "A step of amplitude $2$ is applied to an unknown system. The response has no overshoot, rises with a nonzero initial slope, settles at $8$, and reaches $63\\%$ of its final value at $t=\\tfrac15$ s. Find $G(s)$.",
      hint: "The two identifying features tell you the order before you compute anything. Watch that the input is not a unit step.",
      answer: "$$G(s)=\\frac{20}{s+5}$$",
      expert: `
**First glance:** the two qualitative facts settle the order before any numbers are used.

- **no overshoot** rules out an underdamped pair
- **nonzero initial slope** rules out *any* two-pole system with a constant numerator, because those have $\\dot c(0^{+})=0$

Both together: first order. An expert reads the description, writes $G=\\tfrac{K}{s+a}$, and only then looks at the data.

**The trap, and it is the content of the problem:** the input is a step of amplitude **2**. So

$$c(\\infty)=\\underbrace{G(0)}_{\\text{dc gain}}\\times\\underbrace{2}_{\\text{input}}$$

Assuming a unit step gives $K=40$: twice too large: and nothing downstream looks wrong. Experts check the input amplitude *every time* before using a final value.

**Reading the parameters:** $63\\%$ point at $t=\\tfrac15$ means $\\tau=\\tfrac15$ means $a=5$, by definition. Then $\\tfrac{2K}{5}=8\\Rightarrow K=20$.

**Confirm:** $G(0)=\\tfrac{20}{5}=4$, and $4\\times2=8$ ✓ Getting the dc gain and the final value to differ by exactly the input amplitude is the check that the trap was avoided.
`,
      solution: `
**Step 1: identify the order from the description, before any algebra.**

- **No overshoot** rules out an underdamped second-order system.
- **Nonzero initial slope** rules out a second-order system entirely: a two-pole system
  with no zeros has $\\dot c(0^{+})=0$, because its numerator degree is two below its
  denominator degree.

Both features together are the signature of a **first-order** system:

$$G(s)=\\frac{K}{s+a}$$

**Step 2: the time constant gives $a$.**

By definition, the time constant is the time to reach $63\\%$ of the final value:

$$\\tau=\\frac15\\ \\text{s}\\;\\Longrightarrow\\;a=\\frac{1}{\\tau}=5$$

The pole is at $s=-5$.

**Step 3: the dc gain gives $K$, and here is the trap.**

The input was a step of amplitude **2**, not a unit step. So $R(s)=\\dfrac{2}{s}$ and

$$c(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{2}{s}\\cdot\\frac{K}{s+a}=\\frac{2K}{a}$$

Set that equal to the observed final value:

$$\\frac{2K}{5}=8\\;\\Longrightarrow\\;2K=40\\;\\Longrightarrow\\;K=20$$

$$\\boxed{\\;G(s)=\\frac{20}{s+5}\\;}$$

---

**The trap, stated plainly.** If you had assumed a unit step you would get
$K/a=8\\Rightarrow K=40$ and a transfer function twice too large. The system's dc gain is

$$G(0)=\\frac{20}{5}=4$$

and $4\\times2=8$ ✓: the response is the dc gain times the input amplitude, not the
final value itself.

**Check the other specifications against the data.**

$$T_{r}=\\frac{2.2}{a}=\\frac{2.2}{5}=0.44\\ \\text{s},\\qquad T_{s}=\\frac{4}{a}=\\frac{4}{5}=0.8\\ \\text{s}$$

Both consistent with a response that has essentially finished by $t=1$ s.

**The full response, for confirmation:**

$$C(s)=\\frac{2}{s}\\cdot\\frac{20}{s+5}=\\frac{40}{s(s+5)}
\\;\\Longrightarrow\\;c(t)=8\\left(1-e^{-5t}\\right)$$

At $t=\\tfrac15$: $c=8\\left(1-e^{-1}\\right)$, and $1-e^{-1}$ is by definition the
$63\\%$ point ✓
`
    },

    {
      id: "4-20", difficulty: "core", topic: "System identification",
      sec: "4.2",
      prompt: "A second-order system with unity dc gain is measured to have $\\%OS=100e^{-\\pi/\\sqrt3}$ and $T_{s}=2$ s. Find $\\zeta$, $\\omega_{n}$, the poles, $T_{p}$, and $G(s)$.",
      hint: "Overshoot gives $\\zeta$ on its own. Settling time then gives $\\omega_n$, because $T_s$ involves the product $\\zeta\\omega_n$.",
      answer: "$\\zeta=\\tfrac12$, $\\omega_{n}=4$, poles $s=-2\\pm j2\\sqrt3$, $T_{p}=\\dfrac{\\pi\\sqrt3}{6}$ s, and $$G(s)=\\frac{16}{s^{2}+4s+16}$$",
      expert: `
**First glance:** the order of operations is forced, and getting it wrong leaves you with two unknowns in one equation.

$$\\%OS\\;\\longrightarrow\\;\\zeta\\;\\;\\text{(alone)},\\qquad\\text{then any time spec}\\;\\longrightarrow\\;\\omega_{n}$$

**$\\%OS$ depends on $\\zeta$ and nothing else.** That is why it always goes first.

**Recognize $\\pi/\\sqrt3$ on sight** rather than solving for it. From the memorized table, exponent $\\tfrac{\\pi}{\\sqrt3}$ $\\Leftrightarrow$ $\\zeta=\\tfrac12$ $\\Leftrightarrow$ $60^{\\circ}$. If you have the five exact pairs, this step is instant; if not, it is three lines of algebra. Either works, but on a timed exam the table wins.

**Then $T_{s}=\\tfrac{4}{\\zeta\\omega_{n}}$ pins $\\omega_{n}$:** $\\zeta\\omega_{n}=2$, so $\\omega_{n}=4$ and $\\sigma_{d}=2$ directly. Note $\\sigma_{d}$ came out of the settling time without needing $\\omega_{n}$ at all.

**Rationalize the peak time.** $T_{p}=\\tfrac{\\pi}{2\\sqrt3}=\\tfrac{\\pi\\sqrt3}{6}$. Leaving a surd in a denominator is the expected form to fix, and on a closed-book exam it is the only presentable answer.

**Close by verifying all given specs against the finished $G(s)$** - $\\omega_{n}=\\sqrt{16}=4$, $\\zeta=\\tfrac48=\\tfrac12$, $T_{s}=\\tfrac42=2$ ✓ Round-tripping is faster than re-deriving.
`,
      solution: `
**Step 1: overshoot gives $\\zeta$, and nothing else does.**

$$100e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}=100e^{-\\pi/\\sqrt3}
\\;\\Longrightarrow\\;\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}=\\frac{\\pi}{\\sqrt3}$$

Cancel $\\pi$:

$$\\frac{\\zeta}{\\sqrt{1-\\zeta^{2}}}=\\frac{1}{\\sqrt3}$$

Cross-multiply and square:

$$\\sqrt3\\,\\zeta=\\sqrt{1-\\zeta^{2}}\\;\\Longrightarrow\\;3\\zeta^{2}=1-\\zeta^{2}\\;\\Longrightarrow\\;4\\zeta^{2}=1$$

$$\\zeta=\\frac{1}{2}$$

(This is the $60^{\\circ}$ entry from the table in 4-12: recognizing $\\pi/\\sqrt3$ on
sight saves the algebra entirely.)

**Step 2: settling time gives $\\omega_{n}$.**

$$T_{s}=\\frac{4}{\\zeta\\omega_{n}}\\;\\Longrightarrow\\;2=\\frac{4}{\\left(\\tfrac12\\right)\\omega_{n}}=\\frac{8}{\\omega_{n}}$$

$$\\omega_{n}=4\\ \\text{rad/s}$$

**Step 3: the poles.**

$$\\sigma_{d}=\\zeta\\omega_{n}=\\tfrac12(4)=2$$

$$\\sqrt{1-\\zeta^{2}}=\\sqrt{1-\\tfrac14}=\\frac{\\sqrt3}{2}
\\;\\Longrightarrow\\;\\omega_{d}=4\\cdot\\frac{\\sqrt3}{2}=2\\sqrt3$$

$$s=-2\\pm j2\\sqrt3$$

**Step 4: peak time.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{2\\sqrt3}$$

Rationalize:

$$\\frac{\\pi}{2\\sqrt3}\\cdot\\frac{\\sqrt3}{\\sqrt3}=\\frac{\\pi\\sqrt3}{6}\\ \\text{s}$$

**Step 5: the transfer function.**

Middle coefficient $=2\\sigma_{d}=4$; constant $=\\omega_{n}^{2}=16$; numerator $=16$ for
unity dc gain:

$$\\boxed{\\;G(s)=\\frac{16}{s^{2}+4s+16}\\;}$$

---

**Check every given specification against the finished answer.**

- $\\omega_{n}=\\sqrt{16}=4$ ✓
- $\\zeta=\\dfrac{4}{2\\sqrt{16}}=\\dfrac{4}{8}=\\dfrac12$ ✓
- $T_{s}=\\dfrac{4}{2}=2$ s ✓
- $\\%OS$ exponent $=\\dfrac{\\pi\\sigma_{d}}{\\omega_{d}}=\\dfrac{2\\pi}{2\\sqrt3}=\\dfrac{\\pi}{\\sqrt3}$ ✓
- radial check: $\\sqrt{2^{2}+\\left(2\\sqrt3\\right)^{2}}=\\sqrt{4+12}=4=\\omega_{n}$ ✓

**The order of operations matters.** Always take $\\zeta$ from $\\%OS$ first, because
$\\%OS$ depends on $\\zeta$ alone. Then any *time* specification pins $\\omega_{n}$. Doing
it the other way round leaves two unknowns in one equation.
`
    },

    {
      id: "4-21", difficulty: "challenge", topic: "Additional poles",
      sec: "4.7",
      prompt: `A closed-loop system has

$$T(s)=\\frac{200}{(s+10)\\left(s^{2}+4s+20\\right)}$$

**(a)** Decide whether the response can be characterized using second-order specifications, showing the test explicitly.
**(b)** If so, give $T_{p}$, $T_{s}$, and $\\%OS$ exactly.
**(c)** State one thing your answer to (b) does **not** guarantee.`,
      hint: "The test lands exactly on the boundary. That is deliberate - say what the rule permits and be precise about its limits.",
      answer: "**(a)** The dominant poles are $-2\\pm j4$ so $\\sigma_{d}=2$; the third pole is at $-10$ and $\\tfrac{10}{2}=5$, which **meets** the five-times criterion exactly, so the approximation is permitted. **(b)** $T_{p}=\\dfrac{\\pi}{4}$ s, $T_{s}=2$ s, $\\%OS=100e^{-\\pi/2}$. **(c)** It does not guarantee the accuracy of the very early response, where the neglected $e^{-10t}$ term is still significant.",
      expert: `
**First glance:** the ratio is **exactly 5**. That is not an accident - the problem is built on the boundary of the rule, and the grading is about how precisely you state what the rule permits.

$s^{2}+4s+20\\Rightarrow(s+2)^{2}+16$, so $\\sigma_{d}=2$, $\\omega_{d}=4$. Third pole $-10$. $\\tfrac{10}{2}=5$.

**The criterion is $\\ge5$, not $>5$.** Meeting it exactly qualifies. A student who writes "$5$ is not greater than $5$, so no" has misread an inequality; a student who writes "yes" without showing the ratio got there by luck.

**Specs off the pole, as always:** $T_{p}=\\tfrac{\\pi}{4}$, $T_{s}=\\tfrac42=2$, $\\%OS=100e^{-2\\pi/4}=100e^{-\\pi/2}$.

**Part (c) is the real question**, and it has no formula. What an expert says: the third pole contributes a genuine $e^{-10t}$ with time constant $\\tfrac{1}{10}$ s, significant until roughly $t=0.5$ s. The first peak is at $T_{p}=\\pi/4\\approx0.79$ s, *after* that. So $T_{p}$, $T_{s}$ and $\\%OS$ are trustworthy while the early rise and the exact peak height are not.

At a ratio of exactly 5 the margin is thin, and numerically the true peak comes in slightly below the second-order prediction. Naming the limitation precisely is what an application exam is grading.
`,
      solution: `
## Part (a)

**Step 1: find the dominant pair.**

$$s^{2}+4s+20:\\quad\\text{discriminant}=16-80=-64<0\\;\\Longrightarrow\\;\\text{complex}$$

Complete the square:

$$s^{2}+4s+20=(s+2)^{2}+(20-4)=(s+2)^{2}+16=(s+2)^{2}+4^{2}$$

$$s=-2\\pm j4\\;\\Longrightarrow\\;\\sigma_{d}=2,\\qquad\\omega_{d}=4$$

**Step 2: apply the five-times rule.**

$$\\frac{\\alpha_{r}}{\\sigma_{d}}=\\frac{10}{2}=5$$

$$5\\;\\ge\\;5\\quad\\text{- the criterion is met, exactly at the boundary.}$$

$$\\boxed{\\;\\text{Second-order characterization is permitted.}\\;}$$

**Step 3: confirm the dc gain of the reduced system.**

$$T(0)=\\frac{200}{(10)(20)}=\\frac{200}{200}=1$$

Approximating by replacing $(s+10)$ with its value at $s=0$:

$$T(s)\\approx\\frac{200}{10\\left(s^{2}+4s+20\\right)}=\\frac{20}{s^{2}+4s+20}$$

and $\\dfrac{20}{20}=1$ ✓: the dc gains agree, as required.

---

## Part (b)

Everything reads off the pole $-2\\pm j4$.

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{4}\\ \\text{s}$$

$$T_{s}=\\frac{4}{\\sigma_{d}}=\\frac{4}{2}=2\\ \\text{s}$$

$$\\%OS=100e^{-\\pi\\sigma_{d}/\\omega_{d}}=100e^{-2\\pi/4}=100e^{-\\pi/2}$$

For completeness, $\\omega_{n}=\\sqrt{2^{2}+4^{2}}=\\sqrt{20}=2\\sqrt5$ and
$\\zeta=\\dfrac{2}{2\\sqrt5}=\\dfrac{1}{\\sqrt5}=\\dfrac{\\sqrt5}{5}$.

Sanity-check the overshoot exponent through $\\zeta$:

$$\\frac{\\zeta\\pi}{\\sqrt{1-\\zeta^{2}}}
=\\frac{\\left(1/\\sqrt5\\right)\\pi}{\\sqrt{1-\\tfrac15}}
=\\frac{\\pi/\\sqrt5}{2/\\sqrt5}=\\frac{\\pi}{2}\\;\\checkmark$$

$$\\boxed{\\;T_{p}=\\frac{\\pi}{4}\\ \\text{s},\\qquad T_{s}=2\\ \\text{s},\\qquad \\%OS=100e^{-\\pi/2}\\;}$$

---

## Part (c)

**The approximation says nothing reliable about the first fraction of a second.**

The neglected pole contributes a genuine $e^{-10t}$ term with time constant
$\\tfrac{1}{10}$ s. It is negligible after about $5\\times\\tfrac{1}{10}=0.5$ s. The
dominant pair reaches its peak at $T_{p}=\\pi/4\\approx0.79$ s, so the third pole has
*mostly* died by the peak: which is exactly what the rule is designed to guarantee.

But "mostly" is the operative word at a ratio of exactly $5$. Before $t\\approx0.5$ s the
third term still contributes, so:

- the **rise** of the response is not exactly that of the two-pole system,
- the **peak value** is slightly lower than the second-order formula predicts,
- $T_{s}$ and $T_{p}$ are reliable because they concern behaviour well after $0.5$ s.

Other honest answers: it does not guarantee anything about the response to a *different*
input, and it does not mean $T(s)$ and its approximation are equal - they differ at high
frequency, where the true system rolls off one order faster.

---

**Why this problem is worth the effort.** The ratio is exactly $5$, the boundary of the
rule. A student who reflexively answers "yes, approximate" without showing the test gets
the right conclusion for no reason. A student who answers "no, it's not $>5$" has
misread a $\\ge$. The correct response states the number, states the criterion, and
states the limitation: which is what an application exam is actually grading.
`
    },

    {
      id: "4-22", difficulty: "challenge", topic: "Design regions",
      sec: "4.6",
      prompt: `A specification requires $T_{s}\\le2$ s **and** $\\%OS\\le100e^{-\\pi}$.

**(a)** Translate both requirements into conditions on the pole location $-\\sigma_{d}\\pm j\\omega_{d}$, and describe the allowable region of the $s$-plane in words.
**(b)** Determine which of these candidate pole pairs are acceptable: $-3\\pm j2$, &nbsp; $-1\\pm j1$, &nbsp; $-4\\pm j6$, &nbsp; $-2\\pm j2$.
**(c)** One candidate fails only one of the two tests. Which one, and what would you change about it?`,
      hint: "Each specification becomes a simple geometric constraint. One is a vertical boundary; the other is an angular one.",
      answer: "**(a)** $\\sigma_{d}\\ge2$ (at or left of the vertical line $\\sigma=-2$) **and** $\\omega_{d}\\le\\sigma_{d}$ (within $45^{\\circ}$ of the negative real axis). **(b)** Acceptable: $-3\\pm j2$ and $-2\\pm j2$. Rejected: $-1\\pm j1$ and $-4\\pm j6$. **(c)** $-4\\pm j6$ passes settling time easily ($T_{s}=1$ s) but fails overshoot; reduce $\\omega_{d}$ to at most 4.",
      expert: `
**First glance:** two specifications, two geometric boundaries. Nothing here needs a transfer function.

$$T_{s}\\le2\\;\\Longrightarrow\\;\\sigma_{d}\\ge2\\quad\\text{(vertical line, poles to its left)}$$
$$\\%OS\\le100e^{-\\pi}\\;\\Longrightarrow\\;\\zeta\\ge\\tfrac{\\sqrt2}{2}\\;\\Longrightarrow\\;\\theta\\le45^{\\circ}\\;\\Longrightarrow\\;\\omega_{d}\\le\\sigma_{d}$$

**Both inequalities flip when you rearrange, and that is where points are lost.** Smaller $T_{s}$ needs *larger* $\\sigma_{d}$; smaller $\\%OS$ needs *larger* $\\zeta$ but a *smaller* angle. An expert says the direction out loud before writing.

**Recognize $100e^{-\\pi}$ instantly as the $45^{\\circ}$ line**: from 4-12. That turns the overshoot condition into the simple comparison $\\omega_{d}\\le\\sigma_{d}$, which you can apply to a candidate by eye.

**Then the test is two comparisons per candidate, no arithmetic:**
- is the real part at least 2?
- is the imaginary part no bigger than the real part?

$-2\\pm j2$ sits exactly on **both** boundaries. Since both specs were written with $\\le$, it qualifies - it is the corner of the wedge. With strict inequalities it would fail both. Reading the inequality symbol matters.

**Why this problem exists:** in Chapters 8 and 9 you *place* poles to meet specs. This translation is the step that makes that possible.
`,
      solution: `
## Part (a)

**Settling time becomes a vertical boundary.**

$$T_{s}=\\frac{4}{\\sigma_{d}}\\le2\\;\\Longrightarrow\\;\\sigma_{d}\\ge\\frac{4}{2}=2$$

Note the inequality **flips** when you rearrange: a *smaller* $T_{s}$ requires a *larger*
$\\sigma_{d}$. Getting this backwards is the most common error in design-region problems.

Geometrically: the poles must lie **on or to the left of the vertical line
$\\sigma=-2$**.

**Overshoot becomes an angular boundary.**

From problem 4-12, $\\%OS=100e^{-\\pi}$ corresponds exactly to $\\zeta=\\dfrac{\\sqrt2}{2}$,
i.e. $\\theta=45^{\\circ}$.

$$\\%OS\\le100e^{-\\pi}\\;\\Longrightarrow\\;\\zeta\\ge\\frac{\\sqrt2}{2}\\;\\Longrightarrow\\;\\theta\\le45^{\\circ}$$

Again note the direction: *less* overshoot means *more* damping means a *smaller* angle
from the negative real axis.

Translating $\\theta\\le45^{\\circ}$ into the pole parts:

$$\\tan\\theta=\\frac{\\omega_{d}}{\\sigma_{d}}\\le\\tan45^{\\circ}=1
\\;\\Longrightarrow\\;\\omega_{d}\\le\\sigma_{d}$$

$$\\boxed{\\;\\sigma_{d}\\ge2\\quad\\text{and}\\quad \\omega_{d}\\le\\sigma_{d}\\;}$$

**The region in words:** a wedge opening leftward from the point $-2$, bounded on the
right by the vertical line $\\sigma=-2$ and above and below by lines at $\\pm45^{\\circ}$
from the negative real axis.

---

## Part (b)

| Candidate | $\\sigma_{d}$ | $\\omega_{d}$ | $T_{s}=4/\\sigma_{d}$ | $\\sigma_{d}\\ge2$? | $\\omega_{d}\\le\\sigma_{d}$? | Verdict |
|---|---|---|---|---|---|---|
| $-3\\pm j2$ | $3$ | $2$ | $\\tfrac43$ s | yes | $2\\le3$ yes | **accept** |
| $-1\\pm j1$ | $1$ | $1$ | $4$ s | **no** | $1\\le1$ yes | reject |
| $-4\\pm j6$ | $4$ | $6$ | $1$ s | yes | $6\\le4$ **no** | reject |
| $-2\\pm j2$ | $2$ | $2$ | $2$ s | yes (equality) | $2\\le2$ yes (equality) | **accept** |

$$\\boxed{\\;\\text{Acceptable: }-3\\pm j2\\;\\text{ and }\\;-2\\pm j2\\;}$$

**On the two equalities.** $-2\\pm j2$ sits exactly on **both** boundaries: $T_{s}$ is
exactly $2$ s and $\\%OS$ is exactly $100e^{-\\pi}$. Since both specifications were stated
with $\\le$, it qualifies: it is the corner point of the allowable wedge. Had the
specifications used strict inequalities it would fail both.

**Why $-1\\pm j1$ fails.** It has the correct damping: $45^{\\circ}$, so its overshoot is
exactly at the limit: but it is far too close to the imaginary axis. $T_{s}=4$ s is
double the requirement. **Correct damping, insufficient speed.**

---

## Part (c)

$$\\boxed{\\;-4\\pm j6\\;\\text{fails only the overshoot requirement.}\\;}$$

Its settling time is $T_{s}=\\tfrac44=1$ s, comfortably inside the $2$ s limit - in fact
twice as fast as required. But

$$\\frac{\\omega_{d}}{\\sigma_{d}}=\\frac{6}{4}=\\frac{3}{2}>1$$

so $\\theta>45^{\\circ}$, $\\zeta<\\dfrac{\\sqrt2}{2}$, and the overshoot is

$$100e^{-\\pi(4)/6}=100e^{-2\\pi/3}\\;>\\;100e^{-\\pi}$$

since $-\\tfrac{2\\pi}{3}>-\\pi$.

**The fix.** Keep $\\sigma_{d}=4$ and reduce the imaginary part to at most $\\omega_{d}=4$,
giving poles at $-4\\pm j4$ or anywhere below. That pole pair has $T_{s}=1$ s and
$\\%OS=100e^{-\\pi}$: it satisfies both requirements with margin on settling time.

Alternatively, hold $\\omega_{d}=6$ and push $\\sigma_{d}$ out to at least $6$, giving
$-6\\pm j6$: $T_{s}=\\tfrac23$ s and again exactly $45^{\\circ}$.

---

**What this problem is really about.** In Chapters 8 and 9 you will design compensators by
choosing where to *place* closed-loop poles. This translation: from time-domain
specifications to a region of the $s$-plane: is the step that makes that possible, and
it is the reason the constant-specification lines from problem 4-13 are standard values.
`
    },

    {
      id: "4-23", difficulty: "challenge", topic: "Zeros",
      sec: "4.8",
      prompt: `Start from $$T(s)=\\frac{25}{s^{2}+6s+25}$$ whose unit step response is $c(t)=1-e^{-3t}\\left(\\cos4t+\\tfrac34\\sin4t\\right)$ from problem 4-09.

**(a)** Using the decomposition $(s+a)C(s)=sC(s)+aC(s)$, derive the unit step response of the system with a zero added at $s=-5$, scaled to keep unity dc gain.
**(b)** Explain from your result why the overshoot increases, and predict what happens as the zero moves toward the origin.`,
      hint: "The derivative of the original step response has a very clean closed form. Compute it, then assemble the two pieces.",
      answer: "**(a)** $$c_{z}(t)=1-e^{-3t}\\left(\\cos4t-\\tfrac12\\sin4t\\right)$$ **(b)** The added derivative term is $+\\tfrac54e^{-3t}\\sin4t$, which is **positive** through the first half-cycle and so adds to the first peak. As the zero moves toward the origin ($a$ decreasing) the factor $1/a$ grows, the derivative term dominates, and overshoot increases without bound.",
      expert: `
**First glance:** the decomposition is the whole tool, and it is worth having memorized in words:

$$\\text{response with a zero}=\\text{original response}+\\frac{1}{a}\\times\\text{its own derivative}$$

Everything about zeros and transients follows from that one line.

**The derivative of an underdamped step response is pure sine** (no cosine) with a clean closed form:

$$\\dot c=\\frac{\\omega_{n}}{\\sqrt{1-\\zeta^{2}}}e^{-\\sigma_{d}t}\\sin\\omega_{d}t
=\\frac{25}{4}e^{-3t}\\sin4t$$

An expert quotes this rather than differentiating. If you do differentiate, the cosine terms cancel exactly - that cancellation is confirmation you did it right.

**Why the overshoot must increase, argued before any algebra:** $\\sin\\omega_{d}t$ is positive for $0<\\omega_{d}t<\\pi$, and the first peak occurs at exactly $\\omega_{d}t=\\pi$. So the added term is positive **throughout the entire rise and right up to the peak.** It cannot do anything but raise the peak.

**And the limiting behaviour, read off the $\\tfrac1a$ weight:** $a$ large $\\Rightarrow$ term vanishes $\\Rightarrow$ recovers 4-16. $a$ small $\\Rightarrow$ derivative dominates $\\Rightarrow$ overshoot grows without bound. One coefficient explains both ends.
`,
      solution: `
## Part (a)

**Step 1: write the system with the zero, normalized for unity dc gain.**

Adding a zero at $-5$ means multiplying by $(s+5)$. That alone would multiply the dc gain
by $5$, so divide by $5$:

$$T_{z}(s)=\\frac{s+5}{5}\\cdot\\frac{25}{s^{2}+6s+25}$$

Check: $T_{z}(0)=\\dfrac{5}{5}\\cdot\\dfrac{25}{25}=1$ ✓

**Step 2: apply the decomposition.**

With $C(s)$ the original step response transform and $a=5$:

$$C_{z}(s)=\\frac{(s+5)}{5}C(s)=\\frac{1}{5}\\Big[\\underbrace{sC(s)}_{\\to\\;\\dot c(t)}+\\underbrace{5C(s)}_{\\to\\;5c(t)}\\Big]$$

$$c_{z}(t)=\\frac{1}{5}\\dot c(t)+c(t)$$

So the response with a zero is **the original response plus a scaled copy of its own
derivative**. This is the general result, and it is why zeros affect transients at all.

**Step 3: compute $\\dot c(t)$.**

Differentiate $c(t)=1-e^{-3t}\\left(\\cos4t+\\tfrac34\\sin4t\\right)$ using the product
rule on the second term:

$$\\dot c=-\\Big[(-3)e^{-3t}\\left(\\cos4t+\\tfrac34\\sin4t\\right)+e^{-3t}\\left(-4\\sin4t+3\\cos4t\\right)\\Big]$$

$$=e^{-3t}\\Big[3\\cos4t+\\tfrac94\\sin4t+4\\sin4t-3\\cos4t\\Big]$$

The $\\cos4t$ terms cancel exactly, leaving

$$\\dot c(t)=e^{-3t}\\left(\\frac94+4\\right)\\sin4t=\\frac{25}{4}e^{-3t}\\sin4t$$

since $\\tfrac94+\\tfrac{16}{4}=\\tfrac{25}{4}$.

**Cross-check with the general formula.**

$$\\dot c=\\frac{\\omega_{n}}{\\sqrt{1-\\zeta^{2}}}e^{-\\sigma_{d}t}\\sin\\omega_{d}t
=\\frac{5}{4/5}e^{-3t}\\sin4t=\\frac{25}{4}e^{-3t}\\sin4t\\;\\checkmark$$

**Step 4: assemble.**

$$c_{z}(t)=\\frac{1}{5}\\cdot\\frac{25}{4}e^{-3t}\\sin4t+1-e^{-3t}\\left(\\cos4t+\\frac34\\sin4t\\right)$$

$$=1-e^{-3t}\\cos4t-\\frac34e^{-3t}\\sin4t+\\frac54e^{-3t}\\sin4t$$

Combine the two sine terms: $-\\tfrac34+\\tfrac54=+\\tfrac24=\\tfrac12$, so the bracket
picks up $-\\tfrac12\\sin4t$:

$$\\boxed{\\;c_{z}(t)=1-e^{-3t}\\left(\\cos4t-\\frac12\\sin4t\\right)\\;}$$

**Check.** $c_{z}(0)=1-(1-0)=0$ ✓ and $c_{z}(\\infty)=1$ ✓

---

## Part (b)

**Why overshoot increases.**

Compare the two responses term by term:

| | coefficient of $\\cos4t$ | coefficient of $\\sin4t$ |
|---|---|---|
| without zero | $-1$ | $-\\tfrac34$ |
| with zero at $-5$ | $-1$ | $+\\tfrac12$ |

The added derivative term $+\\tfrac54e^{-3t}\\sin4t$ is **positive for
$0<4t<\\pi$**: that is, throughout the entire rise and first peak, since the first peak
occurs at $T_{p}=\\pi/4$, exactly where $\\sin4t$ completes its first half-cycle.

So the derivative contribution **adds to the response precisely where the response is
already reaching its maximum**. The peak goes higher.

Expressed as single sinusoids, the transient amplitudes are:

$$\\text{without zero: }\\sqrt{1^{2}+\\left(\\tfrac34\\right)^{2}}=\\sqrt{\\tfrac{25}{16}}=\\frac54
\\qquad
\\text{with zero: }\\sqrt{1^{2}+\\left(\\tfrac12\\right)^{2}}=\\frac{\\sqrt5}{2}$$

**As the zero moves toward the origin.**

$$c_{z}(t)=c(t)+\\frac{1}{a}\\dot c(t)$$

The derivative term is weighted by $\\dfrac1a$. So:

- **$a$ large** (zero far left): $\\tfrac1a\\to0$, the derivative term vanishes, and
  $c_{z}\\to c$. This recovers the "distant zero is negligible" result of problem 4-16.
- **$a$ small** (zero near the origin): $\\tfrac1a$ grows without bound and the derivative
  term **dominates** the response. Since the derivative of a step response is a large
  positive pulse early on, the overshoot grows without bound.

Concretely, the coefficient of $\\sin 4t$ in $c_{z}$ is
$-\\tfrac34+\\tfrac{25}{4a}$. At $a=5$ it is $+\\tfrac12$; at $a=\\tfrac53$ it is
$\\tfrac{15}{4}-\\tfrac34=3$; at $a=1$ it is $\\tfrac{25}{4}-\\tfrac34=\\tfrac{11}{2}$.
Monotonically larger as the zero approaches the origin.

---

**The general statement.** A left-half-plane zero adds a scaled derivative, increasing
overshoot; the closer the zero, the greater the effect. A **right**-half-plane zero
subtracts it, producing the initial reversal of problem 4-17. Same decomposition, opposite
sign, completely different behaviour.
`
    },

    {
      id: "4-24", difficulty: "challenge", topic: "System identification",
      sec: "4.2",
      prompt: `A system is driven by a **unit step** from rest and its output is measured to be

$$c(t)=2+e^{-t}-2e^{-2t}$$

**(a)** Explain what the value $c(0^{+})$ tells you about the transfer function's structure *before* you compute anything.
**(b)** Find $G(s)$.
**(c)** Verify your answer with two independent limit checks.`,
      hint: "Evaluate $c(0^+)$ from the data first. For a strictly proper transfer function driven by a step, what must it equal?",
      answer: "**(a)** $c(0^{+})=1\\ne0$, so the numerator and denominator of $G(s)$ must have **equal degree** - $G$ is proper but not strictly proper. **(b)** $$G(s)=\\frac{s^{2}+6s+4}{s^{2}+3s+2}=\\frac{s^{2}+6s+4}{(s+1)(s+2)}$$ **(c)** $G(0)=2=c(\\infty)$ ✓ and $G(\\infty)=1=c(0^{+})$ ✓",
      expert: `
**First glance:** evaluate $c(0)$ *before doing anything else.* $2+1-2=1\\ne0$.

**That single number determines the structure of the answer.** For a unit-step input,

$$c(0^{+})=G(\\infty)$$

so a nonzero initial value means $\\deg N=\\deg D$ - the transfer function is proper but **not strictly proper**, with leading coefficients in ratio 1.

Every second-order system earlier in this chapter started at zero. This one does not, and knowing that in advance tells you the $s^{2}$ terms will **survive** the numerator collection rather than cancel. In problem 2-24 they cancelled, because that response started at rest. Same algebra, opposite expectation, decided by one arithmetic evaluation.

**Poles straight off the exponents:** $e^{-t}$, $e^{-2t}$ $\\Rightarrow$ denominator $(s+1)(s+2)$. Written down immediately.

**The two-limit close-out, which pins both ends of the time axis:**

$$G(0)=\\tfrac42=2=c(\\infty)\\;\\checkmark
\\qquad
G(\\infty)=\\tfrac11=1=c(0^{+})\\;\\checkmark$$

**What it means physically:** long division gives $G=1+\\tfrac{3s+2}{(s+1)(s+2)}$ - a direct feedthrough plus a strictly proper part. Some of the input reaches the output without passing through any energy-storage element. And note the zeros $-3\\pm\\sqrt5$ are both left-half-plane, so despite the jump this is **not** nonminimum phase.
`,
      solution: `
## Part (a)

**Evaluate the data at $t=0$.**

$$c(0)=2+e^{0}-2e^{0}=2+1-2=1$$

**This is the content of the problem.** For a system driven by a unit step from rest,

$$c(0^{+})=\\lim_{s\\to\\infty}sC(s)=\\lim_{s\\to\\infty}s\\cdot\\frac{1}{s}G(s)=\\lim_{s\\to\\infty}G(s)=G(\\infty)$$

So **the initial value of the step response equals $G(\\infty)$.**

- If $\\deg N<\\deg D$ (strictly proper), $G(\\infty)=0$ and the response must start at
  zero.
- If $\\deg N=\\deg D$, $G(\\infty)$ equals the ratio of leading coefficients - a finite
  nonzero number.

Here $c(0^{+})=1\\ne0$, so

$$\\boxed{\\;\\deg N=\\deg D,\\;\\text{and the leading coefficient ratio is }1\\;}$$

Every second-order system you have met so far in this chapter had a constant numerator and
therefore started at zero. This one does not, and knowing that before you start tells you
what shape of answer to expect: and warns you that you will need long division or a
$\\delta$-free assembly.

---

## Part (b)

**Step 1: transform the response.**

$$C(s)=\\frac{2}{s}+\\frac{1}{s+1}-\\frac{2}{s+2}$$

**Step 2: combine over the common denominator $s(s+1)(s+2)$.**

$$C(s)=\\frac{2(s+1)(s+2)+s(s+2)-2s(s+1)}{s(s+1)(s+2)}$$

Expand each piece separately:

- $2(s+1)(s+2)=2\\left(s^{2}+3s+2\\right)=2s^{2}+6s+4$
- $s(s+2)=s^{2}+2s$
- $-2s(s+1)=-2s^{2}-2s$

Collect by power:

| Power | Terms | Total |
|---|---|---|
| $s^{2}$ | $2+1-2$ | $1$ |
| $s^{1}$ | $6+2-2$ | $6$ |
| $s^{0}$ | $4$ | $4$ |

$$C(s)=\\frac{s^{2}+6s+4}{s(s+1)(s+2)}$$

**Note what did *not* happen.** In problem 2-24 the $s^{2}$ terms cancelled, because that
response started at zero. Here they do **not** cancel - the surviving $s^{2}$ is exactly
the structural feature predicted in part (a).

**Step 3: divide by the input transform.** With $R(s)=\\dfrac1s$, multiply by $s$:

$$G(s)=s\\cdot\\frac{s^{2}+6s+4}{s(s+1)(s+2)}=\\frac{s^{2}+6s+4}{(s+1)(s+2)}$$

$$\\boxed{\\;G(s)=\\frac{s^{2}+6s+4}{s^{2}+3s+2}\\;}$$

---

## Part (c)

**Check 1: dc gain against the final value.**

$$G(0)=\\frac{0+0+4}{0+0+2}=\\frac{4}{2}=2$$

From the data, $c(\\infty)=2+0-0=2$ ✓

**Check 2: high-frequency gain against the initial value.**

$$G(\\infty)=\\lim_{s\\to\\infty}\\frac{s^{2}+6s+4}{s^{2}+3s+2}=\\frac{1}{1}=1$$

From the data, $c(0^{+})=1$ ✓

Two independent limits, both matching. Together they pin down the behaviour at both ends
of the time axis.

---

**What kind of system is this?** Since $\\deg N=\\deg D$, long division gives

$$G(s)=1+\\frac{3s+2}{s^{2}+3s+2}=1+\\frac{3s+2}{(s+1)(s+2)}$$

a direct feedthrough of $1$ plus a strictly proper part. The feedthrough is what lets the
output jump instantaneously when the input does. Physically this is a system where some of
the input reaches the output without passing through any energy-storage element: a
resistive path in a circuit, or a lever rigidly coupling input to output.

**The zeros, for completeness.** $s^{2}+6s+4=0$ has discriminant $36-16=20$, so

$$s=\\frac{-6\\pm\\sqrt{20}}{2}=\\frac{-6\\pm2\\sqrt5}{2}=-3\\pm\\sqrt5$$

Both in the left half-plane (since $\\sqrt5<3$), so this is **not** a nonminimum-phase
system despite its unusual initial jump.
`
    },

    {
      id: "4-25", difficulty: "challenge", topic: "Design from specifications",
      sec: "4.6",
      prompt: `A translational mechanical system consists of a mass $M=1$ kg connected to a wall by a spring $K$ and a viscous damper $f_{v}$ in parallel, with force $f(t)$ applied to the mass and displacement $x(t)$ as the output.

**(a)** Write $\\dfrac{X(s)}{F(s)}$ symbolically and express $\\omega_{n}$ and $\\zeta$ in terms of $M$, $f_{v}$, $K$.
**(b)** Choose $f_{v}$ and $K$ so that the system settles in $T_{s}=2$ s with $\\%OS=100e^{-\\pi}$.
**(c)** With those values, what is the steady-state displacement under a constant $16$ N force, and what is the peak time?`,
      hint: "Chapter 2 gives you the transfer function; Chapter 4 gives you the specifications. Work the overshoot requirement first, because it fixes $\\zeta$ alone.",
      answer: "**(a)** $\\dfrac{X}{F}=\\dfrac{1}{Ms^{2}+f_{v}s+K}$, with $\\omega_{n}=\\sqrt{K/M}$ and $\\zeta=\\dfrac{f_{v}}{2\\sqrt{KM}}$. **(b)** $f_{v}=4$ N-s/m and $K=8$ N/m, giving poles $-2\\pm j2$. **(c)** $x_{ss}=2$ m and $T_{p}=\\dfrac{\\pi}{2}$ s.",
      expert: `
**First glance:** this is Chapter 2 and Chapter 4 bolted together. Get the transfer function, normalize it, then run the specifications backwards.

**The step people skip, and it invalidates everything after it:** you cannot read $\\omega_{n}$ and $\\zeta$ off $Ms^{2}+f_{v}s+K$. The leading coefficient must be 1. Divide through by $M$ first:

$$\\omega_{n}=\\sqrt{\\frac{K}{M}},\\qquad \\zeta=\\frac{f_{v}}{2\\sqrt{KM}}$$

With $M=1$ they happen to coincide with the raw coefficients, which is exactly why the habit must be built on problems where they do not.

**Order of operations is forced:** $\\%OS\\to\\zeta$ first (it depends on nothing else), then $T_{s}\\to\\omega_{n}$, then hardware. Recognize $100e^{-\\pi}\\Rightarrow\\zeta=\\tfrac{\\sqrt2}{2}$ instantly.

**The surd arithmetic, done cleanly:** $\\omega_{n}=\\tfrac{2}{\\sqrt2/2}=\\tfrac{4}{\\sqrt2}=2\\sqrt2$, so $K=M\\omega_{n}^{2}=8$ and $f_{v}=2\\zeta\\sqrt{KM}=\\sqrt2\\cdot2\\sqrt2=4$. Rationalize as you go rather than at the end.

**Verify by rebuilding:** $s^{2}+4s+8=(s+2)^{2}+4$, poles $-2\\pm j2$: equal parts, so $45^{\\circ}$, so $\\%OS=100e^{-\\pi}$ ✓ and $T_{s}=\\tfrac42=2$ ✓ Round-tripping is the fastest confirmation.

**The design lesson:** two specs consumed both free parameters exactly. $T_{p}$ and $x_{ss}$ then followed with no choice left. A third requirement would have no knob to turn - which is the argument for compensation.
`,
      solution: `
## Part (a)

**From Chapter 2**, summing impedances for a single mass:

$$\\left(Ms^{2}+f_{v}s+K\\right)X(s)=F(s)
\\;\\Longrightarrow\\;
\\frac{X(s)}{F(s)}=\\frac{1}{Ms^{2}+f_{v}s+K}$$

**To read $\\omega_{n}$ and $\\zeta$, the leading coefficient must be 1.** Divide top and
bottom by $M$:

$$\\frac{X(s)}{F(s)}=\\frac{1/M}{s^{2}+\\dfrac{f_{v}}{M}s+\\dfrac{K}{M}}$$

Now compare with $s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}$:

$$\\omega_{n}^{2}=\\frac{K}{M}\\;\\Longrightarrow\\;\\boxed{\\omega_{n}=\\sqrt{\\frac{K}{M}}}$$

$$2\\zeta\\omega_{n}=\\frac{f_{v}}{M}\\;\\Longrightarrow\\;
\\zeta=\\frac{f_{v}}{2M\\omega_{n}}=\\frac{f_{v}}{2M\\sqrt{K/M}}=\\boxed{\\frac{f_{v}}{2\\sqrt{KM}}}$$

**Skipping the divide-by-$M$ step is the classic error here.** Reading $\\omega_{n}^{2}=K$
straight off $Ms^{2}+f_{v}s+K$ is wrong unless $M=1$.

---

## Part (b)

**Step 1: overshoot fixes $\\zeta$, and only $\\zeta$.**

From problem 4-12, $\\%OS=100e^{-\\pi}$ corresponds exactly to

$$\\zeta=\\frac{\\sqrt2}{2}$$

**Step 2: settling time then fixes $\\omega_{n}$.**

$$T_{s}=\\frac{4}{\\zeta\\omega_{n}}=2\\;\\Longrightarrow\\;\\zeta\\omega_{n}=2$$

$$\\omega_{n}=\\frac{2}{\\zeta}=\\frac{2}{\\sqrt2/2}=\\frac{4}{\\sqrt2}=\\frac{4\\sqrt2}{2}=2\\sqrt2\\ \\text{rad/s}$$

**Step 3: back out $K$.**

$$\\omega_{n}=\\sqrt{\\frac{K}{M}}\\;\\Longrightarrow\\;K=M\\omega_{n}^{2}=(1)\\left(2\\sqrt2\\right)^{2}=(1)(4\\cdot2)=8\\ \\text{N/m}$$

**Step 4: back out $f_{v}$.**

$$\\zeta=\\frac{f_{v}}{2\\sqrt{KM}}\\;\\Longrightarrow\\;
f_{v}=2\\zeta\\sqrt{KM}=2\\cdot\\frac{\\sqrt2}{2}\\cdot\\sqrt{(8)(1)}=\\sqrt2\\cdot2\\sqrt2=2\\cdot2=4\\ \\text{N-s/m}$$

using $\\sqrt8=2\\sqrt2$ and $\\sqrt2\\cdot\\sqrt2=2$.

$$\\boxed{\\;f_{v}=4\\ \\text{N-s/m},\\qquad K=8\\ \\text{N/m}\\;}$$

**Verify by building the transfer function.**

$$\\frac{X(s)}{F(s)}=\\frac{1}{s^{2}+4s+8}$$

Complete the square: $s^{2}+4s+8=(s+2)^{2}+4$, so the poles are $-2\\pm j2$.

- $\\sigma_{d}=2\\Rightarrow T_{s}=\\tfrac42=2$ s ✓
- $\\sigma_{d}=\\omega_{d}=2\\Rightarrow45^{\\circ}\\Rightarrow\\%OS=100e^{-\\pi}$ ✓

---

## Part (c)

**Steady-state displacement under $f=16$ N.**

$$x_{ss}=G(0)\\times f=\\frac{1}{K}\\times16=\\frac{16}{8}=2\\ \\text{m}$$

Physically: at steady state nothing is moving, so the damper exerts no force and the mass
no inertial force. The entire $16$ N is carried by the spring, and $x=f/K=16/8=2$ m.

**Peak time.**

$$T_{p}=\\frac{\\pi}{\\omega_{d}}=\\frac{\\pi}{2}\\ \\text{s}$$

$$\\boxed{\\;x_{ss}=2\\ \\text{m},\\qquad T_{p}=\\frac{\\pi}{2}\\ \\text{s}\\;}$$

---

**What this problem demonstrates.** The specifications $T_{s}$ and $\\%OS$ live in the
time domain; $f_{v}$ and $K$ are hardware. Chapter 2 built the bridge from hardware to
$G(s)$; Chapter 4 built the bridge from $G(s)$ to specifications. Composed, they let you
**size physical components from performance requirements** - which is the
engineering point of the first four chapters.

**The design freedom you did not have.** With $M$ fixed, two specifications consumed both
remaining parameters exactly. Peak time and steady-state displacement then followed
without any choice on your part. If a third specification had been imposed - say
$T_{p}\\le1$ s: you would need $\\omega_{d}\\ge\\pi$, and since $\\omega_{d}=2$ here that
would fail. The only remedy would be changing $M$, or adding a controller. That is the
argument for Chapter 9.
`
    },

    {
      id: "4-26", difficulty: "challenge", topic: "Second-order systems",
      sec: "4.4",
      prompt: `A classmate reads $G(s)=\\dfrac{20}{2s^{2}+4s+20}$ as $\\omega_n=\\sqrt{20}$ and $\\zeta=4/(2\\sqrt{20})$.

Correct them, then compute $\\omega_n$ and $\\zeta$.`,
      hint: "Leading coefficient of the denominator must be $1$.",
      answer: "Divide by $2$ first: $G=10/(s^{2}+2s+10)$. Then $\\omega_n=\\sqrt{10}$, $\\zeta=1/\\sqrt{10}$.",
      expert: `
**First glance:** $2s^{2}$ is the trap. $\\omega_n^{2}$ is the *normalized* constant term.

**Path:** $s^{2}+2s+10$, $\\omega_n=\\sqrt{10}$, $2\\zeta\\omega_n=2$ so $\\zeta=1/\\omega_n=1/\\sqrt{10}$.
`,
      solution: `
$$G(s)=\\frac{20}{2s^{2}+4s+20}=\\frac{10}{s^{2}+2s+10}.$$

$$\\omega_n=\\sqrt{10},\\qquad 2\\zeta\\omega_n=2\\quad\\Rightarrow\\quad \\zeta=\\frac{1}{\\sqrt{10}}.$$

Using $\\sqrt{20}$ treats the un-normalized polynomial as if it were monic. The poles of $2s^{2}+4s+20=0$ are the same as $s^{2}+2s+10=0$, so the geometry never agreed with $\\sqrt{20}$.
`
    },
    {
      id: "4-27", difficulty: "challenge", topic: "Design from specifications",
      sec: "4.6",
      prompt: `A second-order pair must satisfy $T_s\\le 1$ s and $\\%OS\\le 100e^{-\\pi}$ (that is, $\\zeta\\ge \\sqrt{2}/2$).

Can both be met with $\\omega_n=3$? If not, what is the smallest $\\omega_n$ that works?`,
      hint: "$T_s=4/(\\zeta\\omega_n)$. The tighter $\\zeta$ makes $T_s$ larger for fixed $\\omega_n$.",
      answer: "No. At $\\zeta=\\sqrt{2}/2$ and $\\omega_n=3$, $T_s=4/(\\tfrac{\\sqrt{2}}{2}\\cdot 3)=8/(3\\sqrt{2})\\approx 1.89>1$. Need $\\zeta\\omega_n\\ge 4$, so $\\omega_n\\ge 4\\sqrt{2}$ at this $\\zeta$.",
      expert: `
**First glance:** $T_s$ is a vertical line $\\sigma_d=4$. $\\zeta=\\sqrt{2}/2$ is a $45^{\\circ}$ ray. Their intersection is $\\omega_n=4\\sqrt{2}$.

**Path:** $\\omega_n=3$ sits inside the $\\zeta$ wedge only if $\\sigma_d=\\zeta\\omega_n\\ge 3/\\sqrt{2}\\approx 2.12<4$. Too close to the axis.
`,
      solution: `
$\\%OS\\le 100e^{-\\pi}$ means $\\zeta\\ge \\sqrt{2}/2$, so the poles lie inside the $45^{\\circ}$ wedge.

$T_s\\le 1$ means $\\sigma_d=\\zeta\\omega_n\\ge 4$.

On the wedge boundary, $\\sigma_d=\\omega_n/\\sqrt{2}$, so $\\omega_n/\\sqrt{2}\\ge 4$, $\\omega_n\\ge 4\\sqrt{2}\\approx 5.66$.

$\\omega_n=3$ cannot reach $\\sigma_d=4$ at any $\\zeta\\le 1$. Even critically damped, $\\sigma_d=3<4$.
`
    },
    {
      id: "4-28", difficulty: "challenge", topic: "Pole dominance",
      sec: "4.7",
      prompt: `$$G(s)=\\frac{36\\cdot 10}{(s^{2}+2\\cdot 0.5\\cdot 6\\, s+36)(s+10)}=\\frac{360}{(s^{2}+6s+36)(s+10)}.$$

Is the real pole negligible by the five-times rule? Estimate $\\%OS$ as if it were, then state the direction of the error that the neglected pole introduces.`,
      hint: "Compare $10$ to $\\sigma_d=3$. Extra real poles pull overshoot *down*.",
      answer: "No: $10/3\\approx 3.3<5$. Treating it as second order gives $\\zeta=0.5$, $\\%OS=100e^{-\\pi/\\sqrt{3}}$. The real pole, being too close, will reduce the actual overshoot below that estimate.",
      expert: `
**First glance:** $\\sigma_d=3$, third pole at $-10$, ratio $3.3$. The rule fails.

**Check:** a left-half-plane pole is a lag. It slows the rise and trims the peak. The second-order $\\%OS$ is an upper bound here, not a prediction.
`,
      solution: `
The quadratic is $s^{2}+6s+36$, so $\\omega_n=6$, $\\zeta=1/2$, $\\sigma_d=3$.

Five-times wants the extra pole at least at $-15$. It sits at $-10$. Do not drop it for a grade-level $\\%OS$ claim.

If you drop it anyway you get $\\%OS=100e^{-\\pi/\\sqrt{3}}\\approx 16\\%$. The ignored pole removes high-frequency content from the rise, so the true peak is *smaller*.
`
    },
    {
      id: "4-29", difficulty: "challenge", topic: "Zeros",
      sec: "4.8",
      prompt: `A closed-loop system is $\\dfrac{36(s+z)}{z(s^{2}+6s+36)}$ with $z>0$.

For $z=3$ versus $z=30$, which case has more overshoot, and why, without computing $c(t)$?`,
      hint: "A zero is a weighted derivative of the zero-free response. Closer zeros mean heavier derivative.",
      answer: "More overshoot at $z=3$. The zero is closer to the imaginary axis, so the $c_{\\text{zero-free}}+\\frac{1}{z}\\dot c_{\\text{zero-free}}$ mix puts more weight on the derivative, which peaks earlier and higher.",
      expert: `
**First glance:** both have the same poles. Only the zero moves. Overshoot is an amplitude effect.

**Path:** $C(s)=\\big(1+s/z\\big)C_{\\text{nf}}(s)$ for a step into the no-zero system scaled to the same DC. Small $z$ is a large $1/z$.
`,
      solution: `
Write the no-zero step response as $c_{\\text{nf}}(t)$, DC gain $1$. Then

$$c(t)=c_{\\text{nf}}(t)+\\frac{1}{z}\\dot c_{\\text{nf}}(t).$$

$\\dot c_{\\text{nf}}$ is a signed pulse around the rise. Adding a large multiple of it ($z=3$) lifts the peak. $z=30$ is a small multiple; the response is nearly $c_{\\text{nf}}$.

Same poles, different residues. That is the whole content of a zero.
`
    },
    {
      id: "4-30", difficulty: "challenge", topic: "System identification",
      sec: "4.6",
      prompt: `A step test on an unknown underdamped plant shows $T_p=0.5$ s, $T_s=2$ s, and a peak of $1.16$ when the final value is $1$.

Is this consistent with a *pure* second-order model? If you must pick one pair $(\\zeta,\\omega_n)$ anyway, which two of the three numbers would you trust first, and why?`,
      hint: "Pure second order: $\\%OS$ fixes $\\zeta$, $T_s$ fixes $\\sigma_d$, $T_p$ fixes $\\omega_d$. Check whether $\\zeta=\\sigma_d/\\omega_n$ agrees.",
      answer: "$\\%OS=16\\%$ is $\\zeta\\approx 0.5$. $T_s=2$ gives $\\sigma_d=2$. $T_p=0.5$ gives $\\omega_d=2\\pi\\approx 6.28$. Then $\\omega_n\\approx 6.6$ and $\\zeta=\\sigma_d/\\omega_n\\approx 0.30$, which does not match $0.5$. The three numbers are inconsistent with one pair. Trust $T_s$ and $T_p$ for the pole *location*; treat extra overshoot or extra damping as a zero or a third pole.",
      expert: `
**First glance:** three measurements, two parameters. A contradiction is information: the plant is not that pair.

**Path:** $\\sigma_d=4/T_s=2$, $\\omega_d=\\pi/T_p=2\\pi$. That *is* a pole location. $\\%OS$ then has to match $\\sigma_d/\\omega_d=1/\\pi$, i.e. $\\zeta=1/\\sqrt{1+\\pi^{2}}\\approx 0.30$, not $0.5$. The overshoot is too small for those poles, which is what an extra left-half-plane pole would do.
`,
      solution: `
Pure second order has only two degrees of freedom. Three independent specs overdetermine it.

From time locations:

$$\\sigma_d=\\frac{4}{2}=2,\\qquad \\omega_d=\\frac{\\pi}{0.5}=2\\pi.$$

Those poles have $\\zeta=\\sigma_d/\\omega_n=2/\\sqrt{4+4\\pi^{2}}\\approx 0.30$, so $\\%OS\\approx 100e^{-\\pi\\cdot 0.30/\\sqrt{1-0.09}}\\approx 37\\%$, not $16\\%$.

The peak is too low for the observed $T_p$ and $T_s$. A nearby real pole (Chapter 4.6) or a far zero is in the plant. Report the pole pair from $T_s$ and $T_p$, then explain the missing overshoot separately.
`
    }

  ]
});