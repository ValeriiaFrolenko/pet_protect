import { Outlet } from 'react-router-dom';
import { UserMenu } from '../../features/auth/UserMenu';
import { Breadcrumbs } from './Breadcrumbs';
import { HeroSlider } from './HeroSlider';
import { MainNav } from './MainNav';
import { SideNav } from './SideNav';

export function Layout() {
    return (
        <div className="layout">
            <header className="layout__header">
                <HeroSlider />
                <div className="layout__bar">
                    <MainNav />
                    <UserMenu />
                </div>
            </header>
            <div className="layout__body">
                <SideNav />
                <div className="layout__main">
                    <Breadcrumbs />
                    <main className="layout__content">
                        <div className="page">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
