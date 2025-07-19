// src/components/ProjectDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  memberCount: number;
  roles: string[];
}

const db = getFirestore(app);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      setLoading(true);
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject({ ...(docSnap.data() as Project), id: docSnap.id });
      } else {
        setProject(null);
      }
      setLoading(false);
    }

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading project...</p>;
  if (!project) return <p className="text-center mt-8">Project not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4">{project.description}</p>
      <p>
        <strong>Members:</strong> {project.memberCount}
      </p>
      <p>
        <strong>Roles:</strong> {project.roles.join(", ")}
      </p>
    </div>
  );
};

export default ProjectDetail;