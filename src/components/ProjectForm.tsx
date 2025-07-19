// src/components/ProjectForm.tsx
import React from "react";
import { RoleInputs, ImageUploader} from "../components";
import type { ProjectFormProps } from "../types/CreateProjectForm";
import AutocompleteLocationPicker from "./AutocompleteLocationPicker";

const ProjectForm: React.FC<ProjectFormProps> = ({
  formState,
  setField,
  handleRoleChange,
  handleMemberCountChange,
  handleSubmit,
}) => (
  <div className="max-w-md mx-auto mt-8 text-left">
    <h2 className="text-2xl font-bold mb-4">Create Your Project</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          required
          value={formState.title}
          onChange={(e) => setField("title", e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="e.g. Remote Devs Connect"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Members (including Big Brainer)
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={formState.memberCount}
          onChange={(e) => handleMemberCountChange(Number(e.target.value))}
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <RoleInputs roles={formState.roles} onRoleChange={handleRoleChange} />

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Description</label>
        <textarea
          required
          rows={4}
          value={formState.description}
          onChange={(e) => setField("description", e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="Describe your project"
        />
      </div>

      <ImageUploader onFileChange={(file) => setField("imageUrl", file || "")} />

      <AutocompleteLocationPicker
        location={formState.location}
        onChange={(loc) => setField("location", loc)}
      />

      <button
        type="submit"
        disabled={formState.loading}
        className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition ${
          formState.loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {formState.loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  </div>
);

export default ProjectForm;