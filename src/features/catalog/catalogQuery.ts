import type { AnimalListItem, AnimalStatus, Species } from '../../types/animal';

export const PAGE_SIZE = 10;

export type SortKey = 'newest' | 'name' | 'age_asc' | 'age_desc';

export interface CatalogParams {
    search: string;
    species: Species | 'all';
    status: AnimalStatus | 'all';
    sort: SortKey;
    page: number;
}

export interface CatalogPage {
    items: AnimalListItem[];
    total: number;
    totalPages: number;
    page: number;
}

function compareAge(a: AnimalListItem, b: AnimalListItem, direction: 1 | -1): number {
    if (a.age_months === null && b.age_months === null) return 0;
    if (a.age_months === null) return 1;
    if (b.age_months === null) return -1;
    return (a.age_months - b.age_months) * direction;
}

const comparators: Record<SortKey, (a: AnimalListItem, b: AnimalListItem) => number> = {
    newest: (a, b) => b.id - a.id,
    name: (a, b) => a.name.localeCompare(b.name, 'uk'),
    age_asc: (a, b) => compareAge(a, b, 1),
    age_desc: (a, b) => compareAge(a, b, -1),
};

export function buildCatalogPage(
    animals: AnimalListItem[],
    params: CatalogParams,
): CatalogPage {
    const query = params.search.trim().toLowerCase();

    const filtered = animals
        .filter((a) => params.species === 'all' || a.species === params.species)
        .filter((a) => params.status === 'all' || a.status === params.status)
        .filter(
            (a) =>
                !query ||
                a.name.toLowerCase().includes(query) ||
                (a.breed ?? '').toLowerCase().includes(query),
        )
        .sort(comparators[params.sort]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(Math.max(1, params.page), totalPages);
    const start = (page - 1) * PAGE_SIZE;

    return {
        items: filtered.slice(start, start + PAGE_SIZE),
        total,
        totalPages,
        page,
    };
}