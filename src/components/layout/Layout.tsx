import { Outlet } from 'react-router-dom';
import { UserMenu } from '../../features/auth/UserMenu';
import { MainNav } from './MainNav';

export function Layout() {
    return (
        <div className="layout">
            <header className="layout__header">
                <div className="layout__bar">
                    <MainNav />
                    <UserMenu />
                </div>
            </header>
            <main className="layout__content">
                <div className="page">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}