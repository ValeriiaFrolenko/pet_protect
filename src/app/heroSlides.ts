export interface HeroSlide {
    id: string;
    src: string;
    alt: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
    {
        id: 'adopt',
        src: '/hero/adopt.svg',
        alt: 'Adopt a friend from the shelter',
    },
    {
        id: 'events',
        src: '/hero/events.svg',
        alt: 'Upcoming shelter events',
    },
    {
        id: 'sponsor',
        src: '/hero/sponsor.svg',
        alt: 'Sponsor an animal every month',
    },
];
