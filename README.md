# Linear Control Systems · Course Companion

A static study site: chapter guides, formula sheets, and worked problem sets with
step-by-step solutions. No build step, no server, no dependencies to install.

Live: [aaronways.github.io/lcs](https://aaronways.github.io/lcs/)

## Run it

**Locally:** double-click `index.html`. Content lives in `.js` files loaded by
`<script>` tags rather than JSON fetched at runtime, so this works from `file://`
without a local server.

**Publish it (GitHub Pages):**

1. Push this folder to the repo root (`index.html` must sit at the root).
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The empty `.nojekyll` file is required. GitHub Pages runs Jekyll by default,
   and Jekyll ignores files that start with `_` (including `chapters/_template.js`).

Deep links use the hash, so they work on project Pages:

- `https://aaronways.github.io/lcs/#/` course map
- `https://aaronways.github.io/lcs/#/ref` reference tables
- `https://aaronways.github.io/lcs/#/ch/4/problems` Chapter 4 problems

## What's here

```
index.html            the app: layout, theme, rendering, progress
favicon.svg           tab icon
404.html              sends unknown paths back to the app
.nojekyll             disable Jekyll on GitHub Pages
reference.js          global formula / transform / algebra tables
chapters/ch01.js      Chapter 1
chapters/ch02.js      Chapter 2
chapters/ch04.js      Chapter 4
chapters/_template.js copy this to start a new chapter
```

## Adding a chapter

1. Copy `chapters/_template.js` to `chapters/chNN.js` and fill it in.
2. Add one line to `index.html` next to the existing ones:

```html
<script src="chapters/chNN.js"></script>
```

Chapters appear in the sidebar in the order their script tags load.

## Authoring rules

**Escape every LaTeX backslash twice.** Content lives inside JavaScript template
literals, so `\frac` must be written `\\frac`. Get this wrong and JavaScript
silently eats the command.

```js
body: `The transfer function is $$G(s)=\\frac{C(s)}{R(s)}$$ evaluated with zero ICs.`
```

**Math delimiters:** `$...$` inline, `$$...$$` display. Markdown runs around the
math, not through it. Accordion titles are typeset too, so `$F(s)$` in a title
renders as math.

**Markdown supported in every body field:** headings, bold, italic, lists, tables,
blockquotes, inline code.

## Copyright

Do not copy problems or solutions from the textbook or its solutions manual, and
do not host or link the textbook PDF. Everything here is original material
written against the concepts.

## Notes

- Progress is stored in `localStorage` under `lcs-companion:v1`. Theme is stored
  under `lcs-companion:theme`. Nothing is uploaded.
- The search box searches the current chapter and switches to Problems.
- Print → Save as PDF expands hidden solutions.
- KaTeX, marked, and the fonts load from public CDNs.
