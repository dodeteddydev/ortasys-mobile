import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

const BackgroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View className="relative">
      <View className="bg-black h-64 rounded-b-[50px]" />
      <SafeAreaView className="absolute h-screen w-screen">
        {children}
      </SafeAreaView>
    </View>
  );
};

export default BackgroundLayout;
