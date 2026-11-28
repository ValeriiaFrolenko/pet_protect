import type { NavItem } from './navigation';

// The side menu is a catalog navigator: it only holds filter combinations.
// Site sections (Home, Events, Gallery, Contacts) live in the main menu.
const SPECIES: readonly { label: string; value: string }[] = [
    { label: 'Dogs', value: 'dog' },
    { label: 'Cats', value: 'cat' },
    { label: 'Other', value: 'other' },
];

function statusGroup(label: string, status: string): NavItem {
    return {
        label,
        to: `/animals?status=${status}`,
        children: SPECIES.map((species) => ({
            label: species.label,
            to: `/animals?status=${status}&species=${species.value}`,
        })),
    };
}

export const SIDE_NAV: readonly NavItem[] = [
    {
        label: 'Find a pet',
        to: '/animals',
        children: [
            statusGroup('Available', 'available'),
            statusGroup('Reserved', 'reserved'),
            statusGroup('Adopted', 'adopted'),
        ],
    },
];
