import { supabase } from '../lib/supabase';
import { toAppError } from '../lib/errors';
import type { AppNotification } from '../types/notification';

const COLUMNS = 'id, animal_id, type, read_at, created_at, animal:animals(name)';
const RECENT_LIMIT = 20;

export async function fetchNotifications(): Promise<AppNotification[]> {
    const { data, error } = await supabase
        .from('notifications')
        .select(COLUMNS)
        .order('created_at', { ascending: false })
        .limit(RECENT_LIMIT);

    if (error) {
        throw toAppError(error);
    }

    return data as unknown as AppNotification[];
}

export async function markNotificationRead(notificationId: number): Promise<void> {
    const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId)
        .is('read_at', null);

    if (error) {
        throw toAppError(error);
    }
}

export async function markAllNotificationsRead(): Promise<void> {
    const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .is('read_at', null);

    if (error) {
        throw toAppError(error);
    }
}
