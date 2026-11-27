import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useEvents } from '../../hooks/useEvents';
import { EventList } from '../events/EventList';
import { pickUpcomingEvents } from './homeSelectors';

const UPCOMING_COUNT = 3;

export function UpcomingEvents() {
    const { data, isPending, isError, error, refetch } = useEvents();
    const [now] = useState(() => new Date());
    const upcoming = useMemo(
        () => pickUpcomingEvents(data ?? [], now, UPCOMING_COUNT),
        [data, now],
    );

    return (
        <section className="home-section">
            <div className="home-section__header">
                <h2>Upcoming events</h2>
                <Link to="/events">All events</Link>
            </div>

            {isError ? (
                <ErrorState message={error.message} onRetry={() => void refetch()} />
            ) : isPending ? (
                <LoadingState />
            ) : upcoming.length === 0 ? (
                <p className="state">No upcoming events yet.</p>
            ) : (
                <EventList events={upcoming} />
            )}
        </section>
    );
}
