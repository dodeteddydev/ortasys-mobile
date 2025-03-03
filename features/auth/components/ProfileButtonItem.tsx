import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type ProfileButtonItemProps = {
  onPress?: () => void;
  icon: ReactNode;
  title: string;
};

const ProfileButtonItem = ({
  onPress,
  icon,
  title,
}: ProfileButtonItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center bg-white p-4 rounded-lg gap-3"
      onPress={onPress}
    >
      {icon}
      <Text className="text-lg font-semibold flex-1">{title}</Text>
      <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileButtonItem;
