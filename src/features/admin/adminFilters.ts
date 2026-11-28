import type { AdminAdoptionRequest } from '../../types/admin';
import type { AdoptionRequestStatus } from '../../types/adoption';
import type { Animal } from '../../types/animal';
import type { ShelterEvent } from '../../types/event';

function includesQuery(query: string, ...fields: (string | null)[]): boolean {
    return fields.some((field) => (field ?? '').toLowerCase().includes(query));
}

export function filterAnimals(animals: readonly Animal[], search: string): Animal[] {
    const query = search.trim().toLowerCase();

    return animals.filter((animal) => query === '' || includesQuery(query, animal.name, animal.breed));
}

// The newest events come first.
export function filterEvents(events: readonly ShelterEvent[], search: string): ShelterEvent[] {
    const query = search.trim().toLowerCase();

    return events
        .filter((event) => query === '' || includesQuery(query, event.title, event.location))
        .sort((a, b) => b.starts_at.localeCompare(a.starts_at));
}

export type RequestFilter = AdoptionRequestStatus | 'all';

export function filterRequests(
    requests: readonly AdminAdoptionRequest[],
    status: RequestFilter,
): AdminAdoptionRequest[] {
    return requests.filter((request) => status === 'all' || request.status === status);
}
