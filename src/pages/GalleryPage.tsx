import { useMemo } from 'react';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { GalleryGrid } from '../features/gallery/GalleryGrid';
import { toGalleryItems } from '../features/gallery/galleryItems';
import { useAnimals } from '../hooks/useAnimals';

export function GalleryPage() {
    const { data, isPending, isError, error, refetch } = useAnimals();
    const items = useMemo(() => toGalleryItems(data ?? []), [data]);

    if (isError) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (isPending) {
        return <LoadingState />;
    }

    return (
        <section>
            <h1>Gallery</h1>

            {items.length === 0 ? (
                <p className="state">No photos yet.</p>
            ) : (
                <GalleryGrid items={items} />
            )}
        </section>
    );
}
