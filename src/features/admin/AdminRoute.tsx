import { Outlet } from 'react-router-dom';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { SignInButton } from '../auth/SignInButton';
import { useAuth } from '../auth/useAuth';

// This guard only decides what the interface shows.
// Access to the data is enforced by Row Level Security policies in the database.
export function AdminRoute() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { isAdmin, isLoading, isError, error, refetch } = useIsAdmin();

    useDocumentTitle('Admin');

    if (isAuthLoading || isLoading) {
        return <LoadingState />;
    }

    if (!user) {
        return (
            <section className="state">
                <h1>Admin</h1>
                <p>Sign in to continue.</p>
                <SignInButton className="button button--primary" />
            </section>
        );
    }

    if (isError) {
        return <ErrorState message={error?.message ?? 'Unexpected error'} onRetry={() => void refetch()} />;
    }

    if (!isAdmin) {
        return (
            <section className="state">
                <h1>Access denied</h1>
                <p>Your account does not have admin access.</p>
            </section>
        );
    }

    return <Outlet />;
}
