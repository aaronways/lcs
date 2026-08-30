/* ============================================================
   TEMPLATE: copy to chapters/chNN.js and fill in.
   Remember: inside these backtick strings, every LaTeX backslash
   is DOUBLED.  \frac  must be written  \\frac
   ============================================================ */

registerChapter({
  id: 0,                                   // chapter number, e.g. 4
  title: "Chapter title here",             // e.g. "Time Response"
  sections: "4.1–4.8",                     // which sections your course covers

  /* ---------- Study guide: collapsible sections, markdown + LaTeX ---------- */
  guide: [
    {
      title: "Section heading shown on the accordion",
      body: `
Regular markdown works here: **bold**, *italic*, lists, tables, \`code\`.

Inline math looks like $G(s) = C(s)/R(s)$.

Display math goes on its own lines:

$$\\frac{C(s)}{R(s)} = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$$

| Column | Column |
|---|---|
| $a$ | $b$ |

> Blockquotes render as a highlighted callout: good for warnings and traps.
`
    }
  ],

  /* ---------- Formula sheet: one card per entry ---------- */
  formulas: [
    { latex: "G(s)=\\frac{C(s)}{R(s)}",
      note: "Plain-text note under the equation. No LaTeX here: this field is not typeset." }
  ],

  /* ---------- Problems ---------- */
  problems: [
    {
      id: "0-01",                          // unique within the chapter
      difficulty: "warmup",                // "warmup" | "core" | "challenge"
      topic: "Topic name",                 // drives the filter dropdown - keep names consistent
      prompt: "The question goes here. Math with $\\zeta$ and $$\\omega_n$$ both work.",
      hint: "Optional. Omit the field entirely if there is no hint.",
      expert: `
Optional but strongly recommended. This renders behind its own "Expert read"
button, separate from the full solution. It is the recognition narrative, not a
summary of the solution. Four beats, always in this order, and no others:

**First glance:** what the form of the equation or the specific numbers tell you
before any work is done.

**Discard:** the methods that would also reach the answer, and the concrete reason
each is the slower or more error-prone route here.

**Path:** the two or three lines that actually produce the answer.

**Check:** the structural feature the recognition rested on, and the sanity check
that confirms the result.

Rules for this field:
- No commentary about what "an expert" notices, says, or does. Write the observation
  itself.
- No claims about how long a step takes.
- No commentary about what students get wrong, or what an exam is grading. If an error
  is common, name the error and its cause.
- No "not X, it is Y" framing. State what the thing is.
`,
      answer: "$$\\text{short final answer}$$",
      solution: `
**Step 1: name what you are doing.** Then do it.

$$\\text{show the algebra}$$

**Step 2: keep going.** Each step gets a bold label so it can be skimmed.

**Check.** End with a sanity check: initial value, final value, sign, units, or
physical plausibility. This is the part students learn the most from.
`
    }
  ]
});
