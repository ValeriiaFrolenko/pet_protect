export type AdoptionRequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface AdoptionRequest {
    id: number;
    animal_id: number;
    user_id: string;
    message: string;
    status: AdoptionRequestStatus;
    created_at: string;
}

export interface CreateAdoptionRequestInput {
    animalId: number;
    message: string;
}