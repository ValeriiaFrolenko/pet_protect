import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAnimal, deleteAnimal, fetchAdminAnimals, updateAnimal } from '../repositories/adminAnimalsRepository';
import { uploadPhoto } from '../repositories/photoRepository';
import { animalsKeys } from './useAnimals';
import type { AppError } from '../lib/errors';
import type { AnimalInput } from '../types/admin';
import type { Animal } from '../types/animal';

export const adminAnimalsKey = [...animalsKeys.all, 'admin'] as const;

export interface SaveAnimalRequest {
    id: number | null;
    input: AnimalInput;
    photo: File | null;
}

export function useAdminAnimals() {
    return useQuery<Animal[], AppError>({
        queryKey: adminAnimalsKey,
        queryFn: fetchAdminAnimals,
    });
}

function useRefreshAnimals() {
    const queryClient = useQueryClient();

    // The key of the admin list starts with the key of the public lists, so one call refreshes both.
    return () => {
        void queryClient.invalidateQueries({ queryKey: animalsKeys.all });
    };
}

export function useSaveAnimal() {
    return useMutation<Animal, AppError, SaveAnimalRequest>({
        mutationFn: async ({ id, input, photo }) => {
            const photoUrl = photo ? await uploadPhoto('animals', photo) : input.photo_url;
            const record = { ...input, photo_url: photoUrl };

            return id === null ? createAnimal(record) : updateAnimal(id, record);
        },
        onSettled: useRefreshAnimals(),
    });
}

export function useDeleteAnimal() {
    return useMutation<void, AppError, number>({
        mutationFn: deleteAnimal,
        onSettled: useRefreshAnimals(),
    });
}
