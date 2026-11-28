import { NavLink, Outlet } from 'react-router-dom';
import { ADMIN_NAV } from '../../app/navigation';

export function AdminLayout() {
    return (
        <section className="admin">
            <h1>Admin</h1>
            <nav className="admin__tabs" aria-label="Admin sections">
                {ADMIN_NAV.map((item) => (
                    // NavLink sets aria-current="page" on the active tab, which the button style uses.
                    <NavLink key={item.to} to={item.to} className="button button--option">
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <Outlet />
        </section>
    );
}
