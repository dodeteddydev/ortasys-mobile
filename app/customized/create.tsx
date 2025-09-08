import Stepper from "@/components/Stepper";
import { stepper } from "@/constants/stepper";
import ScreenHotelRoom from "@/features/customized/components/ScreenHotelRoom";
import ScreenSearch from "@/features/customized/components/ScreenSearch";
import { CustomizedProvider } from "@/features/customized/context/CustomizedProvider";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

const CreateScreen = () => {
  const [step, setStep] = useState<string>(stepper.search);

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
                <ScreenSearch onSubmit={() => setStep(stepper.hotelRoom)} />
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
              content: <Text>Guest</Text>,
            },
            {
              id: stepper.payment,
              label: "Payment",
              content: <Text>Payment</Text>,
            },
          ]}
        />
      </CustomizedProvider>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
