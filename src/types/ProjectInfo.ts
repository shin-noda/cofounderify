// src/types/ProjectInfo.ts
export interface ProjectInfoProps {
  title: string;
  description: string;
  memberCount: number;
  roles: string[];
  startDateTime: string;  // ISO string expected
  endDateTime?: string;   // optional
  location?: string;      // optional
}