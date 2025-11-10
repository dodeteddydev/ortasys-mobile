import Button from "@/components/Button";
import Card from "@/components/Card";
import HotelStar from "@/components/HotelStar";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { BookingListQueryParams } from "../types/bookingListQueryParams";
import { BookingListResponse } from "../types/bookingListResponse";
import ModalDetailHotel from "./ModalDetailHotel";

type CardBookingListItemProps = {
  params?: BookingListQueryParams;
  data: BookingListResponse;
  onBookNow: () => void;
};

const CardBookingListItem = ({
  params,
  data,
  onBookNow,
}: CardBookingListItemProps) => {
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Card>
        <View className="flex flex-row items-center">
          <View className="flex-1 flex flex-row items-center gap-3">
            <NetworkImage path={data?.logoPath} />
            <View>
              <HotelStar star={data?.star ?? 0} />
              <Text className="text-lg font-bold text-primary">
                {data?.hotelName}
              </Text>
              <Text className="text-sm text-gray-400">
                Child {data?.childAgeMin} - {data?.childAgeMax}{" "}
                {data?.childAgeMax > 1 ? "years" : "year"}
              </Text>
              <View className="w-[165px] flex flex-row gap-1">
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
          </View>

          <View className="flex flex-col justify-center gap-2">
            <Button
              className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
              classNameText="text-lg text-primary font-semibold"
              text="View Detail"
              onPress={() => setShowModal(true)}
            />

            <Button
              className="p-1 px-2"
              classNameText="text-lg font-semibold text-white"
              text="Book Now"
              onPress={onBookNow}
            />
          </View>
        </View>
      </Card>

      <ModalDetailHotel
        showModal={showModal}
        hotelRoomId={data?.hotelRoomId}
        params={params}
        width={width}
        onClose={() => setShowModal(false)}
        onBookNow={() => {
          setShowModal(false);
          onBookNow();
        }}
      />
    </>
  );
};

export default CardBookingListItem;
