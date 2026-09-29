# VTJ Designer UI Context

## Product and users

VTJ Designer is a dense desktop-first application builder for developers and
technical operators. Preserve the existing IDE layout, Element Plus behavior,
and `@vtj/ui` primitives; new workflows belong in existing panels and dialogs.

## Visual system

- Use existing CSS variables (`--el-*`) for color, border, text, and state.
- Default density is compact: 12–14 px supporting text, 8–16 px spacing.
- Prefer `Panel`, `Item`, `XDialog`, `XForm`, `XTabs`, and Element Plus inputs.
- Dialogs may maximize and must fit the viewport. Independent panes scroll;
  action rows stay visible.
- State is communicated with text plus color. Loading, empty, error, read-only,
  dirty, conflict, and success states are all explicit.

## Interaction rules

- Editing is local until the user chooses Save. Destructive actions confirm.
- Backend modeling uses a visible environment/version strip as its signature:
  draft revision, applied development revision, and unsaved state never blur.
- Keyboard focus, labels, error text, and narrow viewport stacking are required.
- Do not add decorative dashboards, gradients, or a parallel design system.
