import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminRoute } from './features/admin/AdminRoute';
import { AdminAnimalsPage } from './pages/admin/AdminAnimalsPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage';
import { CatalogPage } from './pages/CatalogPage';
import { ContactsPage } from './pages/ContactsPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { AnimalPage } from './pages/AnimalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="animals" element={<CatalogPage />} />
                <Route path="animals/:animalId" element={<AnimalPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="admin" element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Navigate to="animals" replace />} />
                        <Route path="animals" element={<AdminAnimalsPage />} />
                        <Route path="events" element={<AdminEventsPage />} />
                        <Route path="requests" element={<AdminRequestsPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
