import { Link } from 'react-router-dom';
import { MAIN_NAV } from '../../app/navigation';
import { SHELTER } from '../../app/shelter';
import { toMailHref, toTelHref } from '../../lib/contacts';

export function SiteFooter() {
    return (
        <footer className="footer">
            <div className="footer__grid page">
                <section>
                    <h2 className="footer__title">{SHELTER.name}</h2>
                    <p>{SHELTER.address}</p>
                    <p>
                        <a href={toTelHref(SHELTER.phone)}>{SHELTER.phone}</a>
                        <br />
                        <a href={toMailHref(SHELTER.email)}>{SHELTER.email}</a>
                    </p>
                </section>
                <section>
                    <h2 className="footer__title">Opening hours</h2>
                    {SHELTER.hours.map((slot) => (
                        <p key={slot.days}>
                            {slot.days}: {slot.time}
                        </p>
                    ))}
                </section>
                <nav aria-label="Footer">
                    <h2 className="footer__title">Explore</h2>
                    <ul className="footer__links">
                        {MAIN_NAV.map((item) => (
                            <li key={item.to}>
                                <Link to={item.to}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
