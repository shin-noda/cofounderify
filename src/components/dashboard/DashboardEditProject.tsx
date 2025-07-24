import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import ProjectForm from "../../components/project/ProjectForm";
import type { CreateProjectFormState } from "../../types";

const DashboardEditProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Initialize formState with empty defaults matching CreateProjectFormState
  const [formState, setFormState] = useState<CreateProjectFormState>({
    title: "",
    description: "",
    memberCount: 1,
    roles: [],
    imageFile: null,
    loading: false,
    imageUrl: "",
    location: null,
    participationType: "in-person",
    virtualTimeZone: "",
    startDateTime: "",
    endDateTime: "",
  });

  const setField = <K extends keyof CreateProjectFormState>(
    field: K,
    value: CreateProjectFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Wait for user to load
    if (!projectId || !user?.uid) return;

    const fetchProject = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          alert("Project not found.");
          navigate("/dashboard");
          return;
        }

        const data = docSnap.data();

        if (data.ownerId !== user?.uid) {
          alert("You don't have permission to edit this project.");
          navigate("/");
          return;
        }

        // Map Firestore data to formState shape
        setFormState({
          title: data.title || "",
          description: data.description || "",
          roles: data.roles || [],
          memberCount: data.memberCount || 1,
          participationType: data.participationType || "in-person",
          location: data.location || null,
          virtualTimeZone: data.virtualTimeZone || "",
          startDateTime: data.startDateTime || "",
          endDateTime: data.endDateTime || "",
          imageUrl: data.imageUrl || "",
          imageFile: null, // always null on load, user can upload new file
          loading: false,
        });
      } catch (err) {
        console.error("Error loading project:", err);
        alert("Failed to load project.");
        navigate("/");
      }
    };

    fetchProject();
  }, [projectId, user?.uid, navigate]);

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...formState.roles];
    newRoles[index] = value;
    setField("roles", newRoles);
    };

  const handleSubmit = async (updatedData: CreateProjectFormState) => {
    try {
      setField("loading", true);
      const db = getFirestore();
      const docRef = doc(db, "projects", projectId!);

      // Exclude imageFile because Firestore can't store File object
      const { imageFile, loading, ...firestoreData } = updatedData;

      await updateDoc(docRef, firestoreData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project.");
    } finally {
      setField("loading", false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // or wherever you want to send them on cancel
    };

  if (!projectId) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProjectForm
        formState={formState}
        setField={setField}
        handleRoleChange={handleRoleChange}
        handleMemberCountChange={(newCount) => setField("memberCount", newCount)}
        handleSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formState);
        }}
        locationValiditySetter={() => {}}
        dateRangeValiditySetter={() => {}}
        isEditMode={true}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DashboardEditProject;