import { ConfirmButton } from '../../components/ConfirmButton';
import { useCancelAdoptionRequest } from '../../hooks/useAdoption';
import type { AdoptionRequest } from '../../types/adoption';
import { describeAdoptionCancelError } from './errorMessages';

export function PendingAdoptionRequest({ request }: { request: AdoptionRequest }) {
    const cancel = useCancelAdoptionRequest();

    return (
        <div className="action">
            <span className="action__note">Adoption request sent</span>
            <ConfirmButton
                label="Cancel request"
                pendingLabel="Cancelling..."
                isPending={cancel.isPending}
                title="Cancel the adoption request?"
                description="The animal will become available to other people again."
                confirmLabel="Cancel request"
                dismissLabel="Keep request"
                onConfirm={() => cancel.mutate(request.id)}
            />
            {cancel.isError && (
                <span className="form__error">{describeAdoptionCancelError(cancel.error)}</span>
            )}
        </div>
    );
}
