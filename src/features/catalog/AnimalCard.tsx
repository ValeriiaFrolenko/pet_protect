import { Link } from 'react-router-dom';
import { formatAge } from '../../lib/format';
import type { AnimalListItem } from '../../types/animal';

export function AnimalCard({ animal }: { animal: AnimalListItem }) {
    return (
        <Link className="animal-card__link" to={`/animals/${animal.id}`}>
            <article className="animal-card">
                <img
                    className="animal-card__photo"
                    src={animal.photo_url}
                    alt={animal.name}
                    width={300}
                    height={300}
                    loading="lazy"
                />
                <div className="animal-card__body">
                    <h2 className="animal-card__name">{animal.name}</h2>
                    <p className="animal-card__meta">
                        {formatAge(animal.age_months)} · {animal.breed ?? 'Unknown breed'}
                    </p>
                    <span className={`status status--${animal.status}`}>{animal.status}</span>
                </div>
            </article>
        </Link>
    );
}