import type { AdoptionRequest } from './adoption';
import type { Animal } from './animal';
import type { ShelterEvent } from './event';

export type AnimalInput = Omit<Animal, 'id' | 'created_at'>;

export type EventInput = Omit<ShelterEvent, 'id' | 'created_at'>;

export type AdoptionDecision = 'approved' | 'rejected';

export interface AdminAdoptionRequest extends AdoptionRequest {
    requester_email: string;
    animal: { name: string } | null;
}

export interface DecideRequestInput {
    requestId: number;
    decision: AdoptionDecision;
}
