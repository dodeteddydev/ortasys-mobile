import { stepper } from "@/constants/stepper";
import SearchScreen from "@/features/customized/components/SearchScreen";
import Stepper from "@/features/customized/components/Stepper";
import {
  bookingSchema,
  BookingSchema,
} from "@/features/customized/schemas/bookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

const CreateScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestFirstName: undefined,
      guestLastName: undefined,
      guestEmail: undefined,
      guestPhone: undefined,
      specialRequest: undefined,
      startStayDate: undefined,
      endStayDate: undefined,
      night: undefined,
      totalRoom: undefined,
      adult: undefined,
      child: undefined,
      hotelRooms: [],
    },
  });

  const [step, setStep] = useState<string>(stepper.search);

  const handleSearch = (data: BookingSchema) => {
    setStep(stepper.package);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <Stepper
        currentStep={step}
        onChange={(step) => setStep(step)}
        steps={[
          {
            id: stepper.search,
            label: "Search",
            content: <SearchScreen onSearch={handleSearch} />,
          },
          {
            id: stepper.package,
            label: "Package",
            content: <Text>Package</Text>,
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
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
