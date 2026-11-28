export const PHOTO_MAX_BYTES = 5 * 1024 * 1024;

export type PhotoFolder = 'animals' | 'events';

const EXTENSIONS: Readonly<Record<string, string>> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

export const PHOTO_ACCEPT = Object.keys(EXTENSIONS).join(',');

export function validatePhotoFile(file: Pick<File, 'type' | 'size'>): string | null {
    if (!(file.type in EXTENSIONS)) {
        return 'Use a JPEG, PNG or WebP image.';
    }

    if (file.size > PHOTO_MAX_BYTES) {
        return 'The image must be 5 MB or smaller.';
    }

    return null;
}

// A chosen file is always checked. Without one, the record must already have a photo
// when a photo is required.
export function validatePhoto(
    file: Pick<File, 'type' | 'size'> | null,
    hasCurrentPhoto: boolean,
    isRequired: boolean,
): string | null {
    if (file) {
        return validatePhotoFile(file);
    }

    return isRequired && !hasCurrentPhoto ? 'Choose a photo.' : null;
}

export function buildPhotoPath(
    folder: PhotoFolder,
    mimeType: string,
    id: string = crypto.randomUUID(),
): string {
    const extension = EXTENSIONS[mimeType] ?? 'jpg';

    return `${folder}/${id}.${extension}`;
}
