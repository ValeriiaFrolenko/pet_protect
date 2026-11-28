import { useId, useState, type FocusEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MAIN_NAV, type NavItem } from '../../app/navigation';
import { isNavItemActive } from '../../lib/navigation';

function NavEntry({ item }: { item: NavItem }) {
    const submenuId = useId();
    const [isExpanded, setIsExpanded] = useState(false);
    const children = item.children ?? [];
    const hasChildren = children.length > 0;

    const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsExpanded(false);
        }
    };

    return (
        <li
            className={isExpanded ? 'main-nav__item main-nav__item--expanded' : 'main-nav__item'}
            onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') {
                    setIsExpanded(false);
                }
            }}
            onBlur={handleBlur}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    setIsExpanded(false);
                }
            }}
        >
            <NavLink className="main-nav__link" to={item.to} end={item.to === '/'}>
                {item.label}
            </NavLink>
            {hasChildren && (
                <>
                    <button
                        type="button"
                        className="main-nav__expand"
                        aria-expanded={isExpanded}
                        aria-controls={submenuId}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setIsExpanded((expanded) => !expanded)}
                    >
                        ▾
                    </button>
                    <SubMenu id={submenuId} items={children} onSelect={() => setIsExpanded(false)} />
                </>
            )}
        </li>
    );
}

interface SubMenuProps {
    id: string;
    items: readonly NavItem[];
    onSelect: () => void;
}

function SubMenu({ id, items, onSelect }: SubMenuProps) {
    const { pathname, search } = useLocation();

    return (
        <ul id={id} className="main-nav__submenu">
            {items.map((child) => (
                <li key={child.to}>
                    <Link
                        className="main-nav__sublink"
                        to={child.to}
                        aria-current={
                            isNavItemActive(child.to, pathname, search) ? 'page' : undefined
                        }
                        onClick={(event) => {
                            // Focus would keep the dropdown open after the page has changed.
                            event.currentTarget.blur();
                            onSelect();
                        }}
                    >
                        {child.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export function MainNav() {
    const listId = useId();
    const [isOpen, setIsOpen] = useState(false);

    const handleListClick = (event: MouseEvent<HTMLUListElement>) => {
        if (event.target instanceof Element && event.target.closest('a')) {
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <nav aria-label="Main" onKeyDown={handleKeyDown}>
            <button
                type="button"
                className="button main-nav__toggle"
                aria-expanded={isOpen}
                aria-controls={listId}
                onClick={() => setIsOpen((open) => !open)}
            >
                Menu
            </button>
            <ul
                id={listId}
                className={isOpen ? 'main-nav main-nav--open' : 'main-nav'}
                onClick={handleListClick}
            >
                {MAIN_NAV.map((item) => (
                    <NavEntry key={item.to} item={item} />
                ))}
            </ul>
        </nav>
    );
}
