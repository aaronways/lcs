/* ============================================================
   Global reference tables: shown under "Reference" in the sidebar,
   independent of any chapter. Notation follows Nise, 7e.
   ============================================================ */

registerReference({
  title: "Reference tables",
  subtitle: "Everything you are allowed to look up. Notation matches the textbook.",

  sections: [

    /* ---------------------------------------------------- */
    {
      title: "Laplace transform pairs",
      body: `
$$\\mathcal{L}\\{f(t)\\}=F(s)=\\int_{0^-}^{\\infty}f(t)e^{-st}\\,dt$$

| # | $f(t)$ | $F(s)$ |
|---|---|---|
| 1 | $\\delta(t)$ | $1$ |
| 2 | $u(t)$ | $\\dfrac{1}{s}$ |
| 3 | $t\\,u(t)$ | $\\dfrac{1}{s^{2}}$ |
| 4 | $t^{n}u(t)$ | $\\dfrac{n!}{s^{n+1}}$ |
| 5 | $e^{-at}u(t)$ | $\\dfrac{1}{s+a}$ |
| 6 | $\\sin\\omega t\\;u(t)$ | $\\dfrac{\\omega}{s^{2}+\\omega^{2}}$ |
| 7 | $\\cos\\omega t\\;u(t)$ | $\\dfrac{s}{s^{2}+\\omega^{2}}$ |

**Derived pairs** (items 6, 7 and 4 pushed through the frequency-shift theorem). These
are the ones you actually need for partial fractions:

| # | $f(t)$ | $F(s)$ |
|---|---|---|
| 8 | $e^{-at}\\sin\\omega t\\;u(t)$ | $\\dfrac{\\omega}{(s+a)^{2}+\\omega^{2}}$ |
| 9 | $e^{-at}\\cos\\omega t\\;u(t)$ | $\\dfrac{s+a}{(s+a)^{2}+\\omega^{2}}$ |
| 10 | $t\\,e^{-at}u(t)$ | $\\dfrac{1}{(s+a)^{2}}$ |
| 11 | $t^{n}e^{-at}u(t)$ | $\\dfrac{n!}{(s+a)^{n+1}}$ |

**Two traps.** Item 6 has $\\omega$ on top and item 7 has $s$ on top - mixing them turns
a cosine into a sine. Item 4 is $n!/s^{n+1}$, so $\\mathcal{L}\\{t^{2}\\}=2/s^{3}$, not
$1/s^{3}$.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Laplace transform theorems",
      body: `
| # | Theorem | Name |
|---|---|---|
| 1 | $\\mathcal{L}\\{kf(t)\\}=kF(s)$ | linearity |
| 2 | $\\mathcal{L}\\{f_{1}(t)+f_{2}(t)\\}=F_{1}(s)+F_{2}(s)$ | linearity |
| 3 | $\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)$ | frequency shift |
| 4 | $\\mathcal{L}\\{f(t-T)\\}=e^{-sT}F(s)$ | time shift |
| 5 | $\\mathcal{L}\\{f(at)\\}=\\dfrac{1}{a}F\\!\\left(\\dfrac{s}{a}\\right)$ | scaling |
| 6 | $\\mathcal{L}\\left\\{\\dfrac{df}{dt}\\right\\}=sF(s)-f(0^-)$ | differentiation |
| 7 | $\\mathcal{L}\\left\\{\\dfrac{d^{2}f}{dt^{2}}\\right\\}=s^{2}F(s)-sf(0^-)-\\dot f(0^-)$ | differentiation |
| 8 | $\\mathcal{L}\\left\\{\\dfrac{d^{n}f}{dt^{n}}\\right\\}=s^{n}F(s)-\\displaystyle\\sum_{k=1}^{n}s^{n-k}f^{(k-1)}(0^-)$ | differentiation |
| 9 | $\\mathcal{L}\\left\\{\\displaystyle\\int_{0^-}^{t}f(\\tau)\\,d\\tau\\right\\}=\\dfrac{F(s)}{s}$ | integration |
| 10 | $f(\\infty)=\\lim\\limits_{s\\to0}sF(s)$ | final value |
| 11 | $f(0^+)=\\lim\\limits_{s\\to\\infty}sF(s)$ | initial value |

**Final value theorem precondition.** Valid only if every root of the denominator of
$sF(s)$ has a negative real part. Applied to $F(s)=\\omega/(s^{2}+\\omega^{2})$ it returns
$0$, but $\\sin\\omega t$ never settles. Check the poles before you use it.

**With zero initial conditions**, theorems 6–8 collapse to: replace $d^{n}/dt^{n}$ with
$s^{n}$. That is the whole trick behind the transfer function.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Partial fraction expansion",
      body: `
**Step 0.** If $\\deg N(s)\\ge\\deg D(s)$, do polynomial long division first. Leftover
quotient terms invert to $\\delta(t)$ and its derivatives.

**Case 1: real, distinct roots.**

$$F(s)=\\frac{N(s)}{(s+p_{1})(s+p_{2})\\cdots(s+p_{n})}=\\frac{K_{1}}{s+p_{1}}+\\cdots+\\frac{K_{n}}{s+p_{n}}$$

$$K_{m}=\\Big[(s+p_{m})F(s)\\Big]_{\\,s\\to-p_{m}} \\qquad \\text{(cover-up method)}$$

**Case 2: real, repeated roots.** A factor to the power $r$ produces $r$ terms. With
$F_{1}(s)=(s+p_{1})^{r}F(s)$:

$$K_{i}=\\frac{1}{(i-1)!}\\left.\\frac{d^{\\,i-1}F_{1}(s)}{ds^{\\,i-1}}\\right|_{s\\to-p_{1}},\\qquad 0!=1$$

**Case 3: complex or imaginary roots.** Keep the irreducible quadratic whole and give
it a *linear* numerator:

$$F(s)=\\frac{K_{1}}{s+p_{1}}+\\frac{K_{2}s+K_{3}}{s^{2}+as+b}$$

Get $K_{1}$ by cover-up, then clear fractions and balance coefficients of like powers of
$s$. Complete the square and match against pairs 8 and 9:

$$\\mathcal{L}\\{Ae^{-at}\\cos\\omega t+Be^{-at}\\sin\\omega t\\}=\\frac{A(s+a)+B\\omega}{(s+a)^{2}+\\omega^{2}}$$
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Electrical components",
      body: `
| Component | Voltage–current | Current–voltage | Voltage–charge | $Z(s)$ | $Y(s)$ |
|---|---|---|---|---|---|
| Resistor $R$ | $v=Ri$ | $i=\\dfrac{1}{R}v$ | $v=R\\dfrac{dq}{dt}$ | $R$ | $\\dfrac{1}{R}$ |
| Capacitor $C$ | $v=\\dfrac{1}{C}\\displaystyle\\int_{0}^{t}i\\,d\\tau$ | $i=C\\dfrac{dv}{dt}$ | $v=\\dfrac{1}{C}q$ | $\\dfrac{1}{Cs}$ | $Cs$ |
| Inductor $L$ | $v=L\\dfrac{di}{dt}$ | $i=\\dfrac{1}{L}\\displaystyle\\int_{0}^{t}v\\,d\\tau$ | $v=L\\dfrac{d^{2}q}{dt^{2}}$ | $Ls$ | $\\dfrac{1}{Ls}$ |

Units: $v$ volts, $i$ amps, $q$ coulombs, $R$ ohms, $L$ henries, $C$ farads.

**Combination rules** (same as resistive circuits once you are in impedance form):

$$Z_{\\text{series}}=Z_{1}+Z_{2},\\qquad
Z_{\\text{parallel}}=\\frac{Z_{1}Z_{2}}{Z_{1}+Z_{2}},\\qquad
V_{\\text{out}}=V_{\\text{in}}\\frac{Z_{2}}{Z_{1}+Z_{2}}$$

**Mesh equations by inspection (KVL):**

$$\\left[\\begin{array}{c}\\text{sum of impedances}\\\\ \\text{around mesh }k\\end{array}\\right]I_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{impedances shared}\\\\ \\text{by mesh }k\\text{ and }j\\end{array}\\right]I_{j}(s)
=\\left[\\begin{array}{c}\\text{applied voltages}\\\\ \\text{around mesh }k\\end{array}\\right]$$

**Node equations by inspection (KCL):**

$$\\left[\\begin{array}{c}\\text{sum of admittances}\\\\ \\text{at node }k\\end{array}\\right]V_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{admittances between}\\\\ \\text{node }k\\text{ and }j\\end{array}\\right]V_{j}(s)
=\\left[\\begin{array}{c}\\text{applied currents}\\\\ \\text{into node }k\\end{array}\\right]$$

Diagonal positive, off-diagonal negative, matrix symmetric. If it is not symmetric, you
made a mistake.

**Ideal operational amplifier:**

$$\\text{Inverting: }\\;\\frac{V_{o}(s)}{V_{i}(s)}=-\\frac{Z_{2}(s)}{Z_{1}(s)}
\\qquad\\qquad
\\text{Noninverting: }\\;\\frac{V_{o}(s)}{V_{i}(s)}=\\frac{Z_{1}(s)+Z_{2}(s)}{Z_{1}(s)}$$
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Translational mechanical components",
      body: `
| Component | Force–velocity | Force–displacement | Impedance $Z_{M}(s)=\\dfrac{F(s)}{X(s)}$ |
|---|---|---|---|
| Spring $K$ | $f(t)=K\\displaystyle\\int_{0}^{t}v(\\tau)\\,d\\tau$ | $f(t)=Kx(t)$ | $K$ |
| Viscous damper $f_{v}$ | $f(t)=f_{v}v(t)$ | $f(t)=f_{v}\\dfrac{dx}{dt}$ | $f_{v}s$ |
| Mass $M$ | $f(t)=M\\dfrac{dv}{dt}$ | $f(t)=M\\dfrac{d^{2}x}{dt^{2}}$ | $Ms^{2}$ |

Units: $f$ newtons, $x$ meters, $v$ m/s, $K$ N/m, $f_{v}$ N-s/m, $M$ kg.

**Equations of motion by inspection:**

$$\\left[\\begin{array}{c}\\text{sum of impedances}\\\\ \\text{connected to the motion at }x_{k}\\end{array}\\right]X_{k}(s)
-\\sum_{j\\ne k}\\left[\\begin{array}{c}\\text{impedances between}\\\\ x_{k}\\text{ and }x_{j}\\end{array}\\right]X_{j}(s)
=\\left[\\begin{array}{c}\\text{applied forces}\\\\ \\text{at }x_{k}\\end{array}\\right]$$

**Force–voltage analogy**: this is why the two patterns above are identical:

| Mechanical | Electrical |
|---|---|
| force $f$ | voltage $v$ |
| velocity $v$ | current $i$ |
| displacement $x$ | charge $q$ |
| spring $K$ | inverse capacitance $1/C$ |
| viscous damper $f_{v}$ | resistance $R$ |
| mass $M$ | inductance $L$ |

**Most common error.** A spring or damper connecting two masses appears on *both*
diagonal terms **and** on the off-diagonal term. Leaving it off one diagonal is the
mistake that shows up most often.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Algebra you will need",
      body: `
**Quadratic formula and discriminant.** For $as^{2}+bs+c=0$:

$$s=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$$

| Discriminant $b^{2}-4ac$ | Roots | Response |
|---|---|---|
| $>0$ | real, distinct | overdamped: sum of exponentials |
| $=0$ | real, repeated | critically damped: includes a $te^{-at}$ term |
| $<0$ | complex conjugate | underdamped: damped sinusoid |

**Completing the square.**

$$s^{2}+as+b=\\left(s+\\frac{a}{2}\\right)^{2}+\\left(b-\\frac{a^{2}}{4}\\right)$$

so the shift is $a/2$ and $\\omega=\\sqrt{b-a^{2}/4}$. Example:
$s^{2}+4s+13=(s+2)^{2}+3^{2}$.

**Determinants.**

$$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc
\\qquad
\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}
=a\\begin{vmatrix}e&f\\\\h&i\\end{vmatrix}
-b\\begin{vmatrix}d&f\\\\g&i\\end{vmatrix}
+c\\begin{vmatrix}d&e\\\\g&h\\end{vmatrix}$$

