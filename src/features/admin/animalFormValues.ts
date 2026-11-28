import type { AnimalInput } from '../../types/admin';
import type { Animal, AnimalStatus, Sex, Species } from '../../types/animal';

export const NAME_MAX_LENGTH = 60;
export const BREED_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 2000;

const AGE_PATTERN = /^\d{1,3}$/;

export interface AnimalFormValues {
    name: string;
    species: Species;
    breed: string;
    ageMonths: string;
    sex: Sex | '';
    status: AnimalStatus;
    description: string;
}

export type AnimalFormField = 'name' | 'breed' | 'ageMonths' | 'description';
export type AnimalFormErrors = Partial<Record<AnimalFormField, string>>;

export const EMPTY_ANIMAL_FORM: AnimalFormValues = {
    name: '',
    species: 'dog',
    breed: '',
    ageMonths: '',
    sex: '',
    status: 'available',
    description: '',
};

export function animalToFormValues(animal: Animal): AnimalFormValues {
    return {
        name: animal.name,
        species: animal.species,
        breed: animal.breed ?? '',
        ageMonths: animal.age_months === null ? '' : String(animal.age_months),
        sex: animal.sex ?? '',
        status: animal.status,
        description: animal.description,
    };
}

export function validateAnimalForm(values: AnimalFormValues): AnimalFormErrors {
    const errors: AnimalFormErrors = {};
    const name = values.name.trim();
    const age = values.ageMonths.trim();

    if (name === '') {
        errors.name = 'Enter a name.';
    } else if (name.length > NAME_MAX_LENGTH) {
        errors.name = `The name must be at most ${NAME_MAX_LENGTH} characters.`;
    }

    if (values.breed.trim().length > BREED_MAX_LENGTH) {
        errors.breed = `The breed must be at most ${BREED_MAX_LENGTH} characters.`;
    }

    if (age !== '' && !AGE_PATTERN.test(age)) {
        errors.ageMonths = 'Enter a whole number of months, from 0 to 999.';
    }

    if (values.description.trim().length > DESCRIPTION_MAX_LENGTH) {
        errors.description = `The description must be at most ${DESCRIPTION_MAX_LENGTH} characters.`;
    }

    return errors;
}

export function toAnimalInput(values: AnimalFormValues, photoUrl: string): AnimalInput {
    const breed = values.breed.trim();
    const age = values.ageMonths.trim();

    return {
        name: values.name.trim(),
        species: values.species,
        breed: breed === '' ? null : breed,
        age_months: age === '' ? null : Number(age),
        sex: values.sex === '' ? null : values.sex,
        description: values.description.trim(),
        photo_url: photoUrl,
        status: values.status,
    };
}
