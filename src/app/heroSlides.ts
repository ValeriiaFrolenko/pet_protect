export interface HeroSlide {
    id: string;
    src: string;
    alt: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
    {
        id: 'adopt',
        src: 'https://placehold.co/1600x400/2f3441/f0a04b?text=Adopt+a+friend',
        alt: 'Adopt a friend from the shelter',
    },
    {
        id: 'events',
        src: 'https://placehold.co/1600x400/1c1f27/f0a04b?text=Shelter+events',
        alt: 'Upcoming shelter events',
    },
    {
        id: 'sponsor',
        src: 'https://placehold.co/1600x400/2f3441/e8eaf0?text=Sponsor+an+animal',
        alt: 'Sponsor an animal every month',
    },
];