import Button from "@/components/Button";
import Card from "@/components/Card";
import StepperButton from "@/components/StepperButton";
import { TextInputField } from "@/components/TextInputField";
import { calculateNights } from "@/utilities/calculateNights";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useCustomizedContext } from "../context/CustomizedProvider";
import {
  guestInformationSchema,
  GuestInformationSchema,
} from "../schemas/guestInformationSchema";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import { useEffect } from "react";

type ScreenGuestInformationProps = {
  onPressPrevious: () => void;
  onPressNext: () => void;
};

const ScreenGuestInformation = ({
  onPressPrevious,
  onPressNext,
}: ScreenGuestInformationProps) => {
  const { customized, setCustomized } = useCustomizedContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInformationSchema>({
    resolver: zodResolver(guestInformationSchema),
    defaultValues: {
      guestFirstName: customized?.guestInformation?.guestFirstName || undefined,
      guestLastName: customized?.guestInformation?.guestLastName || undefined,
      guestEmail: customized?.guestInformation?.guestEmail || undefined,
      guestPhone: customized?.guestInformation?.guestPhone || undefined,
      guestCountry: customized?.guestInformation?.guestCountry || undefined,
      guestZipCode: customized?.guestInformation?.guestZipCode || undefined,
      specialRequest: customized?.guestInformation?.specialRequest || undefined,
    },
  });

  const onSubmit = (data: GuestInformationSchema) => {
    setCustomized({
      ...customized,
      guestInformation: data,
    });
    onPressNext();
  };

  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card className="m-4">
          <View className="gap-3">
            <Controller
              name="guestFirstName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="First Name"
                  placeholder="John"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  error={errors.guestFirstName?.message}
                />
              )}
            />

            <Controller
              name="guestLastName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Last Name"
                  placeholder="Doe"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  error={errors.guestLastName?.message}
                />
              )}
            />

            <Controller
              name="guestEmail"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Email"
                  placeholder="johndoe@example.com"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  keyboardType="email-address"
                  error={errors.guestEmail?.message}
                />
              )}
            />

            <Controller
              name="guestPhone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Phone"
                  placeholder="08712345678"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  keyboardType="phone-pad"
                  error={errors.guestPhone?.message}
                />
              )}
            />

            <Controller
              name="guestCountry"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropdownCountry
                  value={value}
                  onChange={(country) => onChange(country.value)}
                  error={errors.guestCountry?.message}
                />
              )}
            />

            <Controller
              name="guestZipCode"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Zip Code"
                  placeholder="Please enter your zip code (optional)"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  error={errors.guestZipCode?.message}
                />
              )}
            />

            <Controller
              name="specialRequest"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Special Request"
                  placeholder="Please enter your special request (optional)"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  error={errors.specialRequest?.message}
                  textarea
                />
              )}
            />
          </View>
        </Card>
      </ScrollView>

      <StepperButton
        onPressPrevious={onPressPrevious}
        onPressNext={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ScreenGuestInformation;
