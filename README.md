# Satellite Tracking Dashboard

<p align="center">
  Real-time satellite telemetry visualization with React, Vite, and SSE.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Build-Vite%208-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Streaming-SSE%20(EventSource)-0EA5E9" alt="SSE" />
  <img src="https://img.shields.io/badge/Architecture-Event%20Driven-7C3AED" alt="Event Driven" />
  <img src="https://img.shields.io/badge/Config-.env.local-16A34A" alt="Env Config" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Data%20Transport-MQTT%20%E2%86%92%20WebFlux%20%E2%86%92%20SSE-F97316" alt="Data Transport" />
  <img src="https://img.shields.io/badge/Privacy-No%20GPS%20Coordinates-DC2626" alt="Privacy" />
</p>

This project showcases a production-style frontend for live telemetry: resilient stream subscription, clear data presentation, and custom SVG visualization.

## Quick Links

- [Why This Project Stands Out](#why-this-project-stands-out)
- [System Architecture](#system-architecture-end-to-end)
- [Data Flow](#data-flow)
- [Frontend Scope](#frontend-scope-in-this-repository)
- [Local Setup](#local-setup)
- [SSE Data Contract](#sse-data-contract-expected-by-ui)
- [Roadmap](#roadmap)

- [Dashboard - check it out!](#https://satellite-tracking-dashboard-demo.vercel.app)

## Why This Project Stands Out

- Real-time dashboard updates using `EventSource` and streaming JSON events.
- Clean separation between streaming logic (`useSkyStream`) and UI components.
- Custom telemetry visuals with table and SVG sky plot.
- Privacy-aware model: satellite quality/position metrics only, no user coordinates.
- Environment-driven backend configuration via `VITE_API_BASE_URL`.

## System Architecture (End-to-End)

```text
GPS Receiver -> gpsd (Raspberry Pi) -> Python Processor -> MQTT Broker
-> Spring WebFlux Backend -> SSE (/api/gps/data/subscribe)
-> React Dashboard (this repository)
```

## Data Flow

```text
GPS Receiver
  -> gpsd on Raspberry Pi
  -> Python edge processor
  -> MQTT broker
  -> Spring WebFlux backend
  -> Server-Sent Events
  -> React dashboard
```

## Frontend Scope In This Repository

- `src/hooks/useSkysStream.js`
  - Opens the SSE connection.
  - Listens to `sky-update` events.
  - Parses payloads and updates application state.
- `src/components/StatusCards.jsx`
  - Renders `visibleCount`, `usedCount`, and `hdop` summary cards.
- `src/components/SatelliteTable.jsx`
  - Displays per-satellite telemetry in a structured table.
- `src/components/SkyPlot.jsx`
  - Plots azimuth/elevation values in an SVG sky chart.

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES modules)
- Server-Sent Events (`EventSource`)
- SVG rendering

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

```bash
cp .env.example .env.local
```

Default local value:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

### 3) Run locally

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

Note: `useSkyStream` also tolerates array-wrapped payloads and reads the first item.

## NPM Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production bundle
- `npm run preview` - serve built bundle locally
- `npm run lint` - run ESLint

## Engineering Notes

- Backend URL comes from `VITE_API_BASE_URL`.
- SSE lifecycle is handled in `useEffect` with cleanup on unmount.
- UI has fallback values before first stream event arrives.

## Roadmap

- Add loading/disconnected UI states.
- Add reconnection backoff and stream health indicator.
- Add tests for hook parsing and plotting helpers.
- Add table filtering/sorting.
- Improve accessibility labels and keyboard support.

## License

This project is provided for portfolio and educational use.
