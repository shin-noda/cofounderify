export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

export interface AutocompleteLocationPickerProps {
  location: Location | null;
  onChange: (loc: Location) => void;
}