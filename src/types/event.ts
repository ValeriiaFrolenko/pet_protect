export interface ShelterEvent {
    id: number;
    title: string;
    description: string;
    starts_at: string;
    location: string;
    lat: number | null;
    lng: number | null;
    cover_url: string | null;
    created_at: string;
}