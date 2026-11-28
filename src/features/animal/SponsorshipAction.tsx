import { useId, useState, type FormEvent } from 'react';
import { ConfirmButton } from '../../components/ConfirmButton';
import { Modal } from '../../components/Modal';
import {
    useCancelSponsorship,
    useCreateSponsorship,
    useMySponsorships,
} from '../../hooks/useSponsorship';
import { formatMoney } from '../../lib/format';
import type { Animal } from '../../types/animal';
import { describeSponsorshipError } from './errorMessages';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 10000;
const PRESET_AMOUNTS = [100, 250, 500];

export function SponsorshipAction({ animal }: { animal: Animal }) {
    const amountId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('100');
    const { data: sponsorships, isPending, isError, error } = useMySponsorships();
    const createSponsorship = useCreateSponsorship();
    const cancelSponsorship = useCancelSponsorship();

    if (isPending) {
        return null;
    }

    if (isError) {
        return <span className="form__error">{error.message}</span>;
    }

    const active = sponsorships.find(
        (sponsorship) => sponsorship.animal_id === animal.id && sponsorship.active,
    );

    if (active) {
        return (
            <div className="action">
        <span className="action__note">
          Sponsoring: {formatMoney(active.monthly_amount)} / month
        </span>
                <ConfirmButton
                    label="Cancel sponsorship"
                    pendingLabel="Cancelling..."
                    isPending={cancelSponsorship.isPending}
                    title={`Stop sponsoring ${animal.name}?`}
                    description="The monthly sponsorship will end. You can start a new one later."
                    confirmLabel="Stop sponsoring"
                    dismissLabel="Keep sponsorship"
                    onConfirm={() => cancelSponsorship.mutate(active.id)}
                />
                {cancelSponsorship.isError && (
                    <span className="form__error">{describeSponsorshipError(cancelSponsorship.error)}</span>
                )}
            </div>
        );
    }

    if (animal.status === 'adopted') {
        return null;
    }

    const value = Number(amount);
    const isValid = Number.isFinite(value) && value >= MIN_AMOUNT && value <= MAX_AMOUNT;

    const close = () => setIsOpen(false);

    const open = () => {
        createSponsorship.reset();
        setIsOpen(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValid) {
            createSponsorship.mutate(
                { animalId: animal.id, monthlyAmount: value },
                { onSuccess: close },
            );
        }
    };

    return (
        <>
            <button type="button" className="button" onClick={open}>
                Sponsor
            </button>
            <Modal open={isOpen} title={`Sponsor ${animal.name}`} onClose={close}>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="field" htmlFor={amountId}>
                        <span className="field__label">Monthly amount (UAH)</span>
                        <input
                            id={amountId}
                            className="field__control"
                            type="number"
                            min={MIN_AMOUNT}
                            max={MAX_AMOUNT}
                            step={1}
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </label>
                    <div className="amount-presets" role="group" aria-label="Quick amounts">
                        {PRESET_AMOUNTS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                className="button button--option"
                                aria-pressed={value === preset}
                                onClick={() => setAmount(String(preset))}
                            >
                                {formatMoney(preset)}
                            </button>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="button button--primary"
                        disabled={!isValid || createSponsorship.isPending}
                    >
                        {createSponsorship.isPending ? 'Saving...' : 'Become a sponsor'}
                    </button>
                    {createSponsorship.isError && (
                        <p className="form__error" role="alert">{describeSponsorshipError(createSponsorship.error)}</p>
                    )}
                </form>
            </Modal>
        </>
    );
}
