import assert from "node:assert/strict";
import test from "node:test";

import { shouldAutoEnterAutoresearch } from "../extensions/pi-autoresearch/index.ts";

test("auto-enter resumes persisted logs in the current cwd", () => {
  assert.equal(shouldAutoEnterAutoresearch("/repo", "/repo", true), true);
});

test("auto-enter does not resume redirected workingDir logs implicitly", () => {
  assert.equal(shouldAutoEnterAutoresearch("/home/user", "/repo", true), false);
});

test("auto-enter stays off when no persisted log exists", () => {
  assert.equal(shouldAutoEnterAutoresearch("/repo", "/repo", false), false);
});
