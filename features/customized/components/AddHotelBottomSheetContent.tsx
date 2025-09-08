import Button from "@/components/Button";
import DataNotFound from "@/components/DataNotFound";
import Error from "@/components/Error";
import HotelStar from "@/components/HotelStar";
import Loading from "@/components/Loading";
import NetworkImage from "@/components/NetworkImage";
import { TextInputField } from "@/components/TextInputField";
import { colors } from "@/constants/colors";
import { useDebounce } from "@/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useGetHotelSimple } from "../hooks/useGetHotelSimple";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";

const AddHotelBottomSheetContent = () => {
  const { customized } = useCustomizedContext();

  const { value, debouncedValue, setValue } = useDebounce<string>();

  const { data, isPending, isError, error, refetch } = useGetHotelSimple({
    enabled: !!customized?.search?.country && !!customized?.search?.state,
    params: {
      search: debouncedValue,
      country: customized?.search?.country,
      state: customized?.search?.state,
    },
  });

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
                  <CardAddHotelRoom data={item} onPressRoom={() => {}} />
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

type CardAddHotelRoomProps = {
  data: HotelSimpleResponse;
  onPressRoom: () => void;
};

const CardAddHotelRoom = ({ data, onPressRoom }: CardAddHotelRoomProps) => {
  return (
    <View className="flex flex-row items-center mb-4 p-4 bg-white rounded-lg shadow-lg gap-3">
      <View className="flex-1 flex flex-row items-center gap-3">
        <NetworkImage path={data?.logoPath} />
        <View>
          <HotelStar star={data?.star ?? 0} />
          <Text className="text-lg font-bold text-primary">
            {data?.hotelName}
          </Text>
          <Text className="text-sm text-gray-400">
            Child {data?.childAgeMin} - {data?.childAgeMax}{" "}
            {data?.childAgeMax > 1 ? "years" : "year"}
          </Text>
          <View className="w-[180px] flex flex-row gap-1">
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.primary}
            />
            <Text className="text-sm text-gray-400">
              {data?.city}, {data?.countryName}
            </Text>
          </View>
        </View>
      </View>

      <Button
        className="px-4 py-2"
        classNameText="text-[14px]"
        text="Room"
        onPress={onPressRoom}
      />
    </View>
  );
};
