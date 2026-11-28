import { useState, type FormEvent } from 'react';
import { SelectField } from '../../components/SelectField';
import { useSaveAnimal } from '../../hooks/useAdminAnimals';
import { validatePhoto } from '../../lib/photo';
import type { Animal } from '../../types/animal';
import {
    SEX_FORM_OPTIONS,
    SPECIES_FORM_OPTIONS,
    STATUS_FORM_OPTIONS,
} from './adminOptions';
import {
    EMPTY_ANIMAL_FORM,
    animalToFormValues,
    toAnimalInput,
    validateAnimalForm,
    type AnimalFormErrors,
    type AnimalFormValues,
} from './animalFormValues';
import { describeAdminError } from './errorMessages';
import { PhotoField } from './PhotoField';
import { TextField } from './TextField';

interface AnimalFormProps {
    animal: Animal | null;
    onDone: () => void;
}

export function AnimalForm({ animal, onDone }: AnimalFormProps) {
    const save = useSaveAnimal();
    const currentPhotoUrl = animal?.photo_url ?? '';
    const [values, setValues] = useState<AnimalFormValues>(() =>
        animal ? animalToFormValues(animal) : EMPTY_ANIMAL_FORM,
    );
    const [photo, setPhoto] = useState<File | null>(null);
    const [errors, setErrors] = useState<AnimalFormErrors>({});
    const [photoError, setPhotoError] = useState<string | null>(null);

    const setField = <K extends keyof AnimalFormValues>(key: K, value: AnimalFormValues[K]) => {
        setValues((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateAnimalForm(values);
        const nextPhotoError = validatePhoto(photo, currentPhotoUrl !== '', true);

        setErrors(nextErrors);
        setPhotoError(nextPhotoError);

        if (Object.keys(nextErrors).length > 0 || nextPhotoError !== null) {
            return;
        }

        save.mutate(
            { id: animal?.id ?? null, input: toAnimalInput(values, currentPhotoUrl), photo },
            { onSuccess: onDone },
        );
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit} noValidate>
            <TextField
                label="Name"
                value={values.name}
                error={errors.name}
                onChange={(value) => setField('name', value)}
                required
                autoFocus
            />
            <div className="admin-form__row">
                <SelectField
                    label="Species"
                    value={values.species}
                    options={SPECIES_FORM_OPTIONS}
                    onChange={(value) => setField('species', value)}
                />
                <SelectField
                    label="Status"
                    value={values.status}
                    options={STATUS_FORM_OPTIONS}
                    onChange={(value) => setField('status', value)}
                />
            </div>
            <div className="admin-form__row">
                <TextField
                    label="Breed"
                    value={values.breed}
                    error={errors.breed}
                    onChange={(value) => setField('breed', value)}
                />
                <SelectField
                    label="Sex"
                    value={values.sex}
                    options={SEX_FORM_OPTIONS}
                    onChange={(value) => setField('sex', value)}
                />
                <TextField
                    label="Age (months)"
                    value={values.ageMonths}
                    error={errors.ageMonths}
                    inputMode="decimal"
                    onChange={(value) => setField('ageMonths', value)}
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
                label="Photo"
                currentUrl={currentPhotoUrl === '' ? null : currentPhotoUrl}
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
