import { describe, expect, it } from 'vitest';
import { formatAge, formatDateTime, formatStatus } from './format';

describe('formatAge', () => {
    it('handles unknown age', () => {
        expect(formatAge(null)).toBe('Age unknown');
    });

    it('formats months, whole years and years with months', () => {
        expect(formatAge(6)).toBe('6 mo');
        expect(formatAge(24)).toBe('2 y');
        expect(formatAge(30)).toBe('2 y 6 mo');
    });
});

describe('formatStatus', () => {
    it('returns a readable label for every status', () => {
        expect(formatStatus('available')).toBe('Available');
        expect(formatStatus('reserved')).toBe('Reserved');
        expect(formatStatus('adopted')).toBe('Adopted');
    });
});

describe('formatDateTime', () => {
    it('formats a valid ISO date', () => {
        expect(formatDateTime('2026-12-05T10:30:00Z')).toContain('2026');
    });

    it('does not throw on an invalid date', () => {
        expect(formatDateTime('not a date')).toBe('Date unknown');
    });
});
