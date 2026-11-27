import { describe, expect, it } from 'vitest';
import { SHARE_TARGETS } from './shareTargets';

const content = { url: 'https://example.com/animals/1?a=b&c=d', title: 'Meet Rex & Bella' };

function hrefFor(id: string): URL {
    const target = SHARE_TARGETS.find((item) => item.id === id);

    if (!target) {
        throw new Error(`Unknown share target: ${id}`);
    }

    return new URL(target.buildHref(content));
}

describe('SHARE_TARGETS', () => {
    it('encodes the page url for Facebook', () => {
        const href = hrefFor('facebook');

        expect(href.origin).toBe('https://www.facebook.com');
        expect(href.searchParams.get('u')).toBe(content.url);
    });

    it('passes url and text to Telegram', () => {
        const href = hrefFor('telegram');

        expect(href.searchParams.get('url')).toBe(content.url);
        expect(href.searchParams.get('text')).toBe(content.title);
    });

    it('passes url and text to X', () => {
        const href = hrefFor('x');

        expect(href.searchParams.get('url')).toBe(content.url);
        expect(href.searchParams.get('text')).toBe(content.title);
    });
});
