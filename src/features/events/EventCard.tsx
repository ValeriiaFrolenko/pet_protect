import { toOpenStreetMapHref } from '../../lib/contacts';
import { formatDateParts, formatDateTime } from '../../lib/format';
import type { ShelterEvent } from '../../types/event';

export function EventCard({ event }: { event: ShelterEvent }) {
    const date = formatDateParts(event.starts_at);

    return (
        <article className="event-card">
            {event.cover_url ? (
                <img
                    className="event-card__cover"
                    src={event.cover_url}
                    alt=""
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                date && (
                    // The full date is repeated as text below, so the poster is decorative.
                    <div className="event-card__poster" aria-hidden="true">
                        <span className="event-card__day">{date.day}</span>
                        <span className="event-card__month">{date.month}</span>
                    </div>
                )
            )}
            <div className="event-card__body">
                <p className="event-card__date">
                    <time dateTime={event.starts_at}>{formatDateTime(event.starts_at)}</time>
                </p>
                <h3 className="event-card__title">{event.title}</h3>
                <p>{event.description}</p>
                <p className="event-card__meta">
                    {event.location}
                    {event.lat !== null && event.lng !== null && (
                        <>
                            {' · '}
                            <a
                                href={toOpenStreetMapHref(event.lat, event.lng)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Show on map
                            </a>
                        </>
                    )}
                </p>
            </div>
        </article>
    );
}
