import { SignInButton } from '../auth/SignInButton';
import { useAuth } from '../auth/useAuth';
import type { Animal } from '../../types/animal';
import { AdoptionAction } from './AdoptionAction';
import { SponsorshipAction } from './SponsorshipAction';

export function AnimalActions({ animal }: { animal: Animal }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return (
            <div className="animal-actions">
                <p className="animal-actions__hint">Sign in to adopt or sponsor this animal.</p>
                <SignInButton className="button button--primary" />
            </div>
        );
    }

    return (
        <div className="animal-actions">
            <AdoptionAction animal={animal} />
            <SponsorshipAction animal={animal} />
        </div>
    );
}
