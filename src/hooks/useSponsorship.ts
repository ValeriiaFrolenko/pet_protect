import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    cancelSponsorship,
    createSponsorship,
    fetchMySponsorships,
} from '../repositories/sponsorshipRepository';
import { useAuth } from '../features/auth/useAuth';
import type { AppError } from '../lib/errors';
import type { CreateSponsorshipInput, Sponsorship } from '../types/sponsorship';

export const sponsorshipKeys = {
    all: ['sponsorships'] as const,
    mine: (userId: string | undefined) => ['sponsorships', userId] as const,
};

export function useMySponsorships() {
    const { user } = useAuth();

    return useQuery<Sponsorship[], AppError>({
        queryKey: sponsorshipKeys.mine(user?.id),
        queryFn: fetchMySponsorships,
        enabled: Boolean(user),
    });
}

export function useCreateSponsorship() {
    const queryClient = useQueryClient();

    return useMutation<Sponsorship, AppError, CreateSponsorshipInput>({
        mutationFn: createSponsorship,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: sponsorshipKeys.all });
        },
    });
}

export function useCancelSponsorship() {
    const queryClient = useQueryClient();

    return useMutation<Sponsorship, AppError, number>({
        mutationFn: cancelSponsorship,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: sponsorshipKeys.all });
        },
    });
}