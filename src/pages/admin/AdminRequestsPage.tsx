import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmButton } from '../../components/ConfirmButton';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { Pagination } from '../../components/Pagination';
import { SelectField } from '../../components/SelectField';
import { filterRequests, type RequestFilter } from '../../features/admin/adminFilters';
import { REQUEST_FILTER_OPTIONS, REQUEST_STATUS_LABELS } from '../../features/admin/adminOptions';
import { describeDecisionError } from '../../features/admin/errorMessages';
import { useAdminRequests, useDecideRequest } from '../../hooks/useAdminRequests';
import { formatDateTime } from '../../lib/format';
import { paginate } from '../../lib/paginate';

export function AdminRequestsPage() {
    const { data, isPending, isError, error, refetch } = useAdminRequests();
    const decide = useDecideRequest();
    const [status, setStatus] = useState<RequestFilter>('pending');
    const [page, setPage] = useState(1);

    const visible = useMemo(() => filterRequests(data ?? [], status), [data, status]);
    const paged = paginate(visible, page);

    if (isPending) {
        return <LoadingState />;
    }

    if (isError && !data) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    const isDeciding = (requestId: number) =>
        decide.isPending && decide.variables.requestId === requestId;

    return (
        <>
            <div className="admin__toolbar">
                <SelectField
                    label="Status"
                    value={status}
                    options={REQUEST_FILTER_OPTIONS}
                    onChange={(value) => {
                        setStatus(value);
                        setPage(1);
                    }}
                />
            </div>

            {decide.isError && (
                <p className="field__error" role="alert">
                    {describeDecisionError(decide.error)}
                </p>
            )}

            {paged.total === 0 ? (
                <p className="state state--empty">No requests found.</p>
            ) : (
                <div className="admin__table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Animal</th>
                                <th scope="col">Requester</th>
                                <th scope="col">Message</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.items.map((request) => (
                                <tr key={request.id}>
                                    <td>
                                        <time dateTime={request.created_at}>
                                            {formatDateTime(request.created_at)}
                                        </time>
                                    </td>
                                    <td>
                                        <Link to={`/animals/${request.animal_id}`}>
                                            {request.animal?.name ?? `#${request.animal_id}`}
                                        </Link>
                                    </td>
                                    <td>{request.requester_email || 'Unknown'}</td>
                                    <td className="admin-table__message">{request.message}</td>
                                    <td>{REQUEST_STATUS_LABELS[request.status]}</td>
                                    <td>
                                        {request.status === 'pending' && (
                                            <div className="admin-table__actions">
                                                <button
                                                    type="button"
                                                    className="button button--primary"
                                                    disabled={isDeciding(request.id)}
                                                    onClick={() =>
                                                        decide.mutate({
                                                            requestId: request.id,
                                                            decision: 'approved',
                                                        })
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                <ConfirmButton
                                                    label="Reject"
                                                    pendingLabel="Rejecting..."
                                                    isPending={isDeciding(request.id)}
                                                    title="Reject this request?"
                                                    description="The animal becomes available again."
                                                    confirmLabel="Reject"
                                                    dismissLabel="Keep pending"
                                                    onConfirm={() =>
                                                        decide.mutate({
                                                            requestId: request.id,
                                                            decision: 'rejected',
                                                        })
                                                    }
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination page={paged.page} totalPages={paged.totalPages} onChange={setPage} />
        </>
    );
}
