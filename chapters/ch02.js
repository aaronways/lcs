registerChapter({
  id: 2,
  title: "Modeling in the Frequency Domain",
  sections: "2.1–2.5, 2.10–2.11",

  guide: [
    {
      title: "Why this chapter exists",
      body: `
Chapter 2 has exactly one goal: **take a physical system and produce its transfer
function** $G(s) = C(s)/R(s)$. The Laplace transform, partial fractions, impedances,
free-body diagrams and linearization are all machinery in service of that goal.

> Almost every lost point in this chapter traces back to a partial fraction or a sign,
> not to a control concept. Drill the algebra until it is automatic.
`
    },
    {
      title: "2.2 — Laplace transform review",
      body: `
### Definition

$$\\mathcal{L}\\{f(t)\\} = F(s) = \\int_{0^-}^{\\infty} f(t)e^{-st}\\,dt, \\qquad s = \\sigma + j\\omega$$

The point: **differentiation in time becomes multiplication by $s$**, which turns a
differential equation into an algebra problem.

### The pairs you must know cold

| $f(t)$ | $F(s)$ |
|---|---|
| $\\delta(t)$ | $1$ |
| $u(t)$ | $1/s$ |
| $tu(t)$ | $1/s^2$ |
| $t^n u(t)$ | $n!/s^{n+1}$ |
| $e^{-at}u(t)$ | $1/(s+a)$ |
| $\\sin\\omega t\\,u(t)$ | $\\omega/(s^2+\\omega^2)$ |
| $\\cos\\omega t\\,u(t)$ | $s/(s^2+\\omega^2)$ |
| $e^{-at}\\sin\\omega t$ | $\\omega/((s+a)^2+\\omega^2)$ |
| $e^{-at}\\cos\\omega t$ | $(s+a)/((s+a)^2+\\omega^2)$ |

### The two errors that cost points every semester

1. The sine transform has $\\omega$ on top; the cosine transform has $s$ on top.
2. $\\mathcal{L}\\{t^n\\} = n!/s^{n+1}$, **not** $1/s^{n+1}$. So $\\mathcal{L}\\{t^2\\} = 2/s^3$.

### Differentiation theorem

$$\\mathcal{L}\\left\\{\\frac{df}{dt}\\right\\} = sF(s) - f(0^-), \\qquad
\\mathcal{L}\\left\\{\\frac{d^2f}{dt^2}\\right\\} = s^2F(s) - sf(0^-) - \\dot f(0^-)$$

With zero initial conditions this collapses to: **replace $d^n/dt^n$ with $s^n$.**
That single move is used dozens of times in this chapter and never gets harder.

### Final value theorem — and its precondition

$$f(\\infty) = \\lim_{s\\to 0} sF(s)$$

Valid **only** if every pole of $sF(s)$ has a negative real part. Applied blindly to
$\\omega/(s^2+\\omega^2)$ it reports $0$, but $\\sin\\omega t$ never settles.
`
    },
    {
      title: "2.2 — Partial fraction expansion",
      body: `
**Step 0.** If $\\deg N(s) \\ge \\deg D(s)$, long-divide first until the remainder is proper.

### Case 1 — real, distinct roots

$$F(s) = \\frac{N(s)}{(s+p_1)(s+p_2)\\cdots} = \\frac{K_1}{s+p_1} + \\frac{K_2}{s+p_2} + \\cdots$$

**Cover-up method:** to get $K_m$, cover the factor $(s+p_m)$ in the original and evaluate
what remains at $s = -p_m$.

$$K_m = \\big[(s+p_m)F(s)\\big]_{s \\to -p_m}$$

### Case 2 — real, repeated roots

A factor to the power $r$ generates $r$ terms with descending powers. With
$F_1(s) = (s+p_1)^r F(s)$:

$$K_i = \\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_1(s)}{ds^{\\,i-1}}\\right|_{s\\to -p_1}$$

Do not forget the factorial.

### Case 3 — complex roots

Keep the irreducible quadratic whole and give it a **linear** numerator:

$$F(s) = \\frac{K_1}{s+p_1} + \\frac{K_2 s + K_3}{s^2+as+b}$$

Find $K_1$ by cover-up, then clear fractions and balance coefficients of like powers
of $s$. Finally complete the square:

$$s^2 + as + b = \\left(s+\\frac{a}{2}\\right)^2 + \\left(b - \\frac{a^2}{4}\\right)$$

and split the numerator to match

$$\\mathcal{L}\\{Ae^{-at}\\cos\\omega t + Be^{-at}\\sin\\omega t\\} = \\frac{A(s+a)+B\\omega}{(s+a)^2+\\omega^2}$$
`
    },
    {
      title: "2.3 — The transfer function",
      body: `
Starting from the general LTI differential equation and setting **all initial conditions
to zero**:

$$G(s) = \\frac{C(s)}{R(s)} = \\frac{b_m s^m + b_{m-1}s^{m-1} + \\cdots + b_0}{a_n s^n + a_{n-1}s^{n-1} + \\cdots + a_0}$$

- Output terms build the **denominator**, input terms build the **numerator**.
- The denominator is the characteristic polynomial; its roots are the **poles**.
- Response by multiplication: $C(s) = R(s)G(s)$, then invert.

Zero initial conditions is not cheating: a transfer function is a property of the
*system*, and initial conditions belong to a particular *experiment*.
`
    },
    {
      title: "2.4 — Electrical networks",
      body: `
### Impedances

| Component | $Z(s)$ | $Y(s)$ |
|---|---|---|
| Resistor $R$ | $R$ | $1/R$ |
| Capacitor $C$ | $1/(Cs)$ | $Cs$ |
| Inductor $L$ | $Ls$ | $1/(Ls)$ |

Once components are impedances, **the circuit obeys resistive-circuit rules.** Series
impedances add; parallel combine as $Z_1Z_2/(Z_1+Z_2)$; voltage divider still works.
Never write an integro-differential equation — go straight to impedances.

### Mesh and node equations by inspection

$$\\left[\\begin{array}{c}\\text{sum of impedances}\\\\ \\text{around mesh } k\\end{array}\\right]I_k(s)
- \\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{shared}\\\\ \\text{impedances}\\end{array}\\right]I_j(s)
= \\left[\\begin{array}{c}\\text{applied voltages}\\\\ \\text{around mesh } k\\end{array}\\right]$$

**Diagonal positive, off-diagonal negative, matrix symmetric.** If the matrix is not
symmetric, you made a mistake — that is a free error check.

### Op-amps

$$\\text{Inverting: } \\frac{V_o(s)}{V_i(s)} = -\\frac{Z_2(s)}{Z_1(s)}
\\qquad
\\text{Noninverting: } \\frac{V_o(s)}{V_i(s)} = \\frac{Z_1(s)+Z_2(s)}{Z_1(s)}$$
`
    },
    {
      title: "2.5 — Translational mechanical systems",
      body: `
| Component | Force–displacement | Impedance $F(s)/X(s)$ |
|---|---|---|
| Spring $K$ | $f = Kx$ | $K$ |
| Damper $f_v$ | $f = f_v\\dot x$ | $f_v s$ |
| Mass $M$ | $f = M\\ddot x$ | $Ms^2$ |

### The analogy

force ↔ voltage · velocity ↔ current · displacement ↔ charge ·
spring ↔ capacitor · damper ↔ resistor · mass ↔ inductor

This is why the by-inspection pattern is *identical* to mesh analysis:

$$\\left[\\begin{array}{c}\\text{impedances}\\\\ \\text{touching } x_k\\end{array}\\right]X_k(s)
- \\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{impedances between}\\\\ x_k \\text{ and } x_j\\end{array}\\right]X_j(s)
= \\left[\\begin{array}{c}\\text{applied forces}\\\\ \\text{on mass } k\\end{array}\\right]$$

**Common error:** a shared spring or damper appears on **both** diagonals *and* on the
off-diagonal. Leaving it off one diagonal is the single most frequent mistake here.
`
    },
    {
      title: "2.10–2.11 — Nonlinearities and linearization",
      body: `
### Linearity

A system is linear only if it satisfies **both**:

- **Superposition:** $r_1 \\to c_1$ and $r_2 \\to c_2$ implies $r_1+r_2 \\to c_1+c_2$
- **Homogeneity:** $r_1 \\to c_1$ implies $Ar_1 \\to Ac_1$

Note $f(x) = 0.5x + 3$ fails homogeneity even though its graph is a straight line.

Physical nonlinearities to be able to name: **saturation** (amplifier flattens at high
input), **dead zone** (motor will not turn below a threshold), **backlash** (loose gears
move without output response).

### Linearization

$$f(x) \\approx f(x_0) + \\left.\\frac{df}{dx}\\right|_{x=x_0}(x-x_0)
\\qquad\\Longleftrightarrow\\qquad
\\delta f \\approx m_a\\,\\delta x$$

**Procedure:** (1) write the nonlinear ODE, (2) find the equilibrium with the
small-signal input set to zero and all derivatives zero, (3) substitute $x = x_0+\\delta x$,
(4) Taylor-expand and drop higher-order terms — note
$d(x_0+\\delta x)/dt = d\\,\\delta x/dt$ since $x_0$ is constant, (5) transform and form
$G(s)$.

The result is valid **only near the chosen operating point**, and it relates
*deviations*, not absolute values.
`
    }
  ],

  formulas: [
    { latex: "G(s)=\\frac{C(s)}{R(s)}=\\frac{b_ms^m+\\cdots+b_0}{a_ns^n+\\cdots+a_0}",
      note: "Transfer function — zero initial conditions, always." },
    { latex: "K_m=\\big[(s+p_m)F(s)\\big]_{s\\to-p_m}",
      note: "Cover-up residue, distinct real roots." },
    { latex: "K_i=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_1(s)}{ds^{\\,i-1}}\\right|_{s\\to-p_1}",
      note: "Repeated-root residue, F1(s)=(s+p1)^r F(s)." },
    { latex: "s^2+as+b=\\left(s+\\tfrac{a}{2}\\right)^2+\\left(b-\\tfrac{a^2}{4}\\right)",
      note: "Completing the square: a_shift = a/2, omega = sqrt(b - a^2/4)." },
    { latex: "\\mathcal{L}\\{Ae^{-at}\\cos\\omega t+Be^{-at}\\sin\\omega t\\}=\\frac{A(s+a)+B\\omega}{(s+a)^2+\\omega^2}",
      note: "Target form for Case 3 partial fractions." },
    { latex: "Z_R=R,\\quad Z_L=Ls,\\quad Z_C=\\frac{1}{Cs}",
      note: "Electrical impedances." },
    { latex: "Z_K=K,\\quad Z_{f_v}=f_vs,\\quad Z_M=Ms^2",
      note: "Mechanical impedances (force over displacement)." },
    { latex: "\\frac{V_o}{V_i}=-\\frac{Z_2}{Z_1}\\quad\\text{(inv)},\\qquad \\frac{V_o}{V_i}=\\frac{Z_1+Z_2}{Z_1}\\quad\\text{(noninv)}",
      note: "Ideal op-amp configurations." },
    { latex: "\\frac{V_C(s)}{V(s)}=\\frac{1/LC}{s^2+\\frac{R}{L}s+\\frac{1}{LC}}",
      note: "Series RLC, capacitor output. The canonical second-order system." },
    { latex: "f(\\infty)=\\lim_{s\\to0}sF(s)",
      note: "Final value theorem — only if all poles of sF(s) are in the left half-plane." }
  ],

  problems: [
    {
      id: "2-01",
      difficulty: "warmup",
      topic: "Laplace transforms",
      prompt: "Find $\\mathcal{L}\\{3t^2e^{-4t}u(t)\\}$.",
      hint: "Start from the transform of $t^n$, then apply the frequency-shift theorem.",
      answer: "$$\\mathcal{L}\\{3t^2e^{-4t}\\}=\\frac{6}{(s+4)^3}$$",
      solution: `
**Step 1 — transform of $t^2$.** From the table, $\\mathcal{L}\\{t^n u(t)\\}=n!/s^{n+1}$, so

$$\\mathcal{L}\\{t^2u(t)\\}=\\frac{2!}{s^{3}}=\\frac{2}{s^{3}}$$

**Step 2 — apply linearity.** The constant 3 passes straight through:

$$\\mathcal{L}\\{3t^2u(t)\\}=\\frac{6}{s^{3}}$$

**Step 3 — frequency shift.** The theorem states $\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$.
Here $a=4$, so replace every $s$ with $s+4$:

$$\\mathcal{L}\\{3t^2e^{-4t}u(t)\\}=\\frac{6}{(s+4)^{3}}$$

**Check.** Initial value theorem: $\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}6s/(s+4)^3=0$,
and indeed $f(0)=3(0)^2e^{0}=0$. Consistent.
`
    },
    {
      id: "2-02",
      difficulty: "core",
      topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{5}{(s+2)(s+7)}.$$",
      hint: "Distinct real roots — use the cover-up method, one residue per factor.",
      answer: "$$f(t)=\\left(e^{-2t}-e^{-7t}\\right)u(t)$$",
      solution: `
**Step 1 — check the orders.** Numerator order 0, denominator order 2. Proper, so no
long division needed.

**Step 2 — set up the expansion.** Roots at $s=-2$ and $s=-7$, both distinct and real:

$$F(s)=\\frac{K_1}{s+2}+\\frac{K_2}{s+7}$$

**Step 3 — cover-up for $K_1$.** Cover $(s+2)$ and evaluate the rest at $s=-2$:

$$K_1=\\left.\\frac{5}{s+7}\\right|_{s=-2}=\\frac{5}{-2+7}=\\frac{5}{5}=1$$

**Step 4 — cover-up for $K_2$.** Cover $(s+7)$ and evaluate at $s=-7$:

$$K_2=\\left.\\frac{5}{s+2}\\right|_{s=-7}=\\frac{5}{-7+2}=\\frac{5}{-5}=-1$$

**Step 5 — invert term by term** using $\\mathcal{L}^{-1}\\{1/(s+a)\\}=e^{-at}$:

$$f(t)=e^{-2t}-e^{-7t}$$

**Check.** $f(0)=1-1=0$, which matches: numerator order is two less than denominator
order, so the response starts at zero. Also
$\\lim_{s\\to0}sF(s)=0$ and $f(\\infty)=0$. Consistent.
`
    },
    {
      id: "2-03",
      difficulty: "core",
      topic: "Partial fractions",
      prompt: "Find the inverse Laplace transform of $$F(s)=\\frac{s+3}{s^2+4s+13}.$$",
      hint: "Check the discriminant before trying to factor.",
      answer: "$$f(t)=e^{-2t}\\left(\\cos 3t+\\tfrac{1}{3}\\sin 3t\\right)u(t)$$",
      solution: `
**Step 1 — test the quadratic.** Discriminant $=4^2-4(1)(13)=16-52=-36<0$. The roots are
complex, so the quadratic is irreducible over the reals. Do **not** try to factor it —
complete the square instead.

**Step 2 — complete the square.** Half the coefficient of $s$ is $2$, and $2^2=4$:

$$s^2+4s+13=(s+2)^2+(13-4)=(s+2)^2+9=(s+2)^2+3^2$$

So the shift is $a=2$ and the frequency is $\\omega=3$.

**Step 3 — split the numerator** to match the target form
$\\dfrac{A(s+a)+B\\omega}{(s+a)^2+\\omega^2}$. We need $s+3$ written in terms of $(s+2)$:

$$s+3=(s+2)+1=(s+2)+\\tfrac{1}{3}(3)$$

so $A=1$ and $B=\\tfrac13$.

**Step 4 — write it out and invert.**

$$F(s)=\\frac{(s+2)}{(s+2)^2+3^2}+\\frac{1}{3}\\cdot\\frac{3}{(s+2)^2+3^2}$$

The first term is a damped cosine, the second a damped sine:

$$f(t)=e^{-2t}\\cos 3t+\\frac{1}{3}e^{-2t}\\sin 3t$$

**Optional single-sinusoid form.** With $R=\\sqrt{1^2+(1/3)^2}=1.054$ and
$\\phi=\\arctan(1/3)=18.43^\\circ$:

$$f(t)=1.054\\,e^{-2t}\\cos(3t-18.43^\\circ)$$

**Check.** $f(0)=1$, and the initial value theorem gives
$\\lim_{s\\to\\infty}s(s+3)/(s^2+4s+13)=1$. Consistent.
`
    },
    {
      id: "2-04",
      difficulty: "core",
      topic: "Electrical networks",
      prompt: `For the series RLC network below, the input is the source voltage $v(t)$ and
the output is the capacitor voltage $v_C(t)$. Given $L=1$ H, $R=3\\ \\Omega$, and
$C=\\tfrac12$ F, find $V_C(s)/V(s)$ and locate its poles.`,
      hint: "Go straight to impedances and use a voltage divider. Do not write an integro-differential equation.",
      answer: "$$\\frac{V_C(s)}{V(s)}=\\frac{2}{s^2+3s+2}=\\frac{2}{(s+1)(s+2)}$$ Poles at $s=-1$ and $s=-2$, both real and negative.",
      solution: `
**Step 1 — replace components with impedances.**

$$Z_L=Ls=s,\\qquad Z_R=R=3,\\qquad Z_C=\\frac{1}{Cs}=\\frac{1}{(1/2)s}=\\frac{2}{s}$$

**Step 2 — recognize the topology.** It is a single loop, so the three impedances are in
series and the same current flows through all of them. That makes this a voltage divider
with $Z_C$ as the output leg:

$$\\frac{V_C(s)}{V(s)}=\\frac{Z_C}{Z_L+Z_R+Z_C}=\\frac{2/s}{s+3+2/s}$$

**Step 3 — clear the compound fraction.** Multiply numerator and denominator by $s$:

$$\\frac{V_C(s)}{V(s)}=\\frac{2}{s^2+3s+2}$$

**Step 4 — factor the denominator.** Two numbers multiplying to 2 and summing to 3 are
1 and 2:

$$\\frac{V_C(s)}{V(s)}=\\frac{2}{(s+1)(s+2)}$$

**Poles:** $s=-1$ and $s=-2$. Discriminant $9-8=1>0$, so both are real and distinct —
the system is **overdamped**, no oscillation.

**Sanity check at dc.** Set $s=0$: the gain is $2/2=1$. That is physically right — in
steady state the capacitor blocks dc current, no current flows, so no voltage is dropped
across $R$ or $L$ and the entire source voltage appears across $C$.

**General form worth memorizing.** In symbols this network always gives

$$\\frac{V_C(s)}{V(s)}=\\frac{1/LC}{s^2+\\frac{R}{L}s+\\frac{1}{LC}}$$

which you will meet again in Chapter 4 as
$\\omega_n^2/(s^2+2\\zeta\\omega_ns+\\omega_n^2)$.
`
    },
    {
      id: "2-05",
      difficulty: "challenge",
      topic: "Linearization",
      prompt: `A nonlinear system is described by
$$\\frac{d^2x}{dt^2}+2\\frac{dx}{dt}+\\cos x = 0.$$
Linearize it for small excursions about $x=\\pi/4$.`,
      hint: "Only the $\\cos x$ term is nonlinear. Constants differentiate to zero.",
      answer: "$$\\frac{d^2\\delta x}{dt^2}+2\\frac{d\\,\\delta x}{dt}-\\frac{\\sqrt2}{2}\\delta x=-\\frac{\\sqrt2}{2}$$",
      solution: `
**Step 1 — identify the nonlinear term.** The derivative terms are already linear. Only
$\\cos x$ needs treatment.

**Step 2 — substitute the deviation variable.** Let $x=\\delta x+\\pi/4$, where $\\delta x$
is the small excursion. Because $\\pi/4$ is a *constant*, it vanishes under
differentiation:

$$\\frac{d^2(\\delta x+\\pi/4)}{dt^2}=\\frac{d^2\\delta x}{dt^2},
\\qquad \\frac{d(\\delta x+\\pi/4)}{dt}=\\frac{d\\,\\delta x}{dt}$$

So the derivative terms pass through untouched. This is the step most people
overcomplicate.

**Step 3 — Taylor-expand the nonlinear term** about $x_0=\\pi/4$, keeping only the linear
term:

$$\\cos x \\approx \\cos x_0 + \\left.\\frac{d(\\cos x)}{dx}\\right|_{x_0}\\delta x
= \\cos\\frac{\\pi}{4} - \\sin\\frac{\\pi}{4}\\,\\delta x$$

Both values are $\\tfrac{\\sqrt2}{2}\\approx0.707$:

$$\\cos x \\approx \\frac{\\sqrt2}{2}-\\frac{\\sqrt2}{2}\\,\\delta x$$

**Step 4 — assemble.** Substituting back into the original equation:

$$\\frac{d^2\\delta x}{dt^2}+2\\frac{d\\,\\delta x}{dt}+\\frac{\\sqrt2}{2}-\\frac{\\sqrt2}{2}\\delta x=0$$

Move the constant to the right-hand side:

$$\\frac{d^2\\delta x}{dt^2}+2\\frac{d\\,\\delta x}{dt}-\\frac{\\sqrt2}{2}\\,\\delta x=-\\frac{\\sqrt2}{2}$$

**Note the sign.** The coefficient on $\\delta x$ is **negative**. That means the
characteristic equation $s^2+2s-0.707=0$ has one root in the right half-plane
($s\\approx0.31$), so the linearized system is **unstable** about this operating point.
That is a real physical result, not an algebra error — it tells you $x=\\pi/4$ is not an
equilibrium the system will hold.

**Validity.** This model is good only near $x=\\pi/4$. A different operating point gives a
different slope and therefore a different equation.
`
    }
  ]
});
