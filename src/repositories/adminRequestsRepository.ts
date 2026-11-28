import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { AdminAdoptionRequest, DecideRequestInput } from '../types/admin';

const COLUMNS =
    'id, animal_id, user_id, requester_email, message, status, created_at, animal:animals(name)';

export async function fetchAdminRequests(): Promise<AdminAdoptionRequest[]> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .select(COLUMNS)
        .order('created_at', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as unknown as AdminAdoptionRequest[];
}

export async function decideRequest({
    requestId,
    decision,
}: DecideRequestInput): Promise<AdminAdoptionRequest> {
    const { data, error } = await supabase
        .from('adoption_requests')
        .update({ status: decision })
        .eq('id', requestId)
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as unknown as AdminAdoptionRequest;
}
