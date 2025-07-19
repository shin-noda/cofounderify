// src/types/ProjectCard.ts
import type { Project } from "./Project";

export interface ProjectCardProps extends Project {
  onClick?: () => void;
}