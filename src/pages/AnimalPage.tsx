import { useParams } from 'react-router-dom';
import { AnimalDetails } from '../features/animal/AnimalDetails';
import { NotFoundPage } from './NotFoundPage';

export function AnimalPage() {
    const { animalId } = useParams();
    const id = Number(animalId);

    if (!Number.isInteger(id) || id <= 0) {
        return <NotFoundPage />;
    }

    return <AnimalDetails id={id} />;
}