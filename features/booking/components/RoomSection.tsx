import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import RoomItem from "./RoomItem";
import { BookingRoom } from "../types/bookingRequest";

type RoomSectionProps = {
  data: BookingHotelRoomResponse[];
  bookingRoom: BookingRoom[];
  onShowModalFilter: () => void;
  onChangeTotalRoom: (value: number, hotelId: number) => void;
  onShowModalPrice: (hotelId: number) => void;
};

const RoomSection = ({
  data,
  bookingRoom,
  onShowModalFilter,
  onChangeTotalRoom,
  onShowModalPrice,
}: RoomSectionProps) => {
  return (
    <>
      <View className="mx-5 my-2">
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-bold text-primary">Room</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onShowModalFilter}>
            <Feather name="filter" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-400">
          Choose rooms that are available for your booking.
        </Text>
      </View>

      {data && data?.length > 0 ? (
        data?.map((item, index) => (
          <RoomItem
            key={index}
            data={item}
            bookingRoom={
              bookingRoom?.find((value) => value.hotelId === item?.id)!
            }
            onChangeTotalRoom={(totalRoom) =>
              onChangeTotalRoom(totalRoom, item?.id)
            }
            onShowMorePrice={() => onShowModalPrice(item?.id)}
          />
        ))
      ) : (
        <Text className="text-center text-gray-400">No room available</Text>
      )}
    </>
  );
};

export default RoomSection;
