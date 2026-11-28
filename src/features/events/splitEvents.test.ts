import { describe, expect, it } from 'vitest';
import type { ShelterEvent } from '../../types/event';
import { splitEvents } from './splitEvents';

function makeEvent(id: number, startsAt: string): ShelterEvent {
    return {
        id,
        title: 'Event',
        description: '',
        starts_at: startsAt,
        location: 'Kyiv',
        lat: null,
        lng: null,
        cover_url: null,
        created_at: '2026-01-01T00:00:00Z',
    };
}

describe('splitEvents', () => {
    it('separates past events and orders both groups from the closest date', () => {
        const events = [
            makeEvent(1, '2026-12-20T10:00:00Z'),
            makeEvent(2, '2026-10-01T10:00:00Z'),
            makeEvent(3, '2026-12-05T10:00:00Z'),
            makeEvent(4, '2026-11-01T10:00:00Z'),
        ];

        const groups = splitEvents(events, new Date('2026-12-01T00:00:00Z'));

        expect(groups.upcoming.map((event) => event.id)).toEqual([3, 1]);
        expect(groups.past.map((event) => event.id)).toEqual([4, 2]);
    });
});
