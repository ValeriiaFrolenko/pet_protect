import { getPageItems } from '../lib/pagination';

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                type="button"
                className="button"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
            >
                Prev
            </button>

            {getPageItems(page, totalPages).map((item, index) =>
                    item === 'gap' ? (
                        <span key={`gap-${index}`} className="pagination__gap">
            …
          </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            className={item === page ? 'button button--current' : 'button'}
                            aria-current={item === page ? 'page' : undefined}
                            onClick={() => onChange(item)}
                        >
                            {item}
                        </button>
                    ),
            )}

            <button
                type="button"
                className="button"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </nav>
    );
}