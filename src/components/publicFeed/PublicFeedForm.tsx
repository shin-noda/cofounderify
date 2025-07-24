// /components/PublicFeedForm.tsx
import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Project {
  id: string;
  title: string;
}

interface PublicFeedFormProps {
  userId: string;
  onNewPost: () => void; // callback to refresh feed after posting
}

const PublicFeedForm: React.FC<PublicFeedFormProps> = ({ userId, onNewPost }) => {
  const [message, setMessage] = useState("");
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load projects owned by user (or participated if you want)
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        setLoadingProjects(true);
        const q = query(collection(db, "projects"), where("ownerId", "==", userId));
        const snapshot = await getDocs(q);
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        })) as Project[];
        setUserProjects(projects);
        if (projects.length > 0) setSelectedProjectId(projects[0].id);
      } catch (error) {
        console.error("Error loading user projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchUserProjects();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedProjectId) return;

    try {
      setSubmitting(true);
      await addDoc(collection(db, "feedPosts"), {
        projectId: selectedProjectId,
        ownerId: userId,
        message: message.trim(),
        timestamp: Timestamp.now(),
      });
      setMessage("");
      onNewPost();
    } catch (error) {
      console.error("Error posting feed:", error);
      alert("Failed to post. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProjects) return <p>Loading your projects...</p>;
  if (userProjects.length === 0)
    return <p>You have no projects to post about yet.</p>;

  return (
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded shadow">
      <label className="block mb-2 font-semibold">
        Select Project:
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="block w-full mt-1 p-2 border rounded"
        >
          {userProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2 font-semibold">
        Your Update (max 200 characters):
        <textarea
          value={message}
          maxLength={200}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full mt-1 p-2 border rounded resize-none"
          rows={3}
          placeholder="Write a quick update about your project..."
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post Update"}
      </button>
    </form>
  );
};

export default PublicFeedForm;