import { useState } from 'react';

function readFlag(key: string): boolean {
    try {
        return window.localStorage.getItem(key) === 'true';
    } catch {
        return false;
    }
}

// A per-browser UI preference. If storage is blocked, it still works until the page is reloaded.
export function useStoredFlag(key: string) {
    const [value, setValue] = useState(() => readFlag(key));

    const toggle = () => {
        const next = !value;
        setValue(next);

        try {
            window.localStorage.setItem(key, String(next));
        } catch {
            // The preference is optional, so a storage failure is ignored.
        }
    };

    return [value, toggle] as const;
}