**Cramer's rule.** For $\\mathbf{A}\\mathbf{x}=\\mathbf{b}$:

$$x_{k}=\\frac{\\det\\mathbf{A}_{k}}{\\det\\mathbf{A}}$$

where $\\mathbf{A}_{k}$ is $\\mathbf{A}$ with its $k$th **column** replaced by
$\\mathbf{b}$. Use it when you want only one unknown - the output variable.

**Combining a sine and cosine of the same frequency.**

$$A\\cos\\theta+B\\sin\\theta=R\\cos(\\theta-\\phi),\\qquad
R=\\sqrt{A^{2}+B^{2}},\\quad \\phi=\\arctan\\!\\frac{B}{A}$$

**Complex numbers.** $s=\\sigma+j\\omega$, $|s|=\\sqrt{\\sigma^{2}+\\omega^{2}}$,
$\\angle s=\\arctan(\\omega/\\sigma)$, and
$\\dfrac{1}{a+jb}=\\dfrac{a-jb}{a^{2}+b^{2}}$.

A pole at $s=-\\sigma\\pm j\\omega$ produces the time term
$e^{-\\sigma t}\\cos(\\omega t+\\phi)$: real part sets decay, imaginary part sets
oscillation frequency.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Linearization",
      body: `
**Taylor series about an operating point $x_{0}$:**

$$f(x)=f(x_{0})+\\left.\\frac{df}{dx}\\right|_{x_{0}}\\frac{(x-x_{0})}{1!}
+\\left.\\frac{d^{2}f}{dx^{2}}\\right|_{x_{0}}\\frac{(x-x_{0})^{2}}{2!}+\\cdots$$

Truncate after the linear term:

$$f(x)-f(x_{0})\\approx m_{a}\\,\\delta x,\\qquad
m_{a}=\\left.\\frac{df}{dx}\\right|_{x=x_{0}},\\qquad \\delta x=x-x_{0}$$

**Procedure.**

1. Write the nonlinear differential equation.
2. Find the operating point: set the small-signal input to zero, set all derivatives to
   zero, solve the resulting algebraic equation.
3. Substitute $x=x_{0}+\\delta x$. Since $x_{0}$ is constant,
   $\\dfrac{d(x_{0}+\\delta x)}{dt}=\\dfrac{d\\,\\delta x}{dt}$ - derivative terms pass
   through unchanged.
4. Replace each nonlinear term by its linear approximation; drop higher-order terms.
5. Laplace transform with zero initial conditions and form the transfer function.

**Common derivatives for step 4:**

$$\\frac{d}{dx}\\sin x=\\cos x,\\quad
\\frac{d}{dx}\\cos x=-\\sin x,\\quad
\\frac{d}{dx}e^{ax}=ae^{ax},\\quad
\\frac{d}{dx}\\ln x=\\frac{1}{x},\\quad
\\frac{d}{dx}x^{n}=nx^{n-1}$$

**Small-angle results** (Taylor about $0$): $\\sin\\theta\\approx\\theta$,
$\\cos\\theta\\approx1$, $\\tan\\theta\\approx\\theta$, $e^{\\theta}\\approx1+\\theta$,
$\\ln(1+\\theta)\\approx\\theta$. Radians only.

The result is valid **only near the chosen operating point**, and it relates
*deviations*, not absolute values.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Non-calculator toolkit",
      body: `
