export interface Crumb {
    to: string;
    label: string;
    animalId?: number;
}

const HOME_CRUMB: Crumb = { to: '/', label: 'Home' };

const SECTION_LABELS: ReadonlyMap<string, string> = new Map([
    ['animals', 'Animals'],
    ['events', 'Events'],
    ['gallery', 'Gallery'],
    ['contacts', 'Contacts'],
]);

const ID_PATTERN = /^\d+$/;

export function buildCrumbs(pathname: string): Crumb[] {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) {
        return [HOME_CRUMB];
    }

    const section = segments[0] ?? '';
    const sectionLabel = SECTION_LABELS.get(section);

    if (sectionLabel === undefined) {
        return [];
    }

    const sectionCrumb: Crumb = { to: `/${section}`, label: sectionLabel };

    if (segments.length === 1) {
        return [HOME_CRUMB, sectionCrumb];
    }

    const id = segments[1] ?? '';

    if (section === 'animals' && segments.length === 2 && ID_PATTERN.test(id)) {
        return [HOME_CRUMB, sectionCrumb, { to: `/animals/${id}`, label: 'Animal', animalId: Number(id) }];
    }

    return [];
}