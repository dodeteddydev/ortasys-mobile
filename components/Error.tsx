import { View, Text, Image } from "react-native";
import React from "react";
import vectors from "@/constants/vectors";

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <View className="h-full justify-center items-center">
      <Image
        className="h-36 w-36"
        source={vectors.error}
        resizeMode="contain"
      />
      <Text className="text-2xl font-semibold">Oops!...</Text>
      <Text className="text-xl">{`${statusCode} Error`}</Text>
    </View>
  );
};

export default Error;
