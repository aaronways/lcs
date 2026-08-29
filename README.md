# Nexus

Guides, formula sheets, and original problems for linear control systems
(Nise, *Control Systems Engineering*, 7e section cuts).

Live: [aaronways.github.io/lcs](https://aaronways.github.io/lcs/)

## Run

Open `index.html`, or push the folder to GitHub Pages with `.nojekyll` at the root
so `_template.js` is not ignored by Jekyll.

Hash routes:

- `#/` map
- `#/ref` tables
- `#/ch/4/problems` Chapter 4 problems

## Authoring

Copy `chapters/_template.js` to `chapters/chNN.js` and add a script tag in
`index.html`. Inside template literals, double every LaTeX backslash.

Do not copy textbook problems or host the book PDF.
