import { ContactDetails } from '../features/contacts/ContactDetails';
import { ShelterMap } from '../features/contacts/ShelterMap';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactsPage() {
    useDocumentTitle('Contacts');

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
