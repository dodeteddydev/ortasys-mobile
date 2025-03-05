import { View, Text } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/Button";

const SearchSection = () => {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);

  return (
    <View className="bg-white rounded-3xl p-4 shadow-xl gap-2 mt-6">
      <SearchInput
        icon={<FontAwesome6 name="location-dot" size={18} color="black" />}
        label="Destination"
        placeholder="Badung"
        onChange={() => {}}
      />
      <View className="flex-row gap-2">
        <View className="flex-1">
          <SearchInput
            icon={<FontAwesome6 name="location-dot" size={18} color="black" />}
            label="Check-in"
            placeholder={new Date().toISOString().split("T")[0]}
            onChange={() => {}}
          />
        </View>
        <View className="flex-1">
          <SearchInput
            icon={<FontAwesome6 name="location-dot" size={18} color="black" />}
            label="Check-out"
            placeholder={dateNow.toISOString().split("T")[0]}
            onChange={() => {}}
          />
        </View>
      </View>

      <Button text="Search" />
    </View>
  );
};

export default SearchSection;
