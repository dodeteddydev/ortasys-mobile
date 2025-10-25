import Stepper from "@/components/Stepper";
import { stepperBooking } from "@/constants/stepper";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

const BookingCreate = () => {
  const params = useLocalSearchParams();
  const [step, setStep] = useState<string>(stepperBooking.booking);

  console.log(params);

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
            content: <Text>BOOKING</Text>,
          },
          {
            id: stepperBooking.payment,
            label: "Payment & Sumary",
            content: <Text>PAYMENT</Text>,
          },
        ]}
      />
    </KeyboardAvoidingView>
  );
};

export default BookingCreate;
