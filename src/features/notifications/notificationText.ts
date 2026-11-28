import type { AppNotification } from '../../types/notification';

export function describeNotification(notification: AppNotification): string {
    const name = notification.animal?.name ?? 'the animal';

    return notification.type === 'approved'
        ? `Your request for ${name} was approved.`
        : `Your request for ${name} was declined.`;
}

export function sortByNewestFirst(
    notifications: readonly AppNotification[],
): AppNotification[] {
    return [...notifications].sort((a, b) => b.created_at.localeCompare(a.created_at));
}
