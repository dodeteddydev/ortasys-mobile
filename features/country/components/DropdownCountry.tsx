import DropdownInputField from "@/components/DropdownInputField";
import { SelectOptions } from "@/types/selectOptionsType";
import React from "react";
import { useGetCountry } from "../hooks/useGetCountry";

type DropdownCountryProps = {
  enabled?: boolean;
  value?: string;
  onChange: (value: SelectOptions) => void;
  error?: string;
};

const DropdownCountry = ({
  enabled = true,
  value,
  onChange,
  error,
}: DropdownCountryProps) => {
  const { data, isLoading, error: errorCountry } = useGetCountry(enabled);

  const dataDropdown: SelectOptions[] =
    data?.data?.length! > 0
      ? (data?.data?.map((value) => {
          return {
            label: value.name,
            value: value.code,
          };
        }) as SelectOptions[])
      : [];

  return (
    <DropdownInputField
      disabled={isLoading || !enabled}
      label="Country"
      placeholder={
        isLoading
          ? "Loading..."
          : errorCountry
          ? "Something error..."
          : "Select country"
      }
      data={errorCountry ? [] : dataDropdown}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default DropdownCountry;
