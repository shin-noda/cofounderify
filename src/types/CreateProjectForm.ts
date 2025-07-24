// types/CreateProjectForm.ts
export interface CreateProjectFormState {
  title: string;
  description: string;
  memberCount: number;
  roles: string[];
  imageFile: File | null;
  loading: boolean;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  } | null;
  participationType: string;
  virtualTimeZone?: string;
  startDateTime: string;
  endDateTime: string;
}

export interface ProjectFormProps {
  formState: CreateProjectFormState;
  setField: <K extends keyof CreateProjectFormState>(
    field: K,
    value: CreateProjectFormState[K]
  ) => void;
  handleRoleChange: (index: number, value: string) => void;
  handleMemberCountChange: (count: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  locationValiditySetter?: (valid: boolean) => void;
  dateRangeValiditySetter?: (valid: boolean) => void;
}

export interface CreateProjectFormProps {
  onSuccess: () => void;
}