import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
  Timestamp,
} from "firebase/firestore";

import { toDate, formatDate } from "../utils/dateUtils";

interface Project {
  id: string;
  title: string;
  startDateTime?: Timestamp | string;
  endDateTime?: Timestamp | string;
  ownerId: string;
  participants: string[];
}

const YourProjects: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [upcomingProjects, setUpcomingProjects] = useState<Project[]>([]);
  const [pastProjects, setPastProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const now = new Date();

        const userProjects: Project[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.ownerId === user.uid ||
            (Array.isArray(data.participants) && data.participants.some((p: any) => p.uid === user.uid))  ||
            (Array.isArray(data.members) && data.members.some((m: any) => m.uid === user.uid))

          ) {
            userProjects.push({
              id: doc.id,
              title: data.title,
              startDateTime: data.startDateTime,
              endDateTime: data.endDateTime,
              ownerId: data.ownerId,
              participants: data.participants || [],
            });
          }
        });

        // Split upcoming vs past
        const upcoming = userProjects.filter((p) => {
          const end = toDate(p.endDateTime);
          if (!end) return true; // treat no end date as upcoming
          return end >= now;
        });
        const past = userProjects.filter((p) => {
          const end = toDate(p.endDateTime);
          if (!end) return false;
          return end < now;
        });

        // Sort upcoming ascending by startDateTime
        upcoming.sort((a, b) => {
          const startA = toDate(a.startDateTime);
          const startB = toDate(b.startDateTime);
          if (!startA) return 1;
          if (!startB) return -1;
          return startA.getTime() - startB.getTime();
        });

        // Sort past descending by startDateTime
        past.sort((a, b) => {
          const startA = toDate(a.startDateTime);
          const startB = toDate(b.startDateTime);
          if (!startA) return 1;
          if (!startB) return -1;
          return startB.getTime() - startA.getTime();
        });

        setUpcomingProjects(upcoming);
        setPastProjects(past);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, user]);

  if (loading) return <div className="text-center mt-20">Loading your projects...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Projects</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded ${
            activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Upcoming Projects ({upcomingProjects.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded ${
            activeTab === "past" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Past Projects ({pastProjects.length})
        </button>
      </div>

      {/* Project list */}
      {activeTab === "upcoming" && (
        <>
          {upcomingProjects.length === 0 ? (
            <p className="text-center text-gray-600">No upcoming projects found.</p>
          ) : (
            <ul className="space-y-4">
              {upcomingProjects.map((proj) => (
                <li
                  key={proj.id}
                  className="border rounded p-4 hover:shadow-md cursor-pointer"
                  onClick={() => window.location.assign(`/project/${proj.id}`)}
                >
                  <h2 className="text-xl font-semibold">{proj.title}</h2>
                  <p className="text-sm text-gray-500">
                    Start: {formatDate(proj.startDateTime)} — End: {formatDate(proj.endDateTime)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {activeTab === "past" && (
        <>
          {pastProjects.length === 0 ? (
            <p className="text-center text-gray-600">No past projects found.</p>
          ) : (
            <ul className="space-y-4">
              {pastProjects.map((proj) => (
                <li
                  key={proj.id}
                  className="border rounded p-4 hover:shadow-md cursor-pointer"
                  onClick={() => window.location.assign(`/project/${proj.id}`)}
                >
                  <h2 className="text-xl font-semibold">{proj.title}</h2>
                  <p className="text-sm text-gray-500">
                    Start: {formatDate(proj.startDateTime)} — End: {formatDate(proj.endDateTime)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default YourProjects;