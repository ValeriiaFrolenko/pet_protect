import { FeaturedAnimals } from '../features/home/FeaturedAnimals';
import { HomeIntro } from '../features/home/HomeIntro';
import { UpcomingEvents } from '../features/home/UpcomingEvents';

export function HomePage() {
    return (
        <div className="home">
            <HomeIntro />
            <FeaturedAnimals />
            <UpcomingEvents />
        </div>
    );
}
