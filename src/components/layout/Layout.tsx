import { useId, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useStoredFlag } from '../../hooks/useStoredFlag';
import { UserMenu } from '../../features/auth/UserMenu';
import { ErrorBoundary } from '../ErrorBoundary';
import { BannerToggle } from './BannerToggle';
import { Breadcrumbs } from './Breadcrumbs';
import { HeroSlider } from './HeroSlider';
import { MainNav } from './MainNav';
import { PageCrash } from './PageCrash';
import { SideNav } from './SideNav';
import { SiteFooter } from './SiteFooter';

export function Layout() {
    const { pathname } = useLocation();
    const bannerId = useId();
    const contentRef = useRef<HTMLElement>(null);
    const [isBannerHidden, toggleBanner] = useStoredFlag('pet-protect.banner-hidden');

    // The content block scrolls instead of the window, so the browser does not reset it.
    useLayoutEffect(() => {
        contentRef.current?.scrollTo({ top: 0 });
    }, [pathname]);

    return (
        <div className="layout">
            <header className="layout__header">
                {!isBannerHidden && <HeroSlider id={bannerId} />}
                <div className="layout__bar">
                    <MainNav />
                    <BannerToggle
                        bannerId={bannerId}
                        isHidden={isBannerHidden}
                        onToggle={toggleBanner}
                    />
                    <UserMenu />
                </div>
            </header>
            <div className="layout__body">
                <SideNav />
                <div className="layout__main">
                    <Breadcrumbs />
                    <main ref={contentRef} className="layout__content">
                        <div className="page layout__page">
                            <ErrorBoundary key={pathname} fallback={<PageCrash />}>
                                <Outlet />
                            </ErrorBoundary>
                        </div>
                        <SiteFooter />
                    </main>
                </div>
            </div>
        </div>
    );
}
