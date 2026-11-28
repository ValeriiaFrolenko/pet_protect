import { describe, expect, it } from 'vitest';
import type { Animal } from '../../types/animal';
import {
    EMPTY_ANIMAL_FORM,
    NAME_MAX_LENGTH,
    animalToFormValues,
    toAnimalInput,
    validateAnimalForm,
} from './animalFormValues';

const animal: Animal = {
    id: 1,
    name: 'Rex',
    species: 'dog',
    breed: null,
    age_months: 36,
    sex: null,
    description: 'Calm.',
    photo_url: '/img/animals/rex.jpg',
    status: 'reserved',
    created_at: '2026-01-01T00:00:00Z',
};

describe('validateAnimalForm', () => {
    it('requires a name', () => {
        expect(validateAnimalForm(EMPTY_ANIMAL_FORM).name).toBeDefined();
    });

    it('rejects a name that consists of spaces', () => {
        expect(validateAnimalForm({ ...EMPTY_ANIMAL_FORM, name: '   ' }).name).toBeDefined();
    });

    it('rejects a name that is too long', () => {
        const name = 'a'.repeat(NAME_MAX_LENGTH + 1);

        expect(validateAnimalForm({ ...EMPTY_ANIMAL_FORM, name }).name).toBeDefined();
    });

    it('accepts an empty age', () => {
        expect(validateAnimalForm({ ...EMPTY_ANIMAL_FORM, name: 'Rex' })).toEqual({});
    });

    it.each(['-1', '1.5', 'abc', '1000'])('rejects the age "%s"', (ageMonths) => {
        const errors = validateAnimalForm({ ...EMPTY_ANIMAL_FORM, name: 'Rex', ageMonths });

        expect(errors.ageMonths).toBeDefined();
    });

    it('accepts an age of zero', () => {
        expect(validateAnimalForm({ ...EMPTY_ANIMAL_FORM, name: 'Rex', ageMonths: '0' })).toEqual({});
    });
});

describe('toAnimalInput', () => {
    it('trims text and turns empty optional fields into null', () => {
        const input = toAnimalInput(
            { ...EMPTY_ANIMAL_FORM, name: '  Rex ', breed: '  ', description: ' Calm. ' },
            '/photo.jpg',
        );

        expect(input).toEqual({
            name: 'Rex',
            species: 'dog',
            breed: null,
            age_months: null,
            sex: null,
            description: 'Calm.',
            photo_url: '/photo.jpg',
            status: 'available',
        });
    });

    it('converts the age to a number', () => {
        expect(toAnimalInput({ ...EMPTY_ANIMAL_FORM, name: 'Rex', ageMonths: '12' }, '/p').age_months).toBe(12);
    });
});

describe('animalToFormValues', () => {
    it('turns null fields into empty strings', () => {
        expect(animalToFormValues(animal)).toEqual({
            name: 'Rex',
            species: 'dog',
            breed: '',
            ageMonths: '36',
            sex: '',
            status: 'reserved',
            description: 'Calm.',
        });
    });
});
