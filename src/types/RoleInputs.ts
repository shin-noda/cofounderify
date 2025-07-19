// src/types/RoleInputs.ts
export interface RoleInputsProps {
  roles: string[];
  onRoleChange: (index: number, value: string) => void;
}