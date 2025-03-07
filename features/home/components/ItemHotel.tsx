import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ListHotelResponse } from "../types/lisHotelResponseType";
import { imageBaseUrl } from "@/constants/imageBaseUrl";
import AntDesign from "@expo/vector-icons/AntDesign";

type ItemHotelProps = {
  data: ListHotelResponse;
  onPress: () => void;
};

export default function ItemHotel({ data, onPress }: ItemHotelProps) {
  const formatToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <View className="bg-white mb-4 rounded-xl flex-row">
      <Image
        className="h-32 w-32"
        source={{
          uri: `${imageBaseUrl}${data.roomImage}`,
        }}
        resizeMode="contain"
      />

      <View className="p-4 justify-center flex-1">
        <Text className="font-semibold text-lg">{data.hotelName}</Text>

        <View className="flex-row justify-between">
          <View className="flex-row items-center gap-1">
            <AntDesign name="star" size={20} color="#EAB308" />
            <Text className="font-semibold text-lg">{data.star}</Text>
          </View>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="bg-gray-200 p-2 rounded-xl "
          >
            <Text className="font-semibold">BOOK NOW</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <Text className="font-semibold text-lg">
            {formatToIDR(data.price)}
          </Text>
          <Text className="font-semibold text-lg">/Night</Text>
        </View>
      </View>
    </View>
  );
}
