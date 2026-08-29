registerChapter({
  id: 1,
  title: "Introduction",
  sections: "1.1–1.7",
  brief: "A control system produces a specified output from a specified input. Closed loop means measure and correct. Performance splits into transient response, steady-state error, and stability. Natural response belongs to the system; forced response belongs to the input. Those two cuts are not the same.",
  sectionList: [
    { id: "1.1", title: "What a control system is" },
    { id: "1.2", title: "History" },
    { id: "1.3", title: "Open loop versus closed loop" },
    { id: "1.4", title: "Analysis and design objectives" },
    { id: "1.5", title: "The design process" }
  ],

  guide: [
    {
      title: "What this chapter is for",
      example: "1-01",
      sec: "1.1",
      body: `
Almost no computation. The work is naming things correctly.

Later chapters use *actuating signal*, *error*, *natural response*, *forced response*,
*transient*, and *steady-state* as technical terms. Mixing them is not a wording issue.
It is a modeling error.

The qualitative fact that design later makes quantitative: raising loop gain speeds the
response, increases overshoot, and reduces steady-state error. A dynamic compensator
exists because gain alone cannot break that trade-off.
`
    },
    {
      title: "1.1: What a control system is",
      example: "1-02",
      sec: "1.1",
      body: `
A control system is an assembly of subsystems and processes arranged to produce a
desired output with desired performance, given a specified input. In the simplest
framing, **the input is the desired output**.

### Two measures of performance

- **Transient response**: how the output behaves while it is still moving toward its
  final value.
- **Steady-state error**: the difference between input and output after the
  transients have effectively died out.

### Four reasons control systems get built

1. **Power amplification** (power gain): a low-power knob commands a high-power output.
2. **Remote control**: operate in inaccessible, hazardous, or distant environments.
3. **Convenience of input form**: input and output need not be the same physical
   quantity. A thermostat dial position commands heat.
4. **Compensation for disturbances**: hold the commanded output despite wind, load
   changes, noise, or drift.
`
    },
    {
      title: "1.3: Open loop versus closed loop",
      example: "1-03",
      sec: "1.3",
      body: `
**Open loop.** Signal path: input transducer → controller → plant (process). No sensor,
no return path. Commanded purely by its input.

**Closed loop (feedback control).** Adds an output transducer (sensor) and a feedback
path returning the measured output to a summing junction, where it is subtracted from
the input.

The distinguishing property is **measurement and correction**. Open-loop systems have
neither. That sentence is the definition: not "has a loop drawn on it."

| | Open loop | Closed loop |
|---|---|---|
| Disturbance rejection | None. Corrupted by disturbances at the controller input and at the plant output. | Measures the output and drives the plant to correct the difference. |
| Accuracy | Limited by calibration and by how well the plant is known. | Higher; less sensitive to noise, disturbances, environmental change. |
| Adjustability | Little. | Transient response and steady-state error adjustable by loop gain, or by redesigning the controller. |
| Cost / complexity | Simple and cheap. | More complex, more expensive - needs sensing. |
| Example | A toaster. It never measures toast color. | A toaster oven sensing reflected light and humidity. |

### Terminology trap

The signal out of the first summing junction is the **actuating signal**. It is called
the **error** only when both input and output transducers have unity gain, so that the
actuating signal equals the true input-minus-output difference. The distinction is load-bearing in Chapter 7.

Redesigning the controller to fix performance is **compensation**; the resulting
hardware is a **compensator**.

### Computer-controlled systems

When the controller is a digital computer, one machine can time-share many loops,
compensator parameters change in software rather than hardware, and the computer can
take on supervisory scheduling.
`
    },
    {
      title: "1.4: The three analysis and design objectives",
      example: "1-05",
      sec: "1.4",
      body: `
**Analysis** determines the performance of a system that already exists.
**Design** creates or modifies a system to obtain performance you specify.

1. **Transient response.** Too slow wastes time; too fast can mean overshoot,
   oscillation, or physical damage. Quantified in Chapter 4.
2. **Steady-state error.** The accuracy left over once motion stops. Quantified in
   Chapter 7.
3. **Stability.** Logically first: the other two are meaningless without it.
   Quantified in Chapter 6.

### Stability, stated precisely

$$\\text{Total response} = \\text{Natural response} + \\text{Forced response}$$

These are the homogeneous and particular solutions from differential equations.

- The **natural response** describes how the system dissipates or acquires energy. Its
  form depends **only on the system**, never on the input.
- The **forced response** has a form that depends on the input.

For the system to be useful, the natural response must either decay to zero or
oscillate without growing. If it grows without bound it eventually swamps the forced
response and the system is no longer controlled: that is **instability**.

### The subtlety most students get wrong

Transient/steady-state and natural/forced are **not** the same split. Transient and
steady-state are the two visible parts of the plotted response. Natural and forced are
the underlying mathematical components, and **both are present in both visible parts**.
The transient portion is where the natural response is large; the steady-state portion
is where it has become small.

### Other considerations

- **Hardware selection**: motor sizing for power, sensor choice for accuracy. These
  constrain the design from the start.
- **Cost**: a one-off can absorb expensive parts; a high-volume product cannot.
- **Robustness**: real parameters drift with age, temperature, and load, and the map
  from parameter change to performance change is nonlinear. Formalized as
  *sensitivity* in Chapters 7 and 8.
`
    },
    {
      title: "Case study: antenna azimuth position control",
      example: "1-08",
      sec: "1.4",
      body: `
The running example for the whole book. It reappears as a case study in nearly every
chapter and is reproduced on the inside front cover.

| Block | Hardware | Function |
|---|---|---|
| Input transducer | Potentiometer | Converts commanded angular displacement to a voltage. |
| Summing junction | - | Subtracts feedback voltage from input voltage, producing the actuating signal. |
| Controller | Differential + power amplifier | Amplifies the actuating signal enough to drive the motor. |
| Plant / process | Motor, load, gears | Produces the output angular displacement (azimuth angle). |
| Sensor (output transducer) | Potentiometer | Converts output angle back to a voltage for comparison. |

### How it behaves

The system drives the error toward zero. When input and output angles match, the
actuating signal is zero and the motor stops. The larger the mismatch, the larger the
motor voltage and the faster it turns.

- **Raising the gain** drives the motor harder for a given error. Faster to the
  commanded position, but added momentum can cause overshoot and be pulled back - a
  transient of damped oscillation.
- **Steady-state error** typically decreases as gain increases.
- **So gain alone forces a trade-off**: the gain giving acceptable steady-state accuracy
  may give an unacceptable transient, or vice versa.
- **A compensator breaks the trade-off.** Replacing pure gain with a controller that has
  its own dynamics (a filter) lets you meet both specifications independently, at the
  price of a more complex controller.
`
    },
    {
      title: "1.5: The design process and the map of the book",
      example: "1-10",
      sec: "1.5",
      body: `
| Step | What you do | Chapters |
|---|---|---|
| 1 | Turn requirements into a physical system and a set of specifications. | Ch. 1 |
| 2 | Draw a functional block diagram. | Ch. 1 |
| 3 | Create a schematic, making explicit simplifying assumptions. | Ch. 1 |
| 4 | Develop a mathematical model: differential equation, transfer function, or state space. | Ch. 2, 3 (digital: 13) |
| 5 | Reduce the block diagram to a single block or closed-loop system. | Ch. 5 (digital: 13) |
| 6 | Analyze, design, and test against the specifications. | Ch. 4, 6–12 (digital: 13) |

The process is iterative. If testing shows the requirements are unmet, you redesign and
retest; if the requirements are mutually contradictory, they get respecified.

### Assumptions in the antenna schematic (Step 3)

- Potentiometer friction and inertia neglected: output voltage changes instantaneously
  with shaft angle.
- Amplifier dynamics neglected as fast compared with the motor - modeled as pure gain $K$.
- Armature inductance neglected for the dc motor; only armature resistance drawn.
- Load modeled as inertia plus viscous damping.

The discipline: start simple, check the assumptions by analysis and simulation, and add
back any neglected phenomenon the simple model fails to explain. A schematic too
detailed to model is a schematic that has failed.

### Physical laws used in Step 4

- **Kirchhoff's voltage law**: voltages around a closed path sum to zero.
- **Kirchhoff's current law**: currents leaving a node sum to zero.
- **Newton's laws**: forces on a body sum to zero; moments on a body sum to zero.

These produce the linear, time-invariant differential equation relating output $c(t)$
to input $r(t)$:

$$a_n\\frac{d^{n}c}{dt^{n}}+\\cdots+a_0c(t)=b_m\\frac{d^{m}r}{dt^{m}}+\\cdots+b_0r(t)$$
`
    },
    {
      title: "Standard test inputs: memorize this",
      example: "1-11",
      sec: "1.5",
      body: `
| Input | Function | Defining property | Used to evaluate |
|---|---|---|---|
| Impulse | $\\delta(t)$ | Infinite at $t=0$, zero elsewhere; unit area. | Transient response; modeling |
| Step | $u(t)$ | 1 for $t>0$, 0 for $t<0$. A constant command. | Transient response; steady-state error |
| Ramp | $t\\,u(t)$ | Linearly increasing command. | Steady-state error |
| Parabola | $\\tfrac12 t^2u(t)$ | Quadratically increasing command. | Steady-state error |
| Sinusoid | $\\sin\\omega t$ | Steady oscillation at a chosen frequency. | Transient response; modeling; steady-state error |

**Why the step is the workhorse:** both the transient and steady-state portions of the
response are plainly visible on one plot.

**Why the impulse is used for modeling:** it deposits energy and then leaves, so what
you observe afterward is the system's own behavior.

The command type normally matches the output type - a step into a position system means
a commanded position; a step into a velocity system means a commanded speed.
`
    },
    {
      title: "1.2: History, the part that is useful",
      example: "1-18",
      sec: "1.2",
      body: `
Most of Section 1.2 is color. What is worth retaining is that a handful of names map
directly onto techniques you are about to learn.

| Name | Contribution | Where it returns |
|---|---|---|
| Ktesibios (~300 B.C.) | Water clock with a float valve holding a tank at constant level. | Context only |
| James Watt (18th c.) | Flyball governor for steam-engine speed. | Context only |
| Maxwell (1868) / Routh (1874, 1877) | Stability criteria from differential-equation coefficients. | Routh–Hurwitz, Ch. 6 |
| Lyapunov (1892) | Extended stability theory to nonlinear systems. | Nonlinear stability |
| Minorsky (1920s) | Theory for automatic ship steering. | PID control, Ch. 9 and 11 |
| Nyquist and Bode (late 1920s–30s, Bell Labs) | Feedback amplifier analysis. | Frequency response, Ch. 10 and 11 |
| Evans (1948) | Graphical plot of characteristic-equation roots as a parameter varies. | Root locus, Ch. 8, 9, 13 |
`
    }
  ],

  formulas: [
    { latex: "\\text{total response} = \\text{natural} + \\text{forced}",
      note: "Natural response is the homogeneous solution. Forced response is the particular solution." },
    { latex: "a_n\\dfrac{d^{n}c}{dt^{n}}+\\cdots+a_0c = b_m\\dfrac{d^{m}r}{dt^{m}}+\\cdots+b_0r",
      note: "LTI input-output equation. Chapter 2 writes this as $G(s)=C(s)/R(s)$ at zero initial conditions." },
    { latex: "\\delta(t),\\; u(t),\\; t\\,u(t),\\; \\tfrac12 t^{2}u(t),\\; \\sin\\omega t",
      note: "Impulse, step, ramp, parabola, sinusoid." },
    { latex: "\\text{stable}\\iff\\text{natural response}\\to 0\\text{ or stays bounded}",
      note: "If the natural response grows, transient and steady-state error are not usable specs." }
  ],

  problems: [
    {
      id: "1-01",
      difficulty: "warmup",
      topic: "Definitions",
      sec: "1.1",
      prompt: "Define a control system in one sentence, without using the word \"feedback.\"",
      answer: "A control system is an assembly of subsystems and processes arranged to produce a desired output with desired performance, given a specified input.",
      solution: `
The definition deliberately excludes feedback because **feedback is not part of the
definition of a control system**: open-loop systems are control systems too.

Key elements the sentence must contain:

1. It is made of **subsystems and processes** (the plant).
2. It produces a **desired output**.
3. It does so with **desired performance**, not just any output.
4. It responds to a **specified input**.

A weaker definition is "a system that uses feedback to control something." That
describes only closed-loop systems and misses half the category.
`
    },
    {
      id: "1-02",
      difficulty: "warmup",
      topic: "Definitions",
      sec: "1.1",
      prompt: "List the four reasons control systems are built.",
      answer: "Power amplification, remote control, convenience of input form, and compensation for disturbances.",
      solution: `
**1. Power amplification (power gain).** A low-power input commands a high-power output.
A radar antenna positioned by turning a small knob requires a large amount of power at
the output.

**2. Remote control.** Operating in inaccessible or hazardous environments - a robot arm
handling material in a radioactive area, for example.

**3. Convenience of input form.** The input and output need not be the same physical
quantity. In a temperature control system the input is a *position* on a thermostat and
the output is *heat*.

**4. Compensation for disturbances.** The system must yield the correct output despite
wind, load changes, noise, or internal drift. The input will not change to make the
correction, so the system itself must detect the disturbance and correct for it.
`
    },
    {
      id: "1-03",
      difficulty: "warmup",
      topic: "Open vs closed loop",
      sec: "1.3",
      prompt: "State the single property that distinguishes a closed-loop system from an open-loop system.",
      answer: "Measurement and correction: a closed-loop system measures its output, feeds that measurement back, compares it to the input, and drives the plant to correct any difference. An open-loop system does neither.",
      solution: `
The property is **measurement and correction**, taken together. Both halves matter:

- **Measurement** requires an output transducer (sensor) that converts the output into
  the form the controller uses.
- **Correction** requires a feedback path and a summing junction where the measured
  output is subtracted from the input, producing an actuating signal that drives the
  plant.

**Weaker answers:**

- "It has a loop." A block diagram can be drawn with lines going anywhere; topology on
  paper is not the definition.
- "It is more accurate." That is a *consequence* of measurement and correction, not the
  distinguishing property.
- "It has a controller." Open-loop systems have controllers too.
`
    },
    {
      id: "1-04",
      difficulty: "core",
      topic: "Open vs closed loop",
      sec: "1.3",
      prompt: "Under what specific condition is the actuating signal equal to the error?",
      hint: "Think about what the transducers do to the signals before they reach the summing junction.",
      answer: "When both the input transducer and the output transducer have unity gain, so that the actuating signal equals the true input-minus-output difference.",
      solution: `
The summing junction subtracts the feedback signal from the input signal. Both of those
signals have already passed through transducers.

- The **input transducer** converts the input (say, an angle) into the controller's
  working form (say, a voltage), applying some gain.
- The **output transducer** converts the output back into that same form, applying its
  own gain.

If either gain differs from 1, the quantity leaving the summing junction is a scaled
difference, not the actual difference between input and output. In that general case it
is called the **actuating signal**.

Only when both transducers amplify their input by exactly 1 does the actuating signal's
value equal the actual input-minus-output difference: and only then is it properly
called the **error**.

This distinction becomes load-bearing in Chapter 7, where steady-state error for
nonunity-feedback systems requires separate treatment.
`
    },
    {
      id: "1-05",
      difficulty: "warmup",
      topic: "Design objectives",
      sec: "1.4",
      prompt: "Name the three analysis and design objectives, and identify which one makes the other two meaningless if it fails.",
      answer: "Transient response, steady-state error, and stability. Stability is the one that makes the others meaningless - discussion of transient response and steady-state error is moot if the system is unstable.",
      solution: `
**Transient response**: the behavior while the output is still moving toward its final
value. Matters for comfort, for time, and for mechanical survival: too fast a transient
can cause permanent physical damage.

**Steady-state error**: the residual difference between commanded and actual output
after transients decay. An elevator that stops six inches below the floor, or a disk
head that settles off-track, has a steady-state error problem.

**Stability**: the natural response must decay to zero or oscillate boundedly. If it
grows without bound, it eventually swamps the forced response and the system is no
longer controlled.

Stability is the one that voids the others. If the natural response grows without limit
there *is* no steady-state response to measure an error against, and the "transient"
never ends. You design for stability first, then shape the transient, then reduce the
error.
`
    },
    {
      id: "1-06",
      difficulty: "core",
      topic: "Stability",
      sec: "1.4",
      prompt: "Total response decomposes into which two components? Which one has a form independent of the input, and why does that matter?",
      answer: "Total response = natural response + forced response. The natural response has a form that depends only on the system, not on the input - which is why stability is a property of the system alone.",
      solution: `
$$\\text{Total response} = \\text{Natural response} + \\text{Forced response}$$

In differential-equations language these are the **homogeneous** and **particular**
solutions respectively.

**Natural response.** Describes how the system dissipates or acquires energy. Its form
depends *only on the system*: on the coefficients of the differential equation, not on
what you drive it with.

**Forced response.** Its form depends on the input. Drive with a step and you get a
constant term; drive with a ramp and you get a ramp term.

**Why the independence matters.** Stability is defined by the behavior of the natural
response. Since the natural response's form does not depend on the input, **stability is
a property of the system itself**, not of a particular test. An unstable system is
unstable no matter what you feed it. That is what makes it possible in Chapter 6 to
determine stability by examining the characteristic polynomial alone, with no reference
to any input signal.
`
    },
    {
      id: "1-07",
      difficulty: "challenge",
      topic: "Stability",
      sec: "1.4",
      prompt: "Explain why the transient/steady-state distinction is not the same as the natural/forced distinction.",
      hint: "One pair is what you see on a plot; the other pair is what the mathematics is made of.",
      answer: "Transient and steady-state are the two visible regions of the plotted response. Natural and forced are the underlying mathematical components, and both are present in both visible regions. The transient region is where the natural response is large; the steady-state region is where it has become small.",
      solution: `
These two partitions are easy to collapse and they are not the same.

**Transient and steady-state** are descriptions of *what you observe on a time plot*.
Early on the curve is moving; that region is called the transient. Later it has settled;
that region is called steady state. The boundary is a matter of degree, not a sharp
mathematical line.

**Natural and forced** are the two *mathematical terms* whose sum produces the curve.

The key fact: **both terms are present everywhere on the plot.**

- The transient portion is the sum of natural and forced responses, in the region where
  the natural response is large.
- The steady-state portion is *also* the sum of natural and forced responses, in the
  region where the natural response has become small.

**Consequence.** If you plotted the natural response by itself, you would *not* get a
curve matching the transient portion of the total response. They are different objects.
Saying "the transient response is the natural response" is wrong, even though the two
are closely related in many systems.
`
    },
    {
      id: "1-08",
      difficulty: "core",
      topic: "Case study",
      sec: "1.4",
      prompt: "In the antenna azimuth position control system, what happens to the transient response and to the steady-state error when the amplifier gain is increased? Explain the physical mechanism for each.",
      answer: "Increasing gain makes the transient faster and more likely to overshoot and oscillate; steady-state error typically decreases.",
      solution: `
**Transient response: faster, and more oscillatory.**

For any given actuating signal, higher gain means a larger voltage applied to the motor,
so the motor is driven harder and turns faster toward its commanded position. Two
consequences follow:

1. The output reaches the vicinity of the final value sooner.
2. Because of the increased speed, the increased momentum can carry the load *past* the
   commanded position. The system then senses a negative error and drives back. The
   result is a transient of **damped oscillation** about the steady-state value.

Note the motor still stops when the actuating signal reaches zero - the *final* position
is unchanged. What changes is how the system gets there.

**Steady-state error: typically smaller.**

Steady-state error generally decreases as gain increases and increases as gain
decreases. Intuitively, a higher-gain system produces a usable driving voltage from a
smaller residual mismatch, so the mismatch that survives at rest is smaller.

**The trade-off this creates.**

The gain that gives acceptable steady-state accuracy may give an unacceptable transient
(too much overshoot), and the gain that gives a well-damped transient may leave too much
steady-state error. Gain adjustment alone cannot always satisfy both.
`
    },
    {
      id: "1-09",
      difficulty: "core",
      topic: "Case study",
      sec: "1.4",
      prompt: "What does a compensator buy you that a simple gain adjustment does not?",
      answer: "A compensator has its own dynamics, so it lets you meet the transient response and steady-state accuracy specifications independently instead of trading one against the other.",
      solution: `
**The limitation of gain.** A pure gain multiplies the actuating signal by a constant.
It has one adjustable parameter, and that one parameter must simultaneously set the
transient behavior and the steady-state accuracy. When the two specifications pull in
opposite directions, one knob cannot satisfy both.

**What a compensator adds.** A compensator is a controller with a *dynamic* response -
in the simplest hardware realization, an electrical filter placed in series with the
amplifier. Because it has its own poles and zeros, it introduces additional design
freedom. You can shape the loop's behavior differently at different frequencies, which
means the transient specification and the steady-state specification can be addressed
with separate parts of the design.

**The cost.** The controller is now more complex and more expensive than an amplifier.

**Where this goes.** Chapters 9 (design via root locus) and 11 (design via frequency
response) are the systematic versions of this idea. Section 9.6 - which your course is
skipping: covers how to physically realize a lead or lag compensator with op-amps.

Dynamic elements can also be placed in the feedback path along with the output
transducer to improve performance.
`
    },
    {
      id: "1-10",
      difficulty: "warmup",
      topic: "Design process",
      sec: "1.5",
      prompt: "List the six steps of the control system design process in order, and name the chapter where the mathematical model is built.",
      answer: "1. Requirements to physical system and specifications. 2. Functional block diagram. 3. Schematic. 4. Mathematical model. 5. Reduce the block diagram. 6. Analyze, design, and test. The mathematical model is built in Chapters 2 and 3 (Chapter 13 for digital systems).",
      solution: `
| Step | What you do | Chapters |
|---|---|---|
| 1 | Determine a physical system and specifications from the requirements | Ch. 1 |
| 2 | Draw a functional block diagram | Ch. 1 |
| 3 | Transform the physical system into a schematic | Ch. 1 |
| 4 | Use the schematic to obtain a block diagram, signal-flow diagram, or state-space representation | Ch. 2, 3 (digital: 13) |
| 5 | If multiple blocks, reduce to a single block or closed-loop system | Ch. 5 (digital: 13) |
| 6 | Analyze, design, and test to see that requirements and specifications are met | Ch. 4, 6–12 (digital: 13) |

**Not a one-way pipeline.** Feedback and communication occur during each phase. If Step 6
shows requirements are unmet, the system is redesigned and retested. If the requirements
turn out to be mutually contradictory, they must be respecified and the process repeats.
`
    },
    {
      id: "1-11",
      difficulty: "warmup",
      topic: "Test inputs",
      sec: "1.5",
      prompt: "Name the five standard test inputs and state which of them are used to evaluate steady-state error.",
      answer: "Impulse, step, ramp, parabola, and sinusoid. Step, ramp, parabola, and sinusoid are used for steady-state error; the impulse is not.",
      solution: `
| Input | Function | Used to evaluate |
|---|---|---|
| Impulse | $\\delta(t)$ | Transient response; modeling |
| Step | $u(t)$ | Transient response; **steady-state error** |
| Ramp | $t\\,u(t)$ | **Steady-state error** |
| Parabola | $\\tfrac12 t^2 u(t)$ | **Steady-state error** |
| Sinusoid | $\\sin\\omega t$ | Transient response; modeling; **steady-state error** |

**Why the impulse is excluded.** An impulse is infinite at $t=0$ and zero everywhere
else, with unit area. It deposits energy into the system and then departs. After
$t=0^{+}$ there is no input at all, so there is no commanded value for the output to
fail to match: there is nothing for a steady-state error to be measured against. What
remains is purely the system's own behavior, which is exactly why the impulse is the
right tool for **modeling** and for observing the transient.

**Where this returns.** Chapter 7 uses step, ramp, and parabola to define *system type*
and the associated static error constants.
`
    },
    {
      id: "1-12",
      difficulty: "core",
      topic: "Test inputs",
      sec: "1.5",
      prompt: "Why is the step input the most commonly used test signal, and what does \"the step input command is of the same form as the output\" mean in practice?",
      answer: "Because both the transient and steady-state portions of the response are clearly visible on a single plot. The step commands whatever quantity the system outputs: a step into a position system is a commanded position; a step into a velocity system is a commanded speed.",
      solution: `
**Why the step dominates.** A step is a constant command applied abruptly. The response
must move from its initial value to a new final value, so the plot shows:

- the **transient**: the entire journey between the two levels, including any overshoot
  or oscillation, and
- the **steady-state**: the settled level, from which the steady-state error is read
  directly against the known commanded level.

No other single test signal shows both so plainly. Impulse response shows the transient
but has no steady-state target; ramp and parabola show steady-state error clearly but
the ever-increasing command makes the transient harder to read.

**"Same form as the output."** The step commands a constant value *of the output
quantity*, whatever that quantity happens to be:

- Antenna azimuth system: output is position, so a step input is a **commanded angular
  position**, and the output is the actual position.
- Video disc spindle: output is velocity, so a step input is a **commanded constant
  speed**, and the output is the actual speed.

The step is not "a step of voltage" in some abstract sense - it is a step in whatever
physical variable the loop regulates.
`
    },
    {
      id: "1-13",
      difficulty: "core",
      topic: "Design process",
      sec: "1.5",
      prompt: "Name the four simplifying assumptions made when drawing the schematic for the antenna azimuth position control system, and state what each one buys you.",
      hint: "They concern the potentiometers, the amplifiers, the motor's electrical circuit, and the load.",
      answer: "Potentiometer friction and inertia neglected; amplifier dynamics neglected so amplifiers are modeled as pure gain K; armature inductance neglected; load modeled as inertia plus viscous damping.",
      solution: `
**1. Potentiometer friction and inertia are neglected.** These mechanical characteristics
would give the output voltage a dynamic rather than an instantaneous response. Assuming
them negligible means the voltage across a potentiometer changes *instantaneously* as
the shaft turns: the potentiometer contributes a pure constant to the model instead of
its own differential equation.

**2. Amplifier dynamics are assumed fast compared with the motor.** This lets the
differential and power amplifiers be modeled as a single **pure gain $K$**, removing
their poles from the model entirely.

**3. Armature inductance is neglected for the dc motor.** Only armature resistance is
drawn. This drops the motor's electrical model from second order to first order, which
in turn keeps the overall system order manageable.

**4. The load is modeled as inertia plus viscous damping.** The real load is a rotating
mass with bearing friction; the model is a rotational inertia plus a damping term whose
resistive torque increases with speed, like a shock absorber.

**The general discipline.** Each assumption trades fidelity for a model you can actually
reason about. The engineer starts with the simple schematic and then checks the
assumptions through analysis and simulation. If the simple model fails to explain
observed behavior, previously neglected phenomena get added back. A schematic too
detailed to yield a useful mathematical model has failed at its job.
`
    },
    {
      id: "1-14",
      difficulty: "warmup",
      topic: "Design process",
      sec: "1.5",
      prompt: "Which three physical laws are used in Step 4 to produce the mathematical model?",
      answer: "Kirchhoff's voltage law, Kirchhoff's current law, and Newton's laws.",
      solution: `
**Kirchhoff's voltage law.** The sum of voltages around a closed path equals zero.

**Kirchhoff's current law.** The sum of electric currents flowing from a node equals zero.

**Newton's laws.** The sum of forces on a body equals zero; the sum of moments on a body
equals zero.

**A notational detail ** Newton's second law is normally written
$\\sum F = Ma$. Nise moves the $Ma$ term to the left-hand side (D'Alembert's principle)
to get $\\sum F = 0$. The reason is consistency: it makes the mechanical statement
structurally identical to Kirchhoff's ($\\sum \\text{voltages} = 0$), which is what
allows the force–voltage analogy in Chapter 2 to work cleanly.

These laws produce the linear, time-invariant differential equation

$$a_n\\frac{d^{n}c}{dt^{n}}+\\cdots+a_0c(t)=b_m\\frac{d^{m}r}{dt^{m}}+\\cdots+b_0r(t)$$

which becomes the transfer function in Chapter 2.
`
    },
    {
      id: "1-15",
      difficulty: "core",
      topic: "Modeling",
      sec: "1.5",
      prompt: "Name the three ways of mathematically modeling a system introduced in Chapter 1, and give one advantage of each over the others.",
      answer: "The differential equation (ground truth), the transfer function (fast parameter-to-response insight and easy block-diagram interconnection), and the state-space representation (handles systems not describable by linear differential equations, and is natural for digital simulation).",
      solution: `
**1. The linear, time-invariant differential equation.** This is the direct product of
Kirchhoff's and Newton's laws. It is the ground truth of the model, but it tangles the
input, the system, and the output into a single expression, and it is slow to reason
with when you want to know how a parameter change affects the response.

**2. The transfer function.** Derived from the differential equation using the Laplace
transform. Advantages:

- It **separates** the input, the system, and the output into three distinct objects.
- It yields more intuitive information: you can change a parameter and rapidly sense the
  effect on the response.
- It makes **interconnection of subsystems** algebraic, which is what makes block-diagram
  reduction possible in Chapter 5.

Its limitation: it applies to linear systems only.

**3. The state-space representation.** Turns one $n$th-order differential equation into
$n$ simultaneous first-order equations. Advantages:

- It can be used for systems that **cannot be described by linear differential
  equations**.
- It is the natural form for **simulation on a digital computer**.

Your course covers the transfer function in Chapter 2 and defers state space (Chapter 3)
to the end of the semester, paired with Chapter 12.
`
    },
    {
      id: "1-16",
      difficulty: "core",
      topic: "Open vs closed loop",
      sec: "1.3",
      prompt: "A toaster is described in the text as an open-loop system. Identify its controlled variable, and explain precisely which two things it fails to do that make it open loop.",
      answer: "The controlled variable is the color of the toast. It fails to measure the color, and it fails to correct for variations such as bread type or thickness.",
      solution: `
**Controlled variable:** the color of the toast.

**The design assumption:** the toast will be darker the longer it is subjected to heat.
The device therefore controls *time*, not color, and hopes the relationship holds.

**Failure 1: no measurement.** The toaster never senses the color of the toast. There is
no output transducer anywhere in the system.

**Failure 2: no correction.** Because there is no measurement, there is nothing to
compare against the input and nothing to drive a correction. It cannot correct for the
fact that the bread is rye rather than white rather than sourdough, nor for the fact
that slices come in different thicknesses. Each of these is a **disturbance** that
changes the relationship between heating time and final color.

**The closed-loop version.** A toaster oven that measures color through light
reflectivity and measures humidity inside the chamber has both measurement and
correction: and is correspondingly more complex and more expensive. That cost
difference is the trade-off Chapter 1 asks you to recognize.
`
    },
    {
      id: "1-17",
      difficulty: "core",
      topic: "Open vs closed loop",
      sec: "1.3",
      prompt: "Give the two places a disturbance can enter an open-loop system, and explain why neither can be corrected.",
      answer: "A disturbance can add to the controller's driving signal (before the plant) or add at the plant's output. Neither can be corrected because the system has no way to detect either one - the input will not change to compensate.",
      solution: `
**Disturbance 1: added to the controller's output, before the plant.** If the controller
is an electronic amplifier and the disturbance is noise, that additive noise appears at
the summing junction feeding the process. The plant is then driven by the sum of the
intended command and the noise, so the output is corrupted.

**Disturbance 2: added at the plant's output.** Something acts directly on the
controlled variable after the plant has produced it. Wind pushing an antenna off its
commanded bearing is the standard example.

**Why neither can be corrected.** Correction requires knowing that something went wrong.
An open-loop system has no sensor on the output, so it has no information about the
actual value of the controlled variable. Its input will not change to make the
correction, because the input is a command, not a measurement of reality.

For the correction to happen, the system must **measure the amount the disturbance has
displaced the output** and then drive the plant back to the commanded value. That is
precisely what the feedback path in a closed-loop system provides.
`
    },
    {
      id: "1-18",
      difficulty: "warmup",
      topic: "History",
      sec: "1.2",
      prompt: "Which historical contribution maps onto each of these chapters: Chapter 6 (stability), Chapters 9 and 11 (PID), Chapters 10 and 11 (frequency response), Chapters 8 and 9 (root locus)?",
      answer: "Chapter 6: Routh (with Maxwell), giving the Routh-Hurwitz criterion. Chapters 9 and 11: Minorsky, whose ship-steering theory led to PID. Chapters 10 and 11: Nyquist and Bode at Bell Labs. Chapters 8 and 9: Evans, who developed the root locus in 1948.",
      solution: `
**Chapter 6: Routh–Hurwitz.** Maxwell published a stability criterion for a third-order
system in 1868 based on the coefficients of the differential equation. Routh extended it
to fifth-order systems in 1874 and won the 1877 Adams Prize with the paper containing
what is now the Routh–Hurwitz criterion. Lyapunov extended stability theory to nonlinear
systems in his 1892 thesis.

**Chapters 9 and 11: PID.** Nicholas Minorsky's theoretical development applied to the
automatic steering of ships led to what is now called
proportional-plus-integral-plus-derivative, or three-mode, control.

**Chapters 10 and 11: frequency response.** H. Nyquist and H. W. Bode developed the
analysis of feedback amplifiers at Bell Telephone Laboratories in the late 1920s and
early 1930s. Those contributions evolved into the sinusoidal frequency analysis and
design techniques used today.

**Chapters 8 and 9: root locus.** Walter R. Evans, working in the aircraft industry in
1948, developed a graphical technique to plot the roots of the characteristic equation
of a feedback system as a parameter varies over a range.

Learning this mapping is not trivia: it tells you what the second half of the course is
organized around.
`
    },
    {
      id: "1-19",
      difficulty: "challenge",
      topic: "Design objectives",
      sec: "1.4",
      prompt: "What is meant by a \"robust design,\" and why is designing for robustness harder than it sounds?",
      answer: "A robust design is one whose performance is not sensitive to changes in system parameters. It is hard because real parameters drift over time and the relationship between parameter change and performance change is nonlinear.",
      solution: `
**The problem.** System parameters treated as constant during the design for transient
response, steady-state error, and stability do not stay constant once the system is
built. They change over time with age, temperature, pressure, and load. The performance
therefore changes over time and stops matching the design.

**Why it is not straightforward.** The relationship between parameter changes and their
effect on performance is **not linear**. In the same system, changes in parameter values
can lead to small or large changes in performance depending on:

- the system's nominal operating point, and
- the type of design used.

So you cannot simply budget a percentage of parameter tolerance and expect a
proportional performance tolerance.

**The goal.** Create a design such that the system is not sensitive to parameter
changes over the expected range of environmental variation.

**Where it is formalized.** A **sensitivity analysis** yields the percentage change in a
specification as a function of a change in a system parameter. Nise develops this in
Chapters 7 and 8, and it is the tool used to test a design for robustness.
`
    },
    {
      id: "1-20",
      difficulty: "challenge",
      topic: "Analysis and design",
      sec: "1.5",
      prompt: "Distinguish analysis from design, and explain what the engineer does in Step 6 when the specifications are not met by parameter adjustment alone.",
      answer: "Analysis determines the performance of an existing system; design creates or modifies a system to obtain specified performance. If the specifications cannot be met by adjusting system parameters, the designer adds hardware to effect the desired performance.",
      solution: `
**Analysis** is the process by which a system's performance is determined. You evaluate
its existing transient response and steady-state error to see whether they meet a set of
specifications. The system already exists; you are measuring it.

**Design** is the process by which a system's performance is created or changed. If the
transient response and steady-state error are found not to meet the specifications, you
change parameters or add components to make them do so.

**Step 6 in practice.** The engineer first analyzes the system to see whether the
response specifications and performance requirements can be met by **simple adjustment
of system parameters**: most often a gain. This is the cheap path and is tried first.

If the specifications **cannot** be met that way, the designer then **designs additional
hardware** to effect the desired performance. That additional hardware is the
compensator discussed in the case study, and Chapters 9 and 11 are devoted to designing
it systematically.

**Testing.** Standard test inputs: impulse, step, ramp, parabola, sinusoid: are used
both analytically and during physical testing to verify the design. Complicated input
signals are neither practical nor illuminating for this purpose.
`
    },
    {
      id: "1-21",
      difficulty: "core",
      topic: "Case study",
      sec: "1.4",
      prompt: "Trace the signal path through the antenna azimuth position control system, naming the function of each block and the hardware that performs it.",
      answer: "Angular input → potentiometer (input transducer, angle to voltage) → summing junction (subtracts feedback, produces actuating signal) → differential and power amplifiers (controller) → motor, load, and gears (plant) → angular output, with a potentiometer (sensor/output transducer) feeding the output angle back as a voltage.",
      solution: `
| Block | Hardware | Function |
|---|---|---|
| Input transducer | Potentiometer | Converts the commanded angular displacement into a voltage proportional to the input. |
| Summing junction | - | Subtracts the feedback voltage from the input voltage, producing the actuating signal. |
| Controller | Differential amplifier + power amplifier | Boosts the difference between input and output voltages to a level able to drive the motor. |
| Plant / process | Motor, load, and gears | Produces the output angular displacement - the azimuth angle. |
| Sensor (output transducer) | Potentiometer | Converts the output angular displacement back into a voltage for comparison. |

**Operating principle.** The system normally operates to drive the error to zero. When
the input and output match, the error is zero and the motor does not turn. The motor is
driven **only** when output and input do not match. The greater the difference, the
larger the motor input voltage and the faster the motor turns.

**Why it is useful later.** This system reappears as the case study in Chapters
2, 3, 4, 5, 6, 7, 8, 9, 10, 11, and 13. Since your course skips Sections 2.6–2.8, you
will be handed its plant transfer function without deriving it - knowing the block
structure is what keeps that from being confusing.
`
    },
    {
      id: "1-22",
      difficulty: "core",
      topic: "Open vs closed loop",
      sec: "1.3",
      prompt: "Nise offers a study-time analogy for an open-loop system. Reconstruct it, and then describe what the closed-loop version would look like.",
      answer: "You calculate the study time needed to get an A on an exam covering three chapters. If the professor adds a fourth chapter - a disturbance: and you do not detect it and add study time, you have behaved as an open-loop system and get a lower grade than expected. The closed-loop version detects the change and adjusts study time accordingly.",
      solution: `
**The open-loop version.** You compute, in advance, the number of hours needed to earn an
A on an exam covering three chapters. You then execute that plan. The professor adds a
fourth chapter. That addition is a **disturbance**. If you do not detect it and do not
add study time to your previously calculated amount, you are behaving as an open-loop
system: commanded purely by your original input, blind to the change. The result is a
lower grade than you expected.

**The closed-loop version.** You would need both properties:

- **Measurement**: some sensor on the output. Practice problems, an old exam, or a
  self-test that tells you how well you actually know the material right now.
- **Correction**: comparing that measurement against the target (an A) and adjusting
  the driving signal (study hours) in proportion to the gap.

**The point of the analogy.** It shows that "open loop" is not about simplicity or
low quality. The open-loop student may have done a careful, correct calculation. The
failure is structural: without measurement there is no information about the actual
output, so no disturbance can ever be corrected.
`
    },
    {
      id: "1-23",
      difficulty: "warmup",
      topic: "Design objectives",
      sec: "1.4",
      prompt: "Give two reasons transient response matters, one relating to human factors and one relating to hardware.",
      answer: "Human factors: a response that is too slow makes people impatient, and one that is too fast or oscillatory is uncomfortable or disconcerting. Hardware: too fast a transient response can cause permanent physical damage.",
      solution: `
**Human factors.** The elevator is the usual example. If the response is too slow the
passengers become impatient; if excessively rapid, passenger comfort is sacrificed. If
the elevator oscillates about the arrival floor for more than about a second, the result
is disconcerting.

**Hardware and structural.** Transient response matters for structural reasons: too fast
a transient response could cause permanent physical damage to the system. An
overaggressive design that slams a load into position can break bearings, strip gears,
or fatigue a structure.

**A third reason ** Transient response is often the direct determinant of
system throughput. In a computer hard disk drive, reading and writing cannot take place
until the read/write head stops moving, so the speed with which the head settles from
one track to another directly influences the overall speed of the computer.
`
    },
    {
      id: "1-24",
      difficulty: "challenge",
      topic: "Design objectives",
      sec: "1.4",
      prompt: "Beyond the three main objectives, name two other considerations also must be taken into account early in a design, and explain why \"early\" matters for each.",
      answer: "Hardware selection (motor sizing for power, sensor choice for accuracy) and finances (budget allocations, competitive pricing). Both constrain what designs are achievable, so discovering them late means redesigning.",
      solution: `
**Hardware selection.** Factors such as motor sizing to fulfill power requirements and
the choice of sensors for accuracy must be considered early in the design. Why early:
these decisions set the plant's parameters. If you complete a control design and only
then discover the motor cannot deliver the required torque, or that the available
sensor's resolution is coarser than your steady-state error specification, the control
design has to be redone against a different plant.

**Finances.** Control system designers cannot create designs without considering the
economic impact. Budget allocations and competitive pricing must guide the engineer.
Why early:

- If your product is **one of a kind**, you may be able to use more expensive components
  without appreciably increasing total cost.
- If your design will be used for **many copies**, slight increases in cost per copy
  translate into a great deal more money: money your company must propose during
  contract bidding and outlay before sales.

That distinction changes which components are admissible, and therefore which designs
are reachable. Learning it after the design is fixed means starting over.
`
    },
    {
      id: "1-25",
      difficulty: "challenge",
      topic: "Synthesis",
      sec: "1.3",
      prompt: `A home heating system uses a thermostat containing a bimetallic strip that expands
and contracts with temperature, moving a mercury switch that turns the heater on or off.
Classify it as open or closed loop and justify the classification. Then identify its
input, output, controlled variable, and the disturbance it is designed to reject.`,
      hint: "Ask whether measurement and correction are both present, and be careful about what the input physically is.",
      answer: "Closed loop. The bimetallic strip measures the room temperature (output) and the switch corrects by turning the heater on or off. Input: the temperature setting on the thermostat, which is a position. Output and controlled variable: room temperature. Disturbance: heat loss to the outside environment.",
      solution: `
**Classification: closed loop.** Both required properties are present, even though there
is no obvious electronics.

- **Measurement.** The bimetallic material expands or contracts with changing
  temperature. That expansion *is* the sensor: the output transducer converting room
  temperature into mechanical displacement.
- **Correction.** That displacement moves a vial of mercury acting as a switch, turning
  the heater on or off. The system drives the plant in response to the measured output.

The amount of expansion or contraction required to move the mercury switch is determined
by the temperature setting, which is what makes the comparison against the input happen
mechanically.

**Input:** the temperature setting on the thermostat. Note this is physically a
**position**: the dial or slider location: not a temperature. This is a clean example
of **convenience of input form**: a convenient position input yields a desired thermal
output.

**Output and controlled variable:** the room temperature.

**Disturbance:** heat loss to the outside environment, which varies with outdoor
temperature, wind, and open doors. Without correction, a fixed heater run time would
give wildly different indoor temperatures on a mild day versus a cold one.

**** This system is closed loop but its controller is a simple on/off
switch, not a proportional amplifier. That makes it a *nonlinear* controller - the kind
of element Section 2.10 would classify alongside saturation and dead zone. It works
well enough because the thermal plant is slow, which is a real engineering lesson: the
sophistication of the controller should match the difficulty of the plant.
`
    },

    {
      id: "1-26", difficulty: "challenge", topic: "Open vs closed loop",
      sec: "1.3",
      prompt: `A washing-machine cycle runs a fixed sequence of fill, agitate, and spin times. A later model adds a turbidity sensor that extends the wash if the water is still dirty.

Is the first machine a control system? Is it open or closed loop? What changed in the second machine?`,
      hint: "A control system does not require feedback. Closed loop requires a measurement of the controlled variable.",
      answer: "Both are control systems. The first is open loop. The second closes a loop on dirtiness (turbidity), not on a clock.",
      expert: `
**First glance:** a timer is an input program, not a measurement of cleanliness.

**Discard:** "the first is not a control system because there is no sensor." Open-loop systems are control systems.

**Path:** name the controlled variable. If it is cleanliness and nobody measures it, the loop is open.
`,
      solution: `
A control system produces a specified output from a specified input with specified performance. The first machine does that: a cycle selection in, a wash out. No measurement of the clothes is taken, so the loop is **open**.

The second machine measures turbidity and changes the plant input. That is **closed loop**, and the sensed variable is cleanliness, not time.

A clock is not feedback unless the controlled variable *is* time.
`
    },
    {
      id: "1-27", difficulty: "challenge", topic: "Design objectives",
      sec: "1.4",
      prompt: `A plant's natural response to any initial condition grows like $e^{+2t}$. An engineer applies a bounded input and observes a bounded output for the first two seconds, then declares the system stable enough to discuss overshoot.

What is wrong, and which of the three design objectives is being ignored?`,
      hint: "Stability is a property of the natural response.",
      answer: "The natural response grows. The system is unstable. Transient specs and steady-state error are not defined as design objectives until the natural response dies or stays bounded.",
      expert: `
**First glance:** $e^{+2t}$ is the whole story. Two seconds of a bounded input cannot cancel an unstable mode.

**Discard:** "the forced response looked fine." Forced response is the wrong cut for stability.
`,
      solution: `
Stability is decided by the **natural** response. $e^{+2t}$ grows for every initial condition, so the system is unstable.

A short record of a particular forced response does not change that. Overshoot and steady-state error assume a transient that ends. If the homogeneous solution diverges, those two objectives have nothing to sit on.

The ignored objective is stability.
`
    },
    {
      id: "1-28", difficulty: "challenge", topic: "Definitions",
      sec: "1.4",
      prompt: `A stable first-order system is given a unit step. After five time constants the output is $0.99$ and still creeping toward $1$.

Which of the following are still present, and which have effectively ended: natural response, forced response, transient response, steady-state response?`,
      hint: "Natural vs forced is a partition of the *solution*. Transient vs steady-state is a partition of *time*.",
      answer: "Forced response is still there (the particular solution $1$). Natural response is almost gone. Transient is effectively over. Steady-state has begun; the remaining $0.01$ is leftover natural response, not a new regime.",
      expert: `
**First glance:** $0.99$ is not a fourth category. It is $1$ plus a dying exponential.

**Path:** write $c(t)=1-e^{-t/\\tau}$. The $1$ is forced and steady. The exponential is natural and transient.
`,
      solution: `
$$c(t)=1-e^{-t/\\tau}$$

- $1$ is the forced response. It exists for all $t>0$.
- $-e^{-t/\\tau}$ is the natural response. At $5\\tau$ it is $e^{-5}\\approx 0.007$, so it is still present and already negligible.
- Transient means "while the natural part is visible." After $5\\tau$ one usually calls the motion steady-state.
- Steady-state is the forced value $1$, not a new function that appears at $t=5\\tau$.

The two partitions cut different axes. Do not merge them.
`
    },
    {
      id: "1-29", difficulty: "challenge", topic: "Design process",
      sec: "1.5",
      prompt: `You are handed a motor, a load inertia, and a required $10\\%$ overshoot. A classmate starts by sketching a root locus.

Which design-process step has been skipped, and what specific object is missing before a locus means anything?`,
      hint: "You cannot move poles you have not modeled.",
      answer: "Modeling was skipped. There is no $G(s)$ yet. A root locus is a picture of how closed-loop poles move; it needs an open-loop model first.",
      expert: `
**First glance:** specs arrived before a transfer function. Drawing a locus of nothing is theater.

**Path:** design process is transform, model, reduce, analyze, design. They jumped to design.
`,
      solution: `
The required overshoot is a spec. The motor and inertia are hardware. Between those two sits a **model**: a differential equation or $G(s)$.

A root locus is a design tool for a loop $KG(s)H(s)$ that already exists on paper. Without $G(s)$, there are no branches to draw.

The skipped step is modeling (and, if several blocks are present, block-diagram reduction).
`
    },
    {
      id: "1-30", difficulty: "challenge", topic: "Open vs closed loop",
      sec: "1.3",
      prompt: `A loudspeaker is driven by an amplifier whose input is a recorded waveform. A microphone in the room feeds a signal back to the same amplifier, and the system howls.

Is this feedback? Is the howl evidence that feedback is always better than open loop? Name the sign of the loop.`,
      hint: "Howl is oscillation from a loop gain that is too large with the wrong phase, i.e. effectively positive at that frequency.",
      answer: "Yes, it is feedback. No, feedback is not automatically better. The howl is a closed-loop instability; around the howl frequency the loop is effectively regenerative (positive).",
      expert: `
**First glance:** a microphone into the same chain is a loop. The useful lesson is the sign and the gain, not the word "feedback."

**Discard:** "feedback failed so it was not really feedback." Unstable closed-loop systems are still closed loop.
`,
      solution: `
The microphone measures the output (air pressure) and adds it to the input. That is feedback.

Open-loop playback of the recording would not howl. The howl appears only after the loop is closed, so feedback here made the system worse: it became unstable.

At the howl frequency the phase around the loop is such that the returned signal *adds* to the input. That is the positive-feedback case of Chapter 5, $G/(1-GH)$, sitting on a pole in the right half-plane.

Feedback is a structure. Stability is a separate question.
`
    }

  ]
});