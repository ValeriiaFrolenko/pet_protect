import type { ReactNode } from 'react';
import { useDraggable } from '../../hooks/useDraggable';

export function DraggableCard({ children }: { children: ReactNode }) {
    const { offset, isDragging, handlers } = useDraggable('.friend-board');

    return (
        <li
            className={isDragging ? 'friend-board__item is-dragging' : 'friend-board__item'}
            style={{ translate: `${offset.x}px ${offset.y}px` }}
            // The native link and image drag would take over the pointer.
            onDragStart={(event) => event.preventDefault()}
            {...handlers}
        >
            {children}
        </li>
    );
}
