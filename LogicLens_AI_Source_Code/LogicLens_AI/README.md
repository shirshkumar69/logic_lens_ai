# LogicLens AI

An interactive Digital Electronics / Digital Logic laboratory built with React, Vinext and a Cloudflare Worker.

## Included workflows

- Faulty full adder: G2 is OR instead of XOR. Independent arithmetic reference reveals failures for 011 and 101.
- Six selectable two-input gate operations, live inputs and a circuit schematic.
- Exhaustive single-gate replacement search. Results are described as valid candidates, not guaranteed physical fault localization.
- Custom Boolean expressions: 1–4 inputs and 1–2 outputs. Safe recursive-descent parser supports !, &, ^, |, parentheses, 0 and 1; no eval.
- Strict complete CSV imports, editable observed outputs, mismatch filtering and CSV export.
- Custom correction synthesizes a canonical sum-of-products implementation from the reference, then evaluates it separately.
- Before/after evidence, independent verification, report downloads, browser-local saved experiments.
- Learning hub explicitly maps CO1 and CO2 to theory and application.
- Optional live GenAI diagnosis through OpenAI Chat Completions. The user supplies their own key and model in AI settings. Key is retained in React memory only, never localStorage, source, reports or logs. The API route forwards it only to the fixed OpenAI endpoint.
- Exportable GenAI prompts for use with another model.

## Run

Use the retained Sites scripts. `npm run dev` starts the framework preview; `npm run build` builds the Worker. Publish via Sites using `.openai/hosting.json`.

## Checks

- `node node_modules/typescript/bin/tsc --noEmit`
- `node --experimental-strip-types lib/logic.test.mjs`
- `node --experimental-strip-types lib/api.test.mjs`

Browser QA covered full-adder analysis and correction (6/8 → 8/8), custom expressions (3/4 → 4/4), duplicate CSV rejection, complete CSV import and synthesis (0/2 → 2/2), and API setup state.

Live AI generation requires a valid user API key and available provider quota. No provider credentials were available during build, so tests mock the provider response and do not establish live API availability.

## Limits

This models combinational Boolean behavior, not propagation delays, analog faults, metastability or sequential state. Truth tables alone do not uniquely determine physical faults. Reference data is supplied by the user for custom experiments; verification proves agreement with that data, not that the reference is correct. Canonical SOP synthesis favors transparency rather than minimum gate count. Saved experiments are device/browser-local.