On a closed-book, no-calculator exam the algebra is the exam. Every one of these should
be automatic before you sit down.

### Never write a decimal

An exact answer is the answer. $\\sqrt2$, $\\dfrac{-3+\\sqrt5}{2}$, $2\\sqrt3$,
$\\dfrac{5}{8}$ are finished. Converting them to $1.414$, $-0.382$, $3.46$, $0.625$ costs
you a tool you do not have and gains nothing.

### Factoring $s^{2}+bs+c$ by inspection

Find two numbers that **multiply to $c$** and **add to $b$**. Run through the factor
pairs of $c$ in your head:

| Quadratic | Pairs of $c$ | Which sums to $b$ | Factors |
|---|---|---|---|
| $s^{2}+5s+6$ | $1{\\cdot}6,\\;2{\\cdot}3$ | $2+3=5$ | $(s+2)(s+3)$ |
| $s^{2}+7s+12$ | $1{\\cdot}12,\\;2{\\cdot}6,\\;3{\\cdot}4$ | $3+4=7$ | $(s+3)(s+4)$ |
| $s^{2}+6s+8$ | $1{\\cdot}8,\\;2{\\cdot}4$ | $2+4=6$ | $(s+2)(s+4)$ |
| $s^{2}-3s+2$ | $(-1)(-2)$ | $-1-2=-3$ | $(s-1)(s-2)$ |

