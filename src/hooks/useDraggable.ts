import { useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { clamp, isDragMovement, type Offset } from '../lib/drag';

interface DragSession {
    start: Offset;
    origin: Offset;
    min: Offset;
    max: Offset;
    moved: boolean;
}

/**
 * Lets the user move an element with a mouse or a pen inside `boundsSelector`.
 * Touch input is ignored on purpose, so a swipe over the element still scrolls the page.
 */
export function useDraggable(boundsSelector: string) {
    const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const session = useRef<DragSession | null>(null);
    const suppressClick = useRef(false);

    const onPointerDown = (event: PointerEvent<HTMLElement>) => {
        suppressClick.current = false;
        const bounds = event.currentTarget.closest(boundsSelector)?.getBoundingClientRect();

        if (!bounds || event.pointerType === 'touch' || event.button !== 0) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        session.current = {
            start: { x: event.clientX, y: event.clientY },
            origin: offset,
            min: { x: offset.x + bounds.left - rect.left, y: offset.y + bounds.top - rect.top },
            max: {
                x: offset.x + bounds.right - rect.right,
                y: offset.y + bounds.bottom - rect.bottom,
            },
            moved: false,
        };
    };

    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        const drag = session.current;

        if (!drag) {
            return;
        }

        const point = { x: event.clientX, y: event.clientY };

        if (!drag.moved) {
            if (!isDragMovement(drag.start, point)) {
                return;
            }
            drag.moved = true;
            suppressClick.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsDragging(true);
        }

        setOffset({
            x: clamp(drag.origin.x + point.x - drag.start.x, drag.min.x, drag.max.x),
            y: clamp(drag.origin.y + point.y - drag.start.y, drag.min.y, drag.max.y),
        });
    };

    const stop = () => {
        session.current = null;
        setIsDragging(false);
    };

    // A drag that ends over a link must not open that link.
    const onClickCapture = (event: MouseEvent<HTMLElement>) => {
        if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
        }
    };

    return {
        offset,
        isDragging,
        handlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp: stop,
            onPointerCancel: stop,
            onLostPointerCapture: stop,
            onClickCapture,
        },
    };
}
