export type AppErrorKind = 'network' | 'unauthorized' | 'conflict' | 'not_found' | 'unknown';

const MESSAGES: Readonly<Record<AppErrorKind, string>> = {
    network: 'Network error',
    unauthorized: 'Access denied',
    conflict: 'Record already exists',
    not_found: 'Record not found',
    unknown: 'Unexpected error',
};

const KIND_BY_CODE: Readonly<Record<string, AppErrorKind>> = {
    '23505': 'conflict',
    PGRST116: 'not_found',
    '42501': 'unauthorized',
};

export class AppError extends Error {
    readonly kind: AppErrorKind;

    constructor(kind: AppErrorKind, cause?: unknown) {
        super(MESSAGES[kind], { cause });
        this.name = 'AppError';
        this.kind = kind;
    }
}

interface SupabaseErrorLike {
    message: string;
    code?: string;
}

export function toAppError(error: SupabaseErrorLike): AppError {
    if (!error.code) {
        return new AppError('network', error);
    }
    return new AppError(KIND_BY_CODE[error.code] ?? 'unknown', error);
}