import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createAdoptionRequest,
    fetchMyAdoptionRequests,
} from '../repositories/adoptionRepository';
import { useAuth } from '../features/auth/useAuth';
import { animalsKeys } from './useAnimals';
import type { AppError } from '../lib/errors';
import type { AdoptionRequest, CreateAdoptionRequestInput } from '../types/adoption';

export const adoptionKeys = {
    all: ['adoption-requests'] as const,
    mine: (userId: string | undefined) => ['adoption-requests', userId] as const,
};

export function useMyAdoptionRequests() {
    const { user } = useAuth();

    return useQuery<AdoptionRequest[], AppError>({
        queryKey: adoptionKeys.mine(user?.id),
        queryFn: fetchMyAdoptionRequests,
        enabled: Boolean(user),
    });
}

export function useCreateAdoptionRequest() {
    const queryClient = useQueryClient();

    return useMutation<AdoptionRequest, AppError, CreateAdoptionRequestInput>({
        mutationFn: createAdoptionRequest,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: animalsKeys.all });
            void queryClient.invalidateQueries({ queryKey: adoptionKeys.all });
        },
    });
}