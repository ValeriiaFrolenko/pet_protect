import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { ContactsPage } from './pages/ContactsPage';
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
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;