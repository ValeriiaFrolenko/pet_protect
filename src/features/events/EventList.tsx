import type { ShelterEvent } from '../../types/event';
import { EventCard } from './EventCard';

export function EventList({ events }: { events: readonly ShelterEvent[] }) {
    return (
        <ul className="events__list">
            {events.map((event) => (
                <li key={event.id}>
                    <EventCard event={event} />
                </li>
            ))}
        </ul>
    );
}
