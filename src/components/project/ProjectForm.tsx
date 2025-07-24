// src/components/ProjectForm.tsx
import React from "react";
import {
  ProjectRoleInputs,
  ProjectImageUploader,
  ProjectAutocompleteLocationPicker,
  ProjectTitleInput,
  ProjectMemberCountInput,
  ProjectDescriptionInput,
  ProjectSubmitButton,
} from ".";
import ProjectDateRangePicker from "./ProjectDateRangePicker";
import ProjectLocationType from "./ProjectLocationType";
import ProjectVirtualTimeZonePicker from "./ProjectVirtualTimeZonePicker";
import type { ProjectFormProps } from "../../types/CreateProjectForm";

const ProjectForm: React.FC<ProjectFormProps> = ({
  formState,
  setField,
  handleRoleChange,
  handleMemberCountChange,
  handleSubmit,
  locationValiditySetter,
  dateRangeValiditySetter,
}) => {
  return (
    <div className="max-w-md mx-auto mt-8 text-left">
      <h2 className="text-2xl font-bold mb-4">Create Your Project</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <ProjectTitleInput
          value={formState.title}
          onChange={(val) => setField("title", val)}
        />

        <ProjectMemberCountInput
          value={formState.memberCount}
          onChange={handleMemberCountChange}
        />

        <ProjectRoleInputs
          roles={formState.roles}
          onRoleChange={handleRoleChange}
        />

        <ProjectDescriptionInput
          value={formState.description}
          onChange={(val) => setField("description", val)}
        />

        <ProjectImageUploader
          onFileChange={(file) => setField("imageUrl", file || "")}
        />

        {/* Participation type selector */}
        <ProjectLocationType
          value={formState.participationType}
          onChange={(val) => setField("participationType", val)}
        />

        {/* Conditionally render location picker or virtual timezone picker */}
        {formState.participationType === "virtual" ? (
          <ProjectVirtualTimeZonePicker
  value={formState.virtualTimeZone ?? ""}
            onChange={(val) => setField("virtualTimeZone", val)}
          />
        ) : (
          <ProjectAutocompleteLocationPicker
            location={formState.location}
            onChange={(loc) => setField("location", loc)}
            onValidChange={locationValiditySetter}
          />
        )}

        <ProjectDateRangePicker
          startDateTime={formState.startDateTime}
          endDateTime={formState.endDateTime}
          onChange={(start, end, isValid) => {
            setField("startDateTime", start);
            setField("endDateTime", end);
            if (dateRangeValiditySetter) dateRangeValiditySetter(isValid);
          }}
        />

        <ProjectSubmitButton
          loading={formState.loading}
        />

      </form>
    </div>
  );
};

export default ProjectForm;
