import Button from "@/components/Button";
import Card from "@/components/Card";
import DateTimePicker from "@/components/DateTimePicker";
import ModalGeneral from "@/components/Modal";
import { TextInputField } from "@/components/TextInputField";
import { colors } from "@/constants/colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import { dateFormat, normalizeDate } from "@/utilities/dateFormat";
import { addDays } from "date-fns";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import DropdownState from "@/features/state/components/DropdownState";
import DropdownCity from "@/features/city/components/DropdownCity";
import DropdownHotelStar from "@/components/DropdownHotelStar";

type BookingFilterSectionProp = {
  onSearch: (params?: BookingListQueryParams) => void;
};

const BookingFilterSection = ({ onSearch }: BookingFilterSectionProp) => {
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [params, setParams] = useState<
    BookingListQueryParams & { cityName?: string }
  >();

  return (
    <>
      <Card className="m-3">
        <View className="gap-3">
          <TouchableOpacity
            className="self-end"
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
          >
            <View className="flex flex-row items-center gap-1">
              <Feather name="filter" size={24} color={colors.primary} />
              <Text className="font-bold text-lg text-primary">Filter</Text>
            </View>
          </TouchableOpacity>

          <TextInputField
            placeholder="Search hotel by name"
            value={params?.search}
            onChangeText={(val) => setParams({ ...params, search: val })}
          />

          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <DateTimePicker
                placeholder="Check-in"
                value={dateFormat(params?.checkIn!, "long")}
                onChangeDate={(date) => {
                  setParams({
                    ...params,
                    checkIn: normalizeDate(date),
                    checkOut: undefined,
                  });
                }}
              />
            </View>
            <View className="flex-1">
              <DateTimePicker
                placeholder="Check-out"
                disabled={!params?.checkIn}
                minimumDate={addDays(new Date(params?.checkIn!), 1)}
                value={dateFormat(params?.checkOut!, "long")}
                onChangeDate={(date) => {
                  setParams({ ...params, checkOut: normalizeDate(date) });
                }}
              />
            </View>
          </View>

          <Button
            disabled={!params}
            className="h-12"
            text="Search"
            onPress={() => onSearch({ ...params, city: params?.cityName })}
          />
        </View>
      </Card>

      <ModalGeneral show={showModal} position="top">
        <View className="gap-2" style={{ width: width - 100 }}>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary">Filter</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowModal(false)}
            >
              <MaterialIcons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <DropdownHotelStar
            value={params?.stars?.toString()}
            onChange={(val) => {
              setParams({
                ...params,
                stars: parseInt(val.value.toString()),
              });
            }}
          />

          <DropdownCountry
            value={params?.country}
            onChange={(val) => {
              setParams({
                ...params,
                country: val.value.toString(),
                countryName: val.label,
                state: undefined,
                stateName: undefined,
                city: undefined,
              });
            }}
          />

          <DropdownState
            countryCode={params?.country!}
            value={params?.state}
            onChange={(val) => {
              setParams({
                ...params,
                state: val.value.toString(),
                stateName: val.label,
                city: undefined,
              });
            }}
          />

          <DropdownCity
            stateCode={params?.state!}
            countryCode={params?.country!}
            value={params?.city}
            onChange={(val) => {
              setParams({
                ...params,
                city: val.value.toString(),
                cityName: val.label,
              });
            }}
          />

          <TextInputField
            label="Adult"
            placeholder="0"
            value={params?.maxAdult ? params?.maxAdult?.toString() : "0"}
            onChangeText={(value) =>
              setParams({
                ...params,
                maxAdult: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <TextInputField
            label="Child"
            placeholder="0"
            value={params?.maxChild ? params?.maxChild?.toString() : "0"}
            onChangeText={(value) =>
              setParams({
                ...params,
                maxChild: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <TextInputField
            label="Min Price"
            placeholder="0"
            value={params?.minPrice ? params?.minPrice?.toString() : "0"}
            onChangeText={(value) =>
              setParams({
                ...params,
                minPrice: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <TextInputField
            label="Max Price"
            placeholder="0"
            value={params?.maxPrice ? params?.maxPrice?.toString() : "0"}
            onChangeText={(value) =>
              setParams({
                ...params,
                maxPrice: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <View className="flex flex-row justify-end gap-3">
            <Button
              className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
              classNameText="text-lg text-primary font-semibold"
              text="Clear Filter"
              onPress={() => {
                setShowModal(false);
                setParams({});
                onSearch();
              }}
            />

            <Button
              className="px-4 py-2"
              classNameText="text-lg text-white font-semibold"
              text="Apply Filter"
              onPress={() => {
                setShowModal(false);
                onSearch({ ...params, city: params?.cityName });
              }}
            />
          </View>
        </View>
      </ModalGeneral>
    </>
  );
};

export default BookingFilterSection;
