import { describe, expect, it } from 'vitest';
import { describeNotification, sortByNewestFirst } from './notificationText';
import type { AppNotification } from '../../types/notification';

function makeNotification(overrides: Partial<AppNotification> = {}): AppNotification {
    return {
        id: 1,
        animal_id: 1,
        type: 'approved',
        read_at: null,
        created_at: '2026-01-01T00:00:00.000Z',
        animal: { name: 'Rex' },
        ...overrides,
    };
}

describe('describeNotification', () => {
    it('describes an approval', () => {
        expect(describeNotification(makeNotification({ type: 'approved' }))).toBe(
            'Your request for Rex was approved.',
        );
    });

    it('describes a rejection', () => {
        expect(describeNotification(makeNotification({ type: 'rejected' }))).toBe(
            'Your request for Rex was declined.',
        );
    });

    it('falls back when the animal is gone', () => {
        expect(describeNotification(makeNotification({ animal: null }))).toBe(
            'Your request for the animal was approved.',
        );
    });
});

describe('sortByNewestFirst', () => {
    it('orders notifications from newest to oldest', () => {
        const older = makeNotification({ id: 1, created_at: '2026-01-01T00:00:00.000Z' });
        const newer = makeNotification({ id: 2, created_at: '2026-02-01T00:00:00.000Z' });

        expect(sortByNewestFirst([older, newer])).toEqual([newer, older]);
    });

    it('does not mutate the input array', () => {
        const older = makeNotification({ id: 1, created_at: '2026-01-01T00:00:00.000Z' });
        const newer = makeNotification({ id: 2, created_at: '2026-02-01T00:00:00.000Z' });
        const input = [older, newer];

        sortByNewestFirst(input);

        expect(input).toEqual([older, newer]);
    });
});
