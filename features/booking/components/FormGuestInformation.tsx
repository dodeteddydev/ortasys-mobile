import Card from "@/components/Card";
import { TextInputField } from "@/components/TextInputField";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, View } from "react-native";
import { GuestInformationSchema } from "../schemas/guestInformationSchema";

const FormGuestInformation = ({
  control,
  errors,
}: {
  control: Control<Partial<GuestInformationSchema>>;
  errors: FieldErrors<Partial<GuestInformationSchema>>;
}) => {
  return (
    <>
      <View className="mx-5 my-2">
        <Text className="text-lg font-bold text-primary">
          Guest Information
        </Text>
        <Text className="text-sm text-gray-400">
          Please provide the guest’s information for booking confirmation.
        </Text>
      </View>

      <Card className="mx-4 my-2">
        <View className="gap-3">
          <Controller
            name="guestFirstName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Guest First Name"
                placeholder="Enter guest first name"
                value={value}
                onChangeText={onChange}
                error={errors.guestFirstName?.message}
              />
            )}
          />

          <Controller
            name="guestLastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Guest Last Name"
                placeholder="Enter guest last name"
                value={value}
                onChangeText={onChange}
                error={errors.guestLastName?.message}
              />
            )}
          />

          <Controller
            name="guestEmail"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Guest Email"
                placeholder="Enter guest email"
                value={value}
                onChangeText={onChange}
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
                label="Guest Phone"
                placeholder="Enter guest phone"
                value={value}
                onChangeText={onChange}
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
                onChange={(val) => onChange(val.value)}
                error={errors.guestCountry?.message}
              />
            )}
          />

          <Controller
            name="guestZipcode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                label="Guest Zipcode"
                placeholder="Enter guest zipcode"
                value={value}
                onChangeText={onChange}
                error={errors.guestZipcode?.message}
              />
            )}
          />

          <Controller
            name="specialRequest"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputField
                textarea
                label="Guest Special Request"
                placeholder="Enter guest special request"
                value={value}
                onChangeText={onChange}
                error={errors.specialRequest?.message}
              />
            )}
          />
        </View>
      </Card>
    </>
  );
};

export default FormGuestInformation;
