export type PageItem = number | 'gap';

export function getPageItems(current: number, total: number, siblings = 1): PageItem[] {
    const pages = new Set<number>([1, total]);

    for (let page = current - siblings; page <= current + siblings; page += 1) {
        if (page >= 1 && page <= total) {
            pages.add(page);
        }
    }

    const sorted = [...pages].sort((a, b) => a - b);
    const items: PageItem[] = [];

    sorted.forEach((page, index) => {
        const previous = sorted[index - 1];

        if (previous !== undefined) {
            if (page - previous === 2) {
                items.push(previous + 1);
            } else if (page - previous > 2) {
                items.push('gap');
            }
        }

        items.push(page);
    });

    return items;
}