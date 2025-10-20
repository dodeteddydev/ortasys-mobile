import Stepper from "@/components/Stepper";
import { stepper } from "@/constants/stepper";
import ScreenGuestInformation from "@/features/customized-create/components/ScreenGuestInformation";
import ScreenHotelRoom from "@/features/customized-create/components/ScreenHotelRoom";
import ScreenPayment from "@/features/customized-create/components/ScreenPayment";
import ScreenSearch from "@/features/customized-create/components/ScreenSearch";
import { CustomizedProvider } from "@/features/customized-create/context/CustomizedProvider";
import { useBookingPackage } from "@/features/customized-create/hooks/useBookingPackage";
import { BookingPackageRequest } from "@/features/customized-create/types/bookingPackageRequest";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import Toast from "react-native-toast-message";

const CreateScreen = () => {
  const [step, setStep] = useState<string>(stepper.search);

  const bookingPackageRequest = useBookingPackage();

  const handleSubmit = (data: BookingPackageRequest) => {
    bookingPackageRequest.mutate(data, {
      onSuccess: async () => {
        setTimeout(() => router.replace("/customized/list"), 2050);
        Toast.show({
          type: "success",
          text1: "Booking Package Created Successfully",
          text2: "You have successfully created a booking package.",
        });
      },
      onError: (e) =>
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: e.response?.data.message,
        }),
    });
  };

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
              content: (
                <ScreenPayment
                  isLoading={bookingPackageRequest.isPending}
                  onSubmit={handleSubmit}
                />
              ),
            },
          ]}
        />
      </CustomizedProvider>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
