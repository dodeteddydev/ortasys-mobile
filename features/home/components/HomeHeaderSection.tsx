import { ProfileResponse } from "@/features/profile/types/profileResponseType";
import { formatToIDR } from "@/utilities/currencyFormat";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const HomeHeaderSection = ({ data }: { data: ProfileResponse }) => {
  const [showSaldo, setShowSaldo] = useState<boolean>(false);

  return (
    <View
      className={`bg-primary p-5 ${
        Platform.OS === "ios" && "pt-14"
      } rounded-b-3xl flex flex-row items-center justify-between`}
    >
      <View>
        <Text className="text-white text-xl">Hello, {data?.name}! 👋🏻</Text>
        <Text className="text-white font-light">Welcome to Ortasys</Text>
      </View>
      <View className="w-32">
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-xl">Saldo</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowSaldo(!showSaldo)}
          >
            <Feather
              name={showSaldo ? "eye" : "eye-off"}
              size={15}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text
          className={`text-white ${!showSaldo && "font-semibold text-xl"}`}
          numberOfLines={1}
        >
          {showSaldo ? formatToIDR(data?.currentBalance || 0) : "•••••••••••"}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeaderSection;
