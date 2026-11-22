import { describe, expect, it } from 'vitest';
import { shiftIndex } from './slider';

describe('shiftIndex', () => {
    it('moves forward and backward inside the range', () => {
        expect(shiftIndex(1, 1, 4)).toBe(2);
        expect(shiftIndex(2, -1, 4)).toBe(1);
    });

    it('wraps around at both ends', () => {
        expect(shiftIndex(3, 1, 4)).toBe(0);
        expect(shiftIndex(0, -1, 4)).toBe(3);
    });

    it('returns 0 for an empty list', () => {
        expect(shiftIndex(0, 1, 0)).toBe(0);
    });
});