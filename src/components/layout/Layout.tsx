import { Outlet } from 'react-router-dom';
import { UserMenu } from '../../features/auth/UserMenu';
import { MainNav } from './MainNav';
import {Breadcrumbs} from "./Breadcrumbs.tsx";

export function Layout() {
    return (
        <div className="layout">
            <header className="layout__header">
                <div className="layout__bar">
                    <MainNav />
                    <UserMenu />
                </div>
            </header>
            <div className="layout__main">
                <Breadcrumbs />
                <main className="layout__content">
                    <div className="page">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}