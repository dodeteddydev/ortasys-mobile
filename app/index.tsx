import Button from "@/components/Button";
import { TextInputField } from "@/components/TextInputField";
import ToastCustom from "@/components/ToastCustom";
import { accessTokenKey, refreshTokenKey } from "@/constants/storageKey";
import vectors from "@/constants/vectors";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { loginSchema, LoginSchema } from "@/features/auth/schemas/loginSchema";
import { LoginRequest } from "@/features/auth/types/loginRequestType";
import { Storage } from "@/utilities/secureStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Index = () => {
  const { isLoggedIn } = useGlobalContext();
  const login = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onLogin = (data: LoginSchema) => {
    login.mutate(data as LoginRequest, {
      onSuccess: ({ data }) => {
        Storage.saveToken(accessTokenKey, data.accessToken);
        Storage.saveToken(refreshTokenKey, data.refreshToken);
        setTimeout(() => router.replace("/home"), 2050);
        Toast.show({
          type: "success",
          text1: "Login Success",
          text2: "You have successfully logged in.",
        });
      },
      onError: () =>
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Please check your email and password.",
        }),
    });
  };

  if (isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {/* LOGIN FORM */}
          <View className="p-4 gap-3 h-full justify-center items-center">
            <Image
              className="h-36 w-36"
              source={vectors.logo}
              resizeMode="contain"
            />

            <Controller
              name="account"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Email or Username"
                  placeholder="Enter your email or username"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  error={errors.account?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInputField
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              className="mt-8"
              text="LOGIN"
              loading={login.isPending}
              onPress={handleSubmit(onLogin)}
            />
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

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Index;
