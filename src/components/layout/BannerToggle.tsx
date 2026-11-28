interface BannerToggleProps {
    bannerId: string;
    isHidden: boolean;
    onToggle: () => void;
}

export function BannerToggle({ bannerId, isHidden, onToggle }: BannerToggleProps) {
    const label = isHidden ? 'Show banner' : 'Hide banner';

    return (
        <button
            type="button"
            className="button button--quiet banner-toggle"
            aria-expanded={!isHidden}
            aria-controls={isHidden ? undefined : bannerId}
            title={label}
            onClick={onToggle}
        >
            <span aria-hidden="true">{isHidden ? '▾' : '▴'}</span>
            <span className="banner-toggle__text">{label}</span>
        </button>
    );
}
