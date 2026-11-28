export type NotificationType = 'approved' | 'rejected';

export interface AppNotification {
    id: number;
    animal_id: number;
    type: NotificationType;
    read_at: string | null;
    created_at: string;
    animal: { name: string } | null;
}
