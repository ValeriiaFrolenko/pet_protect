import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type {
    AdoptionRequest,
    AdoptionRequestWithAnimal,
    CreateAdoptionRequestInput,
} from '../types/adoption';

const COLUMNS = 'id, animal_id, user_id, message, status, created_at';
const COLUMNS_WITH_ANIMAL = `${COLUMNS}, animal:animals(name, photo_url)`;

export async function fetchMyAdoptionRequests(userId: string): Promise<AdoptionRequest[]> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select(COLUMNS)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as AdoptionRequest[];
}

export async function fetchMyAdoptionRequestsWithAnimal(
    userId: string,
): Promise<AdoptionRequestWithAnimal[]> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select(COLUMNS_WITH_ANIMAL)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as unknown as AdoptionRequestWithAnimal[];
}

export async function createAdoptionRequest(
    input: CreateAdoptionRequestInput,
): Promise<AdoptionRequest> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .insert({ animal_id: input.animalId, message: input.message })
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as AdoptionRequest;
}

export async function cancelAdoptionRequest(requestId: number): Promise<AdoptionRequest> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .update({ status: 'cancelled' })
        .eq('id', requestId)
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as AdoptionRequest;
}
