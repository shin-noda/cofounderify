// src/components/register/RegisterCountrySelect.tsx
import React from "react";
import Select from "react-select";
import { countries } from "../../constants/countries";

type CountryOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement> | null) => void;
};

const RegisterCountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const options: CountryOption[] = countries.map((country) => ({
    value: country.name,
    label: `${country.emoji} ${country.name}`,
  }));

  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (selected: CountryOption | null) => {
    const fakeEvent = {
      target: {
        name: "country",
        value: selected?.value || "",
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(fakeEvent);
  };

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select Country of Residence"
        className="react-select-container"
        classNamePrefix="react-select"
        isClearable
      />
    </div>
  );
};

export default RegisterCountrySelect;