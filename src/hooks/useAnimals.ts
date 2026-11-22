import { useQuery } from '@tanstack/react-query';
import { fetchAnimalById, fetchAnimals } from '../repositories/animalsRepository';
import type { Animal, AnimalListItem } from '../types/animal';
import type { AppError } from '../lib/errors';

export const animalsKeys = {
    all: ['animals'] as const,
    detail: (id: number) => ['animals', 'detail', id] as const,
};

export function useAnimals() {
    return useQuery<AnimalListItem[], AppError>({
        queryKey: animalsKeys.all,
        queryFn: fetchAnimals,
    });
}

export function useAnimal(id: number) {
    return useQuery<Animal, AppError>({
        queryKey: animalsKeys.detail(id),
        queryFn: () => fetchAnimalById(id),
    });
}