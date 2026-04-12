---
phase: 02
slug: visual-design-system
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-12
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js native assert |
| **Config file** | none |
| **Quick run command** | `node scripts/verify-svgs.js` |
| **Full suite command** | `node scripts/verify-svgs.js && grep -q "#gh-dark-mode-only" README.template.md` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/verify-svgs.js`
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | VISL-01 | unit | `node scripts/verify-svgs.js` | ✅ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | VISL-01 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-01-03 | 01 | 1 | VISL-01 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-02-01 | 02 | 2 | VISL-01 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-02-02 | 02 | 2 | VISL-01 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-02-03 | 02 | 2 | VISL-01 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-03-01 | 03 | 2 | VISL-02 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-03-02 | 03 | 2 | VISL-02 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-03-03 | 03 | 2 | VISL-02 | integration | `node scripts/verify-svgs.js` | ❌ | ⬜ pending |
| 02-04-01 | 04 | 3 | VISL-01, VISL-02 | integration | `grep -q "#gh-dark-mode-only" README.template.md` | ❌ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `scripts/verify-svgs.js` — script for validating SVG requirements

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Render aesthetics | VISL-01 | Visual design is subjective | View README.md in GitHub preview, toggle light/dark modes |

*If none: "All phase behaviors have automated verification."*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < {N}s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** {pending / approved YYYY-MM-DD}