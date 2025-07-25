import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AutocompleteLocationPickerProps, Place, Location } from "../../types/AutocompleteLocationPicker";

// Fix leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fly map to location changes
const FlyToLocation: React.FC<{ location: Location | null }> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 12);
    }
  }, [location, map]);
  return null;
};

interface ExtendedAutocompleteLocationPickerProps extends AutocompleteLocationPickerProps {
  onValidChange?: (isValid: boolean) => void;
}

const ProjectAutocompleteLocationPicker: React.FC<ExtendedAutocompleteLocationPickerProps> = ({
  location,
  onChange,
  onValidChange,
}) => {
  const [input, setInput] = useState(location?.address || "");
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isValidLocation, setIsValidLocation] = useState(!!location);
  const containerRef = useRef<HTMLDivElement>(null);

  // Notify parent when validity changes
  useEffect(() => {
    if (onValidChange) {
      onValidChange(isValidLocation);
    }
  }, [isValidLocation, onValidChange]);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          input
        )}&addressdetails=1&limit=5`,
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data: Place[]) => setSuggestions(data))
        .catch(() => {}); // ignore errors silently
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [input]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When user types manually, invalidate location until they select from suggestions
  const handleInputChange = (value: string) => {
    setInput(value);
    setIsValidLocation(false);
  };

  // When user clicks a suggestion, set location and mark as valid
  const handleSelectSuggestion = (place: Place) => {
    const selected = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      address: place.display_name,
    };
    onChange(selected);
    setInput(place.display_name);
    setSuggestions([]);
    setIsFocused(false);
    setIsValidLocation(true);
  };

  return (
    <div ref={containerRef} className="space-y-2">
      <input
        type="text"
        placeholder="Search location..."
        className="w-full border rounded p-2"
        value={input}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="border rounded bg-white max-h-40 overflow-y-auto shadow-md z-10 relative">
          {suggestions.map((place, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSuggestion(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      <div className="h-48 w-full rounded border overflow-hidden z-0">
        <MapContainer
          center={location ? [location.lat, location.lng] : [20, 0]}
          zoom={location ? 12 : 2}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && <Marker position={[location.lat, location.lng]} />}
          <FlyToLocation location={location} />
        </MapContainer>
      </div>
    </div>
  );
};

export default ProjectAutocompleteLocationPicker;