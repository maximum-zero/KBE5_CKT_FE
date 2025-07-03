import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngTuple } from 'leaflet';
import type { LatLng } from '../types';

type RouteMapProps = {
  traceLogs: LatLng[];
};

const ChangeMapCenter = ({ center }: { center: LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const RouteMap = ({ traceLogs }: RouteMapProps) => {
  if (!traceLogs.length) return null;

  const points: LatLngTuple[] = traceLogs.map(log => [
    parseFloat(log.lat) / 1_000_000,
    parseFloat(log.lon) / 1_000_000,
  ]);

  const center = points[Math.floor(points.length / 2)];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '8px', marginTop: '1rem' }}
    >
      <ChangeMapCenter center={center} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={points} color="blue" />
    </MapContainer>
  );
};

export default RouteMap;
