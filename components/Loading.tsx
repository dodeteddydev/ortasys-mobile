import { View, Text, Image } from "react-native";
import React from "react";
import vectors from "@/constants/vectors";

const Loading = () => {
  return (
    <View className="h-full justify-center items-center">
      <Image className="h-36 w-36" source={vectors.logo} resizeMode="contain" />
      <Text className="text-2xl font-semibold">Loading...</Text>
    </View>
  );
};

export default Loading;
