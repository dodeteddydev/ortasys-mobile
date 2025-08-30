import Button from "@/components/Button";
import { TextInputField } from "@/components/TextInputField";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import DropdownState from "@/features/state/components/DropdownState";
import React from "react";
import { Text, View } from "react-native";

const CreateScreen = () => {
  return (
    <View className="h-full justify-center px-4">
      <View className="flex flex-col gap-3 p-4 w-full bg-white rounded-xl shadow-lg">
        <View>
          <Text className="text-lg font-bold text-primary">Location</Text>
          <DropdownCountry onChange={(country) => console.log(country)} />
          <DropdownState
            countryCode="ID"
            onChange={(state) => console.log(state)}
          />
        </View>

        <View>
          <Text className="text-lg font-bold text-primary">
            Check In - Check Out
          </Text>
          <DropdownCountry onChange={(country) => console.log(country)} />
          <DropdownState
            countryCode="ID"
            onChange={(state) => console.log(state)}
          />
        </View>

        <View>
          <Text className="text-lg font-bold text-primary">
            Person and Room
          </Text>
          <TextInputField
            label="Adult"
            placeholder="0"
            keyboardType="numeric"
          />
          <TextInputField
            label="Child"
            placeholder="0"
            keyboardType="numeric"
          />
          <TextInputField label="Room" placeholder="0" keyboardType="numeric" />
        </View>

        <Button className="h-12" text="Search" />
      </View>
    </View>
  );
};

export default CreateScreen;
