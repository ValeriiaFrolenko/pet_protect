import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../features/auth/useAuth';
import { fetchIsAdmin } from '../repositories/adminRepository';
import type { AppError } from '../lib/errors';

export const adminKeys = {
    isAdmin: (userId: string | undefined) => ['admin', 'is-admin', userId] as const,
};

export function useIsAdmin() {
    const { user } = useAuth();
    const userId = user?.id ?? '';

    const query = useQuery<boolean, AppError>({
        queryKey: adminKeys.isAdmin(user?.id),
        queryFn: () => fetchIsAdmin(userId),
        enabled: Boolean(user),
    });

    return {
        isAdmin: query.data === true,
        // A query that is disabled stays pending, so it counts as loading only for a signed-in user.
        isLoading: Boolean(user) && query.isPending,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}
