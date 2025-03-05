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
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/Button";
import vectors from "@/constants/vectors";
import BackgroundLayout from "@/features/home/components/BackgroundLayout";
import SearchSection from "@/features/home/components/SearchSection";

const Main = () => {
  const { logout } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
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
      <BackgroundLayout>
        <View className="gap-2 px-6 pt-6">
          <Text className="text-white text-[15px]">Hello, Teddy!</Text>
          <Text className="text-white text-[16px] font-semibold">
            Find the best hotel deals now 👋🏻
          </Text>

          <SearchSection />
        </View>

        <FlatList
          data={Array.from({ length: 10 })}
          contentContainerStyle={{ padding: 20 }}
          renderItem={() => (
            <View className="bg-white rounded-lg shadow-md p-36 mb-3">
              <Text>TEST</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </BackgroundLayout>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default Main;
