/* ===========================================================================
   NEXUS - Chapter 9: Design via Root Locus
   Nise, Control Systems Engineering, 7e, sections 9.1-9.4.
   Every LaTeX backslash inside these template literals is doubled.
   All plants, numbers and figures are original; every value was computed
   (root finding on the zeta line, residues, step simulation), not read off.
   =========================================================================== */
registerChapter({
  id: 9,
  title: "Design via Root Locus",
  sections: "9.1–9.4",
  brief: `Gain moves the closed-loop poles along a fixed path. When the pole location you need is not on
that path, you change the path by adding poles and zeros in the forward loop. Every design in this
chapter reduces to one measurement: the angle the loop is missing at the design point. A lead or PD
compensator supplies positive angle and speeds the response; a lag or PI compensator supplies almost
no angle and multiplies the static error constant. Used together they meet a transient specification
and an error specification at once, which gain alone cannot do. The last step is always the same as in
Chapter 8: find every closed-loop pole and check whether the second-order prediction holds.`,

  sectionList: [
    { id: "9.1", title: "Introduction" },
    { id: "9.2", title: "Improving Steady-State Error via Cascade Compensation" },
    { id: "9.3", title: "Improving Transient Response via Cascade Compensation" },
    { id: "9.4", title: "Improving Steady-State Error and Transient Response" },
  ],

  guide: [
    {
      title: "What this chapter is for",
      sec: "9.1",
      example: "9-01",
      body: `
Chapter 8 ended on three things gain adjustment cannot do: reach a pole location that is off the
locus, meet a transient specification and an error specification at the same time, and hold a
transient specification above the gain where the locus goes unstable. Chapter 9 fixes all three the
same way. You add poles and zeros to the open loop until the locus passes where you need it.

| Section | What it adds |
|---|---|
| 9.1 | Why gain is not enough, where compensators go, and the angle a compensator must supply |
| 9.2 | PI and lag: raise $K_{p}$ or $K_{v}$ while leaving the transient nearly unchanged |
| 9.3 | PD and lead: move the dominant poles to a faster point the locus did not reach |
| 9.4 | PID and lag-lead: both at once, plus the notch filter for lightly damped plants |

### The running example

One plant carries through every section of this reading:

$$G(s)=\\frac{K}{s(s+3)(s+8)}$$

with unity feedback. It is Type 1, so it tracks a step with zero error and a ramp with finite error.
At $15\\%$ overshoot, gain alone gives $T_{s}=3.62$ s and $K_{v}=1.67$. Section 9.2 multiplies $K_{v}$
by ten, 9.3 halves $T_{s}$, and 9.4 does both. Every number quoted for it was computed: closed-loop
poles by root finding, overshoot and settling time by simulating the step response.

### What it connects to

The design point comes from Chapter 4 ($\\theta=\\cos^{-1}\\zeta$, $\\sigma=4/T_{s}$). The angle and
magnitude criteria are Chapter 8's. The error constants are Chapter 7's. Chapter 11 redoes the same
lag and lead designs from the frequency response, which is where the names *lag* and *lead* come from.
`
    },
    {
      title: "9.1: When gain is not enough",
      sec: "9.1",
      example: "9-01",
      body: `
Plot the running example's locus and draw the $15\\%$ line, $\\zeta=0.517$, at $\\theta=58.87^\\circ$
from the negative real axis.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 419" class="nx-fig">
  <defs><marker id="nx9a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 207.4 L482.0 207.4" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9a)"/>
  <path d="M439.6 385.1 L439.6 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9a)"/>
  <text x="476.0" y="225.4" font-size="13">&#963;</text>
  <text x="445.6" y="30.0" font-size="13">j&#969;</text>
  <path d="M130.6 204.4 L130.6 210.4" stroke="currentColor" stroke-width="1"/>
  <text x="130.6" y="222.4" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M207.8 204.4 L207.8 210.4" stroke="currentColor" stroke-width="1"/>
  <text x="207.8" y="222.4" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M285.1 204.4 L285.1 210.4" stroke="currentColor" stroke-width="1"/>
  <text x="285.1" y="222.4" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M362.4 204.4 L362.4 210.4" stroke="currentColor" stroke-width="1"/>
  <text x="362.4" y="222.4" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M436.6 362.0 L442.6 362.0" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="366.0" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M436.6 284.7 L442.6 284.7" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="288.7" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M436.6 130.2 L442.6 130.2" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="134.2" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M436.6 52.9 L442.6 52.9" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="56.9" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M439.6 207.4 L438.4 207.4 L437.2 207.4 L436.0 207.4 L434.8 207.4 L433.6 207.4 L432.4 207.4 L431.2 207.4 L430.0 207.4 L428.7 207.4 L427.5 207.4 L426.3 207.4 L425.1 207.4 L423.9 207.4 L422.6 207.4 L421.4 207.4 L420.1 207.4 L418.9 207.4 L417.6 207.4 L416.4 207.4 L415.2 207.4 L413.9 207.4 L412.6 207.4 L411.4 207.4 L410.0 207.4 L408.7 207.4 L407.5 207.4 L406.1 207.4 L404.9 207.4 L403.5 207.4 L402.3 207.4 L400.9 207.4 L399.4 207.4 L398.0 207.4 L396.4 207.4 L395.1 207.4 L393.5 207.4 L391.0 207.4 L388.1 205.9 L388.2 203.8 L388.2 202.6 L388.2 200.8 L388.3 199.3 L388.3 198.1 L388.4 196.5 L388.4 195.1 L388.5 193.8 L388.5 192.6 L388.6 191.2 L388.7 189.8 L388.8 188.6 L388.9 187.4 L389.0 186.3 L389.1 184.9 L389.2 183.6 L389.3 182.3 L389.4 181.1 L389.5 179.9 L389.6 178.8 L389.8 177.7 L389.9 176.6 L390.0 175.3 L390.2 174.1 L390.3 172.8 L390.5 171.6 L390.6 170.5 L390.8 169.3 L390.9 168.1 L391.1 167.0 L391.3 165.9 L391.4 164.8 L391.6 163.7 L391.8 162.6 L392.0 161.5 L392.1 160.4 L392.3 159.3 L392.5 158.2 L392.7 157.2 L392.9 156.1 L393.1 155.1 L393.3 154.0 L393.5 153.0 L393.7 151.9 L393.9 150.9 L394.1 149.8 L394.3 148.8 L394.5 147.8 L394.7 146.7 L394.9 145.7 L395.1 144.6 L395.4 143.6 L395.6 142.6 L395.8 141.5 L396.1 140.5 L396.3 139.5 L396.5 138.4 L396.8 137.4 L397.0 136.3 L397.3 135.3 L397.5 134.2 L397.8 133.2 L398.1 132.1 L398.3 131.1 L398.6 130.0 L398.9 129.0 L399.1 127.9 L399.4 126.9 L399.7 125.8 L400.0 124.7 L400.3 123.7 L400.6 122.6 L400.9 121.5 L401.2 120.4 L401.5 119.4 L401.8 118.3 L402.1 117.2 L402.4 116.1 L402.7 115.0 L403.1 113.9 L403.4 112.8 L403.7 111.9 L404.0 110.9 L404.2 110.0 L404.5 109.1 L404.8 108.1 L405.1 107.2 L405.4 106.2 L405.7 105.3 L406.0 104.3 L406.3 103.4 L406.6 102.4 L406.9 101.5 L407.2 100.5 L407.6 99.6 L407.9 98.6 L408.2 97.6 L408.5 96.6 L408.9 95.7 L409.2 94.7 L409.5 93.7 L409.9 92.7 L410.2 91.7 L410.5 90.7 L410.9 89.7 L411.2 88.7 L411.6 87.7 L412.0 86.7 L412.3 85.7 L412.7 84.6 L413.0 83.6 L413.4 82.6 L413.8 81.5 L414.2 80.5 L414.5 79.5 L414.9 78.4 L415.3 77.4 L415.7 76.3 L416.1 75.2 L416.5 74.2 L416.9 73.1 L417.3 72.0 L417.7 71.0 L418.1 69.9 L418.5 69.0 L418.8 68.1 L419.1 67.3 L419.5 66.4 L419.8 65.5 L420.2 64.6 L420.5 63.7 L420.8 62.8 L421.2 62.0 L421.6 61.1 L421.9 60.2 L422.3 59.3 L422.6 58.4 L423.0 57.4 L423.4 56.5 L423.7 55.6 L424.1 54.7 L424.5 53.8 L424.8 52.9 L425.2 51.9 L425.6 51.0 L426.0 50.1 L426.4 49.1 L426.7 48.2 L427.1 47.3 L427.5 46.3 L427.9 45.4 L428.3 44.4 L428.7 43.4 L429.1 42.5 L429.5 41.5 L429.9 40.6 L430.3 39.6 L430.8 38.6 L431.2 37.6 L431.6 36.6 L432.0 35.7 L432.4 34.7 L432.9 33.7 L433.3 32.7 L433.7 31.7 L434.1 30.7 L434.6 29.7 L435.0 28.7 L435.5 27.7 L435.9 26.6 L436.4 25.6 L436.8 24.6 L437.3 23.6 L437.7 22.5 L438.2 22.0 L438.6 22.0 L439.1 22.0 L439.6 22.0 L440.0 22.0 L440.5 22.0 L441.0 22.0 L441.5 22.0 L441.9 22.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(400.6 122.6) rotate(-74.6)"/>
  <path d="M323.7 207.4 L324.9 207.4 L326.1 207.4 L327.4 207.4 L328.6 207.4 L329.8 207.4 L331.0 207.4 L332.2 207.4 L333.4 207.4 L334.6 207.4 L335.9 207.4 L337.1 207.4 L338.3 207.4 L339.5 207.4 L340.8 207.4 L342.0 207.4 L343.3 207.4 L344.5 207.4 L345.7 207.4 L346.9 207.4 L348.1 207.4 L349.4 207.4 L350.7 207.4 L351.9 207.4 L353.3 207.4 L354.5 207.4 L355.8 207.4 L357.1 207.4 L358.3 207.4 L359.6 207.4 L360.8 207.4 L362.1 207.4 L363.5 207.4 L364.7 207.4 L366.1 207.4 L367.3 207.4 L368.6 207.4 L370.0 207.4 L371.2 207.4 L372.5 207.4 L373.9 207.4 L375.5 207.4 L376.9 207.4 L378.4 207.4 L380.3 207.4 L381.8 207.4 L383.8 207.4 L385.3 207.4 L388.1 209.0 L388.2 211.0 L388.2 212.3 L388.2 214.1 L388.3 215.6 L388.3 216.8 L388.4 218.4 L388.4 219.8 L388.5 221.1 L388.5 222.2 L388.6 223.7 L388.7 225.0 L388.8 226.3 L388.9 227.5 L389.0 228.6 L389.1 230.0 L389.2 231.3 L389.3 232.5 L389.4 233.8 L389.5 234.9 L389.6 236.1 L389.8 237.2 L389.9 238.3 L390.0 239.5 L390.2 240.8 L390.3 242.0 L390.5 243.2 L390.6 244.4 L390.8 245.6 L390.9 246.7 L391.1 247.9 L391.3 249.0 L391.4 250.1 L391.6 251.2 L391.8 252.3 L392.0 253.4 L392.1 254.5 L392.3 255.6 L392.5 256.6 L392.7 257.7 L392.9 258.8 L393.1 259.8 L393.3 260.9 L393.5 261.9 L393.7 263.0 L393.9 264.0 L394.1 265.0 L394.3 266.1 L394.5 267.1 L394.7 268.2 L394.9 269.2 L395.1 270.2 L395.4 271.3 L395.6 272.3 L395.8 273.3 L396.1 274.4 L396.3 275.4 L396.5 276.5 L396.8 277.5 L397.0 278.5 L397.3 279.6 L397.5 280.6 L397.8 281.7 L398.1 282.7 L398.3 283.8 L398.6 284.8 L398.9 285.9 L399.1 286.9 L399.4 288.0 L399.7 289.1 L400.0 290.1 L400.3 291.2 L400.6 292.3 L400.9 293.4 L401.2 294.4 L401.5 295.5 L401.8 296.6 L402.1 297.7 L402.4 298.8 L402.7 299.9 L403.1 301.0 L403.4 302.1 L403.7 303.0 L404.0 303.9 L404.2 304.9 L404.5 305.8 L404.8 306.7 L405.1 307.7 L405.4 308.6 L405.7 309.6 L406.0 310.5 L406.3 311.5 L406.6 312.4 L406.9 313.4 L407.2 314.4 L407.6 315.3 L407.9 316.3 L408.2 317.3 L408.5 318.2 L408.9 319.2 L409.2 320.2 L409.5 321.2 L409.9 322.2 L410.2 323.2 L410.5 324.2 L410.9 325.2 L411.2 326.2 L411.6 327.2 L412.0 328.2 L412.3 329.2 L412.7 330.2 L413.0 331.3 L413.4 332.3 L413.8 333.3 L414.2 334.4 L414.5 335.4 L414.9 336.5 L415.3 337.5 L415.7 338.6 L416.1 339.6 L416.5 340.7 L416.9 341.8 L417.3 342.8 L417.7 343.9 L418.1 345.0 L418.5 345.9 L418.8 346.7 L419.1 347.6 L419.5 348.5 L419.8 349.4 L420.2 350.2 L420.5 351.1 L420.8 352.0 L421.2 352.9 L421.6 353.8 L421.9 354.7 L422.3 355.6 L422.6 356.5 L423.0 357.4 L423.4 358.3 L423.7 359.2 L424.1 360.2 L424.5 361.1 L424.8 362.0 L425.2 362.9 L425.6 363.9 L426.0 364.8 L426.4 365.7 L426.7 366.7 L427.1 367.6 L427.5 368.6 L427.9 369.5 L428.3 370.5 L428.7 371.4 L429.1 372.4 L429.5 373.4 L429.9 374.3 L430.3 375.3 L430.8 376.3 L431.2 377.2 L431.6 378.2 L432.0 379.2 L432.4 380.2 L432.9 381.2 L433.3 382.2 L433.7 383.2 L434.1 384.2 L434.6 385.1 L435.0 385.1 L435.5 385.1 L435.9 385.1 L436.4 385.1 L436.8 385.1 L437.3 385.1 L437.7 385.1 L438.2 385.1" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(398.1 282.7) rotate(75.9)"/>
  <path d="M130.6 207.4 L129.4 207.4 L128.2 207.4 L127.0 207.4 L125.8 207.4 L124.6 207.4 L123.3 207.4 L122.1 207.4 L120.9 207.4 L119.7 207.4 L118.5 207.4 L117.2 207.4 L116.0 207.4 L114.8 207.4 L113.6 207.4 L112.3 207.4 L111.1 207.4 L109.9 207.4 L108.7 207.4 L107.5 207.4 L106.3 207.4 L105.1 207.4 L103.8 207.4 L102.6 207.4 L101.4 207.4 L100.1 207.4 L98.9 207.4 L97.7 207.4 L96.4 207.4 L95.1 207.4 L93.9 207.4 L92.6 207.4 L91.4 207.4 L90.2 207.4 L88.9 207.4 L87.6 207.4 L86.4 207.4 L85.1 207.4 L83.9 207.4 L82.6 207.4 L81.3 207.4 L80.1 207.4 L78.9 207.4 L77.6 207.4 L76.3 207.4 L74.9 207.4 L73.7 207.4 L72.5 207.4 L71.2 207.4 L69.9 207.4 L68.6 207.4 L67.3 207.4 L65.9 207.4 L64.7 207.4 L63.5 207.4 L62.2 207.4 L61.0 207.4 L59.7 207.4 L58.4 207.4 L57.1 207.4 L55.7 207.4 L54.3 207.4 L53.1 207.4 L51.9 207.4 L50.7 207.4 L49.4 207.4 L48.2 207.4 L46.9 207.4 L45.6 207.4 L44.3 207.4 L43.0 207.4 L41.6 207.4 L40.3 207.4 L38.9 207.4 L37.5 207.4 L36.1 207.4 L34.9 207.4 L34.0 207.4 L34.0 207.4 L34.0 207.4 L34.0 207.4 L34.0 207.4 L34.0 207.4 L34.0 207.4" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(76.3 207.4) rotate(180.0)"/>
  <path d="M433.6 201.4 L445.6 213.4 M445.6 201.4 L433.6 213.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M317.7 201.4 L329.7 213.4 M329.7 201.4 L317.7 213.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M124.6 201.4 L136.6 213.4 M136.6 201.4 L124.6 213.4" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M439.6 207.4 L327.7 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="392.9" y="132.7" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="404.9" y="150.7" font-size="13" text-anchor="start">A</text>
  <circle cx="354.2" cy="66.0" r="4.5" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="363.2" y="70.0" font-size="13" text-anchor="start">B</text>
  <text x="261.9" y="49.0" font-size="11" text-anchor="end">ζ = 0.517 (15% OS)</text>
</svg>
<figcaption>K/[s(s+3)(s+8)]. Gain alone reaches A (K = 40.2, Ts = 3.62 s). B has the same damping ratio and half the settling time, and no gain puts a pole there.</figcaption>
</figure>

The locus crosses the line once, at $A=-1.105\\pm j1.830$ with $K=40.2$. That is the only $15\\%$
design gain can give:

$$T_{s}=\\frac{4}{1.105}=3.62\\text{ s},\\qquad K_{v}=\\frac{40.2}{3\\cdot8}=1.67$$

Two kinds of improvement are out of reach.

- **A faster response at the same overshoot.** Point $B=-2.210\\pm j3.660$ sits on the same $\\zeta$ line
  at twice the distance, so it has the same $\\%OS$ and half the settling time. The locus does not go
  through $B$, so no value of $K$ puts a pole there.
- **Less steady-state error at the same transient.** Raising $K$ raises $K_{v}$, but it also moves the
  poles off $A$ and up toward the $j\\omega$ axis. Error and transient are tied together through the
  one free parameter.

The remedy for both is to add poles and zeros to the loop. They are added at the low-power end, ahead
of the plant, so the plant itself (motor, valve, airframe) stays as it was chosen. The cost is order:
every compensator adds closed-loop poles whose positions are only known once the design is finished,
so every design ends with a check of those extra poles, by residues or by simulation.

### Derivative speeds up, integral corrects error

The two basic additions have a direct time-domain reading.

- A **derivative** of the error is large while the error is changing fast, at the start of a step, and
  vanishes as the error settles. It pushes the plant hard early, then gets out of the way. In the
  $s$-plane it is a zero, and a zero adds positive angle that bends the locus to the left.
- An **integral** of the error keeps growing as long as any error remains, so it drives a constant
  error to zero. In the $s$-plane it is a pole at the origin, which raises the system type.
`
    },
    {
      title: "9.1: Where the compensator goes, and what it is called",
      sec: "9.1",
      example: "9-03",
      body: `
<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 290" class="nx-fig">
  <defs><marker id="nx9i" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="8" y="48" text-anchor="start" font-size="13">R(s)</text>
  <path d="M10 56 L66 56" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <circle cx="80" cy="56" r="14" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="60" y="48" text-anchor="middle" font-size="13">+</text><text x="71" y="80" text-anchor="middle" font-size="13">−</text>
  <path d="M94 56 L140 56" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <rect x="140" y="36.0" width="92" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="186.0" y="61" text-anchor="middle" font-size="14">G<tspan font-size="10" dy="4">c</tspan><tspan dy="-4">(s)</tspan></text>
  <path d="M232 56 L282 56" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <rect x="282" y="36.0" width="92" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="328.0" y="61" text-anchor="middle" font-size="14">G(s)</text>
  <path d="M374 56 L470 56" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <text x="474" y="61" text-anchor="start" font-size="13">C(s)</text>
  <circle cx="430" cy="56" r="3.5" fill="currentColor" stroke="none"/>
  <path d="M430 56 L430 100 L80 100 L80 71" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <text x="186" y="28" text-anchor="middle" font-size="11">compensator</text>
  <text x="328" y="28" text-anchor="middle" font-size="11">plant</text>
  <text x="8" y="22" text-anchor="start" font-size="12">(a) cascade</text>
  <text x="8" y="182" text-anchor="start" font-size="13">R(s)</text>
  <path d="M10 190 L66 190" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <circle cx="80" cy="190" r="14" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="60" y="182" text-anchor="middle" font-size="13">+</text><text x="71" y="214" text-anchor="middle" font-size="13">−</text>
  <path d="M94 190 L160 190" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <rect x="160" y="170.0" width="92" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="206.0" y="195" text-anchor="middle" font-size="14">K</text>
  <path d="M252 190 L300 190" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <rect x="300" y="170.0" width="92" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="346.0" y="195" text-anchor="middle" font-size="14">G(s)</text>
  <path d="M392 190 L470 190" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <text x="474" y="195" text-anchor="start" font-size="13">C(s)</text>
  <circle cx="430" cy="190" r="3.5" fill="currentColor" stroke="none"/>
  <path d="M430 190 L430 244 L328 244" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <rect x="236" y="224.0" width="92" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="282.0" y="249" text-anchor="middle" font-size="14">H<tspan font-size="10" dy="4">c</tspan><tspan dy="-4">(s)</tspan></text>
  <path d="M236 244 L80 244 L80 205" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9i)"/>
  <text x="282" y="280" text-anchor="middle" font-size="11">feedback compensator</text>
  <text x="8" y="144" text-anchor="start" font-size="12">(b) feedback</text>
</svg>
<figcaption>Two places to put a compensator. Both change the open-loop poles and zeros, which is what moves the locus.</figcaption>
</figure>

**Cascade compensation** puts $G_{c}(s)$ in the forward path, in series with the plant. **Feedback
compensation** puts $H_{c}(s)$ in the feedback path, as a rate sensor or tachometer does. Both change
the open-loop poles and zeros. Sections 9.2 to 9.4 are all cascade.

### Ideal and passive compensators

A compensator built from a pure integrator ($1/s$) or a pure differentiator ($s$) is called **ideal**.
Pure integration and differentiation need active electronics (op-amps and their supplies). Moving the
integrator's pole slightly off the origin, or giving the differentiator's zero a companion pole, lets
the same idea be built from resistors and capacitors.

| Purpose | Ideal (active) | Passive approximation |
|---|---|---|
| Steady-state error | PI: $K\\dfrac{s+z_{c}}{s}$ | Lag: $K\\dfrac{s+z_{c}}{s+p_{c}}$, $\\ z_{c}>p_{c}$ |
| Transient response | PD: $K(s+z_{c})$ | Lead: $K\\dfrac{s+z_{c}}{s+p_{c}}$, $\\ p_{c}>z_{c}$ |
| Both | PID: $K\\dfrac{(s+z_{1})(s+z_{2})}{s}$ | Lag-lead |

$z_{c}$ and $p_{c}$ are positive numbers; the zero sits at $-z_{c}$ and the pole at $-p_{c}$.

The names PI, PD and PID describe the signal the controller sends: proportional to the error, plus its
integral, plus its derivative. The names lag and lead describe the phase of the network's frequency
response, which Chapter 11 develops. In the $s$-plane the distinction is which of the pair is closer to
the origin: **lag has the pole closer, lead has the zero closer.**

The ideal versions give the stronger result: PI drives an error to exactly zero, where lag only reduces
it. The passive versions cost less, need no power supply, and (for lead) do not amplify high-frequency
noise without bound.
`
    },
    {
      title: "9.1: The angle budget",
      sec: "9.1",
      example: "9-02",
      body: `
A point is on the root locus when the open-loop angle there is an odd multiple of $180^\\circ$. If a
design point misses, the shortfall is exactly what a compensator has to supply. For the running
example at $B=-2.210+j3.660$:

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 291" class="nx-fig">
  <defs><marker id="nx9b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 218.2 L482.0 218.2" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9b)"/>
  <path d="M426.3 256.5 L426.3 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9b)"/>
  <text x="476.0" y="236.2" font-size="13">&#963;</text>
  <text x="432.3" y="30.0" font-size="13">j&#969;</text>
  <path d="M85.2 215.2 L85.2 221.2" stroke="currentColor" stroke-width="1"/>
  <text x="85.2" y="233.2" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M170.5 215.2 L170.5 221.2" stroke="currentColor" stroke-width="1"/>
  <text x="170.5" y="233.2" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M255.7 215.2 L255.7 221.2" stroke="currentColor" stroke-width="1"/>
  <text x="255.7" y="233.2" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M298.4 215.2 L298.4 221.2" stroke="currentColor" stroke-width="1"/>
  <text x="298.4" y="233.2" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M341.0 215.2 L341.0 221.2" stroke="currentColor" stroke-width="1"/>
  <text x="341.0" y="233.2" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M423.3 132.9 L429.3 132.9" stroke="currentColor" stroke-width="1"/>
  <text x="420.3" y="136.9" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M423.3 47.6 L429.3 47.6" stroke="currentColor" stroke-width="1"/>
  <text x="420.3" y="51.6" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M420.3 212.2 L432.3 224.2 M432.3 212.2 L420.3 224.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M426.3 218.2 L332.0 62.1" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx9b)"/>
  <path d="M292.4 212.2 L304.4 224.2 M304.4 212.2 L292.4 224.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M298.4 218.2 L332.0 62.1" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx9b)"/>
  <path d="M79.2 212.2 L91.2 224.2 M91.2 212.2 L79.2 224.2" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M85.2 218.2 L332.0 62.1" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#nx9b)"/>
  <circle cx="332.0" cy="62.1" r="4.5" fill="currentColor" stroke="none"/>
  <text x="322.0" y="54.1" font-size="12" text-anchor="end">B = −2.21 + j3.66</text>
  <path d="M448.3 218.2 L448.3 217.0 L448.2 215.8 L448.0 214.6 L447.8 213.4 L447.5 212.3 L447.1 211.1 L446.7 210.0 L446.3 208.9 L445.7 207.8 L445.1 206.8 L444.5 205.8 L443.8 204.8 L443.1 203.9 L442.3 203.0 L441.4 202.2 L440.5 201.4 L439.6 200.6 L438.6 199.9 L437.6 199.3 L436.6 198.7 L435.5 198.2 L434.4 197.7 L433.3 197.3 L432.2 196.9 L431.0 196.7 L429.8 196.4 L428.7 196.3 L427.5 196.2 L426.3 196.2 L425.1 196.2 L423.9 196.3 L422.7 196.4 L421.5 196.7 L420.4 197.0 L419.2 197.3 L418.1 197.7 L417.0 198.2 L416.0 198.7 L414.9 199.3" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M320.4 218.2 L320.4 217.4 L320.3 216.6 L320.3 215.9 L320.2 215.1 L320.0 214.3 L319.9 213.6 L319.7 212.8 L319.5 212.1 L319.3 211.4 L319.1 210.6 L318.8 209.9 L318.5 209.2 L318.2 208.5 L317.8 207.8 L317.4 207.2 L317.0 206.5 L316.6 205.9 L316.2 205.2 L315.7 204.6 L315.3 204.0 L314.8 203.5 L314.2 202.9 L313.7 202.4 L313.1 201.8 L312.6 201.3 L312.0 200.8 L311.3 200.4 L310.7 199.9 L310.1 199.5 L309.4 199.1 L308.8 198.8 L308.1 198.4 L307.4 198.1 L306.7 197.8 L306.0 197.5 L305.2 197.2 L304.5 197.0 L303.8 196.8 L303.0 196.6" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M115.2 218.2 L115.2 217.7 L115.2 217.3 L115.1 216.9 L115.1 216.4 L115.1 216.0 L115.1 215.6 L115.0 215.1 L115.0 214.7 L114.9 214.3 L114.9 213.8 L114.8 213.4 L114.7 213.0 L114.6 212.5 L114.6 212.1 L114.5 211.7 L114.4 211.3 L114.3 210.9 L114.2 210.4 L114.0 210.0 L113.9 209.6 L113.8 209.2 L113.7 208.8 L113.5 208.4 L113.4 208.0 L113.2 207.5 L113.1 207.1 L112.9 206.7 L112.7 206.3 L112.6 205.9 L112.4 205.5 L112.2 205.2 L112.0 204.8 L111.8 204.4 L111.6 204.0 L111.4 203.6 L111.2 203.2 L111.0 202.9 L110.8 202.5 L110.5 202.1" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="430.3" y="192.2" font-size="11" text-anchor="start">121.1°</text>
  <text x="312.4" y="196.2" font-size="11" text-anchor="start">77.8°</text>
  <text x="119.2" y="210.2" font-size="11" text-anchor="start">32.3°</text>
</svg>
<figcaption>Pole angles at B add to 231.3°. The locus needs 180°, so a compensator must add +51.3° at B.</figcaption>
</figure>

$$\\angle G(B)=-(121.13^\\circ+77.83^\\circ+32.30^\\circ)=-231.26^\\circ$$

To reach $-180^\\circ$ the compensator must contribute

$$\\theta_{c}=-180^\\circ-\\angle G(B)=+51.26^\\circ$$

The sign of $\\theta_{c}$ sorts every design problem in this chapter.

- **$\\theta_{c}>0$.** The design point is to the left of the locus. A zero, or a zero–pole pair with the
  zero closer to the origin, is needed: PD or lead (9.3).
- **$\\theta_{c}\\approx0$.** The point is already on the locus. If the aim is better error, add a pair that
  contributes nearly zero angle while changing the low-frequency gain: PI or lag (9.2).
- **$\\theta_{c}<0$.** The point is to the right of the locus, slower than what gain alone gives. That
  calls for added pole angle, and it rarely comes up as a design goal.

### The magnitude criterion finishes the job

Once the angles add to $-180^\\circ$ at the design point, the gain that places the pole there is

$$K=\\frac{\\prod\\text{pole lengths}}{\\prod\\text{zero lengths}}$$

with the compensator's poles and zeros included. Every design in 9.2 to 9.4 is these two lines: an
angle sum that sets the compensator, then a length ratio that sets $K$.
`
    },
    {
      title: "9.2: Ideal integral compensation (PI)",
      sec: "9.2",
      example: "9-04",
      body: `
A pole at the origin raises the system type by one. Type 0 tracks a step with zero error, Type 1 tracks
a ramp with zero error. Added by itself, though, a pole at the origin contributes $-\\angle s$ at the
design point, about $-121^\\circ$ at $A$ in the running example, and drags the locus far to the right.

The fix is to add a zero right next to it:

$$G_{c}(s)=\\frac{s+z_{c}}{s},\\qquad z_{c}\\text{ small}$$

Seen from a dominant pole far away, the vectors from $0$ and from $-z_{c}$ are almost the same vector.
Their angles nearly cancel and their lengths nearly cancel, so the old design point stays on the locus
at nearly the same gain. For the running example with $z_{c}=0.1$, at $A$:

$$\\angle(A+0.1)-\\angle A=-2.35^\\circ,\\qquad \\frac{|A+0.1|}{|A|}=0.977$$

Re-solving on the $15\\%$ line, the dominant pair moves from $-1.105\\pm j1.830$ to $-1.062\\pm j1.758$
and $K$ from $40.2$ to $39.4$. The system is now Type 2, so the ramp error is zero.

### The price: a slow closed-loop pole

The compensator adds a branch between $0$ and $-z_{c}$, so there is a closed-loop pole at about
$-z_{c}$. Here it lands at $-0.107$. Its zero sits right beside it, so its residue is small, but its time
constant is $1/0.107=9.4$ s. That pole is what does the integrating: the response follows the
uncompensated one for the first few seconds, then the slow term finishes removing the error.

### Implementation

$$G_{c}(s)=K_{1}+\\frac{K_{2}}{s}=\\frac{K_{1}\\left(s+\\dfrac{K_{2}}{K_{1}}\\right)}{s}$$

The proportional gain $K_{1}$ is the root-locus gain $K$. The zero is set by the ratio,
$z_{c}=K_{2}/K_{1}$. Moving $z_{c}$ toward the origin disturbs the dominant poles less and makes the
correcting pole slower; 9-05 and 9-30 put numbers on that.
`
    },
    {
      title: "9.2: Lag compensation",
      sec: "9.2",
      example: "9-06",
      body: `
Pull the PI pole off the origin to $-p_{c}$ and the compensator can be built passively:

$$G_{c}(s)=\\frac{s+z_{c}}{s+p_{c}},\\qquad z_{c}>p_{c}>0$$

The type does not change, so the error is reduced rather than eliminated. By how much follows from the
static error constant. For a Type 1 loop with plant zeros $z_{i}$ and nonzero poles $p_{i}$,

$$K_{v,\\text{old}}=\\frac{K\\prod z_{i}}{\\prod p_{i}},\\qquad
K_{v,\\text{new}}=\\frac{K\\prod z_{i}}{\\prod p_{i}}\\cdot\\frac{z_{c}}{p_{c}}$$

If the pair is close enough to the origin that $K$ barely changes, then

$$K_{v,\\text{new}}\\approx K_{v,\\text{old}}\\,\\frac{z_{c}}{p_{c}}$$

The same factor multiplies $K_{p}$ for a Type 0 loop and $K_{a}$ for Type 2. The ratio sets the
improvement; the distance from the origin sets how little the transient is disturbed. A ratio of 10
with $p_{c}=0.01$, $z_{c}=0.1$ keeps the pair tight in absolute terms while multiplying the error
constant by ten.

### Procedure

1. Find the operating point on the uncompensated locus and its error constant.
2. Required ratio $=\\dfrac{\\text{required error constant}}{\\text{current error constant}}$.
3. Pick $p_{c}$ small, often $0.01$, and set $z_{c}=\\text{ratio}\\times p_{c}$.
4. Re-solve on the same $\\zeta$ line, recompute $K$ and the error constant, and find the slow pole.

### On the running example

Target: ten times $K_{v}=1.674$. With $p_{c}=0.01$, $z_{c}=0.1$. Re-solving on the $15\\%$ line gives
the dominant pair $-1.066\\pm j1.765$ with $K=39.5$, so

$$K_{v}=\\frac{39.5}{24}\\cdot\\frac{0.1}{0.01}=16.46$$

a factor of $9.83$. The shortfall from $10$ is the small drop in $K$; adding a few percent to the ratio
covers it.
`
    },
    {
      title: "9.2: How close to the origin",
      sec: "9.2",
      example: "9-08",
      body: `
The lag pair adds its own small locus near the origin. The poles at $0$ and $-0.01$ break away and
become the dominant pair, and the branch arriving at the lag zero comes in from the plant pole at
$-3$. That branch holds a fourth closed-loop pole close to $-z_{c}$.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 533" class="nx-fig">
  <defs><marker id="nx9c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 260.5 L442.0 260.5" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9c)"/>
  <path d="M380.9 499.1 L380.9 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9c)"/>
  <text x="436.0" y="278.5" font-size="13">&#963;</text>
  <text x="386.9" y="30.0" font-size="13">j&#969;</text>
  <path d="M55.7 257.5 L55.7 263.5" stroke="currentColor" stroke-width="1"/>
  <text x="55.7" y="275.5" font-size="11" text-anchor="middle" opacity=".75">−0.15</text>
  <path d="M164.1 257.5 L164.1 263.5" stroke="currentColor" stroke-width="1"/>
  <text x="164.1" y="275.5" font-size="11" text-anchor="middle" opacity=".75">−0.1</text>
  <path d="M272.5 257.5 L272.5 263.5" stroke="currentColor" stroke-width="1"/>
  <text x="272.5" y="275.5" font-size="11" text-anchor="middle" opacity=".75">−0.05</text>
  <path d="M377.9 477.4 L383.9 477.4" stroke="currentColor" stroke-width="1"/>
  <text x="374.9" y="481.4" font-size="11" text-anchor="end" opacity=".75">−j0.1</text>
  <path d="M377.9 368.9 L383.9 368.9" stroke="currentColor" stroke-width="1"/>
  <text x="374.9" y="372.9" font-size="11" text-anchor="end" opacity=".75">−j0.05</text>
  <path d="M377.9 152.1 L383.9 152.1" stroke="currentColor" stroke-width="1"/>
  <text x="374.9" y="156.1" font-size="11" text-anchor="end" opacity=".75">j0.05</text>
  <path d="M377.9 43.7 L383.9 43.7" stroke="currentColor" stroke-width="1"/>
  <text x="374.9" y="47.7" font-size="11" text-anchor="end" opacity=".75">j0.1</text>
  <path d="M380.9 260.5 L379.7 260.5 L378.5 260.5 L377.3 260.5 L376.1 260.5 L374.9 260.5 L373.7 260.5 L372.5 260.5 L371.2 260.5 L369.8 260.2 L369.8 259.0 L369.8 257.7 L369.8 256.6 L369.8 255.4 L369.7 254.2 L369.7 253.0 L369.7 251.8 L369.6 250.7 L369.5 249.5 L369.5 248.4 L369.4 247.2 L369.3 246.1 L369.3 245.0 L369.2 243.8 L369.1 242.7 L369.0 241.6 L368.9 240.5 L368.8 239.4 L368.7 238.3 L368.6 237.2 L368.4 236.1 L368.3 235.0 L368.2 233.9 L368.0 232.8 L367.9 231.8 L367.8 230.7 L367.6 229.7 L367.4 228.6 L367.3 227.5 L367.1 226.5 L366.9 225.4 L366.8 224.4 L366.6 223.3 L366.4 222.3 L366.2 221.3 L366.0 220.2 L365.8 219.2 L365.6 218.2 L365.4 217.2 L365.2 216.2 L365.0 215.2 L364.8 214.2 L364.6 213.2 L364.3 212.2 L364.1 211.2 L363.9 210.2 L363.6 209.2 L363.4 208.3 L363.1 207.3 L362.9 206.3 L362.6 205.3 L362.4 204.3 L362.1 203.4 L361.8 202.4 L361.6 201.4 L361.3 200.5 L361.0 199.5 L360.7 198.6 L360.4 197.6 L360.1 196.7 L359.8 195.7 L359.5 194.8 L359.2 193.9 L358.9 192.9 L358.6 192.0 L358.3 191.1 L358.0 190.1 L357.7 189.2 L357.3 188.3 L357.0 187.4 L356.7 186.5 L356.3 185.6 L356.0 184.6 L355.7 183.8 L355.3 182.9 L355.0 182.0 L354.6 181.1 L354.3 180.2 L353.9 179.3 L353.5 178.4 L353.2 177.5 L352.8 176.7 L352.4 175.8 L352.1 174.9 L351.7 174.0 L351.3 173.1 L350.9 172.3 L350.5 171.4 L350.1 170.6 L349.7 169.7 L349.3 168.8 L348.9 168.0 L348.5 167.1 L348.1 166.3 L347.7 165.5 L347.3 164.7 L346.9 163.8 L346.4 163.0 L346.0 162.1 L345.6 161.3 L345.1 160.4 L344.7 159.6 L344.3 158.8 L343.8 158.0 L343.4 157.2 L342.9 156.4 L342.5 155.6 L342.0 154.7 L341.6 153.9 L341.1 153.1 L340.6 152.2 L340.1 151.5 L339.7 150.7 L339.2 149.9 L338.8 149.1 L338.3 148.4 L337.8 147.6 L337.3 146.8 L336.8 146.0 L336.3 145.2 L335.8 144.4 L335.3 143.6 L334.8 142.8 L334.2 142.0 L333.8 141.2 L333.3 140.5 L332.8 139.8 L332.3 139.0 L331.8 138.3 L331.2 137.5 L330.7 136.8 L330.2 136.0 L329.6 135.3 L329.1 134.5 L328.5 133.8 L328.0 133.0 L327.4 132.2 L326.8 131.5 L326.3 130.7 L325.7 129.9 L325.1 129.2 L324.6 128.5 L324.1 127.8 L323.5 127.2 L323.0 126.5 L322.4 125.8 L321.9 125.1 L321.3 124.4 L320.7 123.7 L320.1 122.9 L319.5 122.2 L318.9 121.5 L318.3 120.8 L317.7 120.1 L317.1 119.4 L316.5 118.7 L315.8 117.9 L315.2 117.2 L314.5 116.5 L313.9 115.8 L313.2 115.0 L312.6 114.4 L312.1 113.8 L311.5 113.1 L310.9 112.5 L310.3 111.9 L309.7 111.2 L309.0 110.6 L308.4 110.0 L307.8 109.3 L307.2 108.7 L306.5 108.0 L305.9 107.4 L305.2 106.7 L304.6 106.1 L303.9 105.4 L303.2 104.8 L302.5 104.1 L301.8 103.5 L301.1 102.8 L300.4 102.2 L299.7 101.5 L299.0 100.9 L298.3 100.2 L297.5 99.6 L296.8 98.9 L296.1 98.2 L295.3 97.6 L294.5 96.9 L293.8 96.3 L293.1 95.7 L292.4 95.2 L291.8 94.6 L291.1 94.1 L290.4 93.5 L289.8 93.0 L289.1 92.4 L288.4 91.8 L287.7 91.3 L287.0 90.7 L286.3 90.2 L285.5 89.6 L284.8 89.1 L284.1 88.5 L283.3 88.0 L282.6 87.4 L281.9 86.9 L281.1 86.3 L280.3 85.7 L279.6 85.2 L278.8 84.6 L278.0 84.1 L277.2 83.5 L276.4 83.0 L275.6 82.4 L274.8 81.9 L274.0 81.3 L273.1 80.8 L272.3 80.2 L271.5 79.7 L270.6 79.1 L269.8 78.6 L268.9 78.0 L268.0 77.5 L267.1 76.9 L266.2 76.4 L265.4 75.8 L264.4 75.3 L263.5 74.8 L262.6 74.2 L261.7 73.7 L260.7 73.1 L259.8 72.6 L258.8 72.1 L257.9 71.5 L257.1 71.1 L256.3 70.7 L255.5 70.3 L254.7 69.8 L253.9 69.4 L253.1 69.0 L252.3 68.6 L251.5 68.2 L250.7 67.7 L249.8 67.3 L249.0 66.9 L248.2 66.5 L247.3 66.1 L246.4 65.7 L245.6 65.3 L244.7 64.9 L243.8 64.5 L243.0 64.1 L242.1 63.7 L241.2 63.3 L240.3 62.9 L239.4 62.5 L238.5 62.1 L237.5 61.7 L236.6 61.3 L235.7 60.9 L234.7 60.5 L233.8 60.2 L232.8 59.8 L231.9 59.4 L230.9 59.0 L229.9 58.7 L228.9 58.3 L227.9 57.9 L226.9 57.6 L225.9 57.2 L224.9 56.8 L223.9 56.5 L222.9 56.1 L221.8 55.8 L220.8 55.4 L219.7 55.1 L218.7 54.8 L217.6 54.4 L216.5 54.1 L215.4 53.8 L214.3 53.4 L213.2 53.1 L212.1 52.8 L211.0 52.5 L209.9 52.2 L208.7 51.9 L207.6 51.6 L206.4 51.3 L205.3 51.0 L204.1 50.7 L202.9 50.4 L201.7 50.2 L200.5 49.9 L199.3 49.6 L198.1 49.4 L196.9 49.1 L195.7 48.8 L194.4 48.6 L193.2 48.4 L191.9 48.1 L190.6 47.9 L189.3 47.7 L188.0 47.5 L186.7 47.3 L185.4 47.1 L184.1 46.9 L182.8 46.7 L181.4 46.5 L180.1 46.3 L178.7 46.2 L177.3 46.0 L175.9 45.8 L174.5 45.7 L173.1 45.6 L171.7 45.4 L170.3 45.3 L168.8 45.2 L167.4 45.1 L165.9 45.0 L164.4 44.9 L162.9 44.9 L161.4 44.8 L159.9 44.8 L158.4 44.7 L156.8 44.7 L155.3 44.7 L153.7 44.6 L152.1 44.6 L150.9 44.7 L149.7 44.7 L148.5 44.7 L147.3 44.7 L146.1 44.8 L144.9 44.8 L143.6 44.9 L142.4 44.9 L141.1 45.0 L139.9 45.0 L138.6 45.1 L137.3 45.2 L136.1 45.3 L134.8 45.4 L133.5 45.5 L132.2 45.7 L130.8 45.8 L129.5 45.9 L128.2 46.1 L126.8 46.2 L125.5 46.4 L124.1 46.6 L122.8 46.8 L121.4 47.0 L120.0 47.2 L118.6 47.4 L117.2 47.6 L115.8 47.9 L114.4 48.1 L113.0 48.4 L111.6 48.6 L110.1 48.9 L108.7 49.2 L107.2 49.5 L105.7 49.9 L104.7 50.1 L103.7 50.3 L102.7 50.6 L101.7 50.8 L100.7 51.0 L99.7 51.3 L98.7 51.5 L97.7 51.8 L96.7 52.1 L95.7 52.4 L94.6 52.6 L93.6 52.9 L92.6 53.2 L91.5 53.5 L90.5 53.9 L89.4 54.2 L88.4 54.5 L87.3 54.8 L86.2 55.2 L85.2 55.5 L84.1 55.9 L83.0 56.2 L81.9 56.6 L80.8 57.0 L79.7 57.4 L78.6 57.8 L77.5 58.2 L76.4 58.6 L75.3 59.0 L74.2 59.4 L73.1 59.9 L71.9 60.3 L70.8 60.8 L69.7 61.3 L68.5 61.7 L67.4 62.2 L66.2 62.7 L65.1 63.2 L63.9 63.8 L62.7 64.3 L61.6 64.8 L60.4 65.4 L59.2 65.9 L58.0 66.5 L56.8 67.1 L55.6 67.7 L54.4 68.3 L53.2 68.9 L52.0 69.6 L50.8 70.2 L49.5 70.9 L48.3 71.5 L47.1 72.2 L45.8 72.9 L44.6 73.6 L43.3 74.4 L42.0 75.1 L40.8 75.9 L39.5 76.6 L38.2 77.4 L36.9 78.2 L35.6 79.1 L34.3 79.9 L34.0 80.8 L34.0 81.6 L34.0 82.5 L34.0 83.4 L34.0 84.4 L34.0 85.3" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(257.9 71.5) rotate(-151.2)"/>
  <path d="M34.0 260.5 L34.0 260.5 L34.0 260.5 L34.0 260.5 L34.0 260.5 L35.7 260.5 L37.3 260.5 L38.8 260.5 L40.3 260.5 L41.8 260.5 L43.2 260.5 L44.6 260.5 L45.9 260.5 L47.2 260.5 L48.4 260.5 L49.7 260.5 L51.5 260.5 L53.2 260.5 L54.8 260.5 L56.5 260.5 L58.0 260.5 L59.5 260.5 L61.0 260.5 L62.4 260.5 L63.8 260.5 L65.1 260.5 L66.4 260.5 L67.6 260.5 L68.9 260.5 L70.5 260.5 L72.0 260.5 L73.5 260.5 L74.9 260.5 L76.3 260.5 L77.7 260.5 L79.0 260.5 L80.2 260.5 L81.5 260.5 L82.7 260.5 L84.2 260.5 L85.6 260.5 L86.9 260.5 L88.3 260.5 L89.6 260.5 L90.8 260.5 L92.0 260.5 L93.4 260.5 L94.8 260.5 L96.1 260.5 L97.4 260.5 L98.6 260.5 L100.0 260.5 L101.4 260.5 L102.7 260.5 L103.9 260.5 L105.1 260.5 L106.5 260.5 L107.8 260.5 L109.0 260.5 L110.2 260.5 L111.5 260.5 L112.8 260.5 L114.0 260.5 L115.3 260.5 L116.6 260.5 L117.8 260.5 L119.1 260.5 L120.3 260.5 L121.6 260.5 L122.8 260.5 L124.1 260.5 L125.3 260.5 L126.6 260.5 L127.8 260.5 L129.0 260.5 L130.3 260.5 L131.6 260.5 L132.8 260.5 L134.0 260.5 L135.2 260.5 L136.4 260.5 L137.6 260.5 L138.9 260.5 L140.1 260.5 L141.3 260.5 L142.5 260.5 L143.8 260.5 L145.0 260.5 L146.2 260.5 L147.4 260.5 L148.6 260.5 L149.8 260.5 L151.0 260.5 L152.2 260.5 L153.4 260.5 L154.6 260.5 L155.8 260.5 L157.0 260.5 L158.3 260.5 L159.5 260.5 L160.7 260.5 L161.9 260.5 L163.1 260.5" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(98.6 260.5) rotate(0.0)"/>
  <path d="M359.3 260.5 L360.5 260.5 L361.7 260.5 L362.9 260.5 L364.1 260.5 L365.3 260.5 L366.5 260.5 L367.7 260.5 L369.0 260.5 L369.8 261.1 L369.8 262.3 L369.8 263.6 L369.8 264.7 L369.8 265.9 L369.7 267.1 L369.7 268.3 L369.6 269.4 L369.6 270.6 L369.5 271.7 L369.5 272.9 L369.4 274.0 L369.3 275.2 L369.3 276.3 L369.2 277.4 L369.1 278.5 L369.0 279.7 L368.9 280.8 L368.8 281.9 L368.7 283.0 L368.5 284.1 L368.4 285.2 L368.3 286.2 L368.2 287.3 L368.0 288.4 L367.9 289.5 L367.7 290.6 L367.6 291.6 L367.4 292.7 L367.2 293.8 L367.1 294.8 L366.9 295.9 L366.7 297.0 L366.5 298.0 L366.4 299.0 L366.2 300.1 L366.0 301.1 L365.8 302.1 L365.6 303.2 L365.4 304.2 L365.1 305.2 L364.9 306.2 L364.7 307.2 L364.5 308.2 L364.3 309.2 L364.0 310.2 L363.8 311.2 L363.5 312.2 L363.3 313.1 L363.0 314.1 L362.8 315.1 L362.5 316.1 L362.3 317.1 L362.0 318.0 L361.7 319.0 L361.5 319.9 L361.2 320.9 L360.9 321.8 L360.6 322.8 L360.3 323.7 L360.1 324.6 L359.8 325.6 L359.5 326.5 L359.2 327.5 L358.8 328.4 L358.5 329.3 L358.2 330.2 L357.9 331.1 L357.6 332.1 L357.3 333.0 L356.9 333.9 L356.6 334.8 L356.3 335.7 L355.9 336.6 L355.6 337.5 L355.3 338.4 L354.9 339.3 L354.6 340.2 L354.2 341.1 L353.8 342.0 L353.5 342.8 L353.1 343.7 L352.7 344.6 L352.3 345.5 L352.0 346.4 L351.6 347.3 L351.2 348.1 L350.8 349.0 L350.4 349.8 L350.0 350.7 L349.6 351.6 L349.2 352.4 L348.8 353.3 L348.4 354.1 L348.0 355.0 L347.6 355.8 L347.2 356.6 L346.8 357.5 L346.3 358.3 L345.9 359.2 L345.4 360.0 L345.0 360.8 L344.6 361.6 L344.2 362.4 L343.7 363.2 L343.3 364.0 L342.9 364.8 L342.4 365.7 L341.9 366.5 L341.5 367.3 L341.0 368.2 L340.5 369.0 L340.0 369.8 L339.6 370.5 L339.1 371.3 L338.7 372.1 L338.2 372.9 L337.7 373.6 L337.2 374.4 L336.7 375.2 L336.2 376.0 L335.7 376.8 L335.2 377.6 L334.6 378.4 L334.2 379.2 L333.7 379.9 L333.2 380.6 L332.7 381.4 L332.2 382.1 L331.7 382.9 L331.2 383.6 L330.6 384.3 L330.1 385.1 L329.6 385.9 L329.0 386.6 L328.5 387.4 L327.9 388.1 L327.3 388.9 L326.8 389.7 L326.2 390.5 L325.7 391.1 L325.1 391.8 L324.6 392.5 L324.1 393.2 L323.5 393.9 L323.0 394.6 L322.4 395.3 L321.9 396.0 L321.3 396.7 L320.7 397.4 L320.1 398.1 L319.5 398.8 L318.9 399.5 L318.3 400.2 L317.7 401.0 L317.1 401.7 L316.5 402.4 L315.8 403.1 L315.2 403.8 L314.5 404.6 L313.9 405.3 L313.2 406.0 L312.6 406.7 L312.1 407.3 L311.5 407.9 L310.9 408.6 L310.3 409.2 L309.7 409.8 L309.0 410.5 L308.4 411.1 L307.8 411.7 L307.2 412.4 L306.5 413.0 L305.9 413.7 L305.2 414.3 L304.6 415.0 L303.9 415.6 L303.2 416.3 L302.5 416.9 L301.8 417.6 L301.1 418.2 L300.4 418.9 L299.7 419.5 L299.0 420.2 L298.3 420.8 L297.5 421.5 L296.8 422.1 L296.1 422.8 L295.3 423.5 L294.5 424.1 L293.8 424.8 L293.1 425.3 L292.4 425.9 L291.8 426.4 L291.1 427.0 L290.4 427.5 L289.8 428.1 L289.1 428.7 L288.4 429.2 L287.7 429.8 L287.0 430.3 L286.3 430.9 L285.5 431.4 L284.8 432.0 L284.1 432.5 L283.3 433.1 L282.6 433.6 L281.9 434.2 L281.1 434.7 L280.3 435.3 L279.6 435.9 L278.8 436.4 L278.0 437.0 L277.2 437.5 L276.4 438.1 L275.6 438.6 L274.8 439.2 L274.0 439.7 L273.1 440.3 L272.3 440.8 L271.5 441.4 L270.6 441.9 L269.8 442.5 L268.9 443.0 L268.0 443.6 L267.1 444.1 L266.2 444.7 L265.4 445.2 L264.4 445.7 L263.5 446.3 L262.6 446.8 L261.7 447.4 L260.7 447.9 L259.8 448.4 L258.8 449.0 L257.9 449.5 L257.1 449.9 L256.3 450.4 L255.5 450.8 L254.7 451.2 L253.9 451.6 L253.1 452.1 L252.3 452.5 L251.5 452.9 L250.7 453.3 L249.8 453.7 L249.0 454.1 L248.2 454.5 L247.3 455.0 L246.4 455.4 L245.6 455.8 L244.7 456.2 L243.8 456.6 L243.0 457.0 L242.1 457.4 L241.2 457.8 L240.3 458.2 L239.4 458.6 L238.5 459.0 L237.5 459.4 L236.6 459.7 L235.7 460.1 L234.7 460.5 L233.8 460.9 L232.8 461.3 L231.9 461.7 L230.9 462.0 L229.9 462.4 L228.9 462.8 L227.9 463.1 L226.9 463.5 L225.9 463.9 L224.9 464.2 L223.9 464.6 L222.9 464.9 L221.8 465.3 L220.8 465.6 L219.7 466.0 L218.7 466.3 L217.6 466.6 L216.5 467.0 L215.4 467.3 L214.3 467.6 L213.2 467.9 L212.1 468.2 L211.0 468.6 L209.9 468.9 L208.7 469.2 L207.6 469.5 L206.4 469.8 L205.3 470.1 L204.1 470.3 L202.9 470.6 L201.7 470.9 L200.5 471.2 L199.3 471.4 L198.1 471.7 L196.9 472.0 L195.7 472.2 L194.4 472.4 L193.2 472.7 L191.9 472.9 L190.6 473.1 L189.3 473.4 L188.0 473.6 L186.7 473.8 L185.4 474.0 L184.1 474.2 L182.8 474.4 L181.4 474.6 L180.1 474.7 L178.7 474.9 L177.3 475.1 L175.9 475.2 L174.5 475.3 L173.1 475.5 L171.7 475.6 L170.3 475.7 L168.8 475.8 L167.4 475.9 L165.9 476.0 L164.4 476.1 L162.9 476.2 L161.4 476.2 L159.9 476.3 L158.4 476.3 L156.8 476.4 L155.3 476.4 L153.7 476.4 L152.1 476.4 L150.9 476.4 L149.7 476.4 L148.5 476.4 L147.3 476.3 L146.1 476.3 L144.9 476.2 L143.6 476.2 L142.4 476.1 L141.1 476.1 L139.9 476.0 L138.6 475.9 L137.3 475.8 L136.1 475.7 L134.8 475.6 L133.5 475.5 L132.2 475.4 L130.8 475.3 L129.5 475.1 L128.2 475.0 L126.8 474.8 L125.5 474.6 L124.1 474.5 L122.8 474.3 L121.4 474.1 L120.0 473.9 L118.6 473.7 L117.2 473.4 L115.8 473.2 L114.4 472.9 L113.0 472.7 L111.6 472.4 L110.1 472.1 L108.7 471.8 L107.2 471.5 L105.7 471.2 L104.7 471.0 L103.7 470.7 L102.7 470.5 L101.7 470.3 L100.7 470.0 L99.7 469.8 L98.7 469.5 L97.7 469.2 L96.7 469.0 L95.7 468.7 L94.6 468.4 L93.6 468.1 L92.6 467.8 L91.5 467.5 L90.5 467.2 L89.4 466.9 L88.4 466.6 L87.3 466.2 L86.2 465.9 L85.2 465.5 L84.1 465.2 L83.0 464.8 L81.9 464.4 L80.8 464.1 L79.7 463.7 L78.6 463.3 L77.5 462.9 L76.4 462.5 L75.3 462.0 L74.2 461.6 L73.1 461.2 L71.9 460.7 L70.8 460.3 L69.7 459.8 L68.5 459.3 L67.4 458.8 L66.2 458.3 L65.1 457.8 L63.9 457.3 L62.7 456.8 L61.6 456.2 L60.4 455.7 L59.2 455.1 L58.0 454.5 L56.8 454.0 L55.6 453.4 L54.4 452.7 L53.2 452.1 L52.0 451.5 L50.8 450.8 L49.5 450.2 L48.3 449.5 L47.1 448.8 L45.8 448.1 L44.6 447.4 L43.3 446.7 L42.0 445.9 L40.8 445.2 L39.5 444.4 L38.2 443.6 L36.9 442.8 L35.6 442.0 L34.3 441.2 L34.0 440.3 L34.0 439.4 L34.0 438.5 L34.0 437.6 L34.0 436.7 L34.0 435.7" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(257.9 449.5) rotate(151.2)"/>
  <path d="M374.9 254.5 L386.9 266.5 M386.9 254.5 L374.9 266.5" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M353.3 254.5 L365.3 266.5 M365.3 254.5 L353.3 266.5" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="164.1" cy="260.5" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <rect x="147.4" y="256.5" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="145.4" y="248.5" font-size="11" text-anchor="end">−0.106 at K = 39.5</text>
</svg>
<figcaption>Lag (s+0.1)/(s+0.01) on the same plant, zoomed to the origin. The poles at 0 and −0.01 break away and leave the window: they become the dominant pair. The branch on the real axis comes in from the plant pole at −3 and ends on the lag zero. At K = 39.5 its pole is at −0.106, short of the zero.</figcaption>
</figure>

### The angle the pair steals

For a small pair at a dominant pole $s=-\\sigma+j\\omega_{d}$ with $\\omega_{n}=|s|$, differentiating
$\\angle(s+x)=\\tan^{-1}\\dfrac{\\omega_{d}}{x-\\sigma}$ at $x=0$ gives

$$\\Delta\\theta\\approx-\\frac{(z_{c}-p_{c})\\,\\omega_{d}}{\\omega_{n}^{2}}\\ \\text{rad}$$

At $A$ in the running example, $\\omega_{d}=1.830$ and $\\omega_{n}^{2}=4.570$. For the $0.1/0.01$ pair:
$-0.090\\cdot1.830/4.570=-0.036$ rad $=-2.06^\\circ$ (exact $-2.12^\\circ$). The angle grows with the
gap $z_{c}-p_{c}$, not with the ratio, which is why the pair is pushed toward the origin.

### The slow pole and its tail

The fourth pole near $-z_{c}$ is not fully cancelled by the zero. Its residue is small but its time
constant is long. With the ratio held at 10:

| $z_{c}/p_{c}$ | Angle at $A$ | Slow pole | Its residue | Sim. $\\%OS$ | Sim. $T_{s}$ (s) | $K_{v}$ |
|---|---|---|---|---|---|---|
| none | — | — | — | 14.5 | 3.76 | 1.67 |
| $0.3/0.03$ | $-6.69^\\circ$ | $-0.366$ | $0.275$ | 31.6 | 7.19 | 15.6 |
| $0.1/0.01$ | $-2.12^\\circ$ | $-0.106$ | $0.063$ | 20.5 | 10.8 | 16.5 |
| $0.03/0.003$ | $-0.62^\\circ$ | $-0.0305$ | $0.017$ | 16.3 | 2.98 | 16.7 |
| $0.01/0.001$ | $-0.21^\\circ$ | $-0.0101$ | $0.0055$ | 15.1 | 2.86 | 16.7 |

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="nx-fig">
  <defs><marker id="nx9d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M46.0 216.0 L510.0 216.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9d)"/>
  <path d="M46.0 216.0 L46.0 10.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9d)"/>
  <path d="M46.0 216.0 L46.0 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="46.0" y="232.0" font-size="11" text-anchor="middle" opacity=".75">0</text>
  <path d="M111.4 216.0 L111.4 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="111.4" y="232.0" font-size="11" text-anchor="middle" opacity=".75">2</text>
  <path d="M176.9 216.0 L176.9 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="176.9" y="232.0" font-size="11" text-anchor="middle" opacity=".75">4</text>
  <path d="M242.3 216.0 L242.3 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="242.3" y="232.0" font-size="11" text-anchor="middle" opacity=".75">6</text>
  <path d="M307.7 216.0 L307.7 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="307.7" y="232.0" font-size="11" text-anchor="middle" opacity=".75">8</text>
  <path d="M373.1 216.0 L373.1 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="373.1" y="232.0" font-size="11" text-anchor="middle" opacity=".75">10</text>
  <path d="M438.6 216.0 L438.6 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="438.6" y="232.0" font-size="11" text-anchor="middle" opacity=".75">12</text>
  <path d="M504.0 216.0 L504.0 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="504.0" y="232.0" font-size="11" text-anchor="middle" opacity=".75">14</text>
  <path d="M42.0 216.0 L46.0 216.0" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="220.0" font-size="11" text-anchor="end" opacity=".75">0</text>
  <path d="M42.0 139.1 L46.0 139.1" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="143.1" font-size="11" text-anchor="end" opacity=".75">0.5</text>
  <path d="M42.0 62.2 L46.0 62.2" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="66.2" font-size="11" text-anchor="end" opacity=".75">1</text>
  <text x="504.0" y="246.0" font-size="12" text-anchor="end">t (s)</text>
  <text x="52.0" y="20.0" font-size="12">c(t)</text>
  <path d="M46.0 62.2 L504.0 62.2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
  <path d="M46.0 59.1 L504.0 59.1" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity=".35"/>
  <path d="M46.0 65.2 L504.0 65.2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity=".35"/>
  <path d="M46.0 216.0 L47.0 216.0 L47.9 215.8 L48.6 215.6 L49.3 215.2 L49.9 214.8 L50.4 214.3 L50.9 213.7 L51.3 213.1 L51.8 212.4 L52.2 211.8 L52.5 211.1 L52.9 210.4 L53.2 209.7 L53.5 209.0 L53.9 208.2 L54.1 207.5 L54.4 206.7 L54.7 206.0 L55.0 205.1 L55.3 204.4 L55.6 203.6 L55.8 202.8 L56.1 202.0 L56.3 201.1 L56.6 200.2 L56.8 199.4 L57.1 198.6 L57.3 197.8 L57.5 197.0 L57.7 196.1 L58.0 195.3 L58.2 194.4 L58.4 193.5 L58.7 192.6 L58.9 191.7 L59.1 190.7 L59.3 189.9 L59.5 189.1 L59.7 188.3 L59.9 187.4 L60.1 186.6 L60.3 185.7 L60.5 184.9 L60.7 184.0 L60.9 183.1 L61.1 182.2 L61.3 181.3 L61.5 180.4 L61.7 179.5 L61.9 178.6 L62.1 177.7 L62.3 176.7 L62.5 175.8 L62.7 174.9 L62.8 173.9 L63.0 173.0 L63.2 172.0 L63.4 171.0 L63.6 170.1 L63.8 169.1 L64.0 168.1 L64.2 167.1 L64.4 166.1 L64.6 165.2 L64.8 164.2 L65.0 163.2 L65.2 162.2 L65.4 161.2 L65.6 160.3 L65.7 159.5 L65.9 158.6 L66.1 157.8 L66.2 156.9 L66.4 156.1 L66.5 155.3 L66.7 154.4 L66.9 153.6 L67.0 152.7 L67.2 151.8 L67.4 151.0 L67.5 150.1 L67.7 149.3 L67.9 148.4 L68.0 147.6 L68.2 146.7 L68.3 145.9 L68.5 145.0 L68.7 144.2 L68.8 143.3 L69.0 142.4 L69.2 141.6 L69.3 140.7 L69.5 139.9 L69.7 139.0 L69.8 138.2 L70.0 137.3 L70.1 136.5 L70.3 135.6 L70.5 134.8 L70.6 133.9 L70.8 133.1 L71.0 132.2 L71.1 131.4 L71.3 130.5 L71.5 129.7 L71.6 128.9 L71.8 128.0 L72.0 127.0 L72.2 126.0 L72.4 125.0 L72.6 124.0 L72.8 123.0 L73.0 122.0 L73.2 121.1 L73.3 120.1 L73.5 119.1 L73.7 118.1 L73.9 117.2 L74.1 116.2 L74.3 115.2 L74.5 114.3 L74.7 113.3 L74.9 112.4 L75.1 111.4 L75.3 110.5 L75.5 109.5 L75.7 108.6 L75.9 107.7 L76.1 106.7 L76.3 105.8 L76.5 104.9 L76.7 104.0 L76.9 103.1 L77.1 102.2 L77.3 101.3 L77.5 100.4 L77.7 99.5 L77.9 98.7 L78.1 97.8 L78.3 96.9 L78.5 96.1 L78.6 95.2 L78.8 94.4 L79.0 93.5 L79.2 92.7 L79.4 91.8 L79.6 91.0 L79.8 90.2 L80.0 89.4 L80.2 88.6 L80.4 87.7 L80.7 86.7 L80.9 85.8 L81.1 84.9 L81.4 84.0 L81.6 83.1 L81.8 82.2 L82.1 81.4 L82.3 80.5 L82.5 79.7 L82.7 78.8 L83.0 78.0 L83.2 77.2 L83.4 76.4 L83.7 75.5 L83.9 74.7 L84.1 74.0 L84.3 73.2 L84.6 72.3 L84.9 71.4 L85.1 70.6 L85.4 69.8 L85.6 68.9 L85.9 68.1 L86.2 67.3 L86.4 66.5 L86.7 65.7 L87.0 65.0 L87.2 64.2 L87.5 63.5 L87.8 62.7 L88.1 61.9 L88.4 61.1 L88.7 60.3 L89.0 59.6 L89.2 58.8 L89.5 58.1 L89.8 57.4 L90.2 56.6 L90.5 55.9 L90.8 55.2 L91.1 54.5 L91.5 53.8 L91.8 53.0 L92.2 52.3 L92.6 51.6 L92.9 51.0 L93.3 50.3 L93.7 49.6 L94.1 49.0 L94.4 48.3 L94.9 47.7 L95.3 47.1 L95.7 46.5 L96.2 45.9 L96.6 45.3 L97.1 44.8 L97.6 44.2 L98.1 43.7 L98.6 43.2 L99.2 42.7 L99.7 42.3 L100.3 41.8 L100.9 41.4 L101.6 41.0 L102.3 40.7 L103.0 40.4 L103.8 40.2 L104.6 40.0 L105.5 39.9 L106.5 39.9 L107.5 39.9 L108.4 40.0 L109.2 40.2 L110.0 40.4 L110.7 40.7 L111.5 41.0 L112.2 41.3 L112.9 41.6 L113.6 42.0 L114.2 42.3 L114.9 42.7 L115.6 43.1 L116.2 43.5 L116.8 43.9 L117.4 44.3 L118.0 44.7 L118.6 45.1 L119.2 45.6 L119.8 46.0 L120.4 46.4 L121.0 46.9 L121.6 47.3 L122.2 47.8 L122.7 48.2 L123.3 48.7 L123.9 49.2 L124.5 49.6 L125.1 50.1 L125.7 50.5 L126.3 51.0 L126.9 51.5 L127.5 51.9 L128.0 52.4 L128.6 52.8 L129.2 53.3 L129.8 53.7 L130.4 54.1 L131.0 54.6 L131.6 55.0 L132.2 55.4 L132.8 55.8 L133.4 56.2 L134.0 56.7 L134.6 57.1 L135.2 57.5 L135.9 57.9 L136.5 58.3 L137.1 58.7 L137.8 59.0 L138.5 59.4 L139.1 59.8 L139.8 60.1 L140.4 60.5 L141.1 60.8 L141.8 61.1 L142.5 61.5 L143.2 61.8 L143.9 62.1 L144.7 62.4 L145.4 62.7 L146.2 62.9 L146.9 63.2 L147.7 63.4 L148.5 63.7 L149.3 63.9 L150.1 64.1 L150.9 64.3 L151.8 64.5 L152.6 64.6 L153.5 64.8 L154.3 64.9 L155.2 65.1 L156.1 65.2 L157.1 65.3 L158.0 65.3 L159.0 65.4 L159.9 65.4 L160.9 65.5 L161.9 65.5 L163.0 65.5 L164.0 65.5 L164.9 65.5 L165.9 65.4 L166.9 65.4 L167.9 65.3 L168.8 65.3 L169.8 65.2 L170.7 65.1 L171.7 65.0 L172.6 64.9 L173.5 64.8 L174.4 64.7 L175.3 64.6 L176.2 64.5 L177.2 64.4 L178.1 64.3 L179.0 64.2 L179.9 64.1 L180.8 64.0 L181.7 63.9 L182.6 63.8 L183.6 63.7 L184.5 63.6 L185.4 63.5 L186.3 63.4 L187.2 63.3 L188.1 63.2 L189.1 63.1 L190.0 63.0 L190.9 62.9 L191.8 62.8 L192.7 62.7 L193.7 62.6 L194.6 62.6 L195.6 62.5 L196.5 62.4 L197.5 62.3 L198.4 62.3 L199.4 62.2 L200.3 62.2 L201.3 62.1 L202.2 62.0 L203.2 62.0 L204.2 61.9 L205.2 61.9 L206.1 61.9 L207.1 61.8 L208.1 61.8 L209.1 61.8 L210.1 61.7 L211.0 61.7 L212.1 61.7 L213.1 61.7 L214.1 61.7 L215.1 61.7 L216.1 61.7 L217.1 61.7 L218.1 61.7 L219.2 61.7 L220.2 61.7 L221.2 61.7 L222.2 61.7 L223.2 61.7 L224.2 61.7 L225.2 61.7 L226.3 61.7 L227.3 61.7 L228.3 61.7 L229.3 61.7 L230.3 61.8 L231.3 61.8 L232.3 61.8 L233.4 61.8 L234.4 61.8 L235.4 61.8 L236.4 61.9 L237.4 61.9 L238.4 61.9 L239.4 61.9 L240.5 61.9 L241.5 62.0 L242.5 62.0 L243.5 62.0 L244.5 62.0 L245.5 62.0 L246.5 62.0 L247.6 62.0 L248.6 62.1 L249.6 62.1 L250.6 62.1 L251.6 62.1 L252.6 62.1 L253.6 62.1 L254.7 62.1 L255.7 62.1 L256.7 62.2 L257.7 62.2 L258.7 62.2 L259.7 62.2 L260.7 62.2 L261.8 62.2 L262.8 62.2 L263.8 62.2 L264.8 62.2 L265.8 62.2 L266.8 62.2 L267.8 62.2 L268.8 62.2 L269.9 62.2 L270.9 62.2 L271.9 62.2 L272.9 62.2 L273.9 62.2 L274.9 62.2 L275.9 62.2 L277.0 62.2 L278.0 62.2 L279.0 62.2 L280.0 62.2 L281.0 62.2 L282.0 62.2 L283.0 62.2 L284.1 62.2 L285.1 62.2 L286.1 62.2 L287.1 62.2 L288.1 62.2 L289.1 62.2 L290.1 62.2 L291.2 62.2 L292.2 62.2 L293.2 62.2 L294.2 62.2 L295.2 62.2 L296.2 62.2 L297.2 62.2 L298.3 62.2 L299.3 62.2 L300.3 62.2 L301.3 62.2 L302.3 62.2 L303.3 62.2 L304.3 62.2 L305.4 62.2 L306.4 62.2 L307.4 62.2 L308.4 62.2 L309.4 62.2 L310.4 62.2 L311.4 62.2 L312.5 62.2 L313.5 62.2 L314.5 62.2 L315.5 62.2 L316.5 62.1 L317.5 62.1 L318.5 62.1 L319.6 62.1 L320.6 62.1 L321.6 62.1 L322.6 62.1 L323.6 62.1 L324.6 62.1 L325.6 62.1 L326.7 62.1 L327.7 62.1 L328.7 62.1 L329.7 62.1 L330.7 62.1 L331.7 62.1 L332.7 62.1 L333.8 62.1 L334.8 62.1 L335.8 62.1 L336.8 62.1 L337.8 62.1 L338.8 62.1 L339.8 62.1 L340.9 62.1 L341.9 62.1 L342.9 62.1 L343.9 62.1 L344.9 62.1 L345.9 62.1 L346.9 62.1 L348.0 62.1 L349.0 62.1 L350.0 62.1 L351.0 62.1 L352.0 62.1 L353.0 62.1 L354.0 62.1 L355.1 62.1 L356.1 62.2 L357.1 62.2 L358.1 62.2 L359.1 62.2 L360.1 62.2 L361.1 62.2 L362.2 62.2 L363.2 62.2 L364.2 62.2 L365.2 62.2 L366.2 62.2 L367.2 62.2 L368.2 62.2 L369.2 62.2 L370.3 62.2 L371.3 62.2 L372.3 62.2 L373.3 62.2 L374.3 62.2 L375.3 62.2 L376.3 62.2 L377.4 62.2 L378.4 62.2 L379.4 62.2 L380.4 62.2 L381.4 62.2 L382.4 62.2 L383.4 62.2 L384.5 62.2 L385.5 62.2 L386.5 62.2 L387.5 62.2 L388.5 62.2 L389.5 62.2 L390.5 62.2 L391.6 62.2 L392.6 62.2 L393.6 62.2 L394.6 62.2 L395.6 62.2 L396.6 62.2 L397.6 62.2 L398.7 62.2 L399.7 62.2 L400.7 62.2 L401.7 62.2 L402.7 62.2 L403.7 62.2 L404.7 62.2 L405.8 62.2 L406.8 62.2 L407.8 62.2 L408.8 62.2 L409.8 62.2 L410.8 62.2 L411.8 62.2 L412.9 62.2 L413.9 62.2 L414.9 62.2 L415.9 62.2 L416.9 62.2 L417.9 62.2 L418.9 62.2 L420.0 62.2 L421.0 62.2 L422.0 62.2 L423.0 62.2 L424.0 62.2 L425.0 62.2 L426.0 62.2 L427.1 62.2 L428.1 62.2 L429.1 62.2 L430.1 62.2 L431.1 62.2 L432.1 62.2 L433.1 62.2 L434.2 62.2 L435.2 62.2 L436.2 62.2 L437.2 62.2 L438.2 62.2 L439.2 62.2 L440.2 62.2 L441.3 62.2 L442.3 62.2 L443.3 62.2 L444.3 62.2 L445.3 62.2 L446.3 62.2 L447.3 62.2 L448.4 62.2 L449.4 62.2 L450.4 62.2 L451.4 62.2 L452.4 62.2 L453.4 62.2 L454.4 62.2 L455.5 62.2 L456.5 62.2 L457.5 62.2 L458.5 62.2 L459.5 62.2 L460.5 62.2 L461.5 62.2 L462.6 62.2 L463.6 62.2 L464.6 62.2 L465.6 62.2 L466.6 62.2 L467.6 62.2 L468.6 62.2 L469.7 62.2 L470.7 62.2 L471.7 62.2 L472.7 62.2 L473.7 62.2 L474.7 62.2 L475.7 62.2 L476.7 62.2 L477.8 62.2 L478.8 62.2 L479.8 62.2 L480.8 62.2 L481.8 62.2 L482.8 62.2 L483.8 62.2 L484.9 62.2 L485.9 62.2 L486.9 62.2 L487.9 62.2 L488.9 62.2 L489.9 62.2 L490.9 62.2 L492.0 62.2 L493.0 62.2 L494.0 62.2 L495.0 62.2 L496.0 62.2 L497.0 62.2 L498.0 62.2 L499.1 62.2 L500.1 62.2 L501.1 62.2 L502.1 62.2 L503.1 62.2" fill="none" stroke="currentColor" stroke-width="2.0"/>
  <path d="M46.0 216.0 L47.0 216.0 L47.9 215.8 L48.6 215.6 L49.3 215.2 L49.9 214.8 L50.4 214.3 L50.9 213.7 L51.3 213.1 L51.8 212.5 L52.2 211.8 L52.5 211.2 L52.9 210.5 L53.2 209.8 L53.5 209.1 L53.9 208.3 L54.1 207.6 L54.4 206.8 L54.7 206.1 L55.0 205.2 L55.3 204.5 L55.6 203.7 L55.8 202.9 L56.1 202.1 L56.3 201.2 L56.6 200.4 L56.8 199.6 L57.1 198.8 L57.3 198.0 L57.5 197.1 L57.7 196.3 L58.0 195.4 L58.2 194.6 L58.4 193.7 L58.7 192.8 L58.9 191.8 L59.1 190.9 L59.3 190.1 L59.5 189.3 L59.7 188.4 L59.9 187.6 L60.1 186.7 L60.3 185.9 L60.5 185.0 L60.7 184.1 L60.9 183.3 L61.1 182.4 L61.3 181.5 L61.5 180.6 L61.7 179.6 L61.9 178.7 L62.1 177.8 L62.3 176.9 L62.5 175.9 L62.7 175.0 L62.8 174.0 L63.0 173.0 L63.2 172.1 L63.4 171.1 L63.6 170.1 L63.8 169.1 L64.0 168.2 L64.2 167.2 L64.4 166.2 L64.6 165.2 L64.8 164.3 L64.9 163.5 L65.1 162.6 L65.3 161.8 L65.4 161.0 L65.6 160.1 L65.8 159.3 L65.9 158.4 L66.1 157.5 L66.3 156.7 L66.4 155.8 L66.6 155.0 L66.7 154.1 L66.9 153.2 L67.1 152.4 L67.2 151.5 L67.4 150.6 L67.6 149.8 L67.7 148.9 L67.9 148.0 L68.0 147.2 L68.2 146.3 L68.4 145.4 L68.5 144.5 L68.7 143.7 L68.9 142.8 L69.0 141.9 L69.2 141.0 L69.4 140.2 L69.5 139.3 L69.7 138.4 L69.8 137.6 L70.0 136.7 L70.2 135.8 L70.3 134.9 L70.5 134.1 L70.7 133.2 L70.8 132.3 L71.0 131.5 L71.2 130.6 L71.3 129.7 L71.5 128.9 L71.6 128.0 L71.8 127.1 L72.0 126.3 L72.1 125.4 L72.3 124.6 L72.5 123.7 L72.6 122.9 L72.8 122.0 L73.0 121.1 L73.1 120.3 L73.3 119.5 L73.4 118.6 L73.6 117.8 L73.8 116.9 L73.9 116.1 L74.1 115.1 L74.3 114.1 L74.5 113.1 L74.7 112.1 L74.9 111.1 L75.1 110.1 L75.3 109.1 L75.5 108.2 L75.7 107.2 L75.9 106.2 L76.1 105.3 L76.3 104.3 L76.5 103.3 L76.7 102.4 L76.9 101.5 L77.1 100.5 L77.3 99.6 L77.5 98.6 L77.7 97.7 L77.9 96.8 L78.1 95.9 L78.3 95.0 L78.5 94.1 L78.6 93.2 L78.8 92.3 L79.0 91.4 L79.2 90.5 L79.4 89.6 L79.6 88.7 L79.8 87.9 L80.0 87.0 L80.2 86.2 L80.4 85.3 L80.6 84.5 L80.8 83.6 L81.0 82.8 L81.2 82.0 L81.4 81.2 L81.6 80.4 L81.8 79.6 L82.0 78.6 L82.2 77.7 L82.5 76.8 L82.7 75.9 L82.9 75.0 L83.2 74.1 L83.4 73.2 L83.6 72.4 L83.9 71.5 L84.1 70.6 L84.3 69.8 L84.5 69.0 L84.8 68.1 L85.0 67.3 L85.2 66.5 L85.5 65.7 L85.7 64.9 L85.9 64.2 L86.2 63.3 L86.4 62.4 L86.7 61.6 L87.0 60.7 L87.2 59.9 L87.5 59.1 L87.7 58.3 L88.0 57.5 L88.3 56.7 L88.5 56.0 L88.8 55.2 L89.1 54.5 L89.3 53.7 L89.6 52.9 L89.9 52.1 L90.2 51.3 L90.5 50.6 L90.8 49.8 L91.1 49.1 L91.4 48.4 L91.7 47.6 L92.1 46.9 L92.4 46.1 L92.7 45.4 L93.0 44.7 L93.4 44.1 L93.7 43.3 L94.1 42.6 L94.4 42.0 L94.8 41.3 L95.2 40.6 L95.6 40.0 L96.0 39.3 L96.4 38.7 L96.8 38.1 L97.2 37.5 L97.7 36.9 L98.1 36.3 L98.6 35.7 L99.1 35.2 L99.6 34.7 L100.1 34.1 L100.6 33.7 L101.2 33.2 L101.7 32.7 L102.4 32.3 L103.0 31.9 L103.7 31.5 L104.4 31.2 L105.2 31.0 L106.0 30.8 L106.9 30.6 L107.8 30.6 L108.8 30.6 L109.7 30.7 L110.6 30.8 L111.4 31.0 L112.2 31.3 L112.9 31.6 L113.7 31.9 L114.3 32.2 L115.0 32.5 L115.7 32.9 L116.3 33.3 L117.0 33.6 L117.6 34.0 L118.2 34.4 L118.9 34.9 L119.4 35.3 L120.0 35.7 L120.6 36.1 L121.2 36.6 L121.8 37.0 L122.4 37.5 L123.0 38.0 L123.5 38.4 L124.1 38.9 L124.6 39.3 L125.2 39.8 L125.8 40.2 L126.3 40.7 L126.9 41.1 L127.4 41.6 L128.0 42.1 L128.5 42.5 L129.1 43.0 L129.7 43.4 L130.2 43.9 L130.8 44.3 L131.3 44.8 L131.9 45.2 L132.5 45.7 L133.1 46.2 L133.6 46.6 L134.2 47.1 L134.8 47.5 L135.4 48.0 L136.0 48.4 L136.6 48.8 L137.2 49.2 L137.8 49.7 L138.4 50.1 L139.0 50.5 L139.6 50.9 L140.2 51.3 L140.9 51.7 L141.5 52.1 L142.1 52.5 L142.8 52.8 L143.5 53.2 L144.1 53.6 L144.8 53.9 L145.5 54.3 L146.2 54.6 L146.9 54.9 L147.6 55.2 L148.3 55.6 L149.0 55.8 L149.7 56.1 L150.5 56.4 L151.2 56.7 L152.0 56.9 L152.8 57.2 L153.6 57.4 L154.4 57.6 L155.2 57.8 L156.0 58.0 L156.9 58.2 L157.7 58.3 L158.6 58.5 L159.5 58.6 L160.4 58.8 L161.3 58.9 L162.2 59.0 L163.1 59.0 L164.1 59.1 L165.1 59.1 L166.1 59.2 L167.0 59.2 L168.1 59.2 L169.1 59.2 L170.1 59.2 L171.1 59.2 L172.0 59.1 L173.0 59.1 L174.0 59.0 L174.9 59.0 L175.9 58.9 L176.8 58.8 L177.8 58.7 L178.7 58.7 L179.7 58.6 L180.6 58.5 L181.5 58.4 L182.4 58.3 L183.3 58.2 L184.3 58.1 L185.2 58.0 L186.1 58.0 L187.0 57.9 L187.9 57.8 L188.8 57.7 L189.7 57.6 L190.7 57.5 L191.6 57.4 L192.5 57.3 L193.4 57.2 L194.4 57.2 L195.3 57.1 L196.3 57.0 L197.2 56.9 L198.2 56.9 L199.1 56.8 L200.1 56.7 L201.0 56.7 L202.0 56.6 L202.9 56.6 L203.9 56.5 L204.9 56.5 L205.9 56.4 L206.9 56.4 L207.8 56.3 L208.8 56.3 L209.8 56.3 L210.8 56.2 L211.8 56.2 L212.8 56.2 L213.8 56.2 L214.8 56.2 L215.8 56.2 L216.8 56.2 L217.8 56.2 L218.9 56.2 L219.9 56.2 L220.9 56.2 L221.9 56.2 L222.9 56.2 L223.9 56.2 L224.9 56.2 L226.0 56.2 L226.9 56.3 L227.9 56.3 L228.9 56.3 L229.9 56.3 L230.9 56.4 L231.8 56.4 L232.8 56.4 L233.8 56.4 L234.8 56.5 L235.8 56.5 L236.8 56.5 L237.7 56.6 L238.7 56.6 L239.7 56.6 L240.7 56.7 L241.7 56.7 L242.6 56.7 L243.6 56.8 L244.6 56.8 L245.6 56.8 L246.6 56.9 L247.6 56.9 L248.5 56.9 L249.5 57.0 L250.5 57.0 L251.5 57.0 L252.5 57.1 L253.4 57.1 L254.4 57.1 L255.4 57.2 L256.4 57.2 L257.4 57.2 L258.3 57.2 L259.3 57.3 L260.3 57.3 L261.3 57.3 L262.3 57.4 L263.3 57.4 L264.2 57.4 L265.2 57.4 L266.2 57.5 L267.2 57.5 L268.2 57.5 L269.1 57.5 L270.1 57.5 L271.1 57.6 L272.1 57.6 L273.1 57.6 L274.1 57.6 L275.1 57.6 L276.1 57.7 L277.1 57.7 L278.1 57.7 L279.2 57.7 L280.2 57.7 L281.2 57.7 L282.2 57.8 L283.2 57.8 L284.2 57.8 L285.2 57.8 L286.3 57.8 L287.3 57.8 L288.3 57.8 L289.3 57.8 L290.3 57.9 L291.3 57.9 L292.3 57.9 L293.4 57.9 L294.4 57.9 L295.4 57.9 L296.4 57.9 L297.4 57.9 L298.4 58.0 L299.4 58.0 L300.5 58.0 L301.5 58.0 L302.5 58.0 L303.5 58.0 L304.5 58.0 L305.5 58.0 L306.5 58.0 L307.6 58.1 L308.6 58.1 L309.6 58.1 L310.6 58.1 L311.6 58.1 L312.6 58.1 L313.6 58.1 L314.6 58.1 L315.7 58.1 L316.7 58.2 L317.7 58.2 L318.7 58.2 L319.7 58.2 L320.7 58.2 L321.7 58.2 L322.8 58.2 L323.8 58.2 L324.8 58.2 L325.8 58.3 L326.8 58.3 L327.8 58.3 L328.8 58.3 L329.9 58.3 L330.9 58.3 L331.9 58.3 L332.9 58.3 L333.9 58.4 L334.9 58.4 L335.9 58.4 L337.0 58.4 L338.0 58.4 L339.0 58.4 L340.0 58.4 L341.0 58.4 L342.0 58.4 L343.0 58.5 L344.1 58.5 L345.1 58.5 L346.1 58.5 L347.1 58.5 L348.1 58.5 L349.1 58.5 L350.1 58.5 L351.2 58.6 L352.2 58.6 L353.2 58.6 L354.2 58.6 L355.2 58.6 L356.2 58.6 L357.2 58.6 L358.3 58.6 L359.3 58.7 L360.3 58.7 L361.3 58.7 L362.3 58.7 L363.3 58.7 L364.3 58.7 L365.4 58.7 L366.4 58.7 L367.4 58.7 L368.4 58.8 L369.4 58.8 L370.4 58.8 L371.4 58.8 L372.5 58.8 L373.5 58.8 L374.5 58.8 L375.5 58.8 L376.5 58.8 L377.5 58.9 L378.5 58.9 L379.6 58.9 L380.6 58.9 L381.6 58.9 L382.6 58.9 L383.6 58.9 L384.6 58.9 L385.6 58.9 L386.7 59.0 L387.7 59.0 L388.7 59.0 L389.7 59.0 L390.7 59.0 L391.7 59.0 L392.7 59.0 L393.8 59.0 L394.8 59.0 L395.8 59.1 L396.8 59.1 L397.8 59.1 L398.8 59.1 L399.8 59.1 L400.9 59.1 L401.9 59.1 L402.9 59.1 L403.9 59.1 L404.9 59.1 L405.9 59.2 L406.9 59.2 L408.0 59.2 L409.0 59.2 L410.0 59.2 L411.0 59.2 L412.0 59.2 L413.0 59.2 L414.0 59.2 L415.0 59.2 L416.1 59.2 L417.1 59.3 L418.1 59.3 L419.1 59.3 L420.1 59.3 L421.1 59.3 L422.1 59.3 L423.2 59.3 L424.2 59.3 L425.2 59.3 L426.2 59.3 L427.2 59.4 L428.2 59.4 L429.2 59.4 L430.3 59.4 L431.3 59.4 L432.3 59.4 L433.3 59.4 L434.3 59.4 L435.3 59.4 L436.3 59.4 L437.4 59.4 L438.4 59.4 L439.4 59.5 L440.4 59.5 L441.4 59.5 L442.4 59.5 L443.4 59.5 L444.5 59.5 L445.5 59.5 L446.5 59.5 L447.5 59.5 L448.5 59.5 L449.5 59.5 L450.5 59.6 L451.6 59.6 L452.6 59.6 L453.6 59.6 L454.6 59.6 L455.6 59.6 L456.6 59.6 L457.6 59.6 L458.7 59.6 L459.7 59.6 L460.7 59.6 L461.7 59.6 L462.7 59.7 L463.7 59.7 L464.7 59.7 L465.8 59.7 L466.8 59.7 L467.8 59.7 L468.8 59.7 L469.8 59.7 L470.8 59.7 L471.8 59.7 L472.9 59.7 L473.9 59.7 L474.9 59.8 L475.9 59.8 L476.9 59.8 L477.9 59.8 L478.9 59.8 L480.0 59.8 L481.0 59.8 L482.0 59.8 L483.0 59.8 L484.0 59.8 L485.0 59.8 L486.0 59.8 L487.1 59.8 L488.1 59.9 L489.1 59.9 L490.1 59.9 L491.1 59.9 L492.1 59.9 L493.1 59.9 L494.2 59.9 L495.2 59.9 L496.2 59.9 L497.2 59.9 L498.2 59.9 L499.2 59.9 L500.2 59.9 L501.3 59.9 L502.3 60.0 L503.3 60.0" fill="none" stroke="currentColor" stroke-width="2.0" stroke-dasharray="7 4"/>
  <path d="M46.0 216.0 L47.0 216.0 L47.9 215.8 L48.6 215.6 L49.3 215.2 L49.9 214.8 L50.4 214.3 L50.9 213.7 L51.3 213.1 L51.8 212.4 L52.2 211.8 L52.5 211.1 L52.9 210.4 L53.2 209.7 L53.5 209.0 L53.9 208.2 L54.1 207.5 L54.4 206.8 L54.7 206.0 L55.0 205.1 L55.3 204.4 L55.6 203.6 L55.8 202.8 L56.1 202.0 L56.3 201.1 L56.6 200.2 L56.8 199.5 L57.1 198.7 L57.3 197.8 L57.5 197.0 L57.7 196.2 L58.0 195.3 L58.2 194.4 L58.4 193.5 L58.7 192.6 L58.9 191.7 L59.1 190.8 L59.3 189.9 L59.5 189.1 L59.7 188.3 L59.9 187.5 L60.1 186.6 L60.3 185.7 L60.5 184.9 L60.7 184.0 L60.9 183.1 L61.1 182.2 L61.3 181.3 L61.5 180.4 L61.7 179.5 L61.9 178.6 L62.1 177.7 L62.3 176.7 L62.5 175.8 L62.7 174.9 L62.8 173.9 L63.0 173.0 L63.2 172.0 L63.4 171.0 L63.6 170.1 L63.8 169.1 L64.0 168.1 L64.2 167.1 L64.4 166.1 L64.6 165.1 L64.8 164.1 L65.0 163.1 L65.2 162.1 L65.4 161.3 L65.5 160.5 L65.7 159.6 L65.9 158.8 L66.0 157.9 L66.2 157.1 L66.3 156.2 L66.5 155.4 L66.7 154.5 L66.8 153.7 L67.0 152.8 L67.2 152.0 L67.3 151.1 L67.5 150.3 L67.7 149.4 L67.8 148.6 L68.0 147.7 L68.1 146.9 L68.3 146.0 L68.5 145.1 L68.6 144.3 L68.8 143.4 L69.0 142.6 L69.1 141.7 L69.3 140.9 L69.5 140.0 L69.6 139.1 L69.8 138.3 L69.9 137.4 L70.1 136.6 L70.3 135.7 L70.4 134.9 L70.6 134.0 L70.8 133.2 L70.9 132.3 L71.1 131.5 L71.3 130.6 L71.4 129.8 L71.6 128.9 L71.7 128.1 L71.9 127.3 L72.1 126.4 L72.3 125.4 L72.5 124.4 L72.7 123.4 L72.9 122.4 L73.1 121.4 L73.3 120.5 L73.4 119.5 L73.6 118.5 L73.8 117.5 L74.0 116.5 L74.2 115.6 L74.4 114.6 L74.6 113.6 L74.8 112.7 L75.0 111.7 L75.2 110.8 L75.4 109.8 L75.6 108.9 L75.8 108.0 L76.0 107.0 L76.2 106.1 L76.4 105.2 L76.6 104.3 L76.8 103.4 L77.0 102.5 L77.2 101.6 L77.4 100.7 L77.6 99.8 L77.8 98.9 L78.0 98.0 L78.2 97.1 L78.4 96.3 L78.6 95.4 L78.7 94.6 L78.9 93.7 L79.1 92.9 L79.3 92.0 L79.5 91.2 L79.7 90.4 L79.9 89.5 L80.1 88.7 L80.3 87.9 L80.5 87.0 L80.8 86.1 L81.0 85.1 L81.2 84.2 L81.5 83.3 L81.7 82.4 L81.9 81.6 L82.1 80.7 L82.4 79.8 L82.6 79.0 L82.8 78.1 L83.1 77.3 L83.3 76.5 L83.5 75.6 L83.8 74.8 L84.0 74.0 L84.2 73.3 L84.4 72.5 L84.7 71.6 L85.0 70.7 L85.2 69.9 L85.5 69.0 L85.7 68.2 L86.0 67.4 L86.3 66.6 L86.5 65.8 L86.8 65.0 L87.1 64.2 L87.3 63.5 L87.6 62.7 L87.9 61.9 L88.2 61.1 L88.5 60.3 L88.8 59.6 L89.1 58.8 L89.3 58.1 L89.6 57.3 L89.9 56.6 L90.3 55.9 L90.6 55.1 L90.9 54.4 L91.2 53.7 L91.6 53.0 L91.9 52.3 L92.3 51.6 L92.6 50.9 L93.0 50.2 L93.3 49.6 L93.7 48.9 L94.1 48.2 L94.5 47.6 L94.9 47.0 L95.3 46.3 L95.8 45.7 L96.2 45.1 L96.7 44.5 L97.1 44.0 L97.6 43.4 L98.1 42.9 L98.6 42.4 L99.2 41.9 L99.7 41.4 L100.3 41.0 L101.0 40.6 L101.6 40.2 L102.3 39.8 L103.0 39.5 L103.8 39.3 L104.6 39.1 L105.5 39.0 L106.5 38.9 L107.5 38.9 L108.4 39.1 L109.2 39.2 L110.1 39.5 L110.8 39.7 L111.6 40.0 L112.3 40.3 L113.0 40.6 L113.7 41.0 L114.3 41.3 L115.0 41.7 L115.6 42.1 L116.3 42.5 L116.9 42.9 L117.5 43.3 L118.1 43.7 L118.7 44.1 L119.3 44.6 L119.9 45.0 L120.5 45.4 L121.1 45.9 L121.7 46.3 L122.3 46.8 L122.8 47.2 L123.4 47.7 L124.0 48.1 L124.6 48.6 L125.2 49.1 L125.8 49.5 L126.4 50.0 L127.0 50.5 L127.6 50.9 L128.1 51.4 L128.7 51.8 L129.3 52.3 L129.9 52.7 L130.5 53.1 L131.1 53.6 L131.7 54.0 L132.3 54.4 L132.9 54.8 L133.5 55.3 L134.1 55.7 L134.7 56.1 L135.3 56.5 L136.0 56.9 L136.6 57.3 L137.2 57.7 L137.9 58.1 L138.5 58.4 L139.2 58.8 L139.8 59.2 L140.5 59.5 L141.2 59.9 L141.9 60.2 L142.6 60.5 L143.3 60.9 L144.0 61.2 L144.7 61.5 L145.5 61.7 L146.2 62.0 L147.0 62.3 L147.7 62.5 L148.5 62.8 L149.3 63.0 L150.1 63.2 L150.9 63.4 L151.7 63.6 L152.6 63.8 L153.4 63.9 L154.3 64.1 L155.2 64.2 L156.1 64.3 L157.0 64.4 L158.0 64.5 L158.9 64.6 L159.9 64.6 L160.9 64.7 L161.8 64.7 L162.9 64.7 L163.9 64.7 L164.9 64.7 L165.8 64.7 L166.8 64.6 L167.8 64.6 L168.7 64.5 L169.7 64.4 L170.6 64.4 L171.6 64.3 L172.5 64.2 L173.4 64.1 L174.3 64.0 L175.3 63.9 L176.2 63.8 L177.1 63.7 L178.0 63.6 L178.9 63.5 L179.8 63.4 L180.8 63.3 L181.7 63.2 L182.6 63.1 L183.5 63.0 L184.4 62.9 L185.3 62.7 L186.2 62.6 L187.2 62.5 L188.1 62.4 L189.0 62.3 L189.9 62.3 L190.8 62.2 L191.7 62.1 L192.7 62.0 L193.6 61.9 L194.6 61.8 L195.5 61.7 L196.5 61.7 L197.4 61.6 L198.4 61.5 L199.3 61.4 L200.2 61.4 L201.2 61.3 L202.1 61.3 L203.1 61.2 L204.1 61.2 L205.1 61.1 L206.1 61.1 L207.1 61.1 L208.0 61.0 L209.0 61.0 L210.0 61.0 L211.0 60.9 L212.0 60.9 L213.0 60.9 L214.0 60.9 L215.0 60.9 L216.0 60.9 L217.0 60.9 L218.0 60.9 L219.1 60.9 L220.1 60.9 L221.1 60.9 L222.1 60.9 L223.1 60.9 L224.1 60.9 L225.1 60.9 L226.2 60.9 L227.2 60.9 L228.2 60.9 L229.2 60.9 L230.2 61.0 L231.2 61.0 L232.2 61.0 L233.3 61.0 L234.3 61.0 L235.3 61.0 L236.3 61.1 L237.3 61.1 L238.3 61.1 L239.3 61.1 L240.4 61.1 L241.4 61.1 L242.4 61.2 L243.4 61.2 L244.4 61.2 L245.4 61.2 L246.4 61.2 L247.5 61.2 L248.5 61.3 L249.5 61.3 L250.5 61.3 L251.5 61.3 L252.5 61.3 L253.5 61.3 L254.6 61.3 L255.6 61.4 L256.6 61.4 L257.6 61.4 L258.6 61.4 L259.6 61.4 L260.6 61.4 L261.7 61.4 L262.7 61.4 L263.7 61.4 L264.7 61.4 L265.7 61.4 L266.7 61.4 L267.7 61.4 L268.8 61.4 L269.8 61.4 L270.8 61.4 L271.8 61.4 L272.8 61.4 L273.8 61.4 L274.8 61.4 L275.9 61.4 L276.9 61.4 L277.9 61.4 L278.9 61.4 L279.9 61.4 L280.9 61.4 L281.9 61.4 L282.9 61.4 L284.0 61.4 L285.0 61.4 L286.0 61.4 L287.0 61.4 L288.0 61.4 L289.0 61.4 L290.0 61.4 L291.1 61.4 L292.1 61.4 L293.1 61.4 L294.1 61.4 L295.1 61.4 L296.1 61.4 L297.1 61.4 L298.2 61.4 L299.2 61.4 L300.2 61.4 L301.2 61.4 L302.2 61.4 L303.2 61.4 L304.2 61.4 L305.3 61.4 L306.3 61.4 L307.3 61.4 L308.3 61.4 L309.3 61.4 L310.3 61.4 L311.3 61.4 L312.4 61.4 L313.4 61.4 L314.4 61.4 L315.4 61.4 L316.4 61.4 L317.4 61.4 L318.4 61.4 L319.5 61.4 L320.5 61.4 L321.5 61.4 L322.5 61.4 L323.5 61.4 L324.5 61.4 L325.5 61.4 L326.6 61.4 L327.6 61.4 L328.6 61.4 L329.6 61.4 L330.6 61.4 L331.6 61.4 L332.6 61.4 L333.7 61.4 L334.7 61.4 L335.7 61.4 L336.7 61.4 L337.7 61.4 L338.7 61.4 L339.7 61.4 L340.8 61.4 L341.8 61.4 L342.8 61.4 L343.8 61.4 L344.8 61.4 L345.8 61.4 L346.8 61.4 L347.9 61.4 L348.9 61.4 L349.9 61.4 L350.9 61.4 L351.9 61.4 L352.9 61.4 L353.9 61.4 L355.0 61.4 L356.0 61.4 L357.0 61.4 L358.0 61.4 L359.0 61.4 L360.0 61.4 L361.0 61.4 L362.1 61.4 L363.1 61.4 L364.1 61.4 L365.1 61.4 L366.1 61.4 L367.1 61.4 L368.1 61.4 L369.2 61.4 L370.2 61.4 L371.2 61.4 L372.2 61.4 L373.2 61.4 L374.2 61.4 L375.2 61.4 L376.3 61.4 L377.3 61.4 L378.3 61.4 L379.3 61.4 L380.3 61.4 L381.3 61.4 L382.3 61.4 L383.3 61.4 L384.4 61.4 L385.4 61.4 L386.4 61.4 L387.4 61.4 L388.4 61.4 L389.4 61.4 L390.4 61.4 L391.5 61.4 L392.5 61.4 L393.5 61.4 L394.5 61.4 L395.5 61.4 L396.5 61.4 L397.5 61.4 L398.6 61.4 L399.6 61.4 L400.6 61.4 L401.6 61.4 L402.6 61.4 L403.6 61.4 L404.6 61.4 L405.7 61.4 L406.7 61.4 L407.7 61.4 L408.7 61.4 L409.7 61.4 L410.7 61.4 L411.7 61.4 L412.8 61.4 L413.8 61.4 L414.8 61.4 L415.8 61.4 L416.8 61.4 L417.8 61.4 L418.8 61.4 L419.9 61.4 L420.9 61.4 L421.9 61.4 L422.9 61.4 L423.9 61.4 L424.9 61.4 L425.9 61.4 L427.0 61.4 L428.0 61.4 L429.0 61.4 L430.0 61.4 L431.0 61.4 L432.0 61.4 L433.0 61.4 L434.1 61.4 L435.1 61.4 L436.1 61.4 L437.1 61.4 L438.1 61.4 L439.1 61.4 L440.1 61.4 L441.2 61.4 L442.2 61.4 L443.2 61.4 L444.2 61.4 L445.2 61.4 L446.2 61.4 L447.2 61.4 L448.3 61.4 L449.3 61.4 L450.3 61.4 L451.3 61.4 L452.3 61.4 L453.3 61.4 L454.3 61.4 L455.4 61.4 L456.4 61.4 L457.4 61.4 L458.4 61.4 L459.4 61.4 L460.4 61.4 L461.4 61.4 L462.5 61.4 L463.5 61.4 L464.5 61.4 L465.5 61.4 L466.5 61.4 L467.5 61.4 L468.5 61.4 L469.6 61.4 L470.6 61.4 L471.6 61.4 L472.6 61.4 L473.6 61.4 L474.6 61.4 L475.6 61.4 L476.7 61.4 L477.7 61.4 L478.7 61.4 L479.7 61.4 L480.7 61.4 L481.7 61.4 L482.7 61.4 L483.7 61.4 L484.8 61.4 L485.8 61.4 L486.8 61.4 L487.8 61.4 L488.8 61.4 L489.8 61.4 L490.8 61.4 L491.9 61.4 L492.9 61.4 L493.9 61.4 L494.9 61.4 L495.9 61.4 L496.9 61.4 L497.9 61.4 L499.0 61.4 L500.0 61.4 L501.0 61.4 L502.0 61.4 L503.0 61.4" fill="none" stroke="currentColor" stroke-width="2.0" stroke-dasharray="2 3"/>
  <path d="M330.0 118.0 L356.0 118.0" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="362.0" y="122.0" font-size="12">uncompensated</text>
  <path d="M330.0 136.0 L356.0 136.0" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 4"/>
  <text x="362.0" y="140.0" font-size="12">lag 0.1 / 0.01</text>
  <path d="M330.0 154.0 L356.0 154.0" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2 3"/>
  <text x="362.0" y="158.0" font-size="12">lag 0.01 / 0.001</text>
</svg>
<figcaption>Step responses, 15% design. The 0.1/0.01 lag adds a +0.063 e^(−0.106t) tail that lifts the overshoot to 20.5% and holds the response outside 2% until 10.8 s. The 0.01/0.001 lag leaves the step response almost untouched.</figcaption>
</figure>

For a step into this Type 1 loop the slow term rides on top of the response. A residue of $0.063$
lifts the overshoot by five points and keeps the output outside the $2\\%$ band until it decays, which
takes $\\ln(0.063/0.02)/0.106=10.8$ s. Moving the pair ten times closer to the origin cuts the residue
by about ten and the step response is essentially the uncompensated one.

The opposing cost shows up on the ramp. The ramp error reaches its new, smaller final value only as
fast as the slow pole decays: within $10\\%$ of final after $43$ s for $0.1/0.01$ and after $448$ s for
$0.01/0.001$. Pick the pair by which response the specification cares about, and confirm it by
simulation. The usual starting point, $p_{c}=0.01$, is a starting point.
`
    },
    {
      title: "9.3: Ideal derivative compensation (PD)",
      sec: "9.3",
      example: "9-15",
      body: `
A single zero in the forward path,

$$G_{c}(s)=s+z_{c},$$

adds positive angle at every point above the real axis. Positive angle means the locus must move left
to recover $-180^\\circ$, so the complex branches bend away from the $j\\omega$ axis and cross a given
$\\zeta$ line farther out. Farther out on the same line means the same $\\%OS$, a larger $\\omega_{n}$,
and so smaller $T_{s}$ and $T_{p}$.

Where the zero goes decides how much it helps, and at what cost. In 9-15, for
$\\dfrac{K}{(s+1)(s+4)(s+7)}$ on the $\\zeta=0.5$ line:

| Zero | Dominant pair | $K$ | $T_{s}$ (s) | Third pole | $K_{p}$ |
|---|---|---|---|---|---|
| none | $-1.625\\pm j2.815$ | $64.4$ | $2.46$ | $-8.75$ | $2.30$ |
| $-8$ | $-2.290\\pm j3.966$ | $16.0$ | $1.75$ | $-7.42$ | $4.56$ |
| $-5$ | $-3.392\\pm j5.876$ | $42.4$ | $1.18$ | $-5.22$ | $7.57$ |
| $-2$ | $-5.058\\pm j8.761$ | $82.4$ | $0.79$ | $-1.88$ | $5.89$ |

The closer the zero to the dominant region, the more angle it adds and the faster the pair. The
third pole follows the zero: once the zero sits among the plant poles, a real closed-loop pole lands
near it, and the second-order prediction rests on how well that pole and zero cancel.

The error constant changed even though nothing was added for error. That depends on the plant and the
zero, so it is a side effect to compute, not a property to rely on.

### Implementation and noise

$$G_{c}(s)=K_{2}s+K_{1}=K_{2}\\left(s+\\frac{K_{1}}{K_{2}}\\right)$$

$K_{2}$ is the root-locus gain and $z_{c}=K_{1}/K_{2}$. The magnitude $|G_{c}(j\\omega)|$ grows without
bound as $\\omega$ increases, so sensor noise at high frequency is amplified in proportion to its
frequency. That, and the active circuit it needs, is the reason for the lead compensator.
`
    },
    {
      title: "9.3: Designing the PD zero",
      sec: "9.3",
      example: "9-13",
      body: `
### Procedure

1. Turn the specifications into a design point. $\\%OS$ gives $\\zeta$ and the angle
   $\\theta=\\cos^{-1}\\zeta$; settling time gives $\\sigma=4/T_{s}$; then $\\omega_{d}=\\sigma\\tan\\theta$.
2. Add the angles from the plant's poles and zeros to the design point.
3. The zero must supply $\\theta_{z}=-180^\\circ-\\angle G$.
4. Place it: from the geometry, the zero at $-z_{c}$ with $z_{c}=\\sigma+\\dfrac{\\omega_{d}}{\\tan\\theta_{z}}$.
5. $K$ from the magnitude criterion. Find every other closed-loop pole at that $K$.
6. Judge the second-order approximation, then simulate.

### On the running example

Halving $T_{s}=3.62$ s gives $\\sigma=2.210$ and $\\omega_{d}=2.210\\tan58.87^\\circ=3.660$. The angle
deficit at $B$ was found above: $\\theta_{z}=51.26^\\circ$. So

$$z_{c}=2.210+\\frac{3.660}{\\tan51.26^\\circ}=2.210+2.937=5.147$$

$$K=\\frac{|B|\\,|B+3|\\,|B+8|}{|B+5.147|}=\\frac{4.276\\cdot3.745\\cdot6.850}{4.693}=23.4$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 481" class="nx-fig">
  <defs><marker id="nx9e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 238.3 L482.0 238.3" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9e)"/>
  <path d="M439.6 447.0 L439.6 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9e)"/>
  <text x="476.0" y="256.3" font-size="13">&#963;</text>
  <text x="445.6" y="30.0" font-size="13">j&#969;</text>
  <path d="M130.6 235.3 L130.6 241.3" stroke="currentColor" stroke-width="1"/>
  <text x="130.6" y="253.3" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M207.8 235.3 L207.8 241.3" stroke="currentColor" stroke-width="1"/>
  <text x="207.8" y="253.3" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M285.1 235.3 L285.1 241.3" stroke="currentColor" stroke-width="1"/>
  <text x="285.1" y="253.3" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M362.4 235.3 L362.4 241.3" stroke="currentColor" stroke-width="1"/>
  <text x="362.4" y="253.3" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M436.6 392.9 L442.6 392.9" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="396.9" font-size="11" text-anchor="end" opacity=".75">−j4</text>
  <path d="M436.6 315.6 L442.6 315.6" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="319.6" font-size="11" text-anchor="end" opacity=".75">−j2</text>
  <path d="M436.6 161.1 L442.6 161.1" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="165.1" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M436.6 83.8 L442.6 83.8" stroke="currentColor" stroke-width="1"/>
  <text x="433.6" y="87.8" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M439.6 238.3 L438.4 238.3 L437.2 238.3 L436.0 238.3 L434.8 238.3 L433.6 238.3 L432.4 238.3 L431.2 238.3 L430.0 238.3 L428.8 238.3 L427.5 238.3 L426.3 238.3 L425.1 238.3 L423.9 238.3 L422.6 238.3 L421.4 238.3 L420.1 238.3 L418.9 238.3 L417.7 238.3 L416.5 238.3 L415.2 238.3 L413.9 238.3 L412.7 238.3 L411.4 238.3 L410.1 238.3 L408.9 238.3 L407.5 238.3 L406.3 238.3 L404.9 238.3 L403.6 238.3 L402.3 238.3 L401.0 238.3 L399.7 238.3 L398.3 238.3 L397.0 238.3 L395.6 238.3 L394.4 238.3 L393.1 238.3 L391.7 238.3 L390.1 238.3 L388.8 238.3 L387.3 238.3 L385.5 238.3 L384.2 238.3 L382.6 238.3 L380.3 238.3 L378.5 238.3 L376.2 235.8 L376.2 234.1 L376.1 232.9 L376.1 231.1 L376.1 229.6 L376.0 228.3 L376.0 226.7 L375.9 225.2 L375.9 223.9 L375.8 222.6 L375.7 221.5 L375.7 220.0 L375.6 218.7 L375.5 217.4 L375.4 216.2 L375.3 215.0 L375.2 213.8 L375.1 212.5 L375.0 211.1 L374.9 209.8 L374.8 208.6 L374.7 207.3 L374.6 206.1 L374.5 205.0 L374.4 203.8 L374.2 202.7 L374.1 201.5 L374.0 200.4 L373.9 199.3 L373.7 198.2 L373.6 197.1 L373.5 196.1 L373.3 195.0 L373.2 193.7 L373.0 192.5 L372.8 191.2 L372.7 189.9 L372.5 188.7 L372.3 187.5 L372.1 186.2 L371.9 185.0 L371.7 183.7 L371.5 182.5 L371.4 181.2 L371.2 180.2 L371.0 179.2 L370.8 178.1 L370.7 177.1 L370.5 176.0 L370.3 175.0 L370.1 173.9 L369.9 172.9 L369.8 171.8 L369.6 170.8 L369.4 169.7 L369.2 168.6 L369.0 167.6 L368.8 166.5 L368.6 165.4 L368.4 164.3 L368.2 163.2 L368.0 162.1 L367.7 161.0 L367.5 159.9 L367.3 158.8 L367.1 157.7 L366.8 156.5 L366.6 155.4 L366.4 154.3 L366.1 153.1 L365.9 151.9 L365.7 150.8 L365.4 149.6 L365.2 148.4 L364.9 147.2 L364.7 146.0 L364.4 144.8 L364.2 143.6 L363.9 142.3 L363.7 141.3 L363.5 140.3 L363.2 139.3 L363.0 138.3 L362.8 137.3 L362.6 136.3 L362.4 135.2 L362.1 134.2 L361.9 133.2 L361.7 132.1 L361.5 131.0 L361.2 130.0 L361.0 128.9 L360.8 127.8 L360.5 126.7 L360.3 125.6 L360.0 124.5 L359.8 123.4 L359.6 122.3 L359.3 121.1 L359.1 120.0 L358.8 118.8 L358.6 117.7 L358.3 116.5 L358.1 115.3 L357.8 114.1 L357.6 113.0 L357.3 111.7 L357.0 110.5 L356.8 109.3 L356.5 108.1 L356.3 106.8 L356.0 105.6 L355.7 104.3 L355.5 103.0 L355.2 101.8 L355.0 100.5 L354.7 99.2 L354.4 97.9 L354.2 96.5 L353.9 95.2 L353.7 94.2 L353.5 93.2 L353.3 92.2 L353.1 91.1 L352.9 90.1 L352.7 89.1 L352.5 88.0 L352.3 87.0 L352.1 85.9 L351.9 84.9 L351.7 83.8 L351.5 82.7 L351.3 81.6 L351.1 80.6 L350.9 79.5 L350.7 78.4 L350.5 77.3 L350.3 76.1 L350.1 75.0 L349.9 73.9 L349.7 72.8 L349.5 71.6 L349.3 70.5 L349.1 69.3 L349.0 68.2 L348.8 67.0 L348.6 65.8 L348.4 64.7 L348.2 63.5 L348.0 62.3 L347.8 61.1 L347.6 59.9 L347.4 58.7 L347.2 57.5 L347.0 56.2 L346.9 55.0 L346.7 53.8 L346.5 52.5 L346.3 51.3 L346.1 50.0 L345.9 48.8 L345.8 47.5 L345.6 46.2 L345.4 44.9 L345.2 43.6 L345.0 42.3 L344.9 41.0 L344.7 39.7 L344.5 38.4 L344.3 37.1 L344.2 35.7 L344.0 34.4 L343.8 33.0 L343.7 31.7 L343.5 30.3 L343.3 29.0 L343.2 27.6 L343.0 26.2 L342.8 24.8 L342.7 23.4 L342.5 22.0 L342.3 22.0 L342.2 22.0 L342.0 22.0 L341.9 22.0 L341.7 22.0 L341.6 22.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(367.3 158.8) rotate(-101.2)"/>
  <path d="M323.7 238.3 L324.9 238.3 L326.1 238.3 L327.4 238.3 L328.6 238.3 L329.8 238.3 L331.0 238.3 L332.2 238.3 L333.4 238.3 L334.6 238.3 L335.8 238.3 L337.1 238.3 L338.3 238.3 L339.5 238.3 L340.8 238.3 L342.0 238.3 L343.2 238.3 L344.5 238.3 L345.8 238.3 L347.0 238.3 L348.3 238.3 L349.6 238.3 L350.8 238.3 L352.1 238.3 L353.3 238.3 L354.7 238.3 L356.0 238.3 L357.4 238.3 L358.7 238.3 L360.1 238.3 L361.4 238.3 L362.9 238.3 L364.1 238.3 L365.5 238.3 L367.1 238.3 L368.4 238.3 L369.9 238.3 L372.1 238.3 L373.9 238.3 L376.2 240.8 L376.2 242.6 L376.1 243.8 L376.1 245.6 L376.1 247.1 L376.0 248.4 L376.0 250.0 L375.9 251.5 L375.9 252.8 L375.8 254.1 L375.7 255.2 L375.7 256.7 L375.6 258.0 L375.5 259.3 L375.4 260.5 L375.3 261.7 L375.2 262.9 L375.1 264.2 L375.0 265.6 L374.9 266.9 L374.8 268.1 L374.7 269.3 L374.6 270.5 L374.5 271.7 L374.4 272.9 L374.2 274.0 L374.1 275.2 L374.0 276.3 L373.9 277.4 L373.7 278.5 L373.6 279.5 L373.5 280.6 L373.3 281.7 L373.2 283.0 L373.0 284.2 L372.8 285.5 L372.7 286.7 L372.5 288.0 L372.3 289.2 L372.1 290.5 L371.9 291.7 L371.7 293.0 L371.5 294.2 L371.4 295.4 L371.2 296.5 L371.0 297.5 L370.8 298.6 L370.7 299.6 L370.5 300.6 L370.3 301.7 L370.1 302.7 L369.9 303.8 L369.8 304.8 L369.6 305.9 L369.4 307.0 L369.2 308.0 L369.0 309.1 L368.8 310.2 L368.6 311.3 L368.4 312.4 L368.2 313.5 L368.0 314.5 L367.7 315.7 L367.5 316.8 L367.3 317.9 L367.1 319.0 L366.8 320.1 L366.6 321.3 L366.4 322.4 L366.1 323.6 L365.9 324.7 L365.7 325.9 L365.4 327.1 L365.2 328.3 L364.9 329.5 L364.7 330.7 L364.4 331.9 L364.2 333.1 L363.9 334.3 L363.7 335.3 L363.5 336.3 L363.2 337.3 L363.0 338.4 L362.8 339.4 L362.6 340.4 L362.4 341.4 L362.1 342.5 L361.9 343.5 L361.7 344.6 L361.5 345.6 L361.2 346.7 L361.0 347.8 L360.8 348.9 L360.5 350.0 L360.3 351.1 L360.0 352.2 L359.8 353.3 L359.6 354.4 L359.3 355.6 L359.1 356.7 L358.8 357.8 L358.6 359.0 L358.3 360.2 L358.1 361.4 L357.8 362.5 L357.6 363.7 L357.3 364.9 L357.0 366.2 L356.8 367.4 L356.5 368.6 L356.3 369.8 L356.0 371.1 L355.7 372.4 L355.5 373.6 L355.2 374.9 L355.0 376.2 L354.7 377.5 L354.4 378.8 L354.2 380.1 L353.9 381.5 L353.7 382.5 L353.5 383.5 L353.3 384.5 L353.1 385.5 L352.9 386.6 L352.7 387.6 L352.5 388.7 L352.3 389.7 L352.1 390.8 L351.9 391.8 L351.7 392.9 L351.5 394.0 L351.3 395.0 L351.1 396.1 L350.9 397.2 L350.7 398.3 L350.5 399.4 L350.3 400.5 L350.1 401.7 L349.9 402.8 L349.7 403.9 L349.5 405.1 L349.3 406.2 L349.1 407.3 L349.0 408.5 L348.8 409.7 L348.6 410.8 L348.4 412.0 L348.2 413.2 L348.0 414.4 L347.8 415.6 L347.6 416.8 L347.4 418.0 L347.2 419.2 L347.0 420.4 L346.9 421.7 L346.7 422.9 L346.5 424.2 L346.3 425.4 L346.1 426.7 L345.9 427.9 L345.8 429.2 L345.6 430.5 L345.4 431.8 L345.2 433.1 L345.0 434.4 L344.9 435.7 L344.7 437.0 L344.5 438.3 L344.3 439.6 L344.2 441.0 L344.0 442.3 L343.8 443.6 L343.7 445.0 L343.5 446.4 L343.3 447.0 L343.2 447.0 L343.0 447.0 L342.8 447.0 L342.7 447.0 L342.5 447.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(367.1 319.0) rotate(101.3)"/>
  <path d="M130.6 238.3 L131.8 238.3 L133.0 238.3 L134.2 238.3 L135.4 238.3 L136.6 238.3 L137.8 238.3 L139.0 238.3 L140.2 238.3 L141.4 238.3 L142.7 238.3 L143.9 238.3 L145.1 238.3 L146.3 238.3 L147.5 238.3 L148.8 238.3 L150.0 238.3 L151.2 238.3 L152.4 238.3 L153.6 238.3 L154.9 238.3 L156.2 238.3 L157.4 238.3 L158.7 238.3 L159.9 238.3 L161.2 238.3 L162.4 238.3 L163.7 238.3 L164.9 238.3 L166.2 238.3 L167.5 238.3 L168.7 238.3 L169.9 238.3 L171.2 238.3 L172.5 238.3 L173.8 238.3 L175.0 238.3 L176.2 238.3 L177.5 238.3 L178.7 238.3 L180.0 238.3 L181.3 238.3 L182.6 238.3 L183.9 238.3 L185.2 238.3 L186.6 238.3 L187.9 238.3 L189.2 238.3 L190.5 238.3 L191.9 238.3 L193.2 238.3 L194.5 238.3 L195.8 238.3 L197.1 238.3 L198.4 238.3 L199.6 238.3 L200.9 238.3 L202.1 238.3 L203.3 238.3 L204.6 238.3 L205.9 238.3 L207.1 238.3 L208.3 238.3 L209.6 238.3 L210.8 238.3 L212.0 238.3 L213.3 238.3 L214.5 238.3 L215.8 238.3 L217.1 238.3 L218.3 238.3 L219.5 238.3 L220.8 238.3 L222.0 238.3 L223.2 238.3 L224.4 238.3 L225.7 238.3 L226.9 238.3 L228.1 238.3 L229.4 238.3 L230.6 238.3 L231.8 238.3 L233.0 238.3 L234.2 238.3 L235.4 238.3 L236.6 238.3 L237.8 238.3 L239.0 238.3 L240.2 238.3" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(186.6 238.3) rotate(0.0)"/>
  <path d="M433.6 232.3 L445.6 244.3 M445.6 232.3 L433.6 244.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M317.7 232.3 L329.7 244.3 M329.7 232.3 L317.7 244.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M124.6 232.3 L136.6 244.3 M136.6 232.3 L124.6 244.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="240.8" cy="238.3" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M439.6 238.3 L309.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="181.5" y="234.3" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="350.2" y="92.9" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="350.2" y="375.8" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="364.2" y="100.9" font-size="12" text-anchor="start">B, K = 23.4</text>
  <text x="185.5" y="226.3" font-size="11" text-anchor="middle">−6.58</text>
  <text x="240.8" y="260.3" font-size="11" text-anchor="middle">−5.15</text>
  <rect x="392.9" y="163.6" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="404.9" y="181.6" font-size="12" text-anchor="start">A</text>
</svg>
<figcaption>PD zero at −5.15 bends the locus through B. Squares mark the closed-loop poles at K = 23.4; the third pole at −6.58 sits 1.4 from the zero.</figcaption>
</figure>

At $K=23.4$ the third closed-loop pole is at $-6.58$: only $3.0$ times the dominant real part, and
$1.4$ away from the zero at $-5.15$. Neither test passes cleanly, so the residues decide. The third
pole's residue in the step response is $0.157$ against a dominant-pair amplitude of $1.23$, and the
simulated response has $17.9\\%$ overshoot and $T_{s}=1.86$ s against a predicted $15\\%$ and
$1.81$ s. The settling time is met; the overshoot is three points high, which is what the
uncancelled third pole costs.

$K_{v}$ went from $1.67$ to $23.4\\cdot5.147/24=5.01$ without any error compensation.
`
    },
    {
      title: "9.3: Lead compensation",
      sec: "9.3",
      example: "9-16",
      body: `
A passive network cannot make a lone zero; it makes a zero and a pole. Put the pole farther from the
origin than the zero:

$$G_{c}(s)=\\frac{s+z_{c}}{s+p_{c}},\\qquad p_{c}>z_{c}$$

At any point above the axis the zero's angle exceeds the pole's, so the pair adds net positive angle

$$\\theta_{c}=\\theta_{z_{c}}-\\theta_{p_{c}}>0$$

and acts like a weaker PD zero. Its gain at high frequency levels off at $1$ instead of growing, so the
noise problem goes away.

### Infinitely many solutions

The deficit fixes $\\theta_{c}$, the angle the pair subtends at the design point. Any zero and pole on the
real axis that subtend $51.26^\\circ$ at $B$ work for the running example.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 263" class="nx-fig">
  <defs><marker id="nx9f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 195.3 L482.0 195.3" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9f)"/>
  <path d="M440.8 229.2 L440.8 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9f)"/>
  <text x="476.0" y="213.3" font-size="13">&#963;</text>
  <text x="446.8" y="30.0" font-size="13">j&#969;</text>
  <path d="M139.5 192.3 L139.5 198.3" stroke="currentColor" stroke-width="1"/>
  <text x="139.5" y="210.3" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M290.1 192.3 L290.1 198.3" stroke="currentColor" stroke-width="1"/>
  <text x="290.1" y="210.3" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M365.5 192.3 L365.5 198.3" stroke="currentColor" stroke-width="1"/>
  <text x="365.5" y="210.3" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M437.8 119.9 L443.8 119.9" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="123.9" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M437.8 44.6 L443.8 44.6" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="48.6" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M434.8 189.3 L446.8 201.3 M446.8 189.3 L434.8 201.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M321.8 189.3 L333.8 201.3 M333.8 189.3 L321.8 201.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M133.5 189.3 L145.5 201.3 M145.5 189.3 L133.5 201.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="357.5" cy="57.4" r="4.5" fill="currentColor" stroke="none"/>
  <text x="365.5" y="53.4" font-size="13" text-anchor="start">B</text>
  <path d="M365.5 195.3 L357.5 57.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4"/>
  <path d="M204.6 195.3 L357.5 57.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4"/>
  <path d="M327.8 195.3 L357.5 57.4" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <path d="M81.8 195.3 L357.5 57.4" fill="none" stroke="currentColor" stroke-width="1.3"/>
  <circle cx="365.5" cy="195.3" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M198.6 189.3 L210.6 201.3 M210.6 189.3 L198.6 201.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="327.8" cy="195.3" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M75.8 189.3 L87.8 201.3 M87.8 189.3 L75.8 201.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <text x="81.8" y="183.3" font-size="11" text-anchor="middle">−9.53</text>
  <text x="204.6" y="183.3" font-size="11" text-anchor="middle">−6.27</text>
  <text x="323.8" y="183.3" font-size="11" text-anchor="end">z = −3</text>
  <text x="373.5" y="185.3" font-size="11" text-anchor="start">z = −2</text>
  <text x="343.5" y="43.4" font-size="11" text-anchor="end">θc = 51.3° between each pair</text>
</svg>
<figcaption>Any zero–pole pair that subtends 51.3° at B puts B on the locus. Solid: zero at −3, pole at −9.53. Dashed: zero at −2, pole at −6.27. The angle fixes the pair; it does not fix where the pair sits.</figcaption>
</figure>

So the design picks one of them by choice, usually the zero, and solves for the other.

### Procedure

1. Design point from the specifications, as for PD.
2. Choose the lead zero. Common choices: cancel the plant pole just left of the dominant region, or
   sit a little to its left.
3. Sum the angles at the design point from the plant and the chosen zero.
4. The pole must contribute $\\theta_{p_{c}}=\\angle G+\\theta_{z_{c}}+180^\\circ$, measured as a positive
   angle; place it at $p_{c}=\\sigma+\\dfrac{\\omega_{d}}{\\tan\\theta_{p_{c}}}$.
5. $K$ from the magnitude criterion, then every other closed-loop pole, then simulate.

### On the running example, zero at $-3$

The zero cancels the plant pole at $-3$, so the remaining angles at $B$ add to
$-121.13^\\circ-32.30^\\circ=-153.43^\\circ$. The pole must take away $26.57^\\circ$:

$$p_{c}=2.210+\\frac{3.660}{\\tan26.57^\\circ}=9.53,\\qquad
K=|B|\\,|B+8|\\,|B+9.53|=4.276\\cdot6.850\\cdot8.184=239.7$$

The other closed-loop poles are $-13.11$, six times the dominant real part, and $-3.00$, exactly on the
zero. Simulated: $14.1\\%$ overshoot, $T_{s}=1.89$ s. $K_{v}=239.7\\cdot3/(3\\cdot8\\cdot9.53)=3.14$.
`
    },
    {
      title: "9.3: Choosing among lead compensators",
      sec: "9.3",
      example: "9-19",
      body: `
The pairs that put $B$ on the running example's locus differ in everything except the dominant poles.

| Lead zero | Lead pole | $K$ | $K_{v}$ | Other closed-loop poles | Sim. $\\%OS$ | Sim. $T_{s}$ (s) |
|---|---|---|---|---|---|---|
| PD only, $-5.15$ | — | $23.4$ | $5.01$ | $-6.58$ | 17.9 | 1.86 |
| $-4$ | $-18.47$ | $448.6$ | $4.05$ | $-20.19,\\ -4.86$ | 18.2 | 1.92 |
| $-3$ | $-9.53$ | $239.7$ | $3.14$ | $-13.11,\\ -3.00$ | 14.1 | 1.89 |
| $-2$ | $-6.27$ | $163.5$ | $2.17$ | $-11.26,\\ -1.59$ | 3.8 | 2.12 |

Four things to read off it.

- **Moving the zero left raises $K_{v}$ and $K$.** The pole has to go much farther left to keep the net
  angle, and a far pole costs a large gain.
- **Cancelling a plant pole gives the cleanest second-order response.** The real closed-loop pole lands
  on the zero and its residue is zero.
- **A zero to the right of the second plant pole creates a slow pole.** With the zero at $-2$ the real axis
  between $0$ and $-2$ is on the locus, so a closed-loop pole sits at $-1.59$, slower than the
  dominant pair. The response loses most of its overshoot and misses the settling time.
- **Moving the zero left of the cancellation point leaves a real pole near it but not on it.** At $-4$ the
  pole at $-4.86$ partially cancels and adds three points of overshoot.

A rule that follows: place the lead zero on, or a little to the left of, the plant pole nearest the
dominant region on its left. Then compare $K$ and $K_{v}$ among the candidates that pass simulation.
`
    },
    {
      title: "9.4: One compensator for both problems",
      sec: "9.4",
      example: "9-26",
      body: `
A lag pair close to the origin moves the dominant poles by a fraction of a degree, so it can be added
after a lead design without undoing it. That near-independence is what lets the two stages be designed
one after the other.

**Transient first, then error.** Design the lead (or PD) to place the dominant poles. Compute the
error constant the lead-compensated system already has. Then design the lag (or PI) for the remaining
factor only. The lag shifts the dominant poles by a fraction of a degree and costs a little speed.

**Error first, then transient** also works, with a drawback: the lead stage changes $K$ and the error
constant again, so the error achieved is no longer the error designed. In 9-26 the reversed order
delivers $19$ times the required improvement where $10$ was asked for. Overshooting the error
specification is harmless unless it costs gain margin or hardware, but it means the first design step
did not control the result.

This reading designs the transient first throughout.
`
    },
    {
      title: "9.4: PID design",
      sec: "9.4",
      example: "9-23",
      body: `
<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 210" class="nx-fig">
  <defs><marker id="nx9j" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <text x="6" y="102" text-anchor="start" font-size="13">E(s)</text>
  <path d="M8 110 L70 110" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <circle cx="70" cy="110" r="3.5" fill="currentColor" stroke="none"/>
  <path d="M70 110 L70 40 L150 40" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <rect x="150" y="20.0" width="90" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="195.0" y="45" text-anchor="middle" font-size="14">K<tspan font-size="10" dy="4">1</tspan></text>
  <path d="M70 110 L150 110" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <rect x="150" y="90.0" width="90" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="195.0" y="115" text-anchor="middle" font-size="14">K<tspan font-size="10" dy="4">2</tspan><tspan dy="-4"> / s</tspan></text>
  <path d="M70 110 L70 180 L150 180" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <rect x="150" y="160.0" width="90" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="195.0" y="185" text-anchor="middle" font-size="14">K<tspan font-size="10" dy="4">3</tspan><tspan dy="-4"> s</tspan></text>
  <path d="M240 40 L300 40 L300 96" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <path d="M240 110 L286 110" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <path d="M240 180 L300 180 L300 124" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <circle cx="300" cy="110" r="14" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="280" y="96" text-anchor="middle" font-size="13">+</text><text x="276" y="116" text-anchor="middle" font-size="13">+</text><text x="280" y="138" text-anchor="middle" font-size="13">+</text>
  <path d="M314 110 L370 110" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <rect x="370" y="90.0" width="80" height="40" rx="6" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/><text x="410.0" y="115" text-anchor="middle" font-size="14">G(s)</text>
  <path d="M450 110 L500 110" fill="none" stroke="currentColor" stroke-width="1.8" marker-end="url(#nx9j)"/>
  <text x="504" y="115" text-anchor="start" font-size="13">C(s)</text>
  <text x="250" y="30" text-anchor="start" font-size="11">P</text>
  <text x="250" y="100" text-anchor="start" font-size="11">I</text>
  <text x="250" y="170" text-anchor="start" font-size="11">D</text>
</svg>
<figcaption>PID: proportional, integral and derivative paths on the error, summed into the plant. Loop closed from C(s) back to E(s) (not drawn).</figcaption>
</figure>

$$G_{c}(s)=K_{1}+\\frac{K_{2}}{s}+K_{3}s=\\frac{K_{3}\\left(s^{2}+\\dfrac{K_{1}}{K_{3}}s+\\dfrac{K_{2}}{K_{3}}\\right)}{s}$$

Two zeros and a pole at the origin. Design one zero as the PD zero and the other, with the origin pole,
as the PI. If the root-locus design ends with $K\\,\\dfrac{(s+a)(s+b)}{s}$, matching coefficients gives

$$K_{1}=K(a+b),\\qquad K_{2}=Kab,\\qquad K_{3}=K$$

### Procedure

1. Evaluate the uncompensated system at the required $\\%OS$.
2. Design the PD zero and gain for the transient specification. Simulate.
3. Add the PI zero near the origin. Re-solve on the $\\zeta$ line for $K$.
4. Convert to $K_{1}$, $K_{2}$, $K_{3}$. Simulate again.

### On the running example

PD zero $-5.147$ from 9.3, then a PI zero at $-0.1$. Re-solving on the $15\\%$ line: dominant poles
$-2.128\\pm j3.525$, $K=22.33$, other poles $-6.64$ and $-0.102$.

$$K_{1}=22.33(5.147+0.1)=117.2,\\quad K_{2}=22.33\\cdot5.147\\cdot0.1=11.50,\\quad K_{3}=22.33$$

The loop is Type 2, so the ramp error is zero. The step response reaches its peak at $0.83$ s with
$20.1\\%$ overshoot and settles in $2.74$ s; the slow pole at $-0.102$ is responsible for both the extra
overshoot and the longer settling, through the same mechanism as the lag tail in 9.2.
`
    },
    {
      title: "9.4: Lag-lead design",
      sec: "9.4",
      example: "9-24",
      body: `
The passive counterpart of PID: a lead pair for the transient, then a lag pair for the error.

$$G_{c}(s)=\\underbrace{\\frac{s+z_{\\text{lead}}}{s+p_{\\text{lead}}}}_{\\text{lead}}\\;
\\underbrace{\\frac{s+z_{\\text{lag}}}{s+p_{\\text{lag}}}}_{\\text{lag}}$$

### Procedure

1. Evaluate the uncompensated system; set the design point.
2. Design the lead: zero, pole, gain. Simulate.
3. Compute the lead-compensated error constant and the factor still needed.
4. Design the lag for that factor. Re-solve on the $\\zeta$ line.
5. Simulate and check every specification.

### On the running example

Specifications: $15\\%$ overshoot, half the settling time ($1.81$ s), ten times the ramp
constant ($K_{v}\\ge16.74$).

**Lead.** The zero-at-$-3$ design from 9.3: pole at $-9.53$, $K=239.7$, $K_{v}=3.144$.

**Lag.** Still needed: $16.74/3.144=5.32$. With $p_{c}=0.01$, $z_{c}=0.0532$.

**Re-solve.** Dominant poles $-2.194\\pm j3.632$, $K=239.2$, other poles $-13.10$, $-3.00$ and
$-0.054$. $K_{v}=16.70$, a factor of $9.98$.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 250" class="nx-fig">
  <defs><marker id="nx9g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M46.0 216.0 L510.0 216.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9g)"/>
  <path d="M46.0 216.0 L46.0 10.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9g)"/>
  <path d="M46.0 216.0 L46.0 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="46.0" y="232.0" font-size="11" text-anchor="middle" opacity=".75">0</text>
  <path d="M122.3 216.0 L122.3 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="122.3" y="232.0" font-size="11" text-anchor="middle" opacity=".75">1</text>
  <path d="M198.7 216.0 L198.7 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="198.7" y="232.0" font-size="11" text-anchor="middle" opacity=".75">2</text>
  <path d="M275.0 216.0 L275.0 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="275.0" y="232.0" font-size="11" text-anchor="middle" opacity=".75">3</text>
  <path d="M351.3 216.0 L351.3 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="351.3" y="232.0" font-size="11" text-anchor="middle" opacity=".75">4</text>
  <path d="M427.7 216.0 L427.7 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="427.7" y="232.0" font-size="11" text-anchor="middle" opacity=".75">5</text>
  <path d="M504.0 216.0 L504.0 220.0" stroke="currentColor" stroke-width="1"/>
  <text x="504.0" y="232.0" font-size="11" text-anchor="middle" opacity=".75">6</text>
  <path d="M42.0 216.0 L46.0 216.0" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="220.0" font-size="11" text-anchor="end" opacity=".75">0</text>
  <path d="M42.0 139.1 L46.0 139.1" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="143.1" font-size="11" text-anchor="end" opacity=".75">0.5</text>
  <path d="M42.0 62.2 L46.0 62.2" stroke="currentColor" stroke-width="1"/>
  <text x="39.0" y="66.2" font-size="11" text-anchor="end" opacity=".75">1</text>
  <text x="504.0" y="246.0" font-size="12" text-anchor="end">t (s)</text>
  <text x="52.0" y="20.0" font-size="12">c(t)</text>
  <path d="M46.0 62.2 L504.0 62.2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
  <path d="M46.0 216.0 L47.1 216.0 L48.1 216.0 L49.1 215.9 L50.0 215.9 L51.0 215.8 L51.9 215.6 L52.7 215.4 L53.6 215.2 L54.4 215.0 L55.2 214.7 L55.9 214.4 L56.6 214.1 L57.3 213.7 L58.0 213.3 L58.7 212.9 L59.3 212.5 L59.9 212.1 L60.5 211.7 L61.1 211.2 L61.7 210.7 L62.3 210.1 L62.9 209.7 L63.4 209.2 L63.9 208.6 L64.5 208.1 L65.0 207.5 L65.5 206.9 L66.1 206.3 L66.6 205.7 L67.1 205.1 L67.5 204.6 L68.0 204.0 L68.4 203.4 L68.9 202.8 L69.4 202.2 L69.8 201.5 L70.3 200.9 L70.7 200.2 L71.2 199.6 L71.6 198.9 L72.1 198.2 L72.6 197.5 L73.0 196.8 L73.5 196.0 L73.9 195.3 L74.3 194.7 L74.7 194.0 L75.1 193.4 L75.5 192.7 L75.8 192.1 L76.2 191.4 L76.6 190.7 L77.0 190.1 L77.4 189.4 L77.8 188.7 L78.1 188.0 L78.5 187.3 L78.9 186.6 L79.3 185.9 L79.7 185.2 L80.0 184.4 L80.4 183.7 L80.8 183.0 L81.2 182.2 L81.6 181.5 L82.0 180.7 L82.3 180.0 L82.7 179.2 L83.1 178.4 L83.5 177.7 L83.9 176.9 L84.2 176.1 L84.6 175.3 L85.0 174.5 L85.4 173.8 L85.8 173.0 L86.2 172.2 L86.5 171.4 L86.9 170.6 L87.3 169.7 L87.7 168.9 L88.1 168.1 L88.4 167.3 L88.8 166.5 L89.2 165.6 L89.6 164.8 L90.0 164.0 L90.3 163.2 L90.7 162.3 L91.1 161.5 L91.5 160.7 L91.9 159.8 L92.3 159.0 L92.6 158.1 L93.0 157.3 L93.4 156.4 L93.8 155.6 L94.2 154.7 L94.5 153.9 L94.9 153.0 L95.3 152.2 L95.7 151.3 L96.1 150.5 L96.5 149.6 L96.8 148.8 L97.2 147.9 L97.6 147.1 L98.0 146.2 L98.4 145.4 L98.7 144.5 L99.1 143.6 L99.5 142.8 L99.9 141.9 L100.3 141.1 L100.7 140.2 L101.0 139.4 L101.4 138.5 L101.8 137.7 L102.2 136.8 L102.6 136.0 L102.9 135.1 L103.3 134.3 L103.7 133.4 L104.1 132.6 L104.5 131.7 L104.9 130.9 L105.2 130.0 L105.6 129.2 L106.0 128.4 L106.4 127.5 L106.8 126.7 L107.1 125.9 L107.5 125.0 L107.9 124.2 L108.3 123.4 L108.7 122.5 L109.1 121.7 L109.4 120.9 L109.8 120.1 L110.2 119.3 L110.6 118.5 L111.0 117.6 L111.3 116.8 L111.7 116.0 L112.1 115.2 L112.5 114.4 L112.9 113.6 L113.2 112.8 L113.6 112.0 L114.0 111.3 L114.4 110.5 L114.8 109.7 L115.2 108.9 L115.5 108.1 L115.9 107.4 L116.3 106.6 L116.7 105.8 L117.1 105.1 L117.4 104.3 L117.8 103.5 L118.2 102.8 L118.6 102.0 L119.0 101.3 L119.4 100.6 L119.7 99.8 L120.1 99.1 L120.5 98.4 L120.9 97.6 L121.3 96.9 L121.6 96.2 L122.0 95.5 L122.4 94.8 L122.8 94.1 L123.2 93.4 L123.6 92.7 L123.9 92.0 L124.3 91.3 L124.7 90.6 L125.1 89.9 L125.5 89.3 L125.8 88.6 L126.2 87.9 L126.6 87.3 L127.0 86.6 L127.4 85.9 L127.8 85.3 L128.1 84.7 L128.5 84.0 L128.9 83.4 L129.3 82.8 L129.7 82.1 L130.0 81.5 L130.5 80.8 L131.0 80.0 L131.4 79.3 L131.9 78.6 L132.3 77.9 L132.8 77.2 L133.2 76.5 L133.7 75.8 L134.2 75.1 L134.6 74.4 L135.1 73.7 L135.5 73.1 L136.0 72.4 L136.5 71.8 L136.9 71.1 L137.4 70.5 L137.8 69.9 L138.3 69.2 L138.7 68.6 L139.2 68.0 L139.7 67.4 L140.1 66.8 L140.6 66.2 L141.0 65.6 L141.5 65.1 L142.0 64.5 L142.4 64.0 L142.9 63.4 L143.3 62.9 L143.9 62.2 L144.4 61.6 L144.9 61.0 L145.5 60.4 L146.0 59.8 L146.5 59.2 L147.1 58.7 L147.6 58.1 L148.1 57.6 L148.7 57.0 L149.2 56.5 L149.7 56.0 L150.3 55.5 L150.8 55.0 L151.3 54.5 L151.9 54.0 L152.4 53.5 L152.9 53.0 L153.6 52.5 L154.2 52.0 L154.8 51.5 L155.4 51.0 L156.0 50.5 L156.6 50.1 L157.2 49.6 L157.8 49.2 L158.4 48.8 L159.0 48.3 L159.7 47.9 L160.3 47.5 L161.0 47.1 L161.6 46.7 L162.3 46.3 L163.0 45.9 L163.7 45.5 L164.4 45.2 L165.1 44.8 L165.8 44.5 L166.5 44.2 L167.2 43.8 L168.0 43.5 L168.7 43.2 L169.5 42.9 L170.3 42.6 L171.0 42.4 L171.8 42.1 L172.6 41.8 L173.5 41.6 L174.3 41.4 L175.2 41.2 L176.0 41.0 L176.8 40.8 L177.8 40.6 L178.7 40.5 L179.6 40.3 L180.5 40.2 L181.4 40.1 L182.3 40.0 L183.3 40.0 L184.3 39.9 L185.3 39.9 L186.3 39.9 L187.4 39.9 L188.4 39.9 L189.4 39.9 L190.3 40.0 L191.3 40.0 L192.3 40.1 L193.2 40.2 L194.2 40.3 L195.1 40.4 L196.0 40.5 L196.9 40.7 L197.8 40.8 L198.7 41.0 L199.7 41.1 L200.6 41.3 L201.4 41.5 L202.3 41.6 L203.1 41.8 L203.9 42.0 L204.8 42.2 L205.6 42.4 L206.5 42.6 L207.3 42.8 L208.1 43.0 L209.0 43.3 L209.8 43.5 L210.7 43.7 L211.5 44.0 L212.3 44.2 L213.2 44.5 L214.0 44.7 L214.8 45.0 L215.7 45.2 L216.5 45.5 L217.3 45.7 L218.1 45.9 L218.8 46.2 L219.6 46.4 L220.3 46.7 L221.1 46.9 L221.9 47.2 L222.6 47.4 L223.4 47.7 L224.2 47.9 L224.9 48.2 L225.7 48.4 L226.5 48.7 L227.2 48.9 L228.0 49.2 L228.7 49.5 L229.5 49.7 L230.3 50.0 L231.0 50.2 L231.8 50.5 L232.6 50.7 L233.3 51.0 L234.1 51.3 L234.8 51.5 L235.6 51.8 L236.4 52.0 L237.1 52.3 L237.9 52.5 L238.7 52.8 L239.4 53.0 L240.2 53.3 L241.0 53.5 L241.7 53.7 L242.5 54.0 L243.2 54.2 L244.0 54.5 L244.8 54.7 L245.6 55.0 L246.5 55.2 L247.3 55.5 L248.1 55.7 L249.0 56.0 L249.8 56.2 L250.6 56.5 L251.5 56.7 L252.3 56.9 L253.2 57.2 L254.0 57.4 L254.8 57.6 L255.7 57.9 L256.5 58.1 L257.4 58.3 L258.2 58.5 L259.0 58.7 L259.9 59.0 L260.7 59.2 L261.6 59.4 L262.4 59.6 L263.2 59.8 L264.1 60.0 L264.9 60.2 L265.8 60.3 L266.6 60.5 L267.4 60.7 L268.3 60.9 L269.1 61.1 L270.0 61.2 L270.8 61.4 L271.6 61.5 L272.6 61.7 L273.5 61.9 L274.4 62.1 L275.3 62.2 L276.2 62.4 L277.1 62.5 L278.1 62.7 L279.0 62.8 L279.9 63.0 L280.8 63.1 L281.7 63.2 L282.6 63.3 L283.5 63.5 L284.5 63.6 L285.4 63.7 L286.3 63.8 L287.2 63.9 L288.1 64.0 L289.0 64.1 L290.0 64.2 L290.9 64.3 L291.8 64.4 L292.8 64.5 L293.8 64.6 L294.8 64.6 L295.8 64.7 L296.8 64.8 L297.7 64.9 L298.7 64.9 L299.7 65.0 L300.7 65.1 L301.7 65.1 L302.7 65.2 L303.7 65.2 L304.7 65.2 L305.7 65.3 L306.7 65.3 L307.7 65.4 L308.7 65.4 L309.7 65.4 L310.6 65.4 L311.6 65.4 L312.6 65.5 L313.6 65.5 L314.6 65.5 L315.7 65.5 L316.8 65.5 L317.8 65.5 L318.9 65.5 L320.0 65.5 L321.0 65.5 L322.0 65.5 L323.0 65.5 L324.0 65.5 L325.0 65.4 L326.0 65.4 L327.0 65.4 L328.0 65.4 L329.0 65.4 L330.0 65.3 L331.0 65.3 L331.9 65.3 L332.9 65.2 L333.9 65.2 L334.9 65.2 L335.9 65.1 L336.9 65.1 L337.9 65.1 L338.9 65.0 L339.9 65.0 L340.9 65.0 L341.9 64.9 L342.9 64.9 L343.9 64.8 L344.8 64.8 L345.8 64.7 L346.8 64.7 L347.8 64.6 L348.8 64.6 L349.8 64.6 L350.8 64.5 L351.8 64.5 L352.8 64.4 L353.8 64.4 L354.8 64.3 L355.8 64.3 L356.8 64.2 L357.7 64.2 L358.7 64.1 L359.7 64.1 L360.7 64.0 L361.7 64.0 L362.7 63.9 L363.7 63.9 L364.7 63.8 L365.7 63.8 L366.7 63.7 L367.7 63.7 L368.7 63.6 L369.7 63.6 L370.6 63.5 L371.6 63.5 L372.6 63.4 L373.6 63.4 L374.6 63.3 L375.6 63.3 L376.6 63.2 L377.6 63.2 L378.6 63.1 L379.6 63.1 L380.6 63.1 L381.6 63.0 L382.6 63.0 L383.5 62.9 L384.5 62.9 L385.5 62.8 L386.5 62.8 L387.5 62.8 L388.5 62.7 L389.5 62.7 L390.5 62.6 L391.5 62.6 L392.5 62.6 L393.5 62.5 L394.5 62.5 L395.5 62.5 L396.4 62.4 L397.4 62.4 L398.4 62.4 L399.4 62.3 L400.4 62.3 L401.4 62.3 L402.4 62.3 L403.4 62.2 L404.4 62.2 L405.4 62.2 L406.4 62.1 L407.4 62.1 L408.4 62.1 L409.3 62.1 L410.3 62.0 L411.3 62.0 L412.3 62.0 L413.3 62.0 L414.3 62.0 L415.3 61.9 L416.3 61.9 L417.3 61.9 L418.3 61.9 L419.3 61.9 L420.3 61.9 L421.3 61.8 L422.2 61.8 L423.2 61.8 L424.2 61.8 L425.2 61.8 L426.2 61.8 L427.2 61.8 L428.2 61.8 L429.2 61.7 L430.2 61.7 L431.2 61.7 L432.2 61.7 L433.2 61.7 L434.2 61.7 L435.3 61.7 L436.4 61.7 L437.4 61.7 L438.5 61.7 L439.6 61.7 L440.6 61.7 L441.7 61.7 L442.8 61.7 L443.8 61.7 L444.9 61.7 L446.0 61.7 L447.1 61.7 L448.1 61.7 L449.2 61.7 L450.3 61.7 L451.3 61.7 L452.4 61.7 L453.5 61.7 L454.5 61.7 L455.6 61.7 L456.7 61.7 L457.7 61.7 L458.8 61.7 L459.9 61.7 L460.9 61.7 L462.0 61.7 L463.1 61.7 L464.2 61.7 L465.2 61.7 L466.3 61.7 L467.4 61.7 L468.4 61.7 L469.5 61.7 L470.6 61.7 L471.6 61.7 L472.7 61.7 L473.8 61.7 L474.8 61.8 L475.9 61.8 L477.0 61.8 L478.0 61.8 L479.1 61.8 L480.2 61.8 L481.3 61.8 L482.3 61.8 L483.4 61.8 L484.5 61.8 L485.5 61.8 L486.6 61.8 L487.7 61.8 L488.7 61.9 L489.8 61.9 L490.9 61.9 L491.9 61.9 L493.0 61.9 L494.1 61.9 L495.1 61.9 L496.2 61.9 L497.3 61.9 L498.4 61.9 L499.4 61.9 L500.5 61.9 L501.6 61.9 L502.6 62.0 L503.7 62.0" fill="none" stroke="currentColor" stroke-width="2.0" stroke-dasharray="2 3"/>
  <path d="M46.0 216.0 L47.0 216.0 L48.0 215.9 L48.8 215.7 L49.6 215.5 L50.3 215.2 L51.0 214.7 L51.6 214.2 L52.1 213.8 L52.6 213.2 L53.2 212.6 L53.6 212.0 L54.1 211.3 L54.5 210.6 L54.9 210.0 L55.3 209.3 L55.7 208.6 L56.1 207.8 L56.5 207.1 L56.8 206.2 L57.2 205.4 L57.5 204.7 L57.8 203.9 L58.1 203.2 L58.4 202.4 L58.7 201.6 L59.1 200.8 L59.4 199.9 L59.7 199.1 L60.0 198.2 L60.3 197.3 L60.6 196.3 L60.9 195.4 L61.2 194.4 L61.5 193.5 L61.8 192.5 L62.1 191.5 L62.3 190.7 L62.6 189.9 L62.8 189.1 L63.0 188.3 L63.3 187.5 L63.5 186.7 L63.7 185.9 L63.9 185.0 L64.2 184.2 L64.4 183.3 L64.6 182.5 L64.9 181.6 L65.1 180.7 L65.3 179.9 L65.5 179.0 L65.8 178.1 L66.0 177.2 L66.2 176.3 L66.5 175.4 L66.7 174.5 L66.9 173.5 L67.1 172.6 L67.4 171.7 L67.6 170.7 L67.8 169.8 L68.1 168.9 L68.3 167.9 L68.5 167.0 L68.7 166.0 L69.0 165.0 L69.2 164.1 L69.4 163.1 L69.7 162.1 L69.9 161.1 L70.1 160.2 L70.4 159.2 L70.6 158.2 L70.8 157.2 L71.0 156.2 L71.3 155.2 L71.5 154.2 L71.7 153.2 L72.0 152.3 L72.2 151.3 L72.4 150.3 L72.6 149.3 L72.9 148.3 L73.1 147.3 L73.3 146.3 L73.6 145.3 L73.8 144.3 L74.0 143.3 L74.2 142.2 L74.5 141.2 L74.7 140.2 L74.9 139.2 L75.2 138.2 L75.4 137.2 L75.6 136.3 L75.8 135.3 L76.1 134.3 L76.3 133.3 L76.5 132.3 L76.8 131.3 L77.0 130.3 L77.2 129.3 L77.4 128.3 L77.7 127.3 L77.9 126.4 L78.1 125.4 L78.4 124.4 L78.6 123.4 L78.8 122.5 L79.1 121.5 L79.3 120.5 L79.5 119.6 L79.7 118.6 L80.0 117.7 L80.2 116.7 L80.4 115.8 L80.7 114.8 L80.9 113.9 L81.1 113.0 L81.3 112.0 L81.6 111.1 L81.8 110.2 L82.0 109.3 L82.3 108.4 L82.5 107.5 L82.7 106.5 L82.9 105.7 L83.2 104.8 L83.4 103.9 L83.6 103.0 L83.9 102.1 L84.1 101.2 L84.3 100.4 L84.5 99.5 L84.8 98.6 L85.0 97.8 L85.2 96.9 L85.5 96.1 L85.7 95.3 L85.9 94.4 L86.2 93.6 L86.4 92.8 L86.6 92.0 L86.8 91.2 L87.1 90.4 L87.3 89.6 L87.5 88.8 L87.8 88.0 L88.0 87.2 L88.2 86.4 L88.5 85.4 L88.8 84.4 L89.1 83.4 L89.4 82.4 L89.7 81.5 L90.0 80.5 L90.3 79.5 L90.7 78.6 L91.0 77.7 L91.3 76.8 L91.6 75.9 L91.9 75.0 L92.2 74.1 L92.5 73.2 L92.8 72.4 L93.1 71.5 L93.4 70.7 L93.7 69.9 L94.0 69.1 L94.3 68.3 L94.6 67.5 L94.9 66.7 L95.2 66.0 L95.5 65.2 L95.8 64.5 L96.2 63.7 L96.5 63.0 L96.8 62.3 L97.1 61.5 L97.5 60.6 L97.9 59.8 L98.3 59.0 L98.7 58.3 L99.1 57.5 L99.4 56.8 L99.8 56.0 L100.2 55.3 L100.6 54.6 L101.0 54.0 L101.3 53.3 L101.7 52.7 L102.2 52.0 L102.6 51.2 L103.1 50.6 L103.6 49.9 L104.0 49.3 L104.5 48.7 L104.9 48.1 L105.4 47.5 L105.9 46.9 L106.5 46.3 L107.0 45.8 L107.5 45.2 L108.1 44.8 L108.7 44.2 L109.3 43.7 L109.9 43.3 L110.5 42.9 L111.2 42.5 L111.9 42.1 L112.6 41.7 L113.3 41.4 L114.1 41.2 L114.9 40.9 L115.8 40.7 L116.7 40.6 L117.7 40.5 L118.7 40.5 L119.7 40.6 L120.7 40.7 L121.6 40.9 L122.4 41.1 L123.2 41.3 L124.1 41.5 L124.9 41.8 L125.6 42.1 L126.4 42.4 L127.1 42.7 L127.8 43.1 L128.5 43.4 L129.2 43.7 L129.9 44.1 L130.6 44.5 L131.3 44.9 L132.0 45.3 L132.6 45.7 L133.3 46.1 L134.0 46.5 L134.7 46.9 L135.4 47.3 L136.1 47.8 L136.7 48.2 L137.3 48.6 L137.9 49.0 L138.5 49.4 L139.1 49.8 L139.7 50.2 L140.3 50.5 L141.0 50.9 L141.6 51.3 L142.2 51.7 L142.8 52.1 L143.4 52.5 L144.1 53.0 L144.8 53.4 L145.5 53.8 L146.1 54.2 L146.8 54.7 L147.5 55.1 L148.2 55.5 L148.9 55.9 L149.6 56.3 L150.3 56.7 L151.0 57.1 L151.6 57.4 L152.3 57.8 L153.0 58.2 L153.7 58.5 L154.4 58.8 L155.1 59.2 L155.8 59.5 L156.5 59.8 L157.2 60.2 L158.0 60.5 L158.7 60.8 L159.5 61.1 L160.3 61.4 L161.0 61.7 L161.8 62.0 L162.6 62.2 L163.3 62.5 L164.1 62.7 L164.9 63.0 L165.8 63.2 L166.6 63.4 L167.4 63.6 L168.3 63.8 L169.1 64.0 L170.0 64.2 L170.9 64.3 L171.8 64.5 L172.7 64.6 L173.6 64.8 L174.5 64.9 L175.5 65.0 L176.4 65.1 L177.4 65.2 L178.4 65.2 L179.4 65.3 L180.3 65.3 L181.3 65.4 L182.3 65.4 L183.3 65.4 L184.4 65.4 L185.4 65.4 L186.4 65.4 L187.4 65.3 L188.4 65.3 L189.4 65.3 L190.3 65.2 L191.3 65.2 L192.3 65.1 L193.3 65.0 L194.3 64.9 L195.3 64.9 L196.3 64.8 L197.3 64.7 L198.3 64.6 L199.3 64.5 L200.2 64.4 L201.1 64.4 L202.0 64.3 L202.9 64.2 L203.9 64.1 L204.8 64.0 L205.7 63.9 L206.6 63.8 L207.5 63.7 L208.4 63.6 L209.4 63.6 L210.3 63.5 L211.2 63.4 L212.1 63.3 L213.1 63.2 L214.1 63.1 L215.1 63.0 L216.1 63.0 L217.1 62.9 L218.1 62.8 L219.0 62.7 L220.0 62.6 L221.0 62.6 L222.0 62.5 L223.0 62.4 L224.0 62.4 L225.0 62.3 L226.0 62.3 L227.0 62.2 L228.0 62.1 L229.0 62.1 L230.0 62.1 L231.0 62.0 L231.9 62.0 L232.9 61.9 L233.9 61.9 L234.9 61.9 L235.9 61.8 L236.9 61.8 L237.9 61.8 L238.9 61.8 L239.9 61.7 L240.9 61.7 L241.9 61.7 L242.9 61.7 L243.9 61.7 L244.8 61.7 L245.9 61.7 L247.0 61.7 L248.1 61.7 L249.1 61.7 L250.2 61.7 L251.3 61.7 L252.3 61.7 L253.4 61.7 L254.5 61.7 L255.5 61.7 L256.5 61.7 L257.5 61.7 L258.5 61.7 L259.5 61.7 L260.5 61.7 L261.5 61.8 L262.5 61.8 L263.5 61.8 L264.5 61.8 L265.5 61.8 L266.5 61.8 L267.4 61.8 L268.4 61.8 L269.4 61.9 L270.4 61.9 L271.4 61.9 L272.4 61.9 L273.4 61.9 L274.4 61.9 L275.4 62.0 L276.4 62.0 L277.4 62.0 L278.4 62.0 L279.4 62.0 L280.3 62.0 L281.3 62.0 L282.3 62.0 L283.3 62.1 L284.3 62.1 L285.3 62.1 L286.3 62.1 L287.3 62.1 L288.3 62.1 L289.3 62.1 L290.3 62.1 L291.3 62.1 L292.3 62.1 L293.2 62.2 L294.3 62.2 L295.4 62.2 L296.4 62.2 L297.5 62.2 L298.6 62.2 L299.7 62.2 L300.7 62.2 L301.8 62.2 L302.9 62.2 L303.9 62.2 L305.0 62.2 L306.1 62.2 L307.1 62.2 L308.2 62.2 L309.3 62.2 L310.3 62.2 L311.4 62.2 L312.5 62.2 L313.5 62.2 L314.6 62.2 L315.7 62.2 L316.8 62.2 L317.8 62.2 L318.9 62.2 L320.0 62.2 L321.0 62.2 L322.1 62.2 L323.2 62.2 L324.2 62.2 L325.3 62.2 L326.4 62.2 L327.4 62.2 L328.5 62.2 L329.6 62.2 L330.6 62.2 L331.7 62.2 L332.8 62.2 L333.9 62.2 L334.9 62.2 L336.0 62.2 L337.1 62.2 L338.1 62.2 L339.2 62.2 L340.3 62.2 L341.3 62.2 L342.4 62.2 L343.5 62.2 L344.5 62.2 L345.6 62.2 L346.7 62.2 L347.7 62.2 L348.8 62.2 L349.9 62.2 L351.0 62.2 L352.0 62.2 L353.1 62.2 L354.2 62.2 L355.2 62.2 L356.3 62.2 L357.4 62.2 L358.4 62.2 L359.5 62.2 L360.6 62.2 L361.6 62.2 L362.7 62.1 L363.8 62.1 L364.8 62.1 L365.9 62.1 L367.0 62.1 L368.1 62.1 L369.1 62.1 L370.2 62.1 L371.3 62.1 L372.3 62.1 L373.4 62.1 L374.5 62.1 L375.5 62.1 L376.6 62.1 L377.7 62.1 L378.7 62.1 L379.8 62.1 L380.9 62.1 L381.9 62.1 L383.0 62.1 L384.1 62.1 L385.1 62.1 L386.2 62.1 L387.3 62.1 L388.4 62.1 L389.4 62.1 L390.5 62.1 L391.6 62.1 L392.6 62.1 L393.7 62.1 L394.8 62.1 L395.8 62.1 L396.9 62.1 L398.0 62.1 L399.0 62.1 L400.1 62.1 L401.2 62.1 L402.2 62.1 L403.3 62.1 L404.4 62.1 L405.5 62.1 L406.5 62.1 L407.6 62.1 L408.7 62.1 L409.7 62.2 L410.8 62.2 L411.9 62.2 L412.9 62.2 L414.0 62.2 L415.1 62.2 L416.1 62.2 L417.2 62.2 L418.3 62.2 L419.3 62.2 L420.4 62.2 L421.5 62.2 L422.6 62.2 L423.6 62.2 L424.7 62.2 L425.8 62.2 L426.8 62.2 L427.9 62.2 L429.0 62.2 L430.0 62.2 L431.1 62.2 L432.2 62.2 L433.2 62.2 L434.3 62.2 L435.4 62.2 L436.4 62.2 L437.5 62.2 L438.6 62.2 L439.7 62.2 L440.7 62.2 L441.8 62.2 L442.9 62.2 L443.9 62.2 L445.0 62.2 L446.1 62.2 L447.1 62.2 L448.2 62.2 L449.3 62.2 L450.3 62.2 L451.4 62.2 L452.5 62.2 L453.5 62.2 L454.6 62.2 L455.7 62.2 L456.7 62.2 L457.8 62.2 L458.9 62.2 L460.0 62.2 L461.0 62.2 L462.1 62.2 L463.2 62.2 L464.2 62.2 L465.3 62.2 L466.4 62.2 L467.4 62.2 L468.5 62.2 L469.6 62.2 L470.6 62.2 L471.7 62.2 L472.8 62.2 L473.8 62.2 L474.9 62.2 L476.0 62.2 L477.1 62.2 L478.1 62.2 L479.2 62.2 L480.3 62.2 L481.3 62.2 L482.4 62.2 L483.5 62.2 L484.5 62.2 L485.6 62.2 L486.7 62.2 L487.7 62.2 L488.8 62.2 L489.9 62.2 L490.9 62.2 L492.0 62.2 L493.1 62.2 L494.2 62.2 L495.2 62.2 L496.3 62.2 L497.4 62.2 L498.4 62.2 L499.5 62.2 L500.6 62.2 L501.6 62.2 L502.7 62.2 L503.8 62.2" fill="none" stroke="currentColor" stroke-width="2.0" stroke-dasharray="7 4"/>
  <path d="M46.0 216.0 L47.0 216.0 L48.0 215.9 L48.8 215.7 L49.6 215.5 L50.3 215.2 L51.0 214.7 L51.6 214.2 L52.1 213.8 L52.6 213.2 L53.2 212.6 L53.6 212.0 L54.1 211.3 L54.5 210.6 L54.9 210.0 L55.3 209.3 L55.7 208.6 L56.1 207.8 L56.5 207.1 L56.8 206.2 L57.2 205.4 L57.5 204.7 L57.8 203.9 L58.1 203.2 L58.4 202.4 L58.7 201.6 L59.1 200.8 L59.4 199.9 L59.7 199.1 L60.0 198.2 L60.3 197.3 L60.6 196.3 L60.9 195.4 L61.2 194.4 L61.5 193.5 L61.8 192.5 L62.1 191.4 L62.3 190.7 L62.6 189.9 L62.8 189.1 L63.0 188.3 L63.3 187.5 L63.5 186.7 L63.7 185.8 L63.9 185.0 L64.2 184.2 L64.4 183.3 L64.6 182.4 L64.9 181.6 L65.1 180.7 L65.3 179.8 L65.5 178.9 L65.8 178.0 L66.0 177.1 L66.2 176.2 L66.5 175.3 L66.7 174.4 L66.9 173.5 L67.1 172.5 L67.4 171.6 L67.6 170.7 L67.8 169.7 L68.1 168.8 L68.3 167.8 L68.5 166.9 L68.7 165.9 L69.0 164.9 L69.2 164.0 L69.4 163.0 L69.7 162.0 L69.9 161.0 L70.1 160.0 L70.4 159.1 L70.6 158.1 L70.8 157.1 L71.0 156.1 L71.3 155.1 L71.5 154.1 L71.7 153.1 L72.0 152.1 L72.2 151.1 L72.4 150.1 L72.6 149.1 L72.9 148.1 L73.1 147.1 L73.3 146.1 L73.6 145.0 L73.8 144.0 L74.0 143.0 L74.2 142.0 L74.5 141.0 L74.7 140.0 L74.9 139.0 L75.2 138.0 L75.4 137.0 L75.6 136.0 L75.8 135.0 L76.1 134.0 L76.3 133.0 L76.5 132.0 L76.8 131.0 L77.0 130.0 L77.2 129.0 L77.4 128.0 L77.7 127.0 L77.9 126.0 L78.1 125.0 L78.4 124.0 L78.6 123.1 L78.8 122.1 L79.1 121.1 L79.3 120.1 L79.5 119.2 L79.7 118.2 L80.0 117.2 L80.2 116.3 L80.4 115.3 L80.7 114.4 L80.9 113.4 L81.1 112.5 L81.3 111.5 L81.6 110.6 L81.8 109.7 L82.0 108.7 L82.3 107.8 L82.5 106.9 L82.7 106.0 L82.9 105.1 L83.2 104.2 L83.4 103.3 L83.6 102.4 L83.9 101.5 L84.1 100.6 L84.3 99.7 L84.5 98.8 L84.8 98.0 L85.0 97.1 L85.2 96.3 L85.5 95.4 L85.7 94.5 L85.9 93.7 L86.2 92.9 L86.4 92.0 L86.6 91.2 L86.8 90.4 L87.1 89.6 L87.3 88.8 L87.5 88.0 L87.8 87.2 L88.0 86.4 L88.2 85.6 L88.4 84.8 L88.7 84.0 L89.0 83.0 L89.3 82.0 L89.6 81.0 L89.9 80.0 L90.2 79.1 L90.5 78.1 L90.8 77.1 L91.1 76.2 L91.4 75.3 L91.7 74.4 L92.0 73.5 L92.3 72.6 L92.6 71.7 L92.9 70.8 L93.3 70.0 L93.6 69.1 L93.9 68.3 L94.2 67.5 L94.5 66.7 L94.8 65.9 L95.1 65.1 L95.4 64.3 L95.7 63.6 L96.0 62.8 L96.3 62.1 L96.6 61.4 L96.9 60.6 L97.2 59.9 L97.6 59.1 L98.0 58.3 L98.4 57.4 L98.7 56.6 L99.1 55.9 L99.5 55.1 L99.9 54.4 L100.3 53.6 L100.7 52.9 L101.0 52.2 L101.4 51.6 L101.8 50.9 L102.2 50.3 L102.6 49.6 L103.1 48.9 L103.6 48.2 L104.0 47.5 L104.5 46.9 L104.9 46.3 L105.4 45.7 L105.8 45.1 L106.4 44.5 L106.9 43.9 L107.4 43.4 L108.0 42.8 L108.5 42.4 L109.1 41.8 L109.7 41.3 L110.3 40.9 L111.0 40.5 L111.6 40.0 L112.3 39.7 L113.0 39.3 L113.8 39.0 L114.5 38.7 L115.4 38.5 L116.2 38.3 L117.1 38.2 L118.1 38.1 L119.1 38.1 L120.1 38.2 L121.0 38.3 L122.0 38.4 L122.8 38.6 L123.6 38.8 L124.5 39.1 L125.2 39.4 L126.0 39.6 L126.8 40.0 L127.5 40.3 L128.2 40.6 L128.9 40.9 L129.6 41.3 L130.3 41.6 L131.0 42.0 L131.6 42.4 L132.3 42.8 L133.0 43.2 L133.7 43.6 L134.4 44.0 L135.1 44.5 L135.8 44.9 L136.4 45.3 L137.0 45.7 L137.6 46.1 L138.2 46.5 L138.8 46.9 L139.4 47.3 L140.0 47.7 L140.7 48.1 L141.3 48.5 L141.9 48.9 L142.5 49.3 L143.1 49.7 L143.7 50.1 L144.3 50.5 L144.9 50.9 L145.6 51.3 L146.3 51.7 L147.0 52.2 L147.7 52.6 L148.4 53.0 L149.1 53.4 L149.7 53.8 L150.4 54.2 L151.1 54.6 L151.8 55.0 L152.5 55.4 L153.2 55.7 L153.9 56.1 L154.5 56.4 L155.2 56.8 L155.9 57.1 L156.6 57.5 L157.3 57.8 L158.1 58.1 L158.8 58.4 L159.6 58.8 L160.3 59.1 L161.1 59.4 L161.9 59.7 L162.6 59.9 L163.4 60.2 L164.2 60.5 L164.9 60.7 L165.8 60.9 L166.6 61.2 L167.4 61.4 L168.3 61.6 L169.1 61.8 L170.0 62.0 L170.8 62.2 L171.6 62.3 L172.6 62.5 L173.5 62.6 L174.4 62.8 L175.3 62.9 L176.2 63.0 L177.1 63.1 L178.1 63.2 L179.1 63.3 L180.1 63.3 L181.1 63.4 L182.1 63.4 L183.1 63.4 L184.1 63.5 L185.2 63.5 L186.2 63.4 L187.2 63.4 L188.2 63.4 L189.2 63.4 L190.2 63.3 L191.2 63.3 L192.2 63.2 L193.2 63.2 L194.2 63.1 L195.2 63.0 L196.1 63.0 L197.1 62.9 L198.1 62.8 L199.1 62.7 L200.1 62.6 L201.1 62.5 L202.0 62.4 L202.9 62.4 L203.9 62.3 L204.8 62.2 L205.7 62.1 L206.6 62.0 L207.5 61.9 L208.4 61.8 L209.4 61.7 L210.3 61.6 L211.2 61.6 L212.1 61.5 L213.0 61.4 L214.0 61.3 L215.0 61.2 L216.0 61.1 L217.0 61.0 L218.0 61.0 L219.0 60.9 L220.0 60.8 L221.0 60.7 L221.9 60.7 L222.9 60.6 L223.9 60.5 L224.9 60.5 L225.9 60.4 L226.9 60.3 L227.9 60.3 L228.9 60.2 L229.9 60.2 L230.9 60.1 L231.9 60.1 L232.9 60.1 L233.9 60.0 L234.8 60.0 L235.8 60.0 L236.8 59.9 L237.8 59.9 L238.8 59.9 L239.8 59.9 L240.8 59.8 L241.8 59.8 L242.8 59.8 L243.8 59.8 L244.8 59.8 L245.8 59.8 L246.8 59.8 L247.9 59.8 L249.0 59.8 L250.0 59.8 L251.1 59.8 L252.2 59.8 L253.2 59.8 L254.3 59.8 L255.4 59.8 L256.4 59.8 L257.4 59.8 L258.4 59.8 L259.4 59.8 L260.3 59.8 L261.3 59.8 L262.3 59.9 L263.3 59.9 L264.3 59.9 L265.3 59.9 L266.3 59.9 L267.3 59.9 L268.3 59.9 L269.3 60.0 L270.3 60.0 L271.3 60.0 L272.3 60.0 L273.2 60.0 L274.2 60.0 L275.2 60.1 L276.2 60.1 L277.2 60.1 L278.2 60.1 L279.2 60.1 L280.2 60.1 L281.2 60.1 L282.2 60.2 L283.2 60.2 L284.2 60.2 L285.2 60.2 L286.1 60.2 L287.1 60.2 L288.1 60.2 L289.1 60.2 L290.1 60.3 L291.1 60.3 L292.1 60.3 L293.1 60.3 L294.1 60.3 L295.1 60.3 L296.1 60.3 L297.1 60.3 L298.1 60.3 L299.1 60.3 L300.2 60.3 L301.3 60.4 L302.3 60.4 L303.4 60.4 L304.5 60.4 L305.5 60.4 L306.6 60.4 L307.7 60.4 L308.7 60.4 L309.8 60.4 L310.9 60.4 L311.9 60.4 L313.0 60.4 L314.1 60.4 L315.2 60.4 L316.2 60.4 L317.3 60.4 L318.4 60.4 L319.4 60.4 L320.5 60.4 L321.6 60.4 L322.6 60.4 L323.7 60.4 L324.8 60.4 L325.8 60.4 L326.9 60.4 L328.0 60.4 L329.0 60.4 L330.1 60.4 L331.2 60.4 L332.2 60.4 L333.3 60.4 L334.4 60.4 L335.5 60.4 L336.5 60.4 L337.6 60.4 L338.7 60.4 L339.7 60.4 L340.8 60.4 L341.9 60.4 L342.9 60.4 L344.0 60.4 L345.1 60.4 L346.1 60.4 L347.2 60.4 L348.3 60.4 L349.3 60.4 L350.4 60.4 L351.5 60.4 L352.6 60.4 L353.6 60.4 L354.7 60.4 L355.8 60.4 L356.8 60.4 L357.9 60.4 L359.0 60.4 L360.0 60.4 L361.1 60.4 L362.2 60.4 L363.2 60.4 L364.3 60.4 L365.4 60.4 L366.4 60.4 L367.5 60.4 L368.6 60.4 L369.7 60.4 L370.7 60.4 L371.8 60.4 L372.9 60.4 L373.9 60.4 L375.0 60.4 L376.1 60.4 L377.1 60.4 L378.2 60.4 L379.3 60.4 L380.3 60.4 L381.4 60.4 L382.5 60.4 L383.5 60.4 L384.6 60.4 L385.7 60.4 L386.8 60.4 L387.8 60.4 L388.9 60.4 L390.0 60.4 L391.0 60.4 L392.1 60.4 L393.2 60.4 L394.2 60.4 L395.3 60.4 L396.4 60.4 L397.4 60.4 L398.5 60.4 L399.6 60.4 L400.6 60.4 L401.7 60.4 L402.8 60.4 L403.9 60.4 L404.9 60.4 L406.0 60.4 L407.1 60.4 L408.1 60.4 L409.2 60.4 L410.3 60.5 L411.3 60.5 L412.4 60.5 L413.5 60.5 L414.5 60.5 L415.6 60.5 L416.7 60.5 L417.7 60.5 L418.8 60.5 L419.9 60.5 L420.9 60.5 L422.0 60.5 L423.1 60.5 L424.2 60.5 L425.2 60.5 L426.3 60.5 L427.4 60.5 L428.4 60.5 L429.5 60.5 L430.6 60.5 L431.6 60.5 L432.7 60.5 L433.8 60.5 L434.8 60.5 L435.9 60.5 L437.0 60.5 L438.0 60.5 L439.1 60.5 L440.2 60.5 L441.3 60.5 L442.3 60.5 L443.4 60.5 L444.5 60.5 L445.5 60.5 L446.6 60.5 L447.7 60.5 L448.7 60.5 L449.8 60.5 L450.9 60.5 L451.9 60.5 L453.0 60.5 L454.1 60.5 L455.1 60.5 L456.2 60.5 L457.3 60.5 L458.4 60.5 L459.4 60.5 L460.5 60.5 L461.6 60.5 L462.6 60.5 L463.7 60.5 L464.8 60.5 L465.8 60.5 L466.9 60.5 L468.0 60.5 L469.0 60.5 L470.1 60.5 L471.2 60.5 L472.2 60.5 L473.3 60.5 L474.4 60.5 L475.5 60.5 L476.5 60.5 L477.6 60.5 L478.7 60.5 L479.7 60.5 L480.8 60.5 L481.9 60.5 L482.9 60.5 L484.0 60.5 L485.1 60.5 L486.1 60.5 L487.2 60.5 L488.3 60.5 L489.3 60.5 L490.4 60.5 L491.5 60.5 L492.6 60.6 L493.6 60.6 L494.7 60.6 L495.8 60.6 L496.8 60.6 L497.9 60.6 L499.0 60.6 L500.0 60.6 L501.1 60.6 L502.2 60.6 L503.2 60.6" fill="none" stroke="currentColor" stroke-width="2.0"/>
  <path d="M330.0 118.0 L356.0 118.0" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2 3"/>
  <text x="362.0" y="122.0" font-size="12">uncompensated</text>
  <path d="M330.0 136.0 L356.0 136.0" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 4"/>
  <text x="362.0" y="140.0" font-size="12">lead</text>
  <path d="M330.0 154.0 L356.0 154.0" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="362.0" y="158.0" font-size="12">lag-lead</text>
</svg>
<figcaption>Running example. Lead halves the settling time at the same overshoot; the lag stage then multiplies Kv by 5.3 with a 1.4% slow tail.</figcaption>
</figure>

| | Uncompensated | Lead | Lag-lead |
|---|---|---|---|
| Dominant poles | $-1.105\\pm j1.830$ | $-2.210\\pm j3.660$ | $-2.194\\pm j3.632$ |
| $K$ | $40.2$ | $239.7$ | $239.2$ |
| $K_{v}$ | $1.67$ | $3.14$ | $16.70$ |
| Sim. $\\%OS$ | 14.5 | 14.1 | 15.6 |
| Sim. $T_{s}$ (s) | 3.76 | 1.89 | 1.50 |

The slow pole at $-0.054$ has residue $0.014$, below the $2\\%$ band, so here it does not stretch the
settling time.
`
    },
    {
      title: "9.4: Notch filters",
      sec: "9.4",
      example: "9-27",
      body: `
Structural and mechanical plants often carry a lightly damped resonance on top of the motion being
controlled: a flexible arm, a shaft with torsional compliance, a wing mode. In the model it is a complex
pole pair close to the $j\\omega$ axis. Under feedback those branches tend to swing right, toward
instability, at gains the rigid-body design calls for.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 604" class="nx-fig">
  <defs><marker id="nx9h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 518.0 L402.0 518.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9h)"/>
  <path d="M313.0 569.7 L313.0 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9h)"/>
  <text x="396.0" y="536.0" font-size="13">&#963;</text>
  <text x="319.0" y="30.0" font-size="13">j&#969;</text>
  <path d="M106.3 515.0 L106.3 521.0" stroke="currentColor" stroke-width="1"/>
  <text x="106.3" y="533.0" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M209.7 515.0 L209.7 521.0" stroke="currentColor" stroke-width="1"/>
  <text x="209.7" y="533.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M310.0 311.3 L316.0 311.3" stroke="currentColor" stroke-width="1"/>
  <text x="307.0" y="315.3" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M310.0 104.7 L316.0 104.7" stroke="currentColor" stroke-width="1"/>
  <text x="307.0" y="108.7" font-size="11" text-anchor="end" opacity=".75">j8</text>
  <path d="M313.0 518.0 L311.8 518.0 L310.6 518.0 L309.4 518.0 L308.2 518.0 L307.0 518.0 L305.8 518.0 L304.6 518.0 L303.3 518.0 L302.1 518.0 L300.9 518.0 L299.7 518.0 L298.5 518.0 L297.2 518.0 L296.0 518.0 L294.8 518.0 L293.5 518.0 L292.3 518.0 L291.0 518.0 L289.8 518.0 L288.6 518.0 L287.4 518.0 L286.2 518.0 L284.9 518.0 L283.7 518.0 L282.5 518.0 L281.2 518.0 L280.0 518.0 L278.7 518.0 L277.5 518.0 L276.2 518.0 L274.9 518.0 L273.6 518.0 L272.3 518.0 L271.1 518.0 L269.8 518.0 L268.5 518.0 L267.1 518.0 L265.9 518.0 L264.6 518.0 L263.2 518.0 L262.0 518.0 L260.8 518.0 L259.4 518.0 L258.1 518.0 L256.7 518.0 L255.4 518.0 L254.2 518.0 L252.8 518.0 L251.4 518.0 L250.0 518.0 L248.8 518.0 L247.6 518.0 L246.3 518.0 L244.9 518.0 L243.5 518.0 L242.0 518.0 L240.5 518.0 L239.2 518.0 L238.0 518.0 L236.6 518.0 L235.2 518.0 L233.8 518.0 L232.2 518.0 L230.6 518.0 L228.8 518.0 L227.5 518.0 L226.2 518.0 L224.7 518.0 L223.2 518.0 L221.5 518.0 L219.6 518.0 L217.5 518.0 L215.0 518.0 L213.5 518.0 L211.7 518.0 L209.4 518.0 L204.0 518.0 L203.7 512.4 L203.7 510.1 L203.7 508.3 L203.6 506.8 L203.6 505.4 L203.6 504.2 L203.6 502.1 L203.5 500.2 L203.5 498.4 L203.4 496.8 L203.4 495.3 L203.4 493.9 L203.3 492.6 L203.3 491.3 L203.2 490.0 L203.2 488.9 L203.1 487.2 L203.1 485.5 L203.0 483.9 L202.9 482.4 L202.9 481.0 L202.8 479.6 L202.7 478.2 L202.7 476.8 L202.6 475.5 L202.5 474.2 L202.4 472.9 L202.4 471.7 L202.3 470.5 L202.2 469.3 L202.1 468.1 L202.1 466.9 L202.0 465.8 L201.9 464.6 L201.8 463.5 L201.7 462.0 L201.6 460.6 L201.5 459.2 L201.4 457.7 L201.3 456.3 L201.2 454.9 L201.0 453.6 L200.9 452.2 L200.8 450.8 L200.7 449.5 L200.5 448.1 L200.4 446.8 L200.3 445.5 L200.2 444.2 L200.0 442.9 L199.9 441.6 L199.7 440.3 L199.6 439.0 L199.5 437.7 L199.3 436.4 L199.2 435.2 L199.0 433.9 L198.8 432.6 L198.7 431.3 L198.5 430.1 L198.4 428.8 L198.2 427.6 L198.0 426.3 L197.9 425.0 L197.7 423.8 L197.5 422.5 L197.3 421.3 L197.1 420.0 L196.9 418.8 L196.8 417.5 L196.6 416.3 L196.4 415.0 L196.2 413.7 L196.0 412.5 L195.7 411.2 L195.5 410.0 L195.3 408.7 L195.1 407.5 L194.9 406.2 L194.6 404.9 L194.4 403.7 L194.1 402.4 L193.9 401.1 L193.7 399.8 L193.4 398.6 L193.1 397.3 L192.9 396.0 L192.6 394.7 L192.3 393.4 L192.1 392.1 L191.8 390.9 L191.5 389.6 L191.2 388.3 L190.9 387.3 L190.7 386.3 L190.5 385.3 L190.2 384.3 L190.0 383.4 L189.8 382.4 L189.5 381.4 L189.3 380.4 L189.0 379.4 L188.7 378.4 L188.5 377.4 L188.2 376.4 L187.9 375.4 L187.7 374.4 L187.4 373.4 L187.1 372.4 L186.8 371.4 L186.5 370.4 L186.2 369.4 L185.9 368.4 L185.6 367.4 L185.3 366.4 L185.0 365.3 L184.6 364.3 L184.3 363.3 L184.0 362.3 L183.6 361.2 L183.3 360.2 L183.0 359.2 L182.6 358.2 L182.2 357.1 L181.9 356.1 L181.5 355.1 L181.1 354.0 L180.7 353.0 L180.4 352.0 L180.0 350.9 L179.6 349.9 L179.2 348.8 L178.8 347.8 L178.3 346.7 L177.9 345.7 L177.5 344.7 L177.0 343.6 L176.6 342.6 L176.2 341.5 L175.7 340.5 L175.2 339.4 L174.8 338.4 L174.3 337.3 L173.8 336.3 L173.3 335.2 L172.8 334.2 L172.3 333.1 L171.8 332.1 L171.3 331.0 L170.8 330.0 L170.3 328.9 L169.7 327.9 L169.2 326.8 L168.6 325.8 L168.1 324.8 L167.5 323.7 L167.0 322.7 L166.4 321.6 L165.8 320.6 L165.2 319.6 L164.6 318.5 L164.0 317.5 L163.4 316.5 L162.8 315.5 L162.2 314.4 L161.5 313.4 L160.9 312.4 L160.3 311.4 L159.6 310.4 L159.0 309.3 L158.3 308.3 L157.7 307.3 L157.0 306.3 L156.3 305.3 L155.6 304.3 L154.9 303.4 L154.2 302.4 L153.6 301.4 L152.9 300.4 L152.1 299.4 L151.4 298.4 L150.7 297.5 L150.0 296.5 L149.3 295.6 L148.5 294.6 L147.8 293.6 L147.1 292.7 L146.3 291.7 L145.6 290.8 L144.8 289.9 L144.1 288.9 L143.3 288.0 L142.5 287.1 L141.8 286.2 L141.0 285.2 L140.2 284.3 L139.5 283.4 L138.7 282.5 L137.9 281.6 L137.1 280.7 L136.3 279.8 L135.5 279.0 L134.7 278.1 L134.0 277.2 L133.2 276.3 L132.4 275.4 L131.6 274.6 L130.7 273.7 L129.9 272.9 L129.1 272.0 L128.3 271.1 L127.5 270.3 L126.7 269.5 L125.9 268.6 L125.1 267.8 L124.2 266.9 L123.4 266.1 L122.6 265.3 L121.8 264.5 L121.0 263.6 L120.1 262.8 L119.3 262.0 L118.5 261.2 L117.7 260.4 L116.8 259.6 L116.0 258.8 L115.2 258.0 L114.3 257.2 L113.5 256.4 L112.7 255.6 L111.8 254.8 L111.0 254.1 L110.2 253.3 L109.3 252.5 L108.5 251.7 L107.7 251.0 L106.8 250.2 L106.0 249.4 L105.1 248.7 L104.3 247.9 L103.5 247.1 L102.6 246.4 L101.8 245.6 L100.9 244.9 L100.1 244.1 L99.3 243.4 L98.4 242.6 L97.6 241.9 L96.7 241.1 L95.9 240.4 L95.1 239.6 L94.2 238.9 L93.4 238.2 L92.5 237.4 L91.7 236.7 L90.8 236.0 L90.0 235.2 L89.2 234.5 L88.3 233.8 L87.5 233.1 L86.6 232.3 L85.8 231.6 L84.9 230.9 L84.1 230.2 L83.2 229.4 L82.4 228.7 L81.5 228.0 L80.7 227.3 L79.9 226.6 L79.0 225.9 L78.2 225.2 L77.3 224.4 L76.5 223.7 L75.6 223.0 L74.8 222.3 L73.9 221.6 L73.1 220.9 L72.2 220.2 L71.4 219.5 L70.5 218.8 L69.7 218.1 L68.9 217.4 L68.0 216.7 L67.2 216.0 L66.3 215.3 L65.5 214.6 L64.6 213.9 L63.8 213.2 L62.9 212.5 L62.1 211.8 L61.2 211.1 L60.4 210.4 L59.5 209.7 L58.7 209.0 L57.8 208.3 L57.0 207.6 L56.1 206.9 L55.3 206.2 L54.4 205.5 L53.6 204.8 L52.7 204.1 L51.9 203.4 L51.0 202.7 L50.2 202.0 L49.3 201.4 L48.5 200.7 L47.6 200.0 L46.7 199.3 L45.9 198.6 L45.0 197.9 L44.2 197.2 L43.3 196.5 L42.5 195.8 L41.6 195.1 L40.8 194.4 L39.9 193.7 L39.1 193.0 L38.2 192.3 L37.3 191.6 L36.5 190.9 L35.6 190.2 L34.8 189.5 L34.0 188.9 L34.0 188.2 L34.0 187.5 L34.0 186.8 L34.0 186.1 L34.0 185.4 L34.0 184.7 L34.0 184.0 L34.0 183.3" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(187.9 375.4) rotate(-105.4)"/>
  <path d="M106.3 518.0 L107.5 518.0 L108.7 518.0 L109.9 518.0 L111.2 518.0 L112.4 518.0 L113.6 518.0 L114.8 518.0 L116.0 518.0 L117.2 518.0 L118.5 518.0 L119.7 518.0 L120.9 518.0 L122.1 518.0 L123.3 518.0 L124.6 518.0 L125.8 518.0 L127.1 518.0 L128.3 518.0 L129.5 518.0 L130.7 518.0 L131.9 518.0 L133.2 518.0 L134.4 518.0 L135.7 518.0 L137.0 518.0 L138.2 518.0 L139.4 518.0 L140.7 518.0 L142.0 518.0 L143.3 518.0 L144.6 518.0 L145.9 518.0 L147.2 518.0 L148.5 518.0 L149.8 518.0 L151.1 518.0 L152.5 518.0 L153.8 518.0 L155.1 518.0 L156.4 518.0 L157.9 518.0 L159.1 518.0 L160.4 518.0 L161.8 518.0 L163.3 518.0 L164.5 518.0 L165.8 518.0 L167.1 518.0 L168.6 518.0 L170.1 518.0 L171.7 518.0 L172.9 518.0 L174.3 518.0 L175.7 518.0 L177.2 518.0 L178.9 518.0 L180.6 518.0 L181.9 518.0 L183.3 518.0 L184.7 518.0 L186.3 518.0 L188.1 518.0 L190.2 518.0 L192.6 518.0 L194.1 518.0 L195.9 518.0 L198.1 518.0 L203.5 518.0 L203.7 523.6 L203.7 525.9 L203.7 527.7 L203.6 529.2 L203.6 530.6 L203.6 531.8 L203.6 533.9 L203.5 535.8 L203.5 537.6 L203.4 539.2 L203.4 540.7 L203.4 542.1 L203.3 543.4 L203.3 544.7 L203.2 546.0 L203.2 547.1 L203.1 548.8 L203.1 550.5 L203.0 552.1 L202.9 553.6 L202.9 555.0 L202.8 556.4 L202.7 557.8 L202.7 559.2 L202.6 560.5 L202.5 561.8 L202.4 563.1 L202.4 564.3 L202.3 565.5 L202.2 566.7 L202.1 567.9 L202.1 569.1 L202.0 569.7 L201.9 569.7 L201.8 569.7 L201.7 569.7 L201.6 569.7 L201.5 569.7" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(181.9 518.0) rotate(0.0)"/>
  <path d="M304.7 104.7 L305.1 105.6 L305.5 106.4 L305.9 107.2 L306.3 108.0 L306.7 108.8 L307.1 109.7 L307.5 110.5 L307.9 111.3 L308.3 112.1 L308.7 112.9 L309.2 113.7 L309.6 114.4 L310.0 115.2 L310.5 116.0 L310.9 116.8 L311.4 117.6 L311.8 118.3 L312.3 119.1 L312.8 119.9 L313.2 120.7 L313.7 121.4 L314.2 122.2 L314.7 122.9 L315.2 123.7 L315.7 124.4 L316.2 125.2 L316.8 125.9 L317.3 126.7 L317.8 127.4 L318.4 128.1 L318.9 128.8 L319.5 129.5 L320.1 130.3 L320.6 130.9 L321.2 131.6 L321.8 132.3 L322.3 133.0 L322.9 133.7 L323.5 134.3 L324.2 135.0 L324.8 135.7 L325.4 136.3 L326.0 137.0 L326.7 137.6 L327.3 138.2 L328.0 138.9 L328.7 139.6 L329.3 140.1 L330.0 140.7 L330.6 141.3 L331.3 141.9 L332.0 142.5 L332.8 143.1 L333.5 143.7 L334.3 144.3 L335.1 144.9 L335.9 145.5 L336.6 146.0 L337.4 146.5 L338.1 147.0 L338.9 147.5 L339.6 148.0 L340.4 148.5 L341.2 149.0 L342.1 149.5 L342.9 150.0 L343.8 150.5 L344.7 150.9 L345.6 151.4 L346.5 151.9 L347.4 152.3 L348.4 152.8 L349.4 153.2 L350.4 153.6 L351.4 154.1 L352.4 154.5 L353.5 154.9 L354.6 155.3 L355.6 155.7 L356.7 156.0 L357.9 156.4 L359.0 156.7 L360.2 157.1 L361.3 157.4 L362.5 157.7 L363.7 158.0 L364.9 158.2 L366.1 158.5 L367.3 158.7 L368.6 159.0 L369.8 159.2 L371.1 159.4 L372.4 159.5 L373.6 159.7 L374.9 159.8 L376.2 160.0 L377.5 160.1 L378.9 160.2 L380.2 160.3 L381.5 160.3 L382.8 160.4 L384.2 160.4 L385.5 160.4 L386.9 160.4 L388.2 160.4 L389.6 160.4 L391.0 160.3 L392.3 160.3 L393.7 160.2 L395.1 160.1 L396.5 160.0 L397.8 159.9 L399.0 159.8 L400.1 159.7 L401.2 159.6 L402.3 159.4 L403.4 159.3 L404.5 159.2 L405.6 159.0 L406.0 158.8 L406.0 158.7 L406.0 158.5 L406.0 158.3 L406.0 158.1 L406.0 157.9" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(345.6 151.4) rotate(27.1)"/>
  <path d="M307.0 512.0 L319.0 524.0 M319.0 512.0 L307.0 524.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M100.3 512.0 L112.3 524.0 M112.3 512.0 L100.3 524.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M298.7 98.7 L310.7 110.7 M310.7 98.7 L298.7 110.7" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M298.7 925.3 L310.7 937.3 M310.7 925.3 L298.7 937.3" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <rect x="322.5" y="133.4" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="183.9" y="371.3" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="336.4" y="141.2" font-size="11" text-anchor="start">K = 11.4</text>
</svg>
<figcaption>64K/[s(s+4)(s²+0.32s+64)]. The resonance branches leave the poles at −0.16 ± j8 heading right and cross at K = 5.58. The rigid-body design gain, 11.4, puts them at +0.26 ± j7.37. Upper half shown.</figcaption>
</figure>

The **notch filter** puts a pair of zeros on (or right next to) the resonance poles and a pair of
well-damped poles elsewhere:

$$G_{c}(s)=\\frac{s^{2}+2\\zeta_{r}\\omega_{r}s+\\omega_{r}^{2}}{(s+\\omega_{r})^{2}}$$

This choice of poles gives unity DC gain, so the error constants are unchanged. With the resonance
poles cancelled, their branches have nowhere to go: each runs a short distance from the plant pole to
the filter zero. The remaining design proceeds on the rigid-body plant plus the filter's two real poles.

Exact cancellation is not needed. If the resonance sits slightly off the filter zeros, the branch
between them is short and its closed-loop pole has a tiny residue. 9-27 works the numbers. The name
comes from the dip the filter puts in the frequency response at $\\omega_{r}$ (Chapter 10).
`
    },
    {
      title: "9.4: The compensators side by side",
      sec: "9.4",
      example: "9-03",
      body: `
| Compensator | $G_{c}(s)$ | Fixes | Pole-zero placement | Build |
|---|---|---|---|---|
| PI | $K\\dfrac{s+z_{c}}{s}$ | Error → zero (type +1) | Zero small, near the origin pole | Active |
| Lag | $K\\dfrac{s+z_{c}}{s+p_{c}}$ | Error ÷ $z_{c}/p_{c}$ | Pole near origin, zero a little to its left | Passive |
| PD | $K(s+z_{c})$ | Transient | Zero set by the angle deficit | Active; amplifies noise |
| Lead | $K\\dfrac{s+z_{c}}{s+p_{c}}$ | Transient | Zero chosen, pole farther left from the deficit | Passive |
| PID | $K\\dfrac{(s+z_{1})(s+z_{2})}{s}$ | Both | PD zero + PI zero | Active |
| Lag-lead | lead × lag | Both | Lead pair, then lag pair near origin | Passive |
| Notch | $\\dfrac{s^{2}+2\\zeta_{r}\\omega_{r}s+\\omega_{r}^{2}}{(s+\\omega_{r})^{2}}$ | Resonance | Zeros on the resonant poles | Either |

### Checks that apply to every design

- Find **all** closed-loop poles at the final $K$, not only the dominant pair.
- A real closed-loop pole less than about five times as far left as the dominant pair, and any pole
  between the dominant pair and the $j\\omega$ axis, needs a zero close beside it to be ignorable.
  Compute its residue if in doubt.
- Recompute the error constant with the final $K$; it is rarely exactly the designed value.
- Simulate. Every design in this reading quotes simulated numbers because the predicted ones were off
  often enough to matter.
`
    }
  ],

  formulas: [
    { latex: "\\zeta=\\frac{-\\ln(\\%OS/100)}{\\sqrt{\\pi^{2}+\\ln^{2}(\\%OS/100)}},\\qquad \\theta=\\cos^{-1}\\zeta",
      note: "Overshoot to damping ratio, and the angle of the zeta line measured from the negative real axis." },
    { latex: "\\sigma_{d}=\\frac{4}{T_{s}},\\qquad \\omega_{d}=\\sigma_{d}\\tan\\theta,\\qquad s_{d}=-\\sigma_{d}+j\\omega_{d}",
      note: "Design point from overshoot and settling time. For a peak-time spec use omega_d = pi/Tp instead." },
    { latex: "\\theta_{c}=-180^\\circ-\\angle G(s_{d})\\pmod{360^\\circ}",
      note: "Angle the compensator must add at the design point. Positive: PD or lead. Near zero: PI or lag." },
    { latex: "z=\\sigma_{d}+\\frac{\\omega_{d}}{\\tan\\theta}",
      note: "A real-axis zero or pole at -z subtends angle theta at the design point. Use it to place a PD zero, a lead pole, or a lead zero." },
    { latex: "K=\\frac{\\prod\\text{pole lengths}}{\\prod\\text{zero lengths}}",
      note: "Magnitude criterion at the design point, with the compensator's poles and zeros included." },
    { latex: "G_{c}=K_{1}+\\frac{K_{2}}{s}=\\frac{K_{1}(s+z_{c})}{s},\\qquad z_{c}=\\frac{K_{2}}{K_{1}}",
      note: "PI controller. Raises the system type by one. Keep the zero close to the origin." },
    { latex: "G_{c}=\\frac{s+z_{c}}{s+p_{c}},\\quad z_{c}>p_{c}:\\qquad K_{\\text{new}}\\approx K_{\\text{old}}\\frac{z_{c}}{p_{c}}",
      note: "Lag compensator. Multiplies Kp, Kv or Ka by the ratio when the pair is near the origin." },
    { latex: "\\frac{z_{c}}{p_{c}}=\\frac{K_{\\text{required}}}{K_{\\text{current}}},\\qquad K_{p}=\\frac{1-e_{\\text{step}}}{e_{\\text{step}}},\\quad K_{v}=\\frac{1}{e_{\\text{ramp}}}",
      note: "Ratio a lag must supply. Add a few percent: the gain drops slightly when the pair is added." },
    { latex: "\\Delta\\theta\\approx-\\frac{(z_{c}-p_{c})\\,\\omega_{d}}{\\omega_{n}^{2}}\\ \\text{rad}",
      note: "Angle a small lag or PI pair costs at a dominant pole. Set by the gap between pole and zero, not their ratio." },
    { latex: "G_{c}=K_{2}s+K_{1}=K_{2}(s+z_{c}),\\qquad z_{c}=\\frac{K_{1}}{K_{2}}",
      note: "PD controller. Adds positive angle; gain grows with frequency, so it amplifies noise." },
    { latex: "G_{c}=\\frac{s+z_{c}}{s+p_{c}},\\quad p_{c}>z_{c}:\\qquad \\theta_{c}=\\theta_{z_{c}}-\\theta_{p_{c}}",
      note: "Lead compensator. Choose the zero, then place the pole so the pair supplies the deficit." },
    { latex: "K\\frac{(s+a)(s+b)}{s}:\\quad K_{1}=K(a+b),\\ \\ K_{2}=Kab,\\ \\ K_{3}=K",
      note: "PID gains from the factored root-locus design. Gc = K1 + K2/s + K3 s." },
    { latex: "\\text{lag ratio}=\\frac{K_{v,\\text{required}}}{K_{v,\\text{lead}}}",
      note: "Lag-lead: design the lead first, then ask the lag only for the factor the lead did not supply." },
    { latex: "G_{c}=\\frac{s^{2}+2\\zeta_{r}\\omega_{r}s+\\omega_{r}^{2}}{(s+\\omega_{r})^{2}}",
      note: "Notch filter with unity DC gain. Zeros cancel a lightly damped plant resonance." },
    { latex: "|p_{3}|\\gtrsim5\\,\\sigma_{d}\\quad\\text{or}\\quad p_{3}\\approx z",
      note: "Second-order check on every extra closed-loop pole. A slow pole near a lag or PI zero still leaves a tail: check its residue." }
  ],

  problems: [
    {
      id: "9-01",
      difficulty: "warmup",
      topic: "Why compensate",
      sec: "9.1",
      prompt: `A unity-feedback loop has $G(s)=\\dfrac{K}{s(s+6)}$. The specification is $10\\%$ overshoot
and $T_{s}=1$ s.

(a) Find the gain that gives $10\\%$ overshoot and the resulting settling time.

(b) Show that no gain meets both specifications.

(c) Find the angle a compensator must add at the design point, and say which kind of compensator
that calls for.`,
      hint: `Write the closed-loop poles for $K>9$. Their real part does not depend on $K$.`,
      expert: `
**First glance:** two open-loop poles and no zeros. The complex branches are the vertical line through
the midpoint, $-3$, for every $K>9$.

**Discard:** searching the $\\zeta$ line numerically. The vertical line fixes $T_{s}=4/3$ s for every
underdamped gain before any search.

**Path:** $\\zeta=0.591$ gives $\\omega_{n}=3/0.591$ and $K=\\omega_{n}^{2}$. The design point
$-4+j5.457$ is left of the line, so the deficit is positive: $180^\\circ$ minus the two pole angles.

**Check:** a positive deficit means the point is left of the locus. A zero has to pull the locus over:
PD or lead.
`,
      answer: `(a) $K=25.75$, $T_{s}=1.33$ s. (b) The real part is $-3$ for every $K>9$, so $T_{s}=1.33$ s is the
fastest any gain gives. (c) $\\theta_{c}=+16.1^\\circ$ at $-4+j5.457$: a PD or lead compensator.`,
      solution: `
**Step 1: closed-loop poles.** The characteristic equation is $s^{2}+6s+K=0$, so

$$s=-3\\pm\\sqrt{9-K}=-3\\pm j\\sqrt{K-9}\\quad(K>9)$$

The complex branches run straight up and down the line $\\sigma=-3$.

**Step 2: (a) the 10% gain.**

$$\\zeta=\\frac{-\\ln0.10}{\\sqrt{\\pi^{2}+\\ln^{2}0.10}}=\\frac{2.303}{3.895}=0.591$$

Since $2\\zeta\\omega_{n}=6$, $\\omega_{n}=3/0.591=5.075$ and $K=\\omega_{n}^{2}=25.75$. Then

$$T_{s}=\\frac{4}{\\zeta\\omega_{n}}=\\frac{4}{3}=1.33\\text{ s}$$

**Step 3: (b) why no gain works.** $T_{s}=1$ s needs $\\zeta\\omega_{n}=4$. Every underdamped pole has
$\\zeta\\omega_{n}=3$. Raising $K$ only raises $\\omega_{d}$, which increases overshoot and leaves $T_{s}$
at $1.33$ s.

**Step 4: (c) the angle deficit.** The design point has $\\sigma=4$ on the $\\zeta=0.591$ line,
$\\theta=\\cos^{-1}0.591=53.76^\\circ$:

$$\\omega_{d}=4\\tan53.76^\\circ=5.457,\\qquad s_{d}=-4+j5.457$$

Pole angles at $s_{d}$:

$$\\angle s_{d}=180^\\circ-\\tan^{-1}\\frac{5.457}{4}=126.24^\\circ,\\qquad
\\angle(s_{d}+6)=\\tan^{-1}\\frac{5.457}{2}=69.88^\\circ$$

$$\\angle G=-196.11^\\circ,\\qquad \\theta_{c}=-180^\\circ+196.11^\\circ=+16.11^\\circ$$

Positive angle has to come from a zero: PD, or a lead pair whose zero is nearer the origin than its
pole. (A lone PD zero would sit at $-4-5.457/\\tan16.11^\\circ=-22.9$.)

**Check.** At $K=25.75$, $s=-3\\pm j4.093$, and $\\cos(\\tan^{-1}(4.093/3))=3/5.075=0.591$. ✓
`
    },
    {
      id: "9-02",
      difficulty: "core",
      topic: "Angle deficit",
      sec: "9.1",
      prompt: `For $G(s)=\\dfrac{K}{(s+1)(s+4)(s+10)}$, two candidate design points are
$s_{1}=-2.5+j3$ and $s_{2}=-1.5+j2.5$.

For each point, find the open-loop angle, the angle a compensator would have to add, and which
family of compensator (PD/lead, PI/lag, or neither) could supply it.`,
      hint: `Measure every angle counterclockwise from the positive real direction at the tail of the vector, which is at the pole.`,
      expert: `
**First glance:** both points are close to where the uncompensated locus should cross that region,
so the deficits are small and their signs are the whole answer.

**Discard:** sketching the full locus first. The sign of $-180^\\circ-\\angle G$ already says which side
of the locus each point is on.

**Path:** three arctangents per point, summed and compared to $-180^\\circ$.

**Check:** $s_{1}$ is farther left and higher, so more pole angle accumulates and the deficit should be
positive; $s_{2}$ is closer to the poles' right side and should come out negative.
`,
      answer: `$s_{1}$: $\\angle G=-201.8^\\circ$, needs $+21.8^\\circ$ → PD or lead. $s_{2}$: $\\angle G=-162.7^\\circ$,
needs $-17.3^\\circ$ → net negative angle, which neither family is designed for; PI/lag pairs supply only a
couple of degrees, and $s_{2}$ is slower than what the locus already reaches nearby.`,
      solution: `
**Step 1: angles at $s_{1}=-2.5+j3$.**

| Pole | Vector | Angle |
|---|---|---|
| $-1$ | $-1.5+j3$ | $180^\\circ-63.43^\\circ=116.57^\\circ$ |
| $-4$ | $1.5+j3$ | $63.43^\\circ$ |
| $-10$ | $7.5+j3$ | $21.80^\\circ$ |

$$\\angle G(s_{1})=-(116.57+63.43+21.80)=-201.80^\\circ,\\qquad
\\theta_{c}=-180^\\circ+201.80^\\circ=+21.80^\\circ$$

**Step 2: angles at $s_{2}=-1.5+j2.5$.**

| Pole | Vector | Angle |
|---|---|---|
| $-1$ | $-0.5+j2.5$ | $101.31^\\circ$ |
| $-4$ | $2.5+j2.5$ | $45.00^\\circ$ |
| $-10$ | $8.5+j2.5$ | $16.39^\\circ$ |

$$\\angle G(s_{2})=-162.70^\\circ,\\qquad \\theta_{c}=-180^\\circ+162.70^\\circ=-17.30^\\circ$$

**Step 3: interpret.**

- $s_{1}$ is left of the locus and needs $21.8^\\circ$ of lead: a PD zero or a lead pair.
- $s_{2}$ is right of the locus. Getting there needs $17.3^\\circ$ of net pole angle. A PI or lag pair near
  the origin gives only a degree or two, so it cannot do it, and adding a real pole to slow the system
  down is not a goal any specification in this chapter asks for.

**Check.** The locus crosses the line from the origin through $s_{2}$, $\\zeta=0.514$, at a point with
$\\angle G=-180^\\circ$ exactly; since $\\angle G(s_{2})>-180^\\circ$, that crossing is farther from the
origin than $s_{2}$, consistent with $s_{2}$ being on the slow side of the locus.
`
    },
    {
      id: "9-03",
      difficulty: "warmup",
      topic: "Compensator types",
      sec: "9.1",
      prompt: `Name each compensator, say whether it needs an active implementation, and say what it is
for.

(a) $\\dfrac{5(s+0.2)}{s}$ (b) $\\dfrac{s+0.3}{s+0.03}$ (c) $3(s+4)$ (d) $\\dfrac{s+2}{s+15}$

(e) $\\dfrac{2(s+0.5)(s+3)}{s}$ (f) $\\dfrac{(s+1.5)(s+0.08)}{(s+12)(s+0.01)}$ (g) $\\dfrac{s+0.03}{s+0.3}$`,
      hint: `Ask two questions of each: is there a pole exactly at the origin or a lone zero, and which of each pole-zero pair is nearer the origin?`,
      expert: `
**First glance:** pole at the origin means integral action; a zero with no partner pole means derivative
action; a pair with the pole nearer the origin is lag, the zero nearer is lead.

**Discard:** judging by where the pair sits on the axis. (g) is near the origin like a lag pair, but its
zero is the one nearer the origin.

**Path:** classify each by those rules, then read the purpose from the classification.

**Check:** (g) has DC gain $0.03/0.3=0.1$, so it divides the error constant by ten, the opposite of a
lag.
`,
      answer: `(a) PI, active, zero step/ramp error by raising type. (b) Lag, passive, error constant ×10.
(c) PD, active, transient. (d) Lead, passive, transient. (e) PID, active, both. (f) Lag-lead, passive,
both. (g) A lead pair placed at the origin: passive, gives a little positive angle but divides the
error constant by 10.`,
      solution: `
| | Form | Name | Build | Purpose |
|---|---|---|---|---|
| (a) | pole at $0$, zero at $-0.2$ | PI | active (integrator) | raises type, error → 0 |
| (b) | pole $-0.03$ nearer origin than zero $-0.3$ | lag | passive | $K$ constant ×$\\,0.3/0.03=10$ |
| (c) | lone zero at $-4$ | PD | active (differentiator) | adds angle, faster transient |
| (d) | zero $-2$ nearer origin than pole $-15$ | lead | passive | adds angle, faster transient |
| (e) | two zeros, pole at $0$ | PID | active | transient and error |
| (f) | lead pair $(-1.5,-12)$ × lag pair $(-0.08,-0.01)$ | lag-lead | passive | transient and error ×8 |
| (g) | zero $-0.03$ nearer origin than pole $-0.3$ | lead-type pair | passive | see below |

**(g) in detail.** The zero is nearer the origin, so the pair adds positive angle, but placed this close to the
origin it adds only a degree or two at any normal design point, too little to reshape the locus. Its DC
gain is $0.03/0.3=0.1$, so every static error constant is divided by ten. It has the error effect of a
lag in reverse and almost none of a lead's transient benefit.

**Check.** For (f), the lag part's ratio is $0.08/0.01=8$, so it multiplies the error constant by about 8
on top of whatever the lead pair does to it.
`
    },
    {
      id: "9-04",
      difficulty: "warmup",
      topic: "PI compensation",
      sec: "9.2",
      prompt: `A unity-feedback loop has $G(s)=\\dfrac{K}{(s+2)(s+5)(s+12)}$ and is set for $20\\%$ overshoot.
Its dominant poles are $-2.355\\pm j4.598$ at $K=261.3$.

(a) Find $K_{p}$ and the steady-state error to a unit step.

(b) A PI compensator $\\dfrac{s+0.1}{s}$ is added. What angle does it contribute at the old dominant pole,
and what happens to the step error?

(c) After re-solving, the dominant poles are $-2.332\\pm j4.551$ at $K=259.6$ and the fourth pole is at
$-0.0696$. Describe the step response.`,
      hint: `For (c), compare the fourth pole's time constant with the dominant pair's settling time, and remember what error it has to remove.`,
      expert: `
**First glance:** Type 0 with a large finite error; the PI makes it Type 1, so the step error becomes zero.

**Discard:** recomputing the whole locus for (b). The angle of a small pair at a far pole is a two-term
difference.

**Path:** $K_{p}=K/(2\\cdot5\\cdot12)$; the PI angle is $\\angle(s+0.1)-\\angle s$; the slow pole sets how long
the error takes to vanish.

**Check:** the slow term has to carry roughly the old error, $0.31$, so its residue should be about
$-0.31$.
`,
      answer: `(a) $K_{p}=2.178$, $e(\\infty)=0.315$. (b) $-1.00^\\circ$; the step error becomes zero (Type 1).
(c) Fast rise to about $0.83$ with the original overshoot shape by $0.8$ s, then a slow creep to $1$ with
time constant $14$ s ($0.92$ at $20$ s, $0.98$ at $40$ s).`,
      solution: `
**Step 1: (a) uncompensated error.**

$$K_{p}=\\lim_{s\\to0}G(s)=\\frac{261.3}{2\\cdot5\\cdot12}=2.178,\\qquad
e(\\infty)=\\frac{1}{1+K_{p}}=\\frac{1}{3.178}=0.315$$

The output settles at $0.685$.

**Step 2: (b) the PI's angle at $s=-2.355+j4.598$.**

$$\\angle(s+0.1)=180^\\circ-\\tan^{-1}\\frac{4.598}{2.255}=116.12^\\circ,\\qquad
\\angle s=180^\\circ-\\tan^{-1}\\frac{4.598}{2.355}=117.12^\\circ$$

Net $-1.00^\\circ$. The old point is a degree off the new locus, so the dominant poles barely move. The
open loop now has a pole at the origin, so the system is Type 1 and $e_{\\text{step}}(\\infty)=0$.

**Step 3: (c) the step response.** The closed-loop poles are $-2.332\\pm j4.551$, $-14.27$ and
$-0.0696$. Partial fractions of $C(s)=T(s)/s$:

| Pole | Residue |
|---|---|
| $0$ | $1$ |
| $-0.0696$ | $-0.310$ |
| $-2.332\\pm j4.551$ | $-0.290\\mp j0.325$ |
| $-14.27$ | $-0.111$ |

The slow term $-0.310e^{-0.0696t}$ is the old error being integrated away. For the first second the
response looks like the uncompensated one (peak $0.835$ at $0.78$ s, against $0.812$ uncompensated),
then it creeps: $0.92$ at $20$ s, $0.98$ at $40$ s. The time constant is $1/0.0696=14.4$ s.

**Check.** Residues sum to zero: $1-0.310-2(0.290)-0.111=-0.001\\approx0$. ✓ The slow residue
$-0.310$ matches the old error $0.315$, as expected.
`
    },
    {
      id: "9-05",
      difficulty: "core",
      topic: "PI compensation",
      sec: "9.2",
      prompt: `For $G(s)=\\dfrac{1}{(s+2)(s+5)}$ a PI controller with its zero at $-0.15$ is designed for $10\\%$
overshoot. On the $10\\%$ line the dominant poles come out at $-3.445\\pm j4.701$ with root-locus gain
$K=24.72$.

(a) Find $K_{1}$ and $K_{2}$ for $G_{c}=K_{1}+K_{2}/s$.

(b) A tuning error doubles $K_{2}$ and leaves $K_{1}$ alone. Where does the zero go? The closed-loop
poles become $-3.388\\pm j4.661$ and $-0.223$. Was the error harmful?`,
      hint: `$G_{c}=K_{1}(s+K_{2}/K_{1})/s$. For (b), compare the damping ratio and the slow pole before and after.`,
      expert: `
**First glance:** the root-locus gain is the proportional gain; the zero is the ratio $K_{2}/K_{1}$.

**Discard:** recomputing the design from scratch for (b). Doubling $K_{2}$ at fixed $K_{1}$ just doubles $z_{c}$.

**Path:** $K_{1}=K$, $K_{2}=Kz_{c}$. For (b) read $\\zeta$ from the new pair and the time constant from the
slow pole.

**Check:** the PI angle at the design point roughly doubles with $z_{c}$, from about $-1.2^\\circ$ to
$-2.5^\\circ$, which is still small.
`,
      answer: `(a) $K_{1}=24.72$, $K_{2}=3.708$. (b) Zero moves to $-0.30$. $\\zeta$ goes from $0.591$ to $0.588$
(overshoot essentially unchanged) while the slow pole moves from $-0.109$ to $-0.223$, so the error is
removed about twice as fast. The tuning error helped.`,
      solution: `
**Step 1: (a) gains.** The design is

$$G_{c}(s)=24.72\\,\\frac{s+0.15}{s}=24.72+\\frac{24.72\\cdot0.15}{s}=24.72+\\frac{3.708}{s}$$

so $K_{1}=24.72$, $K_{2}=3.708$.

**Step 2: (b) new zero.** $z_{c}=K_{2}/K_{1}=7.416/24.72=0.30$.

**Step 3: compare the poles.**

| | Zero | Dominant pair | $\\zeta$ | Slow pole | Time constant |
|---|---|---|---|---|---|
| Design | $-0.15$ | $-3.445\\pm j4.701$ | $0.591$ | $-0.109$ | $9.2$ s |
| Doubled $K_{2}$ | $-0.30$ | $-3.388\\pm j4.661$ | $0.588$ | $-0.223$ | $4.5$ s |

$\\zeta=3.388/\\sqrt{3.388^{2}+4.661^{2}}=3.388/5.762=0.588$: overshoot $10.2\\%$ instead of $10\\%$.

**Step 4: interpret.** The PI zero trades two things. Near the origin it disturbs the dominant pair less;
farther out, the closed-loop pole that does the integrating is faster. Here the disturbance is still
negligible at $z_{c}=0.3$ and the slow mode is twice as fast. Simulated $2\\%$ settling drops from $24.1$ s
to $11.6$ s.

**Check.** PI angle at $-3.445+j4.701$: $\\angle(s+0.15)-\\angle s=-1.21^\\circ$; with $0.30$,
$-2.45^\\circ$. Both small. ✓
`
    },
    {
      id: "9-06",
      difficulty: "core",
      topic: "Lag compensation",
      sec: "9.2",
      prompt: `A unity-feedback loop has $G(s)=\\dfrac{K}{s(s+4)(s+10)}$ and must run at $20\\%$ overshoot.

(a) The locus crosses the $20\\%$ line at $-1.374\\pm j2.682$. Find $K$, $K_{v}$ and the ramp error.

(b) Design a lag compensator with $p_{c}=0.01$ for a tenfold improvement in ramp error.

(c) With the lag in place the crossing moves to $-1.339\\pm j2.614$. Find the new $K$, $K_{v}$ and the
actual improvement.`,
      hint: `$K=|s||s+4||s+10|$ at the crossing. The lag ratio is the improvement factor.`,
      expert: `
**First glance:** Type 1, so ramp error is $1/K_{v}$, and the lag ratio is the improvement factor.

**Discard:** designing the lag from the ramp error directly. The ratio $10$ is already the answer; $p_{c}$
sets the scale.

**Path:** $K$ from lengths, $K_{v}=K/40$, $z_{c}=10p_{c}$; then lengths again at the new point and
$K_{v}=K\\cdot z_{c}/(40p_{c})$.

**Check:** the new $K$ should be slightly lower than the old, so the improvement should come in just
under $10$.
`,
      answer: `(a) $K=102.2$, $K_{v}=2.554$, $e_{\\text{ramp}}=0.392$. (b) $G_{c}=\\dfrac{s+0.1}{s+0.01}$.
(c) $K=100.5$, $K_{v}=25.12$, $e_{\\text{ramp}}=0.0398$: a factor of $9.83$.`,
      solution: `
**Step 1: (a) gain at the crossing.** At $s=-1.374+j2.682$:

$$|s|=3.013,\\quad |s+4|=\\sqrt{2.626^{2}+2.682^{2}}=3.754,\\quad |s+10|=\\sqrt{8.626^{2}+2.682^{2}}=9.033$$

$$K=3.013\\cdot3.754\\cdot9.033=102.2,\\qquad K_{v}=\\frac{102.2}{4\\cdot10}=2.554,\\qquad e=\\frac{1}{K_{v}}=0.392$$

**Step 2: (b) the lag.** A tenfold improvement needs $z_{c}/p_{c}=10$. With $p_{c}=0.01$, $z_{c}=0.1$:

$$G_{c}(s)=\\frac{s+0.1}{s+0.01}$$

**Step 3: (c) re-solve.** At $s=-1.339+j2.614$:

$$|s|=2.937,\\ |s+4|=3.730,\\ |s+10|=9.047,\\ |s+0.01|=2.932,\\ |s+0.1|=2.893$$

$$K=\\frac{2.937\\cdot3.730\\cdot9.047\\cdot2.932}{2.893}=100.5$$

$$K_{v}=\\frac{100.5\\cdot0.1}{4\\cdot10\\cdot0.01}=25.12,\\qquad e=0.0398,\\qquad \\frac{25.12}{2.554}=9.83$$

**Step 4: the other poles.** At $K=100.5$: $-11.23$ and $-0.104$. The slow pole is $0.004$ from the lag
zero.

**Check.** The shortfall from $10$ is the gain ratio $100.5/102.2=0.983$. Asking for a ratio of
$10/0.983\\approx10.2$ would hit $10$. Simulated overshoot rises to $23.4\\%$; the slow pole's tail adds
it (see 9-08).
`
    },
    {
      id: "9-07",
      difficulty: "warmup",
      topic: "Lag compensation",
      sec: "9.2",
      prompt: `A Type 0 loop has been tuned for its transient and has $K_{p}=4.2$ at that gain. The step error must
be no more than $2\\%$. Design the lag ratio, and the zero if the pole is placed at $-0.005$.`,
      hint: `Find the $K_{p}$ that gives $2\\%$ error first.`,
      expert: `
**First glance:** a ratio problem. Required $K_{p}$ over current $K_{p}$.

**Discard:** working with the errors directly. Errors do not scale by the ratio; $K_{p}$ does.

**Path:** $K_{p}=(1-e)/e=49$; ratio $49/4.2$; $z_{c}=$ ratio $\\times p_{c}$.

**Check:** the current error is $1/5.2=19\\%$; $2\\%$ is about ten times smaller, so a ratio near $10$ to
$12$ is the right size.
`,
      answer: `Required $K_{p}=49$, ratio $11.67$; $z_{c}=0.0583$, so $G_{c}=\\dfrac{s+0.0583}{s+0.005}$. Use a
slightly larger ratio (about $12$) to cover the small gain drop.`,
      solution: `
**Step 1: required $K_{p}$.**

$$e=\\frac{1}{1+K_{p}}\\le0.02\\ \\Rightarrow\\ K_{p}\\ge\\frac{1-0.02}{0.02}=49$$

**Step 2: ratio.**

$$\\frac{z_{c}}{p_{c}}=\\frac{49}{4.2}=11.67$$

**Step 3: zero.**

$$z_{c}=11.67\\cdot0.005=0.0583,\\qquad G_{c}=\\frac{s+0.0583}{s+0.005}$$

**Step 4: margin.** Adding the pair lowers the gain at the dominant pole by one to two percent (9-06),
so the delivered $K_{p}$ comes in that much under $49$. A ratio of $12$ ($z_{c}=0.06$) keeps the error under
$2\\%$.

**Check.** Current error $1/(1+4.2)=0.192$. With $K_{p}=49$, $1/50=0.02$. ✓
`
    },
    {
      id: "9-08",
      difficulty: "challenge",
      topic: "Lag compensation",
      sec: "9.2",
      prompt: `Return to $\\dfrac{K}{s(s+4)(s+10)}$ at $20\\%$ overshoot ($-1.374\\pm j2.682$, $K_{v}=2.554$).
Three lag compensators all have ratio $10$:

$$\\text{(i)}\\ \\frac{s+0.5}{s+0.05}\\qquad\\text{(ii)}\\ \\frac{s+0.1}{s+0.01}\\qquad\\text{(iii)}\\ \\frac{s+0.01}{s+0.001}$$

(a) Estimate the angle each contributes at the dominant pole.

(b) After re-solving on the $20\\%$ line, the slow closed-loop poles and their step-response residues are
(i) $-0.626$, $0.320$; (ii) $-0.104$, $0.039$; (iii) $-0.0100$, $0.0036$. Predict how each affects the step
response and how fast the ramp error reaches its new value.

(c) Which would you choose, and for what specification?`,
      hint: `Use $\\Delta\\theta\\approx-(z_{c}-p_{c})\\omega_{d}/\\omega_{n}^{2}$. A tail with residue $r$ and pole $-a$ stays outside the $2\\%$ band for about $\\ln(r/0.02)/a$ seconds.`,
      expert: `
**First glance:** same ratio, so the same steady-state improvement. The gap $z_{c}-p_{c}$ differs by
factors of ten, and that gap drives both the angle stolen and the tail's residue.

**Discard:** the rule "place $p_{c}$ at $0.01$." It is a starting point; the tail is the real constraint.

**Path:** angle from the small-pair formula; step-response effect from residue and decay rate; ramp
convergence from the slow pole's time constant.

**Check:** the residue scales roughly with the gap, and the decay rate roughly with $z_{c}$; the two
pull in opposite directions.
`,
      answer: `(a) (i) $-7.6^\\circ$ (exact $-8.2^\\circ$), (ii) $-1.52^\\circ$, (iii) $-0.152^\\circ$. (b) (i) moves the
pair visibly and its $0.32$ tail raises overshoot to $38\\%$; ramp error converges in seconds. (ii) adds a
$0.039$ tail: overshoot $23\\%$, $T_{s}=6.5$ s; ramp error within $10\\%$ of final after $44$ s. (iii) leaves the
step response unchanged ($19.6\\%$, $T_{s}=2.8$ s); ramp error takes $450$ s. (c) (iii) for a step-response
spec; (ii) as a compromise when ramp convergence time also matters; never (i).`,
      solution: `
**Step 1: (a) angle estimates.** At $s=-1.374+j2.682$: $\\omega_{d}=2.682$,
$\\omega_{n}^{2}=1.374^{2}+2.682^{2}=9.081$, so $\\omega_{d}/\\omega_{n}^{2}=0.2953$.

| | $z_{c}-p_{c}$ | $\\Delta\\theta$ estimate | exact |
|---|---|---|---|
| (i) | $0.45$ | $-0.133$ rad $=-7.61^\\circ$ | $-8.23^\\circ$ |
| (ii) | $0.09$ | $-1.52^\\circ$ | $-1.55^\\circ$ |
| (iii) | $0.009$ | $-0.152^\\circ$ | $-0.153^\\circ$ |

The estimate degrades for (i) because $0.5$ is no longer small next to $\\omega_{n}=3.0$.

**Step 2: (b) step response.** The tail term is $r\\,e^{-at}$ added to an otherwise $20\\%$ response.

| | $a$ | $r$ | time above $2\\%$: $\\ln(r/0.02)/a$ | sim. $\\%OS$ | sim. $T_{s}$ |
|---|---|---|---|---|---|
| (i) | $0.626$ | $0.320$ | $4.4$ s | $38.4$ | $4.79$ s |
| (ii) | $0.104$ | $0.039$ | $6.4$ s | $23.4$ | $6.49$ s |
| (iii) | $0.0100$ | $0.0036$ | below band | $19.6$ | $2.81$ s |

In (i) the angle of $-8^\\circ$ also pulls the dominant pair toward the axis; together they push overshoot
to $38\\%$.

**Step 3: (b) ramp error.** The ramp error approaches $1/K_{v,\\text{new}}$ at the slow pole's rate.
Simulated time to get within $10\\%$ of the final ramp error: (i) $7.6$ s, (ii) $44$ s, (iii) $449$ s.
Final $K_{v}$: $22.6$, $25.1$, $25.5$, because (i) also lost gain.

**Step 4: (c) choose.** Nothing about (i) works: it breaks the transient design. (iii) is the right choice if
the specification is the step response plus a steady-state ramp error. If the ramp error must also
settle within a minute, (ii) is the compromise, and its overshoot would need checking against the spec.

**Check.** The residue roughly tracks the gap: $0.32/0.45$, $0.039/0.09$, $0.0036/0.009$ are $0.71$,
$0.43$, $0.40$. Same order, as the reasoning predicted.
`
    },
    {
      id: "9-09",
      difficulty: "challenge",
      topic: "Lag compensation",
      sec: "9.2",
      prompt: `$G(s)=\\dfrac{K}{s(s+2)(s+9)}$ runs at $15\\%$ overshoot: dominant poles $-0.826\\pm j1.368$,
$K=23.88$, $K_{v}=1.327$. A designer wants ten times the $K_{v}$ and, reasoning that "only the ratio
matters," installs $\\dfrac{s+1}{s+0.1}$ and leaves $K$ at $23.88$.

(a) What angle does this pair add at the old dominant pole?

(b) Find the new dominant poles at $K=23.88$ and predict the overshoot. The closed-loop
characteristic polynomial is $s(s+2)(s+9)(s+0.1)+23.88(s+1)$.

(c) Repeat (a) for $\\dfrac{s+0.1}{s+0.01}$, and explain the difference.`,
      hint: `The small-angle formula overestimates nothing here; use exact arctangents. For (b), factor the quartic numerically or check the given roots.`,
      expert: `
**First glance:** the zero at $-1$ sits right next to the dominant real part, $-0.83$. That pair is not
small compared with the dominant poles.

**Discard:** the claim that the ratio alone matters. The ratio sets the error constant; the gap sets the
angle, and a gap of $0.9$ next to $\\omega_{n}=1.6$ is huge.

**Path:** exact angles of the pair at $-0.826+j1.368$; then the quartic's roots; then $\\zeta$ from the
dominant pair.

**Check:** the compensated locus should run to the right of the old operating point, never reaching the
$15\\%$ line at a useful gain.
`,
      answer: `(a) $-35.2^\\circ$. (b) Dominant poles $-0.216\\pm j1.360$, $\\zeta=0.157$, predicted $61\\%$ overshoot
(simulated $75\\%$); other poles $-1.35$, $-9.32$. The $15\\%$ line is crossed only near the origin
($K=0.18$). (c) $-2.86^\\circ$: the gap is $0.09$ instead of $0.9$.`,
      solution: `
**Step 1: (a) angle of $(s+1)/(s+0.1)$ at $s=-0.826+j1.368$.**

$$\\angle(s+1)=\\tan^{-1}\\frac{1.368}{0.174}=82.75^\\circ,\\qquad
\\angle(s+0.1)=180^\\circ-\\tan^{-1}\\frac{1.368}{0.726}=117.95^\\circ$$

$$\\Delta\\theta=82.75^\\circ-117.95^\\circ=-35.2^\\circ$$

The old point now has $\\angle G G_{c}=-215.2^\\circ$, nowhere near $-180^\\circ$.

**Step 2: (b) the new poles at $K=23.88$.** Expanding,

$$s^{4}+11.1s^{3}+19.1s^{2}+25.68s+23.88=0$$

with roots $-9.316$, $-1.351$, $-0.216\\pm j1.360$.

$$\\zeta=\\frac{0.216}{\\sqrt{0.216^{2}+1.360^{2}}}=0.157,\\qquad
\\%OS=100e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}=61\\%$$

Simulation gives $75\\%$, because the real pole at $-1.35$ next to the zero at $-1$ does not cancel.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 421" class="nx-fig">
  <defs><marker id="nx9p09" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 334.9 L482.0 334.9" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p09)"/>
  <path d="M399.1 387.1 L399.1 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p09)"/>
  <text x="476.0" y="352.9" font-size="13">&#963;</text>
  <text x="405.1" y="30.0" font-size="13">j&#969;</text>
  <path d="M51.4 331.9 L51.4 337.9" stroke="currentColor" stroke-width="1"/>
  <text x="51.4" y="349.9" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M138.3 331.9 L138.3 337.9" stroke="currentColor" stroke-width="1"/>
  <text x="138.3" y="349.9" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M225.2 331.9 L225.2 337.9" stroke="currentColor" stroke-width="1"/>
  <text x="225.2" y="349.9" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M312.2 331.9 L312.2 337.9" stroke="currentColor" stroke-width="1"/>
  <text x="312.2" y="349.9" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M396.1 248.0 L402.1 248.0" stroke="currentColor" stroke-width="1"/>
  <text x="393.1" y="252.0" font-size="11" text-anchor="end" opacity=".75">j1</text>
  <path d="M396.1 161.1 L402.1 161.1" stroke="currentColor" stroke-width="1"/>
  <text x="393.1" y="165.1" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M396.1 74.2 L402.1 74.2" stroke="currentColor" stroke-width="1"/>
  <text x="393.1" y="78.2" font-size="11" text-anchor="end" opacity=".75">j3</text>
  <path d="M399.1 334.9 L397.9 334.9 L396.7 334.9 L395.5 334.9 L394.2 334.9 L393.0 334.9 L391.8 334.9 L390.6 334.9 L389.4 334.9 L388.2 334.9 L386.9 334.9 L385.7 334.9 L384.5 334.9 L383.3 334.9 L382.0 334.9 L380.8 334.9 L379.5 334.9 L378.3 334.9 L377.0 334.9 L375.7 334.9 L374.4 334.9 L373.1 334.9 L371.9 334.9 L370.6 334.9 L369.3 334.9 L368.1 334.9 L366.8 334.9 L365.6 334.9 L364.3 334.9 L363.0 334.9 L361.7 334.9 L360.4 334.9 L359.0 334.9 L357.7 334.9 L356.4 334.9 L355.0 334.9 L353.7 334.9 L352.4 334.9 L351.0 334.9 L349.5 334.9 L348.2 334.9 L346.8 334.9 L345.4 334.9 L343.9 334.9 L342.6 334.9 L341.3 334.9 L339.9 334.9 L338.4 334.9 L336.7 334.9 L335.5 334.9 L334.1 334.9 L332.7 334.9 L331.1 334.9 L329.2 334.9 L327.0 334.9 L325.6 334.9 L324.0 334.9 L321.6 334.9 L317.5 332.2 L317.5 329.2 L317.6 327.4 L317.6 325.9 L317.6 324.6 L317.6 322.4 L317.7 320.5 L317.7 318.8 L317.7 317.3 L317.8 315.9 L317.8 314.6 L317.9 313.4 L317.9 312.2 L317.9 310.5 L318.0 308.9 L318.1 307.4 L318.1 306.0 L318.2 304.6 L318.2 303.2 L318.3 301.9 L318.3 300.7 L318.4 299.4 L318.5 298.2 L318.5 297.1 L318.6 295.9 L318.7 294.4 L318.8 293.0 L318.8 291.5 L318.9 290.1 L319.0 288.8 L319.1 287.4 L319.2 286.1 L319.3 284.8 L319.4 283.5 L319.5 282.2 L319.6 280.9 L319.7 279.7 L319.8 278.4 L319.9 277.2 L320.0 276.0 L320.1 274.8 L320.2 273.6 L320.3 272.4 L320.4 271.2 L320.5 270.0 L320.6 268.9 L320.7 267.7 L320.8 266.6 L320.9 265.4 L321.0 264.3 L321.1 263.1 L321.2 262.0 L321.4 260.8 L321.5 259.7 L321.6 258.6 L321.7 257.4 L321.8 256.3 L322.0 255.2 L322.1 254.1 L322.2 253.0 L322.3 251.8 L322.5 250.7 L322.6 249.6 L322.7 248.5 L322.9 247.4 L323.0 246.3 L323.1 245.1 L323.3 244.0 L323.4 242.9 L323.5 241.8 L323.7 240.7 L323.8 239.6 L324.0 238.4 L324.1 237.3 L324.3 236.2 L324.4 235.1 L324.6 234.0 L324.7 232.8 L324.9 231.7 L325.1 230.6 L325.2 229.5 L325.4 228.3 L325.5 227.2 L325.7 226.1 L325.9 224.9 L326.0 223.8 L326.2 222.7 L326.4 221.5 L326.6 220.4 L326.7 219.2 L326.9 218.1 L327.1 216.9 L327.3 215.8 L327.5 214.6 L327.7 213.5 L327.9 212.3 L328.1 211.1 L328.3 210.0 L328.5 208.8 L328.7 207.6 L328.9 206.5 L329.1 205.3 L329.3 204.1 L329.5 202.9 L329.7 201.7 L329.9 200.5 L330.1 199.3 L330.3 198.1 L330.6 196.9 L330.8 195.7 L331.0 194.5 L331.2 193.3 L331.5 192.0 L331.7 190.8 L331.9 189.6 L332.2 188.4 L332.4 187.1 L332.7 185.9 L332.9 184.6 L333.1 183.4 L333.4 182.1 L333.7 180.9 L333.9 179.6 L334.2 178.3 L334.4 177.1 L334.7 175.8 L335.0 174.5 L335.2 173.2 L335.5 171.9 L335.8 170.6 L336.1 169.3 L336.4 168.0 L336.6 166.7 L336.9 165.7 L337.1 164.7 L337.3 163.7 L337.5 162.7 L337.7 161.7 L338.0 160.7 L338.2 159.7 L338.4 158.7 L338.7 157.7 L338.9 156.7 L339.1 155.7 L339.4 154.7 L339.6 153.6 L339.8 152.6 L340.1 151.6 L340.3 150.6 L340.6 149.5 L340.8 148.5 L341.1 147.5 L341.3 146.4 L341.6 145.4 L341.8 144.3 L342.1 143.3 L342.3 142.2 L342.6 141.1 L342.8 140.1 L343.1 139.0 L343.4 138.0 L343.6 136.9 L343.9 135.8 L344.2 134.7 L344.5 133.7 L344.7 132.6 L345.0 131.5 L345.3 130.4 L345.6 129.3 L345.9 128.2 L346.1 127.1 L346.4 126.0 L346.7 124.9 L347.0 123.8 L347.3 122.7 L347.6 121.5 L347.9 120.4 L348.2 119.3 L348.5 118.2 L348.8 117.0 L349.1 115.9 L349.4 114.8 L349.8 113.6 L350.1 112.5 L350.4 111.3 L350.7 110.2 L351.0 109.0 L351.3 107.9 L351.7 106.7 L352.0 105.5 L352.3 104.4 L352.7 103.2 L353.0 102.0 L353.3 100.8 L353.7 99.6 L354.0 98.4 L354.4 97.2 L354.7 96.1 L355.1 94.9 L355.4 93.6 L355.8 92.4 L356.1 91.2 L356.5 90.0 L356.8 88.8 L357.2 87.6 L357.6 86.3 L357.9 85.1 L358.3 83.9 L358.7 82.6 L359.1 81.4 L359.4 80.2 L359.8 78.9 L360.2 77.6 L360.6 76.4 L361.0 75.1 L361.4 73.9 L361.8 72.6 L362.2 71.3 L362.6 70.0 L363.0 68.8 L363.4 67.5 L363.8 66.2 L364.2 64.9 L364.6 63.6 L365.0 62.3 L365.4 61.0 L365.8 59.7 L366.3 58.4 L366.7 57.0 L367.1 55.7 L367.6 54.4 L368.0 53.1 L368.4 51.7 L368.9 50.4 L369.3 49.1 L369.7 47.7 L370.2 46.4 L370.5 45.4 L370.8 44.5 L371.1 43.6 L371.4 42.7 L371.7 41.8 L372.0 40.9 L372.3 40.0 L372.6 39.1 L372.9 38.2 L373.3 37.2 L373.6 36.3 L373.9 35.4 L374.2 34.5 L374.5 33.5 L374.8 32.6 L375.1 31.7 L375.5 30.7 L375.8 29.8 L376.1 28.9 L376.4 27.9 L376.8 27.0 L377.1 26.0 L377.4 25.1 L377.7 24.1 L378.1 23.2 L378.4 22.2 L378.7 22.0 L379.1 22.0 L379.4 22.0 L379.8 22.0 L380.1 22.0 L380.4 22.0 L380.8 22.0 L381.1 22.0 L381.5 22.0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>
  <path d="M225.2 334.9 L226.4 334.9 L227.6 334.9 L228.8 334.9 L230.0 334.9 L231.3 334.9 L232.5 334.9 L233.7 334.9 L234.9 334.9 L236.1 334.9 L237.3 334.9 L238.5 334.9 L239.8 334.9 L241.0 334.9 L242.3 334.9 L243.5 334.9 L244.7 334.9 L246.0 334.9 L247.3 334.9 L248.5 334.9 L249.8 334.9 L251.1 334.9 L252.3 334.9 L253.6 334.9 L254.8 334.9 L256.1 334.9 L257.4 334.9 L258.7 334.9 L260.0 334.9 L261.3 334.9 L262.6 334.9 L263.9 334.9 L265.2 334.9 L266.5 334.9 L267.8 334.9 L269.2 334.9 L270.4 334.9 L271.7 334.9 L273.0 334.9 L274.4 334.9 L275.7 334.9 L276.9 334.9 L278.3 334.9 L279.7 334.9 L281.2 334.9 L282.4 334.9 L283.7 334.9 L285.1 334.9 L286.6 334.9 L288.1 334.9 L289.3 334.9 L290.6 334.9 L292.0 334.9 L293.4 334.9 L295.0 334.9 L296.6 334.9 L297.8 334.9 L299.1 334.9 L300.5 334.9 L302.0 334.9 L303.7 334.9 L305.6 334.9 L307.9 334.9 L309.3 334.9 L311.0 334.9 L313.4 334.9 L317.5 337.7 L317.5 340.6 L317.6 342.5 L317.6 344.0 L317.6 345.3 L317.6 347.5 L317.7 349.3 L317.7 351.0 L317.7 352.5 L317.8 353.9 L317.8 355.2 L317.9 356.5 L317.9 357.7 L317.9 359.3 L318.0 360.9 L318.1 362.4 L318.1 363.9 L318.2 365.3 L318.2 366.6 L318.3 367.9 L318.3 369.2 L318.4 370.4 L318.5 371.6 L318.5 372.8 L318.6 373.9 L318.7 375.4 L318.8 376.9 L318.8 378.3 L318.9 379.7 L319.0 381.1 L319.1 382.4 L319.2 383.8 L319.3 385.1 L319.4 386.4 L319.5 387.1 L319.6 387.1 L319.7 387.1 L319.8 387.1 L319.9 387.1 L320.0 387.1 L320.1 387.1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4"/>
  <path d="M399.1 334.9 L397.9 334.9 L396.7 334.9 L395.4 334.9 L394.7 334.4 L394.7 333.2 L394.7 332.0 L394.6 330.8 L394.6 329.7 L394.6 328.5 L394.5 327.3 L394.5 326.2 L394.4 325.0 L394.4 323.9 L394.3 322.7 L394.2 321.6 L394.2 320.4 L394.1 319.3 L394.0 318.2 L393.9 317.1 L393.8 315.9 L393.7 314.8 L393.6 313.7 L393.5 312.6 L393.4 311.5 L393.2 310.4 L393.1 309.3 L393.0 308.2 L392.9 307.1 L392.7 306.0 L392.6 304.9 L392.4 303.9 L392.3 302.8 L392.1 301.7 L392.0 300.6 L391.8 299.6 L391.6 298.5 L391.5 297.5 L391.3 296.4 L391.1 295.3 L391.0 294.3 L390.8 293.2 L390.6 292.2 L390.4 291.1 L390.2 290.0 L390.0 289.0 L389.8 287.9 L389.7 286.8 L389.5 285.8 L389.3 284.7 L389.1 283.7 L388.9 282.6 L388.7 281.5 L388.5 280.4 L388.3 279.4 L388.1 278.4 L387.9 277.3 L387.7 276.2 L387.5 275.1 L387.3 274.1 L387.1 273.0 L386.9 271.9 L386.7 270.9 L386.5 269.7 L386.2 268.6 L386.1 267.6 L385.9 266.5 L385.7 265.4 L385.5 264.3 L385.3 263.2 L385.1 262.1 L384.9 260.9 L384.7 259.9 L384.5 258.9 L384.3 257.8 L384.2 256.7 L384.0 255.6 L383.8 254.5 L383.6 253.3 L383.5 252.2 L383.3 251.0 L383.1 249.8 L382.9 248.6 L382.8 247.5 L382.6 246.5 L382.5 245.4 L382.4 244.3 L382.2 243.1 L382.1 242.0 L381.9 240.8 L381.8 239.7 L381.7 238.5 L381.6 237.3 L381.4 236.1 L381.3 234.8 L381.2 233.6 L381.1 232.3 L381.0 231.0 L380.9 229.7 L380.8 228.4 L380.7 227.1 L380.6 225.7 L380.6 224.6 L380.5 223.4 L380.5 222.3 L380.4 221.1 L380.4 219.9 L380.3 218.7 L380.3 217.5 L380.3 216.3 L380.2 215.0 L380.2 213.8 L380.2 212.5 L380.2 211.3 L380.2 210.0 L380.2 208.7 L380.2 207.4 L380.2 206.1 L380.2 204.8 L380.3 203.5 L380.3 202.1 L380.3 200.8 L380.4 199.4 L380.4 198.0 L380.5 196.6 L380.6 195.2 L380.6 193.8 L380.7 192.4 L380.8 191.2 L380.8 190.1 L380.9 188.9 L381.0 187.8 L381.1 186.6 L381.2 185.4 L381.3 184.2 L381.4 183.0 L381.5 181.8 L381.6 180.6 L381.7 179.4 L381.8 178.2 L381.9 177.0 L382.0 175.8 L382.2 174.5 L382.3 173.3 L382.4 172.0 L382.6 170.8 L382.7 169.5 L382.9 168.2 L383.0 166.9 L383.2 165.7 L383.3 164.4 L383.5 163.1 L383.7 161.8 L383.9 160.4 L384.1 159.1 L384.2 157.8 L384.4 156.5 L384.6 155.1 L384.8 153.8 L385.0 152.4 L385.3 151.1 L385.5 149.7 L385.7 148.3 L385.9 147.3 L386.0 146.3 L386.2 145.2 L386.4 144.2 L386.6 143.1 L386.7 142.1 L386.9 141.0 L387.1 140.0 L387.3 138.9 L387.5 137.8 L387.7 136.8 L387.9 135.7 L388.1 134.6 L388.3 133.5 L388.5 132.5 L388.7 131.4 L388.9 130.3 L389.1 129.2 L389.4 128.1 L389.6 127.0 L389.8 125.9 L390.0 124.7 L390.3 123.6 L390.5 122.5 L390.7 121.4 L391.0 120.3 L391.2 119.1 L391.4 118.0 L391.7 116.9 L391.9 115.7 L392.2 114.6 L392.4 113.4 L392.7 112.3 L393.0 111.1 L393.2 109.9 L393.5 108.8 L393.7 107.6 L394.0 106.4 L394.3 105.2 L394.6 104.1 L394.8 102.9 L395.1 101.7 L395.4 100.5 L395.7 99.3 L396.0 98.1 L396.3 96.9 L396.6 95.7 L396.9 94.5 L397.2 93.2 L397.5 92.0 L397.8 90.8 L398.1 89.6 L398.4 88.3 L398.7 87.1 L399.0 85.8 L399.4 84.6 L399.7 83.3 L400.0 82.1 L400.4 80.8 L400.7 79.6 L401.0 78.3 L401.4 77.0 L401.7 75.7 L402.1 74.5 L402.4 73.2 L402.8 71.9 L403.1 70.6 L403.5 69.3 L403.8 68.0 L404.2 66.7 L404.6 65.4 L404.9 64.1 L405.3 62.7 L405.7 61.4 L406.1 60.1 L406.4 58.8 L406.8 57.4 L407.2 56.1 L407.6 54.7 L408.0 53.4 L408.4 52.0 L408.8 50.7 L409.2 49.3 L409.6 48.0 L410.0 46.6 L410.4 45.2 L410.8 43.8 L411.1 42.9 L411.4 42.0 L411.7 41.1 L412.0 40.1 L412.3 39.2 L412.5 38.3 L412.8 37.3 L413.1 36.4 L413.4 35.5 L413.7 34.5 L414.0 33.6 L414.3 32.6 L414.6 31.7 L414.9 30.7 L415.2 29.8 L415.5 28.8 L415.8 27.9 L416.1 26.9 L416.4 26.0 L416.7 25.0 L417.0 24.0 L417.3 23.1 L417.6 22.1 L417.9 22.0 L418.3 22.0 L418.6 22.0 L418.9 22.0 L419.2 22.0 L419.5 22.0 L419.9 22.0 L420.2 22.0 L420.5 22.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(386.2 145.2) rotate(-80.4)"/>
  <path d="M225.2 334.9 L226.4 334.9 L227.6 334.9 L228.8 334.9 L230.0 334.9 L231.3 334.9 L232.5 334.9 L233.7 334.9 L234.9 334.9 L236.1 334.9 L237.3 334.9 L238.5 334.9 L239.8 334.9 L241.0 334.9 L242.2 334.9 L243.4 334.9 L244.7 334.9 L245.9 334.9 L247.2 334.9 L248.5 334.9 L249.7 334.9 L250.9 334.9 L252.2 334.9 L253.4 334.9 L254.7 334.9 L255.9 334.9 L257.2 334.9 L258.4 334.9 L259.7 334.9 L260.9 334.9 L262.2 334.9 L263.4 334.9 L264.6 334.9 L265.9 334.9 L267.1 334.9 L268.4 334.9 L269.6 334.9 L270.9 334.9 L272.2 334.9 L273.4 334.9 L274.7 334.9 L275.9 334.9 L277.2 334.9 L278.4 334.9 L279.6 334.9 L280.9 334.9 L282.2 334.9 L283.4 334.9 L284.6 334.9 L285.9 334.9 L287.1 334.9 L288.3 334.9 L289.5 334.9 L290.8 334.9 L292.0 334.9 L293.3 334.9 L294.5 334.9 L295.7 334.9 L297.0 334.9 L298.2 334.9 L299.4 334.9 L300.6 334.9 L301.8 334.9 L303.1 334.9 L304.3 334.9 L305.5 334.9 L306.7 334.9 L307.9 334.9 L309.1 334.9 L310.3 334.9 L311.5 334.9" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(277.2 334.9) rotate(0.0)"/>
  <path d="M390.4 334.9 L391.6 334.9 L392.8 334.9 L394.0 334.9 L394.7 335.5 L394.7 336.7 L394.7 337.9 L394.6 339.0 L394.6 340.2 L394.6 341.4 L394.5 342.6 L394.5 343.7 L394.4 344.9 L394.4 346.0 L394.3 347.2 L394.2 348.3 L394.2 349.5 L394.1 350.6 L394.0 351.7 L393.9 352.9 L393.8 354.0 L393.7 355.1 L393.6 356.2 L393.5 357.3 L393.4 358.4 L393.2 359.5 L393.1 360.6 L393.0 361.7 L392.8 362.8 L392.7 363.9 L392.6 365.0 L392.4 366.0 L392.3 367.1 L392.1 368.2 L392.0 369.3 L391.8 370.3 L391.6 371.4 L391.5 372.4 L391.3 373.5 L391.1 374.6 L390.9 375.6 L390.8 376.7 L390.6 377.7 L390.4 378.8 L390.2 379.9 L390.0 380.9 L389.8 382.0 L389.6 383.1 L389.4 384.2 L389.2 385.2 L389.1 386.3 L388.9 387.1 L388.7 387.1 L388.5 387.1 L388.3 387.1 L388.1 387.1 L387.9 387.1 L387.7 387.1 L387.4 387.1 L387.2 387.1" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(392.4 366.0) rotate(97.9)"/>
  <path d="M393.1 328.9 L405.1 340.9 M405.1 328.9 L393.1 340.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M219.2 328.9 L231.2 340.9 M231.2 328.9 L219.2 340.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M-389.2 328.9 L-377.2 340.9 M-377.2 328.9 L-389.2 340.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M384.4 328.9 L396.4 340.9 M396.4 328.9 L384.4 340.9" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="312.2" cy="334.9" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M399.1 334.9 L210.1 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <circle cx="327.3" cy="216.0" r="4.5" fill="var(--panel)" stroke="currentColor" stroke-width="1.8"/>
  <text x="315.3" y="220.0" font-size="12" text-anchor="start">A</text>
  <rect x="277.6" y="330.9" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="376.3" y="212.7" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="388.3" y="208.7" font-size="11" text-anchor="start">K = 23.9</text>
</svg>
<figcaption>Dashed: uncompensated locus with A on the 15% line. Solid: with (s+1)/(s+0.1). The compensated branch stays right of the ζ line; at the same gain the dominant pair moves to −0.216 ± j1.360.</figcaption>
</figure>

**Step 3: why no gain rescues it.** Searching the $15\\%$ line for $\\angle GG_{c}=-180^\\circ$ finds only one
crossing, at $-0.052+j0.086$, $K=0.18$, inside the lag's own small locus. The main branch never
reaches the line.

**Step 4: (c) the tight pair.** For $\\dfrac{s+0.1}{s+0.01}$:

$$\\angle(s+0.1)=117.95^\\circ,\\qquad \\angle(s+0.01)=180^\\circ-\\tan^{-1}\\frac{1.368}{0.816}=120.81^\\circ,
\\qquad \\Delta\\theta=-2.86^\\circ$$

The re-solved crossing is $-0.784\\pm j1.298$ at $K=23.11$. Both pairs have ratio $10$; the angle is set
by the gap $z_{c}-p_{c}$, which is ten times smaller here.

**Check.** Small-pair formula for (c): $-0.09\\cdot1.368/2.554=-0.0482$ rad $=-2.76^\\circ$, close to the
exact $-2.86^\\circ$. For the bad pair it predicts $-27.6^\\circ$, wrong by $8^\\circ$, a reminder that the
formula needs $z_{c}\\ll\\omega_{n}$.
`
    },
    {
      id: "9-10",
      difficulty: "core",
      topic: "PI compensation",
      sec: "9.2",
      prompt: `$G(s)=\\dfrac{K}{(s+1)(s+6)}$ runs at $10\\%$ overshoot with $K=29.05$ and step error $0.171$.
Compare two compensators with the same zero:

$$\\text{PI: }\\frac{s+0.2}{s}\\qquad\\qquad \\text{lag: }\\frac{s+0.2}{s+0.02}$$

After re-solving on the $10\\%$ line:

| | Dominant poles | $K$ | Slow pole | Slow residue |
|---|---|---|---|---|
| PI | $-3.415\\pm j4.659$ | $28.53$ | $-0.171$ | $-0.150$ |
| Lag | $-3.423\\pm j4.670$ | $28.58$ | $-0.174$ | $-0.132$ |

Find the steady-state step error of each, and explain why their time responses look almost the same
for the first $10$ s.`,
      hint: `For the lag, $K_{p}=K\\cdot0.2/(1\\cdot6\\cdot0.02)$.`,
      expert: `
**First glance:** the two differ only in whether the pole is at $0$ or $-0.02$. At the dominant poles,
$0.02$ is invisible; at $t=\\infty$ it is everything.

**Discard:** expecting different transients. The slow poles are within $0.003$ of each other.

**Path:** PI is Type 1, so zero error; lag $K_{p}$ from the formula. Same slow pole means the same
creep rate.

**Check:** the slow residues should be about the error each removes: $0.171$ for PI, $0.171-0.021=0.150$
for lag.
`,
      answer: `PI: $e=0$. Lag: $K_{p}=47.6$, $e=0.0206$. Both creep toward their final values through a pole near
$-0.17$ (time constant $5.8$ s), carrying almost the same residue; the difference, $2\\%$ of final value,
appears only as the tail finishes.`,
      solution: `
**Step 1: PI error.** A pole at the origin makes the loop Type 1: $e_{\\text{step}}(\\infty)=0$.

**Step 2: lag error.**

$$K_{p}=\\frac{28.58\\cdot0.2}{1\\cdot6\\cdot0.02}=47.6,\\qquad e=\\frac{1}{48.6}=0.0206$$

The output settles at $0.979$.

**Step 3: why the transients match.**

- Dominant poles differ by $0.01$: the same overshoot and peak time.
- The slow poles, $-0.171$ and $-0.174$, have the same time constant, about $5.8$ s.
- The slow residues are $-0.150$ and $-0.132$. Each is roughly the amount of error that compensator
  removes beyond the fast response: the uncompensated loop would sit at $0.829$; PI climbs to $1$, lag to
  $0.979$.

Both responses rise like the uncompensated one, then creep up over the next $15$ to $20$ s. Simulated
$2\\%$ settling times (each against its own final value): PI $11.8$ s, lag $10.9$ s.

**Check.** Uncompensated $K_{p}=29.05/6=4.84$; the lag multiplies it by about $0.2/0.02=10$ times
$28.58/29.05$: $4.84\\cdot10\\cdot0.984=47.6$. ✓
`
    },
    {
      id: "9-11",
      difficulty: "challenge",
      topic: "Lag compensation",
      sec: "9.2",
      prompt: `(a) Show that a pole-zero pair $(s+z_{c})/(s+p_{c})$ with $z_{c},p_{c}\\ll\\omega_{n}$ contributes approximately

$$\\Delta\\theta\\approx-\\frac{(z_{c}-p_{c})\\,\\omega_{d}}{\\omega_{n}^{2}}\\ \\text{rad}$$

at the point $s=-\\sigma+j\\omega_{d}$, and that its magnitude there is approximately
$1-(z_{c}-p_{c})\\sigma/\\omega_{n}^{2}$.

(b) A design point is $-2+j3.5$. A lag of ratio $10$ may cost at most $2^\\circ$. Find the largest
allowable $z_{c}$, and how much the gain must rise to keep the point on the locus.`,
      hint: `Treat $\\angle(s+x)$ and $|s+x|$ as functions of the real number $x$ and expand to first order about $x=0$.`,
      expert: `
**First glance:** both quantities are smooth functions of the pole or zero position; a first-order
Taylor expansion in $x$ gives the formulas.

**Discard:** solving the arctangent equation exactly for (b). The linear estimate is accurate to a few
percent when $z_{c}\\ll\\omega_{n}$, and the exact answer is a check.

**Path:** $\\frac{d}{dx}\\tan^{-1}\\frac{\\omega_{d}}{x-\\sigma}=-\\frac{\\omega_{d}}{(x-\\sigma)^{2}+\\omega_{d}^{2}}$,
and $\\frac{d}{dx}|s+x|=\\frac{x-\\sigma}{|s+x|}$, both at $x=0$.

**Check:** with ratio $10$, $z_{c}-p_{c}=0.9z_{c}$; plug back into the exact arctangents.
`,
      answer: `(a) See solution. (b) $z_{c}\\le0.180$ ($p_{c}=0.018$); exact limit $0.176$. The gain must rise by
about $2.0\\%$.`,
      solution: `
**Step 1: angle of one factor.** For $s=-\\sigma+j\\omega_{d}$ and a real-axis point at $-x$, the vector is
$(x-\\sigma)+j\\omega_{d}$, with angle $\\phi(x)=\\tan^{-1}\\dfrac{\\omega_{d}}{x-\\sigma}$ (taken in the second
quadrant when $x<\\sigma$). Differentiating,

$$\\phi'(x)=\\frac{-\\omega_{d}}{(x-\\sigma)^{2}+\\omega_{d}^{2}},\\qquad \\phi'(0)=-\\frac{\\omega_{d}}{\\omega_{n}^{2}}$$

**Step 2: the pair.** The zero adds $\\phi(z_{c})$, the pole subtracts $\\phi(p_{c})$:

$$\\Delta\\theta=\\phi(z_{c})-\\phi(p_{c})\\approx\\phi'(0)(z_{c}-p_{c})=-\\frac{(z_{c}-p_{c})\\omega_{d}}{\\omega_{n}^{2}}$$

**Step 3: magnitude.** $|s+x|=\\sqrt{(x-\\sigma)^{2}+\\omega_{d}^{2}}$ has derivative $(x-\\sigma)/|s+x|$,
which is $-\\sigma/\\omega_{n}$ at $x=0$. So $|s+x|\\approx\\omega_{n}-x\\sigma/\\omega_{n}$ and

$$\\frac{|s+z_{c}|}{|s+p_{c}|}\\approx\\frac{\\omega_{n}-z_{c}\\sigma/\\omega_{n}}{\\omega_{n}-p_{c}\\sigma/\\omega_{n}}\\approx1-\\frac{(z_{c}-p_{c})\\sigma}{\\omega_{n}^{2}}$$

**Step 4: (b) numbers.** $\\omega_{n}^{2}=4+12.25=16.25$, $\\omega_{d}=3.5$, $2^\\circ=0.03491$ rad. With
ratio $10$, $z_{c}-p_{c}=0.9z_{c}$:

$$0.9z_{c}\\cdot\\frac{3.5}{16.25}\\le0.03491\\ \\Rightarrow\\ z_{c}\\le0.180$$

**Step 5: gain.** The compensator's magnitude at the point is $1-0.9(0.180)(2)/16.25=0.980$, so $K$
must rise by $1/0.980=1.020$, about $2\\%$, to stay on the locus.

**Check.** Exact angle at $z_{c}=0.180$, $p_{c}=0.018$: $\\tan^{-1}\\frac{3.5}{-1.82}-\\tan^{-1}\\frac{3.5}{-1.982}$
gives $-2.05^\\circ$; solving exactly for $-2^\\circ$ gives $z_{c}=0.176$. Exact magnitude ratio
$|s+0.018|/|s+0.180|=1.0196$. ✓
`
    },
    {
      id: "9-12",
      difficulty: "warmup",
      topic: "Design point",
      sec: "9.3",
      prompt: `An uncompensated loop has dominant poles at $-1.6\\pm j2.8$.

(a) Find its $\\zeta$, $\\%OS$, $T_{s}$ and $T_{p}$.

(b) Find the design point that keeps the overshoot and cuts $T_{s}$ by a factor of $2.5$.

(c) Find the design point that keeps the overshoot and halves $T_{p}$ instead.`,
      hint: `Same overshoot means same $\\zeta$, the same ray from the origin. Scale along it.`,
      expert: `
**First glance:** a constant-$\\zeta$ design is a scaling along a ray. Scaling the real part by $k$ scales
the imaginary part by $k$.

**Discard:** recomputing $\\theta$ and $\\tan\\theta$. The ratio $\\omega_{d}/\\sigma=2.8/1.6=1.75$ is already
$\\tan\\theta$.

**Path:** (b) $\\sigma=4/T_{s}$, multiply $1.6$ by $2.5$; (c) multiply $2.8$ by $2$.

**Check:** both design points should have $\\omega_{d}/\\sigma=1.75$.
`,
      answer: `(a) $\\zeta=0.496$, $16.6\\%$, $T_{s}=2.50$ s, $T_{p}=1.12$ s. (b) $-4\\pm j7$. (c) $-3.2\\pm j5.6$.`,
      solution: `
**Step 1: (a).** $\\omega_{n}=\\sqrt{1.6^{2}+2.8^{2}}=3.225$.

$$\\zeta=\\frac{1.6}{3.225}=0.496,\\quad \\%OS=100e^{-\\zeta\\pi/\\sqrt{1-\\zeta^{2}}}=16.6\\%$$

$$T_{s}=\\frac{4}{1.6}=2.50\\text{ s},\\qquad T_{p}=\\frac{\\pi}{2.8}=1.12\\text{ s}$$

**Step 2: (b).** $T_{s}=2.50/2.5=1.0$ s, so $\\sigma=4$. On the same ray,
$\\omega_{d}=4\\cdot\\dfrac{2.8}{1.6}=7$: design point $-4\\pm j7$.

**Step 3: (c).** $T_{p}=1.12/2$ needs $\\omega_{d}=5.6$; the real part scales with it:
$\\sigma=5.6\\cdot\\dfrac{1.6}{2.8}=3.2$. Design point $-3.2\\pm j5.6$.

**Check.** $7/4=5.6/3.2=1.75$. ✓ Halving $T_{p}$ on a constant-$\\zeta$ line also halves $T_{s}$, so (c) is
the "factor of 2" version of (b).
`
    },
    {
      id: "9-13",
      difficulty: "core",
      topic: "PD compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{s(s+5)(s+11)}$ in a unity loop. At $12\\%$ overshoot the dominant poles are
$-1.800\\pm j2.667$ with $K=128.4$.

Design a PD compensator that keeps $12\\%$ overshoot and halves the settling time. Find the zero, the
gain, the third closed-loop pole and $K_{v}$, and judge the second-order approximation. (The closed-loop
characteristic polynomial is a cubic; you may find its real root numerically.)`,
      hint: `$\\theta=\\cos^{-1}0.559=55.98^\\circ$. Sum the three pole angles at the new design point and take the deficit.`,
      expert: `
**First glance:** constant overshoot, half the settling time: double the dominant poles' coordinates.

**Discard:** searching the $\\zeta$ line with trial zeros. The deficit at the design point fixes the zero in
one step.

**Path:** $s_{d}=-3.600+j5.335$; three pole angles; deficit $=\\theta_{z}$; $z_{c}=3.600+5.335/\\tan\\theta_{z}$;
$K$ by lengths.

**Check:** the third pole lands between the zero and the plant pole at $-11$; how close it is to the zero
decides the approximation.
`,
      answer: `Zero at $-7.32$, $K=49.8$, third pole $-8.80$, $K_{v}=6.63$ (from $2.33$). Third pole is $2.4$ times the
dominant real part and $1.5$ from the zero, so the approximation is marginal; simulation gives $14.2\\%$
overshoot and $T_{s}=0.89$ s.`,
      solution: `
**Step 1: design point.** $T_{s}$ was $4/1.800=2.22$ s; halved, $1.11$ s, so $\\sigma=3.600$ and
$\\omega_{d}=3.600\\tan55.98^\\circ=5.335$.

$$s_{d}=-3.600+j5.335$$

**Step 2: angles at $s_{d}$.**

| Pole | Vector | Angle |
|---|---|---|
| $0$ | $-3.600+j5.335$ | $124.02^\\circ$ |
| $-5$ | $1.400+j5.335$ | $75.30^\\circ$ |
| $-11$ | $7.400+j5.335$ | $35.79^\\circ$ |

$$\\angle G=-235.11^\\circ,\\qquad \\theta_{z}=-180^\\circ+235.11^\\circ=55.11^\\circ$$

**Step 3: place the zero.**

$$z_{c}=3.600+\\frac{5.335}{\\tan55.11^\\circ}=3.600+3.721=7.321$$

**Step 4: gain.** $|s_{d}|=6.436$, $|s_{d}+5|=5.516$, $|s_{d}+11|=9.123$, $|s_{d}+7.321|=6.504$:

$$K=\\frac{6.436\\cdot5.516\\cdot9.123}{6.504}=49.8$$

**Step 5: third pole.** The characteristic polynomial $s^{3}+16s^{2}+(55+49.8)s+49.8\\cdot7.321$ has
roots $-3.600\\pm j5.335$ and $-8.80$.

**Step 6: judge.** $8.80/3.60=2.4$: not five times. Distance to the zero: $1.48$. Partial cancellation.
The third pole's residue is $0.151$ against a pair amplitude of $1.27$, so expect a few points of extra
overshoot. Simulated: $14.2\\%$, $T_{s}=0.89$ s, $T_{p}=0.56$ s.

**Step 7: error constant.**

$$K_{v}=\\frac{49.8\\cdot7.321}{5\\cdot11}=6.63$$

**Check.** Sum of the closed-loop poles equals $-16$ (minus the $s^{2}$ coefficient):
$2(-3.600)-8.80=-16.0$. ✓
`
    },
    {
      id: "9-14",
      difficulty: "core",
      topic: "PD compensation",
      sec: "9.3",
      prompt: `The PD design of 9-13 is $49.8(s+7.321)$.

(a) Write it as $K_{1}+K_{2}s$.

(b) By what factor does the controller amplify a sinusoid at $100$ rad/s relative to DC? At
$1000$ rad/s?

(c) A lead version keeps the zero at $-7.32$ and adds a pole at $-73.2$. What is its high-frequency gain
relative to DC?`,
      hint: `$|G_{c}(j\\omega)|=K_{2}\\sqrt{\\omega^{2}+z_{c}^{2}}$ for the PD. A lead's ratio of high- to low-frequency gain is $p_{c}/z_{c}$.`,
      expert: `
**First glance:** the PD's gain grows linearly with frequency once $\\omega\\gg z_{c}$; the lead's levels off.

**Discard:** any need for Bode plots. Two magnitude evaluations answer (b).

**Path:** $K_{1}=Kz_{c}$, $K_{2}=K$; ratio $\\sqrt{\\omega^{2}+z_{c}^{2}}/z_{c}$; lead ratio $p_{c}/z_{c}$.

**Check:** for $\\omega\\gg z_{c}$ the PD ratio is about $\\omega/z_{c}$: $100/7.32=13.7$.
`,
      answer: `(a) $K_{1}=364.5$, $K_{2}=49.8$. (b) $13.7$ at $100$ rad/s, $137$ at $1000$ rad/s, and growing.
(c) $10$, at every frequency above the pole.`,
      solution: `
**Step 1: (a).** $49.8(s+7.321)=49.8s+364.5$: $K_{2}=49.8$, $K_{1}=364.5$.

**Step 2: (b).**

$$\\frac{|G_{c}(j\\omega)|}{|G_{c}(0)|}=\\frac{\\sqrt{\\omega^{2}+7.321^{2}}}{7.321}$$

| $\\omega$ (rad/s) | ratio |
|---|---|
| $10$ | $1.69$ |
| $100$ | $13.7$ |
| $1000$ | $137$ |

Sensor noise in the hundreds of rad/s reaches the actuator amplified by two orders of magnitude.

**Step 3: (c) lead.** $G_{c}=\\dfrac{s+7.32}{s+73.2}$ has DC gain $7.32/73.2=0.1$ and high-frequency gain
$1$, a ratio of $10$ that does not grow further. (The loop gain is then re-solved; a pole at $-73.2$
costs only $4^\\circ$ at the design point, so the zero must move slightly to compensate.)

**Check.** At $1000$ rad/s the PD output for a $1$ mV noise ripple is $49.8\\cdot1000\\cdot0.001\\approx50$ V
of command, an obvious saturation risk.
`
    },
    {
      id: "9-15",
      difficulty: "core",
      topic: "PD compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{(s+1)(s+4)(s+7)}$ runs on the $\\zeta=0.5$ line. Uncompensated: $-1.625\\pm j2.815$,
$K=64.4$, third pole $-8.75$.

A PD zero is tried at $-8$, $-5$ and $-2$. On the $\\zeta=0.5$ line the dominant poles come out at
$-2.290\\pm j3.966$ ($K=16.0$), $-3.392\\pm j5.876$ ($K=42.4$) and $-5.058\\pm j8.761$ ($K=82.4$).

For each, find $T_{s}$, $K_{p}$ and the third closed-loop pole, and comment on which design you trust.`,
      hint: `The third pole is the remaining root of $(s+1)(s+4)(s+7)+K(s+z)$. The PD term adds nothing to the $s^{2}$ coefficient, so the three closed-loop poles always sum to $-12$.`,
      expert: `
**First glance:** the zero's position decides which plant poles pair up. A zero at $-2$ sits between
$-1$ and $-4$, so the branch from $-1$ ends on it and the complex pair comes from $-4$ and $-7$.

**Discard:** judging by $T_{s}$ alone. The fastest pair in the $-2$ case is not the slowest pole.

**Path:** the sum of closed-loop poles is $-12$ for every $K$, since the PD adds no $s^{2}$ term; the third
pole is $-12-2\\sigma$.

**Check:** with the zero at $-2$, the third pole should land just right of the zero.
`,
      answer: `Zero $-8$: $T_{s}=1.75$ s, $K_{p}=4.56$, third pole $-7.42$. Zero $-5$: $T_{s}=1.18$ s,
$K_{p}=7.57$, third $-5.22$. Zero $-2$: $T_{s}=0.79$ s, $K_{p}=5.89$, third $-1.88$, slower than the pair
but $0.12$ from the zero. All three simulate close to prediction ($15.7\\%$, $17.5\\%$, $11.7\\%$; $T_{s}$
$1.77$, $1.20$, $0.89$ s); the zero at $-5$ is the balanced choice.`,
      solution: `
**Step 1: third pole from the sum of roots.** $(s+1)(s+4)(s+7)+K(s+z)=s^{3}+12s^{2}+\\cdots$, so the
three closed-loop poles sum to $-12$. With the pair at $-\\sigma\\pm j\\omega_{d}$, the third is
$p_{3}=-12+2\\sigma$.

| Zero | $\\sigma$ | $p_{3}=-12+2\\sigma$ | $T_{s}=4/\\sigma$ | $K_{p}=Kz/28$ |
|---|---|---|---|---|
| none | $1.625$ | $-8.75$ | $2.46$ | $64.4/28=2.30$ |
| $-8$ | $2.290$ | $-7.42$ | $1.75$ | $16.0\\cdot8/28=4.56$ |
| $-5$ | $3.392$ | $-5.22$ | $1.18$ | $42.4\\cdot5/28=7.57$ |
| $-2$ | $5.058$ | $-1.88$ | $0.79$ | $82.4\\cdot2/28=5.89$ |

**Step 2: judge each.**

- **Zero $-8$:** third pole $3.2$ times the dominant real part, $0.6$ from the zero. Good cancellation. A modest
  speedup.
- **Zero $-5$:** third pole $1.5$ times the real part, $0.22$ from the zero. Good cancellation, twice the
  speed, the best $K_{p}$.
- **Zero $-2$:** third pole at $-1.88$ is *slower* than the pair. It survives only because it sits $0.12$
  from the zero. Any error in the zero's realization, or in the plant pole at $-1$, leaves a slow mode in
  the response.

**Step 3: simulation.** Overshoot $15.7\\%$, $17.5\\%$, $11.7\\%$; $T_{s}$ $1.77$, $1.20$, $0.89$ s. All
close to prediction.

**Choice.** $-5$: half the settling time with a cancellation that is robust, and the largest $K_{p}$. The
$-2$ design is fastest on paper but depends on a near-exact pole-zero cancellation of a slow pole.

**Check.** For the $-5$ case, $p_{3}=-5.216$ from root finding; $-12+2(3.392)=-5.216$. ✓
`
    },
    {
      id: "9-16",
      difficulty: "core",
      topic: "Lead compensation",
      sec: "9.3",
      prompt: `Redo 9-13 with a lead compensator instead of PD. Same plant $\\dfrac{K}{s(s+5)(s+11)}$, same design point
$s_{d}=-3.600+j5.335$. Put the lead zero at $-6$.

Find the lead pole, the gain, $K_{v}$ and the other closed-loop poles, and compare with the PD design
(zero $-7.32$, $K=49.8$, $K_{v}=6.63$).`,
      hint: `The plant angles at $s_{d}$ are $124.02^\\circ$, $75.30^\\circ$ and $35.79^\\circ$ (9-13). Add the zero's angle, then the pole must remove whatever is left over $180^\\circ$.`,
      expert: `
**First glance:** the deficit is $55.1^\\circ$; a zero at $-6$ supplies more than that on its own, so the pole
only has to take back a little and lands far left.

**Discard:** recomputing the plant angles. 9-13 already has them.

**Path:** zero angle at $s_{d}$, leftover over $180^\\circ$, pole from $p_{c}=\\sigma+\\omega_{d}/\\tan\\theta_{p}$,
$K$ from lengths.

**Check:** a far-left pole means a large $K$; $K_{v}$ should still come out below the PD's, because the pole
divides it.
`,
      answer: `Lead $\\dfrac{s+6}{s+31.9}$, $K=1594$, $K_{v}=5.45$. Other poles $-33.9$ and $-6.81$. Simulated $13.9\\%$
overshoot, $T_{s}=0.93$ s: as good as the PD transient with lower $K_{v}$ ($5.45$ vs $6.63$) and no noise
amplification beyond $\\times5.3$.`,
      solution: `
**Step 1: zero angle.** From $-6$ to $s_{d}$: vector $2.400+j5.335$,

$$\\theta_{z}=\\tan^{-1}\\frac{5.335}{2.400}=65.78^\\circ$$

**Step 2: what the pole must remove.**

$$\\angle=-235.11^\\circ+65.78^\\circ=-169.32^\\circ,\\qquad \\theta_{p}=180^\\circ-169.32^\\circ=10.68^\\circ$$

**Step 3: pole.**

$$p_{c}=3.600+\\frac{5.335}{\\tan10.68^\\circ}=3.600+28.30=31.90$$

**Step 4: gain.** Lengths: $|s_{d}|=6.436$, $|s_{d}+5|=5.515$, $|s_{d}+11|=9.122$, $|s_{d}+31.90|=28.80$,
$|s_{d}+6|=5.850$.

$$K=\\frac{6.436\\cdot5.515\\cdot9.122\\cdot28.80}{5.850}=1594$$

$$K_{v}=\\frac{1594\\cdot6}{5\\cdot11\\cdot31.90}=5.45$$

**Step 5: other poles.** At $K=1594$ the quartic's other roots are $-33.88$ and $-6.81$. The pole at $-6.81$ is
$0.81$ from the zero: partial cancellation, residue $0.18$. The far pole has residue $-0.05$.

**Step 6: compare.**

| | PD | Lead |
|---|---|---|
| $K$ | $49.8$ | $1594$ |
| $K_{v}$ | $6.63$ | $5.45$ |
| Sim. $\\%OS$, $T_{s}$ | $14.2\\%$, $0.89$ s | $13.9\\%$, $0.93$ s |
| HF gain ÷ DC gain | grows without bound | $31.9/6=5.3$ |

**Check.** $\\theta_{z}-\\theta_{p}=65.78^\\circ-10.68^\\circ=55.10^\\circ$, the deficit from 9-13. ✓
`
    },
    {
      id: "9-17",
      difficulty: "core",
      topic: "Lead compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{s(s+1.5)(s+10)}$, unity feedback. At $20\\%$ overshoot gain alone gives
$T_{s}=6.27$ s and $K_{v}=1.33$.

Design a lead compensator whose zero cancels the pole at $-1.5$, for $20\\%$ overshoot and $T_{s}=1.6$ s.
Give the compensator, $K$, $K_{v}$ and the third pole.`,
      hint: `$\\theta=62.87^\\circ$ for $20\\%$. With the zero on the pole at $-1.5$, only the angles from $0$ and $-10$ remain.`,
      expert: `
**First glance:** cancelling $-1.5$ leaves an effective two-pole plant plus the lead pole: a third-order
loop whose real closed-loop pole will be far left.

**Discard:** keeping the cancelled pair in the angle sum. They contribute equal and opposite angles.

**Path:** $\\sigma=4/1.6=2.5$; $\\omega_{d}=2.5\\tan62.87^\\circ$; angles from $0$ and $-10$; pole takes the
excess over $180^\\circ$.

**Check:** with a $4\\times$ speed-up the deficit should be sizeable, and $K$ should jump by more than
an order of magnitude.
`,
      answer: `$G_{c}=\\dfrac{s+1.5}{s+11.01}$, $K=481.4$, $K_{v}=4.37$, third pole $-16.0$ ($6.4\\times$ the dominant real part).
Simulated $18.7\\%$ overshoot, $T_{s}=1.58$ s.`,
      solution: `
**Step 1: design point.** $\\sigma=4/1.6=2.5$, $\\omega_{d}=2.5\\tan62.87^\\circ=4.880$:
$s_{d}=-2.5+j4.880$.

**Step 2: remaining angles.** The zero at $-1.5$ and the pole at $-1.5$ cancel. From $0$: $117.13^\\circ$. From
$-10$: $\\tan^{-1}(4.880/7.5)=33.05^\\circ$. Sum $-150.18^\\circ$.

**Step 3: lead pole.** It must take away $29.82^\\circ$:

$$p_{c}=2.5+\\frac{4.880}{\\tan29.82^\\circ}=2.5+8.51=11.01$$

**Step 4: gain.**

$$K=|s_{d}|\\,|s_{d}+10|\\,|s_{d}+11.01|=5.483\\cdot8.948\\cdot9.812=481.4$$

**Step 5: error constant and third pole.**

$$K_{v}=\\frac{481.4\\cdot1.5}{1.5\\cdot10\\cdot11.01}=4.37$$

The effective loop $\\dfrac{481.4}{s(s+10)(s+11.01)}$ has characteristic sum of roots $-21.01$, so the third pole is
$-21.01+5.0=-16.01$.

**Check.** $16.01/2.5=6.4$: the second-order approximation should hold. Simulation: $18.7\\%$,
$T_{s}=1.58$ s. ✓ (The pole at $-1.5$ is still in the closed loop, exactly on its zero, with zero residue.)
`
    },
    {
      id: "9-18",
      difficulty: "challenge",
      topic: "Lead compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{s(s+1)(s+2)}$ is slow: at $10\\%$ overshoot gain alone gives $T_{s}=11.2$ s. The
specification is $10\\%$ overshoot and $T_{s}=1$ s.

(a) Find the angle deficit at the design point.

(b) Show that a single lead stage with its zero at $-1$ cannot do it, and that a single PD zero would have to
sit in the right half-plane.

(c) Design two identical lead stages with zeros cancelling $-1$ and $-2$. Find the poles, $K$ and $K_{v}$.`,
      hint: `A lead stage supplies at most the angle of its zero, which is less than $180^\\circ$, minus a positive pole angle.`,
      expert: `
**First glance:** an elevenfold speed-up on a three-pole plant with all poles near the origin. Every pole sees
the design point at over $110^\\circ$, so the deficit is close to $180^\\circ$.

**Discard:** one lead stage. A pole can only subtract angle, so the most a single stage gives is its zero's
angle, which is under $180^\\circ$ and fixed once the zero is chosen.

**Path:** total deficit, then split it: two cancelling zeros remove two pole angles, and two equal poles
share what remains.

**Check:** after cancellation the angle sum is $-\\angle s_{d}-2\\theta_{p}$; set it to $-180^\\circ$.
`,
      answer: `(a) $+175.2^\\circ$ at $-4+j5.457$. (b) With the zero at $-1$ the pole would need to add $+56.4^\\circ$, but poles
subtract angle; a lone zero would need $175.2^\\circ$, i.e. a zero at $+60.5$. (c) Poles both at $-14.77$:
$G_{c}=\\dfrac{(s+1)(s+2)}{(s+14.77)^{2}}$, $K=986$, $K_{v}=4.52$, remaining pole $-21.5$. Simulated
$9.4\\%$, $T_{s}=0.93$ s.`,
      solution: `
**Step 1: (a) design point and deficit.** $\\zeta=0.591$, $\\theta=53.76^\\circ$, $\\sigma=4$,
$\\omega_{d}=5.457$: $s_{d}=-4+j5.457$.

| Pole | Angle at $s_{d}$ |
|---|---|
| $0$ | $126.24^\\circ$ |
| $-1$ | $118.80^\\circ$ |
| $-2$ | $110.13^\\circ$ |

$$\\angle G=-355.16^\\circ,\\qquad \\theta_{c}=-180^\\circ+355.16^\\circ=175.16^\\circ$$

**Step 2: (b) a single lead with zero at $-1$.** The zero adds $118.80^\\circ$; the running sum becomes
$-236.36^\\circ$. To reach $-180^\\circ$ the pole would have to add $+56.36^\\circ$. A pole contributes
$-\\theta_{p}$ with $\\theta_{p}>0$. Impossible.

**Step 3: (b) a single PD zero.** It would need $175.16^\\circ$:
$z_{c}=4+5.457/\\tan175.16^\\circ=4-64.5=-60.5$. The zero would be at $s=+60.5$, in the right
half-plane: a non-minimum-phase compensator. Rejected.

**Step 4: (c) two lead stages.** Zeros at $-1$ and $-2$ cancel those poles. What remains: $-126.24^\\circ$
from the origin and $-2\\theta_{p}$ from the double pole:

$$-126.24^\\circ-2\\theta_{p}=-180^\\circ\\ \\Rightarrow\\ \\theta_{p}=26.88^\\circ$$

$$p_{c}=4+\\frac{5.457}{\\tan26.88^\\circ}=4+10.77=14.77$$

**Step 5: gain.**

$$K=|s_{d}|\\,|s_{d}+14.77|^{2}=6.766\\cdot12.07^{2}=986$$

$$K_{v}=\\frac{986\\cdot1\\cdot2}{1\\cdot2\\cdot14.77^{2}}=4.52$$

**Step 6: other poles.** The effective loop $\\dfrac{986}{s(s+14.77)^{2}}$ has roots summing to $-29.53$:
remaining pole $-29.53+8=-21.5$, $5.4$ times the dominant real part.

**Check.** Simulated $9.4\\%$ overshoot, $T_{s}=0.93$ s. ✓ $K_{v}$ rose from $0.42$ to $4.52$ as a side
effect.
`
    },
    {
      id: "9-19",
      difficulty: "challenge",
      topic: "Lead compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{s(s+2)(s+6)}$ at $25\\%$ overshoot: $-0.687\\pm j1.557$, $K=19.19$, $K_{v}=1.60$,
$T_{s}=5.82$ s. Target: same overshoot, half the settling time, $s_{d}=-1.374+j3.114$.

Three lead designs are proposed, with zeros at $-1$, $-2$ and $-3$.

(a) Find the lead pole for each.

(b) At the resulting gains the other closed-loop poles are: zero $-1$: $-8.40$, $-0.80$ ($K=77.6$);
zero $-2$: $-9.56$, $-2.00$ ($K=110.8$); zero $-3$: $-13.84$, $-3.62$ ($K=193.4$). Find $K_{v}$ for each and
predict which designs will miss the specification.

(c) Pick one.`,
      hint: `Plant angles at $s_{d}$: $113.81^\\circ$, $78.63^\\circ$, $33.94^\\circ$. Zero angles: $-1$: $96.85^\\circ$, $-2$: $78.63^\\circ$, $-3$: $62.43^\\circ$.`,
      expert: `
**First glance:** the zero at $-1$ is to the right of the plant pole at $-2$. That puts a real-axis segment of
the locus between $0$ and $-1$, and a closed-loop pole on it near the axis.

**Discard:** choosing by $K_{v}$ alone. The design with the best $K_{v}$ also has the worst cancellation.

**Path:** pole angle $=\\theta_{z}-\\theta_{c}$ with $\\theta_{c}=46.38^\\circ$; place each pole; $K_{v}=Kz/(12p)$;
then read each extra pole against its zero.

**Check:** the $-2$ design cancels exactly, so its response should match prediction most closely.
`,
      answer: `(a) Poles $-3.94$, $-6.31$, $-12.21$. (b) $K_{v}=1.64$, $2.93$, $3.96$. Zero $-1$: a pole at $-0.80$ is slower
than the pair; overshoot falls to $7\\%$ and $T_{s}$ lands right at the limit. Zero $-3$: pole $-3.62$ partially
cancels; overshoot rises to $29\\%$, over spec. (c) Zero $-2$: exact cancellation, $23.3\\%$, $T_{s}=2.58$ s,
$K_{v}=2.93$.`,
      solution: `
**Step 1: deficit.** $\\angle G(s_{d})=-(113.81+78.63+33.94)=-226.38^\\circ$, so $\\theta_{c}=46.38^\\circ$.

**Step 2: (a) poles.** $\\theta_{p}=\\theta_{z}-46.38^\\circ$, and $p_{c}=1.374+3.114/\\tan\\theta_{p}$.

| Zero | $\\theta_{z}$ | $\\theta_{p}$ | $p_{c}$ |
|---|---|---|---|
| $-1$ | $96.85^\\circ$ | $50.46^\\circ$ | $1.374+2.570=3.94$ |
| $-2$ | $78.63^\\circ$ | $32.24^\\circ$ | $1.374+4.936=6.31$ |
| $-3$ | $62.43^\\circ$ | $16.04^\\circ$ | $1.374+10.83=12.21$ |

**Step 3: (b) error constants.** $K_{v}=\\dfrac{Kz_{c}}{2\\cdot6\\cdot p_{c}}$:

$$\\frac{77.6\\cdot1}{12\\cdot3.94}=1.64,\\qquad \\frac{110.8\\cdot2}{12\\cdot6.31}=2.93,\\qquad
\\frac{193.4\\cdot3}{12\\cdot12.21}=3.96$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 282" class="nx-fig">
  <defs><marker id="nx9p19" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 211.8 L482.0 211.8" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p19)"/>
  <path d="M440.8 248.0 L440.8 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p19)"/>
  <text x="476.0" y="229.8" font-size="13">&#963;</text>
  <text x="446.8" y="30.0" font-size="13">j&#969;</text>
  <path d="M79.2 208.8 L79.2 214.8" stroke="currentColor" stroke-width="1"/>
  <text x="79.2" y="226.8" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M169.6 208.8 L169.6 214.8" stroke="currentColor" stroke-width="1"/>
  <text x="169.6" y="226.8" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M260.0 208.8 L260.0 214.8" stroke="currentColor" stroke-width="1"/>
  <text x="260.0" y="226.8" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M350.4 208.8 L350.4 214.8" stroke="currentColor" stroke-width="1"/>
  <text x="350.4" y="226.8" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M437.8 166.6 L443.8 166.6" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="170.6" font-size="11" text-anchor="end" opacity=".75">j1</text>
  <path d="M437.8 121.4 L443.8 121.4" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="125.4" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M437.8 76.2 L443.8 76.2" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="80.2" font-size="11" text-anchor="end" opacity=".75">j3</text>
  <path d="M437.8 31.0 L443.8 31.0" stroke="currentColor" stroke-width="1"/>
  <text x="434.8" y="35.0" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M440.8 211.8 L439.6 211.8 L438.4 211.8 L437.2 211.8 L436.0 211.8 L434.8 211.8 L433.5 211.8 L432.3 211.8 L431.1 211.8 L429.9 211.8 L428.7 211.8 L427.4 211.8 L426.2 211.8 L425.0 211.8 L423.8 211.8 L422.6 211.8 L421.3 211.8 L420.1 211.8 L418.9 211.8 L417.7 211.8 L416.4 211.8 L415.2 211.8 L414.0 211.8 L412.8 211.8 L411.6 211.8 L410.4 211.8 L409.1 211.8 L407.9 211.8 L406.7 211.8 L405.5 211.8 L404.2 211.8 L403.0 211.8 L401.8 211.8 L400.6 211.8 L399.4 211.8 L398.2 211.8 L397.0 211.8 L395.8 211.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(417.7 211.8) rotate(180.0)"/>
  <path d="M350.4 211.8 L349.2 211.8 L348.0 211.8 L346.8 211.8 L345.6 211.8 L344.4 211.8 L343.2 211.8 L341.9 211.8 L340.7 211.8 L339.5 211.8 L338.3 211.8 L337.0 211.8 L335.8 211.8 L334.6 211.8 L333.3 211.8 L332.0 211.8 L330.7 211.8 L329.5 211.8 L328.3 211.8 L327.1 211.8 L325.7 211.8 L324.2 211.8 L322.7 211.8 L321.2 211.8 L319.8 211.8 L316.9 210.2 L316.9 208.9 L317.0 207.4 L317.0 206.3 L317.1 204.9 L317.2 203.7 L317.3 202.4 L317.5 201.2 L317.6 199.9 L317.8 198.7 L317.9 197.6 L318.1 196.5 L318.3 195.3 L318.5 194.2 L318.7 193.1 L318.9 192.1 L319.1 191.1 L319.4 189.9 L319.6 188.8 L319.9 187.8 L320.1 186.7 L320.4 185.7 L320.7 184.7 L320.9 183.8 L321.2 182.8 L321.5 181.9 L321.8 180.9 L322.1 180.0 L322.4 179.1 L322.7 178.2 L323.0 177.3 L323.3 176.4 L323.6 175.5 L323.9 174.6 L324.2 173.7 L324.6 172.9 L324.9 172.0 L325.3 171.1 L325.6 170.3 L325.9 169.4 L326.3 168.5 L326.7 167.7 L327.0 166.8 L327.4 165.9 L327.8 165.1 L328.2 164.2 L328.6 163.3 L329.0 162.5 L329.4 161.6 L329.8 160.7 L330.2 159.9 L330.6 159.0 L331.0 158.1 L331.5 157.2 L331.9 156.4 L332.4 155.5 L332.8 154.6 L333.3 153.7 L333.7 152.8 L334.2 151.9 L334.7 151.0 L335.2 150.1 L335.6 149.3 L336.0 148.5 L336.4 147.7 L336.9 146.9 L337.3 146.1 L337.7 145.3 L338.2 144.5 L338.6 143.7 L339.1 142.9 L339.5 142.0 L340.0 141.2 L340.5 140.4 L340.9 139.5 L341.4 138.7 L341.9 137.9 L342.4 137.0 L342.9 136.1 L343.4 135.3 L343.9 134.4 L344.4 133.5 L344.9 132.6 L345.4 131.7 L345.9 130.8 L346.4 129.9 L346.9 129.0 L347.4 128.3 L347.8 127.5 L348.3 126.7 L348.7 126.0 L349.2 125.2 L349.6 124.4 L350.1 123.6 L350.5 122.8 L351.0 122.0 L351.4 121.2 L351.9 120.4 L352.4 119.6 L352.8 118.8 L353.3 117.9 L353.8 117.1 L354.3 116.3 L354.7 115.4 L355.2 114.6 L355.7 113.7 L356.2 112.9 L356.6 112.0 L357.1 111.2 L357.6 110.3 L358.1 109.4 L358.6 108.5 L359.1 107.7 L359.6 106.8 L360.1 105.9 L360.6 105.0 L361.1 104.1 L361.6 103.2 L362.1 102.2 L362.6 101.3 L363.1 100.4 L363.6 99.5 L364.1 98.5 L364.6 97.6 L365.1 96.6 L365.7 95.7 L366.2 94.7 L366.7 93.8 L367.2 92.8 L367.7 91.8 L368.3 90.9 L368.7 90.1 L369.1 89.3 L369.5 88.5 L369.9 87.7 L370.4 86.9 L370.8 86.1 L371.2 85.3 L371.6 84.5 L372.1 83.7 L372.5 82.9 L372.9 82.1 L373.4 81.3 L373.8 80.5 L374.2 79.6 L374.7 78.8 L375.1 78.0 L375.5 77.1 L376.0 76.3 L376.4 75.5 L376.9 74.6 L377.3 73.8 L377.7 72.9 L378.2 72.1 L378.6 71.2 L379.1 70.4 L379.5 69.5 L380.0 68.6 L380.4 67.8 L380.9 66.9 L381.3 66.0 L381.8 65.2 L382.2 64.3 L382.7 63.4 L383.2 62.5 L383.6 61.6 L384.1 60.7 L384.5 59.8 L385.0 58.9 L385.5 58.0 L385.9 57.1 L386.4 56.2 L386.9 55.3 L387.4 54.4 L387.8 53.5 L388.3 52.6 L388.8 51.6 L389.3 50.7 L389.7 49.8 L390.2 48.8 L390.7 47.9 L391.2 47.0 L391.7 46.0 L392.2 45.1 L392.7 44.1 L393.2 43.2 L393.6 42.2 L394.1 41.2 L394.6 40.3 L395.1 39.3 L395.6 38.3 L396.1 37.4 L396.6 36.4 L397.2 35.4 L397.7 34.4 L398.2 33.4 L398.7 32.4 L399.2 31.4 L399.7 30.4 L400.2 29.4 L400.8 28.4 L401.3 27.4 L401.8 26.4 L402.3 25.4 L402.9 24.4 L403.4 23.3 L403.9 22.3 L404.5 22.0 L405.0 22.0 L405.5 22.0 L406.1 22.0 L406.6 22.0 L407.2 22.0 L407.6 22.0 L408.0 22.0 L408.4 22.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(348.3 126.7) rotate(-60.1)"/>
  <path d="M169.6 211.8 L168.4 211.8 L167.2 211.8 L166.0 211.8 L164.8 211.8 L163.6 211.8 L162.4 211.8 L161.1 211.8 L159.9 211.8 L158.7 211.8 L157.5 211.8 L156.2 211.8 L155.0 211.8 L153.8 211.8 L152.6 211.8 L151.4 211.8 L150.1 211.8 L148.9 211.8 L147.7 211.8 L146.5 211.8 L145.3 211.8 L144.0 211.8 L142.8 211.8 L141.6 211.8 L140.3 211.8 L139.1 211.8 L137.9 211.8 L136.6 211.8 L135.4 211.8 L134.1 211.8 L132.9 211.8 L131.6 211.8 L130.4 211.8 L129.1 211.8 L127.9 211.8 L126.7 211.8 L125.4 211.8 L124.1 211.8 L122.9 211.8 L121.7 211.8 L120.4 211.8 L119.1 211.8 L117.9 211.8 L116.7 211.8 L115.4 211.8 L114.2 211.8 L112.9 211.8 L111.6 211.8 L110.3 211.8 L109.1 211.8 L107.8 211.8 L106.6 211.8 L105.3 211.8 L104.0 211.8 L102.6 211.8 L101.4 211.8 L100.2 211.8 L98.9 211.8 L97.7 211.8 L96.4 211.8 L95.1 211.8 L93.8 211.8 L92.4 211.8 L91.2 211.8 L90.0 211.8 L88.8 211.8 L87.5 211.8 L86.3 211.8 L85.0 211.8 L83.7 211.8 L82.4 211.8 L81.1 211.8 L79.8 211.8 L78.4 211.8 L77.1 211.8 L75.9 211.8 L74.7 211.8 L73.4 211.8 L72.2 211.8 L71.0 211.8 L69.7 211.8 L68.4 211.8 L67.1 211.8 L65.8 211.8 L64.5 211.8 L63.2 211.8 L61.9 211.8 L60.5 211.8 L59.2 211.8 L57.8 211.8 L56.4 211.8 L55.0 211.8 L53.8 211.8 L52.6 211.8 L51.4 211.8 L50.1 211.8 L48.9 211.8 L47.6 211.8 L46.4 211.8 L45.1 211.8 L43.8 211.8 L42.5 211.8 L41.2 211.8 L39.9 211.8 L38.6 211.8 L37.2 211.8 L35.9 211.8 L34.5 211.8 L34.0 211.8 L34.0 211.8 L34.0 211.8 L34.0 211.8 L34.0 211.8 L34.0 211.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(101.4 211.8) rotate(180.0)"/>
  <path d="M262.5 211.8 L263.7 211.8 L264.9 211.8 L266.1 211.8 L267.3 211.8 L268.5 211.8 L269.8 211.8 L271.0 211.8 L272.2 211.8 L273.4 211.8 L274.6 211.8 L275.8 211.8 L277.0 211.8 L278.3 211.8 L279.5 211.8 L280.8 211.8 L282.0 211.8 L283.3 211.8 L284.5 211.8 L285.7 211.8 L287.0 211.8 L288.2 211.8 L289.4 211.8 L290.7 211.8 L292.0 211.8 L293.2 211.8 L294.5 211.8 L295.8 211.8 L297.0 211.8 L298.3 211.8 L299.5 211.8 L300.8 211.8 L302.0 211.8 L303.4 211.8 L304.6 211.8 L305.9 211.8 L307.2 211.8 L308.5 211.8 L310.2 211.8 L311.7 211.8 L313.0 211.8 L315.1 211.8 L316.9 213.5 L316.9 214.7 L317.0 216.3 L317.0 217.4 L317.1 218.8 L317.2 220.0 L317.3 221.3 L317.5 222.5 L317.6 223.8 L317.8 225.0 L317.9 226.1 L318.1 227.2 L318.3 228.4 L318.5 229.5 L318.7 230.6 L318.9 231.6 L319.1 232.6 L319.4 233.7 L319.6 234.8 L319.9 235.9 L320.1 236.9 L320.4 237.9 L320.7 238.9 L320.9 239.9 L321.2 240.9 L321.5 241.8 L321.8 242.8 L322.1 243.7 L322.4 244.6 L322.7 245.5 L323.0 246.4 L323.3 247.3 L323.6 248.0 L323.9 248.0 L324.2 248.0 L324.6 248.0 L324.9 248.0 L325.3 248.0 L325.6 248.0 L325.9 248.0 L326.3 248.0 L326.7 248.0 L327.0 248.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(310.2 211.8) rotate(0.0)"/>
  <path d="M434.8 205.8 L446.8 217.8 M446.8 205.8 L434.8 217.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M344.4 205.8 L356.4 217.8 M356.4 205.8 L344.4 217.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M163.6 205.8 L175.6 217.8 M175.6 205.8 L163.6 217.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M256.5 205.8 L268.5 217.8 M268.5 205.8 L256.5 217.8" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="395.6" cy="211.8" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M440.8 211.8 L357.0 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="57.2" y="207.8" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="374.7" y="67.1" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="400.7" y="207.8" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="404.7" y="199.8" font-size="11" text-anchor="middle">−0.80</text>
  <text x="388.7" y="75.1" font-size="12" text-anchor="start">B</text>
  <text x="262.5" y="233.8" font-size="11" text-anchor="middle">−3.94</text>
</svg>
<figcaption>Lead zero at −1, pole at −3.94. The zero sits right of the plant pole at −2, so a branch runs from the origin to the zero; at K = 77.6 it holds a closed-loop pole at −0.80, slower than B.</figcaption>
</figure>

**Step 4: (b) read the extra poles.**

- **Zero $-1$:** pole at $-0.80$, *closer to the axis than the pair* ($-1.374$). It is $0.20$ from the zero, so
  it is not ignorable. Its slow positive-going term smooths the overshoot away (simulated $7.4\\%$) and
  stretches the settling time to $2.91$ s, exactly the limit. It also buys almost no $K_{v}$.
- **Zero $-2$:** pole at $-2.00$, on the zero. Clean. Far pole at $7\\times$ the real part.
- **Zero $-3$:** pole at $-3.62$, $0.62$ from the zero. Partial cancellation adds overshoot: simulated $28.9\\%$,
  over the $25\\%$ spec.

**Step 5: (c) choose.** Zero at $-2$ with pole at $-6.31$: simulated $23.3\\%$, $T_{s}=2.58$ s, $K_{v}=2.93$.

**Check.** Each $\\theta_{z}-\\theta_{p}$ equals $46.38^\\circ$ by construction; e.g. $78.63-32.24=46.39$. ✓
`
    },
    {
      id: "9-20",
      difficulty: "warmup",
      topic: "Lead compensation",
      sec: "9.3",
      prompt: `At the design point $-3+j5$ a lead compensator must contribute $+28^\\circ$. The zero is chosen
at $-4$. Where does the pole go?`,
      hint: `Find the zero's angle first. The pole's angle is $28^\\circ$ less.`,
      expert: `
**First glance:** pure geometry; the plant is irrelevant once the deficit is known.

**Discard:** any root-locus computation.

**Path:** $\\theta_{z}=\\tan^{-1}(5/1)$, $\\theta_{p}=\\theta_{z}-28^\\circ$, $p_{c}=3+5/\\tan\\theta_{p}$.

**Check:** the pole must be left of the zero.
`,
      answer: `$\\theta_{z}=78.69^\\circ$, $\\theta_{p}=50.69^\\circ$, pole at $-7.09$.`,
      solution: `
**Step 1: zero angle.** From $-4$ to $-3+j5$: vector $1+j5$, $\\theta_{z}=\\tan^{-1}5=78.69^\\circ$.

**Step 2: pole angle.** $\\theta_{p}=78.69^\\circ-28^\\circ=50.69^\\circ$.

**Step 3: pole.** $p_{c}=3+\\dfrac{5}{\\tan50.69^\\circ}=3+4.09=7.09$, so $G_{c}=\\dfrac{s+4}{s+7.09}$.

**Check.** From $-7.09$: vector $4.09+j5$, angle $\\tan^{-1}(5/4.09)=50.7^\\circ$. ✓ The pole is left of the zero, as
lead requires.
`
    },
    {
      id: "9-21",
      difficulty: "challenge",
      topic: "PD compensation",
      sec: "9.3",
      prompt: `$G(s)=\\dfrac{K}{s^{2}(s+4)}$ (a double integrator with a lag, such as a rigid body driven through an
actuator).

(a) Show the uncompensated loop is unstable for every $K>0$.

(b) A PD zero is added: $K(s+z)/[s^{2}(s+4)]$. For which $z>0$ is there a stabilizing $K$?

(c) With $z=1$ the locus crosses the $20\\%$ line at $-0.665\\pm j1.297$ ($K=5.68$) and at $-1.251\\pm j2.442$
($K=11.28$). The third poles are $-2.67$ and $-1.50$. The simulated overshoot for both is $44\\%$. Explain.`,
      hint: `Routh on $s^{3}+4s^{2}+Ks+Kz$.`,
      expert: `
**First glance:** two poles at the origin and one at $-4$ give asymptotes at $\\pm60^\\circ$: two branches
head into the right half-plane immediately. Only a zero can bend them back.

**Discard:** trusting the $\\zeta$ line here. The closed-loop zero at $-1$ is at or inside the dominant pair's
real part in both designs.

**Path:** Routh for (a) and (b); for (c), compare the closed-loop zero and the third pole with the pair.

**Check:** with $z\\ge4$ the zero is at or left of the plant pole, and the asymptotes stay in the right
half-plane.
`,
      answer: `(a) $s^{3}+4s^{2}+K$: the $s^{1}$ row is $-K/4<0$. (b) Stable for all $K>0$ when $0<z<4$. (c) Both
designs leave a closed-loop zero at $-1$ near or to the right of the pair, and the third pole is not close
enough to cancel it (residue $0.62$ in both). The zero adds overshoot; $20\\%$ predicted, $44\\%$ actual.`,
      solution: `
**Step 1: (a).** $1+G=0\\Rightarrow s^{3}+4s^{2}+0\\cdot s+K=0$. A missing $s^{1}$ term already fails the
necessary condition; Routh confirms:

| | | |
|---|---|---|
| $s^{3}$ | $1$ | $0$ |
| $s^{2}$ | $4$ | $K$ |
| $s^{1}$ | $-K/4$ | |
| $s^{0}$ | $K$ | |

Two sign changes for every $K>0$: two right-half-plane poles.

**Step 2: (b).** With the zero, $s^{3}+4s^{2}+Ks+Kz=0$:

| | | |
|---|---|---|
| $s^{3}$ | $1$ | $K$ |
| $s^{2}$ | $4$ | $Kz$ |
| $s^{1}$ | $K(4-z)/4$ | |
| $s^{0}$ | $Kz$ | |

All positive iff $K>0$ and $0<z<4$. The zero must sit between the double pole and the plant pole: then the
asymptote centroid $(-4+z)/2$ is in the left half-plane and the asymptotes are vertical lines there.

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 372" class="nx-fig">
  <defs><marker id="nx9p21" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 296.7 L442.0 296.7" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p21)"/>
  <path d="M377.3 337.9 L377.3 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p21)"/>
  <text x="436.0" y="314.7" font-size="13">&#963;</text>
  <text x="383.3" y="30.0" font-size="13">j&#969;</text>
  <path d="M102.7 293.7 L102.7 299.7" stroke="currentColor" stroke-width="1"/>
  <text x="102.7" y="311.7" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M171.3 293.7 L171.3 299.7" stroke="currentColor" stroke-width="1"/>
  <text x="171.3" y="311.7" font-size="11" text-anchor="middle" opacity=".75">−3</text>
  <path d="M240.0 293.7 L240.0 299.7" stroke="currentColor" stroke-width="1"/>
  <text x="240.0" y="311.7" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M308.7 293.7 L308.7 299.7" stroke="currentColor" stroke-width="1"/>
  <text x="308.7" y="311.7" font-size="11" text-anchor="middle" opacity=".75">−1</text>
  <path d="M374.3 228.0 L380.3 228.0" stroke="currentColor" stroke-width="1"/>
  <text x="371.3" y="232.0" font-size="11" text-anchor="end" opacity=".75">j1</text>
  <path d="M374.3 159.3 L380.3 159.3" stroke="currentColor" stroke-width="1"/>
  <text x="371.3" y="163.3" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M374.3 90.7 L380.3 90.7" stroke="currentColor" stroke-width="1"/>
  <text x="371.3" y="94.7" font-size="11" text-anchor="end" opacity=".75">j3</text>
  <path d="M377.3 296.7 L377.3 295.5 L377.3 294.3 L377.3 293.1 L377.2 292.0 L377.1 290.8 L377.1 289.7 L377.0 288.6 L376.9 287.5 L376.8 286.4 L376.6 285.3 L376.5 284.3 L376.3 283.2 L376.2 282.2 L376.0 281.1 L375.8 280.1 L375.6 279.1 L375.4 278.0 L375.2 277.0 L375.0 276.1 L374.8 275.1 L374.5 274.1 L374.3 273.1 L374.0 272.2 L373.8 271.2 L373.5 270.3 L373.2 269.3 L372.9 268.4 L372.6 267.5 L372.3 266.6 L372.0 265.6 L371.7 264.7 L371.4 263.9 L371.0 263.0 L370.7 262.1 L370.3 261.2 L370.0 260.3 L369.6 259.5 L369.2 258.6 L368.9 257.7 L368.5 256.9 L368.1 256.0 L367.7 255.2 L367.3 254.3 L366.8 253.5 L366.4 252.7 L366.0 251.9 L365.6 251.0 L365.2 250.2 L364.7 249.4 L364.3 248.6 L363.8 247.8 L363.4 247.1 L362.9 246.3 L362.4 245.4 L362.0 244.7 L361.5 243.9 L361.0 243.1 L360.5 242.3 L360.0 241.6 L359.5 240.8 L359.0 240.1 L358.5 239.3 L357.9 238.5 L357.4 237.8 L356.9 237.1 L356.4 236.3 L355.8 235.6 L355.3 234.8 L354.8 234.1 L354.2 233.4 L353.7 232.7 L353.1 232.0 L352.6 231.2 L352.0 230.5 L351.4 229.7 L350.8 229.1 L350.3 228.4 L349.7 227.7 L349.1 227.0 L348.5 226.3 L347.9 225.6 L347.3 224.8 L346.7 224.1 L346.1 223.4 L345.5 222.8 L345.0 222.1 L344.4 221.4 L343.8 220.7 L343.1 220.0 L342.5 219.3 L341.8 218.6 L341.2 217.9 L340.5 217.1 L339.9 216.5 L339.3 215.9 L338.7 215.2 L338.1 214.5 L337.5 213.9 L336.9 213.2 L336.2 212.5 L335.6 211.8 L334.9 211.1 L334.2 210.3 L333.5 209.6 L332.8 208.8 L332.1 208.0 L331.5 207.4 L330.9 206.8 L330.3 206.1 L329.7 205.4 L329.1 204.8 L328.5 204.1 L327.9 203.4 L327.2 202.7 L326.6 201.9 L325.9 201.2 L325.3 200.4 L324.6 199.7 L323.9 198.9 L323.2 198.1 L322.6 197.3 L321.9 196.4 L321.2 195.6 L320.4 194.7 L319.7 193.8 L319.2 193.2 L318.7 192.5 L318.1 191.8 L317.6 191.1 L317.0 190.3 L316.5 189.6 L315.9 188.9 L315.4 188.1 L314.8 187.3 L314.3 186.5 L313.7 185.8 L313.2 184.9 L312.6 184.1 L312.1 183.3 L311.5 182.5 L311.0 181.6 L310.5 180.7 L309.9 179.9 L309.4 179.0 L308.9 178.1 L308.3 177.1 L307.8 176.2 L307.3 175.3 L306.8 174.3 L306.3 173.4 L305.8 172.4 L305.3 171.4 L304.8 170.4 L304.3 169.4 L303.8 168.4 L303.3 167.4 L302.9 166.4 L302.4 165.3 L302.0 164.3 L301.5 163.2 L301.1 162.2 L300.7 161.1 L300.2 160.0 L299.8 158.9 L299.4 157.9 L299.0 156.8 L298.6 155.7 L298.2 154.5 L297.9 153.4 L297.5 152.3 L297.1 151.2 L296.8 150.1 L296.4 148.9 L296.1 147.8 L295.8 146.6 L295.4 145.5 L295.1 144.3 L294.8 143.2 L294.5 142.0 L294.2 140.9 L293.9 139.7 L293.6 138.5 L293.3 137.4 L293.0 136.2 L292.7 135.0 L292.5 133.8 L292.2 132.6 L291.9 131.5 L291.7 130.3 L291.4 129.1 L291.2 127.9 L291.0 126.7 L290.7 125.5 L290.5 124.3 L290.3 123.1 L290.1 121.9 L289.8 120.7 L289.6 119.5 L289.4 118.3 L289.2 117.0 L289.0 115.8 L288.8 114.6 L288.6 113.4 L288.4 112.2 L288.2 110.9 L288.1 109.7 L287.9 108.5 L287.7 107.3 L287.5 106.0 L287.4 104.8 L287.2 103.6 L287.0 102.3 L286.9 101.1 L286.7 99.8 L286.6 98.6 L286.4 97.4 L286.3 96.1 L286.1 94.9 L286.0 93.6 L285.8 92.3 L285.7 91.1 L285.5 89.8 L285.4 88.6 L285.3 87.3 L285.1 86.0 L285.0 84.8 L284.9 83.5 L284.8 82.2 L284.6 80.9 L284.5 79.7 L284.4 78.4 L284.3 77.1 L284.2 75.8 L284.1 74.5 L283.9 73.2 L283.8 71.9 L283.7 70.6 L283.6 69.3 L283.5 68.0 L283.4 66.7 L283.3 65.4 L283.2 64.1 L283.1 62.8 L283.0 61.5 L282.9 60.2 L282.8 58.9 L282.7 57.5 L282.6 56.2 L282.5 54.9 L282.5 53.6 L282.4 52.2 L282.3 50.9 L282.2 49.5 L282.1 48.2 L282.0 46.8 L281.9 45.5 L281.9 44.1 L281.8 42.8 L281.7 41.4 L281.6 40.1 L281.6 38.7 L281.5 37.3 L281.4 36.0 L281.3 34.6 L281.3 33.2 L281.2 31.8 L281.1 30.4 L281.0 29.1 L281.0 27.7 L280.9 26.3 L280.8 24.9 L280.8 23.5 L280.7 22.1 L280.6 22.0 L280.6 22.0 L280.5 22.0 L280.5 22.0 L280.4 22.0" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(311.0 181.6) rotate(-122.2)"/>
  <path d="M377.3 296.7 L377.3 297.9 L377.3 299.0 L377.3 300.2 L377.2 301.3 L377.1 302.5 L377.1 303.6 L377.0 304.7 L376.9 305.8 L376.8 306.9 L376.6 308.0 L376.5 309.1 L376.3 310.1 L376.2 311.2 L376.0 312.2 L375.8 313.2 L375.6 314.3 L375.4 315.3 L375.2 316.3 L375.0 317.3 L374.8 318.3 L374.5 319.2 L374.3 320.2 L374.0 321.2 L373.8 322.1 L373.5 323.1 L373.2 324.0 L372.9 324.9 L372.6 325.9 L372.3 326.8 L372.0 327.7 L371.7 328.6 L371.4 329.5 L371.0 330.4 L370.7 331.3 L370.3 332.1 L370.0 333.0 L369.6 333.9 L369.2 334.8 L368.9 335.6 L368.5 336.5 L368.1 337.3 L367.7 337.9 L367.3 337.9 L366.8 337.9 L366.4 337.9 L366.0 337.9 L365.6 337.9 L365.2 337.9 L364.7 337.9 L364.3 337.9 L363.8 337.9" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(374.8 318.3) rotate(103.5)"/>
  <path d="M102.7 296.7 L103.9 296.7 L105.1 296.7 L106.3 296.7 L107.5 296.7 L108.7 296.7 L109.9 296.7 L111.1 296.7 L112.3 296.7 L113.5 296.7 L114.7 296.7 L115.9 296.7 L117.1 296.7 L118.3 296.7 L119.5 296.7 L120.8 296.7 L122.0 296.7 L123.2 296.7 L124.4 296.7 L125.7 296.7 L126.9 296.7 L128.1 296.7 L129.3 296.7 L130.6 296.7 L131.8 296.7 L133.1 296.7 L134.3 296.7 L135.5 296.7 L136.8 296.7 L138.0 296.7 L139.2 296.7 L140.5 296.7 L141.8 296.7 L143.0 296.7 L144.3 296.7 L145.5 296.7 L146.8 296.7 L148.1 296.7 L149.4 296.7 L150.6 296.7 L151.9 296.7 L153.2 296.7 L154.6 296.7 L155.8 296.7 L157.1 296.7 L158.4 296.7 L159.7 296.7 L160.9 296.7 L162.2 296.7 L163.4 296.7 L164.7 296.7 L166.1 296.7 L167.4 296.7 L168.8 296.7 L170.0 296.7 L171.3 296.7 L172.6 296.7 L173.9 296.7 L175.2 296.7 L176.6 296.7 L178.0 296.7 L179.4 296.7 L180.6 296.7 L181.8 296.7 L183.1 296.7 L184.4 296.7 L185.7 296.7 L187.0 296.7 L188.3 296.7 L189.7 296.7 L191.1 296.7 L192.5 296.7 L194.0 296.7 L195.4 296.7 L196.9 296.7 L198.2 296.7 L199.4 296.7 L200.6 296.7 L201.9 296.7 L203.2 296.7 L204.5 296.7 L205.8 296.7 L207.1 296.7 L208.5 296.7 L209.8 296.7 L211.2 296.7 L212.6 296.7 L214.0 296.7 L215.4 296.7 L216.8 296.7 L218.2 296.7 L219.7 296.7 L221.1 296.7 L222.6 296.7 L224.0 296.7 L225.5 296.7 L226.9 296.7 L228.4 296.7 L229.9 296.7 L231.3 296.7 L232.8 296.7 L234.2 296.7 L235.7 296.7 L237.1 296.7 L238.6 296.7 L240.0 296.7 L241.4 296.7 L242.7 296.7 L244.1 296.7 L245.5 296.7 L246.8 296.7 L248.1 296.7 L249.4 296.7 L250.6 296.7 L251.9 296.7 L253.1 296.7 L254.6 296.7 L256.0 296.7 L257.4 296.7 L258.7 296.7 L260.1 296.7 L261.3 296.7 L262.6 296.7 L264.0 296.7 L265.4 296.7 L266.7 296.7 L268.0 296.7 L269.2 296.7 L270.6 296.7 L271.9 296.7 L273.1 296.7 L274.4 296.7 L275.7 296.7 L276.9 296.7 L278.2 296.7 L279.4 296.7 L280.7 296.7 L282.0 296.7 L283.3 296.7 L284.5 296.7 L285.8 296.7 L287.0 296.7 L288.3 296.7 L289.5 296.7 L290.8 296.7 L292.0 296.7 L293.2 296.7 L294.4 296.7 L295.7 296.7 L296.9 296.7 L298.1 296.7 L299.3 296.7 L300.5 296.7 L301.7 296.7 L302.9 296.7 L304.1 296.7 L305.3 296.7 L306.5 296.7 L307.7 296.7" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(195.4 296.7) rotate(0.0)"/>
  <path d="M371.3 290.7 L383.3 302.7 M383.3 290.7 L371.3 302.7" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M96.7 290.7 L108.7 302.7 M108.7 290.7 L96.7 302.7" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <circle cx="308.7" cy="296.7" r="6" fill="var(--panel)" stroke="currentColor" stroke-width="2.2"/>
  <path d="M377.3 296.7 L236.6 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <text x="383.3" y="286.7" font-size="11" text-anchor="start">double pole</text>
  <rect x="327.7" y="203.6" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="321.7" y="201.6" font-size="11" text-anchor="end">K = 5.68</text>
  <rect x="287.4" y="125.0" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="281.4" y="123.0" font-size="11" text-anchor="end">K = 11.28</text>
</svg>
<figcaption>K(s+1)/[s²(s+4)]. The zero pulls both branches from the double pole into the left half-plane. The locus crosses the 20% line twice.</figcaption>
</figure>

**Step 3: (c) why $44\\%$.** The closed-loop zero is the PD zero, $-1$.

- At $K=5.68$ the pair's real part is $-0.665$: the zero is to the left of it, but close, at $1.5$ times the
  real part. The third pole at $-2.67$ is $1.67$ from the zero.
- At $K=11.28$ the pair is at $-1.251$: the zero is now to the *right* of the pair. The third pole at $-1.50$ is
  $0.50$ from the zero.

In both, the third pole's step-response residue is $+0.62$, and the zero's derivative action lifts the
early response. A zero within about the dominant real part adds tens of percent of overshoot, which is
what simulation shows.

**Check.** The fix is to move the zero left (larger $z$, still under $4$) or to search a lower-$\\zeta$ line
expecting the zero to add overshoot, then confirm by simulation.
`
    },
    {
      id: "9-22",
      difficulty: "warmup",
      topic: "PID design",
      sec: "9.4",
      prompt: `(a) A root-locus PID design ends as $\\dfrac{6(s+0.25)(s+4)}{s}$. Find $K_{1}$, $K_{2}$, $K_{3}$ for
$G_{c}=K_{1}+K_{2}/s+K_{3}s$.

(b) A PID is tuned to $K_{1}=10$, $K_{2}=2$, $K_{3}=1$. Where are its zeros?`,
      hint: `Expand $(s+a)(s+b)=s^{2}+(a+b)s+ab$ and match.`,
      expert: `
**First glance:** coefficient matching in both directions.

**Discard:** nothing to discard; it is two lines each way.

**Path:** $K_{3}=K$, $K_{1}=K(a+b)$, $K_{2}=Kab$; reverse with the quadratic formula on
$s^{2}+(K_{1}/K_{3})s+K_{2}/K_{3}$.

**Check:** one zero near the origin (PI part), one farther out (PD part).
`,
      answer: `(a) $K_{1}=25.5$, $K_{2}=6$, $K_{3}=6$. (b) $s^{2}+10s+2$: zeros at $-0.204$ and $-9.80$.`,
      solution: `
**Step 1: (a).** $(s+0.25)(s+4)=s^{2}+4.25s+1$, so

$$\\frac{6(s^{2}+4.25s+1)}{s}=6s+25.5+\\frac{6}{s}$$

$K_{3}=6$, $K_{1}=25.5$, $K_{2}=6$.

**Step 2: (b).** $G_{c}=\\dfrac{s^{2}+10s+2}{s}$. Zeros:

$$s=\\frac{-10\\pm\\sqrt{100-8}}{2}=\\frac{-10\\pm9.592}{2}=-0.204,\\ -9.796$$

**Check.** $0.204\\cdot9.796=2.00=K_{2}/K_{3}$ and $0.204+9.796=10=K_{1}/K_{3}$. ✓
`
    },
    {
      id: "9-23",
      difficulty: "core",
      topic: "PID design",
      sec: "9.4",
      prompt: `$G(s)=\\dfrac{K}{(s+2)(s+5)(s+9)}$, unity feedback. At $15\\%$ overshoot: $-2.325\\pm j3.850$,
$K=139.6$, step error $0.392$.

Design a PID controller for $15\\%$ overshoot, half the settling time and zero step error. Put the PI zero at
$-0.2$. Report $K_{1}$, $K_{2}$, $K_{3}$ and describe the response.`,
      hint: `Design point $-4.650+j7.700$. Plant angles there: $108.99^\\circ$, $87.39^\\circ$, $60.53^\\circ$. After adding the PI, re-solving moves the pair to $-4.557\\pm j7.546$ at $K=68.61$.`,
      expert: `
**First glance:** Type 0 plant; the PI part is required for zero error, the PD part for speed.

**Discard:** designing both zeros at once. The PI zero near the origin barely moves the design point, so
the PD can be designed alone first.

**Path:** deficit → PD zero → PD gain → add PI zero → re-solved $K$ → coefficients.

**Check:** the slow closed-loop pole near $-0.2$ will carry roughly the PD-compensated error, about
$0.17$.
`,
      answer: `PD zero $-6.44$ ($K=70.2$, error $0.166$). With the PI: $K=68.61$, $K_{1}=455.5$, $K_{2}=88.4$,
$K_{3}=68.6$. Fast part matches the PD design ($\\sim16\\%$ overshoot, peak $\\approx0.4$ s); a slow pole at
$-0.169$ with residue $-0.157$ removes the remaining error with time constant $5.9$ s.`,
      solution: `
**Step 1: design point.** $T_{s}=4/2.325=1.72$ s; halved: $\\sigma=4.650$, $\\omega_{d}=7.700$.

**Step 2: PD zero.** $\\angle G=-(108.99+87.39+60.53)=-256.92^\\circ$, so the zero supplies $76.92^\\circ$:

$$z_{c}=4.650+\\frac{7.700}{\\tan76.92^\\circ}=4.650+1.789=6.439$$

**Step 3: PD gain.** Lengths from $-2,-5,-9$: $8.143$, $7.708$, $8.844$; from the zero: $7.905$.

$$K=\\frac{8.143\\cdot7.708\\cdot8.844}{7.905}=70.2,\\qquad K_{p}=\\frac{70.2\\cdot6.439}{90}=5.02,\\qquad e=0.166$$

Third pole $-6.70$, $0.26$ from the zero (residue $0.04$). Simulated: $16.1\\%$, $T_{s}=0.88$ s.

**Step 4: add the PI.** $\\dfrac{s+0.2}{s}$ costs $-1.10^\\circ$ at the design point. Re-solved: $-4.557\\pm j7.546$,
$K=68.61$, other poles $-6.72$ and $-0.169$.

**Step 5: gains.** With $a=6.439$, $b=0.2$:

$$K_{1}=68.61(6.639)=455.5,\\qquad K_{2}=68.61(6.439)(0.2)=88.4,\\qquad K_{3}=68.61$$

**Step 6: the response.** Residues of $C(s)$: $1$ at the origin, $-0.157$ at $-0.169$, $0.046$ at $-6.72$, and
the pair. The fast part reproduces the PD response; the slow term $-0.157e^{-0.169t}$ lifts the output from
about $0.84$ to $1$. Simulated $2\\%$ settling is $12.2$ s, set entirely by that term.

**Check.** The slow residue $-0.157$ is close to the PD design's error, $0.166$. ✓ 9-28 shows how to keep the
zero error without the slow tail.
`
    },
    {
      id: "9-24",
      difficulty: "core",
      topic: "Lag-lead design",
      sec: "9.4",
      prompt: `$G(s)=\\dfrac{K}{s(s+5)(s+12)}$. Uncompensated at $20\\%$ overshoot: $-1.696\\pm j3.311$, $K=188.3$,
$K_{v}=3.14$.

Design a lag-lead compensator for $20\\%$ overshoot, half the settling time, and ten times $K_{v}$. Put the lead
zero on the plant pole at $-5$ and the lag pole at $-0.01$.`,
      hint: `Design point $-3.392+j6.622$. Plant angles: $117.13^\\circ$, $76.35^\\circ$, $37.57^\\circ$.`,
      expert: `
**First glance:** the lead zero cancels $-5$, leaving the origin and $-12$ plus the lead pole. The lag ratio is
only what the lead does not supply.

**Discard:** designing a lag of ratio $10$. The lead raises $K_{v}$ on its own.

**Path:** lead pole from the leftover angle, $K$ by lengths, $K_{v,\\text{lead}}$, ratio
$=31.39/K_{v,\\text{lead}}$, $z_{\\text{lag}}=$ ratio $\\times0.01$.

**Check:** after re-solving, the improvement should land just under $10$.
`,
      answer: `Lead $\\dfrac{s+5}{s+17.40}$, $K=1252$, $K_{v}=6.00$. Lag ratio $5.23$: $\\dfrac{s+0.0523}{s+0.01}$.
Final: $-3.377\\pm j6.592$, $K=1249$, $K_{v}=31.3$ ($\\times9.98$). Simulated $19.6\\%$, $T_{s}=1.12$ s.`,
      solution: `
**Step 1: design point.** $T_{s}=4/1.696=2.36$ s; halved: $\\sigma=3.392$, $\\omega_{d}=3.392\\tan62.87^\\circ=6.622$.

**Step 2: lead.** With $-5$ cancelled, the angles left are $-117.13^\\circ-37.57^\\circ=-154.70^\\circ$. The pole
takes $25.30^\\circ$:

$$p_{c}=3.392+\\frac{6.622}{\\tan25.30^\\circ}=3.392+14.01=17.40$$

$$K=|s_{d}|\\,|s_{d}+12|\\,|s_{d}+17.40|=7.440\\cdot10.860\\cdot15.49=1252$$

$$K_{v}=\\frac{1252\\cdot5}{5\\cdot12\\cdot17.40}=6.00$$

Simulated lead-only: $18.8\\%$, $T_{s}=1.16$ s.

**Step 3: lag.** Required $K_{v}=10\\cdot3.139=31.39$. Ratio $31.39/6.00=5.23$:

$$G_{\\text{lag}}=\\frac{s+0.0523}{s+0.01}$$

**Step 4: re-solve.** Dominant $-3.377\\pm j6.592$, $K=1249$, other poles $-22.60$, $-5.00$, $-0.0527$.

$$K_{v}=\\frac{1249\\cdot5\\cdot0.0523}{5\\cdot12\\cdot17.40\\cdot0.01}=31.3$$

**Step 5: verify.** Simulated $19.6\\%$, $T_{s}=1.12$ s. The slow pole's residue is $0.0072$, inside the $2\\%$
band.

**Check.** $31.3/3.139=9.98$. ✓
`
    },
    {
      id: "9-25",
      difficulty: "core",
      topic: "Lag-lead design",
      sec: "9.4",
      prompt: `A lead design has raised a Type 1 system's $K_{v}$ from $2.1$ to $3.4$. The ramp-error specification is
$e_{\\text{ramp}}\\le0.03$.

(a) What lag ratio is needed? Design the lag with $p_{c}=0.005$.

(b) A classmate designs the lag for ratio $15.9$, reasoning that the specification requires
$K_{v}=33.3$ and the uncompensated $K_{v}$ was $2.1$. What happens?`,
      hint: `The lag multiplies whatever $K_{v}$ the system has when the lag is added.`,
      expert: `
**First glance:** the lag acts on the lead-compensated $K_{v}$, not the original one.

**Discard:** the uncompensated $K_{v}$. It describes a system that no longer exists.

**Path:** required $K_{v}=1/0.03$; ratio $=33.3/3.4$.

**Check:** the classmate's ratio is $3.4/2.1=1.6$ times too large, so the resulting $K_{v}$ is $1.6$ times the
requirement.
`,
      answer: `(a) $K_{v}\\ge33.3$; ratio $9.80$; $z_{c}=0.049$ (use about $0.052$ for margin). (b) $K_{v}\\approx3.4\\cdot15.9=54$:
the specification is met with $60\\%$ to spare, at the cost of a larger lag gap (bigger slow tail) for no reason.`,
      solution: `
**Step 1: (a).** $K_{v}=1/0.03=33.3$. Ratio $33.3/3.4=9.80$; $z_{c}=9.80\\cdot0.005=0.049$.

A few percent of margin for the gain drop: ratio $\\approx10.4$, $z_{c}\\approx0.052$.

**Step 2: (b).** The classmate's ratio $15.9$ applied to $K_{v}=3.4$ gives $K_{v}\\approx54$. The error
requirement is beaten by $1.6\\times$, but the lag gap is $0.0745$ instead of $0.044$, so the angle it steals at
the dominant pole and the residue of its slow pole are both about $1.7\\times$ larger.

**Check.** $3.4\\times9.80=33.3$. ✓
`
    },
    {
      id: "9-26",
      difficulty: "challenge",
      topic: "Lag-lead design",
      sec: "9.4",
      prompt: `Take 9-24's plant and specifications ($20\\%$, $T_{s}$ halved, $K_{v}\\ge31.4$) and do the stages in the
reverse order.

(a) Design the lag first on the uncompensated system, $\\dfrac{s+0.1}{s+0.01}$. Re-solving gives
$-1.662\\pm j3.244$. Find $K_{v}$.

(b) Now add a lead with zero at $-5$ that puts the dominant poles at $-3.392\\pm j6.622$. The lead pole comes out at
$-17.80$ and $K=1288$. Find the final $K_{v}$.

(c) Compare with 9-24 and explain the difference.`,
      hint: `$K_{v}=K\\cdot5\\cdot0.1/(5\\cdot12\\cdot17.80\\cdot0.01)$ in (b). In (a), $K=|s||s+5||s+12||s+0.01|/|s+0.1|$.`,
      expert: `
**First glance:** the lead multiplies $K_{v}$ by itself (here by about $1.9$), on top of whatever the lag
already did.

**Discard:** the expectation that the order does not matter. The error constant is a product of every stage's
low-frequency gain.

**Path:** compute $K_{v}$ after each stage.

**Check:** the final factor should be about $10\\times1.9=19$.
`,
      answer: `(a) $K=185.9$, $K_{v}=31.0$ (the lag alone nearly meets the error spec). (b) $K_{v}=60.3$, $19\\times$ the original.
(c) The lead's own increase in $K_{v}$ stacks on the lag's. Designing the lead first lets the lag supply only the
remaining factor ($5.2$); designing the lag first over-delivers. The reversed design also has a larger lag gap and
settles slower: simulated $T_{s}=1.54$ s against $1.12$ s.`,
      solution: `
**Step 1: (a).** At $s=-1.662+j3.244$: $|s|=3.645$, $|s+5|=4.655$, $|s+12|=10.84$, $|s+0.01|=3.640$,
$|s+0.1|=3.600$.

$$K=\\frac{3.645\\cdot4.655\\cdot10.84\\cdot3.640}{3.600}=185.9$$

$$K_{v}=\\frac{185.9\\cdot0.1}{5\\cdot12\\cdot0.01}=31.0$$

**Step 2: (b).**

$$K_{v}=\\frac{1288\\cdot5\\cdot0.1}{5\\cdot12\\cdot17.80\\cdot0.01}=60.3$$

**Step 3: (c) compare.**

| | Lead then lag (9-24) | Lag then lead |
|---|---|---|
| Lag | $(s+0.0523)/(s+0.01)$ | $(s+0.1)/(s+0.01)$ |
| Lead | $(s+5)/(s+17.40)$ | $(s+5)/(s+17.80)$ |
| Final $K_{v}$ | $31.3$ | $60.3$ |
| Slow pole | $-0.0527$ | $-0.1015$ |
| Sim. $\\%OS$, $T_{s}$ | $19.6\\%$, $1.12$ s | $20.6\\%$, $1.54$ s |

The lead stage raises $K_{v}$ by itself: in 9-24 by $6.00/3.14=1.9$. Done second, that factor multiplies an error
constant already at target, giving $19\\times$. The larger lag gap leaves a larger, faster-decaying tail, which
lengthens the $2\\%$ settling time.

**Check.** $31.0\\times1.95\\approx60$. ✓
`
    },
    {
      id: "9-27",
      difficulty: "core",
      topic: "Notch filter",
      sec: "9.4",
      prompt: `A positioning stage is modelled as

$$G(s)=\\frac{64K}{s(s+4)(s^{2}+0.32s+64)}$$

a rigid body $K/[s(s+4)]$ with a structural mode at $8$ rad/s, $\\zeta_{r}=0.02$.

(a) The rigid-body model alone needs $K=11.45$ for $10\\%$ overshoot. Routh on the full model shows
instability above $K=5.58$. What happens if the rigid-body design is used?

(b) Add the notch $G_{c}=\\dfrac{s^{2}+0.32s+64}{(s+8)^{2}}$. Find its DC gain and the new loop.

(c) With the notch, the $10\\%$ crossing is at $-1.134\\pm j1.547$, $K=4.84$, and the stability limit rises to
$K=23.0$. Compare with (a).`,
      hint: `At $s=0$, $64/(s^{2}+0.32s+64)=1$, so the full model and the rigid body have the same DC behaviour.`,
      expert: `
**First glance:** a lightly damped mode under feedback: its branches leave the poles heading right, so a
small gain is enough to destabilize it.

**Discard:** designing on the rigid-body model and hoping. The resonance poles are already within
$0.16$ of the axis.

**Path:** Routh limit versus design gain for (a); notch cancels the resonance, leaving
$64K/[s(s+4)(s+8)^{2}]$ for (b) and (c).

**Check:** the notch has unity DC gain, so $K_{v}$ is computed from the same formula with and without it.
`,
      answer: `(a) $K=11.45>5.58$: the mode goes unstable, poles at $+0.26\\pm j7.37$. (b) DC gain $64/64=1$; loop
$\\dfrac{64K}{s(s+4)(s+8)^{2}}$. (c) $10\\%$ at $K=4.84$, $K_{v}=1.21$, with gain margin $23.0/4.84=4.8$. Simulated
$9.6\\%$, $T_{s}=3.3$ s. Slower than the rigid-body design promised ($K_{v}=2.86$) because the notch poles add
lag, but stable with margin.`,
      solution: `
**Step 1: (a).** At $K=11.45$ the closed-loop poles of the full model are $-2.42\\pm j2.76$ and
$+0.261\\pm j7.366$. The rigid-body pair looks as designed, but the resonance has crossed into the right
half-plane: a growing $7.4$ rad/s oscillation. (See the before locus in the reading.)

**Step 2: (b).** $G_{c}(0)=64/8^{2}=1$. The notch zeros cancel the resonant poles exactly:

$$G_{c}G=\\frac{64K}{s(s+4)(s+8)^{2}}$$

<figure class="nx-frame">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 301" class="nx-fig">
  <defs><marker id="nx9p27" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1.6 L9 5 L0 8.4 z" fill="currentColor"/></marker></defs>
  <path d="M34.0 238.0 L462.0 238.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p27)"/>
  <path d="M412.0 266.8 L412.0 18.0" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#nx9p27)"/>
  <text x="456.0" y="256.0" font-size="13">&#963;</text>
  <text x="418.0" y="30.0" font-size="13">j&#969;</text>
  <path d="M124.0 235.0 L124.0 241.0" stroke="currentColor" stroke-width="1"/>
  <text x="124.0" y="253.0" font-size="11" text-anchor="middle" opacity=".75">−8</text>
  <path d="M196.0 235.0 L196.0 241.0" stroke="currentColor" stroke-width="1"/>
  <text x="196.0" y="253.0" font-size="11" text-anchor="middle" opacity=".75">−6</text>
  <path d="M268.0 235.0 L268.0 241.0" stroke="currentColor" stroke-width="1"/>
  <text x="268.0" y="253.0" font-size="11" text-anchor="middle" opacity=".75">−4</text>
  <path d="M340.0 235.0 L340.0 241.0" stroke="currentColor" stroke-width="1"/>
  <text x="340.0" y="253.0" font-size="11" text-anchor="middle" opacity=".75">−2</text>
  <path d="M409.0 166.0 L415.0 166.0" stroke="currentColor" stroke-width="1"/>
  <text x="406.0" y="170.0" font-size="11" text-anchor="end" opacity=".75">j2</text>
  <path d="M409.0 94.0 L415.0 94.0" stroke="currentColor" stroke-width="1"/>
  <text x="406.0" y="98.0" font-size="11" text-anchor="end" opacity=".75">j4</text>
  <path d="M409.0 22.0 L415.0 22.0" stroke="currentColor" stroke-width="1"/>
  <text x="406.0" y="26.0" font-size="11" text-anchor="end" opacity=".75">j6</text>
  <path d="M412.0 238.0 L410.8 238.0 L409.6 238.0 L408.4 238.0 L407.2 238.0 L406.0 238.0 L404.8 238.0 L403.6 238.0 L402.3 238.0 L401.1 238.0 L399.9 238.0 L398.7 238.0 L397.4 238.0 L396.2 238.0 L395.0 238.0 L393.8 238.0 L392.6 238.0 L391.3 238.0 L390.0 238.0 L388.7 238.0 L387.4 238.0 L386.1 238.0 L384.9 238.0 L383.6 238.0 L382.2 238.0 L380.9 238.0 L379.7 238.0 L378.3 238.0 L377.1 238.0 L375.6 238.0 L374.4 238.0 L373.0 238.0 L371.7 238.0 L370.4 238.0 L368.7 238.0 L367.3 238.0 L365.6 238.0 L362.9 238.0 L360.2 235.9 L360.3 234.0 L360.3 232.7 L360.4 230.8 L360.5 229.4 L360.6 228.1 L360.7 226.9 L360.8 225.4 L360.9 224.1 L361.1 222.8 L361.2 221.7 L361.3 220.6 L361.5 219.2 L361.7 218.0 L361.9 216.8 L362.0 215.6 L362.2 214.5 L362.4 213.4 L362.6 212.4 L362.8 211.2 L363.1 210.0 L363.3 208.9 L363.5 207.7 L363.8 206.6 L364.0 205.6 L364.3 204.6 L364.5 203.5 L364.7 202.6 L365.0 201.6 L365.2 200.6 L365.5 199.5 L365.9 198.4 L366.2 197.3 L366.5 196.2 L366.8 195.2 L367.1 194.1 L367.4 193.1 L367.7 192.1 L368.1 191.1 L368.4 190.1 L368.7 189.1 L369.1 188.2 L369.4 187.2 L369.7 186.2 L370.1 185.3 L370.4 184.4 L370.8 183.4 L371.1 182.5 L371.5 181.6 L371.8 180.7 L372.2 179.8 L372.5 178.9 L372.9 178.0 L373.3 177.1 L373.6 176.2 L374.0 175.3 L374.4 174.4 L374.7 173.5 L375.1 172.6 L375.5 171.8 L375.9 170.9 L376.3 170.0 L376.7 169.2 L377.1 168.3 L377.5 167.4 L377.9 166.6 L378.3 165.7 L378.7 164.9 L379.1 164.0 L379.5 163.2 L379.9 162.3 L380.3 161.5 L380.7 160.6 L381.2 159.8 L381.6 158.9 L382.0 158.1 L382.5 157.2 L382.9 156.4 L383.3 155.5 L383.8 154.7 L384.2 153.9 L384.7 153.0 L385.1 152.2 L385.6 151.3 L386.0 150.5 L386.5 149.7 L387.0 148.8 L387.4 148.0 L387.9 147.1 L388.4 146.3 L388.9 145.4 L389.3 144.6 L389.8 143.8 L390.3 142.9 L390.8 142.1 L391.3 141.2 L391.8 140.4 L392.3 139.5 L392.8 138.7 L393.3 137.8 L393.8 137.0 L394.3 136.1 L394.9 135.3 L395.4 134.4 L395.9 133.6 L396.4 132.7 L397.0 131.9 L397.5 131.0 L398.0 130.2 L398.6 129.3 L399.1 128.5 L399.7 127.6 L400.2 126.7 L400.8 125.9 L401.3 125.0 L401.9 124.1 L402.5 123.3 L403.0 122.4 L403.5 121.7 L404.0 121.0 L404.5 120.2 L405.0 119.5 L405.5 118.8 L405.9 118.0 L406.4 117.3 L406.9 116.6 L407.4 115.8 L407.9 115.1 L408.4 114.4 L408.9 113.6 L409.4 112.9 L410.0 112.1 L410.5 111.4 L411.0 110.7 L411.5 109.9 L412.0 109.2 L412.6 108.4 L413.1 107.7 L413.6 106.9 L414.1 106.2 L414.7 105.4 L415.2 104.7 L415.7 103.9 L416.3 103.1 L416.8 102.4 L417.4 101.6 L417.9 100.9 L418.5 100.1 L419.0 99.3 L419.6 98.6 L420.2 97.8 L420.7 97.0 L421.3 96.2 L421.9 95.5 L422.4 94.7 L423.0 93.9 L423.6 93.1 L424.2 92.3 L424.8 91.6 L425.3 90.8 L425.9 90.0 L426.5 89.2 L427.1 88.4 L427.7 87.6 L428.3 86.8 L428.9 86.0 L429.5 85.2 L430.1 84.4 L430.7 83.6 L431.4 82.8 L432.0 82.0 L432.6 81.2 L433.2 80.4 L433.8 79.6 L434.5 78.8 L435.1 77.9 L435.7 77.1 L436.4 76.3 L437.0 75.5 L437.7 74.7 L438.3 73.8 L439.0 73.0 L439.6 72.2 L440.3 71.3 L440.9 70.5 L441.5 69.8 L442.0 69.2 L442.5 68.5 L443.1 67.8 L443.6 67.1 L444.1 66.4 L444.7 65.8 L445.2 65.1 L445.8 64.4 L446.3 63.7 L446.9 63.0 L447.4 62.4 L448.0 61.7 L448.5 61.0 L449.1 60.3 L449.7 59.6 L450.2 58.9 L450.8 58.2 L451.3 57.5 L451.9 56.8 L452.5 56.1 L453.1 55.4 L453.6 54.7 L454.2 54.0 L454.8 53.3 L455.4 52.6 L455.9 51.9 L456.5 51.2 L457.1 50.4 L457.7 49.7 L458.3 49.0 L458.9 48.3 L459.5 47.6 L460.1 46.8 L460.7 46.1 L461.3 45.4 L461.9 44.7 L462.5 43.9 L463.1 43.2 L463.7 42.5 L464.3 41.7 L464.9 41.0 L465.6 40.3 L466.0 39.5 L466.0 38.8 L466.0 38.1 L466.0 37.3 L466.0 36.6 L466.0 35.8 L466.0 35.1 L466.0 34.3 L466.0 33.6 L466.0 32.8 L466.0 32.0 L466.0 31.3 L466.0 30.5 L466.0 29.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(387.4 148.0) rotate(-60.8)"/>
  <path d="M268.0 238.0 L269.2 238.0 L270.4 238.0 L271.6 238.0 L272.8 238.0 L274.0 238.0 L275.2 238.0 L276.4 238.0 L277.7 238.0 L278.9 238.0 L280.1 238.0 L281.3 238.0 L282.6 238.0 L283.8 238.0 L285.0 238.0 L286.2 238.0 L287.4 238.0 L288.7 238.0 L289.9 238.0 L291.1 238.0 L292.3 238.0 L293.5 238.0 L294.8 238.0 L296.0 238.0 L297.3 238.0 L298.5 238.0 L299.8 238.0 L301.1 238.0 L302.3 238.0 L303.5 238.0 L304.8 238.0 L306.1 238.0 L307.3 238.0 L308.6 238.0 L309.8 238.0 L311.1 238.0 L312.4 238.0 L313.6 238.0 L314.8 238.0 L316.1 238.0 L317.4 238.0 L318.6 238.0 L319.9 238.0 L321.2 238.0 L322.5 238.0 L323.7 238.0 L325.0 238.0 L326.4 238.0 L327.6 238.0 L328.9 238.0 L330.3 238.0 L331.6 238.0 L332.9 238.0 L334.1 238.0 L335.5 238.0 L336.9 238.0 L338.4 238.0 L339.6 238.0 L341.0 238.0 L342.4 238.0 L344.0 238.0 L345.3 238.0 L346.6 238.0 L348.1 238.0 L349.9 238.0 L351.2 238.0 L352.7 238.0 L354.6 238.0 L355.8 238.0 L357.5 238.0 L360.2 240.1 L360.3 242.0 L360.3 243.3 L360.4 245.2 L360.5 246.6 L360.6 247.9 L360.7 249.1 L360.8 250.6 L360.9 251.9 L361.1 253.2 L361.2 254.3 L361.3 255.4 L361.5 256.8 L361.7 258.0 L361.9 259.2 L362.0 260.4 L362.2 261.5 L362.4 262.6 L362.6 263.6 L362.8 264.8 L363.1 266.0 L363.3 266.8 L363.5 266.8 L363.8 266.8 L364.0 266.8 L364.3 266.8 L364.5 266.8 L364.7 266.8 L365.0 266.8 L365.2 266.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(328.9 238.0) rotate(0.0)"/>
  <path d="M124.0 238.0 L124.0 236.8 L124.0 235.6 L123.9 234.5 L123.9 233.3 L123.8 232.2 L123.7 231.0 L123.7 229.9 L123.6 228.8 L123.5 227.7 L123.3 226.6 L123.2 225.6 L123.1 224.5 L122.9 223.4 L122.7 222.4 L122.6 221.3 L122.4 220.3 L122.2 219.3 L122.0 218.3 L121.8 217.3 L121.6 216.3 L121.4 215.3 L121.1 214.3 L120.9 213.3 L120.6 212.3 L120.4 211.4 L120.1 210.4 L119.9 209.4 L119.6 208.5 L119.3 207.5 L119.0 206.6 L118.7 205.7 L118.4 204.7 L118.1 203.8 L117.8 202.9 L117.5 202.0 L117.2 201.1 L116.9 200.2 L116.5 199.2 L116.2 198.4 L115.9 197.4 L115.5 196.6 L115.2 195.7 L114.8 194.8 L114.5 193.9 L114.1 193.0 L113.7 192.2 L113.3 191.3 L113.0 190.4 L112.6 189.6 L112.2 188.7 L111.8 187.8 L111.4 187.0 L111.0 186.1 L110.6 185.3 L110.2 184.4 L109.8 183.5 L109.4 182.7 L109.0 181.9 L108.6 181.1 L108.2 180.2 L107.7 179.4 L107.3 178.5 L106.9 177.7 L106.5 176.9 L106.1 176.1 L105.6 175.3 L105.2 174.5 L104.7 173.7 L104.3 172.8 L103.8 172.0 L103.4 171.2 L102.9 170.4 L102.5 169.6 L102.1 168.8 L101.6 168.0 L101.1 167.2 L100.7 166.4 L100.2 165.6 L99.7 164.8 L99.2 163.9 L98.8 163.2 L98.3 162.4 L97.8 161.6 L97.4 160.9 L96.9 160.1 L96.4 159.3 L95.9 158.5 L95.4 157.7 L94.9 156.9 L94.4 156.1 L93.9 155.3 L93.4 154.5 L92.9 153.7 L92.4 153.0 L92.0 152.2 L91.5 151.5 L91.0 150.8 L90.5 150.0 L90.0 149.2 L89.5 148.5 L89.0 147.7 L88.5 147.0 L88.0 146.2 L87.5 145.4 L86.9 144.6 L86.4 143.8 L85.9 143.1 L85.3 142.3 L84.8 141.5 L84.2 140.7 L83.7 139.9 L83.2 139.1 L82.7 138.4 L82.2 137.7 L81.7 137.0 L81.2 136.3 L80.7 135.5 L80.1 134.8 L79.6 134.1 L79.1 133.3 L78.6 132.6 L78.0 131.8 L77.5 131.1 L76.9 130.3 L76.4 129.6 L75.8 128.8 L75.3 128.1 L74.7 127.3 L74.2 126.5 L73.6 125.7 L73.0 125.0 L72.4 124.2 L71.9 123.4 L71.3 122.6 L70.7 121.8 L70.1 121.0 L69.6 120.3 L69.1 119.6 L68.5 118.9 L68.0 118.2 L67.5 117.5 L66.9 116.8 L66.4 116.1 L65.9 115.4 L65.3 114.7 L64.8 114.0 L64.2 113.3 L63.7 112.5 L63.1 111.8 L62.6 111.1 L62.0 110.4 L61.4 109.6 L60.9 108.9 L60.3 108.2 L59.7 107.4 L59.1 106.7 L58.5 105.9 L58.0 105.2 L57.4 104.4 L56.8 103.7 L56.2 102.9 L55.6 102.1 L55.0 101.4 L54.3 100.6 L53.7 99.8 L53.1 99.0 L52.5 98.3 L51.9 97.5 L51.2 96.7 L50.6 95.9 L50.0 95.1 L49.3 94.3 L48.8 93.6 L48.3 93.0 L47.7 92.3 L47.2 91.6 L46.6 91.0 L46.1 90.3 L45.5 89.6 L45.0 88.9 L44.4 88.2 L43.8 87.5 L43.3 86.9 L42.7 86.2 L42.1 85.5 L41.6 84.8 L41.0 84.1 L40.4 83.4 L39.8 82.7 L39.2 82.0 L38.7 81.2 L38.1 80.5 L37.5 79.8 L36.9 79.1 L36.3 78.4 L35.7 77.7 L35.1 76.9 L34.5 76.2 L34.0 75.5 L34.0 74.7 L34.0 74.0 L34.0 73.3 L34.0 72.5 L34.0 71.8 L34.0 71.0 L34.0 70.3 L34.0 69.5 L34.0 68.8 L34.0 68.0 L34.0 67.3 L34.0 66.5 L34.0 65.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(88.0 146.2) rotate(-123.8)"/>
  <path d="M124.0 238.0 L124.0 239.2 L124.0 240.4 L123.9 241.5 L123.9 242.7 L123.8 243.8 L123.7 245.0 L123.7 246.1 L123.6 247.2 L123.5 248.3 L123.3 249.4 L123.2 250.4 L123.1 251.5 L122.9 252.6 L122.7 253.6 L122.6 254.7 L122.4 255.7 L122.2 256.7 L122.0 257.7 L121.8 258.7 L121.6 259.7 L121.4 260.7 L121.1 261.7 L120.9 262.7 L120.6 263.7 L120.4 264.6 L120.1 265.6 L119.9 266.6 L119.6 266.8 L119.3 266.8 L119.0 266.8 L118.7 266.8 L118.4 266.8 L118.1 266.8 L117.8 266.8 L117.5 266.8 L117.2 266.8" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <path d="M-5 -4.5 L5 0 L-5 4.5 z" fill="currentColor" stroke="none" transform="translate(122.6 254.7) rotate(99.7)"/>
  <path d="M406.0 232.0 L418.0 244.0 M418.0 232.0 L406.0 244.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M262.0 232.0 L274.0 244.0 M274.0 232.0 L262.0 244.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <path d="M118.0 232.0 L130.0 244.0 M130.0 232.0 L118.0 244.0" stroke="currentColor" stroke-width="2.2" fill="none"/>
  <text x="124.0" y="226.0" font-size="11" text-anchor="middle">double</text>
  <path d="M412.0 238.0 L253.7 22.0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity=".7"/>
  <rect x="88.8" y="149.6" width="8" height="8" fill="currentColor" stroke="none"/>
  <rect x="367.2" y="178.3" width="8" height="8" fill="currentColor" stroke="none"/>
  <text x="381.2" y="180.3" font-size="11" text-anchor="start">K = 4.84</text>
</svg>
<figcaption>After the notch: 64K/[s(s+4)(s+8)²], with the resonance cancelled. Squares: closed-loop poles at the 10% gain, K = 4.84. The jω crossing is now at K = 23.0.</figcaption>
</figure>

**Step 3: (c).** At $K=4.84$: dominant $-1.134\\pm j1.547$, other poles $-8.87\\pm j2.34$, which are $7.8$ times the
dominant real part.

$$K_{v}=\\frac{64\\cdot4.84}{4\\cdot64}=1.21$$

The rigid-body design would have had $K_{v}=11.45/4=2.86$ and $T_{s}=4/2=2$ s, if it had been stable.

**Check.** If the real mode is at $8.4$ rad/s instead of $8$ (a $5\\%$ model error), the uncancelled pair sits at
$-0.156\\pm j8.403$ with a residue under $0.002$. Simulated $9.5\\%$ and $T_{s}=3.32$ s against $9.6\\%$ and
$3.31$ s with exact cancellation, so exact cancellation is not required.
`
    },
    {
      id: "9-28",
      difficulty: "challenge",
      topic: "PID design",
      sec: "9.4",
      prompt: `In 9-23 the PI zero at $-0.2$ left a slow tail: $2\\%$ settling $12.2$ s even though the dominant poles
promise $0.86$ s.

(a) A classmate moves the PI zero to $-2$, cancelling the plant pole, and keeps the PD zero at $-6.44$. The
$15\\%$ crossing becomes $-3.500\\pm j5.795$ at $K=49.8$. Did that fix it?

(b) Redesign the PD zero with the PI zero fixed at $-2$ so the dominant poles land at $-4.650\\pm j7.700$.
Report the PID gains and the response.`,
      hint: `With $-2$ cancelled and a pole at the origin, the effective plant is $1/[s(s+5)(s+9)]$. Its angles at the design point: $121.13^\\circ$, $87.39^\\circ$, $60.53^\\circ$.`,
      expert: `
**First glance:** a PI zero on a plant pole removes the slow closed-loop pole entirely: the branch from that pole
has zero length.

**Discard:** keeping the old PD zero. The PI zero at $-2$ now steals $12^\\circ$ at the design point, so the PD
must be redesigned around it.

**Path:** effective plant $1/[s(s+5)(s+9)]$; deficit; zero; $K$; gains from $(s+z)(s+2)$.

**Check:** with no slow pole, simulated $T_{s}$ should match $4/\\sigma$.
`,
      answer: `(a) Partly: the tail is gone ($T_{s}=1.17$ s, $16.6\\%$) but the pair moved to $-3.50$, so $T_{s}$ misses $0.86$ s.
(b) PD zero $-4.777$, $K=79.6$: $G_{c}=79.6\\dfrac{(s+4.777)(s+2)}{s}$, $K_{1}=539.5$, $K_{2}=760.6$,
$K_{3}=79.6$. Simulated $14.4\\%$, $T_{s}=0.87$ s, zero step error.`,
      solution: `
**Step 1: (a).** At $-3.500\\pm j5.795$, $T_{s}=4/3.5=1.14$ s, over the $0.86$ s target. The closed-loop pole at
$-2$ sits exactly on its zero, so there is no slow tail; simulation gives $16.6\\%$ and $T_{s}=1.17$ s. Better
than $12.2$ s, but the PI zero at $-2$ costs $-12.1^\\circ$ at the design point and the old PD zero no longer
reaches it.

**Step 2: (b) effective plant.** $\\dfrac{s+2}{s}\\cdot\\dfrac{1}{(s+2)(s+5)(s+9)}=\\dfrac{1}{s(s+5)(s+9)}$.

**Step 3: deficit.** $\\angle=-(121.13+87.39+60.53)=-269.05^\\circ$, so the PD zero supplies $89.05^\\circ$:

$$z_{c}=4.650+\\frac{7.700}{\\tan89.05^\\circ}=4.650+0.128=4.777$$

**Step 4: gain.** Lengths: $|s_{d}|=8.995$, $|s_{d}+5|=7.708$, $|s_{d}+9|=8.844$, $|s_{d}+4.777|=7.701$.

$$K=\\frac{8.995\\cdot7.708\\cdot8.844}{7.701}=79.6$$

**Step 5: PID gains.** $a=4.777$, $b=2$:

$$K_{1}=79.6(6.777)=539.5,\\qquad K_{2}=79.6(4.777)(2)=760.6,\\qquad K_{3}=79.6$$

**Step 6: response.** Closed-loop poles $-4.650\\pm j7.700$, $-4.70$ (on the zero at $-4.78$, residue $-0.02$), and
$-2$ (cancelled). Simulated $14.4\\%$, $T_{s}=0.87$ s, $e_{\\text{step}}=0$.

**Check.** The cancellation depends on the plant pole really being at $-2$. If it drifts, a slow pole near $-2$
reappears, with time constant about $0.5$ s, far less harmful than the $5.9$ s tail of 9-23.
`
    },
    {
      id: "9-29",
      difficulty: "challenge",
      topic: "Lag-lead design",
      sec: "9.4",
      prompt: `Design a cascade compensator for $G(s)=\\dfrac{K}{s(s+2)(s+10)}$ to meet all of:

- overshoot $\\le10\\%$
- $T_{s}\\le1.2$ s (2% criterion)
- ramp error $\\le0.02$

Use a passive lag-lead with the lead zero at $-2$. Verify every specification against the final closed-loop
poles, and fix the design if one fails.`,
      hint: `The design point is $-3.333+j4.548$. After the lead, check whether $p_{c}=0.01$ for the lag leaves a tail bigger than $2\\%$.`,
      expert: `
**First glance:** the error requirement ($K_{v}\\ge50$) is over $40$ times the uncompensated $1.11$. The lag ratio
will be large, so its slow pole's tail is the main risk to the settling-time spec.

**Discard:** the default $p_{c}=0.01$ without checking. A ratio of $13$ at that scale puts a tail of a few percent on
a $2\\%$ criterion.

**Path:** lead for the transient; $K_{v,\\text{lead}}$; lag ratio with margin; residue of the slow pole; shrink
the lag pair if the residue exceeds $0.02$.

**Check:** the final simulated $\\%OS$, $T_{s}$ and $K_{v}$ against all three numbers.
`,
      answer: `Lead $\\dfrac{s+2}{s+16.21}$ ($K=621$, $K_{v}=3.83$). Lag ratio $13.7$ (5% margin). With $p_{c}=0.01$ the slow tail
(residue $0.036$) breaks both transient specs ($13.1\\%$, $T_{s}=4.2$ s). With $p_{c}=0.001$:
$\\dfrac{s+0.0137}{s+0.001}$, final $K=621$, $K_{v}=52.5$, simulated $9.9\\%$, $T_{s}=1.13$ s. All met.`,
      solution: `
**Step 1: uncompensated.** On the $10\\%$ line ($\\zeta=0.591$): $-0.869\\pm j1.186$, $K=22.2$, $T_{s}=4.6$ s,
$K_{v}=22.2/20=1.11$. Every spec but overshoot fails.

**Step 2: design point.** $\\sigma=4/1.2=3.333$, $\\omega_{d}=3.333\\tan53.76^\\circ=4.548$.

**Step 3: lead.** Plant angles: $126.24^\\circ$, $106.34^\\circ$, $34.30^\\circ$. The zero cancels $-2$, leaving
$-160.54^\\circ$; the pole takes $19.46^\\circ$:

$$p_{c}=3.333+\\frac{4.548}{\\tan19.46^\\circ}=3.333+12.87=16.21$$

$$K=|s_{d}|\\,|s_{d}+10|\\,|s_{d}+16.21|=5.639\\cdot8.070\\cdot13.65=621.2,\\qquad
K_{v}=\\frac{621.2}{10\\cdot16.21}=3.83$$

Lead alone: simulated $9.5\\%$, $T_{s}=1.11$ s. Transient met.

**Step 4: lag ratio.** $50/3.83=13.0$; with $5\\%$ margin, $13.7$.

**Step 5: first try, $p_{c}=0.01$, $z_{c}=0.137$.** Re-solved: $K=620.4$, $K_{v}=52.4$, slow pole $-0.142$ with
residue $+0.036$. That tail is above the $2\\%$ band and decays with a $7$ s time constant. Simulated:
$13.1\\%$, $T_{s}=4.2$ s. **Fails.**

**Step 6: fix, $p_{c}=0.001$, $z_{c}=0.0137$.** Re-solved: dominant $-3.328\\pm j4.540$, $K=621.2$, other poles
$-19.54$, $-2.00$, $-0.0137$. Slow residue $0.0033$.

| Spec | Required | Result |
|---|---|---|
| $\\%OS$ | $\\le10$ | $9.86$ |
| $T_{s}$ | $\\le1.2$ s | $1.13$ s |
| $K_{v}$ | $\\ge50$ | $52.5$ |

**Step 7: the cost.** The ramp error reaches its final $0.019$ only as fast as $e^{-0.0137t}$: after $5$ s it is
still $0.25$. If the specification also limited how long the ramp error may take to settle, the lag would have to be
moved out again and the transient margin rebuilt, for example by designing the lead for $8\\%$.

**Check.** $K_{v}=\\dfrac{621.2\\cdot2\\cdot0.0137}{2\\cdot10\\cdot16.21\\cdot0.001}=52.5$. ✓
`
    },
    {
      id: "9-30",
      difficulty: "warmup",
      topic: "Lag-lead design",
      sec: "9.4",
      prompt: `A lead design has put the dominant poles at $-4\\pm j6$. A lag $\\dfrac{s+0.08}{s+0.01}$ is added for
the error. Estimate how far it rotates the open-loop angle at $-4+j6$ and how much the gain must rise to keep
the point on the locus.`,
      hint: `$\\Delta\\theta\\approx-(z_{c}-p_{c})\\omega_{d}/\\omega_{n}^{2}$, and the magnitude factor is about $1-(z_{c}-p_{c})\\sigma/\\omega_{n}^{2}$.`,
      expert: `
**First glance:** $\\omega_{n}^{2}=52$; a gap of $0.07$ against that is tiny.

**Discard:** exact arctangents. The small-pair formulas are accurate to under $1\\%$ here.

**Path:** two one-line formulas.

**Check:** both effects should be well under a degree and under a percent.
`,
      answer: `$\\Delta\\theta\\approx-0.46^\\circ$; gain up about $0.54\\%$. Negligible, which is why the lag goes second.`,
      solution: `
**Step 1: angle.** $\\omega_{n}^{2}=16+36=52$, $\\omega_{d}=6$, $z_{c}-p_{c}=0.07$:

$$\\Delta\\theta\\approx-\\frac{0.07\\cdot6}{52}=-0.00808\\text{ rad}=-0.463^\\circ$$

**Step 2: gain.** The lag's magnitude at the point is about $1-0.07\\cdot4/52=0.9946$, so $K$ must rise by
$1/0.9946=1.0054$.

**Check.** Exact: $\\angle(s+0.08)-\\angle(s+0.01)=-0.466^\\circ$, and $|s+0.01|/|s+0.08|=1.0054$. ✓
`
    }
  ]
});
