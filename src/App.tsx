import { useAnimals } from './hooks/useAnimals';
import { UserMenu } from './features/auth/UserMenu';
import {useCreateAdoptionRequest} from "./hooks/useAdoption.ts";

function App() {
    const { data, isPending, isError, error, refetch } = useAnimals();
    const adopt = useCreateAdoptionRequest();

    return (
        <>
            <UserMenu />
            <button onClick={() => adopt.mutate({ animalId: 1, message: 'test' })}>Adopt Rex</button>
            {adopt.isSuccess && <p>Request created</p>}
            {adopt.isError && <p>{adopt.error.kind}: {adopt.error.message}</p>}
            {isPending && <p>Loading...</p>}

            {isError && (
                <div>
                    <p>{error.message}</p>
                    <button onClick={() => refetch()}>Retry</button>
                </div>
            )}

            {data && (
                <ul>
                    {data.map((animal) => (
                        <li key={animal.id}>
                            {animal.name} ({animal.status})
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default App;