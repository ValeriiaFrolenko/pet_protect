import { useState } from 'react';
import type { GalleryItem } from './galleryItems';
import { GalleryLightbox } from './GalleryLightbox';
import { GalleryTile } from './GalleryTile';

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <>
            <ul className="gallery">
                {items.map((item, index) => (
                    <li key={item.id}>
                        <GalleryTile item={item} onOpen={() => setActiveIndex(index)} />
                    </li>
                ))}
            </ul>
            <GalleryLightbox
                items={items}
                index={activeIndex}
                onIndexChange={setActiveIndex}
                onClose={() => setActiveIndex(null)}
            />
        </>
    );
}
