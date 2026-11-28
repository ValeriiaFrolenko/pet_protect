export function CardSkeletonGrid({ count = 8 }: { count?: number }) {
    return (
        <div role="status">
            <span className="visually-hidden">Loading...</span>
            <ul className="catalog__grid" aria-hidden="true">
                {Array.from({ length: count }, (_, index) => (
                    <li key={index} className="skeleton-card" />
                ))}
            </ul>
        </div>
    );
}
