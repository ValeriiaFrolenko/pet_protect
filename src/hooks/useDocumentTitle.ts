import { useEffect } from 'react';
import { SHELTER } from '../app/shelter';

export function useDocumentTitle(title?: string): void {
    useEffect(() => {
        document.title = title ? `${title} · ${SHELTER.name}` : SHELTER.name;
    }, [title]);
}
