export function formatAge(months: number | null): string {
    if (months === null) {
        return 'Age unknown';
    }

    const years = Math.floor(months / 12);
    const rest = months % 12;

    if (years === 0) {
        return `${rest} mo`;
    }

    return rest === 0 ? `${years} y` : `${years} y ${rest} mo`;
}