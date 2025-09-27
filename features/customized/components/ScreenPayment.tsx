import Button from "@/components/Button";
import Card from "@/components/Card";
import { calculateNights } from "@/utilities/calculateNights";
import { ScrollView, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import { BookingRequest } from "../types/bookingRequest";

type ScreenPaymentProps = {
  onSubmit: (data: BookingRequest) => void;
};

const ScreenPayment = ({ onSubmit }: ScreenPaymentProps) => {
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
        customized?.hotelRoomCustomized?.map((value) => ({
          ...value?.payload,
          date: value?.payload?.date,
        })) ?? [],
    });
  };

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card className="m-4">
          <Button text="Payment" onPress={handleSubmit} />
        </Card>
      </ScrollView>
    </View>
  );
};

export default ScreenPayment;
