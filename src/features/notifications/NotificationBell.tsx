import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useNotifications,
} from '../../hooks/useNotifications';
import { formatDateTime } from '../../lib/format';
import { describeNotification, sortByNewestFirst } from './notificationText';

export function NotificationBell() {
    const { notifications, unreadCount, isPending, isError } = useNotifications();
    const markRead = useMarkNotificationRead();
    const markAllRead = useMarkAllNotificationsRead();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isOpen]);

    if (isPending || isError) {
        return null;
    }

    const sorted = sortByNewestFirst(notifications);

    return (
        <div className="notification-bell" ref={containerRef}>
            <button
                type="button"
                className="notification-bell__toggle"
                aria-expanded={isOpen}
                aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : 'Notifications'}
                onClick={() => setIsOpen((open) => !open)}
            >
                🔔
                {unreadCount > 0 && <span className="notification-bell__badge">{unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="notification-bell__panel">
                    <div className="notification-bell__header">
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                className="button button--quiet notification-bell__mark-all"
                                disabled={markAllRead.isPending}
                                onClick={() => markAllRead.mutate()}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {sorted.length === 0 ? (
                        <p className="notification-bell__empty">No notifications yet.</p>
                    ) : (
                        <ul className="notification-bell__list">
                            {sorted.map((notification) => {
                                const isUnread = notification.read_at === null;

                                return (
                                    <li
                                        key={notification.id}
                                        className={
                                            isUnread
                                                ? 'notification-bell__item notification-bell__item--unread'
                                                : 'notification-bell__item'
                                        }
                                    >
                                        <Link
                                            to={`/animals/${notification.animal_id}`}
                                            onClick={() => {
                                                setIsOpen(false);
                                                if (isUnread) {
                                                    markRead.mutate(notification.id);
                                                }
                                            }}
                                        >
                                            {describeNotification(notification)}
                                        </Link>
                                        <time
                                            className="notification-bell__time"
                                            dateTime={notification.created_at}
                                        >
                                            {formatDateTime(notification.created_at)}
                                        </time>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
