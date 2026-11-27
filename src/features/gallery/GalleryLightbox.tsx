import { Link } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { shiftIndex } from '../../lib/slider';
import type { GalleryItem } from './galleryItems';

interface GalleryLightboxProps {
    items: readonly GalleryItem[];
    index: number | null;
    onIndexChange: (index: number) => void;
    onClose: () => void;
}

export function GalleryLightbox({ items, index, onIndexChange, onClose }: GalleryLightboxProps) {
    const item = index === null ? null : (items[index] ?? null);

    return (
        <Modal open={item !== null} title={item?.caption ?? ''} onClose={onClose}>
            {item && index !== null && (
                <figure className="lightbox">
                    <img className="lightbox__image" src={item.src} alt={item.caption} />
                    <figcaption className="lightbox__bar">
                        <button
                            type="button"
                            className="button"
                            onClick={() => onIndexChange(shiftIndex(index, -1, items.length))}
                        >
                            Previous
                        </button>
                        <Link className="button" to={item.href}>
                            View profile
                        </Link>
                        <button
                            type="button"
                            className="button"
                            onClick={() => onIndexChange(shiftIndex(index, 1, items.length))}
                        >
                            Next
                        </button>
                    </figcaption>
                </figure>
            )}
        </Modal>
    );
}
