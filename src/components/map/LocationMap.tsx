import 'leaflet/dist/leaflet.css';
import { map as createMap, marker, tileLayer } from 'leaflet';
import { useEffect, useRef } from 'react';
import { markerIcon } from './markerIcon';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAX_ZOOM = 19;

interface LocationMapProps {
    lat: number;
    lng: number;
    label: string;
    zoom?: number;
}

export function LocationMap({ lat, lng, label, zoom = 15 }: LocationMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        // The map sits inside a scrollable page, so the wheel must keep scrolling the page.
        const instance = createMap(container, { scrollWheelZoom: false }).setView([lat, lng], zoom);

        tileLayer(TILE_URL, { maxZoom: MAX_ZOOM, attribution: ATTRIBUTION }).addTo(instance);

        const popup = document.createElement('span');
        popup.textContent = label;
        marker([lat, lng], { icon: markerIcon, title: label })
            .addTo(instance)
            .bindPopup(popup)
            .openPopup();

        return () => {
            instance.remove();
        };
    }, [lat, lng, label, zoom]);

    return <div ref={containerRef} className="location-map" role="region" aria-label={`Map: ${label}`} />;
}
