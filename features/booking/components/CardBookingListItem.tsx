import HotelStar from "@/components/HotelStar";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { BookingListResponse } from "../types/bookingListResponse";
import Card from "@/components/Card";
import Button from "@/components/Button";

type CardBookingListItemProps = {
  data: BookingListResponse;
};

const CardBookingListItem = ({ data }: CardBookingListItemProps) => {
  return (
    <Card>
      <View className="flex flex-row items-center">
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
            <View className="w-[165px] flex flex-row gap-1">
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

        <View className="flex flex-col justify-center">
          <TouchableOpacity activeOpacity={0.8} className="bg-white shadow-md">
            <Text className="text-primary font-bold text-lg">View Detail</Text>
          </TouchableOpacity>

          <Button
            className="p-1 px-2"
            classNameText="text-lg font-semibold text-white"
            text="Book Now"
            // onPress={onPress}
          />
        </View>
      </View>
    </Card>
  );
};

export default CardBookingListItem;
