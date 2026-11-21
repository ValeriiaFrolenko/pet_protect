import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../repositories/eventsRepository';
import type { ShelterEvent } from '../types/event';
import type { AppError } from '../lib/errors';

export const eventsKeys = {
    all: ['events'] as const,
};

export function useEvents() {
    return useQuery<ShelterEvent[], AppError>({
        queryKey: eventsKeys.all,
        queryFn: fetchEvents,
    });
}