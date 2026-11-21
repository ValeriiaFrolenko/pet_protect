import { describe, expect, it } from 'vitest';
import { AppError, toAppError } from './errors';

describe('toAppError', () => {
    it('maps unique violation to conflict', () => {
        const error = toAppError({ message: 'duplicate key', code: '23505' });

        expect(error).toBeInstanceOf(AppError);
        expect(error.kind).toBe('conflict');
    });

    it('maps single-row miss to not_found', () => {
        expect(toAppError({ message: 'no rows', code: 'PGRST116' }).kind).toBe('not_found');
    });

    it('maps insufficient privilege to unauthorized', () => {
        expect(toAppError({ message: 'denied', code: '42501' }).kind).toBe('unauthorized');
    });

    it('maps failed fetch to network', () => {
        const error = toAppError({ message: 'TypeError: Failed to fetch', code: '' });

        expect(error.kind).toBe('network');
    });

    it('maps unknown codes to unknown', () => {
        expect(toAppError({ message: 'boom', code: '99999' }).kind).toBe('unknown');
    });

    it('keeps the original error as cause', () => {
        const original = { message: 'duplicate key', code: '23505' };

        expect(toAppError(original).cause).toBe(original);
    });

    it('maps a raised exception from a database trigger to conflict', () => {
        expect(toAppError({ message: 'Animal is not available', code: 'P0001' }).kind).toBe('conflict');
    });
});