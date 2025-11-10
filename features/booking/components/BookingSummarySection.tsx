import Card from "@/components/Card";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import HorizontalDataPreview from "@/features/customized/components/HorizontalDataPreview";
import { currencyFormat } from "@/utilities/currencyFormat";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import { BookingRoom } from "../types/bookingRequest";

type BookingSummarySectionProps = {
  bookingRoomData?: BookingHotelRoomResponse;
  bookingRoom?: BookingRoom;
  nights?: number;
};

const BookingSummarySection = ({
  bookingRoomData,
  bookingRoom,
  nights,
}: BookingSummarySectionProps) => {
  return (
    <Card className="mx-4 my-2">
      <View className="gap-4">
        <View className="flex flex-row gap-3">
          <NetworkImage path={bookingRoomData?.roomImage!} />
          <View className="flex-1">
            <Text className="text-lg font-bold text-primary">
              {bookingRoomData?.roomTypeDescription}
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-lg font-bold text-primary">
                {currencyFormat(bookingRoom?.pricePerNight || 0)}
              </Text>
              <Text className="flex-1 text-sm text-gray-400">/ night</Text>
            </View>
          </View>
        </View>

        <HorizontalDataPreview
          icon={
            <MaterialCommunityIcons
              name="door"
              size={24}
              color={colors.grayInactive}
            />
          }
          title={`x${bookingRoom?.totalRoom} Room`}
          description={`${currencyFormat(
            (bookingRoom?.totalRoom ?? 0) * (bookingRoom?.pricePerNight ?? 0)
          )}`}
        />

        <HorizontalDataPreview
          icon={
            <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
          }
          title={`x${nights} Night`}
          description={nights ? nights?.toString() : "0"}
        />

        <HorizontalDataPreview
          icon={
            <MaterialIcons name="bed" size={24} color={colors.grayInactive} />
          }
          title={`x${bookingRoom?.totalExtraBed} Extra Bed`}
          description={
            bookingRoom?.totalExtraBed
              ? bookingRoom?.totalExtraBed?.toString()
              : "0"
          }
        />
      </View>
    </Card>
  );
};

export default BookingSummarySection;
