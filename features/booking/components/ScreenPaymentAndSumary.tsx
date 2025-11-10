import Button from "@/components/Button";
import StepperButton from "@/components/StepperButton";
import { colors } from "@/constants/colors";
import HorizontalDataPreview from "@/features/customized/components/HorizontalDataPreview";
import { useGetBalance } from "@/hooks/useGetBalance";
import { calculateNights } from "@/utilities/calculateNights";
import { currencyFormat } from "@/utilities/currencyFormat";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { useBookingContext } from "../context/BookingProvider";
import BookingSummarySection from "./BookingSummarySection";
import PaymentDetailSection from "./PaymentDetailSection";
import { useCreateBooking } from "../hooks/useCreateBooking";
import Toast from "react-native-toast-message";
import ToastCustom from "@/components/ToastCustom";
import { router } from "expo-router";
import ModalBookingConfirmation from "./ModalBookingConfirmation";
import { useState } from "react";
import ModalBookingSuccess from "./ModalBookingSuccess";

const ScreenPaymentAndSumary = () => {
  const { bookingRoomData, booking } = useBookingContext();
  const { isFetching, data, isError, error } = useGetBalance();
  const createBooking = useCreateBooking();

  const grandTotal = booking?.bookingRooms.reduce((total, room) => {
    const roomPrice =
      room?.pricePerNight *
      room?.totalRoom *
      calculateNights(booking?.checkIn, booking?.checkOut);

    const extraBedPrice = room?.extraBedRate * room?.totalExtraBed;

    return total + roomPrice + extraBedPrice;
  }, 0);

  const handleCreateBooking = () => {
    createBooking.mutate(booking!, {
      onSuccess: async () => {
        setTimeout(() => setShowModalSuccess(true), 2050);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Payment process success",
        });
      },
      onError: () =>
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Payment process failed",
        }),
    });
  };

  const [showModalConf, setShowModalConf] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  return (
    <>
      <View className="flex-1">
        <ScrollView>
          <>
            <View className="mx-5 my-2">
              <Text className="text-lg font-bold text-primary">
                Booking Summary
              </Text>
              <Text className="text-sm text-gray-400">
                Here's your hotel booking summary.
              </Text>
            </View>

            {booking?.bookingRooms?.map((data, index) => (
              <BookingSummarySection
                key={index}
                bookingRoom={data}
                bookingRoomData={bookingRoomData?.find(
                  (value) => value.id === data.hotelId
                )}
                nights={calculateNights(booking?.checkIn, booking?.checkOut)}
              />
            ))}
          </>

          <PaymentDetailSection data={booking} />
        </ScrollView>

        <StepperButton>
          <View className="w-full mt-4">
            <HorizontalDataPreview
              icon={
                <Entypo
                  name="credit-card"
                  size={24}
                  color={colors.grayInactive}
                />
              }
              title="Your Balance"
              description={
                isFetching
                  ? "Loading..."
                  : currencyFormat(data?.data?.currentBalance ?? 0)
              }
            />

            <HorizontalDataPreview
              icon={
                <FontAwesome6
                  name="dollar"
                  size={24}
                  color={colors.grayInactive}
                />
              }
              title="Grand Total"
              description={currencyFormat(grandTotal ?? 0)}
            />
          </View>

          {isError && (
            <View className="flex flex-row items-center gap-2 mt-4">
              <Feather name="alert-octagon" size={15} color="#ef4444" />
              <Text>
                {error?.response?.data?.message ||
                  "Our payment service is temporarily unavailable. Please try again shortly."}
              </Text>
            </View>
          )}

          {(grandTotal ?? 0) > (data?.data?.currentBalance ?? 0) && (
            <Text className="mt-4 text-red-500">
              Oops! Your balance isn’t enough for this payment. Please top up to
              continue.
            </Text>
          )}

          <Button
            loading={createBooking.isPending}
            disabled={
              isFetching ||
              isError ||
              (grandTotal ?? 0) > (data?.data?.currentBalance ?? 0)
            }
            className="m-6 mb-10 w-full h-14"
            text="Proceed to Payment"
            onPress={() => setShowModalConf(true)}
          />
        </StepperButton>
      </View>

      <Toast
        position="bottom"
        bottomOffset={200}
        visibilityTime={3000}
        config={{
          success: (value) => (
            <ToastCustom
              type="success"
              title={value.text1!}
              text={value.text2!}
            />
          ),
          error: (value) => (
            <ToastCustom
              type="error"
              title={value?.text1!}
              text={value?.text2!}
            />
          ),
        }}
      />

      <ModalBookingConfirmation
        showModal={showModalConf}
        onCancel={() => setShowModalConf(false)}
        onConfirmation={() => {
          setShowModalConf(false);
          handleCreateBooking();
        }}
      />

      <ModalBookingSuccess
        showModal={showModalSuccess}
        onPressHome={() => router.replace("/home")}
        onCreateNewBooking={() => router.replace("/booking/search")}
      />
    </>
  );
};

export default ScreenPaymentAndSumary;
