// src/components/LocationPicker.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerProps {
  location: { lat: number; lng: number } | null;
  onChange: (loc: { lat: number; lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ location, onChange }) => {
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return location ? <Marker position={[location.lat, location.lng]} /> : null;
  };

  return (
    <div className="h-48 w-full rounded border overflow-hidden">
      <MapContainer
        center={location || [20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;