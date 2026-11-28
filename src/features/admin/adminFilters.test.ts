import { describe, expect, it } from 'vitest';
import type { AdminAdoptionRequest } from '../../types/admin';
import type { Animal } from '../../types/animal';
import type { ShelterEvent } from '../../types/event';
import { filterAnimals, filterEvents, filterRequests } from './adminFilters';

function animal(id: number, name: string, breed: string | null): Animal {
    return {
        id,
        name,
        species: 'dog',
        breed,
        age_months: null,
        sex: null,
        description: '',
        photo_url: '',
        status: 'available',
        created_at: '',
    };
}

function event(id: number, title: string, location: string, startsAt: string): ShelterEvent {
    return {
        id,
        title,
        description: '',
        starts_at: startsAt,
        location,
        lat: null,
        lng: null,
        cover_url: null,
        created_at: '',
    };
}

function request(id: number, status: AdminAdoptionRequest['status']): AdminAdoptionRequest {
    return {
        id,
        animal_id: 1,
        user_id: 'u',
        requester_email: '',
        message: '',
        status,
        created_at: '',
        animal: null,
    };
}

describe('filterAnimals', () => {
    const animals = [animal(1, 'Rex', 'German Shepherd'), animal(2, 'Luna', null)];

    it('returns everything for an empty search', () => {
        expect(filterAnimals(animals, '  ')).toHaveLength(2);
    });

    it('searches by name and breed without case sensitivity', () => {
        expect(filterAnimals(animals, 'LUNA').map((a) => a.id)).toEqual([2]);
        expect(filterAnimals(animals, 'shepherd').map((a) => a.id)).toEqual([1]);
    });

    it('does not fail on a missing breed', () => {
        expect(filterAnimals(animals, 'xyz')).toEqual([]);
    });
});

describe('filterEvents', () => {
    const events = [
        event(1, 'Charity walk', 'Shevchenko Park', '2026-12-01T10:00:00Z'),
        event(2, 'Adoption day', 'Khreshchatyk', '2026-12-10T10:00:00Z'),
    ];

    it('puts the newest events first', () => {
        expect(filterEvents(events, '').map((e) => e.id)).toEqual([2, 1]);
    });

    it('searches by title and location', () => {
        expect(filterEvents(events, 'park').map((e) => e.id)).toEqual([1]);
        expect(filterEvents(events, 'adoption').map((e) => e.id)).toEqual([2]);
    });

    it('does not change the original list', () => {
        filterEvents(events, '');

        expect(events.map((e) => e.id)).toEqual([1, 2]);
    });
});

describe('filterRequests', () => {
    const requests = [request(1, 'pending'), request(2, 'approved'), request(3, 'pending')];

    it('returns only requests with the chosen status', () => {
        expect(filterRequests(requests, 'pending').map((r) => r.id)).toEqual([1, 3]);
    });

    it('returns all requests for "all"', () => {
        expect(filterRequests(requests, 'all')).toHaveLength(3);
    });
});
