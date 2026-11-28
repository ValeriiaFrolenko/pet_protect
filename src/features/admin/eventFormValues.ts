import type { EventInput } from '../../types/admin';
import type { ShelterEvent } from '../../types/event';

export const TITLE_MAX_LENGTH = 120;
export const LOCATION_MAX_LENGTH = 200;
export const DESCRIPTION_MAX_LENGTH = 2000;

export interface EventFormValues {
    title: string;
    description: string;
    startsAt: string;
    location: string;
    lat: string;
    lng: string;
}

export type EventFormField = 'title' | 'description' | 'startsAt' | 'location' | 'lat' | 'lng';
export type EventFormErrors = Partial<Record<EventFormField, string>>;

export const EMPTY_EVENT_FORM: EventFormValues = {
    title: '',
    description: '',
    startsAt: '',
    location: '',
    lat: '',
    lng: '',
};

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

// The value of <input type="datetime-local"> has no time zone and means the local time.
export function toDateTimeLocalValue(iso: string): string {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    return `${day}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDateTimeLocalValue(value: string): string | null {
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function parseCoordinate(value: string, limit: number): number | null {
    const normalized = value.trim().replace(',', '.');

    if (normalized === '') {
        return null;
    }

    const number = Number(normalized);

    return Number.isFinite(number) && Math.abs(number) <= limit ? number : null;
}

export function eventToFormValues(event: ShelterEvent): EventFormValues {
    return {
        title: event.title,
        description: event.description,
        startsAt: toDateTimeLocalValue(event.starts_at),
        location: event.location,
        lat: event.lat === null ? '' : String(event.lat),
        lng: event.lng === null ? '' : String(event.lng),
    };
}

export function validateEventForm(values: EventFormValues): EventFormErrors {
    const errors: EventFormErrors = {};
    const title = values.title.trim();
    const location = values.location.trim();
    const hasLat = values.lat.trim() !== '';
    const hasLng = values.lng.trim() !== '';

    if (title === '') {
        errors.title = 'Enter a title.';
    } else if (title.length > TITLE_MAX_LENGTH) {
        errors.title = `The title must be at most ${TITLE_MAX_LENGTH} characters.`;
    }

    if (fromDateTimeLocalValue(values.startsAt) === null) {
        errors.startsAt = 'Choose the date and time.';
    }

    if (location === '') {
        errors.location = 'Enter a location.';
    } else if (location.length > LOCATION_MAX_LENGTH) {
        errors.location = `The location must be at most ${LOCATION_MAX_LENGTH} characters.`;
    }

    if (values.description.trim().length > DESCRIPTION_MAX_LENGTH) {
        errors.description = `The description must be at most ${DESCRIPTION_MAX_LENGTH} characters.`;
    }

    if (hasLat && parseCoordinate(values.lat, 90) === null) {
        errors.lat = 'Latitude must be a number from -90 to 90.';
    }

    if (hasLng && parseCoordinate(values.lng, 180) === null) {
        errors.lng = 'Longitude must be a number from -180 to 180.';
    }

    if (hasLat !== hasLng) {
        errors[hasLat ? 'lng' : 'lat'] ??= 'Enter both coordinates or neither.';
    }

    return errors;
}

// Call only after validateEventForm returned no errors.
export function toEventInput(values: EventFormValues, coverUrl: string | null): EventInput {
    return {
        title: values.title.trim(),
        description: values.description.trim(),
        starts_at: fromDateTimeLocalValue(values.startsAt) ?? '',
        location: values.location.trim(),
        lat: parseCoordinate(values.lat, 90),
        lng: parseCoordinate(values.lng, 180),
        cover_url: coverUrl,
    };
}
