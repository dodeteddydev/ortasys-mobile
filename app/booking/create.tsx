import Stepper from "@/components/Stepper";
import { stepperBooking } from "@/constants/stepper";
import ScreenBookingInformation from "@/features/booking/components/ScreenBookingInformation";
import ScreenPaymentAndSumary from "@/features/booking/components/ScreenPaymentAndSumary";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const BookingCreate = () => {
  const params = useLocalSearchParams();
  const [step, setStep] = useState<string>(stepperBooking.booking);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <Stepper
        currentStep={step}
        onChangeStep={(step) => setStep(step)}
        steps={[
          {
            id: stepperBooking.booking,
            label: "Booking Information",
            content: <ScreenBookingInformation params={params} />,
          },
          {
            id: stepperBooking.payment,
            label: "Payment & Sumary",
            content: <ScreenPaymentAndSumary />,
          },
        ]}
      />
    </KeyboardAvoidingView>
  );
};

export default BookingCreate;
