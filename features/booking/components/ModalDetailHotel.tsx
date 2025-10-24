import ModalGeneral from "@/components/Modal";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BookingListResponse } from "../types/bookingListResponse";
import NetworkImage from "@/components/NetworkImage";
import HotelStar from "@/components/HotelStar";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import Button from "@/components/Button";

type ModalDetailHotelProps = {
  showModal: boolean;
  data: BookingListResponse;
  width: number;
  onClose: () => void;
  onBookNow: () => void;
};

const ModalDetailHotel = ({
  showModal,
  data,
  width,
  onClose,
  onBookNow,
}: ModalDetailHotelProps) => {
  return (
    <ModalGeneral show={showModal}>
      <View className="gap-3" style={{ width: width - 100, height: "70%" }}>
        <NetworkImage className="w-full" path={data?.roomImage} />

        <View>
          <View className="flex flex-row justify-between">
            <View>
              <HotelStar star={data?.star ?? 0} />
              <Text className="text-lg font-bold text-primary">
                {data?.hotelName}
              </Text>
            </View>

            <Text className="text-lg text-primary font-semibold">
              {currencyFormat(data?.price)}
            </Text>
          </View>
          <Text className="text-sm text-gray-400">
            Child {data?.childAgeMin} - {data?.childAgeMax}{" "}
            {data?.childAgeMax > 1 ? "years" : "year"}
          </Text>
          <View className="flex flex-row gap-1">
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.primary}
            />
            <Text className="text-sm text-gray-400">
              {data?.city}, {data?.countryName}
            </Text>
          </View>
        </View>

        <View className="h-[30%]">
          <Text className="text-lg font-bold">Room Description</Text>
          <ScrollView>
            {data?.roomDescription ? (
              <Text>{data?.roomDescription}</Text>
            ) : (
              <Text className="text-gray-400">No Description</Text>
            )}
          </ScrollView>
        </View>

        <View className="h-[50%]">
          <Text className="text-lg font-bold">Amenities</Text>
          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {data?.attributes?.length! > 0 ? (
              <View className="flex flex-row flex-wrap gap-2">
                {data?.attributes?.map((attribute) => (
                  <View
                    key={attribute?.attributeId}
                    className="bg-gray-200 px-3 py-2 rounded-full self-start"
                  >
                    <Text className="text-gray-500 text-sm">
                      {attribute?.attributeName}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-gray-400">No Amenities</Text>
            )}
          </ScrollView>
        </View>

        <View className="flex flex-row justify-center gap-2">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
            onPress={onClose}
          >
            <Text className="text-primary font-bold text-lg">Close</Text>
          </TouchableOpacity>

          <Button
            className="p-1 px-2"
            classNameText="text-lg font-semibold text-white"
            text="Book Now"
            onPress={onBookNow}
          />
        </View>
      </View>
    </ModalGeneral>
  );
};

export default ModalDetailHotel;
