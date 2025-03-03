import { View, Text, TextInput } from "react-native";
import React, { ReactNode } from "react";

type SearchInputProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  onChange: (value: string) => void;
};

const SearchInput = ({
  label,
  placeholder,
  icon,
  onChange,
}: SearchInputProps) => {
  return (
    <View className="gap-1">
      <Text className="text-gray-500">{label}</Text>
      <View className="bg-gray-200 h-12 w-full rounded-lg px-2 justify-center">
        <TextInput placeholder={placeholder} onChangeText={onChange} />
      </View>
    </View>
  );
};

export default SearchInput;
