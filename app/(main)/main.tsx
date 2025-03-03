import Loading from "@/components/Loading";
import { TextInputField } from "@/components/TextInputField";
import { useGlobalContext } from "@/context/GlobalProvider";
import DropdownCity from "@/features/city/components/DropdownCity";
import SearchInput from "@/features/home/components/SearchInput";
import { ProfileService } from "@/features/profile/services/profileService";
import { ProfileResponse } from "@/features/profile/types/profileResponseType";
import { ErrorResponse } from "@/types/responseType";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/Button";

const Main = () => {
  const { logout } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);

  const checkUserRole = (response: ProfileResponse) => {
    if (response.role !== "agent")
      return Alert.alert("Access Denied", "Only agents can access this app.", [
        { text: "Logout", onPress: logout },
      ]);
  };

  const checkError = (e: AxiosError<ErrorResponse>) => {
    if (e.response?.status === 401)
      return Alert.alert("Session Expired", "Please login again", [
        { text: "OK", onPress: logout },
      ]);
  };

  useEffect(() => {
    setIsLoading(true);
    ProfileService.get()
      .then((response) => checkUserRole(response.data))
      .catch((e: AxiosError<ErrorResponse>) => checkError(e))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView>
      <View className="relative h-full">
        <View className="bg-black h-[25%] rounded-b-[50px]" />
        <View className="absolute p-6 h-full w-full">
          <View className="gap-2 mb-8">
            <Text className="text-white text-[15px]">Hello, Teddy!</Text>
            <Text className="text-white text-[16px] font-semibold">
              Find the best hotel deals now 👋🏻
            </Text>
          </View>

          <View className="bg-white rounded-3xl p-4 shadow-xl gap-2">
            <SearchInput
              icon={
                <FontAwesome6 name="location-dot" size={18} color="black" />
              }
              label="Destination"
              placeholder="Badung"
              onChange={() => {}}
            />
            <View className="flex-row gap-2 mb-2">
              <View className="flex-1">
                <SearchInput
                  icon={
                    <FontAwesome6 name="location-dot" size={18} color="black" />
                  }
                  label="Check-in"
                  placeholder={new Date().toISOString().split("T")[0]}
                  onChange={() => {}}
                />
              </View>
              <View className="flex-1">
                <SearchInput
                  icon={
                    <FontAwesome6 name="location-dot" size={18} color="black" />
                  }
                  label="Check-out"
                  placeholder={dateNow.toISOString().split("T")[0]}
                  onChange={() => {}}
                />
              </View>
            </View>

            <Button text="Search" />
          </View>
        </View>
      </View>

      <StatusBar barStyle="light-content" backgroundColor="black" />
    </SafeAreaView>
  );
};

export default Main;
