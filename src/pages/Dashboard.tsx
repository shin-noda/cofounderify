// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/dashboard/ProjectCard";
import SearchBar from "../components/dashboard/SearchBar";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../lib/firebase";

const db = getFirestore(app);

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = projects.filter((proj) =>
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
      <div className="mb-6 flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProjects.length === 0 ? (
          <p>No projects found. Create one!</p>
        ) : (
          filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              title={proj.title}
              description={proj.description}
              imageUrl={proj.imageUrl}
              memberCount={proj.memberCount}
              roles={proj.roles}
              onClick={() => navigate(`/project/${proj.id}`)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;