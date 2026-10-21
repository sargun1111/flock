# flock

Flock is the **retention intelligence layer for real life**. This local MVP helps an organizer move from attendance records to a useful retention loop: identify drift, understand a possible reason, choose a respectful intervention, and measure a return.

## What works today

The fictional **Ludhiana Running Club** demo includes deliberate scenarios for a drifting regular (Aman Sharma), an inactive participant (Simran Kaur), a new participant drop-off (Rahul Verma), a healthy regular (Arjun Mehta), a recovered participant (Neha Sharma), and an intervention with no return yet (Karan Singh).

- Dynamic community-health, drift, return, and intervention metrics.
- Rule-based risk, drift, possible-reason, and recommendation logic.
- Search, status filtering, and sorting for People.
- Participant timeline, before/now pattern comparison, and cautious diagnosis language.
- Message preview and confirmation modal; messages are never sent.
- Approved → completed intervention lifecycle with a simulated return for the exact pending intervention; no real message is sent or retention improvement is claimed.
- Demo reset and browser localStorage persistence.

## Lifecycle and metric definitions

- Selecting an action is a non-persisted **proposed** intervention. It is only recorded after **Confirm intervention**.
- A recorded intervention is **Approved** with a pending outcome. Simulate Return completes that one pending intervention as **Returned**.
- Demo outcome rate = simulated returns ÷ completed demo interventions. Pending outcomes are excluded, and types with no completed outcomes are labelled clearly.
- Community Demo Returns = participants with an explicit fictional recorded return ÷ participants with sufficient attendance history.
- The fictional attendance, intervention, and simulated-return timeline is anchored to October 20, 2026; no fixture date is later than that demo date.

## Technology

- React + TypeScript + Vite
- Plain CSS
- Central local mock data and browser localStorage
- Vitest for deterministic domain logic and workspace transitions

## Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173/dashboard`.

## Verify

```bash
npm test
npm run build
```

The pre-demo audit ran both commands successfully on October 20, 2026:

- `npm test` — 2 test files and 9 tests passed.
- `npm run build` — TypeScript project build and Vite production build passed.


## Organizer demo flow

```text
Overview
→ Review Aman Sharma
→ See 6/7 previous attendance become 0/3 recent attendance
→ Read the possible Schedule conflict diagnosis
→ Approve intervention
→ Confirm the demo-only message preview
→ Simulate participant return
→ See a simulated demo return and 8-day simulated time to return
→ Return to Overview to see metrics update
→ Open Interventions to see the simulated demo outcome
→ Reset demo before the next organizer session
```

## Limitations

- No authentication, backend, database, real attendance import, or real communication provider.
- Diagnosis is deterministic demo logic, not AI, and uses uncertainty language.
- Analytics are illustrative and not statistically validated.
- This local demo is not production-ready or suitable for real participant data.

## Recommended next phase

Run structured organizer validation sessions with this demo before adding real integrations. Record whether organizers trust the drift diagnosis, which action they would choose, and whether they would connect attendance data.
