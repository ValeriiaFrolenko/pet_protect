import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { AdoptionRequest, CreateAdoptionRequestInput } from '../types/adoption';

const COLUMNS = 'id, animal_id, user_id, message, status, created_at';

export async function fetchMyAdoptionRequests(): Promise<AdoptionRequest[]> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select(COLUMNS)
        .order('created_at', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as AdoptionRequest[];
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
