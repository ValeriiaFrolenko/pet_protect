import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent, deleteEvent, updateEvent } from '../repositories/adminEventsRepository';
import { uploadPhoto } from '../repositories/photoRepository';
import { eventsKeys } from './useEvents';
import type { AppError } from '../lib/errors';
import type { EventInput } from '../types/admin';
import type { ShelterEvent } from '../types/event';

export interface SaveEventRequest {
    id: number | null;
    input: EventInput;
    photo: File | null;
}

function useRefreshEvents() {
    const queryClient = useQueryClient();

    return () => {
        void queryClient.invalidateQueries({ queryKey: eventsKeys.all });
    };
}

export function useSaveEvent() {
    return useMutation<ShelterEvent, AppError, SaveEventRequest>({
        mutationFn: async ({ id, input, photo }) => {
            const coverUrl = photo ? await uploadPhoto('events', photo) : input.cover_url;
            const record = { ...input, cover_url: coverUrl };

            return id === null ? createEvent(record) : updateEvent(id, record);
        },
        onSettled: useRefreshEvents(),
    });
}

export function useDeleteEvent() {
    return useMutation<void, AppError, number>({
        mutationFn: deleteEvent,
        onSettled: useRefreshEvents(),
    });
}
