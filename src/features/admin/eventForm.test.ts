import { describe, expect, it } from 'vitest';
import {
    EMPTY_EVENT_FORM,
    fromDateTimeLocalValue,
    toDateTimeLocalValue,
    toEventInput,
    validateEventForm,
    type EventFormValues,
} from './eventForm';

const valid: EventFormValues = {
    title: 'Adoption day',
    description: '',
    startsAt: '2026-12-05T10:30',
    location: 'Kyiv',
    lat: '',
    lng: '',
};

describe('date and time conversion', () => {
    it('keeps the local time when converting to a form value and back', () => {
        const iso = new Date(2026, 10, 28, 9, 5).toISOString();

        expect(toDateTimeLocalValue(iso)).toBe('2026-11-28T09:05');
        expect(fromDateTimeLocalValue('2026-11-28T09:05')).toBe(iso);
    });

    it('returns an empty value for an invalid date', () => {
        expect(toDateTimeLocalValue('not a date')).toBe('');
        expect(fromDateTimeLocalValue('')).toBeNull();
    });
});

describe('validateEventForm', () => {
    it('accepts valid values without coordinates', () => {
        expect(validateEventForm(valid)).toEqual({});
    });

    it('requires a title, a date and a location', () => {
        const errors = validateEventForm(EMPTY_EVENT_FORM);

        expect(Object.keys(errors).sort()).toEqual(['location', 'startsAt', 'title']);
    });

    it('accepts coordinates with a comma as the decimal separator', () => {
        expect(validateEventForm({ ...valid, lat: '50,45', lng: '30.52' })).toEqual({});
    });

    it('rejects coordinates out of range', () => {
        const errors = validateEventForm({ ...valid, lat: '91', lng: '181' });

        expect(errors.lat).toBeDefined();
        expect(errors.lng).toBeDefined();
    });

    it('rejects a single coordinate', () => {
        expect(validateEventForm({ ...valid, lat: '50' }).lng).toBeDefined();
        expect(validateEventForm({ ...valid, lng: '30' }).lat).toBeDefined();
    });

    it('rejects text instead of a coordinate', () => {
        expect(validateEventForm({ ...valid, lat: 'abc', lng: '30' }).lat).toBeDefined();
    });
});

describe('toEventInput', () => {
    it('builds the record with parsed coordinates', () => {
        const input = toEventInput({ ...valid, lat: '50,45', lng: '30.52' }, null);

        expect(input.lat).toBe(50.45);
        expect(input.lng).toBe(30.52);
        expect(input.cover_url).toBeNull();
        expect(input.starts_at).toBe(new Date(2026, 11, 5, 10, 30).toISOString());
    });

    it('uses null for empty coordinates', () => {
        const input = toEventInput(valid, '/cover.jpg');

        expect(input.lat).toBeNull();
        expect(input.lng).toBeNull();
        expect(input.cover_url).toBe('/cover.jpg');
    });
});
