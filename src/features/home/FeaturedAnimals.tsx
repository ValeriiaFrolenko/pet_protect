import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useAnimals } from '../../hooks/useAnimals';
import { CatalogGrid } from '../catalog/CatalogGrid';
import { pickFeaturedAnimals } from './homeSelectors';

const FEATURED_COUNT = 4;

export function FeaturedAnimals() {
    const { data, isPending, isError, error, refetch } = useAnimals();
    const featured = useMemo(() => pickFeaturedAnimals(data ?? [], FEATURED_COUNT), [data]);

    return (
        <section className="home-section">
            <div className="home-section__header">
                <h2>Looking for a home</h2>
                <Link to="/animals">All animals</Link>
            </div>

            {isError ? (
                <ErrorState message={error.message} onRetry={() => void refetch()} />
            ) : isPending ? (
                <LoadingState />
            ) : featured.length === 0 ? (
                <p className="state">No animals are available for adoption right now.</p>
            ) : (
                <CatalogGrid animals={featured} />
            )}
        </section>
    );
}
