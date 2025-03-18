import { imageBaseUrl } from "@/constants/imageBaseUrl";
import vectors from "@/constants/vectors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ListHotelResponse } from "../types/lisHotelResponseType";

type ItemHotelProps = {
  data: ListHotelResponse;
  onPress: () => void;
};

export default function ItemHotel({ data, onPress }: ItemHotelProps) {
  const imageUrl = `${imageBaseUrl}${data.roomImage}`;
  const [imageStatus, setImageStatus] = useState<
    "load" | "success" | "error" | "iddle"
  >("iddle");
  const formatToIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    setImageStatus("load");
    Image.prefetch(imageUrl)
      .then(() => setImageStatus("success"))
      .catch(() => setImageStatus("error"));
  }, []);

  return (
    <View className="bg-white mb-4 rounded-xl flex-row">
      {imageStatus === "load" ? (
        <View className="h-32 w-32 flex justify-center items-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        <Image
          className="h-32 w-32"
          source={
            imageStatus === "error" ? vectors.dataNotFound : { uri: imageUrl }
          }
          resizeMode="contain"
        />
      )}

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
