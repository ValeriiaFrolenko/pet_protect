import type { GalleryItem } from './galleryItems';

interface GalleryTileProps {
    item: GalleryItem;
    onOpen: () => void;
}

export function GalleryTile({ item, onOpen }: GalleryTileProps) {
    return (
        <button
            type="button"
            className="gallery__tile"
            aria-label={`Open photo: ${item.caption}`}
            onClick={onOpen}
        >
            <img
                className="gallery__image"
                src={item.src}
                alt=""
                width={300}
                height={300}
                loading="lazy"
                decoding="async"
            />
        </button>
    );
}
