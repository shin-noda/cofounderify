import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AutocompleteLocationPickerProps, Place, Location } from "../types/AutocompleteLocationPicker";

// Fix leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const FlyToLocation: React.FC<{ location: Location | null }> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 12);
    }
  }, [location, map]);
  return null;
};

const AutocompleteLocationPicker: React.FC<AutocompleteLocationPickerProps> = ({
  location,
  onChange,
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    // Debounce: wait 250ms after user stops typing before fetching
    const debounceTimeout = setTimeout(() => {
      const controller = new AbortController();

      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          input
        )}&addressdetails=1&limit=5`,
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data: Place[]) => setSuggestions(data))
        .catch(() => {});

      return () => controller.abort();
    }, 250);

    // Clear the timeout if input changes before 500ms
    return () => clearTimeout(debounceTimeout);
  }, [input]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="space-y-2">
      <input
        type="text"
        placeholder="Search location..."
        className="w-full border rounded p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="border rounded bg-white max-h-40 overflow-y-auto shadow-md">
          {suggestions.map((place, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                const loc = { lat: parseFloat(place.lat), lng: parseFloat(place.lon) };
                onChange(loc);
                setInput(place.display_name);
                setSuggestions([]);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      <div className="h-48 w-full rounded border overflow-hidden">
        <MapContainer
          center={location || [20, 0]}
          zoom={location ? 12 : 2}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          {location && <Marker position={[location.lat, location.lng]} />}
          <FlyToLocation location={location} />
        </MapContainer>
      </div>
    </div>
  );
};

export default AutocompleteLocationPicker;