/* ===========================================================================
   NEXUS - Chapter 7: Steady-State Errors
   Nise, Control Systems Engineering, 7e, sections 7.1-7.4.
   Every LaTeX backslash inside these template literals is doubled.
   =========================================================================== */
registerChapter({
  id: 7,
  title: "Steady-State Errors",
  sections: "7.1–7.4",
  brief: `Steady-state error is what is left between input and output once the transient has died away.
For a unity feedback loop it depends on two things: the test input, and the number of pure
integrators in the forward path. That number is the system type, and three limits of $G(s)$ at
$s=0$, the static error constants $K_{p}$, $K_{v}$ and $K_{a}$, turn it into numbers. Every
formula in the chapter assumes the closed loop is stable, so Chapter 6 runs first. Design then
reduces to a gain range: accuracy bounds $K$ from below, stability bounds it from above.`,

  sectionList: [
    { id: "7.1", title: "Introduction" },
    { id: "7.2", title: "Steady-State Error for Unity Feedback Systems" },
    { id: "7.3", title: "Static Error Constants and System Type" },
    { id: "7.4", title: "Steady-State Error Specifications" },
  ],

  guide: [
    {
      title: "What this chapter is for",
      sec: "7.1",
      example: "7-01",
      body: `
Chapter 1 named three requirements: transient response, stability, steady-state error.
Chapter 4 placed poles to shape the transient. Chapter 6 kept them in the left half-plane. This
chapter asks the last question: once the motion stops, does the output sit where it was told to
sit, and if not, by how much?

The answer turns out to need very little. For a unity feedback loop, the steady-state error is
fixed by the test input and by the open-loop transfer function evaluated near $s=0$. No pole
locations, no partial fractions, no inverse transforms. One limit per input.

### What the course covers

The course takes 7.1 through 7.4, which is the unity-feedback half of Nise's chapter.
Disturbance inputs, nonunity feedback, sensitivity and state space (7.5 to 7.8) are outside the
sections this course covers, so every loop here has $H(s)=1$.

| Section | What it adds |
|---|---|
| 7.1 | The definition, the three test inputs, and where the error physically comes from |
| 7.2 | $e(\\infty)$ from $T(s)$, then from $G(s)$, for step, ramp and parabola |
| 7.3 | $K_{p}$, $K_{v}$, $K_{a}$ and system type, collected into one table |
| 7.4 | Reading a specification, and choosing a gain to meet one |

### What it connects to

The final value theorem from Chapter 2 does the work. The Routh table from Chapter 6 decides
whether that work is allowed. And the gain that buys accuracy here is the same gain that
Chapter 4 showed costs damping, which is the trade-off Chapter 9 exists to break.
`
    },
    {
      title: "7.1: Steady-state error and the three test inputs",
      sec: "7.1",
      example: "7-03",
      body: `
> **Steady-state error** is the difference between the input and the output for a prescribed
> test input as $t\\to\\infty$.

The test inputs are chosen by thinking of a position control system, where the output angle is
supposed to follow a commanded angle. Each input describes a different kind of target.

| Input | $r(t)$ | $R(s)$ | Physical meaning | Target it models |
|---|---|---|---|---|
| Step | $u(t)$ | $\\dfrac{1}{s}$ | constant position | a satellite in geostationary orbit |
| Ramp | $t\\,u(t)$ | $\\dfrac{1}{s^{2}}$ | constant velocity | a satellite crossing the sky at a constant angular rate |
| Parabola | $\\tfrac12t^{2}u(t)$ | $\\dfrac{1}{s^{3}}$ | constant acceleration | an accelerating missile |

The parabola carries the $\\tfrac12$ so that its transform is exactly $1/s^{3}$ and its second
derivative is exactly 1. A target with angular acceleration $A$ starting from rest has
$r(t)=\\tfrac{A}{2}t^{2}$ and $R(s)=A/s^{3}$. Writing $At^{2}$ when the problem says "acceleration
$A$" doubles the input (7-01).

### Reading the error off a plot

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 250" class="nx-fig">
  <defs><marker id="nx7ax" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><path d="M44.0 190.0 L254.0 190.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7ax)"/><path d="M44.0 190.0 L44.0 20.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7ax)"/><text x="250" y="208" text-anchor="end" font-size="13">t</text><text x="38" y="28" text-anchor="end" font-size="12">c(t)</text><path d="M44.0 60.0 L240.0 60.0" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M44.0 190.0 L45.6 189.3 L47.3 187.2 L48.9 184.0 L50.5 179.7 L52.2 174.5 L53.8 168.5 L55.4 162.0 L57.1 154.9 L58.7 147.4 L60.3 139.7 L62.0 131.8 L63.6 123.8 L65.2 115.9 L66.9 108.1 L68.5 100.5 L70.1 93.2 L71.8 86.1 L73.4 79.5 L75.0 73.2 L76.7 67.4 L78.3 62.0 L79.9 57.1 L81.6 52.6 L83.2 48.7 L84.8 45.2 L86.5 42.2 L88.1 39.7 L89.7 37.6 L91.4 36.0 L93.0 34.8 L94.6 33.9 L96.3 33.5 L97.9 33.3 L99.5 33.5 L101.2 33.9 L102.8 34.6 L104.4 35.4 L106.1 36.5 L107.7 37.7 L109.3 39.1 L111.0 40.5 L112.6 42.1 L114.2 43.7 L115.9 45.3 L117.5 46.9 L119.1 48.6 L120.8 50.2 L122.4 51.7 L124.0 53.2 L125.7 54.7 L127.3 56.0 L128.9 57.3 L130.6 58.5 L132.2 59.6 L133.8 60.6 L135.5 61.5 L137.1 62.3 L138.7 63.0 L140.4 63.7 L142.0 64.2 L143.6 64.6 L145.3 64.9 L146.9 65.2 L148.5 65.4 L150.2 65.5 L151.8 65.5 L153.4 65.4 L155.1 65.4 L156.7 65.2 L158.3 65.0 L160.0 64.8 L161.6 64.6 L163.2 64.3 L164.9 64.0 L166.5 63.7 L168.1 63.3 L169.8 63.0 L171.4 62.7 L173.0 62.3 L174.7 62.0 L176.3 61.7 L177.9 61.4 L179.6 61.1 L181.2 60.8 L182.8 60.5 L184.5 60.3 L186.1 60.1 L187.7 59.9 L189.4 59.7 L191.0 59.5 L192.6 59.4 L194.3 59.2 L195.9 59.1 L197.5 59.1 L199.2 59.0 L200.8 58.9 L202.4 58.9 L204.1 58.9 L205.7 58.9 L207.3 58.9 L209.0 58.9 L210.6 58.9 L212.2 59.0 L213.9 59.0 L215.5 59.1 L217.1 59.1 L218.8 59.2 L220.4 59.2 L222.0 59.3 L223.7 59.4 L225.3 59.5 L226.9 59.5 L228.6 59.6 L230.2 59.7 L231.8 59.7 L233.5 59.8 L235.1 59.8 L236.7 59.9 L238.4 59.9 L240.0 60.0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="7 4"/><path d="M44.0 190.0 L45.6 189.5 L47.3 187.9 L48.9 185.5 L50.5 182.3 L52.2 178.4 L53.8 173.9 L55.4 169.0 L57.1 163.6 L58.7 158.0 L60.3 152.2 L62.0 146.3 L63.6 140.4 L65.2 134.4 L66.9 128.6 L68.5 122.9 L70.1 117.4 L71.8 112.1 L73.4 107.1 L75.0 102.4 L76.7 98.0 L78.3 94.0 L79.9 90.3 L81.6 87.0 L83.2 84.0 L84.8 81.4 L86.5 79.2 L88.1 77.3 L89.7 75.7 L91.4 74.5 L93.0 73.6 L94.6 73.0 L96.3 72.6 L97.9 72.5 L99.5 72.6 L101.2 72.9 L102.8 73.4 L104.4 74.1 L106.1 74.9 L107.7 75.8 L109.3 76.8 L111.0 77.9 L112.6 79.1 L114.2 80.3 L115.9 81.5 L117.5 82.7 L119.1 83.9 L120.8 85.1 L122.4 86.3 L124.0 87.4 L125.7 88.5 L127.3 89.5 L128.9 90.5 L130.6 91.4 L132.2 92.2 L133.8 93.0 L135.5 93.6 L137.1 94.3 L138.7 94.8 L140.4 95.2 L142.0 95.6 L143.6 95.9 L145.3 96.2 L146.9 96.4 L148.5 96.5 L150.2 96.6 L151.8 96.6 L153.4 96.6 L155.1 96.5 L156.7 96.4 L158.3 96.3 L160.0 96.1 L161.6 95.9 L163.2 95.7 L164.9 95.5 L166.5 95.3 L168.1 95.0 L169.8 94.8 L171.4 94.5 L173.0 94.3 L174.7 94.0 L176.3 93.8 L177.9 93.5 L179.6 93.3 L181.2 93.1 L182.8 92.9 L184.5 92.7 L186.1 92.6 L187.7 92.4 L189.4 92.3 L191.0 92.1 L192.6 92.0 L194.3 91.9 L195.9 91.9 L197.5 91.8 L199.2 91.7 L200.8 91.7 L202.4 91.7 L204.1 91.7 L205.7 91.7 L207.3 91.7 L209.0 91.7 L210.6 91.7 L212.2 91.7 L213.9 91.8 L215.5 91.8 L217.1 91.8 L218.8 91.9 L220.4 91.9 L222.0 92.0 L223.7 92.0 L225.3 92.1 L226.9 92.1 L228.6 92.2 L230.2 92.2 L231.8 92.3 L233.5 92.3 L235.1 92.4 L236.7 92.4 L238.4 92.5 L240.0 92.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 3"/><text x="246" y="64" text-anchor="start" font-size="12">input, output 1</text><text x="246" y="96.5" text-anchor="start" font-size="12">output 2</text><path d="M198.3 60.0 L198.3 92.5" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M193.3 60.0 L203.3 60.0" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M193.3 92.5 L203.3 92.5" fill="none" stroke="currentColor" stroke-width="1.1"/><text x="206.35" y="81.25" text-anchor="start" font-size="12">e₂(∞)</text><text x="149" y="228" text-anchor="middle" font-size="13">(a) unit step</text><path d="M384.0 190.0 L594.0 190.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7ax)"/><path d="M384.0 190.0 L384.0 20.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7ax)"/><text x="590" y="208" text-anchor="end" font-size="13">t</text><text x="378" y="28" text-anchor="end" font-size="12">c(t)</text><path d="M384.0 190.0 L580.0 40.0" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M384.0 190.0 L385.6 190.0 L387.3 190.0 L388.9 189.9 L390.5 189.5 L392.2 188.9 L393.8 188.3 L395.4 187.5 L397.1 186.6 L398.7 185.7 L400.3 184.7 L402.0 183.6 L403.6 182.4 L405.2 181.2 L406.9 179.9 L408.5 178.7 L410.1 177.3 L411.8 176.0 L413.4 174.6 L415.0 173.2 L416.7 171.8 L418.3 170.4 L419.9 169.0 L421.6 167.5 L423.2 166.1 L424.8 164.6 L426.5 163.2 L428.1 161.7 L429.7 160.3 L431.4 158.8 L433.0 157.4 L434.6 155.9 L436.3 154.5 L437.9 153.0 L439.5 151.6 L441.2 150.2 L442.8 148.8 L444.4 147.3 L446.1 145.9 L447.7 144.5 L449.3 143.1 L451.0 141.7 L452.6 140.3 L454.2 138.9 L455.9 137.5 L457.5 136.2 L459.1 134.8 L460.8 133.4 L462.4 132.1 L464.0 130.7 L465.7 129.3 L467.3 128.0 L468.9 126.7 L470.6 125.3 L472.2 124.0 L473.8 122.7 L475.5 121.3 L477.1 120.0 L478.7 118.7 L480.4 117.4 L482.0 116.1 L483.6 114.7 L485.3 113.4 L486.9 112.1 L488.5 110.8 L490.2 109.5 L491.8 108.2 L493.4 107.0 L495.1 105.7 L496.7 104.4 L498.3 103.1 L500.0 101.8 L501.6 100.5 L503.2 99.2 L504.9 98.0 L506.5 96.7 L508.1 95.4 L509.8 94.1 L511.4 92.9 L513.0 91.6 L514.7 90.3 L516.3 89.1 L517.9 87.8 L519.6 86.5 L521.2 85.3 L522.8 84.0 L524.5 82.7 L526.1 81.5 L527.7 80.2 L529.4 78.9 L531.0 77.7 L532.6 76.4 L534.3 75.2 L535.9 73.9 L537.5 72.6 L539.2 71.4 L540.8 70.1 L542.4 68.9 L544.1 67.6 L545.7 66.3 L547.3 65.1 L549.0 63.8 L550.6 62.6 L552.2 61.3 L553.9 60.1 L555.5 58.8 L557.1 57.6 L558.8 56.3 L560.4 55.1 L562.0 53.8 L563.7 52.5 L565.3 51.3 L566.9 50.0 L568.6 48.8 L570.2 47.5 L571.8 46.3 L573.5 45.0 L575.1 43.8 L576.7 42.5 L578.4 41.3 L580.0 40.0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="7 4"/><path d="M384.0 190.0 L385.6 190.9 L387.3 191.6 L388.9 192.2 L390.5 192.7 L392.2 193.0 L393.8 193.3 L395.4 193.4 L397.1 193.4 L398.7 193.3 L400.3 193.2 L402.0 193.0 L403.6 192.7 L405.2 192.3 L406.9 191.9 L408.5 191.4 L410.1 190.8 L411.8 190.2 L413.4 189.6 L415.0 188.9 L416.7 188.2 L418.3 187.4 L419.9 186.6 L421.6 185.8 L423.2 184.9 L424.8 184.0 L426.5 183.1 L428.1 182.2 L429.7 181.2 L431.4 180.2 L433.0 179.2 L434.6 178.2 L436.3 177.2 L437.9 176.1 L439.5 175.1 L441.2 174.0 L442.8 172.9 L444.4 171.8 L446.1 170.7 L447.7 169.6 L449.3 168.5 L451.0 167.3 L452.6 166.2 L454.2 165.0 L455.9 163.8 L457.5 162.7 L459.1 161.5 L460.8 160.3 L462.4 159.1 L464.0 158.0 L465.7 156.8 L467.3 155.6 L468.9 154.4 L470.6 153.2 L472.2 152.0 L473.8 150.7 L475.5 149.5 L477.1 148.3 L478.7 147.1 L480.4 145.9 L482.0 144.6 L483.6 143.4 L485.3 142.2 L486.9 141.0 L488.5 139.7 L490.2 138.5 L491.8 137.3 L493.4 136.0 L495.1 134.8 L496.7 133.6 L498.3 132.3 L500.0 131.1 L501.6 129.9 L503.2 128.6 L504.9 127.4 L506.5 126.1 L508.1 124.9 L509.8 123.6 L511.4 122.4 L513.0 121.2 L514.7 119.9 L516.3 118.7 L517.9 117.4 L519.6 116.2 L521.2 114.9 L522.8 113.7 L524.5 112.4 L526.1 111.2 L527.7 110.0 L529.4 108.7 L531.0 107.5 L532.6 106.2 L534.3 105.0 L535.9 103.7 L537.5 102.5 L539.2 101.2 L540.8 100.0 L542.4 98.7 L544.1 97.5 L545.7 96.2 L547.3 95.0 L549.0 93.7 L550.6 92.5 L552.2 91.2 L553.9 90.0 L555.5 88.7 L557.1 87.5 L558.8 86.2 L560.4 85.0 L562.0 83.7 L563.7 82.5 L565.3 81.2 L566.9 80.0 L568.6 78.7 L570.2 77.5 L571.8 76.2 L573.5 75.0 L575.1 73.7 L576.7 72.5 L578.4 71.2 L580.0 70.0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 3"/><path d="M384.0 190.0 L385.6 189.9 L387.3 189.8 L388.9 189.6 L390.5 189.4 L392.2 189.2 L393.8 188.9 L395.4 188.5 L397.1 188.2 L398.7 187.8 L400.3 187.4 L402.0 187.0 L403.6 186.5 L405.2 186.0 L406.9 185.6 L408.5 185.0 L410.1 184.5 L411.8 184.0 L413.4 183.4 L415.0 182.8 L416.7 182.2 L418.3 181.6 L419.9 181.0 L421.6 180.4 L423.2 179.8 L424.8 179.2 L426.5 178.5 L428.1 177.9 L429.7 177.2 L431.4 176.5 L433.0 175.9 L434.6 175.2 L436.3 174.5 L437.9 173.8 L439.5 173.1 L441.2 172.4 L442.8 171.7 L444.4 171.0 L446.1 170.3 L447.7 169.6 L449.3 168.9 L451.0 168.2 L452.6 167.5 L454.2 166.7 L455.9 166.0 L457.5 165.3 L459.1 164.6 L460.8 163.8 L462.4 163.1 L464.0 162.4 L465.7 161.6 L467.3 160.9 L468.9 160.2 L470.6 159.4 L472.2 158.7 L473.8 158.0 L475.5 157.2 L477.1 156.5 L478.7 155.7 L480.4 155.0 L482.0 154.3 L483.6 153.5 L485.3 152.8 L486.9 152.0 L488.5 151.3 L490.2 150.5 L491.8 149.8 L493.4 149.1 L495.1 148.3 L496.7 147.6 L498.3 146.8 L500.0 146.1 L501.6 145.3 L503.2 144.6 L504.9 143.8 L506.5 143.1 L508.1 142.3 L509.8 141.6 L511.4 140.8 L513.0 140.1 L514.7 139.3 L516.3 138.6 L517.9 137.9 L519.6 137.1 L521.2 136.4 L522.8 135.6 L524.5 134.9 L526.1 134.1 L527.7 133.4 L529.4 132.6 L531.0 131.9 L532.6 131.1 L534.3 130.4 L535.9 129.6 L537.5 128.9 L539.2 128.1 L540.8 127.4 L542.4 126.6 L544.1 125.9 L545.7 125.1 L547.3 124.4 L549.0 123.6 L550.6 122.9 L552.2 122.1 L553.9 121.4 L555.5 120.6 L557.1 119.9 L558.8 119.1 L560.4 118.4 L562.0 117.6 L563.7 116.9 L565.3 116.1 L566.9 115.4 L568.6 114.6 L570.2 113.9 L571.8 113.1 L573.5 112.4 L575.1 111.6 L576.7 110.9 L578.4 110.1 L580.0 109.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="10 3 2 3"/><text x="586" y="44" text-anchor="start" font-size="12">input, output 1</text><text x="586" y="74" text-anchor="start" font-size="12">output 2</text><text x="586" y="113.375" text-anchor="start" font-size="12">output 3</text><path d="M521.2 85.0 L521.2 115.0" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M516.2 85.0 L526.2 85.0" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M516.2 115.0 L526.2 115.0" fill="none" stroke="currentColor" stroke-width="1.1"/><text x="513.2" y="83" text-anchor="end" font-size="12">e₂(∞)</text><text x="489" y="228" text-anchor="middle" font-size="13">(b) unit ramp</text>
</svg>
<figcaption>Steady-state error is the vertical gap between input and output once the transient is gone. For the step, output 1 has zero error and output 2 a finite error. For the ramp, output 1 has zero error, output 2 runs parallel at a fixed offset, and output 3 has a smaller slope, so its error grows without bound.</figcaption>
</figure>

The error is measured **vertically**, between input and output, after the transient is gone.
For a step that leaves two possibilities: zero or a finite constant. A ramp adds a third. If the
output ramps with a smaller slope than the input, the vertical gap grows forever and the
steady-state error is infinite, even though the output never stops following the input (7-12).

### The error signal

For a general system the error is formed outside the loop: $E(s)=R(s)-C(s)$. For a unity
feedback loop the signal leaving the summing junction is already $R-C$, so the actuating signal
and the error are the same signal. That coincidence is the reason this chapter restricts itself
to unity feedback first.
`
    },
    {
      title: "7.1: Stable systems only",
      sec: "7.1",
      example: "7-04",
      body: `
Steady-state error means the difference after the natural response has died. An unstable
system's natural response never dies; it grows and swamps the forced response, so there is no
steady state to measure.

The formulas in 7.2 and 7.3 do not know this. Hand $\\lim_{s\\to0}G(s)$ an unstable loop and it
returns a finite, reasonable-looking number. Nise's footnote on the error formula says it is
valid only for a stable closed loop, and that the numbers it produces for an unstable one are
meaningless.

> **Order of operations:** reduce to a single loop, check stability with Routh (Chapter 6),
> and only then compute the error.

Nise assumes stability in his worked examples and leaves the check out "to focus on the topic".
Problems here do not, because the check changes the answer in 7-04, 7-15, 7-23 and 7-26.

The second consequence is design. Most steady-state error goes down as gain goes up, and in
Chapter 6 the gain had an upper limit. Every design problem in 7.4 is a negotiation between
those two facts.
`
    },
    {
      title: "7.1: Where steady-state error comes from",
      sec: "7.1",
      example: "7-02",
      body: `
Real systems have nonlinear sources of steady-state error: backlash in gears, a motor that will
not turn until its voltage crosses a threshold. Those are outside a linear course. The errors
studied here come from the **configuration** of the loop and the **type of input**.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 280" class="nx-fig">
  <defs><marker id="nx7gi" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><text x="8" y="56" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 50.0 L76.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><circle cx="100" cy="50" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M87 50 L113 50 M100 37 L100 63" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="72" y="42" text-anchor="middle" font-size="14">+</text><text x="86" y="84" text-anchor="middle" font-size="14">−</text><path d="M120.0 50.0 L182.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><text x="151" y="38" text-anchor="middle" font-size="12">E(s)</text><rect x="182" y="28" width="78" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="221" y="55" text-anchor="middle" font-size="15">K</text><path d="M260.0 50.0 L360.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><circle cx="310" cy="50" r="4" fill="currentColor" stroke="none"/><text x="368" y="56" text-anchor="start" font-size="15">C(s)</text><path d="M310.0 50.0 L310.0 112.0 L100.0 112.0 L100.0 74.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><text x="500" y="56" text-anchor="start" font-size="13">(a)</text><text x="8" y="196" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 190.0 L76.0 190.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><circle cx="100" cy="190" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M87 190 L113 190 M100 177 L100 203" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="72" y="182" text-anchor="middle" font-size="14">+</text><text x="86" y="224" text-anchor="middle" font-size="14">−</text><path d="M120.0 190.0 L182.0 190.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><text x="151" y="178" text-anchor="middle" font-size="12">E(s)</text><rect x="182" y="168" width="78" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="221" y="195" text-anchor="middle" font-size="15">K/s</text><path d="M260.0 190.0 L360.0 190.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><circle cx="310" cy="190" r="4" fill="currentColor" stroke="none"/><text x="368" y="196" text-anchor="start" font-size="15">C(s)</text><path d="M310.0 190.0 L310.0 252.0 L100.0 252.0 L100.0 214.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7gi)"/><text x="500" y="196" text-anchor="start" font-size="13">(b)</text>
</svg>
<figcaption>(a) A pure gain needs a nonzero error to hold a nonzero output, because c = Ke. (b) An integrator holds its output with zero input, so the loop can settle with e = 0.</figcaption>
</figure>

### A pure gain in the forward path

Take loop (a) with a unit step. In steady state the block says $c_{ss}=Ke_{ss}$, so

$$e_{ss}=\\frac{c_{ss}}{K}$$

If the output is going to be nonzero, the error has to be nonzero; the block has no other way
to produce an output. Combining with $e_{ss}=1-c_{ss}$ gives

$$e_{ss}=\\frac{1}{1+K},\\qquad c_{ss}=\\frac{K}{1+K}$$

Larger $K$ shrinks the error. No finite $K$ removes it.

### An integrator in the forward path

Replace the gain with $K/s$, loop (b). The integrator's output changes only while its input is
nonzero. As $c(t)$ rises, $e=r-c$ falls, and the output keeps climbing until $e=0$. At that
point the integrator stops changing and **holds** its output with zero input.

A motor driving a load is that integrator. Apply a voltage and the shaft turns; remove it and
the shaft stops where it is, without returning. So a position loop with a motor in it can settle
with zero error to a step. That observation becomes system type in 7.3.
`
    },
    {
      title: "The chapter as one procedure",
      sec: "7.1",
      example: "7-27",
      body: `
Every problem in the chapter walks some part of this list.

1. **Reduce to unity feedback.** Collapse minor loops and cascade the controller with the plant,
   so the forward path is one transfer function $G(s)$.
2. **Check stability.** Close the loop, $D(s)+N(s)$, and run Routh. If it fails, stop: there is
   no steady-state error to compute.
3. **Count the type.** Cancel common factors, then count the poles of $G(s)$ at $s=0$.
4. **Compute the one constant that matters.** Type 0: $K_{p}$. Type 1: $K_{v}$. Type 2: $K_{a}$.
   The other two follow from the type without any work.
5. **Scale for the input.** $A$ times a unit test input gives $A$ times the unit error, with the
   parabola read as $At^{2}=2A\\cdot\\tfrac12t^{2}$. Inputs that are added give errors that are
   added.
6. **For design**, set the constant from the specification, solve for $K$, and intersect with the
   Routh range from step 2.

Step 2 is the one most often skipped, and 7-04 is the cost.
`
    },
    {
      title: "7.2: Error from the closed-loop transfer function",
      sec: "7.2",
      example: "7-06",
      body: `
For any system with closed-loop transfer function $T(s)$:

$$E(s)=R(s)-C(s),\\qquad C(s)=R(s)T(s)$$

$$E(s)=R(s)\\big[1-T(s)\\big]$$

That gives $e(t)$ at every instant. Only the final value is wanted, so apply the final value
theorem instead of inverting:

$$e(\\infty)=\\lim_{t\\to\\infty}e(t)=\\lim_{s\\to0}sE(s)=\\lim_{s\\to0}sR(s)\\big[1-T(s)\\big]$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 260" class="nx-fig">
  <defs><marker id="nx7tg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><text x="8" y="62" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 56.0 L110.0 56.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><circle cx="80" cy="56" r="4" fill="currentColor" stroke="none"/><rect x="110" y="34" width="78" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="149" y="61" text-anchor="middle" font-size="15">T(s)</text><path d="M188.0 56.0 L266.0 56.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><text x="226" y="46" text-anchor="middle" font-size="12">C(s)</text><circle cx="286" cy="56" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M273 56 L299 56 M286 43 L286 69" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="256" y="48" text-anchor="middle" font-size="14">−</text><text x="300" y="28" text-anchor="middle" font-size="14">+</text><path d="M80.0 56.0 L80.0 20.0 L286.0 20.0 L286.0 32.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><path d="M306.0 56.0 L370.0 56.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><text x="378" y="62" text-anchor="start" font-size="15">E(s)</text><text x="470" y="62" text-anchor="start" font-size="13">(a)</text><text x="8" y="176" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 170.0 L76.0 170.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><circle cx="100" cy="170" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M87 170 L113 170 M100 157 L100 183" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="72" y="162" text-anchor="middle" font-size="14">+</text><text x="86" y="204" text-anchor="middle" font-size="14">−</text><path d="M120.0 170.0 L182.0 170.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><text x="151" y="158" text-anchor="middle" font-size="12">E(s)</text><rect x="182" y="148" width="78" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="221" y="175" text-anchor="middle" font-size="15">G(s)</text><path d="M260.0 170.0 L360.0 170.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><circle cx="310" cy="170" r="4" fill="currentColor" stroke="none"/><text x="368" y="176" text-anchor="start" font-size="15">C(s)</text><path d="M310.0 170.0 L310.0 232.0 L100.0 232.0 L100.0 194.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7tg)"/><text x="470" y="176" text-anchor="start" font-size="13">(b)</text>
</svg>
<figcaption>(a) Any system: form the error outside the loop as R − C. (b) Unity feedback: the signal leaving the summing junction already is R − C, so E(s) is the error.</figcaption>
</figure>

### When the final value theorem is allowed

The theorem is derived from the transform of a derivative, and it holds only when $e(t)$
actually settles.

| Poles of $sE(s)$ | Final value theorem |
|---|---|
| all in the left half-plane | valid: a finite $e(\\infty)$ |
| at the origin, the rest in the left half-plane | the limit is $\\infty$, and $e(t)$ really does grow without bound |
| any in the right half-plane, or on the $j\\omega$ axis away from the origin | invalid: $e(t)$ grows or oscillates, and the limit means nothing |

Stated on $E(s)$ itself: poles in the left half-plane plus at most one pole at the origin give a
valid finite answer. More than one pole at the origin still gives a correct answer of
**infinity** (Nise cites D'Azzo and Houpis for that case), which is how the infinite ramp and
parabola errors in 7.2 arise. A pair on the $j\\omega$ axis, or anything in the right half-plane,
and the number the limit returns describes nothing (7-05).

### The step-error shortcut

With $R=1/s$ the $s$ cancels:

$$e_{\\text{step}}(\\infty)=\\lim_{s\\to0}\\big[1-T(s)\\big]=1-T(0)$$

So the step error is one minus the closed-loop dc gain. A closed loop with $T(0)=1$ tracks a step
exactly, and only those can have a finite ramp error, because $(1-T)/s$ needs $1-T(0)=0$ to
survive the division by $s$ (7-06, 7-08).
`
    },
    {
      title: "7.2: Error from the open-loop transfer function",
      sec: "7.2",
      example: "7-09",
      body: `
The $T(s)$ route works, but it hides the reason for the answer. For a unity feedback loop the
error can be written in terms of the forward transfer function $G(s)$ instead, and $G(s)$ is
where the reason lives.

Read the two equations off loop (b) of the figure above:

$$E(s)=R(s)-C(s),\\qquad C(s)=E(s)G(s)$$

Substitute and solve for $E(s)$:

$$E(s)=R(s)-E(s)G(s)\\qquad\\Longrightarrow\\qquad E(s)=\\frac{R(s)}{1+G(s)}$$

Apply the final value theorem, **after** confirming the closed loop is stable:

$$\\boxed{\\;e(\\infty)=\\lim_{s\\to0}\\frac{sR(s)}{1+G(s)}\\;}$$

Both routes give the same number, because $1-T=1-\\dfrac{G}{1+G}=\\dfrac{1}{1+G}$. The second one
is preferred because it reduces every case to how $G(s)$ behaves as $s\\to0$, and that behaviour
is decided by one structural feature: how many factors of $s$ sit in its denominator.
`
    },
    {
      title: "7.2: Step, ramp and parabola, one at a time",
      sec: "7.2",
      example: "7-10",
      body: `
Write the forward transfer function with its poles at the origin pulled out:

$$G(s)=\\frac{K(s+z_{1})(s+z_{2})\\cdots}{s^{n}(s+p_{1})(s+p_{2})\\cdots}$$

Each $1/s$ in the forward path is an integration in the time domain, so $n$ counts pure
integrators.

### Step, $R(s)=1/s$

$$e_{\\text{step}}(\\infty)=\\frac{1}{1+\\lim\\limits_{s\\to0}G(s)}$$

$\\lim_{s\\to0}G(s)$ is the dc gain of the forward path. For zero error it must be infinite, which
needs $n\\ge1$. With $n=0$ it equals $Kz_{1}z_{2}\\cdots/(p_{1}p_{2}\\cdots)$ and the error is
finite.

### Ramp, $R(s)=1/s^{2}$

$$e_{\\text{ramp}}(\\infty)=\\lim_{s\\to0}\\frac{1}{s+sG(s)}=\\frac{1}{\\lim\\limits_{s\\to0}sG(s)}$$

Zero error needs $n\\ge2$. With $n=1$ the limit is finite and the error is a constant offset,
output 2 in the figure. With $n=0$ the limit is zero and the error is infinite: output 3,
ramping at a smaller slope.

### Parabola, $R(s)=1/s^{3}$

$$e_{\\text{parabola}}(\\infty)=\\lim_{s\\to0}\\frac{1}{s^{2}+s^{2}G(s)}=\\frac{1}{\\lim\\limits_{s\\to0}s^{2}G(s)}$$

Zero error needs $n\\ge3$; $n=2$ gives a finite error; $n\\le1$ gives infinite error.

### The pattern

Each extra integrator buys one more input that is tracked with finite error and one more that is
tracked exactly. Problems 7-09, 7-10 and 7-11 run the same three inputs through loops with
$n=0$, $1$ and $2$ to show the staircase.

| Integrators $n$ | Step | Ramp | Parabola |
|---|---|---|---|
| 0 | finite | $\\infty$ | $\\infty$ |
| 1 | 0 | finite | $\\infty$ |
| 2 | 0 | 0 | finite |
| 3 | 0 | 0 | 0 |
`
    },
    {
      title: "7.2: Inputs with an amplitude, and inputs added together",
      sec: "7.2",
      example: "7-13",
      body: `
The formulas above are for unit inputs. The system is linear, so scaling the input scales the
error by the same factor.

| Input | $R(s)$ | $e(\\infty)$ |
|---|---|---|
| $A\\,u(t)$ | $\\dfrac{A}{s}$ | $\\dfrac{A}{1+K_{p}}$ |
| $At\\,u(t)$ | $\\dfrac{A}{s^{2}}$ | $\\dfrac{A}{K_{v}}$ |
| $At^{2}u(t)$ | $\\dfrac{2A}{s^{3}}$ | $\\dfrac{2A}{K_{a}}$ |

The last row is where arithmetic goes wrong. $\\mathcal{L}\\{t^{2}\\}=2/s^{3}$, so $At^{2}$ is
$2A$ unit parabolas. Nise's own example with $5t^{2}u(t)$ uses $10/s^{3}$.

### Superposition

A command that is a sum of test inputs, such as $r(t)=4+2t$, produces an error that is the sum
of the individual errors. If any one of them is infinite, the total is infinite. A type 1 loop
following $4+2t$ has error $0+2/K_{v}$; add a $t^{2}$ term and the error is unbounded no matter
how large $K_{v}$ is (7-13).
`
    },
    {
      title: "7.3: Static error constants",
      sec: "7.3",
      example: "7-15",
      body: `
The three limits in the denominators of 7.2 are named, because they are the quantities a
designer specifies.

$$K_{p}=\\lim_{s\\to0}G(s)\\qquad\\text{position constant}$$

$$K_{v}=\\lim_{s\\to0}sG(s)\\qquad\\text{velocity constant}$$

$$K_{a}=\\lim_{s\\to0}s^{2}G(s)\\qquad\\text{acceleration constant}$$

and the errors for the unit test inputs become

$$e_{\\text{step}}(\\infty)=\\frac{1}{1+K_{p}},\\qquad
e_{\\text{ramp}}(\\infty)=\\frac{1}{K_{v}},\\qquad
e_{\\text{parabola}}(\\infty)=\\frac{1}{K_{a}}$$

Each constant is zero, a finite number, or infinite, depending on the form of $G(s)$. Each sits in
a denominator, so a larger constant means a smaller error.

### Computing the finite one

Only one of the three is ever finite and nonzero, and it can be read off a factored $G(s)$ in one
line: strike the $s^{n}$, then set $s=0$ in what is left.

$$G(s)=\\frac{30(s+2)}{s(s+3)(s+5)}\\qquad\\Longrightarrow\\qquad K_{v}=\\frac{30\\cdot2}{3\\cdot5}=4$$

The other two need no arithmetic. Constants below the type's own are infinite; constants above
it are zero.

### Units

$K_{p}$ is dimensionless. $K_{v}$ carries $\\text{s}^{-1}$ and $K_{a}$ carries $\\text{s}^{-2}$,
because a ramp error of $A/K_{v}$ has to come out in the units of position when $A$ is a
velocity. Units are what make a specification like "$K_{v}=20\\ \\text{s}^{-1}$" readable as "20
units of tracking velocity per unit of lag" (7-28).
`
    },
    {
      title: "7.3: System type",
      sec: "7.3",
      example: "7-14",
      body: `
The constants depend on one feature of $G(s)$ above all others, so it gets a name.

> The **system type** of a unity negative feedback system is $n$, the number of poles of the
> forward transfer function $G(s)$ at the origin: equivalently, the number of pure integrations
> in the forward path.

Table 7.2 of the text collects the whole chapter so far:

| Input | Error formula | Type 0 | Type 1 | Type 2 |
|---|---|---|---|---|
| Step $u(t)$ | $\\dfrac{1}{1+K_{p}}$ | $K_{p}$ constant: $\\dfrac{1}{1+K_{p}}$ | $K_{p}=\\infty$: $0$ | $K_{p}=\\infty$: $0$ |
| Ramp $t\\,u(t)$ | $\\dfrac{1}{K_{v}}$ | $K_{v}=0$: $\\infty$ | $K_{v}$ constant: $\\dfrac{1}{K_{v}}$ | $K_{v}=\\infty$: $0$ |
| Parabola $\\tfrac12t^{2}u(t)$ | $\\dfrac{1}{K_{a}}$ | $K_{a}=0$: $\\infty$ | $K_{a}=0$: $\\infty$ | $K_{a}$ constant: $\\dfrac{1}{K_{a}}$ |

Read it diagonally. The finite, nonzero entries run down the diagonal; zeros sit above it and
infinities below.

### Counting correctly

- **Cancel first.** $\\dfrac{6s(s+1)}{s^{3}(s+4)}$ is type 2, not type 3; the zero at the origin
  removes one of the poles there.
- **Exactly at the origin.** A pole at $s=-0.01$ is not an integrator. $\\dfrac{100}{(s+0.01)(s+10)}$
  is type 0 with $K_{p}=1000$: a very large but finite constant.
- **Factor the polynomial.** $\\dfrac{8}{s^{2}+2s}$ hides an $s$: it is $\\dfrac{8}{s(s+2)}$, type 1.
- **Complex poles never count**, wherever they are. $s^{2}+4s+8$ contributes no integrator.
- **Type belongs to $G(s)$,** the forward path of a unity loop. A closed-loop $T(s)$ has no type in
  this sense; recover $G=T/(1-T)$ first (7-18).
`
    },
    {
      title: "7.3: Reading the type from a block diagram",
      sec: "7.3",
      example: "7-17",
      body: `
In a real loop $G(s)$ is the product of everything between the summing junction and the output:
amplifier, controller, actuator, plant. Integrators come from two places.

- **The plant.** A motor whose output is shaft **angle** integrates its own speed, so a position
  loop around a motor is type 1 before any controller is added. The same motor with **speed** as
  the output has no integrator.
- **The controller.** A controller containing $1/s$, such as the proportional-plus-integral
  controller $K\\dfrac{s+a}{s}$, adds one. That is the standard way to raise the type of a loop
  whose plant does not supply enough integrators (7-30).

### Minor loops

Collapse an inner loop by the Chapter 5 formula before counting, because feedback inside the
forward path can change what you find.

- **Rate feedback** around $\\dfrac{10}{s(s+2)}$ with gain $K_{t}s$ gives
  $\\dfrac{10}{s(s+2+10K_{t})}$. The integrator survives, so the type does not change, but the
  constant $s+2$ grows to $s+2+10K_{t}$ and $K_{v}$ falls (7-16).
- **Position feedback** around an integrator removes it. $\\dfrac{1}{s}$ with a constant $h$
  fed back becomes $\\dfrac{1}{s+h}$: the pole leaves the origin and the type drops by one
  (7-17).

### From a closed-loop transfer function

If only $T(s)$ is known and the loop is unity feedback, invert $T=G/(1+G)$:

$$G(s)=\\frac{T(s)}{1-T(s)}$$

Two quick reads come without inverting anything: $T(0)=1$ exactly when $G$ has at least one
integrator, and $1-T(0)=1/(1+K_{p})$ for type 0.
`
    },
    {
      title: "7.4: What a specification tells you",
      sec: "7.4",
      example: "7-21",
      body: `
Damping ratio, settling time and percent overshoot specify the transient. The static error
constants specify the steady state, and a single number carries more than it seems to. Nise's
example is $K_{v}=1000$, which says four things.

1. **The system is stable.** The constants only mean something for stable loops.
2. **It is type 1.** Only type 1 has a finite, nonzero $K_{v}$; type 0 has $K_{v}=0$ and type 2 has
   $K_{v}=\\infty$.
3. **The test input is a ramp.** $K_{v}$ is the constant that a ramp error depends on.
4. **The error is $1/K_{v}=0.001$ per unit of input slope.**

| Specification | Type | Test input | Error |
|---|---|---|---|
| $K_{p}$ finite | 0 | step | $\\dfrac{1}{1+K_{p}}$ per unit step |
| $K_{v}$ finite | 1 | ramp | $\\dfrac{1}{K_{v}}$ per unit of slope |
| $K_{a}$ finite | 2 | parabola | $\\dfrac{1}{K_{a}}$ per unit of acceleration |

### "10% error in the steady state"

A specification can name an error without naming the input. The type settles it: a type 1 loop
has a finite nonzero error only for a ramp, so "10% error" on a type 1 loop means
$1/K_{v}=0.1$. On a type 0 loop the same words mean $1/(1+K_{p})=0.1$, which is $K_{p}=9$, not
$K_{p}=10$ (7-22, 7-27).
`
    },
    {
      title: "7.4: Designing gain for an error specification",
      sec: "7.4",
      example: "7-26",
      body: `
With an adjustable gain $K$ in the forward path, the finite constant is proportional to $K$, so
an error specification becomes a bound on $K$. The procedure:

1. **Identify the type,** which identifies the constant and the input.
2. **Translate the specification:** $e=1/(1+K_{p})$, $1/K_{v}$ or $1/K_{a}$, scaled for amplitude.
3. **Solve for $K$** from the constant's expression in $K$.
4. **Check stability at that $K$** with Routh. Better, find the whole stable range once and
   compare.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 190" class="nx-fig">
  <defs><marker id="nx7kw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><path d="M40.0 110.0 L600.0 110.0" fill="none" stroke="currentColor" stroke-width="1.4" marker-end="url(#nx7kw)"/><text x="598" y="134" text-anchor="end" font-size="14">K</text><rect x="278.5" y="97" width="190.8" height="26" rx="4" fill="currentColor" opacity=".16" stroke="none"/><path d="M40.0 103.0 L40.0 117.0" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="40" y="136" text-anchor="middle" font-size="13">0</text><path d="M278.5 103.0 L278.5 117.0" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="278.5" y="136" text-anchor="middle" font-size="13">90</text><path d="M469.3 103.0 L469.3 117.0" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="469.3" y="136" text-anchor="middle" font-size="13">162</text><path d="M278.5 64.0 L566.0 64.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7kw)"/><text x="278.5" y="56" text-anchor="start" font-size="12">error spec: e(∞) ≤ 0.2 ⇒ K ≥ 90</text><path d="M469.3 158.0 L44.0 158.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx7kw)"/><text x="469.3" y="176" text-anchor="end" font-size="12">Routh: stable ⇔ 0 &lt; K &lt; 162</text><text x="373.9" y="114" text-anchor="middle" font-size="12">design window</text>
</svg>
<figcaption>Gain design is an intersection. The error spec sets a lower bound on K, stability sets an upper bound, and any K in the overlap meets both. If the lower bound passes the upper one, no gain works and the controller has to change.</figcaption>
</figure>

### Three outcomes

- **The bound lies inside the stable range.** Any $K$ between them works (7-26, 7-27, 7-28).
- **The bound lies outside it.** No gain meets the specification and the loop stays stable. The
  formula still returns a $K$, which is why step 4 is not optional (7-26(c), 7-23).
- **The loop is stable for every positive $K$.** Second-order loops and some third-order loops
  with a well-placed zero. Then stability never limits the design, and the transient does (7-25).

### The cost that 7.4 does not charge

Meeting the error spec and staying stable is not the same as a good design. In Nise's
Example 7.6 the gain that gives a 10% ramp error is stable, and he notes that it "may not yield a
desirable transient response." Problem 7-25 puts a number on that: the gain that brings a type 0
step error to 1% pushes the overshoot past 70%. Meeting all three requirements at once takes a
compensator, which is Chapter 9.
`
    },
  ],

  formulas: [
    { latex: `E(s)=R(s)-C(s)=R(s)\\big[1-T(s)\\big]`,
      note: `Error for any system, formed outside the loop from the closed-loop transfer function.` },
    { latex: `e(\\infty)=\\lim_{s\\to0}sE(s)`,
      note: `Final value theorem. Valid only if the closed loop is stable and $sE(s)$ has no poles on the $j\\omega$ axis or in the right half-plane.` },
    { latex: `e_{\\text{step}}(\\infty)=1-T(0)`,
      note: `Unit step, any system. One minus the closed-loop dc gain.` },
    { latex: `E(s)=\\frac{R(s)}{1+G(s)}\\qquad e(\\infty)=\\lim_{s\\to0}\\frac{sR(s)}{1+G(s)}`,
      note: `Unity feedback. The actuating signal is the error, so this is the actual error between input and output.` },
    { latex: `K_{p}=\\lim_{s\\to0}G(s),\\qquad K_{v}=\\lim_{s\\to0}sG(s),\\qquad K_{a}=\\lim_{s\\to0}s^{2}G(s)`,
      note: `Static error constants. Units: dimensionless, per second, per second squared.` },
    { latex: `e_{\\text{step}}=\\frac{1}{1+K_{p}},\\qquad e_{\\text{ramp}}=\\frac{1}{K_{v}},\\qquad e_{\\text{parabola}}=\\frac{1}{K_{a}}`,
      note: `For the unit inputs $u(t)$, $t\\,u(t)$ and $\\tfrac12t^{2}u(t)$.` },
    { latex: `G(s)=\\frac{K(s+z_{1})(s+z_{2})\\cdots}{s^{n}(s+p_{1})(s+p_{2})\\cdots}\\qquad\\text{type}=n`,
      note: `Count poles at the origin after cancelling common factors. Poles near the origin, and complex poles, do not count.` },
    { latex: `\\text{finite constant}=\\frac{K\\,z_{1}z_{2}\\cdots}{p_{1}p_{2}\\cdots}`,
      note: `Strike the $s^{n}$ and set $s=0$. This is $K_{p}$, $K_{v}$ or $K_{a}$ for type 0, 1 or 2.` },
    { latex: `\\begin{array}{c|ccc} & \\text{step} & \\text{ramp} & \\text{parabola}\\\\ \\hline \\text{Type 0} & \\frac{1}{1+K_{p}} & \\infty & \\infty\\\\ \\text{Type 1} & 0 & \\frac{1}{K_{v}} & \\infty\\\\ \\text{Type 2} & 0 & 0 & \\frac{1}{K_{a}}\\end{array}`,
      note: `Table 7.2 in one block. The finite errors run down the diagonal.` },
    { latex: `A\\,u(t)\\to\\frac{A}{1+K_{p}},\\qquad At\\to\\frac{A}{K_{v}},\\qquad At^{2}\\to\\frac{2A}{K_{a}}`,
      note: `Scaled inputs. $At^{2}$ is $2A$ unit parabolas, because $\\mathcal{L}\\{t^{2}\\}=2/s^{3}$.` },
    { latex: `G(s)=\\frac{T(s)}{1-T(s)}`,
      note: `Recover the forward transfer function of a unity loop from its closed-loop transfer function, then read the type.` },
    { latex: `e_{\\text{spec}}\\ \\Rightarrow\\ K\\ge K_{\\min},\\qquad \\text{Routh}\\ \\Rightarrow\\ K<K_{\\max}`,
      note: `Gain design. A design exists only if $K_{\\min}<K_{\\max}$.` },
  ],

  problems: [
    {
      id: "7-01", difficulty: "warmup", topic: "Test inputs", sec: "7.1",
      prompt: `A tracking antenna's pointing angle is controlled by a unity feedback loop. For each command,
write $r(t)$ and $R(s)$, name the test input it is a multiple of, and name the static error
constant that will govern the steady-state error.

**(a)** Hold on a geostationary satellite sitting $0.3$ rad from the reference direction.

**(b)** Follow a satellite that crosses the reference direction at $t=0$ and moves at a constant
$0.004$ rad/s.

**(c)** Follow a missile whose bearing starts at the reference direction with zero angular rate
and changes with a constant angular acceleration of $0.6$ rad/s².`,
      hint: `Constant position, constant velocity, constant acceleration. For (c), integrate the
acceleration twice.`,
      answer: `**(a)** $r=0.3\\,u(t)$, $R=\\dfrac{0.3}{s}$: a step, governed by $K_{p}$.
**(b)** $r=0.004\\,t\\,u(t)$, $R=\\dfrac{0.004}{s^{2}}$: a ramp, governed by $K_{v}$.
**(c)** $r=0.3\\,t^{2}u(t)$, $R=\\dfrac{0.6}{s^{3}}$: a parabola, governed by $K_{a}$.`,
      expert: `
**First glance:** each target is described by the first derivative of position that stays
constant: position, velocity, acceleration. That derivative names the test input.

**Discard:** looking up a transform for $0.3t^{2}$ and then hunting for the right multiple.
Building $r(t)$ from the acceleration makes the factor of $\\tfrac12$ appear on its own.

**Path:** $\\ddot r=0.6$ with $r(0)=\\dot r(0)=0$ gives $r=0.3t^{2}$. Then
$\\mathcal{L}\\{t^{2}\\}=2/s^{3}$, so $R=0.6/s^{3}$: the acceleration itself sits over $s^{3}$.

**Check:** a unit parabola $\\tfrac12t^{2}$ has acceleration 1 and transform $1/s^{3}$, so an
acceleration of $0.6$ must give $0.6/s^{3}$.
`,
      solution: `
**Part (a).** The target does not move, so the command is a constant position.

$$r(t)=0.3\\,u(t),\\qquad R(s)=\\frac{0.3}{s}$$

This is $0.3$ unit steps, and the step error depends on $K_{p}$.

**Part (b).** The angle grows at a constant rate from zero.

$$r(t)=0.004\\,t\\,u(t),\\qquad R(s)=\\frac{0.004}{s^{2}}$$

This is $0.004$ unit ramps, and the ramp error depends on $K_{v}$.

**Part (c).** Integrate the acceleration twice, starting from rest at the reference:

$$\\ddot r=0.6\\quad\\Longrightarrow\\quad \\dot r=0.6t\\quad\\Longrightarrow\\quad r=0.3t^{2}$$

$$R(s)=0.3\\cdot\\frac{2}{s^{3}}=\\frac{0.6}{s^{3}}$$

The unit parabola is $\\tfrac12t^{2}$ with transform $1/s^{3}$, so this command is $0.6$ unit
parabolas, and the error depends on $K_{a}$.

**Check.** In every case the coefficient over $s^{k}$ is the constant derivative itself:
position $0.3$, velocity $0.004$, acceleration $0.6$. Writing $0.6t^{2}$ for part (c) would have
doubled the command.
`
    },
    {
      id: "7-02", difficulty: "warmup", topic: "Sources of error", sec: "7.1",
      prompt: `A unity feedback loop has a pure gain $K=24$ as its forward path and receives a unit step.

**(a)** Without using any transforms, find the steady-state output and the steady-state error.

**(b)** What gain would reduce the error to 1%?

**(c)** The gain is replaced by $24/s$. Explain physically what the steady-state error must be,
then confirm it with the final value theorem.`,
      hint: `In steady state the block's equation is $c=Ke$, and the summing junction's is $e=1-c$.`,
      answer: `**(a)** $c_{ss}=\\tfrac{24}{25}=0.96$, $e_{ss}=\\tfrac{1}{25}=0.04$. **(b)** $K=99$. **(c)** $e(\\infty)=0$:
the integrator can hold a constant output only when its input is zero.`,
      expert: `
**First glance:** two equations in two unknowns, one from the block and one from the junction.
Nothing dynamic is happening in a pure gain.

**Discard:** the final value theorem for parts (a) and (b). It gives the same answer, but the
point of the problem is the mechanism: the block needs an error to produce an output.

**Path:** $c=24e$ and $e=1-c$ give $e=1/25$. For (b), $1/(1+K)=0.01$. For (c), an integrator's
output stops changing only when its input is zero.

**Check:** $c+e=0.96+0.04=1$, the commanded value.
`,
      solution: `
**Part (a).** In steady state every signal is constant. The block and the junction give

$$c_{ss}=24\\,e_{ss},\\qquad e_{ss}=1-c_{ss}$$

Substitute the first into the second:

$$e_{ss}=1-24e_{ss}\\qquad\\Longrightarrow\\qquad e_{ss}=\\frac{1}{25}=0.04,\\qquad c_{ss}=0.96$$

The output cannot reach 1. If it did, the error would be zero, and a pure gain with zero input
produces zero output.

**Part (b).**

$$\\frac{1}{1+K}=0.01\\qquad\\Longrightarrow\\qquad K=99$$

The error falls as the gain rises, and no finite gain makes it zero.

**Part (c).** With $24/s$ in the forward path, $\\dot c=24e$. The output keeps changing as long as
$e\\neq0$, so the only constant state is $e=0$, with the integrator holding $c=1$.

By the final value theorem, with $E=R/(1+G)$:

$$e(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{1/s}{1+24/s}=\\lim_{s\\to0}\\frac{s}{s+24}=0$$

The closed loop is $T=24/(s+24)$, a single pole at $-24$, so it is stable and the theorem applies.

**Check.** $c(t)=1-e^{-24t}$ for the integrator loop, which settles exactly on 1.
`
    },
    {
      id: "7-03", difficulty: "core", topic: "Test inputs", sec: "7.1",
      prompt: `Three stable unity feedback loops each receive a unit ramp. Long after the transient has died,
their outputs look like this:

**(i)** a ramp parallel to the input, lagging it by a vertical distance of $0.25$;

**(ii)** indistinguishable from the input;

**(iii)** a ramp of slope $0.8$.

For each, give $e(\\infty)$, what it says about the number of integrators in the forward path, and
the value of whichever static error constant can be found.`,
      hint: `For (iii), the output is $C(s)=T(s)/s^{2}$. Expand near $s=0$ to find the slope of the output
ramp.`,
      answer: `**(i)** $e(\\infty)=0.25$: exactly one integrator, $K_{v}=4$.
**(ii)** $e(\\infty)=0$: at least two integrators, $K_{v}=\\infty$.
**(iii)** $e(\\infty)=\\infty$, with the gap growing at $0.2$ per second: no integrators, and
$K_{p}=4$ from $K_{p}/(1+K_{p})=0.8$.`,
      expert: `
**First glance:** these are outputs 1, 2 and 3 of Nise's ramp figure, with numbers attached.
Parallel means finite error, coincident means zero, different slope means infinite.

**Discard:** any attempt to identify $G(s)$. One number per loop is all a ramp measurement can
give.

**Path:** (i) $1/K_{v}=0.25$. (ii) $1/K_{v}=0$. (iii) the output ramp's slope is the closed-loop
dc gain $T(0)=K_{p}/(1+K_{p})$, so $0.8$ gives $K_{p}=4$.

**Check:** in (iii) the gap grows at $1-0.8=0.2$, which equals $1/(1+K_{p})$, the type 0 step
error. A type 0 loop loses $1/(1+K_{p})$ of whatever it is commanded, and under a ramp that loss
accumulates.
`,
      solution: `
**Part (i).** A constant vertical gap is a finite error, $e(\\infty)=0.25$. A finite ramp error
belongs to a type 1 loop, where

$$e_{\\text{ramp}}(\\infty)=\\frac{1}{K_{v}}=0.25\\qquad\\Longrightarrow\\qquad K_{v}=4\\ \\text{s}^{-1}$$

**Part (ii).** The output lands on the input, so $e(\\infty)=0$. Zero ramp error requires
$K_{v}=\\infty$, which takes at least two integrators. A ramp test cannot tell type 2 from type 3.

**Part (iii).** Two ramps of different slopes separate without bound: $e(\\infty)=\\infty$. Only a
type 0 loop has infinite ramp error.

To get $K_{p}$, find the slope of the output. $C(s)=T(s)/s^{2}$; expanding $T$ near $s=0$,

$$C(s)=\\frac{T(0)}{s^{2}}+\\frac{T'(0)}{s}+(\\text{terms from the closed-loop poles, which decay})$$

so in steady state $c(t)\\approx T(0)\\,t+T'(0)$, a ramp of slope $T(0)$. For unity feedback,

$$T(0)=\\frac{G(0)}{1+G(0)}=\\frac{K_{p}}{1+K_{p}}=0.8\\qquad\\Longrightarrow\\qquad K_{p}=4$$

**Check.** The gap grows at $1-0.8=0.2$ per second, and $1/(1+K_{p})=1/5=0.2$. Problem 7-12
derives the same rate from $E(s)$ directly.
`
    },
    {
      id: "7-04", difficulty: "core", topic: "Stability first", sec: "7.1",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{80}{(s+1)(s+2)(s+3)}$$

and a unit step input. A student computes $K_{p}=80/6$ and reports $e(\\infty)=1/(1+K_{p})=3/43\\approx0.070$.

**(a)** Is the closed loop stable?

**(b)** What does the error actually do?

**(c)** For what range of the gain (in place of 80) is the student's formula meaningful?`,
      hint: `Close the loop first: $D(s)+N(s)$, then the third-order rule $a_{2}a_{1}>a_{0}$.`,
      answer: `**(a)** No. $s^{3}+6s^{2}+11s+86$ has first column $1,\\;6,\\;-\\tfrac{10}{3},\\;86$: two
right-half-plane poles, at about $0.19\\pm j3.66$. **(b)** It oscillates at about $3.7$ rad/s with an
envelope growing like $e^{0.19t}$; it has no final value. **(c)** $0<K<60$ (formally $-6<K<60$).`,
      expert: `
**First glance:** a type 0 cubic with a large gain. The error formula will happily return a number;
whether the number means anything depends on Routh.

**Discard:** trusting $3/43$ because it looks reasonable. The limit $\\lim_{s\\to0}G(s)$ never
sees the closed-loop poles.

**Path:** $(s+1)(s+2)(s+3)+K=s^{3}+6s^{2}+11s+(6+K)$. Stable iff $6\\cdot11>6+K$, so $K<60$. At
$K=80$ the rule fails.

**Check:** the failing case has two sign changes, a complex pair across the axis, which is the
usual way a third-order loop goes unstable as gain rises.
`,
      solution: `
**Part (a): close the loop.**

$$(s+1)(s+2)(s+3)+80=s^{3}+6s^{2}+11s+86$$

$$\\begin{array}{c|cc}
s^{3} & 1 & 11\\\\
s^{2} & 6 & 86\\\\
s^{1} & -\\tfrac{10}{3} & 0\\\\
s^{0} & 86 & 0
\\end{array}
\\qquad b_{1}=\\frac{6\\cdot11-86}{6}=-\\frac{10}{3}$$

Two sign changes: two closed-loop poles in the right half-plane. Numerically they sit near
$0.19\\pm j3.66$, with the third at about $-6.39$. **Unstable.**

**Part (b): what the error does.** The natural response contains
$e^{0.19t}\\cos(3.66t+\\phi)$, which grows without bound and swamps the forced response. The
error oscillates with a growing envelope; there is no final value, and $3/43$ describes nothing
the system does.

The final value theorem was not allowed: $sE(s)=\\dfrac{(s+1)(s+2)(s+3)}{s^{3}+6s^{2}+11s+86}$
has right-half-plane poles.

**Part (c): where the formula is valid.** With a general gain the denominator is
$s^{3}+6s^{2}+11s+(6+K)$. The third-order rule:

$$6\\cdot11>6+K\\quad\\Longrightarrow\\quad K<60,\\qquad 6+K>0\\quad\\Longrightarrow\\quad K>-6$$

For $0<K<60$, $e(\\infty)=\\dfrac{1}{1+K/6}=\\dfrac{6}{6+K}$, and the smallest error the loop can
approach is $6/66=1/11\\approx0.091$, at the edge of stability. The student's $0.070$ is below
anything this loop can deliver.

**Check.** At $K=60$ the $s^{1}$ row vanishes, the even polynomial is $6s^{2}+66$, and the loop
oscillates at $\\sqrt{11}\\approx3.32$ rad/s. At $K=80$ the observed $3.66$ rad/s is a little
higher, as expected once the pair has moved past the axis. Problem 7-27 turns this range into a
design.
`
    },
    {
      id: "7-05", difficulty: "warmup", topic: "Final value theorem", sec: "7.2",
      prompt: `For each error transform, decide whether the final value theorem gives the correct
$e(\\infty)$. Where it does, find it. Where it does not, say what $e(t)$ actually does.

**(a)** $E(s)=\\dfrac{5(s+4)}{s(s+2)(s+10)}$

**(b)** $E(s)=\\dfrac{3}{s(s-2)}$

**(c)** $E(s)=\\dfrac{4}{s(s^{2}+9)}$

**(d)** $E(s)=\\dfrac{s+1}{s^{2}(s+3)}$

**(e)** $E(s)=\\dfrac{2}{(s+1)(s+5)}$`,
      hint: `Multiply by $s$ first, then look at the poles of what is left.`,
      answer: `**(a)** valid, $e(\\infty)=1$. **(b)** invalid: the pole at $+2$ makes $e(t)$ grow (the
theorem would wrongly give $-\\tfrac32$). **(c)** invalid: $e(t)=\\tfrac49(1-\\cos3t)$ oscillates
forever (the theorem would give $\\tfrac49$). **(d)** gives $\\infty$, which is correct: $e(t)$ grows
like $t/3$. **(e)** valid, $e(\\infty)=0$.`,
      expert: `
**First glance:** the test is on $sE(s)$. Every pole of $sE(s)$ must be strictly in the left
half-plane for a finite answer.

**Discard:** inverting each transform. Only (b) and (c) need it, and only to show what the
theorem missed.

**Path:** (a) and (e) pass. (b) has $+2$. (c) has $\\pm j3$. (d) leaves a pole at the origin in
$sE(s)$, so the limit is infinite, and that infinity is the true answer.

**Check:** (c) is the trap. Its limit is a finite number, $4/9$, which is the average value of
an oscillation that never settles.
`,
      solution: `
| Case | $sE(s)$ | Poles of $sE(s)$ | Verdict |
|---|---|---|---|
| (a) | $\\dfrac{5(s+4)}{(s+2)(s+10)}$ | $-2,\\,-10$ | valid: $\\dfrac{5\\cdot4}{2\\cdot10}=1$ |
| (b) | $\\dfrac{3}{s-2}$ | $+2$ | invalid |
| (c) | $\\dfrac{4}{s^{2}+9}$ | $\\pm j3$ | invalid |
| (d) | $\\dfrac{s+1}{s(s+3)}$ | $0,\\,-3$ | limit is $\\infty$, and correct |
| (e) | $\\dfrac{2s}{(s+1)(s+5)}$ | $-1,\\,-5$ | valid: $0$ |

**What (b) does.** $\\dfrac{3}{s(s-2)}=-\\dfrac{3/2}{s}+\\dfrac{3/2}{s-2}$, so
$e(t)=-\\tfrac32+\\tfrac32e^{2t}$, which grows without bound. The theorem would have reported
$-\\tfrac32$.

**What (c) does.** $\\dfrac{4}{s(s^{2}+9)}=\\dfrac{4/9}{s}-\\dfrac{(4/9)s}{s^{2}+9}$, so
$e(t)=\\tfrac49(1-\\cos3t)$, oscillating between $0$ and $\\tfrac89$ forever.

**What (d) does.** $\\dfrac{s+1}{s^{2}(s+3)}=\\dfrac{1/3}{s^{2}}+\\dfrac{2/9}{s}-\\dfrac{2/9}{s+3}$, so
$e(t)=\\tfrac13t+\\tfrac29-\\tfrac29e^{-3t}\\to\\infty$. Two poles at the origin in $E(s)$ give an
infinite answer that is also the right one; this is the case Nise allows.

**Check.** Only (a) and (e) have every pole of $sE(s)$ strictly on the left, and only they settle
to a finite value.
`
    },
    {
      id: "7-06", difficulty: "warmup", topic: "Error from T(s)", sec: "7.2",
      prompt: `A stable system has

$$T(s)=\\frac{12}{s^{2}+5s+16}$$

Find the steady-state error to a unit step and to a unit ramp, working from $T(s)$.`,
      hint: `$E(s)=R(s)[1-T(s)]$. For the step, the answer is $1-T(0)$.`,
      answer: `$e_{\\text{step}}(\\infty)=\\tfrac14$; $e_{\\text{ramp}}(\\infty)=\\infty$.`,
      expert: `
**First glance:** $T(0)=12/16$. A closed-loop dc gain below 1 means a finite step error and,
with it, an infinite ramp error.

**Discard:** inverting $C(s)$. The final value theorem needs only the behaviour at $s=0$.

**Path:** $e_{\\text{step}}=1-T(0)=\\tfrac14$. For the ramp, $(1-T)/s$ blows up because
$1-T(0)\\neq0$.

**Check:** recover $G=T/(1-T)=12/[(s+1)(s+4)]$. Type 0 with $K_{p}=3$ gives $1/(1+3)=\\tfrac14$.
`,
      solution: `
**Step 1: stability.** $s^{2}+5s+16$ has positive coefficients and is second order, so both poles
are in the left half-plane.

**Step 2: the error transform.**

$$1-T(s)=\\frac{s^{2}+5s+16-12}{s^{2}+5s+16}=\\frac{s^{2}+5s+4}{s^{2}+5s+16}$$

**Step 3: unit step.**

$$e(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{1}{s}\\cdot\\frac{s^{2}+5s+4}{s^{2}+5s+16}=\\frac{4}{16}=\\frac14$$

**Step 4: unit ramp.**

$$e(\\infty)=\\lim_{s\\to0}s\\cdot\\frac{1}{s^{2}}\\cdot\\frac{s^{2}+5s+4}{s^{2}+5s+16}
=\\lim_{s\\to0}\\frac{s^{2}+5s+4}{s(s^{2}+5s+16)}=\\infty$$

**Check.** If this is a unity loop, $G=\\dfrac{T}{1-T}=\\dfrac{12}{s^{2}+5s+4}=\\dfrac{12}{(s+1)(s+4)}$:
type 0, $K_{p}=3$, step error $\\tfrac14$ and ramp error $\\infty$, matching both results.
`
    },
    {
      id: "7-07", difficulty: "core", topic: "Error from T(s)", sec: "7.2",
      prompt: `A unity feedback system has closed-loop transfer function

$$T(s)=\\frac{K}{s^{2}+4s+K+2}$$

**(a)** Find the unit-step steady-state error from $T(s)$.

**(b)** Recover $G(s)$, find its type and $K_{p}$, and confirm (a).

**(c)** Find $K$ for a 5% step error, and confirm the loop is stable there.`,
      hint: `$G=T/(1-T)$. The $K$ in the denominator of $T$ cancels against the numerator.`,
      answer: `**(a)** $e=\\dfrac{2}{K+2}$. **(b)** $G=\\dfrac{K}{s^{2}+4s+2}$: type 0, $K_{p}=\\dfrac K2$, and
$\\dfrac{1}{1+K/2}=\\dfrac{2}{K+2}$. **(c)** $K=38$; stable for every $K>-2$.`,
      expert: `
**First glance:** $T(0)=K/(K+2)$, so the step error is $1-T(0)$ by inspection.

**Discard:** finding the poles. The error needs $s=0$ only, and stability needs only the signs of
three coefficients.

**Path:** $1-\\dfrac{K}{K+2}=\\dfrac{2}{K+2}$. Then $\\dfrac{2}{K+2}=0.05$ gives $K=38$.

**Check:** two routes, one answer: $1-T(0)$ and $1/(1+K_{p})$ must agree for any unity loop.
`,
      solution: `
**Part (a).**

$$e(\\infty)=1-T(0)=1-\\frac{K}{K+2}=\\frac{2}{K+2}$$

**Part (b).**

$$1-T=\\frac{s^{2}+4s+K+2-K}{s^{2}+4s+K+2}=\\frac{s^{2}+4s+2}{s^{2}+4s+K+2}$$

$$G=\\frac{T}{1-T}=\\frac{K}{s^{2}+4s+2}$$

$s^{2}+4s+2$ has roots $-2\\pm\\sqrt2$, neither at the origin: **type 0**, with

$$K_{p}=G(0)=\\frac{K}{2},\\qquad e(\\infty)=\\frac{1}{1+K/2}=\\frac{2}{K+2}\\;\\checkmark$$

**Part (c).**

$$\\frac{2}{K+2}=0.05\\qquad\\Longrightarrow\\qquad K+2=40\\qquad\\Longrightarrow\\qquad K=38$$

The closed-loop denominator $s^{2}+4s+40$ is second order with positive coefficients: stable. In
general it is stable for $K+2>0$.

**Check.** At $K=38$, $K_{p}=19$ and $1/(1+19)=0.05$.
`
    },
    {
      id: "7-08", difficulty: "challenge", topic: "Error from T(s)", sec: "7.2",
      prompt: `A unity feedback system has

$$T(s)=\\frac{6s+20}{s^{2}+6s+20}$$

**(a)** Find the steady-state error to a unit step, a unit ramp and a unit parabola, from $T(s)$
alone.

**(b)** Recover $G(s)$ and explain the results with system type.`,
      hint: `Compute $1-T(s)$ first. Its numerator is the whole story.`,
      answer: `**(a)** $0$, $0$, $\\tfrac{1}{20}$. **(b)** $G=\\dfrac{2(3s+10)}{s^{2}}$: type 2 with $K_{a}=20$.`,
      expert: `
**First glance:** the numerator of $T$ matches the bottom two coefficients of its denominator,
$6s+20$ against $6s+20$. That match is what makes $1-T$ start at $s^{2}$.

**Discard:** expanding three separate partial-fraction problems. One subtraction answers all
three inputs.

**Path:** $1-T=\\dfrac{s^{2}}{s^{2}+6s+20}$. Dividing by $s^{0}$, $s^{1}$ and $s^{2}$ for step,
ramp and parabola gives $0$, $0$ and $1/20$.

**Check:** $G=T/(1-T)$ has $s^{2}$ in its denominator: two integrators, which is what tracks a
ramp exactly.
`,
      solution: `
**Step 1: stability.** $s^{2}+6s+20$ is second order with positive coefficients: stable.

**Step 2: the error transform.**

$$1-T(s)=\\frac{s^{2}+6s+20-(6s+20)}{s^{2}+6s+20}=\\frac{s^{2}}{s^{2}+6s+20}$$

**Step 3: the three inputs.** With $R=1/s^{k}$, $e(\\infty)=\\lim_{s\\to0}s^{1-k}[1-T(s)]$.

$$\\text{step: }\\lim_{s\\to0}\\frac{s^{2}}{s^{2}+6s+20}=0$$

$$\\text{ramp: }\\lim_{s\\to0}\\frac{s}{s^{2}+6s+20}=0$$

$$\\text{parabola: }\\lim_{s\\to0}\\frac{1}{s^{2}+6s+20}=\\frac{1}{20}$$

**Step 4: recover $G$.**

$$G(s)=\\frac{T}{1-T}=\\frac{6s+20}{s^{2}}=\\frac{2(3s+10)}{s^{2}}$$

Two poles at the origin: **type 2**. Then $K_{p}=K_{v}=\\infty$, and

$$K_{a}=\\lim_{s\\to0}s^{2}G(s)=20,\\qquad e_{\\text{parabola}}=\\frac{1}{20}\\;\\checkmark$$

**Check.** A general closed loop $T=\\dfrac{b_{1}s+b_{0}}{s^{2}+a_{1}s+a_{0}}$ has zero step error
when $b_{0}=a_{0}$, and zero ramp error when also $b_{1}=a_{1}$. This $T$ satisfies both, which is
the closed-loop signature of a type 2 forward path.
`
    },
    {
      id: "7-09", difficulty: "warmup", topic: "Error from G(s)", sec: "7.2",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{50}{(s+2)(s+5)}$$

Find the steady-state errors for the inputs $3u(t)$, $3t\\,u(t)$ and $3t^{2}u(t)$.`,
      hint: `Check stability, find the type, then scale. $\\mathcal{L}\\{3t^{2}\\}=6/s^{3}$.`,
      answer: `$0.5$, $\\infty$, $\\infty$.`,
      expert: `
**First glance:** no pole at the origin. Type 0, so only the step error is finite.

**Discard:** the three separate limits. Type 0 decides the ramp and parabola answers without
arithmetic.

**Path:** $K_{p}=50/10=5$. $e=3/(1+5)=0.5$.

**Check:** closed loop $s^{2}+7s+60$ is stable, so the numbers mean something.
`,
      solution: `
**Step 1: stability.** $(s+2)(s+5)+50=s^{2}+7s+60$: second order, positive coefficients, stable.

**Step 2: type and constants.** No pole at the origin, so type 0.

$$K_{p}=G(0)=\\frac{50}{2\\cdot5}=5,\\qquad K_{v}=0,\\qquad K_{a}=0$$

**Step 3: each input.**

| Input | $R(s)$ | $e(\\infty)$ |
|---|---|---|
| $3u(t)$ | $3/s$ | $\\dfrac{3}{1+K_{p}}=\\dfrac36=0.5$ |
| $3t\\,u(t)$ | $3/s^{2}$ | $\\dfrac{3}{K_{v}}=\\infty$ |
| $3t^{2}u(t)$ | $6/s^{3}$ | $\\dfrac{6}{K_{a}}=\\infty$ |

**Check.** Directly: $\\lim_{s\\to0}s\\cdot\\dfrac{3/s}{1+G(s)}=\\dfrac{3}{1+5}=0.5$.
`
    },
    {
      id: "7-10", difficulty: "core", topic: "Error from G(s)", sec: "7.2",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{40(s+3)}{s(s+4)(s+6)}$$

Find the steady-state errors for $2u(t)$, $2t\\,u(t)$ and $2t^{2}u(t)$.`,
      hint: `One integrator. Only $K_{v}$ needs computing.`,
      answer: `$0$, $0.4$, $\\infty$.`,
      expert: `
**First glance:** one $s$ in the denominator: type 1. Step error zero, parabola error infinite,
ramp error $2/K_{v}$.

**Discard:** computing $K_{p}$ and $K_{a}$. The type fixes them at $\\infty$ and $0$.

**Path:** strike the $s$, set $s=0$: $K_{v}=40\\cdot3/(4\\cdot6)=5$. Ramp error $2/5$.

**Check:** the closed loop $s^{3}+10s^{2}+64s+120$ passes $10\\cdot64>120$.
`,
      solution: `
**Step 1: stability.**

$$s(s+4)(s+6)+40(s+3)=s^{3}+10s^{2}+24s+40s+120=s^{3}+10s^{2}+64s+120$$

Third-order rule: $10\\cdot64=640>120$. Stable.

**Step 2: type and constants.** One pole at the origin: **type 1**.

$$K_{p}=\\infty,\\qquad K_{v}=\\lim_{s\\to0}sG(s)=\\frac{40\\cdot3}{4\\cdot6}=5\\ \\text{s}^{-1},\\qquad K_{a}=0$$

**Step 3: each input.**

| Input | $R(s)$ | $e(\\infty)$ |
|---|---|---|
| $2u(t)$ | $2/s$ | $\\dfrac{2}{1+\\infty}=0$ |
| $2t\\,u(t)$ | $2/s^{2}$ | $\\dfrac{2}{5}=0.4$ |
| $2t^{2}u(t)$ | $4/s^{3}$ | $\\dfrac{4}{0}=\\infty$ |

**Check.** Compare 7-09. The one integrator turned a finite step error into zero and an infinite
ramp error into a finite one, and left the parabola where it was.
`
    },
    {
      id: "7-11", difficulty: "core", topic: "Error from G(s)", sec: "7.2",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{60(s+1)(s+3)}{s^{2}(s+4)(s+6)}$$

Confirm the loop is stable, then find the steady-state errors for $3u(t)$, $3t\\,u(t)$ and
$3t^{2}u(t)$.`,
      hint: `Fourth-order closed loop: build the full Routh table. For the parabola, $3t^{2}$ is $6$ unit
parabolas.`,
      answer: `Stable (first column $1,\\;1,\\;1,\\;21,\\;3$ after scaling). Errors: $0$, $0$, $0.8$.`,
      expert: `
**First glance:** $s^{2}$ in the denominator: type 2. Step and ramp errors are zero; the
parabola error is finite.

**Discard:** the third-order shortcut. The closed loop is fourth order, so the full table is
needed. Type 2 loops are where stability is least automatic.

**Path:** $K_{a}=60\\cdot1\\cdot3/(4\\cdot6)=7.5$. The input $3t^{2}$ has $R=6/s^{3}$, so
$e=6/7.5=0.8$.

**Check:** using $3/K_{a}=0.4$ halves the answer; the factor of 2 from $\\mathcal{L}\\{t^{2}\\}$ is
the whole difference.
`,
      solution: `
**Step 1: close the loop.**

$$s^{2}(s+4)(s+6)+60(s+1)(s+3)=s^{4}+10s^{3}+24s^{2}+60s^{2}+240s+180$$

$$=s^{4}+10s^{3}+84s^{2}+240s+180$$

**Step 2: Routh, scaling rows by positive constants.**

$$\\begin{array}{c|ccc}
s^{4} & 1 & 84 & 180\\\\
s^{3} & 10 & 240 & 0\\\\
\\end{array}
\\;\\longrightarrow\\;
\\begin{array}{c|ccc}
s^{4} & 1 & 84 & 180\\\\
s^{3} & 1 & 24 & 0\\\\
s^{2} & 60 & 180 & 0\\\\
\\end{array}
\\;\\longrightarrow\\;
\\begin{array}{c|ccc}
s^{4} & 1 & 84 & 180\\\\
s^{3} & 1 & 24 & 0\\\\
s^{2} & 1 & 3 & 0\\\\
s^{1} & 21 & 0 & 0\\\\
s^{0} & 3 & 0 & 0
\\end{array}$$

The $s^{2}$ entries are $84-24=60$ and $180$; the $s^{1}$ entry is $24-3=21$. No sign changes:
**stable**.

**Step 3: constants.** Two poles at the origin: **type 2**.

$$K_{p}=\\infty,\\qquad K_{v}=\\infty,\\qquad K_{a}=\\frac{60\\cdot1\\cdot3}{4\\cdot6}=7.5\\ \\text{s}^{-2}$$

**Step 4: each input.**

| Input | $R(s)$ | $e(\\infty)$ |
|---|---|---|
| $3u(t)$ | $3/s$ | $0$ |
| $3t\\,u(t)$ | $3/s^{2}$ | $0$ |
| $3t^{2}u(t)$ | $6/s^{3}$ | $\\dfrac{6}{7.5}=0.8$ |

**Check.** $\\lim_{s\\to0}s\\cdot\\dfrac{6/s^{3}}{1+G}=\\lim_{s\\to0}\\dfrac{6}{s^{2}+s^{2}G}=\\dfrac{6}{0+7.5}=0.8$.
`
    },
    {
      id: "7-12", difficulty: "challenge", topic: "Error from G(s)", sec: "7.2",
      prompt: `The type 0 loop of 7-09, $G(s)=\\dfrac{50}{(s+2)(s+5)}$, receives a unit ramp.

**(a)** Find $e(t)$ for large $t$: the growing part and the constant part.

**(b)** What is the slope of the output ramp?

**(c)** Show that for any stable type 0 unity loop the error to a unit ramp grows at the rate
$1/(1+K_{p})$.`,
      hint: `Expand $E(s)=\\dfrac{1}{s^{2}[1+G(s)]}$. Only the double pole at the origin survives; its two
residues give the growing and constant parts.`,
      answer: `**(a)** $e(t)\\to\\dfrac{t}{6}+\\dfrac{7}{72}$. **(b)** $\\dfrac56$. **(c)** The coefficient of $1/s^{2}$
in $E(s)$ is $1/[1+G(0)]=1/(1+K_{p})$.`,
      expert: `
**First glance:** the final value theorem says only "infinite" here. The question asks how the
infinity arrives, which needs the residues at the double pole.

**Discard:** the full partial-fraction expansion. The complex pair's terms decay and contribute
nothing for large $t$.

**Path:** $E=\\dfrac{1}{s^{2}}\\cdot F(s)$ with $F=\\dfrac{1}{1+G}$. The $1/s^{2}$ residue is $F(0)$,
the $1/s$ residue is $F'(0)$.

**Check:** $F(0)=1/(1+K_{p})=1/6$, so the rate is the type 0 step error, as in 7-03(iii).
`,
      solution: `
**Step 1: the error transform.**

$$\\frac{1}{1+G}=\\frac{(s+2)(s+5)}{(s+2)(s+5)+50}=\\frac{s^{2}+7s+10}{s^{2}+7s+60}\\equiv F(s)$$

$$E(s)=\\frac{F(s)}{s^{2}}$$

The closed-loop poles, $-3.5\\pm j6.91$, contribute terms that decay. What remains for large $t$
comes from the double pole at the origin:

$$E(s)=\\frac{F(0)}{s^{2}}+\\frac{F'(0)}{s}+(\\text{decaying terms})$$

**Step 2: the residues.**

$$F(0)=\\frac{10}{60}=\\frac16$$

$$F'(s)=\\frac{(2s+7)(s^{2}+7s+60)-(s^{2}+7s+10)(2s+7)}{(s^{2}+7s+60)^{2}}
=\\frac{50(2s+7)}{(s^{2}+7s+60)^{2}}$$

$$F'(0)=\\frac{350}{3600}=\\frac{7}{72}$$

**Part (a).**

$$e(t)\\;\\to\\;\\frac{t}{6}+\\frac{7}{72}$$

**Part (b).** $c=r-e\\to t-\\dfrac t6-\\dfrac{7}{72}=\\dfrac56t-\\dfrac{7}{72}$. The output ramps at
$\\tfrac56$ of the commanded rate: output 3 of the ramp figure.

**Part (c).** For any type 0 loop, $F(0)=\\dfrac{1}{1+G(0)}=\\dfrac{1}{1+K_{p}}$, finite and nonzero,
so $e(t)$ grows like $\\dfrac{t}{1+K_{p}}$. Equivalently the output slope is
$1-\\dfrac{1}{1+K_{p}}=\\dfrac{K_{p}}{1+K_{p}}=T(0)$.

**Check.** $\\dfrac{K_{p}}{1+K_{p}}=\\dfrac56$ with $K_{p}=5$. And $e(0)$ from the exact solution
must be $0$, which is the decaying terms' job: at $t=0$ they equal $-\\tfrac{7}{72}$.
`
    },
    {
      id: "7-13", difficulty: "core", topic: "Error from G(s)", sec: "7.2",
      prompt: `Use the loops of 7-10 (type 1, $K_{v}=5$) and 7-11 (type 2, $K_{a}=7.5$).

**(a)** The type 1 loop receives $r(t)=4+2t$. Find $e(\\infty)$.

**(b)** The type 2 loop receives $r(t)=4+2t+t^{2}$. Find $e(\\infty)$.

**(c)** The type 1 loop receives the input of (b). Find $e(\\infty)$.

**(d)** What is the smallest type that tracks the input of (b) with zero error?`,
      hint: `The system is linear: split the input, find each error, add.`,
      answer: `**(a)** $0.4$. **(b)** $\\tfrac{4}{15}\\approx0.267$. **(c)** $\\infty$. **(d)** Type 3.`,
      expert: `
**First glance:** each command is a sum of a step, a ramp and a parabola. Superposition turns one
problem into three lookups.

**Discard:** forming $R(s)$ as one fraction and taking a single limit. It works, but it hides
which term is responsible for the answer.

**Path:** (a) $0+2/5$. (b) $0+0+2/K_{a}$, since $t^{2}=2\\cdot\\tfrac12t^{2}$. (c) the $t^{2}$ term
alone is infinite for type 1.

**Check:** the error is set by the highest-order term in the command that the type cannot
absorb.
`,
      solution: `
**Part (a).** Split $r=4u(t)+2t\\,u(t)$. For type 1:

$$e=\\frac{4}{1+\\infty}+\\frac{2}{K_{v}}=0+\\frac25=0.4$$

**Part (b).** Split $r=4u(t)+2t\\,u(t)+t^{2}u(t)$. The last term is $2\\cdot\\tfrac12t^{2}$, two unit
parabolas. For type 2:

$$e=0+0+\\frac{2}{K_{a}}=\\frac{2}{7.5}=\\frac{4}{15}\\approx0.267$$

**Part (c).** For type 1, $K_{a}=0$, so the parabola term contributes $2/0=\\infty$. The total is
infinite, regardless of the finite contributions of the other two terms.

**Part (d).** Zero error to a parabola needs $K_{a}=\\infty$: three integrators.

**Check.** Taking the limit in one piece for (b):
$R=\\dfrac4s+\\dfrac{2}{s^{2}}+\\dfrac{2}{s^{3}}$, and
$\\lim_{s\\to0}\\dfrac{sR}{1+G}=\\lim_{s\\to0}\\dfrac{4s^{2}+2s+2}{s^{2}+s^{2}G}=\\dfrac{2}{7.5}$.
`
    },
    {
      id: "7-14", difficulty: "warmup", topic: "System type", sec: "7.3",
      prompt: `Give the system type of each unity-feedback forward transfer function, and its one finite,
nonzero static error constant.

**(a)** $\\dfrac{10}{s(s+2)}$

**(b)** $\\dfrac{s+1}{s^{2}(s+5)}$

**(c)** $\\dfrac{6s(s+1)}{s^{3}(s+4)}$

**(d)** $\\dfrac{100}{(s+0.01)(s+10)}$

**(e)** $\\dfrac{5(s+3)}{s(s^{2}+4s+8)}$

**(f)** $\\dfrac{8}{s^{2}+2s}$`,
      hint: `Cancel common factors and factor every polynomial before counting poles at $s=0$.`,
      answer: `**(a)** type 1, $K_{v}=5$. **(b)** type 2, $K_{a}=\\tfrac15$. **(c)** type 2, $K_{a}=\\tfrac32$.
**(d)** type 0, $K_{p}=1000$. **(e)** type 1, $K_{v}=\\tfrac{15}{8}$. **(f)** type 1, $K_{v}=4$.`,
      expert: `
**First glance:** (a) and (b) are direct reads. (c), (d), (e) and (f) each hide one of the four
counting traps: a cancellation, a pole near the origin, a complex pair, an unfactored $s$.

**Discard:** computing all three limits for each. Once the type is known, one limit per function
is enough.

**Path:** count $n$ after cancelling and factoring, strike $s^{n}$, set $s=0$.

**Check:** (d) has an enormous $K_{p}$ but is still type 0; its ramp error is infinite.
`,
      solution: `
| | Simplified $G(s)$ | Poles at origin | Type | Finite constant |
|---|---|---|---|---|
| (a) | $\\dfrac{10}{s(s+2)}$ | 1 | 1 | $K_{v}=\\dfrac{10}{2}=5$ |
| (b) | $\\dfrac{s+1}{s^{2}(s+5)}$ | 2 | 2 | $K_{a}=\\dfrac15$ |
| (c) | $\\dfrac{6(s+1)}{s^{2}(s+4)}$ | 2 | 2 | $K_{a}=\\dfrac64=\\dfrac32$ |
| (d) | $\\dfrac{100}{(s+0.01)(s+10)}$ | 0 | 0 | $K_{p}=\\dfrac{100}{0.1}=1000$ |
| (e) | $\\dfrac{5(s+3)}{s(s^{2}+4s+8)}$ | 1 | 1 | $K_{v}=\\dfrac{15}{8}$ |
| (f) | $\\dfrac{8}{s(s+2)}$ | 1 | 1 | $K_{v}=4$ |

**(c)** The zero at the origin cancels one of the three poles there. Counting before cancelling
gives type 3, and a type 3 loop would follow a parabola with zero error; this one does not.

**(d)** $s=-0.01$ is close to the origin and is not at it. The step error is $1/1001$, small; the
ramp error is infinite.

**(e)** $s^{2}+4s+8$ has roots $-2\\pm j2$. Complex poles are never integrators.

**(f)** $s^{2}+2s=s(s+2)$. Same function as (a) with a different gain.

**Check.** For (e), set $s=0$ in $5(s+3)/(s^{2}+4s+8)$: $15/8$, matching $\\lim_{s\\to0}sG(s)$.
`
    },
    {
      id: "7-15", difficulty: "core", topic: "Static error constants", sec: "7.3",
      prompt: `For each unity-feedback system, find $K_{p}$, $K_{v}$, $K_{a}$ and the steady-state errors for
the unit step, unit ramp and unit parabola. Then check stability, and say which of your answers
are usable.

**(a)** $G(s)=\\dfrac{30(s+2)}{(s+3)(s+5)}$

**(b)** $G(s)=\\dfrac{30(s+2)}{s(s+3)(s+5)}$

**(c)** $G(s)=\\dfrac{30(s+2)}{s^{2}(s+3)(s+5)}$`,
      hint: `The finite constant comes out the same in all three. The closed-loop denominators do not.`,
      answer: `Each has its finite constant equal to 4: **(a)** $K_{p}=4$, errors $\\tfrac15,\\infty,\\infty$.
**(b)** $K_{v}=4$, errors $0,\\tfrac14,\\infty$. **(c)** $K_{a}=4$, errors $0,0,\\tfrac14$.
(a) and (b) are stable. (c) is **unstable** (first column $1,\\;8,\\;\\tfrac{45}{4},\\;-\\tfrac{38}{3},\\;60$),
so its errors are meaningless.`,
      expert: `
**First glance:** the three functions differ only by powers of $s$, so the finite constant is
$30\\cdot2/(3\\cdot5)=4$ every time, and it moves one place down the diagonal of Table 7.2 with
each integrator.

**Discard:** stopping at the table. Adding integrators raises the type and erodes stability, and
(c) is past the point where the loop survives.

**Path:** constants by inspection; then Routh on each closed-loop denominator. (b) is a cubic
and passes $8\\cdot45>60$; (c) is a quartic and fails.

**Check:** the parabola error of $\\tfrac14$ in (c) is exactly the kind of number 7.1 warns about:
finite, tidy, and not a property of anything the system does.
`,
      solution: `
**Step 1: constants and errors, before stability.**

| | Type | $K_{p}$ | $K_{v}$ | $K_{a}$ | $e_{\\text{step}}$ | $e_{\\text{ramp}}$ | $e_{\\text{parabola}}$ |
|---|---|---|---|---|---|---|---|
| (a) | 0 | $4$ | $0$ | $0$ | $\\tfrac15$ | $\\infty$ | $\\infty$ |
| (b) | 1 | $\\infty$ | $4$ | $0$ | $0$ | $\\tfrac14$ | $\\infty$ |
| (c) | 2 | $\\infty$ | $\\infty$ | $4$ | $0$ | $0$ | $\\tfrac14$ |

**Step 2: stability of (a).** $(s+3)(s+5)+30(s+2)=s^{2}+38s+75$. Second order, positive: stable.

**Step 3: stability of (b).**

$$s(s+3)(s+5)+30(s+2)=s^{3}+8s^{2}+45s+60$$

$8\\cdot45=360>60$: stable.

**Step 4: stability of (c).**

$$s^{2}(s+3)(s+5)+30(s+2)=s^{4}+8s^{3}+15s^{2}+30s+60$$

$$\\begin{array}{c|ccc}
s^{4} & 1 & 15 & 60\\\\
s^{3} & 8 & 30 & 0\\\\
s^{2} & \\tfrac{45}{4} & 60 & 0\\\\
s^{1} & -\\tfrac{38}{3} & 0 & 0\\\\
s^{0} & 60 & 0 & 0
\\end{array}$$

$$b_{1}=\\frac{8\\cdot15-30}{8}=\\frac{45}{4},\\qquad
c_{1}=\\frac{\\tfrac{45}{4}\\cdot30-8\\cdot60}{\\tfrac{45}{4}}=\\frac{337.5-480}{11.25}=-\\frac{38}{3}$$

Two sign changes: two right-half-plane poles (near $0.20\\pm j2.05$). **Unstable.**

**Conclusion.** The rows for (a) and (b) are real steady-state errors. The row for (c) is
arithmetic on an unstable loop: the error oscillates with growing amplitude for every input.

**Check.** The $s^{0}$ entry of (c) reproduces $a_{0}=60$, so the table arithmetic is consistent.
`
    },
    {
      id: "7-16", difficulty: "core", topic: "System type", sec: "7.3",
      prompt: `<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" class="nx-fig">
  <defs><marker id="nx7p16" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><text x="8" y="56" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 50.0 L78.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><circle cx="100" cy="50" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M87 50 L113 50 M100 37 L100 63" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="72" y="42" text-anchor="middle" font-size="14">+</text><text x="86" y="84" text-anchor="middle" font-size="14">−</text><path d="M120.0 50.0 L150.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><rect x="150" y="28" width="56" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="178" y="55" text-anchor="middle" font-size="15">A</text><path d="M206.0 50.0 L242.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><circle cx="264" cy="50" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M251 50 L277 50 M264 37 L264 63" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="236" y="42" text-anchor="middle" font-size="14">+</text><text x="250" y="84" text-anchor="middle" font-size="14">−</text><path d="M284.0 50.0 L316.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><rect x="316" y="28" width="110" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="371" y="55" text-anchor="middle" font-size="15">10/[s(s+2)]</text><path d="M426.0 50.0 L546.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><circle cx="456" cy="50" r="4" fill="currentColor" stroke="none"/><circle cx="506" cy="50" r="4" fill="currentColor" stroke="none"/><text x="554" y="56" text-anchor="start" font-size="15">C(s)</text><path d="M456.0 50.0 L456.0 116.0 L405.0 116.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><rect x="337" y="97" width="68" height="38" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="371" y="121" text-anchor="middle" font-size="15">K<tspan dy="4" font-size="11">t</tspan><tspan dy="-4">s</tspan></text><path d="M337.0 116.0 L264.0 116.0 L264.0 74.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/><path d="M506.0 50.0 L506.0 176.0 L100.0 176.0 L100.0 74.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p16)"/>
</svg>
<figcaption>Amplifier A drives the plant. A tachometer feeds the output rate back through the inner loop; the outer loop is unity feedback.</figcaption>
</figure>

The plant is $\\dfrac{10}{s(s+2)}$, the amplifier gain is $A$, and a tachometer feeds back
$K_{t}s$ times the output.

**(a)** Collapse the inner loop and write $G(s)$ for the outer unity loop. What is the type?

**(b)** With $A=4$, find $K_{v}$ and the unit-ramp error for $K_{t}=0$ and for $K_{t}=0.3$.

**(c)** Find the closed-loop damping ratio in both cases.

**(d)** With $K_{t}=0.3$, what amplifier gain restores $K_{v}$ to its $K_{t}=0$ value, and what
is the damping ratio then?`,
      hint: `Inner loop: $\\dfrac{G_{p}}{1+G_{p}K_{t}s}$. The $s$ from the tachometer cancels against the
plant's integrator inside the denominator, not the numerator.`,
      answer: `**(a)** $G=\\dfrac{10A}{s(s+2+10K_{t})}$: type 1. **(b)** $K_{v}=20$, $e=0.05$ without the
tachometer; $K_{v}=8$, $e=0.125$ with it. **(c)** $\\zeta\\approx0.158$ and $\\zeta\\approx0.395$.
**(d)** $A=10$, giving $\\zeta=0.25$.`,
      expert: `
**First glance:** rate feedback multiplies the plant by $s$ inside the loop, so it adds to the
coefficient of $s$ in the plant's denominator and leaves the integrator alone.

**Discard:** worrying that the tachometer removes the integrator. It cannot: its output is zero
whenever the output is constant, so it does nothing in steady state to a step.

**Path:** $s(s+2)+10K_{t}s=s(s+2+10K_{t})$. $K_{v}=10A/(2+10K_{t})$.

**Check:** the tachometer buys damping and charges it to $K_{v}$; raising $A$ buys $K_{v}$ back
and charges it to damping. That is the gain trade-off again, with one extra knob.
`,
      solution: `
**Part (a): the inner loop.**

$$\\frac{\\dfrac{10}{s(s+2)}}{1+\\dfrac{10}{s(s+2)}K_{t}s}=\\frac{10}{s(s+2)+10K_{t}s}=\\frac{10}{s(s+2+10K_{t})}$$

In cascade with the amplifier:

$$G(s)=\\frac{10A}{s(s+2+10K_{t})}$$

Still one pole at the origin: **type 1**.

**Part (b).**

$$K_{v}=\\lim_{s\\to0}sG(s)=\\frac{10A}{2+10K_{t}}$$

| $K_{t}$ | $G(s)$ with $A=4$ | $K_{v}$ | $e_{\\text{ramp}}$ |
|---|---|---|---|
| $0$ | $\\dfrac{40}{s(s+2)}$ | $20$ | $0.05$ |
| $0.3$ | $\\dfrac{40}{s(s+5)}$ | $8$ | $0.125$ |

**Part (c).** Closed-loop denominators $s^{2}+2s+40$ and $s^{2}+5s+40$. With $\\omega_{n}=\\sqrt{40}$:

$$\\zeta=\\frac{2}{2\\sqrt{40}}\\approx0.158,\\qquad \\zeta=\\frac{5}{2\\sqrt{40}}\\approx0.395$$

**Part (d).** With $K_{t}=0.3$, $K_{v}=\\dfrac{10A}{5}=2A=20$ gives $A=10$. Then
$G=\\dfrac{100}{s(s+5)}$, closed loop $s^{2}+5s+100$:

$$\\zeta=\\frac{5}{2\\cdot10}=0.25$$

**Check.** Every version is second order with positive coefficients, so all are stable. At
$A=10$ the loop has the original $K_{v}=20$ and better damping than the original $0.158$: the
tachometer bought damping, and the gain spent some of it to get the accuracy back.
`
    },
    {
      id: "7-17", difficulty: "challenge", topic: "System type", sec: "7.3",
      prompt: `<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" class="nx-fig">
  <defs><marker id="nx7p17" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs><text x="8" y="56" text-anchor="start" font-size="15">R(s)</text><path d="M48.0 50.0 L78.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><circle cx="100" cy="50" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M87 50 L113 50 M100 37 L100 63" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="72" y="42" text-anchor="middle" font-size="14">+</text><text x="86" y="84" text-anchor="middle" font-size="14">−</text><path d="M120.0 50.0 L150.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><rect x="150" y="28" width="56" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="178" y="55" text-anchor="middle" font-size="15">10</text><path d="M206.0 50.0 L242.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><circle cx="264" cy="50" r="20" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><path d="M251 50 L277 50 M264 37 L264 63" stroke="currentColor" stroke-width="1.1" opacity=".45"/><text x="236" y="42" text-anchor="middle" font-size="14">+</text><text x="250" y="84" text-anchor="middle" font-size="14">−</text><path d="M284.0 50.0 L316.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><rect x="316" y="28" width="110" height="44" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="371" y="55" text-anchor="middle" font-size="15">1/[s(s+1)]</text><path d="M426.0 50.0 L546.0 50.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><circle cx="456" cy="50" r="4" fill="currentColor" stroke="none"/><circle cx="506" cy="50" r="4" fill="currentColor" stroke="none"/><text x="554" y="56" text-anchor="start" font-size="15">C(s)</text><path d="M456.0 50.0 L456.0 116.0 L405.0 116.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><rect x="337" y="97" width="68" height="38" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="371" y="121" text-anchor="middle" font-size="15">0.5</text><path d="M337.0 116.0 L264.0 116.0 L264.0 74.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/><path d="M506.0 50.0 L506.0 176.0 L100.0 176.0 L100.0 74.0" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx7p17)"/>
</svg>
<figcaption>An inner loop feeds the output position back through a constant gain of 0.5, inside a unity outer loop.</figcaption>
</figure>

**(a)** Find $G(s)$ for the outer unity loop, its type, and its static error constants.

**(b)** Find the steady-state error to a unit step and to a unit ramp.

**(c)** Repeat (a) and (b) with the inner loop removed, and explain the difference.`,
      hint: `Collapse the inner loop by the feedback formula. Look at what happens to the pole at the origin.`,
      answer: `**(a)** $G=\\dfrac{10}{s^{2}+s+0.5}$: type 0, $K_{p}=20$, $K_{v}=K_{a}=0$.
**(b)** $e_{\\text{step}}=\\tfrac{1}{21}$, $e_{\\text{ramp}}=\\infty$.
**(c)** $G=\\dfrac{10}{s(s+1)}$: type 1, $K_{v}=10$; $e_{\\text{step}}=0$, $e_{\\text{ramp}}=0.1$. Position
feedback around the integrator moves its pole off the origin.`,
      expert: `
**First glance:** the plant has an integrator, and a constant-gain loop is closed around it.
Constant feedback around $1/s$ always produces $1/(s+h)$.

**Discard:** counting the type from the plant alone. Type belongs to the forward path of the
outer loop, after every inner loop is collapsed.

**Path:** $\\dfrac{1}{s(s+1)+0.5}=\\dfrac{1}{s^{2}+s+0.5}$. No $s$ factors out. $K_{p}=10/0.5=20$.

**Check:** both versions are stable second-order loops, so the difference in error is real and
is caused by the inner loop alone.
`,
      solution: `
**Part (a): collapse the inner loop.**

$$\\frac{\\dfrac{1}{s(s+1)}}{1+\\dfrac{0.5}{s(s+1)}}=\\frac{1}{s(s+1)+0.5}=\\frac{1}{s^{2}+s+0.5}$$

$$G(s)=\\frac{10}{s^{2}+s+0.5}$$

$s^{2}+s+0.5$ has roots $-0.5\\pm j0.5$, so there is no pole at the origin: **type 0**.

$$K_{p}=\\frac{10}{0.5}=20,\\qquad K_{v}=0,\\qquad K_{a}=0$$

**Part (b).** Closed loop $s^{2}+s+10.5$: stable.

$$e_{\\text{step}}=\\frac{1}{1+20}=\\frac{1}{21}\\approx0.048,\\qquad e_{\\text{ramp}}=\\infty$$

**Part (c): without the inner loop.** $G=\\dfrac{10}{s(s+1)}$, type 1, closed loop $s^{2}+s+10$,
stable.

$$K_{v}=\\frac{10}{1}=10,\\qquad e_{\\text{step}}=0,\\qquad e_{\\text{ramp}}=0.1$$

**Why.** The inner loop is a position loop around the plant, and its dc gain is finite:
$1/0.5=2$. From the outer loop's point of view the forward path has dc gain $10\\cdot2=20$, a
number rather than infinity. The plant still contains an integrator; the
**forward path of the outer loop** does not.

**Check.** Rate feedback in 7-16 left the type alone because $K_{t}s$ vanishes at $s=0$. Constant
feedback does not vanish at $s=0$, so it changes the dc gain, and the type with it.
`
    },
    {
      id: "7-18", difficulty: "challenge", topic: "System type", sec: "7.3",
      prompt: `A unity feedback system has closed-loop transfer function

$$T(s)=\\frac{10(s+2)}{s^{3}+6s^{2}+15s+20}$$

**(a)** Confirm it is stable.

**(b)** Without finding $G(s)$, find the unit-step error.

**(c)** Find $G(s)$, its type and $K_{v}$, and the unit-ramp error. Confirm the ramp error from
$T(s)$.`,
      hint: `$T(0)$ answers (b). For (c), $1-T$ has numerator $D(s)-N(s)$.`,
      answer: `**(a)** $6\\cdot15=90>20$: stable. **(b)** $T(0)=1$, so $e_{\\text{step}}=0$. **(c)**
$G=\\dfrac{10(s+2)}{s(s+1)(s+5)}$, type 1, $K_{v}=4$, $e_{\\text{ramp}}=0.25$.`,
      expert: `
**First glance:** $T(0)=20/20=1$. A unity closed loop with dc gain exactly 1 has an integrator in
its forward path.

**Discard:** factoring the cubic in the denominator of $T$. The forward path is found by
subtraction, not root-finding.

**Path:** $1-T=\\dfrac{s^{3}+6s^{2}+5s}{D(s)}$. The constant term vanished, which is the
integrator; $G=N/(D-N)$.

**Check:** the ramp error from $T$, $\\lim(1-T)/s=5/20$, matches $1/K_{v}=1/4$.
`,
      solution: `
**Part (a).** Third-order rule on $s^{3}+6s^{2}+15s+20$: $6\\cdot15=90>20$. Stable.

**Part (b).**

$$e_{\\text{step}}=1-T(0)=1-\\frac{10\\cdot2}{20}=0$$

**Part (c): recover $G$.** With $T=N/D$, unity feedback gives $G=N/(D-N)$.

$$D-N=s^{3}+6s^{2}+15s+20-10s-20=s^{3}+6s^{2}+5s=s(s+1)(s+5)$$

$$G(s)=\\frac{10(s+2)}{s(s+1)(s+5)}$$

One pole at the origin: **type 1**.

$$K_{v}=\\frac{10\\cdot2}{1\\cdot5}=4,\\qquad e_{\\text{ramp}}=\\frac14$$

**From $T(s)$.**

$$e_{\\text{ramp}}=\\lim_{s\\to0}\\frac{1-T}{s}=\\lim_{s\\to0}\\frac{s^{2}+6s+5}{s^{3}+6s^{2}+15s+20}=\\frac{5}{20}=\\frac14\\;\\checkmark$$

**Check.** $G/(1+G)=N/(D-N+N)=N/D$ recovers $T$.
`
    },
    {
      id: "7-19", difficulty: "core", topic: "System type", sec: "7.3",
      prompt: `A stable unity feedback loop is tested three ways:

- a unit step leaves zero error;
- a ramp $2t$ leaves an error that settles at $0.25$;
- a parabola $\\tfrac12t^{2}$ leaves an error that grows without bound.

**(a)** What is the system type, and what is $K_{v}$?

**(b)** The forward path is known to have the form $G(s)=\\dfrac{K(s+4)}{s(s+2)(s+6)}$. Find $K$ and
confirm stability.`,
      hint: `A ramp of slope 2 is two unit ramps.`,
      answer: `**(a)** Type 1, $K_{v}=8$. **(b)** $K=24$; closed loop $s^{3}+8s^{2}+36s+96$ is stable.`,
      expert: `
**First glance:** zero, finite, infinite down the three inputs is the type 1 row of Table 7.2.

**Discard:** treating $0.25$ as $1/K_{v}$ directly. The ramp had slope 2.

**Path:** $2/K_{v}=0.25$ gives $K_{v}=8$. Then $K_{v}=4K/12=K/3$.

**Check:** $8\\cdot36=288>96$.
`,
      solution: `
**Part (a).** Zero step error needs at least one integrator; a finite ramp error needs exactly
one; the infinite parabola error is consistent with that. **Type 1.**

$$\\frac{2}{K_{v}}=0.25\\qquad\\Longrightarrow\\qquad K_{v}=8\\ \\text{s}^{-1}$$

**Part (b).**

$$K_{v}=\\lim_{s\\to0}sG(s)=\\frac{4K}{2\\cdot6}=\\frac{K}{3}=8\\qquad\\Longrightarrow\\qquad K=24$$

Closed loop:

$$s(s+2)(s+6)+24(s+4)=s^{3}+8s^{2}+12s+24s+96=s^{3}+8s^{2}+36s+96$$

$8\\cdot36=288>96$: stable.

**Check.** With $K=24$, the ramp $2t$ gives $2/8=0.25$, the measured value.
`
    },
    {
      id: "7-20", difficulty: "challenge", topic: "System type", sec: "7.3",
      prompt: `A unity feedback system has a stable closed-loop transfer function

$$T(s)=\\frac{b_{1}s+b_{0}}{s^{3}+a_{2}s^{2}+a_{1}s+a_{0}}$$

**(a)** Find conditions on the coefficients for zero step error, and then for zero ramp error.

**(b)** When the step error is zero and the ramp error is not, show that $K_{v}=\\dfrac{a_{0}}{a_{1}-b_{1}}$.

**(c)** Apply this to $T(s)=\\dfrac{8s+24}{s^{3}+5s^{2}+12s+24}$, and confirm by recovering $G(s)$.

**(d)** Keeping the same denominator, what numerator makes the loop type 2, and what is $K_{a}$?`,
      hint: `Write $1-T$ over the common denominator. Its numerator is
$s^{3}+a_{2}s^{2}+(a_{1}-b_{1})s+(a_{0}-b_{0})$.`,
      answer: `**(a)** Zero step error: $b_{0}=a_{0}$. Zero ramp error: also $b_{1}=a_{1}$.
**(b)** With $b_{0}=a_{0}$, $G=\\dfrac{b_{1}s+a_{0}}{s(s^{2}+a_{2}s+a_{1}-b_{1})}$, so $K_{v}=\\dfrac{a_{0}}{a_{1}-b_{1}}$.
**(c)** $K_{v}=\\dfrac{24}{12-8}=6$; $G=\\dfrac{8(s+3)}{s(s+1)(s+4)}$. **(d)** $12s+24$: $G=\\dfrac{12(s+2)}{s^{2}(s+5)}$, $K_{a}=\\dfrac{24}{5}$.`,
      expert: `
**First glance:** every steady-state quantity of a unity loop lives in the low-order coefficients of
$1-T$. The constant term decides the step, the $s$ term the ramp.

**Discard:** recovering $G$ by long division every time. The coefficient conditions answer type
and constant directly.

**Path:** $1-T=\\dfrac{s^{3}+a_{2}s^{2}+(a_{1}-b_{1})s+(a_{0}-b_{0})}{D}$. Set the constant term to
zero for type 1, the $s$ term too for type 2. With the constant term zero,
$e_{\\text{ramp}}=\\lim(1-T)/s=(a_{1}-b_{1})/a_{0}$.

**Check:** part (d) changes only the numerator, so the closed-loop poles, and the stability verdict,
are identical to part (c).
`,
      solution: `
**Part (a).**

$$1-T(s)=\\frac{s^{3}+a_{2}s^{2}+(a_{1}-b_{1})s+(a_{0}-b_{0})}{s^{3}+a_{2}s^{2}+a_{1}s+a_{0}}$$

Step error: $1-T(0)=\\dfrac{a_{0}-b_{0}}{a_{0}}$, zero exactly when $b_{0}=a_{0}$.

Ramp error: $\\lim_{s\\to0}\\dfrac{1-T}{s}$ is finite only if $b_{0}=a_{0}$, and then equals
$\\dfrac{a_{1}-b_{1}}{a_{0}}$, zero exactly when also $b_{1}=a_{1}$.

**Part (b).** With $b_{0}=a_{0}$, $G=N/(D-N)$:

$$D-N=s^{3}+a_{2}s^{2}+(a_{1}-b_{1})s=s\\big(s^{2}+a_{2}s+a_{1}-b_{1}\\big)$$

$$G(s)=\\frac{b_{1}s+a_{0}}{s\\big(s^{2}+a_{2}s+a_{1}-b_{1}\\big)},\\qquad K_{v}=\\frac{a_{0}}{a_{1}-b_{1}}$$

and $1/K_{v}$ matches the ramp error from (a).

**Part (c).** $b_{0}=a_{0}=24$, so the step error is zero.

$$K_{v}=\\frac{24}{12-8}=6,\\qquad e_{\\text{ramp}}=\\frac16$$

Recovering $G$: $D-N=s^{3}+5s^{2}+4s=s(s+1)(s+4)$, so

$$G(s)=\\frac{8(s+3)}{s(s+1)(s+4)},\\qquad K_{v}=\\frac{8\\cdot3}{1\\cdot4}=6\\;\\checkmark$$

Stability: $5\\cdot12=60>24$.

**Part (d).** Type 2 needs $b_{1}=a_{1}=12$ as well: $N=12s+24$.

$$D-N=s^{3}+5s^{2}=s^{2}(s+5),\\qquad G(s)=\\frac{12(s+2)}{s^{2}(s+5)},\\qquad K_{a}=\\frac{24}{5}$$

**Check.** The denominator of $T$ is unchanged in (d), so the closed loop is as stable as in (c).
The parabola error $\\lim(1-T)/s^{2}=a_{2}/a_{0}=5/24$ matches $1/K_{a}$.
`
    },
    {
      id: "7-21", difficulty: "warmup", topic: "Error specifications", sec: "7.4",
      prompt: `State everything each specification tells you: stability, system type, test input, and the
steady-state error.

**(a)** $K_{p}=99$

**(b)** $K_{v}=20\\ \\text{s}^{-1}$

**(c)** $K_{a}=50\\ \\text{s}^{-2}$

For (b), also give the error when the input is a ramp of $2$ rad/s. For (c), give it when the
input is $r(t)=t^{2}$ rad.`,
      hint: `Only one type has each constant finite and nonzero.`,
      answer: `All three are stable. **(a)** Type 0, step, $e=\\tfrac{1}{100}$ per unit step. **(b)** Type 1, ramp,
$e=0.05$ per unit of slope; $0.1$ rad at $2$ rad/s. **(c)** Type 2, parabola, $e=0.02$ per unit of
acceleration; $0.04$ rad for $r=t^{2}$.`,
      expert: `
**First glance:** each specification names a constant, and each constant is finite and nonzero for
exactly one type.

**Discard:** asking which input was intended. The constant names it.

**Path:** $1/(1+99)$, $1/20$, $1/50$, then scale by slope or acceleration.

**Check:** $r=t^{2}$ has acceleration 2, so its error is $2/K_{a}$, not $1/K_{a}$.
`,
      solution: `
| Specification | Stable | Type | Test input | Error |
|---|---|---|---|---|
| $K_{p}=99$ | yes | 0 | step | $\\dfrac{1}{1+99}=0.01$ per unit step |
| $K_{v}=20$ | yes | 1 | ramp | $\\dfrac{1}{20}=0.05$ per unit of slope |
| $K_{a}=50$ | yes | 2 | parabola | $\\dfrac{1}{50}=0.02$ per unit of acceleration |

Stability is implied because the constants are only defined as performance measures for stable
loops.

**(b) at 2 rad/s.** $e=\\dfrac{2}{20}=0.1$ rad.

**(c) for $r=t^{2}$.** $t^{2}=2\\cdot\\tfrac12t^{2}$, an acceleration of 2 rad/s²:

$$e=\\frac{2}{50}=0.04\\ \\text{rad}$$

**Check.** Units: $K_{v}$ in s⁻¹ times an error in rad gives rad/s, the slope; $K_{a}$ in s⁻² times
rad gives rad/s², the acceleration.
`
    },
    {
      id: "7-22", difficulty: "core", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{K(s+3)}{(s+5)(s+6)(s+8)}$$

**(a)** Find $K$ so the steady-state error to a step is 2% of the step's size.

**(b)** Find the range of $K$ for stability, and check the design.

**(c)** At that gain the dominant closed-loop poles are near $-8.0\\pm j62.7$. What does that say
about the design?`,
      hint: `2% error means $1/(1+K_{p})=0.02$, so $K_{p}=49$.`,
      answer: `**(a)** $K=3920$. **(b)** Stable for every $K>0$, so the design is stable. **(c)**
$\\zeta\\approx0.127$: about 67% overshoot. The error spec is met at the cost of the transient.`,
      expert: `
**First glance:** type 0, step input, $K_{p}=3K/240=K/80$. The required $K_{p}$ is 49, not 50.

**Discard:** the full Routh table. The closed loop is a cubic, so $a_{2}a_{1}>a_{0}$ decides it.

**Path:** $K/80=49$ gives $K=3920$. Cubic: $19(118+K)>240+3K$ reduces to $16K>-2002$, true for all
positive $K$.

**Check:** a 2% spec through a type 0 loop costs a $K_{p}$ near 50. Large constants come from
large gains, and large gains on a type 0 loop are paid for in damping.
`,
      solution: `
**Part (a).** Type 0, so the specification is on a step.

$$\\frac{1}{1+K_{p}}=0.02\\qquad\\Longrightarrow\\qquad K_{p}=49$$

$$K_{p}=G(0)=\\frac{3K}{5\\cdot6\\cdot8}=\\frac{K}{80}=49\\qquad\\Longrightarrow\\qquad K=3920$$

**Part (b).** Close the loop:

$$(s+5)(s+6)(s+8)+K(s+3)=s^{3}+19s^{2}+(118+K)s+(240+3K)$$

Third-order rule:

$$19(118+K)>240+3K\\qquad\\Longleftrightarrow\\qquad 2242+19K>240+3K\\qquad\\Longleftrightarrow\\qquad 16K>-2002$$

True for every $K>0$, and the other coefficients are positive. **Stable at every positive gain**,
including $3920$.

**Part (c).** $s^{3}+19s^{2}+4038s+12000$ has roots near $-3.01$ and $-8.0\\pm j62.7$. The real
pole sits almost on the zero at $-3$, so the complex pair dominates:

$$\\zeta=\\frac{8.0}{\\sqrt{8.0^{2}+62.7^{2}}}\\approx0.127,\\qquad \\%OS\\approx e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}\\times100\\approx67\\%$$

The step error is 2%, and on the way there the output overshoots by about two thirds of the
step.

**Check.** At $K=3920$, $1/(1+49)=0.02$. A gain this large always drives a type 0 loop toward
light damping, which is why Chapter 9 adds integral action instead.
`
    },
    {
      id: "7-23", difficulty: "core", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{K(s+4)}{s(s+2)(s+8)(s+10)}$$

**(a)** Find $K$ for a unit-ramp error of $0.05$.

**(b)** Find the range of $K$ for stability, and check (a).

**(c)** Can the loop deliver a ramp error of $0.04$? What is the smallest error it can approach?`,
      hint: `$K_{v}=4K/160=K/40$. The closed loop is fourth order; carry $K$ through the full Routh table.`,
      answer: `**(a)** $K=800$. **(b)** $0<K<200+40\\sqrt{241}\\approx821$, so $K=800$ is stable, barely
(dominant poles near $-0.033\\pm j6.92$). **(c)** No: it needs $K=1000$. The error cannot get below
$40/821\\approx0.0487$.`,
      expert: `
**First glance:** type 1, ramp, $K_{v}=K/40$. A fourth-order loop with three poles away from the
origin will have a finite upper gain limit; the question is where.

**Discard:** checking only the single gain $K=800$. The full range answers (b) and (c) at once.

**Path:** Routh with $K$: the $s^{2}$ entry gives $K<2160$, the $s^{1}$ entry gives
$K^{2}-400K-345600<0$, so $K<200+40\\sqrt{241}$.

**Check:** $K=800$ sits 2.5% below the limit, and the dominant pair at $\\zeta\\approx0.005$ shows
it: stable on paper, ringing for minutes in practice.
`,
      solution: `
**Part (a).**

$$K_{v}=\\lim_{s\\to0}sG(s)=\\frac{4K}{2\\cdot8\\cdot10}=\\frac{K}{40}$$

$$\\frac{1}{K_{v}}=0.05\\qquad\\Longrightarrow\\qquad K_{v}=20\\qquad\\Longrightarrow\\qquad K=800$$

**Part (b): close the loop.**

$$s(s+2)(s+8)(s+10)+K(s+4)=s^{4}+20s^{3}+116s^{2}+(160+K)s+4K$$

$$\\begin{array}{c|ccc}
s^{4} & 1 & 116 & 4K\\\\
s^{3} & 20 & 160+K & 0\\\\
s^{2} & \\dfrac{2160-K}{20} & 4K & 0\\\\
s^{1} & \\dfrac{345600+400K-K^{2}}{2160-K} & 0 & 0\\\\
s^{0} & 4K & 0 & 0
\\end{array}$$

The $s^{2}$ entry: $\\dfrac{20\\cdot116-(160+K)}{20}=\\dfrac{2160-K}{20}$.

The $s^{1}$ entry: $\\dfrac{b_{1}(160+K)-20\\cdot4K}{b_{1}}$, which simplifies to the expression in
the table.

Conditions, with $K>0$ from the last row:

$$K<2160,\\qquad K^{2}-400K-345600<0$$

The quadratic is negative between its roots, $200\\pm\\sqrt{385600}=200\\pm40\\sqrt{241}$, so

$$K<200+40\\sqrt{241}\\approx820.97$$

So $0<K<820.97$, and $K=800$ is inside. Numerically the closed-loop poles at $K=800$ are near
$-15.7$, $-4.26$ and $-0.033\\pm j6.92$: stable with $\\zeta\\approx0.005$, a settling time near
$4/0.033\\approx120$ s.

**Part (c).** $e=0.04$ needs $K_{v}=25$, $K=1000$, outside the stable range. The best the loop can
approach is

$$e_{\\min}=\\frac{40}{820.97}\\approx0.0487$$

and only at the edge of instability.

**Check.** At $K=800$ the $s^{1}$ entry is $\\dfrac{345600+320000-640000}{1360}=\\dfrac{25600}{1360}\\approx18.8>0$.
`
    },
    {
      id: "7-24", difficulty: "core", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has

$$G(s)=\\frac{K(s+2)}{s^{2}(s+10)}$$

**(a)** Find $K$ so the steady-state error to the unit parabola $\\tfrac12t^{2}$ is $0.01$.

**(b)** Check stability.

**(c)** At that gain, what is the error for $r(t)=t^{2}$?`,
      hint: `$K_{a}=2K/10$.`,
      answer: `**(a)** $K=500$. **(b)** $s^{3}+10s^{2}+Ks+2K$ is stable for every $K>0$. **(c)** $0.02$.`,
      expert: `
**First glance:** type 2 with a zero at $-2$ to the right of the pole at $-10$. That arrangement
is what lets a type 2 loop be stable at all (7-29).

**Discard:** worrying about an upper gain limit before checking the cubic rule. Here it never
binds.

**Path:** $K_{a}=K/5=100$ gives $K=500$. Cubic: $10K>2K$.

**Check:** $t^{2}$ is twice the unit parabola, so its error is twice $0.01$.
`,
      solution: `
**Part (a).**

$$K_{a}=\\lim_{s\\to0}s^{2}G(s)=\\frac{2K}{10}=\\frac{K}{5}$$

$$\\frac{1}{K_{a}}=0.01\\qquad\\Longrightarrow\\qquad K_{a}=100\\qquad\\Longrightarrow\\qquad K=500$$

**Part (b).** Closed loop:

$$s^{2}(s+10)+K(s+2)=s^{3}+10s^{2}+Ks+2K$$

Third-order rule: $10\\cdot K>2K$, true for every $K>0$. Stable at $K=500$.

**Part (c).** $r=t^{2}$ has $R=2/s^{3}$:

$$e=\\frac{2}{K_{a}}=\\frac{2}{100}=0.02$$

**Check.** At $K=500$ the closed loop is $s^{3}+10s^{2}+500s+1000$, with Routh first column
$1,\\;10,\\;400,\\;1000$: no sign changes.
`
    },
    {
      id: "7-25", difficulty: "core", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has $G(s)=\\dfrac{K}{(s+2)(s+4)}$.

**(a)** Find $K$ for a 1% step error.

**(b)** Find $\\zeta$, $\\%OS$ and $T_{s}$ of the closed loop at that gain.

**(c)** Compare with $K=10$: find the step error, $\\zeta$ and $\\%OS$ there.`,
      hint: `Closed loop $s^{2}+6s+(8+K)$. The real part of the poles does not depend on $K$.`,
      answer: `**(a)** $K=792$. **(b)** $\\zeta\\approx0.106$, $\\%OS\\approx71.5\\%$, $T_{s}=\\tfrac43$ s. **(c)**
$e\\approx0.444$, $\\zeta=0.707$, $\\%OS\\approx4.3\\%$.`,
      expert: `
**First glance:** second order, so stability never limits the gain. The limit is the transient,
and the real part $-3$ is fixed, so only $\\omega_{n}$ and $\\zeta$ move.

**Discard:** Routh. Positive coefficients settle a quadratic.

**Path:** $K/8=99$. Then $2\\zeta\\omega_{n}=6$, $\\omega_{n}^{2}=8+K$.

**Check:** settling time is unchanged at $4/3$ s in both designs, because $\\sigma=3$ either way.
Gain buys accuracy and pays for it entirely in overshoot.
`,
      solution: `
**Part (a).** Type 0. $K_{p}=\\dfrac{K}{8}$.

$$\\frac{1}{1+K_{p}}=0.01\\qquad\\Longrightarrow\\qquad K_{p}=99\\qquad\\Longrightarrow\\qquad K=792$$

**Part (b).** Closed loop $s^{2}+6s+800$:

$$\\omega_{n}=\\sqrt{800}\\approx28.3,\\qquad \\zeta=\\frac{6}{2\\sqrt{800}}=\\frac{3}{\\sqrt{800}}\\approx0.106$$

$$\\%OS=100\\,e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}\\approx71.5\\%,\\qquad T_{s}=\\frac{4}{\\zeta\\omega_{n}}=\\frac43\\ \\text{s}$$

**Part (c).** $K=10$: $K_{p}=1.25$, closed loop $s^{2}+6s+18$.

$$e=\\frac{1}{2.25}\\approx0.444,\\qquad \\zeta=\\frac{6}{2\\sqrt{18}}=\\frac{1}{\\sqrt2}\\approx0.707,\\qquad \\%OS=100e^{-\\pi}\\approx4.3\\%$$

| $K$ | Step error | $\\zeta$ | $\\%OS$ | $T_{s}$ |
|---|---|---|---|---|
| 10 | 44.4% | 0.707 | 4.3% | 1.33 s |
| 792 | 1% | 0.106 | 71.5% | 1.33 s |

**Check.** No gain gives both a small error and a small overshoot here. Proportional gain alone
moves along one line in the $s$-plane, which is why Chapter 9 adds a compensator.
`
    },
    {
      id: "7-26", difficulty: "challenge", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has $G(s)=\\dfrac{K}{s(s+3)(s+6)}$.

**(a)** Find the range of $K$ for stability.

**(b)** The ramp error must not exceed $0.2$ per unit of slope. Find every $K$ that meets the
specification with the loop stable.

**(c)** Can the loop meet a ramp error of $0.1$? What is the smallest ramp error it can approach?

**(d)** At the upper gain limit, at what frequency does the loop oscillate?`,
      hint: `$s^{3}+9s^{2}+18s+K$ and $K_{v}=K/18$.`,
      answer: `**(a)** $0<K<162$. **(b)** $90\\le K<162$. **(c)** No: it needs $K=180$. The error stays above
$\\tfrac19\\approx0.111$. **(d)** $\\omega=\\sqrt{18}\\approx4.24$ rad/s.`,
      expert: `
**First glance:** type 1, so the spec is on $K_{v}$, and the closed loop is a cubic with a
textbook gain limit. Two inequalities, one window.

**Discard:** solving the spec first and checking stability afterwards for one number. Finding both
bounds shows at once which specs are feasible.

**Path:** Routh: $9\\cdot18>K$. Spec: $K/18\\ge5$. Window $[90,162)$. Smallest error
$18/162=1/9$.

**Check:** the window is the figure in the 7.4 guide, drawn to scale.
`,
      solution: `
**Part (a).** Closed loop $s(s+3)(s+6)+K=s^{3}+9s^{2}+18s+K$.

$$\\begin{array}{c|cc}
s^{3} & 1 & 18\\\\
s^{2} & 9 & K\\\\
s^{1} & \\dfrac{162-K}{9} & 0\\\\
s^{0} & K & 0
\\end{array}$$

$$0<K<162$$

**Part (b).**

$$K_{v}=\\frac{K}{3\\cdot6}=\\frac{K}{18},\\qquad \\frac{1}{K_{v}}\\le0.2\\quad\\Longrightarrow\\quad K\\ge90$$

$$\\boxed{\\;90\\le K<162\\;}$$

**Part (c).** $e=0.1$ needs $K_{v}=10$, $K=180>162$: the loop would be unstable. As $K\\to162$,

$$e\\to\\frac{18}{162}=\\frac19\\approx0.111$$

which is the floor for this plant with gain alone.

**Part (d).** At $K=162$ the $s^{1}$ row vanishes and the $s^{2}$ row gives

$$9s^{2}+162=0\\qquad\\Longrightarrow\\qquad \\omega=\\sqrt{18}\\approx4.24\\ \\text{rad/s}$$

**Check.** At $K=90$, $s^{3}+9s^{2}+18s+90$ has first column $1,\\;9,\\;8,\\;90$ and poles near
$-8.15$ and $-0.43\\pm j3.30$: stable, with $\\zeta\\approx0.13$. The window exists; its lower edge
is already lightly damped.
`
    },
    {
      id: "7-27", difficulty: "challenge", topic: "Gain design", sec: "7.4",
      prompt: `A unity feedback loop has $G(s)=\\dfrac{K}{(s+1)(s+2)(s+3)}$ and must have "10% error in the steady
state."

**(a)** Which input does the specification refer to, and what $K$ does it require?

**(b)** Find the stable range of $K$ and the set of gains that meet the specification.

**(c)** At the smallest acceptable gain the dominant closed-loop poles are near $-0.066\\pm j3.20$.
Is this a usable design?`,
      hint: `Type 0. 10% error is $1/(1+K_{p})=0.1$.`,
      answer: `**(a)** A step; $K_{p}\\ge9$, so $K\\ge54$. **(b)** Stable for $-6<K<60$; acceptable for $54\\le K<60$.
**(c)** Stable, but $\\zeta\\approx0.02$ and $T_{s}\\approx60$ s: the window exists and is unusable
in practice.`,
      expert: `
**First glance:** this is 7-04's loop. The gain limit of 60 is already known, and the question is
whether the spec fits under it.

**Discard:** reading 10% as $K_{p}=10$. That gives $K=60$, exactly on the stability boundary.

**Path:** $1/(1+K/6)\\le0.1$ gives $K\\ge54$. Routh gives $K<60$.

**Check:** the narrow window and the near-zero damping at its lower edge say the same thing: this
plant needs more than a gain.
`,
      solution: `
**Part (a).** No integrator: type 0. The only finite, nonzero error of a type 0 loop is the step
error, so the specification means

$$\\frac{1}{1+K_{p}}\\le0.1\\qquad\\Longrightarrow\\qquad K_{p}\\ge9$$

$$K_{p}=\\frac{K}{1\\cdot2\\cdot3}=\\frac K6\\ge9\\qquad\\Longrightarrow\\qquad K\\ge54$$

**Part (b).** Closed loop $s^{3}+6s^{2}+11s+(6+K)$. Third-order rule:

$$6\\cdot11>6+K\\quad\\Longrightarrow\\quad K<60,\\qquad 6+K>0\\quad\\Longrightarrow\\quad K>-6$$

$$\\boxed{\\;54\\le K<60\\;}$$

**Part (c).** At $K=54$: closed loop $s^{3}+6s^{2}+11s+60$, poles near $-5.87$ and
$-0.066\\pm j3.20$.

$$\\zeta\\approx\\frac{0.066}{3.20}\\approx0.02,\\qquad T_{s}\\approx\\frac{4}{0.066}\\approx60\\ \\text{s},\\qquad \\%OS\\approx94\\%$$

It is stable and meets the spec, and it rings for a minute after every command with nearly full
overshoot. A spec that lands this close to the stability boundary is a signal to change the
controller rather than the gain.

**Check.** At $K=54$, $e=1/(1+9)=0.1$. The Routh $s^{1}$ entry is $(66-60)/6=1>0$: stable by a
margin of 6 in the constant term.
`
    },
    {
      id: "7-28", difficulty: "challenge", topic: "Gain design", sec: "7.4",
      prompt: `An antenna tracks a low-orbit satellite that crosses the sky at $0.02$ rad/s. The pointing loop is
unity feedback with

$$G(s)=\\frac{K}{s(s+10)(s+20)}$$

with angles in radians. The pointing error in steady tracking must not exceed $1$ mrad.

**(a)** What $K_{v}$ is required?

**(b)** Find the range of $K$ that meets the requirement with the loop stable.

**(c)** A faster satellite crosses at $0.04$ rad/s. Can the same loop track it to $1$ mrad?`,
      hint: `Error is slope over $K_{v}$. Keep units: rad/s divided by s⁻¹ gives rad.`,
      answer: `**(a)** $K_{v}\\ge20\\ \\text{s}^{-1}$. **(b)** $4000\\le K<6000$. **(c)** No: it needs $K_{v}=40$,
$K=8000$, beyond the limit of $6000$.`,
      expert: `
**First glance:** constant angular rate is a ramp; the motor-driven antenna supplies the one
integrator. $K_{v}$ is the spec, with units.

**Discard:** converting to a unit ramp first. $e=\\text{slope}/K_{v}$ handles the amplitude
directly.

**Path:** $0.02/K_{v}\\le0.001$, so $K_{v}\\ge20$, $K\\ge4000$. Routh: $30\\cdot200>K$, so $K<6000$.

**Check:** doubling the target rate doubles the required $K_{v}$, and the stability limit does not
move.
`,
      solution: `
**Part (a).**

$$e=\\frac{0.02\\ \\text{rad/s}}{K_{v}}\\le0.001\\ \\text{rad}\\qquad\\Longrightarrow\\qquad K_{v}\\ge20\\ \\text{s}^{-1}$$

**Part (b).**

$$K_{v}=\\frac{K}{10\\cdot20}=\\frac{K}{200}\\ge20\\qquad\\Longrightarrow\\qquad K\\ge4000$$

Closed loop $s^{3}+30s^{2}+200s+K$. Third-order rule: $30\\cdot200=6000>K$.

$$\\boxed{\\;4000\\le K<6000\\;}$$

**Part (c).** $0.04/K_{v}\\le0.001$ needs $K_{v}\\ge40$, $K\\ge8000$, outside the stable range. The
best this loop can do at $0.04$ rad/s is approach $0.04\\cdot200/6000\\approx1.33$ mrad.

**Check.** At $K=4000$ the closed-loop poles are near $-28.0$ and $-1.02\\pm j11.9$, with
$\\zeta\\approx0.085$ and $T_{s}\\approx3.9$ s. Stable, meets the spec, and rings: the same pattern
as 7-26 and 7-27.
`
    },
    {
      id: "7-29", difficulty: "challenge", topic: "Gain design", sec: "7.4",
      prompt: `A missile-tracking loop needs zero error to a constant-velocity target, so it must be type 2.

**(a)** Show that $G(s)=\\dfrac{K}{s^{2}(s+5)}$ cannot be stabilized by any gain.

**(b)** A zero is added: $G(s)=\\dfrac{K(s+z)}{s^{2}(s+5)}$ with $z>0$. For which $z$ can the loop be
stable, and over what gains?

**(c)** With $z=1$, find $K$ so that a target with constant angular acceleration $2$ rad/s² is
tracked with error $0.02$ rad.`,
      hint: `(a) Look at the coefficients before building anything. (b) Third-order rule with $K$ and $z$.`,
      answer: `**(a)** $s^{3}+5s^{2}+K$ has no $s^{1}$ term: never stable. **(b)** Stable for all $K>0$ exactly
when $0<z<5$. **(c)** $K_{a}=Kz/5=100$, so $K=500$.`,
      expert: `
**First glance:** two integrators and one more pole: the closed-loop cubic is missing its $s$
term. That is decided by the coefficient pre-check from Chapter 6, before any table.

**Discard:** searching for a gain in (a). A missing power rules out stability for every $K$.

**Path:** with the zero, $s^{3}+5s^{2}+Ks+Kz$; rule: $5K>Kz$, so $z<5$. Then
$e=2/K_{a}$ with $K_{a}=K/5$.

**Check:** the zero must sit between the origin and the pole at $-5$; placed beyond the pole it
fails for every gain, as badly as no zero at all.
`,
      solution: `
**Part (a).** Closed loop $s^{2}(s+5)+K=s^{3}+5s^{2}+0\\cdot s+K$. A missing power of $s$ means at
least one root is not in the left half-plane. No gain helps: **never stable**, so no type 2 error
specification can be met with this structure.

**Part (b).** Closed loop $s^{3}+5s^{2}+Ks+Kz$.

$$\\begin{array}{c|cc}
s^{3} & 1 & K\\\\
s^{2} & 5 & Kz\\\\
s^{1} & \\dfrac{K(5-z)}{5} & 0\\\\
s^{0} & Kz & 0
\\end{array}$$

With $K>0$ and $z>0$, every entry is positive exactly when $z<5$:

$$\\boxed{\\;0<z<5\\ \\text{gives stability for every }K>0\\;}$$

**Part (c).** With $z=1$:

$$K_{a}=\\lim_{s\\to0}s^{2}G(s)=\\frac{K\\cdot1}{5}=\\frac K5$$

Constant acceleration 2 rad/s² from rest is $r=t^{2}$, $R=2/s^{3}$:

$$e=\\frac{2}{K_{a}}=0.02\\qquad\\Longrightarrow\\qquad K_{a}=100\\qquad\\Longrightarrow\\qquad K=500$$

**Check.** At $K=500$, $z=1$: $s^{3}+5s^{2}+500s+500$, first column $1,\\;5,\\;400,\\;500$, stable.
7-24 was the same structure with $z=2$ and a pole at $-10$, and it was stable for the same reason.
`
    },
    {
      id: "7-30", difficulty: "challenge", topic: "Gain design", sec: "7.4",
      prompt: `A plant $G_{p}(s)=\\dfrac{6}{(s+1)(s+3)}$ is controlled in a unity loop.

**(a)** With a proportional controller of gain 1, find the step error.

**(b)** The controller is changed to $G_{c}(s)=\\dfrac{s+a}{s}$, with $a>0$. Find the new type, the
step error, and $K_{v}$ in terms of $a$.

**(c)** Find the range of $a$ for stability.

**(d)** Can this controller deliver a unit-ramp error of $0.05$? What is the smallest ramp error it
can approach?`,
      hint: `Forward path $G_{c}G_{p}=\\dfrac{6(s+a)}{s(s+1)(s+3)}$.`,
      answer: `**(a)** $\\tfrac13$. **(b)** Type 1, step error $0$, $K_{v}=2a$. **(c)** $0<a<6$. **(d)** No: it needs
$a=10$. The ramp error stays above $\\tfrac{1}{12}\\approx0.083$.`,
      expert: `
**First glance:** the controller contributes the $1/s$ the plant lacks. Type goes from 0 to 1, and
the controller's zero sets $K_{v}$.

**Discard:** treating $a$ as free. It appears in the closed-loop constant term, so the cubic rule
caps it.

**Path:** $K_{v}=6a/3=2a$. Closed loop $s^{3}+4s^{2}+9s+6a$: $36>6a$.

**Check:** at $a=3$ the zero cancels the pole at $-3$, leaving $6/[s(s+1)]$ with $K_{v}=6$, which
is $2a$.
`,
      solution: `
**Part (a).** $G=G_{p}$, type 0, $K_{p}=\\dfrac{6}{3}=2$. Closed loop $s^{2}+4s+9$, stable.

$$e_{\\text{step}}=\\frac{1}{1+2}=\\frac13$$

**Part (b).**

$$G(s)=\\frac{6(s+a)}{s(s+1)(s+3)}$$

One pole at the origin: **type 1**. Step error $0$.

$$K_{v}=\\frac{6a}{1\\cdot3}=2a$$

**Part (c).** Closed loop:

$$s(s+1)(s+3)+6(s+a)=s^{3}+4s^{2}+3s+6s+6a=s^{3}+4s^{2}+9s+6a$$

$$4\\cdot9>6a\\qquad\\Longrightarrow\\qquad a<6,\\qquad 6a>0\\qquad\\Longrightarrow\\qquad a>0$$

**Part (d).** $e=0.05$ needs $K_{v}=20$, $a=10$: unstable. As $a\\to6$, $K_{v}\\to12$ and

$$e_{\\text{ramp}}\\to\\frac{1}{12}\\approx0.083$$

**Check.** At $a=3$, $G=\\dfrac{6}{s(s+1)}$ after cancellation, closed loop $s^{2}+s+6$, stable,
$K_{v}=6=2\\cdot3$. The integrator removed the step error that proportional control could only
shrink, and the price is a ramp error floor that the controller's zero cannot push below $1/12$.
`
    },
  ]
});
