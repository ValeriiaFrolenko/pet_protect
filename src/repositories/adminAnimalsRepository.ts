import { supabase } from '../lib/supabase';
import { AppError, toAppError } from '../lib/errors';
import type { AnimalInput } from '../types/admin';
import type { Animal } from '../types/animal';

const COLUMNS =
    'id, name, species, breed, age_months, sex, description, photo_url, status, created_at';

export async function fetchAdminAnimals(): Promise<Animal[]> {
    const { data, error } = await supabase
        .from('animals')
        .select(COLUMNS)
        .order('id', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as Animal[];
}

export async function createAnimal(input: AnimalInput): Promise<Animal> {
    const { data, error } = await supabase.from('animals').insert(input).select(COLUMNS).single();

    if (error) {
        throw toAppError(error);
    }

    return data as Animal;
}

export async function updateAnimal(id: number, input: AnimalInput): Promise<Animal> {
    const { data, error } = await supabase
        .from('animals')
        .update(input)
        .eq('id', id)
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as Animal;
}

export async function deleteAnimal(id: number): Promise<void> {
    const { data, error } = await supabase.from('animals').delete().eq('id', id).select('id');

    if (error) {
        throw toAppError(error);
    }

    // Row Level Security hides rows without an error, so an empty result means nothing was deleted.
    if (data.length === 0) {
        throw new AppError('not_found');
    }
}
