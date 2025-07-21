// src/components/Project/ProjectDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { app } from "../../lib/firebase";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import type { Project } from "../../types/Project";
import ProjectOverlayConfirmation from "./ProjectOverlayConfirmation";
import ProjectInfoDisplay from "./ProjectInfoDisplay";
import ProjectBackButton from "./ProjectBackButton";
import ProjectRequestMessageSent from "./ProjectRequestMessageSent";
import ProjectRequestsList from "./ProjectRequestsList";
import ProjectRolesButtons from "./ProjectRolesButtons";

const db = getFirestore(app);
const auth = getAuth(app);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSentRole, setRequestSentRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUserRequested, setHasUserRequested] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!id) {
      console.error("Project ID is missing.");
      setProject(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const docRef = doc(db, "projects", id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Project & { requests?: any[] };
        setProject({ ...data, id: docSnap.id });

        // --- ADDED DEBUG LOGS HERE ---
        // console.log("User:", user);
        // console.log("Project requests:", data.requests);

        if (user) {
          const alreadyRequested = (data.requests ?? []).some(
            (r) => r.uid === user.uid
          );
          // console.log("Already requested?", alreadyRequested);

          if (alreadyRequested) {
            const matched = (data.requests ?? []).find(
              (r) => r.uid === user.uid
            );
            // console.log("Matched request:", matched);
            setRequestSentRole(matched?.role ?? null);
          } else {
            setRequestSentRole(null);
          }
          setHasUserRequested(alreadyRequested);
        } else {
          setHasUserRequested(false);
          setRequestSentRole(null);
        }
      } else {
        setProject(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, user]);

  const handleRequestClick = (role: string) => {
    if (!user) {
      alert("Please sign in to join a project.");
      return;
    }
    setSelectedRole(role);
    setRequestMessage("");
    setIsModalOpen(true);
  };

  const handleConfirmRequest = async () => {
    if (!project?.id || !selectedRole || !user || hasUserRequested) return;

    const request = {
      uid: user.uid,
      displayName: user.displayName ?? "Anonymous",
      role: selectedRole,
      message: requestMessage,
      timestamp: Timestamp.now(),
    };

    const docRef = doc(db, "projects", project.id);
    await updateDoc(docRef, {
      requests: arrayUnion(request),
    });

    setRequestSentRole(selectedRole);
    setHasUserRequested(true);
    setIsModalOpen(false);
  };

  const formatDateTime = (value?: Timestamp | Date | string | null) => {
    if (!value) return "N/A";
    const date =
      typeof value === "string"
        ? new Date(value)
        : value instanceof Timestamp
        ? value.toDate()
        : value;

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };

    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }

    return date.toLocaleString(undefined, options).replace(", ", " • ");
  };

  if (loading) return <p className="text-center mt-8">Loading project...</p>;
  if (!project) return <p className="text-center mt-8">Project not found.</p>;

  const isOwner = user?.uid === project.ownerId;
  const takenRoles = project.requests?.map((r) => r.role) ?? [];
  const yourRole = isOwner ? project.roles[0] : requestSentRole;


  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <ProjectBackButton />

      <ProjectInfoDisplay project={project} formatDateTime={formatDateTime} />

      <ProjectRolesButtons
        roles={project.roles}
        yourRole={yourRole}
        isOwner={isOwner}
        takenRoles={takenRoles}
        onRequestClick={handleRequestClick}
      />

      {isOwner && project.id && project.requests && (
        <ProjectRequestsList projectId={project.id} requests={project.requests} />
      )}

      {isModalOpen && (
        <ProjectOverlayConfirmation
          selectedRole={selectedRole}
          requestMessage={requestMessage}
          onRequestMessageChange={setRequestMessage}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmRequest}
          disabled={hasUserRequested}
        />
      )}

      {!isOwner && hasUserRequested && (
        <ProjectRequestMessageSent role={requestSentRole} />
      )}
    </div>
  );
};

export default ProjectDetail;