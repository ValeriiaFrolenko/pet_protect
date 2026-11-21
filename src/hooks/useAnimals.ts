import { useQuery } from '@tanstack/react-query';
import { fetchAnimals } from '../repositories/animalsRepository';
import type { AnimalListItem } from '../types/animal';
import type { AppError } from '../lib/errors';

export const animalsKeys = {
    all: ['animals'] as const,
};

export function useAnimals() {
    return useQuery<AnimalListItem[], AppError>({
        queryKey: animalsKeys.all,
        queryFn: fetchAnimals,
    });
}