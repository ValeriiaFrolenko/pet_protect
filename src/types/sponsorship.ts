export interface Sponsorship {
    id: number;
    animal_id: number;
    user_id: string;
    monthly_amount: number;
    active: boolean;
    created_at: string;
}

export interface CreateSponsorshipInput {
    animalId: number;
    monthlyAmount: number;
}