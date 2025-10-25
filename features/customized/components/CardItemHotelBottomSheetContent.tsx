import Button from "@/components/Button";
import HotelStar from "@/components/HotelStar";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import { calculateNights } from "@/utilities/calculateNights";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { useGetRoomSimple } from "../hooks/useGetRoomSimple";
import { HotelSimpleResponse } from "../types/hotelSimpleResponse";
import CardItemRoomBottomSheetContent from "./CardItemRoomBottomSheetContent";

type CardItemHotelBottomSheetContentProps = {
  isOpenRoom: boolean;
  datePicked: string | null;
  day: number | null;
  dataHotel: HotelSimpleResponse;
  onPressRoom: () => void;
  onCloseModalBottomSheet: () => void;
};

const CardItemHotelBottomSheetContent = ({
  isOpenRoom,
  datePicked,
  dataHotel,
  day,
  onPressRoom,
  onCloseModalBottomSheet,
}: CardItemHotelBottomSheetContentProps) => {
  const { customized } = useCustomizedContext();
  const { data, isFetching, isError, error } = useGetRoomSimple({
    enabled: isOpenRoom && !!datePicked,
    hotelId: dataHotel.hotelId,
    params: {
      date: datePicked!,
      night: calculateNights(
        customized?.search?.startStayDate!,
        customized?.search?.endStayDate!
      ),
      adult: customized?.search?.adult,
      child: customized?.search?.child,
      checkIn: "yes",
      totalRoom: 1,
      startStayDate: customized?.search?.startStayDate,
      endStayDate: customized?.search?.endStayDate,
    },
  });

  const [currentRateOpen, setCurrentRateOpen] = useState<number | null>(null);

  const onPress = () => {
    setCurrentRateOpen(null);
    onPressRoom();
  };

  return (
    <View className="mb-4 p-4 bg-white rounded-lg shadow-lg">
      <View
        className={`flex flex-row items-center ${
          isOpenRoom && !isFetching && "border-b border-gray-200 mb-3 pb-3"
        }`}
      >
        <View className="flex-1 flex flex-row items-center gap-3">
          <NetworkImage path={dataHotel?.logoPath} />
          <View>
            <HotelStar star={dataHotel?.star ?? 0} />
            <Text className="text-lg font-bold text-primary">
              {dataHotel?.hotelName}
            </Text>
            <Text className="text-sm text-gray-400">
              Child {dataHotel?.childAgeMin} - {dataHotel?.childAgeMax}{" "}
              {dataHotel?.childAgeMax > 1 ? "years" : "year"}
            </Text>
            <View className="w-[180px] flex flex-row gap-1">
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.primary}
              />
              <Text className="text-sm text-gray-400">
                {dataHotel?.city}, {dataHotel?.countryName}
              </Text>
            </View>
          </View>
        </View>

        <Button
          loading={isFetching && isOpenRoom}
          className="px-4 py-2"
          classNameText="text-lg font-semibold text-white"
          text="Room"
          onPress={onPress}
        />
      </View>

      {isOpenRoom && !isFetching && (
        <>
          {isError ? (
            <Text className="text-red-500 text-lg text-center">
              {error?.message}
            </Text>
          ) : data?.data?.length! > 0 ? (
            <>
              {data?.data?.map((item, index) => (
                <CardItemRoomBottomSheetContent
                  key={index}
                  isOpenRate={currentRateOpen === index}
                  datePicked={datePicked}
                  day={day}
                  dataHotelAndRoom={{
                    hotel: dataHotel,
                    room: item,
                  }}
                  onPressRate={() => setCurrentRateOpen(index)}
                  onCloseModalBottomSheet={onCloseModalBottomSheet}
                />
              ))}
            </>
          ) : (
            <Text className="text-lg text-gray-400 text-center">
              No room available
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default CardItemHotelBottomSheetContent;
