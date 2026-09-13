#!/usr/bin/env -S rote play run
/**
 * Monorepo Test-Gap Cartography
 *
 * @rote-frontmatter
 * ---
 * name: monorepo-test-gap-cartography
 * description: "Evidence-backed GitHub test-gap cartography for a repository change."
 * provenance:
 *   author: Codex
 * metadata:
 *   rote_version: 0.82.0
 *   version: 0.1.0
 *   status: released
 *   kind: atomic
 *   flow_type: parallel
 *   execution_model: steps_with_presentation
 *   format: typescript
 *   requires_endpoints:
 *   - adapter/github
 *   requires_sessions: true
 *   discoverability:
 *     tags: [typescript, github, ci, test-gaps]
 *   adapter_sources:
 *     adapter/github: pvais/github
 *   mcp_servers:
 *     adapter/github:
 *       fingerprint: mcp_kmcjZ2U5m8NQMM8491mGhVmZthZ
 *       server_info: {name: GitHub v3 REST API, version: 3.0.3}
 *       capabilities: {tools: true, resources: false, prompts: false, logging: false}
 *       tool_count: 1108
 *       endpoint_name: adapter/github
 *       export_uri: https://api.github.com
 *       captured_at: 2026-09-13T14:59:00Z
 * parameters:
 * - name: owner
 *   param_type: string
 *   required: true
 *   description: "GitHub repository owner."
 * - name: repo
 *   param_type: string
 *   required: true
 *   description: "GitHub repository name."
 * - name: change_selector
 *   param_type: string
 *   required: false
 *   default: master
 *   description: "Commit SHA, branch/ref, or base ref from which to identify the latest meaningful change."
 * - name: pr_number
 *   param_type: integer
 *   required: false
 *   default: 0
 *   description: "Optional pull-request number; zero means no PR file lookup."
 * - name: commit_limit
 *   param_type: integer
 *   required: false
 *   default: 30
 *   description: "Bounded commit history window."
 * - name: history_window
 *   param_type: string
 *   required: false
 *   default: "all returned"
 *   description: "Label for the Actions history window retained in the report."
 * steps:
 *   commits:
 *     endpoint: adapter/github
 *     method: repos/list-commits
 *     params: {owner: $owner, repo: $repo, sha: $change_selector, per_page: $commit_limit}
 *   commit_details:
 *     endpoint: adapter/github
 *     method: repos/get-commit
 *     depends_on: [commits]
 *     for_each: ".[0:$commit_limit]"
 *     params: {owner: $owner, repo: $repo, ref: $sha}
 *   pr_files:
 *     endpoint: adapter/github
 *     method: pulls/list-files
 *     execution:
 *       mode: deferred
 *       condition: {compare: {left: {param: pr_number}, op: gt, right: 0}}
 *     params: {owner: $owner, repo: $repo, pull_number: $pr_number}
 *   workflows:
 *     endpoint: adapter/github
 *     method: actions/list-repo-workflows
 *     params: {owner: $owner, repo: $repo}
 *   runs:
 *     endpoint: adapter/github
 *     method: actions/list-workflow-runs-for-repo
 *     params: {owner: $owner, repo: $repo}
 *   ci_workflow:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params: {owner: $owner, repo: $repo, path: .github/workflows/ci.yml, ref: $change_selector}
 *   release_workflow:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params: {owner: $owner, repo: $repo, path: .github/workflows/release.yml, ref: $change_selector}
 *   package_manifest:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params: {owner: $owner, repo: $repo, path: package.json, ref: $change_selector}
 *   codeowners_root:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params: {owner: $owner, repo: $repo, path: CODEOWNERS, ref: $change_selector}
 *   codeowners_github:
 *     endpoint: adapter/github
 *     method: repos/get-content
 *     params: {owner: $owner, repo: $repo, path: .github/CODEOWNERS, ref: $change_selector}
 *   jobs:
 *     endpoint: adapter/github
 *     method: actions/list-jobs-for-workflow-run
 *     depends_on: [runs]
 *     for_each: ".workflow_runs[]"
 *     params: {owner: $owner, repo: $repo, run_id: $id}
 *   artifacts:
 *     endpoint: adapter/github
 *     method: actions/list-workflow-run-artifacts
 *     depends_on: [runs]
 *     for_each: ".workflow_runs[]"
 *     params: {owner: $owner, repo: $repo, run_id: $id}
 *   run_logs:
 *     endpoint: adapter/github
 *     method: actions/download-workflow-run-logs
 *     depends_on: [runs]
 *     for_each: ".workflow_runs[]"
 *     params: {owner: $owner, repo: $repo, run_id: $id}
 * ---
 */

