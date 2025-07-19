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
  } | null;
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
}

export interface CreateProjectFormProps {
  onSuccess: () => void;
}