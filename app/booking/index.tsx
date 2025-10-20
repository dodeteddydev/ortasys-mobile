import Stepper from "@/components/Stepper";
import { stepperBooking } from "@/constants/stepper";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

const Booking = () => {
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
            label: "Booking",
            content: <Text>BOOKING</Text>,
          },
          {
            id: stepperBooking.payment,
            label: "Payment",
            content: <Text>PAYMENT</Text>,
          },
        ]}
      />
    </KeyboardAvoidingView>
  );
};

export default Booking;
