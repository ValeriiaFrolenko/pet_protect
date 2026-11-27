import { describe, expect, it } from 'vitest';
import { toMailHref, toOpenStreetMapHref, toTelHref } from './contacts';

describe('toTelHref', () => {
    it('keeps the plus sign and digits only', () => {
        expect(toTelHref('+380 (44) 000-00-00')).toBe('tel:+380440000000');
    });
});

describe('toMailHref', () => {
    it('builds a mailto link and trims spaces', () => {
        expect(toMailHref(' info@example.com ')).toBe('mailto:info@example.com');
    });
});

describe('toOpenStreetMapHref', () => {
    it('puts the marker and the view on the same point', () => {
        expect(toOpenStreetMapHref(50.45, 30.52, 15)).toBe(
            'https://www.openstreetmap.org/?mlat=50.45&mlon=30.52#map=15/50.45/30.52',
        );
    });
});
