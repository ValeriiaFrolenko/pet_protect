interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="state state--error" role="alert">
            <p>{message}</p>
            <button type="button" className="button" onClick={onRetry}>
                Retry
            </button>
        </div>
    );
}
