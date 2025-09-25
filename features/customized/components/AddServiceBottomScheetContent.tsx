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
import { PackageSimpleResponse } from "../types/packageSimpleResponse";

export type AddServiceBottomScheetContentProps = {
  datePicked: string | null;
  onCloseModalBottomSheet: () => void;
};

const AddServiceBottomScheetContent = ({
  datePicked,
  onCloseModalBottomSheet,
}: AddServiceBottomScheetContentProps) => {
  const { customized, setCustomized } = useCustomizedContext();

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

  const handleAddService = (data: PackageSimpleResponse) => {
    const newHotelRoomCustomized = customized?.hotelRoomCustomized?.map(
      (hotelRoom) => {
        if (hotelRoom.payload.date === datePicked) {
          return {
            ...hotelRoom,
            payload: {
              ...hotelRoom?.payload,
              activities: [
                ...(hotelRoom?.payload?.activities || []),
                {
                  day: hotelRoom?.payload?.day,
                  date: hotelRoom?.payload?.date,
                  priceAdult: data?.priceAdult,
                  priceChild: data?.priceChild,
                  packageCategoryId: data?.packageCategory?.id,
                  packageElementId: data?.id,
                  location: data?.location,
                  rate:
                    (customized?.search?.adult ?? 0 * data?.priceAdult) +
                    (customized?.search?.child ?? 0 * data?.priceChild),
                  totalItem: null,
                  pricePerItem: data?.pricePerItem,
                  isPricePerItem: false,
                  description: data?.description,
                  base: data?.base,
                  markup: data?.markup,
                  markupAgent: data?.markupAgent,
                  adult: customized?.search?.adult,
                  child: customized?.search?.child,
                },
              ],
            },
            response: hotelRoom?.response
              ? {
                  ...hotelRoom?.response,
                  activities: [
                    ...(hotelRoom?.response?.activities || []),
                    data,
                  ],
                }
              : {
                  activities: [
                    ...(hotelRoom?.response?.activities || []),
                    data,
                  ],
                },
          };
        }

        return hotelRoom;
      }
    );

    setCustomized({
      ...customized,
      hotelRoomCustomized: newHotelRoomCustomized,
    });
    onCloseModalBottomSheet();
  };

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

      <View className="flex-1">
        {product ? (
          <>
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
                      <CardItemServiceBottomSheetContent
                        dataPackage={item}
                        onPressSelect={() => handleAddService(item)}
                      />
                    )}
                  />
                ) : (
                  <DataNotFound />
                )}
              </>
            )}
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-primary font-semibold">
              Please select a product category to show list of products
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default AddServiceBottomScheetContent;
