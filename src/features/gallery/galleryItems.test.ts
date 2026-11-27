import { describe, expect, it } from 'vitest';
import type { AnimalListItem } from '../../types/animal';
import { toGalleryItems } from './galleryItems';

const animal: AnimalListItem = {
    id: 7,
    name: 'Rex',
    species: 'dog',
    breed: null,
    age_months: null,
    sex: null,
    photo_url: 'https://example.com/rex.png',
    status: 'available',
    created_at: '2026-01-01T00:00:00Z',
};

describe('toGalleryItems', () => {
    it('maps an animal to a gallery item', () => {
        expect(toGalleryItems([animal])).toEqual([
            {
                id: 7,
                src: 'https://example.com/rex.png',
                caption: 'Rex',
                href: '/animals/7',
            },
        ]);
    });

    it('returns an empty list for no animals', () => {
        expect(toGalleryItems([])).toEqual([]);
    });
});
