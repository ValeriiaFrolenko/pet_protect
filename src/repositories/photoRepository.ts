import { supabase } from '../lib/supabase';
import { AppError } from '../lib/errors';
import { buildPhotoPath, type PhotoFolder } from '../lib/photo';

const BUCKET = 'photos';
const CACHE_SECONDS = '31536000';

export async function uploadPhoto(folder: PhotoFolder, file: File): Promise<string> {
    const path = buildPhotoPath(folder, file.type);

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        contentType: file.type,
        cacheControl: CACHE_SECONDS,
        upsert: false,
    });

    if (error) {
        throw new AppError('unknown', error);
    }

    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
