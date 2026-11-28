import { describe, expect, it } from 'vitest';
import { clamp, isDragMovement } from './drag';

describe('isDragMovement', () => {
    it('treats a small pointer shift as a click', () => {
        expect(isDragMovement({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(false);
    });

    it('detects a drag beyond the threshold in any direction', () => {
        expect(isDragMovement({ x: 10, y: 10 }, { x: 2, y: 10 })).toBe(true);
    });
});

describe('clamp', () => {
    it('keeps a value inside the range', () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(15, 0, 10)).toBe(10);
    });
});
