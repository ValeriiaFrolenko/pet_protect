import { useId, useState, type FormEvent } from 'react';
import { Modal } from '../../components/Modal';
import { useCreateAdoptionRequest } from '../../hooks/useAdoption';
import type { Animal } from '../../types/animal';
import { describeAdoptionError } from './errorMessages';

export function AdoptionRequestForm({ animal }: { animal: Animal }) {
    const messageId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const createRequest = useCreateAdoptionRequest();

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
                    <button
                        type="submit"
                        className="button button--primary"
                        disabled={createRequest.isPending}
                    >
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
