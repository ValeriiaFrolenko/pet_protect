export type AppErrorKind = 'network' | 'unauthorized' | 'conflict' | 'not_found' | 'unknown';

export class AppError extends Error {
    readonly kind: AppErrorKind;

    constructor(kind: AppErrorKind, message: string, cause?: unknown) {
        super(message, { cause });
        this.name = 'AppError';
        this.kind = kind;
    }
}

interface SupabaseErrorLike {
    message: string;
    code?: string;
}

export function toAppError(error: SupabaseErrorLike): AppError {
    if (error.code === '23505') {
        return new AppError('conflict', 'Record already exists', error);
    }
    if (error.code === 'PGRST116') {
        return new AppError('not_found', 'Record not found', error);
    }
    if (error.code === '42501') {
        return new AppError('unauthorized', 'Access denied', error);
    }
    if (error.message.includes('Failed to fetch')) {
        return new AppError('network', 'Network error', error);
    }
    return new AppError('unknown', 'Unexpected error', error);
}