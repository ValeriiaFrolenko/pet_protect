export interface NavItem {
    label: string;
    to: string;
    children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
    { label: 'Home', to: '/' },
    {
        label: 'Animals',
        to: '/animals',
        children: [
            { label: 'All animals', to: '/animals' },
            { label: 'Dogs', to: '/animals?species=dog' },
            { label: 'Cats', to: '/animals?species=cat' },
            { label: 'Other', to: '/animals?species=other' },
        ],
    },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contacts', to: '/contacts' },
];