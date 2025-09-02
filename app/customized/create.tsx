import { stepper } from "@/constants/stepper";
import PackageScreen from "@/features/customized/components/PackageScreen";
import SearchScreen from "@/features/customized/components/SearchScreen";
import Stepper from "@/features/customized/components/Stepper";
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
          onChange={(step) => setStep(step)}
          steps={[
            {
              id: stepper.search,
              label: "Search",
              content: (
                <SearchScreen
                  onSearchCompleted={() => setStep(stepper.package)}
                />
              ),
            },
            {
              id: stepper.package,
              label: "Package",
              content: <PackageScreen />,
            },
            {
              id: stepper.guest,
              label: "Guest",
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
