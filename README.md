# Nexus

Guides, formula sheets, and original problems for linear control systems
(Nise, *Control Systems Engineering*, 7e section cuts).

Live: [aaronways.github.io/lcs](https://aaronways.github.io/lcs/)

## Run

Open `index.html`, or push the folder to GitHub Pages with `.nojekyll` at the root
so `_template.js` is not ignored by Jekyll.

Hash routes:

- `#/` course map
- `#/concepts` concept index
- `#/concept/damping` one thread across chapters
- `#/ref` tables
- `#/ch/4/problems` Chapter 4 problems

Files: `index.html` (shell + all CSS), `app.js` (router, views), `widgets.js`
(interactive figures), `reference.js`, `chapters/chNN.js` (content only).

## Two rules that are easy to break

1. **Never set `max-width` or `height` on an `svg` inside `.katex`.** KaTeX draws
   `\sqrt` as an svg with `width='400em' height='1.08em'` and
   `preserveAspectRatio='xMinYMin slice'`, clipped by `.hide-tail{overflow:hidden}`.
   Overriding either attribute collapses the radical hook and leaves a bare
   overline. Any responsive svg rule must be scoped to direct children.
2. **Keep the stash step in `mdMath()`.** Math is pulled out before
   `marked.parse` and put back after, so markdown cannot mangle LaTeX.

`COURSE_ORDER` and `CONCEPTS` at the top of `app.js` drive navigation. Adding a
chapter file is enough to make it appear; no other edit is required.

## Authoring

Copy `chapters/_template.js` to `chapters/chNN.js` and add a script tag in
`index.html`. Inside template literals, double every LaTeX backslash.

Do not copy textbook problems or host the book PDF.
