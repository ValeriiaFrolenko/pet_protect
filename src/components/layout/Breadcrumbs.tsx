import { Link, useLocation } from 'react-router-dom';
import { useAnimal } from '../../hooks/useAnimals';
import { buildCrumbs } from '../../lib/breadcrumbs';

function AnimalCrumbLabel({ id, fallback }: { id: number; fallback: string }) {
    const { data } = useAnimal(id);
    return <>{data?.name ?? fallback}</>;
}

export function Breadcrumbs() {
    const { pathname } = useLocation();
    const crumbs = buildCrumbs(pathname);

    if (crumbs.length < 2) {
        return null;
    }

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumbs__list page">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    const label =
                        crumb.animalId === undefined ? (
                            crumb.label
                        ) : (
                            <AnimalCrumbLabel id={crumb.animalId} fallback={crumb.label} />
                        );

                    return (
                        <li key={crumb.to} className="breadcrumbs__item">
                            {isLast ? (
                                <span aria-current="page">{label}</span>
                            ) : (
                                <Link to={crumb.to}>{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}