import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle, signOut } from './authRepository';
import { useAuth } from './useAuth';

export function UserMenu() {
    const { user, isLoading } = useAuth();
    const signIn = useMutation({ mutationFn: signInWithGoogle });
    const signOutMutation = useMutation({ mutationFn: signOut });

    if (isLoading) {
        return null;
    }

    if (!user) {
        return (
            <div className="user-menu">
                <button
                    type="button"
                    className="button"
                    onClick={() => signIn.mutate()}
                    disabled={signIn.isPending}
                >
                    Sign in with Google
                </button>
                {signIn.isError && <p className="user-menu__error">{signIn.error.message}</p>}
            </div>
        );
    }

    const name = user.user_metadata.full_name ?? user.email;
    const avatarUrl = user.user_metadata.avatar_url;

    return (
        <div className="user-menu">
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
            <button
                type="button"
                className="button"
                onClick={() => signOutMutation.mutate()}
                disabled={signOutMutation.isPending}
            >
                Sign out
            </button>
            {signOutMutation.isError && (
                <p className="user-menu__error">{signOutMutation.error.message}</p>
            )}
        </div>
    );
}