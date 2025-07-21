// src/components/ProjectRequestsList.tsx
import React from "react";
import { doc, updateDoc, arrayRemove, arrayUnion, getFirestore } from "firebase/firestore";
import { app } from "../../lib/firebase";
import ProjectApproveRejectButtons from "./ProjectApproveRejectButtons";

interface FirebaseRequest {
  uid: string;
  displayName: string;
  role: string;
  message: string;
  timestamp: any; // You could narrow this if you want
}

interface Props {
  projectId: string;
  requests: FirebaseRequest[];
}

const ProjectRequestsList: React.FC<Props> = ({ projectId, requests }) => {
  const db = getFirestore(app);

  const handleApprove = async (uid: string) => {
    const projectRef = doc(db, "projects", projectId);
    const request = requests.find((r) => r.uid === uid);
    if (!request) return;

    try {
      await updateDoc(projectRef, {
        // Remove from requests
        requests: arrayRemove(request),
        // Add to members
        members: arrayUnion({
          uid: request.uid,
          displayName: request.displayName,
          role: request.role,
          joinedAt: new Date(),
        }),
      });
      console.log("Approved:", uid);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (uid: string) => {
    const projectRef = doc(db, "projects", projectId);
    const request = requests.find((r) => r.uid === uid);
    if (!request) return;

    try {
      await updateDoc(projectRef, {
        // Just remove from requests
        requests: arrayRemove(request),
      });
      console.log("Rejected:", uid);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Incoming Requests</h3>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.uid} className="border p-4 rounded shadow-sm">
            <p>
              <strong>Name:</strong> {req.displayName}
            </p>
            <p>
              <strong>Role:</strong> {req.role}
            </p>
            <p>
              <strong>Message:</strong> {req.message}
            </p>

            <ProjectApproveRejectButtons
              requestId={req.uid}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectRequestsList;