import { View, Text, Image } from "react-native";
import React from "react";
import vectors from "@/constants/vectors";

const DataNotFound = () => {
  return (
    <View className="h-full justify-center items-center">
      <Image className="h-36 w-36" source={vectors.data} resizeMode="contain" />
      <Text className="text-2xl font-semibold">Oops!...</Text>
      <Text className="text-xl">Data Not Found</Text>
    </View>
  );
};

export default DataNotFound;
