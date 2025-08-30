import Button from "@/components/Button";
import Card from "@/components/Card";
import DateTimePicker from "@/components/DateTimePicker";
import { TextInputField } from "@/components/TextInputField";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import DropdownState from "@/features/state/components/DropdownState";
import { dateFormat } from "@/utilities/dateFormat";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const CreateScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        className="h-full p-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <Card>
            <View className="gap-3">
              <DateTimePicker
                label="Check In"
                placeholder="Select Check In Date"
                onChangeDate={(date) => console.log(dateFormat(date, "slash"))}
              />

              <DateTimePicker
                label="Check Out"
                placeholder="Select Check Out Date"
                onChangeDate={(date) => console.log(dateFormat(date))}
              />

              <DropdownCountry onChange={(country) => console.log(country)} />

              <DropdownState
                countryCode="ID"
                onChange={(state) => console.log(state)}
              />

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

              <TextInputField
                label="Room"
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </Card>

          <Button text="Search" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
