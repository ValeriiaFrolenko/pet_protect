import { Link } from 'react-router-dom';
import { useMyAdoptionRequests } from '../../hooks/useAdoption';
import type { Animal } from '../../types/animal';
import { AdoptionRequestForm } from './AdoptionRequestForm';
import { PendingAdoptionRequest } from './PendingAdoptionRequest';

export function AdoptionAction({ animal }: { animal: Animal }) {
    const { data: requests, isPending, isError, error } = useMyAdoptionRequests();

    if (isPending) {
        return <span className="action__note">Loading...</span>;
    }

    if (isError) {
        return <span className="form__error">{error.message}</span>;
    }

    const pendingRequest = requests.find((request) => request.status === 'pending');

    if (pendingRequest?.animal_id === animal.id) {
        return <PendingAdoptionRequest request={pendingRequest} />;
    }

    if (pendingRequest) {
        return (
            <span className="action__note">
                You already have a pending request for{' '}
                <Link to={`/animals/${pendingRequest.animal_id}`}>another animal</Link>. Cancel it
                to send a new one.
            </span>
        );
    }

    if (animal.status !== 'available') {
        return (
            <button type="button" className="button" disabled>
                Not available for adoption
            </button>
        );
    }

    return <AdoptionRequestForm animal={animal} />;
}
