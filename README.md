# Logistics Driver App

A React Native (Expo) prototype for the driver-facing side of a logistics platform. Drivers can browse available delivery jobs, accept assignments, advance delivery status, and view job details with a progress tracker.

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- [Expo Go](https://expo.dev/go) on your phone (optional), or iOS Simulator / Android Emulator

### Run locally

```bash
npm install
npx expo start
```

Then:

- Press `i` to open the iOS Simulator
- Press `a` to open the Android Emulator
- Scan the QR code with Expo Go on a physical device

## Demo Flow

1. Open **Available Jobs** — browse mock delivery cards with pickup/drop-off, priority, and estimates.
2. Tap **Accept Job** on a card (or open detail first, then accept).
3. The job disappears from the feed and appears under **My Jobs** with status **Accepted**.
4. Tap the job to open **Job Detail** — view full fields, route preview, and progress stepper.
5. Tap **Confirm Pickup** → status becomes **Picked Up**.
6. Tap **Confirm Delivery** → status becomes **Delivered**.
7. Return to the feed — the accepted job does not reappear.

Pull down on either list to refresh from the mock API layer.

## Architecture

### Navigation

```
RootStack
├── MainTabs (Bottom Tabs)
│   ├── JobFeed      → Available jobs
│   └── MyJobs       → Accepted / active / completed jobs
└── JobDetail        → Full job view (stack push from either tab)
```

Built with **React Navigation v7** (native stack + bottom tabs).

### State Management

**Zustand** store ([`src/store/jobsStore.ts`](src/store/jobsStore.ts)) holds the canonical job list and UI state:

- `loadJobs` / `refreshJobs` — fetch from mock API
- `acceptJob` — `available` → `accepted`
- `advanceJobStatus` — `accepted` → `picked_up` → `delivered`

Status transitions are guarded both in the store and the API layer to prevent invalid moves (e.g. skipping pickup).

### Data Layer (Mock API)

[`src/services/jobsApi.ts`](src/services/jobsApi.ts) mirrors a REST API with ~300ms simulated latency:

| Function | Purpose |
|----------|---------|
| `fetchAvailableJobs()` | Jobs with `status === 'available'` |
| `fetchMyJobs()` | Jobs with `accepted`, `picked_up`, or `delivered` |
| `acceptJob(jobId)` | Accept an available job |
| `updateJobStatus(jobId, status)` | Advance delivery status |

Seed data lives in [`src/data/mockJobs.ts`](src/data/mockJobs.ts). To connect a real backend later, replace the internals of `jobsApi.ts` with `fetch()` calls — the store interface stays the same.

### Screen Structure

```
src/
├── components/     JobCard, PriorityBadge, StatusStepper, MapPlaceholder, ...
├── data/           Mock job seed data
├── navigation/     Root + tab navigators, typed routes
├── screens/        JobFeed, MyJobs, JobDetail
├── services/       Mock API layer
├── store/          Zustand jobs store
├── theme/          Colors, spacing, typography
├── types/          Job, JobStatus, JobPriority
└── utils/          Formatters for distance, duration, labels
```

### Styling

React Native **StyleSheet** with shared theme tokens in [`src/theme/colors.ts`](src/theme/colors.ts).

## Tradeoffs

| Decision | Rationale |
|----------|-----------|
| Mock API instead of Express backend | Faster to build and review; API shape is ready for backend swap |
| In-memory state | Resets on app reload; no AsyncStorage persistence |
| Static map placeholder | Avoids Google/Apple Maps API keys; shows route concept visually |
| Delivered jobs stay in My Jobs | Makes the full status flow visible during demo/review |
| No authentication | Out of assignment scope |

## Future Improvements

With more time, I would add:

- Real REST/GraphQL backend with driver auth
- Persistent state (AsyncStorage or SQLite)
- Live maps and turn-by-turn navigation (Google Maps / Mapbox)
- GPS geofencing to gate pickup/delivery confirmations
- Push notifications for new job assignments
- Offline support and optimistic sync
- Unit/integration tests for status transition logic
- Filter completed jobs in My Jobs tab

## Tech Stack

- Expo SDK 56 + TypeScript
- React Navigation (native stack + bottom tabs)
- Zustand
- StyleSheet

## License

Private — built as a take-home assignment prototype.
