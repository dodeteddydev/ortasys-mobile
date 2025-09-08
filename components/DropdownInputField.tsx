import { SelectOptions } from "@/types/selectOptionsType";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropdownInputFieldProps<T> = {
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  data: T[];
  onChange: (value: T) => void;
  error?: string;
};

const DropdownInputField = <T extends SelectOptions>({
  label,
  disabled,
  placeholder,
  value,
  data,
  onChange,
  error,
}: DropdownInputFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        } ${disabled && "bg-gray-100"}`}
      >
        <Dropdown
          disable={disabled}
          style={styles.dropdown}
          placeholderStyle={
            error ? styles.placeholderStyleErr : styles.placeholderStyle
          }
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconColor={error && "red"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data={data}
          maxHeight={300}
          search
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={data.find((val) => val.value === value)}
          onChange={onChange}
        />
      </View>
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
};

export default DropdownInputField;

const styles = StyleSheet.create({
  dropdown: {
    height: "100%",
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  placeholderStyleErr: {
    fontSize: 14,
    color: "red",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
