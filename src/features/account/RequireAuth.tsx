import { Outlet } from 'react-router-dom';
import { LoadingState } from '../../components/LoadingState';
import { SignInButton } from '../auth/SignInButton';
import { useAuth } from '../auth/useAuth';

export function RequireAuth() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingState />;
    }

    if (!user) {
        return (
            <section className="state">
                <h1>Sign in required</h1>
                <p>Sign in to continue.</p>
                <SignInButton className="button button--primary" />
            </section>
        );
    }

    return <Outlet />;
}
