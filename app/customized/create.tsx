import Stepper from "@/components/Stepper";
import { stepper } from "@/constants/stepper";
import ScreenGuestInformation from "@/features/customized/components/ScreenGuestInformation";
import ScreenHotelRoom from "@/features/customized/components/ScreenHotelRoom";
import ScreenPayment from "@/features/customized/components/ScreenPayment";
import ScreenSearch from "@/features/customized/components/ScreenSearch";
import { CustomizedProvider } from "@/features/customized/context/CustomizedProvider";
import { BookingRequest } from "@/features/customized/types/bookingRequest";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const CreateScreen = () => {
  const [step, setStep] = useState<string>(stepper.search);

  const handleSubmit = (data: BookingRequest) => {};

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <CustomizedProvider>
        <Stepper
          currentStep={step}
          onChangeStep={(step) => setStep(step)}
          steps={[
            {
              id: stepper.search,
              label: "Search",
              content: (
                <ScreenSearch onSearch={() => setStep(stepper.hotelRoom)} />
              ),
            },
            {
              id: stepper.hotelRoom,
              label: "Hotel Room",
              content: (
                <ScreenHotelRoom
                  onPressPrevious={() => setStep(stepper.search)}
                  onPressNext={() => setStep(stepper.guest)}
                />
              ),
            },
            {
              id: stepper.guest,
              label: "Guest Information",
              content: (
                <ScreenGuestInformation
                  onPressPrevious={() => setStep(stepper.hotelRoom)}
                  onPressNext={() => setStep(stepper.payment)}
                />
              ),
            },
            {
              id: stepper.payment,
              label: "Payment",
              content: <ScreenPayment onSubmit={handleSubmit} />,
            },
          ]}
        />
      </CustomizedProvider>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
