import type { ShelterEvent } from '../../types/event';

export interface EventGroups {
    upcoming: ShelterEvent[];
    past: ShelterEvent[];
}

// Upcoming events go from the nearest one, past events from the most recent one.
export function splitEvents(events: readonly ShelterEvent[], now: Date): EventGroups {
    const time = (event: ShelterEvent) => new Date(event.starts_at).getTime();
    const sorted = [...events].sort((a, b) => time(a) - time(b));

    return {
        upcoming: sorted.filter((event) => time(event) >= now.getTime()),
        past: sorted.filter((event) => time(event) < now.getTime()).reverse(),
    };
}
