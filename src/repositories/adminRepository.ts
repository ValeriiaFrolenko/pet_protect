import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';

// Row Level Security lets a user read only their own row, so no row means "not an admin".
export async function fetchIsAdmin(userId: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        throw toAppError(error);
    }

    return data !== null;
}
