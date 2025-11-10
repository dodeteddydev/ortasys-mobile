import Card from "@/components/Card";
import HotelStar from "@/components/HotelStar";
import NetworkImage from "@/components/NetworkImage";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { BookingHotelRoomResponse } from "../types/bookingHotelRoomResponse";
import { colors } from "@/constants/colors";

type HotelSectionProps = {
  data: BookingHotelRoomResponse;
};

const HotelSection = ({ data }: HotelSectionProps) => {
  const { width } = useWindowDimensions();

  return (
    <Card className="mx-4 my-2">
      <View className="flex flex-row items-center gap-3">
        <NetworkImage path={data?.logoPath!} />
        <View>
          <HotelStar star={data?.star ?? 0} />
          <Text className="text-lg font-bold text-primary">
            {data?.hotelName}
          </Text>
          <View className="flex flex-row gap-1">
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

      <RenderHTML
        contentWidth={width}
        source={{ html: data?.highlight ?? "" }}
      />
    </Card>
  );
};

export default HotelSection;
