import type { SelectOption } from '../../components/SelectField';
import type { CatalogParams } from './catalogQuery';

export const SPECIES_OPTIONS: readonly SelectOption<CatalogParams['species']>[] = [
    { value: 'all', label: 'All species' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'other', label: 'Other' },
];

export const STATUS_OPTIONS: readonly SelectOption<CatalogParams['status']>[] = [
    { value: 'all', label: 'Any status' },
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'adopted', label: 'Adopted' },
];

export const SORT_OPTIONS: readonly SelectOption<CatalogParams['sort']>[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'name', label: 'Name' },
    { value: 'age_asc', label: 'Youngest first' },
    { value: 'age_desc', label: 'Oldest first' },
];

export const FILTER_DEFAULTS = {
    search: '',
    species: 'all',
    status: 'all',
    sort: 'newest',
} as const satisfies Partial<CatalogParams>;
