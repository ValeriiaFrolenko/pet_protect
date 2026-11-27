import { Link } from 'react-router-dom';

export function HomeIntro() {
    return (
        <section className="home-intro">
            <h1>Give a homeless animal a family</h1>
            <p>
                Pet Protect is an animal shelter. Browse the animals waiting for a home, send an
                adoption request, or sponsor an animal with a monthly donation.
            </p>
            <div className="home-intro__actions">
                <Link className="button button--primary" to="/animals?status=available">
                    Find a pet
                </Link>
                <Link className="button" to="/events">
                    Shelter events
                </Link>
            </div>
        </section>
    );
}
