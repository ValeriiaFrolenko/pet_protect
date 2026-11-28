import type { AnimalStatus } from '../types/animal';
import type { AdoptionRequestStatus } from '../types/adoption';

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

const ADOPTION_STATUS_LABELS: Readonly<Record<AdoptionRequestStatus, string>> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
};

export function formatAdoptionStatus(status: AdoptionRequestStatus): string {
    return ADOPTION_STATUS_LABELS[status];
}

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
});

export function formatDateTime(iso: string): string {
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? 'Date unknown' : dateTimeFormatter.format(date);
}

const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long' });

export function formatDateParts(iso: string): { day: string; month: string } | null {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return { day: String(date.getDate()), month: monthFormatter.format(date) };
}
