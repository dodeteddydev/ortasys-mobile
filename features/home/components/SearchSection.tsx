import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import SearchInput from "./SearchInput";

type SearchHotel = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
};

type SearchSectionProps = {
  onSearch: (value: SearchHotel) => void;
  onReset: () => void;
};

const SearchSection = ({ onSearch, onReset }: SearchSectionProps) => {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  const [date, setDate] = useState<Date>(new Date());
  const [search, setSearch] = useState<SearchHotel>({
    destination: undefined,
    checkIn: undefined,
    checkOut: undefined,
  });
  const [showPicker, setShowPicker] = useState<
    "checkIn" | "checkOut" | "iddle"
  >("iddle");

  return (
    <>
      <View className="bg-white rounded-3xl p-4 shadow-xl gap-2 mt-6">
        <SearchInput
          icon={<FontAwesome6 name="location-dot" size={18} color="black" />}
          label="Destination"
          placeholder="Search..."
          value={search.destination ?? ""}
          onChange={(value) => setSearch({ ...search, destination: value })}
        />
        <View className="flex-row gap-2">
          <View className="flex-1">
            <SearchInput
              editable={false}
              icon={<Ionicons name="calendar-clear" size={18} color="black" />}
              label="Check-in"
              placeholder={new Date().toISOString().split("T")[0]}
              value={search.checkIn ?? ""}
              onPress={() => setShowPicker("checkIn")}
            />
          </View>
          <View className="flex-1">
            <SearchInput
              editable={false}
              icon={<Ionicons name="calendar-clear" size={18} color="black" />}
              label="Check-out"
              placeholder={dateNow.toISOString().split("T")[0]}
              value={search.checkOut ?? ""}
              onPress={() => setShowPicker("checkOut")}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            onSearch && onSearch(search);
            Keyboard.dismiss();
          }}
          activeOpacity={0.8}
          className="bg-black items-center p-2 rounded-xl"
        >
          <Text className="text-white text-lg font-semibold">Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onReset && onReset();
            setSearch({
              destination: undefined,
              checkIn: undefined,
              checkOut: undefined,
            });
            Keyboard.dismiss();
          }}
          activeOpacity={0.8}
          className="bg-gray-400 items-center p-2 rounded-xl"
        >
          <Text className="text-white text-lg font-semibold">Reset Filter</Text>
        </TouchableOpacity>
      </View>

      {(showPicker === "checkIn" || showPicker === "checkOut") && (
        <View
          className={
            (showPicker === "checkIn" || showPicker === "checkOut") &&
            Platform.OS === "ios"
              ? "flex justify-center items-center mb-28"
              : undefined
          }
        >
          <DateTimePicker
            mode="date"
            display="spinner"
            minimumDate={new Date()}
            value={date}
            onChange={({ type }, selectedDate) => {
              if (type === "set") {
                const currentDate = selectedDate;
                setDate(currentDate!);

                if (Platform.OS === "android") {
                  showPicker === "checkIn"
                    ? setSearch({
                        ...search,
                        checkIn: currentDate?.toISOString().split("T")[0],
                      })
                    : setSearch({
                        ...search,
                        checkOut: currentDate?.toISOString().split("T")[0],
                      });
                  setShowPicker("iddle");
                }
              } else {
                setShowPicker("iddle");
              }
            }}
          />

          {(showPicker === "checkIn" || showPicker === "checkOut") &&
            Platform.OS === "ios" && (
              <View className="flex-row gap-1 p-2">
                <TouchableOpacity
                  onPress={() => setShowPicker("iddle")}
                  activeOpacity={0.8}
                  className="bg-gray-400 items-center p-2 rounded-xl flex-1"
                >
                  <Text className="text-white text-lg font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    showPicker === "checkIn"
                      ? setSearch({
                          ...search,
                          checkIn: date?.toISOString().split("T")[0],
                        })
                      : setSearch({
                          ...search,
                          checkOut: date?.toISOString().split("T")[0],
                        });
                    setShowPicker("iddle");
                  }}
                  activeOpacity={0.8}
                  className="bg-black items-center p-2 rounded-xl flex-1"
                >
                  <Text className="text-white text-lg font-semibold">Ok</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      )}
    </>
  );
};

export default SearchSection;
