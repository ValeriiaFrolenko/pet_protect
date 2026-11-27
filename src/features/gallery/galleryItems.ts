import type { AnimalListItem } from '../../types/animal';

export interface GalleryItem {
    id: number;
    src: string;
    caption: string;
    href: string;
}

export function toGalleryItems(animals: readonly AnimalListItem[]): GalleryItem[] {
    return animals.map((animal) => ({
        id: animal.id,
        src: animal.photo_url,
        caption: animal.name,
        href: `/animals/${animal.id}`,
    }));
}
