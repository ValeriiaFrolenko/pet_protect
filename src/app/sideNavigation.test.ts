import { describe, expect, it } from 'vitest';
import type { NavItem } from './navigation';
import { SIDE_NAV } from './sideNavigation';

function depthOf(items: readonly NavItem[]): number {
    return items.length === 0
        ? 0
        : 1 + Math.max(...items.map((item) => depthOf(item.children ?? [])));
}

function hasUniqueLabels(items: readonly NavItem[]): boolean {
    const labels = items.map((item) => item.label);

    return (
        new Set(labels).size === labels.length &&
        items.every((item) => hasUniqueLabels(item.children ?? []))
    );
}

describe('SIDE_NAV', () => {
    it('has three nesting levels', () => {
        expect(depthOf(SIDE_NAV)).toBe(3);
    });

    it('has unique labels among siblings (they are used as React keys)', () => {
        expect(hasUniqueLabels(SIDE_NAV)).toBe(true);
    });

    it('only links to the animals catalog', () => {
        const targets: string[] = [];
        const collect = (items: readonly NavItem[]) =>
            items.forEach((item) => {
                targets.push(item.to);
                collect(item.children ?? []);
            });
        collect(SIDE_NAV);

        expect(targets.every((to) => to.startsWith('/animals'))).toBe(true);
    });
});
