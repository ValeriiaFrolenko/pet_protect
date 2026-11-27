import { useId, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from '../../app/navigation';
import { containsActiveItem, isNavItemActive } from '../../lib/navigation';

interface SideNavItemProps {
    item: NavItem;
    depth: number;
    pathname: string;
    search: string;
}

export function SideNavItem({ item, depth, pathname, search }: SideNavItemProps) {
    const groupId = useId();
    // Until the user toggles the group by hand, it is open if it contains the current page.
    const [manualOpen, setManualOpen] = useState<boolean | undefined>(undefined);

    const children = item.children ?? [];
    const hasChildren = children.length > 0;
    const isActive = isNavItemActive(item.to, pathname, search);
    const isOpen = manualOpen ?? containsActiveItem(item, pathname, search);

    return (
        <li>
            <div className="side-nav__row" style={{ '--depth': depth } as CSSProperties}>
                <Link
                    className="side-nav__link"
                    to={item.to}
                    aria-current={isActive ? 'page' : undefined}
                >
                    {item.label}
                </Link>
                {hasChildren && (
                    <button
                        type="button"
                        className="side-nav__toggle"
                        aria-expanded={isOpen}
                        aria-controls={groupId}
                        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
                        onClick={() => setManualOpen(!isOpen)}
                    >
                        {isOpen ? '−' : '+'}
                    </button>
                )}
            </div>
            {hasChildren && (
                <ul id={groupId} className="side-nav__list" hidden={!isOpen}>
                    {children.map((child) => (
                        <SideNavItem
                            key={child.label}
                            item={child}
                            depth={depth + 1}
                            pathname={pathname}
                            search={search}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
