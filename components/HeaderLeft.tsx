import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { TouchableOpacity } from "react-native";

const HeaderLeft = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <MaterialIcons name="arrow-back-ios" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
