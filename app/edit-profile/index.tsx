import Button from "@/components/Button";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { TextInputField } from "@/components/TextInputField";
import ToastCustom from "@/components/ToastCustom";
import DropdownCity from "@/features/city/components/DropdownCity";
import DropdownCountry from "@/features/country/components/DropdownCountry";
import { useGetProfile } from "@/features/profile/hooks/useGetProfile";
import { useUpdateProfile } from "@/features/profile/hooks/useUpdateProfile";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "@/features/profile/schemas/updateProfileSchema";
import { UpdateProfileRequest } from "@/features/profile/types/updateProfileRequest";
import DropdownState from "@/features/state/components/DropdownState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const EditProfile = () => {
  const { data, isLoading, isError, error, refetch } = useGetProfile();
  const updateProfile = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      firstName: "",
      lastName: "",
      countryCode: "",
      stateCode: "",
      city: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset({
      name: data?.data.name ?? "",
      firstName: data?.data.firstName ?? "",
      lastName: data?.data.lastName ?? "",
      countryCode: data?.data.country ?? "",
      stateCode: data?.data.state ?? "",
      city: data?.data.city ?? "",
      address: data?.data.address ?? "",
      email: data?.data.email ?? "",
      phone: data?.data.phone ?? "",
    });
  }, [data]);

  const onUpdateProfile = (data: UpdateProfileSchema) => {
    updateProfile.mutate(data as UpdateProfileRequest, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Profile Updated Successfully",
          text2: "You have successfully updated your profile.",
        });
        refetch();
      },
      onError: () =>
        Toast.show({
          type: "error",
          text1: "Profile Update Failed",
          text2:
            "An error occurred while updating your profile. Please try again.",
        }),
    });
  };

  if (isLoading) return <Loading />;

  if (isError) return <Error statusCode={error.response?.status!} />;

  return (
    <>
      <KeyboardAvoidingView behavior="padding" enabled className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="p-4 mb-10">
              <Text className="text-2xl font-semibold">Edit Profile</Text>
              <Text className="mb-8">Click update when you're done.</Text>

              {/* BASIC INFORMATION FORM SECTION */}
              <View className="gap-3 py-4 mb-5 border-b border-gray-300">
                <Text className="font-semibold">Basic Information</Text>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="First Name"
                      placeholder="Enter first name"
                      value={value}
                      onChangeText={onChange}
                      error={errors.firstName?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="Last Name"
                      placeholder="Enter last name"
                      value={value}
                      onChangeText={onChange}
                      error={errors.lastName?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="Name"
                      placeholder="Enter name"
                      value={value}
                      onChangeText={onChange}
                      error={errors.name?.message}
                    />
                  )}
                />
              </View>

              {/* CONTACT INFORMATION FORM SECTION */}
              <View className="gap-3 py-4 mb-5 border-b border-gray-300">
                <Text className="font-semibold">Contact Information</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="Email"
                      placeholder="Enter email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      error={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="Phone"
                      placeholder="Enter phone"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                      error={errors.name?.message}
                    />
                  )}
                />
              </View>

              {/* ADDRESS INFORMATION FORM SECTION */}
              <View className="gap-3 py-4">
                <Text className="font-semibold">Address Information</Text>
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field: { value, onChange } }) => (
                    <DropdownCountry
                      value={value}
                      onChange={(val) => {
                        onChange(val.value);
                        resetField("stateCode", { defaultValue: "" });
                        resetField("city", { defaultValue: "" });
                      }}
                      error={errors.countryCode?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="stateCode"
                  render={({ field: { value, onChange } }) => (
                    <DropdownState
                      countryCode={watch("countryCode")!}
                      value={value}
                      onChange={(val) => onChange(val.value)}
                      error={errors.stateCode?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="city"
                  render={({ field: { value, onChange } }) => (
                    <DropdownCity
                      countryCode={watch("countryCode")!}
                      stateCode={watch("stateCode")!}
                      value={value}
                      onChange={(val) => onChange(val.value)}
                      error={errors.city?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({ field: { value, onChange } }) => (
                    <TextInputField
                      label="Address"
                      placeholder="Enter address"
                      value={value}
                      onChangeText={onChange}
                      error={errors.address?.message}
                    />
                  )}
                />
              </View>

              <Button
                className="h-16"
                text="UPDATE PROFILE"
                loading={updateProfile.isPending}
                onPress={handleSubmit(onUpdateProfile)}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Toast
        position="bottom"
        visibilityTime={2000}
        config={{
          success: (value) => (
            <ToastCustom
              type="success"
              title={value.text1!}
              text={value.text2!}
            />
          ),
          error: (value) => (
            <ToastCustom
              type="error"
              title={value.text1!}
              text={value.text2!}
            />
          ),
        }}
      />
    </>
  );
};

export default EditProfile;
