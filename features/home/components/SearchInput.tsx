import { View, Text, TextInput, Pressable } from "react-native";
import React, { ReactNode } from "react";

type SearchInputProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  onPress?: () => void;
};

const SearchInput = ({
  label,
  placeholder,
  icon,
  value,
  onChange,
  editable,
  onPress,
}: SearchInputProps) => {
  return (
    <View className="gap-1">
      <View className="flex flex-row gap-2 items-center">
        <Text className="text-gray-500">{label}</Text>
        {icon}
      </View>

      <Pressable
        onPress={onPress}
        className="bg-gray-200 h-12 w-full rounded-lg px-2 justify-center"
      >
        <TextInput
          onPressIn={onPress}
          editable={editable}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
      </Pressable>
    </View>
  );
};

export default SearchInput;
