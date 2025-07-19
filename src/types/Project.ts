// src/types/Project.ts
export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  memberCount: number;
  roles: string[];
  createdAt?: any; // Firestore timestamp or Date
}

export interface ProjectCardProps extends Project {}