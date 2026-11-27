import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { EventList } from '../features/events/EventList';
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
                <EventList events={data} />
            )}
        </section>
    );
}
