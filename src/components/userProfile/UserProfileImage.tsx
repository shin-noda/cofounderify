import React, { useRef, useState, useEffect } from "react";

type Props = {
  photoURL?: string | null;
  displayName?: string | null;
  onUpload?: (uploadedUrl: string | null) => void; // pass back Cloudinary URL or null on failure
};

const CLOUD_NAME = "dkcawefqk";
const UPLOAD_PRESET = "unsigned_upload";

const UserProfileImage: React.FC<Props> = ({ photoURL, displayName, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);

      const data = await res.json();
      const uploadedUrl = data.secure_url;

      setUploading(false);
      setUploadError(null);
      setPreviewUrl(null); // clear preview because now official URL is known

      if (onUpload) onUpload(uploadedUrl);
    } catch (error: any) {
      setUploadError(error.message || "Upload failed");
      setUploading(false);
      if (onUpload) onUpload(null);
    }
  };

  // Cleanup local preview URL on unmount or new file
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // If photoURL exists (from user profile), show that image
  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={`${displayName ?? "User"}'s profile`}
        className="w-32 h-32 rounded-full object-cover mb-4 shadow cursor-pointer"
        onClick={handleClick}
        title="Click to change profile photo"
      />
    );
  }

  // If no photoURL, show upload box with optional preview and error
  return (
    <div>
      <div
        onClick={handleClick}
        className="w-32 h-32 mb-4 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-center text-gray-500 cursor-pointer hover:border-gray-600 hover:text-gray-700 transition select-none"
        title="Upload profile photo"
      >
        {uploading ? (
          <span>Uploading...</span>
        ) : previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          "Upload photo"
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
      {uploadError && (
        <p className="text-red-600 text-xs text-center mt-1">{uploadError}</p>
      )}
    </div>
  );
};

export default UserProfileImage;