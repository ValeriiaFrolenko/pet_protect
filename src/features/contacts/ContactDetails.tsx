import { SHELTER } from '../../app/shelter';
import { toMailHref, toOpenStreetMapHref, toTelHref } from '../../lib/contacts';

export function ContactDetails() {
    const { lat, lng } = SHELTER.location;

    return (
        <dl className="contact-details">
            <div className="contact-details__row">
                <dt>Address</dt>
                <dd>
                    {SHELTER.address}
                    <br />
                    <a href={toOpenStreetMapHref(lat, lng)} target="_blank" rel="noreferrer">
                        Open on OpenStreetMap
                    </a>
                </dd>
            </div>
            <div className="contact-details__row">
                <dt>Phone</dt>
                <dd>
                    <a href={toTelHref(SHELTER.phone)}>{SHELTER.phone}</a>
                </dd>
            </div>
            <div className="contact-details__row">
                <dt>Email</dt>
                <dd>
                    <a href={toMailHref(SHELTER.email)}>{SHELTER.email}</a>
                </dd>
            </div>
            <div className="contact-details__row">
                <dt>Opening hours</dt>
                <dd>
                    {SHELTER.hours.map((slot) => (
                        <div key={slot.days}>
                            {slot.days}: {slot.time}
                        </div>
                    ))}
                </dd>
            </div>
        </dl>
    );
}
