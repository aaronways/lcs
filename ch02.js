registerChapter({
  id: 2,
  title: "Modeling in the Frequency Domain",
  sections: "2.1–2.5, 2.10–2.11",

  guide: [
    {
      title: "How to use this chapter",
      body: `
Your exam is **closed-calculator** and built to test whether you can attack a setup you
have never seen. That changes how to use this page.

**The three tiers are not three difficulty levels — they are three different jobs.**

| Tier | Job | How to use it |
|---|---|---|
| **Warmup** | Fluency. Table lookups and residues must be automatic, because on a no-calculator exam the algebra *is* the exam. | Do them until they take under a minute each, then stop. |
| **Core** | Method-to-setup mapping. Each one is a physical situation you must recognize as a known tool. | Cover the solution. Get the first three steps right before checking. |
| **Challenge** | Novel application. Deliberately worded unlike the textbook, with the trap in the setup rather than the algebra. | This is what your exam looks like. Struggle before revealing. |

**Every answer here is exact.** No decimal appears anywhere, because none is available to
you. If your work produces $1.414$ where the key says $\\sqrt2$, you are practising a
skill you cannot use.

Read **Reference &rarr; Non-calculator toolkit** and **Attacking a problem you have never
seen** before starting the challenge problems. They are the parts of this site that
generalize beyond Chapter 2.

---

Chapter 2 has exactly one goal: **take a physical system and produce its transfer
function** $G(s)=C(s)/R(s)$. The Laplace transform, partial fractions, impedances,
free-body diagrams and linearization are all machinery in service of that goal.

> Almost every lost point in this chapter traces back to a partial fraction or a sign,
> not to a control concept. The full transform tables, theorems, impedance tables and
> algebra refreshers live under **Reference** in the sidebar — keep that open while you
> work these problems.

Your course covers 2.1–2.5 and 2.10–2.11. Sections 2.6–2.9 (rotational mechanics, gears,
dc motors, circuit analogs) are skipped, so when a later chapter hands you a motor
transfer function, take it as given.
`
    },
    {
      title: "2.2 — The Laplace transform, in one move",
      body: `
$$\\mathcal{L}\\{f(t)\\}=F(s)=\\int_{0^-}^{\\infty}f(t)e^{-st}\\,dt$$

The reason it exists: **differentiation in time becomes multiplication by $s$**, so a
differential equation becomes an algebra problem.

$$\\mathcal{L}\\left\\{\\frac{df}{dt}\\right\\}=sF(s)-f(0^-),\\qquad
\\mathcal{L}\\left\\{\\frac{d^{2}f}{dt^{2}}\\right\\}=s^{2}F(s)-sf(0^-)-\\dot f(0^-)$$

**With zero initial conditions** this collapses to a substitution you can do by eye:
replace $d^{n}/dt^{n}$ with $s^{n}$, replace each lowercase time function with its
capital transform. That single move is used dozens of times in this chapter and never
gets harder than this.

**With nonzero initial conditions** you must carry the $-sf(0^-)-\\dot f(0^-)$ terms.
Keep them when solving a specific initial-value problem; discard them when forming a
transfer function.
`
    },
    {
      title: "2.2 — Partial fraction expansion",
      body: `
The single most important mechanical skill in the chapter. It reappears in Chapters 4,
7, 8, 9 and 13.

**Step 0 — check the orders.** If $\\deg N(s)\\ge\\deg D(s)$, long-divide first.

**Case 1, real distinct roots.** Cover up the factor $(s+p_{m})$ in $F(s)$ and evaluate
what is left at $s=-p_{m}$:

$$K_{m}=\\Big[(s+p_{m})F(s)\\Big]_{\\,s\\to-p_{m}}$$

**Case 2, repeated roots.** With $F_{1}(s)=(s+p_{1})^{r}F(s)$:

$$K_{i}=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_{1}(s)}{ds^{\\,i-1}}\\right|_{s\\to-p_{1}}$$

**Case 3, complex roots.** Keep the irreducible quadratic whole, give it a linear
numerator $K_{2}s+K_{3}$, find $K_{1}$ by cover-up, then balance coefficients. Complete
the square and match to

$$\\mathcal{L}\\{Ae^{-at}\\cos\\omega t+Be^{-at}\\sin\\omega t\\}=\\frac{A(s+a)+B\\omega}{(s+a)^{2}+\\omega^{2}}$$
`
    },
    {
      title: "2.3 — The transfer function",
      body: `
Start from the general linear, time-invariant differential equation with output $c(t)$
and input $r(t)$, and set **all initial conditions to zero**:

$$G(s)=\\frac{C(s)}{R(s)}=\\frac{b_{m}s^{m}+b_{m-1}s^{m-1}+\\cdots+b_{0}}{a_{n}s^{n}+a_{n-1}s^{n-1}+\\cdots+a_{0}}$$

- **Output terms build the denominator, input terms build the numerator.**
- The denominator is the characteristic polynomial. Its roots are the **poles**; the
  numerator's roots are the **zeros**.
- Response by multiplication: $C(s)=R(s)G(s)$, then invert.

Zero initial conditions is not a cheat. A transfer function is a property of the
*system*; initial conditions belong to a particular *experiment*.
`
    },
    {
      title: "2.4 — Electrical networks",
      body: `
Replace every component by its impedance and the circuit obeys resistive-circuit rules:
$Z_{R}=R$, $Z_{L}=Ls$, $Z_{C}=1/Cs$. Series impedances add, parallel combine as
$Z_{1}Z_{2}/(Z_{1}+Z_{2})$, voltage divider still works.

**Never write an integro-differential equation.** Go straight to impedances.

Write mesh or node equations **by inspection** — diagonal positive, off-diagonal
negative, matrix symmetric. The symmetry is a free error check. Use mesh analysis when
the output is a current, nodal when the output is a voltage, and count equations first:
pick whichever gives fewer.

**Ideal op-amp** (infinite input impedance, infinite gain, zero output impedance):

$$\\text{Inverting: }\\;\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{Z_{2}(s)}{Z_{1}(s)}
\\qquad
\\text{Noninverting: }\\;\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{Z_{1}(s)+Z_{2}(s)}{Z_{1}(s)}$$
`
    },
    {
      title: "2.5 — Translational mechanical systems",
      body: `
Three passive elements, three impedances: spring $K$, viscous damper $f_{v}s$, mass
$Ms^{2}$ — all defined as $F(s)/X(s)$.

The equations-of-motion pattern is **identical** to mesh analysis, because force behaves
like voltage and velocity like current. Sum the impedances touching each mass on the
diagonal, subtract the shared impedances off the diagonal, put applied forces on the
right.

**The error that shows up most.** A spring or damper connecting two masses appears on
*both* diagonals **and** on the off-diagonal. Leaving it off one diagonal is the single
most frequent mistake in this section.

Number of equations = number of independently movable points of motion, not the number
of blocks drawn.
`
    },
    {
      title: "2.10–2.11 — Nonlinearities and linearization",
      body: `
A system is linear only if it satisfies **both** superposition
($r_{1}+r_{2}\\to c_{1}+c_{2}$) and homogeneity ($Ar_{1}\\to Ac_{1}$). Note
$c=0.5r+3$ fails homogeneity even though its graph is a straight line.

Physical nonlinearities to be able to name: **saturation**, **dead zone**, **backlash**.

**Linearization** replaces the curve by its tangent at an operating point:

$$\\delta f\\approx m_{a}\\,\\delta x,\\qquad m_{a}=\\left.\\frac{df}{dx}\\right|_{x=x_{0}}$$

Find the operating point by setting the small-signal input to zero and all derivatives
to zero. Then substitute $x=x_{0}+\\delta x$, expand, drop higher-order terms, and
transform. The result relates *deviations* and is valid only near that operating point.
`
    }
  ],

  formulas: [
    { latex: "G(s)=\\frac{C(s)}{R(s)}", note: "Transfer function. Zero initial conditions, always." },
    { latex: "K_m=\\big[(s+p_m)F(s)\\big]_{s\\to-p_m}", note: "Cover-up residue — Case 1." },
    { latex: "K_i=\\frac{1}{(i-1)!}\\frac{d^{\\,i-1}F_1(s)}{ds^{\\,i-1}}\\bigg|_{-p_1}", note: "Repeated roots — Case 2." },
    { latex: "s^2+as+b=\\left(s+\\tfrac{a}{2}\\right)^2+\\left(b-\\tfrac{a^2}{4}\\right)", note: "Completing the square — Case 3." },
    { latex: "Z_R=R,\\; Z_L=Ls,\\; Z_C=\\tfrac{1}{Cs}", note: "Electrical impedances." },
    { latex: "Z_K=K,\\; Z_{f_v}=f_vs,\\; Z_M=Ms^2", note: "Mechanical impedances." },
    { latex: "\\frac{V_o}{V_i}=-\\frac{Z_2}{Z_1}\\;\\;\\bigg|\\;\\;\\frac{Z_1+Z_2}{Z_1}", note: "Op-amp: inverting | noninverting." },
    { latex: "\\frac{V_C(s)}{V(s)}=\\frac{1/LC}{s^2+\\frac{R}{L}s+\\frac{1}{LC}}", note: "Series RLC, capacitor output — canonical 2nd order." },
    { latex: "\\delta f\\approx\\left.\\frac{df}{dx}\\right|_{x_0}\\delta x", note: "Linearization about an operating point." }
  ],

  problems: [

    {
      id: "2-01", difficulty: "warmup", topic: "Laplace transforms",
      prompt: "Find $\\mathcal{L}\\{3t^{2}e^{-4t}u(t)\\}$.",
      hint: "Transform the $t^{2}$ part by itself first, ignoring the exponential. Then use the frequency-shift theorem to bring the exponential back in.",
      answer: "$$\\mathcal{L}\\{3t^{2}e^{-4t}u(t)\\}=\\frac{6}{(s+4)^{3}}$$",
      expert: `
**First glance:** a power of $t$ times a single exponential. That is one table entry, not two steps.

$$\\mathcal{L}\\left\\{t^{n}e^{-at}\\right\\}=\\frac{n!}{(s+a)^{n+1}}$$

$n=2$, so $2!=2$, times the leading 3 gives 6; $a=4$ pushes the pole to $-4$ with multiplicity $n+1=3$. Answer written down: $\\dfrac{6}{(s+4)^{3}}$.

**Ruled out immediately:** integrating the definition (only if the problem says "from the definition"), and treating the shift as a separate second step — fine while learning, wasted motion once the combined pair is memorized.

**The tell:** *any* product of a polynomial and one exponential is a repeated-pole pair. The polynomial degree sets the multiplicity; the exponential sets the pole. You should be able to go the other way just as fast — $\\dfrac{5}{(s+3)^{4}}$ is $\\tfrac{5}{6}t^{3}e^{-3t}$ on sight, because $3!=6$.
`,
      solution: `
The exponential is handled by the **frequency-shift theorem**:

$$\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$$

In words: transform the non-exponential part by itself, then replace every $s$ in the
result with $s+a$. The exponential enters at the end, not the beginning.

---

**Step 1 — transform $t^{2}$ alone.**

From pair 4, $\\mathcal{L}\\{t^{n}u(t)\\}=\\dfrac{n!}{s^{n+1}}$. Here $n=2$, so $n+1=3$
and $n!=2!=2\\times1=2$:

$$\\mathcal{L}\\{t^{2}u(t)\\}=\\frac{2!}{s^{2+1}}=\\frac{2}{s^{3}}$$

*This is the step people get wrong.* The numerator is $n!$, not 1. Writing $1/s^{3}$
here throws everything downstream off by a factor of 2.

**Step 2 — pull out the constant.**

Linearity lets a constant multiplier pass straight through:

$$\\mathcal{L}\\{3t^{2}u(t)\\}=3\\cdot\\frac{2}{s^{3}}=\\frac{6}{s^{3}}$$

Call this $F(s)=\\dfrac{6}{s^{3}}$.

**Step 3 — apply the frequency shift.**

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
— which is why the theorem exists.
`
    },

    {
      id: "2-02", difficulty: "warmup", topic: "Laplace transforms",
      prompt: "Find $\\mathcal{L}\\{4-2e^{-3t}+5t\\}$ for $t\\ge0$.",
      hint: "Three separate table lookups joined by linearity. Do not try to transform the sum as a unit.",
      answer: "$$F(s)=\\frac{4}{s}-\\frac{2}{s+3}+\\frac{5}{s^{2}}$$",
      expert: `
**First glance:** a sum of three elementary functions. Linearity means three independent lookups; there is no interaction between them and nothing to combine.

Written straight down, left to right: constant $\\to \\tfrac4s$, exponential $\\to -\\tfrac{2}{s+3}$, ramp $\\to \\tfrac{5}{s^{2}}$. Ten seconds.

**Ruled out immediately:** combining over a common denominator. Students do this reflexively because it "looks finished," but a sum of simple terms *is* the partial fraction expansion. Combining it only means you or someone else has to take it apart again.

**The tell for the sign:** $e^{-3t}$ decays, so its pole must be at $s=-3$, so the denominator reads $s+3$. If you ever write $s-3$ for a decaying exponential you have described a growing one.

**Free check, no work:** $f(0^{+})=4-2+0=2$, and the initial value theorem gives the same $2$ by reading leading coefficients. Experts do this check *before* moving on, not after being told to.
`,
      solution: `
**Step 0 — recognize the structure.** This is a *sum* of three simple functions, each
with a constant multiplier. Linearity says transform each piece separately and add:

$$\\mathcal{L}\\{k_{1}f_{1}+k_{2}f_{2}+k_{3}f_{3}\\}=k_{1}F_{1}(s)+k_{2}F_{2}(s)+k_{3}F_{3}(s)$$

Three lookups, not one hard problem.

---

**Step 1 — the constant term $4$.**

A constant for $t\\ge0$ is $4u(t)$, a step of height 4. From pair 2,
$\\mathcal{L}\\{u(t)\\}=1/s$:

$$\\mathcal{L}\\{4u(t)\\}=\\frac{4}{s}$$

**Step 2 — the exponential $-2e^{-3t}$.**

From pair 5, $\\mathcal{L}\\{e^{-at}u(t)\\}=\\dfrac{1}{s+a}$ with $a=3$:

$$\\mathcal{L}\\{-2e^{-3t}u(t)\\}=-\\frac{2}{s+3}$$

*Sign check:* $e^{-3t}$ has $a=+3$, giving $+3$ in the denominator and a pole at
$s=-3$. A decaying exponential always produces a left-half-plane pole.

**Step 3 — the ramp $5t$.**

From pair 3, $\\mathcal{L}\\{t\\,u(t)\\}=\\dfrac{1}{s^{2}}$:

$$\\mathcal{L}\\{5t\\,u(t)\\}=\\frac{5}{s^{2}}$$

**Step 4 — add.**

$$\\boxed{\\;F(s)=\\frac{4}{s}-\\frac{2}{s+3}+\\frac{5}{s^{2}}\\;}$$

There is no need to combine over a common denominator. Leaving it as a sum is preferred
— it is already in partial-fraction form, so inverting later is a one-line job.

---

**Check with the initial value theorem.** $f(0^{+})$ should be $4-2+0=2$:

$$\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\left(4-\\frac{2s}{s+3}+\\frac{5}{s}\\right)=4-2+0=2\\;\\checkmark$$
`
    },

    {
      id: "2-03", difficulty: "warmup", topic: "Laplace transforms",
      prompt: "Find $\\mathcal{L}\\{t^{3}+2\\sin5t\\}$ for $t\\ge0$.",
      hint: "Watch the factorial in the $t^{n}$ pair, and watch what sits in the numerator of the sine pair.",
      answer: "$$F(s)=\\frac{6}{s^{4}}+\\frac{10}{s^{2}+25}$$",
      expert: `
**First glance:** two lookups, and both have a classic trap baked in.

$t^{3}\\to \\dfrac{3!}{s^{4}}=\\dfrac{6}{s^{4}}$ — the factorial is the trap. $2\\sin5t\\to \\dfrac{2\\cdot5}{s^{2}+25}$ — the $\\omega$ on top is the other one.

**The discipline that prevents both:** say the rule out loud as you write. "$n$ factorial over $s$ to the $n$ plus one." "Sine puts omega on top, cosine puts $s$ on top." Two sentences, and the two most common transform errors in the course disappear.

**Ruled out immediately:** any attempt to combine over a common denominator, and any expansion of $\\sin 5t$ into exponentials.

**What an expert notices without being asked:** neither term settles. $\\tfrac{6}{s^{4}}$ is a fourfold pole at the origin and $\\tfrac{10}{s^{2}+25}$ has poles on the imaginary axis. So if a later part of the question asks for a final value, the answer is "the theorem does not apply" — spotted from the pole locations alone, before any computation.
`,
      solution: `
Two lookups joined by linearity.

---

**Step 1 — the $t^{3}$ term.**

Pair 4: $\\mathcal{L}\\{t^{n}u(t)\\}=\\dfrac{n!}{s^{n+1}}$ with $n=3$.

Compute the factorial explicitly: $3!=3\\times2\\times1=6$. And $n+1=4$.

$$\\mathcal{L}\\{t^{3}u(t)\\}=\\frac{6}{s^{4}}$$

**Step 2 — the $2\\sin5t$ term.**

Pair 6: $\\mathcal{L}\\{\\sin\\omega t\\;u(t)\\}=\\dfrac{\\omega}{s^{2}+\\omega^{2}}$.

Here $\\omega=5$, so $\\omega^{2}=25$:

$$\\mathcal{L}\\{\\sin5t\\}=\\frac{5}{s^{2}+25}$$

Multiply by the constant 2:

$$\\mathcal{L}\\{2\\sin5t\\}=\\frac{2\\cdot5}{s^{2}+25}=\\frac{10}{s^{2}+25}$$

*The trap:* the numerator of a **sine** transform is $\\omega$; the numerator of a
**cosine** transform is $s$. Writing $\\dfrac{s}{s^{2}+25}$ would mean you transformed
$\\cos5t$ instead.

**Step 3 — add.**

$$\\boxed{\\;F(s)=\\frac{6}{s^{4}}+\\frac{10}{s^{2}+25}\\;}$$

---

**Note on the poles.** The $6/s^{4}$ term has a fourfold pole at the origin — that is
the ever-growing $t^{3}$. The $10/(s^{2}+25)$ term has poles at $s=\\pm j5$, purely
imaginary, which is the never-decaying sinusoid. Neither settles, which is exactly why
the final value theorem would be invalid on this $F(s)$.
`
    },

    {
      id: "2-04", difficulty: "warmup", topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{5}{(s+2)(s+7)}.$$",
      hint: "Two distinct real roots. Use the cover-up method — one residue per factor, about five seconds each.",
      answer: "$$f(t)=\\left(e^{-2t}-e^{-7t}\\right)u(t)$$",
      expert: `
**First glance:** proper fraction, two distinct real linear factors, constant on top. Case 1. This is a cover-up problem done mentally.

$K_{1}$: cover $(s+2)$, put $-2$ into $\\tfrac{5}{s+7}$ $\\to \\tfrac{5}{5}=1$.
$K_{2}$: cover $(s+7)$, put $-7$ into $\\tfrac{5}{s+2}$ $\\to \\tfrac{5}{-5}=-1$.

Fifteen seconds including the write-up.

**Ruled out on sight:** long division (numerator degree 0 < 2), completing the square (nothing complex — the factors are already there), and setting up simultaneous equations for $K_{1}$ and $K_{2}$, which is what the cover-up rule exists to eliminate.

**The expert's free check:** when the denominator degree exceeds the numerator degree by two or more, **the residues must sum to zero.** Here $1+(-1)=0$ ✓ — which simultaneously confirms both residues *and* tells you $f(0)=0$ without touching the initial value theorem. If your residues do not sum to zero on a problem like this, you have an arithmetic error, guaranteed.
`,
      solution: `
**Step 0 — check the orders before anything else.**

Numerator degree 0 (just the constant 5). Denominator degree 2 (multiplying out gives
$s^{2}+9s+14$). Since $0<2$ the fraction is *proper* — no long division needed.

---

**Step 1 — identify the roots and write the form.**

$$s+2=0\\;\\Rightarrow\\;s=-2,\\qquad s+7=0\\;\\Rightarrow\\;s=-7$$

Two roots, both real, different from each other — **Case 1**. One term per factor:

$$F(s)=\\frac{5}{(s+2)(s+7)}=\\frac{K_{1}}{s+2}+\\frac{K_{2}}{s+7}$$

**Step 2 — find $K_{1}$ by cover-up.**

Cover up the $(s+2)$ in the original fraction and evaluate what remains at $s=-2$.
Covering $(s+2)$ leaves $\\dfrac{5}{s+7}$:

$$K_{1}=\\frac{5}{(-2)+7}=\\frac{5}{5}=1$$

**Step 3 — find $K_{2}$ by cover-up.**

Cover $(s+7)$, leaving $\\dfrac{5}{s+2}$, and substitute $s=-7$:

$$K_{2}=\\frac{5}{(-7)+2}=\\frac{5}{-5}=-1$$

*Arithmetic warning:* $-7+2=-5$, not $-9$. Sign slips here are the most common way this
problem goes wrong.

**Step 4 — invert term by term.**

$$F(s)=\\frac{1}{s+2}+\\frac{-1}{s+7}$$

Each term matches pair 5, $\\mathcal{L}^{-1}\\left\\{\\dfrac{1}{s+a}\\right\\}=e^{-at}$:

- $\\dfrac{1}{s+2}\\;\\to\\;e^{-2t}$  ($a=2$)
- $\\dfrac{-1}{s+7}\\;\\to\\;-e^{-7t}$  ($a=7$)

$$\\boxed{\\;f(t)=e^{-2t}-e^{-7t}\\;}$$

---

**Check 1 — recombine.**

$$\\frac{1}{s+2}-\\frac{1}{s+7}=\\frac{(s+7)-(s+2)}{(s+2)(s+7)}=\\frac{5}{(s+2)(s+7)}\\;\\checkmark$$

**Check 2 — initial value.** $f(0)=1-1=0$, and
$\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\dfrac{5s}{s^{2}+9s+14}=0\\;\\checkmark$

**Check 3 — signs.** Both exponentials are $e^{-\\text{positive}\\cdot t}$, so both decay
— required, since both poles are in the left half-plane.
`
    },

    {
      id: "2-05", difficulty: "warmup", topic: "Transfer functions",
      prompt: "Find the transfer function $G(s)=C(s)/R(s)$ for $$4\\frac{d^{2}c}{dt^{2}}+8\\frac{dc}{dt}+3c(t)=2\\frac{dr}{dt}+5r(t),$$ then locate the poles.",
      hint: "Zero initial conditions. Replace each $d^{n}/dt^{n}$ with $s^{n}$ and each lowercase function with its capital.",
      answer: "$$G(s)=\\frac{2s+5}{4s^{2}+8s+3}=\\frac{2s+5}{(2s+1)(2s+3)}$$ Poles at $s=-\\tfrac12$ and $s=-\\tfrac32$, both real and in the left half-plane.",
      expert: `
**First glance:** this is not a problem, it is a transcription. Output coefficients become the denominator, input coefficients become the numerator, in the same order they appear.

$$4,8,3\\;\\to\\;4s^{2}+8s+3
\\qquad
2,5\\;\\to\\;2s+5$$

Written in one pass without transforming anything term by term.

**Ruled out immediately:** actually applying the differentiation theorem with its initial-condition terms. The problem says "transfer function," which *means* zero initial conditions, which *means* the substitution $d^{n}/dt^{n}\\to s^{n}$ and nothing else.

**On the poles:** an expert checks the discriminant before reaching for the quadratic formula. $64-48=16$, a perfect square, so the roots are rational and the polynomial factors by inspection. Two numbers multiplying to $4\\cdot3=12$ and adding to $8$: that is $2$ and $6$, giving $(2s+1)(2s+3)$ and roots $-\\tfrac12,-\\tfrac32$.

Seeing "perfect-square discriminant $\\Rightarrow$ factor by inspection" saves the formula entirely, which matters when you have no calculator.
`,
      solution: `
**Step 1 — transform both sides with zero initial conditions.**

$$\\frac{d^{2}c}{dt^{2}}\\to s^{2}C(s),\\qquad
\\frac{dc}{dt}\\to sC(s),\\qquad
c(t)\\to C(s)$$

and identically for $r$:

$$4s^{2}C(s)+8sC(s)+3C(s)=2sR(s)+5R(s)$$

**Step 2 — factor $C(s)$ out of the left, $R(s)$ out of the right.**

$$\\left(4s^{2}+8s+3\\right)C(s)=\\left(2s+5\\right)R(s)$$

**Step 3 — form the ratio.**

$$\\boxed{\\;G(s)=\\frac{C(s)}{R(s)}=\\frac{2s+5}{4s^{2}+8s+3}\\;}$$

The pattern worth memorizing: **output terms become the denominator, input terms become
the numerator.**

---

**Step 4 — find the poles.**

Set $4s^{2}+8s+3=0$ and use the quadratic formula with $a=4$, $b=8$, $c=3$:

$$s=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}=\\frac{-8\\pm\\sqrt{64-4(4)(3)}}{2(4)}=\\frac{-8\\pm\\sqrt{64-48}}{8}=\\frac{-8\\pm\\sqrt{16}}{8}=\\frac{-8\\pm4}{8}$$

$$s=\\frac{-8+4}{8}=-\\frac{1}{2},\\qquad s=\\frac{-8-4}{8}=-\\frac{3}{2}$$

Discriminant $16>0$, so the roots are **real and distinct** — the response is a sum of
decaying exponentials with no oscillation.

**Factored form.**

$$4s^{2}+8s+3=(2s+1)(2s+3)$$

Verify: $(2s+1)(2s+3)=4s^{2}+6s+2s+3=4s^{2}+8s+3\\;\\checkmark$

**Zero.** $2s+5=0\\Rightarrow s=-2.5$.
`
    },

    {
      id: "2-06", difficulty: "warmup", topic: "Transfer functions",
      prompt: "A system has $$G(s)=\\frac{3s}{s^{2}+2s+10}.$$ Write the differential equation relating $c(t)$ to $r(t)$.",
      hint: "Reverse the process: cross-multiply, then replace each $s^{k}$ with $d^{k}/dt^{k}$.",
      answer: "$$\\frac{d^{2}c}{dt^{2}}+2\\frac{dc}{dt}+10c(t)=3\\frac{dr}{dt}$$",
      expert: `
**First glance:** transcription again, running the other way. Denominator coefficients $1,2,10$ attach to $c$; numerator coefficient $3$ with one power of $s$ attaches to $\\dot r$.

$$\\ddot c+2\\dot c+10c=3\\dot r$$

**The one place people lose a point:** writing $+3r$ on the right. There is no constant term in the numerator, so there is no $r(t)$ term. Read the numerator as a polynomial with $b_{1}=3$ and $b_{0}=0$, and the missing term is obvious.

**Ruled out immediately:** inverse-transforming anything. No partial fractions, no table, no $t$-domain work at all — this is pure notation.

**What an expert reads off in passing, unasked:** discriminant $4-40=-36<0$, so complex poles; completing the square gives $(s+1)^{2}+3^{2}$, so $s=-1\\pm j3$. Underdamped, oscillating at 3 rad/s, envelope $e^{-t}$. That takes five seconds and means you can answer any follow-up about the response without going back.
`,
      solution: `
**Step 1 — write out what the transfer function means.**

$$G(s)=\\frac{C(s)}{R(s)}=\\frac{3s}{s^{2}+2s+10}$$

**Step 2 — cross-multiply** to clear all fractions:

$$\\left(s^{2}+2s+10\\right)C(s)=3s\\,R(s)$$

**Step 3 — distribute so each term stands alone.**

$$s^{2}C(s)+2sC(s)+10C(s)=3sR(s)$$

**Step 4 — invert the substitution.**

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
a 3 rad/s sinusoid decaying as $e^{-t}$ — underdamped.
`
    },

    {
      id: "2-07", difficulty: "core", topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{10}{s(s+2)(s+5)}.$$",
      hint: "Three distinct real roots, one at the origin. The pole at $s=0$ is what produces the constant term in $f(t)$.",
      answer: "$$f(t)=\\left(1-\\tfrac{5}{3}e^{-2t}+\\tfrac{2}{3}e^{-5t}\\right)u(t)$$",
      expert: `
**First glance:** three distinct real roots, one at the origin, constant numerator. Case 1 again — the extra factor changes nothing about the method.

**The shortcut that matters:** the residue at the pole $s=0$ **is the final value**. Cover $s$, evaluate $\\tfrac{10}{(s+2)(s+5)}$ at $0$, get $\\tfrac{10}{10}=1$. You now know $f(\\infty)=1$ without the final value theorem, because the constant term of $f(t)$ *is* that residue.

Remaining two by cover-up: $\\tfrac{10}{(-2)(3)}=-\\tfrac53$ and $\\tfrac{10}{(-5)(-3)}=\\tfrac23$.

**Ruled out on sight:** anything involving the quadratic formula or completing the square. The denominator arrived factored; do not un-factor it.

**Where the error actually happens:** $(-5)(-3)=+15$. Not the concept — the sign. An expert slows down for exactly two seconds at each cover-up evaluation, writes the factor values separately ($s=-5$, $s+2=-3$), then multiplies. That habit is worth more than any formula in this section.

**Free check:** residues must sum to zero (denominator degree exceeds numerator by 3): $1-\\tfrac53+\\tfrac23=0$ ✓
`,
      solution: `
**Step 0 — orders.** Numerator degree 0, denominator degree 3. Proper.

**Step 1 — identify the roots.**

$$s=0,\\qquad s+2=0\\Rightarrow s=-2,\\qquad s+5=0\\Rightarrow s=-5$$

All real, all different — Case 1 with one extra term. The root at the origin is an
ordinary distinct root; nothing special about it procedurally.

$$F(s)=\\frac{K_{1}}{s}+\\frac{K_{2}}{s+2}+\\frac{K_{3}}{s+5}$$

---

**Step 2 — $K_{1}$: cover $s$, evaluate at $s=0$.**

Covering $s$ leaves $\\dfrac{10}{(s+2)(s+5)}$:

$$K_{1}=\\frac{10}{(0+2)(0+5)}=\\frac{10}{2\\times5}=\\frac{10}{10}=1$$

**Step 3 — $K_{2}$: cover $(s+2)$, evaluate at $s=-2$.**

Covering $(s+2)$ leaves $\\dfrac{10}{s(s+5)}$. Work the denominator piecewise: $s=-2$,
and $s+5=-2+5=3$, so the product is $(-2)(3)=-6$:

$$K_{2}=\\frac{10}{-6}=-\\frac{5}{3}$$

(reducing by dividing top and bottom by 2)

**Step 4 — $K_{3}$: cover $(s+5)$, evaluate at $s=-5$.**

Covering $(s+5)$ leaves $\\dfrac{10}{s(s+2)}$. Here $s=-5$ and $s+2=-5+2=-3$:

$$K_{3}=\\frac{10}{(-5)(-3)}=\\frac{10}{15}=\\frac{2}{3}$$

*Sign care:* $(-5)(-3)$ is **positive** 15 — negative times negative. Getting this wrong
is the usual failure on three-root problems.

---

**Step 5 — assemble and invert.**

$$F(s)=\\frac{1}{s}-\\frac{5/3}{s+2}+\\frac{2/3}{s+5}$$

- $\\dfrac{1}{s}\\to u(t)$, the constant 1  (pair 2)
- $-\\dfrac{5/3}{s+2}\\to-\\dfrac{5}{3}e^{-2t}$  (pair 5)
- $\\dfrac{2/3}{s+5}\\to\\dfrac{2}{3}e^{-5t}$  (pair 5)

$$\\boxed{\\;f(t)=1-\\frac{5}{3}e^{-2t}+\\frac{2}{3}e^{-5t}\\;}$$

---

**Check 1 — initial value.**

$$f(0)=1-\\frac{5}{3}+\\frac{2}{3}=\\frac{3}{3}-\\frac{5}{3}+\\frac{2}{3}=\\frac{0}{3}=0$$

and $\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\dfrac{10}{(s+2)(s+5)}=0\\;\\checkmark$

**Check 2 — final value.** Both exponentials vanish, leaving $f(\\infty)=1$:

$$\\lim_{s\\to0}sF(s)=\\frac{10}{(2)(5)}=1\\;\\checkmark$$

Valid because the poles of $sF(s)$ are $-2$ and $-5$, both left-half-plane.

**General lesson:** a pole at the origin in $F(s)$ produces a **constant** term in
$f(t)$, and that constant equals the final value.
`
    },

    {
      id: "2-08", difficulty: "core", topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{s+3}{s(s+1)^{2}}.$$",
      hint: "The $(s+1)^{2}$ is a repeated root. It generates two terms, and the second one needs a derivative.",
      answer: "$$f(t)=\\left(3-3e^{-t}-2te^{-t}\\right)u(t)$$",
      expert: `
**First glance:** $(s+1)^{2}$. Repeated root, so this is Case 2 and there will be **three** terms for a third-degree denominator — one for $s$, two for the squared factor. Counting terms before starting is what stops the whole problem going wrong.

**The expert's move:** deal with the simple pole by cover-up first (it is free), then set up $F_{1}(s)=(s+1)^{2}F(s)=\\tfrac{s+3}{s}$ and notice immediately that it simplifies to $1+\\tfrac3s$. Now the derivative is $-3s^{-2}$ by the power rule — **no quotient rule needed.** Rewriting before differentiating is the single biggest time saver in repeated-root problems.

**Ruled out on sight:** clearing denominators and matching coefficients. It works, but it means solving three simultaneous equations where the formula gives you the answers directly.

**The structural check:** a repeated root *must* produce a $te^{-at}$ term. If your final answer has no polynomial multiplying an exponential, you dropped a term and should stop and find it.

**Free check:** $f(0)=3-0-3=0$, consistent with numerator degree 1 vs denominator degree 3.
`,
      solution: `
**Step 0 — orders.** Numerator degree 1, denominator degree 3. Proper.

**Step 1 — recognize the case and write the form.**

$(s+1)$ appears squared, so $r=2$ — **Case 2**. A factor to the power $r$ generates $r$
terms with *descending* powers. The non-repeated factor $s$ contributes one ordinary
term.

$$F(s)=\\frac{s+3}{s(s+1)^{2}}=\\frac{K_{1}}{s}+\\frac{K_{2}}{(s+1)^{2}}+\\frac{K_{3}}{s+1}$$

**Three** unknowns for a third-degree denominator. Writing only two terms
under-specifies the problem and the algebra will not close.

---

**Step 2 — $K_{1}$ by ordinary cover-up.**

$s$ is not repeated, so the standard method applies. Cover $s$, leaving
$\\dfrac{s+3}{(s+1)^{2}}$, evaluate at $s=0$:

$$K_{1}=\\frac{0+3}{(0+1)^{2}}=\\frac{3}{1}=3$$

**Step 3 — set up the repeated-root machinery.**

$$F_{1}(s)=(s+1)^{2}F(s)=(s+1)^{2}\\cdot\\frac{s+3}{s(s+1)^{2}}=\\frac{s+3}{s}$$

The $(s+1)^{2}$ cancels completely. Multiplying by the *highest* power of the repeated
factor is always the first move.

**Step 4 — $K_{2}$, the highest-power coefficient.**

$$K_{i}=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_{1}(s)}{ds^{\\,i-1}}\\right|_{s\\to-1}$$

For $i=1$ (giving the coefficient of $1/(s+1)^{2}$, labelled $K_{2}$): $(i-1)!=0!=1$ and
the zeroth derivative means "do not differentiate." Evaluate $F_{1}$ directly at $s=-1$:

$$K_{2}=\\left.\\frac{s+3}{s}\\right|_{s=-1}=\\frac{-1+3}{-1}=\\frac{2}{-1}=-2$$

**Step 5 — $K_{3}$, one step down the ladder.**

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

**Step 6 — assemble and invert.**

$$F(s)=\\frac{3}{s}+\\frac{-2}{(s+1)^{2}}+\\frac{-3}{s+1}$$

- $\\dfrac{3}{s}\\to3$  (pair 2)
- $\\dfrac{-2}{(s+1)^{2}}\\to-2te^{-t}$  (pair 10)
- $\\dfrac{-3}{s+1}\\to-3e^{-t}$  (pair 5)

$$\\boxed{\\;f(t)=3-2te^{-t}-3e^{-t}\\;}$$

---

**Check 1 — initial value.** $f(0)=3-2(0)(1)-3(1)=0$, and
$\\lim_{s\\to\\infty}\\dfrac{s+3}{(s+1)^{2}}=0\\;\\checkmark$

**Check 2 — final value.** Both $te^{-t}$ and $e^{-t}$ go to zero (the exponential always
beats the linear factor), so $f(\\infty)=3$, and
$\\lim_{s\\to0}\\dfrac{s+3}{(s+1)^{2}}=\\dfrac{3}{1}=3\\;\\checkmark$

**Signature of a repeated root.** The $te^{-t}$ term — a polynomial multiplying an
exponential — appears *only* when a root repeats. If your answer to a repeated-root
problem has no $t$ multiplying an exponential, you dropped a term.
`
    },

    {
      id: "2-09", difficulty: "core", topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{5}{s\\left(s^{2}+4s+8\\right)}.$$",
      hint: "Test the discriminant of the quadratic before trying to factor it. If negative, complete the square instead.",
      answer: "$$f(t)=\\frac{5}{8}-\\frac{5}{8}e^{-2t}\\left(\\cos2t+\\sin2t\\right)$$",
      expert: `
**First glance:** check the discriminant of $s^{2}+4s+8$ *before* anything else. $16-32=-16<0$ — complex. That single test decides the whole method: keep the quadratic intact, linear numerator, Case 3.

**What an expert does not do:** try to factor it, hunt for rational roots, or go to complex residues. Complex-residue arithmetic is correct but error-prone by hand and produces an answer you then have to convert back to sines and cosines.

**The fast path:** $K_{1}$ by cover-up ($\\tfrac58$), then note that for $\\tfrac{K}{s(s^{2}+bs+c)}$ the remaining numerator is always $-K_{1}(s+b)$ — here $-\\tfrac58(s+4)$. That pattern lets you skip the coefficient-balancing entirely once you trust it.

Complete the square by eye: half of 4 is 2, $2^{2}=4$, $8-4=4$, so $(s+2)^{2}+2^{2}$. Then split $s+4=(s+2)+2$, and since $\\omega=2$ the sine coefficient is $\\tfrac22=1$.

**The recognition worth having:** when the shift and $\\omega$ come out equal (both 2 here), the cosine and sine coefficients are equal, which means $R=\\sqrt2$ and $\\phi=45^{\\circ}$ exactly. No calculator, and you can state the single-sinusoid form immediately.
`,
      solution: `
**Step 1 — test the quadratic first.**

For $s^{2}+4s+8$: $a=1$, $b=4$, $c=8$.

$$b^{2}-4ac=16-4(1)(8)=16-32=-16<0$$

Negative discriminant means **complex roots** — the quadratic is irreducible over the
reals. Do not attempt to factor it. Keep it whole with a *linear* numerator — **Case 3**.

$$F(s)=\\frac{5}{s\\left(s^{2}+4s+8\\right)}=\\frac{K_{1}}{s}+\\frac{K_{2}s+K_{3}}{s^{2}+4s+8}$$

*Why a linear numerator?* A term's numerator must be one degree lower than its
denominator. Over a quadratic that means $K_{2}s+K_{3}$, not a bare constant.

---

**Step 2 — $K_{1}$ by cover-up.**

Cover $s$, leaving $\\dfrac{5}{s^{2}+4s+8}$, evaluate at $s=0$:

$$K_{1}=\\frac{5}{0+0+8}=\\frac{5}{8}$$

**Step 3 — clear the fractions.**

Multiply every term by $s\\left(s^{2}+4s+8\\right)$:

$$5=K_{1}\\left(s^{2}+4s+8\\right)+\\left(K_{2}s+K_{3}\\right)s$$

**Step 4 — expand and collect by powers.**

$$5=K_{1}s^{2}+4K_{1}s+8K_{1}+K_{2}s^{2}+K_{3}s$$

$$5=\\left(K_{1}+K_{2}\\right)s^{2}+\\left(4K_{1}+K_{3}\\right)s+8K_{1}$$

**Step 5 — balance coefficients.**

The left side is $5$: no $s^{2}$, no $s^{1}$, constant 5.

| Power | Equation | Solve |
|---|---|---|
| $s^{2}$ | $K_{1}+K_{2}=0$ | $K_{2}=-\\tfrac{5}{8}$ |
| $s^{1}$ | $4K_{1}+K_{3}=0$ | $K_{3}=-4\\left(\\tfrac58\\right)=-\\tfrac{5}{2}$ |
| $s^{0}$ | $8K_{1}=5$ | $K_{1}=\\tfrac{5}{8}\\;\\checkmark$ |

The $s^{0}$ row is a free consistency check — it reproduces the $K_{1}$ found in Step 2.

$$F(s)=\\frac{5/8}{s}+\\frac{-\\tfrac58 s-\\tfrac52}{s^{2}+4s+8}
=\\frac{5/8}{s}-\\frac{5}{8}\\cdot\\frac{s+4}{s^{2}+4s+8}$$

*How that factoring worked:*
$-\\tfrac58 s-\\tfrac52=-\\tfrac58\\left(s+\\tfrac{5/2}{5/8}\\right)=-\\tfrac58(s+4)$,
since $\\dfrac{5/2}{5/8}=\\dfrac52\\cdot\\dfrac85=4$.

---

**Step 6 — complete the square.**

$$s^{2}+4s+8=\\left(s+\\tfrac{4}{2}\\right)^{2}+\\left(8-\\tfrac{4^{2}}{4}\\right)=(s+2)^{2}+4=(s+2)^{2}+2^{2}$$

So $a=2$ and $\\omega=2$.

**Step 7 — split the numerator to match the table.**

Target form $\\dfrac{A(s+a)+B\\omega}{(s+a)^{2}+\\omega^{2}}$ with $a=2$, $\\omega=2$.
Rewrite $s+4$ in terms of $(s+2)$:

$$s+4=(s+2)+2=\\underbrace{1}_{A}\\cdot(s+2)+\\underbrace{1}_{B}\\cdot\\underbrace{2}_{\\omega}$$

$$F(s)=\\frac{5/8}{s}-\\frac{5}{8}\\left[\\frac{s+2}{(s+2)^{2}+2^{2}}+\\frac{2}{(s+2)^{2}+2^{2}}\\right]$$

**Step 8 — invert.**

- $\\dfrac{5/8}{s}\\to\\dfrac{5}{8}$  (pair 2)
- $\\dfrac{s+2}{(s+2)^{2}+2^{2}}\\to e^{-2t}\\cos2t$  (pair 9)
- $\\dfrac{2}{(s+2)^{2}+2^{2}}\\to e^{-2t}\\sin2t$  (pair 8)

$$\\boxed{\\;f(t)=\\frac{5}{8}-\\frac{5}{8}e^{-2t}\\left(\\cos2t+\\sin2t\\right)\\;}$$

---

**Optional single-sinusoid form — keep it exact.** With $A=B=1$:

$$R=\\sqrt{A^{2}+B^{2}}=\\sqrt{1+1}=\\sqrt2,\\qquad
\\phi=\\arctan\\frac{B}{A}=\\arctan(1)=45^{\\circ}=\\frac{\\pi}{4}$$

$$f(t)=\\frac{5}{8}-\\frac{5\\sqrt2}{8}\\,e^{-2t}\\cos\\!\\left(2t-\\frac{\\pi}{4}\\right)$$

Both $\\sqrt2$ and $45^{\\circ}$ are exact values you must know cold — no calculator
needed, and no decimal should ever appear in your final answer.

**Check — initial value.** $f(0)=\\tfrac58-\\tfrac58(1)(1+0)=0\\;\\checkmark$

**Check — final value.** $f(\\infty)=\\tfrac58$, and
$\\lim_{s\\to0}sF(s)=\\tfrac58\\;\\checkmark$
`
    },

    {
      id: "2-10", difficulty: "core", topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{s^{2}+4s+5}{s^{2}+3s+2}.$$",
      hint: "Compare the degree of the numerator to the degree of the denominator before you do anything else.",
      answer: "$$f(t)=\\delta(t)+2e^{-t}-e^{-2t}$$",
      expert: `
**First glance:** degree 2 over degree 2. An expert's eye goes to the **degrees before the coefficients**, every time. Equal degrees means improper, means long division first, means there will be a $\\delta(t)$ in the answer.

Knowing the answer contains an impulse *before* starting is the whole value of the first glance — it stops you from panicking when $\\delta(t)$ appears and stops you from "simplifying" it away.

**The division is trivial here:** both leading coefficients are 1, so the quotient is 1 and the remainder is the coefficient-wise difference: $(4-3)s+(5-2)=s+3$. No long-division scaffolding needed for a same-degree divide — just subtract.

**Ruled out on sight:** expanding directly into $\\tfrac{K_1}{s+1}+\\tfrac{K_2}{s+2}$. It will produce residues that do not reconstruct the original, and because nothing looks obviously wrong, the error is silent.

**The general rule to carry:** $\\deg N-\\deg D=0$ gives $\\delta(t)$; $=1$ gives $\\dot\\delta(t)$ as well; $<0$ gives neither. This is the same fact as "$c(0^{+})=G(\\infty)$," which you will use constantly in Chapter 4.
`,
      solution: `
**Step 0 — this is the whole point of the problem.**

Numerator degree 2. Denominator degree 2. Since $\\deg N\\ge\\deg D$ the fraction is
**improper** and cannot be expanded directly. Long division first.

Attempting Case 1 without dividing produces residues that do not reconstruct the
original — a silent wrong answer.

---

**Step 1 — polynomial long division.**

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

**Step 2 — factor the remaining denominator.**

Two numbers multiplying to $2$ and adding to $3$: $1$ and $2$.

$$s^{2}+3s+2=(s+1)(s+2)$$

Verify: $(s+1)(s+2)=s^{2}+2s+s+2=s^{2}+3s+2\\;\\checkmark$

**Step 3 — expand the proper remainder (Case 1).**

$$\\frac{s+3}{(s+1)(s+2)}=\\frac{K_{1}}{s+1}+\\frac{K_{2}}{s+2}$$

$K_{1}$: cover $(s+1)$, evaluate $\\dfrac{s+3}{s+2}$ at $s=-1$:

$$K_{1}=\\frac{-1+3}{-1+2}=\\frac{2}{1}=2$$

$K_{2}$: cover $(s+2)$, evaluate $\\dfrac{s+3}{s+1}$ at $s=-2$:

$$K_{2}=\\frac{-2+3}{-2+1}=\\frac{1}{-1}=-1$$

**Step 4 — assemble and invert.**

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

**Check — recombine.**

$$1+\\frac{2}{s+1}-\\frac{1}{s+2}=\\frac{(s+1)(s+2)+2(s+2)-(s+1)}{(s+1)(s+2)}$$

Numerator: $\\left(s^{2}+3s+2\\right)+\\left(2s+4\\right)-\\left(s+1\\right)=s^{2}+4s+5\\;\\checkmark$
`
    },

    {
      id: "2-11", difficulty: "core", topic: "Solving ODEs",
      prompt: "Solve $$\\frac{d^{2}y}{dt^{2}}+5\\frac{dy}{dt}+4y=0$$ with $y(0^-)=1$ and $\\dot y(0^-)=0$, using the Laplace transform.",
      hint: "This time you must keep the initial-condition terms. They are the entire input.",
      answer: "$$y(t)=\\frac{4}{3}e^{-t}-\\frac{1}{3}e^{-4t}$$",
      expert: `
**First glance:** nonzero initial conditions and no forcing term. That combination means the initial conditions *are* the input — they will appear on the right-hand side after transforming, and the answer is a pure natural response.

**The pattern an expert writes down without deriving:** for $\\ddot y+b\\dot y+cy=0$ with $y(0)=y_{0}$, $\\dot y(0)=0$,

$$Y(s)=\\frac{y_{0}(s+b)}{s^{2}+bs+c}$$

Here $y_{0}=1$, $b=5$, so $Y=\\tfrac{s+5}{s^{2}+5s+4}$ straight down, with no bookkeeping of the $-sf(0)-\\dot f(0)$ terms.

**Ruled out on sight:** forming a transfer function. There is no input, so there is nothing to take a ratio with — students reach for $G(s)$ out of habit and get stuck.

**The check that ends the problem:** a solution that satisfies the differential equation *and* both initial conditions is unique. So verify $y(0)=\\tfrac43-\\tfrac13=1$ and $\\dot y(0)=-\\tfrac43+\\tfrac43=0$ and you are done — no need to substitute back into the ODE at all. Two arithmetic lines close the problem completely.
`,
      solution: `
Different from the transfer-function work: the initial conditions are **not** zero and
must be carried, because there is no forcing input. The initial conditions *are* what
drives the response.

---

**Step 1 — write the differentiation theorems in full.**

$$\\mathcal{L}\\left\\{\\frac{dy}{dt}\\right\\}=sY(s)-y(0^-)$$

$$\\mathcal{L}\\left\\{\\frac{d^{2}y}{dt^{2}}\\right\\}=s^{2}Y(s)-sy(0^-)-\\dot y(0^-)$$

**Step 2 — substitute $y(0^-)=1$, $\\dot y(0^-)=0$.**

$$\\mathcal{L}\\left\\{\\frac{dy}{dt}\\right\\}=sY(s)-1$$

$$\\mathcal{L}\\left\\{\\frac{d^{2}y}{dt^{2}}\\right\\}=s^{2}Y(s)-s(1)-0=s^{2}Y(s)-s$$

**Step 3 — transform the whole equation.**

$$\\underbrace{\\left[s^{2}Y(s)-s\\right]}_{y''}+5\\underbrace{\\left[sY(s)-1\\right]}_{y'}+4\\underbrace{Y(s)}_{y}=0$$

**Step 4 — expand and separate.**

$$s^{2}Y(s)-s+5sY(s)-5+4Y(s)=0$$

$$\\left(s^{2}+5s+4\\right)Y(s)=s+5$$

The right-hand side is built entirely from initial conditions — that is the "input."

**Step 5 — solve and factor.**

$$Y(s)=\\frac{s+5}{s^{2}+5s+4}=\\frac{s+5}{(s+1)(s+4)}$$

(two numbers multiplying to 4, adding to 5: 1 and 4)

**Step 6 — partial fractions.**

$K_{1}$: cover $(s+1)$, evaluate $\\dfrac{s+5}{s+4}$ at $s=-1$:

$$K_{1}=\\frac{-1+5}{-1+4}=\\frac{4}{3}$$

$K_{2}$: cover $(s+4)$, evaluate $\\dfrac{s+5}{s+1}$ at $s=-4$:

$$K_{2}=\\frac{-4+5}{-4+1}=\\frac{1}{-3}=-\\frac{1}{3}$$

**Step 7 — invert.**

$$\\boxed{\\;y(t)=\\frac{4}{3}e^{-t}-\\frac{1}{3}e^{-4t}\\;}$$

---

**Check 1 — does $y(0)=1$?**

$$y(0)=\\frac{4}{3}-\\frac{1}{3}=\\frac{3}{3}=1\\;\\checkmark$$

**Check 2 — does $\\dot y(0)=0$?**

$$\\dot y(t)=-\\frac{4}{3}e^{-t}+\\frac{4}{3}e^{-4t}$$

(the second term: $\\dfrac{d}{dt}\\left[-\\tfrac13e^{-4t}\\right]=-\\tfrac13(-4)e^{-4t}=+\\tfrac43e^{-4t}$)

$$\\dot y(0)=-\\frac{4}{3}+\\frac{4}{3}=0\\;\\checkmark$$

Both initial conditions reproduce. A solution satisfying the differential equation *and*
both initial conditions is the unique answer — that is a complete verification.

**Physical reading.** Both poles are left-half-plane, so the response decays to zero.
This is a purely natural response: no input, therefore no forced response.
`
    },

    {
      id: "2-12", difficulty: "core", topic: "Final value theorem",
      prompt: `A system has $G(s)=\\dfrac{20}{(s+2)(s+5)}$ and is driven by a unit step.

**(a)** Find the steady-state value of the output.

**(b)** A classmate applies the same method to $G(s)=\\dfrac{5}{s^{2}-3s+2}$ and reports a steady-state value. Explain why their answer is meaningless.`,
      hint: "The final value theorem has a precondition about pole locations. Check it before using it, both times.",
      answer: "**(a)** $c(\\infty)=2$. **(b)** That system's poles are at $s=+1$ and $s=+2$, both right-half-plane, so it is unstable and the theorem does not apply. The response grows without bound; there is no final value.",
      expert: `
**First glance at part (b):** $s^{2}-3s+2$. The **minus sign on the $s$ term** is the entire problem. A stable polynomial with positive constant term has all-positive coefficients; a sign change means at least one root in the right half-plane. An expert sees that and knows the answer before factoring.

(This is the Routh-Hurwitz necessary condition, which you meet formally in Chapter 6 — but the "all coefficients same sign" tell is worth having now.)

**Part (a), the fast path:** for a step input, steady-state output is just $G(0)$. Do not form $C(s)$, do not write the limit. $G(0)=\\tfrac{20}{(2)(5)}=2$. One line.

**Ruled out on sight:** computing the full inverse transform to find a final value. Never necessary.

**The discipline this problem is really drilling:** *locate the poles, then decide if the theorem is allowed.* Not the reverse. The final value theorem will happily return a number for an unstable system, for an oscillator, for anything — and that number is meaningless. Poles on the imaginary axis break it just as thoroughly as poles to the right, which is why $\\tfrac{\\omega}{s^{2}+\\omega^{2}}$ is the counterexample everyone should keep in mind.
`,
      solution: `
## Part (a)

**Step 1 — form $C(s)$.**

A unit step has $R(s)=\\dfrac{1}{s}$, and $C(s)=R(s)G(s)$:

$$C(s)=\\frac{1}{s}\\cdot\\frac{20}{(s+2)(s+5)}=\\frac{20}{s(s+2)(s+5)}$$

**Step 2 — check the precondition before applying the theorem.**

$$f(\\infty)=\\lim_{s\\to0}sF(s)$$

is valid **only if every root of the denominator of $sF(s)$ has a negative real part.**

Here $sC(s)=\\dfrac{20}{(s+2)(s+5)}$, with roots $s=-2$ and $s=-5$. Both negative. The
theorem applies.

**Step 3 — take the limit.**

$$c(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{20}{s(s+2)(s+5)}=\\lim_{s\\to0}\\frac{20}{(s+2)(s+5)}=\\frac{20}{(2)(5)}=\\frac{20}{10}=2$$

$$\\boxed{\\;c(\\infty)=2\\;}$$

**Shortcut worth knowing.** For a step input, the steady-state output is just $G(0)$ —
the dc gain. Check: $G(0)=\\dfrac{20}{10}=2\\;\\checkmark$

---

## Part (b)

**Step 1 — find the poles.**

$$s^{2}-3s+2=0$$

Two numbers multiplying to $+2$ and adding to $-3$: $-1$ and $-2$.

$$s^{2}-3s+2=(s-1)(s-2)$$

Roots: $s=+1$ and $s=+2$.

*Watch the signs.* The factors $(s-1)$ and $(s-2)$ give **positive** roots. A minus sign
on the $s$ term in the polynomial is the tell.

**Step 2 — interpret.**

Both poles have positive real parts — **right half-plane**. The natural response terms
are $e^{+1t}$ and $e^{+2t}$, which **grow without bound**. The system is unstable.

**Step 3 — why the answer is garbage.**

The precondition fails, so the limit is not the final value of anything. If your
classmate computed
$\\lim_{s\\to0}s\\cdot\\dfrac{5}{s\\left(s^{2}-3s+2\\right)}=\\dfrac{5}{2}=2.5$, that
number is arithmetically correct and physically meaningless — the actual $c(t)$ contains
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
      prompt: `For the series RLC network below the input is $v(t)$ and the output is the capacitor voltage $v_{C}(t)$. Given $L=1$ H, $R=3\\ \\Omega$, $C=\\tfrac12$ F, find $\\dfrac{V_{C}(s)}{V(s)}$ and locate its poles.

<svg viewBox="0 0 420 170" width="100%" style="max-width:430px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<circle cx="45" cy="95" r="20"/>
<path d="M45 75 L45 40 L118 40"/>
<path d="M45 115 L45 150 L360 150 L360 118"/>
<path d="M118 40 q8 -15 16 0 q8 -15 16 0 q8 -15 16 0 q8 -15 16 0"/>
<path d="M182 40 L215 40"/>
<path d="M215 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M275 40 L360 40 L360 72"/>
<path d="M338 72 L382 72 M338 118 L382 118"/>
<path d="M235 62 L268 62" stroke-width="1.5"/>
<path d="M262 58 L268 62 L262 66" stroke-width="1.5"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="12" y="100">v(t)</text><text x="144" y="26">L</text><text x="240" y="26">R</text>
<text x="390" y="99">C</text><text x="243" y="80">i(t)</text>
<text x="296" y="99">v</text><text x="305" y="103" font-size="10">C</text><text x="311" y="99">(t)</text>
</g>
<text x="38" y="88" font-family="Georgia,serif" font-size="13" fill="#1A2028">+</text>
<text x="41" y="112" font-family="Georgia,serif" font-size="15" fill="#1A2028">−</text>
</svg>`,
      hint: "Convert every component to its impedance, then recognize the topology as a voltage divider. Do not write an integro-differential equation.",
      answer: "$$\\frac{V_{C}(s)}{V(s)}=\\frac{2}{s^{2}+3s+2}=\\frac{2}{(s+1)(s+2)}$$ Poles at $s=-1$ and $s=-2$: real, distinct, left-half-plane, so the response is overdamped.",
      expert: `
**First glance:** single loop, capacitor output. An expert does not derive anything — this network has a memorized answer:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{1/LC}{s^{2}+\\frac{R}{L}s+\\frac{1}{LC}}$$

Substitute: $\\tfrac{1}{LC}=\\tfrac{1}{1\\cdot\\frac12}=2$ and $\\tfrac{R}{L}=3$, giving $\\tfrac{2}{s^{2}+3s+2}$. Five seconds, no algebra.

**Ruled out on sight:** writing KVL in the time domain, mesh matrices, Cramer's rule. One loop means one unknown; a voltage divider is the whole tool.

**The arithmetic trap, and where everyone hits it:** $Z_{C}=\\tfrac{1}{Cs}$ with $C=\\tfrac12$ gives $\\tfrac{2}{s}$, not $\\tfrac{1}{2s}$. That is a factor-of-four error and it is the single most common mistake in this section. Say "one over $C$ times $s$" and compute $\\tfrac1C$ first.

**Free check an expert always runs:** dc gain. Capacitor blocks dc, no current, nothing dropped across $R$ or $L$, so the gain must be exactly 1. $\\tfrac22=1$ ✓ If it is not 1, you made an error — before you write another line.
`,
      solution: `
**Step 1 — replace each component by its impedance.**

$$Z_{L}=Ls=(1)s=s$$

$$Z_{R}=R=3$$

$$Z_{C}=\\frac{1}{Cs}=\\frac{1}{\\left(\\tfrac12\\right)s}=\\frac{2}{s}$$

*Work that last one carefully:* dividing by $\\tfrac12 s$ is multiplying by
$\\dfrac{2}{s}$. Writing $\\dfrac{1}{2s}$ is off by a factor of 4.

**Step 2 — recognize the topology.**

One loop, so the **same current** flows through all three components. Elements carrying
the same current are in **series**, so impedances add:

$$Z_{\\text{total}}(s)=s+3+\\frac{2}{s}$$

**Step 3 — apply the voltage divider.**

The output is taken across the capacitor alone:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{Z_{C}}{Z_{\\text{total}}}=\\frac{\\dfrac{2}{s}}{s+3+\\dfrac{2}{s}}$$

**Step 4 — clear the compound fraction.**

Multiply numerator and denominator by $s$, distributing carefully:

$$\\frac{\\dfrac{2}{s}\\cdot s}{\\left(s+3+\\dfrac{2}{s}\\right)s}
=\\frac{2}{s\\cdot s+3s+\\dfrac{2}{s}\\cdot s}=\\frac{2}{s^{2}+3s+2}$$

**Step 5 — factor.** Two numbers multiplying to 2, adding to 3: 1 and 2.

$$\\boxed{\\;\\frac{V_{C}(s)}{V(s)}=\\frac{2}{(s+1)(s+2)}\\;}$$

**Poles:** $s=-1$, $s=-2$. Discriminant $9-8=1>0$, so real and distinct — **overdamped**,
no oscillation.

---

**Check — dc gain.** At $s=0$: $\\dfrac{2}{2}=1$.

Physically correct. In steady state a capacitor blocks dc current. With no current, no
voltage drops across $R$ ($v=Ri=0$) or $L$ ($v=L\\,di/dt=0$). Every volt appears across
the capacitor — unity gain.

**The general form, worth memorizing.** In symbols:

$$\\frac{V_{C}(s)}{V(s)}=\\frac{1/LC}{s^{2}+\\dfrac{R}{L}s+\\dfrac{1}{LC}}$$

Check: $1/LC=1/(1\\cdot\\tfrac12)=2\\;\\checkmark$ and $R/L=3\\;\\checkmark$

You meet this again in Chapter 4 as
$\\dfrac{\\omega_{n}^{2}}{s^{2}+2\\zeta\\omega_{n}s+\\omega_{n}^{2}}$.
`
    },

    {
      id: "2-14", difficulty: "core", topic: "Electrical networks",
      prompt: `For the two-mesh network below find $\\dfrac{I_{2}(s)}{V(s)}$. Values: $R_{1}=2\\ \\Omega$, $L=1$ H (shared between the meshes), $R_{2}=3\\ \\Omega$, $C=\\tfrac12$ F.

<svg viewBox="0 0 470 190" width="100%" style="max-width:470px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<circle cx="45" cy="100" r="20"/>
<path d="M45 80 L45 40 L120 40"/>
<path d="M45 120 L45 165 L430 165 L430 128"/>
<path d="M120 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M180 40 L245 40 L245 62"/>
<path d="M245 62 q-15 8 0 16 q-15 8 0 16 q-15 8 0 16 q-15 8 0 16"/>
<path d="M245 126 L245 165"/>
<path d="M245 40 L320 40"/>
<path d="M320 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M380 40 L430 40 L430 82"/>
<path d="M408 82 L452 82 M408 128 L452 128"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="8" y="105">V(s)</text>
<text x="139" y="26">R</text><text x="151" y="30" font-size="10">1</text>
<text x="212" y="98">L</text>
<text x="339" y="26">R</text><text x="351" y="30" font-size="10">2</text>
<text x="458" y="109">C</text>
<text x="150" y="107">I</text><text x="158" y="111" font-size="10">1</text><text x="164" y="107">(s)</text>
<text x="330" y="107">I</text><text x="338" y="111" font-size="10">2</text><text x="344" y="107">(s)</text>
</g>
<g stroke="#8C9AA8" stroke-width="1.5" fill="none">
<path d="M152 92 a26 26 0 1 1 26 -26"/><path d="M174 70 l4 -6 l6 5"/>
<path d="M332 92 a26 26 0 1 1 26 -26"/><path d="M354 70 l4 -6 l6 5"/>
</g>
</svg>`,
      hint: "Write the two mesh equations by inspection: diagonal = sum of impedances around that mesh, off-diagonal = negative of the shared impedance. Then Cramer's rule.",
      answer: "$$\\frac{I_{2}(s)}{V(s)}=\\frac{s^{2}}{5s^{2}+8s+4}$$",
      expert: `
**First glance:** two loops, one shared element, output is a current. Mesh analysis, by inspection, Cramer's rule. That decision takes no thought — *current output* points at mesh, and two meshes versus two nodes is a tie broken by what is asked for.

**The by-inspection write-down**, straight from the figure without any KVL:
- diagonal 1 = everything in mesh 1 = $2+s$
- diagonal 2 = everything in mesh 2 = $s+3+\\tfrac2s$
- off-diagonal = $-$(shared) = $-s$, both places

**The symmetry check is free and non-negotiable.** Off-diagonals must match. They do. If they had not, an expert stops there rather than propagating the error through a determinant.

**Cramer, not elimination.** You want $I_{2}$ only, so replace column 2 and divide. Solving for $I_{1}$ first and back-substituting is twice the work for the same answer.

**Structural expectations before computing:** dc gain must be 0 (capacitor blocks dc in mesh 2) and the high-frequency limit must be finite. Getting $\\tfrac{s^{2}}{5s^{2}+8s+4}$ satisfies both — $0$ at $s=0$, $\\tfrac15$ at $s=\\infty$. Two checks, five seconds, done.
`,
      solution: `
**Step 1 — impedances.**

$$Z_{R_{1}}=2,\\quad Z_{L}=s,\\quad Z_{R_{2}}=3,\\quad Z_{C}=\\frac{1}{\\tfrac12 s}=\\frac{2}{s}$$

**Step 2 — mesh equations by inspection.**

*Mesh 1* contains $R_{1}$ and the shared inductor. Self impedance $2+s$; shared element
$s$; the only source is here:

$$(2+s)I_{1}(s)-sI_{2}(s)=V(s)$$

*Mesh 2* contains the shared inductor plus $R_{2}$ and $C$. Self impedance
$s+3+\\dfrac{2}{s}$; shared element $s$; no source:

$$-sI_{1}(s)+\\left(s+3+\\frac{2}{s}\\right)I_{2}(s)=0$$

**Symmetry check.** Both off-diagonals are $-s$. They match, as they must.

**Step 3 — clean up mesh 2.**

$$s+3+\\frac{2}{s}=\\frac{s^{2}}{s}+\\frac{3s}{s}+\\frac{2}{s}=\\frac{s^{2}+3s+2}{s}$$

**Step 4 — matrix form.**

$$\\begin{bmatrix} 2+s & -s \\\\[4pt] -s & \\dfrac{s^{2}+3s+2}{s}\\end{bmatrix}
\\begin{bmatrix} I_{1} \\\\[4pt] I_{2}\\end{bmatrix}=\\begin{bmatrix} V(s) \\\\[4pt] 0\\end{bmatrix}$$

**Step 5 — Cramer's rule for $I_{2}$: replace column 2.**

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} 2+s & V(s) \\\\ -s & 0\\end{vmatrix}=(2+s)(0)-V(s)(-s)=sV(s)$$

using $\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$.

**Step 6 — the system determinant.**

$$\\det\\mathbf{A}=(2+s)\\cdot\\frac{s^{2}+3s+2}{s}-(-s)(-s)=\\frac{(2+s)\\left(s^{2}+3s+2\\right)}{s}-s^{2}$$

*Careful:* $(-s)(-s)=+s^{2}$, and it is **subtracted**.

Expand the product:

$$(2+s)\\left(s^{2}+3s+2\\right)=2s^{2}+6s+4+s^{3}+3s^{2}+2s=s^{3}+5s^{2}+8s+4$$

Put everything over $s$:

$$\\det\\mathbf{A}=\\frac{s^{3}+5s^{2}+8s+4-s^{3}}{s}=\\frac{5s^{2}+8s+4}{s}$$

The $s^{3}$ terms cancel — a good sign the algebra is on track.

**Step 7 — divide.** Dividing by a fraction means multiplying by its reciprocal:

$$\\frac{I_{2}(s)}{V(s)}=s\\cdot\\frac{s}{5s^{2}+8s+4}$$

$$\\boxed{\\;\\frac{I_{2}(s)}{V(s)}=\\frac{s^{2}}{5s^{2}+8s+4}\\;}$$

---

**Check — dc.** At $s=0$ the result is 0. Correct: the capacitor blocks dc, so no steady
current circulates in mesh 2.

**Check — high frequency.** As $s\\to\\infty$ the ratio tends to $\\tfrac15$. Finite and
nonzero is reasonable: the capacitor shorts and the inductor opens, leaving a resistive
path.

**Check — poles.** $5s^{2}+8s+4=0$ has discriminant $64-80=-16$, and
$\\sqrt{-16}=j4$, so

$$s=\\frac{-8\\pm j4}{2(5)}=\\frac{-8\\pm j4}{10}=-\\frac{4}{5}\\pm j\\frac{2}{5}$$

Left half-plane, underdamped. **Leave it as a fraction** — $-0.8\\pm j0.4$ is the same
number but costs you a calculator you will not have.
`
    },

    {
      id: "2-15", difficulty: "core", topic: "Electrical networks",
      prompt: `For the RC ladder network below find $\\dfrac{V_{2}(s)}{V(s)}$. All resistors are $1\\ \\Omega$ and both capacitors are $1$ F.

<svg viewBox="0 0 460 180" width="100%" style="max-width:460px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<circle cx="40" cy="90" r="19"/>
<path d="M40 71 L40 40 L100 40"/>
<path d="M40 109 L40 155 L410 155"/>
<path d="M100 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M160 40 L230 40"/>
<path d="M230 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M290 40 L400 40"/>
<path d="M230 40 L230 72"/>
<path d="M208 72 L252 72 M208 92 L252 92"/>
<path d="M230 92 L230 155"/>
<path d="M370 40 L370 72"/>
<path d="M348 72 L392 72 M348 92 L392 92"/>
<path d="M370 92 L370 155"/>
<circle cx="400" cy="40" r="3.5" fill="#1A2028"/>
<circle cx="410" cy="155" r="3.5" fill="#1A2028"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="4" y="95">V(s)</text>
<text x="119" y="26">R</text><text x="131" y="30" font-size="10">1</text>
<text x="249" y="26">R</text><text x="261" y="30" font-size="10">2</text>
<text x="176" y="88">C</text><text x="188" y="92" font-size="10">1</text>
<text x="316" y="88">C</text><text x="328" y="92" font-size="10">2</text>
<text x="216" y="26">V</text><text x="228" y="30" font-size="10">1</text>
<text x="394" y="26">V</text><text x="406" y="30" font-size="10">2</text>
</g>
</svg>`,
      hint: "Two independent nodes, and the output is a voltage — nodal analysis. Admittance of a resistor is $1/R$; of a capacitor, $Cs$.",
      answer: "$$\\frac{V_{2}(s)}{V(s)}=\\frac{1}{s^{2}+3s+1}$$",
      expert: `
**First glance:** output is a **voltage** at a node, and the network is a ladder. Nodal. That decision is automatic — voltage output plus shunt elements to ground is exactly what nodal analysis is for.

**The trap this problem exists to teach:** you cannot cascade $\\tfrac{1}{s+1}\\cdot\\tfrac{1}{s+1}$. An expert knows before writing anything that the second stage *loads* the first, and expects the answer to differ from $(s+1)^{2}$ by exactly the coupling term. Getting $s^{2}+3s+1$ instead of $s^{2}+2s+1$ is the loading, made visible.

**Substitution beats Cramer here.** The second node equation gives $V_{1}=(1+s)V_{2}$ in one line; substituting is faster than setting up a determinant. Experts pick the tool per problem rather than running the same procedure every time.

**Two free structural checks:**
- dc gain must be 1 (capacitors open, no current, no drops).
- **A pure RC network can never oscillate.** So the poles must be real. Discriminant $9-4=5>0$ ✓. Had you computed complex poles, that is an error — no calculation needed to know it.

That second check is the kind of thing that separates someone who knows the algebra from someone who knows the physics.
`,
      solution: `
**Step 1 — decide mesh or nodal.**

The output is a **voltage** at a node, and there are two independent nodes. Nodal
analysis puts the answer directly in hand.

**Step 2 — list the admittances.** Nodal analysis uses $Y=1/Z$:

$$Y_{R_{1}}=\\frac{1}{R_{1}}=1,\\quad Y_{R_{2}}=1,\\quad Y_{C_{1}}=C_{1}s=s,\\quad Y_{C_{2}}=s$$

**Step 3 — node equation at $V_{1}$.**

Admittances touching node 1: $R_{1}$ (to the source), $C_{1}$ (to ground), $R_{2}$ (to
node 2). Sum: $1+s+1=s+2$.

Admittance between nodes 1 and 2: $R_{2}$, giving 1.

The source drives current into node 1 through $R_{1}$, so the right side is $V/R_{1}=V$:

$$(s+2)V_{1}(s)-V_{2}(s)=V(s)$$

**Step 4 — node equation at $V_{2}$.**

Admittances touching node 2: $R_{2}$ (to node 1) and $C_{2}$ (to ground). Sum: $1+s$.
No source current enters node 2:

$$-V_{1}(s)+(1+s)V_{2}(s)=0$$

**Symmetry check.** Both off-diagonals are $-1$. ✓

**Step 5 — solve by substitution.**

From node 2: $\\;V_{1}(s)=(1+s)V_{2}(s)$.

Substitute into node 1:

$$(s+2)(1+s)V_{2}(s)-V_{2}(s)=V(s)$$

$$\\Bigl[(s+2)(s+1)-1\\Bigr]V_{2}(s)=V(s)$$

**Step 6 — expand the bracket.**

$$(s+2)(s+1)=s^{2}+s+2s+2=s^{2}+3s+2$$

$$s^{2}+3s+2-1=s^{2}+3s+1$$

$$\\boxed{\\;\\frac{V_{2}(s)}{V(s)}=\\frac{1}{s^{2}+3s+1}\\;}$$

---

**Check — dc gain.** At $s=0$: $\\dfrac11=1$. Correct — at dc both capacitors are open,
so no current flows through either resistor, so neither drops voltage and $V_{2}=V$.

**Check — poles.** Discriminant $9-4(1)(1)=5>0$, so the poles are real and distinct:

$$s=\\frac{-3\\pm\\sqrt5}{2}$$

Stop there. This is the exact answer and the only one you can produce without a
calculator. To confirm both are negative without evaluating $\\sqrt5$: note
$2<\\sqrt5<3$ because $2^{2}=4$ and $3^{2}=9$, so $-3+\\sqrt5$ lies between $-1$ and
$0$. Both roots negative — stable, overdamped. **A pure RC network can never oscillate**, so complex
poles here would have signalled an error.

**Why the $-1$ matters.** Treating the two RC stages as independent and multiplying
$\\dfrac{1}{s+1}\\cdot\\dfrac{1}{s+1}$ gives $s^{2}+2s+1$ — wrong. The second stage
**loads** the first, and the $-1$ is exactly that loading. You cannot cascade circuit
stages by multiplying their individual transfer functions unless they are buffered.
`
    },

    {
      id: "2-16", difficulty: "core", topic: "Operational amplifiers",
      prompt: `For an **inverting** operational amplifier, $Z_{1}$ is a resistor $R_{1}=100$ k$\\Omega$ and $Z_{2}$ is a resistor $R_{2}=100$ k$\\Omega$ in **series** with a capacitor $C_{2}=10\\ \\mu$F. Find $\\dfrac{V_{o}(s)}{V_{i}(s)}$ and identify the controller type.

<svg viewBox="0 0 420 175" width="100%" style="max-width:420px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<path d="M20 100 L62 100"/>
<path d="M62 100 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M122 100 L165 100"/>
<path d="M165 55 L165 100"/>
<path d="M165 55 L200 55"/>
<path d="M200 55 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M260 55 L288 55"/>
<path d="M288 42 L288 68 M303 42 L303 68"/>
<path d="M303 55 L345 55 L345 116"/>
<path d="M165 100 L192 100"/>
<path d="M192 68 L192 138 L275 103 Z"/>
<path d="M275 103 L390 103"/>
<path d="M345 116 L345 103"/>
<path d="M192 133 L172 133 L172 152"/>
<path d="M160 152 L184 152 M164 158 L180 158 M168 164 L176 164"/>
<circle cx="390" cy="103" r="3.5" fill="#1A2028"/>
<circle cx="20" cy="100" r="3.5" fill="#1A2028"/>
</g>
<g font-family="Georgia,serif" font-size="13.5" fill="#1A2028" font-style="italic">
<text x="82" y="86">R</text><text x="94" y="90" font-size="10">1</text>
<text x="209" y="38">R</text><text x="221" y="42" font-size="10">2</text>
<text x="286" y="36">C</text><text x="298" y="40" font-size="10">2</text>
<text x="0" y="93">V</text><text x="11" y="97" font-size="10">i</text>
<text x="398" y="96">V</text><text x="409" y="100" font-size="10">o</text>
<text x="176" y="92" font-size="15" font-style="normal">−</text>
<text x="176" y="132" font-size="15" font-style="normal">+</text>
</g>
</svg>`,
      hint: "Build $Z_{2}(s)$ first — series impedances add. Then apply the inverting formula. Convert units before plugging in numbers.",
      answer: "$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{s+1}{s}$$ This is a **PI (proportional-plus-integral) controller**.",
      expert: `
**First glance:** inverting op-amp, so $-\\tfrac{Z_{2}}{Z_{1}}$ and nothing else. The only real work is assembling $Z_{2}$.

**Series R and C is the PI shape.** An expert recognizes $R+\\tfrac{1}{Cs}$ as a proportional-plus-integral controller *from the topology*, before touching the numbers, and expects the answer to look like $-\\tfrac{\\tau s+1}{\\tau' s}$ with a pole at the origin.

**The unit handling that saves the problem:** $100\\text{ k}\\Omega\\times10\\ \\mu\\text{F}$. Do not multiply $100{,}000\\times0.00001$ digit by digit — recognize $10^{5}\\times10^{-5}=1$. Ohms times farads are seconds, so both products are 1-second time constants and the whole expression collapses to $-\\tfrac{s+1}{s}$.

**Ruled out on sight:** deriving the op-amp relation from virtual ground each time. Derive it once, then use it.

**What the answer means, read instantly:** split it as $-\\left(1+\\tfrac1s\\right)$ — a gain plus an integrator. The pole at the origin is what kills steady-state error in Chapter 9, and the zero at $-1/(R_{2}C_{2})$ is the one knob you get to place.
`,
      solution: `
**Step 1 — build $Z_{2}(s)$.** $R_{2}$ and $C_{2}$ are in **series**, and series
impedances add:

$$Z_{2}(s)=R_{2}+\\frac{1}{C_{2}s}$$

**Step 2 — $Z_{1}(s)=R_{1}$.**

**Step 3 — apply the inverting formula.**

$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{Z_{2}(s)}{Z_{1}(s)}=-\\frac{R_{2}+\\dfrac{1}{C_{2}s}}{R_{1}}$$

**Step 4 — clean up the compound fraction.**

Combine the numerator over the common denominator $C_{2}s$:

$$R_{2}+\\frac{1}{C_{2}s}=\\frac{R_{2}C_{2}s}{C_{2}s}+\\frac{1}{C_{2}s}=\\frac{R_{2}C_{2}s+1}{C_{2}s}$$

Divide by $R_{1}$:

$$\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{R_{2}C_{2}s+1}{R_{1}C_{2}s}$$

**Step 5 — substitute numbers, converting units first.**

$$R_{1}=R_{2}=100\\ \\text{k}\\Omega=100{,}000\\ \\Omega,\\qquad C_{2}=10\\ \\mu\\text{F}=10^{-5}\\ \\text{F}$$

$$R_{2}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$$

$$R_{1}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$$

*Unit check:* ohms × farads = seconds, so both products are time constants of 1 second.

$$\\boxed{\\;\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{s+1}{s}\\;}$$

---

**Step 6 — identify the controller.**

Split into additive pieces:

$$-\\frac{s+1}{s}=-\\left(\\frac{s}{s}+\\frac{1}{s}\\right)=-\\left(1+\\frac{1}{s}\\right)$$

- The **$1$** is a constant gain — a **proportional** term.
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
      prompt: "A **noninverting** operational amplifier has $Z_{1}=R_{1}=100$ k$\\Omega$ from the inverting terminal to ground, and feedback element $Z_{2}$ consisting of $R_{2}=100$ k$\\Omega$ in **parallel** with $C_{2}=10\\ \\mu$F. Find $\\dfrac{V_{o}(s)}{V_{i}(s)}$.",
      hint: "Parallel impedances combine as a product over a sum. Then use the noninverting formula, which has no minus sign.",
      answer: "$$\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{s+2}{s+1}$$",
      expert: `
**First glance:** noninverting, so use the split form $1+\\tfrac{Z_{2}}{Z_{1}}$ rather than $\\tfrac{Z_{1}+Z_{2}}{Z_{1}}$. Same equation, but the split version means you never combine fractions.

**Memorize the parallel RC result**, do not re-derive it:

$$R\\parallel C=\\frac{R}{RCs+1}$$

It appears constantly from here to Chapter 11.

**The two limits tell you the answer before you finish.** At dc the capacitor opens, so gain $=1+\\tfrac{R_{2}}{R_{1}}=2$. At high frequency the capacitor shorts, so $Z_{2}\\to0$ and gain $\\to1$. So the answer must be a first-order function running from 2 down to 1 — that is $\\tfrac{s+2}{s+1}$, essentially forced. An expert often writes the answer from the two limits and uses the algebra only as confirmation.

**The instant sanity test:** a noninverting amplifier **cannot attenuate**. If your magnitude ever drops below 1, you used the inverting formula. And there is no minus sign anywhere in the noninverting configuration.

**What it is:** zero at $-2$, pole at $-1$, pole closer to the origin — a lag compensator, recognized by shape.
`,
      solution: `
**Step 1 — build $Z_{2}(s)$ for the parallel combination.**

$$Z_{2}(s)=\\frac{Z_{R_{2}}\\cdot Z_{C_{2}}}{Z_{R_{2}}+Z_{C_{2}}}=\\frac{R_{2}\\cdot\\dfrac{1}{C_{2}s}}{R_{2}+\\dfrac{1}{C_{2}s}}$$

**Step 2 — simplify.** Multiply numerator and denominator by $C_{2}s$:

*Numerator:* $R_{2}\\cdot\\dfrac{1}{C_{2}s}\\cdot C_{2}s=R_{2}$

*Denominator:* $\\left(R_{2}+\\dfrac{1}{C_{2}s}\\right)C_{2}s=R_{2}C_{2}s+1$

$$Z_{2}(s)=\\frac{R_{2}}{R_{2}C_{2}s+1}$$

A standing result worth memorizing: **a resistor parallel with a capacitor has impedance
$\\dfrac{R}{RCs+1}$.**

**Step 3 — substitute numbers.** $R_{2}C_{2}=\\left(100{,}000\\right)\\left(10^{-5}\\right)=1$:

$$Z_{2}(s)=\\frac{100{,}000}{s+1}$$

**Step 4 — apply the noninverting formula.**

$$\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{Z_{1}(s)+Z_{2}(s)}{Z_{1}(s)}=\\frac{Z_{1}}{Z_{1}}+\\frac{Z_{2}}{Z_{1}}=1+\\frac{Z_{2}}{Z_{1}}$$

**Step 5 — evaluate.**

$$\\frac{Z_{2}}{Z_{1}}=\\frac{\\dfrac{100{,}000}{s+1}}{100{,}000}=\\frac{1}{s+1}$$

$$\\frac{V_{o}(s)}{V_{i}(s)}=1+\\frac{1}{s+1}=\\frac{s+1}{s+1}+\\frac{1}{s+1}=\\frac{s+2}{s+1}$$

$$\\boxed{\\;\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{s+2}{s+1}\\;}$$

---

**Check — dc gain.** At $s=0$: $\\dfrac{2}{1}=2$.

Sanity: at dc the capacitor is open, so $Z_{2}=R_{2}=100$ k$\\Omega$ and the gain is
$1+R_{2}/R_{1}=1+1=2\\;\\checkmark$

**Check — high-frequency gain.** As $s\\to\\infty$: $\\to1$.

Sanity: at high frequency the capacitor shorts, so $Z_{2}\\to0$ and the gain is
$1+0=1\\;\\checkmark$

**Check — the sign.** No minus sign, and the gain never drops below 1. Both are
signatures of the noninverting configuration — it **cannot** attenuate. A magnitude below
1 anywhere means the wrong formula was used.

**This is a lag compensator.** Zero at $s=-2$, pole at $s=-1$; the pole is closer to the
origin than the zero. You design these deliberately in Chapter 9.
`
    },

    {
      id: "2-18", difficulty: "core", topic: "Mechanical systems",
      prompt: `For the translational mechanical system below find $\\dfrac{X(s)}{F(s)}$. Take $M=1$ kg, $f_{v}=5$ N-s/m, $K=6$ N/m. State whether the poles are real or complex.

<svg viewBox="0 0 400 175" width="100%" style="max-width:400px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<path d="M25 20 L25 150"/>
<path d="M25 20 L13 32 M25 40 L13 52 M25 60 L13 72 M25 80 L13 92 M25 100 L13 112 M25 120 L13 132 M25 140 L13 152"/>
<path d="M25 55 L60 55"/>
<path d="M60 55 l8 -14 l16 28 l16 -28 l16 28 l16 -28 l8 14"/>
<path d="M140 55 L200 55"/>
<path d="M25 115 L75 115"/>
<path d="M75 98 L75 132"/>
<path d="M100 92 L100 138 L136 138 L136 92 Z"/>
<path d="M136 115 L200 115"/>
<rect x="200" y="55" width="80" height="70" fill="#EDF2F7"/>
<path d="M280 90 L340 90"/><path d="M330 84 L340 90 L330 96"/>
<path d="M215 38 L265 38"/><path d="M257 32 L265 38 L257 44"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="93" y="36">K</text>
<text x="99" y="160">f</text><text x="106" y="164" font-size="10">v</text>
<text x="232" y="96">M</text><text x="348" y="95">f(t)</text><text x="230" y="30">x(t)</text>
</g>
</svg>`,
      hint: "Draw the free-body diagram first. Every element attached to the mass contributes a force opposing the assumed positive motion.",
      answer: "$$\\frac{X(s)}{F(s)}=\\frac{1}{s^{2}+5s+6}=\\frac{1}{(s+2)(s+3)}$$ Poles at $s=-2$ and $s=-3$: real and distinct, so overdamped.",
      expert: `
**First glance:** one mass, wall-mounted spring and damper, force in, displacement out. An expert writes the answer in one line without drawing a free-body diagram:

$$\\left[Ms^{2}+f_{v}s+K\\right]X(s)=F(s)$$

because it is the same "sum of impedances times the variable equals the source" pattern as a series RLC loop. Mass plays inductor, damper plays resistor, spring plays inverse capacitor.

**Free-body diagrams are training wheels.** Draw them until the impedance pattern is automatic, then stop. On an exam they cost a minute you do not have.

**Ruled out on sight:** anything about relative displacement. One end of each element is fixed to the wall, so every element sees the absolute motion $x$.

**The dc check that costs two seconds:** at $s=0$, $X/F=\\tfrac1K=\\tfrac16$. Physically a constant force compresses only the spring — the damper needs velocity and the mass needs acceleration, and there is neither at rest. If your $s\\to0$ limit is not $1/K$ for a wall-mounted single mass, something is wrong.

**Read the damping in passing:** discriminant $25-24=1>0$, so real distinct poles, overdamped, no oscillation. That is Chapter 4 language you can already produce here.
`,
      solution: `
**Step 1 — assume a positive direction.**

Take motion to the **right** as positive, matching $x(t)$ and $f(t)$ in the figure. This
is the mechanical equivalent of choosing a current direction — the answer does not depend
on the choice, but every sign afterward does.

**Step 2 — draw the free-body diagram.**

| Element | Force on the mass | Direction |
|---|---|---|
| Applied force | $f(t)$ | right (positive) |
| Spring $K$ | $Kx(t)$ | left (opposes displacement) |
| Damper $f_{v}$ | $f_{v}\\dfrac{dx}{dt}$ | left (opposes velocity) |
| Inertial reaction | $M\\dfrac{d^{2}x}{dt^{2}}$ | left (opposes acceleration) |

**Step 3 — sum the forces.**

$$M\\frac{d^{2}x}{dt^{2}}+f_{v}\\frac{dx}{dt}+Kx(t)=f(t)$$

With the numbers:

$$\\frac{d^{2}x}{dt^{2}}+5\\frac{dx}{dt}+6x(t)=f(t)$$

**Step 4 — Laplace transform with zero initial conditions.**

$$s^{2}X(s)+5sX(s)+6X(s)=F(s)$$

**Step 5 — factor and form the ratio.**

$$\\left(s^{2}+5s+6\\right)X(s)=F(s)$$

$$\\frac{X(s)}{F(s)}=\\frac{1}{s^{2}+5s+6}$$

**Step 6 — factor the denominator.** Two numbers multiplying to 6, adding to 5: 2 and 3.

$$\\boxed{\\;\\frac{X(s)}{F(s)}=\\frac{1}{(s+2)(s+3)}\\;}$$

**Poles:** $s=-2$, $s=-3$. Discriminant $25-24=1>0$ — **real and distinct**, so
overdamped, no oscillation.

---

**The shortcut you should be using.** Look at the structure of Step 5:

$$\\left[\\underbrace{Ms^{2}}_{\\text{mass}}+\\underbrace{f_{v}s}_{\\text{damper}}+\\underbrace{K}_{\\text{spring}}\\right]X(s)=F(s)$$

You can write this line directly from the figure without drawing the free-body diagram at
all. It is the exact analogue of the series RLC loop
$\\left[Ls+R+\\tfrac{1}{Cs}\\right]I(s)=V(s)$ — mass plays inductance, damper plays
resistance, spring plays inverse capacitance.

**Check — dc.** At $s=0$: $X/F=\\tfrac16$. Physically, a constant force compresses only
the spring (nothing moving, so the damper and mass contribute nothing), giving
$x=f/K=f/6\\;\\checkmark$
`
    },

    {
      id: "2-19", difficulty: "core", topic: "Mechanical systems",
      prompt: `For the two-degree-of-freedom system below find $\\dfrac{X_{2}(s)}{F(s)}$. Take $M_{1}=M_{2}=1$ kg, $K_{1}=K_{2}=1$ N/m, $f_{v}=1$ N-s/m. The force $f(t)$ is applied to $M_{2}$.

<svg viewBox="0 0 500 200" width="100%" style="max-width:500px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<path d="M20 25 L20 165"/>
<path d="M20 25 L8 37 M20 45 L8 57 M20 65 L8 77 M20 85 L8 97 M20 105 L8 117 M20 125 L8 137 M20 145 L8 157"/>
<path d="M20 90 L45 90"/>
<path d="M45 90 l7 -13 l14 26 l14 -26 l14 26 l7 -13"/>
<path d="M101 90 L120 90"/>
<rect x="120" y="60" width="70" height="62" fill="#EDF2F7"/>
<path d="M190 60 L215 60"/>
<path d="M215 60 l7 -13 l14 26 l14 -26 l14 26 l7 -13"/>
<path d="M271 60 L300 60"/>
<path d="M190 122 L235 122"/><path d="M235 106 L235 138"/>
<path d="M258 100 L258 144 L292 144 L292 100 Z"/><path d="M292 122 L300 122"/>
<rect x="300" y="60" width="70" height="62" fill="#EDF2F7"/>
<path d="M370 91 L440 91"/><path d="M430 85 L440 91 L430 97"/>
<path d="M133 45 L178 45"/><path d="M170 39 L178 45 L170 51"/>
<path d="M313 45 L358 45"/><path d="M350 39 L358 45 L350 51"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="65" y="72">K</text><text x="77" y="76" font-size="10">1</text>
<text x="235" y="42">K</text><text x="247" y="46" font-size="10">2</text>
<text x="261" y="166">f</text><text x="268" y="170" font-size="10">v</text>
<text x="145" y="97">M</text><text x="159" y="101" font-size="10">1</text>
<text x="325" y="97">M</text><text x="339" y="101" font-size="10">2</text>
<text x="448" y="96">f(t)</text>
<text x="139" y="36">x</text><text x="148" y="40" font-size="10">1</text>
<text x="319" y="36">x</text><text x="328" y="40" font-size="10">2</text>
</g>
</svg>`,
      hint: "Two masses means two equations. Build the matrix by inspection: diagonal = everything touching that mass, off-diagonal = negative of what is shared.",
      answer: "$$\\frac{X_{2}(s)}{F(s)}=\\frac{s^{2}+s+2}{s^{4}+2s^{3}+3s^{2}+s+1}$$",
      expert: `
**First glance:** two masses, so **two equations and a fourth-order denominator**. Predicting the order before computing is the single fastest error check available — if your determinant comes out cubic or fifth-order, stop.

**The by-inspection write-down**, with the one rule that matters:

> A spring or damper *between* two masses appears on **both** diagonals **and** on the off-diagonal — three appearances for one component.

That is where nearly every lost point in this section comes from. Experts consciously say "$K_{2}$ and $f_{v}$: diagonal 1, diagonal 2, off-diagonal" while writing.

**The algebra shortcut that makes the determinant tractable by hand:** substitute $u=s^{2}+s$. Then $(u+2)(u+1)=u^{2}+3u+2$, expand $u^{2}=s^{4}+2s^{3}+s^{2}$ once, and you are done. Multiplying two quadratics term by term invites a dropped $s^{3}$.

**Symmetry check** before the determinant. **Order check** after it. **DC check** at the end: springs in series combine like capacitors, $K_{\\text{eq}}=\\tfrac{K_{1}K_{2}}{K_{1}+K_{2}}=\\tfrac12$, so $X_{2}/F\\to2$. The formula gives $\\tfrac21=2$ ✓ Three independent checks, under thirty seconds total.
`,
      solution: `
**Step 1 — inventory what touches each mass.**

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
*and* on the off-diagonal. They are not "assigned" to one mass — each connects two masses
and therefore contributes three times in total.

**Step 2 — write the equations.** Diagonal positive, off-diagonal negative, force at
$M_{2}$ only:

$$\\left(s^{2}+s+2\\right)X_{1}(s)-\\left(s+1\\right)X_{2}(s)=0$$

$$-\\left(s+1\\right)X_{1}(s)+\\left(s^{2}+s+1\\right)X_{2}(s)=F(s)$$

**Symmetry check.** Both off-diagonals are $-(s+1)$. ✓

**Step 3 — matrix form.**

$$\\begin{bmatrix} s^{2}+s+2 & -(s+1) \\\\ -(s+1) & s^{2}+s+1\\end{bmatrix}
\\begin{bmatrix} X_{1} \\\\ X_{2}\\end{bmatrix}=\\begin{bmatrix} 0 \\\\ F(s)\\end{bmatrix}$$

**Step 4 — Cramer's rule for $X_{2}$: replace column 2.**

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} s^{2}+s+2 & 0 \\\\ -(s+1) & F(s)\\end{vmatrix}
=\\left(s^{2}+s+2\\right)F(s)-0=\\left(s^{2}+s+2\\right)F(s)$$

**Step 5 — the system determinant.**

$$\\det\\mathbf{A}=\\left(s^{2}+s+2\\right)\\left(s^{2}+s+1\\right)-\\bigl[-(s+1)\\bigr]^{2}$$

*Careful:* $\\bigl[-(s+1)\\bigr]^{2}=(s+1)^{2}$ — squaring kills the minus — and the whole
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

**Step 6 — divide.**

$$\\boxed{\\;\\frac{X_{2}(s)}{F(s)}=\\frac{s^{2}+s+2}{s^{4}+2s^{3}+3s^{2}+s+1}\\;}$$

---

**Check — order.** Two masses, each second order, gives a fourth-order denominator. **The
denominator order should equal twice the number of masses** — a fast structural check.

**Check — dc.** At $s=0$: $\\dfrac21=2$.

Sanity: apply a constant force to $M_{2}$. In steady state nothing moves, so the damper
is inert and only springs matter. $K_{1}$ and $K_{2}$ are in series between the wall and
$M_{2}$; springs in series combine like capacitors:
$K_{\\text{eq}}=\\dfrac{K_{1}K_{2}}{K_{1}+K_{2}}=\\dfrac12$. So
$x_{2}=f/K_{\\text{eq}}=2f\\;\\checkmark$
`
    },

    {
      id: "2-20", difficulty: "core", topic: "Nonlinearities",
      prompt: `Determine whether each system is linear. Test **both** required properties and show the test.

**(a)** $c(t)=5r(t)$
**(b)** $c(t)=r(t)+3$
**(c)** $c(t)=\\left[r(t)\\right]^{2}$`,
      hint: "A system is linear only if it satisfies superposition AND homogeneity. Failing either is enough to make it nonlinear.",
      answer: "**(a)** Linear — passes both. **(b)** Nonlinear — fails both, despite a straight-line graph. **(c)** Nonlinear — fails both.",
      expert: `
**First glance:** you do not need to run both tests on all three. **Homogeneity is the cheaper test**, so try it first — if it fails, you are done and superposition never gets checked.

- (b) $c=r+3$: double the input, output goes to $2r+3$, not $2r+6$. Fails. Stop.
- (c) $c=r^{2}$: double the input, output quadruples. Fails. Stop.

**The one-line recognition test that beats both:** a system is linear only if the relationship is a **constant times the variable or its derivatives, summed.** Any constant offset, any power, product, root, trig, exponential or log of the variable disqualifies it instantly.

So on sight: (a) linear, (b) affine — not linear, (c) nonlinear.

**The trap this problem exists for:** "straight line" $\\ne$ "linear." $c=r+3$ plots as a perfectly straight line and fails both properties. An expert never conflates the two, because the entire point of Section 2.11 is that affine relationships require an operating point and deviation variables before the tools of this course apply.

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

Compare $r_{1}+r_{2}+6$ against $r_{1}+r_{2}+3$. **Not equal** — off by 3. **Fails.**

**Homogeneity.** Response to $Ar_{1}$: $\\;Ar_{1}+3$

$A$ times the original: $\\;A\\left(r_{1}+3\\right)=Ar_{1}+3A$

Equal only if $A=1$. **Fails.**

**Conclusion: nonlinear.**

**Why this matters.** The graph of $c=r+3$ is a perfectly straight line. Students
reasonably assume "straight line = linear." In systems theory it is not — the nonzero
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
      prompt: `A vibration test rig is built as follows. Block $M_{1}$ is anchored to a rigid wall by a spring $K_{1}$ and a viscous damper $f_{v1}$ acting in parallel. A second spring $K_{2}$ connects $M_{1}$ to block $M_{2}$. Block $M_{2}$ is additionally tied to ground by its own viscous damper $f_{v2}$. The shaker applies force $f(t)$ **to $M_{1}$**, and an accelerometer measures the motion of $M_{2}$.

Values: $M_{1}=M_{2}=1$ kg, $K_{1}=1$ N/m, $f_{v1}=1$ N-s/m, $K_{2}=2$ N/m, $f_{v2}=1$ N-s/m.

Find $\\dfrac{X_{2}(s)}{F(s)}$.

<svg viewBox="0 0 500 235" width="100%" style="max-width:500px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<path d="M20 25 L20 165"/>
<path d="M20 25 L8 37 M20 45 L8 57 M20 65 L8 77 M20 85 L8 97 M20 105 L8 117 M20 125 L8 137 M20 145 L8 157"/>
<path d="M20 65 L45 65"/>
<path d="M45 65 l7 -13 l14 26 l14 -26 l14 26 l7 -13"/>
<path d="M101 65 L125 65"/>
<path d="M20 125 L60 125"/><path d="M60 109 L60 141"/>
<path d="M83 103 L83 147 L117 147 L117 103 Z"/><path d="M117 125 L125 125"/>
<rect x="125" y="50" width="68" height="90" fill="#EDF2F7"/>
<path d="M193 95 L218 95"/>
<path d="M218 95 l7 -13 l14 26 l14 -26 l14 26 l7 -13"/>
<path d="M274 95 L300 95"/>
<rect x="300" y="50" width="68" height="90" fill="#EDF2F7"/>
<path d="M334 140 L334 158"/><path d="M318 158 L350 158"/>
<path d="M312 181 L312 158 M356 181 L356 158"/>
<path d="M312 181 L356 181"/>
<path d="M334 181 L334 200"/>
<path d="M300 200 L370 200"/>
<path d="M306 200 L296 210 M321 200 L311 210 M336 200 L326 210 M351 200 L341 210 M366 200 L356 210"/>
<path d="M395 95 L455 95"/><path d="M405 89 L395 95 L405 101"/>
<path d="M62 22 L112 22"/><path d="M104 16 L112 22 L104 28"/>
<path d="M240 35 L285 35"/><path d="M277 29 L285 35 L277 41"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="65" y="47">K</text><text x="77" y="51" font-size="10">1</text>
<text x="85" y="169">f</text><text x="92" y="173" font-size="10">v1</text>
<text x="238" y="77">K</text><text x="250" y="81" font-size="10">2</text>
<text x="362" y="176">f</text><text x="369" y="180" font-size="10">v2</text>
<text x="148" y="101">M</text><text x="162" y="105" font-size="10">1</text>
<text x="323" y="101">M</text><text x="337" y="105" font-size="10">2</text>
<text x="462" y="100">f(t)</text>
<text x="72" y="14">x</text><text x="81" y="18" font-size="10">1</text>
<text x="250" y="27">x</text><text x="259" y="31" font-size="10">2</text>
</g>
</svg>`,
      hint: "Force is applied to $M_{1}$ but the output is $X_{2}$, so the forcing vector has its entry in row 1 while Cramer's rule replaces column 2. Note $f_{v2}$ goes to ground, so it touches only $M_{2}$ and is not shared.",
      answer: "$$\\frac{X_{2}(s)}{F(s)}=\\frac{2}{s^{4}+2s^{3}+6s^{2}+5s+2}$$",
      expert: `
**First glance:** two masses again, so fourth-order, two equations. But there are **two structural differences** from 2-19 and an expert spots both before writing anything:

1. **The force is on $M_{1}$ but the output is $X_{2}$.** So the forcing vector's nonzero entry is in row 1, while Cramer's rule replaces column 2. Those are independent choices and mixing them is the intended trap.
2. **$f_{v2}$ goes to ground, not between masses.** Ground-tied elements touch **one diagonal only** and contribute nothing off-diagonal. Only $K_{2}$ is shared here.

That second point is the whole problem. Contrast with $K_{2}$, which appears three times.

**Predict the numerator before computing it.** The only path from input to output is through the spring $K_{2}$, a pure gain of 2 — no damper in that path, so **no $s$ in the numerator**. Expect a constant. In 2-19 the coupling included a damper and the numerator picked up an $s$. An expert reads the coupling path to predict the zeros.

**The dc check that catches everything:** at rest both dampers are inert, so the whole force sits on $K_{1}$ and $x_{1}=x_{2}=f/K_{1}=f$. Gain must be 1. $\\tfrac22=1$ ✓
`,
      solution: `
Harder than 2-19 for three reasons: the force and the output sit on *different* masses,
one damper goes to ground rather than between masses, and the coupling element is a
spring alone. Each changes something in the matrix.

---

**Step 1 — inventory carefully.**

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

**Step 2 — write the equations.** The force acts at $M_{1}$, so it appears in the
**first** equation:

$$\\left(s^{2}+s+3\\right)X_{1}(s)-2X_{2}(s)=F(s)$$

$$-2X_{1}(s)+\\left(s^{2}+s+2\\right)X_{2}(s)=0$$

**Symmetry check.** Off-diagonals both $-2$. ✓

**Step 3 — matrix form.**

$$\\begin{bmatrix} s^{2}+s+3 & -2 \\\\ -2 & s^{2}+s+2\\end{bmatrix}
\\begin{bmatrix} X_{1} \\\\ X_{2}\\end{bmatrix}=\\begin{bmatrix} F(s) \\\\ 0\\end{bmatrix}$$

**Step 4 — Cramer's rule for $X_{2}$.**

We want the **second** unknown, so replace the **second column** with the forcing vector:

$$\\det\\mathbf{A}_{2}=\\begin{vmatrix} s^{2}+s+3 & F(s) \\\\ -2 & 0\\end{vmatrix}
=\\left(s^{2}+s+3\\right)(0)-F(s)(-2)=2F(s)$$

The forcing vector's nonzero entry is in row 1, but we replace **column 2** because we
want $X_{2}$. Those are independent choices — mixing them up is a frequent error.

**Step 5 — the system determinant.**

$$\\det\\mathbf{A}=\\left(s^{2}+s+3\\right)\\left(s^{2}+s+2\\right)-(-2)(-2)$$

$(-2)(-2)=+4$, subtracted, so $-4$.

Substitute $u=s^{2}+s$:

$$(u+3)(u+2)-4=u^{2}+5u+6-4=u^{2}+5u+2$$

Expand $u^{2}=\\left(s^{2}+s\\right)^{2}=s^{4}+2s^{3}+s^{2}$:

$$s^{4}+2s^{3}+s^{2}+5s^{2}+5s+2=s^{4}+2s^{3}+6s^{2}+5s+2$$

**Step 6 — divide.**

$$\\boxed{\\;\\frac{X_{2}(s)}{F(s)}=\\frac{2}{s^{4}+2s^{3}+6s^{2}+5s+2}\\;}$$

---

**Check — order.** Two masses → fourth-order denominator. ✓

**Check — no zeros.** The numerator is a constant, so there are no finite zeros. Expected:
the only path from the input at $M_{1}$ to the output at $X_{2}$ is through spring
$K_{2}$, a pure gain of 2. In 2-19 the coupling included a damper, and that damper put an
$s$ in the numerator. No damper in the coupling path here, so no $s$.

**Check — dc.** At $s=0$: $\\dfrac22=1$.

Sanity: apply a constant force at $M_{1}$. In steady state nothing moves, so both dampers
are inert (a damper exerts no force at zero velocity). The whole force is carried by
$K_{1}$, and $M_{2}$ moves exactly as far as $M_{1}$: $x_{1}=x_{2}=f/K_{1}=f$. Hence
$X_{2}/F=1\\;\\checkmark$

That last check is worth the effort — it catches a whole class of sign and bookkeeping
errors before they reach the answer.
`
    },

    {
      id: "2-22", difficulty: "challenge", topic: "Electrical networks",
      prompt: `A three-mesh network is arranged as follows. Mesh 1 contains the source $v(t)$ and $R_{1}=2\\ \\Omega$, and shares an inductor $L=1$ H with mesh 2. Mesh 2 shares that inductor with mesh 1 and shares a resistor $R_{2}=3\\ \\Omega$ with mesh 3. Mesh 3 contains that shared $R_{2}$ and a capacitor $C=\\tfrac12$ F.

Find $\\dfrac{I_{3}(s)}{V(s)}$.

<svg viewBox="0 0 560 200" width="100%" style="max-width:560px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<circle cx="42" cy="105" r="19"/>
<path d="M42 86 L42 40 L110 40"/>
<path d="M42 124 L42 170 L520 170 L520 133"/>
<path d="M110 40 l6 -11 l12 22 l12 -22 l12 22 l12 -22 l6 11"/>
<path d="M170 40 L235 40 L235 66"/>
<path d="M235 66 q-14 8 0 16 q-14 8 0 16 q-14 8 0 16 q-14 8 0 16"/>
<path d="M235 130 L235 170"/>
<path d="M235 40 L375 40 L375 66"/>
<path d="M375 66 l-11 6 l22 12 l-22 12 l22 12 l-22 12 l11 6"/>
<path d="M375 126 L375 170"/>
<path d="M375 40 L520 40 L520 87"/>
<path d="M498 87 L542 87 M498 133 L542 133"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="4" y="110">V(s)</text>
<text x="129" y="26">R</text><text x="141" y="30" font-size="10">1</text>
<text x="204" y="102">L</text>
<text x="392" y="102">R</text><text x="404" y="106" font-size="10">2</text>
<text x="548" y="114">C</text>
<text x="142" y="112">I</text><text x="150" y="116" font-size="10">1</text>
<text x="292" y="112">I</text><text x="300" y="116" font-size="10">2</text>
<text x="452" y="112">I</text><text x="460" y="116" font-size="10">3</text>
</g>
<g stroke="#8C9AA8" stroke-width="1.5" fill="none">
<path d="M142 96 a24 24 0 1 1 24 -24"/><path d="M162 78 l4 -6 l6 5"/>
<path d="M292 96 a24 24 0 1 1 24 -24"/><path d="M312 78 l4 -6 l6 5"/>
<path d="M452 96 a24 24 0 1 1 24 -24"/><path d="M472 78 l4 -6 l6 5"/>
</g>
</svg>`,
      hint: "Three meshes means a $3\\times3$ matrix. Meshes 1 and 3 share nothing, so that entry is zero. Expand the determinant along the row or column with the most zeros.",
      answer: "$$\\frac{I_{3}(s)}{V(s)}=\\frac{3s^{2}}{6s^{2}+10s+12}$$",
      expert: `
**First glance:** three meshes, so a $3\\times3$ — but **look for the zeros first.** Meshes 1 and 3 share no component, so those entries are exactly 0. A mesh matrix is always sparse and always symmetric; that structure is what makes hand computation feasible.

**Expand along the row or column with the most zeros, not along the first row by default.** For $\\det\\mathbf{A}_{3}$ the third column has a single nonzero entry, so it collapses to one $2\\times2$ instead of three. That choice alone halves the work.

**Cofactor signs:** the checkerboard is $+,-,+$ across the top row, and position $(1,3)$ carries $+$. Getting a sign wrong here is the most common way a correct setup produces a wrong answer.

**Two structural predictions before computing:**
- dc gain must be 0 — the capacitor blocks dc in mesh 3.
- high-frequency limit must be finite — capacitor shorts, inductor opens, leaving a resistive path.

**The definitive check most students never run:** back-substitute your answer into an equation you did **not** use to derive it. Plug $I_{2}$ and $I_{3}$ into the mesh-3 equation and confirm it gives exactly zero. An independent equation closing to zero is stronger evidence than any amount of re-checking your own arithmetic.
`,
      solution: `
**Step 1 — impedances.**

$$Z_{R_{1}}=2,\\quad Z_{L}=s,\\quad Z_{R_{2}}=3,\\quad Z_{C}=\\frac{1}{\\tfrac12 s}=\\frac{2}{s}$$

**Step 2 — the three mesh equations by inspection.**

*Mesh 1:* contains $R_{1}$ and the shared $L$. Self impedance $2+s$. Shares $s$ with mesh
2, shares **nothing** with mesh 3:

$$(2+s)I_{1}-sI_{2}+0\\cdot I_{3}=V(s)$$

*Mesh 2:* contains the shared $L$ and the shared $R_{2}$. Self impedance $s+3$. Shares
$s$ with mesh 1 and $3$ with mesh 3:

$$-sI_{1}+(s+3)I_{2}-3I_{3}=0$$

*Mesh 3:* contains the shared $R_{2}$ and $C$. Self impedance $3+\\dfrac{2}{s}$:

$$0\\cdot I_{1}-3I_{2}+\\left(3+\\frac{2}{s}\\right)I_{3}=0$$

**The zeros matter.** Meshes 1 and 3 have no element in common, so those entries are
exactly 0. Non-adjacent meshes always give zeros — that is what makes large mesh matrices
sparse and tractable.

$$\\mathbf{A}=\\begin{bmatrix} 2+s & -s & 0 \\\\ -s & s+3 & -3 \\\\ 0 & -3 & 3+\\dfrac{2}{s}\\end{bmatrix}$$

**Symmetry check.** $(1,2)$ matches $(2,1)$, $(2,3)$ matches $(3,2)$, $(1,3)$ matches
$(3,1)$. ✓

**Step 3 — Cramer's rule for $I_{3}$: replace column 3.**

$$\\det\\mathbf{A}_{3}=\\begin{vmatrix} 2+s & -s & V \\\\ -s & s+3 & 0 \\\\ 0 & -3 & 0\\end{vmatrix}$$

Expand along the **third column**, which has only one nonzero entry — far less work than
the first row. The sign for position (row 1, column 3) is $(-1)^{1+3}=+1$:

$$\\det\\mathbf{A}_{3}=+V\\begin{vmatrix} -s & s+3 \\\\ 0 & -3\\end{vmatrix}
=V\\left[(-s)(-3)-(s+3)(0)\\right]=3sV$$

**Step 4 — the system determinant, expanding along the first row.**

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

**Step 5 — divide.**

$$\\frac{I_{3}(s)}{V(s)}=3s\\cdot\\frac{s}{6s^{2}+10s+12}$$

$$\\boxed{\\;\\frac{I_{3}(s)}{V(s)}=\\frac{3s^{2}}{6s^{2}+10s+12}\\;}$$

---

**Check — dc.** At $s=0$ the result is 0. Correct: the capacitor blocks dc, so no steady
current flows in mesh 3.

**Check — high frequency.** As $s\\to\\infty$: $\\dfrac{3s^{2}}{6s^{2}}=\\dfrac12$.

Sanity: at high frequency the capacitor shorts and the inductor opens. An open inductor
forces $I_{1}=I_{2}$ (it carries $I_{1}-I_{2}$, and huge impedance with finite voltage
drives that difference to zero). With the capacitor shorted, the source sees essentially
$R_{1}=2\\ \\Omega$, giving $I=V/2$, all of which flows into mesh 3. So
$I_{3}/V\\to\\tfrac12\\;\\checkmark$

**Check — back-substitute.** Solving also gives
$I_{2}/V=\\dfrac{3s^{2}+2s}{6s^{2}+10s+12}$. Verify the mesh-3 equation:

$$-3\\left(\\frac{3s^{2}+2s}{6s^{2}+10s+12}\\right)+\\left(3+\\frac{2}{s}\\right)\\left(\\frac{3s^{2}}{6s^{2}+10s+12}\\right)
=\\frac{-9s^{2}-6s+9s^{2}+6s}{6s^{2}+10s+12}=0\\;\\checkmark$$

An independent equation checking out to exactly zero is the strongest confirmation
available.
`
    },

    {
      id: "2-23", difficulty: "challenge", topic: "Linearization",
      prompt: `A payload of mass $M=1$ kg rests on a nonlinear isolator whose restoring force is $f_{K}=2x^{2}$ newtons when compressed by $x$ meters. A viscous damper $f_{v}=4$ N-s/m acts in parallel with the isolator. The applied force is

$$f(t)=8+\\delta f(t)$$

a constant 8 N bias plus a small time-varying perturbation.

**(a)** Find the operating point and the transfer function $\\dfrac{\\delta X(s)}{\\delta F(s)}$.

**(b)** The bias is now raised to 32 N. Without a calculator, state what happens to the frequency of the damped oscillation, and by what exact factor.`,
      hint: "Find the equilibrium first by setting the perturbation and all derivatives to zero. For part (b), notice that the operating point itself moves — so the effective spring constant moves with it.",
      answer: "**(a)** $x_{0}=2$ m, and $$\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+8}=\\frac{1}{(s+2)^{2}+2^{2}}$$ with poles at $s=-2\\pm j2$. **(b)** The operating point moves to $x_{0}=4$ m, the effective spring constant doubles to 16, and the damped oscillation frequency rises from $2$ to $2\\sqrt3$ rad/s — an exact factor of $\\sqrt3$.",
      expert: `
**First glance:** a squared term in the differential equation. Nonlinear, so **nothing** from the rest of Chapter 2 applies until it is linearized — no impedances, no transfer function, no superposition.

**The order is fixed and non-negotiable:** equilibrium first, then substitute, then expand, then transform. Students who jump to transforming get nowhere.

**Finding the operating point is an algebra problem, not a calculus one.** Set derivatives to zero and the differential equation collapses: $2x_{0}^{2}=8\\Rightarrow x_{0}=2$. Done in one line.

**The check that makes linearization self-verifying:** the constant terms **must cancel**. $f_{K}(x_{0})=8$ on the left, bias $=8$ on the right. If they do not cancel, your operating point is wrong — go back, do not proceed. Experts treat this as a hard gate.

**Part (b) is where the concept actually lives.** The instinct is that raising the force just pushes harder on the same system. It does not: $x_{0}$ moves, so $m_{a}=4x_{0}$ moves with it, so the **model itself changes**. A nonlinear spring is stiffer the more it is compressed.

Note also that only stiffness moved — the real part of the pole is $-f_{v}/2M$, untouched. Decay unchanged, oscillation faster by exactly $\\sqrt3$.
`,
      solution: `
## Part (a)

**Step 1 — write the nonlinear differential equation.**

Sum the forces exactly as in a linear problem; only the spring term differs:

$$M\\frac{d^{2}x}{dt^{2}}+f_{v}\\frac{dx}{dt}+2x^{2}=f(t)$$

With $M=1$, $f_{v}=4$:

$$\\frac{d^{2}x}{dt^{2}}+4\\frac{dx}{dt}+2x^{2}=f(t)$$

The $2x^{2}$ term is what makes this nonlinear.

---

**Step 2 — find the operating point.**

Set the perturbation to zero so $f(t)=8$, and set all derivatives to zero (steady state,
nothing moving):

$$0+0+2x_{0}^{2}=8$$

$$x_{0}^{2}=4,\\qquad x_{0}=2\\ \\text{m}$$

Take the positive root — a physical compression.

Setting the derivatives to zero collapses the differential equation to an algebraic one.
That is always how the operating point is found.

---

**Step 3 — substitute $x=x_{0}+\\delta x$.**

Because $x_{0}$ is a **constant**, it vanishes under differentiation:

$$\\frac{d\\left(x_{0}+\\delta x\\right)}{dt}=0+\\frac{d\\,\\delta x}{dt},\\qquad
\\frac{d^{2}\\left(x_{0}+\\delta x\\right)}{dt^{2}}=\\frac{d^{2}\\delta x}{dt^{2}}$$

The derivative terms pass through **unchanged**. Only $2x^{2}$ needs work.

---

**Step 4 — linearize the nonlinear term.**

$$f_{K}(x)\\approx f_{K}(x_{0})+\\left.\\frac{df_{K}}{dx}\\right|_{x_{0}}\\delta x$$

Power rule $\\dfrac{d}{dx}x^{n}=nx^{n-1}$:

$$\\frac{d}{dx}\\left(2x^{2}\\right)=2\\cdot2x^{2-1}=4x$$

Evaluate at $x_{0}=2$:

$$m_{a}=4x_{0}=4(2)=8\\ \\text{N/m}$$

And $f_{K}(x_{0})=2x_{0}^{2}=2(4)=8$ N — the bias force, exactly as it must be. That
agreement is a free check on the operating point.

$$2x^{2}\\approx8+8\\,\\delta x$$

---

**Step 5 — assemble and cancel the bias.**

$$\\frac{d^{2}\\delta x}{dt^{2}}+4\\frac{d\\,\\delta x}{dt}+8+8\\,\\delta x=8+\\delta f(t)$$

The constant $8$ appears on **both** sides and cancels:

$$\\frac{d^{2}\\delta x}{dt^{2}}+4\\frac{d\\,\\delta x}{dt}+8\\,\\delta x=\\delta f(t)$$

**That cancellation is the payoff of choosing the operating point correctly.** If the
constants had not cancelled, the operating point was computed wrong — go back to Step 2.

---

**Step 6 — transform.** Zero initial conditions on the *deviation* variables:

$$\\left(s^{2}+4s+8\\right)\\delta X(s)=\\delta F(s)$$

$$\\boxed{\\;\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+8}\\;}$$

**Poles.** Discriminant $=16-4(1)(8)=16-32=-16$, negative, so complex. Complete the
square:

$$s^{2}+4s+8=(s+2)^{2}+(8-4)=(s+2)^{2}+2^{2}$$

$$s=-2\\pm j2$$

Left half-plane, underdamped. A small disturbance produces an oscillation at $2$ rad/s
decaying as $e^{-2t}$. Every number here is an integer — no calculator anywhere.

---

## Part (b)

This is the part that tests whether you understood what linearization actually did.

**Step 1 — the operating point moves.**

$$2x_{0}^{2}=32\\;\\Rightarrow\\;x_{0}^{2}=16\\;\\Rightarrow\\;x_{0}=4\\ \\text{m}$$

The payload sits twice as deep in the isolator.

**Step 2 — so the effective spring constant moves too.**

$$m_{a}=4x_{0}=4(4)=16\\ \\text{N/m}$$

It **doubled**, from 8 to 16, because $m_{a}=4x_{0}$ is proportional to $x_{0}$ and
$x_{0}$ doubled. A nonlinear spring is *stiffer the more it is compressed*, and this is
that fact in one line.

**Step 3 — new transfer function and poles.**

$$\\frac{\\delta X(s)}{\\delta F(s)}=\\frac{1}{s^{2}+4s+16}$$

Complete the square:

$$s^{2}+4s+16=(s+2)^{2}+(16-4)=(s+2)^{2}+12$$

The damped oscillation frequency is $\\omega=\\sqrt{12}$. Simplify exactly by pulling out
the perfect square: $12=4\\times3$, so

$$\\omega=\\sqrt{4\\times3}=\\sqrt4\\cdot\\sqrt3=2\\sqrt3\\ \\text{rad/s}$$

$$s=-2\\pm j2\\sqrt3$$

**Step 4 — the factor.**

$$\\frac{\\omega_{\\text{new}}}{\\omega_{\\text{old}}}=\\frac{2\\sqrt3}{2}=\\sqrt3$$

$$\\boxed{\\;\\text{The oscillation frequency increases by an exact factor of }\\sqrt3\\;}$$

Note the decay rate did **not** change: the real part is $-2$ in both cases, because the
damper $f_{v}=4$ and mass $M=1$ are unchanged and the real part is $-f_{v}/2M$. Only the
stiffness moved.

---

**What this problem is really testing.** A linearized transfer function is not a property
of the hardware alone — it is a property of the hardware *at a chosen operating point*.
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
      prompt: `You are handed a black-box subsystem with no schematic. In the lab you drive it with a **unit step** and record the output, which fits

$$c(t)=5-8e^{-2t}+3e^{-4t}$$

to within measurement noise. Assuming the system is linear, time-invariant, and started from rest, determine $G(s)$ and state its poles, zeros and dc gain.`,
      hint: "Transform the measured response to get $C(s)$, then divide by the transform of the input. Work the numerator algebra carefully — terms will cancel.",
      answer: "$$G(s)=\\frac{4s+40}{s^{2}+6s+8}=\\frac{4(s+10)}{(s+2)(s+4)}$$ Poles at $s=-2,-4$; zero at $s=-10$; dc gain $G(0)=5$.",
      expert: `
**First glance:** the exponents of the measured response **are** the poles. $e^{-2t}$ and $e^{-4t}$ mean poles at $-2$ and $-4$, so the denominator is $(s+2)(s+4)$ — written down before any algebra.

That is the whole first half of the problem, read directly off the data.

**Predict the numerator's behaviour too.** $c(0)=5-8+3=0$, so the response starts at rest, so $\\deg N<\\deg D$, so **the $s^{2}$ terms must cancel** when you combine over a common denominator. When they do, that is confirmation, not luck. If they had not, either the data or your arithmetic is wrong.

**Ruled out on sight:** any attempt to guess a physical structure. The question asks only for $G(s)$, and $C(s)/R(s)$ delivers it.

**What the data does *not* tell you directly:** the zero. Poles come from the exponents; the zero at $-10$ is hidden in the relative sizes of the coefficients $-8$ and $+3$. Change those while keeping the same exponentials and the zero moves. Knowing which features are visible and which are encoded is the real skill here.

**Two-limit close-out:** $G(0)=5=c(\\infty)$ and $G(\\infty)=0=c(0^{+})$. Both ends pinned.
`,
      solution: `
This runs the usual process **backwards**: instead of building a model and predicting the
response, you have the response and must recover the model. This is system
identification, and it tests whether you understand $C(s)=R(s)G(s)$ as an equation rather
than a recipe.

---

**Step 1 — transform the measured response.**

$$\\mathcal{L}\\{5\\}=\\frac{5}{s},\\quad
\\mathcal{L}\\{-8e^{-2t}\\}=\\frac{-8}{s+2},\\quad
\\mathcal{L}\\{3e^{-4t}\\}=\\frac{3}{s+4}$$

$$C(s)=\\frac{5}{s}-\\frac{8}{s+2}+\\frac{3}{s+4}$$

**Step 2 — combine over the common denominator $s(s+2)(s+4)$.**

$$C(s)=\\frac{5(s+2)(s+4)-8s(s+4)+3s(s+2)}{s(s+2)(s+4)}$$

**Step 3 — expand the numerator, one piece at a time.**

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

**Step 4 — divide by the input transform.**

The input was a unit step, so $R(s)=\\dfrac{1}{s}$. Dividing by $1/s$ means multiplying
by $s$:

$$G(s)=\\frac{C(s)}{R(s)}=s\\cdot\\frac{4s+40}{s(s+2)(s+4)}=\\frac{4s+40}{(s+2)(s+4)}$$

$$\\boxed{\\;G(s)=\\frac{4s+40}{s^{2}+6s+8}=\\frac{4(s+10)}{(s+2)(s+4)}\\;}$$

---

**Step 5 — read off the features.**

**Poles:** $s=-2$ and $s=-4$. These were visible in the raw data all along — the response
contained $e^{-2t}$ and $e^{-4t}$, and *the exponents of the response are the poles of
the system*. You could have written the denominator immediately.

**Zero:** $4s+40=0\\Rightarrow s=-10$. This was **not** directly visible; it is encoded in
the relative sizes of the coefficients $-8$ and $+3$. Change those while keeping the same
exponentials and the zero moves.

**DC gain:** $G(0)=\\dfrac{40}{(2)(4)}=\\dfrac{40}{8}=5$.

---

**Check 1 — final value.** From the data $c(\\infty)=5$; from the transfer function the
step response settles at $G(0)=5\\;\\checkmark$

**Check 2 — initial value.** From the data $c(0)=5-8+3=0$; from the theorem
$\\lim_{s\\to\\infty}\\dfrac{4s+40}{(s+2)(s+4)}=0\\;\\checkmark$

**Check 3 — work forward again.** Drive $G(s)$ with a step:

$$C(s)=\\frac{4s+40}{s(s+2)(s+4)}$$

Cover-up residues:

- $K_{1}=\\left.\\dfrac{4s+40}{(s+2)(s+4)}\\right|_{s=0}=\\dfrac{40}{8}=5$
- $K_{2}=\\left.\\dfrac{4s+40}{s(s+4)}\\right|_{s=-2}=\\dfrac{-8+40}{(-2)(2)}=\\dfrac{32}{-4}=-8$
- $K_{3}=\\left.\\dfrac{4s+40}{s(s+2)}\\right|_{s=-4}=\\dfrac{-16+40}{(-4)(-2)}=\\dfrac{24}{8}=3$

giving $c(t)=5-8e^{-2t}+3e^{-4t}$ — exactly the measured data. ✓

**A caution.** This recovers $G(s)$ only if the system truly is LTI and started at rest.
Any nonlinearity, or a nonzero initial condition, and the extracted $G(s)$ describes
nothing real.
`
    },

    {
      id: "2-25", difficulty: "challenge", topic: "Mechanical systems",
      prompt: `An instrument package of mass $M$ is bolted to a vibration-isolation mount consisting of a spring $K$ and a viscous damper $f_{v}$ in parallel. The other end of the mount attaches to a shaker platform whose displacement $x_{1}(t)$ is **prescribed** by the shaker — it is the *input*. The instrument's displacement $x_{2}(t)$ is the *output*.

Take $M=1$ kg, $f_{v}=4$ N-s/m, $K=3$ N/m.

Find $\\dfrac{X_{2}(s)}{X_{1}(s)}$, then explain physically why the dc gain must have the value you compute.

<svg viewBox="0 0 420 235" width="100%" style="max-width:420px;display:block;margin:12px auto">
<g fill="none" stroke="#1A2028" stroke-width="2" stroke-linecap="round">
<rect x="105" y="28" width="150" height="58" fill="#EDF2F7"/>
<path d="M140 86 L140 112"/>
<path d="M140 112 l-13 7 l26 14 l-26 14 l26 14 l-26 14 l13 7"/>
<path d="M140 182 L140 200"/>
<path d="M220 86 L220 116"/>
<path d="M204 116 L236 116"/>
<path d="M210 139 L210 183 L246 183 L246 139 Z"/>
<path d="M220 183 L220 200"/>
<path d="M60 200 L340 200"/>
<path d="M70 200 L58 213 M100 200 L88 213 M130 200 L118 213 M160 200 L148 213 M190 200 L178 213 M220 200 L208 213 M250 200 L238 213 M280 200 L268 213 M310 200 L298 213 M335 200 L323 213"/>
<path d="M285 42 L285 82"/><path d="M279 74 L285 82 L291 74"/>
<path d="M62 195 L62 160"/><path d="M56 168 L62 160 L68 168"/>
</g>
<g font-family="Georgia,serif" font-size="14" fill="#1A2028" font-style="italic">
<text x="140" y="55">M</text>
<text x="156" y="72" font-size="12">(instrument)</text>
<text x="103" y="155">K</text>
<text x="252" y="166">f</text><text x="259" y="170" font-size="10">v</text>
<text x="292" y="66">x</text><text x="301" y="70" font-size="10">2</text>
<text x="32" y="175">x</text><text x="41" y="179" font-size="10">1</text>
<text x="148" y="228" font-size="12" font-style="normal">shaker platform</text>
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

— same denominator as always, numerator built from whatever couples input to output. **The numerator is the coupling path**, exactly as in 2-21.

**The dc gain is forced to 1 by physics, before any algebra.** At rest the damper transmits nothing and the mass accelerates not at all, so the spring must carry zero force, so it must be at its natural length, so $x_{1}=x_{2}$. That argument holds for *any* $M$, $f_{v}$, $K$. If your dc gain is not 1, you have a sign error.

**The design insight:** $f_{v}$ puts an $s$ in the numerator, so high-frequency rolloff is $1/s$ rather than $1/s^{2}$. Damping the resonance costs you isolation. That trade-off is why vibration mounts are hard.
`,
      solution: `
A **base-excitation** problem. Worded differently from the textbook's force-input
problems, but every tool is the same. The key difference: the input is a *displacement*,
and the mount elements respond to *relative* motion.

---

**Step 1 — identify what force each element applies to the mass.**

*Spring.* Force is proportional to how much it is stretched or compressed — the
**difference** between its two ends:

$$f_{K}=K\\left(x_{1}-x_{2}\\right)$$

If the platform moves further than the instrument, the spring is compressed and pushes
the instrument along. Positive.

*Damper.* Force is proportional to the **relative velocity** of its two ends:

$$f_{\\text{damper}}=f_{v}\\left(\\frac{dx_{1}}{dt}-\\frac{dx_{2}}{dt}\\right)$$

*Mass.* Newton's second law uses **absolute** acceleration — the mass does not know where
the platform is:

$$f_{\\text{inertial}}=M\\frac{d^{2}x_{2}}{dt^{2}}$$

**This asymmetry is the whole problem.** Spring and damper see differences; the mass sees
absolute motion.

**Step 2 — Newton's law for the instrument.**

$$M\\frac{d^{2}x_{2}}{dt^{2}}=K\\left(x_{1}-x_{2}\\right)+f_{v}\\left(\\frac{dx_{1}}{dt}-\\frac{dx_{2}}{dt}\\right)$$

**Step 3 — collect $x_{2}$ terms left, $x_{1}$ terms right.**

$$M\\frac{d^{2}x_{2}}{dt^{2}}+f_{v}\\frac{dx_{2}}{dt}+Kx_{2}=f_{v}\\frac{dx_{1}}{dt}+Kx_{1}$$

The left side is the ordinary mass-spring-damper operator acting on the output; the right
is a **spring-and-damper operator acting on the input**. That right-hand side is what
produces a zero.

**Step 4 — transform with zero initial conditions.**

$$\\left(Ms^{2}+f_{v}s+K\\right)X_{2}(s)=\\left(f_{v}s+K\\right)X_{1}(s)$$

**Step 5 — form the transfer function.**

$$\\frac{X_{2}(s)}{X_{1}(s)}=\\frac{f_{v}s+K}{Ms^{2}+f_{v}s+K}=\\frac{4s+3}{s^{2}+4s+3}$$

Factor: two numbers multiplying to 3, adding to 4 — that is 1 and 3.

$$\\boxed{\\;\\frac{X_{2}(s)}{X_{1}(s)}=\\frac{4s+3}{(s+1)(s+3)}\\;}$$

---

**Step 6 — the dc gain, and why it must be 1.**

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
($f_{v}=0$) would give $\\dfrac{K}{Ms^{2}+K}$ and roll off as $1/s^{2}$ — better
high-frequency isolation, but a completely undamped resonance. That trade-off between
damping the resonance and isolating at high frequency is the central design problem in
vibration mounting, and Chapter 10 gives you the frequency-response tools to reason about
it properly.
`
    }
  ]
});
