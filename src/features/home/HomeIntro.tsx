import { Link } from 'react-router-dom';
import { Decoration } from '../../components/Decoration';

const RIBBON_WORDS = ['Adopt', 'Sponsor', 'Visit', 'Volunteer', 'Share', 'Care'];
// The list is rendered twice: the animation shifts it by exactly one copy and loops.
const RIBBON_COPIES = [0, 1];

export function HomeIntro() {
    return (
        <section className="home-intro">
            <Decoration shape="flower" className="home-intro__flower" />
            <Decoration shape="spark" className="home-intro__spark" />
            <Decoration shape="heart" className="home-intro__heart" />

            <h1 className="home-intro__title">Give a homeless animal a family</h1>
            <p className="home-intro__lead">
                Browse the animals waiting for a home, send an adoption request, or sponsor an animal
                with a monthly donation.
            </p>
            <div className="home-intro__actions">
                <Link className="button button--primary" to="/animals?status=available">
                    Find a pet
                </Link>
                <Link className="button" to="/events">
                    Shelter events
                </Link>
            </div>

            <div className="ribbon" aria-hidden="true">
                <div className="ribbon__track">
                    {RIBBON_COPIES.map((copy) => (
                        <ul key={copy} className="ribbon__list">
                            {RIBBON_WORDS.map((word) => (
                                <li key={word}>{word}</li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
