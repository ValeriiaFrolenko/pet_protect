import { useMemo, useRef } from 'react';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { Pagination } from '../components/Pagination';
import { CatalogFilters } from '../features/catalog/CatalogFilters';
import { CatalogGrid } from '../features/catalog/CatalogGrid';
import { FILTER_DEFAULTS } from '../features/catalog/catalogOptions';
import { buildCatalogPage } from '../features/catalog/catalogQuery';
import { useCatalogParams } from '../features/catalog/useCatalogParams';
import { useAnimals } from '../hooks/useAnimals';

export function CatalogPage() {
    const { data, isPending, isError, error, refetch } = useAnimals();
    const { params, updateParams } = useCatalogParams();
    const resultsRef = useRef<HTMLDivElement>(null);

    const catalog = useMemo(
        () => (data ? buildCatalogPage(data, params) : null),
        [data, params],
    );

    const handlePageChange = (page: number) => {
        updateParams({ page });
        resultsRef.current?.scrollIntoView({ block: 'start' });
    };

    if (isError) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (isPending || !catalog) {
        return <LoadingState />;
    }

    return (
        <section className="catalog">
            <h1>Animals</h1>

            <CatalogFilters params={params} onChange={updateParams} />

            <div ref={resultsRef}>
                <p className="catalog__summary">Found: {catalog.total}</p>

                {catalog.items.length === 0 ? (
                    <div className="state">
                        <p>No animals match your filters.</p>
                        <button
                            type="button"
                            className="button"
                            onClick={() => updateParams(FILTER_DEFAULTS)}
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <CatalogGrid animals={catalog.items} />
                )}

                <Pagination
                    page={catalog.page}
                    totalPages={catalog.totalPages}
                    onChange={handlePageChange}
                />
            </div>
        </section>
    );
}
