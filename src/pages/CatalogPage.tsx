import { useMemo, useRef } from 'react';
import { CardSkeletonGrid } from '../components/CardSkeletonGrid';
import { ErrorState } from '../components/ErrorState';
import { Pagination } from '../components/Pagination';
import { CatalogFilters } from '../features/catalog/CatalogFilters';
import { CatalogGrid } from '../features/catalog/CatalogGrid';
import { FILTER_DEFAULTS } from '../features/catalog/catalogOptions';
import { buildCatalogPage, hasActiveFilters } from '../features/catalog/catalogQuery';
import { useCatalogParams } from '../features/catalog/useCatalogParams';
import { useAnimals } from '../hooks/useAnimals';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function CatalogPage() {
    useDocumentTitle('Animals');

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

    const resetFilters = () => updateParams(FILTER_DEFAULTS);

    if (isError && !data) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    return (
        <section className="catalog">
            <h1>Our animals</h1>

            <CatalogFilters params={params} onChange={updateParams} />

            {isPending || !catalog ? (
                <CardSkeletonGrid />
            ) : (
                <div ref={resultsRef}>
                    <h2 className="visually-hidden">Results</h2>
                    <div className="catalog__summary">
                        <p role="status">Found: {catalog.total}</p>
                        {hasActiveFilters(params) && (
                            <button type="button" className="button button--quiet" onClick={resetFilters}>
                                Reset filters
                            </button>
                        )}
                    </div>

                    {catalog.items.length === 0 ? (
                        <p className="state state--empty">
                            No animals match your filters. Try another name or reset the filters.
                        </p>
                    ) : (
                        <CatalogGrid animals={catalog.items} />
                    )}

                    <Pagination
                        page={catalog.page}
                        totalPages={catalog.totalPages}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </section>
    );
}
