export function toTelHref(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function toMailHref(email: string): string {
    return `mailto:${email.trim()}`;
}

export function toOpenStreetMapHref(lat: number, lng: number, zoom = 16): string {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
}
