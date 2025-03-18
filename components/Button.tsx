import React from "react";
import { Keyboard, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  text?: string;
  loading?: boolean;
  onPress?: () => void;
  className?: string;
};

const Button = ({ text, loading, onPress, className }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
        Keyboard.dismiss();
      }}
      disabled={loading}
      activeOpacity={0.8}
      className={`${className} bg-black w-full h-16 items-center justify-center rounded-lg ${
        loading && "opacity-70"
      }`}
    >
      <Text className="text-white text-xl font-semibold">
        {loading ? "Loading..." : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
