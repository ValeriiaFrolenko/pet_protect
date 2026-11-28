import { useId } from 'react';
import { PHOTO_ACCEPT } from '../../lib/photo';

interface PhotoFieldProps {
    label: string;
    currentUrl: string | null;
    error: string | null;
    onChange: (file: File | null) => void;
}

export function PhotoField({ label, currentUrl, error, onChange }: PhotoFieldProps) {
    const errorId = useId();

    return (
        <label className="field">
            <span className="field__label">{label}</span>
            {currentUrl && (
                <img
                    className="admin-form__preview"
                    src={currentUrl}
                    alt=""
                    width={128}
                    height={128}
                    loading="lazy"
                />
            )}
            <input
                className="field__control"
                type="file"
                accept={PHOTO_ACCEPT}
                aria-invalid={error !== null}
                aria-describedby={error !== null ? errorId : undefined}
                onChange={(event) => onChange(event.target.files?.[0] ?? null)}
            />
            <span className="field__hint">JPEG, PNG or WebP, up to 5 MB.</span>
            {error !== null && (
                <span id={errorId} className="field__error" role="alert">
                    {error}
                </span>
            )}
        </label>
    );
}
