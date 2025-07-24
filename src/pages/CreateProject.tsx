import { useState, useCallback } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";

import type { CreateProjectFormProps, CreateProjectFormState } from "../types/CreateProjectForm";
import { structureLocation } from "../utils/structureLocation";
import ProjectForm from "../components/project/ProjectForm";

const db = getFirestore(app);

const CreateProject: React.FC<CreateProjectFormProps> = ({ onSuccess }) => {
  const initialState: CreateProjectFormState = {
    title: "",
    memberCount: 1,
    roles: [""],
    description: "",
    imageFile: null,
    imageUrl: "",
    loading: false,
    location: null,
    participationType: "in-person",
    virtualTimeZone: "",
    startDateTime: "",
    endDateTime: "",
  };

  const [formState, setFormState] = useState<CreateProjectFormState>(initialState);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [isValidDateRange, setIsValidDateRange] = useState(false);

  const setField = useCallback(<K extends keyof CreateProjectFormState>(
    field: K,
    value: CreateProjectFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleRoleChange = useCallback((index: number, value: string) => {
    setFormState((prev) => {
      const newRoles = [...prev.roles];
      newRoles[index] = value;
      return { ...prev, roles: newRoles };
    });
  }, []);

  const handleMemberCountChange = useCallback((count: number) => {
    setFormState((prev) => {
      const newRoles = [...prev.roles];
      if (count > newRoles.length) {
        for (let i = newRoles.length; i < count; i++) newRoles.push("");
      } else {
        newRoles.splice(count);
      }
      return { ...prev, roles: newRoles, memberCount: count };
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.participationType !== "virtual" && (!formState.location || !isValidLocation)) {
      alert("Please select a valid location from the suggestions.");
      return;
    }

    if (!isValidDateRange) {
      alert(
        "Please select a valid event date and time range.\n" +
        "- Start date/time cannot be in the past.\n" +
        "- End date/time must be after start date/time.\n" +
        "- Duration must be at least 4 hours."
      );
      return;
    }

    setField("loading", true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be signed in to create a project.");
      setField("loading", false);
      return;
    }

    if (formState.participationType === "virtual" && !formState.virtualTimeZone) {
      alert("Please select a valid virtual timezone.");
      return;
    }

    try {
      const imageUrl = formState.imageUrl || "";

      let structured = null;
      if (formState.location?.lat && formState.location?.lng) {
        structured = await structureLocation(formState.location.lat, formState.location.lng);
      }

      const locationLabel =
        structured?.city && structured?.region
          ? `${structured.city}, ${structured.region}`
          : structured?.city || structured?.region || structured?.country || "Unknown";


      const location = formState.location
        ? {
            lat: formState.location.lat,
            lng: formState.location.lng,
            address: formState.location.address ?? null,
            structured: structured ?? null,
            label: locationLabel,
          }
        : null;

      await addDoc(collection(db, "projects"), {
        title: formState.title,
        memberCount: formState.memberCount,
        roles: formState.roles,
        description: formState.description,
        imageUrl,
        location,
        participationType: formState.participationType,
        virtualTimeZone: formState.participationType === "virtual" ? formState.virtualTimeZone : null,
        startDateTime: formState.startDateTime,
        endDateTime: formState.endDateTime,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("Project created successfully!");

      setFormState(initialState);
      setIsValidLocation(false);
      setIsValidDateRange(false);
      onSuccess();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to create project. Try again.");
      setField("loading", false);
    }
  }, [formState, isValidLocation, isValidDateRange, onSuccess, setField]);

  const locationValiditySetter = useCallback((valid: boolean) => {
    setIsValidLocation(valid);
  }, []);

  const dateRangeValiditySetter = useCallback((valid: boolean) => {
    setIsValidDateRange(valid);
  }, []);

  return (
    <ProjectForm
      formState={formState}
      setField={setField}
      handleRoleChange={handleRoleChange}
      handleMemberCountChange={handleMemberCountChange}
      handleSubmit={handleSubmit}
      locationValiditySetter={locationValiditySetter}
      dateRangeValiditySetter={dateRangeValiditySetter}
    />
  );
};

export default CreateProject;