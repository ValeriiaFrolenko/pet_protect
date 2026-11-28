import { useState } from 'react';
import { Modal } from './Modal';

interface ConfirmButtonProps {
    label: string;
    pendingLabel: string;
    isPending: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    dismissLabel: string;
    onConfirm: () => void;
}

// A destructive action that runs only after the user confirms it in a dialog.
export function ConfirmButton({
    label,
    pendingLabel,
    isPending,
    title,
    description,
    confirmLabel,
    dismissLabel,
    onConfirm,
}: ConfirmButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    const confirm = () => {
        close();
        onConfirm();
    };

    return (
        <>
            <button
                type="button"
                className="button button--danger"
                disabled={isPending}
                onClick={() => setIsOpen(true)}
            >
                {isPending ? pendingLabel : label}
            </button>
            <Modal open={isOpen} title={title} onClose={close}>
                <p>{description}</p>
                <div className="modal__actions">
                    <button type="button" className="button" data-autofocus onClick={close}>
                        {dismissLabel}
                    </button>
                    <button type="button" className="button button--danger" onClick={confirm}>
                        {confirmLabel}
                    </button>
                </div>
            </Modal>
        </>
    );
}
