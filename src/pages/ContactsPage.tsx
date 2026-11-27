import { ContactDetails } from '../features/contacts/ContactDetails';
import { ShelterMap } from '../features/contacts/ShelterMap';

export function ContactsPage() {
    return (
        <section>
            <h1>Contacts</h1>
            <div className="contacts">
                <ContactDetails />
                <ShelterMap />
            </div>
        </section>
    );
}
