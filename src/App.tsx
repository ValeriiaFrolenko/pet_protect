import { useAnimals } from './hooks/useAnimals';

function App() {
    const { data, isPending, isError, error, refetch } = useAnimals();

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return (
            <div>
                <p>{error.message}</p>
                <button onClick={() => refetch()}>Retry</button>
            </div>
        );
    }

    return (
        <ul>
            {data.map((animal) => (
                <li key={animal.id}>
                    {animal.name} ({animal.status})
                </li>
            ))}
        </ul>
    );
}

export default App;