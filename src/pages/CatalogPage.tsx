import { useMemo, useRef } from 'react';
import { Pagination } from '../components/Pagination';
import { SelectField, type SelectOption } from '../components/SelectField';
import { AnimalCard } from '../features/catalog/AnimalCard';
import { buildCatalogPage, type CatalogParams } from '../features/catalog/catalogQuery';
import { useCatalogParams } from '../features/catalog/useCatalogParams';
import { useAnimals } from '../hooks/useAnimals';

const SPECIES_OPTIONS: readonly SelectOption<CatalogParams['species']>[] = [
    { value: 'all', label: 'All species' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'other', label: 'Other' },
];

const STATUS_OPTIONS: readonly SelectOption<CatalogParams['status']>[] = [
    { value: 'all', label: 'Any status' },
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'adopted', label: 'Adopted' },
];

const SORT_OPTIONS: readonly SelectOption<CatalogParams['sort']>[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'name', label: 'Name' },
    { value: 'age_asc', label: 'Youngest first' },
    { value: 'age_desc', label: 'Oldest first' },
];

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
        return (
            <div>
                <p>{error.message}</p>
                <button type="button" className="button" onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    if (isPending || !catalog) {
        return <p>Loading...</p>;
    }

    return (
        <section className="catalog">
            <h1>Animals</h1>

            <div className="catalog__filters">
                <label className="field">
                    <span className="field__label">Search</span>
                    <input
                        className="field__control"
                        type="search"
                        placeholder="Name or breed"
                        value={params.search}
                        onChange={(event) => updateParams({ search: event.target.value })}
                    />
                </label>
                <SelectField
                    label="Species"
                    value={params.species}
                    options={SPECIES_OPTIONS}
                    onChange={(species) => updateParams({ species })}
                />
                <SelectField
                    label="Status"
                    value={params.status}
                    options={STATUS_OPTIONS}
                    onChange={(status) => updateParams({ status })}
                />
                <SelectField
                    label="Sort by"
                    value={params.sort}
                    options={SORT_OPTIONS}
                    onChange={(sort) => updateParams({ sort })}
                />
            </div>

            <div ref={resultsRef}>
                <p className="catalog__summary">Found: {catalog.total}</p>

                {catalog.items.length === 0 ? (
                    <div>
                        <p>No animals match your filters.</p>
                        <button
                            type="button"
                            className="button"
                            onClick={() =>
                                updateParams({ search: '', species: 'all', status: 'all', sort: 'newest' })
                            }
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <ul className="catalog__grid">
                        {catalog.items.map((animal) => (
                            <li key={animal.id}>
                                <AnimalCard animal={animal} />
                            </li>
                        ))}
                    </ul>
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