import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CatalogParams, SortKey } from './catalogQuery';

const SPECIES = ['dog', 'cat', 'other'] as const;
const STATUSES = ['available', 'reserved', 'adopted'] as const;
const SORT_KEYS: readonly SortKey[] = ['newest', 'name', 'age_asc', 'age_desc'];

function parseEnum<T extends string>(value: string | null, allowed: readonly T[]): T | null {
    return allowed.find((item) => item === value) ?? null;
}

export function useCatalogParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo<CatalogParams>(() => {
        const page = Number(searchParams.get('page'));

        return {
            search: searchParams.get('q') ?? '',
            species: parseEnum(searchParams.get('species'), SPECIES) ?? 'all',
            status: parseEnum(searchParams.get('status'), STATUSES) ?? 'all',
            sort: parseEnum(searchParams.get('sort'), SORT_KEYS) ?? 'newest',
            page: Number.isInteger(page) && page > 0 ? page : 1,
        };
    }, [searchParams]);

    const updateParams = useCallback(
        (changes: Partial<CatalogParams>) => {
            const merged = { ...params, ...changes };
            if (!('page' in changes)) {
                merged.page = 1;
            }

            const next = new URLSearchParams();
            if (merged.search) next.set('q', merged.search);
            if (merged.species !== 'all') next.set('species', merged.species);
            if (merged.status !== 'all') next.set('status', merged.status);
            if (merged.sort !== 'newest') next.set('sort', merged.sort);
            if (merged.page > 1) next.set('page', String(merged.page));

            setSearchParams(next, { replace: 'search' in changes });
        },
        [params, setSearchParams],
    );

    return { params, updateParams };
}