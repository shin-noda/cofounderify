// src/components/RegisterSkills.tsx
import React from "react";
import { skillsOptions } from "../../constants/skills";

type Props = {
  selectedSkills: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterSkills: React.FC<Props> = ({ selectedSkills, onChange }) => {
  return (
    <fieldset className="border rounded p-3">
      <legend className="mb-2 font-semibold">Skills</legend>
      <div className="flex flex-wrap gap-2">
        {skillsOptions.map((skill) => (
          <label key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="skills"
              value={skill}
              checked={selectedSkills.includes(skill)}
              onChange={onChange}
            />
            <span>{skill}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RegisterSkills;