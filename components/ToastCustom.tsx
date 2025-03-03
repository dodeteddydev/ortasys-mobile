import { View, Text } from "react-native";
import React from "react";

type ToastCustomProps = {
  type: "success" | "error";
  title: string;
  text: string;
};

const ToastCustom = ({ type, title, text }: ToastCustomProps) => {
  return (
    <View
      className={`${
        type === "success" ? "bg-white" : "bg-red-500"
      } w-[90%] p-4 rounded-lg opacity-90`}
    >
      <Text
        className={`text-lg font-semibold ${
          type === "success" ? "text-black" : "text-white"
        }`}
      >
        {title}
      </Text>
      <Text className={type === "success" ? "text-black" : "text-white"}>
        {text}
      </Text>
    </View>
  );
};

export default ToastCustom;
