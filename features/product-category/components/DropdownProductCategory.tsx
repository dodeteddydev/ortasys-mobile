import DropdownInputField from "@/components/DropdownInputField";
import { SelectOptions } from "@/types/selectOptionsType";
import { useGetProductCategory } from "../hooks/useGetProductCategory";
import { ProductCategoryResponse } from "../types/productCategoryResponse";

type DropdownProductCategoryProps = {
  enabled?: boolean;
  value?: string;
  onChange: (value: SelectOptions & ProductCategoryResponse) => void;
  error?: string;
};

const DropdownProductCategory = ({
  enabled = true,
  value,
  onChange,
  error,
}: DropdownProductCategoryProps) => {
  const {
    data,
    isLoading,
    error: errorProductCategory,
  } = useGetProductCategory({
    enabled,
  });

  const dataDropdown: (SelectOptions & ProductCategoryResponse)[] =
    data?.data?.length! > 0
      ? (data?.data?.map((value) => {
          return {
            label: value.category,
            value: value.id,
            ...value,
          };
        }) as (SelectOptions & ProductCategoryResponse)[])
      : [];

  return (
    <DropdownInputField<SelectOptions & ProductCategoryResponse>
      disabled={isLoading || !enabled}
      label="Product Category"
      placeholder={
        isLoading
          ? "Loading..."
          : errorProductCategory
          ? "Something error..."
          : "Select Product Category"
      }
      data={errorProductCategory ? [] : dataDropdown}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default DropdownProductCategory;
