export interface HeroSlide {
    id: string;
    title: string;
    action: { label: string; to: string };
    theme: 'pink' | 'lavender' | 'sun';
    photos: readonly string[];
}

export const HERO_SLIDES: readonly HeroSlide[] = [
    {
        id: 'adopt',
        title: 'Adopt a friend',
        action: { label: 'Find a pet', to: '/animals?status=available' },
        theme: 'pink',
        photos: ['/img/animals/rex.jpg', '/img/animals/bella.jpg', '/img/animals/max.jpg'],
    },
    {
        id: 'events',
        title: 'Meet us in person',
        action: { label: 'See events', to: '/events' },
        theme: 'lavender',
        photos: ['/img/animals/charlie.jpg', '/img/animals/daisy.jpg', '/img/animals/buddy.jpg'],
    },
    {
        id: 'sponsor',
        title: 'Sponsor an animal',
        action: { label: 'Choose an animal', to: '/animals' },
        theme: 'sun',
        photos: ['/img/animals/luna.jpg', '/img/animals/milo.jpg', '/img/animals/tom.jpg'],
    },
];
