import { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../lib/firebase";

import type { CreateProjectFormProps, CreateProjectFormState } from "../types/CreateProjectForm";
import ProjectForm from "../components/ProjectForm";

const db = getFirestore(app);

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onSuccess }) => {
  const initialState: CreateProjectFormState = {
    title: "",
    memberCount: 1,
    roles: [""],
    description: "",
    imageFile: null,      // <-- include this!
    imageUrl: "",
    loading: false,
    location: null,       // <-- include this!
  };

  const [formState, setFormState] = useState<CreateProjectFormState>(initialState);

  const setField = <K extends keyof CreateProjectFormState>(field: K, value: CreateProjectFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...formState.roles];
    newRoles[index] = value;
    setField("roles", newRoles);
  };

  const handleMemberCountChange = (count: number) => {
    setField("memberCount", count);
    setFormState((prev) => {
      const newRoles = [...prev.roles];
      if (count > newRoles.length) {
        for (let i = newRoles.length; i < count; i++) newRoles.push("");
      } else {
        newRoles.splice(count);
      }
      return { ...prev, roles: newRoles, memberCount: count };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setField("loading", true);

    try {
      const imageUrl = formState.imageUrl || "";

      await addDoc(collection(db, "projects"), {
        title: formState.title,
        memberCount: formState.memberCount,
        roles: formState.roles,
        description: formState.description,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Project created successfully!");

      setFormState(initialState);  // reset state with all required fields

      onSuccess();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to create project. Try again.");
      setField("loading", false);
    }
  };

  return (
    <ProjectForm
      formState={formState}
      setField={setField}
      handleRoleChange={handleRoleChange}
      handleMemberCountChange={handleMemberCountChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateProjectForm;