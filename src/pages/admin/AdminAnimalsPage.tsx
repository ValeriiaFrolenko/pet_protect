import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmButton } from '../../components/ConfirmButton';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { Modal } from '../../components/Modal';
import { Pagination } from '../../components/Pagination';
import { filterAnimals } from '../../features/admin/adminFilters';
import { AnimalForm } from '../../features/admin/AnimalForm';
import { describeAdminError } from '../../features/admin/errorMessages';
import { useAdminAnimals, useDeleteAnimal } from '../../hooks/useAdminAnimals';
import { formatAge, formatStatus } from '../../lib/format';
import { paginate } from '../../lib/paginate';
import type { Animal } from '../../types/animal';

type Editing = Animal | 'new' | null;

export function AdminAnimalsPage() {
    const { data, isPending, isError, error, refetch } = useAdminAnimals();
    const deleteAnimal = useDeleteAnimal();
    const [editing, setEditing] = useState<Editing>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const deferredSearch = useDeferredValue(search);

    const visible = useMemo(() => filterAnimals(data ?? [], deferredSearch), [data, deferredSearch]);
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
                        placeholder="Name or breed"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                    />
                </label>
                <button type="button" className="button button--primary" onClick={() => setEditing('new')}>
                    Add animal
                </button>
            </div>

            {deleteAnimal.isError && (
                <p className="field__error" role="alert">
                    {describeAdminError(deleteAnimal.error)}
                </p>
            )}

            {paged.total === 0 ? (
                <p className="state state--empty">No animals found.</p>
            ) : (
                <div className="admin__table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Species</th>
                                <th scope="col">Age</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.items.map((animal) => (
                                <tr key={animal.id}>
                                    <td>
                                        <img
                                            className="admin-table__thumb"
                                            src={animal.photo_url}
                                            alt=""
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
                                    </td>
                                    <td>{animal.species}</td>
                                    <td>{formatAge(animal.age_months)}</td>
                                    <td>{formatStatus(animal.status)}</td>
                                    <td>
                                        <div className="admin-table__actions">
                                            <button
                                                type="button"
                                                className="button"
                                                onClick={() => setEditing(animal)}
                                            >
                                                Edit
                                            </button>
                                            <ConfirmButton
                                                label="Delete"
                                                pendingLabel="Deleting..."
                                                isPending={
                                                    deleteAnimal.isPending &&
                                                    deleteAnimal.variables === animal.id
                                                }
                                                title={`Delete ${animal.name}?`}
                                                description="The animal, its adoption requests and its sponsorships will be deleted. This cannot be undone."
                                                confirmLabel="Delete"
                                                dismissLabel="Keep"
                                                onConfirm={() => deleteAnimal.mutate(animal.id)}
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
                title={editing === 'new' ? 'Add animal' : 'Edit animal'}
                onClose={close}
            >
                {editing !== null && (
                    <AnimalForm animal={editing === 'new' ? null : editing} onDone={close} />
                )}
            </Modal>
        </>
    );
}
