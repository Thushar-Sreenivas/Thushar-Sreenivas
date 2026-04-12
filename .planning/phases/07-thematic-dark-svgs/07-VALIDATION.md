---
phase: 07
slug: thematic-dark-svgs
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 07 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | node test runner / custom assertions |
| **Config file** | none |
| **Quick run command** | `node scripts/verify-svgs.js` |
| **Full suite command** | `node scripts/verify-svgs.js` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/verify-svgs.js`
- **After every plan wave:** Run `node scripts/verify-svgs.js`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | SVG-01 | e2e | `node scripts/verify-svgs.js` | ✅ | ⬜ pending |
| 07-01-02 | 01 | 1 | SVG-02 | e2e | `node scripts/verify-svgs.js` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Font files downloaded/copied for `text-to-svg` (if necessary)

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual aesthetic matches Frieren theme | SVG-01 | Aesthetics are subjective | Open `magic-circle-dark.svg` in browser to visually confirm. |

*If none: "All phase behaviors have automated verification."*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
