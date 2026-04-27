export default function StatusCards({ visibleCount, usedCount, hdop }) {
    const cards = [
        { label: "Visible", value: visibleCount },
        { label: "Used", value: usedCount },
        { label: "HDOP", value: hdop },
    ];

    return (
        <section className="cards-grid">
            {cards.map((card) => (
                <article className="card" key={card.label}>
                    <div className="card-label">{card.label}</div>
                    <div className="card-value">{card.value}</div>
                </article>
            ))}
        </section>
    );
}