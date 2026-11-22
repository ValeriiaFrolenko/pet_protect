import { useId, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { MAIN_NAV, type NavItem } from '../../app/navigation';

function NavEntry({ item }: { item: NavItem }) {
    const hasQuery = item.to.includes('?');

    return (
        <li className="main-nav__item">
            <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive && !hasQuery ? 'active' : undefined)}
            >
                {item.label}
            </NavLink>
            {item.children && (
                <ul className="main-nav__submenu">
                    {item.children.map((child) => (
                        <NavEntry key={child.to} item={child} />
                    ))}
                </ul>
            )}
        </li>
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
                className="main-nav__toggle"
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