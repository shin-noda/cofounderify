// src/types/Project.ts
import { Timestamp } from "firebase/firestore";

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  memberCount: number;
  roles: string[];
  location?: Location | null;
  createdAt?: Timestamp | Date | null;
  startDateTime?: string | Timestamp | null;
  endDateTime?: string | Timestamp | null;
  ownerId: string;
  requests?: {
    uid: string;
    displayName: string;
    role: string;
    message: string;
    timestamp: Timestamp;
  }[];
}

export interface ProjectCardProps extends Project {}