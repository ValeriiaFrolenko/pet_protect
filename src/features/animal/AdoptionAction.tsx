import { useId, useState, type FormEvent } from 'react';
import { Modal } from '../../components/Modal';
import { useCreateAdoptionRequest, useMyAdoptionRequests } from '../../hooks/useAdoption';
import type { Animal } from '../../types/animal';
import { describeAdoptionError } from './errorMessages';

export function AdoptionAction({ animal }: { animal: Animal }) {
    const messageId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { data: requests, isPending, isError, error } = useMyAdoptionRequests();
    const createRequest = useCreateAdoptionRequest();

    if (isPending) {
        return <span className="action__note">Loading...</span>;
    }

    if (isError) {
        return <span className="form__error">{error.message}</span>;
    }

    const hasPendingRequest = requests.some(
        (request) => request.animal_id === animal.id && request.status === 'pending',
    );

    if (hasPendingRequest) {
        return <span className="action__note">Adoption request sent</span>;
    }

    if (animal.status !== 'available') {
        return (
            <button type="button" className="button" disabled>
                Not available for adoption
            </button>
        );
    }

    const close = () => setIsOpen(false);

    const open = () => {
        createRequest.reset();
        setIsOpen(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createRequest.mutate(
            { animalId: animal.id, message: message.trim() },
            {
                onSuccess: () => {
                    setMessage('');
                    close();
                },
            },
        );
    };

    return (
        <>
            <button type="button" className="button button--primary" onClick={open}>
                Adopt
            </button>
            <Modal open={isOpen} title={`Adopt ${animal.name}`} onClose={close}>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="field" htmlFor={messageId}>
                        <span className="field__label">Message to the shelter (optional)</span>
                        <textarea
                            id={messageId}
                            className="field__control"
                            rows={4}
                            maxLength={500}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </label>
                    <button type="submit" className="button button--primary" disabled={createRequest.isPending}>
                        Send request
                    </button>
                    {createRequest.isError && (
                        <p className="form__error">{describeAdoptionError(createRequest.error)}</p>
                    )}
                </form>
            </Modal>
        </>
    );
}