## Thor Premium UI Rules (Non‑Negotiable)

This file exists to prevent repeated guidance and regressions.

### Premium reference standard
- **Reference**: Claude.ai (Anthropic) premium minimal marketing.
- **Goal**: Match Claude’s restraint, then outperform on clarity and polish (not decoration).
- **Screenshot-as-spec**: when a screenshot is provided, treat it as a **binding UI spec** (layout, hierarchy, spacing, interactions). Do not “approximate” with extra UI.

### Visual style (strict)
- **Minimal over decorative**: no “extra” cards, bubbles, badges, or noisy visuals unless they increase clarity.
- **Whitespace is a feature**: prefer fewer elements with more spacing.
- **Typography first**: hierarchy via size/weight/spacing, not gradients or effects.
- **Borders > shadows**: use subtle borders; avoid heavy shadows.
- **No glows**: no `drop-shadow`, `filter`, `text-shadow`, or glow-like effects on brand marks/icons.

### Interactions (Claude-like)
- **FAQ**:
  - Default state: show only questions.
  - On click: **toggle open** and reveal answer.
  - Use a **plus (+)** that rotates to an **x** when open.
  - Keep animation subtle (≈200ms) and deterministic.
- **Pricing**:
  - Must include **Monthly / Yearly** toggle.
  - Prices change instantly without layout jump.
  - CTA copy is **“Try Thor”** (no “Pick this plan”).
  - CTA placement: **directly under the price**, and all plan CTAs must align on the same baseline on wide screens.

### Components & layout
- **Avoid “card grids for everything”**: only use cards where they communicate grouping/value.
- **Section density**: never add UI for “completeness”; add it only if it improves conversion or comprehension.
- **No promo dressing**: avoid “sale” badges, “save X%” pills, featured rings, or pricing gimmicks unless explicitly requested.
- **Icons**:
  - Use icons sparingly and consistently.
  - Plan icons must be simple line marks, Thor/Norse relevant (e.g. Mjolnir, Yggdrasil), not random clipart.

### Copy rules (must follow)
- **No hardcoded visible strings in JSX**.
- All visible copy must live in structured `copy` objects.

### Change discipline
- Make **small, local, reversible** changes.
- Do not refactor or “improve” unrelated areas.
- Do not touch global CSS unless explicitly requested.

