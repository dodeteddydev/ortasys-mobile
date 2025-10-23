import Feather from "@expo/vector-icons/Feather";
import { ReactNode, useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type TextInputFieldProps = TextInputProps & {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (e: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  textarea?: boolean;
  classNameContainer?: string;
  minHeight?: number;
};

export const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  disabled,
  textarea = false,
  classNameContainer,
  minHeight,
  ...props
}: TextInputFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(
    secureTextEntry ? false : true
  );

  return (
    <View className={`${(error || label) && "gap-1"}`}>
      {label && (
        <Text className={`font-semibold ${error && "text-red-500"}`}>
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center w-full min-h-14 border rounded-lg px-2 ${
          isFocused && !error
            ? "border-primary"
            : (isFocused && error) || error
            ? "border-red-500"
            : "border-gray-400"
        } ${disabled && "bg-gray-100"} ${classNameContainer}`}
        style={{
          minHeight: textarea ? 100 : minHeight || 55,
          alignItems: textarea ? "flex-start" : "center",
        }}
      >
        <TextInput
          {...props}
          className="flex-1"
          placeholder={placeholder}
          placeholderTextColor={error ? "red" : "gray"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!textarea && !showPassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          editable={props.editable ?? !disabled}
          multiline={textarea}
          textAlignVertical={textarea ? "top" : "center"}
        />

        {!textarea && secureTextEntry && (
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
