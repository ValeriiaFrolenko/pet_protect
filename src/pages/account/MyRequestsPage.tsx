import { Link } from 'react-router-dom';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { PendingAdoptionRequest } from '../../features/animal/PendingAdoptionRequest';
import { useMyAdoptionRequestsWithAnimal } from '../../hooks/useAdoption';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatAdoptionStatus, formatDateTime } from '../../lib/format';

export function MyRequestsPage() {
    const { data, isPending, isError, error, refetch } = useMyAdoptionRequestsWithAnimal();

    useDocumentTitle('My requests');

    if (isPending) {
        return <LoadingState />;
    }

    if (isError) {
        return <ErrorState message={error.message} onRetry={() => void refetch()} />;
    }

    if (data.length === 0) {
        return (
            <section className="my-requests">
                <h1>My requests</h1>
                <p className="state state--empty">
                    You have not sent any adoption requests yet.{' '}
                    <Link to="/animals">Browse animals</Link>.
                </p>
            </section>
        );
    }

    return (
        <section className="my-requests">
            <h1>My requests</h1>
            <ul className="my-requests__list">
                {data.map((request) => (
                    <li key={request.id} className="my-requests__item">
                        {request.animal ? (
                            <img
                                className="my-requests__photo"
                                src={request.animal.photo_url}
                                alt=""
                                width={64}
                                height={64}
                            />
                        ) : (
                            <div className="my-requests__photo my-requests__photo--placeholder" />
                        )}
                        <div className="my-requests__info">
                            <Link to={`/animals/${request.animal_id}`} className="my-requests__name">
                                {request.animal?.name ?? `#${request.animal_id}`}
                            </Link>
                            <p className="my-requests__message">{request.message}</p>
                            <time className="my-requests__date" dateTime={request.created_at}>
                                {formatDateTime(request.created_at)}
                            </time>
                        </div>
                        <div className="my-requests__status">
                            {request.status === 'pending' ? (
                                <PendingAdoptionRequest request={request} />
                            ) : (
                                <span className={`request-status request-status--${request.status}`}>
                                    {formatAdoptionStatus(request.status)}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
