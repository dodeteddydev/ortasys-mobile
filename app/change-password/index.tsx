import Button from "@/components/Button";
import { TextInputField } from "@/components/TextInputField";
import ToastCustom from "@/components/ToastCustom";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useChangePassword } from "@/features/change-password/hooks/useChangePassword";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/features/change-password/schemas/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const ChangePassword = () => {
  const { logout } = useGlobalContext();
  const changePassword = useChangePassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConf: "",
    },
  });

  const onUpdate = (data: ChangePasswordSchema) => {
    changePassword.mutate(
      { oldPassword: data.oldPassword!, newPassword: data.newPassword! },
      {
        onSuccess: () => {
          setTimeout(() => logout(), 2050);
          Toast.show({
            type: "success",
            text1: "Password Updated Successfully",
            text2:
              "You have successfully updated your password. Please log in again.",
          });
        },
        onError: () =>
          Toast.show({
            type: "error",
            text1: "Password Update Failed",
            text2: "Please check your current password and try again.",
          }),
      }
    );
  };
  return (
    <>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="p-4">
            <Text className="text-2xl font-semibold">Change Password</Text>
            <Text className="mb-10">Click update when you're done.</Text>

            {/* CHANGE PASSWORD FORM */}
            <View className="gap-3">
              <Controller
                control={control}
                name="oldPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInputField
                    secureTextEntry
                    label="Old Password"
                    placeholder="Enter old password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.oldPassword?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInputField
                    secureTextEntry
                    label="New Password"
                    placeholder="Enter new password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.newPassword?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPasswordConf"
                render={({ field: { onChange, value } }) => (
                  <TextInputField
                    secureTextEntry
                    label="Password Confirmation"
                    placeholder="Enter password confirmation"
                    value={value}
                    onChangeText={onChange}
                    error={errors.newPasswordConf?.message}
                  />
                )}
              />

              <Button
                loading={changePassword.isPending}
                text="UPDATE PASSWORD"
                onPress={handleSubmit(onUpdate)}
              />
            </View>
          </View>
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

export default ChangePassword;
