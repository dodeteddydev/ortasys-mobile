import DropdownInputField from "@/components/DropdownInputField";
import { SelectOptions } from "@/types/selectOptionsType";
import { useGetState } from "../hooks/useGetState";

type DropdownStateProps = {
  countryCode: string;
  value?: string;
  onChange: (value: SelectOptions) => void;
  error?: string;
};

const DropdownState = ({
  countryCode,
  value,
  onChange,
  error,
}: DropdownStateProps) => {
  const {
    data,
    isLoading,
    error: errorState,
  } = useGetState({ enabled: Boolean(countryCode), countryCode: countryCode });

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
      disabled={isLoading || !countryCode}
      label="State/Province"
      placeholder={
        isLoading
          ? "Loading..."
          : errorState
          ? "Something error..."
          : "Select State"
      }
      data={errorState ? [] : dataDropdown}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default DropdownState;
