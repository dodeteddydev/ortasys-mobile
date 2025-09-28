import DataNotFound from "@/components/DataNotFound";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { TextInputField } from "@/components/TextInputField";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useGetHotelSimple } from "../hooks/useGetHotelSimple";
import CardItemHotelBottomSheetContent from "./CardItemHotelBottomSheetContent";

export type AddHotelBottomSheetContentProps = {
  datePicked: string | null;
  day: number | null;
  onCloseModalBottomSheet: () => void;
};

const AddHotelBottomSheetContent = ({
  datePicked,
  day,
  onCloseModalBottomSheet,
}: AddHotelBottomSheetContentProps) => {
  const { customized } = useCustomizedContext();

  const { value, debouncedValue, setValue } = useDebounce<string>();

  const { data, isFetching, isError, error, refetch } = useGetHotelSimple({
    enabled: !!customized?.search?.country && !!customized?.search?.state,
    params: {
      search: debouncedValue,
      country: customized?.search?.country,
      state: customized?.search?.state,
    },
  });

  const [currentRoomOpen, setCurrentRoomOpen] = useState<number | null>(null);

  return (
    <>
      <View className="px-3 pb-3">
        <TextInputField
          className="mb-4"
          placeholder={`Search hotels in ${customized?.search?.stateName}, ${customized?.search?.countryName}`}
          value={value}
          onChangeText={setValue}
        />
      </View>

      <View className="flex-1">
        {isFetching || isError ? (
          isFetching ? (
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
                refreshing={isFetching}
                onRefresh={() => refetch()}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ padding: 12 }}
                renderItem={({ item, index }) => (
                  <CardItemHotelBottomSheetContent
                    isOpenRoom={currentRoomOpen === index}
                    datePicked={datePicked}
                    day={day}
                    dataHotel={item}
                    onPressRoom={() => setCurrentRoomOpen(index)}
                    onCloseModalBottomSheet={onCloseModalBottomSheet}
                  />
                )}
              />
            ) : (
              <DataNotFound />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default AddHotelBottomSheetContent;
