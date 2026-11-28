import { useDeferredValue, useMemo, useState } from 'react';
import { ConfirmButton } from '../../components/ConfirmButton';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { Modal } from '../../components/Modal';
import { Pagination } from '../../components/Pagination';
import { filterEvents } from '../../features/admin/adminFilters';
import { describeAdminError } from '../../features/admin/errorMessages';
import { EventForm } from '../../features/admin/EventForm';
import { useDeleteEvent } from '../../hooks/useAdminEvents';
import { useEvents } from '../../hooks/useEvents';
import { formatDateTime } from '../../lib/format';
import { paginate } from '../../lib/paginate';
import type { ShelterEvent } from '../../types/event';

type Editing = ShelterEvent | 'new' | null;

export function AdminEventsPage() {
    const { data, isPending, isError, error, refetch } = useEvents();
    const deleteEvent = useDeleteEvent();
    const [editing, setEditing] = useState<Editing>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const deferredSearch = useDeferredValue(search);

    const visible = useMemo(() => filterEvents(data ?? [], deferredSearch), [data, deferredSearch]);
    const paged = paginate(visible, page);
    const close = () => setEditing(null);

    if (isPending) {
        return <LoadingState />;
    }

    if (isError && !data) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    return (
        <>
            <div className="admin__toolbar">
                <label className="field">
                    <span className="field__label">Search</span>
                    <input
                        className="field__control"
                        type="search"
                        placeholder="Title or location"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                    />
                </label>
                <button type="button" className="button button--primary" onClick={() => setEditing('new')}>
                    Add event
                </button>
            </div>

            {deleteEvent.isError && (
                <p className="field__error" role="alert">
                    {describeAdminError(deleteEvent.error)}
                </p>
            )}

            {paged.total === 0 ? (
                <p className="state state--empty">No events found.</p>
            ) : (
                <div className="admin__table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Title</th>
                                <th scope="col">Location</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.items.map((event) => (
                                <tr key={event.id}>
                                    <td>
                                        <time dateTime={event.starts_at}>{formatDateTime(event.starts_at)}</time>
                                    </td>
                                    <td>{event.title}</td>
                                    <td>{event.location}</td>
                                    <td>
                                        <div className="admin-table__actions">
                                            <button
                                                type="button"
                                                className="button"
                                                onClick={() => setEditing(event)}
                                            >
                                                Edit
                                            </button>
                                            <ConfirmButton
                                                label="Delete"
                                                pendingLabel="Deleting..."
                                                isPending={
                                                    deleteEvent.isPending && deleteEvent.variables === event.id
                                                }
                                                title={`Delete "${event.title}"?`}
                                                description="The event will be deleted. This cannot be undone."
                                                confirmLabel="Delete"
                                                dismissLabel="Keep"
                                                onConfirm={() => deleteEvent.mutate(event.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination page={paged.page} totalPages={paged.totalPages} onChange={setPage} />

            <Modal
                open={editing !== null}
                title={editing === 'new' ? 'Add event' : 'Edit event'}
                onClose={close}
            >
                {editing !== null && (
                    <EventForm event={editing === 'new' ? null : editing} onDone={close} />
                )}
            </Modal>
        </>
    );
}
