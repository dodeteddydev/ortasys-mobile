import Button from "@/components/Button";
import Card from "@/components/Card";
import Error from "@/components/Error";
import HotelStar from "@/components/HotelStar";
import Loading from "@/components/Loading";
import ModalGeneral from "@/components/Modal";
import NetworkImage from "@/components/NetworkImage";
import StepperButton from "@/components/StepperButton";
import { TextInputField } from "@/components/TextInputField";
import { colors } from "@/constants/colors";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useGetBookingHotelRoom } from "../hooks/useGetBookingHotelRoom";
import { BookingHotelRoomQueryParams } from "../types/bookingHotelRoomQueryParams";

type ScreenBookingInformationProps = {
  params: BookingHotelRoomQueryParams;
};

const ScreenBookingInformation = ({
  params,
}: ScreenBookingInformationProps) => {
  const { width } = useWindowDimensions();
  const [tempParams, setTempParams] =
    useState<BookingHotelRoomQueryParams>(params);
  const [queryParams, setQueryParams] =
    useState<BookingHotelRoomQueryParams>(params);
  const { data, isLoading, isError, error } = useGetBookingHotelRoom({
    enabled: !!queryParams?.hotelRoomId,
    roomId: queryParams?.hotelRoomId ?? 0,
    params: queryParams,
  });

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <Loading />;

  if (isError) return <Error statusCode={error?.response?.status ?? ""} />;

  return (
    <>
      <View className="flex-1">
        <Card className="mx-4 my-2">
          <View className="flex flex-row items-center gap-3">
            <NetworkImage path={data?.data?.logoPath!} />
            <View>
              <HotelStar star={data?.data?.star ?? 0} />
              <Text className="text-lg font-bold text-primary">
                {data?.data?.hotelName}
              </Text>
              <Text className="text-sm text-gray-400">
                Child {data?.data?.childAgeMin} - {data?.data?.childAgeMax}{" "}
                {data?.data?.childAgeMax ?? 0 > 1 ? "years" : "year"}
              </Text>
              <View className="flex flex-row gap-1">
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text className="text-sm text-gray-400">
                  {data?.data?.city}, {data?.data?.countryName}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView className="mt-4 max-h-16">
            <RenderHTML source={{ html: data?.data?.highlight ?? "" }} />
          </ScrollView>
        </Card>

        <View className="mx-5 my-2">
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-bold text-primary">Room</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowModal(true)}
            >
              <Feather name="filter" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-400">
            Choose rooms that are available for your booking.
          </Text>
        </View>

        <Card className="flex-1 mx-4 my-2">
          <ScrollView>
            {Array.from({ length: 500 }).map((_, index) => (
              <Text key={index}>{index}</Text>
            ))}
          </ScrollView>
        </Card>

        <StepperButton>
          <Button
            className="m-6 mb-10 w-full h-14"
            text="Next Step"
            onPress={() => {}}
          />
        </StepperButton>
      </View>

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

          <TextInputField
            label="Adult"
            placeholder="0"
            value={
              tempParams?.maxAdult ? tempParams?.maxAdult?.toString() : "0"
            }
            onChangeText={(value) =>
              setTempParams({
                ...tempParams,
                maxAdult: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <TextInputField
            label="Child"
            placeholder="0"
            value={
              tempParams?.maxChild ? tempParams?.maxChild?.toString() : "0"
            }
            onChangeText={(value) =>
              setTempParams({
                ...tempParams,
                maxChild: parseInt(value ? value : "0"),
              })
            }
            keyboardType="numeric"
          />

          <Button
            className="px-4 py-2"
            classNameText="text-lg text-white font-semibold"
            text="Apply Filter"
            onPress={() => {
              setShowModal(false);
              setQueryParams(tempParams);
            }}
          />
        </View>
      </ModalGeneral>
    </>
  );
};

export default ScreenBookingInformation;
