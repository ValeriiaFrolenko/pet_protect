import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    cancelAdoptionRequest,
    createAdoptionRequest,
    fetchMyAdoptionRequests,
    fetchMyAdoptionRequestsWithAnimal,
} from '../repositories/adoptionRepository';
import { useAuth } from '../features/auth/useAuth';
import { animalsKeys } from './useAnimals';
import type { AppError } from '../lib/errors';
import type {
    AdoptionRequest,
    AdoptionRequestWithAnimal,
    CreateAdoptionRequestInput,
} from '../types/adoption';

export const adoptionKeys = {
    all: ['adoption-requests'] as const,
    mine: (userId: string | undefined) => ['adoption-requests', userId] as const,
    mineWithAnimal: (userId: string | undefined) =>
        ['adoption-requests', userId, 'with-animal'] as const,
};

export function useMyAdoptionRequests() {
    const { user } = useAuth();

    return useQuery<AdoptionRequest[], AppError>({
        queryKey: adoptionKeys.mine(user?.id),
        queryFn: () => {
            if (!user) {
                throw new Error('Not authenticated');
            }

            return fetchMyAdoptionRequests(user.id);
        },
        enabled: Boolean(user),
    });
}

export function useMyAdoptionRequestsWithAnimal() {
    const { user } = useAuth();

    return useQuery<AdoptionRequestWithAnimal[], AppError>({
        queryKey: adoptionKeys.mineWithAnimal(user?.id),
        queryFn: () => {
            if (!user) {
                throw new Error('Not authenticated');
            }

            return fetchMyAdoptionRequestsWithAnimal(user.id);
        },
        enabled: Boolean(user),
    });
}

function useRefreshAdoptionData() {
    const queryClient = useQueryClient();

    return () => {
        void queryClient.invalidateQueries({ queryKey: animalsKeys.all });
        void queryClient.invalidateQueries({ queryKey: adoptionKeys.all });
    };
}

export function useCreateAdoptionRequest() {
    return useMutation<AdoptionRequest, AppError, CreateAdoptionRequestInput>({
        mutationFn: createAdoptionRequest,
        onSettled: useRefreshAdoptionData(),
    });
}

export function useCancelAdoptionRequest() {
    return useMutation<AdoptionRequest, AppError, number>({
        mutationFn: cancelAdoptionRequest,
        onSettled: useRefreshAdoptionData(),
    });
}
