// src/components/Project/ProjectDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../lib/firebase";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import type { Project, Request, Member } from "../../types/Project";
import DashboardProjectOverlayConfirmation from "./DashboardProjectOverlayConfirmation";
import DashboardProjectInfoDisplay from "./DashboardProjectInfoDisplay";
import DashboardProjectBackButton from "./DashboardProjectBackButton";
import DashboardProjectRequestMessageSent from "./DashboardProjectRequestMessageSent";
import DashboardProjectRequestsList from "./DashboardProjectRequestsList";
import DashboardProjectRolesButtons from "./DashboaredProjectRolesButtons";
import DashboardEditProjectButton from "./DashboardEditProjectButton";
import DashboardDeleteProjectButton from "./DashboardDeleteProjectButton";

const db = getFirestore(app);
const auth = getAuth(app);

const DashboardProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSentRole, setRequestSentRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUserRequested, setHasUserRequested] = useState(false);

  const navigate = useNavigate();

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Load project by ID and track updates
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
      if (!docSnap.exists()) {
        setProject(null);
        setLoading(false);
        return;
      }

      const data = docSnap.data() as Project;
      const requests: Request[] = data.requests ?? [];
      const members: Member[] = data.members ?? [];

      const fullProject: Project = {
        ...data,
        id: docSnap.id,
        requests,
        members,
      };

      setProject(fullProject);

      if (user) {
        const existingRequest = requests.find((r) => r.uid === user.uid);
        setHasUserRequested(!!existingRequest);
        setRequestSentRole(existingRequest?.role ?? null);
      } else {
        setHasUserRequested(false);
        setRequestSentRole(null);
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

    const request: Request = {
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

  const pendingRoles = project.requests?.map((r) => r.role) ?? [];
  const approvedRoles = project.members?.map((m) => m.role) ?? [];
  const takenRoles = isOwner
    ? approvedRoles
    : [...new Set([...pendingRoles, ...approvedRoles])];

  const userMember = project.members?.find((m) => m.uid === user?.uid);
  const yourRole = isOwner
    ? project.roles[0]
    : userMember?.role ?? requestSentRole;
  const userStatus = userMember
    ? "approved"
    : hasUserRequested
    ? "pending"
    : "none";

  const handleDeleteProject = async () => {
    if (!project?.id) return;
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "projects", project.id));
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Error deleting project.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <DashboardProjectBackButton />

      {isOwner && project.id && (
        <div className="flex items-center gap-4 mt-4 mb-2">
          <DashboardEditProjectButton projectId={project.id} />
          <DashboardDeleteProjectButton projectId={project.id} />
        </div>
      )}

      <DashboardProjectInfoDisplay project={project} formatDateTime={formatDateTime} />

      <DashboardProjectRolesButtons
        project={project}
        roles={project.roles}
        yourRole={yourRole}
        userStatus={userStatus}
        isOwner={isOwner}
        takenRoles={takenRoles}
        onRequestClick={handleRequestClick}
      />

      {isOwner && project.id && project.requests && (
        <DashboardProjectRequestsList projectId={project.id} requests={project.requests} />
      )}

      {isModalOpen && (
        <DashboardProjectOverlayConfirmation
          selectedRole={selectedRole}
          requestMessage={requestMessage}
          onRequestMessageChange={setRequestMessage}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmRequest}
          disabled={hasUserRequested}
        />
      )}

      {!isOwner && hasUserRequested && (
        <DashboardProjectRequestMessageSent role={requestSentRole} />
      )}
    </div>
  );
};

export default DashboardProjectDetail;