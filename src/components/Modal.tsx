import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react';

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="modal"
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className="modal__header">
                <h2 id={titleId} className="modal__title">
                    {title}
                </h2>
                <button type="button" className="button" aria-label="Close" onClick={onClose}>
                    ×
                </button>
            </div>
            <div className="modal__body">{children}</div>
        </dialog>
    );
}