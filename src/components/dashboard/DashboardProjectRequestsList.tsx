import React, { useEffect, useState } from "react";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  getFirestore,
} from "firebase/firestore";
import { app } from "../../lib/firebase";
import DashboardProjectApproveRejectButtons from "./DashboardProjectApproveRejectButtons";

interface FirebaseRequest {
  uid: string;
  displayName: string;
  role: string;
  message: string;
  timestamp: any;
}

interface RequestWithId extends FirebaseRequest {
  id: string; // Firestore document ID
}

interface Props {
  projectId: string;
}

const DashboardProjectRequestsList: React.FC<Props> = ({ projectId }) => {
  const db = getFirestore(app);
  const [requests, setRequests] = useState<RequestWithId[]>([]);

  // Load requests from subcollection
  useEffect(() => {
    const fetchRequests = async () => {
      const requestsRef = collection(db, "projects", projectId, "requests");
      const snapshot = await getDocs(requestsRef);
      const loadedRequests: RequestWithId[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as FirebaseRequest),
      }));
      setRequests(loadedRequests);
    };

    fetchRequests();
  }, [db, projectId]);

  const handleApprove = async (requestId: string) => {
    const request = requests.find((r) => r.id === requestId);
    if (!request) return;

    const projectRef = doc(db, "projects", projectId);
    const requestRef = doc(db, "projects", projectId, "requests", requestId);

    try {
      // 1. Add member to project
      await updateDoc(projectRef, {
        members: arrayUnion({
          uid: request.uid,
          displayName: request.displayName,
          role: request.role,
          joinedAt: new Date(),
        }),
      });

      // 2. Delete request document
      await deleteDoc(requestRef);

      // 3. Update local state
      setRequests((prev) => prev.filter((r) => r.id !== requestId));

      console.log("Approved:", requestId);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId: string) => {
    const requestRef = doc(db, "projects", projectId, "requests", requestId);

    try {
      // 1. Delete request document
      await deleteDoc(requestRef);

      // 2. Update local state
      setRequests((prev) => prev.filter((r) => r.id !== requestId));

      console.log("Rejected:", requestId);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  if (requests.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Incoming Requests</h3>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded shadow-sm">
            <p><strong>Name:</strong> {req.displayName}</p>
            <p><strong>Role:</strong> {req.role}</p>
            <p><strong>Message:</strong> {req.message}</p>

            <DashboardProjectApproveRejectButtons
              requestId={req.id}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardProjectRequestsList;