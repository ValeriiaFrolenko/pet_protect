import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { EventCard } from '../features/events/EventCard';
import { useEvents } from '../hooks/useEvents';

export function EventsPage() {
    const { data, isPending, isError, error, refetch } = useEvents();

    if (isError) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (isPending) {
        return <LoadingState />;
    }

    return (
        <section>
            <h1>Events</h1>

            {data.length === 0 ? (
                <p className="state">No events planned yet.</p>
            ) : (
                <ul className="events__list">
                    {data.map((event) => (
                        <li key={event.id}>
                            <EventCard event={event} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
