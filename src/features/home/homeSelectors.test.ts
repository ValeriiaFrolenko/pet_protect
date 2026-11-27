import { describe, expect, it } from 'vitest';
import type { AnimalListItem } from '../../types/animal';
import type { ShelterEvent } from '../../types/event';
import { pickFeaturedAnimals, pickUpcomingEvents } from './homeSelectors';

function makeAnimal(overrides: Partial<AnimalListItem>): AnimalListItem {
    return {
        id: 1,
        name: 'Rex',
        species: 'dog',
        breed: null,
        age_months: null,
        sex: null,
        photo_url: 'https://example.com/photo.png',
        status: 'available',
        created_at: '2026-01-01T00:00:00Z',
        ...overrides,
    };
}

function makeEvent(overrides: Partial<ShelterEvent>): ShelterEvent {
    return {
        id: 1,
        title: 'Event',
        description: '',
        starts_at: '2026-12-01T10:00:00Z',
        location: 'Kyiv',
        lat: null,
        lng: null,
        cover_url: null,
        created_at: '2026-01-01T00:00:00Z',
        ...overrides,
    };
}

describe('pickFeaturedAnimals', () => {
    it('keeps only available animals, newest first, up to the limit', () => {
        const animals = [
            makeAnimal({ id: 1 }),
            makeAnimal({ id: 2, status: 'adopted' }),
            makeAnimal({ id: 3 }),
            makeAnimal({ id: 4, status: 'reserved' }),
            makeAnimal({ id: 5 }),
        ];

        expect(pickFeaturedAnimals(animals, 2).map((a) => a.id)).toEqual([5, 3]);
    });

    it('does not change the input array', () => {
        const animals = [makeAnimal({ id: 1 }), makeAnimal({ id: 2 })];

        pickFeaturedAnimals(animals, 2);

        expect(animals.map((a) => a.id)).toEqual([1, 2]);
    });
});

describe('pickUpcomingEvents', () => {
    const now = new Date('2026-12-01T00:00:00Z');

    it('drops past events and sorts the rest by start time', () => {
        const events = [
            makeEvent({ id: 1, starts_at: '2026-12-20T10:00:00Z' }),
            makeEvent({ id: 2, starts_at: '2026-11-20T10:00:00Z' }),
            makeEvent({ id: 3, starts_at: '2026-12-05T10:00:00Z' }),
        ];

        expect(pickUpcomingEvents(events, now, 5).map((e) => e.id)).toEqual([3, 1]);
    });

    it('respects the limit', () => {
        const events = [
            makeEvent({ id: 1, starts_at: '2026-12-05T10:00:00Z' }),
            makeEvent({ id: 2, starts_at: '2026-12-06T10:00:00Z' }),
        ];

        expect(pickUpcomingEvents(events, now, 1).map((e) => e.id)).toEqual([1]);
    });
});
