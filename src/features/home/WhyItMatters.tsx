const REASONS = [
    {
        title: 'A safe place',
        text: 'Animals without a home get shelter, food and attention while they wait for a family.',
    },
    {
        title: 'Health first',
        text: 'Vaccinations and checkups keep animals healthy and make adoption safer for families.',
    },
    {
        title: 'A second chance',
        text: 'Every adoption changes one life and frees a place for the next animal in need.',
    },
];

export function WhyItMatters() {
    return (
        <section className="why">
            <h2 className="why__title">Why it matters</h2>
            <ul className="why__list">
                {REASONS.map((reason) => (
                    <li key={reason.title} className="why__card">
                        <h3>{reason.title}</h3>
                        <p>{reason.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
