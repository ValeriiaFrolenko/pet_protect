import { supabase } from '../../lib/supabase';
import { AppError } from '../../lib/errors';

export async function signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        // Return to the page where the user started, not to the home page.
        options: { redirectTo: `${window.location.origin}${window.location.pathname}` },
    });

    if (error) {
        throw new AppError('unknown', error);
    }
}

export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new AppError('unknown', error);
    }
}
