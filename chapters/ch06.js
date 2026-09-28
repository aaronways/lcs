/* ===========================================================================
   NEXUS - Chapter 6: Stability
   Nise, Control Systems Engineering, 7e, sections 6.1-6.5.
   Every LaTeX backslash inside these template literals is doubled.
   =========================================================================== */
registerChapter({
  id: 6,
  title: "Stability",
  sections: "6.1–6.5",
  brief: `Stability is the requirement the other two rest on. A system whose natural response grows has
no settling time to trim and no steady-state error to reduce. The question this chapter answers
is narrow: are all the roots of the closed-loop denominator in the left half-plane? The
Routh-Hurwitz criterion answers it by counting, from the coefficients alone, how many roots sit
in the right half-plane, how many on the $j\\omega$ axis, and how many on the left. It never
locates a root, and it works just as well on a polynomial carrying an unknown gain as on one
made of numbers. Every answer here is exact.`,

  sectionList: [
    { id: "6.1", title: "Introduction" },
    { id: "6.2", title: "Routh-Hurwitz Criterion" },
    { id: "6.3", title: "Routh-Hurwitz Criterion: Special Cases" },
    { id: "6.4", title: "Routh-Hurwitz Criterion: Additional Examples" },
    { id: "6.5", title: "Stability in State Space" },
  ],

  guide: [
    {
      title: "What this chapter is for",
      sec: "6.1",
      example: "6-01",
      body: `
Nise puts stability first among the three requirements from Chapter 1: transient response,
stability, steady-state error. The order is not alphabetical. An unstable system has no
settling time to compute and no steady-state value to miss, so every specification from
Chapter 4 assumes this chapter has already been passed.

The question is narrow. Given the denominator of the closed-loop transfer function, are all of
its roots in the left half-plane? Chapter 4 answered questions like that by locating poles,
which means factoring. Factoring a fifth-order polynomial by hand is not available on a
closed-calculator exam, and for a polynomial carrying an unknown gain $K$ it is not available
at all.

### What the criterion gives, and what it withholds

It gives three counts: roots in the right half-plane, roots on the $j\\omega$ axis, roots in the
left half-plane. It gives them without solving for a single root.

It withholds the locations. $T_{s}$, $T_{p}$ and $\\%OS$ still need pole coordinates, so
Chapter 4 still needs Chapter 4. What this chapter adds is a yes or no, and a range of gain
over which the yes holds.

| Section | What it adds |
|---|---|
| 6.1 | Stability defined, and read off pole location |
| 6.2 | The Routh table and its first column |
| 6.3 | The two ways the table stalls |
| 6.4 | Gain ranges, oscillation frequencies, factoring |
| 6.5 | The same test applied to $\\det(s\\mathbf{I}-\\mathbf{A})$ |
`
    },
    {
      title: "6.1: Stability defined through the natural response",
      sec: "6.1",
      example: "6-02",
      body: `
The total response splits as

$$c(t)=c_{\\text{forced}}(t)+c_{\\text{natural}}(t)$$

and the definitions attach to the second term alone.

> A linear time-invariant system is **stable** if the natural response approaches zero as time
> approaches infinity; **unstable** if the natural response grows without bound;
> **marginally stable** if the natural response neither decays nor grows, but remains constant
> or oscillates.

Each closed-loop pole contributes one term, and its location decides which of the three that
term belongs to.

| Closed-loop pole | Term in the natural response | Behaviour |
|---|---|---|
| real, left half-plane, $-a$ | $e^{-at}$ | decays |
| complex, left half-plane, $-\\sigma\\pm j\\omega$ | $e^{-\\sigma t}\\cos(\\omega t+\\phi)$ | decays |
| repeated, left half-plane | $t^{n}e^{-at}$ | decays |
| origin, multiplicity 1 | constant | neither |
| $\\pm j\\omega$, multiplicity 1 | $\\cos(\\omega t+\\phi)$ | neither |
| $\\pm j\\omega$, multiplicity greater than 1 | $t^{n}\\cos(\\omega t+\\phi)$ | grows |
| right half-plane, $+a$ or $\\sigma\\pm j\\omega$ with $\\sigma>0$ | $e^{at}$, $e^{\\sigma t}\\cos(\\omega t+\\phi)$ | grows |

Collecting the rows:

> **Stable**: every closed-loop pole in the left half-plane.
> **Marginally stable**: left-half-plane poles plus $j\\omega$ poles of multiplicity 1.
> **Unstable**: at least one right-half-plane pole, or a $j\\omega$ pole of multiplicity greater
> than 1.

Two details carry weight. Repetition is harmless in the left half-plane, because $t^{n}e^{-at}$
still decays; it is fatal on the axis, where nothing damps the $t^{n}$. And the poles that
matter are the **closed-loop** poles. Chapter 5 showed that feedback relocates poles, and it
moves them in both directions: 6-08 starts from a plant whose poles are all in the left
half-plane and closes a loop that is unstable, while 6-21 starts from a plant with a
right-half-plane pole and closes a loop that is stable.
`
    },
    {
      title: "6.1: Stability defined through bounded inputs",
      sec: "6.1",
      example: "6-03",
      body: `
Separating the natural response from a measured total response is difficult, so Nise gives a
second pair of definitions that look only at what goes in and what comes out.

> A system is **stable** if every bounded input yields a bounded output.
> A system is **unstable** if any bounded input yields an unbounded output.

This is the **bounded-input, bounded-output**, or BIBO, definition.

The two sets of definitions agree everywhere except on the marginal case. A marginally stable
system is well behaved for most bounded inputs and not for one of them:

- a pole pair at $\\pm j\\omega_{0}$ and an input $\\sin\\omega_{0}t$ produce a repeated pair in
  $C(s)$, and the response carries a $t\\cos\\omega_{0}t$ term;
- a pole at the origin and a step input do the same thing, and the response carries a $t$ term.

So marginally stable systems, which the natural-response definition keeps separate, fall under
the unstable half of the BIBO definition.

One trap sits in the phrase "unbounded output". A ramp input produces an output that grows
forever in a perfectly stable system, because the **forced** response is unbounded. Instability
is a statement about the natural response only; the BIBO form is worded around bounded inputs
precisely so that this case cannot arise.
`
    },
    {
      title: "6.1: What the coefficients alone can tell you",
      sec: "6.1",
      example: "6-06",
      body: `
Before building anything, look at the closed-loop denominator's coefficients.

Multiplying out $(s+p_{1})(s+p_{2})\\cdots(s+p_{n})$ with every $p_{i}>0$ produces sums and
products of positive numbers, so every coefficient comes out positive and none of them can be
zero. Turning that around gives a test that costs one glance:

> If the coefficients differ in sign, or if a power of $s$ is missing, the polynomial has at
> least one root that is not in the left half-plane.

The converse fails, and failing it is the reason the rest of the chapter exists.
$s^{3}+s^{2}+2s+8$ has every coefficient present and positive, and two of its three roots are
in the right half-plane (6-06).

| What you see | What it settles |
|---|---|
| a negative coefficient among positive ones | not stable |
| a missing power of $s$ | not stable |
| all present, all the same sign | nothing yet: build the table |

Used as a pre-check it sometimes ends the problem in a line, as in 6-15, where the last two
coefficients are negative.
`
    },
    {
      title: "The chapter as one procedure",
      sec: "6.1",
      example: "6-16",
      body: `
Every problem in this chapter is a walk down the same list.

1. **Write the closed-loop denominator.** Reduce the block diagram first if there is one, then
   clear the fraction in $1+G(s)H(s)=0$.
2. **Glance at the coefficients.** A missing power or a mixed sign ends it: not stable.
3. **Build the table**, scaling any row by a positive constant to keep the arithmetic in
   integers.
4. **If the first element of a row is zero and the rest of that row is not**: replace it with
   $\\epsilon$ and take signs as $\\epsilon\\to0$, or reverse the coefficients of the original
   polynomial and test that instead.
5. **If an entire row is zero**: form the even polynomial from the row above, differentiate it,
   and use those coefficients in place of the zeros.
6. **Count sign changes in the first column.** That is the number of right-half-plane roots.
   With a row of zeros, read the rows from the even polynomial down as a test of that
   polynomial alone, use its symmetry to get the $j\\omega$ count, and read the rows above it as
   a test of what is left.
7. **With a parameter in the polynomial**, require every first-column entry to be positive and
   intersect the inequalities.

Steps 4 and 5 are the only places the procedure branches, and 6-16 is the problem where both
branches occur in one table.
`
    },
    {
      title: "6.2: Building the Routh table",
      sec: "6.2",
      example: "6-05",
      body: `
The table is built from the denominator of the closed-loop transfer function. Write it as

$$a_{n}s^{n}+a_{n-1}s^{n-1}+\\cdots+a_{1}s+a_{0}$$

Label the rows $s^{n}$ down to $s^{0}$. The $s^{n}$ row takes $a_{n}$ and every other
coefficient after it; the $s^{n-1}$ row takes the ones that were skipped. For a fourth-order
denominator:

$$\\begin{array}{c|ccc}
s^{4} & a_{4} & a_{2} & a_{0}\\\\
s^{3} & a_{3} & a_{1} & 0\\\\
s^{2} & b_{1} & b_{2} & 0\\\\
s^{1} & c_{1} & 0 & 0\\\\
s^{0} & d_{1} & 0 & 0
\\end{array}$$

Every remaining entry is a $2\\times2$ determinant built from the two rows above it, divided by
the first element of the row directly above, with a minus sign in front:

$$b_{1}=\\frac{-\\begin{vmatrix}a_{4}&a_{2}\\\\a_{3}&a_{1}\\end{vmatrix}}{a_{3}},\\qquad
b_{2}=\\frac{-\\begin{vmatrix}a_{4}&a_{0}\\\\a_{3}&0\\end{vmatrix}}{a_{3}},\\qquad
c_{1}=\\frac{-\\begin{vmatrix}a_{3}&a_{1}\\\\b_{1}&b_{2}\\end{vmatrix}}{b_{1}}$$

In words: the left column of the determinant is the first column of those two rows, and the
right column is the pair one step to the right of the entry being computed. Entries past the
end of a row are zero, so the table narrows to a single column by the $s^{0}$ row.

### Scaling rows

Any row may be multiplied by a **positive** constant without changing anything below it. Use it
to clear fractions: an $s^{3}$ row of $3,\\;6$ becomes $1,\\;2$, and every entry below shrinks by
the same positive factor, so no sign changes.

Multiplying by a negative constant is a different matter: it flips signs in the first column and
changes the count. In 6-09 an entire row comes out negative, and it has to stay that way.

### The check that costs nothing

The $s^{0}$ entry always reproduces $a_{0}$, up to the positive scalings applied along the way.
If it does not, an arithmetic slip happened above it.
`
    },
    {
      title: "6.2: Reading the first column",
      sec: "6.2",
      example: "6-07",
      body: `
> The number of roots of the polynomial in the right half-plane equals the number of sign
> changes in the first column of the Routh table.

No sign changes means no right-half-plane roots. If no special case from 6.3 appeared, nothing
is on the $j\\omega$ axis either, so the remaining roots are all in the left half-plane and the
system is stable.

Count **changes**, not negative entries. One negative entry between two positives is two
changes, which is the most common pattern in this chapter: two right-half-plane roots, a complex
pair that has crossed the axis.

| First column | Sign changes | Roots in the right half-plane |
|---|---|---|
| $+,+,+,+$ | 0 | 0 |
| $+,+,-,+$ | 2 | 2 |
| $+,-,-,+$ | 2 | 2 |
| $+,+,-,+,-,+$ | 4 | 4 |

The last row is 6-09, where two negative entries produce four sign changes.

The counts have to add up to the degree. A fourth-order denominator with two sign changes and
no special case has two roots in the right half-plane and two in the left. Use that as the
closing check on every problem.
`
    },
    {
      title: "6.2: Which polynomial goes into the table",
      sec: "6.2",
      example: "6-10",
      body: `
Not the plant. The table tests the denominator of the closed-loop transfer function. For the
single-loop system,

$$T(s)=\\frac{G(s)}{1+G(s)H(s)}$$

so the closed-loop poles are the roots of

$$1+G(s)H(s)=0$$

Clear the fraction before building anything. With $G(s)H(s)=N(s)/D(s)$, the denominator is

$$D(s)+N(s)$$

Two consequences are worth carrying.

**Only the product $GH$ appears.** A pole in the feedback path counts exactly as a pole in the
forward path would. Problems 6-08 and 6-10 put the same first-order lag in different places and
get the identical set of closed-loop poles; what differs is the zeros of $T(s)$, which the
criterion never looks at.

**Reduce, then test.** For a diagram with a minor loop, collapse the inner loop to a single
block by the Chapter 5 formula, then write $1+GH$ for what remains (6-27).
`
    },
    {
      title: "6.3: Zero only in the first column",
      sec: "6.3",
      example: "6-12",
      body: `
Every entry is divided by the first element of the row above it, so a zero in that position
stops the table. Nise gives two ways through.

### The epsilon method

Replace the zero with $\\epsilon$ and carry on. Entries below become rational functions of
$\\epsilon$, and only their signs as $\\epsilon\\to0$ matter. With $\\epsilon$ small and positive,
a $1/\\epsilon$ term dominates whatever it is added to:

$$2-\\frac{3}{\\epsilon}<0,\\qquad 2+\\frac{2}{\\epsilon}>0$$

The number of sign changes comes out the same whether $\\epsilon$ is taken positive or negative.
Individual entries flip, and the count does not. Problem 6-12 runs both columns to show it.

### The reverse-coefficient method

Write the coefficients of the original polynomial in reverse order and build the table for that
polynomial instead. Substituting $s=1/d$ into $D(s)$ and multiplying through by $d^{n}$ produces
exactly that reversed list, so the reversed polynomial has the **reciprocal** roots of the
original. Reciprocals do not cross the axis:

$$\\frac{1}{\\sigma+j\\omega}=\\frac{\\sigma-j\\omega}{\\sigma^{2}+\\omega^{2}}$$

whose real part carries the sign of $\\sigma$. The right-half-plane count is therefore identical,
and the zero in the first column usually does not recur.

Nise notes the reversed table is usually less arithmetic than carrying $\\epsilon$, and 6-13
against 6-17 is the comparison: a first column of $1,\\;1,\\;2,\\;\\tfrac32,\\;-\\tfrac13,\\;1$ on one
side, nested limits in $\\epsilon$ on the other.
`
    },
    {
      title: "6.3: An entire row of zeros",
      sec: "6.3",
      example: "6-14",
      body: `
A row of zeros appears when a purely even or purely odd polynomial divides the original. Even
polynomials have roots that are symmetric about the origin, which can happen three ways:

- symmetric and real, $\\pm a$;
- symmetric and imaginary, $\\pm j\\omega$;
- quadrantal, $\\pm\\sigma\\pm j\\omega$, all four at once.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 250" class="nx-fig">
  <defs><marker id="nx6sym" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M30 125 L350 125" fill="none" stroke="currentColor" stroke-width="1.4" marker-end="url(#nx6sym)"/>
  <path d="M190 235 L190 20" fill="none" stroke="currentColor" stroke-width="1.4" marker-end="url(#nx6sym)"/>
  <text x="344" y="144" font-size="13">&#963;</text>
  <text x="200" y="28" font-size="13">j&#969;</text>
  <path d="M105 120 L115 130 M115 120 L105 130" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M265 120 L275 130 M275 120 L265 130" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="96" y="152" font-size="12">A</text>
  <text x="266" y="152" font-size="12">A</text>
  <path d="M185 50 L195 60 M195 50 L185 60" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M185 190 L195 200 M195 190 L185 200" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="202" y="58" font-size="12">B</text>
  <text x="202" y="206" font-size="12">B</text>
  <path d="M125 70 L135 80 M135 70 L125 80" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M245 70 L255 80 M255 70 L245 80" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M125 170 L135 180 M135 170 L125 180" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M245 170 L255 180 M255 170 L245 180" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="112" y="68" font-size="12">C</text>
  <text x="256" y="68" font-size="12">C</text>
  <text x="112" y="196" font-size="12">C</text>
  <text x="256" y="196" font-size="12">C</text>
</svg>
<figcaption>Roots of an even polynomial: symmetric and real (A), symmetric and imaginary (B), or quadrantal (C). Any combination of the three also gives an even polynomial.</figcaption>
</figure>

### The procedure

Return to the row **above** the row of zeros and read its entries as the coefficients of a
polynomial $P(s)$, starting at the power in that row's label and skipping every other power.
An $s^{4}$ row of $1,\\;5,\\;4$ gives

$$P(s)=s^{4}+5s^{2}+4$$

Differentiate, and put the coefficients of $dP/ds$ where the zeros were. Then continue as
usual. Nise also calls $P(s)$ the auxiliary polynomial; the rest of this chapter uses "even
polynomial".

### Reading the finished table

- $P(s)$ **divides** the original polynomial. That is what 6-23 exploits to factor.
- From the row holding $P(s)$ down to the end, the table tests $P(s)$ and nothing else. Sign
  changes there count $P$'s right-half-plane roots; symmetry puts the same number in the left
  half-plane; whatever is left over sits on the $j\\omega$ axis.
- The rows above that one test the remaining factor.
- **Without a row of zeros there are no $j\\omega$ roots at all.** The row of zeros is the only
  announcement the table makes about the axis.

The last point is where 6-18 lives: a first column with no sign changes and a row of zeros
partway down reports marginal stability, and a reader who stops at "no sign changes" calls it
stable.
`
    },
    {
      title: "6.4: The range of gain that keeps a system stable",
      sec: "6.4",
      example: "6-20",
      body: `
With an unknown $K$ in the loop, the closed-loop denominator carries $K$ and so do the table
entries. Nothing about the procedure changes:

1. reduce, then clear the fraction in $1+GH=0$;
2. build the table with $K$ carried symbolically;
3. require every first-column entry to be positive;
4. intersect the inequalities.

For a third-order denominator the table collapses to a rule worth memorising, since most
gain-range problems in this chapter and on exams are third order:

$$s^{3}+a_{2}s^{2}+a_{1}s+a_{0}\\ \\text{is stable}\\iff a_{2}>0,\\quad a_{0}>0,\\quad a_{2}a_{1}>a_{0}$$

The $s^{1}$ entry is $(a_{2}a_{1}-a_{0})/a_{2}$, so the third condition is the whole content of
the table. For a second-order denominator it degenerates further, to "all coefficients
positive", which is why nothing in Chapter 4 ever needed a Routh table.

### The boundary is an oscillation

At the value of $K$ that drives a first-column entry to zero, that row becomes a row of zeros,
the even polynomial appears, and its roots are on the $j\\omega$ axis. The system oscillates
without decaying. Reading the row above the zeros,

$$P(s)=\\alpha s^{2}+\\beta=0\\qquad\\Longrightarrow\\qquad \\omega=\\sqrt{\\beta/\\alpha}$$

That frequency is the one number in this chapter with units attached, and it is the standard
second half of a gain-range question: find $K$ for marginal stability, then find how fast the
system rings at that gain.
`
    },
    {
      title: "6.4: Factoring with the table",
      sec: "6.4",
      example: "6-23",
      body: `
The even polynomial that produced a row of zeros is a factor of the original. That makes the
Routh table an exact factoring tool in the one case where it applies.

Given a quartic that produces a row of zeros with $P(s)=s^{2}+4$, divide:

$$\\frac{s^{4}+3s^{3}+6s^{2}+12s+8}{s^{2}+4}=s^{2}+3s+2=(s+1)(s+2)$$

and the quartic is factored completely, with no root-finding anywhere. Long division by a
quadratic is two steps, and the remainder must come out zero; if it does not, the even
polynomial was read off the wrong row.

This is the only route in the chapter from a polynomial to its actual roots, and it is available
only when a row of zeros appears.
`
    },
    {
      title: "6.4: Two parameters, minor loops, and a shifted axis",
      sec: "6.4",
      example: "6-24",
      body: `
Three variations show up often enough to rehearse.

### Two unknowns

Each first-column entry still gives one inequality; with two symbols the solution set is a
region rather than an interval. In 6-25 the conditions are $K(4-a)/4>0$ and $Ka>0$, which for
positive $K$ reduce to $0<a<4$: the controller's zero has to sit between the origin and the
plant's pole at $-4$, and no amount of gain substitutes for putting it there.

### Minor loops

Collapse the inner loop first, by the Chapter 5 formula, then write $1+GH$ for the outer loop.
Rate feedback contributes a factor of $s$, so its gain lands in the $s^{1}$ coefficient of the
closed-loop denominator. For a third-order system that is exactly the coefficient $a_{1}$ in
$a_{2}a_{1}>a_{0}$, which is why a tachometer stabilises a loop that gain alone cannot (6-27).

### A line other than the imaginary axis

The criterion counts roots to the right of the imaginary axis. To count roots to the right of
the vertical line $s=-\\sigma_{0}$, substitute

$$s=z-\\sigma_{0}$$

expand, and apply the same table to the polynomial in $z$. No sign changes now means every root
has $\\sigma\\ge\\sigma_{0}$, which by the Chapter 4 estimate means

$$T_{s}\\le\\frac{4}{\\sigma_{0}}$$

for every mode in the system, not just the dominant pair. Problem 6-24 turns a settling-time
specification into a gain range this way. The criterion is unchanged; only the variable moved.
`
    },
    {
      title: "6.5: Stability from the system matrix",
      sec: "6.5",
      example: "6-28",
      body: `
State-space models are Chapter 3 material, and the course reaches them at the end of the
semester. Section 6.5 needs exactly one fact from there.

A state-space model is written

$$\\dot{\\mathbf{x}}=\\mathbf{A}\\mathbf{x}+\\mathbf{B}u,\\qquad y=\\mathbf{C}\\mathbf{x}+Du$$

Chapter 3 derives the transfer function from those equations, and its denominator is
$\\det(s\\mathbf{I}-\\mathbf{A})$. So the poles are the eigenvalues of $\\mathbf{A}$: the roots of

$$\\det(s\\mathbf{I}-\\mathbf{A})=0$$

Everything in 6.1 through 6.4 then applies without modification, because what arrives is an
ordinary polynomial.

### The procedure

1. Form $s\\mathbf{I}-\\mathbf{A}$: put $s$ on the diagonal and subtract $\\mathbf{A}$.
2. Expand the determinant by cofactors along whichever row or column has the most zeros. The
   $3\\times3$ expansion is on the reference sheet.
3. Build the Routh table for the result.

### What is different in practice

The arithmetic moves to the determinant. For the matrices in this section the resulting cubic
usually has no rational root, so factoring is not an option and the table is the only route
(6-28).

Coupling decides the answer, not the diagonal. Every diagonal entry of $\\mathbf{A}$ can be
negative, meaning every state decays when left alone, while the off-diagonal terms form a loop
whose gain puts a root in the right half-plane (6-29). A parameter anywhere in $\\mathbf{A}$ is
handled like any other parameter: carry it through the determinant and into the table (6-30).
`
    },
  ],

  formulas: [
    { latex: `T(s)=\\frac{G(s)}{1+G(s)H(s)}\\quad\\Longrightarrow\\quad 1+G(s)H(s)=0`,
      note: "The closed-loop poles are the roots of this equation. Clear the fraction first: with $GH=N/D$, the polynomial to test is $D(s)+N(s)$." },
    { latex: `\\begin{array}{c|ccc} s^{4} & a_{4} & a_{2} & a_{0}\\\\ s^{3} & a_{3} & a_{1} & 0\\\\ s^{2} & b_{1} & b_{2} & 0\\\\ s^{1} & c_{1} & 0 & 0\\\\ s^{0} & d_{1} & 0 & 0\\end{array}`,
      note: "Rows run from $s^{n}$ down to $s^{0}$. The first row takes $a_{n}$ and every other coefficient; the second takes the skipped ones." },
    { latex: `b_{1}=\\frac{-\\begin{vmatrix}a_{4}&a_{2}\\\\a_{3}&a_{1}\\end{vmatrix}}{a_{3}},\\qquad b_{2}=\\frac{-\\begin{vmatrix}a_{4}&a_{0}\\\\a_{3}&0\\end{vmatrix}}{a_{3}},\\qquad c_{1}=\\frac{-\\begin{vmatrix}a_{3}&a_{1}\\\\b_{1}&b_{2}\\end{vmatrix}}{b_{1}}`,
      note: "First column of the two rows above on the left, the entries one step to the right on the right, over the first element of the row above, negated." },
    { latex: `\\text{roots in the right half-plane}=\\text{sign changes in the first column}`,
      note: "Count changes, not negative entries. A single negative entry between positives is two changes." },
    { latex: `s^{2}+a_{1}s+a_{0}:\\quad\\text{stable}\\iff a_{1}>0,\\ a_{0}>0`,
      note: "Second order only. Raising a positive gain can never destabilise a second-order loop." },
    { latex: `s^{3}+a_{2}s^{2}+a_{1}s+a_{0}:\\quad\\text{stable}\\iff a_{2}>0,\\ a_{0}>0,\\ a_{2}a_{1}>a_{0}`,
      note: "Falls straight out of the table, and settles most gain-range problems in one line." },
    { latex: `0\\ \\longrightarrow\\ \\epsilon,\\qquad \\text{signs as }\\epsilon\\to0`,
      note: `Zero in the first column only. The count is the same for $\\epsilon>0$ and $\\epsilon<0$.` },
    { latex: `a_{n}s^{n}+\\cdots+a_{0}\\quad\\longrightarrow\\quad a_{0}s^{n}+\\cdots+a_{n}`,
      note: "Reverse coefficients: the reversed polynomial has the reciprocal roots, and reciprocals keep the sign of the real part, so the right-half-plane count is unchanged." },
    { latex: `P(s)\\ \\text{from the row above};\\qquad \\text{replace the zero row with the coefficients of }\\frac{dP}{ds}`,
      note: "Entire row of zeros. $P(s)$ is an even factor of the original polynomial, and from its row down the table tests only $P(s)$." },
    { latex: `P(s)=\\alpha s^{2}+\\beta\\quad\\Longrightarrow\\quad \\omega=\\sqrt{\\beta/\\alpha}`,
      note: "At the gain that produces the row of zeros, the system oscillates at this frequency in rad/s." },
    { latex: `s=z-\\sigma_{0}`,
      note: `Sign changes in the table for the polynomial in $z$ count roots to the right of the line $s=-\\sigma_{0}$.` },
    { latex: `\\det(s\\mathbf{I}-\\mathbf{A})=0`,
      note: `State space: the poles are the eigenvalues of $\\mathbf{A}$. Expand the determinant, then use the same table.` },
  ],

  problems: [
    {
      id: "6-01", difficulty: "warmup", topic: "Stability definitions", sec: "6.1",
      prompt: `Classify each closed-loop system as stable, marginally stable, or unstable from its poles alone.

**(a)** $-1$, $-2\\pm j3$
**(b)** $-4$, $\\pm j5$
**(c)** $-2$, $+3$
**(d)** $-1\\pm j$, $0$
**(e)** $-2$, $-2$ (a repeated pole)
**(f)** $-1$, $\\pm j2$, $\\pm j2$ (the pair repeated)`,
      hint: "Two questions per pole: is the real part negative, and if the pole sits on the imaginary axis, is it repeated?",
      answer: `**(a)** stable. **(b)** marginally stable. **(c)** unstable. **(d)** marginally stable. **(e)** stable. **(f)** unstable.`,
      expert: `
**First glance:** the verdict is a scan of real parts. Multiplicity only matters for poles on the
imaginary axis.

**Discard:** computing any response. Nothing here needs a time function.

**Path:** any pole with a positive real part settles the case as unstable (c). Poles on the axis
with multiplicity 1, everything else on the left, give marginal stability (b, d). Repeats in the
left half-plane change nothing, because $te^{-2t}$ still decays (e). Repeats on the axis produce
$t\\cos\\omega t$, which grows (f).

**Check:** (e) and (f) are the same structural question with opposite answers, and the only
difference is which side of the axis the repeated pole sits on.
`,
      solution: `
| Case | Slowest term in the natural response | Verdict |
|---|---|---|
| (a) $-1$, $-2\\pm j3$ | $e^{-t}$ | every term decays: **stable** |
| (b) $-4$, $\\pm j5$ | $\\cos(5t+\\phi)$ | constant amplitude: **marginally stable** |
| (c) $-2$, $+3$ | $e^{3t}$ | grows: **unstable** |
| (d) $-1\\pm j$, $0$ | a constant | neither decays nor grows: **marginally stable** |
| (e) $-2$, $-2$ | $te^{-2t}$ | decays: **stable** |
| (f) $-1$, $\\pm j2$ twice | $t\\cos(2t+\\phi)$ | grows: **unstable** |

**Why (e) decays.** $te^{-2t}$ is a product of a term that grows linearly and one that decays
exponentially. The exponential wins for every $a>0$:

$$\\lim_{t\\to\\infty}te^{-at}=0$$

**Why (f) does not.** With poles at $\\pm j2$ repeated there is no exponential at all. The
response is $t$ multiplied by a bounded oscillation, and its envelope grows without bound.

**Check.** Group the six cases by rule: stable requires every pole strictly left of the axis;
marginal allows axis poles of multiplicity 1; anything else is unstable.
`
    },
    {
      id: "6-02", difficulty: "warmup", topic: "Stability definitions", sec: "6.1",
      prompt: `Each expression is the natural response of a closed-loop system. Give the pole locations it
implies and classify the system.

**(a)** $4e^{-3t}+e^{-t}\\cos 2t$
**(b)** $5+2e^{-t}$
**(c)** $e^{2t}\\sin t$
**(d)** $(1+3t)e^{-2t}$
**(e)** $t\\cos 4t$`,
      hint: "Read the exponent of each exponential as a real part, and the argument of each sinusoid as an imaginary part. A factor of $t$ means a repeated pole.",
      answer: `**(a)** $-3$ and $-1\\pm j2$: stable. **(b)** $0$ and $-1$: marginally stable. **(c)** $2\\pm j$: unstable. **(d)** $-2$ repeated: stable. **(e)** $\\pm j4$ repeated: unstable.`,
      expert: `
**First glance:** this is the previous problem run backwards. Each term names its own pole.

**Discard:** transforming anything. The correspondence between $e^{-at}\\cos\\omega t$ and
$-a\\pm j\\omega$ is the whole of Chapter 4's pole reading.

**Path:** a constant term means a pole at the origin, since $\\mathcal{L}\\{1\\}=1/s$. A factor of
$t$ means the pole is repeated. The sign of the exponent is the sign of the real part.

**Check:** (d) and (e) both carry a $t$. In (d) the repeated pole is at $-2$ and the response
decays; in (e) it is on the axis and the response grows.
`,
      solution: `
**(a)** $4e^{-3t}$ comes from a pole at $-3$; $e^{-t}\\cos 2t$ comes from the pair $-1\\pm j2$. All
three are in the left half-plane, so the natural response approaches zero: **stable**.

**(b)** The constant $5$ is the inverse transform of $5/s$: a pole at the origin, multiplicity 1.
$2e^{-t}$ gives a pole at $-1$. The natural response settles to $5$ instead of $0$, so it
neither decays nor grows: **marginally stable**.

**(c)** $e^{2t}\\sin t$ comes from $2\\pm j$. Positive real part: **unstable**.

**(d)** $(1+3t)e^{-2t}$ needs both $\\dfrac{1}{s+2}$ and $\\dfrac{1}{(s+2)^{2}}$, so $-2$ is a
repeated pole. Repetition in the left half-plane is harmless:

$$\\lim_{t\\to\\infty}(1+3t)e^{-2t}=0$$

**stable**.

**(e)** $t\\cos 4t$ requires $\\dfrac{s^{2}-16}{(s^{2}+16)^{2}}$: the pair $\\pm j4$, repeated. The
envelope grows linearly: **unstable**.

**Check.** Only (b) has a term that neither decays nor grows, and only (b) is marginal. Only (c)
and (e) grow, and only they are unstable.
`
    },
    {
      id: "6-03", difficulty: "core", topic: "Stability definitions", sec: "6.1",
      prompt: `A closed-loop system has

$$T(s)=\\frac{2}{s(s+2)}$$

**(a)** Classify it using the natural-response definition.

**(b)** Find the unit step response, and decide whether the system is stable under the
bounded-input, bounded-output definition.

**(c)** Reconcile the two answers.`,
      hint: "A step is a bounded input. Look at what happens in $C(s)$ when the input's pole lands on top of a system pole.",
      answer: `**(a)** Poles at $0$ and $-2$, the one at the origin of multiplicity 1: **marginally stable**.
**(b)** $c(t)=t-\\tfrac12+\\tfrac12e^{-2t}$, which grows without bound for a bounded input, so the
system is **not BIBO stable**. **(c)** A marginally stable system is well behaved for most
bounded inputs and not for one of them, so the BIBO definition files it under unstable.`,
      expert: `
**First glance:** a pole at the origin. The natural-response verdict is marginal before any
algebra.

**Discard:** the final value theorem. $sC(s)=2/(s(s+2))$ still has a pole at the origin, so the
theorem does not apply and reporting $c(\\infty)=\\infty$ from it would be an accident rather than
a result.

**Path:** $C(s)=T(s)/s$ puts a second pole at the origin. A double pole at the origin is a $t$
term, and $t$ is unbounded.

**Check:** the same collision drives the other marginal case. Poles at $\\pm j\\omega_{0}$ and an
input at $\\omega_{0}$ produce a repeated pair and a $t\\cos\\omega_{0}t$ term (6-04).
`,
      solution: `
**Part (a).**

The poles are $s=0$ and $s=-2$. The pole at the origin has multiplicity 1 and the other is in the
left half-plane, so the natural response contains a constant and a decaying exponential. It
neither decays to zero nor grows: **marginally stable**.

**Part (b).**

With $R(s)=1/s$,

$$C(s)=\\frac{2}{s^{2}(s+2)}$$

Expand. The double pole at the origin needs two terms:

$$\\frac{2}{s^{2}(s+2)}=\\frac{A}{s^{2}}+\\frac{B}{s}+\\frac{C}{s+2}$$

$$A=\\left[\\frac{2}{s+2}\\right]_{s=0}=1,\\qquad
C=\\left[\\frac{2}{s^{2}}\\right]_{s=-2}=\\frac{1}{2},\\qquad
B=\\left[\\frac{d}{ds}\\frac{2}{s+2}\\right]_{s=0}=\\left[\\frac{-2}{(s+2)^{2}}\\right]_{s=0}=-\\frac12$$

$$c(t)=t-\\frac12+\\frac12e^{-2t}$$

The input is bounded and the output is not, so by the definition "a system is unstable if any
bounded input yields an unbounded output", this system is unstable in the BIBO sense.

**Part (c).**

Both verdicts are correct under their own definition. The natural-response definition separates
the marginal case; the BIBO definition does not, because a marginally stable system is stable for
some bounded inputs and unstable for others. The step is the input that exposes it here.

**Check.** Verify the expansion by recombining over $s^{2}(s+2)$:

$$(s+2)-\\tfrac12 s(s+2)+\\tfrac12 s^{2}=s+2-\\tfrac12 s^{2}-s+\\tfrac12 s^{2}=2\\;\\checkmark$$

And note what a ramp input would do to a genuinely stable system: it also produces an unbounded
output, because the forced response is unbounded. That is why the BIBO statement is worded around
bounded inputs.
`
    },
    {
      id: "6-04", difficulty: "challenge", topic: "Stability definitions", sec: "6.1",
      prompt: `Two closed-loop denominators have every root on the $j\\omega$ axis:

$$D_{1}(s)=s^{4}+5s^{2}+4,\\qquad D_{2}(s)=s^{4}+8s^{2}+16$$

**(a)** Factor each and classify the system.

**(b)** Write the form of each natural response.

**(c)** For the system with denominator $D_{1}$ and numerator $4$, give a bounded input that
produces an unbounded output, and find the term that grows.`,
      hint: "Both are quadratics in $s^{2}$. Multiplicity is the only thing separating the two answers.",
      answer: `**(a)** $D_{1}=(s^{2}+1)(s^{2}+4)$: poles $\\pm j$ and $\\pm j2$, each of multiplicity 1, so
**marginally stable**. $D_{2}=(s^{2}+4)^{2}$: $\\pm j2$ twice, so **unstable**.
**(b)** $D_{1}$: $A\\cos t+B\\sin t+C\\cos 2t+D\\sin 2t$. $D_{2}$: $(A+Bt)\\cos 2t+(C+Dt)\\sin 2t$.
**(c)** $r(t)=\\sin t$ gives
$$c(t)=\\frac{2}{9}\\sin t+\\frac{2}{9}\\sin 2t-\\frac{2}{3}\\,t\\cos t$$
and the $t\\cos t$ term grows without bound.`,
      expert: `
**First glance:** both are even polynomials with all roots on the axis, so the classification
turns entirely on multiplicity. Let $u=s^{2}$ and factor.

**Discard:** the coefficient pre-check. Both polynomials are missing their odd powers, which
already rules out stability, and that is as far as coefficients go here: they cannot separate
marginal from unstable.

**Path:** $u^{2}+5u+4=(u+1)(u+4)$ gives four distinct axis roots. $u^{2}+8u+16=(u+4)^{2}$ gives
a repeated pair. For part (c), match the input frequency to a pole frequency so the pole becomes
repeated in $C(s)$.

**Check:** $D_{2}$ is what $D_{1}$ becomes when its two oscillation frequencies merge, and the
merge is what turns a bounded natural response into one with a $t$ in front.
`,
      solution: `
**Part (a).**

With $u=s^{2}$:

$$u^{2}+5u+4=(u+1)(u+4)\\qquad\\Longrightarrow\\qquad D_{1}=(s^{2}+1)(s^{2}+4)$$

Roots $\\pm j$ and $\\pm j2$, four distinct points on the axis, each of multiplicity 1. Nothing is
in the right half-plane and nothing is repeated on the axis: **marginally stable**.

$$u^{2}+8u+16=(u+4)^{2}\\qquad\\Longrightarrow\\qquad D_{2}=(s^{2}+4)^{2}$$

Roots $\\pm j2$, each of multiplicity 2: **unstable**.

**Part (b).**

$D_{1}$: two distinct pairs, each contributing a bounded sinusoid.

$$c_{\\text{natural}}(t)=A\\cos t+B\\sin t+C\\cos 2t+D\\sin 2t$$

$D_{2}$: a repeated pair contributes both the sinusoid and $t$ times the sinusoid.

$$c_{\\text{natural}}(t)=(A+Bt)\\cos 2t+(C+Dt)\\sin 2t$$

**Part (c).**

Take $T(s)=\\dfrac{4}{(s^{2}+1)(s^{2}+4)}$ and $r(t)=\\sin t$, a bounded input, with
$R(s)=\\dfrac{1}{s^{2}+1}$:

$$C(s)=\\frac{4}{(s^{2}+1)^{2}(s^{2}+4)}$$

The input's poles at $\\pm j$ land on system poles, so $C(s)$ has a repeated pair there. Inverting,

$$c(t)=\\frac{2}{9}\\sin t+\\frac{2}{9}\\sin 2t-\\frac{2}{3}\\,t\\cos t$$

The first two terms are bounded. The third grows without bound, and it exists only because the
input frequency matched a pole frequency.

**Check.** Set $t=0$: $c(0)=0+0-0=0$, as it must be for a strictly proper system starting from
rest. Differentiate the answer at $t=0$:

$$\\dot c(0)=\\frac{2}{9}+\\frac{4}{9}-\\frac{2}{3}=0$$

which also matches, since the numerator of $C(s)$ is two degrees short of the denominator.
`
    },
    {
      id: "6-05", difficulty: "warmup", topic: "Routh table", sec: "6.2",
      prompt: `Build the Routh table for

$$s^{3}+4s^{2}+6s+4$$

and state how many roots are in each half-plane.`,
      hint: "Three rows of arithmetic. The $s^{0}$ entry should reproduce the constant term.",
      answer: `First column $1,\\;4,\\;5,\\;4$: no sign changes, so all three roots are in the left half-plane and
the system is stable.`,
      expert: `
**First glance:** third order with every coefficient present and positive, so the coefficient
pre-check decides nothing and the table is needed.

**Discard:** hunting for rational roots. It would find $s=-2$ here, but the habit fails on the
next problem and on every problem carrying a $K$.

**Path:** two entries to compute, $b_{1}$ and $c_{1}$.

**Check:** the third-order rule $a_{2}a_{1}>a_{0}$ reads $4\\cdot6=24>4$, which is the same
statement as $b_{1}>0$.
`,
      solution: `
**Step 1: lay out the first two rows.** The $s^{3}$ row takes $1$ and $6$; the $s^{2}$ row takes
the skipped coefficients $4$ and $4$.

$$\\begin{array}{c|cc}
s^{3} & 1 & 6\\\\
s^{2} & 4 & 4\\\\
s^{1} & b_{1} & 0\\\\
s^{0} & c_{1} & 0
\\end{array}$$

**Step 2: compute the $s^{1}$ entry.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&6\\\\4&4\\end{vmatrix}}{4}=\\frac{-(4-24)}{4}=5$$

**Step 3: compute the $s^{0}$ entry.**

$$c_{1}=\\frac{-\\begin{vmatrix}4&4\\\\5&0\\end{vmatrix}}{5}=\\frac{-(0-20)}{5}=4$$

**Step 4: read the first column.**

$$1,\\;4,\\;5,\\;4$$

No sign changes, so no roots in the right half-plane. No row of zeros appeared, so nothing is on
the $j\\omega$ axis. All three roots are in the left half-plane: **stable**.

**Check.** The $s^{0}$ entry came out as $4$, which is $a_{0}$, as it always should. The
third-order rule agrees: $a_{2}a_{1}=24>4=a_{0}$. And the polynomial happens to factor as
$(s+2)(s^{2}+2s+2)$, with roots $-2$ and $-1\\pm j$, all on the left.
`
    },
    {
      id: "6-06", difficulty: "warmup", topic: "Routh table", sec: "6.2",
      prompt: `Every coefficient of

$$s^{3}+s^{2}+2s+8$$

is present and positive. Is the system stable? Build the table and give the number of roots in
each half-plane.`,
      hint: "Positive coefficients rule out nothing by themselves. Compute the $s^{1}$ entry.",
      answer: `No. First column $1,\\;1,\\;-6,\\;8$: two sign changes, so two roots are in the right half-plane
and one is in the left.`,
      expert: `
**First glance:** the pre-check passes, which means it has told you nothing. All positive
coefficients is necessary for stability and not sufficient.

**Discard:** concluding stability from the coefficient pattern. That inference is the single
most common error in this chapter, and this polynomial exists to break it.

**Path:** the third-order rule: $a_{2}a_{1}=1\\cdot2=2$ against $a_{0}=8$. The product loses, so
the $s^{1}$ entry is negative before it is computed.

**Check:** two sign changes means a complex pair crossed into the right half-plane, which is
what the factorisation shows.
`,
      solution: `
**Step 1: build the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&2\\\\1&8\\end{vmatrix}}{1}=\\frac{-(8-2)}{1}=-6,
\\qquad
c_{1}=\\frac{-\\begin{vmatrix}1&8\\\\-6&0\\end{vmatrix}}{-6}=\\frac{-(0+48)}{-6}=8$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 2\\\\
s^{2} & 1 & 8\\\\
s^{1} & -6 & 0\\\\
s^{0} & 8 & 0
\\end{array}$$

**Step 2: count sign changes.** The first column runs $1,\\;1,\\;-6,\\;8$: positive to negative is
one change, negative to positive is a second.

$$\\boxed{\\;2\\ \\text{roots in the right half-plane},\\quad 1\\ \\text{in the left}\\;}$$

**Step 3: confirm by factoring.** $s=-2$ is a root, since $-8+4-4+8=0$, so

$$s^{3}+s^{2}+2s+8=(s+2)(s^{2}-s+4)$$

and the quadratic has roots

$$s=\\frac{1\\pm j\\sqrt{15}}{2}$$

with real part $+\\tfrac12$. Two roots in the right half-plane, one at $-2$ on the left, matching
the table.

**Check.** The negative coefficient in $s^{2}-s+4$ is where the instability hides. Multiplying
that factor by $(s+2)$ buried it: the $-s$ term was outweighed by $2s^{2}$ and $4s$, and the
product came out with all-positive coefficients. Positive coefficients survive that kind of
cancellation, which is exactly why they prove nothing.
`
    },
    {
      id: "6-07", difficulty: "core", topic: "Routh table", sec: "6.2",
      prompt: `For

$$s^{4}+3s^{3}+4s^{2}+6s+5$$

find the number of roots in the right half-plane, in the left half-plane, and on the $j\\omega$
axis. Scale rows by positive constants to keep the arithmetic in small numbers.`,
      hint: "Divide the $s^{3}$ row by 3 before going on. Scaling a row by a positive constant changes nothing below it.",
      answer: `Two in the right half-plane, two in the left, none on the $j\\omega$ axis. With the $s^{3}$ row
scaled by $\\tfrac13$, the first column is $1,\\;1,\\;2,\\;-\\tfrac12,\\;5$: two sign changes.`,
      expert: `
**First glance:** fourth order, all coefficients present and positive, so the table is
unavoidable. Scale before computing rather than after.

**Discard:** the third-order rule. It applies only to cubics, and using it here would be reading
a result off the wrong shelf.

**Path:** four rows of arithmetic. The $s^{1}$ entry decides the answer, and with the scaled row
it is a one-line determinant.

**Check:** no row of zeros appeared anywhere, so nothing sits on the axis and the counts must
add to four.
`,
      solution: `
**Step 1: lay out the first two rows and scale the second.**

$$\\begin{array}{c|ccc}
s^{4} & 1 & 4 & 5\\\\
s^{3} & 3 & 6 & 0
\\end{array}
\\qquad\\longrightarrow\\qquad
\\begin{array}{c|ccc}
s^{4} & 1 & 4 & 5\\\\
s^{3} & 1 & 2 & 0
\\end{array}$$

Dividing the $s^{3}$ row by $3$ is legal because $3>0$.

**Step 2: the $s^{2}$ row.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&4\\\\1&2\\end{vmatrix}}{1}=-(2-4)=2,
\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&5\\\\1&0\\end{vmatrix}}{1}=-(0-5)=5$$

**Step 3: the $s^{1}$ row.**

$$c_{1}=\\frac{-\\begin{vmatrix}1&2\\\\2&5\\end{vmatrix}}{2}=\\frac{-(5-4)}{2}=-\\frac12$$

**Step 4: the $s^{0}$ row.**

$$d_{1}=\\frac{-\\begin{vmatrix}2&5\\\\-\\tfrac12&0\\end{vmatrix}}{-\\tfrac12}
=\\frac{-\\left(0+\\tfrac52\\right)}{-\\tfrac12}=5$$

$$\\begin{array}{c|ccc}
s^{4} & 1 & 4 & 5\\\\
s^{3} & 1 & 2 & 0\\\\
s^{2} & 2 & 5 & 0\\\\
s^{1} & -\\tfrac12 & 0 & 0\\\\
s^{0} & 5 & 0 & 0
\\end{array}$$

**Step 5: count.** First column $1,\\;1,\\;2,\\;-\\tfrac12,\\;5$. Two sign changes.

$$\\boxed{\\;2\\ \\text{right half-plane},\\quad 2\\ \\text{left half-plane},\\quad 0\\ \\text{on the }j\\omega\\text{ axis}\\;}$$

**Check.** The $s^{0}$ entry is $5=a_{0}$. The counts sum to $4$, the degree. No row of zeros
appeared, which is the only way $j\\omega$ roots could have been present, so the zero in the third
count is not an assumption.
`
    },
    {
      id: "6-08", difficulty: "core", topic: "Closed-loop stability", sec: "6.2",
      prompt: `A plant

$$G(s)=\\frac{30}{s(s+1)(s+4)}$$

is placed in a unity negative feedback loop. Every open-loop pole is in the left half-plane or at
the origin. How many closed-loop poles are in the right half-plane?`,
      hint: "Form $1+G(s)=0$ and clear the fraction before touching the table.",
      answer: `Two. The closed-loop denominator is $s^{3}+5s^{2}+4s+30$, whose first column is
$1,\\;5,\\;-2,\\;30$: two sign changes.`,
      expert: `
**First glance:** third order after clearing, so $a_{2}a_{1}>a_{0}$ settles it: $5\\cdot4=20$
against $30$. The loop is unstable before the table is drawn.

**Discard:** testing the plant's own poles. They are $0,\\;-1,\\;-4$, and they are the roots of
$D(s)$ alone; the closed loop tests $D(s)+N(s)$.

**Path:** $s(s+1)(s+4)+30=s^{3}+5s^{2}+4s+30$, then one determinant.

**Check:** the gain did this. At $K=20$ the same plant gives $a_{2}a_{1}=20>20$ failing by a
hair, and below that the loop is stable, which is the gain-range calculation of 6-20.
`,
      solution: `
**Step 1: form the closed-loop denominator.** For unity feedback,

$$1+G(s)=0\\quad\\Longrightarrow\\quad s(s+1)(s+4)+30=0$$

$$s(s^{2}+5s+4)+30=s^{3}+5s^{2}+4s+30$$

**Step 2: build the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&4\\\\5&30\\end{vmatrix}}{5}=\\frac{-(30-20)}{5}=-2,
\\qquad
c_{1}=\\frac{-\\begin{vmatrix}5&30\\\\-2&0\\end{vmatrix}}{-2}=\\frac{-(0+60)}{-2}=30$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 4\\\\
s^{2} & 5 & 30\\\\
s^{1} & -2 & 0\\\\
s^{0} & 30 & 0
\\end{array}$$

**Step 3: count.** First column $1,\\;5,\\;-2,\\;30$: two sign changes.

$$\\boxed{\\;2\\ \\text{closed-loop poles in the right half-plane},\\quad 1\\ \\text{in the left}\\;}$$

**Check.** The open-loop poles were $0$, $-1$ and $-4$: none of them in the right half-plane.
Closing the loop moved them, and two of the three crossed over. This is Chapter 5's statement
that feedback relocates poles, with the consequence that Chapter 5 could not yet evaluate.
`
    },
    {
      id: "6-09", difficulty: "core", topic: "Routh table", sec: "6.2",
      prompt: `For

$$s^{5}+s^{4}+4s^{3}+5s^{2}+s+3$$

find the number of roots in each half-plane. A classmate counts the two negative entries in the
first column and answers "two in the right half-plane". Say what is wrong with that, and what
happens if the negative row is multiplied by $-1$ to tidy it up.`,
      hint: "The criterion counts changes of sign down the column, not entries that happen to be negative.",
      answer: `First column $1,\\;1,\\;-1,\\;3,\\;-1,\\;3$: **four** sign changes, so four roots in the right
half-plane and one in the left. Two negative entries separated by a positive one give four
changes, not two. Multiplying a row by $-1$ is not permitted: only positive constants leave the
count intact, and a sign flip would erase two of the four changes.`,
      expert: `
**First glance:** fifth order with every coefficient present and positive, so the pre-check is
silent and all five rows have to be built.

**Discard:** tidying the negative $s^{3}$ row. Row scaling is allowed for positive constants
only, and this row is where the count is made.

**Path:** five rows, all integer arithmetic. The first column alternates twice.

**Check:** four in the right half-plane plus one in the left accounts for all five roots, and no
row of zeros appeared so none of them is on the axis.
`,
      solution: `
**Step 1: build the table.**

$$\\begin{array}{c|ccc}
s^{5} & 1 & 4 & 1\\\\
s^{4} & 1 & 5 & 3\\\\
s^{3} & -1 & -2 & 0\\\\
s^{2} & 3 & 3 & 0\\\\
s^{1} & -1 & 0 & 0\\\\
s^{0} & 3 & 0 & 0
\\end{array}$$

The entries, in order:

$$\\frac{-\\begin{vmatrix}1&4\\\\1&5\\end{vmatrix}}{1}=-1,\\qquad
\\frac{-\\begin{vmatrix}1&1\\\\1&3\\end{vmatrix}}{1}=-2$$

$$\\frac{-\\begin{vmatrix}1&5\\\\-1&-2\\end{vmatrix}}{-1}=\\frac{-(-2+5)}{-1}=3,\\qquad
\\frac{-\\begin{vmatrix}1&3\\\\-1&0\\end{vmatrix}}{-1}=\\frac{-(0+3)}{-1}=3$$

$$\\frac{-\\begin{vmatrix}-1&-2\\\\3&3\\end{vmatrix}}{3}=\\frac{-(-3+6)}{3}=-1,\\qquad
\\frac{-\\begin{vmatrix}3&3\\\\-1&0\\end{vmatrix}}{-1}=\\frac{-(0+3)}{-1}=3$$

**Step 2: count the changes, one adjacent pair at a time.**

$$1\\to1\\ (\\text{none}),\\quad 1\\to-1\\ (\\text{one}),\\quad -1\\to3\\ (\\text{two}),\\quad
3\\to-1\\ (\\text{three}),\\quad -1\\to3\\ (\\text{four})$$

$$\\boxed{\\;4\\ \\text{roots in the right half-plane},\\quad 1\\ \\text{in the left}\\;}$$

**Step 3: the classmate's error.** Two negative entries were counted instead of the transitions
between them. Each isolated negative entry sitting between positives contributes **two** changes,
one on the way down and one on the way back up. Here there are two such entries, hence four.

**Step 4: why the $-1$ row must stay negative.** Multiplying a row by a positive constant scales
everything below it by the same positive factor, so every sign is preserved. Multiplying by $-1$
flips the sign of that entry and of the entries computed from it, which would remove two of the
four sign changes and produce the classmate's answer by a different route.

**Check.** Four plus one is five, the degree. The $s^{0}$ entry is $3=a_{0}$.
`
    },
    {
      id: "6-10", difficulty: "challenge", topic: "Closed-loop stability", sec: "6.2",
      prompt: `The loop below is stable when the sensor is ideal, $H(s)=1$. A real sensor has a lag,

$$H(s)=\\frac{1}{s+1}$$

which has unit dc gain, so the steady-state reading is unchanged.

**(a)** Test both cases and report the number of closed-loop poles in the right half-plane.

**(b)** Compare the closed-loop transfer function of the lagged-sensor loop with the one from
problem 6-08, a unity-feedback loop around $\\dfrac{30}{s(s+1)(s+4)}$.

**(c)** What does the comparison say about where a pole sits in a loop?

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 215" class="nx-fig">
  <defs><marker id="nx6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="58" font-size="15">R(s)</text>
  <path d="M40 52 L58 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6a)"/>
  <circle cx="78" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <path d="M65 52 L91 52 M78 39 L78 65" stroke="currentColor" stroke-width="1.1" opacity=".45"/>
  <text x="54" y="44" text-anchor="middle" font-size="14">+</text>
  <text x="92" y="86" text-anchor="middle" font-size="14">&#8722;</text>
  <path d="M98 52 L150 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6a)"/>
  <rect x="150" y="30" width="170" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="235" y="58" text-anchor="middle" font-size="15">30 / (s(s + 4))</text>
  <path d="M320 52 L470 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6a)"/>
  <text x="484" y="58" font-size="15">C(s)</text>
  <circle cx="420" cy="52" r="4" fill="currentColor" stroke="none"/>
  <path d="M420 52 L420 152 L350 152" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6a)"/>
  <rect x="230" y="130" width="120" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="290" y="158" text-anchor="middle" font-size="15">1 / (s + 1)</text>
  <path d="M230 152 L78 152 L78 72" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6a)"/>
</svg>
<figcaption>Problem 6-10. The sensor lag sits in the feedback path.</figcaption>
</figure>`,
      hint: "Only the product $G(s)H(s)$ appears in $1+GH=0$. Write that product for each sensor before deciding anything.",
      answer: `**(a)** Ideal sensor: $s^{2}+4s+30$, both coefficients positive, **stable**. Lagged sensor:
$s^{3}+5s^{2}+4s+30$, first column $1,\\;5,\\;-2,\\;30$, so **two poles in the right half-plane**.
**(b)** $T(s)=\\dfrac{30(s+1)}{s(s+1)(s+4)+30}$, the same denominator as 6-08 and therefore the
same poles; this version carries an extra zero at $-1$.
**(c)** For stability it makes no difference whether the lag is in the forward path or the
feedback path, because only the product $GH$ enters the characteristic equation. The placement
changes the zeros of $T(s)$, which the criterion never examines.`,
      expert: `
**First glance:** the sensor has unit dc gain, so nothing about steady state changes, and the
instinct that follows from that is wrong. Stability is set by the dynamics of $GH$, not by its
value at $s=0$.

**Discard:** testing $H(s)$ on its own. Its pole at $-1$ is in the left half-plane, which tells
nothing; what matters is that it raises the order of $D(s)+N(s)$ from two to three.

**Path:** $GH=\\dfrac{30}{s(s+4)(s+1)}$, so the closed-loop denominator is $s(s+4)(s+1)+30$, the
same polynomial 6-08 produced from a different diagram.

**Check:** a first-order lag anywhere in the loop adds a pole to $D(s)$ and adds nothing to
$N(s)$, and for a loop already close to its limit that is enough to push it over.
`,
      solution: `
**Part (a), ideal sensor.**

$$1+G(s)=0\\quad\\Longrightarrow\\quad s(s+4)+30=s^{2}+4s+30$$

Second order with both coefficients positive, so the coefficient test is exact: no roots in the
right half-plane. The poles are $-2\\pm j\\sqrt{26}$.

**Part (a), lagged sensor.**

$$G(s)H(s)=\\frac{30}{s(s+4)}\\cdot\\frac{1}{s+1}=\\frac{30}{s(s+4)(s+1)}$$

$$1+G(s)H(s)=0\\quad\\Longrightarrow\\quad s(s+4)(s+1)+30=s^{3}+5s^{2}+4s+30$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 4\\\\
s^{2} & 5 & 30\\\\
s^{1} & -2 & 0\\\\
s^{0} & 30 & 0
\\end{array}$$

Two sign changes: **two closed-loop poles in the right half-plane**. The sensor destabilised a
loop that was stable with an ideal one.

**Part (b).**

$$T(s)=\\frac{G}{1+GH}
=\\frac{\\dfrac{30}{s(s+4)}}{1+\\dfrac{30}{s(s+4)(s+1)}}
=\\frac{30(s+1)}{s(s+4)(s+1)+30}$$

Problem 6-08 had the same denominator and numerator $30$. Same poles, different zeros: this loop
has a zero at $-1$ and 6-08 has none.

**Part (c).**

The characteristic equation contains only the product $GH$. Moving the first-order lag from the
forward path to the feedback path leaves that product unchanged, so the closed-loop poles are
identical. What moves is the numerator of $T(s)$: a forward-path factor appears in it, a
feedback-path factor does not.

**Check.** Two consequences worth keeping. A sensor calibrated correctly at dc can still
destabilise a loop, because dc gain says nothing about phase and order. And when a problem asks
only about stability, the diagram can be collapsed to the single product $GH$ before anything
else is done.
`
    },
    {
      id: "6-11", difficulty: "warmup", topic: "Special cases", sec: "6.3",
      prompt: `Start the Routh table for each polynomial, stop at the first row that cannot be completed the
usual way, and name which special case has appeared.

**(a)** $s^{4}+s^{3}+2s^{2}+2s+3$

**(b)** $s^{4}+2s^{3}+3s^{2}+2s+2$`,
      hint: "Two rows of arithmetic each. The distinction is whether only the first entry vanishes or the whole row does.",
      answer: `**(a)** The $s^{2}$ row comes out $0,\\;3$: a **zero in the first column only**.
**(b)** The $s^{1}$ row comes out $0,\\;0$: an **entire row of zeros**.`,
      expert: `
**First glance:** both polynomials have all coefficients present and positive, so the pre-check
passes and the table has to be started.

**Discard:** treating the two cases the same way. They are handled by different procedures and
they mean different things: a zero in the first column is an arithmetic obstruction, a full row
of zeros is a statement that an even polynomial divides the original.

**Path:** compute the $s^{2}$ row in each case and look at what vanishes.

**Check:** (a) continues in 6-12 and (b) in 6-14, which is where each special case is resolved.
`,
      solution: `
**Part (a).** $s^{4}+s^{3}+2s^{2}+2s+3$.

$$\\begin{array}{c|ccc}
s^{4} & 1 & 2 & 3\\\\
s^{3} & 1 & 2 & 0
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&2\\\\1&2\\end{vmatrix}}{1}=-(2-2)=0,
\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&3\\\\1&0\\end{vmatrix}}{1}=-(0-3)=3$$

The $s^{2}$ row is $0,\\;3$. The first entry is zero and the rest of the row is not, so the next
row would require a division by zero. **Zero in the first column only.**

**Part (b).** $s^{4}+2s^{3}+3s^{2}+2s+2$. Scale the $s^{3}$ row by $\\tfrac12$ first.

$$\\begin{array}{c|ccc}
s^{4} & 1 & 3 & 2\\\\
s^{3} & 1 & 1 & 0
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&3\\\\1&1\\end{vmatrix}}{1}=-(1-3)=2,
\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&2\\\\1&0\\end{vmatrix}}{1}=-(0-2)=2$$

Scale that row by $\\tfrac12$ as well, giving $1,\\;1$. Now the $s^{1}$ row:

$$c_{1}=\\frac{-\\begin{vmatrix}1&1\\\\1&1\\end{vmatrix}}{1}=0,
\\qquad
c_{2}=\\frac{-\\begin{vmatrix}1&0\\\\1&0\\end{vmatrix}}{1}=0$$

Both entries vanish. **Entire row of zeros.**

**Check.** The two outcomes have different causes. In (a) the arithmetic happened to cancel in
one position. In (b) the whole row disappearing says that an even polynomial divides
$s^{4}+2s^{3}+3s^{2}+2s+2$, and the row above names it.
`
    },
    {
      id: "6-12", difficulty: "core", topic: "Zero in first column", sec: "6.3",
      prompt: `Finish the table for

$$s^{4}+s^{3}+2s^{2}+2s+3$$

with the epsilon method and give the number of roots in each half-plane. Then repeat the sign
count with $\\epsilon<0$ and confirm the answer does not change.`,
      hint: `Only signs matter. For small $\\epsilon$, whichever term carries $1/\\epsilon$ decides the sign of the entry.`,
      answer: `Two roots in the right half-plane and two in the left. The first column is
$1,\\;1,\\;\\epsilon,\\;2-\\dfrac{3}{\\epsilon},\\;3$. For $\\epsilon>0$ the signs are $+,+,+,-,+$; for
$\\epsilon<0$ they are $+,+,-,+,+$. Both give two sign changes.`,
      expert: `
**First glance:** the $s^{2}$ row is $0,\\;3$ from 6-11. The entry below will contain $3/\\epsilon$,
which dominates the constant beside it.

**Discard:** setting $\\epsilon=0$ at the end. The point of $\\epsilon$ is the limit of the
**sign**, not a numerical value; substituting zero reproduces the division that stalled the
table.

**Path:** carry $\\epsilon$ through one row. The $s^{1}$ entry is $2-3/\\epsilon$, negative for
small positive $\\epsilon$, and the $s^{0}$ entry is the constant term.

**Check:** running the column with $\\epsilon<0$ flips two entries and leaves the number of
changes at two, which is the general behaviour and not a coincidence here.
`,
      solution: `
**Step 1: place $\\epsilon$.**

$$\\begin{array}{c|ccc}
s^{4} & 1 & 2 & 3\\\\
s^{3} & 1 & 2 & 0\\\\
s^{2} & \\epsilon & 3 & 0
\\end{array}$$

**Step 2: the $s^{1}$ row.**

$$c_{1}=\\frac{-\\begin{vmatrix}1&2\\\\ \\epsilon&3\\end{vmatrix}}{\\epsilon}
=\\frac{-(3-2\\epsilon)}{\\epsilon}=2-\\frac{3}{\\epsilon}$$

**Step 3: the $s^{0}$ row.**

$$d_{1}=\\frac{-\\begin{vmatrix}\\epsilon&3\\\\ 2-\\tfrac{3}{\\epsilon}&0\\end{vmatrix}}{2-\\tfrac{3}{\\epsilon}}
=\\frac{3\\left(2-\\tfrac{3}{\\epsilon}\\right)}{2-\\tfrac{3}{\\epsilon}}=3$$

**Step 4: signs for $\\epsilon>0$ small.**

| Row | Entry | Sign |
|---|---|---|
| $s^{4}$ | $1$ | $+$ |
| $s^{3}$ | $1$ | $+$ |
| $s^{2}$ | $\\epsilon$ | $+$ |
| $s^{1}$ | $2-\\dfrac{3}{\\epsilon}$ | $-$ |
| $s^{0}$ | $3$ | $+$ |

Two sign changes:

$$\\boxed{\\;2\\ \\text{roots in the right half-plane},\\quad 2\\ \\text{in the left}\\;}$$

**Step 5: signs for $\\epsilon<0$ small.** Now $\\epsilon$ is negative, and $-3/\\epsilon$ is a large
positive number, so $2-3/\\epsilon$ is positive:

$$+,\\;+,\\;-,\\;+,\\;+$$

Positive to negative, then negative to positive: two changes again. The individual entries moved,
the count did not.

**Check.** No row of zeros appeared, so no roots are on the $j\\omega$ axis, and $2+2=4$ accounts
for the degree.
`
    },
    {
      id: "6-13", difficulty: "core", topic: "Zero in first column", sec: "6.3",
      prompt: `The polynomial

$$s^{5}+2s^{4}+2s^{3}+4s^{2}+s+1$$

produces a zero in the first column of the $s^{3}$ row. Rather than carry $\\epsilon$ through three
more rows, reverse the coefficients and test that polynomial instead. How many roots are in each
half-plane, and why is the reversed polynomial entitled to answer the question?`,
      hint: "Reversing the coefficients is the substitution $s=1/d$ in disguise. Ask what reciprocation does to the sign of a real part.",
      answer: `Two in the right half-plane, three in the left. The reversed polynomial
$s^{5}+s^{4}+4s^{3}+2s^{2}+2s+1$ has first column $1,\\;1,\\;2,\\;\\tfrac32,\\;-\\tfrac13,\\;1$: two sign
changes. Reversal produces the polynomial whose roots are the reciprocals of the original's, and
reciprocation preserves the sign of the real part, so the right-half-plane count is the same.`,
      expert: `
**First glance:** the $s^{3}$ row starts with $\\frac{-(2\\cdot2-2\\cdot1\\cdot2)}{2}$, which
vanishes. With three rows still to go, $\\epsilon$ would appear in every one of them.

**Discard:** the epsilon method. It is correct here and it is more arithmetic: two nested
rational expressions instead of six integer determinants.

**Path:** reverse the list of coefficients and build an ordinary table.

**Check:** the reversed table produced no special case, and $2+3=5$. If the reversed table had
also stalled, $\\epsilon$ would have been the remaining option.
`,
      solution: `
**Step 1: confirm the obstruction.**

$$\\begin{array}{c|ccc}
s^{5} & 1 & 2 & 1\\\\
s^{4} & 2 & 4 & 1
\\end{array}
\\qquad
b_{1}=\\frac{-\\begin{vmatrix}1&2\\\\2&4\\end{vmatrix}}{2}=\\frac{-(4-4)}{2}=0$$

**Step 2: reverse the coefficients.** The original list is

$$1,\\;2,\\;2,\\;4,\\;1,\\;1$$

Reversed:

$$1,\\;1,\\;4,\\;2,\\;2,\\;1
\\qquad\\Longrightarrow\\qquad
s^{5}+s^{4}+4s^{3}+2s^{2}+2s+1$$

**Step 3: build the table for the reversed polynomial.**

$$\\begin{array}{c|ccc}
s^{5} & 1 & 4 & 2\\\\
s^{4} & 1 & 2 & 1\\\\
s^{3} & 2 & 1 & 0\\\\
s^{2} & \\tfrac32 & 1 & 0\\\\
s^{1} & -\\tfrac13 & 0 & 0\\\\
s^{0} & 1 & 0 & 0
\\end{array}$$

The entries:

$$\\frac{-\\begin{vmatrix}1&4\\\\1&2\\end{vmatrix}}{1}=2,\\qquad
\\frac{-\\begin{vmatrix}1&2\\\\1&1\\end{vmatrix}}{1}=1$$

$$\\frac{-\\begin{vmatrix}1&2\\\\2&1\\end{vmatrix}}{2}=\\frac{-(1-4)}{2}=\\frac32,\\qquad
\\frac{-\\begin{vmatrix}1&1\\\\2&0\\end{vmatrix}}{2}=\\frac{-(0-2)}{2}=1$$

$$\\frac{-\\begin{vmatrix}2&1\\\\ \\tfrac32&1\\end{vmatrix}}{\\tfrac32}
=\\frac{-\\left(2-\\tfrac32\\right)}{\\tfrac32}=-\\frac13,\\qquad
\\frac{-\\begin{vmatrix}\\tfrac32&1\\\\ -\\tfrac13&0\\end{vmatrix}}{-\\tfrac13}
=\\frac{-\\left(0+\\tfrac13\\right)}{-\\tfrac13}=1$$

First column $1,\\;1,\\;2,\\;\\tfrac32,\\;-\\tfrac13,\\;1$: two sign changes.

$$\\boxed{\\;2\\ \\text{roots in the right half-plane},\\quad 3\\ \\text{in the left}\\;}$$

**Step 4: why this is allowed.** Substitute $s=1/d$ into

$$D(s)=a_{5}s^{5}+a_{4}s^{4}+\\cdots+a_{0}$$

and multiply by $d^{5}$:

$$d^{5}D(1/d)=a_{5}+a_{4}d+\\cdots+a_{0}d^{5}$$

which is the original coefficients in reverse order. Its roots are the reciprocals of the roots
of $D$. Reciprocation cannot move a root across the imaginary axis:

$$\\frac{1}{\\sigma+j\\omega}=\\frac{\\sigma-j\\omega}{\\sigma^{2}+\\omega^{2}}$$

and the real part $\\sigma/(\\sigma^{2}+\\omega^{2})$ carries the sign of $\\sigma$. Right-half-plane
roots map to right-half-plane roots, so the count transfers.

**Check.** The reversed table needed no special case and produced integers and halves. Compare
6-17, where the epsilon route is run in full on a similar polynomial: same kind of answer, several
times the work.
`
    },
    {
      id: "6-14", difficulty: "core", topic: "Row of zeros", sec: "6.3",
      prompt: `For

$$s^{4}+2s^{3}+3s^{2}+2s+2$$

complete the table, give the number of roots in the right half-plane, in the left half-plane and
on the $j\\omega$ axis, and classify the system.`,
      hint: "The row of zeros from 6-11(b) is an announcement. Read the row above it as a polynomial and differentiate.",
      answer: `Two in the left half-plane, two on the $j\\omega$ axis at $\\pm j$, none in the right:
**marginally stable**. The even polynomial is $P(s)=s^{2}+1$.`,
      expert: `
**First glance:** the row of zeros found in 6-11(b) means an even polynomial divides this one, and
the row above it holds that polynomial's coefficients.

**Discard:** stopping at "no sign changes" and calling the system stable. No sign changes rules
out right-half-plane roots and says nothing about the axis, which is where the roots of $P(s)$
turn out to be.

**Path:** $P(s)=s^{2}+1$ from the $s^{2}$ row, $dP/ds=2s$ replaces the zeros, then two more
entries.

**Check:** $(s^{2}+1)(s^{2}+2s+2)$ multiplies back to the original, and the second factor's roots
$-1\\pm j$ account for the two left-half-plane roots.
`,
      solution: `
**Step 1: the table down to the row of zeros.** Scaling the $s^{3}$ and $s^{2}$ rows by $\\tfrac12$:

$$\\begin{array}{c|ccc}
s^{4} & 1 & 3 & 2\\\\
s^{3} & 1 & 1 & 0\\\\
s^{2} & 1 & 1 & 0\\\\
s^{1} & 0 & 0 & 0
\\end{array}$$

**Step 2: form the even polynomial.** The row above the zeros is the $s^{2}$ row, $1,\\;1$. Read it
as coefficients starting at $s^{2}$ and skipping every other power:

$$P(s)=s^{2}+1$$

**Step 3: differentiate and refill the row.**

$$\\frac{dP}{ds}=2s\\qquad\\Longrightarrow\\qquad s^{1}\\ \\text{row}:\\ 2,\\;0$$

**Step 4: finish.**

$$d_{1}=\\frac{-\\begin{vmatrix}1&1\\\\2&0\\end{vmatrix}}{2}=\\frac{-(0-2)}{2}=1$$

$$\\begin{array}{c|ccc}
s^{4} & 1 & 3 & 2\\\\
s^{3} & 1 & 1 & 0\\\\
s^{2} & 1 & 1 & 0\\\\
s^{1} & 2 & 0 & 0\\\\
s^{0} & 1 & 0 & 0
\\end{array}$$

**Step 5: read it in two pieces.**

From the $s^{2}$ row down, the table tests $P(s)$ alone: entries $1,\\;2,\\;1$, no sign changes, so
$P$ has no roots in the right half-plane. By the symmetry of an even polynomial it then has none
in the left half-plane either, so both of its roots are on the $j\\omega$ axis:

$$s^{2}+1=0\\qquad\\Longrightarrow\\qquad s=\\pm j$$

Above that row, $1,\\;1$: no sign changes, so the remaining quadratic factor has both roots in the
left half-plane.

$$\\boxed{\\;0\\ \\text{right half-plane},\\quad 2\\ \\text{left half-plane},\\quad 2\\ \\text{on the }j\\omega\\text{ axis}\\;}$$

The natural response contains a sustained oscillation at $1$ rad/s that never decays:
**marginally stable**.

**Check.** Divide $P(s)$ out:

$$\\frac{s^{4}+2s^{3}+3s^{2}+2s+2}{s^{2}+1}=s^{2}+2s+2$$

with roots $-1\\pm j$. Multiplying back reproduces the original, and the four roots are
$\\pm j,\\;-1\\pm j$: exactly the census above.
`
    },
    {
      id: "6-15", difficulty: "core", topic: "Row of zeros", sec: "6.3",
      prompt: `For

$$s^{5}+2s^{4}+3s^{3}+6s^{2}-4s-8$$

give the number of roots in the right half-plane, in the left half-plane, and on the $j\\omega$
axis.`,
      hint: "Read the coefficients before building anything. Then expect the row of zeros, and remember that the rows below the even polynomial test only that polynomial.",
      answer: `One in the right half-plane, two in the left, two on the $j\\omega$ axis at $\\pm j2$. The even
polynomial is $P(s)=s^{4}+3s^{2}-4$.`,
      expert: `
**First glance:** the last two coefficients are negative while the leading ones are positive, so
the system is not stable and the only question left is the distribution.

**Discard:** any thought that a row of zeros means marginal stability. It means an even factor
exists; where that factor's roots sit is what the rows below decide, and here two of them are off
the axis.

**Path:** the $s^{3}$ row vanishes, $P(s)=s^{4}+3s^{2}-4$ comes from the $s^{4}$ row, and its own
negative constant term already says it has a real pair at $\\pm1$.

**Check:** $P(s)=(s^{2}+4)(s^{2}-1)$, which is the symmetric-imaginary case and the
symmetric-real case in the same factor.
`,
      solution: `
**Step 1: the pre-check.** Coefficients $1,\\;2,\\;3,\\;6,\\;-4,\\;-8$ change sign, so at least one
root is not in the left half-plane. The table will say how many.

**Step 2: build until the table stalls.** Scale the $s^{4}$ row by $\\tfrac12$:

$$\\begin{array}{c|ccc}
s^{5} & 1 & 3 & -4\\\\
s^{4} & 1 & 3 & -4
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&3\\\\1&3\\end{vmatrix}}{1}=0,\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&-4\\\\1&-4\\end{vmatrix}}{1}=0$$

An entire row of zeros at $s^{3}$.

**Step 3: even polynomial and its derivative.** The $s^{4}$ row is $1,\\;3,\\;-4$:

$$P(s)=s^{4}+3s^{2}-4,\\qquad \\frac{dP}{ds}=4s^{3}+6s$$

so the $s^{3}$ row becomes $4,\\;6$, which scales by $\\tfrac12$ to $2,\\;3$.

**Step 4: finish the table.**

$$c_{1}=\\frac{-\\begin{vmatrix}1&3\\\\2&3\\end{vmatrix}}{2}=\\frac{-(3-6)}{2}=\\frac32,\\qquad
c_{2}=\\frac{-\\begin{vmatrix}1&-4\\\\2&0\\end{vmatrix}}{2}=\\frac{-(0+8)}{2}=-4$$

$$d_{1}=\\frac{-\\begin{vmatrix}2&3\\\\ \\tfrac32&-4\\end{vmatrix}}{\\tfrac32}
=\\frac{-\\left(-8-\\tfrac92\\right)}{\\tfrac32}=\\frac{25}{3},\\qquad
e_{1}=\\frac{-\\begin{vmatrix}\\tfrac32&-4\\\\ \\tfrac{25}{3}&0\\end{vmatrix}}{\\tfrac{25}{3}}
=\\frac{-\\left(0+\\tfrac{100}{3}\\right)}{\\tfrac{25}{3}}=-4$$

$$\\begin{array}{c|ccc}
s^{5} & 1 & 3 & -4\\\\
s^{4} & 1 & 3 & -4\\\\
s^{3} & 2 & 3 & 0\\\\
s^{2} & \\tfrac32 & -4 & 0\\\\
s^{1} & \\tfrac{25}{3} & 0 & 0\\\\
s^{0} & -4 & 0 & 0
\\end{array}$$

**Step 5: read the two pieces.**

From the $s^{4}$ row down, the table tests $P(s)$: entries
$1,\\;2,\\;\\tfrac32,\\;\\tfrac{25}{3},\\;-4$, one sign change. So $P$ has one root in the right
half-plane, one in the left by symmetry, and the remaining two of its four roots on the
$j\\omega$ axis.

Above the $s^{4}$ row: entries $1,\\;1$, no sign change, so the remaining first-order factor has
its root in the left half-plane.

$$\\boxed{\\;1\\ \\text{right half-plane},\\quad 2\\ \\text{left half-plane},\\quad 2\\ \\text{on the }j\\omega\\text{ axis}\\;}$$

**Check.** $P(s)=s^{4}+3s^{2}-4=(s^{2}+4)(s^{2}-1)$, with roots $\\pm j2$ and $\\pm1$: one in the
right half-plane, one in the left, two on the axis, as counted. Dividing $P$ out of the original
leaves $s+2$, whose root is in the left half-plane. Full list: $-2,\\;-1,\\;+1,\\;\\pm j2$.
`
    },
    {
      id: "6-16", difficulty: "challenge", topic: "Special cases", sec: "6.3",
      prompt: `Both special cases appear in the same table for

$$s^{5}+s^{4}+4s+4$$

Work through them and report the root distribution. Name which of the three symmetry patterns the
even polynomial exhibits.`,
      hint: "A missing $s^{3}$ and $s^{2}$ is not a bar to building the table: those coefficients are zero and go in as zeros.",
      answer: `Two in the right half-plane, three in the left, none on the $j\\omega$ axis. The even polynomial
is $P(s)=s^{4}+4$, whose roots $\\pm1\\pm j$ are the **quadrantal** pattern.`,
      expert: `
**First glance:** two coefficients are missing, so stability is already ruled out; the table is
being built for the distribution.

**Discard:** treating the missing powers as a special case of their own. They are ordinary zero
coefficients and enter the first two rows as zeros.

**Path:** a row of zeros at $s^{3}$ gives $P(s)=s^{4}+4$; refilling from $dP/ds=4s^{3}$ produces a
row whose only nonzero entry is in the first column, and the row after that starts with a zero,
which is the second special case.

**Check:** $s^{4}+4$ has no real roots and no imaginary roots, since $s^{4}=-4$ has no solution on
either axis. That leaves quadrantal, and the table's two sign changes below the $s^{4}$ row agree:
two of the four in the right half-plane, two in the left, none on the axis.
`,
      solution: `
**Step 1: first two rows, with the missing coefficients entered as zeros.**

$$\\begin{array}{c|ccc}
s^{5} & 1 & 0 & 4\\\\
s^{4} & 1 & 0 & 4
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&0\\\\1&0\\end{vmatrix}}{1}=0,\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&4\\\\1&4\\end{vmatrix}}{1}=0$$

Row of zeros at $s^{3}$: the first special case.

**Step 2: even polynomial.** The $s^{4}$ row is $1,\\;0,\\;4$:

$$P(s)=s^{4}+0\\cdot s^{2}+4=s^{4}+4,\\qquad \\frac{dP}{ds}=4s^{3}$$

so the $s^{3}$ row becomes $4,\\;0$.

**Step 3: the $s^{2}$ row.**

$$c_{1}=\\frac{-\\begin{vmatrix}1&0\\\\4&0\\end{vmatrix}}{4}=0,\\qquad
c_{2}=\\frac{-\\begin{vmatrix}1&4\\\\4&0\\end{vmatrix}}{4}=\\frac{-(0-16)}{4}=4$$

The first entry is zero and the row is not: the second special case. Replace it with $\\epsilon$.

**Step 4: finish with $\\epsilon$.**

$$d_{1}=\\frac{-\\begin{vmatrix}4&0\\\\ \\epsilon&4\\end{vmatrix}}{\\epsilon}=\\frac{-16}{\\epsilon},\\qquad
e_{1}=\\frac{-\\begin{vmatrix}\\epsilon&4\\\\ -\\tfrac{16}{\\epsilon}&0\\end{vmatrix}}{-\\tfrac{16}{\\epsilon}}
=\\frac{-\\left(0+\\tfrac{64}{\\epsilon}\\right)}{-\\tfrac{16}{\\epsilon}}=4$$

$$\\begin{array}{c|ccc}
s^{5} & 1 & 0 & 4\\\\
s^{4} & 1 & 0 & 4\\\\
s^{3} & 4 & 0 & 0\\\\
s^{2} & \\epsilon & 4 & 0\\\\
s^{1} & -\\tfrac{16}{\\epsilon} & 0 & 0\\\\
s^{0} & 4 & 0 & 0
\\end{array}$$

**Step 5: count.** For small $\\epsilon>0$ the first column is

$$+,\\;+,\\;+,\\;+,\\;-,\\;+$$

Two sign changes, so two roots of the original polynomial are in the right half-plane.

**Step 6: split the reading.** From the $s^{4}$ row down, the table tests $P(s)=s^{4}+4$: the same
two sign changes, so $P$ has two roots in the right half-plane, two in the left by symmetry, and
none left over for the axis. Above the $s^{4}$ row there is no sign change, so the remaining
first-order factor is in the left half-plane.

$$\\boxed{\\;2\\ \\text{right half-plane},\\quad 3\\ \\text{left half-plane},\\quad 0\\ \\text{on the }j\\omega\\text{ axis}\\;}$$

**Step 7: the symmetry pattern.** $s^{4}=-4$ has no real solution and none on the imaginary axis
either, since $(j\\omega)^{4}=\\omega^{4}\\ge0$. The four roots therefore sit one in each quadrant:
the **quadrantal** case.

**Check.**

$$s^{4}+4=(s^{2}-2s+2)(s^{2}+2s+2)\\qquad\\Longrightarrow\\qquad s=1\\pm j,\\;-1\\pm j$$

and the original factors as $(s+1)(s^{4}+4)$, giving the fifth root at $-1$. Two right, three
left, none on the axis.
`
    },
    {
      id: "6-17", difficulty: "challenge", topic: "Zero in first column", sec: "6.3",
      prompt: `The polynomial

$$s^{5}+s^{4}+2s^{3}+2s^{2}+3s+5$$

gives a zero in the first column of the $s^{3}$ row, and the entry beside it is negative. Carry
$\\epsilon$ all the way to the $s^{0}$ row and report the root distribution. Then say what the
reverse-coefficient method would have cost instead.`,
      hint: `Keep each entry as a single rational function of $\\epsilon$ and decide its sign by the term that blows up as $\\epsilon\\to0$.`,
      answer: `Two in the right half-plane, three in the left. The first column is

$$1,\\quad 1,\\quad \\epsilon,\\quad 2+\\frac{2}{\\epsilon},\\quad -\\frac{4+4\\epsilon+5\\epsilon^{2}}{2(1+\\epsilon)},\\quad 5$$

whose signs for small $\\epsilon>0$ are $+,+,+,+,-,+$: two sign changes. The reversed polynomial
$5s^{5}+3s^{4}+2s^{3}+2s^{2}+s+1$ needs no special case at all, with first column
$5,\\;3,\\;-\\tfrac43,\\;\\tfrac12,\\;2,\\;1$, and gives the same two sign changes.`,
      expert: `
**First glance:** the entry beside the zero is $-2$. A negative neighbour means the $\\epsilon$
entry below will be positive and large, so the sign pattern will not be the simple one of 6-12.

**Discard:** approximating $\\epsilon$ by a small number such as $0.01$ and evaluating. It works
until two large terms nearly cancel, and it replaces an exact argument with an arithmetic gamble.

**Path:** two rows of rational algebra in $\\epsilon$. In each entry, find the term carrying
$1/\\epsilon$; if none survives, take the limit directly.

**Check:** the reversed polynomial builds cleanly and returns the same count, which is both a
verification and the reason Nise recommends reversing first.
`,
      solution: `
**Step 1: the stall.**

$$\\begin{array}{c|ccc}
s^{5} & 1 & 2 & 3\\\\
s^{4} & 1 & 2 & 5
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&2\\\\1&2\\end{vmatrix}}{1}=0,\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&3\\\\1&5\\end{vmatrix}}{1}=-2$$

The $s^{3}$ row is $0,\\;-2$: a zero in the first column only, so replace it with $\\epsilon$.

**Step 2: the $s^{2}$ row.**

$$c_{1}=\\frac{-\\begin{vmatrix}1&2\\\\ \\epsilon&-2\\end{vmatrix}}{\\epsilon}
=\\frac{-(-2-2\\epsilon)}{\\epsilon}=\\frac{2+2\\epsilon}{\\epsilon}=2+\\frac{2}{\\epsilon}$$

$$c_{2}=\\frac{-\\begin{vmatrix}1&5\\\\ \\epsilon&0\\end{vmatrix}}{\\epsilon}=\\frac{-(0-5\\epsilon)}{\\epsilon}=5$$

**Step 3: the $s^{1}$ row.**

$$d_{1}=\\frac{-\\begin{vmatrix}\\epsilon&-2\\\\ \\tfrac{2+2\\epsilon}{\\epsilon}&5\\end{vmatrix}}
{\\tfrac{2+2\\epsilon}{\\epsilon}}
=\\frac{-\\left(5\\epsilon+\\tfrac{2(2+2\\epsilon)}{\\epsilon}\\right)}{\\tfrac{2+2\\epsilon}{\\epsilon}}
=-\\frac{5\\epsilon^{2}+4\\epsilon+4}{2(1+\\epsilon)}$$

As $\\epsilon\\to0$ this approaches $-2$, so it is negative for small $\\epsilon$ of either sign.

**Step 4: the $s^{0}$ row.** The last row always reproduces the constant term:

$$e_{1}=5$$

**Step 5: the column and its signs.**

| Row | Entry | Sign as $\\epsilon\\to0^{+}$ |
|---|---|---|
| $s^{5}$ | $1$ | $+$ |
| $s^{4}$ | $1$ | $+$ |
| $s^{3}$ | $\\epsilon$ | $+$ |
| $s^{2}$ | $2+\\dfrac{2}{\\epsilon}$ | $+$ |
| $s^{1}$ | $-\\dfrac{5\\epsilon^{2}+4\\epsilon+4}{2(1+\\epsilon)}$ | $-$ |
| $s^{0}$ | $5$ | $+$ |

Two sign changes.

$$\\boxed{\\;2\\ \\text{right half-plane},\\quad 3\\ \\text{left half-plane}\\;}$$

**Step 6: what reversal would have cost.** Reversing the coefficients gives

$$5s^{5}+3s^{4}+2s^{3}+2s^{2}+s+1$$

$$\\begin{array}{c|ccc}
s^{5} & 5 & 2 & 1\\\\
s^{4} & 3 & 2 & 1\\\\
s^{3} & -\\tfrac43 & -\\tfrac23 & 0\\\\
s^{2} & \\tfrac12 & 1 & 0\\\\
s^{1} & 2 & 0 & 0\\\\
s^{0} & 1 & 0 & 0
\\end{array}$$

First column $5,\\;3,\\;-\\tfrac43,\\;\\tfrac12,\\;2,\\;1$: two sign changes, the same answer with no
limits anywhere.

**Check.** Both routes give two in the right half-plane, and no row of zeros appeared in either,
so nothing is on the axis and the five roots split $2$ and $3$.
`
    },
    {
      id: "6-18", difficulty: "challenge", topic: "Row of zeros", sec: "6.3",
      prompt: `A sixth-order closed-loop denominator is

$$s^{6}+s^{5}+6s^{4}+5s^{3}+9s^{2}+4s+4$$

A classmate builds the table, finds no sign changes anywhere in the first column, and calls the
system stable.

**(a)** Build the table.

**(b)** Give the root distribution.

**(c)** State what the natural response does as $t\\to\\infty$, and at what frequencies.`,
      hint: `Nothing is on the $j\\omega$ axis unless a row of zeros says so. Check whether one appears before trusting the sign count.`,
      answer: `**(a)** A row of zeros appears at $s^{3}$, and the even polynomial from the $s^{4}$ row is
$P(s)=s^{4}+5s^{2}+4$.
**(b)** Four roots on the $j\\omega$ axis at $\\pm j$ and $\\pm j2$, two in the left half-plane, none
in the right.
**(c)** The system is **marginally stable**: the natural response settles into sustained
oscillation at $1$ rad/s and $2$ rad/s that never decays. No sign changes rules out
right-half-plane roots and says nothing about the axis.`,
      expert: `
**First glance:** sixth order, all coefficients present and positive. The pre-check passes, so the
table has to run, and the thing to watch for is a vanishing row rather than a negative entry.

**Discard:** the conclusion "no sign changes, therefore stable". That inference is valid only when
no row of zeros appeared.

**Path:** the $s^{3}$ row vanishes; $P(s)=s^{4}+5s^{2}+4$ is a quadratic in $s^{2}$ and factors by
inspection into $(s^{2}+1)(s^{2}+4)$.

**Check:** with four roots on the axis and two on the left, the count is complete at six, and
"no right-half-plane roots" was true all along. It was the word stable that did not follow.
`,
      solution: `
**Step 1: build to the row of zeros.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&6\\\\1&5\\end{vmatrix}}{1}=1,\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&9\\\\1&4\\end{vmatrix}}{1}=5,\\qquad
b_{3}=\\frac{-\\begin{vmatrix}1&4\\\\1&0\\end{vmatrix}}{1}=4$$

$$\\begin{array}{c|cccc}
s^{6} & 1 & 6 & 9 & 4\\\\
s^{5} & 1 & 5 & 4 & 0\\\\
s^{4} & 1 & 5 & 4 & 0\\\\
s^{3} & 0 & 0 & 0 & 0
\\end{array}$$

**Step 2: even polynomial.** The $s^{4}$ row is $1,\\;5,\\;4$:

$$P(s)=s^{4}+5s^{2}+4,\\qquad \\frac{dP}{ds}=4s^{3}+10s$$

The $s^{3}$ row becomes $4,\\;10$, which scales by $\\tfrac12$ to $2,\\;5$.

**Step 3: finish.**

$$\\frac{-\\begin{vmatrix}1&5\\\\2&5\\end{vmatrix}}{2}=\\frac{-(5-10)}{2}=\\frac52,\\qquad
\\frac{-\\begin{vmatrix}1&4\\\\2&0\\end{vmatrix}}{2}=4$$

$$\\frac{-\\begin{vmatrix}2&5\\\\ \\tfrac52&4\\end{vmatrix}}{\\tfrac52}
=\\frac{-\\left(8-\\tfrac{25}{2}\\right)}{\\tfrac52}=\\frac95,\\qquad
\\frac{-\\begin{vmatrix}\\tfrac52&4\\\\ \\tfrac95&0\\end{vmatrix}}{\\tfrac95}
=\\frac{-\\left(0-\\tfrac{36}{5}\\right)}{\\tfrac95}=4$$

$$\\begin{array}{c|cccc}
s^{6} & 1 & 6 & 9 & 4\\\\
s^{5} & 1 & 5 & 4 & 0\\\\
s^{4} & 1 & 5 & 4 & 0\\\\
s^{3} & 2 & 5 & 0 & 0\\\\
s^{2} & \\tfrac52 & 4 & 0 & 0\\\\
s^{1} & \\tfrac95 & 0 & 0 & 0\\\\
s^{0} & 4 & 0 & 0 & 0
\\end{array}$$

**Step 4: the distribution.** The first column is
$1,\\;1,\\;1,\\;2,\\;\\tfrac52,\\;\\tfrac95,\\;4$, with no sign changes, so there are no roots in the
right half-plane.

From the $s^{4}$ row down the table tests $P(s)$ alone: no sign changes there either, so $P$ has
no right-half-plane roots and, by symmetry, none in the left. All four of its roots are on the
axis:

$$s^{4}+5s^{2}+4=(s^{2}+1)(s^{2}+4)\\qquad\\Longrightarrow\\qquad s=\\pm j,\\ \\pm j2$$

Above the $s^{4}$ row, no sign changes, so the remaining quadratic factor has both roots in the
left half-plane.

$$\\boxed{\\;0\\ \\text{right half-plane},\\quad 2\\ \\text{left half-plane},\\quad 4\\ \\text{on the }j\\omega\\text{ axis}\\;}$$

**Step 5: the natural response.** The two left-half-plane roots contribute decaying terms. The
four axis roots contribute

$$A\\cos t+B\\sin t+C\\cos 2t+D\\sin 2t$$

which never decays. The system is marginally stable, and the response ends as a fixed combination
of oscillations at $1$ and $2$ rad/s.

**Check.** Divide $P(s)$ out:

$$\\frac{s^{6}+s^{5}+6s^{4}+5s^{3}+9s^{2}+4s+4}{(s^{2}+1)(s^{2}+4)}=s^{2}+s+1$$

whose roots $-\\tfrac12\\pm j\\tfrac{\\sqrt3}{2}$ are in the left half-plane. The classmate's count
was right; the word attached to it was not.
`
    },
    {
      id: "6-19", difficulty: "warmup", topic: "Stability design", sec: "6.4",
      prompt: `A plant

$$G(s)=\\frac{K}{(s+1)(s+3)}$$

sits in a unity negative feedback loop.

**(a)** Find the range of $K$ for closed-loop stability.

**(b)** What does the answer say about raising the gain of a second-order loop?`,
      hint: "For a second-order denominator the Routh table reduces to the coefficient test.",
      answer: `**(a)** $K>-3$. **(b)** No positive gain can destabilise a second-order loop: the closed-loop
poles are $-2\\pm\\sqrt{1-K}$, which for $K>1$ move along the vertical line $\\sigma=-2$ and never
reach the axis.`,
      expert: `
**First glance:** two poles and a gain give a second-order denominator, where Routh adds nothing
beyond "all coefficients positive".

**Discard:** building a full table. The $s^{1}$ row is the untouched coefficient $4$ and the
$s^{0}$ row is $3+K$.

**Path:** $(s+1)(s+3)+K=s^{2}+4s+3+K$. Both coefficients positive requires $3+K>0$.

**Check:** the pole expression confirms the geometry. Increasing $K$ slides the poles together,
then off the axis vertically, and the real part stays at $-2$ forever.
`,
      solution: `
**Step 1: closed-loop denominator.**

$$1+G(s)=0\\quad\\Longrightarrow\\quad (s+1)(s+3)+K=s^{2}+4s+(3+K)$$

**Step 2: the table.**

$$\\begin{array}{c|cc}
s^{2} & 1 & 3+K\\\\
s^{1} & 4 & 0\\\\
s^{0} & 3+K & 0
\\end{array}$$

First column $1,\\;4,\\;3+K$: no sign changes requires

$$3+K>0\\qquad\\Longrightarrow\\qquad \\boxed{\\;K>-3\\;}$$

**Step 3: what that means.** Solve the quadratic:

$$s=\\frac{-4\\pm\\sqrt{16-4(3+K)}}{2}=-2\\pm\\sqrt{1-K}$$

- $K<1$: two real poles, both left of the origin as long as $K>-3$.
- $K=1$: a repeated pole at $-2$.
- $K>1$: a complex pair $-2\\pm j\\sqrt{K-1}$, whose real part is $-2$ no matter how large $K$ gets.

Raising the gain moves the poles straight up and down a vertical line. They never cross into the
right half-plane, which is why a second-order loop cannot be destabilised by gain alone.

**Check.** $K=-3$ puts a pole exactly at the origin, the boundary the table found. That is
negative feedback with a negative gain, which is positive feedback, and it is the only way this
loop goes unstable.
`
    },
    {
      id: "6-20", difficulty: "core", topic: "Stability design", sec: "6.4",
      prompt: `Unity negative feedback around

$$G(s)=\\frac{K}{s(s+2)(s+4)}$$

**(a)** Find the range of $K$ for which the closed-loop system is stable.

**(b)** At the gain that puts the system on the boundary, find the frequency of the sustained
oscillation.`,
      hint: "Third order: $a_{2}a_{1}>a_{0}$ does part (a) in a line. For part (b), the row above the row of zeros holds the even polynomial.",
      answer: `**(a)** $0<K<48$. **(b)** At $K=48$ the $s^{1}$ row vanishes and the even polynomial is
$6s^{2}+48$, so the poles are $\\pm j2\\sqrt2$ and the system oscillates at $\\omega=2\\sqrt2$ rad/s.`,
      expert: `
**First glance:** third order after clearing, so the whole of part (a) is $a_{2}a_{1}>a_{0}$, that
is $6\\cdot8>K$.

**Discard:** trying values of $K$ and factoring each cubic. The table handles the symbol directly.

**Path:** $s(s+2)(s+4)+K=s^{3}+6s^{2}+8s+K$, then two inequalities: $(48-K)/6>0$ and $K>0$.

**Check:** at $K=48$ the polynomial factors as $(s+6)(s^{2}+8)$, so the third pole stays at $-6$
while the pair sits on the axis. The even polynomial named that pair without the factorisation.
`,
      solution: `
**Step 1: closed-loop denominator.**

$$1+G(s)=0\\quad\\Longrightarrow\\quad s(s+2)(s+4)+K=s^{3}+6s^{2}+8s+K$$

**Step 2: the table, with $K$ carried.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&8\\\\6&K\\end{vmatrix}}{6}=\\frac{-(K-48)}{6}=\\frac{48-K}{6}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 8\\\\
s^{2} & 6 & K\\\\
s^{1} & \\dfrac{48-K}{6} & 0\\\\
s^{0} & K & 0
\\end{array}$$

**Step 3: require every first-column entry positive.**

$$\\frac{48-K}{6}>0\\ \\Longrightarrow\\ K<48,\\qquad K>0$$

$$\\boxed{\\;0<K<48\\;}$$

**Step 4: the boundary.** At $K=48$ the $s^{1}$ entry is zero, so that row is a row of zeros. The
row above it is the $s^{2}$ row, $6,\\;48$, read as

$$P(s)=6s^{2}+48=0\\qquad\\Longrightarrow\\qquad s^{2}=-8\\qquad\\Longrightarrow\\qquad s=\\pm j2\\sqrt2$$

$$\\boxed{\\;\\omega=2\\sqrt2\\ \\text{rad/s}\\;}$$

**Check.** At $K=48$,

$$s^{3}+6s^{2}+8s+48=(s+6)(s^{2}+8)$$

which has exactly the pair the even polynomial predicted, plus a third pole at $-6$ that stays put.
Below $K=48$ that pair is in the left half-plane; above it, in the right, which is the two sign
changes the table reports for $K>48$.
`
    },
    {
      id: "6-21", difficulty: "core", topic: "Stability design", sec: "6.4",
      prompt: `A plant with a pole in the right half-plane,

$$G(s)=\\frac{K(s+1)}{s(s-1)(s+4)}$$

sits in a unity negative feedback loop.

**(a)** Find the range of $K$ that makes the closed-loop system stable.

**(b)** What is the frequency of oscillation at the boundary?

**(c)** What does the result say about the open-loop pole at $+1$?`,
      hint: "Clear the fraction: the numerator of $G$ joins the polynomial, it does not sit outside it.",
      answer: `**(a)** $K>6$. **(b)** $\\sqrt2$ rad/s, from the even polynomial $3s^{2}+6$ at $K=6$.
**(c)** Feedback moves it. The plant on its own runs away, and with enough gain every closed-loop
pole is in the left half-plane.`,
      expert: `
**First glance:** the plant is unstable open loop, so the useful range of $K$ will be bounded
below rather than above. Gain has to be large enough to drag the pole across.

**Discard:** the idea that the $+1$ pole disqualifies the loop. The closed-loop poles are the roots
of $D+N$, and $N$ carries $K$.

**Path:** $s(s-1)(s+4)+K(s+1)=s^{3}+3s^{2}+(K-4)s+K$. Apply $a_{2}a_{1}>a_{0}$: $3(K-4)>K$.

**Check:** at $K=6$ the polynomial is $(s+3)(s^{2}+2)$, so the boundary is a pair on the axis at
$\\pm j\\sqrt2$ with the third pole at $-3$.
`,
      solution: `
**Step 1: closed-loop denominator.**

$$1+G(s)=0\\quad\\Longrightarrow\\quad s(s-1)(s+4)+K(s+1)=0$$

$$s(s^{2}+3s-4)+Ks+K=s^{3}+3s^{2}+(K-4)s+K$$

**Step 2: the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&K-4\\\\3&K\\end{vmatrix}}{3}=\\frac{-(K-3(K-4))}{3}=\\frac{2K-12}{3}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & K-4\\\\
s^{2} & 3 & K\\\\
s^{1} & \\dfrac{2K-12}{3} & 0\\\\
s^{0} & K & 0
\\end{array}$$

**Step 3: the conditions.**

$$\\frac{2K-12}{3}>0\\ \\Longrightarrow\\ K>6,\\qquad K>0$$

The first condition is the binding one:

$$\\boxed{\\;K>6\\;}$$

Note that $K>6$ also makes the coefficient $K-4$ positive, as the coefficient pre-check requires.

**Step 4: the boundary.** At $K=6$ the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$P(s)=3s^{2}+6=0\\qquad\\Longrightarrow\\qquad s^{2}=-2\\qquad\\Longrightarrow\\qquad s=\\pm j\\sqrt2$$

$$\\boxed{\\;\\omega=\\sqrt2\\ \\text{rad/s}\\;}$$

**Step 5: the open-loop pole at $+1$.** On its own the plant's natural response contains $e^{t}$.
Closing the loop replaces $D(s)$ by $D(s)+KN(s)$, and for $K>6$ every root of that polynomial is
in the left half-plane. The runaway mode is a property of the plant, not of the controlled system.

**Check.** At $K=6$,

$$s^{3}+3s^{2}+2s+6=(s+3)(s^{2}+2)$$

matching the even polynomial. For $K$ slightly above $6$ the pair moves left and the loop is
stable; below $6$ it moves right and two poles are in the right half-plane, which is the opposite
of the usual pattern where high gain is the danger.
`
    },
    {
      id: "6-22", difficulty: "core", topic: "Stability design", sec: "6.4",
      prompt: `Unity negative feedback around

$$G(s)=\\frac{10}{s(s+1)(s+a)}$$

where $a>0$ is a plant pole you get to specify. For what values of $a$ is the closed-loop system
stable? Give the answer exactly, and find the closed-loop poles at the boundary.`,
      hint: "The parameter sits in a coefficient rather than beside the gain. The procedure does not change.",
      answer: `$a>\\dfrac{\\sqrt{41}-1}{2}$. At that value the closed-loop poles are $\\pm j\\sqrt a$ and
$-(1+a)$.`,
      expert: `
**First glance:** third order, so $a_{2}a_{1}>a_{0}$ applies with $a_{2}=1+a$ and $a_{1}=a$. The
condition is quadratic in $a$, so expect a surd.

**Discard:** decimals. $(\\sqrt{41}-1)/2$ is the answer; rounding it to $2.70$ throws away the only
form that can be checked exactly.

**Path:** $(1+a)a>10$, that is $a^{2}+a-10>0$, and the positive root of $a^{2}+a-10$ is
$(\\sqrt{41}-1)/2$.

**Check:** at the boundary $a(1+a)=10$, so $\\omega^{2}=10/(1+a)=a$. The oscillation frequency is
$\\sqrt a$ exactly, which is a tidier statement than either number alone.
`,
      solution: `
**Step 1: closed-loop denominator.**

$$s(s+1)(s+a)+10=s^{3}+(1+a)s^{2}+as+10$$

**Step 2: the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&a\\\\1+a&10\\end{vmatrix}}{1+a}=\\frac{-(10-a(1+a))}{1+a}
=\\frac{a^{2}+a-10}{1+a}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & a\\\\
s^{2} & 1+a & 10\\\\
s^{1} & \\dfrac{a^{2}+a-10}{1+a} & 0\\\\
s^{0} & 10 & 0
\\end{array}$$

**Step 3: the conditions.** With $a>0$ the entry $1+a$ is positive, and $10>0$ always. The binding
condition is

$$a^{2}+a-10>0$$

**Step 4: solve exactly.**

$$a=\\frac{-1\\pm\\sqrt{1+40}}{2}=\\frac{-1\\pm\\sqrt{41}}{2}$$

The negative root is irrelevant for $a>0$, and $a^{2}+a-10$ opens upward, so

$$\\boxed{\\;a>\\frac{\\sqrt{41}-1}{2}\\;}$$

Since $6<\\sqrt{41}<7$, the threshold lies between $\\tfrac52$ and $3$.

**Step 5: the boundary.** At equality the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$P(s)=(1+a)s^{2}+10=0\\qquad\\Longrightarrow\\qquad \\omega^{2}=\\frac{10}{1+a}$$

But $a^{2}+a=10$ means $a(1+a)=10$, so $10/(1+a)=a$ and

$$\\omega=\\sqrt a$$

Dividing $P(s)$ out of the cubic leaves the third pole:

$$\\frac{s^{3}+(1+a)s^{2}+as+10}{s^{2}+a}=s+(1+a)$$

so the third pole is at $-(1+a)$.

**Check.** Multiply back: $(s^{2}+a)(s+1+a)=s^{3}+(1+a)s^{2}+as+a(1+a)$, and $a(1+a)=10$ at the
boundary, reproducing the constant term. Moving the plant pole further left than the threshold
buys stability, which is the reverse of the usual gain problem: here the knob is a pole location,
and pushing it left adds the damping the loop needs.
`
    },
    {
      id: "6-23", difficulty: "core", topic: "Factoring via Routh-Hurwitz", sec: "6.4",
      prompt: `Use the Routh table to factor

$$s^{4}+3s^{3}+6s^{2}+12s+8$$

completely, without searching for roots.`,
      hint: "A row of zeros hands you a factor. Divide it out and the leftover is a quadratic.",
      answer: `$(s^{2}+4)(s+1)(s+2)$: roots $\\pm j2$, $-1$ and $-2$. The system is marginally stable.`,
      expert: `
**First glance:** all coefficients present and positive, so the pre-check is silent, and the table
is being built for information rather than a verdict.

**Discard:** the rational root test. It would find $-1$ and $-2$ eventually, one trial at a time,
and it would never find $\\pm j2$.

**Path:** the $s^{1}$ row vanishes, the $s^{2}$ row gives $P(s)=s^{2}+4$, and long division by a
quadratic finishes the factorisation in two steps.

**Check:** the remainder of the division must be zero. That is the test that the even polynomial
was read off the right row.
`,
      solution: `
**Step 1: build until the row of zeros.** Scale the $s^{3}$ row by $\\tfrac13$ and the $s^{2}$ row
by $\\tfrac12$:

$$\\begin{array}{c|ccc}
s^{4} & 1 & 6 & 8\\\\
s^{3} & 1 & 4 & 0\\\\
s^{2} & 1 & 4 & 0\\\\
s^{1} & 0 & 0 & 0
\\end{array}$$

the $s^{2}$ entries being

$$\\frac{-\\begin{vmatrix}1&6\\\\1&4\\end{vmatrix}}{1}=2,\\qquad
\\frac{-\\begin{vmatrix}1&8\\\\1&0\\end{vmatrix}}{1}=8$$

before scaling.

**Step 2: read the even polynomial.** The $s^{2}$ row is $1,\\;4$:

$$P(s)=s^{2}+4$$

and $P(s)$ divides the original polynomial.

**Step 3: divide.**

$$\\frac{s^{4}+3s^{3}+6s^{2}+12s+8}{s^{2}+4}=s^{2}+3s+2$$

by long division: $s^{2}$ times $s^{2}+4$ leaves $3s^{3}+2s^{2}+12s+8$; $3s$ times $s^{2}+4$
leaves $2s^{2}+8$; $2$ times $s^{2}+4$ leaves nothing. Remainder zero.

**Step 4: finish the factorisation.**

$$s^{2}+3s+2=(s+1)(s+2)$$

$$\\boxed{\\;s^{4}+3s^{3}+6s^{2}+12s+8=(s^{2}+4)(s+1)(s+2)\\;}$$

**Step 5: the verdict, from the same table.** Continue it: $dP/ds=2s$ refills the $s^{1}$ row as
$2,\\;0$, and the $s^{0}$ entry is

$$\\frac{-\\begin{vmatrix}1&4\\\\2&0\\end{vmatrix}}{2}=4$$

First column $1,\\;1,\\;1,\\;2,\\;4$: no sign changes, so nothing is in the right half-plane, and the
row of zeros says two roots are on the axis. Two on the axis at $\\pm j2$, two in the left half-plane
at $-1$ and $-2$: **marginally stable**.

**Check.** Multiply out: $(s^{2}+4)(s^{2}+3s+2)=s^{4}+3s^{3}+2s^{2}+4s^{2}+12s+8$, which is the
original.
`
    },
    {
      id: "6-24", difficulty: "challenge", topic: "Relative stability", sec: "6.4",
      prompt: `Unity negative feedback around

$$G(s)=\\frac{K}{s(s+4)(s+6)}$$

**(a)** Find the range of $K$ for stability.

**(b)** A specification asks for $T_{s}\\le4$ s. By the Chapter 4 estimate that means every
closed-loop pole must lie at or to the left of $s=-1$. Find the range of $K$ that meets it.

**(c)** Give the closed-loop poles at each end of that range.`,
      hint: "The criterion counts roots to the right of the imaginary axis. Move the axis: substitute $s=z-1$ and test the polynomial in $z$.",
      answer: `**(a)** $0<K<240$. **(b)** $15<K<64$. **(c)** At $K=15$ one pole sits exactly at $s=-1$, with
the others at $\\dfrac{-9\\pm\\sqrt{21}}{2}$; at $K=64$ a pair sits at $-1\\pm j\\sqrt7$ with the third
pole at $-8$.`,
      expert: `
**First glance:** part (b) is the same criterion asked about a different vertical line, so shift
the variable instead of inventing a method.

**Discard:** solving the cubic for trial values of $K$ and checking real parts. It answers one $K$
at a time and never produces the range.

**Path:** $s=z-1$, expand, build the table in $z$. Two inequalities again, and they bracket $K$
from both sides this time.

**Check:** the two ends are the two ways a root can cross the line $s=-1$: a single real root
crossing it at $K=15$, and a complex pair crossing it at $K=64$.
`,
      solution: `
**Part (a).**

$$s(s+4)(s+6)+K=s^{3}+10s^{2}+24s+K$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&24\\\\10&K\\end{vmatrix}}{10}=\\frac{240-K}{10}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 24\\\\
s^{2} & 10 & K\\\\
s^{1} & \\dfrac{240-K}{10} & 0\\\\
s^{0} & K & 0
\\end{array}$$

$$\\boxed{\\;0<K<240\\;}$$

**Part (b), step 1: move the axis.** Every pole at or left of $s=-1$ means no roots of the
polynomial to the right of the line $s=-1$. Substitute $s=z-1$, which maps that line to the
imaginary axis of the $z$ plane:

$$(z-1)^{3}+10(z-1)^{2}+24(z-1)+K$$

$$=(z^{3}-3z^{2}+3z-1)+(10z^{2}-20z+10)+(24z-24)+K$$

$$=z^{3}+7z^{2}+7z+(K-15)$$

**Part (b), step 2: table in $z$.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&7\\\\7&K-15\\end{vmatrix}}{7}=\\frac{-(K-15-49)}{7}=\\frac{64-K}{7}$$

$$\\begin{array}{c|cc}
z^{3} & 1 & 7\\\\
z^{2} & 7 & K-15\\\\
z^{1} & \\dfrac{64-K}{7} & 0\\\\
z^{0} & K-15 & 0
\\end{array}$$

$$64-K>0\\ \\text{and}\\ K-15>0\\qquad\\Longrightarrow\\qquad \\boxed{\\;15<K<64\\;}$$

Both conditions are tighter than part (a), as they must be: this range sits inside $0<K<240$.

**Part (c).** At $K=15$ the $z^{0}$ entry vanishes, so $z=0$ is a root, meaning $s=-1$ exactly.
The cubic factors:

$$s^{3}+10s^{2}+24s+15=(s+1)(s^{2}+9s+15)$$

with the other two roots at $\\dfrac{-9\\pm\\sqrt{21}}{2}$, both further left.

At $K=64$ the $z^{1}$ row vanishes, and the $z^{2}$ row gives $P(z)=7z^{2}+49$, so $z=\\pm j\\sqrt7$
and

$$s=-1\\pm j\\sqrt7$$

with the third pole at $-8$, since $s^{3}+10s^{2}+24s+64=(s+8)(s^{2}+2s+8)$.

**Check.** Both boundary cases put at least one pole exactly on the line $\\sigma=-1$, which is the
settling-time limit: $T_{s}=4/1=4$ s. Inside $15<K<64$ every pole has $\\sigma>1$ and the whole
response settles faster than $4$ s, not just the dominant pair.
`
    },
    {
      id: "6-25", difficulty: "challenge", topic: "Stability design", sec: "6.4",
      prompt: `A controller $K(s+a)$, with $K>0$ and $a>0$, drives the plant

$$\\frac{1}{s^{2}(s+4)}$$

in a unity negative feedback loop.

**(a)** Find every condition on $K$ and $a$ for closed-loop stability.

**(b)** Interpret the condition on $a$ in terms of the plant's pole at $-4$.

**(c)** What does the system do when $a=4$?`,
      hint: "Two symbols, same procedure: every first-column entry positive. Factor each entry before reading its sign.",
      answer: `**(a)** $K>0$ and $0<a<4$. No value of $K$ rescues $a\\ge4$.
**(b)** The controller's zero has to sit between the origin and the plant pole at $-4$.
**(c)** At $a=4$ the $s^{1}$ row vanishes: sustained oscillation at $\\omega=\\sqrt K$ rad/s.`,
      expert: `
**First glance:** two integrators in the plant. Gain alone cannot stabilise it, so the zero is
doing the work and the interesting condition will be on $a$.

**Discard:** picking a value of $a$ and solving for $K$. The table keeps both symbols and returns
the region in one pass.

**Path:** $s^{2}(s+4)+K(s+a)=s^{3}+4s^{2}+Ks+Ka$, and the $s^{1}$ entry factors as $K(4-a)/4$,
which makes the sign reading immediate.

**Check:** setting $a=0$ removes the zero and the $s^{0}$ entry becomes $0$, which is a pole
stranded at the origin. The zero is what lifts the constant term off zero.
`,
      solution: `
**Step 1: closed-loop denominator.**

$$1+\\frac{K(s+a)}{s^{2}(s+4)}=0\\quad\\Longrightarrow\\quad s^{2}(s+4)+K(s+a)=s^{3}+4s^{2}+Ks+Ka$$

**Step 2: the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&K\\\\4&Ka\\end{vmatrix}}{4}=\\frac{-(Ka-4K)}{4}=\\frac{K(4-a)}{4}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & K\\\\
s^{2} & 4 & Ka\\\\
s^{1} & \\dfrac{K(4-a)}{4} & 0\\\\
s^{0} & Ka & 0
\\end{array}$$

**Step 3: require both entries positive.**

$$\\frac{K(4-a)}{4}>0\\qquad\\text{and}\\qquad Ka>0$$

With $K>0$ the two conditions become $a<4$ and $a>0$:

$$\\boxed{\\;K>0,\\qquad 0<a<4\\;}$$

If $K<0$ the conditions would need $a>4$ and $a<0$ at once, which is impossible, so no negative
gain works either.

**Step 4: the interpretation.** The stable set does not involve $K$ at all beyond its sign. No
amount of gain fixes a controller whose zero is at or left of $-4$; the zero has to be placed
between the origin and the plant pole. Gain then scales the response without changing the verdict.

**Step 5: $a=4$.** The $s^{1}$ entry becomes zero, so that row is a row of zeros. The $s^{2}$ row
gives

$$P(s)=4s^{2}+4K=0\\qquad\\Longrightarrow\\qquad s^{2}=-K\\qquad\\Longrightarrow\\qquad s=\\pm j\\sqrt K$$

The system oscillates at $\\omega=\\sqrt K$ rad/s, and the gain now sets the frequency of the
oscillation rather than whether one occurs.

**Check.** Let $a\\to0$. Then $Ka\\to0$, the $s^{0}$ entry vanishes, and the denominator becomes
$s(s^{2}+4s+K)$: a pole stranded at the origin, marginally stable. That is the zero cancelling one
of the two integrators, which leaves the loop with the other one uncontrolled.
`
    },
    {
      id: "6-26", difficulty: "challenge", topic: "Stability design", sec: "6.4",
      prompt: `Unity negative feedback around

$$G(s)=\\frac{K}{(s+1)(s+2)(s+3)(s+4)}$$

a plant with four left-half-plane poles and no integrator.

**(a)** Find the range of $K$ for stability.

**(b)** Find the gain and the frequency at which the loop oscillates.

**(c)** Every open-loop pole is in the left half-plane. Say in one sentence why a large enough
gain still destabilises the loop.`,
      hint: "Expand the product in pairs: $(s+1)(s+4)$ and $(s+2)(s+3)$ share the same $s$ coefficient.",
      answer: `**(a)** $-24<K<126$. **(b)** $K=126$ and $\\omega=\\sqrt5$ rad/s, from the even polynomial
$30s^{2}+150$. **(c)** The closed-loop poles are the roots of $D(s)+K$, which move as $K$ changes;
the open-loop poles are only where those roots sit when $K=0$.`,
      expert: `
**First glance:** fourth order with the gain landing in the constant term alone, since the plant
has no zeros. So $K$ appears in two first-column entries and both give bounds.

**Discard:** expanding the quartic term by term. Pair the factors as $(s+1)(s+4)=s^{2}+5s+4$ and
$(s+2)(s+3)=s^{2}+5s+6$, then let $u=s^{2}+5s$ and multiply $(u+4)(u+6)$.

**Path:** $s^{4}+10s^{3}+35s^{2}+50s+(24+K)$, scale the $s^{3}$ row by $\\tfrac1{10}$, and read the
two conditions off the $s^{1}$ and $s^{0}$ entries.

**Check:** at $K=126$ the polynomial factors as $(s^{2}+5)(s^{2}+10s+30)$, so the other pair stays
at $-5\\pm j\\sqrt5$ while the oscillating pair sits on the axis.
`,
      solution: `
**Step 1: expand the plant denominator.** With $u=s^{2}+5s$,

$$(s+1)(s+4)=u+4,\\qquad (s+2)(s+3)=u+6$$

$$(u+4)(u+6)=u^{2}+10u+24=(s^{2}+5s)^{2}+10(s^{2}+5s)+24
=s^{4}+10s^{3}+35s^{2}+50s+24$$

so the closed-loop denominator is

$$s^{4}+10s^{3}+35s^{2}+50s+(24+K)$$

**Step 2: the table.** Scale the $s^{3}$ row by $\\tfrac1{10}$:

$$\\begin{array}{c|ccc}
s^{4} & 1 & 35 & 24+K\\\\
s^{3} & 1 & 5 & 0
\\end{array}$$

$$b_{1}=\\frac{-\\begin{vmatrix}1&35\\\\1&5\\end{vmatrix}}{1}=30,\\qquad
b_{2}=\\frac{-\\begin{vmatrix}1&24+K\\\\1&0\\end{vmatrix}}{1}=24+K$$

$$c_{1}=\\frac{-\\begin{vmatrix}1&5\\\\30&24+K\\end{vmatrix}}{30}=\\frac{-(24+K-150)}{30}=\\frac{126-K}{30}$$

$$\\begin{array}{c|ccc}
s^{4} & 1 & 35 & 24+K\\\\
s^{3} & 1 & 5 & 0\\\\
s^{2} & 30 & 24+K & 0\\\\
s^{1} & \\dfrac{126-K}{30} & 0 & 0\\\\
s^{0} & 24+K & 0 & 0
\\end{array}$$

**Step 3: the conditions.**

$$126-K>0\\quad\\text{and}\\quad 24+K>0\\qquad\\Longrightarrow\\qquad \\boxed{\\;-24<K<126\\;}$$

**Step 4: the oscillation.** At $K=126$ the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$P(s)=30s^{2}+(24+126)=30s^{2}+150=0\\qquad\\Longrightarrow\\qquad s^{2}=-5$$

$$\\boxed{\\;K=126,\\qquad \\omega=\\sqrt5\\ \\text{rad/s}\\;}$$

**Step 5: part (c).** Closing the loop replaces the denominator $D(s)$ by $D(s)+K$, whose roots
depend on $K$; the open-loop poles are those roots at $K=0$ only, so their being on the left says
nothing about where the roots go as $K$ grows.

**Check.** At $K=126$,

$$s^{4}+10s^{3}+35s^{2}+50s+150=(s^{2}+5)(s^{2}+10s+30)$$

The second factor has roots $-5\\pm j\\sqrt5$, safely left, so exactly one pair crossed. The lower
bound $K=-24$ is where the constant term $24+K$ reaches zero, putting a root at the origin.
`
    },
    {
      id: "6-27", difficulty: "challenge", topic: "Stability design", sec: "6.4",
      prompt: `In the position loop below, the forward gain is $60$ and the plant is

$$\\frac{1}{s(s+2)(s+4)}$$

A tachometer measures the output rate and feeds $K_{t}s$ back into an inner summing junction.

**(a)** Show that the loop is unstable with the tachometer removed, $K_{t}=0$.

**(b)** Find the range of $K_{t}$ that stabilises it.

**(c)** Find the frequency of oscillation at the boundary.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 265" class="nx-fig">
  <defs><marker id="nx6b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="58" font-size="15">R(s)</text>
  <path d="M40 52 L58 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <circle cx="78" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <path d="M65 52 L91 52 M78 39 L78 65" stroke="currentColor" stroke-width="1.1" opacity=".45"/>
  <text x="54" y="44" text-anchor="middle" font-size="14">+</text>
  <text x="92" y="86" text-anchor="middle" font-size="14">&#8722;</text>
  <path d="M98 52 L150 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <rect x="150" y="30" width="64" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="182" y="58" text-anchor="middle" font-size="15">60</text>
  <path d="M214 52 L246 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <circle cx="266" cy="52" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <path d="M253 52 L279 52 M266 39 L266 65" stroke="currentColor" stroke-width="1.1" opacity=".45"/>
  <text x="242" y="44" text-anchor="middle" font-size="14">+</text>
  <text x="280" y="86" text-anchor="middle" font-size="14">&#8722;</text>
  <path d="M286 52 L340 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <rect x="340" y="30" width="210" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="445" y="58" text-anchor="middle" font-size="15">1 / (s(s + 2)(s + 4))</text>
  <path d="M550 52 L672 52" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <text x="684" y="58" font-size="15">C(s)</text>
  <circle cx="580" cy="52" r="4" fill="currentColor" stroke="none"/>
  <circle cx="630" cy="52" r="4" fill="currentColor" stroke="none"/>
  <path d="M580 52 L580 152 L420 152" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <rect x="330" y="130" width="90" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="375" y="158" text-anchor="middle" font-size="15">K<tspan dy="4" font-size="11">t</tspan><tspan dy="-4"> s</tspan></text>
  <path d="M330 152 L266 152 L266 72" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
  <path d="M630 52 L630 222 L78 222 L78 72" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx6b)"/>
</svg>
<figcaption>Problem 6-27. The tachometer closes a minor loop around the plant.</figcaption>
</figure>`,
      hint: "Reduce the inner loop to a single block first. The tachometer's $s$ ends up in one coefficient of the closed-loop denominator.",
      answer: `**(a)** With $K_{t}=0$ the denominator is $s^{3}+6s^{2}+8s+60$, and $6\\cdot8=48<60$, so the
$s^{1}$ entry is negative: two poles in the right half-plane.
**(b)** $K_{t}>2$.
**(c)** $\\sqrt{10}$ rad/s, from the even polynomial $6s^{2}+60$ at $K_{t}=2$.`,
      expert: `
**First glance:** the minor loop is a Chapter 5 reduction, and rate feedback adds an $s$, so
$K_{t}$ will land in the $s^{1}$ coefficient of the closed-loop denominator. For a cubic that is
exactly the coefficient the condition $a_{2}a_{1}>a_{0}$ leans on.

**Discard:** writing $1+GH$ for the whole diagram at once. The inner loop has to be collapsed
first or the feedback formula does not apply.

**Path:** inner loop gives $\\dfrac{1}{s(s+2)(s+4)+K_{t}s}$, then the outer loop with gain $60$
gives $s^{3}+6s^{2}+(8+K_{t})s+60$.

**Check:** $K_{t}$ appears only in $a_{1}$, and the dc gain of the closed loop is $60/60=1$
whatever $K_{t}$ is, so the tachometer buys stability without moving the steady-state value.
`,
      solution: `
**Step 1: collapse the minor loop.** With forward block $P(s)=\\dfrac{1}{s(s+2)(s+4)}$ and negative
feedback $K_{t}s$,

$$\\frac{P}{1+K_{t}sP}=\\frac{\\dfrac{1}{s(s+2)(s+4)}}{1+\\dfrac{K_{t}s}{s(s+2)(s+4)}}
=\\frac{1}{s(s+2)(s+4)+K_{t}s}$$

**Step 2: close the outer loop.** The forward path is now $60$ times that block, with unity
feedback:

$$T(s)=\\frac{60}{s(s+2)(s+4)+K_{t}s+60}$$

Expand $s(s+2)(s+4)=s^{3}+6s^{2}+8s$:

$$\\text{denominator}=s^{3}+6s^{2}+(8+K_{t})s+60$$

**Step 3: part (a), $K_{t}=0$.** The denominator is $s^{3}+6s^{2}+8s+60$, and

$$a_{2}a_{1}=6\\cdot8=48<60=a_{0}$$

so the $s^{1}$ entry is negative:

$$b_{1}=\\frac{-\\begin{vmatrix}1&8\\\\6&60\\end{vmatrix}}{6}=\\frac{-(60-48)}{6}=-2$$

First column $1,\\;6,\\;-2,\\;60$: two sign changes, two poles in the right half-plane. The gain of
$60$ is too high for this plant on its own.

**Step 4: part (b), general $K_{t}$.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&8+K_{t}\\\\6&60\\end{vmatrix}}{6}=\\frac{-(60-6(8+K_{t}))}{6}
=\\frac{6K_{t}-12}{6}=K_{t}-2$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 8+K_{t}\\\\
s^{2} & 6 & 60\\\\
s^{1} & K_{t}-2 & 0\\\\
s^{0} & 60 & 0
\\end{array}$$

$$K_{t}-2>0\\qquad\\Longrightarrow\\qquad \\boxed{\\;K_{t}>2\\;}$$

**Step 5: part (c).** At $K_{t}=2$ the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$P(s)=6s^{2}+60=0\\qquad\\Longrightarrow\\qquad s^{2}=-10\\qquad\\Longrightarrow\\qquad s=\\pm j\\sqrt{10}$$

$$\\boxed{\\;\\omega=\\sqrt{10}\\ \\text{rad/s}\\;}$$

**Check.** At $K_{t}=2$,

$$s^{3}+6s^{2}+10s+60=(s+6)(s^{2}+10)$$

as the even polynomial predicted. Two further points are worth keeping. The tachometer changes
only $a_{1}$, which is the one coefficient the third-order condition can be fixed through. And
$T(0)=60/60=1$ for every $K_{t}$, so the stabilisation costs nothing in steady-state position:
rate feedback is invisible at dc, because $s=0$ kills it.
`
    },
    {
      id: "6-28", difficulty: "core", topic: "Stability in state space", sec: "6.5",
      prompt: `A system has

$$\\mathbf{A}=\\begin{bmatrix}-1&1&0\\\\0&-4&2\\\\-1&0&-2\\end{bmatrix}$$

Determine whether it is stable.`,
      hint: `The poles are the roots of $\\det(s\\mathbf{I}-\\mathbf{A})=0$. Expand along the row or column with the most zeros.`,
      answer: `Stable. $\\det(s\\mathbf{I}-\\mathbf{A})=s^{3}+7s^{2}+14s+10$, whose first column
$1,\\;7,\\;\\tfrac{88}{7},\\;10$ has no sign changes.`,
      expert: `
**First glance:** a $3\\times3$ determinant with two zeros in the first column, so cofactor
expansion down that column is short.

**Discard:** finding the eigenvalues. The cubic has no rational root, so factoring is not
available and the table is the only exact route.

**Path:** expand, then apply $a_{2}a_{1}>a_{0}$: $7\\cdot14=98$ against $10$.

**Check:** the coupling term contributes $+2$ to the constant, taking it from $8$ to $10$. That
is small enough to leave the verdict alone here, and 6-29 is the case where it is not.
`,
      solution: `
**Step 1: form $s\\mathbf{I}-\\mathbf{A}$.**

$$s\\mathbf{I}-\\mathbf{A}=\\begin{bmatrix}s+1&-1&0\\\\0&s+4&-2\\\\1&0&s+2\\end{bmatrix}$$

**Step 2: expand the determinant along the first row.**

$$\\det=(s+1)\\begin{vmatrix}s+4&-2\\\\0&s+2\\end{vmatrix}
-(-1)\\begin{vmatrix}0&-2\\\\1&s+2\\end{vmatrix}
+0$$

$$=(s+1)(s+4)(s+2)+\\big(0\\cdot(s+2)-(-2)(1)\\big)$$

$$=(s+1)(s^{2}+6s+8)+2=s^{3}+7s^{2}+14s+8+2$$

$$\\det(s\\mathbf{I}-\\mathbf{A})=s^{3}+7s^{2}+14s+10$$

**Step 3: the Routh table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&14\\\\7&10\\end{vmatrix}}{7}=\\frac{-(10-98)}{7}=\\frac{88}{7}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 14\\\\
s^{2} & 7 & 10\\\\
s^{1} & \\tfrac{88}{7} & 0\\\\
s^{0} & 10 & 0
\\end{array}$$

No sign changes, so all three eigenvalues are in the left half-plane:

$$\\boxed{\\;\\text{stable}\\;}$$

**Check.** The third-order rule gives the same thing in one line: $a_{2}a_{1}=98>10=a_{0}$. And
the cubic has no rational root, since $\\pm1,\\pm2,\\pm5,\\pm10$ all fail:

$$(-1)^{3}+7(-1)^{2}+14(-1)+10=2,\\qquad (-2)^{3}+7(-2)^{2}+14(-2)+10=2$$

$$(-5)^{3}+7(-5)^{2}+14(-5)+10=-10,\\qquad (-10)^{3}+7(-10)^{2}+14(-10)+10=-430$$

so no amount of trial factoring would have settled this, and the table did it in two entries.
`
    },
    {
      id: "6-29", difficulty: "core", topic: "Stability in state space", sec: "6.5",
      prompt: `Every diagonal entry of

$$\\mathbf{A}=\\begin{bmatrix}-1&3&0\\\\0&-1&3\\\\3&0&-1\\end{bmatrix}$$

is negative, so each state decays when the others are held at zero. Is the system stable?`,
      hint: "Expand the determinant before drawing any conclusion from the diagonal. Watch what the off-diagonal terms do to the constant term.",
      answer: `No. $\\det(s\\mathbf{I}-\\mathbf{A})=(s+1)^{3}-27=s^{3}+3s^{2}+3s-26$, whose constant term is
negative: one root in the right half-plane, at $s=2$.`,
      expert: `
**First glance:** the states form a ring, $x_{1}\\to x_{2}\\to x_{3}\\to x_{1}$, each link with gain
$3$. A loop of gain $27$ around three first-order lags is exactly the kind of arrangement that goes
unstable.

**Discard:** reading stability off the diagonal. Eigenvalues are not diagonal entries unless the
matrix is triangular, and this one is not.

**Path:** the determinant is $(s+1)^{3}$ minus the product of the ring terms, $3\\cdot3\\cdot3$. The
constant term lands at $1-27=-26$, and a negative constant with a positive leading coefficient
ends the question.

**Check:** the exact root is $s+1=3$, so $s=2$, and the table's single sign change agrees.
`,
      solution: `
**Step 1: form $s\\mathbf{I}-\\mathbf{A}$.**

$$s\\mathbf{I}-\\mathbf{A}=\\begin{bmatrix}s+1&-3&0\\\\0&s+1&-3\\\\-3&0&s+1\\end{bmatrix}$$

**Step 2: expand along the first row.**

$$\\det=(s+1)\\begin{vmatrix}s+1&-3\\\\0&s+1\\end{vmatrix}
-(-3)\\begin{vmatrix}0&-3\\\\-3&s+1\\end{vmatrix}+0$$

$$=(s+1)^{3}+3\\big(0\\cdot(s+1)-(-3)(-3)\\big)=(s+1)^{3}-27$$

$$=s^{3}+3s^{2}+3s+1-27=s^{3}+3s^{2}+3s-26$$

**Step 3: the pre-check settles it.** The constant term is negative while the leading coefficient
is positive, so at least one root is not in the left half-plane. **Not stable.**

**Step 4: the table, for the count.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&3\\\\3&-26\\end{vmatrix}}{3}=\\frac{-(-26-9)}{3}=\\frac{35}{3}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 3\\\\
s^{2} & 3 & -26\\\\
s^{1} & \\tfrac{35}{3} & 0\\\\
s^{0} & -26 & 0
\\end{array}$$

First column $1,\\;3,\\;\\tfrac{35}{3},\\;-26$: one sign change, so exactly one root in the right
half-plane and two in the left.

**Step 5: where it is.** $(s+1)^{3}=27$ has the real solution $s+1=3$, so

$$s=2$$

and dividing out gives $s^{2}+5s+13$, with roots $-\\tfrac52\\pm j\\tfrac{3\\sqrt3}{2}$, both on the
left. One right, two left, as counted.

**Check.** The instability is the ring, not the diagonal. Each state on its own decays like
$e^{-t}$, and the three couplings multiply to $27$, which is enough to sustain and amplify a
circulation among them. Compare 6-28, where the same kind of structure carried a loop product of
$1\\cdot2\\cdot(-1)=-2$ and changed the constant term by only $+2$.
`
    },
    {
      id: "6-30", difficulty: "challenge", topic: "Stability in state space", sec: "6.5",
      prompt: `A system has

$$\\mathbf{A}=\\begin{bmatrix}-1&1&0\\\\0&-2&1\\\\-K&0&-3\\end{bmatrix}$$

**(a)** Find the range of $K$ for stability.

**(b)** Find the value of $K$ at which the system oscillates, and the frequency.

**(c)** The characteristic polynomial is one a familiar feedback loop produces. Which loop, and
which entry of $\\mathbf{A}$ closes it?`,
      hint: "Carry $K$ through the determinant. Then read the result as $D(s)+K$ and ask what $D(s)$ is.",
      answer: `**(a)** $-6<K<60$. **(b)** $K=60$, $\\omega=\\sqrt{11}$ rad/s.
**(c)** $\\det(s\\mathbf{I}-\\mathbf{A})=(s+1)(s+2)(s+3)+K$, the closed-loop denominator of a unity
negative feedback loop around $\\dfrac{K}{(s+1)(s+2)(s+3)}$. The entry $-K$ in the bottom-left
corner is the feedback path, returning the third state to the first.`,
      expert: `
**First glance:** the superdiagonal ones make a chain, $x_{1}\\leftarrow x_{2}\\leftarrow x_{3}$,
and the lone bottom-left entry closes it. That is a loop, and the determinant should come out as
the product of the diagonal terms plus a loop term.

**Discard:** expanding the determinant blindly. Two of the three cofactors are zero, so the
expansion is two terms.

**Path:** $\\det=(s+1)(s+2)(s+3)+K=s^{3}+6s^{2}+11s+6+K$, then the usual two inequalities.

**Check:** the third-order rule reads $6\\cdot11>6+K$, that is $K<60$, matching the table exactly.
`,
      solution: `
**Step 1: form $s\\mathbf{I}-\\mathbf{A}$.**

$$s\\mathbf{I}-\\mathbf{A}=\\begin{bmatrix}s+1&-1&0\\\\0&s+2&-1\\\\K&0&s+3\\end{bmatrix}$$

**Step 2: expand along the first row.**

$$\\det=(s+1)\\begin{vmatrix}s+2&-1\\\\0&s+3\\end{vmatrix}
-(-1)\\begin{vmatrix}0&-1\\\\K&s+3\\end{vmatrix}+0$$

$$=(s+1)(s+2)(s+3)+\\big(0\\cdot(s+3)-(-1)K\\big)=(s+1)(s+2)(s+3)+K$$

$$=s^{3}+6s^{2}+11s+6+K$$

**Step 3: the table.**

$$b_{1}=\\frac{-\\begin{vmatrix}1&11\\\\6&6+K\\end{vmatrix}}{6}=\\frac{-(6+K-66)}{6}=\\frac{60-K}{6}$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 11\\\\
s^{2} & 6 & 6+K\\\\
s^{1} & \\dfrac{60-K}{6} & 0\\\\
s^{0} & 6+K & 0
\\end{array}$$

**Step 4: the conditions.**

$$60-K>0\\quad\\text{and}\\quad 6+K>0\\qquad\\Longrightarrow\\qquad \\boxed{\\;-6<K<60\\;}$$

**Step 5: the boundary.** At $K=60$ the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$P(s)=6s^{2}+(6+60)=6s^{2}+66=0\\qquad\\Longrightarrow\\qquad s^{2}=-11$$

$$\\boxed{\\;K=60,\\qquad \\omega=\\sqrt{11}\\ \\text{rad/s}\\;}$$

**Step 6: the loop hiding in the matrix.** The polynomial is $D(s)+K$ with
$D(s)=(s+1)(s+2)(s+3)$, which is what unity negative feedback around

$$G(s)=\\frac{K}{(s+1)(s+2)(s+3)}$$

produces. Reading $\\mathbf{A}$ back: the diagonal holds three first-order lags with time constants
$1$, $\\tfrac12$ and $\\tfrac13$; the superdiagonal ones pass each state to the next; and the $-K$
in the bottom-left corner feeds the last state back to the first with gain $K$. The state-space
model and the block diagram are the same system written two ways.

**Check.** At $K=60$,

$$s^{3}+6s^{2}+11s+66=(s+6)(s^{2}+11)$$

matching the even polynomial, with the third pole parked at $-6$. At the lower end, $K=-6$ makes
the constant term zero and strands a pole at the origin.
`
    },
  ]
});
