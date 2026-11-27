import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { LoadingState } from '../../components/LoadingState';
import { SHELTER } from '../../app/shelter';
import { toOpenStreetMapHref } from '../../lib/contacts';

// Leaflet is loaded only when the Contacts page is opened.
const LocationMap = lazy(() =>
    import('../../components/map/LocationMap').then((module) => ({ default: module.LocationMap })),
);

const { lat, lng } = SHELTER.location;

function MapUnavailable() {
    return (
        <p className="state state--error" role="alert">
            The map could not be loaded.{' '}
            <a href={toOpenStreetMapHref(lat, lng)} target="_blank" rel="noreferrer">
                Open it on OpenStreetMap
            </a>
            .
        </p>
    );
}

export function ShelterMap() {
    return (
        <ErrorBoundary fallback={<MapUnavailable />}>
            <Suspense fallback={<LoadingState />}>
                <LocationMap lat={lat} lng={lng} label={SHELTER.name} />
            </Suspense>
        </ErrorBoundary>
    );
}
