import { describe, expect, it } from 'vitest';
import { buildCrumbs } from './breadcrumbs';

const HOME = { to: '/', label: 'Home' };
const ANIMALS = { to: '/animals', label: 'Animals' };

describe('buildCrumbs', () => {
    it('returns only home for the root path', () => {
        expect(buildCrumbs('/')).toEqual([HOME]);
    });

    it('builds a two-level trail for a section', () => {
        expect(buildCrumbs('/animals')).toEqual([HOME, ANIMALS]);
        expect(buildCrumbs('/contacts')).toEqual([HOME, { to: '/contacts', label: 'Contacts' }]);
    });

    it('ignores a trailing slash', () => {
        expect(buildCrumbs('/animals/')).toEqual([HOME, ANIMALS]);
    });

    it('builds a three-level trail for an animal page', () => {
        expect(buildCrumbs('/animals/5')).toEqual([
            HOME,
            ANIMALS,
            { to: '/animals/5', label: 'Animal', animalId: 5 },
        ]);
    });

    it('returns no crumbs for an invalid animal id', () => {
        expect(buildCrumbs('/animals/abc')).toEqual([]);
        expect(buildCrumbs('/animals/5/extra')).toEqual([]);
    });

    it('returns no crumbs for unknown paths', () => {
        expect(buildCrumbs('/unknown')).toEqual([]);
        expect(buildCrumbs('/constructor')).toEqual([]);
    });
});