**Signs:** $c>0$ means both factors share $b$'s sign. $c<0$ means the factors have
opposite signs. A negative $b$ with positive $c$ gives **positive roots** - that is the
instability tell.

### Decide factorable vs irreducible in one step

Compute $b^{2}-4ac$ first, before trying to factor:

| $b^{2}-4ac$ | Roots | What to do |
|---|---|---|
| perfect square ($0,1,4,9,16,25,\\dots$) | rational | factor by inspection |
| positive, not a perfect square | real irrational | quadratic formula, leave the surd |
| zero | repeated | $(s+\\tfrac{b}{2})^{2}$: Case 2 partial fractions |
| negative | complex | **do not factor**: complete the square, Case 3 |

### Simplifying surds

Pull out the largest perfect square: $\\sqrt{12}=\\sqrt{4\\cdot3}=2\\sqrt3$,
$\\sqrt{18}=3\\sqrt2$, $\\sqrt{50}=5\\sqrt2$, $\\sqrt{75}=5\\sqrt3$.

Rationalize by moving the root to the top:
$\\sqrt{\\dfrac{10}{3}}=\\dfrac{\\sqrt{10}}{\\sqrt3}=\\dfrac{\\sqrt{30}}{3}$, and
$\\dfrac{1}{\\sqrt2}=\\dfrac{\\sqrt2}{2}$.

