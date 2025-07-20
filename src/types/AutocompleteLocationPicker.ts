// types/AutocompleteLocationPicker.ts
export type Location = {
  lat: number;
  lng: number;
  address?: string;
};

export interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

export interface AutocompleteLocationPickerProps {
  location: Location | null;
  onChange: (loc: Location) => void;
}