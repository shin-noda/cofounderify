import type { Project } from "./Project";

export interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}