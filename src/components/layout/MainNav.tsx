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
    return (
        <nav aria-label="Main">
            <ul className="main-nav">
                {MAIN_NAV.map((item) => (
                    <NavEntry key={item.to} item={item} />
                ))}
            </ul>
        </nav>
    );
}