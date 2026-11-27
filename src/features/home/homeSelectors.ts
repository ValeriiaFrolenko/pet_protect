import type { AnimalListItem } from '../../types/animal';
import type { ShelterEvent } from '../../types/event';

export function pickFeaturedAnimals(
    animals: readonly AnimalListItem[],
    count: number,
): AnimalListItem[] {
    return animals
        .filter((animal) => animal.status === 'available')
        .sort((a, b) => b.id - a.id)
        .slice(0, count);
}

export function pickUpcomingEvents(
    events: readonly ShelterEvent[],
    now: Date,
    count: number,
): ShelterEvent[] {
    const nowTime = now.getTime();

    return events
        .filter((event) => new Date(event.starts_at).getTime() >= nowTime)
        .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
        .slice(0, count);
}
