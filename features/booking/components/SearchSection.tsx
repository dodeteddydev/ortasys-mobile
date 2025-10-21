import Button from "@/components/Button";
import Card from "@/components/Card";
import DateTimePicker from "@/components/DateTimePicker";
import ModalGeneral from "@/components/Modal";
import { TextInputField } from "@/components/TextInputField";
import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const SearchSection = () => {
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Card className="m-3">
        <View className="gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
          >
            <View className="flex flex-row justify-end items-center gap-1">
              <Feather name="filter" size={24} color={colors.primary} />
              <Text className="font-bold text-lg text-primary">Filter</Text>
            </View>
          </TouchableOpacity>

          <TextInputField placeholder="Search hotel by name" />

          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <DateTimePicker placeholder="Check-in" />
            </View>
            <View className="flex-1">
              <DateTimePicker placeholder="Check-out" />
            </View>
          </View>

          <Button className="h-12" text="Search" />
        </View>
      </Card>

      <ModalGeneral show={showModal} title="Filter" position="top">
        <View style={{ width: width - 100 }}>
          <Text>Modal Content</Text>

          <Button
            className="px-4 py-2"
            classNameText="text-lg text-white font-semibold"
            text="Close"
            onPress={() => setShowModal(false)}
          />
        </View>
      </ModalGeneral>
    </>
  );
};

export default SearchSection;