const { FlowOutput, loadPresentationContext, stepName } = await import("_ROTE_PRESENTATION_SDK_");
const out = new FlowOutput();
const ctx = await loadPresentationContext();
out.setRunStatus(ctx.run.status);

function body(name: string): any {
  if (name === "commits") {
    const step = ctx.step(stepName("commits"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "commit_details") {
    const step = ctx.step(stepName("commit_details"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "pr_files") {
    const step = ctx.step(stepName("pr_files"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "workflows") {
    const step = ctx.step(stepName("workflows"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "runs") {
    const step = ctx.step(stepName("runs"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "ci_workflow") {
    const step = ctx.step(stepName("ci_workflow"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "release_workflow") {
    const step = ctx.step(stepName("release_workflow"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "package_manifest") {
    const step = ctx.step(stepName("package_manifest"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "codeowners_root") {
    const step = ctx.step(stepName("codeowners_root"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "codeowners_github") {
    const step = ctx.step(stepName("codeowners_github"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "jobs") {
    const step = ctx.step(stepName("jobs"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "artifacts") {
    const step = ctx.step(stepName("artifacts"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  if (name === "run_logs") {
    const step = ctx.step(stepName("run_logs"));
    if (step.outcome.status === "completed" || step.outcome.status === "restored") return step.outcome.output.body;
    return { status: step.outcome.status, evidence: step.outcome.output };
  }
  throw new Error("Unknown presentation step: " + name);
}
const params = ctx.params as Record<string, unknown>;
const commitRows = body("commit_details");
const commits = Array.isArray(commitRows) ? commitRows : [];
const meaningful = commits.filter((commit: any) => !/(dependabot|dependencies|version packages|release|generated)/i.test(String(commit?.commit?.message ?? "")));
const selected = meaningful[0] ?? commits[0] ?? { evidence: "no commit detail returned" };
const changed = Array.isArray(selected.files) ? selected.files.map((file: any) => ({path: file.filename, status: file.status, sha: file.sha, address: file.blob_url})) : [];
const sourcePaths = changed.filter((file: any) => /\.(ts|tsx|js|jsx|py|go|rs|java|rb|php|css|scss|html)$/.test(String(file.path)));
const packages = [...new Set(sourcePaths.map((file: any) => { const m = String(file.path).match(/^(packages|apps|libs)\/([^/]+)/); return m ? ${m[1]}/${m[2]} : "."; }))];
const runs = body("runs");
const runItems = Array.isArray(runs?.workflow_runs) ? runs.workflow_runs : [];
const execution = runItems.filter((run: any) => run.head_sha === selected.sha);
const report = {
  repository: ${params.owner}/${params.repo},
  change_selector: params.change_selector,
  history_window: params.history_window,
  selected_change: {sha: selected.sha ?? null, message: selected.commit?.message ?? null, author: selected.commit?.author ?? null, committer: selected.commit?.committer ?? null, address: selected.html_url ?? null},
  changed_paths: changed,
  source_paths: sourcePaths,
  affected_packages: packages,
  likely_owners: {evidence: [body("codeowners_root"), body("codeowners_github")], conclusion: "uncertain unless a CODEOWNERS response is available"},
  workflows: body("workflows"),
  workflow_definitions: {ci: body("ci_workflow"), release: body("release_workflow")},
  workflow_runs: runItems,
  relevant_runs_for_selected_sha: execution,
  jobs: body("jobs"),
  artifacts: body("artifacts"),
  logs: body("run_logs"),
  package_manifest: body("package_manifest"),
  execution_conclusion: execution.length ? "evidence found; inspect matching jobs and steps" : "no evidence found for the selected SHA; this is not proof of absence",
  gaps: [{kind: "evidence_gap", statement: execution.length ? "No additional gap asserted." : "No matching run was retrieved for the selected SHA."}, {kind: "owner_uncertainty", statement: "Owner mapping remains uncertain when CODEOWNERS lookups return 404."}],
  evidence_addresses: [selected.html_url, https://api.github.com/repos/${params.owner}/${params.repo}/actions/workflows, https://api.github.com/repos/${params.owner}/${params.repo}/actions/runs].filter(Boolean),
  blocked_or_uncertain: ["Adapter-exposed pagination and time-window limits are retained as reported.", "A named test command is not execution evidence without a matching job/step.", "Untested code is never classified as defective."],
};
const headline = ctx.run.status === "succeeded" ? "" : `${ctx.run.status.toUpperCase()}: `;
out.human(${headline}# ${report.repository} test-gap cartography\n\n${JSON.stringify(report, null, 2)});
out.summary(${headline}${report.repository}: ${sourcePaths.length} source path(s), ${execution.length} matching run(s); evidence gaps are labeled.);
out.result(report);
