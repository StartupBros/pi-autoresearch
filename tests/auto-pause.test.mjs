import assert from "node:assert/strict";
import test from "node:test";

import { autoPauseReasonAfterExperiment } from "../extensions/pi-autoresearch/index.ts";

function run(overrides = {}) {
  return {
    commit: "abcdef0",
    metric: 0,
    metrics: {},
    status: "crash",
    description: "crashed",
    timestamp: Date.now(),
    segment: 0,
    confidence: null,
    ...overrides,
  };
}

test("auto-pause detects non-retryable hosted balance/precondition crashes immediately", () => {
  const experiment = run({
    description: "Hosted API failed before scoring",
    asi: {
      error_detail: "jsinfer submit_chat_completions failed: 428 Precondition required; Negative project balance: -6",
    },
  });

  const reason = autoPauseReasonAfterExperiment([experiment], 0, experiment);

  assert.match(reason, /negative-project-balance/);
});

test("auto-pause detects repeated identical crash signatures", () => {
  const first = run({ description: "tool crashed with widget frobnication error 123" });
  const second = run({ description: "tool crashed with widget frobnication error 456" });
  const third = run({ description: "tool crashed with widget frobnication error 789" });

  const reason = autoPauseReasonAfterExperiment([first, second, third], 0, third);

  assert.match(reason, /same crash repeated 3 times/);
});

test("auto-pause does not trigger for ordinary first crash or discard", () => {
  const crash = run({ description: "one-off failure" });
  const discard = run({ status: "discard", metric: 42, description: "worse result" });

  assert.equal(autoPauseReasonAfterExperiment([crash], 0, crash), null);
  assert.equal(autoPauseReasonAfterExperiment([discard], 0, discard), null);
});
