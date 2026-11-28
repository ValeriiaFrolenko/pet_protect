export interface Offset {
    x: number;
    y: number;
}

// Pointer movement below this distance is treated as a click, not as a drag.
export const DRAG_THRESHOLD_PX = 5;

export function isDragMovement(from: Offset, to: Offset): boolean {
    return Math.hypot(to.x - from.x, to.y - from.y) > DRAG_THRESHOLD_PX;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
