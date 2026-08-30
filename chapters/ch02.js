registerChapter({
  id: 2,
  title: "Modeling in the Frequency Domain",
  sections: "2.1–2.5, 2.10–2.11",
  brief: "A transfer function separates input, system, and output so $C(s)=R(s)G(s)$. Poles are the modes; zeros only set residues. Impedances turn circuit and mechanical laws into the same algebra. Linearization is how a nonlinear plant earns a $G(s)$ near one operating point.",
  sectionList: [
    { id: "2.1", title: "Introduction" },
    { id: "2.2", title: "Laplace Transform Review" },
    { id: "2.3", title: "The Transfer Function" },
    { id: "2.4", title: "Electrical Network Transfer Functions" },
    { id: "2.5", title: "Translational Mechanical System Transfer Functions" },
    { id: "2.10", title: "Nonlinearities" },
    { id: "2.11", title: "Linearization" }
  ],

  guide: [
    {
      title: "What this chapter is for",
      example: "2-05",
      sec: "2.1",
      body: `
Every physical system you will control is described, at bottom, by a differential
equation. Differential equations are honest but useless for design, because they **tangle
the input, the system, and the output into a single expression.** You cannot point at a
differential equation and say "that part is the plant." You cannot connect two of them by
multiplying. You cannot change a parameter and see the effect on the response without
solving the whole thing again.

Chapter 2 fixes exactly that. It builds a representation in which

$$\\text{input}\\;\\times\\;\\text{system}\\;=\\;\\text{output}$$

is literally true: three separate objects, joined by multiplication.

$$\\boxed{\\;C(s)=R(s)\\,G(s)\\;}$$

Everything else in the chapter is machinery in service of that one sentence. The Laplace
transform is how you get there. Partial fractions are how you get back. Impedances and
free-body diagrams are how you build $G(s)$ from hardware. Linearization is what you do
when the hardware refuses to cooperate.

**The strategy, start to finish:**

$$\\underbrace{\\text{physical system}}_{\\text{circuit, masses}}
\\;\\to\\;\\underbrace{\\text{differential equations}}_{\\text{Kirchhoff, Newton}}
\\;\\to\\;\\underbrace{G(s)}_{\\text{algebra}}
\\;\\to\\;\\underbrace{c(t)}_{\\text{partial fractions}}$$

with a shortcut (impedances) that skips the middle step entirely once you trust it.`
    },
    {
      title: "Why the Laplace transform works at all",
      example: "2-01",
      sec: "2.2",
      body: `
Most courses present the transform as a definition to be accepted. It is worth
understanding *why* it turns calculus into algebra, because that reason explains every
property you will use.

### The exponential is the special function of calculus

Ask: is there a function that differentiation does not really change? Only one family:

$$\\frac{d}{dt}e^{st}=s\\,e^{st}$$

Differentiating $e^{st}$ gives back **the same function, multiplied by a number.** No
other elementary function does this. Sines and cosines turn into each other; polynomials
change degree; only the exponential survives differentiation intact.

That is the mechanism. If you can rewrite an arbitrary signal as a sum of exponentials,
then differentiating that signal becomes *multiplying each piece by its own $s$* - and
multiplication is algebra.

### What the transform actually computes

$$\\mathcal{L}\\{f(t)\\}=F(s)=\\int_{0^-}^{\\infty}f(t)\\,e^{-st}\\,dt$$

Read this as a **measurement**. For each complex number $s$, the integral asks: *how much
of the building block $e^{st}$ is contained in $f(t)$?* The answer, collected over all
$s$, is $F(s)$.

So $F(s)$ is not a different function in disguise. It is the same signal, written in a
different alphabet: the alphabet of exponentials instead of the alphabet of time.

### Why $s$ is complex

With $s=\\sigma+j\\omega$,

$$e^{st}=e^{\\sigma t}e^{j\\omega t}=\\underbrace{e^{\\sigma t}}_{\\text{envelope}}\\big(\\cos\\omega t+j\\sin\\omega t\\big)$$

The building blocks are **exponentially growing or decaying sinusoids.** The real part
$\\sigma$ sets the envelope; the imaginary part $\\omega$ sets the oscillation. Between
them they can describe a constant ($\\sigma=\\omega=0$), a pure decay ($\\omega=0$), a pure
sinusoid ($\\sigma=0$), and everything in between.

**This is why the $s$-plane is a map of behaviour**, and it is why the whole rest of the
course is spent looking at where things sit in it.

### The lower limit $0^{-}$

Integration starts just before zero so that an impulse sitting exactly at $t=0$ is
captured. This also means you only ever need initial conditions from *before* a
discontinuity: a genuine convenience over classical differential-equation methods, where
you must work out the conditions just after.`
    },
    {
      title: "Reading $F(s)$ before you compute anything",
      example: "2-04",
      sec: "2.2",
      body: `
A rational function

$$F(s)=\\frac{N(s)}{D(s)}$$

carries its answer on its face if you know how to look.

### Poles

The roots of $D(s)$. At a pole, $F(s)$ blows up: which means the system can produce a
nonzero output with vanishing input. That is exactly what a **natural mode** is: a motion
the system will execute on its own.

Each pole contributes one term to the time response:

| Pole | Time term | Behaviour |
|---|---|---|
| $s=0$ | constant | never decays |
| $s=-a$ (real) | $e^{-at}$ | decays, no oscillation |
| $s=+a$ (real) | $e^{+at}$ | **grows**: unstable |
| $s=-\\sigma\\pm j\\omega$ | $e^{-\\sigma t}\\cos(\\omega t+\\phi)$ | damped oscillation |
| $s=\\pm j\\omega$ | $\\cos(\\omega t+\\phi)$ | oscillates forever |
| repeated $s=-a$ | $t^{k}e^{-at}$ | polynomial $\\times$ decay |

**Distance from the imaginary axis is speed.** A pole at $-10$ produces a term that dies
ten times faster than one at $-1$.

### Zeros

The roots of $N(s)$. At a zero, $F(s)$ vanishes: that particular exponential is *absent*
from the signal.

**Zeros do not create or destroy terms. They set how strongly each term appears.** This
is the single most useful structural fact in the chapter, and it is why you can write

$$C(s)=\\frac{s+3}{s(s+1)(s+5)}\\;\\Longrightarrow\\;c(t)=A+Be^{-t}+Ce^{-5t}$$

without computing a single residue. Four poles would give four terms; the zero changes
only $A$, $B$, $C$.

### Why this matters for exams

Many questions ask only for the *form* of a response, which pole *dominates*, or whether
something oscillates. All three are answered by inspecting poles. Reaching for partial
fractions on those questions is wasted work.`
    },
    {
      title: "The transform pairs: derive two, recognize the rest",
      example: "2-02",
      sec: "2.2",
      body: `
You should be able to derive the first few from the definition; the rest follow by
pattern.

### The step

$$\\mathcal{L}\\{u(t)\\}=\\int_{0}^{\\infty}(1)e^{-st}dt=\\left[\\frac{e^{-st}}{-s}\\right]_{0}^{\\infty}=0-\\left(\\frac{1}{-s}\\right)=\\frac{1}{s}$$

### The exponential: and why it just shifts $s$

$$\\mathcal{L}\\{e^{-at}\\}=\\int_{0}^{\\infty}e^{-at}e^{-st}dt=\\int_{0}^{\\infty}e^{-(s+a)t}dt=\\frac{1}{s+a}$$

Notice the mechanism: multiplying by $e^{-at}$ in time simply **replaced $s$ with $s+a$**
in the exponent. That is not a coincidence for this one function - it happens for *any*
$f(t)$, and it is the frequency-shift theorem.

### The core table

| $f(t)$ | $F(s)$ |
|---|---|
| $\\delta(t)$ | $1$ |
| $u(t)$ | $\\dfrac{1}{s}$ |
| $t\\,u(t)$ | $\\dfrac{1}{s^{2}}$ |
| $t^{n}u(t)$ | $\\dfrac{n!}{s^{n+1}}$ |
| $e^{-at}u(t)$ | $\\dfrac{1}{s+a}$ |
| $\\sin\\omega t\\;u(t)$ | $\\dfrac{\\omega}{s^{2}+\\omega^{2}}$ |
| $\\cos\\omega t\\;u(t)$ | $\\dfrac{s}{s^{2}+\\omega^{2}}$ |

### The derived pairs you actually use most

Apply the frequency shift to the last three:

| $f(t)$ | $F(s)$ |
|---|---|
| $e^{-at}\\sin\\omega t$ | $\\dfrac{\\omega}{(s+a)^{2}+\\omega^{2}}$ |
| $e^{-at}\\cos\\omega t$ | $\\dfrac{s+a}{(s+a)^{2}+\\omega^{2}}$ |
| $t^{n}e^{-at}$ | $\\dfrac{n!}{(s+a)^{n+1}}$ |

**Why $\\delta(t)\\to1$ is the deepest entry in the table.** An impulse contains *every*
exponential in equal measure: it is perfectly "flat" in $s$. That is precisely why an
impulse is used to identify a system: hit it with everything at once, and whatever comes
back is the system's own behaviour, uncontaminated by the input.

### The two errors that never stop happening

- $\\mathcal{L}\\{t^{n}\\}=n!/s^{n+1}$, **not** $1/s^{n+1}$. So $\\mathcal{L}\\{t^{2}\\}=2/s^{3}$.
- Sine puts $\\omega$ on top; cosine puts $s$ on top. Swapping them changes what your
  response does at $t=0$.`
    },
    {
      title: "The theorems, and the one that matters most",
      example: "2-12",
      sec: "2.2",
      body: `
| Theorem | Statement |
|---|---|
| Linearity | $\\mathcal{L}\\{k_{1}f_{1}+k_{2}f_{2}\\}=k_{1}F_{1}+k_{2}F_{2}$ |
| Frequency shift | $\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$ |
| Time shift | $\\mathcal{L}\\{f(t-T)\\}=e^{-sT}F(s)$ |
| Differentiation | $\\mathcal{L}\\{\\dot f\\}=sF(s)-f(0^-)$ |
| Second derivative | $\\mathcal{L}\\{\\ddot f\\}=s^{2}F(s)-sf(0^-)-\\dot f(0^-)$ |
| Integration | $\\mathcal{L}\\left\\{\\int_{0^-}^{t}f\\,d\\tau\\right\\}=\\dfrac{F(s)}{s}$ |
| Final value | $f(\\infty)=\\lim_{s\\to0}sF(s)$ |
| Initial value | $f(0^+)=\\lim_{s\\to\\infty}sF(s)$ |

### Where the differentiation theorem comes from

Integrate the definition by parts with $u=e^{-st}$, $dv=\\dot f\\,dt$:

$$\\mathcal{L}\\{\\dot f\\}=\\left[f(t)e^{-st}\\right]_{0^-}^{\\infty}+s\\int_{0^-}^{\\infty}f(t)e^{-st}dt=-f(0^-)+sF(s)$$

The $-f(0^-)$ is a **boundary term**: it is the memory of where the signal started. This
is why initial conditions appear in the transform at all, and why setting them to zero
makes them vanish.

### The consequence that runs the whole course

With zero initial conditions the theorems collapse to a substitution you do by eye:

$$\\frac{d^{n}}{dt^{n}}\\;\\longrightarrow\\;s^{n}$$

An $n$th-order differential equation becomes an $n$th-degree polynomial equation. That
substitution is used dozens of times in this chapter and it never gets harder than this.

### Integration is division by $s$

This is the same fact read backwards, and it is why a pole at the origin behaves like an
integrator: a point you will use constantly from Chapter 7 onward.

### The final value theorem has a precondition

Valid **only** if every root of the denominator of $sF(s)$ has negative real part.
Applied blindly to $\\dfrac{\\omega}{s^{2}+\\omega^{2}}$ it returns $0$, but
$\\sin\\omega t$ never settles. **Find the poles, then decide whether the theorem is
allowed**: never the reverse.`
    },
    {
      title: "Partial fractions as modal decomposition",
      example: "2-07",
      sec: "2.2",
      body: `
Getting back to $c(t)$ means splitting $C(s)$ into pieces the table recognizes. But the
split is not bookkeeping - **each piece is one natural mode of the system, and its
numerator is how strongly that mode was excited.** That is why the technique is worth
doing well.

### Step 0: check the degrees first

If $\\deg N\\ge\\deg D$, long-divide before anything else. The quotient inverts to $\\delta(t)$
and its derivatives. Skipping this produces residues that silently fail to reconstruct
the original.

### Case 1: real, distinct poles

$$F(s)=\\frac{N(s)}{(s+p_{1})\\cdots(s+p_{n})}=\\sum_{m}\\frac{K_{m}}{s+p_{m}}$$

**Cover-up method:** to get $K_{m}$, cover the factor $(s+p_{m})$ in $F(s)$ and evaluate
what remains at $s=-p_{m}$:

$$K_{m}=\\Big[(s+p_{m})F(s)\\Big]_{s\\to-p_{m}}$$

*Why it works:* multiplying through by $(s+p_{m})$ kills every other term when you then
set $s=-p_{m}$, because each of those terms still carries a factor of $(s+p_{m})$.

**Free check:** if $\\deg D-\\deg N\\ge2$, the residues **must sum to zero**: which also
tells you $f(0)=0$ without any theorem.

### Case 2: repeated poles

A factor to the power $r$ generates $r$ terms with descending powers. With
$F_{1}(s)=(s+p_{1})^{r}F(s)$:

$$K_{i}=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_{1}(s)}{ds^{\\,i-1}}\\right|_{s\\to-p_{1}}$$

*Why derivatives appear:* the cover-up trick isolates only the highest-power term.
Differentiating peels off one power at a time to expose the next one down.

**Signature:** a repeated pole always produces $t^{k}e^{-at}$. If your answer to a
repeated-root problem has no polynomial multiplying an exponential, a term was dropped.

### Case 3: complex poles

**Test the discriminant first.** Negative means complex, means *do not factor*. Keep the
quadratic whole with a linear numerator:

$$F(s)=\\frac{K_{1}}{s+p_{1}}+\\frac{K_{2}s+K_{3}}{s^{2}+as+b}$$

Find $K_{1}$ by cover-up, clear fractions, balance coefficients of like powers. Then
complete the square,

$$s^{2}+as+b=\\left(s+\\frac{a}{2}\\right)^{2}+\\left(b-\\frac{a^{2}}{4}\\right)$$

and split the numerator to match

$$\\mathcal{L}\\left\\{Ae^{-at}\\cos\\omega t+Be^{-at}\\sin\\omega t\\right\\}=\\frac{A(s+a)+B\\omega}{(s+a)^{2}+\\omega^{2}}$$

**Worked example.** For $F(s)=\\dfrac{3}{s\\left(s^{2}+2s+5\\right)}$: discriminant
$4-20<0$, so Case 3. Cover-up gives $K_{1}=\\tfrac35$. Balancing coefficients gives
$K_{2}=-\\tfrac35$, $K_{3}=-\\tfrac65$, so

$$F(s)=\\frac{3/5}{s}-\\frac{3}{5}\\cdot\\frac{s+2}{(s+1)^{2}+2^{2}}$$

Split $s+2=(s+1)+\\tfrac12(2)$, giving

$$f(t)=\\frac{3}{5}-\\frac{3}{5}e^{-t}\\left(\\cos2t+\\frac12\\sin2t\\right)$$

### The physical reading

The residue at a pole is **how much of that mode the input excited.** A large residue on
a slowly decaying pole dominates the response; a tiny residue on a fast pole is
invisible. This is the entire basis of the dominance arguments in Chapter 4.`
    },
    {
      title: "The transfer function: separating the system from the experiment",
      example: "2-06",
      sec: "2.3",
      body: `
Take the general linear, time-invariant equation with output $c$ and input $r$:

$$a_{n}\\frac{d^{n}c}{dt^{n}}+\\cdots+a_{0}c=b_{m}\\frac{d^{m}r}{dt^{m}}+\\cdots+b_{0}r$$

Transform, set **all initial conditions to zero**, and factor:

$$\\left(a_{n}s^{n}+\\cdots+a_{0}\\right)C(s)=\\left(b_{m}s^{m}+\\cdots+b_{0}\\right)R(s)$$

$$\\boxed{\\;G(s)=\\frac{C(s)}{R(s)}=\\frac{b_{m}s^{m}+\\cdots+b_{0}}{a_{n}s^{n}+\\cdots+a_{0}}\\;}$$

**Output coefficients build the denominator. Input coefficients build the numerator.**
Going either direction is pure transcription.

### Why zero initial conditions is not cheating

A transfer function is meant to describe **the system**. Initial conditions describe **a
particular experiment** performed on it. Mixing them would mean the "system" changes every
time you restart the test. Excluding them by definition is what makes $G(s)$ a property of
the hardware.

If you need the response to specific nonzero initial conditions, go back to the
transformed differential equation and keep the boundary terms. Do not try to patch a
transfer function.

### What you gain

- **Three separate objects.** Input, system, and output are now distinct and can be
  reasoned about independently.
- **Response by multiplication:** $C(s)=R(s)G(s)$, then invert.
- **Subsystems combine algebraically**, which is the basis of Chapter 5.
- **The denominator is the characteristic polynomial.** Its roots (the poles) determine
  the natural response and therefore stability, with no reference to any input.

### What you give up

Linearity is required, and time-invariance is required. That is the price, and Sections
2.10–2.11 are about paying it.`
    },
    {
      title: "Impedance: why algebra replaces calculus",
      example: "2-13",
      sec: "2.4",
      body: `
Ohm's law $v=Ri$ is easy because a resistor has **no memory**: the voltage right now
depends only on the current right now. Capacitors and inductors have memory, so their
laws involve calculus:

$$v_{L}=L\\frac{di}{dt},\\qquad i_{C}=C\\frac{dv}{dt}$$

Transform both with zero initial conditions and the calculus disappears:

$$V_{L}(s)=LsI(s),\\qquad I_{C}(s)=CsV(s)$$

Define **impedance** as the generalization of resistance:

$$Z(s)=\\frac{V(s)}{I(s)}$$

| Component | $Z(s)$ | $Y(s)=1/Z$ |
|---|---|---|
| Resistor $R$ | $R$ | $1/R$ |
| Inductor $L$ | $Ls$ | $1/Ls$ |
| Capacitor $C$ | $1/Cs$ | $Cs$ |

### The consequence

**An impedance is itself a transfer function**: from current to voltage. And because
every element now obeys a proportional law, a circuit in the $s$-domain obeys **exactly
the rules of a resistive circuit**:

$$Z_{\\text{series}}=Z_{1}+Z_{2},\\qquad
Z_{\\text{parallel}}=\\frac{Z_{1}Z_{2}}{Z_{1}+Z_{2}},\\qquad
V_{\\text{out}}=V_{\\text{in}}\\frac{Z_{2}}{Z_{1}+Z_{2}}$$

**You never have to write an integro-differential equation.** Go straight to impedances.

### Reading the two extremes

At $s\\to0$ (dc): $Z_{L}\\to0$ (inductor is a wire), $Z_{C}\\to\\infty$ (capacitor is a
break). At $s\\to\\infty$: the reverse. These two limits give you free sanity checks on
every transfer function you derive, and they are pure physics - no algebra required.

### Worked example: series RLC, capacitor output

$$\\frac{V_{C}(s)}{V(s)}=\\frac{1/Cs}{Ls+R+1/Cs}
\\;\\xrightarrow{\\;\\times\\,Cs/L\\;}\\;
\\frac{1/LC}{s^{2}+\\dfrac{R}{L}s+\\dfrac{1}{LC}}$$

Memorize this result. It is the canonical second-order system, and it reappears in
Chapter 4 as $\\dfrac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$.

Sanity check at dc: the gain is 1, because the capacitor blocks steady current so no
voltage is dropped across $R$ or $L$.`
    },
    {
      title: "Writing network equations by inspection",
      example: "2-14",
      sec: "2.4",
      body: `
For more than one loop, do not derive equations element by element. Use the pattern.

### Mesh analysis (KVL)

$$\\left[\\begin{array}{c}\\text{sum of impedances}\\\\ \\text{around mesh }k\\end{array}\\right]I_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{impedances shared}\\\\ \\text{by }k\\text{ and }j\\end{array}\\right]I_{j}(s)
=\\left[\\begin{array}{c}\\text{applied voltages}\\\\ \\text{around mesh }k\\end{array}\\right]$$

### Nodal analysis (KCL)

$$\\left[\\begin{array}{c}\\text{sum of admittances}\\\\ \\text{at node }k\\end{array}\\right]V_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{admittances between}\\\\ k\\text{ and }j\\end{array}\\right]V_{j}(s)
=\\left[\\begin{array}{c}\\text{applied currents}\\\\ \\text{into node }k\\end{array}\\right]$$

**Diagonal positive, off-diagonal negative, matrix symmetric.**

### Why the matrix is symmetric

A shared element appears in both equations with the same impedance, because it is the same
physical component seen from two sides. Symmetry is therefore guaranteed by physics, which
makes it a **free error check**: if your off-diagonals do not match, stop and find the
mistake before computing a determinant.

### Choosing between them

Count meshes and count independent nodes; take the smaller. If the output is a **current**,
mesh usually lands more directly; if a **voltage**, nodal does. Either works - only your
algebra load differs.

### Solving: Cramer's rule, not elimination

You almost always want **one** unknown: the output variable. Cramer's rule delivers it
without solving for the others:

$$x_{k}=\\frac{\\det\\mathbf{A}_{k}}{\\det\\mathbf{A}}$$

where $\\mathbf{A}_{k}$ is $\\mathbf{A}$ with column $k$ replaced by the right-hand side.
The system determinant becomes the denominator of your transfer function - so the poles of
a multi-loop network are the roots of $\\det\\mathbf{A}$.

### The loading trap

You **cannot** cascade two circuit stages by multiplying their individual transfer
functions unless they are buffered. The second stage draws current from the first and
changes its behaviour. The coupling terms in the matrix are exactly that loading, made
visible.`
    },
    {
      title: "Mechanical systems, and the analogy that unifies everything",
      example: "2-18",
      sec: "2.5",
      body: `
Translational mechanics has three passive elements. Two store energy; one dissipates it.

| Component | Force–displacement | Impedance $Z_{M}(s)=F(s)/X(s)$ |
|---|---|---|
| Spring $K$ | $f=Kx$ | $K$ |
| Viscous damper $f_{v}$ | $f=f_{v}\\dot x$ | $f_{v}s$ |
| Mass $M$ | $f=M\\ddot x$ | $Ms^{2}$ |

### The equations-of-motion pattern

$$\\left[\\begin{array}{c}\\text{impedances connected}\\\\ \\text{to the motion at }x_{k}\\end{array}\\right]X_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{impedances between}\\\\ x_{k}\\text{ and }x_{j}\\end{array}\\right]X_{j}(s)
=\\left[\\begin{array}{c}\\text{applied forces}\\\\ \\text{at }x_{k}\\end{array}\\right]$$

This is **the same pattern as mesh analysis**, character for character. That is not a
coincidence.

### The force–voltage analogy, and why it exists

| Mechanical | Electrical |
|---|---|
| force $f$ | voltage $v$ |
| velocity $v$ | current $i$ |
| displacement $x$ | charge $q$ |
| spring $K$ | inverse capacitance $1/C$ |
| damper $f_{v}$ | resistance $R$ |
| mass $M$ | inductance $L$ |

The deep reason: both domains have **the same structure**. A conservation law that sums to
zero around a loop (Kirchhoff's voltage law; Newton's force balance), and exactly three
element types: one that dissipates energy, and two that store it in complementary forms.
Springs store potential energy the way capacitors store electric field energy; masses
store kinetic energy the way inductors store magnetic field energy.

**Because the structure is identical, one mathematical toolkit covers every physical
domain.** That is the single most valuable idea in this chapter, and it is why a control
engineer can work on aircraft, chemical plants and disk drives with the same theory.

*(the standard development writes Newton's law as $\\sum F=0$ with the $Ma$ term moved to the left, precisely so
the mechanical statement matches the electrical one structurally.)*

### Two rules that decide most problems

- **A spring or damper connecting two masses appears on both diagonals and on the
  off-diagonal**: three appearances for one component. Leaving it off one diagonal is the
  most common error in this section.
- **An element tied to ground touches one diagonal only** and contributes nothing
  off-diagonal.

### Counting equations

The number of equations equals the number of **independently movable points of motion** -
not the number of blocks drawn. Two masses give two equations and a fourth-order
denominator, which is a fast structural check on any answer.

### When the input is a displacement

Springs and dampers respond to the **difference** between their two ends; a mass responds
to **absolute** acceleration. That asymmetry is the whole of base-excitation problems, and
it is what puts zeros in the numerator: the numerator is built from whatever couples the
input to the output.`
    },
    {
      title: "Operational amplifiers",
      example: "2-16",
      sec: "2.4",
      body: `
An ideal op-amp has infinite input impedance (no current enters the input terminals),
infinite gain, and zero output impedance. Those three assumptions give two results that
cover an enormous amount of practical control hardware.

$$\\text{Inverting:}\\quad\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{Z_{2}(s)}{Z_{1}(s)}$$

$$\\text{Noninverting:}\\quad\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{Z_{1}(s)+Z_{2}(s)}{Z_{1}(s)}=1+\\frac{Z_{2}}{Z_{1}}$$

### The inverting derivation, in two lines

No current enters the op-amp input, so $I_{1}=I_{2}$. The enormous gain forces the
inverting node to a **virtual ground**, $V_{1}\\approx0$. Then $I_{1}=V_{i}/Z_{1}$ and
$I_{2}=-V_{o}/Z_{2}$, and equating gives the result.

### Why this matters

$Z_{1}$ and $Z_{2}$ are arbitrary impedances, so **you can synthesize essentially any
transfer function you want out of resistors and capacitors.** That is how compensators get
physically built, and it is the bridge from the paper designs of Chapters 9 and 11 to real
hardware.

Two standing results:

$$R\\parallel C=\\frac{R}{RCs+1},\\qquad R+\\frac{1}{Cs}=\\frac{RCs+1}{Cs}$$

The first is a low-pass; the second, in the inverting configuration, is a **PI
controller**: a proportional term plus an integrator, recognizable from the topology
before you compute anything.

### Sanity checks

A noninverting amplifier can never attenuate: its gain is at least 1. An inverting
amplifier always carries a minus sign. If your answer violates either, you used the wrong
formula.`
    },
    {
      title: "Linearity: the assumption everything rests on",
      example: "2-20",
      sec: "2.10",
      body: `
A system is linear if and only if it satisfies **both**:

- **Superposition.** $r_{1}\\to c_{1}$ and $r_{2}\\to c_{2}$ implies $r_{1}+r_{2}\\to c_{1}+c_{2}$.
- **Homogeneity.** $r_{1}\\to c_{1}$ implies $Ar_{1}\\to Ac_{1}$ for any scalar $A$.

Failing **either** makes it nonlinear.

### Why the whole course depends on this

Every technique in Chapter 2 secretly assumes linearity:

- Partial fractions decompose a response into a **sum** of modes - meaningless without
  superposition.
- $C(s)=R(s)G(s)$ requires that doubling the input doubles the output.
- Transfer functions do not exist for nonlinear systems at all.

So linearity is not a technical footnote. It is the license to take systems apart and put
them back together, which is the only reason any of this is tractable.

### The trap

$c=0.5r+3$ plots as a perfectly straight line and fails **both** properties. Doubling $r$
does not double $c$; two inputs summed give an extra $+3$. A straight line through a
nonzero intercept is **affine**, not linear.

**The one-line test:** a relationship is linear only if it is a constant times the
variable or its derivatives, summed. Any power, product, root, trig function, exponential,
logarithm, or constant offset disqualifies it.

### Physical nonlinearities to know by name

| Name | Behaviour |
|---|---|
| **Saturation** | proportional up to a limit, then flat - an amplifier at high input |
| **Dead zone** | zero output until a threshold is exceeded - a motor held by static friction |
| **Backlash** | input moves over a range with no output at all - loose gear teeth |

The practical point: a globally nonlinear device may still be usefully linear **over a
small excursion about an operating point.** That observation is the entire next section.`
    },
    {
      title: "Linearization: buying linearity locally",
      example: "2-23",
      sec: "2.11",
      body: `
If the excursions about a point $A=(x_{0},f(x_{0}))$ are small, replace the curve by its
**tangent line** at $A$. The slope of that tangent is the gain of the linearized model.

### Where it comes from

$$f(x)=f(x_{0})+\\left.\\frac{df}{dx}\\right|_{x_{0}}\\frac{(x-x_{0})}{1!}
+\\left.\\frac{d^{2}f}{dx^{2}}\\right|_{x_{0}}\\frac{(x-x_{0})^{2}}{2!}+\\cdots$$

For small $(x-x_{0})$ the squared and higher terms are negligible. Truncate:

$$\\boxed{\\;\\delta f\\approx m_{a}\\,\\delta x,\\qquad m_{a}=\\left.\\frac{df}{dx}\\right|_{x=x_{0}}\\;}$$

with $\\delta x=x-x_{0}$ and $\\delta f=f(x)-f(x_{0})$ - **deviation variables**, measuring
distance from the operating point rather than absolute quantities.

### The five-step procedure

1. **Write the nonlinear differential equation.**
2. **Find the operating point.** Set the small-signal input to zero and *all derivatives to
   zero*. This collapses the differential equation to an algebraic one.
3. **Substitute** $x=x_{0}+\\delta x$. Since $x_{0}$ is constant,
   $\\dfrac{d(x_{0}+\\delta x)}{dt}=\\dfrac{d\\,\\delta x}{dt}$ - **derivative terms pass
   through unchanged.** Only the nonlinear terms need work.
4. **Linearize each nonlinear term** with the Taylor formula; drop higher-order terms.
5. **Transform** with zero initial conditions and form the transfer function.

### The self-check built into the method

After step 4 the **constant terms must cancel**: the value of the nonlinear term at the
operating point equals the bias input, by construction. If they do not cancel, your
operating point is wrong. Treat this as a hard gate before proceeding.

### What you get, and what you do not

The result relates **deviations**, not absolute values, and it is valid **only near the
chosen operating point.** Move the operating point and the slope changes, so the transfer
function changes: the same physical hardware yields a different model.

That is not a defect of the method; it is a true statement about nonlinear systems, and it
is the concrete form of the robustness and parameter-sensitivity worry raised in Chapter 1.

### Small-angle results

For $|\\theta|$ small in **radians**: $\\sin\\theta\\approx\\theta$, $\\cos\\theta\\approx1$,
$\\tan\\theta\\approx\\theta$, $e^{\\theta}\\approx1+\\theta$, $\\ln(1+\\theta)\\approx\\theta$.
These are just the Taylor formula evaluated at $\\theta_{0}=0$.`
    },
    {
      title: "The chapter in one picture",
      example: "2-24",
      sec: "2.1",
      body: `
$$\\underbrace{\\text{hardware}}_{\\text{circuit / masses}}
\\;\\xrightarrow[\\text{2.10–2.11}]{\\text{linearize if needed}}\\;
\\underbrace{\\text{linear ODE}}_{\\text{KVL, KCL, Newton}}
\\;\\xrightarrow[\\text{2.2}]{d^{n}/dt^{n}\\,\\to\\,s^{n}}\\;
\\underbrace{G(s)=\\frac{C(s)}{R(s)}}_{\\text{2.3}}
\\;\\xrightarrow[\\text{2.2}]{\\text{partial fractions}}\\;
\\underbrace{c(t)}_{\\text{the answer}}$$

with the shortcut that **impedances let you skip the middle step entirely** - replace each
component by $R,\\,Ls,\\,1/Cs$ or $K,\\,f_{v}s,\\,Ms^{2}$ and write the algebraic equations
directly.

### The five things to carry forward

1. **Poles are modes; zeros are amplitudes.** Poles set what the response is made of;
   zeros set how much of each.
2. **Differentiation becomes multiplication by $s$.** That single fact converts every
   differential equation in this course into algebra.
3. **The transfer function separates system from experiment**, which is why subsystems can
   be combined by multiplication in Chapter 5.
4. **Mechanical and electrical systems obey the same pattern** because they share the same
   conservation structure and the same three element types. One toolkit, every domain.
5. **Linearity is what makes decomposition legal.** Where it fails, linearization buys it
   back locally, at the cost of validity only near an operating point.

### What is coming

Chapter 4 asks what the poles you just computed actually *do* in time. Chapter 5 combines
transfer functions into whole systems. Chapter 6 asks when the poles make a system stable
at all. Everything downstream starts from a $G(s)$ produced by the methods here - which is
why this chapter is worth genuine mastery rather than familiarity.`
    }
  ],

  formulas: [
    { latex: "G(s)=\\dfrac{C(s)}{R(s)}",
      note: "Zero initial conditions. $G$ belongs to the system, not to one experiment." },
    { latex: "K_m=\\big[(s+p_m)F(s)\\big]_{s\\to -p_m}",
      note: "Cover-up residue at a simple pole $s=-p_m$." },
    { latex: "K_i=\\dfrac{1}{(i-1)!}\\left.\\dfrac{d^{i-1}}{ds^{i-1}}\\big[(s+p_1)^{r}F(s)\\big]\\right|_{s=-p_1}",
      note: "Repeated pole of order $r$. Index $i=1$ is the highest power." },
    { latex: "s^{2}+as+b=\\left(s+\\dfrac{a}{2}\\right)^{2}+\\left(b-\\dfrac{a^{2}}{4}\\right)",
      note: "Complete the square. Leave an irreducible quadratic whole." },
    { latex: "Z_R=R",
      note: "Electrical resistance. $Z(s)=V(s)/I(s)$." },
    { latex: "Z_L=Ls",
      note: "Electrical inductance." },
    { latex: "Z_C=\\dfrac{1}{Cs}",
      note: "Electrical capacitance." },
    { latex: "Z_K=K",
      note: "Mechanical spring. $Z_M(s)=F(s)/X(s)$." },
    { latex: "Z_{f_v}=f_v s",
      note: "Viscous damper." },
    { latex: "Z_M=Ms^{2}",
      note: "Mass." },
    { latex: "\\dfrac{V_o}{V_i}=-\\dfrac{Z_2}{Z_1}",
      note: "Ideal inverting op-amp." },
    { latex: "\\dfrac{V_o}{V_i}=\\dfrac{Z_1+Z_2}{Z_1}",
      note: "Ideal noninverting op-amp." },
    { latex: "\\delta f \\approx \\left.\\dfrac{df}{dx}\\right|_{x_0}\\delta x",
      note: "Linearization about an operating point. The $G(s)$ that follows relates deviations." }
  ],

  problems: [

    {
      id: "2-01", difficulty: "warmup", topic: "Laplace transforms",
      sec: "2.2",
      prompt: "Find $\\mathcal{L}\\{3t^{2}e^{-4t}u(t)\\}$.",
      hint: "Transform the $t^{2}$ part by itself first, ignoring the exponential. Then use the frequency-shift theorem to bring the exponential back in.",
      answer: "$$\\mathcal{L}\\{3t^{2}e^{-4t}u(t)\\}=\\frac{6}{(s+4)^{3}}$$",
      expert: `
**First glance:** a power of $t$ times a single exponential. That is one table entry, not two steps.

$$\\mathcal{L}\\left\\{t^{n}e^{-at}\\right\\}=\\frac{n!}{(s+a)^{n+1}}$$

$n=2$, so $2!=2$, times the leading 3 gives 6; $a=4$ pushes the pole to $-4$ with multiplicity $n+1=3$. Answer written down: $\\dfrac{6}{(s+4)^{3}}$.

**Discard:** integrating the definition (only if the problem says "from the definition"), and treating the shift as a separate second step - fine while learning, wasted motion once the combined pair is memorized.

**The tell:** *any* product of a polynomial and one exponential is a repeated-pole pair. The polynomial degree sets the multiplicity; the exponential sets the pole. You should be able to go the other way just as fast - $\\dfrac{5}{(s+3)^{4}}$ is $\\tfrac{5}{6}t^{3}e^{-3t}$ on sight, because $3!=6$.
`,
      solution: `
The exponential is handled by the **frequency-shift theorem**:

$$\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$$

In words: transform the non-exponential part by itself, then replace every $s$ in the
result with $s+a$. The exponential enters at the end, not the beginning.

---

**Step 1: transform $t^{2}$ alone.**

From pair 4, $\\mathcal{L}\\{t^{n}u(t)\\}=\\dfrac{n!}{s^{n+1}}$. Here $n=2$, so $n+1=3$
and $n!=2!=2\\times1=2$:

$$\\mathcal{L}\\{t^{2}u(t)\\}=\\frac{2!}{s^{2+1}}=\\frac{2}{s^{3}}$$

*This is the step people get wrong.* The numerator is $n!$, not 1. Writing $1/s^{3}$
here throws everything downstream off by a factor of 2.

**Step 2: pull out the constant.**

Linearity lets a constant multiplier pass straight through:

$$\\mathcal{L}\\{3t^{2}u(t)\\}=3\\cdot\\frac{2}{s^{3}}=\\frac{6}{s^{3}}$$

Call this $F(s)=\\dfrac{6}{s^{3}}$.

**Step 3: apply the frequency shift.**

The original was $3t^{2}$ multiplied by $e^{-4t}$, so $a=4$. Replace $s$ with $s+4$
everywhere in $F(s)$:

$$F(s+4)=\\frac{6}{(s+4)^{3}}$$

$$\\boxed{\\;\\mathcal{L}\\{3t^{2}e^{-4t}u(t)\\}=\\frac{6}{(s+4)^{3}}\\;}$$

This is where the exponential shows up: the denominator changed from $s^{3}$ to
$(s+4)^{3}$. Had it truly been ignored, the answer would still read $6/s^{3}$.

---

**Check by direct integration.** You do not have to trust the theorem:

$$\\int_{0}^{\\infty}3t^{2}e^{-4t}e^{-st}\\,dt=3\\int_{0}^{\\infty}t^{2}e^{-(s+4)t}\\,dt=\\frac{3\\cdot2!}{(s+4)^{3}}=\\frac{6}{(s+4)^{3}}$$

using $\\int_{0}^{\\infty}t^{n}e^{-pt}dt=n!/p^{n+1}$ with $p=s+4$. Same answer, more work
- which is why the theorem exists.
`
    },

    {
      id: "2-02", difficulty: "warmup", topic: "Laplace transforms",
      sec: "2.2",
      prompt: "Find $\\mathcal{L}\\{4-2e^{-3t}+5t\\}$ for $t\\ge0$.",
      hint: "Three separate table lookups joined by linearity. Do not try to transform the sum as a unit.",
      answer: "$$F(s)=\\frac{4}{s}-\\frac{2}{s+3}+\\frac{5}{s^{2}}$$",
      expert: `
**First glance:** a sum of three elementary functions. Linearity means three independent lookups; there is no interaction between them and nothing to combine.

Written straight down, left to right: constant $\\to \\tfrac4s$, exponential $\\to -\\tfrac{2}{s+3}$, ramp $\\to \\tfrac{5}{s^{2}}$. Ten seconds.

**Discard:** combining over a common denominator. Students do this reflexively because it "looks finished," but a sum of simple terms *is* the partial fraction expansion. Combining it only means you or someone else has to take it apart again.

**The tell for the sign:** $e^{-3t}$ decays, so its pole must be at $s=-3$, so the denominator reads $s+3$. If you ever write $s-3$ for a decaying exponential you have described a growing one.

**Free check, no work:** $f(0^{+})=4-2+0=2$, and the initial value theorem gives the same $2$ by reading leading coefficients. Experts do this check *before* moving on, not after being told to.
`,
      solution: `
**Step 0: recognize the structure.** This is a *sum* of three simple functions, each
with a constant multiplier. Linearity says transform each piece separately and add:

$$\\mathcal{L}\\{k_{1}f_{1}+k_{2}f_{2}+k_{3}f_{3}\\}=k_{1}F_{1}(s)+k_{2}F_{2}(s)+k_{3}F_{3}(s)$$

Three lookups, not one hard problem.

---

**Step 1: the constant term $4$.**

A constant for $t\\ge0$ is $4u(t)$, a step of height 4. From pair 2,
$\\mathcal{L}\\{u(t)\\}=1/s$:

$$\\mathcal{L}\\{4u(t)\\}=\\frac{4}{s}$$

**Step 2: the exponential $-2e^{-3t}$.**

From pair 5, $\\mathcal{L}\\{e^{-at}u(t)\\}=\\dfrac{1}{s+a}$ with $a=3$:

$$\\mathcal{L}\\{-2e^{-3t}u(t)\\}=-\\frac{2}{s+3}$$

*Sign check:* $e^{-3t}$ has $a=+3$, giving $+3$ in the denominator and a pole at
$s=-3$. A decaying exponential always produces a left-half-plane pole.

**Step 3: the ramp $5t$.**

From pair 3, $\\mathcal{L}\\{t\\,u(t)\\}=\\dfrac{1}{s^{2}}$:

$$\\mathcal{L}\\{5t\\,u(t)\\}=\\frac{5}{s^{2}}$$

**Step 4: add.**

$$\\boxed{\\;F(s)=\\frac{4}{s}-\\frac{2}{s+3}+\\frac{5}{s^{2}}\\;}$$

There is no need to combine over a common denominator. Leaving it as a sum is preferred
- it is already in partial-fraction form, so inverting later is a one-line job.

---

**Check with the initial value theorem.** $f(0^{+})$ should be $4-2+0=2$:

$$\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\left(4-\\frac{2s}{s+3}+\\frac{5}{s}\\right)=4-2+0=2\\;\\checkmark$$
`
    },

    {
      id: "2-03", difficulty: "warmup", topic: "Laplace transforms",
      sec: "2.2",
      prompt: "Find $\\mathcal{L}\\{t^{3}+2\\sin5t\\}$ for $t\\ge0$.",
      hint: "Watch the factorial in the $t^{n}$ pair, and watch what sits in the numerator of the sine pair.",
      answer: "$$F(s)=\\frac{6}{s^{4}}+\\frac{10}{s^{2}+25}$$",
      expert: `
**First glance:** two lookups, and both have a classic trap baked in.

$t^{3}\\to \\dfrac{3!}{s^{4}}=\\dfrac{6}{s^{4}}$: the factorial is the trap. $2\\sin5t\\to \\dfrac{2\\cdot5}{s^{2}+25}$ - the $\\omega$ on top is the other one.

**The discipline that prevents both:** say the rule out loud as you write. "$n$ factorial over $s$ to the $n$ plus one." "Sine puts omega on top, cosine puts $s$ on top." Two sentences, and the two most common transform errors in the course disappear.

**Discard:** any attempt to combine over a common denominator, and any expansion of $\\sin 5t$ into exponentials.

**Check:** neither term settles. $\\tfrac{6}{s^{4}}$ is a fourfold pole at the origin and $\\tfrac{10}{s^{2}+25}$ has poles on the imaginary axis. So if a later part of the question asks for a final value, the answer is "the theorem does not apply" - spotted from the pole locations alone, before any computation.
`,
      solution: `
Two lookups joined by linearity.

---

**Step 1: the $t^{3}$ term.**

Pair 4: $\\mathcal{L}\\{t^{n}u(t)\\}=\\dfrac{n!}{s^{n+1}}$ with $n=3$.

Compute the factorial explicitly: $3!=3\\times2\\times1=6$. And $n+1=4$.

$$\\mathcal{L}\\{t^{3}u(t)\\}=\\frac{6}{s^{4}}$$

**Step 2: the $2\\sin5t$ term.**

Pair 6: $\\mathcal{L}\\{\\sin\\omega t\\;u(t)\\}=\\dfrac{\\omega}{s^{2}+\\omega^{2}}$.

Here $\\omega=5$, so $\\omega^{2}=25$:

$$\\mathcal{L}\\{\\sin5t\\}=\\frac{5}{s^{2}+25}$$

Multiply by the constant 2:

$$\\mathcal{L}\\{2\\sin5t\\}=\\frac{2\\cdot5}{s^{2}+25}=\\frac{10}{s^{2}+25}$$

*The trap:* the numerator of a **sine** transform is $\\omega$; the numerator of a
**cosine** transform is $s$. Writing $\\dfrac{s}{s^{2}+25}$ would mean you transformed
$\\cos5t$ instead.

**Step 3: add.**

$$\\boxed{\\;F(s)=\\frac{6}{s^{4}}+\\frac{10}{s^{2}+25}\\;}$$

---

**Note on the poles.** The $6/s^{4}$ term has a fourfold pole at the origin - that is
the ever-growing $t^{3}$. The $10/(s^{2}+25)$ term has poles at $s=\\pm j5$, purely
imaginary, which is the never-decaying sinusoid. Neither settles, which is exactly why
the final value theorem would be invalid on this $F(s)$.
`
    },

    {
      id: "2-04", difficulty: "warmup", topic: "Partial fractions",
      sec: "2.2",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{5}{(s+2)(s+7)}.$$",
      hint: "Two distinct real roots. Use the cover-up method: one residue per factor.",
      answer: "$$f(t)=\\left(e^{-2t}-e^{-7t}\\right)u(t)$$",
      expert: `
**First glance:** proper fraction, two distinct real linear factors, constant on top. Case 1. This is a cover-up problem done mentally.

$K_{1}$: cover $(s+2)$, put $-2$ into $\\tfrac{5}{s+7}$ $\\to \\tfrac{5}{5}=1$.
$K_{2}$: cover $(s+7)$, put $-7$ into $\\tfrac{5}{s+2}$ $\\to \\tfrac{5}{-5}=-1$.

Fifteen seconds including the write-up.

**Discard:** long division (numerator degree 0 < 2), completing the square (nothing complex - the factors are already there), and setting up simultaneous equations for $K_{1}$ and $K_{2}$, which is what the cover-up rule exists to eliminate.

**The expert's free check:** when the denominator degree exceeds the numerator degree by two or more, **the residues must sum to zero.** Here $1+(-1)=0$ ✓: which simultaneously confirms both residues *and* tells you $f(0)=0$ without touching the initial value theorem. If your residues do not sum to zero on a problem like this, you have an arithmetic error, guaranteed.
`,
      solution: `
**Step 0: check the orders before anything else.**

Numerator degree 0 (just the constant 5). Denominator degree 2 (multiplying out gives
$s^{2}+9s+14$). Since $0<2$ the fraction is *proper* - no long division needed.

---

**Step 1: identify the roots and write the form.**

$$s+2=0\\;\\Rightarrow\\;s=-2,\\qquad s+7=0\\;\\Rightarrow\\;s=-7$$

Two roots, both real, different from each other - **Case 1**. One term per factor:

$$F(s)=\\frac{5}{(s+2)(s+7)}=\\frac{K_{1}}{s+2}+\\frac{K_{2}}{s+7}$$

**Step 2: find $K_{1}$ by cover-up.**

Cover up the $(s+2)$ in the original fraction and evaluate what remains at $s=-2$.
Covering $(s+2)$ leaves $\\dfrac{5}{s+7}$:

$$K_{1}=\\frac{5}{(-2)+7}=\\frac{5}{5}=1$$

**Step 3: find $K_{2}$ by cover-up.**

Cover $(s+7)$, leaving $\\dfrac{5}{s+2}$, and substitute $s=-7$:

$$K_{2}=\\frac{5}{(-7)+2}=\\frac{5}{-5}=-1$$

*Arithmetic warning:* $-7+2=-5$, not $-9$. Sign slips here are the most common way this
problem goes wrong.

**Step 4: invert term by term.**

$$F(s)=\\frac{1}{s+2}+\\frac{-1}{s+7}$$

Each term matches pair 5, $\\mathcal{L}^{-1}\\left\\{\\dfrac{1}{s+a}\\right\\}=e^{-at}$:

- $\\dfrac{1}{s+2}\\;\\to\\;e^{-2t}$  ($a=2$)
- $\\dfrac{-1}{s+7}\\;\\to\\;-e^{-7t}$  ($a=7$)

$$\\boxed{\\;f(t)=e^{-2t}-e^{-7t}\\;}$$

---

**Check 1: recombine.**

$$\\frac{1}{s+2}-\\frac{1}{s+7}=\\frac{(s+7)-(s+2)}{(s+2)(s+7)}=\\frac{5}{(s+2)(s+7)}\\;\\checkmark$$

**Check 2: initial value.** $f(0)=1-1=0$, and
$\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\dfrac{5s}{s^{2}+9s+14}=0\\;\\checkmark$

**Check 3: signs.** Both exponentials are $e^{-\\text{positive}\\cdot t}$, so both decay
- required, since both poles are in the left half-plane.
`
    },

    {
      id: "2-05", difficulty: "warmup", topic: "Transfer functions",
      sec: "2.3",
      prompt: "Find the transfer function $G(s)=C(s)/R(s)$ for $$4\\frac{d^{2}c}{dt^{2}}+8\\frac{dc}{dt}+3c(t)=2\\frac{dr}{dt}+5r(t),$$ then locate the poles.",
      hint: "Zero initial conditions. Replace each $d^{n}/dt^{n}$ with $s^{n}$ and each lowercase function with its capital.",
      answer: "$$G(s)=\\frac{2s+5}{4s^{2}+8s+3}=\\frac{2s+5}{(2s+1)(2s+3)}$$ Poles at $s=-\\tfrac12$ and $s=-\\tfrac32$, both real and in the left half-plane.",
      expert: `
**First glance:** no transform work is required. Output coefficients become the denominator, input coefficients become the numerator, in the same order they appear.

$$4,8,3\\;\\to\\;4s^{2}+8s+3
\\qquad
2,5\\;\\to\\;2s+5$$

The substitution is done in one pass, with no term-by-term transforming.

**Discard:** actually applying the differentiation theorem with its initial-condition terms. The problem says "transfer function," which *means* zero initial conditions, which *means* the substitution $d^{n}/dt^{n}\\to s^{n}$ and nothing else.

**On the poles:** an expert checks the discriminant before reaching for the quadratic formula. $64-48=16$, a perfect square, so the roots are rational and the polynomial factors by inspection. Two numbers multiplying to $4\\cdot3=12$ and adding to $8$: that is $2$ and $6$, giving $(2s+1)(2s+3)$ and roots $-\\tfrac12,-\\tfrac32$.

Seeing "perfect-square discriminant $\\Rightarrow$ factor by inspection" saves the formula entirely, which matters when you have no calculator.
`,
      solution: `
**Step 1: transform both sides with zero initial conditions.**

$$\\frac{d^{2}c}{dt^{2}}\\to s^{2}C(s),\\qquad
\\frac{dc}{dt}\\to sC(s),\\qquad
c(t)\\to C(s)$$

and identically for $r$:

$$4s^{2}C(s)+8sC(s)+3C(s)=2sR(s)+5R(s)$$

**Step 2: factor $C(s)$ out of the left, $R(s)$ out of the right.**

$$\\left(4s^{2}+8s+3\\right)C(s)=\\left(2s+5\\right)R(s)$$

**Step 3: form the ratio.**

$$\\boxed{\\;G(s)=\\frac{C(s)}{R(s)}=\\frac{2s+5}{4s^{2}+8s+3}\\;}$$

The pattern: **output terms become the denominator, input terms become
the numerator.**

---

**Step 4: find the poles.**

Set $4s^{2}+8s+3=0$ and use the quadratic formula with $a=4$, $b=8$, $c=3$:

$$s=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}=\\frac{-8\\pm\\sqrt{64-4(4)(3)}}{2(4)}=\\frac{-8\\pm\\sqrt{64-48}}{8}=\\frac{-8\\pm\\sqrt{16}}{8}=\\frac{-8\\pm4}{8}$$

$$s=\\frac{-8+4}{8}=-\\frac{1}{2},\\qquad s=\\frac{-8-4}{8}=-\\frac{3}{2}$$

Discriminant $16>0$, so the roots are **real and distinct** - the response is a sum of
decaying exponentials with no oscillation.

**Factored form.**

$$4s^{2}+8s+3=(2s+1)(2s+3)$$

Verify: $(2s+1)(2s+3)=4s^{2}+6s+2s+3=4s^{2}+8s+3\\;\\checkmark$

**Zero.** $2s+5=0\\Rightarrow s=-2.5$.
`
    },

    {
      id: "2-06", difficulty: "warmup", topic: "Transfer functions",
      sec: "2.3",
      prompt: "A system has $$G(s)=\\frac{3s}{s^{2}+2s+10}.$$ Write the differential equation relating $c(t)$ to $r(t)$.",
      hint: "Reverse the process: cross-multiply, then replace each $s^{k}$ with $d^{k}/dt^{k}$.",
      answer: "$$\\frac{d^{2}c}{dt^{2}}+2\\frac{dc}{dt}+10c(t)=3\\frac{dr}{dt}$$",
      expert: `
**First glance:** transcription again, running the other way. Denominator coefficients $1,2,10$ attach to $c$; numerator coefficient $3$ with one power of $s$ attaches to $\\dot r$.

$$\\ddot c+2\\dot c+10c=3\\dot r$$

**Common error:** writing $+3r$ on the right. There is no constant term in the numerator, so there is no $r(t)$ term. Read the numerator as a polynomial with $b_{1}=3$ and $b_{0}=0$, and the missing term is obvious.

**Discard:** inverse-transforming anything. No partial fractions, no table, no $t$-domain work at all: this is pure notation.

**Worth reading off now:** discriminant $4-40=-36<0$, so the poles are complex; completing the square gives $(s+1)^{2}+3^{2}$, so $s=-1\\pm j3$. Underdamped, oscillating at 3 rad/s, envelope $e^{-t}$. Any follow-up about the response is then already answered.
`,
      solution: `
**Step 1: write out what the transfer function means.**

$$G(s)=\\frac{C(s)}{R(s)}=\\frac{3s}{s^{2}+2s+10}$$

**Step 2: cross-multiply** to clear all fractions:

$$\\left(s^{2}+2s+10\\right)C(s)=3s\\,R(s)$$

**Step 3: distribute so each term stands alone.**

$$s^{2}C(s)+2sC(s)+10C(s)=3sR(s)$$

**Step 4: invert the substitution.**

| Frequency domain | Time domain |
|---|---|
| $s^{2}C(s)$ | $\\dfrac{d^{2}c}{dt^{2}}$ |
| $2sC(s)$ | $2\\dfrac{dc}{dt}$ |
| $10C(s)$ | $10c(t)$ |
| $3sR(s)$ | $3\\dfrac{dr}{dt}$ |

$$\\boxed{\\;\\frac{d^{2}c}{dt^{2}}+2\\frac{dc}{dt}+10c(t)=3\\frac{dr}{dt}\\;}$$

---

**Two things worth noticing.**

There is **no** $r(t)$ term on the right. The numerator $3s$ has no constant term
($b_{0}=0$), so nothing multiplies $r(t)$ itself. Adding a phantom $r(t)$ is a common
error.

**Check the poles for physical sense.** $s^{2}+2s+10=0$ has discriminant $4-40=-36<0$,
so the poles are complex. Completing the square,
$s^{2}+2s+10=(s+1)^{2}+9=(s+1)^{2}+3^{2}$, giving $s=-1\\pm j3$. The natural response is
a 3 rad/s sinusoid decaying as $e^{-t}$: underdamped.
`
    },

    {
      id: "2-07", difficulty: "core", topic: "Partial fractions",
      sec: "2.2",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{10}{s(s+2)(s+5)}.$$",
      hint: "Three distinct real roots, one at the origin. The pole at $s=0$ is what produces the constant term in $f(t)$.",
      answer: "$$f(t)=\\left(1-\\tfrac{5}{3}e^{-2t}+\\tfrac{2}{3}e^{-5t}\\right)u(t)$$",
      expert: `
**First glance:** three distinct real roots, one at the origin, constant numerator. Case 1 again - the extra factor changes nothing about the method.

**The shortcut that matters:** the residue at the pole $s=0$ **is the final value**. Cover $s$, evaluate $\\tfrac{10}{(s+2)(s+5)}$ at $0$, get $\\tfrac{10}{10}=1$. You now know $f(\\infty)=1$ without the final value theorem, because the constant term of $f(t)$ *is* that residue.

Remaining two by cover-up: $\\tfrac{10}{(-2)(3)}=-\\tfrac53$ and $\\tfrac{10}{(-5)(-3)}=\\tfrac23$.

**Discard:** anything involving the quadratic formula or completing the square. The denominator arrived factored; do not un-factor it.

**Where the error actually happens:** $(-5)(-3)=+15$. Not the concept: the sign. An expert slows down for exactly two seconds at each cover-up evaluation, writes the factor values separately ($s=-5$, $s+2=-3$), then multiplies. That habit is worth more than any formula in this section.

**Free check:** residues must sum to zero (denominator degree exceeds numerator by 3): $1-\\tfrac53+\\tfrac23=0$ ✓
`,
      solution: `
**Step 0: orders.** Numerator degree 0, denominator degree 3. Proper.

**Step 1: identify the roots.**

$$s=0,\\qquad s+2=0\\Rightarrow s=-2,\\qquad s+5=0\\Rightarrow s=-5$$

All real, all different: Case 1 with one extra term. The root at the origin is an
ordinary distinct root; nothing special about it procedurally.

$$F(s)=\\frac{K_{1}}{s}+\\frac{K_{2}}{s+2}+\\frac{K_{3}}{s+5}$$

---

**Step 2: $K_{1}$: cover $s$, evaluate at $s=0$.**

Covering $s$ leaves $\\dfrac{10}{(s+2)(s+5)}$:

$$K_{1}=\\frac{10}{(0+2)(0+5)}=\\frac{10}{2\\times5}=\\frac{10}{10}=1$$

**Step 3: $K_{2}$: cover $(s+2)$, evaluate at $s=-2$.**

Covering $(s+2)$ leaves $\\dfrac{10}{s(s+5)}$. Work the denominator piecewise: $s=-2$,
and $s+5=-2+5=3$, so the product is $(-2)(3)=-6$:

$$K_{2}=\\frac{10}{-6}=-\\frac{5}{3}$$

(reducing by dividing top and bottom by 2)

**Step 4: $K_{3}$: cover $(s+5)$, evaluate at $s=-5$.**

Covering $(s+5)$ leaves $\\dfrac{10}{s(s+2)}$. Here $s=-5$ and $s+2=-5+2=-3$:

$$K_{3}=\\frac{10}{(-5)(-3)}=\\frac{10}{15}=\\frac{2}{3}$$

*Sign care:* $(-5)(-3)$ is **positive** 15: negative times negative. Getting this wrong
is the usual failure on three-root problems.

---

**Step 5: assemble and invert.**

$$F(s)=\\frac{1}{s}-\\frac{5/3}{s+2}+\\frac{2/3}{s+5}$$

- $\\dfrac{1}{s}\\to u(t)$, the constant 1  (pair 2)
- $-\\dfrac{5/3}{s+2}\\to-\\dfrac{5}{3}e^{-2t}$  (pair 5)
- $\\dfrac{2/3}{s+5}\\to\\dfrac{2}{3}e^{-5t}$  (pair 5)

$$\\boxed{\\;f(t)=1-\\frac{5}{3}e^{-2t}+\\frac{2}{3}e^{-5t}\\;}$$

---

**Check 1: initial value.**

$$f(0)=1-\\frac{5}{3}+\\frac{2}{3}=\\frac{3}{3}-\\frac{5}{3}+\\frac{2}{3}=\\frac{0}{3}=0$$

and $\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\dfrac{10}{(s+2)(s+5)}=0\\;\\checkmark$

**Check 2: final value.** Both exponentials vanish, leaving $f(\\infty)=1$:

$$\\lim_{s\\to0}sF(s)=\\frac{10}{(2)(5)}=1\\;\\checkmark$$

Valid because the poles of $sF(s)$ are $-2$ and $-5$, both left-half-plane.

**General lesson:** a pole at the origin in $F(s)$ produces a **constant** term in
$f(t)$, and that constant equals the final value.
`
    },

    {
      id: "2-08", difficulty: "core", topic: "Partial fractions",
      sec: "2.2",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{s+3}{s(s+1)^{2}}.$$",
      hint: "The $(s+1)^{2}$ is a repeated root. It generates two terms, and the second one needs a derivative.",
      answer: "$$f(t)=\\left(3-3e^{-t}-2te^{-t}\\right)u(t)$$",
      expert: `
**First glance:** $(s+1)^{2}$. Repeated root, so this is Case 2 and there will be **three** terms for a third-degree denominator: one for $s$, two for the squared factor. Counting terms before starting is what stops the whole problem going wrong.

**The expert's move:** deal with the simple pole by cover-up first (it is free), then set up $F_{1}(s)=(s+1)^{2}F(s)=\\tfrac{s+3}{s}$ and notice immediately that it simplifies to $1+\\tfrac3s$. Now the derivative is $-3s^{-2}$ by the power rule - **no quotient rule needed.** Rewriting before differentiating is the single biggest time saver in repeated-root problems.

**Discard:** clearing denominators and matching coefficients. It works, but it means solving three simultaneous equations where the formula gives you the answers directly.

**The structural check:** a repeated root *must* produce a $te^{-at}$ term. If your final answer has no polynomial multiplying an exponential, you dropped a term and should stop and find it.

**Free check:** $f(0)=3-0-3=0$, consistent with numerator degree 1 vs denominator degree 3.
`,
      solution: `
**Step 0: orders.** Numerator degree 1, denominator degree 3. Proper.

**Step 1: recognize the case and write the form.**

$(s+1)$ appears squared, so $r=2$ - **Case 2**. A factor to the power $r$ generates $r$
terms with *descending* powers. The non-repeated factor $s$ contributes one ordinary
term.

$$F(s)=\\frac{s+3}{s(s+1)^{2}}=\\frac{K_{1}}{s}+\\frac{K_{2}}{(s+1)^{2}}+\\frac{K_{3}}{s+1}$$

**Three** unknowns for a third-degree denominator. Writing only two terms
under-specifies the problem and the algebra will not close.

---

**Step 2: $K_{1}$ by ordinary cover-up.**

$s$ is not repeated, so the standard method applies. Cover $s$, leaving
$\\dfrac{s+3}{(s+1)^{2}}$, evaluate at $s=0$:

$$K_{1}=\\frac{0+3}{(0+1)^{2}}=\\frac{3}{1}=3$$

**Step 3: set up the repeated-root machinery.**

$$F_{1}(s)=(s+1)^{2}F(s)=(s+1)^{2}\\cdot\\frac{s+3}{s(s+1)^{2}}=\\frac{s+3}{s}$$

The $(s+1)^{2}$ cancels completely. Multiplying by the *highest* power of the repeated
factor is always the first move.

**Step 4: $K_{2}$, the highest-power coefficient.**

$$K_{i}=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_{1}(s)}{ds^{\\,i-1}}\\right|_{s\\to-1}$$

For $i=1$ (giving the coefficient of $1/(s+1)^{2}$, labelled $K_{2}$): $(i-1)!=0!=1$ and
the zeroth derivative means "do not differentiate." Evaluate $F_{1}$ directly at $s=-1$:

$$K_{2}=\\left.\\frac{s+3}{s}\\right|_{s=-1}=\\frac{-1+3}{-1}=\\frac{2}{-1}=-2$$

**Step 5: $K_{3}$, one step down the ladder.**

For $i=2$: $(i-1)!=1!=1$, and we need the **first derivative** of $F_{1}(s)$.

Quotient rule $\\left(\\dfrac{u}{v}\\right)'=\\dfrac{u'v-uv'}{v^{2}}$ with $u=s+3$,
$u'=1$, $v=s$, $v'=1$:

$$\\frac{dF_{1}}{ds}=\\frac{(1)(s)-(s+3)(1)}{s^{2}}=\\frac{s-s-3}{s^{2}}=\\frac{-3}{s^{2}}$$

*Easier alternative:* rewrite $F_{1}(s)=\\dfrac{s}{s}+\\dfrac{3}{s}=1+3s^{-1}$, then
$\\dfrac{dF_{1}}{ds}=-3s^{-2}=\\dfrac{-3}{s^{2}}$. Same answer, no quotient rule.

Evaluate at $s=-1$:

$$K_{3}=\\frac{1}{1!}\\cdot\\frac{-3}{(-1)^{2}}=\\frac{-3}{1}=-3$$

*Careful:* $(-1)^{2}=+1$, not $-1$.

---

**Step 6: assemble and invert.**

$$F(s)=\\frac{3}{s}+\\frac{-2}{(s+1)^{2}}+\\frac{-3}{s+1}$$

- $\\dfrac{3}{s}\\to3$  (pair 2)
- $\\dfrac{-2}{(s+1)^{2}}\\to-2te^{-t}$  (pair 10)
- $\\dfrac{-3}{s+1}\\to-3e^{-t}$  (pair 5)

$$\\boxed{\\;f(t)=3-2te^{-t}-3e^{-t}\\;}$$

---

**Check 1: initial value.** $f(0)=3-2(0)(1)-3(1)=0$, and
$\\lim_{s\\to\\infty}\\dfrac{s+3}{(s+1)^{2}}=0\\;\\checkmark$

**Check 2: final value.** Both $te^{-t}$ and $e^{-t}$ go to zero (the exponential always
beats the linear factor), so $f(\\infty)=3$, and
$\\lim_{s\\to0}\\dfrac{s+3}{(s+1)^{2}}=\\dfrac{3}{1}=3\\;\\checkmark$

**Signature of a repeated root.** The $te^{-t}$ term: a polynomial multiplying an
exponential: appears *only* when a root repeats. If your answer to a repeated-root
problem has no $t$ multiplying an exponential, you dropped a term.
`
    },

    {
      id: "2-09", difficulty: "core", topic: "Partial fractions",
      sec: "2.2",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{5}{s\\left(s^{2}+4s+8\\right)}.$$",
      hint: "Test the discriminant of the quadratic before trying to factor it. If negative, complete the square instead.",
      answer: "$$f(t)=\\frac{5}{8}-\\frac{5}{8}e^{-2t}\\left(\\cos2t+\\sin2t\\right)$$",
      expert: `
**First glance:** check the discriminant of $s^{2}+4s+8$ *before* anything else. $16-32=-16<0$: complex. That single test decides the whole method: keep the quadratic intact, linear numerator, Case 3.

**Discard:** try to factor it, hunt for rational roots, or go to complex residues. Complex-residue arithmetic is correct but error-prone by hand and produces an answer you then have to convert back to sines and cosines.

**Path:** $K_{1}$ by cover-up ($\\tfrac58$), then note that for $\\tfrac{K}{s(s^{2}+bs+c)}$ the remaining numerator is always $-K_{1}(s+b)$: here $-\\tfrac58(s+4)$. That pattern lets you skip the coefficient-balancing entirely once you trust it.

Complete the square by eye: half of 4 is 2, $2^{2}=4$, $8-4=4$, so $(s+2)^{2}+2^{2}$. Then split $s+4=(s+2)+2$, and since $\\omega=2$ the sine coefficient is $\\tfrac22=1$.

**The recognition:** when the shift and $\\omega$ come out equal (both 2 here), the cosine and sine coefficients are equal, which means $R=\\sqrt2$ and $\\phi=45^{\\circ}$ exactly. No calculator, and you can state the single-sinusoid form immediately.
`,
      solution: `
**Step 1: test the quadratic first.**

For $s^{2}+4s+8$: $a=1$, $b=4$, $c=8$.

$$b^{2}-4ac=16-4(1)(8)=16-32=-16<0$$

Negative discriminant means **complex roots**: the quadratic is irreducible over the
reals. Do not attempt to factor it. Keep it whole with a *linear* numerator - **Case 3**.

$$F(s)=\\frac{5}{s\\left(s^{2}+4s+8\\right)}=\\frac{K_{1}}{s}+\\frac{K_{2}s+K_{3}}{s^{2}+4s+8}$$

*Why a linear numerator?* A term's numerator must be one degree lower than its
denominator. Over a quadratic that means $K_{2}s+K_{3}$, not a bare constant.

---

**Step 2: $K_{1}$ by cover-up.**

Cover $s$, leaving $\\dfrac{5}{s^{2}+4s+8}$, evaluate at $s=0$:

$$K_{1}=\\frac{5}{0+0+8}=\\frac{5}{8}$$

**Step 3: clear the fractions.**

Multiply every term by $s\\left(s^{2}+4s+8\\right)$:

$$5=K_{1}\\left(s^{2}+4s+8\\right)+\\left(K_{2}s+K_{3}\\right)s$$

**Step 4: expand and collect by powers.**

$$5=K_{1}s^{2}+4K_{1}s+8K_{1}+K_{2}s^{2}+K_{3}s$$

$$5=\\left(K_{1}+K_{2}\\right)s^{2}+\\left(4K_{1}+K_{3}\\right)s+8K_{1}$$

**Step 5: balance coefficients.**

The left side is $5$: no $s^{2}$, no $s^{1}$, constant 5.

| Power | Equation | Solve |
|---|---|---|
| $s^{2}$ | $K_{1}+K_{2}=0$ | $K_{2}=-\\tfrac{5}{8}$ |
| $s^{1}$ | $4K_{1}+K_{3}=0$ | $K_{3}=-4\\left(\\tfrac58\\right)=-\\tfrac{5}{2}$ |
| $s^{0}$ | $8K_{1}=5$ | $K_{1}=\\tfrac{5}{8}\\;\\checkmark$ |

The $s^{0}$ row is a free consistency check: it reproduces the $K_{1}$ found in Step 2.

$$F(s)=\\frac{5/8}{s}+\\frac{-\\tfrac58 s-\\tfrac52}{s^{2}+4s+8}
=\\frac{5/8}{s}-\\frac{5}{8}\\cdot\\frac{s+4}{s^{2}+4s+8}$$

*How that factoring worked:*
$-\\tfrac58 s-\\tfrac52=-\\tfrac58\\left(s+\\tfrac{5/2}{5/8}\\right)=-\\tfrac58(s+4)$,
since $\\dfrac{5/2}{5/8}=\\dfrac52\\cdot\\dfrac85=4$.

---

**Step 6: complete the square.**

$$s^{2}+4s+8=\\left(s+\\tfrac{4}{2}\\right)^{2}+\\left(8-\\tfrac{4^{2}}{4}\\right)=(s+2)^{2}+4=(s+2)^{2}+2^{2}$$

So $a=2$ and $\\omega=2$.

**Step 7: split the numerator to match the table.**

Target form $\\dfrac{A(s+a)+B\\omega}{(s+a)^{2}+\\omega^{2}}$ with $a=2$, $\\omega=2$.
Rewrite $s+4$ in terms of $(s+2)$:

$$s+4=(s+2)+2=\\underbrace{1}_{A}\\cdot(s+2)+\\underbrace{1}_{B}\\cdot\\underbrace{2}_{\\omega}$$

$$F(s)=\\frac{5/8}{s}-\\frac{5}{8}\\left[\\frac{s+2}{(s+2)^{2}+2^{2}}+\\frac{2}{(s+2)^{2}+2^{2}}\\right]$$

**Step 8: invert.**

- $\\dfrac{5/8}{s}\\to\\dfrac{5}{8}$  (pair 2)
- $\\dfrac{s+2}{(s+2)^{2}+2^{2}}\\to e^{-2t}\\cos2t$  (pair 9)
- $\\dfrac{2}{(s+2)^{2}+2^{2}}\\to e^{-2t}\\sin2t$  (pair 8)

$$\\boxed{\\;f(t)=\\frac{5}{8}-\\frac{5}{8}e^{-2t}\\left(\\cos2t+\\sin2t\\right)\\;}$$

---

**Optional single-sinusoid form: keep it exact.** With $A=B=1$:

$$R=\\sqrt{A^{2}+B^{2}}=\\sqrt{1+1}=\\sqrt2,\\qquad
\\phi=\\arctan\\frac{B}{A}=\\arctan(1)=45^{\\circ}=\\frac{\\pi}{4}$$

$$f(t)=\\frac{5}{8}-\\frac{5\\sqrt2}{8}\\,e^{-2t}\\cos\\!\\left(2t-\\frac{\\pi}{4}\\right)$$

Both $\\sqrt2$ and $45^{\\circ}$ are exact values you must know cold - no calculator
needed, and no decimal should ever appear in your final answer.

**Check: initial value.** $f(0)=\\tfrac58-\\tfrac58(1)(1+0)=0\\;\\checkmark$

**Check: final value.** $f(\\infty)=\\tfrac58$, and
$\\lim_{s\\to0}sF(s)=\\tfrac58\\;\\checkmark$
`
    },

    {
      id: "2-10", difficulty: "core", topic: "Partial fractions",
      sec: "2.2",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{s^{2}+4s+5}{s^{2}+3s+2}.$$",
      hint: "Compare the degree of the numerator to the degree of the denominator before you do anything else.",
      answer: "$$f(t)=\\delta(t)+2e^{-t}-e^{-2t}$$",
      expert: `
**First glance:** degree 2 over degree 2. An expert's eye goes to the **degrees before the coefficients**, every time. Equal degrees means improper, means long division first, means there will be a $\\delta(t)$ in the answer.

Knowing the answer contains an impulse *before* starting is the whole value of the first glance - it stops you from panicking when $\\delta(t)$ appears and stops you from "simplifying" it away.

**The division is trivial here:** both leading coefficients are 1, so the quotient is 1 and the remainder is the coefficient-wise difference: $(4-3)s+(5-2)=s+3$. No long-division scaffolding needed for a same-degree divide: just subtract.

**Discard:** expanding directly into $\\tfrac{K_1}{s+1}+\\tfrac{K_2}{s+2}$. It will produce residues that do not reconstruct the original, and because nothing looks obviously wrong, the error is silent.

**The general rule to carry:** $\\deg N-\\deg D=0$ gives $\\delta(t)$; $=1$ gives $\\dot\\delta(t)$ as well; $<0$ gives neither. This is the same fact as "$c(0^{+})=G(\\infty)$," which you will use constantly in Chapter 4.
`,
      solution: `
**Step 0: this is the content of the problem.**

Numerator degree 2. Denominator degree 2. Since $\\deg N\\ge\\deg D$ the fraction is
**improper** and cannot be expanded directly. Long division first.

Attempting Case 1 without dividing produces residues that do not reconstruct the
original: a silent wrong answer.

---

**Step 1: polynomial long division.**

How many times does $s^{2}$ go into $s^{2}$? Once. The quotient is $1$.

Multiply the divisor by 1 and subtract:

$$\\begin{aligned}
&\\;\\;\\;\\;s^{2}+4s+5\\\\
-&\\;\\;\\;\\;\\underline{\\left(s^{2}+3s+2\\right)}\\\\
&\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;s+3
\\end{aligned}$$

Term by term: $s^{2}-s^{2}=0$, $4s-3s=s$, $5-2=3$.

The remainder $s+3$ has degree 1 < 2, so the division stops.

$$F(s)=1+\\frac{s+3}{s^{2}+3s+2}$$

**Step 2: factor the remaining denominator.**

Two numbers multiplying to $2$ and adding to $3$: $1$ and $2$.

$$s^{2}+3s+2=(s+1)(s+2)$$

Verify: $(s+1)(s+2)=s^{2}+2s+s+2=s^{2}+3s+2\\;\\checkmark$

**Step 3: expand the proper remainder (Case 1).**

$$\\frac{s+3}{(s+1)(s+2)}=\\frac{K_{1}}{s+1}+\\frac{K_{2}}{s+2}$$

$K_{1}$: cover $(s+1)$, evaluate $\\dfrac{s+3}{s+2}$ at $s=-1$:

$$K_{1}=\\frac{-1+3}{-1+2}=\\frac{2}{1}=2$$

$K_{2}$: cover $(s+2)$, evaluate $\\dfrac{s+3}{s+1}$ at $s=-2$:

$$K_{2}=\\frac{-2+3}{-2+1}=\\frac{1}{-1}=-1$$

**Step 4: assemble and invert.**

$$F(s)=1+\\frac{2}{s+1}-\\frac{1}{s+2}$$

- The constant $1$ inverts to $\\delta(t)$  (pair 1, read backwards)
- $\\dfrac{2}{s+1}\\to2e^{-t}$
- $-\\dfrac{1}{s+2}\\to-e^{-2t}$

$$\\boxed{\\;f(t)=\\delta(t)+2e^{-t}-e^{-2t}\\;}$$

---

**Is the $\\delta(t)$ a mistake?** No. Whenever the numerator degree equals the
denominator degree, an impulse appears. If the numerator degree *exceeded* the
denominator by one, you would also get $d\\delta(t)/dt$. Seeing $\\delta(t)$ normally
means the long division was done correctly.

**Check: recombine.**

$$1+\\frac{2}{s+1}-\\frac{1}{s+2}=\\frac{(s+1)(s+2)+2(s+2)-(s+1)}{(s+1)(s+2)}$$

Numerator: $\\left(s^{2}+3s+2\\right)+\\left(2s+4\\right)-\\left(s+1\\right)=s^{2}+4s+5\\;\\checkmark$
`
    },

    {
      id: "2-11", difficulty: "core", topic: "Solving ODEs",
      sec: "2.2",
      prompt: "Solve $$\\frac{d^{2}y}{dt^{2}}+5\\frac{dy}{dt}+4y=0$$ with $y(0^-)=1$ and $\\dot y(0^-)=0$, using the Laplace transform.",
      hint: "This time you must keep the initial-condition terms. They are the entire input.",
      answer: "$$y(t)=\\frac{4}{3}e^{-t}-\\frac{1}{3}e^{-4t}$$",
      expert: `
**First glance:** nonzero initial conditions and no forcing term. That combination means the initial conditions *are* the input - they will appear on the right-hand side after transforming, and the answer is a pure natural response.

**The pattern an expert writes down without deriving:** for $\\ddot y+b\\dot y+cy=0$ with $y(0)=y_{0}$, $\\dot y(0)=0$,

$$Y(s)=\\frac{y_{0}(s+b)}{s^{2}+bs+c}$$

Here $y_{0}=1$, $b=5$, so $Y=\\tfrac{s+5}{s^{2}+5s+4}$ straight down, with no bookkeeping of the $-sf(0)-\\dot f(0)$ terms.

**Discard:** forming a transfer function. There is no input, so there is nothing to take a ratio with - students reach for $G(s)$ out of habit and get stuck.

**The check that ends the problem:** a solution that satisfies the differential equation *and* both initial conditions is unique. So verify $y(0)=\\tfrac43-\\tfrac13=1$ and $\\dot y(0)=-\\tfrac43+\\tfrac43=0$ and you are done: no need to substitute back into the ODE at all. Two arithmetic lines close the problem completely.
`,
      solution: `
Different from the transfer-function work: the initial conditions are **not** zero and
must be carried, because there is no forcing input. The initial conditions *are* what
drives the response.

---

**Step 1: write the differentiation theorems in full.**

$$\\mathcal{L}\\left\\{\\frac{dy}{dt}\\right\\}=sY(s)-y(0^-)$$

$$\\mathcal{L}\\left\\{\\frac{d^{2}y}{dt^{2}}\\right\\}=s^{2}Y(s)-sy(0^-)-\\dot y(0^-)$$

**Step 2: substitute $y(0^-)=1$, $\\dot y(0^-)=0$.**

$$\\mathcal{L}\\left\\{\\frac{dy}{dt}\\right\\}=sY(s)-1$$

$$\\mathcal{L}\\left\\{\\frac{d^{2}y}{dt^{2}}\\right\\}=s^{2}Y(s)-s(1)-0=s^{2}Y(s)-s$$

**Step 3: transform the whole equation.**

$$\\underbrace{\\left[s^{2}Y(s)-s\\right]}_{y''}+5\\underbrace{\\left[sY(s)-1\\right]}_{y'}+4\\underbrace{Y(s)}_{y}=0$$

**Step 4: expand and separate.**

$$s^{2}Y(s)-s+5sY(s)-5+4Y(s)=0$$

$$\\left(s^{2}+5s+4\\right)Y(s)=s+5$$

The right-hand side is built entirely from initial conditions - that is the "input."

**Step 5: solve and factor.**

$$Y(s)=\\frac{s+5}{s^{2}+5s+4}=\\frac{s+5}{(s+1)(s+4)}$$

(two numbers multiplying to 4, adding to 5: 1 and 4)

**Step 6: partial fractions.**

$K_{1}$: cover $(s+1)$, evaluate $\\dfrac{s+5}{s+4}$ at $s=-1$:

$$K_{1}=\\frac{-1+5}{-1+4}=\\frac{4}{3}$$

$K_{2}$: cover $(s+4)$, evaluate $\\dfrac{s+5}{s+1}$ at $s=-4$:

$$K_{2}=\\frac{-4+5}{-4+1}=\\frac{1}{-3}=-\\frac{1}{3}$$

**Step 7: invert.**

$$\\boxed{\\;y(t)=\\frac{4}{3}e^{-t}-\\frac{1}{3}e^{-4t}\\;}$$

---

**Check 1: does $y(0)=1$?**

$$y(0)=\\frac{4}{3}-\\frac{1}{3}=\\frac{3}{3}=1\\;\\checkmark$$

**Check 2: does $\\dot y(0)=0$?**

$$\\dot y(t)=-\\frac{4}{3}e^{-t}+\\frac{4}{3}e^{-4t}$$

(the second term: $\\dfrac{d}{dt}\\left[-\\tfrac13e^{-4t}\\right]=-\\tfrac13(-4)e^{-4t}=+\\tfrac43e^{-4t}$)

$$\\dot y(0)=-\\frac{4}{3}+\\frac{4}{3}=0\\;\\checkmark$$

Both initial conditions reproduce. A solution satisfying the differential equation *and*
both initial conditions is the unique answer: that is a complete verification.

**Physical reading.** Both poles are left-half-plane, so the response decays to zero.
This is a purely natural response: no input, therefore no forced response.
`
    },

    {
      id: "2-12", difficulty: "core", topic: "Final value theorem",
      sec: "2.2",
      prompt: `A system has $G(s)=\\dfrac{20}{(s+2)(s+5)}$ and is driven by a unit step.

**(a)** Find the steady-state value of the output.

**(b)** A classmate applies the same method to $G(s)=\\dfrac{5}{s^{2}-3s+2}$ and reports a steady-state value. Explain why their answer is meaningless.`,
      hint: "The final value theorem has a precondition about pole locations. Check it before using it, both times.",
      answer: "**(a)** $c(\\infty)=2$. **(b)** That system's poles are at $s=+1$ and $s=+2$, both right-half-plane, so it is unstable and the theorem does not apply. The response grows without bound; there is no final value.",
      expert: `
**First glance at part (b):** $s^{2}-3s+2$. The **minus sign on the $s$ term** is the entire problem. A stable polynomial with positive constant term has all-positive coefficients; a sign change means at least one root in the right half-plane. An expert sees that and knows the answer before factoring.

(This is the Routh-Hurwitz necessary condition, which you meet formally in Chapter 6 - but the "all coefficients same sign" check is usable now.)

**Part (a), the fast path:** for a step input, steady-state output is just $G(0)$. Do not form $C(s)$, do not write the limit. $G(0)=\\tfrac{20}{(2)(5)}=2$. One line.

**Discard:** computing the full inverse transform to find a final value. Never necessary.

**The discipline this problem is really drilling:** *locate the poles, then decide if the theorem is allowed.* Not the reverse. The final value theorem will happily return a number for an unstable system, for an oscillator, for anything - and that number is meaningless. Poles on the imaginary axis break it just as thoroughly as poles to the right, which is why $\\tfrac{\\omega}{s^{2}+\\omega^{2}}$ is the counterexample everyone should keep in mind.
`,
      solution: `
## Part (a)

**Step 1: form $C(s)$.**

A unit step has $R(s)=\\dfrac{1}{s}$, and $C(s)=R(s)G(s)$:

$$C(s)=\\frac{1}{s}\\cdot\\frac{20}{(s+2)(s+5)}=\\frac{20}{s(s+2)(s+5)}$$

**Step 2: check the precondition before applying the theorem.**

$$f(\\infty)=\\lim_{s\\to0}sF(s)$$

is valid **only if every root of the denominator of $sF(s)$ has a negative real part.**

Here $sC(s)=\\dfrac{20}{(s+2)(s+5)}$, with roots $s=-2$ and $s=-5$. Both negative. The
theorem applies.

**Step 3: take the limit.**

$$c(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{20}{s(s+2)(s+5)}=\\lim_{s\\to0}\\frac{20}{(s+2)(s+5)}=\\frac{20}{(2)(5)}=\\frac{20}{10}=2$$

$$\\boxed{\\;c(\\infty)=2\\;}$$

**Shortcut worth knowing.** For a step input, the steady-state output is just $G(0)$ -
the dc gain. Check: $G(0)=\\dfrac{20}{10}=2\\;\\checkmark$

---

## Part (b)

**Step 1: find the poles.**

$$s^{2}-3s+2=0$$

Two numbers multiplying to $+2$ and adding to $-3$: $-1$ and $-2$.

$$s^{2}-3s+2=(s-1)(s-2)$$

Roots: $s=+1$ and $s=+2$.

*Watch the signs.* The factors $(s-1)$ and $(s-2)$ give **positive** roots. A minus sign
on the $s$ term in the polynomial is the tell.

**Step 2: interpret.**

Both poles have positive real parts - **right half-plane**. The natural response terms
are $e^{+1t}$ and $e^{+2t}$, which **grow without bound**. The system is unstable.

**Step 3: why the answer is garbage.**

The precondition fails, so the limit is not the final value of anything. If your
classmate computed
$\\lim_{s\\to0}s\\cdot\\dfrac{5}{s\\left(s^{2}-3s+2\\right)}=\\dfrac{5}{2}=2.5$, that
number is arithmetically correct and physically meaningless - the actual $c(t)$ contains
$e^{2t}$ and heads to infinity.

**The classic counterexample.** For $F(s)=\\dfrac{\\omega}{s^{2}+\\omega^{2}}$ the theorem
returns $0$, but $f(t)=\\sin\\omega t$ oscillates forever. Poles **on** the imaginary
axis break the theorem just as surely as poles to the right of it.

**Rule to internalize:** *find the poles first, then decide whether the theorem is
allowed.* Never the other way around.
`
    },

    {
      id: "2-13", difficulty: "core", topic: "Electrical networks",
      sec: "2.4",
      prompt: `For the series RLC network below the input is $v(t)$ and the output is the capacitor voltage $v_{C}(t)$. Given $L=1$ H, $R=3\\ \\Omega$, $C=\\tfrac12$ F, find $\\dfrac{V_{C}(s)}{V(s)}$ and locate its poles.

<svg viewBox="0 0 490 175" width="100%" style="max-width:490px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="72" cy="100" r="21"/><path d="M66 92 L78 92 M72 86 L72 98" stroke-width="1.7"/><path d="M66 109 L78 109" stroke-width="1.7"/><path d="M72 79 L72 44 L132 44"/><path d="M132 44 a8.666666666666666 8.666666666666666 0 0 1 17.333333333333332 0 a8.666666666666666 8.666666666666666 0 0 1 17.333333333333332 0 a8.666666666666666 8.666666666666666 0 0 1 17.333333333333332 0"/><path d="M184 44 L232 44"/><path d="M232 44 L236.2 35 L244.5 53 L252.8 35 L261.2 53 L269.5 35 L277.8 53 L282 44"/><path d="M282 44 L392 44 L392 86"/><path d="M380.0 86 L404.0 86"/><path d="M380.0 99 L404.0 99"/><path d="M392 99 L392 158 L72 158 L72 121"/><path d="M196 68 L238.0 68.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="251.0,68.0 238.9,71.1 238.9,64.9" fill="#1A2028" stroke="none"/><path d="M424 86 L424.0 100.0" stroke="#8A97A6" stroke-width="1.6" fill="none"/><polygon points="424.0,113.0 420.9,100.9 427.1,100.9" fill="#8A97A6" stroke="none"/><g stroke="none">
<text x="44" y="105" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="end" font-style="italic">v(t)</text>
<text x="148" y="28" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">L</text>
<text x="251" y="28" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R</text>
<text x="372" y="116" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C</text>
<text x="220" y="86" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">i(t)</text>
<text x="436" y="101" font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">v<tspan font-size="10" dy="4">C</tspan><tspan font-size="14" dy="-4">(t)</tspan></text>
</g>
</g>
</svg>`,
      hint: "Convert every component to its impedance, then recognize the topology as a voltage divider. Do not write an integro-differential equation.",
      answer: "$$\\frac{V_{C}(s)}{V(s)}=\\frac{2}{s^{2}+3s+2}=\\frac{2}{(s+1)(s+2)}$$ Poles at $s=-1$ and $s=-2$: real, distinct, left-half-plane, so the response is overdamped.",
      expert: `
**First glance:** single loop, capacitor output. An expert does not derive anything - this network has a memorized answer:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{1/LC}{s^{2}+\\frac{R}{L}s+\\frac{1}{LC}}$$

Substitute: $\\tfrac{1}{LC}=\\tfrac{1}{1\\cdot\\frac12}=2$ and $\\tfrac{R}{L}=3$, giving $\\tfrac{2}{s^{2}+3s+2}$. Five seconds, no algebra.

**Discard:** writing KVL in the time domain, mesh matrices, Cramer's rule. One loop means one unknown, so a voltage divider is sufficient.

**The arithmetic trap, and where everyone hits it:** $Z_{C}=\\tfrac{1}{Cs}$ with $C=\\tfrac12$ gives $\\tfrac{2}{s}$, not $\\tfrac{1}{2s}$. That is a factor-of-four error and it is the single most common mistake in this section. Say "one over $C$ times $s$" and compute $\\tfrac1C$ first.

**Free check an expert always runs:** dc gain. Capacitor blocks dc, no current, nothing dropped across $R$ or $L$, so the gain must be exactly 1. $\\tfrac22=1$ ✓ If it is not 1, you made an error - before you write another line.
`,
      solution: `
**Step 1: replace each component by its impedance.**

$$Z_{L}=Ls=(1)s=s$$

$$Z_{R}=R=3$$

$$Z_{C}=\\frac{1}{Cs}=\\frac{1}{\\left(\\tfrac12\\right)s}=\\frac{2}{s}$$

*Work that last one carefully:* dividing by $\\tfrac12 s$ is multiplying by
$\\dfrac{2}{s}$. Writing $\\dfrac{1}{2s}$ is off by a factor of 4.

**Step 2: recognize the topology.**

One loop, so the **same current** flows through all three components. Elements carrying
the same current are in **series**, so impedances add:

$$Z_{\\text{total}}(s)=s+3+\\frac{2}{s}$$

**Step 3: apply the voltage divider.**

The output is taken across the capacitor alone:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{Z_{C}}{Z_{\\text{total}}}=\\frac{\\dfrac{2}{s}}{s+3+\\dfrac{2}{s}}$$

**Step 4: clear the compound fraction.**

Multiply numerator and denominator by $s$, distributing carefully:

$$\\frac{\\dfrac{2}{s}\\cdot s}{\\left(s+3+\\dfrac{2}{s}\\right)s}
=\\frac{2}{s\\cdot s+3s+\\dfrac{2}{s}\\cdot s}=\\frac{2}{s^{2}+3s+2}$$

**Step 5: factor.** Two numbers multiplying to 2, adding to 3: 1 and 2.

$$\\boxed{\\;\\frac{V_{C}(s)}{V(s)}=\\frac{2}{(s+1)(s+2)}\\;}$$

**Poles:** $s=-1$, $s=-2$. Discriminant $9-8=1>0$, so real and distinct - **overdamped**,
no oscillation.

---

**Check: dc gain.** At $s=0$: $\\dfrac{2}{2}=1$.

Physically correct. In steady state a capacitor blocks dc current. With no current, no
voltage drops across $R$ ($v=Ri=0$) or $L$ ($v=L\\,di/dt=0$). Every volt appears across
the capacitor: unity gain.

**The general form.** In symbols:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{1/LC}{s^{2}+\\dfrac{R}{L}s+\\dfrac{1}{LC}}$$

Check: $1/LC=1/(1\\cdot\\tfrac12)=2\\;\\checkmark$ and $R/L=3\\;\\checkmark$

You meet this again in Chapter 4 as
$\\dfrac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$.
`
    },

    {
      id: "2-14", difficulty: "core", topic: "Electrical networks",
      sec: "2.4",
      prompt: `For the two-mesh network below find $\\dfrac{I_{2}(s)}{V(s)}$. Values: $R_{1}=2\\ \\Omega$, $L=1$ H (shared between the meshes), $R_{2}=3\\ \\Omega$, $C=\\tfrac12$ F.

<svg viewBox="0 0 500 192" width="100%" style="max-width:500px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="72" cy="104" r="21"/><path d="M66 96 L78 96 M72 90 L72 102" stroke-width="1.7"/><path d="M66 113 L78 113" stroke-width="1.7"/><path d="M72 83 L72 44 L132 44"/><path d="M132 44 L136.2 35 L144.5 53 L152.8 35 L161.2 53 L169.5 35 L177.8 53 L182 44"/><path d="M182 44 L258 44 L258 72"/><path d="M258 72 a7.0 7.0 0 0 0 0 14.0 a7.0 7.0 0 0 0 0 14.0 a7.0 7.0 0 0 0 0 14.0 a7.0 7.0 0 0 0 0 14.0"/><path d="M258 128 L258 172 L72 172 L72 125"/><path d="M258 44 L340 44"/><path d="M340 44 L344.2 35 L352.5 53 L360.8 35 L369.2 53 L377.5 35 L385.8 53 L390 44"/><path d="M390 44 L452 44 L452 92"/><path d="M440.0 92 L464.0 92"/><path d="M440.0 105 L464.0 105"/><path d="M452 105 L452 172 L258 172"/><path d="M139.3 127.4 A27 27 0 1 1 164.7 136.6" stroke="#8A97A6" stroke-width="1.7" fill="none"/><polygon points="158.3,137.7 168.9,133.0 169.8,138.6" fill="#8A97A6" stroke="none"/><path d="M335.3 127.4 A27 27 0 1 1 360.7 136.6" stroke="#8A97A6" stroke-width="1.7" fill="none"/><polygon points="354.3,137.7 364.9,133.0 365.8,138.6" fill="#8A97A6" stroke="none"/><g stroke="none">
<text x="44" y="109" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="end" font-style="italic">V(s)</text>
<text x="157" y="30" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">1</tspan></text>
<text x="232" y="104" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">L</text>
<text x="365" y="30" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">2</tspan></text>
<text x="480" y="104" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C</text>
<text x="160" y="152" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">I<tspan font-size="10" dy="4">1</tspan></text>
<text x="356" y="152" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">I<tspan font-size="10" dy="4">2</tspan></text>
</g>
</g>
</svg>`,
      hint: "Write the two mesh equations by inspection: diagonal = sum of impedances around that mesh, off-diagonal = negative of the shared impedance. Then Cramer's rule.",
      answer: "$$\\frac{I_{2}(s)}{V(s)}=\\frac{s^{2}}{5s^{2}+8s+4}$$",
      expert: `
**First glance:** two loops, one shared element, output is a current. Mesh analysis, by inspection, Cramer's rule. That decision takes no thought - *current output* points at mesh, and two meshes versus two nodes is a tie broken by what is asked for.

**The by-inspection write-down**, straight from the figure without any KVL:
- diagonal 1 = everything in mesh 1 = $2+s$
- diagonal 2 = everything in mesh 2 = $s+3+\\tfrac2s$
- off-diagonal = $-$(shared) = $-s$, both places

**The symmetry check is free and non-negotiable.** Off-diagonals must match. They do. If they had not, an expert stops there rather than propagating the error through a determinant.

**Cramer, not elimination.** You want $I_{2}$ only, so replace column 2 and divide. Solving for $I_{1}$ first and back-substituting is twice the work for the same answer.

**Structural expectations before computing:** dc gain must be 0 (capacitor blocks dc in mesh 2) and the high-frequency limit must be finite. Getting $\\tfrac{s^{2}}{5s^{2}+8s+4}$ satisfies both - $0$ at $s=0$, $\\tfrac15$ at $s=\\infty$. Two independent checks.
`,
      solution: `
**Step 1: impedances.**

$$Z_{R_{1}}=2,\\quad Z_{L}=s,\\quad Z_{R_{2}}=3,\\quad Z_{C}=\\frac{1}{\\tfrac12 s}=\\frac{2}{s}$$

**Step 2: mesh equations by inspection.**

*Mesh 1* contains $R_{1}$ and the shared inductor. Self impedance $2+s$; shared element
$s$; the only source is here:

$$(2+s)I_{1}(s)-sI_{2}(s)=V(s)$$

*Mesh 2* contains the shared inductor plus $R_{2}$ and $C$. Self impedance
$s+3+\\dfrac{2}{s}$; shared element $s$; no source:

$$-sI_{1}(s)+\\left(s+3+\\frac{2}{s}\\right)I_{2}(s)=0$$

**Symmetry check.** Both off-diagonals are $-s$. They match, as they must.

**Step 3: clean up mesh 2.**

$$s+3+\\frac{2}{s}=\\frac{s^{2}}{s}+\\frac{3s}{s}+\\frac{2}{s}=\\frac{s^{2}+3s+2}{s}$$

**Step 4: matrix form.**

$$\\begin{bmatrix} 2+s & -s \\\\[4pt] -s & \\dfrac{s^{2}+3s+2}{s}\\end{bmatrix}
\\begin{bmatrix} I_{1} \\\\[4pt] I_{2}\\end{bmatrix}=\\begin{bmatrix} V(s) \\\\[4pt] 0\\end{bmatrix}$$

**Step 5: Cramer's rule for $I_{2}$: replace column 2.**

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} 2+s & V(s) \\\\ -s & 0\\end{vmatrix}=(2+s)(0)-V(s)(-s)=sV(s)$$

using $\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.

**Step 6: the system determinant.**

$$\\det\\mathbf{A}=(2+s)\\cdot\\frac{s^{2}+3s+2}{s}-(-s)(-s)=\\frac{(2+s)\\left(s^{2}+3s+2\\right)}{s}-s^{2}$$

*Careful:* $(-s)(-s)=+s^{2}$, and it is **subtracted**.

Expand the product:

$$(2+s)\\left(s^{2}+3s+2\\right)=2s^{2}+6s+4+s^{3}+3s^{2}+2s=s^{3}+5s^{2}+8s+4$$

Put everything over $s$:

$$\\det\\mathbf{A}=\\frac{s^{3}+5s^{2}+8s+4-s^{3}}{s}=\\frac{5s^{2}+8s+4}{s}$$

The $s^{3}$ terms cancel: a good sign the algebra is on track.

**Step 7: divide.** Dividing by a fraction means multiplying by its reciprocal:

$$\\frac{I_{2}(s)}{V(s)}=s\\cdot\\frac{s}{5s^{2}+8s+4}$$

$$\\boxed{\\;\\frac{I_{2}(s)}{V(s)}=\\frac{s^{2}}{5s^{2}+8s+4}\\;}$$

---

**Check: dc.** At $s=0$ the result is 0. Correct: the capacitor blocks dc, so no steady
current circulates in mesh 2.

**Check: high frequency.** As $s\\to\\infty$ the ratio tends to $\\tfrac15$. Finite and
nonzero is reasonable: the capacitor shorts and the inductor opens, leaving a resistive
path.

**Check: poles.** $5s^{2}+8s+4=0$ has discriminant $64-80=-16$, and
$\\sqrt{-16}=j4$, so

$$s=\\frac{-8\\pm j4}{2(5)}=\\frac{-8\\pm j4}{10}=-\\frac{4}{5}\\pm j\\frac{2}{5}$$

Left half-plane, underdamped. **Leave it as a fraction**: $-0.8\\pm j0.4$ is the same
number but costs you a calculator you will not have.
`
    },

    {
      id: "2-15", difficulty: "core", topic: "Electrical networks",
      sec: "2.4",
      prompt: `For the RC ladder network below find $\\dfrac{V_{2}(s)}{V(s)}$. All resistors are $1\\ \\Omega$ and both capacitors are $1$ F.

<svg viewBox="0 0 444 180" width="100%" style="max-width:444px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="74" cy="96" r="21"/><path d="M68 88 L80 88 M74 82 L74 94" stroke-width="1.7"/><path d="M68 105 L80 105" stroke-width="1.7"/><path d="M74 75 L74 40 L126 40"/><path d="M126 40 L130.0 31 L138.0 49 L146.0 31 L154.0 49 L162.0 31 L170.0 49 L174 40"/><path d="M174 40 L244 40"/><path d="M244 40 L248.0 31 L256.0 49 L264.0 31 L272.0 49 L280.0 31 L288.0 49 L292 40"/><path d="M292 40 L408 40"/><path d="M232 40 L232 78"/><path d="M220.0 78 L244.0 78"/><path d="M220.0 91 L244.0 91"/><path d="M232 91 L232 160"/><path d="M372 40 L372 78"/><path d="M360.0 78 L384.0 78"/><path d="M360.0 91 L384.0 91"/><path d="M372 91 L372 160"/><path d="M74 117 L74 160 L408 160"/><circle cx="232" cy="40" r="3.6" fill="#1A2028" stroke="none"/><circle cx="372" cy="40" r="3.6" fill="#1A2028" stroke="none"/><circle cx="408" cy="40" r="3.6" fill="#1A2028" stroke="none"/><circle cx="408" cy="160" r="3.6" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="30" y="101" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">V(s)</text>
<text x="150" y="26" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">1</tspan></text>
<text x="268" y="26" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">2</tspan></text>
<text x="200" y="90" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C<tspan font-size="10" dy="4">1</tspan></text>
<text x="340" y="90" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C<tspan font-size="10" dy="4">2</tspan></text>
<text x="222" y="26" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">V<tspan font-size="10" dy="4">1</tspan></text>
<text x="400" y="26" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">V<tspan font-size="10" dy="4">2</tspan></text>
</g>
</g>
</svg>`,
      hint: "Two independent nodes, and the output is a voltage - nodal analysis. Admittance of a resistor is $1/R$; of a capacitor, $Cs$.",
      answer: "$$\\frac{V_{2}(s)}{V(s)}=\\frac{1}{s^{2}+3s+1}$$",
      expert: `
**First glance:** output is a **voltage** at a node, and the network is a ladder. Nodal. That decision is automatic - voltage output plus shunt elements to ground is exactly what nodal analysis is for.

**The trap this problem exists to teach:** you cannot cascade $\\tfrac{1}{s+1}\\cdot\\tfrac{1}{s+1}$. An expert knows before writing anything that the second stage *loads* the first, and expects the answer to differ from $(s+1)^{2}$ by exactly the coupling term. Getting $s^{2}+3s+1$ instead of $s^{2}+2s+1$ is the loading, made visible.

**Substitution beats Cramer here.** The second node equation gives $V_{1}=(1+s)V_{2}$ directly; substituting is faster than setting up a determinant. Experts pick the tool per problem rather than running the same procedure every time.

**Two free structural checks:**
- dc gain must be 1 (capacitors open, no current, no drops).
- **A pure RC network can never oscillate.** So the poles must be real. Discriminant $9-4=5>0$ ✓. Had you computed complex poles, that is an error - no calculation needed to know it.

That second check is the kind of thing that separates someone who knows the algebra from someone who knows the physics.
`,
      solution: `
**Step 1: decide mesh or nodal.**

The output is a **voltage** at a node, and there are two independent nodes. Nodal
analysis puts the answer directly in hand.

**Step 2: list the admittances.** Nodal analysis uses $Y=1/Z$:

$$Y_{R_{1}}=\\frac{1}{R_{1}}=1,\\quad Y_{R_{2}}=1,\\quad Y_{C_{1}}=C_{1}s=s,\\quad Y_{C_{2}}=s$$

**Step 3: node equation at $V_{1}$.**

Admittances touching node 1: $R_{1}$ (to the source), $C_{1}$ (to ground), $R_{2}$ (to
node 2). Sum: $1+s+1=s+2$.

Admittance between nodes 1 and 2: $R_{2}$, giving 1.

The source drives current into node 1 through $R_{1}$, so the right side is $V/R_{1}=V$:

$$(s+2)V_{1}(s)-V_{2}(s)=V(s)$$

**Step 4: node equation at $V_{2}$.**

Admittances touching node 2: $R_{2}$ (to node 1) and $C_{2}$ (to ground). Sum: $1+s$.
No source current enters node 2:

$$-V_{1}(s)+(1+s)V_{2}(s)=0$$

**Symmetry check.** Both off-diagonals are $-1$. ✓

**Step 5: solve by substitution.**

From node 2: $\\;V_{1}(s)=(1+s)V_{2}(s)$.

Substitute into node 1:

$$(s+2)(1+s)V_{2}(s)-V_{2}(s)=V(s)$$

$$\\Bigl[(s+2)(s+1)-1\\Bigr]V_{2}(s)=V(s)$$

**Step 6: expand the bracket.**

$$(s+2)(s+1)=s^{2}+s+2s+2=s^{2}+3s+2$$

$$s^{2}+3s+2-1=s^{2}+3s+1$$

$$\\boxed{\\;\\frac{V_{2}(s)}{V(s)}=\\frac{1}{s^{2}+3s+1}\\;}$$

---

**Check: dc gain.** At $s=0$: $\\dfrac11=1$. Correct: at dc both capacitors are open,
so no current flows through either resistor, so neither drops voltage and $V_{2}=V$.

**Check: poles.** Discriminant $9-4(1)(1)=5>0$, so the poles are real and distinct:

$$s=\\frac{-3\\pm\\sqrt5}{2}$$

Stop there. This is the exact answer and the only one you can produce without a
calculator. To confirm both are negative without evaluating $\\sqrt5$: note
$2<\\sqrt5<3$ because $2^{2}=4$ and $3^{2}=9$, so $-3+\\sqrt5$ lies between $-1$ and
$0$. Both roots negative: stable, overdamped. **A pure RC network can never oscillate**, so complex
poles here would have signalled an error.

**Why the $-1$ matters.** Treating the two RC stages as independent and multiplying
$\\dfrac{1}{s+1}\\cdot\\dfrac{1}{s+1}$ gives $s^{2}+2s+1$ - wrong. The second stage
**loads** the first, and the $-1$ is exactly that loading. You cannot cascade circuit
stages by multiplying their individual transfer functions unless they are buffered.
`
    },

    {
      id: "2-16", difficulty: "core", topic: "Operational amplifiers",
      sec: "2.4",
      prompt: `For an **inverting** operational amplifier, $Z_{1}$ is a resistor $R_{1}=100$ k$\\Omega$ and $Z_{2}$ is a resistor $R_{2}=100$ k$\\Omega$ in **series** with a capacitor $C_{2}=10\\ \\mu$F. Find $\\dfrac{V_{o}(s)}{V_{i}(s)}$ and identify the controller type.

<svg viewBox="0 0 430 180" width="100%" style="max-width:430px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M22 104 L66 104"/><path d="M66 104 L70.0 95 L78.0 113 L86.0 95 L94.0 113 L102.0 95 L110.0 113 L114 104"/><path d="M114 104 L168 104"/><path d="M168 104 L168 50 L206 50"/><path d="M206 50 L210.0 41 L218.0 59 L226.0 41 L234.0 59 L242.0 41 L250.0 59 L254 50"/><path d="M254 50 L286 50"/><path d="M286 38.0 L286 62.0"/><path d="M299 38.0 L299 62.0"/><path d="M299 50 L356 50 L356 104"/><path d="M168 104 L196 104"/><path d="M196 74 L196 134 L268 104 Z" fill="none"/><path d="M268 104 L400 104"/><circle cx="356" cy="104" r="3.6" fill="#1A2028" stroke="none"/><path d="M196 128 L178 128 L178 150"/><path d="M166 150 L190 150 M170 156 L186 156 M174 162 L182 162" stroke-width="1.7"/><circle cx="22" cy="104" r="3.6" fill="#1A2028" stroke="none"/><circle cx="400" cy="104" r="3.6" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="90" y="90" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">1</tspan></text>
<text x="230" y="36" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">2</tspan></text>
<text x="300" y="36" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C<tspan font-size="10" dy="4">2</tspan></text>
<text x="8" y="98" font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">V<tspan font-size="10" dy="4">i</tspan></text>
<text x="408" y="98" font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">V<tspan font-size="10" dy="4">o</tspan></text>
<text x="207" y="89" font-family="Georgia,serif" font-size="16" fill="#1A2028" text-anchor="middle">−</text>
<text x="207" y="131" font-family="Georgia,serif" font-size="16" fill="#1A2028" text-anchor="middle">+</text>
</g>
</g>
</svg>`,
      hint: "Build $Z_{2}(s)$ first: series impedances add. Then apply the inverting formula. Convert units before plugging in numbers.",
      answer: "$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{s+1}{s}$$ This is a **PI (proportional-plus-integral) controller**.",
      expert: `
**First glance:** inverting op-amp, so $-\\tfrac{Z_{2}}{Z_{1}}$ and nothing else. The only real work is assembling $Z_{2}$.

**Series R and C is the PI shape.** An expert recognizes $R+\\tfrac{1}{Cs}$ as a proportional-plus-integral controller *from the topology*, before touching the numbers, and expects the answer to look like $-\\tfrac{\\tau s+1}{\\tau' s}$ with a pole at the origin.

**The unit handling that saves the problem:** $100\\text{ k}\\Omega\\times10\\ \\mu\\text{F}$. Do not multiply $100{,}000\\times0.00001$ digit by digit - recognize $10^{5}\\times10^{-5}=1$. Ohms times farads are seconds, so both products are 1-second time constants and the whole expression collapses to $-\\tfrac{s+1}{s}$.

**Discard:** deriving the op-amp relation from virtual ground each time. Derive it once, then use it.

**What the answer means, read instantly:** split it as $-\\left(1+\\tfrac1s\\right)$: a gain plus an integrator. The pole at the origin is what kills steady-state error in Chapter 9, and the zero at $-1/(R_{2}C_{2})$ is the one knob you get to place.
`,
      solution: `
**Step 1: build $Z_{2}(s)$.** $R_{2}$ and $C_{2}$ are in **series**, and series
impedances add:

$$Z_{2}(s)=R_{2}+\\frac{1}{C_{2}s}$$

**Step 2: $Z_{1}(s)=R_{1}$.**

**Step 3: apply the inverting formula.**

$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{Z_{2}(s)}{Z_{1}(s)}=-\\frac{R_{2}+\\dfrac{1}{C_{2}s}}{R_{1}}$$

**Step 4: clean up the compound fraction.**

Combine the numerator over the common denominator $C_{2}s$:

$$R_{2}+\\frac{1}{C_{2}s}=\\frac{R_{2}C_{2}s}{C_{2}s}+\\frac{1}{C_{2}s}=\\frac{R_{2}C_{2}s+1}{C_{2}s}$$

Divide by $R_{1}$:

$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{R_{2}C_{2}s+1}{R_{1}C_{2}s}$$

**Step 5: substitute numbers, converting units first.**

$$R_{1}=R_{2}=100\\ \\text{k}\\Omega=100{,}000\\ \\Omega,\\qquad C_{2}=10\\ \\mu\\text{F}=10^{-5}\\ \\text{F}$$

$$R_{2}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$$

$$R_{1}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$$

*Unit check:* ohms × farads = seconds, so both products are time constants of 1 second.

$$\\boxed{\\;\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{s+1}{s}\\;}$$

---

**Step 6: identify the controller.**

Split into additive pieces:

$$-\\frac{s+1}{s}=-\\left(\\frac{s}{s}+\\frac{1}{s}\\right)=-\\left(1+\\frac{1}{s}\\right)$$

- The **$1$** is a constant gain: a **proportional** term.
- The **$1/s$** is a pole at the origin. Division by $s$ is integration in the frequency
  domain, so this is an **integral** term.

Together: a **PI controller**. In Chapter 9 you use exactly this structure to drive
steady-state error to zero, because the pole at the origin raises the system type.

**The zero** sits at $s=-1/(R_{2}C_{2})=-1$. Designing a PI controller amounts to
choosing where to place that zero via $R_{2}$ and $C_{2}$.

**The minus sign** is inherent to the inverting configuration. It is normally cancelled
by a second inverting stage or absorbed into the summing-junction sign convention.
`
    },

    {
      id: "2-17", difficulty: "core", topic: "Operational amplifiers",
      sec: "2.4",
      prompt: "A **noninverting** operational amplifier has $Z_{1}=R_{1}=100$ k$\\Omega$ from the inverting terminal to ground, and feedback element $Z_{2}$ consisting of $R_{2}=100$ k$\\Omega$ in **parallel** with $C_{2}=10\\ \\mu$F. Find $\\dfrac{V_{o}(s)}{V_{i}(s)}$.",
      hint: "Parallel impedances combine as a product over a sum. Then use the noninverting formula, which has no minus sign.",
      answer: "$$\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{s+2}{s+1}$$",
      expert: `
**First glance:** noninverting, so use the split form $1+\\tfrac{Z_{2}}{Z_{1}}$ rather than $\\tfrac{Z_{1}+Z_{2}}{Z_{1}}$. Same equation, but the split version means you never combine fractions.

**Memorize the parallel RC result**, do not re-derive it:

$$R\\parallel C=\\frac{R}{RCs+1}$$

It appears constantly from here to Chapter 11.

**The two limits tell you the answer before you finish.** At dc the capacitor opens, so gain $=1+\\tfrac{R_{2}}{R_{1}}=2$. At high frequency the capacitor shorts, so $Z_{2}\\to0$ and gain $\\to1$. So the answer must be a first-order function running from 2 down to 1: that is $\\tfrac{s+2}{s+1}$, essentially forced. An expert often writes the answer from the two limits and uses the algebra only as confirmation.

**The instant sanity test:** a noninverting amplifier **cannot attenuate**. If your magnitude ever drops below 1, you used the inverting formula. And there is no minus sign anywhere in the noninverting configuration.

**What it is:** zero at $-2$, pole at $-1$, pole closer to the origin: a lag compensator, recognized by shape.
`,
      solution: `
**Step 1: build $Z_{2}(s)$ for the parallel combination.**

$$Z_{2}(s)=\\frac{Z_{R_{2}}\\cdot Z_{C_{2}}}{Z_{R_{2}}+Z_{C_{2}}}=\\frac{R_{2}\\cdot\\dfrac{1}{C_{2}s}}{R_{2}+\\dfrac{1}{C_{2}s}}$$

**Step 2: simplify.** Multiply numerator and denominator by $C_{2}s$:

*Numerator:* $R_{2}\\cdot\\dfrac{1}{C_{2}s}\\cdot C_{2}s=R_{2}$

*Denominator:* $\\left(R_{2}+\\dfrac{1}{C_{2}s}\\right)C_{2}s=R_{2}C_{2}s+1$

$$Z_{2}(s)=\\frac{R_{2}}{R_{2}C_{2}s+1}$$

A standing result: **a resistor parallel with a capacitor has impedance
$\\dfrac{R}{RCs+1}$.**

**Step 3: substitute numbers.** $R_{2}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$:

$$Z_{2}(s)=\\frac{100{,}000}{s+1}$$

**Step 4: apply the noninverting formula.**

$$\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{Z_{1}(s)+Z_{2}(s)}{Z_{1}(s)}=\\frac{Z_{1}}{Z_{1}}+\\frac{Z_{2}}{Z_{1}}=1+\\frac{Z_{2}}{Z_{1}}$$

**Step 5: evaluate.**

$$\\frac{Z_{2}}{Z_{1}}=\\frac{\\dfrac{100{,}000}{s+1}}{100{,}000}=\\frac{1}{s+1}$$

$$\\frac{V_{o}(s)}{V_{i}(s)}=1+\\frac{1}{s+1}=\\frac{s+1}{s+1}+\\frac{1}{s+1}=\\frac{s+2}{s+1}$$

$$\\boxed{\\;\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{s+2}{s+1}\\;}$$

---

**Check: dc gain.** At $s=0$: $\\dfrac{2}{1}=2$.

Sanity: at dc the capacitor is open, so $Z_{2}=R_{2}=100$ k$\\Omega$ and the gain is
$1+R_{2}/R_{1}=1+1=2\\;\\checkmark$

**Check: high-frequency gain.** As $s\\to\\infty$: $\\to1$.

Sanity: at high frequency the capacitor shorts, so $Z_{2}\\to0$ and the gain is
$1+0=1\\;\\checkmark$

**Check: the sign.** No minus sign, and the gain never drops below 1. Both are
signatures of the noninverting configuration: it **cannot** attenuate. A magnitude below
1 anywhere means the wrong formula was used.

**This is a lag compensator.** Zero at $s=-2$, pole at $s=-1$; the pole is closer to the
origin than the zero. You design these deliberately in Chapter 9.
`
    },

    {
      id: "2-18", difficulty: "core", topic: "Mechanical systems",
      sec: "2.5",
      prompt: `For the translational mechanical system below find $\\dfrac{X(s)}{F(s)}$. Take $M=1$ kg, $f_{v}=5$ N-s/m, $K=6$ N/m. State whether the poles are real or complex.

<svg viewBox="0 0 400 180" width="100%" style="max-width:400px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M30 22 L30 158"/><path d="M30 22 L17 35" stroke-width="1.6"/><path d="M30 39 L17 52" stroke-width="1.6"/><path d="M30 56 L17 69" stroke-width="1.6"/><path d="M30 73 L17 86" stroke-width="1.6"/><path d="M30 90 L17 103" stroke-width="1.6"/><path d="M30 107 L17 120" stroke-width="1.6"/><path d="M30 124 L17 137" stroke-width="1.6"/><path d="M30 141 L17 154" stroke-width="1.6"/><path d="M30 54 L58 54"/><path d="M58 54 L67.0 69 L76.0 39 L85.0 69 L94.0 39 L103.0 69 L112.0 39 L121.0 69 L130.0 39 L130 54"/><path d="M130 54 L206 54"/><path d="M30 118 L52 118"/><path d="M52 118 L100.8 118"/><path d="M100.8 107.0 L100.8 129.0" stroke-width="2.4"/><path d="M79.72 103.0 L118.0 103.0 L118.0 133.0 L79.72 133.0" fill="none"/><path d="M118.0 118 L134 118"/><path d="M134 118 L206 118"/><rect x="206" y="44" width="84" height="84" fill="#EDF2F7"/><text x="248.0" y="91.0" font-family="Georgia,serif" font-size="15" fill="#1A2028" text-anchor="middle" font-style="italic">M</text><path d="M300 86 L346.0 86.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="359.0,86.0 346.9,89.1 346.9,82.9" fill="#1A2028" stroke="none"/><path d="M226 28 L266.0 28.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="279.0,28.0 266.9,31.1 266.9,24.9" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="94" y="26" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K</text>
<text x="92" y="166" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f<tspan font-size="10" dy="4">v</tspan></text>
<text x="374" y="91" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f(t)</text>
<text x="249" y="16" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x(t)</text>
</g>
</g>
</svg>`,
      hint: "Draw the free-body diagram first. Every element attached to the mass contributes a force opposing the assumed positive motion.",
      answer: "$$\\frac{X(s)}{F(s)}=\\frac{1}{s^{2}+5s+6}=\\frac{1}{(s+2)(s+3)}$$ Poles at $s=-2$ and $s=-3$: real and distinct, so overdamped.",
      expert: `
**First glance:** one mass, wall-mounted spring and damper, force in, displacement out. The answer can be written directly, without drawing a free-body diagram:

$$\\left[Ms^{2}+f_{v}s+K\\right]X(s)=F(s)$$

because it is the same "sum of impedances times the variable equals the source" pattern as a series RLC loop. Mass plays inductor, damper plays resistor, spring plays inverse capacitor.

**Free-body diagrams are training wheels.** Draw them until the impedance pattern is automatic, then stop. On an exam they cost a minute you do not have.

**Discard:** anything about relative displacement. One end of each element is fixed to the wall, so every element sees the absolute motion $x$.

**The dc check that costs two seconds:** at $s=0$, $X/F=\\tfrac1K=\\tfrac16$. Physically a constant force compresses only the spring - the damper needs velocity and the mass needs acceleration, and there is neither at rest. If your $s\\to0$ limit is not $1/K$ for a wall-mounted single mass, something is wrong.

**Read the damping in passing:** discriminant $25-24=1>0$, so real distinct poles, overdamped, no oscillation. That is Chapter 4 language you can already produce here.
`,
      solution: `
**Step 1: assume a positive direction.**

Take motion to the **right** as positive, matching $x(t)$ and $f(t)$ in the figure. This
is the mechanical equivalent of choosing a current direction - the answer does not depend
on the choice, but every sign afterward does.

**Step 2: draw the free-body diagram.**

| Element | Force on the mass | Direction |
|---|---|---|
| Applied force | $f(t)$ | right (positive) |
| Spring $K$ | $Kx(t)$ | left (opposes displacement) |
| Damper $f_{v}$ | $f_{v}\\dfrac{dx}{dt}$ | left (opposes velocity) |
| Inertial reaction | $M\\dfrac{d^{2}x}{dt^{2}}$ | left (opposes acceleration) |

**Step 3: sum the forces.**

$$M\\frac{d^{2}x}{dt^{2}}+f_{v}\\frac{dx}{dt}+Kx(t)=f(t)$$

With the numbers:

$$\\frac{d^{2}x}{dt^{2}}+5\\frac{dx}{dt}+6x(t)=f(t)$$

**Step 4: Laplace transform with zero initial conditions.**

$$s^{2}X(s)+5sX(s)+6X(s)=F(s)$$

**Step 5: factor and form the ratio.**

$$\\left(s^{2}+5s+6\\right)X(s)=F(s)$$

$$\\frac{X(s)}{F(s)}=\\frac{1}{s^{2}+5s+6}$$

**Step 6: factor the denominator.** Two numbers multiplying to 6, adding to 5: 2 and 3.

$$\\boxed{\\;\\frac{X(s)}{F(s)}=\\frac{1}{(s+2)(s+3)}\\;}$$

**Poles:** $s=-2$, $s=-3$. Discriminant $25-24=1>0$ - **real and distinct**, so
overdamped, no oscillation.

---

**The shortcut you should be using.** Look at the structure of Step 5:

$$\\left[\\underbrace{Ms^{2}}_{\\text{mass}}+\\underbrace{f_{v}s}_{\\text{damper}}+\\underbrace{K}_{\\text{spring}}\\right]X(s)=F(s)$$

You can write this line directly from the figure without drawing the free-body diagram at
all. It is the exact analogue of the series RLC loop
$\\left[Ls+R+\\tfrac{1}{Cs}\\right]I(s)=V(s)$: mass plays inductance, damper plays
resistance, spring plays inverse capacitance.

**Check: dc.** At $s=0$: $X/F=\\tfrac16$. Physically, a constant force compresses only
the spring (nothing moving, so the damper and mass contribute nothing), giving
$x=f/K=f/6\\;\\checkmark$
`
    },

    {
      id: "2-19", difficulty: "core", topic: "Mechanical systems",
      sec: "2.5",
      prompt: `For the two-degree-of-freedom system below find $\\dfrac{X_{2}(s)}{F(s)}$. Take $M_{1}=M_{2}=1$ kg, $K_{1}=K_{2}=1$ N/m, $f_{v}=1$ N-s/m. The force $f(t)$ is applied to $M_{2}$.

<svg viewBox="0 0 510 190" width="100%" style="max-width:510px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M26 26 L26 178"/><path d="M26 26 L13 39" stroke-width="1.6"/><path d="M26 43 L13 56" stroke-width="1.6"/><path d="M26 60 L13 73" stroke-width="1.6"/><path d="M26 77 L13 90" stroke-width="1.6"/><path d="M26 94 L13 107" stroke-width="1.6"/><path d="M26 111 L13 124" stroke-width="1.6"/><path d="M26 128 L13 141" stroke-width="1.6"/><path d="M26 145 L13 158" stroke-width="1.6"/><path d="M26 162 L13 175" stroke-width="1.6"/><path d="M26 92 L46 92"/><path d="M46 92 L54.0 107 L62.0 77 L70.0 107 L78.0 77 L86.0 107 L94.0 77 L102.0 107 L110.0 77 L110 92"/><path d="M110 92 L132 92"/><rect x="132" y="52" width="78" height="80" fill="#EDF2F7"/><text x="171.0" y="97.0" font-family="Georgia,serif" font-size="15" fill="#1A2028" text-anchor="middle" font-style="italic">M<tspan font-size="11" dy="4">1</tspan></text><path d="M210 70 L238 70"/><path d="M238 70 L246.2 85 L254.5 55 L262.8 85 L271.0 55 L279.2 85 L287.5 55 L295.8 85 L304.0 55 L304 70"/><path d="M304 70 L330 70"/><path d="M210 114 L232 114"/><path d="M232 114 L274.9 114"/><path d="M274.9 103.0 L274.9 125.0" stroke-width="2.4"/><path d="M256.36 99.0 L290.0 99.0 L290.0 129.0 L256.36 129.0" fill="none"/><path d="M290.0 114 L306 114"/><path d="M306 114 L330 114"/><rect x="330" y="52" width="78" height="80" fill="#EDF2F7"/><text x="369.0" y="97.0" font-family="Georgia,serif" font-size="15" fill="#1A2028" text-anchor="middle" font-style="italic">M<tspan font-size="11" dy="4">2</tspan></text><path d="M408 92 L456.0 92.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="469.0,92.0 456.9,95.1 456.9,88.9" fill="#1A2028" stroke="none"/><path d="M150 36 L190.0 36.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="203.0,36.0 190.9,39.1 190.9,32.9" fill="#1A2028" stroke="none"/><path d="M348 36 L388.0 36.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="401.0,36.0 388.9,39.1 388.9,32.9" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="78" y="68" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K<tspan font-size="10" dy="4">1</tspan></text>
<text x="271" y="44" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K<tspan font-size="10" dy="4">2</tspan></text>
<text x="268" y="160" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f<tspan font-size="10" dy="4">v</tspan></text>
<text x="484" y="97" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f(t)</text>
<text x="173" y="24" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">1</tspan></text>
<text x="371" y="24" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">2</tspan></text>
</g>
</g>
</svg>`,
      hint: "Two masses means two equations. Build the matrix by inspection: diagonal = everything touching that mass, off-diagonal = negative of what is shared.",
      answer: "$$\\frac{X_{2}(s)}{F(s)}=\\frac{s^{2}+s+2}{s^{4}+2s^{3}+3s^{2}+s+1}$$",
      expert: `
**First glance:** two masses, so **two equations and a fourth-order denominator**. Predicting the order before computing is the single fastest error check available - if your determinant comes out cubic or fifth-order, stop.

**The by-inspection write-down**, with the one rule that matters:

> A spring or damper *between* two masses appears on **both** diagonals **and** on the off-diagonal: three appearances for one component.

That is where nearly every lost point in this section comes from. Experts consciously say "$K_{2}$ and $f_{v}$: diagonal 1, diagonal 2, off-diagonal" while writing.

**The algebra shortcut that makes the determinant tractable by hand:** substitute $u=s^{2}+s$. Then $(u+2)(u+1)=u^{2}+3u+2$, expand $u^{2}=s^{4}+2s^{3}+s^{2}$ once, and you are done. Multiplying two quadratics term by term invites a dropped $s^{3}$.

**Symmetry check** before the determinant. **Order check** after it. **DC check** at the end: springs in series combine like capacitors, $K_{\\text{eq}}=\\tfrac{K_{1}K_{2}}{K_{1}+K_{2}}=\\tfrac12$, so $X_{2}/F\\to2$. The formula gives $\\tfrac21=2$ ✓ Three independent checks.
`,
      solution: `
**Step 1: inventory what touches each mass.**

*Touching $M_{1}$:*
- the mass: $M_{1}s^{2}=s^{2}$
- spring $K_{1}$ to the wall: $1$
- spring $K_{2}$ to $M_{2}$: $1$
- damper $f_{v}$ to $M_{2}$: $s$

Sum: $s^{2}+s+2$

*Touching $M_{2}$:*
- the mass: $s^{2}$
- spring $K_{2}$ to $M_{1}$: $1$
- damper $f_{v}$ to $M_{1}$: $s$

Sum: $s^{2}+s+1$

*Shared:* spring $K_{2}$ and damper $f_{v}$, so $K_{2}+f_{v}s=s+1$

**This is the step people get wrong.** $K_{2}$ and $f_{v}$ appear on **both** diagonals
*and* on the off-diagonal. They are not "assigned" to one mass: each connects two masses
and therefore contributes three times in total.

**Step 2: write the equations.** Diagonal positive, off-diagonal negative, force at
$M_{2}$ only:

$$\\left(s^{2}+s+2\\right)X_{1}(s)-\\left(s+1\\right)X_{2}(s)=0$$

$$-\\left(s+1\\right)X_{1}(s)+\\left(s^{2}+s+1\\right)X_{2}(s)=F(s)$$

**Symmetry check.** Both off-diagonals are $-(s+1)$. ✓

**Step 3: matrix form.**

$$\\begin{bmatrix} s^{2}+s+2 & -(s+1) \\\\ -(s+1) & s^{2}+s+1\\end{bmatrix}
\\begin{bmatrix} X_{1} \\\\ X_{2}\\end{bmatrix}=\\begin{bmatrix} 0 \\\\ F(s)\\end{bmatrix}$$

**Step 4: Cramer's rule for $X_{2}$: replace column 2.**

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} s^{2}+s+2 & 0 \\\\ -(s+1) & F(s)\\end{vmatrix}
=\\left(s^{2}+s+2\\right)F(s)-0=\\left(s^{2}+s+2\\right)F(s)$$

**Step 5: the system determinant.**

$$\\det\\mathbf{A}=\\left(s^{2}+s+2\\right)\\left(s^{2}+s+1\\right)-\\bigl[-(s+1)\\bigr]^{2}$$

*Careful:* $\\bigl[-(s+1)\\bigr]^{2}=(s+1)^{2}$: squaring kills the minus: and the whole
thing is subtracted.

Substitute $u=s^{2}+s$ to keep the algebra manageable:

$$(u+2)(u+1)=u^{2}+3u+2$$

Now $u^{2}=\\left(s^{2}+s\\right)^{2}$. Expand with $(a+b)^{2}=a^{2}+2ab+b^{2}$ where
$a=s^{2}$, $b=s$:

$$\\left(s^{2}+s\\right)^{2}=s^{4}+2s^{3}+s^{2}$$

$$u^{2}+3u+2=s^{4}+2s^{3}+s^{2}+3\\left(s^{2}+s\\right)+2=s^{4}+2s^{3}+4s^{2}+3s+2$$

And $(s+1)^{2}=s^{2}+2s+1$. Subtract term by term: $4s^{2}-s^{2}=3s^{2}$, $3s-2s=s$,
$2-1=1$:

$$\\det\\mathbf{A}=s^{4}+2s^{3}+3s^{2}+s+1$$

**Step 6: divide.**

$$\\boxed{\\;\\frac{X_{2}(s)}{F(s)}=\\frac{s^{2}+s+2}{s^{4}+2s^{3}+3s^{2}+s+1}\\;}$$

---

**Check: order.** Two masses, each second order, gives a fourth-order denominator. **The
denominator order should equal twice the number of masses** - a fast structural check.

**Check: dc.** At $s=0$: $\\dfrac21=2$.

Sanity: apply a constant force to $M_{2}$. In steady state nothing moves, so the damper
is inert and only springs matter. $K_{1}$ and $K_{2}$ are in series between the wall and
$M_{2}$; springs in series combine like capacitors:
$K_{\\text{eq}}=\\dfrac{K_{1}K_{2}}{K_{1}+K_{2}}=\\dfrac12$. So
$x_{2}=f/K_{\\text{eq}}=2f\\;\\checkmark$
`
    },

    {
      id: "2-20", difficulty: "core", topic: "Nonlinearities",
      sec: "2.10",
      prompt: `Determine whether each system is linear. Test **both** required properties and show the test.

**(a)** $c(t)=5r(t)$
**(b)** $c(t)=r(t)+3$
**(c)** $c(t)=\\left[r(t)\\right]^{2}$`,
      hint: "A system is linear only if it satisfies superposition AND homogeneity. Failing either is enough to make it nonlinear.",
      answer: "**(a)** Linear: passes both. **(b)** Nonlinear: fails both, despite a straight-line graph. **(c)** Nonlinear: fails both.",
      expert: `
**First glance:** you do not need to run both tests on all three. **Homogeneity is the cheaper test**, so try it first - if it fails, you are done and superposition never gets checked.

- (b) $c=r+3$: double the input, output goes to $2r+3$, not $2r+6$. Fails. Stop.
- (c) $c=r^{2}$: double the input, output quadruples. Fails. Stop.

**The one-line recognition test that beats both:** a system is linear only if the relationship is a **constant times the variable or its derivatives, summed.** Any constant offset, any power, product, root, trig, exponential or log of the variable disqualifies it instantly.

So on sight: (a) linear, (b) affine: not linear, (c) nonlinear.

**The trap this problem exists for:** "straight line" $\\ne$ "linear." $c=r+3$ plots as a perfectly straight line and fails both properties. Section 2.11 exists because affine relationships require an operating point and deviation variables before the tools of this course apply.

**Worth stating on an exam:** name *which* property fails and show the counterexample. "It is nonlinear" with no test earns partial credit at best.
`,
      solution: `
**The two required properties.**

- **Superposition:** if $r_{1}\\to c_{1}$ and $r_{2}\\to c_{2}$, the response to
  $r_{1}+r_{2}$ must equal $c_{1}+c_{2}$.
- **Homogeneity:** if $r_{1}\\to c_{1}$, the response to $Ar_{1}$ must equal $Ac_{1}$ for
  any constant $A$.

**Both** must hold.

---

## (a) $c(t)=5r(t)$

**Superposition.** Individual: $c_{1}=5r_{1}$, $c_{2}=5r_{2}$, so
$c_{1}+c_{2}=5r_{1}+5r_{2}$.

Response to the summed input: $\\;5\\left(r_{1}+r_{2}\\right)=5r_{1}+5r_{2}$

Equal. **Holds.**

**Homogeneity.** Response to $Ar_{1}$: $\\;5\\left(Ar_{1}\\right)=5Ar_{1}$

$A$ times the original: $\\;A\\left(5r_{1}\\right)=5Ar_{1}$

Equal. **Holds.**

**Conclusion: linear.** ✓

---

## (b) $c(t)=r(t)+3$

**Superposition.** Individual: $c_{1}=r_{1}+3$, $c_{2}=r_{2}+3$, so

$$c_{1}+c_{2}=r_{1}+r_{2}+6$$

Response to the summed input: $\\;\\left(r_{1}+r_{2}\\right)+3$

Compare $r_{1}+r_{2}+6$ against $r_{1}+r_{2}+3$. **Not equal** - off by 3. **Fails.**

**Homogeneity.** Response to $Ar_{1}$: $\\;Ar_{1}+3$

$A$ times the original: $\\;A\\left(r_{1}+3\\right)=Ar_{1}+3A$

Equal only if $A=1$. **Fails.**

**Conclusion: nonlinear.**

**Why this matters.** The graph of $c=r+3$ is a perfectly straight line. Students
reasonably assume "straight line = linear." In systems theory it is not - the nonzero
intercept breaks both properties. This relationship is called *affine*, and it is exactly
why linearization uses **deviation variables**: subtracting off the operating point
removes the offending constant.

---

## (c) $c(t)=\\left[r(t)\\right]^{2}$

**Superposition.** Individual: $c_{1}=r_{1}^{2}$, $c_{2}=r_{2}^{2}$, so
$c_{1}+c_{2}=r_{1}^{2}+r_{2}^{2}$.

Response to the summed input:

$$\\left(r_{1}+r_{2}\\right)^{2}=r_{1}^{2}+2r_{1}r_{2}+r_{2}^{2}$$

An extra **cross term** $2r_{1}r_{2}$. **Fails.**

**Homogeneity.** Response to $Ar_{1}$: $\\;\\left(Ar_{1}\\right)^{2}=A^{2}r_{1}^{2}$

$A$ times the original: $\\;Ar_{1}^{2}$

Equal only if $A^{2}=A$, i.e. $A=0$ or $A=1$. **Fails.**

**Conclusion: nonlinear.**

**The general signal.** Any power, product, root, trig function, exponential or logarithm
of the variable makes a system nonlinear. Linear terms are only constants multiplying the
variable or its derivatives.
`
    },

    {
      id: "2-21", difficulty: "challenge", topic: "Mechanical systems",
      sec: "2.5",
      prompt: `A vibration test rig is built as follows. Block $M_{1}$ is anchored to a rigid wall by a spring $K_{1}$ and a viscous damper $f_{v1}$ acting in parallel. A second spring $K_{2}$ connects $M_{1}$ to block $M_{2}$. Block $M_{2}$ is additionally tied to ground by its own viscous damper $f_{v2}$. The shaker applies force $f(t)$ **to $M_{1}$**, and an accelerometer measures the motion of $M_{2}$.

Values: $M_{1}=M_{2}=1$ kg, $K_{1}=1$ N/m, $f_{v1}=1$ N-s/m, $K_{2}=2$ N/m, $f_{v2}=1$ N-s/m.

Find $\\dfrac{X_{2}(s)}{F(s)}$.

<svg viewBox="0 0 440 268" width="100%" style="max-width:440px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M26 26 L26 156"/><path d="M26 26 L13 39" stroke-width="1.6"/><path d="M26 43 L13 56" stroke-width="1.6"/><path d="M26 60 L13 73" stroke-width="1.6"/><path d="M26 77 L13 90" stroke-width="1.6"/><path d="M26 94 L13 107" stroke-width="1.6"/><path d="M26 111 L13 124" stroke-width="1.6"/><path d="M26 128 L13 141" stroke-width="1.6"/><path d="M26 145 L13 158" stroke-width="1.6"/><path d="M26 64 L46 64"/><path d="M46 64 L53.2 79 L60.5 49 L67.8 79 L75.0 49 L82.2 79 L89.5 49 L96.8 79 L104.0 49 L104 64"/><path d="M104 64 L130 64"/><path d="M26 124 L48 124"/><path d="M48 124 L87.9 124"/><path d="M87.9 113.0 L87.9 135.0" stroke-width="2.4"/><path d="M70.68 109.0 L102.0 109.0 L102.0 139.0 L70.68 139.0" fill="none"/><path d="M102.0 124 L118 124"/><path d="M118 124 L130 124"/><rect x="130" y="48" width="78" height="96" fill="#EDF2F7"/><text x="169.0" y="101.0" font-family="Georgia,serif" font-size="15" fill="#1A2028" text-anchor="middle" font-style="italic">M<tspan font-size="11" dy="4">1</tspan></text><path d="M169 48 L169 26"/><path d="M169 26 L230.0 26.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="243.0,26.0 230.9,29.1 230.9,22.9" fill="#1A2028" stroke="none"/><path d="M208 96 L238 96"/><path d="M238 96 L245.8 111 L253.5 81 L261.2 111 L269.0 81 L276.8 111 L284.5 81 L292.2 111 L300.0 81 L300 96"/><path d="M300 96 L328 96"/><rect x="328" y="48" width="78" height="96" fill="#EDF2F7"/><text x="367.0" y="101.0" font-family="Georgia,serif" font-size="15" fill="#1A2028" text-anchor="middle" font-style="italic">M<tspan font-size="11" dy="4">2</tspan></text><path d="M367 144 L367 166"/><path d="M367 166 L367 202.9"/><path d="M356.0 202.9 L378.0 202.9" stroke-width="2.4"/><path d="M352.0 187.0 L352.0 216.0 L382.0 216.0 L382.0 187.0" fill="none"/><path d="M367 216.0 L367 232"/><path d="M367 232 L367 246"/><path d="M324 246 L412 246"/><path d="M330 246 L319 257" stroke-width="1.6"/><path d="M346 246 L335 257" stroke-width="1.6"/><path d="M362 246 L351 257" stroke-width="1.6"/><path d="M378 246 L367 257" stroke-width="1.6"/><path d="M394 246 L383 257" stroke-width="1.6"/><path d="M148 182 L190.0 182.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="203.0,182.0 190.9,185.1 190.9,178.9" fill="#1A2028" stroke="none"/><path d="M344 30 L386.0 30.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="399.0,30.0 386.9,33.1 386.9,26.9" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="75" y="44" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K<tspan font-size="10" dy="4">1</tspan></text>
<text x="84" y="170" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f<tspan font-size="10" dy="4">v1</tspan></text>
<text x="269" y="74" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K<tspan font-size="10" dy="4">2</tspan></text>
<text x="404" y="205" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f<tspan font-size="10" dy="4">v2</tspan></text>
<text x="260" y="31" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f(t)</text>
<text x="172" y="200" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">1</tspan></text>
<text x="368" y="24" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">2</tspan></text>
</g>
</g>
</svg>`,
      hint: "Force is applied to $M_{1}$ but the output is $X_{2}$, so the forcing vector has its entry in row 1 while Cramer's rule replaces column 2. Note $f_{v2}$ goes to ground, so it touches only $M_{2}$ and is not shared.",
      answer: "$$\\frac{X_{2}(s)}{F(s)}=\\frac{2}{s^{4}+2s^{3}+6s^{2}+5s+2}$$",
      expert: `
**First glance:** two masses again, so fourth-order, two equations. But there are **two structural differences** from 2-19 and an expert spots both before writing anything:

1. **The force is on $M_{1}$ but the output is $X_{2}$.** So the forcing vector's nonzero entry is in row 1, while Cramer's rule replaces column 2. Those are independent choices and mixing them is the intended trap.
2. **$f_{v2}$ goes to ground, not between masses.** Ground-tied elements touch **one diagonal only** and contribute nothing off-diagonal. Only $K_{2}$ is shared here.

That second point is the whole problem. Contrast with $K_{2}$, which appears three times.

**Predict the numerator before computing it.** The only path from input to output is through the spring $K_{2}$, a pure gain of 2 - no damper in that path, so **no $s$ in the numerator**. Expect a constant. In 2-19 the coupling included a damper and the numerator picked up an $s$. An expert reads the coupling path to predict the zeros.

**The dc check that catches everything:** at rest both dampers are inert, so the whole force sits on $K_{1}$ and $x_{1}=x_{2}=f/K_{1}=f$. Gain must be 1. $\\tfrac22=1$ ✓
`,
      solution: `
Harder than 2-19 for three reasons: the force and the output sit on *different* masses,
one damper goes to ground rather than between masses, and the coupling element is a
spring alone. Each changes something in the matrix.

---

**Step 1: inventory carefully.**

*Everything touching $M_{1}$:*
- mass: $M_{1}s^{2}=s^{2}$
- spring $K_{1}$ (to wall): $1$
- damper $f_{v1}$ (to wall): $s$
- spring $K_{2}$ (to $M_{2}$): $2$

Diagonal 1: $s^{2}+s+3$

*Everything touching $M_{2}$:*
- mass: $s^{2}$
- spring $K_{2}$ (to $M_{1}$): $2$
- damper $f_{v2}$ (to **ground**): $s$

Diagonal 2: $s^{2}+s+2$

*Shared between $M_{1}$ and $M_{2}$:* only $K_{2}$, giving $2$.

**The trap.** $f_{v2}$ connects $M_{2}$ to **ground**, not to $M_{1}$. It appears on
diagonal 2 only and contributes **nothing** off-diagonal. Treating it as shared is the
easiest way to get this problem wrong. Contrast $K_{2}$, which connects the two masses
and appears on both diagonals *and* off-diagonal.

**Step 2: write the equations.** The force acts at $M_{1}$, so it appears in the
**first** equation:

$$\\left(s^{2}+s+3\\right)X_{1}(s)-2X_{2}(s)=F(s)$$

$$-2X_{1}(s)+\\left(s^{2}+s+2\\right)X_{2}(s)=0$$

**Symmetry check.** Off-diagonals both $-2$. ✓

**Step 3: matrix form.**

$$\\begin{bmatrix} s^{2}+s+3 & -2 \\\\ -2 & s^{2}+s+2\\end{bmatrix}
\\begin{bmatrix} X_{1} \\\\ X_{2}\\end{bmatrix}=\\begin{bmatrix} F(s) \\\\ 0\\end{bmatrix}$$

**Step 4: Cramer's rule for $X_{2}$.**

We want the **second** unknown, so replace the **second column** with the forcing vector:

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} s^{2}+s+3 & F(s) \\\\ -2 & 0\\end{vmatrix}
=\\left(s^{2}+s+3\\right)(0)-F(s)(-2)=2F(s)$$

The forcing vector's nonzero entry is in row 1, but we replace **column 2** because we
want $X_{2}$. Those are independent choices: mixing them up is a frequent error.

**Step 5: the system determinant.**

$$\\det\\mathbf{A}=\\left(s^{2}+s+3\\right)\\left(s^{2}+s+2\\right)-(-2)(-2)$$

$(-2)(-2)=+4$, subtracted, so $-4$.

Substitute $u=s^{2}+s$:

$$(u+3)(u+2)-4=u^{2}+5u+6-4=u^{2}+5u+2$$

Expand $u^{2}=\\left(s^{2}+s\\right)^{2}=s^{4}+2s^{3}+s^{2}$:

$$s^{4}+2s^{3}+s^{2}+5s^{2}+5s+2=s^{4}+2s^{3}+6s^{2}+5s+2$$

**Step 6: divide.**

$$\\boxed{\\;\\frac{X_{2}(s)}{F(s)}=\\frac{2}{s^{4}+2s^{3}+6s^{2}+5s+2}\\;}$$

---

**Check: order.** Two masses → fourth-order denominator. ✓

**Check: no zeros.** The numerator is a constant, so there are no finite zeros. Expected:
the only path from the input at $M_{1}$ to the output at $X_{2}$ is through spring
$K_{2}$, a pure gain of 2. In 2-19 the coupling included a damper, and that damper put an
$s$ in the numerator. No damper in the coupling path here, so no $s$.

**Check: dc.** At $s=0$: $\\dfrac22=1$.

Sanity: apply a constant force at $M_{1}$. In steady state nothing moves, so both dampers
are inert (a damper exerts no force at zero velocity). The whole force is carried by
$K_{1}$, and $M_{2}$ moves exactly as far as $M_{1}$: $x_{1}=x_{2}=f/K_{1}=f$. Hence
$X_{2}/F=1\\;\\checkmark$

That last check is worth the effort: it catches a whole class of sign and bookkeeping
errors before they reach the answer.
`
    },

    {
      id: "2-22", difficulty: "challenge", topic: "Electrical networks",
      sec: "2.4",
      prompt: `A three-mesh network is arranged as follows. Mesh 1 contains the source $v(t)$ and $R_{1}=2\\ \\Omega$, and shares an inductor $L=1$ H with mesh 2. Mesh 2 shares that inductor with mesh 1 and shares a resistor $R_{2}=3\\ \\Omega$ with mesh 3. Mesh 3 contains that shared $R_{2}$ and a capacitor $C=\\tfrac12$ F.

Find $\\dfrac{I_{3}(s)}{V(s)}$.

<svg viewBox="0 0 586 202" width="100%" style="max-width:586px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="74" cy="108" r="21"/><path d="M68 100 L80 100 M74 94 L74 106" stroke-width="1.7"/><path d="M68 117 L80 117" stroke-width="1.7"/><path d="M74 87 L74 46 L130 46"/><path d="M130 46 L134.2 37 L142.5 55 L150.8 37 L159.2 55 L167.5 37 L175.8 55 L180 46"/><path d="M180 46 L250 46 L250 76"/><path d="M250 76 a7.25 7.25 0 0 0 0 14.5 a7.25 7.25 0 0 0 0 14.5 a7.25 7.25 0 0 0 0 14.5 a7.25 7.25 0 0 0 0 14.5"/><path d="M250 134 L250 182 L74 182 L74 129"/><path d="M250 46 L400 46 L400 74"/><path d="M400 74 L391 78.5 L409 87.5 L391 96.5 L409 105.5 L391 114.5 L409 123.5 L400 128"/><path d="M400 128 L400 182 L250 182"/><path d="M400 46 L520 46 L520 94"/><path d="M508.0 94 L532.0 94"/><path d="M508.0 107 L532.0 107"/><path d="M520 107 L520 182 L400 182"/><path d="M141.3 131.4 A27 27 0 1 1 166.7 140.6" stroke="#8A97A6" stroke-width="1.7" fill="none"/><polygon points="160.3,141.7 170.9,137.0 171.8,142.6" fill="#8A97A6" stroke="none"/><path d="M304.3 131.4 A27 27 0 1 1 329.7 140.6" stroke="#8A97A6" stroke-width="1.7" fill="none"/><polygon points="323.3,141.7 333.9,137.0 334.8,142.6" fill="#8A97A6" stroke="none"/><path d="M441.3 131.4 A27 27 0 1 1 466.7 140.6" stroke="#8A97A6" stroke-width="1.7" fill="none"/><polygon points="460.3,141.7 470.9,137.0 471.8,142.6" fill="#8A97A6" stroke="none"/><g stroke="none">
<text x="46" y="113" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="end" font-style="italic">V(s)</text>
<text x="155" y="30" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">1</tspan></text>
<text x="224" y="108" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">L</text>
<text x="372" y="107" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">R<tspan font-size="10" dy="4">2</tspan></text>
<text x="556" y="108" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">C</text>
<text x="162" y="156" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">I<tspan font-size="10" dy="4">1</tspan></text>
<text x="325" y="156" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">I<tspan font-size="10" dy="4">2</tspan></text>
<text x="462" y="156" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">I<tspan font-size="10" dy="4">3</tspan></text>
</g>
</g>
</svg>`,
      hint: "Three meshes means a $3\\times3$ matrix. Meshes 1 and 3 share nothing, so that entry is zero. Expand the determinant along the row or column with the most zeros.",
      answer: "$$\\frac{I_{3}(s)}{V(s)}=\\frac{3s^{2}}{6s^{2}+10s+12}$$",
      expert: `
**First glance:** three meshes, so a $3\\times3$: but **look for the zeros first.** Meshes 1 and 3 share no component, so those entries are exactly 0. A mesh matrix is always sparse and always symmetric; that structure is what makes hand computation feasible.

**Expand along the row or column with the most zeros, not along the first row by default.** For $\\det\\mathbf{A}_{3}$ the third column has a single nonzero entry, so it collapses to one $2\\times2$ instead of three. That choice alone halves the work.

**Cofactor signs:** the checkerboard is $+,-,+$ across the top row, and position $(1,3)$ carries $+$. Getting a sign wrong here is the most common way a correct setup produces a wrong answer.

**Two structural predictions before computing:**
- dc gain must be 0: the capacitor blocks dc in mesh 3.
- high-frequency limit must be finite: capacitor shorts, inductor opens, leaving a resistive path.

**The definitive check most students never run:** back-substitute your answer into an equation you did **not** use to derive it. Plug $I_{2}$ and $I_{3}$ into the mesh-3 equation and confirm it gives exactly zero. An independent equation closing to zero is stronger evidence than any amount of re-checking your own arithmetic.
`,
      solution: `
**Step 1: impedances.**

$$Z_{R_{1}}=2,\\quad Z_{L}=s,\\quad Z_{R_{2}}=3,\\quad Z_{C}=\\frac{1}{\\tfrac12 s}=\\frac{2}{s}$$

**Step 2: the three mesh equations by inspection.**

*Mesh 1:* contains $R_{1}$ and the shared $L$. Self impedance $2+s$. Shares $s$ with mesh
2, shares **nothing** with mesh 3:

$$(2+s)I_{1}-sI_{2}+0\\cdot I_{3}=V(s)$$

*Mesh 2:* contains the shared $L$ and the shared $R_{2}$. Self impedance $s+3$. Shares
$s$ with mesh 1 and $3$ with mesh 3:

$$-sI_{1}+(s+3)I_{2}-3I_{3}=0$$

*Mesh 3:* contains the shared $R_{2}$ and $C$. Self impedance $3+\\dfrac{2}{s}$:

$$0\\cdot I_{1}-3I_{2}+\\left(3+\\frac{2}{s}\\right)I_{3}=0$$

**The zeros matter.** Meshes 1 and 3 have no element in common, so those entries are
exactly 0. Non-adjacent meshes always give zeros: that is what makes large mesh matrices
sparse and tractable.

$$\\mathbf{A}=\\begin{bmatrix} 2+s & -s & 0 \\\\ -s & s+3 & -3 \\\\ 0 & -3 & 3+\\dfrac{2}{s}\\end{bmatrix}$$

**Symmetry check.** $(1,2)$ matches $(2,1)$, $(2,3)$ matches $(3,2)$, $(1,3)$ matches
$(3,1)$. ✓

**Step 3: Cramer's rule for $I_{3}$: replace column 3.**

$$\\det\\mathbf{A}_{3}=\\begin{vmatrix} 2+s & -s & V \\\\ -s & s+3 & 0 \\\\ 0 & -3 & 0\\end{vmatrix}$$

Expand along the **third column**, which has only one nonzero entry - far less work than
the first row. The sign for position (row 1, column 3) is $(-1)^{1+3}=+1$:

$$\\det\\mathbf{A}_{3}=+V\\begin{vmatrix} -s & s+3 \\\\ 0 & -3\\end{vmatrix}
=V\\left[(-s)(-3)-(s+3)(0)\\right]=3sV$$

**Step 4: the system determinant, expanding along the first row.**

$$\\det\\mathbf{A}=(2+s)\\begin{vmatrix} s+3 & -3 \\\\ -3 & 3+\\dfrac{2}{s}\\end{vmatrix}
-(-s)\\begin{vmatrix} -s & -3 \\\\ 0 & 3+\\dfrac{2}{s}\\end{vmatrix}+0$$

*First $2\\times2$:*

$$(s+3)\\left(3+\\frac{2}{s}\\right)-(-3)(-3)$$

Expand the product: $s\\cdot3=3s$, $s\\cdot\\tfrac2s=2$, $3\\cdot3=9$,
$3\\cdot\\tfrac2s=\\tfrac6s$, giving $3s+11+\\dfrac{6}{s}$. Then subtract 9:

$$3s+2+\\frac{6}{s}$$

*Second $2\\times2$:*

$$(-s)\\left(3+\\frac{2}{s}\\right)-(-3)(0)=-3s-2$$

*Assemble.* Note the cofactor sign: $-(-s)\\times(\\cdots)=+s\\times(\\cdots)$:

$$\\det\\mathbf{A}=(2+s)\\left(3s+2+\\frac{6}{s}\\right)+s\\left(-3s-2\\right)$$

Expand the first product term by term:

$$2(3s)+2(2)+2\\!\\left(\\tfrac6s\\right)+s(3s)+s(2)+s\\!\\left(\\tfrac6s\\right)
=6s+4+\\frac{12}{s}+3s^{2}+2s+6$$

$$=3s^{2}+8s+10+\\frac{12}{s}$$

Add the second piece $-3s^{2}-2s$:

$$\\det\\mathbf{A}=6s+10+\\frac{12}{s}=\\frac{6s^{2}+10s+12}{s}$$

The $s^{2}$ terms cancel.

**Step 5: divide.**

$$\\frac{I_{3}(s)}{V(s)}=3s\\cdot\\frac{s}{6s^{2}+10s+12}$$

$$\\boxed{\\;\\frac{I_{3}(s)}{V(s)}=\\frac{3s^{2}}{6s^{2}+10s+12}\\;}$$

---

**Check: dc.** At $s=0$ the result is 0. Correct: the capacitor blocks dc, so no steady
current flows in mesh 3.

**Check: high frequency.** As $s\\to\\infty$: $\\dfrac{3s^{2}}{6s^{2}}=\\dfrac12$.

Sanity: at high frequency the capacitor shorts and the inductor opens. An open inductor
forces $I_{1}=I_{2}$ (it carries $I_{1}-I_{2}$, and huge impedance with finite voltage
drives that difference to zero). With the capacitor shorted, the source sees essentially
$R_{1}=2\\ \\Omega$, giving $I=V/2$, all of which flows into mesh 3. So
$I_{3}/V\\to\\tfrac12\\;\\checkmark$

**Check: back-substitute.** Solving also gives
$I_{2}/V=\\dfrac{3s^{2}+2s}{6s^{2}+10s+12}$. Verify the mesh-3 equation:

$$-3\\left(\\frac{3s^{2}+2s}{6s^{2}+10s+12}\\right)+\\left(3+\\frac{2}{s}\\right)\\left(\\frac{3s^{2}}{6s^{2}+10s+12}\\right)
=\\frac{-9s^{2}-6s+9s^{2}+6s}{6s^{2}+10s+12}=0\\;\\checkmark$$

An independent equation checking out to exactly zero is the strongest confirmation
available.
`
    },

    {
      id: "2-23", difficulty: "challenge", topic: "Linearization",
      sec: "2.11",
      prompt: `A payload of mass $M=1$ kg rests on a nonlinear isolator whose restoring force is $f_{K}=2x^{2}$ newtons when compressed by $x$ meters. A viscous damper $f_{v}=4$ N-s/m acts in parallel with the isolator. The applied force is

$$f(t)=8+\\delta f(t)$$

a constant 8 N bias plus a small time-varying perturbation.

**(a)** Find the operating point and the transfer function $\\dfrac{\\delta X(s)}{\\delta F(s)}$.

**(b)** The bias is now raised to 32 N. Without a calculator, state what happens to the frequency of the damped oscillation, and by what exact factor.`,
      hint: "Find the equilibrium first by setting the perturbation and all derivatives to zero. For part (b), notice that the operating point itself moves - so the effective spring constant moves with it.",
      answer: "**(a)** $x_{0}=2$ m, and $$\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+8}=\\frac{1}{(s+2)^{2}+2^{2}}$$ with poles at $s=-2\\pm j2$. **(b)** The operating point moves to $x_{0}=4$ m, the effective spring constant doubles to 16, and the damped oscillation frequency rises from $2$ to $2\\sqrt3$ rad/s - an exact factor of $\\sqrt3$.",
      expert: `
**First glance:** a squared term in the differential equation. Nonlinear, so **nothing** from the rest of Chapter 2 applies until it is linearized - no impedances, no transfer function, no superposition.

**The order is fixed and non-negotiable:** equilibrium first, then substitute, then expand, then transform. Transforming before linearizing produces nothing usable.

**Finding the operating point is an algebra problem, not a calculus one.** Set derivatives to zero and the differential equation collapses: $2x_{0}^{2}=8\\Rightarrow x_{0}=2$.

**The check that makes linearization self-verifying:** the constant terms **must cancel**. $f_{K}(x_{0})=8$ on the left, bias $=8$ on the right. If they do not cancel, the operating point is wrong. Go back and recompute it before proceeding.

**Part (b) carries the concept.** The instinct is that raising the force just pushes harder on the same system. It does not: $x_{0}$ moves, so $m_{a}=4x_{0}$ moves with it, so the **model itself changes**. A nonlinear spring is stiffer the more it is compressed.

Note also that only stiffness moved: the real part of the pole is $-f_{v}/2M$, untouched. Decay unchanged, oscillation faster by exactly $\\sqrt3$.
`,
      solution: `
## Part (a)

**Step 1: write the nonlinear differential equation.**

Sum the forces exactly as in a linear problem; only the spring term differs:

$$M\\frac{d^{2}x}{dt^{2}}+f_{v}\\frac{dx}{dt}+2x^{2}=f(t)$$

With $M=1$, $f_{v}=4$:

$$\\frac{d^{2}x}{dt^{2}}+4\\frac{dx}{dt}+2x^{2}=f(t)$$

The $2x^{2}$ term is what makes this nonlinear.

---

**Step 2: find the operating point.**

Set the perturbation to zero so $f(t)=8$, and set all derivatives to zero (steady state,
nothing moving):

$$0+0+2x_{0}^{2}=8$$

$$x_{0}^{2}=4,\\qquad x_{0}=2\\ \\text{m}$$

Take the positive root: a physical compression.

Setting the derivatives to zero collapses the differential equation to an algebraic one.
That is always how the operating point is found.

---

**Step 3: substitute $x=x_{0}+\\delta x$.**

Because $x_{0}$ is a **constant**, it vanishes under differentiation:

$$\\frac{d\\left(x_{0}+\\delta x\\right)}{dt}=0+\\frac{d\\,\\delta x}{dt},\\qquad
\\frac{d^{2}\\left(x_{0}+\\delta x\\right)}{dt^{2}}=\\frac{d^{2}\\delta x}{dt^{2}}$$

The derivative terms pass through **unchanged**. Only $2x^{2}$ needs work.

---

**Step 4: linearize the nonlinear term.**

$$f_{K}(x)\\approx f_{K}(x_{0})+\\left.\\frac{df_{K}}{dx}\\right|_{x_{0}}\\delta x$$

Power rule $\\dfrac{d}{dx}x^{n}=nx^{n-1}$:

$$\\frac{d}{dx}\\left(2x^{2}\\right)=2\\cdot2x^{2-1}=4x$$

Evaluate at $x_{0}=2$:

$$m_{a}=4x_{0}=4(2)=8\\ \\text{N/m}$$

And $f_{K}(x_{0})=2x_{0}^{2}=2(4)=8$ N: the bias force, exactly as it must be. That
agreement is a free check on the operating point.

$$2x^{2}\\approx8+8\\,\\delta x$$

---

**Step 5: assemble and cancel the bias.**

$$\\frac{d^{2}\\delta x}{dt^{2}}+4\\frac{d\\,\\delta x}{dt}+8+8\\,\\delta x=8+\\delta f(t)$$

The constant $8$ appears on **both** sides and cancels:

$$\\frac{d^{2}\\delta x}{dt^{2}}+4\\frac{d\\,\\delta x}{dt}+8\\,\\delta x=\\delta f(t)$$

**The cancellation confirms the operating point was chosen correctly.** If the
constants had not cancelled, the operating point was computed wrong - go back to Step 2.

---

**Step 6: transform.** Zero initial conditions on the *deviation* variables:

$$\\left(s^{2}+4s+8\\right)\\delta X(s)=\\delta F(s)$$

$$\\boxed{\\;\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+8}\\;}$$

**Poles.** Discriminant $=16-4(1)(8)=16-32=-16$, negative, so complex. Complete the
square:

$$s^{2}+4s+8=(s+2)^{2}+(8-4)=(s+2)^{2}+2^{2}$$

$$s=-2\\pm j2$$

Left half-plane, underdamped. A small disturbance produces an oscillation at $2$ rad/s
decaying as $e^{-2t}$. Every number here is an integer: no calculator anywhere.

---

## Part (b)

This is the part that tests whether you understood what linearization actually did.

**Step 1: the operating point moves.**

$$2x_{0}^{2}=32\\;\\Rightarrow\\;x_{0}^{2}=16\\;\\Rightarrow\\;x_{0}=4\\ \\text{m}$$

The payload sits twice as deep in the isolator.

**Step 2: so the effective spring constant moves too.**

$$m_{a}=4x_{0}=4(4)=16\\ \\text{N/m}$$

It **doubled**, from 8 to 16, because $m_{a}=4x_{0}$ is proportional to $x_{0}$ and
$x_{0}$ doubled. A nonlinear spring is *stiffer the more it is compressed*, and the doubled $m_{a}$ is
that statement in numbers.

**Step 3: new transfer function and poles.**

$$\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+16}$$

Complete the square:

$$s^{2}+4s+16=(s+2)^{2}+(16-4)=(s+2)^{2}+12$$

The damped oscillation frequency is $\\omega=\\sqrt{12}$. Simplify exactly by pulling out
the perfect square: $12=4\\times3$, so

$$\\omega=\\sqrt{4\\times3}=\\sqrt4\\cdot\\sqrt3=2\\sqrt3\\ \\text{rad/s}$$

$$s=-2\\pm j2\\sqrt3$$

**Step 4: the factor.**

$$\\frac{\\omega_{\\text{new}}}{\\omega_{\\text{old}}}=\\frac{2\\sqrt3}{2}=\\sqrt3$$

$$\\boxed{\\;\\text{The oscillation frequency increases by an exact factor of }\\sqrt3\\;}$$

Note the decay rate did **not** change: the real part is $-2$ in both cases, because the
damper $f_{v}=4$ and mass $M=1$ are unchanged and the real part is $-f_{v}/2M$. Only the
stiffness moved.

---

**What this problem is really testing.** A linearized transfer function is not a property
of the hardware alone: it is a property of the hardware *at a chosen operating point*.
Change the bias and you get a different model from the same physical system. That is
exactly the robustness and parameter-sensitivity concern Chapter 1 raised, showing up as
concrete algebra for the first time.

**Contrast with a linear spring.** If $f_{K}=Kx$, then $m_{a}=K$ regardless of operating
point, one transfer function describes the system everywhere, and part (b) would have the
answer "nothing changes." That is precisely the convenience linearity buys.
`
    },

    {
      id: "2-24", difficulty: "challenge", topic: "Transfer functions",
      sec: "2.3",
      prompt: `You are handed a black-box subsystem with no schematic. In the lab you drive it with a **unit step** and record the output, which fits

$$c(t)=5-8e^{-2t}+3e^{-4t}$$

to within measurement noise. Assuming the system is linear, time-invariant, and started from rest, determine $G(s)$ and state its poles, zeros and dc gain.`,
      hint: "Transform the measured response to get $C(s)$, then divide by the transform of the input. Work the numerator algebra carefully - terms will cancel.",
      answer: "$$G(s)=\\frac{4s+40}{s^{2}+6s+8}=\\frac{4(s+10)}{(s+2)(s+4)}$$ Poles at $s=-2,-4$; zero at $s=-10$; dc gain $G(0)=5$.",
      expert: `
**First glance:** the exponents of the measured response **are** the poles. $e^{-2t}$ and $e^{-4t}$ mean poles at $-2$ and $-4$, so the denominator is $(s+2)(s+4)$: written down before any algebra.

The first half of the problem is read directly off the data.

**Predict the numerator's behaviour too.** $c(0)=5-8+3=0$, so the response starts at rest, so $\\deg N<\\deg D$, so **the $s^{2}$ terms must cancel** when you combine over a common denominator. When they do, that is confirmation, not luck. If they had not, either the data or your arithmetic is wrong.

**Discard:** any attempt to guess a physical structure. The question asks only for $G(s)$, and $C(s)/R(s)$ delivers it.

**What the data does *not* tell you directly:** the zero. Poles come from the exponents; the zero at $-10$ is hidden in the relative sizes of the coefficients $-8$ and $+3$. Change those while keeping the same exponentials and the zero moves. Knowing which features are visible and which are encoded is the real skill here.

**Two-limit close-out:** $G(0)=5=c(\\infty)$ and $G(\\infty)=0=c(0^{+})$. Both ends pinned.
`,
      solution: `
This runs the usual process **backwards**: instead of building a model and predicting the
response, you have the response and must recover the model. This is system
identification, and it tests whether you understand $C(s)=R(s)G(s)$ as an equation rather
than a recipe.

---

**Step 1: transform the measured response.**

$$\\mathcal{L}\\{5\\}=\\frac{5}{s},\\quad
\\mathcal{L}\\{-8e^{-2t}\\}=\\frac{-8}{s+2},\\quad
\\mathcal{L}\\{3e^{-4t}\\}=\\frac{3}{s+4}$$

$$C(s)=\\frac{5}{s}-\\frac{8}{s+2}+\\frac{3}{s+4}$$

**Step 2: combine over the common denominator $s(s+2)(s+4)$.**

$$C(s)=\\frac{5(s+2)(s+4)-8s(s+4)+3s(s+2)}{s(s+2)(s+4)}$$

**Step 3: expand the numerator, one piece at a time.**

*First piece:* $(s+2)(s+4)=s^{2}+4s+2s+8=s^{2}+6s+8$, so

$$5\\left(s^{2}+6s+8\\right)=5s^{2}+30s+40$$

*Second piece:* $s(s+4)=s^{2}+4s$, so

$$-8\\left(s^{2}+4s\\right)=-8s^{2}-32s$$

*Third piece:* $s(s+2)=s^{2}+2s$, so

$$3\\left(s^{2}+2s\\right)=3s^{2}+6s$$

*Collect by power:*

| Power | Terms | Total |
|---|---|---|
| $s^{2}$ | $5-8+3$ | $0$ |
| $s^{1}$ | $30-32+6$ | $4$ |
| $s^{0}$ | $40$ | $40$ |

$$\\text{numerator}=4s+40$$

**The $s^{2}$ terms cancelling completely is the key event.** It is forced by $c(0)=0$,
i.e. the system started from rest. If they had not cancelled, either the data or your
algebra is wrong.

$$C(s)=\\frac{4s+40}{s(s+2)(s+4)}$$

**Step 4: divide by the input transform.**

The input was a unit step, so $R(s)=\\dfrac{1}{s}$. Dividing by $1/s$ means multiplying
by $s$:

$$G(s)=\\frac{C(s)}{R(s)}=s\\cdot\\frac{4s+40}{s(s+2)(s+4)}=\\frac{4s+40}{(s+2)(s+4)}$$

$$\\boxed{\\;G(s)=\\frac{4s+40}{s^{2}+6s+8}=\\frac{4(s+10)}{(s+2)(s+4)}\\;}$$

---

**Step 5: read off the features.**

**Poles:** $s=-2$ and $s=-4$. These were visible in the raw data all along: the response
contained $e^{-2t}$ and $e^{-4t}$, and *the exponents of the response are the poles of
the system*. You could have written the denominator immediately.

**Zero:** $4s+40=0\\Rightarrow s=-10$. This was **not** directly visible; it is encoded in
the relative sizes of the coefficients $-8$ and $+3$. Change those while keeping the same
exponentials and the zero moves.

**DC gain:** $G(0)=\\dfrac{40}{(2)(4)}=\\dfrac{40}{8}=5$.

---

**Check 1: final value.** From the data $c(\\infty)=5$; from the transfer function the
step response settles at $G(0)=5\\;\\checkmark$

**Check 2: initial value.** From the data $c(0)=5-8+3=0$; from the theorem
$\\lim_{s\\to\\infty}\\dfrac{4s+40}{(s+2)(s+4)}=0\\;\\checkmark$

**Check 3: work forward again.** Drive $G(s)$ with a step:

$$C(s)=\\frac{4s+40}{s(s+2)(s+4)}$$

Cover-up residues:

- $K_{1}=\\left.\\dfrac{4s+40}{(s+2)(s+4)}\\right|_{s=0}=\\dfrac{40}{8}=5$
- $K_{2}=\\left.\\dfrac{4s+40}{s(s+4)}\\right|_{s=-2}=\\dfrac{-8+40}{(-2)(2)}=\\dfrac{32}{-4}=-8$
- $K_{3}=\\left.\\dfrac{4s+40}{s(s+2)}\\right|_{s=-4}=\\dfrac{-16+40}{(-4)(-2)}=\\dfrac{24}{8}=3$

giving $c(t)=5-8e^{-2t}+3e^{-4t}$: exactly the measured data. ✓

**A caution.** This recovers $G(s)$ only if the system truly is LTI and started at rest.
Any nonlinearity, or a nonzero initial condition, and the extracted $G(s)$ describes
nothing real.
`
    },

    {
      id: "2-25", difficulty: "challenge", topic: "Mechanical systems",
      sec: "2.5",
      prompt: `An instrument package of mass $M$ is bolted to a vibration-isolation mount consisting of a spring $K$ and a viscous damper $f_{v}$ in parallel. The other end of the mount attaches to a shaker platform whose displacement $x_{1}(t)$ is **prescribed** by the shaker - it is the *input*. The instrument's displacement $x_{2}(t)$ is the *output*.

Take $M=1$ kg, $f_{v}=4$ N-s/m, $K=3$ N/m.

Find $\\dfrac{X_{2}(s)}{X_{1}(s)}$, then explain physically why the dc gain must have the value you compute.

<svg viewBox="0 0 430 258" width="100%" style="max-width:430px;display:block;margin:14px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<rect x="126" y="30" width="168" height="62" fill="#EDF2F7"/><path d="M166 92 L166 116"/><path d="M166 116 L181 124.2 L151 132.5 L181 140.8 L151 149.0 L181 157.2 L151 165.5 L181 173.8 L151 182.0 L166 182"/><path d="M166 182 L166 214"/><path d="M254 92 L254 112"/><path d="M254 112 L254 153.4"/><path d="M243.0 153.4 L265.0 153.4" stroke-width="2.4"/><path d="M239.0 135.52 L239.0 168.0 L269.0 168.0 L269.0 135.52" fill="none"/><path d="M254 168.0 L254 184"/><path d="M254 184 L254 214"/><path d="M60 214 L392 214" stroke-width="3.4"/><path d="M70 222 L382 222" stroke-width="1.6" stroke-dasharray="6 6"/><path d="M92 206 L92.0 156.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="92.0,143.0 95.1,155.1 88.9,155.1" fill="#1A2028" stroke="none"/><path d="M348 86 L348.0 36.0" stroke="#1A2028" stroke-width="1.8" fill="none"/><polygon points="348.0,23.0 351.1,35.1 344.9,35.1" fill="#1A2028" stroke="none"/><g stroke="none">
<text x="210" y="56" font-family="Georgia,serif" font-size="16" fill="#1A2028" text-anchor="middle" font-style="italic">M</text>
<text x="210" y="78" font-family="Georgia,serif" font-size="12" fill="#1A2028" text-anchor="middle" font-style="italic">(instrument)</text>
<text x="132" y="158" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">K</text>
<text x="300" y="152" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">f<tspan font-size="10" dy="4">v</tspan></text>
<text x="76" y="146" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">1</tspan></text>
<text x="366" y="32" font-family="Georgia,serif" font-size="14" fill="#1A2028" text-anchor="middle" font-style="italic">x<tspan font-size="10" dy="4">2</tspan></text>
<text x="226" y="244" font-family="Georgia,serif" font-size="12" fill="#1A2028" text-anchor="middle">shaker platform (prescribed motion)</text>
</g>
</g>
</svg>`,
      hint: "The spring force depends on the *relative* displacement $x_{1}-x_{2}$, and the damper force on the relative velocity. Only the mass sees absolute motion.",
      answer: "$$\\frac{X_{2}(s)}{X_{1}(s)}=\\frac{4s+3}{s^{2}+4s+3}=\\frac{4s+3}{(s+1)(s+3)}$$ The dc gain is 1: at steady state the mount transmits no force, so the instrument must sit at the same displacement as the platform.",
      expert: `
**First glance:** the input is a **displacement**, not a force. That single observation reorganizes the whole problem.

**The rule an expert applies immediately:**

> Springs and dampers respond to the **difference** between their two ends. A mass responds to **absolute** acceleration.

That asymmetry is the entire physics. Write $M\\ddot x_{2}=K(x_{1}-x_{2})+f_{v}(\\dot x_{1}-\\dot x_{2})$ and everything follows.

**Predict the structure before transforming.** Collecting $x_{2}$ on the left gives the ordinary mass-spring-damper operator; the right becomes a *spring-and-damper operator acting on the input*. So expect

$$\\frac{X_{2}}{X_{1}}=\\frac{f_{v}s+K}{Ms^{2}+f_{v}s+K}$$

- same denominator as always, numerator built from whatever couples input to output. **The numerator is the coupling path**, exactly as in 2-21.

**The dc gain is forced to 1 by physics, before any algebra.** At rest the damper transmits nothing and the mass accelerates not at all, so the spring must carry zero force, so it must be at its natural length, so $x_{1}=x_{2}$. That argument holds for *any* $M$, $f_{v}$, $K$. If your dc gain is not 1, you have a sign error.

**The design insight:** $f_{v}$ puts an $s$ in the numerator, so high-frequency rolloff is $1/s$ rather than $1/s^{2}$. Damping the resonance costs you isolation. That trade-off is why vibration mounts are hard.
`,
      solution: `
A **base-excitation** problem. Worded differently from the textbook's force-input
problems, but every tool is the same. The key difference: the input is a *displacement*,
and the mount elements respond to *relative* motion.

---

**Step 1: identify what force each element applies to the mass.**

*Spring.* Force is proportional to how much it is stretched or compressed - the
**difference** between its two ends:

$$f_{K}=K\\left(x_{1}-x_{2}\\right)$$

If the platform moves further than the instrument, the spring is compressed and pushes
the instrument along. Positive.

*Damper.* Force is proportional to the **relative velocity** of its two ends:

$$f_{\\text{damper}}=f_{v}\\left(\\frac{dx_{1}}{dt}-\\frac{dx_{2}}{dt}\\right)$$

*Mass.* Newton's second law uses **absolute** acceleration - the mass does not know where
the platform is:

$$f_{\\text{inertial}}=M\\frac{d^{2}x_{2}}{dt^{2}}$$

**This asymmetry is the whole problem.** Spring and damper see differences; the mass sees
absolute motion.

**Step 2: Newton's law for the instrument.**

$$M\\frac{d^{2}x_{2}}{dt^{2}}=K\\left(x_{1}-x_{2}\\right)+f_{v}\\left(\\frac{dx_{1}}{dt}-\\frac{dx_{2}}{dt}\\right)$$

**Step 3: collect $x_{2}$ terms left, $x_{1}$ terms right.**

$$M\\frac{d^{2}x_{2}}{dt^{2}}+f_{v}\\frac{dx_{2}}{dt}+Kx_{2}=f_{v}\\frac{dx_{1}}{dt}+Kx_{1}$$

The left side is the ordinary mass-spring-damper operator acting on the output; the right
is a **spring-and-damper operator acting on the input**. That right-hand side is what
produces a zero.

**Step 4: transform with zero initial conditions.**

$$\\left(Ms^{2}+f_{v}s+K\\right)X_{2}(s)=\\left(f_{v}s+K\\right)X_{1}(s)$$

**Step 5: form the transfer function.**

$$\\frac{X_{2}(s)}{X_{1}(s)}=\\frac{f_{v}s+K}{Ms^{2}+f_{v}s+K}=\\frac{4s+3}{s^{2}+4s+3}$$

Factor: two numbers multiplying to 3, adding to 4 - that is 1 and 3.

$$\\boxed{\\;\\frac{X_{2}(s)}{X_{1}(s)}=\\frac{4s+3}{(s+1)(s+3)}\\;}$$

---

**Step 6: the dc gain, and why it must be 1.**

$$\\left.\\frac{X_{2}}{X_{1}}\\right|_{s=0}=\\frac{4(0)+3}{(0+1)(0+3)}=\\frac{3}{3}=1$$

**Physical argument.** Suppose the shaker slowly lifts the platform to a new constant
height and holds it. In the final steady state:

- Nothing moves, so the damper transmits **zero** force ($f=f_{v}\\dot x_{\\text{rel}}=0$).
- Nothing accelerates, so the inertial force is **zero**.
- Therefore the spring must transmit zero net force, since forces on the instrument must
  sum to zero.
- A spring transmits zero force only at its natural length, i.e. when $x_{1}=x_{2}$.

So the instrument ends up displaced by exactly the same amount as the platform. The dc
gain is forced to **1**, independent of $M$, $f_{v}$ and $K$.

Confirm symbolically: at $s=0$ the general form gives $\\dfrac{K}{K}=1$ for any parameter
values. ✓

---

**What the zero means.** The numerator gives a zero at $s=-K/f_{v}=-3/4$. Its presence is
why isolation mounts do not work at all frequencies: at high frequency the transfer
function behaves like $\\dfrac{4s}{s^{2}}=\\dfrac{4}{s}$, rolling off only as $1/s$
rather than $1/s^{2}$. **The damper limits the isolation.** An undamped mount
($f_{v}=0$) would give $\\dfrac{K}{Ms^{2}+K}$ and roll off as $1/s^{2}$ - better
high-frequency isolation, but a completely undamped resonance. That trade-off between
damping the resonance and isolating at high frequency is the central design problem in
vibration mounting, and Chapter 10 gives you the frequency-response tools to reason about
it properly.
`
    },

    {
      id: "2-26", difficulty: "challenge", topic: "Partial fractions",
      sec: "2.2",
      prompt: `Without computing a single residue, write the *form* of $f(t)$ if

$$F(s)=\\frac{s+8}{s(s+2)^{2}(s^{2}+4s+13)}.$$`,
      hint: "Poles at $0$, a repeated $-2$, and $-2\\pm j3$. Zeros do not add terms.",
      answer: "$$f(t)=A+ (B+Ct)e^{-2t}+ e^{-2t}(D\\cos 3t+E\\sin 3t),\\quad t\\ge 0.$$",
      expert: `
**First glance:** four kinds of pole, four kinds of term. The zero at $-8$ only changes $A,B,C,D,E$.

**Discard:** a term $e^{-8t}$. That would require a pole at $-8$.

**Path:** $s^{2}+4s+13=(s+2)^{2}+9$. Same real part as the repeated pole, different imaginary part. That is allowed and common.
`,
      solution: `
Poles:

- $s=0$ → constant $A$
- $s=-2$ repeated twice → $(B+Ct)e^{-2t}$
- $s=-2\\pm j3$ → $e^{-2t}(D\\cos 3t+E\\sin 3t)$

A proper rational $F$ has no impulse. The numerator degree is less than the denominator degree, so there is no $\\delta(t)$ either.

The zero at $-8$ is invisible in the *list of terms*. It is visible only after the residues are computed.
`
    },
    {
      id: "2-27", difficulty: "challenge", topic: "Transfer functions",
      sec: "2.3",
      prompt: `A lab partner writes

$$\\frac{C(s)}{R(s)}=\\frac{2}{s+3}+\\frac{c(0)}{R(s)}.$$

They measured $c(0)\\neq 0$ and want to keep it in "$G(s)$."

What is $G(s)$, and why is the second term not part of it?`,
      hint: "The definition of $G$ forces zero initial conditions.",
      answer: "$G(s)=2/(s+3)$. The term with $c(0)$ is an initial-condition contribution. It belongs to the response of this experiment, not to the system.",
      expert: `
**First glance:** $G$ is what multiplies $R$ when the plant is at rest. Anything over $R(s)$ that still contains $c(0)$ is bookkeeping, not a transfer function.

**Path:** the Laplace of $\\dot c+3c=2r$ is $(s+3)C-c(0)=2R$, so $C=2R/(s+3)+c(0)/(s+3)$. Only the first coefficient is $G$.
`,
      solution: `
From $\\dot c+3c=2r$,

$$(s+3)C(s)-c(0)=2R(s),\\qquad
C(s)=\\frac{2}{s+3}R(s)+\\frac{c(0)}{s+3}.$$

$G(s)$ is the coefficient of $R(s)$ at rest: $2/(s+3)$.

$c(0)/(s+3)$ does not scale with $R$. Dividing it by $R(s)$ does not make it a property of the plant. Two experiments with the same $r(t)$ and different $c(0)$ produce different $C/R$ and the same $G$.
`
    },
    {
      id: "2-28", difficulty: "challenge", topic: "Electrical networks",
      sec: "2.4",
      prompt: `Two isolated stages are $G_1=1/(s+1)$ and $G_2=1/(s+1)$. Cascaded with an isolating amplifier of gain $1$, $T=1/(s+1)^{2}$.

Soldered directly together as two identical series-$R$, shunt-$C$ stages with $RC=1$, the connected $T$ is **not** $1/(s+1)^{2}$.

Which coefficient in the denominator changes, and why is that not a contradiction of "cascade means multiply"?`,
      hint: "Loading adds a cross term. Cascade-as-product assumes no loading.",
      answer: "The $s$ coefficient becomes $3$ rather than $2$. The product rule assumes the first stage's output is unchanged by connecting the second. Direct soldering violates that.",
      expert: `
**First glance:** same $G_1$, same $G_2$, different $T$. The missing hypothesis is "no loading."

**Path:** two $RC$ sections share a node. The second resistor draws current from the first capacitor. That extra path is the $1/(R_2 C_1)$ term.
`,
      solution: `
Isolated, each stage is $1/(RCs+1)=1/(s+1)$. The product is $1/(s^{2}+2s+1)$.

Connected without a buffer, node equations add the current into the second $R$ off the first $C$. The extra damping term is $1/(R_2C_1)=1$. The denominator becomes $s^{2}+3s+1$.

Cascade-as-product is not a law of circuits. It is a law of **unloaded** blocks. An op-amp buffer restores the product.
`
    },
    {
      id: "2-29", difficulty: "challenge", topic: "Mechanical systems",
      sec: "2.5",
      prompt: `A mass $M$ slides with viscous friction $f_v$. A spring $K$ connects the mass to a *moving* wall whose position is $x_i(t)$. The output is $x(t)$, the mass position.

Write $G(s)=X(s)/X_i(s)$ by impedances. Then state the DC gain and what it means.`,
      hint: "The spring sees the *difference* $X_i-X$. The damper and mass see $X$ to ground.",
      answer: "$$G(s)=\\dfrac{K}{Ms^{2}+f_v s+K},\\qquad G(0)=1.$$ At DC the mass sits still and the spring is unstretched only if $x=x_i$.",
      expert: `
**First glance:** moving wall, not a force source. The input enters through $K$.

**Discard:** $G=1/(Ms^{2}+f_v s+K)$. That would be $X/F$ for a force on the mass, missing the $K$ in the numerator.

**Check:** $G(0)=1$. A slow wall displacement must be followed exactly once transients die.
`,
      solution: `
Force in the spring: $K(X_i-X)$. On the mass, $Ms^{2}X+f_v s X=K(X_i-X)$.

$$(Ms^{2}+f_v s+K)X=KX_i,\\qquad
G(s)=\\frac{K}{Ms^{2}+f_v s+K}.$$

$G(0)=1$: a constant wall move becomes a constant mass position, same number, because a static spring with no force is unstretched.
`
    },
    {
      id: "2-30", difficulty: "challenge", topic: "Linearization",
      sec: "2.11",
      prompt: `A valve flow is $q=c\\sqrt{p}$ with $c>0$, $p>0$. An operating point is $p_0=16$, $q_0=4$.

Write the linearized map from $\\delta p$ to $\\delta q$. If someone uses $q\\approx (c/2\\sqrt{p_0})p$ (no $\\delta$, no offset), what experiment will they mispredict?`,
      hint: "Linearization is about deviations. The tangent line need not pass through the origin.",
      answer: "$$\\delta q=\\dfrac{c}{2\\sqrt{p_0}}\\,\\delta p=\\dfrac{1}{8}\\,\\delta p$$ since $c=q_0/\\sqrt{p_0}=1$. Dropping the offset mispredicts any experiment whose $p$ is not a small move about $16$. In particular it gets the operating flow wrong: the tangent line is $q=4+\\tfrac18(p-16)$, not $q=p/8$.",
      expert: `
**First glance:** $dq/dp=c/(2\\sqrt{p})$. At $p_0=16$, slope $1/2$. The line is $q-4=(1/2)(p-16)$.

**Discard:** writing $G(s)=1/2$ from $p$ to $q$ as absolute variables. That $G$ maps $\\delta P$ to $\\delta Q$.
`,
      solution: `
$c=q_0/\\sqrt{p_0}=4/4=1$.

$$\\left.\\frac{dq}{dp}\\right|_{p_0=16}=\\frac{c}{2\\sqrt{p}}\\bigg|_{16}=\\frac{1}{2\\sqrt{16}}=\\frac{1}{2(4)}=\\frac18.$$

So $\\delta q=\\tfrac18\\,\\delta p$, or in absolute variables $q=4+\\tfrac18(p-16)$.

**Check the tangent numerically.** At $p=17$ the linear model gives $4+\\tfrac18=4.125$, and the true value is $\\sqrt{17}=4.1231$. Agreement to three decimals confirms the slope. A slope of $\\tfrac12$ would predict $4.5$ — badly wrong.

The origin-forced line $q=p/8$ passes through $(16,2)$, not $(16,4)$. It is the wrong operating flow. A small-signal $G(s)$ built that way would carry the right *slope* and the wrong *meaning* for the symbols $Q(s)$ and $P(s)$: they would no longer be deviations from a physical operating point.
`
    }

  ]
});