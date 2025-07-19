import React, { useState, useEffect } from "react";
import type { ImageUploaderProps } from "../../types/ImageUploader";

const CLOUD_NAME = "dkcawefqk"; 
const UPLOAD_PRESET = "unsigned_upload";

const ProjectImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadError(null);
    setPreviewUrl(null);
    
    if (!file) {
      onFileChange(null);
      return;
    }

    // Show local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    setUploading(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      // Upload to Cloudinary unsigned endpoint
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);

      const data = await res.json();

      // The uploaded image URL
      const uploadedUrl = data.secure_url;
      
      // Pass uploaded image URL (or file) back to parent
      onFileChange(uploadedUrl);

      setUploading(false);
    } catch (error: any) {
      setUploadError(error.message || "Upload failed");
      onFileChange(null);
      setUploading(false);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-500"
        disabled={uploading}
      />
      {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
      {uploadError && <p className="text-red-600 mt-2">Error: {uploadError}</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 h-32 w-full object-cover rounded border"
        />
      )}
    </div>
  );
};

export default ProjectImageUploader;