Bound a surd without evaluating it: $2<\\sqrt5<3$ because $2^{2}=4$ and $3^{2}=9$. That
is enough to fix the sign of $-3+\\sqrt5$.

### Exact values you must know

$$\\sqrt2\\;(\\approx\\!1.41),\\quad \\sqrt3\\;(\\approx\\!1.73),\\quad \\sqrt5,\\quad
\\frac{1}{\\sqrt2}=\\frac{\\sqrt2}{2},\\quad \\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$$

| $\\theta$ | $\\sin$ | $\\cos$ | $\\tan$ |
|---|---|---|---|
| $0$ | $0$ | $1$ | $0$ |
| $30^{\\circ}=\\pi/6$ | $\\tfrac12$ | $\\tfrac{\\sqrt3}{2}$ | $\\tfrac{\\sqrt3}{3}$ |
| $45^{\\circ}=\\pi/4$ | $\\tfrac{\\sqrt2}{2}$ | $\\tfrac{\\sqrt2}{2}$ | $1$ |
| $60^{\\circ}=\\pi/3$ | $\\tfrac{\\sqrt3}{2}$ | $\\tfrac12$ | $\\sqrt3$ |
| $90^{\\circ}=\\pi/2$ | $1$ | $0$ | - |

So $\\arctan(1)=45^{\\circ}$, $\\arctan(\\sqrt3)=60^{\\circ}$,
$\\arctan\\!\\left(\\tfrac{\\sqrt3}{3}\\right)=30^{\\circ}$. Any other arctangent should be
left written as $\\arctan(B/A)$: you are not expected to evaluate it.

### Clearing compound fractions

Multiply top and bottom by the inner denominator. Dividing by $\\tfrac12 s$ means
multiplying by $\\dfrac{2}{s}$: a factor-of-4 trap if you write $\\dfrac{1}{2s}$.

$$\\frac{a}{\\;\\dfrac{b}{c}\\;}=\\frac{ac}{b},\\qquad
\\frac{\\tfrac{2}{s}}{s+3+\\tfrac{2}{s}}\\;\\xrightarrow{\\;\\times s\\;}\\;\\frac{2}{s^{2}+3s+2}$$

### Expanding products you will meet constantly

$$(a+b)^{2}=a^{2}+2ab+b^{2},\\qquad
\\left(s^{2}+s\\right)^{2}=s^{4}+2s^{3}+s^{2}$$

For $\\left(s^{2}+as+b\\right)\\left(s^{2}+as+c\\right)$, substitute $u=s^{2}+as$ and
expand $(u+b)(u+c)=u^{2}+(b+c)u+bc$ before putting $u$ back. This turns a four-term slog
into two easy steps and is worth doing every time a $2\\times2$ mechanical determinant
appears.

### Sign discipline in cover-up residues

Evaluate the denominator one factor at a time, writing each value down:

$$K=\\left.\\frac{10}{s(s+2)}\\right|_{s=-5}:\\quad s=-5,\\quad s+2=-3,\\quad (-5)(-3)=+15$$

