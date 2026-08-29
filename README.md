# Linear Control Systems — Course Companion

A static study site: chapter guides, formula sheets, and worked problem sets with
step-by-step solutions. No build step, no server, no dependencies to install.

## Run it

**Locally:** double-click `index.html`. That's it. Content lives in `.js` files loaded
by `<script>` tags rather than JSON fetched at runtime, specifically so this works from
`file://` without a local server.

**Publish it (GitHub Pages, free):**

1. Create a repo and push these files.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Save. Live at `https://<username>.github.io/<repo>` in about a minute.

Readers need no account. Classmates can open pull requests to fix errors.

## What's here

```
index.html            the whole app — layout, rendering, progress tracking
chapters/ch01.js      Chapter 1: 8 guide sections, 4 reference cards, 25 problems
chapters/ch02.js      Chapter 2: 7 guide sections, 10 formula cards, 5 problems
chapters/_template.js copy this to start a new chapter
```

## Adding a chapter

1. Copy `chapters/_template.js` to `chapters/ch04.js` and fill it in.
2. Add one line to `index.html`, next to the existing ones:

```html
<script src="chapters/ch04.js"></script>
```

Chapters appear in the sidebar in the order their script tags load.

## Authoring rules

**Escape every LaTeX backslash twice.** Content lives inside JavaScript template
literals, so `\frac` must be written `\\frac`. Get this wrong and JavaScript silently
eats the command — `\a` becomes `a`, and your equation renders as gibberish rather than
throwing an error.

```js
body: `The transfer function is $$G(s)=\\frac{C(s)}{R(s)}$$ evaluated with zero ICs.`
```

**Math delimiters:** `$...$` inline, `$$...$$` display. Markdown runs *around* the math,
not through it — `mdMath()` in `index.html` extracts math before parsing markdown and
reinserts it after, so underscores and backslashes inside equations are safe.

**Markdown supported in every body field:** headings, bold, italic, lists, tables,
blockquotes, inline code.

**Problem fields:**

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique across the chapter, e.g. `"4-07"`. Used as the progress key. |
| `difficulty` | yes | `"warmup"`, `"core"`, or `"challenge"` — drives the filter and the tag color. |
| `topic` | yes | Free text. Populates the topic filter dropdown, so keep names consistent. |
| `prompt` | yes | The question. |
| `answer` | yes | Short final answer, revealed first. |
| `solution` | yes | Full worked solution, revealed second. |
| `hint` | no | Adds a Hint button ahead of the answer. |

The two-stage reveal (answer, then full solution) is deliberate — it lets someone check
their result without being handed the method.

## Before you publish a problem set

Verify the answers. A wrong worked solution is worse than no solution, and this site
will be used by people who trust it. Most answers in Chapters 2–11 reduce to polynomial
roots or step responses, which are quick to check:

```python
import numpy as np
from scipy import signal
import sympy as sp

s, t = sp.symbols('s t')
F = 5 / ((s + 2) * (s + 7))
print(sp.simplify(sp.inverse_laplace_transform(F, s, t)))

sys = signal.TransferFunction([2], [1, 3, 2])
print("poles:", np.roots([1, 3, 2]))
tt, y = signal.step(sys)
print("final value:", y[-1])
```

## Copyright

Do not copy problems or solutions from the textbook or its solutions manual, and do not
host or link the textbook PDF. Everything here is original material written against the
concepts. Keep it that way — this is a public site.

## Notes

- Progress is stored in `localStorage` under the key `lcs-companion:v1`. It is per-browser
  and per-device; there is no account system and nothing is uploaded anywhere.
- The search box searches problem prompts, answers, and solutions across the current
  chapter and switches to the Problems tab automatically.
- The print stylesheet expands all hidden solutions, so *Print → Save as PDF* produces a
  complete offline copy of any chapter.
- KaTeX and marked load from jsDelivr. To work fully offline, download both and change
  the four CDN `<link>`/`<script>` tags in `index.html` to local paths.
