# Satellite Tracking Dashboard

Real-time satellite telemetry visualization built with React + Vite, powered by a reactive Server-Sent Events (SSE) stream.

This project is designed as a portfolio-grade frontend case study for event-driven UIs and data visualization.

## Why This Project Stands Out

- Real-time dashboard updates using `EventSource` and streaming data.
- Clear separation of concerns between data subscription and presentation.
- Purpose-built visual components for operational telemetry.
- Privacy-aware design: displays satellite metrics, not user location coordinates.
- Production-friendly configuration via environment variables.

## System Architecture (End-to-End)

```text
GPS Receiver -> gpsd (Raspberry Pi) -> Python Processor -> MQTT Broker
-> Spring WebFlux Backend -> SSE (/api/gps/data/subscribe)
-> React Dashboard (this repository)
```
---

## 🛰️ Data Flow

```text
GPS Receiver
    ↓
gpsd on Raspberry Pi
    ↓
Python edge processor
    ↓
MQTT broker
    ↓
Spring WebFlux backend
    ↓
Server-Sent Events
    ↓
React dashboard

## Frontend Scope In This Repository

- `src/hooks/useSkysStream.js`
  - Connects to SSE stream and listens for `sky-update` events.
  - Parses incoming JSON and updates app state.
- `src/components/StatusCards.jsx`
  - Displays live counters (`visibleCount`, `usedCount`, `hdop`).
- `src/components/SatelliteTable.jsx`
  - Renders per-satellite telemetry in tabular form.
- `src/components/SkyPlot.jsx`
  - Draws satellite azimuth/elevation positions in SVG sky view.

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES modules)
- Server-Sent Events (`EventSource`)
- SVG for custom plotting

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- Running backend SSE endpoint (default: `http://localhost:8080`)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Copy the example file:

```bash
cp .env.example .env.local
```

Default value:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

### 3) Start development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## SSE Data Contract (Expected by UI)

The dashboard expects `sky-update` events with JSON payload compatible with:

```json
{
  "visibleCount": 10,
  "usedCount": 7,
  "hdop": 0.9,
  "satellites": [
    {
      "id": "G12",
      "signal": 36,
      "used": true,
      "azimuth": 145.2,
      "elevation": 48.6
    }
  ]
}
```

Note: the hook also tolerates array-wrapped payloads and uses the first item.

## NPM Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production bundle
- `npm run preview` - serve built bundle locally
- `npm run lint` - run ESLint

## Engineering Notes

- API base URL is environment-driven (`VITE_API_BASE_URL`) for easy dev/stage/prod switching.
- SSE client lifecycle is managed inside `useEffect`, with cleanup on unmount.
- UI uses a defensive fallback state before first event arrives.

## Roadmap

- Add loading and disconnected connection states in the UI.
- Add reconnection/backoff strategy and stream health indicator.
- Add unit tests for hook parsing and visualization helpers.
- Add filtering/sorting for satellite table.
- Improve accessibility labels and keyboard navigation.

## License

This project is provided for portfolio and educational use.
