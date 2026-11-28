import { useState, type FormEvent } from 'react';
import { useSaveEvent } from '../../hooks/useAdminEvents';
import { validatePhoto } from '../../lib/photo';
import type { ShelterEvent } from '../../types/event';
import { describeAdminError } from './errorMessages';
import {
    EMPTY_EVENT_FORM,
    eventToFormValues,
    toEventInput,
    validateEventForm,
    type EventFormErrors,
    type EventFormValues,
} from './eventForm';
import { PhotoField } from './PhotoField';
import { TextField } from './TextField';

interface EventFormProps {
    event: ShelterEvent | null;
    onDone: () => void;
}

export function EventForm({ event, onDone }: EventFormProps) {
    const save = useSaveEvent();
    const currentCoverUrl = event?.cover_url ?? null;
    const [values, setValues] = useState<EventFormValues>(() =>
        event ? eventToFormValues(event) : EMPTY_EVENT_FORM,
    );
    const [photo, setPhoto] = useState<File | null>(null);
    const [errors, setErrors] = useState<EventFormErrors>({});
    const [photoError, setPhotoError] = useState<string | null>(null);

    const setField = <K extends keyof EventFormValues>(key: K, value: EventFormValues[K]) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
        submitEvent.preventDefault();

        const nextErrors = validateEventForm(values);
        const nextPhotoError = validatePhoto(photo, currentCoverUrl !== null, false);

        setErrors(nextErrors);
        setPhotoError(nextPhotoError);

        if (Object.keys(nextErrors).length > 0 || nextPhotoError !== null) {
            return;
        }

        save.mutate(
            { id: event?.id ?? null, input: toEventInput(values, currentCoverUrl), photo },
            { onSuccess: onDone },
        );
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit} noValidate>
            <TextField
                label="Title"
                value={values.title}
                error={errors.title}
                onChange={(value) => setField('title', value)}
                required
                autoFocus
            />
            <TextField
                label="Date and time"
                type="datetime-local"
                value={values.startsAt}
                error={errors.startsAt}
                onChange={(value) => setField('startsAt', value)}
                required
            />
            <TextField
                label="Location"
                value={values.location}
                error={errors.location}
                onChange={(value) => setField('location', value)}
                required
            />
            <div className="admin-form__row">
                <TextField
                    label="Latitude"
                    value={values.lat}
                    error={errors.lat}
                    inputMode="decimal"
                    onChange={(value) => setField('lat', value)}
                />
                <TextField
                    label="Longitude"
                    value={values.lng}
                    error={errors.lng}
                    inputMode="decimal"
                    onChange={(value) => setField('lng', value)}
                />
            </div>
            <TextField
                label="Description"
                value={values.description}
                error={errors.description}
                onChange={(value) => setField('description', value)}
                multiline
            />
            <PhotoField
                label="Cover (optional)"
                currentUrl={currentCoverUrl}
                error={photoError}
                onChange={setPhoto}
            />

            {save.isError && (
                <p className="field__error" role="alert">
                    {describeAdminError(save.error)}
                </p>
            )}

            <div className="modal__actions">
                <button type="button" className="button button--quiet" onClick={onDone}>
                    Cancel
                </button>
                <button type="submit" className="button button--primary" disabled={save.isPending}>
                    {save.isPending ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}
