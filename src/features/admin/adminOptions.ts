import type { SelectOption } from '../../components/SelectField';
import type { AnimalStatus, Sex, Species } from '../../types/animal';
import type { RequestFilter } from './adminFilters';

export const SPECIES_FORM_OPTIONS: readonly SelectOption<Species>[] = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'other', label: 'Other' },
];

export const STATUS_FORM_OPTIONS: readonly SelectOption<AnimalStatus>[] = [
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'adopted', label: 'Adopted' },
];

export const SEX_FORM_OPTIONS: readonly SelectOption<Sex | ''>[] = [
    { value: '', label: 'Unknown' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

export const REQUEST_FILTER_OPTIONS: readonly SelectOption<RequestFilter>[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'all', label: 'All' },
];
