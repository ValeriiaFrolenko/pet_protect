import { ChipGroup } from '../../components/ChipGroup';
import { SelectField } from '../../components/SelectField';
import { useDebouncedInput } from '../../hooks/useDebouncedInput';
import { SORT_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from './catalogOptions';
import type { CatalogParams } from './catalogQuery';

interface CatalogFiltersProps {
    params: CatalogParams;
    onChange: (changes: Partial<CatalogParams>) => void;
}

export function CatalogFilters({ params, onChange }: CatalogFiltersProps) {
    const [search, setSearch] = useDebouncedInput(params.search, (value) =>
        onChange({ search: value }),
    );

    return (
        <div className="catalog__filters">
            <div className="catalog__toolbar">
                <label className="field catalog__search">
                    <span className="field__label">Search</span>
                    <input
                        className="field__control"
                        type="search"
                        placeholder="Name or breed"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
                <SelectField
                    label="Sort by"
                    value={params.sort}
                    options={SORT_OPTIONS}
                    onChange={(sort) => onChange({ sort })}
                />
            </div>
            <ChipGroup
                label="Species"
                value={params.species}
                options={SPECIES_OPTIONS}
                onChange={(species) => onChange({ species })}
            />
            <ChipGroup
                label="Status"
                value={params.status}
                options={STATUS_OPTIONS}
                onChange={(status) => onChange({ status })}
            />
        </div>
    );
}
