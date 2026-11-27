import { AppError, type AppErrorKind } from '../../lib/errors';

type Messages = Readonly<Record<AppErrorKind, string>>;

const ADOPTION_MESSAGES: Messages = {
    conflict: 'This animal has just been reserved by someone else.',
    unauthorized: 'Please sign in to send a request.',
    network: 'Network error. Check your connection and try again.',
    not_found: 'This animal no longer exists.',
    unknown: 'Something went wrong. Please try again later.',
};

const ADOPTION_CANCEL_MESSAGES: Messages = {
    conflict: 'This request can no longer be cancelled.',
    unauthorized: 'Please sign in to cancel the request.',
    network: 'Network error. Check your connection and try again.',
    not_found: 'This request can no longer be cancelled.',
    unknown: 'Something went wrong. Please try again later.',
};

const SPONSORSHIP_MESSAGES: Messages = {
    conflict: 'You already sponsor this animal.',
    unauthorized: 'Please sign in to become a sponsor.',
    network: 'Network error. Check your connection and try again.',
    not_found: 'This sponsorship no longer exists.',
    unknown: 'Something went wrong. Please try again later.',
};

function pickMessage(messages: Messages, error: unknown): string {
    const kind: AppErrorKind = error instanceof AppError ? error.kind : 'unknown';
    return messages[kind];
}

export function describeAdoptionError(error: unknown): string {
    return pickMessage(ADOPTION_MESSAGES, error);
}

export function describeAdoptionCancelError(error: unknown): string {
    return pickMessage(ADOPTION_CANCEL_MESSAGES, error);
}

export function describeSponsorshipError(error: unknown): string {
    return pickMessage(SPONSORSHIP_MESSAGES, error);
}
