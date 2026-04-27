# 🌌 Satellite Tracking Dashboard
### Real-Time IoT + MQTT + Spring WebFlux + React Visualization

<p align="center">
  <b>Edge Device → Cloud Broker → Reactive Backend → Live Dashboard</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20WebFlux-brightgreen" />
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue" />
  <img src="https://img.shields.io/badge/Messaging-MQTT-orange" />
  <img src="https://img.shields.io/badge/Architecture-Event--Driven-purple" />
  <img src="https://img.shields.io/badge/Privacy-No%20GPS%20Coordinates-red" />
</p>

---

## ✨ Overview

**Satellite Tracking Dashboard** is a real-time IoT portfolio project that streams satellite telemetry from a Raspberry Pi into a cloud-based dashboard.

The system reads satellite data from `gpsd`, processes it with a Python edge service, publishes it to an MQTT broker, consumes it with a Spring WebFlux backend, and displays it live in a React dashboard.

The project is designed to demonstrate:

- real-time streaming
- MQTT pub/sub architecture
- reactive backend design
- privacy-aware IoT data processing
- custom frontend visualization

---

## ⚙️ Frontend Environment

The React app reads the backend base URL from `VITE_API_BASE_URL`.

Create a local env file before starting Vite:

```bash
cp .env.example .env.local
```

Default local value:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🧭 Architecture Diagram

<p align="center">
<svg width="900" height="520" viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="cloud" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="backend" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="frontend" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <style>
      .box { rx: 18; ry: 18; filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.18)); }
      .title { font: bold 18px Arial, sans-serif; fill: white; }
      .text { font: 13px Arial, sans-serif; fill: white; opacity: 0.95; }
      .arrow { stroke: #334155; stroke-width: 3; marker-end: url(#arrowhead); }
      .label { font: bold 13px Arial, sans-serif; fill: #334155; }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
    </marker>
  </defs>

  <rect width="900" height="520" fill="#f8fafc"/>

  <rect x="50" y="70" width="180" height="120" class="box" fill="url(#edge)"/>
  <text x="140" y="110" text-anchor="middle" class="title">Raspberry Pi</text>
  <text x="140" y="140" text-anchor="middle" class="text">gpsd :2947</text>
  <text x="140" y="162" text-anchor="middle" class="text">GPS receiver</text>

  <rect x="270" y="70" width="190" height="120" class="box" fill="url(#edge)"/>
  <text x="365" y="105" text-anchor="middle" class="title">Python Processor</text>
  <text x="365" y="135" text-anchor="middle" class="text">Read SKY data</text>
  <text x="365" y="157" text-anchor="middle" class="text">Simulate az/el</text>
  <text x="365" y="179" text-anchor="middle" class="text">Publish JSON</text>

  <rect x="505" y="70" width="170" height="120" class="box" fill="url(#cloud)"/>
  <text x="590" y="110" text-anchor="middle" class="title">HiveMQ Cloud</text>
  <text x="590" y="140" text-anchor="middle" class="text">MQTT Broker</text>
  <text x="590" y="162" text-anchor="middle" class="text">TLS pub/sub</text>

  <rect x="710" y="70" width="150" height="120" class="box" fill="url(#backend)"/>
  <text x="785" y="105" text-anchor="middle" class="title">WebFlux</text>
  <text x="785" y="135" text-anchor="middle" class="text">MQTT subscriber</text>
  <text x="785" y="157" text-anchor="middle" class="text">Reactor Flux</text>
  <text x="785" y="179" text-anchor="middle" class="text">SSE endpoint</text>

  <rect x="315" y="315" width="270" height="130" class="box" fill="url(#frontend)"/>
  <text x="450" y="355" text-anchor="middle" class="title">React Dashboard</text>
  <text x="450" y="385" text-anchor="middle" class="text">EventSource subscription</text>
  <text x="450" y="407" text-anchor="middle" class="text">Satellite table</text>
  <text x="450" y="429" text-anchor="middle" class="text">SVG sky visualization</text>

  <line x1="230" y1="130" x2="270" y2="130" class="arrow"/>
  <line x1="460" y1="130" x2="505" y2="130" class="arrow"/>
  <line x1="675" y1="130" x2="710" y2="130" class="arrow"/>
  <line x1="785" y1="190" x2="500" y2="315" class="arrow"/>

<text x="245" y="115" class="label">TCP</text>
<text x="473" y="115" class="label">MQTT</text>
<text x="682" y="115" class="label">MQTT</text>
<text x="610" y="255" class="label">SSE</text>

  <rect x="80" y="245" width="740" height="42" rx="12" fill="#e0f2fe" stroke="#0284c7"/>
  <text x="450" y="271" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#075985">
    Privacy Layer: no GPS latitude/longitude is exposed; azimuth/elevation are simulated
  </text>
</svg>
</p>

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