Negative times negative is positive. More residues are lost to this than to any concept.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Attacking a problem you have never seen",
      body: `
An exam built to test *application* gives you an unfamiliar physical setup and expects
you to recognize which known tool it maps onto. The setups are unlimited; the tools are
not. There are only about six.

### The tools, and the trigger for each

| If the problem gives you… | Reach for |
|---|---|
| a differential equation and initial conditions | Laplace with the IC terms kept (2.2) |
| a differential equation, asked for $G(s)$ | zero-IC substitution $d^{n}/dt^{n}\\to s^{n}$ (2.3) |
| an $F(s)$, asked for $f(t)$ | order check, then partial fractions (2.2) |
| a circuit | impedances, then mesh or nodal by inspection (2.4) |
| masses, springs, dampers | mechanical impedances, same matrix pattern (2.5) |
| a squared, logged, trig or product term | linearize about the operating point (2.11) |
| measured response data | transform it, divide by the input transform (2.3) |

### The order of operations that never changes

1. **Name the input and the output explicitly.** Write "input = $x_{1}$, output = $x_{2}$"
   before anything else. Many wrong answers are correct transfer functions of the wrong
   pair.
2. **Check for nonlinearity.** Any power, product, root, trig, exponential or log of a
   variable means linearize first: everything downstream assumes linearity.
3. **Convert to impedances.** $R,\\;Ls,\\;1/Cs$ or $K,\\;f_{v}s,\\;Ms^{2}$.
4. **Count the unknowns.** That is how many equations you need: meshes, independent
   nodes, or independently movable masses.
5. **Write the matrix by inspection**, diagonal positive and off-diagonal negative.
6. **Cramer's rule for the one unknown you actually want.**
7. **Check before you write the final line.**

### Free checks that cost ten seconds and catch most errors

- **Symmetry.** The mesh, node and mechanical matrices are always symmetric. If the
  off-diagonals do not match, stop.
- **Order.** Denominator order = number of energy-storage elements. Two masses → fourth
  order. A three-element $RLC$ loop → second order.
- **DC, at $s=0$.** Capacitors open, inductors short, dampers vanish, masses vanish. Ask
  what the system physically does under a constant input and compare.
- **High frequency, as $s\\to\\infty$.** Capacitors short, inductors open. The limit should
  be finite and sensible.
- **Signs.** A stable system's exponentials are all $e^{-\\text{positive}\\cdot t}$.
- **Initial and final value theorems** against your time-domain answer: and check the
  final value theorem's pole precondition before using it.

### When the setup is genuinely unfamiliar

Ask what each element *responds to*, not what it is called.

- A spring or damper connecting two moving points responds to the **difference** of those
  motions. A mass responds to **absolute** acceleration. That single distinction is the
  whole of base-excitation problems.
- An element tied to **ground** touches one diagonal only and never the off-diagonal.
- Non-adjacent meshes share nothing, so their matrix entry is exactly zero.
- If the input is a displacement rather than a force, the right-hand side becomes an
  operator acting on the input: and that is what puts zeros in the numerator.

### If you are stuck

Write the general symbolic result first ($M$, $f_{v}$, $K$ rather than $1$, $4$, $3$) and
substitute numbers at the very end. Symbols make the structure visible, make the dc check
trivial, and mean an arithmetic slip does not destroy the derivation.
`
    },

    /* ---------------------------------------------------- */
    {
      title: "Standard test inputs",
      body: `
| Input | $f(t)$ | $F(s)$ | Used to evaluate |
|---|---|---|---|
| Impulse | $\\delta(t)$ | $1$ | transient response, modeling |
| Step | $u(t)$ | $\\dfrac{1}{s}$ | transient response, steady-state error |
| Ramp | $t\\,u(t)$ | $\\dfrac{1}{s^{2}}$ | steady-state error |
| Parabola | $\\tfrac{1}{2}t^{2}u(t)$ | $\\dfrac{1}{s^{3}}$ | steady-state error |
| Sinusoid | $\\sin\\omega t$ | $\\dfrac{\\omega}{s^{2}+\\omega^{2}}$ | transient response, modeling, steady-state error |

The step dominates because both the transient and steady-state portions of the response
are visible on one plot. The impulse is used for modeling because it deposits energy and
then leaves, so what remains is the system's own behavior.
`
    }
  ]
});
