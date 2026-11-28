import { supabase } from '../lib/supabase';
import { AppError, toAppError } from '../lib/errors';
import type { EventInput } from '../types/admin';
import type { ShelterEvent } from '../types/event';

const COLUMNS = 'id, title, description, starts_at, location, lat, lng, cover_url, created_at';

export async function createEvent(input: EventInput): Promise<ShelterEvent> {
    const { data, error } = await supabase.from('events').insert(input).select(COLUMNS).single();

    if (error) {
        throw toAppError(error);
    }

    return data as ShelterEvent;
}

export async function updateEvent(id: number, input: EventInput): Promise<ShelterEvent> {
    const { data, error } = await supabase
        .from('events')
        .update(input)
        .eq('id', id)
        .select(COLUMNS)
        .single();

    if (error) {
        throw toAppError(error);
    }

    return data as ShelterEvent;
}

export async function deleteEvent(id: number): Promise<void> {
    const { data, error } = await supabase.from('events').delete().eq('id', id).select('id');

    if (error) {
        throw toAppError(error);
    }

    if (data.length === 0) {
        throw new AppError('not_found');
    }
}
