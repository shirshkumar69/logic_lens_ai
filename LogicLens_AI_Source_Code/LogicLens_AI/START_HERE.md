# LogicLens AI — Start here

This ZIP contains the complete source for the LogicLens AI website, including the interface, circuit simulator, truth-table engine, API route, tests, and original hosting configuration.

## Run on your Windows laptop (VS Code)

1. Install Node.js 22.13 or newer, with npm.
2. Extract this ZIP. Open the extracted `LogicLens_AI` folder in VS Code.
3. Open Terminal → New Terminal. Check that `package.json` is in this folder.
4. Install the exact locked dependencies:

   npm ci

5. Run the app using standard Next.js:

   npx next dev --webpack

6. Open http://localhost:3000 in your browser. If that port is occupied, use the address printed in the terminal.
7. Stop the server with Ctrl+C.

If PowerShell blocks npm.ps1 or npx.ps1, use `npm.cmd ci` and `npx.cmd next dev --webpack`, or choose Command Prompt as the VS Code terminal.

The original npm run dev/build scripts are retained for the hosted Vinext environment. For your local Windows setup, use the explicit Next.js commands above.

## Production build locally

   npx next build --webpack
   npx next start

This source was compiled successfully using `next build --webpack`, including TypeScript validation. Browser interaction tests were performed in the original Vinext preview. The Windows instructions themselves were not executed on a Windows machine.

## Main files

- app/page.tsx — Complete interactive interface and experiment workflows.
- app/globals.css — Styling, responsive layouts, colors and typography.
- app/layout.tsx — Page metadata and layout.
- app/api/diagnose/route.ts — Server-side OpenAI request handling.
- lib/logic.ts — Gates, full adder, Boolean parser, truth-table generation, candidate repairs, CSV validation and synthesis.
- lib/logic.test.mjs — Logic tests.
- lib/api.test.mjs — API tests with a mock provider (no real key required).
- public/favicon.svg — Website icon.
- package.json / package-lock.json — Dependencies and original scripts.
- next.config.ts / tsconfig.json — Next.js and TypeScript configuration.
- sample-full-adder.csv — Importable example data.
- README.md — Feature descriptions and limits.
- vite.config.ts, worker/, scripts/, .openai/ — Original Vinext / Sites hosting integration.
- components/, hooks/, db/, drizzle/, examples/, vendor/ — Retained starter source/support files; not all are used by this interface.

## Using the app

1. Load the default faulty full adder.
2. Run analysis: inputs 011 and 101 reveal the incorrect OR gate.
3. Apply suggested correction to replace G2 with XOR.
4. Re-verify: all 8 input combinations should match.
5. Use New experiment for custom expressions, or Import CSV for your own truth table.
6. Save experiment stores data in that browser. Export report or CSV for a portable copy.

Custom expressions support 1–4 inputs, 1–2 outputs, ! NOT, & AND, ^ XOR, | OR, parentheses, and binary constants. Input names are case-sensitive. CSV imports require all unique input combinations.

## Live GenAI explanations

Open AI settings in the website and enter your OpenAI API key and model ID. The model field defaults to gpt-4.1-mini and can be changed to a Chat Completions-compatible model available to your account. Provider usage may be billed.

Keys stay in tab memory and are forwarded by the server to OpenAI only for diagnosis. No real API key is included. Built-in deterministic analysis, correction and verification need no key. You can also export a prompt for another AI.

Live provider calls were not tested with real credentials. Mock route tests validate request handling and errors. GenAI commentary is separate from deterministic verification.

## Tests

   node --experimental-strip-types lib/logic.test.mjs
   node --experimental-strip-types lib/api.test.mjs
   npx tsc --noEmit

## Hosting notes

For a conventional Node.js / Next.js host, use the Next.js build/start commands above. The app has a server API route, so a static-only export cannot supply live AI requests.

The .openai/hosting.json file identifies your existing ChatGPT-hosted project. Preserve it for that original site; do not reuse its project ID when creating a new separate site. No Git credentials, API keys, node_modules, runtime caches, or user experiment data are included.

## Scope

This is a combinational Boolean simulator, not an analog or propagation-delay simulator. Custom verification proves equivalence to the expected table supplied by the user. Truth tables alone cannot uniquely identify a physical fault. Canonical sum-of-products synthesis is transparent but not necessarily gate-minimal.
