import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { decideRequest, fetchAdminRequests } from '../repositories/adminRequestsRepository';
import { adoptionKeys } from './useAdoption';
import { animalsKeys } from './useAnimals';
import type { AppError } from '../lib/errors';
import type { AdminAdoptionRequest, DecideRequestInput } from '../types/admin';

// Starts with the key of the user's own requests, so a decision refreshes both lists.
export const adminRequestsKey = [...adoptionKeys.all, 'admin'] as const;

export function useAdminRequests() {
    return useQuery<AdminAdoptionRequest[], AppError>({
        queryKey: adminRequestsKey,
        queryFn: fetchAdminRequests,
    });
}

export function useDecideRequest() {
    const queryClient = useQueryClient();

    return useMutation<AdminAdoptionRequest, AppError, DecideRequestInput>({
        mutationFn: decideRequest,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: adoptionKeys.all });
            void queryClient.invalidateQueries({ queryKey: animalsKeys.all });
        },
    });
}
