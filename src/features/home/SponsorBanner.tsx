import { Link } from 'react-router-dom';
import { Decoration } from '../../components/Decoration';

export function SponsorBanner() {
    return (
        <section className="sponsor-banner">
            <Decoration shape="spark" className="sponsor-banner__spark" />
            <div>
                <h2>Cannot adopt? Become a sponsor</h2>
                <p>Choose an animal, sign in and set a monthly amount. You can cancel at any time.</p>
            </div>
            <Link className="button button--primary" to="/animals?status=available">
                Choose an animal
            </Link>
        </section>
    );
}
