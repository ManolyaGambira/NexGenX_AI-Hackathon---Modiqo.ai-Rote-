# NexGenX_AI-Hackathon---Modiqo.ai-Rote-
# From Memory to Muscle Memory — Modiqo.ai Rote Hackathon

## Overview

This project was built for the Modiqo.ai Data & AI Hackathon challenge:

**From Memory to Muscle Memory**

The core idea is to turn successful agent workflows into reusable, deterministic **Plays**.

Instead of repeatedly exploring how to perform the same task, each successful workflow can be crystallized into a Play that captures the execution path and can then be replayed consistently.

This project contains three Plays covering software engineering intelligence, repository analysis, and public package risk intelligence.

---

## Our 3 Plays

### 1. Instruction Collision Map

**Purpose:**
Maps repository instruction sources so they can be reviewed systematically for overlapping or potentially conflicting guidance.

**Focus:** Agent Operations

**Public Play:**
https://play.modiqo.ai/manolyagambira/instruction-play@0.0.1

**Source:**
`plays/instruction-collision-map/main.ts`

---

### 2. Monorepo Test-Gap Cartography

**Purpose:**
Analyzes a monorepo's test coverage signals and identifies areas where implementation and testing may not be aligned.

**Focus:** Software / Cloud Operations

**Public Play:**
https://play.modiqo.ai/pvais/monorepo-test-gap-cartography@0.1.0

**Source:**
`plays/monorepo-test-gap-cartography/main.ts`

---

### 3. Package-Abandonment Early Signal

**Purpose:**
Uses public package and repository signals to identify early indicators of package abandonment or maintenance risk.

**Focus:** Public Intelligence

**Public Play:**
https://play.modiqo.ai/sruthi/package-abandonment-early-signal@0.1.0

**Source:**
`plays/package-abandonment-early-signal/main.ts`

---

## From Memory to Muscle Memory

The three Plays demonstrate the core hackathon concept:

1. **Explore** — identify a useful workflow.
2. **Execute** — successfully perform the workflow.
3. **Crystallize** — capture the successful execution as a reusable Play.
4. **Replay** — run the Play deterministically with new inputs.
5. **Share** — publish the Play through the Modiqo.ai Rote registry.

The result is a transition from one-off agent exploration to a repeatable operational capability.

---

## Play Comparison

| Play                             | Domain                      | Primary Goal                       |
| -------------------------------- | --------------------------- | ---------------------------------- |
| Instruction Collision Map        | Agent Operations            | Map repository instruction sources |
| Monorepo Test-Gap Cartography    | Software / Cloud Operations | Identify test gaps                 |
| Package-Abandonment Early Signal | Public Intelligence         | Detect package maintenance risk    |

---

## Repository Contents

```text
plays/
├── instruction-collision-map/
│   └── main.ts
├── monorepo-test-gap-cartography/
│   └── main.ts
└── package-abandonment-early-signal/
    └── main.ts

screenshots/
├── instruction-collision-map.png
├── monorepo-test-gap-cartography.png
└── package-abandonment-early-signal.png
```

---

## Technology

* Modiqo.ai Rote
* TypeScript
* GitHub / GitHub APIs
* Public package registry data
* Deterministic Play execution

---

## Public Play Links

* [Instruction Collision Map](https://play.modiqo.ai/manolyagambira/instruction-play@0.0.1)
* [Monorepo Test-Gap Cartography](https://play.modiqo.ai/pvais/monorepo-test-gap-cartography@0.1.0)
* [Package-Abandonment Early Signal](https://play.modiqo.ai/sruthi/package-abandonment-early-signal@0.1.0)

---

## Team

**NexGenX AI**

Built for the Modiqo.ai Data & AI Hackathon.
