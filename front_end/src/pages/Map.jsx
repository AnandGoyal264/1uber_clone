import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function App() {
  const [addressA, setAddressA] = useState('');
  const [addressB, setAddressB] = useState('');
  const [coordsA, setCoordsA] = useState(null);
  const [coordsB, setCoordsB] = useState(null);
  const [distance, setDistance] = useState(null);

  const geocode = async (address) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
      return null;
    }
  };

  const calculateDistance = (pointA, pointB) => {
    const R = 6371e3; // metres
    const φ1 = pointA.lat * Math.PI/180;
    const φ2 = pointB.lat * Math.PI/180;
    const Δφ = (pointB.lat - pointA.lat) * Math.PI/180;
    const Δλ = (pointB.lng - pointA.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in meters
    return d / 1000; // in km
  };

  const handleSearch = async () => {
    const pointA = await geocode(addressA);
    const pointB = await geocode(addressB);
    setCoordsA(pointA);
    setCoordsB(pointB);

    if (pointA && pointB) {
      const dist = calculateDistance(pointA, pointB);
      setDistance(dist.toFixed(2));
    }
  };

  const center = coordsA || [51.505, -0.09];

  // Custom hook to fit bounds after markers are added
  function FitBounds() {
    const map = useMap();

    useEffect(() => {
      if (coordsA && coordsB) {
        const bounds = L.latLngBounds([coordsA, coordsB]);
        map.fitBounds(bounds, { padding: [50, 50] }); // Adds padding to edges
      }
    }, [coordsA, coordsB, map]);

    return null;
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <input type="text" value={addressA} onChange={(e) => setAddressA(e.target.value)} placeholder="Address A" />
        <input type="text" value={addressB} onChange={(e) => setAddressB(e.target.value)} placeholder="Address B" />
        <button onClick={handleSearch}>Find Distance</button>
        {distance && <p>Distance: {distance} km</p>}
      </div>

      <MapContainer center={center} zoom={5} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordsA && (
          <Marker position={coordsA}>
            <Popup>Address A<br />Lat: {coordsA.lat}, Lng: {coordsA.lng}</Popup>
          </Marker>
        )}
        {coordsB && (
          <Marker position={coordsB}>
            <Popup>Address B<br />Lat: {coordsB.lat}, Lng: {coordsB.lng}</Popup>
          </Marker>
        )}
        {coordsA && coordsB && (
          <Polyline positions={[[coordsA.lat, coordsA.lng], [coordsB.lat, coordsB.lng]]} color="red" />
        )}
        <FitBounds />
      </MapContainer>
    </div>
  );
}

export default App;
