import { describe, expect, it } from 'vitest';
import type { AnimalListItem } from '../../types/animal';
import {
    buildCatalogPage,
    hasActiveFilters,
    PAGE_SIZE,
    type CatalogParams,
} from './catalogQuery';

function makeAnimal(overrides: Partial<AnimalListItem> = {}): AnimalListItem {
    return {
        id: 1,
        name: 'Rex',
        species: 'dog',
        breed: 'Mixed',
        age_months: 12,
        sex: 'male',
        photo_url: 'https://example.com/photo.png',
        status: 'available',
        created_at: '2026-01-01T00:00:00Z',
        ...overrides,
    };
}

function makeParams(overrides: Partial<CatalogParams> = {}): CatalogParams {
    return {
        search: '',
        species: 'all',
        status: 'all',
        sort: 'newest',
        page: 1,
        ...overrides,
    };
}

function makeMany(count: number): AnimalListItem[] {
    return Array.from({ length: count }, (_, i) =>
        makeAnimal({ id: i + 1, name: `Animal ${i + 1}` }),
    );
}

describe('buildCatalogPage filtering', () => {
    it('filters by species', () => {
        const animals = [
            makeAnimal({ id: 1, species: 'dog' }),
            makeAnimal({ id: 2, species: 'cat' }),
        ];

        const result = buildCatalogPage(animals, makeParams({ species: 'cat' }));

        expect(result.items.map((a) => a.id)).toEqual([2]);
    });

    it('filters by status', () => {
        const animals = [
            makeAnimal({ id: 1, status: 'available' }),
            makeAnimal({ id: 2, status: 'adopted' }),
        ];

        const result = buildCatalogPage(animals, makeParams({ status: 'adopted' }));

        expect(result.items.map((a) => a.id)).toEqual([2]);
    });

    it('searches by name and breed, ignoring case and surrounding spaces', () => {
        const animals = [
            makeAnimal({ id: 1, name: 'Bella', breed: 'Labrador' }),
            makeAnimal({ id: 2, name: 'Max', breed: 'Husky' }),
            makeAnimal({ id: 3, name: 'Luna', breed: null }),
        ];

        expect(
            buildCatalogPage(animals, makeParams({ search: '  BELL ' })).items.map((a) => a.id),
        ).toEqual([1]);
        expect(
            buildCatalogPage(animals, makeParams({ search: 'husky' })).items.map((a) => a.id),
        ).toEqual([2]);
    });

    it('combines all filters', () => {
        const animals = [
            makeAnimal({ id: 1, species: 'dog', status: 'available', name: 'Rex' }),
            makeAnimal({ id: 2, species: 'dog', status: 'adopted', name: 'Rex' }),
            makeAnimal({ id: 3, species: 'cat', status: 'available', name: 'Rex' }),
        ];

        const result = buildCatalogPage(
            animals,
            makeParams({ species: 'dog', status: 'available', search: 'rex' }),
        );

        expect(result.items.map((a) => a.id)).toEqual([1]);
    });

    it('returns a single empty page when nothing matches', () => {
        const result = buildCatalogPage(makeMany(3), makeParams({ search: 'zzz' }));

        expect(result.items).toEqual([]);
        expect(result.total).toBe(0);
        expect(result.totalPages).toBe(1);
        expect(result.page).toBe(1);
    });
});

describe('buildCatalogPage sorting', () => {
    it('sorts by name', () => {
        const animals = [
            makeAnimal({ id: 1, name: 'Max' }),
            makeAnimal({ id: 2, name: 'Bella' }),
            makeAnimal({ id: 3, name: 'Luna' }),
        ];

        const result = buildCatalogPage(animals, makeParams({ sort: 'name' }));

        expect(result.items.map((a) => a.name)).toEqual(['Bella', 'Luna', 'Max']);
    });

    it('puts animals with unknown age last in both directions', () => {
        const animals = [
            makeAnimal({ id: 1, age_months: null }),
            makeAnimal({ id: 2, age_months: 30 }),
            makeAnimal({ id: 3, age_months: 6 }),
        ];

        const asc = buildCatalogPage(animals, makeParams({ sort: 'age_asc' }));
        const desc = buildCatalogPage(animals, makeParams({ sort: 'age_desc' }));

        expect(asc.items.map((a) => a.id)).toEqual([3, 2, 1]);
        expect(desc.items.map((a) => a.id)).toEqual([2, 3, 1]);
    });

    it('does not mutate the input array', () => {
        const animals = [
            makeAnimal({ id: 1, name: 'Max' }),
            makeAnimal({ id: 2, name: 'Bella' }),
        ];

        buildCatalogPage(animals, makeParams({ sort: 'name' }));

        expect(animals.map((a) => a.id)).toEqual([1, 2]);
    });
});

describe('buildCatalogPage pagination', () => {
    it('splits results into pages of PAGE_SIZE', () => {
        const animals = makeMany(25);

        const first = buildCatalogPage(animals, makeParams({ page: 1 }));
        const last = buildCatalogPage(animals, makeParams({ page: 3 }));

        expect(first.items).toHaveLength(PAGE_SIZE);
        expect(first.total).toBe(25);
        expect(first.totalPages).toBe(3);
        expect(last.items).toHaveLength(5);
    });

    it('clamps an out-of-range page', () => {
        const animals = makeMany(25);

        expect(buildCatalogPage(animals, makeParams({ page: 99 })).page).toBe(3);
        expect(buildCatalogPage(animals, makeParams({ page: 0 })).page).toBe(1);
    });
});

describe('hasActiveFilters', () => {
    it('ignores sorting, page and a blank search', () => {
        expect(hasActiveFilters(makeParams({ sort: 'name', page: 3, search: '   ' }))).toBe(false);
    });

    it('detects search, species and status filters', () => {
        expect(hasActiveFilters(makeParams({ search: 'rex' }))).toBe(true);
        expect(hasActiveFilters(makeParams({ species: 'cat' }))).toBe(true);
        expect(hasActiveFilters(makeParams({ status: 'adopted' }))).toBe(true);
    });
});
