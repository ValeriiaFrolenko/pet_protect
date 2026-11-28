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

export const ADMIN_NAV: NavItem[] = [
    { label: 'Animals', to: '/admin/animals' },
    { label: 'Events', to: '/admin/events' },
    { label: 'Requests', to: '/admin/requests' },
];

export const ADMIN_MENU_ITEM: NavItem = {
    label: 'Admin',
    to: '/admin',
    children: ADMIN_NAV,
};
