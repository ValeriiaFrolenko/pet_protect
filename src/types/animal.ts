export type Species = 'dog' | 'cat' | 'other';
export type AnimalStatus = 'available' | 'reserved' | 'adopted';
export type Sex = 'male' | 'female';

export interface Animal {
    id: number;
    name: string;
    species: Species;
    breed: string | null;
    age_months: number | null;
    sex: Sex | null;
    description: string;
    photo_url: string;
    status: AnimalStatus;
    created_at: string;
}

export type AnimalListItem = Omit<Animal, 'description'>;