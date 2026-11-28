import { useId } from 'react';
import type { SelectOption } from './SelectField';

interface ChipGroupProps<T extends string> {
    label: string;
    value: T;
    options: readonly SelectOption<T>[];
    onChange: (value: T) => void;
}

// A single-choice filter built on native radio buttons, so arrow keys work out of the box.
export function ChipGroup<T extends string>({ label, value, options, onChange }: ChipGroupProps<T>) {
    const name = useId();

    return (
        <fieldset className="chips">
            <legend>{label}</legend>
            {options.map((option) => (
                <label key={option.value} className="chip">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={option.value === value}
                        onChange={() => onChange(option.value)}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </fieldset>
    );
}
