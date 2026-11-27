import { describe, expect, it } from 'vitest';
import type { NavItem } from '../app/navigation';
import { containsActiveItem, isNavItemActive } from './navigation';

describe('isNavItemActive', () => {
    it('requires the same path', () => {
        expect(isNavItemActive('/events', '/events', '')).toBe(true);
        expect(isNavItemActive('/events', '/gallery', '')).toBe(false);
    });

    it('ignores display params such as page, q and sort', () => {
        expect(isNavItemActive('/animals', '/animals', '?page=2&q=rex&sort=name')).toBe(true);
        expect(isNavItemActive('/animals?status=available', '/animals', '?status=available&page=3')).toBe(
            true,
        );
    });

    it('does not mark the unfiltered item active when a filter is set', () => {
        expect(isNavItemActive('/animals', '/animals', '?species=dog')).toBe(false);
    });

    it('matches filtered items only on the exact filter', () => {
        expect(isNavItemActive('/animals?species=dog', '/animals', '?species=dog')).toBe(true);
        expect(isNavItemActive('/animals?species=dog', '/animals', '?species=cat')).toBe(false);
        expect(
            isNavItemActive('/animals?species=dog', '/animals', '?species=dog&status=adopted'),
        ).toBe(false);
    });
});

describe('containsActiveItem', () => {
    const tree: NavItem = {
        label: 'Animals',
        to: '/animals',
        children: [
            {
                label: 'By status',
                to: '/animals',
                children: [{ label: 'Adopted', to: '/animals?status=adopted' }],
            },
        ],
    };

    it('finds an active item at any depth', () => {
        expect(containsActiveItem(tree, '/animals', '?status=adopted')).toBe(true);
    });

    it('returns false when nothing in the tree is active', () => {
        expect(containsActiveItem(tree, '/events', '')).toBe(false);
    });
});
