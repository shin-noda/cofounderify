// src/components/RegisterCity.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
};

type CityOption = {
  label: string;
  value: string;
};

const fetchCities = async (inputValue: string, countryCode: string): Promise<CityOption[]> => {
  if (!inputValue || inputValue.length < 2) return [];

  const encodedInput = encodeURIComponent(inputValue);
  const encodedCountry = encodeURIComponent(countryCode);

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodedInput}&countryIds=${encodedCountry}&limit=10&sort=-population`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e74fef3a3emsh12e1865363dae29p18460bjsn4babe6a75c7e",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.data) return [];

    const uniqueCities = Array.from(
      new Map(data.data.map((city: any) => [city.city, city])).values()
    );

    return uniqueCities.map((city: any) => ({
      label: city.city,
      value: city.city,
    }));
  } catch (error) {
    console.error("Failed to fetch cities", error);
    return [];
  }
};

const RegisterCity: React.FC<Props> = ({ value, onChange, countryCode }) => {
  const [options, setOptions] = useState<CityOption[]>([]);
  const [searchText, setSearchText] = useState("");
  const debouncedInput = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedInput.length < 2 || !countryCode) {
      setOptions([]);
      return;
    }

    let isMounted = true;

    fetchCities(debouncedInput, countryCode).then((cities) => {
      if (isMounted) setOptions(cities);
    });

    return () => {
      isMounted = false;
    };
  }, [debouncedInput, countryCode]);

  const handleChange = (selected: CityOption | null) => {
    onChange(selected?.value || "");
  };

  const handleInputChange = (newValue: string) => {
    setSearchText(newValue);
    return newValue;
  };

  const selectedOption =
    options.find((opt) => opt.value === value) || (value ? { label: value, value } : null);

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onInputChange={handleInputChange}
      placeholder="Enter your city name"
      isClearable
      className="react-select-container"
      classNamePrefix="react-select"
      noOptionsMessage={() =>
        debouncedInput.length < 2 ? "Enter your city name" : "No cities found"
      }
    />
  );
};

export default RegisterCity;