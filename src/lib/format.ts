import type { AnimalStatus } from '../types/animal';

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

const currencyFormatter = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
});

export function formatMoney(amount: number): string {
    return currencyFormatter.format(amount);
}

const STATUS_LABELS: Readonly<Record<AnimalStatus, string>> = {
    available: 'Available',
    reserved: 'Reserved',
    adopted: 'Adopted',
};

export function formatStatus(status: AnimalStatus): string {
    return STATUS_LABELS[status];
}

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function formatDateTime(iso: string): string {
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? 'Date unknown' : dateTimeFormatter.format(date);
}
