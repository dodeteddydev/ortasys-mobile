import { TextInputField } from "@/components/TextInputField";
import { FlatList, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import DropdownProductCategory from "@/features/product-category/components/DropdownProductCategory";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetPackageSimple } from "../hooks/useGetPackageSimple";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import DataNotFound from "@/components/DataNotFound";
import { Text } from "react-native";
import { useState } from "react";
import CardItemServiceBottomSheetContent from "./CardItemServiceBottomSheetContent";

export type AddServiceBottomScheetContentProps = {
  datePicked: string | null;
};

const AddServiceBottomScheetContent = ({
  datePicked,
}: AddServiceBottomScheetContentProps) => {
  const { customized } = useCustomizedContext();

  const { value, debouncedValue, setValue } = useDebounce<string>();

  const [product, setProduct] = useState<{ label: string; value: number }>();

  const { data, isPending, isError, error, refetch } = useGetPackageSimple({
    enabled:
      !!customized?.search?.country &&
      !!customized?.search?.state &&
      !!product?.value,
    productId: product?.value!,
    params: {
      search: debouncedValue,
      country: customized?.search?.country,
      state: customized?.search?.state,
      date: datePicked!,
    },
  });

  return (
    <>
      <View className="px-3 pb-3">
        <DropdownProductCategory
          value={product?.value}
          onChange={(value) =>
            setProduct({
              label: value.label,
              value: value.id,
            })
          }
        />
        <TextInputField
          placeholder={`Search products in ${customized?.search?.stateName}, ${customized?.search?.countryName}`}
          value={value}
          onChangeText={setValue}
        />
      </View>

      {product && (
        <View className="flex-1">
          {isPending || isError ? (
            isPending ? (
              <Loading />
            ) : (
              <Error statusCode={error?.status ?? "Unexpected error"} />
            )
          ) : (
            <>
              {data?.data?.length! > 0 ? (
                <FlatList
                  data={data?.data}
                  keyExtractor={(_, index) => index.toString()}
                  refreshing={isPending}
                  onRefresh={() => refetch()}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ padding: 12 }}
                  renderItem={({ item }) => (
                    <CardItemServiceBottomSheetContent dataPackage={item} />
                  )}
                />
              ) : (
                <DataNotFound />
              )}
            </>
          )}
        </View>
      )}
    </>
  );
};

export default AddServiceBottomScheetContent;
