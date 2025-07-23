export interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
  placeholder?: string;
  debounceTime?: number;
}
