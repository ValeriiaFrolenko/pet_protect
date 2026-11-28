import { AppError, type AppErrorKind } from '../../lib/errors';

type Messages = Readonly<Record<AppErrorKind, string>>;

const SAVE_MESSAGES: Messages = {
    conflict: 'A record with these values already exists.',
    unauthorized: 'You do not have permission to do this.',
    network: 'Network error. Check your connection and try again.',
    not_found: 'This record no longer exists, or you do not have permission to change it.',
    unknown: 'Something went wrong. Please try again later.',
};

const DECISION_MESSAGES: Messages = {
    conflict: 'This request has already been processed.',
    unauthorized: 'You do not have permission to do this.',
    network: 'Network error. Check your connection and try again.',
    not_found: 'This request was already processed or cancelled by the user.',
    unknown: 'Something went wrong. Please try again later.',
};

function pickMessage(messages: Messages, error: unknown): string {
    const kind: AppErrorKind = error instanceof AppError ? error.kind : 'unknown';

    return messages[kind];
}

export function describeAdminError(error: unknown): string {
    return pickMessage(SAVE_MESSAGES, error);
}

export function describeDecisionError(error: unknown): string {
    return pickMessage(DECISION_MESSAGES, error);
}
