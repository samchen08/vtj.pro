# Todo

- [x] Make local VTJ.PRO AI authentication deterministic without bypassing live-environment login.
- [x] Ensure AI initialization waits for local sign login before loading settings.
- [x] Run focused frontend tests/type checks and verify the login alert is gone in the browser.
- [x] Fast-forward the frontend to `origin/master` while preserving all local worktree changes.
- [x] Add VTJ-specific Agent skill guidance and selected-node context to AI requests.
- [x] Show the current component selection in the AI chat and apply AI output only to the captured subtree.
- [x] Add focused tests, rebuild affected packages, and verify the flow in the browser.

## Review

- `@vtj/pro dev` now starts on 9528 and points its AI/open API remote to the Java backend on 9527 with the local `local-dev` sign.
- `@vtj/local` supports `VTJ_REMOTE`, `VTJ_AUTH_SIGN`, and `VTJ_AUTH_URL` overrides without changing published VTJ.PRO defaults.
- Local `isLogined()` completes sign login when the access token is missing; AI initialization waits for that result before loading settings.
- Browser verification passed: the AI login alert count is 0, the prompt input is present, and the Send button is enabled.
- `@vtj/local` build passed. After the frontend sync, rebuilding `core`, `utils`, `uni`, and `renderer` refreshed workspace declarations and the Designer production build passed.

## Selected Component Review

- Fast-forwarded the frontend from `f9b4fb811` to `998941ac9` and restored all local worktree changes without conflict.
- Added a selected-node snapshot to AI Topic/Chat requests and a dedicated `vtj-node` output path for complete NodeSchema updates.
- Enforced selection scope at apply time: the captured node is found by id, its root component type and identity are preserved, and only that subtree is updated.
- Added the live selection bar to both new-topic and follow-up chat inputs.
- Verified 83 Designer tests, `@vtj/designer` production build, `@vtj/local` build, and the live browser state on port 9528.
- Browser proof: login alert count is 0; selecting a canvas node shows `当前选中 h1` and its node id in the AI input.
