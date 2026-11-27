import type { AnimalListItem } from '../../types/animal';
import { AnimalCard } from './AnimalCard';

export function CatalogGrid({ animals }: { animals: readonly AnimalListItem[] }) {
    return (
        <ul className="catalog__grid">
            {animals.map((animal) => (
                <li key={animal.id}>
                    <AnimalCard animal={animal} />
                </li>
            ))}
        </ul>
    );
}
