---
status: testing
phase: 06-pipeline-foundation
source: [06-01-SUMMARY.md]
started: 2026-04-12T10:15:00Z
updated: 2026-04-12T10:16:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 2
name: Verify dark-only SVGs skip pairing check but enforce colors
expected: |
  Running `verify-svgs.js` against a mock `-dark-only.svg` file passes without complaining about a missing light mode counterpart, but still strictly validates that only Frieren dark theme hex codes are used.
awaiting: user response

## Tests

### 1. Cold Start Smoke Test
expected: Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch. Server boots without errors, any seed/migration completes, and a primary query (health check, homepage load, or basic API call) returns live data.
result: pass

### 2. Verify dark-only SVGs skip pairing check but enforce colors
expected: Running `verify-svgs.js` against a mock `-dark-only.svg` file passes without complaining about a missing light mode counterpart, but still strictly validates that only Frieren dark theme hex codes are used.
result: [pending]

### 3. Build Template unwraps single image in picture tag
expected: When authoring a `<picture>` tag without `<source>` fallbacks containing a single `<img>` in `README.template.md`, the `npm run build` process outputs just the raw `<img>` tag without any GitHub light/dark mode suffixes appended.
result: [pending]

### 4. Build Template unwraps single video in picture tag
expected: When authoring a `<picture>` tag without `<source>` fallbacks containing a single `<video>` (including its closing `</video>` tag) in `README.template.md`, the `npm run build` process outputs just the raw `<video>...</video>` block without any GitHub suffixes, and leaves no malformed dangling tags.
result: [pending]

## Summary

total: 4
passed: 1
issues: 0
pending: 3
skipped: 0

## Gaps
