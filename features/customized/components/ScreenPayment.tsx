import Button from "@/components/Button";
import Card from "@/components/Card";
import StepperButton from "@/components/StepperButton";
import ToastCustom from "@/components/ToastCustom";
import { colors } from "@/constants/colors";
import { useGetBalance } from "@/hooks/useGetBalance";
import { calculateNights } from "@/utilities/calculateNights";
import { currencyFormat } from "@/utilities/currencyFormat";
import { dateFormat } from "@/utilities/dateFormat";
import {
  Entypo,
  Feather,
  FontAwesome6,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { BookingPackageRequest } from "../types/bookingPackageRequest";
import HorizontalDataPreview from "./HorizontalDataPreview";

type ScreenPaymentProps = {
  isLoading: boolean;
  onSubmit: (data: BookingPackageRequest) => void;
};

const ScreenPayment = ({ isLoading, onSubmit }: ScreenPaymentProps) => {
  const { customized } = useCustomizedContext();

  const handleSubmit = () => {
    onSubmit({
      ...customized?.guestInformation,
      startStayDate: customized?.search?.startStayDate || "",
      endStayDate: customized?.search?.endStayDate || "",
      night:
        calculateNights(
          customized?.search?.startStayDate!,
          customized?.search?.endStayDate!
        ) ?? 0,
      totalRoom: customized?.search?.totalRoom ?? 0,
      adult: customized?.search?.adult ?? 0,
      child: customized?.search?.child ?? 0,
      hotelRooms:
        customized?.hotelRoomCustomized?.map((hotelRoom) => ({
          ...hotelRoom?.payload,
          date: hotelRoom?.payload?.date,
          activities: hotelRoom?.payload?.activities?.map((activity) => ({
            ...activity,
            rate: activity?.isPricePerItem
              ? activity?.pricePerItem! * activity?.totalItem!
              : activity?.adult! * activity?.priceAdult! +
                activity?.child! * activity?.priceChild!,
          })),
        })) ?? [],
    });
  };

  const { isFetching, data, isError, error } = useGetBalance();

  const grandTotal = customized?.hotelRoomCustomized?.reduce(
    (acc, hotelRoom) => {
      return (
        acc +
        (hotelRoom?.response?.contract?.rate ?? 0) +
        (hotelRoom?.payload?.activities?.reduce((sum, activity) => {
          if (!activity) return sum;

          if (activity.isPricePerItem) {
            return (
              sum + (activity.pricePerItem ?? 0) * (activity.totalItem ?? 0)
            );
          }

          return (
            sum +
            (activity.adult ?? 0) * (activity.priceAdult ?? 0) +
            (activity.child ?? 0) * (activity.priceChild ?? 0)
          );
        }, 0) ?? 0)
      );
    },
    0
  );

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card className="m-4">
          <View className="gap-4">
            <HorizontalDataPreview
              icon={
                <Feather
                  name="arrow-right"
                  size={24}
                  color={colors.grayInactive}
                />
              }
              title="Check In"
              description={dateFormat(
                customized?.search?.startStayDate!,
                "day-long"
              )}
            />

            <HorizontalDataPreview
              icon={
                <Feather
                  name="arrow-left"
                  size={24}
                  color={colors.grayInactive}
                />
              }
              title="Check Out"
              description={dateFormat(
                customized?.search?.endStayDate!,
                "day-long"
              )}
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
              description={customized?.search?.child?.toString() ?? "0"}
            />

            <HorizontalDataPreview
              icon={
                <Octicons name="person" size={24} color={colors.grayInactive} />
              }
              title="Adult"
              description={customized?.search?.adult?.toString() ?? "0"}
            />

            <HorizontalDataPreview
              icon={
                <MaterialIcons
                  name="bed"
                  size={24}
                  color={colors.grayInactive}
                />
              }
              title="Night"
              description={
                calculateNights(
                  customized?.search?.startStayDate!,
                  customized?.search?.endStayDate!
                )?.toString() ?? "0"
              }
            />

            <View className="border-b border-gray-200" />

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
        </Card>
      </ScrollView>

      <StepperButton>
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
          <Text className="mt-4">
            Oops! Your balance isn’t enough for this payment. Please top up to
            continue.
          </Text>
        )}

        <Button
          loading={isLoading}
          disabled={
            isFetching ||
            isError ||
            (grandTotal ?? 0) > (data?.data?.currentBalance ?? 0)
          }
          className="m-6 mb-10 w-full h-14"
          text="Payment"
          onPress={handleSubmit}
        />
      </StepperButton>

      <Toast
        position="bottom"
        bottomOffset={105}
        visibilityTime={3000}
        config={{
          error: (value) => (
            <ToastCustom
              type="error"
              title={value.text1!}
              text={value.text2!}
            />
          ),
        }}
      />
    </View>
  );
};

export default ScreenPayment;
