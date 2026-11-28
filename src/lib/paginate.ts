export const ADMIN_PAGE_SIZE = 10;

export interface Paged<T> {
    items: T[];
    page: number;
    totalPages: number;
    total: number;
}

export function paginate<T>(items: readonly T[], page: number, pageSize = ADMIN_PAGE_SIZE): Paged<T> {
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(Math.max(1, page), totalPages);
    const start = (current - 1) * pageSize;

    return { items: items.slice(start, start + pageSize), page: current, totalPages, total };
}
