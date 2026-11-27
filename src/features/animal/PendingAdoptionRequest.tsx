import { useCancelAdoptionRequest } from '../../hooks/useAdoption';
import type { AdoptionRequest } from '../../types/adoption';
import { describeAdoptionCancelError } from './errorMessages';

export function PendingAdoptionRequest({ request }: { request: AdoptionRequest }) {
    const cancel = useCancelAdoptionRequest();

    return (
        <div className="action">
            <span className="action__note">Adoption request sent</span>
            <button
                type="button"
                className="button"
                disabled={cancel.isPending}
                onClick={() => cancel.mutate(request.id)}
            >
                Cancel request
            </button>
            {cancel.isError && (
                <span className="form__error">{describeAdoptionCancelError(cancel.error)}</span>
            )}
        </div>
    );
}
