import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useAnimal } from '../../hooks/useAnimals';
import { formatAge, formatStatus } from '../../lib/format';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { AnimalActions } from './AnimalActions';

export function AnimalDetails({ id }: { id: number }) {
    const { data: animal, isPending, isError, error, refetch } = useAnimal(id);

    if (isError) {
        if (error.kind === 'not_found') {
            return <NotFoundPage />;
        }

        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (isPending) {
        return <LoadingState />;
    }

    return (
        <article className="animal-details">
            <img
                className="animal-details__photo"
                src={animal.photo_url}
                alt={animal.name}
                width={600}
                height={600}
            />
            <div className="animal-details__info">
                <h1>{animal.name}</h1>
                <p className="animal-details__meta">
                    {formatAge(animal.age_months)} · {animal.breed ?? 'Unknown breed'}
                    {animal.sex ? ` · ${animal.sex}` : ''}
                </p>
                <span className={`status status--${animal.status}`}>
                    {formatStatus(animal.status)}
                </span>
                <p>{animal.description || 'No description yet.'}</p>
                <AnimalActions animal={animal} />
            </div>
        </article>
    );
}
