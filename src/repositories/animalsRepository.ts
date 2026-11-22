import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { Animal, AnimalListItem } from '../types/animal';

const LIST_COLUMNS =
    'id, name, species, breed, age_months, sex, photo_url, status, created_at';
const DETAIL_COLUMNS = `${LIST_COLUMNS}, description`;

export async function fetchAnimals(): Promise<AnimalListItem[]> {
    const { data, error } = await supabase
        .from('animals')
        .select(LIST_COLUMNS)
        .order('id');

    if (error) {
        throw toAppError(error);
    }

    return data as AnimalListItem[];
}

export async function fetchAnimalById(id: number): Promise<Animal> {
    const { data, error } = await supabase
        .from('animals')
        .select(DETAIL_COLUMNS)
        .eq('id', id)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as Animal;
}