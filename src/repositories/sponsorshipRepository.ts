import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { CreateSponsorshipInput, Sponsorship } from '../types/sponsorship';

const COLUMNS = 'id, animal_id, user_id, monthly_amount, active, created_at';

export async function fetchMySponsorships(): Promise<Sponsorship[]> {
    const { data, error } = await supabase
        .from('sponsorships')
        .select(COLUMNS)
        .order('created_at', { ascending: false });

    if (error) {
        throw toAppError(error);
    }

    return data as Sponsorship[];
}

export async function createSponsorship(input: CreateSponsorshipInput): Promise<Sponsorship> {
    const { data, error } = await supabase
        .from('sponsorships')
        .insert({ animal_id: input.animalId, monthly_amount: input.monthlyAmount })
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as Sponsorship;
}

export async function cancelSponsorship(id: number): Promise<Sponsorship> {
    const { data, error } = await supabase
        .from('sponsorships')
        .update({ active: false })
        .eq('id', id)
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as Sponsorship;
}