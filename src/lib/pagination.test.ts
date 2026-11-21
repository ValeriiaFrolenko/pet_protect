import { describe, expect, it } from 'vitest';
import { getPageItems } from './pagination';

describe('getPageItems', () => {
    it('returns a single page', () => {
        expect(getPageItems(1, 1)).toEqual([1]);
    });

    it('returns all pages when there are few', () => {
        expect(getPageItems(2, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('collapses distant pages into gaps', () => {
        expect(getPageItems(5, 10)).toEqual([1, 'gap', 4, 5, 6, 'gap', 10]);
    });

    it('keeps the first pages together near the start', () => {
        expect(getPageItems(2, 10)).toEqual([1, 2, 3, 'gap', 10]);
    });

    it('fills a single missing page instead of showing a gap', () => {
        expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
});