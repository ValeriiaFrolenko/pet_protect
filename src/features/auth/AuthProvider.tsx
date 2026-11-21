import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setIsLoading(false);
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const value = useMemo(
        () => ({ user: session?.user ?? null, isLoading }),
        [session, isLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}