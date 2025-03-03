import DropdownInputField from "@/components/DropdownInputField";
import { SelectOptions } from "@/types/selectOptionsType";
import React from "react";
import { useGetCity } from "../hooks/useGetCity";

type DropdownCityProps = {
  countryCode: string;
  stateCode: string;
  value?: string;
  onChange: (value: SelectOptions) => void;
  error?: string;
};

const DropdownCity = ({
  countryCode,
  stateCode,
  value,
  onChange,
  error,
}: DropdownCityProps) => {
  const {
    data,
    isLoading,
    error: errorCity,
  } = useGetCity({
    enabled: Boolean(countryCode && stateCode),
    countryCode,
    stateCode,
  });

  const dataDropdown: SelectOptions[] =
    data?.data?.length! > 0
      ? (data?.data?.map((value) => {
          return {
            label: value.name,
            value: value.id.toString(),
          };
        }) as SelectOptions[])
      : [];

  return (
    <DropdownInputField
      disabled={isLoading || !countryCode || !stateCode}
      label="City/Regency"
      placeholder={
        isLoading
          ? "Loading..."
          : errorCity
          ? "Something error..."
          : "Select City"
      }
      data={errorCity ? [] : dataDropdown}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default DropdownCity;
