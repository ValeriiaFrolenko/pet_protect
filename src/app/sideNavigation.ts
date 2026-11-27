import type { NavItem } from './navigation';

export const SIDE_NAV: readonly NavItem[] = [
    {
        label: 'Animals',
        to: '/animals',
        children: [
            { label: 'All animals', to: '/animals' },
            { label: 'Dogs', to: '/animals?species=dog' },
            { label: 'Cats', to: '/animals?species=cat' },
            { label: 'Other', to: '/animals?species=other' },
            {
                label: 'By status',
                to: '/animals',
                children: [
                    { label: 'Available', to: '/animals?status=available' },
                    { label: 'Reserved', to: '/animals?status=reserved' },
                    { label: 'Adopted', to: '/animals?status=adopted' },
                ],
            },
        ],
    },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contacts', to: '/contacts' },
];
