import { useId, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { SIDE_NAV } from '../../app/sideNavigation';
import { useStoredFlag } from '../../hooks/useStoredFlag';
import { SideNavItem } from './SideNavItem';

export function SideNav() {
    const { pathname, search } = useLocation();
    const panelId = useId();
    // Only used on narrow screens, where the menu collapses into a panel.
    const [isOpen, setIsOpen] = useState(false);
    // Only used on wide screens, where the menu is a column that can be folded away.
    const [isCollapsed, toggleCollapsed] = useStoredFlag('pet-protect.side-nav-collapsed');

    const handlePanelClick = (event: MouseEvent<HTMLElement>) => {
        if (event.target instanceof Element && event.target.closest('a')) {
            setIsOpen(false);
        }
    };

    return (
        <aside className={isCollapsed ? 'side-nav side-nav--collapsed' : 'side-nav'}>
            <button
                type="button"
                className="side-nav__collapse"
                aria-expanded={!isCollapsed}
                aria-controls={panelId}
                aria-label={isCollapsed ? 'Show sections menu' : 'Hide sections menu'}
                title={isCollapsed ? 'Show sections menu' : 'Hide sections menu'}
                onClick={toggleCollapsed}
            >
                {isCollapsed ? '»' : '« Hide menu'}
            </button>
            <button
                type="button"
                className="button side-nav__open"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setIsOpen((open) => !open)}
            >
                Sections
            </button>
            <nav
                id={panelId}
                aria-label="Sections"
                className={isOpen ? 'side-nav__panel side-nav__panel--open' : 'side-nav__panel'}
                onClick={handlePanelClick}
            >
                <ul className="side-nav__list">
                    {SIDE_NAV.map((item) => (
                        <SideNavItem
                            key={item.label}
                            item={item}
                            depth={0}
                            pathname={pathname}
                            search={search}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
