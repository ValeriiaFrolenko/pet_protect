import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle } from './authRepository';

export function SignInButton({ className = 'button' }: { className?: string }) {
    const signIn = useMutation({ mutationFn: signInWithGoogle });

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => signIn.mutate()}
                disabled={signIn.isPending}
            >
                Sign in with Google
            </button>
            {signIn.isError && (
                <p className="user-menu__error" role="alert">
                    Could not sign in. Please try again.
                </p>
            )}
        </>
    );
}
