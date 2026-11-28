export function PageCrash() {
    return (
        <div className="state state--error" role="alert">
            <p>Something went wrong on this page.</p>
            <button type="button" className="button" onClick={() => window.location.reload()}>
                Reload
            </button>
        </div>
    );
}
