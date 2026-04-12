---
phase: 1
slug: narrative-content
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js native (`node:assert`) |
| **Config file** | none — simple script |
| **Quick run command** | `node scripts/verify-content.js` |
| **Full suite command** | `node scripts/verify-content.js` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/verify-content.js`
- **After every plan wave:** Run `node scripts/verify-content.js`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | TECH-01 | e2e | `node scripts/verify-content.js` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | NARR-01 | e2e | `node scripts/verify-content.js` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | NARR-02 | e2e | `node scripts/verify-content.js` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | NARR-03 | e2e | `node scripts/verify-content.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/verify-content.js` — script to parse Markdown and look for required keywords/structure

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| "code as magic" tone | NARR-01 | Subjective evaluation | Read the hero section |
| Seamless flow | NARR-02 | Subjective evaluation | Read the journey section |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: false` set in frontmatter

**Approval:** pending
