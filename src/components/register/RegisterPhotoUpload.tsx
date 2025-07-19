// src/components/RegisterPhotoUpload.tsx
import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterPhotoUpload: React.FC<Props> = ({ onChange }) => {
  return (
    <div>
      <label className="block mb-1 font-semibold" htmlFor="photoFile">
        Profile Photo (optional)
      </label>
      <input
        type="file"
        accept="image/*"
        name="photoFile"
        id="photoFile"
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};

export default RegisterPhotoUpload;