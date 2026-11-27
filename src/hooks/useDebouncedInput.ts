import { useEffect, useEffectEvent, useState } from 'react';

const DEFAULT_DELAY_MS = 300;

/**
 * Keeps a local draft of a text input so typing stays instant, and passes the
 * value to `onCommit` only after the user stops typing for `delayMs`.
 * When the external `value` changes (for example, filters are reset),
 * the draft follows it.
 */
export function useDebouncedInput(
    value: string,
    onCommit: (value: string) => void,
    delayMs = DEFAULT_DELAY_MS,
) {
    const [draft, setDraft] = useState(value);
    const [syncedValue, setSyncedValue] = useState(value);
    const commit = useEffectEvent(onCommit);

    if (value !== syncedValue) {
        setSyncedValue(value);
        setDraft(value);
    }

    useEffect(() => {
        if (draft === value) {
            return;
        }

        const timer = window.setTimeout(() => commit(draft), delayMs);
        return () => window.clearTimeout(timer);
    }, [draft, value, delayMs]);

    return [draft, setDraft] as const;
}
