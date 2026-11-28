import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
    useDocumentTitle('Page not found');

    return (
        <section className="not-found">
            <h1>Page not found</h1>
            <p>The address may be wrong, or the page has been removed.</p>
            <div className="not-found__actions">
                <Link className="button button--primary" to="/animals">
                    Browse animals
                </Link>
                <Link className="button" to="/">
                    Go home
                </Link>
            </div>
        </section>
    );
}
