#!/usr/bin/env -S rote play run
/**
 * @rote-frontmatter
 * ---
 * name: instruction-play
 * description: ''
 * provenance:
 *   author: manolyagambira@gmail.com
 * metadata:
 *   rote_version: 0.82.0
 *   version: 0.0.1
 *   status: released
 *   kind: atomic
 *   flow_type: parallel
 *   execution_model: steps_with_presentation
 *   requires_endpoints:
 *   - adapter/github
 *   requires_sessions: true
 *   discoverability:
 *     tags:
 *     - typescript
 *     - github
 *   mcp_servers:
 *     adapter/github:
 *       fingerprint: mcp_42NUu4GDdRqTTS2Kg9542UsNfaV2
 *       server_info:
 *         name: github
 *         version: 3.0.3
 *       capabilities:
 *         tools: true
 *         resources: false
 *         prompts: false
 *         logging: false
 *       tool_count: 1229
 *       endpoint_name: adapter/github
 *       export_uri: https://api.github.com
 *       captured_at: 2026-09-13T15:07:09.845417448Z
 *   baseline_api_tokens: 5958
 *   baseline_context_tokens: 705
 *   baseline_exploration_ms: 1090
 *   exploration_model: null
 * parameters:
 * - name: owner
 *   param_type: string
 *   required: false
 *   default: github
 *   description: Recorded constant; override as needed
 *   example: null
 *   valid_values: null
 * - name: repo
 *   param_type: string
 *   required: false
 *   default: docs
 *   description: Recorded constant; override as needed
 *   example: null
 *   valid_values: null
 * steps:
 *   repos_get-content:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params:
 *       owner: $owner
 *       repo: $repo
 *       path: .github/instructions/all.instructions.md
 * ---
 */

const presentationSdk = await import("__ROTE_PRESENTATION_SDK__").catch((cause) => {
  throw new Error(
    "This is a rote steps presentation program. Run it with `rote play run <name>`.",
    { cause },
  );
});
const { FlowOutput, loadPresentationContext, stepName } = presentationSdk;

const out = new FlowOutput();
const ctx = await loadPresentationContext();
out.setRunStatus(ctx.run.status);

const renderedSteps: Record<string, unknown> = {};

// Takes the step handle (not the name) so every `stepName("...")` at the
// call sites stays a literal that lint can verify against `steps:`.
function renderStep(step: ReturnType<typeof ctx.step>): unknown {
  switch (step.outcome.status) {
    case "completed":
      return step.outcome.output.body;
    case "restored": {
      const source = step.outcome.output.source;
      if (source?.status === "partial") {
        return {
          status: "partial",
          body: step.outcome.output.body,
          diagnostics: source.diagnostics,
          additional_diagnostics: source.additional_diagnostics,
        };
      }
      // A clean restored step completed in an earlier run, so it reads like one.
      return step.outcome.output.body;
    }
    case "partial":
      return {
        status: "partial",
        body: step.outcome.output.output.body,
        diagnostics: step.outcome.output.diagnostics,
      };
    case "skipped":
      return { status: "skipped", reason: step.outcome.output.reason };
    case "failed":
      return { status: "failed", message: step.outcome.output.message };
    case "blocked":
      return {
        status: "blocked",
        reason: step.outcome.output.reason,
        blocked_by: step.outcome.output.blocked_by ?? [],
      };
    default:
      // Unreachable while this body matches the SDK. A play exported before a new
      // outcome status was added lands here instead, so name the remedy.
      throw new Error(
        `unsupported step outcome: ${JSON.stringify(step.outcome)}. ` +
          `Re-export the play to regenerate this switch.`,
      );
  }
}
renderedSteps["repos_get-content"] = renderStep(ctx.step(stepName("repos_get-content")));

const headlinePrefix = (() => {
  switch (ctx.run.status) {
    case "succeeded":
      return "";
    case "partial":
      return "INCOMPLETE: ";
    case "failed":
      return "FAILED: ";
  }
})();
out.human(`${headlinePrefix}Rendered ${Object.keys(renderedSteps).length} step(s).`);
out.summary(`${headlinePrefix}Rendered ${Object.keys(renderedSteps).length} step(s).`);
out.result({
  run_id: ctx.run.run_id,
  status: ctx.run.status,
  complete: ctx.run.status === "succeeded",
  steps: renderedSteps,
});
