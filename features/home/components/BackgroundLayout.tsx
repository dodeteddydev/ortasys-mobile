import React, { ReactNode } from "react";
import { View } from "react-native";

const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View className="relative h-full">
      <View className="bg-black h-[25%] rounded-b-[50px]" />
      <View className="absolute h-full w-full">{children}</View>
    </View>
  );
};

export default BackgroundLayout;
