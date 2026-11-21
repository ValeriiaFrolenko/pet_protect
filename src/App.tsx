import { useAnimals } from './hooks/useAnimals';
import { UserMenu } from './features/auth/UserMenu';

function App() {
    const { data, isPending, isError, error, refetch } = useAnimals();

    return (
        <>
            <UserMenu />

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