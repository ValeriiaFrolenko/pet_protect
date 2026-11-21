import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { ShelterEvent } from '../types/event';

const COLUMNS = 'id, title, description, starts_at, location, lat, lng, cover_url, created_at';

export async function fetchEvents(): Promise<ShelterEvent[]> {
    const { data, error } = await supabase
        .from('events')
        .select(COLUMNS)
        .order('starts_at');

    if (error) {
        throw toAppError(error);
    }

    return data as ShelterEvent[];
}