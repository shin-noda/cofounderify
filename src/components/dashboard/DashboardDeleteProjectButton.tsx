// src/components/Project/DashboardDeleteProjectButton.tsx

import React, { useState } from "react";
import { Trash } from "lucide-react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

interface Props {
  projectId: string;
}

const DashboardDeleteProjectButton: React.FC<Props> = ({ projectId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "projects", projectId));
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="inline-flex text-red-600 hover:underline items-center gap-1"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash className="w-4 h-4" />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DashboardDeleteProjectButton;