import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TextInputFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (e: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
}: TextInputFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(
    secureTextEntry ? false : true
  );

  return (
    <View className={`${(error || label) && "gap-1"}`}>
      <Text className={`font-semibold ${error && "text-red-500"}`}>
        {label}
      </Text>
      <View
        className={`flex-row items-center w-full h-16 border rounded-lg px-2 ${
          isFocused && !error
            ? "border-primary"
            : (isFocused && error) || error
            ? "border-red-500"
            : "border-gray-400"
        }`}
      >
        <TextInput
          className="flex-1 h-16"
          placeholder={placeholder}
          placeholderTextColor={error ? "red" : "gray"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
        />

        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={18}
              color={error ? "red" : "gray"}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
};
