import type { NavItem } from '../app/navigation';

// Parameters that change how a page is displayed, not which page it is.
const DISPLAY_PARAMS: readonly string[] = ['page', 'q', 'sort'];

function significantParams(params: URLSearchParams): string {
    return [...params]
        .filter(([key]) => !DISPLAY_PARAMS.includes(key))
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join('&');
}

export function isNavItemActive(to: string, pathname: string, search: string): boolean {
    const [targetPath = '', targetQuery = ''] = to.split('?');

    if (targetPath !== pathname) {
        return false;
    }

    return (
        significantParams(new URLSearchParams(targetQuery)) ===
        significantParams(new URLSearchParams(search))
    );
}

export function containsActiveItem(item: NavItem, pathname: string, search: string): boolean {
    return (
        isNavItemActive(item.to, pathname, search) ||
        (item.children ?? []).some((child) => containsActiveItem(child, pathname, search))
    );
}
