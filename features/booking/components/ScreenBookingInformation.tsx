import Button from "@/components/Button";
import Card from "@/components/Card";
import Error from "@/components/Error";
import HotelStar from "@/components/HotelStar";
import Loading from "@/components/Loading";
import NetworkImage from "@/components/NetworkImage";
import StepperButton from "@/components/StepperButton";
import { colors } from "@/constants/colors";
import HorizontalDataPreview from "@/features/customized/components/HorizontalDataPreview";
import { dateFormat } from "@/utilities/dateFormat";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useGetBookingHotel } from "../hooks/useGetBookingHotel";
import { BookingHotelQueryParams } from "../types/bookingHotelQueryParams";
import BookingInformationHotelRoomItem from "./BookingInformationHotelRoomItem";
import ModalFilterBookingInformation from "./ModalFilterBookingInformation";
import { calculateNights } from "@/utilities/calculateNights";

type ScreenBookingInformationProps = {
  params: BookingHotelQueryParams;
};

const ScreenBookingInformation = ({
  params,
}: ScreenBookingInformationProps) => {
  const { width } = useWindowDimensions();
  const [queryParams, setQueryParams] =
    useState<BookingHotelQueryParams>(params);
  const { data, isLoading, isError, error } = useGetBookingHotel({
    enabled: !!queryParams?.hotelId,
    hotelId: queryParams?.hotelId!,
    params: queryParams,
  });

  const dataHotel = data?.data[0];

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <Loading />;

  if (isError) return <Error statusCode={error?.response?.status ?? ""} />;

  return (
    <>
      <View className="flex-1">
        <ScrollView>
          <Card className="mx-4 my-2">
            <View className="flex flex-row items-center gap-3">
              <NetworkImage path={dataHotel?.logoPath!} />
              <View>
                <HotelStar star={dataHotel?.star ?? 0} />
                <Text className="text-lg font-bold text-primary">
                  {dataHotel?.hotelName}
                </Text>
                <View className="flex flex-row gap-1">
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={colors.primary}
                  />
                  <Text className="text-sm text-gray-400">
                    {dataHotel?.city}, {dataHotel?.countryName}
                  </Text>
                </View>
              </View>
            </View>

            <RenderHTML
              contentWidth={width}
              source={{ html: dataHotel?.highlight ?? "" }}
            />
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

          <View className="mx-4 my-2">
            {data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <BookingInformationHotelRoomItem key={index} data={item} />
              ))
            ) : (
              <Text className="text-center text-gray-400">
                No room available
              </Text>
            )}
          </View>

          <Card className="mx-4 my-2">
            <View className="gap-3">
              <HorizontalDataPreview
                icon={
                  <FontAwesome
                    name="calendar-check-o"
                    size={22}
                    color={colors.grayInactive}
                  />
                }
                title="Check In"
                description={dateFormat(queryParams?.checkIn!, "day-long")}
              />

              <HorizontalDataPreview
                icon={
                  <FontAwesome
                    name="calendar-times-o"
                    size={22}
                    color={colors.grayInactive}
                  />
                }
                title="Check Out"
                description={dateFormat(queryParams?.checkOut!, "day-long")}
              />

              <HorizontalDataPreview
                icon={
                  <Octicons
                    name="person"
                    size={24}
                    color={colors.grayInactive}
                  />
                }
                title="Adult"
                description={queryParams?.maxAdult?.toString() ?? "0"}
              />

              <HorizontalDataPreview
                icon={
                  <MaterialIcons
                    name="child-care"
                    size={24}
                    color={colors.grayInactive}
                  />
                }
                title="Child"
                description={queryParams?.maxChild?.toString() ?? "0"}
              />

              <HorizontalDataPreview
                icon={
                  <MaterialIcons
                    name="bed"
                    size={24}
                    color={colors.grayInactive}
                  />
                }
                title="Total Night"
                description={calculateNights(
                  queryParams?.checkIn!,
                  queryParams?.checkOut!
                ).toString()}
              />

              <HorizontalDataPreview
                icon={
                  <MaterialCommunityIcons
                    name="door"
                    size={24}
                    color={colors.grayInactive}
                  />
                }
                title="Total Room"
                description={calculateNights(
                  queryParams?.checkIn!,
                  queryParams?.checkOut!
                ).toString()}
              />
            </View>
          </Card>
        </ScrollView>

        <StepperButton>
          <Button
            className="m-6 mb-10 w-full h-14"
            text="Next Step"
            onPress={() => {}}
          />
        </StepperButton>
      </View>

      <ModalFilterBookingInformation
        show={showModal}
        params={params}
        onClose={() => setShowModal(false)}
        onApplyFilter={(params) => {
          setQueryParams(params);
          setShowModal(false);
        }}
      />
    </>
  );
};

export default ScreenBookingInformation;
