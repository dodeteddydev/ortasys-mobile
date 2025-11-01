import Button from "@/components/Button";
import HotelStar from "@/components/HotelStar";
import Loading from "@/components/Loading";
import ModalGeneral from "@/components/Modal";
import NetworkImage from "@/components/NetworkImage";
import { colors } from "@/constants/colors";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { useGetBookingHotelRoom } from "../hooks/useGetBookingHotelRoom";
import { BookingListResponse } from "../types/bookingListResponse";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";
import Error from "@/components/Error";

type ModalDetailHotelProps = {
  showModal: boolean;
  hotelRoomId: number;
  params?: BookingHotelRoomQueryParams;
  width: number;
  onClose: () => void;
  onBookNow: () => void;
};

const ModalDetailHotel = ({
  showModal,
  hotelRoomId,
  params,
  width,
  onClose,
  onBookNow,
}: ModalDetailHotelProps) => {
  const { data, isLoading, isError, error } = useGetBookingHotelRoom({
    enabled: showModal && !!hotelRoomId,
    roomId: hotelRoomId,
    params,
  });

  const dataHotelRoom = data?.data;

  return (
    <ModalGeneral show={showModal}>
      <View
        className="gap-3"
        style={{ width: width - 100, minHeight: 200, maxHeight: 600 }}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error statusCode={error?.response?.status ?? ""} />
        ) : (
          <>
            <NetworkImage
              className="w-full"
              path={dataHotelRoom?.roomImage ?? ""}
            />

            <View className="flex flex-row justify-between">
              <View>
                <HotelStar star={dataHotelRoom?.star ?? 0} />
                <Text className="text-lg font-bold text-primary">
                  {dataHotelRoom?.hotelName}
                </Text>
              </View>

              <Text className="text-lg text-primary font-semibold">
                {currencyFormat(dataHotelRoom?.price ?? 0)}
              </Text>
            </View>
            <Text className="text-sm text-gray-400">
              Child {dataHotelRoom?.childAgeMin} - {dataHotelRoom?.childAgeMax}{" "}
              {dataHotelRoom?.childAgeMax ?? 0 > 1 ? "years" : "year"}
            </Text>
            <View className="flex flex-row gap-1">
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.primary}
              />
              <Text className="text-sm text-gray-400">
                {dataHotelRoom?.city}, {dataHotelRoom?.countryName}
              </Text>
            </View>

            <ScrollView contentContainerStyle={{ gap: 16 }}>
              <View>
                <Text className="text-lg font-bold">Room Description</Text>
                <View>
                  {dataHotelRoom?.roomDescription ? (
                    <Text>{dataHotelRoom?.roomDescription}</Text>
                  ) : (
                    <Text className="text-gray-400">No Description</Text>
                  )}
                </View>
              </View>

              <View>
                <Text className="text-lg font-bold">Amenities</Text>
                <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
                  {dataHotelRoom?.attributes?.length! > 0 ? (
                    <View className="flex flex-row flex-wrap gap-2">
                      {dataHotelRoom?.attributes?.map((attribute) => (
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

              <View>
                <Text className="text-lg font-bold">About Hotel</Text>
                <RenderHTML
                  contentWidth={width}
                  source={{
                    html: dataHotelRoom?.highlight ?? "",
                  }}
                />
              </View>
            </ScrollView>

            <View className="flex flex-row justify-center gap-2">
              <Button
                className="bg-white shadow-md border border-primary rounded-lg px-2 py-1"
                classNameText="text-lg text-primary font-semibold"
                text="Close"
                onPress={onClose}
              />

              <Button
                className="p-1 px-2"
                classNameText="text-lg font-semibold text-white"
                text="Book Now"
                onPress={onBookNow}
              />
            </View>
          </>
        )}
      </View>
    </ModalGeneral>
  );
};

export default ModalDetailHotel;
