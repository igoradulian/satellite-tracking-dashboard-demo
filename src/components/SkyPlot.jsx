function toRadians(deg) {
    return (deg * Math.PI) / 180;
}

function polarToXY(azimuth, elevation, radius) {
    const r = radius * (1 - elevation / 90);
    const angle = toRadians(azimuth - 90);
    const x = 200 + r * Math.cos(angle);
    const y = 200 + r * Math.sin(angle);
    return { x, y };
}

export default function SkyPlot({ satellites }) {
    const radius = 170;

    return (
        <div className="skyplot-wrap">
            <svg viewBox="0 0 400 400" className="skyplot">
                <circle cx="200" cy="200" r="170" className="sky-ring" />
                <circle cx="200" cy="200" r="120" className="sky-ring" />
                <circle cx="200" cy="200" r="70" className="sky-ring" />
                <circle cx="200" cy="200" r="20" className="sky-ring" />

                <line x1="200" y1="30" x2="200" y2="370" className="sky-axis" />
                <line x1="30" y1="200" x2="370" y2="200" className="sky-axis" />

                <text x="200" y="18" textAnchor="middle" className="sky-label">N</text>
                <text x="382" y="205" textAnchor="middle" className="sky-label">E</text>
                <text x="200" y="394" textAnchor="middle" className="sky-label">S</text>
                <text x="18" y="205" textAnchor="middle" className="sky-label">W</text>

                {satellites.map((sat) => {
                    const { x, y } = polarToXY(sat.azimuth, sat.elevation, radius);
                    return (
                        <g key={sat.id}>
                            <circle
                                cx={x}
                                cy={y}
                                r={sat.used ? 7 : 5}
                                className={sat.used ? "sat-dot used" : "sat-dot"}
                            />
                            <text x={x + 10} y={y - 8} className="sat-label">
                                {sat.id}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}