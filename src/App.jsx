import StatusCards from "./components/StatusCards";
import SatelliteTable from "./components/SatelliteTable";
import SkyPlot from "./components/SkyPlot";
import { useSkyStream } from "./hooks/useSkysStream.js";
import "./index.css";

export default function App() {
  const data = useSkyStream();

  const fallback = {
    visibleCount: 0,
    usedCount: 0,
    hdop: 0,
    satellites: [],
  };

  const dashboard = data ?? fallback;

  return (
      <div className="app-shell">
        <header className="app-header">
          <h1>Satellite Sky Dashboard</h1>
          <p>Live telemetry and demo sky simulation</p>
        </header>

        <StatusCards
            visibleCount={dashboard.visibleCount}
            usedCount={dashboard.usedCount}
            hdop={dashboard.hdop}
        />

        <main className="dashboard-grid">
          <section className="panel">
            <h2>Satellite Table</h2>
            <SatelliteTable satellites={dashboard.satellites} />
          </section>

          <section className="panel">
            <h2>Sky View</h2>
            <SkyPlot satellites={dashboard.satellites} />
          </section>
        </main>
      </div>
  );
}