# Project structure

- `src/App.tsx` — route selection, localStorage persistence, browser history handling, and UI-to-workspace actions.
- `src/data.ts` — centralized fictional participants, attendance histories, events, and initial interventions.
- `src/types.ts` — typed participant, event, history, intervention, workspace, and metric contracts.
- `src/repository.ts` — local-demo data source. Replace it with REST/database reads in a future backend.
- `src/workspace.ts` — pure guarded transitions for approval and simulated return. It only creates an intervention after approval and completes one matching pending intervention.
- `src/intelligence.ts` — deterministic risk, status, reason, recommendation, and metric calculations. This is the replacement point for future AI/ML-assisted diagnosis.
- `src/intelligence.test.ts` — risk, drift, sparse-history, and metric tests.
- `src/workspace.test.ts` — intervention approval, duplicate prevention, return, and reset tests.
- `src/components/` — layout, modal, status, KPI, and participant-row UI components.
- `src/pages/` — Overview, People, Participant Detail, and Interventions routes.
- `src/styles.css` — responsive application styling and modal/feedback states.

## Future integration seams

`repository.ts` is the read boundary for a backend/API. `workspace.ts` is the current local mutation boundary and can become API mutations. Authentication belongs around the app shell plus that repository/API layer. Communication should remain channel-independent: `intervention → delivery channel → WhatsApp / email / SMS / app`. AI can replace rules in `intelligence.ts` while preserving possible reason, confidence, recommendation, and outcome.
