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
  ownerPhotoURL?: string | null;
  ownerDisplayName?: string;
}

interface UserProfileData {
  displayName?: string;
  photoURL?: string;
}

const PublicFeed: React.FC = () => {
  const { user } = useAuth();
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [userProfiles, setUserProfiles] = useState<{ [uid: string]: { photoURL?: string; displayName?: string } }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeedPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "feedPosts"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);

      const postsData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const projectDoc = await getDoc(doc(db, "projects", data.projectId));
          const userDoc = await getDoc(doc(db, "users", data.ownerId)); // fetch owner profile

          const ownerProfile = userDoc.exists() ? userDoc.data() : null;

          return {
            id: docSnap.id,
            projectId: data.projectId,
            ownerId: data.ownerId,
            message: data.message,
            timestamp: data.timestamp,
            projectTitle: projectDoc.exists() ? projectDoc.data()?.title : "Unknown Project",
            ownerPhotoURL: ownerProfile?.photoURL ?? null,
            ownerDisplayName: ownerProfile?.displayName ?? "U",
          } as FeedPost & { ownerPhotoURL?: string | null; ownerDisplayName?: string };
        })
      );

      setFeedPosts(postsData);

      // Get unique ownerIds
      const uniqueOwnerIds = Array.from(new Set(postsData.map((p) => p.ownerId)));

      // Fetch user profiles in parallel
      const profiles: Record<string, UserProfileData> = {};
      await Promise.all(
        uniqueOwnerIds.map(async (uid) => {
          const userDoc = await getDoc(doc(db, "users", uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            profiles[uid] = {
              displayName: data.displayName || "",
              photoURL: data.photoURL || "",
            };
          } else {
            profiles[uid] = { displayName: "Unknown", photoURL: "" };
          }
        })
      );

      setUserProfiles(profiles);
    } catch (error) {
      console.error("Error loading feed posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  };

  if (loading) return <p className="p-4">Loading public feed...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Public Feed</h1>

      {feedPosts.length === 0 ? (
        <p>No updates yet. Be the first to post!</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {feedPosts.map((post) => {
            const profile = userProfiles[post.ownerId] || {};
            return (
              <li
                key={post.id}
                className="border p-4 rounded shadow hover:shadow-lg transition flex space-x-4"
              >
                {/* User avatar button */}
                <button
                  onClick={() => navigate(`/otheruserprofile/${post.ownerId}`)}
                  className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-80"
                  aria-label={`Go to ${profile.displayName ?? "user"}'s profile`}
                  title={`Go to ${profile.displayName ?? "user"}'s profile`}
                >
                  {profile.photoURL ? (
                    <img
                      src={profile.photoURL}
                      alt={`${profile.displayName ?? "User"}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">
                      {getInitials(profile.displayName)}
                    </span>
                  )}
                </button>

                {/* Post content */}
                <div className="flex flex-col flex-grow">
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
                </div>
              </li>
            );
          })}
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