import { useId } from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | undefined;
    type?: 'text' | 'datetime-local';
    inputMode?: 'text' | 'decimal';
    multiline?: boolean;
    required?: boolean;
    autoFocus?: boolean;
}

export function TextField({
    label,
    value,
    onChange,
    error,
    type = 'text',
    inputMode = 'text',
    multiline = false,
    required = false,
    autoFocus = false,
}: TextFieldProps) {
    const errorId = useId();
    const commonProps = {
        className: 'field__control',
        value,
        required,
        'aria-invalid': error !== undefined,
        'aria-describedby': error !== undefined ? errorId : undefined,
        'data-autofocus': autoFocus ? '' : undefined,
    };

    return (
        <label className="field">
            <span className="field__label">{label}</span>
            {multiline ? (
                <textarea
                    {...commonProps}
                    rows={4}
                    onChange={(event) => onChange(event.target.value)}
                />
            ) : (
                <input
                    {...commonProps}
                    type={type}
                    inputMode={inputMode}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
            {error !== undefined && (
                <span id={errorId} className="field__error" role="alert">
                    {error}
                </span>
            )}
        </label>
    );
}
