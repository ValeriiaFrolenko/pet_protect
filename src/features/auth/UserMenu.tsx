import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { NotificationBell } from '../notifications/NotificationBell';
import { signOut } from './authRepository';
import { SignInButton } from './SignInButton';
import { useAuth } from './useAuth';

export function UserMenu() {
    const { user, isLoading } = useAuth();
    const signOutMutation = useMutation({ mutationFn: signOut });

    if (isLoading) {
        return null;
    }

    if (!user) {
        return (
            <div className="user-menu">
                <SignInButton />
            </div>
        );
    }

    const name = user.user_metadata.full_name ?? user.email;
    const avatarUrl = user.user_metadata.avatar_url;

    return (
        <div className="user-menu">
            <NotificationBell />
            {avatarUrl && (
                <img
                    className="user-menu__avatar"
                    src={avatarUrl}
                    alt=""
                    width={32}
                    height={32}
                    referrerPolicy="no-referrer"
                />
            )}
            <span className="user-menu__name">{name}</span>
            <Link to="/account/requests" className="button button--quiet">
                My requests
            </Link>
            <button
                type="button"
                className="button button--quiet"
                onClick={() => signOutMutation.mutate()}
                disabled={signOutMutation.isPending}
            >
                {signOutMutation.isPending ? 'Signing out...' : 'Sign out'}
            </button>
            {signOutMutation.isError && (
                <p className="user-menu__error" role="alert">
                    Could not sign out. Please try again.
                </p>
            )}
        </div>
    );
}
