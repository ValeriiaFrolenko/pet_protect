import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import {
    fetchNotifications,
    markAllNotificationsRead,
    markNotificationRead,
} from '../repositories/notificationsRepository';
import { useAuth } from '../features/auth/useAuth';
import type { AppError } from '../lib/errors';
import type { AppNotification } from '../types/notification';

export const notificationsKeys = {
    mine: (userId: string | undefined) => ['notifications', userId] as const,
};

export function useNotifications() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const userId = user?.id;

    const query = useQuery<AppNotification[], AppError>({
        queryKey: notificationsKeys.mine(userId),
        queryFn: fetchNotifications,
        enabled: Boolean(user),
    });

    // New rows arrive through Realtime, so other open tabs and the admin's
    // own session see the badge update without a page reload.
    useEffect(() => {
        if (!userId) {
            return;
        }

        const channel = supabase
            .channel(`notifications:${userId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
                () => {
                    void queryClient.invalidateQueries({ queryKey: notificationsKeys.mine(userId) });
                },
            )
            .subscribe();

        return () => {
            void supabase.removeChannel(channel);
        };
    }, [userId, queryClient]);

    const notifications = query.data ?? [];
    const unreadCount = notifications.filter((item) => item.read_at === null).length;

    return {
        notifications,
        unreadCount,
        isPending: Boolean(user) && query.isPending,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}

export function useMarkNotificationRead() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation<void, AppError, number>({
        mutationFn: markNotificationRead,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: notificationsKeys.mine(user?.id) });
        },
    });
}

export function useMarkAllNotificationsRead() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation<void, AppError, void>({
        mutationFn: markAllNotificationsRead,
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: notificationsKeys.mine(user?.id) });
        },
    });
}
