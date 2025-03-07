import React, { ReactNode } from "react";
import { View } from "react-native";

const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View className="relative flex-1">
      <View className="bg-black h-[25%] rounded-b-[50px]" />
      {children}
    </View>
  );
};

export default BackgroundLayout;
