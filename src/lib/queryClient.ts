import { QueryClient } from '@tanstack/react-query';
import { AppError } from './errors';

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: (failureCount, error) =>
                error instanceof AppError &&
                error.kind === 'network' &&
                failureCount < MAX_RETRIES,
        },
    },
});