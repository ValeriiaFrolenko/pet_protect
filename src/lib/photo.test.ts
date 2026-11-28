import { describe, expect, it } from 'vitest';
import { PHOTO_MAX_BYTES, buildPhotoPath, validatePhoto, validatePhotoFile } from './photo';

describe('validatePhotoFile', () => {
    it('accepts a small JPEG', () => {
        expect(validatePhotoFile({ type: 'image/jpeg', size: 1000 })).toBeNull();
    });

    it('rejects other file types', () => {
        expect(validatePhotoFile({ type: 'application/pdf', size: 1000 })).not.toBeNull();
    });

    it('rejects files over the size limit', () => {
        expect(validatePhotoFile({ type: 'image/png', size: PHOTO_MAX_BYTES + 1 })).not.toBeNull();
    });

    it('accepts a file exactly at the size limit', () => {
        expect(validatePhotoFile({ type: 'image/webp', size: PHOTO_MAX_BYTES })).toBeNull();
    });
});

describe('validatePhoto', () => {
    it('requires a photo when none exists and one is required', () => {
        expect(validatePhoto(null, false, true)).toBe('Choose a photo.');
    });

    it('accepts a missing new photo when the record already has one', () => {
        expect(validatePhoto(null, true, true)).toBeNull();
    });

    it('accepts a missing photo when it is optional', () => {
        expect(validatePhoto(null, false, false)).toBeNull();
    });

    it('validates a chosen file even when the record already has a photo', () => {
        expect(validatePhoto({ type: 'text/plain', size: 10 }, true, true)).not.toBeNull();
    });
});

describe('buildPhotoPath', () => {
    it('builds a path from the folder, id and extension', () => {
        expect(buildPhotoPath('animals', 'image/png', 'abc')).toBe('animals/abc.png');
    });

    it('generates a different path each time', () => {
        expect(buildPhotoPath('events', 'image/webp')).not.toBe(buildPhotoPath('events', 'image/webp'));
    });
});
