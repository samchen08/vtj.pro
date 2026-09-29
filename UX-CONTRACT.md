# Backend Modeling UX Contract

- The panel is hidden when the service exposes no read capability; read-only
  services show content without write actions.
- Switching models or tabs retains local edits. An unfinished field edit must
  be completed or cancelled first.
- “Complete field” changes only local state. “Save draft” persists metadata.
  “Sync development” shows and confirms a server-generated plan before DDL.
- Sync targets development only; production selection is never exposed here.
- Revision conflicts retain local state and explain that another session won.
- Applied identifiers and unsupported structural changes are disabled in the
  UI and remain rejected by the server. Unsupported destructive actions are
  hidden while the reason remains visible in context.
- Field editing stays inside the field tab with an explicit title and return
  action. Removing a field or model is blocked until index, sort, or reference
  dependencies are removed; dependencies are never deleted silently.
- Physical record deletion is permanent and requires confirmation in consuming
  pages. Foreign-key and version conflicts are presented as actionable errors.
- Published model APIs are source-tagged, stable across repeated syncs, and
  coexist with external APIs.
