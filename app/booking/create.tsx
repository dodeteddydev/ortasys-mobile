import Stepper from "@/components/Stepper";
import { stepperBooking } from "@/constants/stepper";
import ScreenBookingInformation from "@/features/booking/components/ScreenBookingInformation";
import ScreenPaymentAndSumary from "@/features/booking/components/ScreenPaymentAndSumary";
import { BookingProvider } from "@/features/booking/context/BookingProvider";
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
      <BookingProvider>
        <Stepper
          currentStep={step}
          onChangeStep={(step) => setStep(step)}
          steps={[
            {
              id: stepperBooking.booking,
              label: "Booking Information",
              content: (
                <ScreenBookingInformation
                  params={params}
                  onNextStep={() => setStep(stepperBooking.payment)}
                />
              ),
            },
            {
              id: stepperBooking.payment,
              label: "Payment & Sumary",
              content: <ScreenPaymentAndSumary />,
            },
          ]}
        />
      </BookingProvider>
    </KeyboardAvoidingView>
  );
};

export default BookingCreate;
