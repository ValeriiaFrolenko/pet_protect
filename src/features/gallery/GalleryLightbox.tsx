import { useEffect, useEffectEvent } from 'react';
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

    const count = items.length;
    const show = (delta: number) => {
        if (index !== null) {
            onIndexChange(shiftIndex(index, delta, count));
        }
    };

    // Focus may be anywhere in the dialog, so the arrow keys are handled on the document.
    const handleArrowKey = useEffectEvent((event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            show(-1);
        } else if (event.key === 'ArrowRight') {
            show(1);
        }
    });

    const isOpen = item !== null;

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const listener = (event: KeyboardEvent) => handleArrowKey(event);
        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    }, [isOpen]);

    return (
        <Modal open={item !== null} title={item?.caption ?? ''} onClose={onClose}>
            {item && index !== null && (
                <figure className="lightbox">
                    <img className="lightbox__image" src={item.src} alt={item.caption} />
                    <figcaption className="lightbox__bar">
                        <button
                            type="button"
                            className="button"
                            onClick={() => show(-1)}
                        >
                            Previous
                        </button>
                        <Link className="button" to={item.href}>
                            View profile
                        </Link>
                        <button
                            type="button"
                            className="button"
                            onClick={() => show(1)}
                        >
                            Next
                        </button>
                    </figcaption>
                </figure>
            )}
        </Modal>
    );
}
