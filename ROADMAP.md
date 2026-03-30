# Pi Autoresearch Pro Roadmap

## Goal
Turn `pi-autoresearch` into a top-tier Pi-native autonomous optimization harness for real production repos.

## Product principles
- Keep the existing Pi-native execution core.
- Optimize for unattended work in isolated git worktrees.
- Make evaluation harder to game.
- Preserve a durable strategy memory across long runs.
- Add parallel search only after single-run reliability is strong.

## Phase 1 — foundation
- [x] Worktree-first unattended mode (health warnings + status visibility)
- [ ] Safer cleanup defaults for build artifacts in worktrees
- [x] Crash/reload-safe run state file
- [x] Better resume/status ergonomics
- [x] Session health checks before/after runs

## Phase 2 — smarter loop control
- [x] Stagnation detection (`research`, `blocked` recommendations)
- [ ] `autoresearch.lessons.jsonl` strategy memory
- [x] Research checkpoint flow using repo analysis + docs/web search prompts
- [ ] Better mismatch detection between branch state and experiment log

## Phase 3 — eval packages
- [ ] `autoresearch.eval.yaml`
- [ ] Primary + secondary metric contract
- [ ] Holdout cases
- [ ] Anti-cheat constraints
- [ ] Mutation scope contract
- [ ] Stronger correctness gate semantics

## Phase 4 — parallel search
- [ ] Champion/challenger worktree experiments
- [ ] Side-agent orchestration for bounded parallel slices
- [ ] Winner merge-back flow
- [ ] Final synthesis support for best branch extraction

## First implementation target
Dogfood against `~/SITES/prbot` with:
1. `apps/blog-writer` cold build speed
2. `apps/startupbros` homepage performance

## Success criteria
- Can run unattended overnight in a worktree without permission babysitting.
- Can recover cleanly after reload/restart.
- Can detect stagnation instead of thrashing.
- Can resist benchmark self-deception with explicit eval contracts.
- Can fan out a few candidate hypotheses in parallel and keep the best.
