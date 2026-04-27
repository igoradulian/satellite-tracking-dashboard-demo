export default function SatelliteTable({ satellites }) {
    return (
        <div className="table-wrap">
            <table className="sat-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Signal</th>
                    <th>Used</th>
                    <th>Azimuth</th>
                    <th>Elevation</th>
                </tr>
                </thead>
                <tbody>
                {satellites.map((sat) => (
                    <tr key={sat.id}>
                        <td>{sat.id}</td>
                        <td>{sat.signal}</td>
                        <td>{sat.used ? "Yes" : "No"}</td>
                        <td>{Math.round(sat.azimuth)}</td>
                        <td>{Math.round(sat.elevation)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}