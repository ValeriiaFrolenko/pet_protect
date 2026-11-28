import { describe, expect, it } from 'vitest';
import { paginate } from './paginate';

const items = Array.from({ length: 25 }, (_, index) => index + 1);

describe('paginate', () => {
    it('returns the first page of 10 items', () => {
        const result = paginate(items, 1);

        expect(result.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(result.totalPages).toBe(3);
        expect(result.total).toBe(25);
    });

    it('returns a shorter last page', () => {
        expect(paginate(items, 3).items).toEqual([21, 22, 23, 24, 25]);
    });

    it('clamps a page that is out of range', () => {
        expect(paginate(items, 99).page).toBe(3);
        expect(paginate(items, 0).page).toBe(1);
    });

    it('keeps one empty page for an empty list', () => {
        expect(paginate([], 1)).toEqual({ items: [], page: 1, totalPages: 1, total: 0 });
    });
});
