import { FeaturedAnimals } from '../features/home/FeaturedAnimals';
import { HomeIntro } from '../features/home/HomeIntro';
import { SponsorBanner } from '../features/home/SponsorBanner';
import { UpcomingEvents } from '../features/home/UpcomingEvents';
import { WhyItMatters } from '../features/home/WhyItMatters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
    useDocumentTitle();

    return (
        <div className="home">
            <HomeIntro />
            <FeaturedAnimals />
            <WhyItMatters />
            <SponsorBanner />
            <UpcomingEvents />
        </div>
    );
}
