import { useMemo, useState } from 'react';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { EventList } from '../features/events/EventList';
import { splitEvents } from '../features/events/splitEvents';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useEvents } from '../hooks/useEvents';

export function EventsPage() {
    useDocumentTitle('Events');

    const { data, isPending, isError, error, refetch } = useEvents();
    const [now] = useState(() => new Date());
    const { upcoming, past } = useMemo(() => splitEvents(data ?? [], now), [data, now]);

    if (isPending) {
        return <LoadingState />;
    }

    if (isError && !data) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    return (
        <section className="events">
            <h1>Events</h1>

            <h2>Upcoming</h2>
            {upcoming.length === 0 ? (
                <p className="state">No events planned yet.</p>
            ) : (
                <EventList events={upcoming} />
            )}

            {past.length > 0 && (
                <div className="events__past">
                    <h2>Past events</h2>
                    <EventList events={past} />
                </div>
            )}
        </section>
    );
}
