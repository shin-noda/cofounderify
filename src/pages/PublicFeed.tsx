// /pages/PublicFeed.tsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import PublicFeedForm from "../components/publicFeed/PublicFeedForm";


interface FeedPost {
  id: string;
  projectId: string;
  ownerId: string;
  message: string;
  timestamp: any;
  projectTitle?: string;
}

const PublicFeed: React.FC = () => {
  const { user } = useAuth();
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load feed posts, and for each get project title (optional cache later)
  const fetchFeedPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "feedPosts"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);

      const postsData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const projectDoc = await getDoc(doc(db, "projects", data.projectId));
          return {
            id: docSnap.id,
            projectId: data.projectId,
            ownerId: data.ownerId,
            message: data.message,
            timestamp: data.timestamp,
            projectTitle: projectDoc.exists() ? projectDoc.data()?.title : "Unknown Project",
          } as FeedPost;
        })
      );

      setFeedPosts(postsData);
    } catch (error) {
      console.error("Error loading feed posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  if (loading) return <p className="p-4">Loading public feed...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Public Feed</h1>

      {loading ? (
        <p>Loading public feed...</p>
      ) : feedPosts.length === 0 ? (
        <p>No updates yet. Be the first to post!</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {feedPosts.map((post) => (
            <li
              key={post.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <p>{post.message}</p>
              <p className="mt-2 text-sm text-gray-600">
                Project:{" "}
                <button
                  onClick={() => navigate(`/project/${post.projectId}`)}
                  className="text-blue-600 underline"
                >
                  {post.projectTitle}
                </button>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {post.timestamp?.toDate
                  ? post.timestamp.toDate().toLocaleString()
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <PublicFeedForm userId={user.uid} onNewPost={fetchFeedPosts} />
      ) : (
        <p className="mb-4">
          <Link to="/signin" className="text-blue-600 underline">
            Sign in
          </Link>{" "}
          to post updates.
        </p>
      )}
    </div>
  );
};

export default PublicFeed;