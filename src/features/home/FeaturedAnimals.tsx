import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CardSkeletonGrid } from '../../components/CardSkeletonGrid';
import { ErrorState } from '../../components/ErrorState';
import { useAnimals } from '../../hooks/useAnimals';
import { AnimalCard } from '../catalog/AnimalCard';
import { DraggableCard } from './DraggableCard';
import { pickFeaturedAnimals } from './homeSelectors';

const FEATURED_COUNT = 4;

export function FeaturedAnimals() {
    const { data, isPending, isError, error, refetch } = useAnimals();
    const featured = useMemo(() => pickFeaturedAnimals(data ?? [], FEATURED_COUNT), [data]);

    return (
        <section>
            <div className="home-section__header">
                <h2>Find your friend</h2>
                <Link to="/animals">All animals</Link>
            </div>

            {isPending ? (
                <CardSkeletonGrid count={FEATURED_COUNT} />
            ) : isError && !data ? (
                <ErrorState message={error.message} onRetry={() => void refetch()} />
            ) : featured.length === 0 ? (
                <p className="state">No animals are available for adoption right now.</p>
            ) : (
                <ul className="friend-board">
                    {featured.map((animal) => (
                        <DraggableCard key={animal.id}>
                            <AnimalCard animal={animal} />
                        </DraggableCard>
                    ))}
                </ul>
            )}
        </section>
    );
}
