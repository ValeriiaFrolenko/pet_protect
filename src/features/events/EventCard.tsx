import { formatDateTime } from '../../lib/format';
import type { ShelterEvent } from '../../types/event';

export function EventCard({ event }: { event: ShelterEvent }) {
    return (
        <article className="event-card">
            {event.cover_url && (
                <img
                    className="event-card__cover"
                    src={event.cover_url}
                    alt=""
                    width={600}
                    height={400}
                    loading="lazy"
                />
            )}
            <div className="event-card__body">
                <h2 className="event-card__title">{event.title}</h2>
                <p className="event-card__meta">
                    <time dateTime={event.starts_at}>{formatDateTime(event.starts_at)}</time> ·{' '}
                    {event.location}
                </p>
                <p>{event.description}</p>
            </div>
        </article>
    );
}
