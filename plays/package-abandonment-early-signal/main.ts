/**
   * Package-Abandonment Early Signal
   *
   * Public npm and GitHub evidence for continuity-risk review. Signals never establish
   * abandonment and never infer maintainer intent.
   *
   * @rote-frontmatter
   * ---
   * name: package-abandonment-early-signal
   * version: 0.1.0
   * description: "Public, read-only npm/GitHub continuity-risk signals for a package; reports indicators, counterevidence, and limitations without claiming abandonment or
   intent."
   * source: "https://www.modiqo.ai/play-ideas#ideas-index"
   * provenance:
   *   author: sruthi
   * metadata:
   *   rote_version: 0.53.0
   *   version: 0.1.0
   *   status: released
   *   kind: atomic
   *   flow_type: sequential
   *   execution_model: steps_with_presentation
   *   format: typescript
   *   requires_sessions: false
   *   contract:
   *     atomic: true
   *     input:
   *       type: none
   *     output:
   *       format: json
   *       destination: stdout
   *     composable: true
   *   discoverability:
   *     tags: [npm, github, package-risk, public, read-only]
   * parameters:
   * - name: package
   *   param_type: string
   *   required: false
   *   default: pluralize
   *   description: "Public npm package name, e.g. pluralize or @scope/package"
   * steps:
   *   assess:
   *     type: process.exec
   *     timeout_ms: 120000
   *     argv: [python3, '@resource{assess.py}', '$package']
   * ---
   */

  const { FlowOutput } = await import("_ROTE_PRESENTATION_SDK_");
  const out = new FlowOutput();
  out.human("Package continuity-risk signal assessment completed. Inspect the assess-step JSON for evidence, counterevidence, and limitations.");
  out.summary("Package continuity-risk signal assessment completed.");
  out.result({ status: "completed", claim_boundary: "Signals are risk indicators only—not an abandonment verdict or a claim about maintainer intent." });
